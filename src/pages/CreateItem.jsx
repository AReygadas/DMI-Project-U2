import React,{useState} from "react";
import { Text, ImageBackground, StyleSheet,Image } from "react-native";
import Bg2 from '../images/bg4.jpg'
import { Icon } from 'react-native-elements'
import {ImagePng, Contai,BtnB, ImageL} from '../styles/GlobaStyles'
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';

export const CreateItem=(props)=>{
    
    const [image, setImage] = useState('');
    const [val, setVal]=useState({
        ID:'',
        costo:'',
        descripcion:'',
        cantidad:0,
        img:'',      
      });

 //ACTUALIZANDO EL ESTADO
 const handleChangeState=(name, value)=>{
    setVal({...val, [name]: value})
  }   

//CUANDO ACTULIZA LA FOTO
  const handleUpdate = async (p,ava) => {
    const userRef = fd.collection("Items").doc(p.id);
    await userRef.set({
      avatar:ava,
      correo:p.correo,
      nombre:p.nombre,
      telefono:p.telefono,
      user:auth.currentUser.uid
    });
  //useEffect()    
  };

//CUANDO ABRIMOS LA GALERIA
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });        
    setImage(pickerResult.uri)
    
    //const res = await uploadImage(pickerResult.uri,"avatars", auth.currentUser.uid)
    //handleUpdate(p,res.url)
  }


  let openCameraPickerAsync = async () => {
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
        <ImageBackground source={Bg2} resizeMode="cover" style={styles.image}>                  
            <ImagePng>
            <Image style={{height:225, width:225}} source={{uri:image}} />
            </ImagePng>
            <Icon
              raised
              name='camera'
              type='font-awesome'
              color='#f50'
              title='Camera' 
              size= {39}
              style={{position:'absolute'}}
              onPress={()=>openCameraPickerAsync()}              
              />               

              <Icon
              raised
              name='image'
              type='font-awesome'
              color='#0044ff'
              title='Galery' 
              size= {39}
              onPress={()=>openImagePickerAsync()} />   
            
            <Contai 
                placeholderTextColor="gray" 
                placeholder="ID"
                style={styles.input}  onChangeText={(e)=>handleChangeState('costo', e)} 
            />

            <Contai 
                placeholderTextColor="gray" 
                placeholder="Costo"
                style={styles.input}  onChangeText={(e)=>handleChangeState('costo', e)} 
            />
        
            <Contai 
                placeholderTextColor="gray" 
                placeholder="Descripcion"
                style={styles.input}  onChangeText={(e)=>handleChangeState('costo', e)} 
            />        
        
            <Contai 
                placeholderTextColor="gray" 
                placeholder="cantidad"
                style={styles.input}  onChangeText={(e)=>handleChangeState('costo', e)} 
            />        
        
        <LinearGradient 
            colors={['#33ff55', '#077bbe','#192f6a'] }
            style={styles.gradient}
            start={{x: 0.0, y: 0.75}} end={{x: 0.5, y: 0.8}}
            locations={[0,0.5,1]}
          >
        <BtnB onPress={() => { props.onItem()}}>Agregar</BtnB>
        </LinearGradient>
        <LinearGradient 
            colors={['#ffad33', '#be5907','#c21515'] }
            style={styles.gradient}
            start={{x: 0.0, y: 0.75}} end={{x: 0.5, y: 0.8}}
            locations={[0,0.5,1]}
          >
        <BtnB onPress={() => { props.onItem()}}>Cancelar</BtnB>
        </LinearGradient>
        </ImageBackground>
    )

}
const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },  
    image: {
      flex: 1,
      display: 'flex',
      paddingTop: 55
    }, 
    input: {
          height: 40,
          width: '73%',
          marginTop: 60,
          borderWidth: 1,
          padding: 10,        
        },
          gradient:{
          margin: 20,
          width: 165,
          borderRadius:25,
          alignSelf:'center',          
        }, 
    });