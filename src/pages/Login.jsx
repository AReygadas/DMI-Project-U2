import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ImageBackground,StyleSheet, Animated, Easing, Text} from "react-native";
import {  Titulo,InputA, BtnLog, Cristal,TextA,TextB,Footh,BtnGoogle } from "../styles/GlobaStyles";
import { LinearGradient } from "expo-linear-gradient";
import {auth} from "../../firebase";
import Bg0 from '../images/bg4.jpg'

export const SignIn = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [spinValue, setSpinValue] = React.useState(new Animated.Value(0))

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {     
        navigation.navigate('Home');
      }
    })
    return unsubscribe
  }, [])

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message));
  }

  const runAnimationFn = () => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 7000,
        easing: Easing.linear,
      })
    ).start()
  }

  React.useEffect(() => {
    runAnimationFn()
  }, [])

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  })


 
    return(
        <ImageBackground source={Bg0} resizeMode="cover" style={styles.image} blurRadius={1}>
         
        
         <Animated.Image
      style={{
        width: 170,
        alignSelf:'center',
        height: 170,
        transform: [{ rotateY: spin }],
      }}
      source={require("../images/3d3.png")}
    />

      <Cristal>
        <Titulo>SignIn</Titulo>
        <InputA  value={email} onChangeText={text=>setEmail(text)}
        placeholderTextColor="gray" 
        placeholder="Usuario"
        />
        <InputA  value={password} onChangeText={text=>setPassword(text)} 
        secureTextEntry={true} 
        placeholderTextColor="gray" 
        placeholder="Contraseña"
        />
        
        <LinearGradient 
        colors={['#33E6FF', '#3b5998', '#192f6a'] }
        style={styles.gradient}
        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
        locations={[0,0.5,1]}
        >
        <BtnLog onPress={handleLogin}>
         
      LogIn
      </BtnLog>
      </LinearGradient>
        

        <Footh>
        <TextA>Dont't have an account?</TextA><TextB onPress={handleSignUp}>Sign up</TextB>
        </Footh>
     
      </Cristal>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    gradient:{
      margin: 20,
      width: 190,
      borderRadius:25,
      alignSelf:'center',
      
    },  
    tinyLogo: {
      width: 300,
      height: 70,
      alignSelf:'center',
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },  
      image: {
      flex: 1,
      justifyContent: "center"
    }, 
      input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });