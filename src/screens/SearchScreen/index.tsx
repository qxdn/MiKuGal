import {useFocusEffect} from '@react-navigation/native';
import GameLists from '@src/components/GameLists';
import {searchGameData} from '@src/services/api';
import logger from '@src/services/log';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';

const SearchScreen: React.FC = ({route, navigation}) => {
  const {type, query} = route.params;
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [gameList, setGameList] = useState<API.GameDetailCount[]>([]);

  async function loadData() {
    if (maxPage > 0 && page === maxPage) {
      Toast.show({type: 'info', text1: '最后一页了'});
      return;
    }
    let data = await searchGameData(query, page, type);
    if (!data) {
      // TODO: 无数据
      return;
    }
    console.log(data);
    if (data.sj) {
      Toast.show({
        type: 'info',
        text1: '没有搜索到内容哦~',
        text2: '随机给你推荐5个',
      });
    }
    setMaxPage(Math.ceil(data.wrap / data.obj.length)); // 设置最大页码
    if (page === 0) {
      setGameList(data.obj);
    } else {
      setGameList([...gameList, ...data.obj]);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({title: query});
    }, [query, navigation]),
  );

  // 初始请求数据
  useEffect(() => {
    if (page === 0) {
      setLoading(true); // 设置加载中
      loadData();
      setLoading(false);
    } else {
      loadData();
    }
  }, [page, setLoading]);

  const refreshing = () => {
    if (page === 0) {
      loadData();
    } else {
      setPage(0);
    }
  };

  const listEndReach = ({distanceFromEnd}) => {
    // 加载新数据
    if (distanceFromEnd < 0) {
      return;
    }
    if (maxPage > 0 && page === maxPage) {
      return;
    }
    setPage(page + 1);
  };

  return (
    <View>
      <GameLists
        data={gameList}
        refreshing={loading}
        onRefresh={refreshing}
        onEndReached={listEndReach}
      />
    </View>
  );
};

export default SearchScreen;
