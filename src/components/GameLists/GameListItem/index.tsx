import React from 'react';
import {
  TouchableHighlight,
  TouchableNativeFeedback,
  ActivityIndicator,
  View,
} from 'react-native';
import styles from './styles';
import {Icon, Image, ListItem, Text, Card} from '@rneui/themed';
import {gameLabelConvert, getImageUrl} from '@src/services/api';
import logger from '@src/services/log';

const GameLabel = ({
  text,
  iconName,
}: {
  text: string | number;
  iconName: string;
}) => {
  return (
    <View style={styles.gameLabel}>
      <Icon
        name={iconName}
        size={styles.gameLabelText.fontSize}
        color={styles.gameLabelText.color}
      />
      <Text style={styles.gameLabelText}>{text}</Text>
    </View>
  );
};

const GameItem = ({data}: GameItemProps) => {
  // 转换图片url
  let imageUrl = getImageUrl(data.game_img);
  // 转换时间
  let createTime = new Date(data.game_create_time);
  // 标签
  let labels = gameLabelConvert(data.game_label);

  const renderData = () => {
    return (
      <ListItem>
        <TouchableHighlight>
          <TouchableNativeFeedback>
            <View style={[styles.article, styles.articleBody]}>
              <View style={styles.dataArticle}>
                <Text style={styles.dataClassMonth}>
                  {createTime.getMonth() + 1 + '月'}
                </Text>
                <Text style={styles.dataClassDay}>
                  {createTime.getDay() + 1}
                </Text>
              </View>
              <View style={styles.articleContainer}>
                <ListItem.Title style={{marginTop: 40, textAlign: 'center'}}>
                  <Card.Title h4 style={[styles.articleTitle]}>
                    {data.game_name}
                  </Card.Title>
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
                  <View>
                    <Image
                      resizeMode="center"
                      source={{uri: imageUrl}}
                      containerStyle={styles.imageContainerStyle}
                      transition
                      //PlaceholderContent={<ActivityIndicator />} // placeholder要改
                    />
                  </View>
                </ListItem.Content>
              </View>
            </View>
          </TouchableNativeFeedback>
        </TouchableHighlight>
      </ListItem>
    );
  };

  return renderData();
};

export default GameItem;
