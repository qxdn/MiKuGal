import {TextProps} from '@rneui/base';

export interface GameLinkProps extends TextProps {
  title: string;
  id: number; // game id
  type: GameTypeEnum;
  password?: string;
  note?: string;
  index?: number;
  split?: string;
}
