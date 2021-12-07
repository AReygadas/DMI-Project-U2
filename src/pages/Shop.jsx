import React,{useState,useEffect}from "react";
import { Text,StyleSheet, View } from "react-native";
import { TabContainer,Cristal } from "../styles/GlobaStyles";
import {fd, db,st, auth} from '../../firebase'
import { ListItem, Icon, Avatar , Tab, TabView  } from 'react-native-elements';
import { LinearGradient } from "expo-linear-gradient";

export const Shop =()=>{
    const [index, setIndex] = useState(0);
    const [item, setItem] = useState([]);
    const [val, setVal]=useState({
      user:'',
      desc:'',
      costo:'',
      status:false      
    });
    useEffect(() => {
      var userL = auth.currentUser.uid; 
      setVal({...val, 'user': userL}) 
      
       fd.collection("Items")
       .onSnapshot((querySnapshot) => {
         const items = [];
         querySnapshot.docs.forEach((doc) => {
           const { ID, cantidad, costo, descripcion, img, category } = doc.data();
           items.push({
             id: doc.id,
             ID,
             cantidad,
             costo,
             descripcion,
             img,
             category

           });
         });
         setItem(items);
       });
     }, []);
    return(

<TabContainer style={{color:"blue"}}>

<Tab
        value={index}
        onChange={(e) => setIndex(e)}
        indicatorStyle={{
          backgroundColor: 'white',
          height: 3,
        }}
        variant="primary"
      >
        <Tab.Item
          title="Consolas"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'logo-xbox', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Juegos"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'game-controller-outline', type: 'ionicon', color: 'white' }}
          
        />
        <Tab.Item
          title="Ammibo"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'logo-octocat', type: 'ionicon', color: 'white' }}
        />
      </Tab>


      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: 'transparent', width: '100%' }}>
          <View>

          {item.filter(item=>item.category =='Consola').map((p)=>  {
            console.log(p)
              return(
                <ListItem key={p.id} bottomDivider>
                   <Avatar size="xlarge" source={{uri: p.img}} />
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
                  onPress={()=>handleUpdate(p.id)}
                />
                    
                </ListItem>    
                )
              }
            )
          } 
          </View>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'transparent', width: '100%' }}>
        <View>

{item.filter(item=>item.category =='Juego').map((p)=>  {
  console.log(p)
    return(
      <ListItem key={p.id} bottomDivider>
         <Avatar   size="xlarge" source={{uri: p.img}} />
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
        onPress={()=>handleUpdate(p.id)}
      />

                       
      </ListItem>    
      )
    }
  )
} 
</View>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'transparent', width: '100%' }}>
        <View>

          {item.filter(item=>item.category =='Ammibo').map((p)=>  {
            console.log(p)
              return(
              <ListItem key={p.id} bottomDivider>
                   <Avatar   size="xlarge"  source={{uri: p.img}} />
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
                  onPress={()=>handleUpdate(p.id)}
                />
                  
                </ListItem>    
                )
              }
            )
          } 
          </View>
        </TabView.Item>
      </TabView>

</TabContainer>
    )

}