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
      icon: 'user-circle',
      component: SettingsScreen,
    },
  ],
  GameTab: [
    {
      title: 'Galgame区',
      icon: 'home',
    },
    {
      title: 'KRKR专区',
      icon: 'phone',
    },
    {
      title: 'RPG游戏',
      icon: 'atom',
    },
    {
      title: '游戏区',
      icon: 'gamepad',
    },
    {
      title: '本子区',
      icon: 'gift',
    },
    {
      title: '轻小说区',
      icon: 'book',
    },
  ],
};
