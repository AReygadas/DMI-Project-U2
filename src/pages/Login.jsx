import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ImageBackground,StyleSheet,Image } from "react-native";
import {  Titulo,InputA, BtnLog } from "../styles/GlobaStyles";
import { LinearGradient } from "expo-linear-gradient";
import {auth} from "../../firebase";
import Bg0 from '../images/bg0.jpg'
import Logo from '../images/ut0000.png'

export const SignIn = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
     
        navigation.navigate('Home')
      }
    })

    return unsubscribe
  }, [])

  const handleSignUp = () => {
    navigation.navigate('SignUp')
  }

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert(error.message))
  }


    return(
        <ImageBackground source={Bg0} resizeMode="cover" style={styles.image} blurRadius={1}>
        <Image
        style={styles.tinyLogo}
        source={Logo}
      />
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

      <LinearGradient 
        colors={['#33E6FF', '#3b5998', '#192f6a'] }
        style={styles.gradient}
        start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}}
        locations={[0,0.5,1]}
      >
        <BtnLog onPress={handleSignUp}>
          SingUp
        </BtnLog>
      </LinearGradient>
    </ImageBackground>
    )
}

const styles = StyleSheet.create({
    gradient:{
      margin: 20,
      width: 230,
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