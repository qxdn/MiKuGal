import React from 'react';
import {FlatList, View} from 'react-native';
import GameListItem from '@components/GameListItem';
import {GameListProps} from './typings';

const GameLists: React.FC<GameListProps> = ({data, gameType, ...props}) => {
  return (
    <View>
      <FlatList
        data={data}
        renderItem={({item}) => <GameListItem data={item} type={gameType} />}
        keyExtractor={item => item.game_id.toString()}
        {...props}
      />
    </View>
  );
};

export default GameLists;
