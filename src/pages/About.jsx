import React,{useState,useEffect} from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, ImageBackground } from 'react-native';
import Bg from '../images/bg1.jpg';
import { Titulo2, Titulo,FotoPerfil,BtnA,BtnLogOut } from '../styles/GlobaStyles';
import * as ImagePicker from 'expo-image-picker';
import {fd, st, auth} from '../../firebase'

export const About=(props)=>{
  const [item, setItem] = useState([]);
  const [image, setImage] = useState('');


useEffect(() => {
 var userL = auth.currentUser.uid; 
  fd.collection("perfiles")
   .where("user","==",userL)
   .onSnapshot((querySnapshot) => {
     const items = [];
     querySnapshot.docs.forEach((doc) => {
      const {avatar, correo, nombre, telefono } = doc.data();
      items.push({
        id: doc.id,
        avatar,
        correo,
        nombre,
        telefono,
       });
     });
     setItem(items);
   });
},[])


  const handleUpdate = async (p,ava) => {
    const userRef = fd.collection("perfiles").doc(p.id);
    await userRef.set({
      avatar:ava,
      correo:p.correo,
      nombre:p.nombre,
      telefono:p.telefono,
      user:auth.currentUser.uid
    });
    useEffect()    
  };


  let openImagePickerAsync = async (p) => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    const res = await uploadImage(pickerResult.uri,"avatars", auth.currentUser.uid)
    
    handleUpdate(p,res.url)
  }


  let openCameraPickerAsync = async (p) => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchCameraAsync();
    const res = await uploadImage(pickerResult.uri,"avatars", auth.currentUser.uid)
    setImage(res.url)
    handleUpdate(p,res.url)
  }
 
const fileToBlob = async(path)=>{
  const file = await fetch(path)
  const blob = await file.blob()
  return blob
}

const uploadImage = async(image, path, name)=>{
    const result = {statusResponse: false, error: null, url:null}
    const ref = st.ref(path).child(name)
    const blob = await fileToBlob(image)
    try{
        await ref.put(blob)
        const url = await st.ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse =true
        result.url = url
    }catch(error){
        result.error = error
    }
    return result
}


    
  return(
    <ImageBackground source={Bg} resizeMode="cover" style={styles.image}>
   
      
       {item.map((p)=>  {
     
         return(
           <>
          <FotoPerfil >
            <Image
              source={{uri:p.avatar}}
              style={styles.thumbnail}
            />
          </FotoPerfil>
          <BtnA onPress={()=>openImagePickerAsync(p)}>Galeria</BtnA>
          <BtnA onPress={()=>openCameraPickerAsync(p)}>Camara</BtnA>
          <Titulo2>{p.nombre}</Titulo2>
          <Titulo2>{p.correo}</Titulo2>
          <Titulo2>{p.telefono}</Titulo2>
           
          </>
         )
       })
      } 
    </ImageBackground>
  )
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },  
    image: {
      flex: 1,
      justifyContent: "center",
    },
    thumbnail: {
      width: 150,
      height: 150,
      borderRadius:90,
    },
  });