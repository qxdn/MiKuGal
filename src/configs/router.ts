import GameType from '@src/enums/gametype';

// TODO: 晚点改成require 动态生成
export default {
  GameTab: [
    {
      title: 'Galgame区',
      icon: 'home',
      type: GameType.Galgame,
    },
    {
      title: 'KRKR专区',
      icon: 'phone',
      type: GameType.KrKr,
    },
    {
      title: 'RPG游戏',
      icon: 'atom',
      type: GameType.RPG,
    },
    {
      title: '福利区',
      icon: 'gamepad',
      type: GameType.VR,
    },
    {
      title: '本子区',
      icon: 'gift',
      type: GameType.EX,
    },
    {
      title: '轻小说区',
      icon: 'book',
      type: GameType.Book,
    },
  ],
};
