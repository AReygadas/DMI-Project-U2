import React,{useState} from "react";
import { Tab, TabView } from 'react-native-elements';
import { Text,StyleSheet } from "react-native";
import { TabContainer,Cristal } from "../styles/GlobaStyles";

export const Shop =()=>{
    const [index, setIndex] = useState(0);
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
          title="X-Box"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'logo-xbox', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Play Station"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'logo-playstation', type: 'ionicon', color: 'white' }}
        />
        <Tab.Item
          title="Ammibo"
          titleStyle={{ fontSize: 12 }}
          icon={{ name: 'logo-octocat', type: 'ionicon', color: 'white' }}
        />
      </Tab>

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ backgroundColor: 'transparent', width: '100%' }}>
          <Cristal></Cristal>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'transparent', width: '100%' }}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{ backgroundColor: 'transparent', width: '100%' }}>
          <Text h1>Cart</Text>
        </TabView.Item>
      </TabView>

</TabContainer>
    )

}