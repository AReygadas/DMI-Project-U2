
import React, {useState} from 'react';
import { useNavigation } from "@react-navigation/core";
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { About }from './About';
import { Lista } from './List';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { auth } from '../../firebase';



const Tab = createBottomTabNavigator();

export const Home =()=> {

  const navigation = useNavigation();
  const[lista, setLista]= useState([])
  
  const handleChange=(e)=>{
    setLista([...lista, e])
    console.log(lista)
  }

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate('Login');
      })
      .catch((error) => {
        alert(error.message);
      });
  };

    return (
    <NavigationContainer independent={true}>
        <Tab.Navigator screenOptions={({route})=>({
        tabBarIcon:({focused, color, size})=>{
          let iconName;
          if(route.name === "Lista"){
            iconName = focused
            ? "ios-send"
            : "ios-send-outline";

          }else if(route.name === "About"){
            iconName = "logo-octocat";
          }
          return<Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor:"blue",
        tabBarInactiveTintColor:"grey",
      })}>
        <Tab.Screen options={{ headerShown: false }} name="Lista" children={()=> <Lista onChange={handleSignOut} />}/>         
        <Tab.Screen options={{ headerShown: false }} name="About" children={()=> <About onChange={handleSignOut} />} /> 
              
      </Tab.Navigator>  
             
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

