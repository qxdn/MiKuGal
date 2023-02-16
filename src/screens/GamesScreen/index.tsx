import React from 'react';
import {Tab, TabView} from '@rneui/themed';
import GameLists from '@components/GameLists/index';
import router from '@configs/router';
import styles from './styles';
import {useSelector} from 'react-redux';
import {selectUser} from '@src/reducers/UserReducer';

const GamesScreen = () => {
  const [index, setIndex] = React.useState<number>(0);
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
          <GameLists gameType={route.type} />
        </TabView.Item>,
      );
    }
  }

  const onIndexChange = (value: number) => {
    setIndex(value);
  };

  return (
    <>
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
