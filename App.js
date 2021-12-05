
import React from 'react';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SignIn } from './src/pages/Login';
import { SignUp } from './src/pages/SingUp';
import { Home } from './src/pages/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name='Login' component={SignIn} />
        <Stack.Screen options={{ headerShown: false }} name='SignUp' component={SignUp} />
        <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

//<Tab.Screen name="Items" >{(props) => <Componente{...props} items={items} />}</Tab,Screen>
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

