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
import {Provider} from 'react-redux';
import store from '@src/reducers/store';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SafeAreaView style={{flex: 1}}>
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
        </ThemeProvider>
        <Toast />
      </Provider>
    </>
  );
}

export default App;
