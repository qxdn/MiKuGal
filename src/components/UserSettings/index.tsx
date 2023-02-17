import {Avatar, Badge, Button, Card} from '@rneui/themed';
import {selectUser, logout} from '@src/reducers/UserReducer';
import {getAvatarUrl} from '@src/services/api';
import React from 'react';
import {ScrollView, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {clearLoginUser} from '@src/services/token';
import logger from '@src/services/log';

const UserSettings: React.FC = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const userLogOut = async () => {
    // 清理token和登陆状态
    await clearLoginUser();
    // logout
    dispatch(logout());
  };

  return (
    <ScrollView>
      <Card>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.4, alignItems: 'center'}}>
            <Avatar
              rounded
              source={{uri: getAvatarUrl(user.avatar)}}
              size={70}
            />
          </View>
          <View style={{alignItems: 'flex-start'}}>
            <View style={{flexDirection: 'row'}}>
              <Card.Title>{user.nickname}</Card.Title>
              {user.vip && <Badge value="VIP" />}
            </View>
            <View>
              <Card.Title>{'硬币:' + user.coins}</Card.Title>
            </View>
          </View>
        </View>
        <Button color="error" onPress={userLogOut}>
          {'登出'}
        </Button>
      </Card>
    </ScrollView>
  );
};

export default UserSettings;
