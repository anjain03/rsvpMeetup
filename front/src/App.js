import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigator from './navigation/DrawerNavigator';
import { Root } from 'native-base';
import { StatusBar } from 'react-native';

export default function App() {
  return (
    <Root>
    <StatusBar backgroundColor="#307ecc" barStyle={"light-content"} />
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
    </Root>
  );
}
