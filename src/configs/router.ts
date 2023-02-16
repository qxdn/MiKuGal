import GameType from '@src/enums/gametype';

// TODO: 晚点改成require 动态生成
const router = {
  GameTab: [
    {
      title: 'Galgame区',
      icon: 'home',
      type: GameType.Galgame,
      vip: false,
    },
    {
      title: 'KRKR专区',
      icon: 'phone',
      type: GameType.KrKr,
      vip: false,
    },
    {
      title: 'RPG游戏',
      icon: 'atom',
      type: GameType.RPG,
      vip: false,
    },
    {
      title: '福利区',
      icon: 'gamepad',
      type: GameType.VR,
      vip: true,
    },
    {
      title: '本子区',
      icon: 'gift',
      type: GameType.EX,
      vip: true,
    },
    {
      title: '轻小说区',
      icon: 'book',
      type: GameType.Book,
      vip: true,
    },
  ],
};

export default router;
