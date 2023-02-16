interface LoginUserState {
  nickname: string;
  avatar: string;
  coins: number;
  vip: boolean;
  token?: string;
}

interface UserState extends LoginUserState {
  isLogin: boolean;
}
