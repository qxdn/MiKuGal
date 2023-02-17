import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '@screens/HomeScreen/index';
import GameDetailScreen from '@screens/GameDetailScreen/index';
import {ThemeProvider} from '@rneui/themed';
// TODO: 晚点统一放setting
import theme from '@configs/themes';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider, useSelector} from 'react-redux';
import store from '@src/reducers/store';
import {selectLoading} from '@src/reducers/GlobalLoadingReducer';
import Spinner from 'react-native-loading-spinner-overlay/lib';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  const {loading} = useSelector(selectLoading);
  return (
    <>
      <ThemeProvider theme={theme}>
        <SafeAreaView
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1}}>
          <Spinner
            visible={loading}
            textContent="Loading..."
            textStyle={{color: '#FFFFFF'}}
          />
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{headerShown: false}}
              />
              <Stack.Screen name="GameDetail" component={GameDetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
        <Toast />
      </ThemeProvider>
    </>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
