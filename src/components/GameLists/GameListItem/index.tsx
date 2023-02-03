import React from 'react';
import {
  FlatList,
  TouchableHighlight,
  TouchableNativeFeedback,
  ActivityIndicator,
  View,
} from 'react-native';
import styles from './styles';
import {Image, ListItem, Text} from '@rneui/themed';
import {getImageUrl} from '@src/services/api';
import logger from '@src/services/log';
import {color} from '@rneui/base';

const GameItem = ({data}: {data: API.GameListItem}) => {
  // 转换图片url
  let imageUrl = getImageUrl(data.game_img);
  // 转换时间
  let createTime = new Date(data.game_create_time);
  return (
    <ListItem>
      <TouchableHighlight>
        <TouchableNativeFeedback>
          <View style={[styles.article, styles.articleBody]}>
            <View style={styles.dataArticle}>
              <Text style={styles.dataClassMonth}>
                {createTime.getMonth() + 1 + '月'}
              </Text>
              <Text style={styles.dataClassDay}>{createTime.getDay() + 1}</Text>
            </View>
            <View style={styles.articleContainer}>
              <ListItem.Title style={{marginTop: 40}}>
                <Text h4>{data.game_name}</Text>
              </ListItem.Title>
              <ListItem.Subtitle>{data.game_label}</ListItem.Subtitle>
              <Image
                source={{uri: imageUrl}}
                containerStyle={{aspectRatio: 4 / 3, width: '100%'}}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
          </View>
        </TouchableNativeFeedback>
      </TouchableHighlight>
    </ListItem>
  );
};

const GameListItem = ({
  data,
  wrap,
}: {
  data: API.GameListItem[];
  wrap: number;
}) => {
  return (
    <FlatList
      data={data}
      renderItem={({item}) => <GameItem data={item} />}
      keyExtractor={item => item.game_id.toString()}
    />
  );
};

export default GameListItem;
