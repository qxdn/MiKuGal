import React, {useState} from 'react';
import {Button, Card, Icon, Input} from '@rneui/themed';
import {View} from 'react-native';
import logger from '@src/services/log';
import {sign} from '@src/services/api';
import {useDispatch} from 'react-redux';
import {login} from '@src/reducers/UserReducer';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const dispatch = useDispatch();

  const submit = async () => {
    let result = await sign(email, password);
    dispatch(
      login({
        nickname: result.nickname,
        avatar: result.ts,
        coins: result.jf,
        token: result.token,
        vip: result.vstatus,
      }),
    );
  };

  return (
    <View>
      <Card>
        <Input
          blurOnSubmit
          placeholder="邮箱"
          value={email}
          onChangeText={setEmail}
          leftIcon={<Icon name={'user'} />}
        />
        <Input
          blurOnSubmit
          placeholder="密码"
          value={password}
          onChangeText={setPassword}
          leftIcon={<Icon name={'lock'} />}
          secureTextEntry={true}
        />
        <Button title={'登陆'} color="error" radius="md" onPress={submit} />
      </Card>
    </View>
  );
};

export default LoginForm;
