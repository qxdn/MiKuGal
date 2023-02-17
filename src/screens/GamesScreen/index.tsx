import React, {useState} from 'react';
import {SearchBar, Tab, TabView} from '@rneui/themed';
import GameListsScreen from '../GameListScreen';
import router from '@configs/router';
import styles from './styles';
import {useSelector} from 'react-redux';
import {selectUser} from '@src/reducers/UserReducer';
import GameType from '@src/enums/gametype';

const GamesScreen = ({navigation}) => {
  const [index, setIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const user = useSelector(selectUser);
  let gameRouters = router.GameTab;
  let tabItems = [];
  let tabViewItems = [];
  for (let i in gameRouters) {
    let route = gameRouters[i];
    if (!route.vip || user.isLogin) {
      tabItems.push(
        <Tab.Item
          key={i}
          title={route.title}
          //icon={<Icon name={route.icon} />} 不显示icon更好看
        />,
      );
      tabViewItems.push(
        <TabView.Item key={i} style={styles.TabViewItem}>
          <GameListsScreen gameType={route.type} />
        </TabView.Item>,
      );
    }
  }

  const onIndexChange = (value: number) => {
    setIndex(value);
  };

  const onSubmitSearch = () => {
    setLoading(true);
    navigation.navigate('SearchGame', {
      query: search,
      type: GameType.Galgame,
    });
    setSearch('');
    setLoading(false);
  };

  const updateSearch = (_search: string) => {
    setSearch(_search);
  };

  return (
    <>
      <SearchBar
        platform="ios"
        placeholder="搜索"
        cancelButtonTitle="取消"
        showLoading={loading} // 晚点可以专门的searchLoading
        value={search}
        onChangeText={updateSearch}
        onSubmitEditing={onSubmitSearch}
      />
      <Tab value={index} onChange={onIndexChange} scrollable>
        {tabItems}
      </Tab>
      <TabView value={index} onChange={onIndexChange}>
        {tabViewItems}
      </TabView>
    </>
  );
};

export default GamesScreen;
