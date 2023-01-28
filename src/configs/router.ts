import GamesScreen from '@screens/GamesScreen';
import SettingsScreen from '@screens/SettingsScreen';

// TODO: 晚点改成require 动态生成
export default {
  HomeTab: [
    {
      name: 'game',
      title: '游戏',
      icon: 'home',
      component: GamesScreen,
    },
    {
      name: 'setting',
      title: '设置',
      icon: 'user',
      component: SettingsScreen,
    },
  ],
};
