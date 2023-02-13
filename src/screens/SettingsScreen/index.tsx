import React from 'react';
import {Button, Card, Input, Icon, Text} from '@rneui/themed';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from '@src/reducers/UserReducer';
import LoginForm from '@src/components/LoginForm';

const SettingsScreen = () => {
  const user = useSelector(selectUser);

  if (!user.isLogin) {
    return <LoginForm />;
  } else {
    return (
      <View>
        <Button>{'aaa'}</Button>
      </View>
    );
  }
};

export default SettingsScreen;
