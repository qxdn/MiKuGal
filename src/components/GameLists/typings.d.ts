import {FlatListProps} from 'react-native';

interface GameListProps extends FlatListProps {
  data: API.GameListItem[];
  gameType: GameTypeEnum;
}
