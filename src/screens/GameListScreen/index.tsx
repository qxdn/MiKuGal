import {SearchBar, Icon} from '@rneui/themed';
import {getGameList} from '@services/api';
import logger from '@src/services/log';
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import GameLists from '@src/components/GameLists';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {useNavigation} from '@react-navigation/native';

const GameListsScreen: React.FunctionComponent<GameListScreenProps> = ({
  gameType,
}) => {
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(-1);
  const [loading, setLoading] = useState<boolean>(true);
  const [gameList, setGameList] = useState<API.GameListItem[]>([]);

  async function loadData() {
    if (maxPage > 0 && page === maxPage) {
      Toast.show({type: 'info', text1: '最后一页了'});
      return;
    }
    let data = await getGameList(page, gameType);
    if (!data) {
      // TODO: 无数据
      return;
    }
    setMaxPage(Math.ceil(data.wrap / data.obj.length)); // 设置最大页码
    if (page === 0) {
      setGameList(data.obj);
    } else {
      setGameList([...gameList, ...data.obj]);
    }
  }

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

  const refreshing = () => {
    if (page === 0) {
      loadData();
    } else {
      setPage(0);
    }
  };

  return (
    <View>
      <GameLists
        data={gameList}
        gameType={gameType}
        refreshing={loading}
        onRefresh={refreshing}
        onEndReached={listEndReach}
      />
    </View>
  );
};

export default GameListsScreen;
