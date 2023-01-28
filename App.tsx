import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '@screens/HomeScreen/index';
import {ThemeProvider} from '@rneui/themed';
// TODO: 晚点统一放setting
import theme from '@configs/themes';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <HomeScreen />
      </NavigationContainer>
    </ThemeProvider>
  );
}

export default App;
