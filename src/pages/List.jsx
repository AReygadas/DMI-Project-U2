import React,{useState,useEffect} from 'react'
import { useNavigation } from "@react-navigation/core";
import {ImageBackground, 
  Text, 
  StyleSheet, 
  Button, 
  View,
  TextInput,
  ScrollView,
}from 'react-native'
import Bg2 from '../images/bg5.png'
import { BtnB, Titulo,Contai, Container,BtnLogOut} from '../styles/GlobaStyles'
import {fd, db,st, auth} from '../../firebase'
import { ListItem, Icon, Avatar  } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";

export const Lista=(props)=>{

  const [item, setItem] = useState([]);
  const [val, setVal]=useState({
    user:'',
    desc:'',
    costo:'',
    status:false      
  });
  
  const handleChangeState=(name, value)=>{
    setVal({...val, [name]: value})
  
  }

  const Createitem =  async () => {
    if (val.desc === "") {
      alert("please provide a name");
    } else {
       try {
        console.log(val);
      //Guardar en bd
        // const Ref = db.ref("gastos")
        // Ref.push(val)
      // gusrdar en fireStore
        await fd.collection("gastos").add({
          user: val.user,
          desc: val.desc,
          costo: val.costo,
          status: false
        });
        setVal({...val,costo:"",desc:""})
      } catch (error) {
        console.log(error)
      }
    }
  };  
  
  const handleUpdate = async(id, p) => {
    

    const userRef = fd.collection("gastos").doc(id);
    await userRef.set({
      user:p.user,
      desc:p.desc,
      costo:p.costo,
      status: !p.status
    });
    useEffect()    
  };
  
  const handleDelete= async(id,nam)=>{
     const fdRef= fd.collection('Items').doc(id);
    await fdRef.delete();
    const ref = st.ref('Items').child(nam)
    await ref.delete()
  }

//  useEffect(() => {
//   var userL = auth.currentUser.uid; 
//   setVal({...val, 'user': userL}) 
  
//    fd.collection("Items")
//    .where("user","==",userL)
//    .onSnapshot((querySnapshot) => {
//      const items = [];
//      querySnapshot.docs.forEach((doc) => {
//        const { user, desc, costo,status } = doc.data();
//        items.push({
//          id: doc.id,
//          user,
//          desc,
//          costo,
//          status,
//        });
//      });
//      setItem(items);
//    });
//  }, []);
    
useEffect(() => {
  var userL = auth.currentUser.uid; 
  setVal({...val, 'user': userL}) 
  
   fd.collection("Items")
   .onSnapshot((querySnapshot) => {
     const items = [];
     querySnapshot.docs.forEach((doc) => {
       const { ID, cantidad, costo, descripcion, img } = doc.data();
       items.push({
         id: doc.id,
         ID,
         cantidad,
         costo,
         descripcion,
         img
       });
     });
     setItem(items);
   });
 }, []);

    return(
      <ImageBackground source={Bg2} resizeMode="cover" style={styles.image}>
        <ScrollView >
          <BtnLogOut onPress={()=>{props.onChange()}}>SingnOut</BtnLogOut>
              <LinearGradient 
            colors={['#33ff55', '#077bbe','#192f6a'] }
            style={styles.gradient}
            start={{x: 0.0, y: 0.75}} end={{x: 0.5, y: 0.8}}
            locations={[0,0.5,1]}
          >
            <BtnB onPress={() => { props.onItem()}}>Nuevo</BtnB>
          {/* <BtnB onPress={() => Createitem()}>Agregar</BtnB> */}
          </LinearGradient>
            <Titulo>Lista</Titulo>
          {item.map((p)=>  {
            console.log(p)
              return(
                <ListItem key={p.id} bottomDivider>
                   <Avatar  source={{uri: p.img}} />
                <ListItem.Content>
                  <ListItem.Title>{p.descripcion}</ListItem.Title>
                  <ListItem.Subtitle>${p.costo}pesos</ListItem.Subtitle>
                  <ListItem.Subtitle>Cantidad: {p.cantidad}</ListItem.Subtitle>
                </ListItem.Content>
            
                <Icon
                  raised
                  name='edit'
                  type='font-awesome'
                  color={true
                  ? '#49CA09'
                  : '#0581c9'
                  }
                  onPress={()=>props.edi(p.ID)}
                />

                <Icon
                  raised
                  name='delete'
                  type='material'
                  color='#c90505'
                  onPress={() => handleDelete(p.id,p.ID)} 
                />                      
                </ListItem>    
                )
              }
            )
          } 
        </ScrollView>
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
      justifyContent: "center"
    }, input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        
        }, gradient:{
          margin: 20,
          width: 165,
          borderRadius:25,
          alignSelf:'center',
          
        }, 
  });