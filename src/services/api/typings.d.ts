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
}
