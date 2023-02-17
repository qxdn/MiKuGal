interface GameTypeEnum {
  readonly name: string;
  readonly list: string; // 游戏列表
  readonly label: string; // 后续补丁标签
  readonly webComment: string; // 网站留言
  readonly update: string; //更新记录
  readonly random: string; // 随机游戏
  readonly topGame: string; //排行榜
  readonly details: string; // 游戏详情
  readonly downloadType: string; //下载类型
  readonly detailComment: string; // 游戏评论
  readonly search: string; // 搜索
  readonly vip: boolean;
}

type gameTypeProps = {
  name: string;
  list: string; // 游戏列表
  label: string; // 后续补丁标签
  webComment: string; // 网站留言
  update: string; //更新记录
  random: string; // 随机游戏
  topGame: string; //排行榜
  details: string; // 游戏详情
  downloadType: string; //下载类型
  detailComment: string; // 游戏评论
  search: string; // 搜索
  readonly vip: boolean;
};
