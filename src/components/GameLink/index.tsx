import {Button, Text} from '@rneui/themed';
import React from 'react';
import {GameLinkProps} from './typings';
import {View} from 'react-native';
import {styles} from './styles';
import {getDownloadLink} from '@src/services/api';
import logger from '@src/services/log';

function limitIndex(index?: number): number {
  if (!index) {
    index = 0;
  } else {
    if (index > 1) {
      index = 1;
    }
    if (index < 0) {
      index = 0;
    }
  }
  return index;
}

const GameLink: React.FC<GameLinkProps> = ({
  title,
  id,
  type,
  password,
  note,
  index,
  split,
}) => {
  index = limitIndex(index);
  if (!split) {
    split = ',';
  }
  // TODO: onPress
  const onPress = async () => {
    const linkSrc: API.OneDriveUrl = await getDownloadLink(id, type);
    const links: string[] = linkSrc.src.split(split);
    // TODO: navigation
    logger.log(links[index]);
  };

  return (
    <View style={[styles.boderShader]}>
      <View style={[styles.linkTitleBase]}>
        <Text style={[styles.linkTitle]}>{title}</Text>
      </View>
      <View style={[styles.buttonView]}>
        <Button
          color="error"
          containerStyle={[styles.buttonContainer]}
          radius={7}
          onPress={onPress}>
          {'链接'}
        </Button>
      </View>
      <View style={[styles.noteContainer]}>
        <Text style={[styles.note]}>
          {'提取密码:'}
          <Text style={[styles.noteColor]}>{password}</Text>
        </Text>
        <Text style={[styles.note]}>
          {'备注:'}
          <Text style={[styles.noteColor]}>{note}</Text>
        </Text>
      </View>
    </View>
  );
};

export default GameLink;