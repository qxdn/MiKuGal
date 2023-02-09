declare namespace API {
  type Response<T> = {
    code: number;
    msg: string;
    obj: T;
    wrap?: number; // obj为list时服务器总含量
  };
  type PageWrapper<T> = {
    obj: T;
    wrap: number;
  };
  type GameListItem = {
    game_id: number; //游戏id
    game_count: number; // 查看人的数量
    game_create_time: string; // "YYYY-MM-dd hh:mm:ss"
    game_img: string; // 封面 相对路径
    game_introduce: string; //介绍
    game_label: string; // 类型 ,分隔
    game_lys: number; // 留言数量
    game_name: string; //游戏名
  };
  type Sign = {
    token: string; // X-Auth-Token
    nickname: string; // 昵称
    vstatus: number; // vip status maybe boolean
    qs: number; // 不知道是什么 可能是指过了两个月
    ts: string; // 头像路径 不含只有文件名
    jf: number; // 这个应该是指硬币
  };
  type GlobalGameComment = {
    text: string; // 文本
    url: string; // 文本中的url
    create_time: string; // "YYYY-MM-dd hh:mm:ss"
    nickname: string; // 昵称
  };
  type LastUpdateGamePatch = {
    text: string; // 游戏文本
    url: string; //  游戏url https
    create_time: string; // "YYYY-MM-dd hh:mm:ss"
  };
  type LastUpdateGame = {
    game_create_time: string; // "YYYY-MM-dd hh:mm:ss"
    game_name: string; // 游戏名
    game_id: number; // 游戏id
  };
  /**
   * 网站右侧评论
   */
  type WebGameComment = {
    game_img: string; // null
    game_id: number; //
    game_content: string;
  };
  /**
   * 随机游戏
   */
  type RandomGame = {
    game_count: number; // 游戏查看数
    game_name: string; // 游戏名
    game_id: number; // 游戏id
  };
  type TopGame = {
    game_count: number; // 游戏查看数 疑似除10
    game_name: string; // 游戏名
    game_id: number; // 游戏id
  };

  type VIP = {
    nickname: string; // 昵称
    ts: string; // 头像url
    mos: number; // 时间戳 ms utc+8
    isCheck: boolean; // 这个是什么的check? 可能是手机号
    jf: number; // 这个应该是金币
  };

  type OneDriveUrl = {
    src: string; // 以,分隔
  };
}
