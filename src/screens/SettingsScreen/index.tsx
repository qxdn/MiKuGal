import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from '@src/reducers/UserReducer';
import LoginForm from '@src/components/LoginForm';
import UserSettings from '@src/components/UserSettings';

const SettingsScreen = () => {
  const user = useSelector(selectUser);

  const showSetting = () => {
    if (user.isLogin) {
      return <UserSettings />;
    } else {
      return <LoginForm />;
    }
  };

  return <View>{showSetting()}</View>;
};

export default SettingsScreen;
