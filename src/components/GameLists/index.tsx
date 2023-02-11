import {SearchBar, Icon} from '@rneui/themed';
import {getGameList} from '@services/api';
import logger from '@src/services/log';
import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import GameListSkeleton from '../GameListSkeleton';
import GameItem from './GameListItem';

const GameLists = ({gameType}: GameListProps) => {
  const [page, setPage] = useState<number>(0);
  const [maxPage, setMaxPage] = useState<number>(-1);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [gameList, setGameList] = useState<API.GameListItem[]>([]);

  async function loadData() {
    if (maxPage > 0 && page === maxPage) {
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

  const updateSearch = (_search: string) => {
    setSearch(_search);
  };

  const onSubmitSearch = () => {
    // TODO: search
    logger.log(search);
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
      <SearchBar
        round
        placeholder="搜索"
        cancelButtonTitle="取消"
        showLoading={loading} // 晚点可以专门的searchLoading
        value={search}
        onChangeText={updateSearch}
        lightTheme
        searchIcon={<Icon name="search" />}
        onSubmitEditing={onSubmitSearch}
      />
      <FlatList
        data={gameList}
        renderItem={({item}) => <GameItem data={item} />}
        keyExtractor={item => item.game_id.toString()}
        refreshing={loading}
        onRefresh={() => {
          setPage(0);
        }}
        onEndReached={listEndReach}
      />
    </View>
  );
};

export default GameLists;
