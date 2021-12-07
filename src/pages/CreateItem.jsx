import React,{useState,useEffect} from "react";
import {Text,View, Picker, ImageBackground, StyleSheet,Image } from "react-native";
import Bg2 from '../images/bg4.jpg'
import { Icon } from 'react-native-elements'
import {ImagePng, Contai,BtnB,Contenedor01, ImageL, VstPik} from '../styles/GlobaStyles'
import { LinearGradient } from "expo-linear-gradient";
import * as ImagePicker from 'expo-image-picker';
import {fd, st, auth} from '../../firebase'
import { BackgroundImage } from "react-native-elements/dist/config";

export const CreateItem=(props)=>{

    const [image, setImage] = useState('');
    const [val, setVal]=useState({
        ID:'',
        costo:'',
        descripcion:'',
        cantidad:'',
        img:'',  
        category:'consola',    
      });

          
useEffect(() => {  
console.log("Ptm")
   fd.collection("Items").where("ID","==",props.edi)
   .onSnapshot((querySnapshot) => {
     
     querySnapshot.docs.forEach((doc) => {
       console.log(doc)
       const { ID, cantidad, costo, descripcion, img, category } = doc.data();
       handleChangeState('ID',ID)
       handleChangeState('cantidad',cantidad)
       handleChangeState('costo',costo)
       handleChangeState('descripcion',descripcion)
       handleChangeState('img',img)    
     });
   });
   console.log(val);
 }, []);


  //ACTUALIZANDO EL ESTADO
 const handleChangeState=(name, value)=>{
    setVal({...val, [name]: value})
   
  }   

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
  setImage(pickerResult.uri);
}

//CUANDO ABRIMOS LA CAMRA
let openCameraPickerAsync = async () => {
  let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
  if (permissionResult.granted === false) {
     alert("Permission to access camera roll is required!");
     return;
  }
  let pickerResult = await ImagePicker.launchCameraAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });        
  setImage(pickerResult.uri);
}

//SUBIMOS LA IMAGEN AL STORAGE DE FIREBASE
const uploadImage = async(img, path, name)=>{
  console.log(img, path, name)
  const result = {statusResponse: false, error: null, url:null}
  console.log(1)
  const ref = st.ref(path).child(name)
  console.log(2)
  const blob = await fileToBlob(img)
  console.log(3)
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

//OBTIENE EL ARCHIVO DE LA URL Y LO PREPARA PARA SUBIRLO A FIREBASE
const fileToBlob = async(path)=>{
  const file = await fetch(path)
  const blob = await file.blob()
  return blob
}

//CQUANDO ACTULIZA LA FOTO
  const Createitem = async (ava) => {
    await fd.collection("Items").add({
      ID:val.ID,
      costo:val.costo,
      descripcion:val.descripcion,
      cantidad:val.cantidad,
      img:ava,
      category:val.category     
    });
  //useEffect()    
  };

  const handleGuardar= async()=>{
      try{        

        const res = await uploadImage(image,"Items", val.ID);
        Createitem(res.url);               
        setVal({
          ID:'',
          costo:'',
          descripcion:'',
          cantidad:'',
          img:'',      
        });
        setImage('');
      
      }catch(e){
        console.log()
      }
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
            <Contenedor01></Contenedor01>
            <Contai 
                placeholderTextColor="gray" 
                placeholder="ID"
                style={styles.input} value={val.ID} onChangeText={(e)=>handleChangeState('ID', e)} 
            />

            <Contai 
                placeholderTextColor="gray" 
                placeholder="Costo"
                style={styles.input}  value={val.costo} onChangeText={(e)=>handleChangeState('costo', e)} 
            />
        
            <Contai 
                placeholderTextColor="gray" 
                placeholder="Descripcion"
                style={styles.input}  value={val.descripcion} onChangeText={(e)=>handleChangeState('descripcion', e)} 
            />        
        
            <Contai 
                placeholderTextColor="gray" 
                placeholder="cantidad"
                style={styles.input}  value={val.cantidad} onChangeText={(e)=>handleChangeState('cantidad', e)} 
            />     

<VstPik>
<Picker

    onValueChange={(e)=>handleChangeState('category', e)}
    style={{backgroundColor:'red', height: 50, width: 200 }}
    itemStyle={{ backgroundColor: "grey", color: "blue", fontFamily:"Ebrima", fontSize:17 }}
>
<Picker.Item label="Consola" color="black" value="Consola" />
<Picker.Item label="Juego" color="black" value="Juego" />
<Picker.Item label="Ammibo" color="black" value="Ammibo" />
</Picker>
</VstPik>
   
        <LinearGradient 
            colors={['#33ff55', '#077bbe','#192f6a'] }
            style={styles.gradient}
            start={{x: 0.0, y: 0.75}} end={{x: 0.5, y: 0.8}}
            locations={[0,0.5,1]}
          >
        <BtnB onPress={() => handleGuardar()}>Agregar</BtnB>
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
          marginTop: 10,
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