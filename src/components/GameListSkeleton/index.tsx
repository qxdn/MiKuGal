import {Skeleton} from '@rneui/themed';
import React from 'react';
import {ListItem} from '@rneui/base';
import {FlatList, View} from 'react-native';

const GameSkeleton = () => {
  return (
    <ListItem style={{marginBottom: 30, paddingBottom: 20}}>
      <View>
        <Skeleton />
      </View>
    </ListItem>
  );
};

const GameListSkeleton = ({repeat}: GameListSkeletonProps) => {
  let skeletons = [];
  for (let i = 0; i < repeat; i++) {
    skeletons.push(i);
  }

  return (
    <FlatList
      data={skeletons}
      renderItem={() => <GameSkeleton />}
      keyExtractor={index => index.toString()}
    />
  );
};

export default GameListSkeleton;
