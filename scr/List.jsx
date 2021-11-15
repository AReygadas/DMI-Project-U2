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
import Bg2 from '../images/bg2.jpg'
import { BtnB, Titulo,Contai, Container,BtnLogOut} from '../styles/GlobaStyles'
import {fd, db, auth} from '../../firebase'
import { ListItem, Icon } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";

export const Lista=(props)=>{

    const [val, setVal]=useState({
      user:'',
      desc:'',
      costo:'',      
    });
    const [item, setItem] = useState([]);
    
    const handleChangeState=(name, value)=>{
      setVal({...val, [name]: value})
    }

//
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
          });
          setVal({...val,costo:"",desc:""})
        } catch (error) {
          console.log(error)
        }
      }
    };

    const handleDelete= async(id)=>{
      const fdRef= fd.collection('gastos').doc(id);
      await fdRef.delete();
    }

 useEffect(() => {
  var userL = auth.currentUser.uid; 
  setVal({...val, 'user': userL}) 
  
   fd.collection("gastos")
   .where("user","==",userL)
   .onSnapshot((querySnapshot) => {
     const items = [];
     querySnapshot.docs.forEach((doc) => {
       const { user, desc, costo } = doc.data();
       items.push({
         id: doc.id,
         user,
         desc,
         costo,
       });
     });
     setItem(items);
   });
 }, []);
    
    return(
      <ImageBackground source={Bg2} resizeMode="cover" style={styles.image}>
        <ScrollView >
            <BtnLogOut onPress={()=>{props.onChange()}}>SingnOut</BtnLogOut>
            <Container style={styles.input} value={val.desc} onChangeText={(e)=>handleChangeState('desc', e)} />
            <Contai style={styles.input} value={val.costo} onChangeText={(e)=>handleChangeState('costo', e)} />
            <LinearGradient 
              colors={['#33ff55', '#077bbe','#192f6a'] }
              style={styles.gradient}
              start={{x: 0.0, y: 0.75}} end={{x: 0.5, y: 0.8}}
              locations={[0,0.5,1]}
              >
          <BtnB onPress={() => Createitem()}>Agregar</BtnB>
          </LinearGradient>
            <Titulo>Lista</Titulo>
          {item.map((p)=>  {
                return(
                  <ListItem key={p.id} bottomDivider>
                  
                  <ListItem.Content>
                    <ListItem.Title>{p.desc}</ListItem.Title>
                    <ListItem.Subtitle>${p.costo}pesos</ListItem.Subtitle>
                    
                  </ListItem.Content>
                  <Icon
                        raised
                        name='credit-card'
                        type='font-awesome'
                        color='#0581c9'
                        onPress={()=>alert("Pagado")}
                        />

                        <Icon
                        raised
                        name='delete'
                        type='material'
                        color='#c90505'
                        onPress={() => handleDelete(p.id)} />
                        
                </ListItem>    
                    )
                }
                )} 
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