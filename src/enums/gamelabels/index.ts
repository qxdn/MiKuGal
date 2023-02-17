function gamelabel(id: number, name: string): GameLabelsType {
  return {id: id, name: name};
}

// TODO: 补全
const GameLabels: GameLabelsType[] = [
  gamelabel(1, '百合'),
  gamelabel(2, '悬疑'),
  gamelabel(3, 'ntr'),
  gamelabel(4, 'LOLI'),
  gamelabel(5, '伪娘'),
  gamelabel(6, '拔作'),
  gamelabel(7, '凌辱'),
  gamelabel(8, '纯爱'),
  gamelabel(9, '妹系'),
  gamelabel(10, '姐系'),
  gamelabel(11, '日常'),
  gamelabel(12, '猎奇'),
  gamelabel(13, '热血'),
  gamelabel(14, '机甲'),
  gamelabel(15, '战斗'),
  gamelabel(16, '校园'),
  gamelabel(17, '女主rpg'),
  gamelabel(20, 'act'),
  gamelabel(21, '同人'),
  gamelabel(25, 'slg'),
  gamelabel(28, '重口'),
  gamelabel(32, '全年龄'),
];

const id2nameMap: Record<number, string> = {};
const name2idMap: Record<string, number> = {};

GameLabels.forEach(item => {
  id2nameMap[item.id] = item.name;
  name2idMap[item.name] = item.id;
});

const DEFAULT_NAME = '未知';
const DEFAULT_ID = -1; // 这个应该用不到

export function id2name(id: number): string {
  let value = id2nameMap[id];
  return typeof value !== 'undefined' ? value : id.toString();
}

export function name2id(name: string): number {
  let value = name2idMap[name];
  return typeof value !== 'undefined' ? value : DEFAULT_ID;
}

export default GameLabels;
