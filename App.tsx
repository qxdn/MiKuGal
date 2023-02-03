import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '@screens/HomeScreen/index';
import {ThemeProvider} from '@rneui/themed';
// TODO: 晚点统一放setting
import theme from '@configs/themes';
import {SafeAreaView} from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

function App(): JSX.Element {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <SafeAreaView style={{flex: 1}}>
            <HomeScreen />
          </SafeAreaView>
        </NavigationContainer>
      </ThemeProvider>
      <Toast />
    </>
  );
}

export default App;
