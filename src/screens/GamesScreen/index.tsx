import React, {useState} from 'react';
import {SearchBar, Tab, TabView} from '@rneui/themed';
import GameListsScreen from '../GameListScreen';
import router from '@configs/router';
import styles from './styles';
import {useSelector} from 'react-redux';
import {selectUser} from '@src/reducers/UserReducer';
import {View} from 'react-native';

const GamesScreen = ({navigation}) => {
  const [index, setIndex] = useState<number>(0);
  const [search, setSearch] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('搜索galgame');
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
    setPlaceholder('搜索' + gameRouters[value].type.name);
  };

  const onSubmitSearch = () => {
    setLoading(true);
    let type = gameRouters[index].type;
    navigation.navigate('SearchGame', {
      query: search,
      type: type,
    });
    setSearch('');
    setLoading(false);
  };

  const updateSearch = (_search: string) => {
    setSearch(_search);
  };

  return (
    <>
      <View>
        <SearchBar
          platform="ios"
          placeholder={placeholder}
          cancelButtonTitle="取消"
          showLoading={loading} // 晚点可以专门的searchLoading
          value={search}
          onChangeText={updateSearch}
          onSubmitEditing={onSubmitSearch}
        />
      </View>
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
