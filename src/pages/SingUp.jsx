import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { ImageBackground,StyleSheet,Image,Text } from "react-native";
import {  Titulo,InputA, BtnLog } from "../styles/GlobaStyles";
import { LinearGradient } from "expo-linear-gradient";
import {auth,fd} from "../../firebase";
import Bg0 from '../images/24.jpg'
import Logo from '../images/ut0000.png'

export const SignUp = () => {

  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordC, setPasswordC] = useState('')
  const [pp, setPp] = useState(true)
  const [datos, setDatos] = useState({
      nombre:'',
      telefono:'',
      correo:'',
      avatar:''
  })  

  const handleChangeState=(name, value)=>{
    setDatos({...datos, [name]: value})
  }

  const handleSignUp = ()=>{
    console.log(datos,email,password,passwordC)     
    if(password===passwordC){
      auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
       // const user = userCredentials.user;
        handlePerfil()
      
      })
      .catch(error => alert(error.message))
    }else{
      setPp(false)
    }    
  }

  const handlePerfil=async()=>{
    console.log(auth.currentUser.uid)
    await fd.collection("perfiles").add({
      user: auth.currentUser.uid,
      nombre: datos.nombre,
      telefono: datos.telefono,
      correo: datos.correo,
      avatar:"sin avatar"
    });
   // console.log('Registered with:', user.email);
  }

  return(
    <ImageBackground source={Bg0} resizeMode="cover" style={styles.image} blurRadius={1}>
      <Image
       style={styles.tinyLogo}
       source={Logo}
      />
      <Titulo>SignUp</Titulo>
      <InputA value={datos.nombre} onChangeText={text=>handleChangeState('nombre', text)}
        placeholderTextColor="gray" 
        placeholder="Nombre"
      />
      <InputA value={email} onChangeText={(text)=>{handleChangeState('correo', text),setEmail(text)}}
        placeholderTextColor="gray" 
        placeholder="Correo"
      />
      <InputA value={datos.telefono} onChangeText={text=>handleChangeState('telefono', text)}
        placeholderTextColor="gray" 
        placeholder="Telefono"
      />
      <InputA  value={password} onChangeText={text=>setPassword(text)} 
        secureTextEntry={true} 
        placeholderTextColor="gray" 
        placeholder="Contraseña"
      />
      <InputA  value={passwordC} onChangeText={text=>setPasswordC(text)} 
        secureTextEntry={true} 
        placeholderTextColor="gray" 
        placeholder="Repite Contraseña"
      />
      {pp
       ?<Text></Text>
       :<Text style={{color:'red'}}>Las contraseñas no coinciden</Text>
      }
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
      width: 250,
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