import React, {ReactNode, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';
import GamesScreen from '../GamesScreen';
import SettingsScreen from '../SettingsScreen';
import {getLoginUser} from '@src/services/token';
import {useDispatch} from 'react-redux';
import {login} from '@src/reducers/UserReducer';

const HomeTab = [
  {
    name: 'game',
    title: '游戏',
    icon: 'home',
    component: GamesScreen,
  },
  {
    name: 'setting',
    title: '个人中心',
    icon: 'user-circle',
    component: SettingsScreen,
  },
];

const Tab = createBottomTabNavigator();
// tabBar icon setting
const TabBarIcon = (icon: string) => {
  return (props: {
    focused: boolean;
    color: string;
    size: number;
  }): ReactNode => {
    return <Icon name={icon} color={props.color} size={props.size} />;
  };
};

const HomeScreen = (): JSX.Element => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function getUser() {
      let user = await getLoginUser();
      if (user) {
        dispatch(login(user));
      }
    }
    getUser();
  }, [dispatch]);

  let homeRouter = HomeTab;
  const screens = [];

  for (let index in homeRouter) {
    let route = homeRouter[index];
    screens.push(
      <Tab.Screen
        name={route.name}
        component={route.component}
        options={{title: route.title, tabBarIcon: TabBarIcon(route.icon)}}
        key={index}
      />,
    );
  }
  const ScreenOptions = () => {
    return {
      headerShown: false,
      // TODO: late setting global
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    };
  };

  return <Tab.Navigator screenOptions={ScreenOptions}>{screens}</Tab.Navigator>;
};

export default HomeScreen;
