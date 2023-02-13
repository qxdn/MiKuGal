import {useFocusEffect} from '@react-navigation/native';
import GameDetail from '@src/components/GameDetail';
import logger from '@src/services/log';
import React from 'react';

const GameDetailScreen = ({route, navigation}) => {
  const {id, type, name} = route.params;
  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({title: name});
    }, [name, navigation]),
  );
  return <GameDetail id={id} type={type} />;
};

export default GameDetailScreen;
