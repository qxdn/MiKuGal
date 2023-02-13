import React from 'react';
import {NoteProps, NoteTypes} from './typings';
import {View} from 'react-native';
import {Text, Icon} from '@rneui/themed';
import {styles} from './styles';

function isString(child?: any): child is string {
  return typeof child === 'string';
}

function convertColor(color: NoteTypes) {
  let _color = '#17a8e3';
  let alpha = '0C';
  switch (color) {
    case 'success':
      _color = '#2ec946';
      break;
    case 'info':
      _color = '#17a8e3';
      break;
    case 'warn':
      _color = '#ffba00';
      break;
    case 'error':
      _color = '#ff3838';
      break;
  }
  return {color: _color, backGroundColor: _color + alpha};
}

const Note: React.FunctionComponent<NoteProps> = ({
  type,
  icon,
  title,
  childStyles,
  ...props
}) => {
  const {color, backGroundColor} = convertColor(type);

  const renderChild = (
    child?:
      | string
      | number
      | boolean
      | JSX.Element
      | React.ReactFragment
      | null
      | undefined,
  ) => {
    if (isString(child)) {
      return <Text style={[{textAlign: 'center'}, childStyles]}>{child}</Text>;
    } else {
      return <View>{child}</View>;
    }
  };

  return (
    <View
      style={[
        styles.base,
        styles.leadingBorder,
        {borderLeftColor: color, backgroundColor: backGroundColor},
      ]}>
      <View>
        <View style={{flexDirection: 'row', alignItems: 'baseline'}}>
          {icon && <Icon name={icon} size={24} color={color} />}
          {title && (
            <Text h4 style={[{color: color}, {marginLeft: 10}]}>
              {title}
            </Text>
          )}
        </View>
        {renderChild(props.children)}
      </View>
    </View>
  );
};

export default Note;
