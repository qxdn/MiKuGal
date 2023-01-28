import React from 'react';
import {Icon, Tab, TabView, Text} from '@rneui/themed';
import router from '@configs/router';

const GamesScreen = () => {
  const [index, setIndex] = React.useState<number>(0);
  let gameRouters = router.GameTab;
  let tabItems = [];
  let tabViewItems = [];
  for (let i in gameRouters) {
    let route = gameRouters[i];
    tabItems.push(
      <Tab.Item
        key={i}
        title={route.title}
        icon={<Icon name={route.icon} />}
      />,
    );
    tabViewItems.push(
      <TabView.Item key={i}>
        <Text>{route.title}</Text>
      </TabView.Item>,
    );
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
