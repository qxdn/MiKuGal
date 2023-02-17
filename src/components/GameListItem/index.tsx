import React from 'react';
import {
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import styles from './styles';
import {Image, ListItem, Text, Card} from '@rneui/themed';
import {gameLabelConvert, getImageUrl} from '@src/services/api';
import logger from '@src/services/log';
import {useNavigation} from '@react-navigation/native';
import GameLabel from '@components/GameLabel';

const GameListItem: React.FunctionComponent<GameListItemProps> = ({
  data,
  type,
}) => {
  const navigation = useNavigation();
  // 转换图片url
  let imageUrl = getImageUrl(data.game_img);
  // 转换时间
  let createTime = new Date(data.game_create_time);
  // 标签
  let labels = gameLabelConvert(data.game_label);

  function enterGameDetail() {
    navigation.navigate('GameDetail', {
      id: data.game_id,
      type: type,
      name: data.game_name,
    });
  }

  const item = () => {
    return (
      <View style={[styles.article, styles.articleBody]}>
        <View style={styles.dataArticle}>
          <Text style={styles.dataClassMonth}>
            {createTime.getMonth() + 1 + '月'}
          </Text>
          <Text style={styles.dataClassDay}>{createTime.getDay() + 1}</Text>
        </View>
        <View style={styles.articleContainer}>
          <ListItem.Title style={{marginTop: 40, textAlign: 'center'}}>
            <Text h4 style={[styles.articleTitle]}>
              {data.game_name}
            </Text>
          </ListItem.Title>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 15,
            }}>
            <GameLabel text={labels.join(',')} iconName="tags" />
            <GameLabel text={data.game_count} iconName="eye" />
            <GameLabel text={data.game_lys} iconName="comment-dots" />
          </View>
          <ListItem.Content>
            <View style={{width: '100%'}}>
              <Image
                resizeMode="contain"
                source={{uri: imageUrl}}
                containerStyle={styles.imageContainerStyle}
                transition
                //PlaceholderContent={<ActivityIndicator />} // placeholder要改
              />
            </View>
          </ListItem.Content>
        </View>
      </View>
    );
  };

  const renderData = () => {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback onPress={enterGameDetail}>
          {item()}
        </TouchableNativeFeedback>
      );
    }
    return (
      <TouchableOpacity onPress={enterGameDetail}>{item()}</TouchableOpacity>
    );
  };

  return <ListItem>{renderData()}</ListItem>;
};

export default GameListItem;
