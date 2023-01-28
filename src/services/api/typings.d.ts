declare namespace API {
  type Response<T> = {
    code: number;
    msg: string;
    obj: T;
    wrapper?: number;
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
}
