function gameType(props: gameTypeProps): GameTypeEnum {
  return props;
}

const GameType = {
  Galgame: gameType({
    list: '/gameLists',
    label: 'galgame',
    webComment: '/getliuyan',
    update: '/updatagame',
    random: '/randgame',
    topGame: '/topgame',
    details: '/details',
    downloadType: 'game',
    detailComment: '/gamebook',
  }),
  KrKr: gameType({
    list: '/krkrGameLists',
    label: 'krkr',
    webComment: '/krkrGetliuyan',
    update: '/krkrUpdatagame',
    random: '/krkrRandgame',
    topGame: '/krkrTopgame',
    details: '/krkrDetails',
    downloadType: 'krkr',
    detailComment: '/krkrGamebook',
  }),
  RPG: gameType({
    list: '/rpgGameLists',
    label: 'rpg',
    webComment: '/rpgGetliuyan',
    update: '/rpgUpdatagame',
    random: '/rpgRandgame',
    topGame: '/rpgTopgame',
    details: '/rpgDetails',
    downloadType: 'sstm',
    detailComment: '/rpgGamebook',
  }),
  VR: gameType({
    list: '/vrLists',
    label: '3d',
    webComment: '/vrGetliuyan',
    update: '/vrUpdatagame',
    random: '/vrRandgame',
    topGame: '/vrTopgame',
    details: '/vrDetails',
    downloadType: 'vr',
    detailComment: 'vrGamebook',
  }),
  EX: gameType({
    list: '/exLists',
    label: 'ex',
    webComment: '/exGetliuyan',
    update: '/exUpdatagame',
    random: '/exRandgame',
    topGame: '/exTopgame',
    details: '/vrDetails',
    downloadType: 'ex',
    detailComment: '/exGamebook',
  }),
  Book: gameType({
    list: '/bookLists',
    label: 'book',
    webComment: '/bookGetliuyan',
    update: '/bookUpdatagame',
    random: '/bookRandgame',
    topGame: '/bookTopgame',
    details: '/bookDetails',
    downloadType: 'book',
    detailComment: '/bookGamebook',
  }),
} as const;

export default GameType;
