import {StyleSheet} from 'react-native';
export const BORDER_RADIUS = 6;
export const BORDER_LEFT_WIDTH = 5;
export const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: BORDER_RADIUS,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: BORDER_LEFT_WIDTH + 5,
  },
  leadingBorder: {
    borderLeftWidth: BORDER_LEFT_WIDTH,
    borderLeftColor: '#D8D8D8',
  },
  titleSize: {
    fontSize: 18,
  },
  titleBase: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
});
