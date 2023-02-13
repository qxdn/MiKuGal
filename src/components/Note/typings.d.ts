import {ViewProps} from 'react-native';
import {StyleProp} from 'react-native/Libraries/StyleSheet/StyleSheet';

export type NoteTypes = 'success' | 'info' | 'warn' | 'error';

export interface NoteProps extends ViewProps {
  type: NoteType;
  icon?: string;
  title?: string | JSX.Element;
  text?: string;
  childStyles?: StyleProp<TextStyle>;
}
