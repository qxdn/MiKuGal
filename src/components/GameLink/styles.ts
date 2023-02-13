import {StyleSheet} from 'react-native';

const TITLE_SIZE = 15;

export const styles = StyleSheet.create({
  boderShader: {
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 1,
  },
  linkTitleBase: {
    justifyContent: 'flex-start',
    backgroundColor: '#4e8ac9',
  },
  linkTitle: {
    fontWeight: 'bold',
    color: '#FFFFFF',
    fontSize: TITLE_SIZE,
    marginLeft: 10,
  },
  buttonView: {
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 60,
    justifyContent: 'center',
  },
  buttonContainer: {width: 60, marginLeft: 15},
  noteContainer: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-evenly',
  },
  note: {
    marginLeft: 15,
  },
  noteColor: {
    color: '#f84a4b',
  },
});
