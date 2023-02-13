import React from 'react';
import {Icon, Text} from '@rneui/themed';
import {View} from 'react-native';
import styles from './styles';
import {GameLabelProps} from './typing';

const GameLabel: React.FC<GameLabelProps> = props => {
  const {text, iconName} = props;
  return (
    <View style={[styles.gameLabel, props.style]}>
      <Icon
        name={iconName}
        size={styles.gameLabelText.fontSize}
        color={styles.gameLabelText.color}
      />
      <Text style={styles.gameLabelText}>{text}</Text>
    </View>
  );
};

export default GameLabel;
