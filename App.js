import React, { useState } from 'react';
import {Dimensions, Button, View , Text , StatusBar, Animated } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DrawerContent from './DrConc';
import 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';

function Info({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Profile')}
        title="You Are In Info. Goto Profile"
      />
    </View>
  );
}

function Profile({ navigation }) {
  let {width} = Dimensions.get('window')
  let data = Array.from({length: 5}, () => {return {"text":"this is text"}})
  let item_width = 200;
  let animatedValue = React.useRef(new Animated.Value(0)).current;
  let spacer = (width-item_width)/2;
  
  return (
    <View style={{ 
      height:'100%',
      borderWidth:1,
      flexDirection:'column', 
      alignItems:'center'}}>
      
      <FlatList 
      contentContainerStyle={{alignItems:'center'}}
      scrollEventThrottle={16}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={[{text:""},...data,{text:""}]}
      snapToInterval={item_width}
      decelerationRate={0}
      bounces={false}
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: { x: animatedValue}}}],
        {useNativeDriver:false})}
      renderItem={({item , index})=>{
        if(item.text===""){
          return <View style={{width : spacer }}></View>
        }
        const inputRange = [
          (index-2)*item_width,
          (index-1)*item_width,
          index*item_width,
        ]
        const outputRange = [0.8,1.2,0.8]
      return(
      <Animated.View style={{
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        width:item_width,
        alignItems:'center',
        height:300,
        transform:[
          {
            perspective:400
          },
          {
            scale : animatedValue.interpolate({
              inputRange,
              outputRange
            })
          },
          {
            rotateY : animatedValue.interpolate({
              inputRange,
              outputRange : ['0deg','360deg','360deg']
            })
          }
      
        ]
        }}>
        <Text style={{
          textAlign:'center',
          color:'black', 
          paddingVertical:10 , 
          borderWidth:1,
          borderRadius:15, 
          width:'95%',
          flex:1
          }}>{item.text}</Text>
      </Animated.View>)
    } }
      keyExtractor={()=>Math.floor(Math.random()*100000)}
      />
    </View>
  );
}

function Login({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Root')}
        title="Log In"
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name='Info' component={Info} />
    </Stack.Navigator>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

function Logout(props) {
  React.useEffect(()=>{
    console.log(props)
    props.logOut()
  },[])
  return (
    <Text>
      Logging Out
    </Text>
  );
}

function Root ({navigation}){

  function logOut () {
    navigation.navigate('Login')
  }
  return (
    <Drawer.Navigator initialRouteName="Home" drawerContent={(props)=><DrawerContent props={{...props , logOut}}/>} >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="LogOut">{()=><Logout logOut={logOut} />}</Drawer.Screen>
     
    </Drawer.Navigator>
  )
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [user , setUser] = useState() ;
  
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name='Root' component={Root} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}