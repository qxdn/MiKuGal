import React from 'react';
import {View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectUser} from '@src/reducers/UserReducer';
import LoginForm from '@src/components/LoginForm';
import UserSettings from '@src/components/UserSettings';

const SettingsScreen = () => {
  const user = useSelector(selectUser);

  if (!user.isLogin) {
    return <LoginForm />;
  } else {
    return (
      <View>
        <UserSettings />
      </View>
    );
  }
};

export default SettingsScreen;
