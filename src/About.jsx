import React,{useState} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, ImageBackground } from 'react-native';
import Bg from '../images/bg1.jpg';
import { Titulo,FotoPerfil,BtnA,BtnLogOut } from '../styles/GlobaStyles';
import * as ImagePicker from 'expo-image-picker';

export const About=(props)=>{
  
  const [image, setImage] = useState('');

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    setImage( pickerResult.uri );
    console.log(image)
  }

  let openCameraPickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    setImage(pickerResult.uri);
    console.log(pickerResult)
  }
  return(
    <ImageBackground source={Bg} resizeMode="cover" style={styles.image}>
    <Text onPress={()=>{props.onChange()}}>SingnOut</Text>
    <FotoPerfil >
    <Image
          source={{uri:image}}
          style={styles.thumbnail}
        />
      
    </FotoPerfil>
    <Titulo>Arturo Reygadas</Titulo>
    <Titulo>IDGS10C</Titulo>
    <Titulo>130349</Titulo>
    <Titulo>Desarrollo Movil Integral</Titulo>
    <BtnA onPress={openImagePickerAsync}>Galeria</BtnA>
    <BtnA onPress={openCameraPickerAsync}>Camara</BtnA>
    <StatusBar style="auto" />
  
    </ImageBackground>
  )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },  image: {
      flex: 1,
      justifyContent: "center"
    },  thumbnail: {
      width: 150,
      height: 150,
      borderRadius:90,
    }
  });