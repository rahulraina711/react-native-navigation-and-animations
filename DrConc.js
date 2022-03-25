import React from 'react';
import { View , Text , StyleSheet, Pressable } from 'react-native';
import { DrawerContentScrollView , DrawerItem } from '@react-navigation/drawer';

export default function DrawerContent ({props}) {

    const styles = StyleSheet.create({
        container: {
          padding: 10,
          borderWidth:2,borderColor:'red',
          position:'absolute',
          bottom:10,
        },
        
    });
    
    return(
        <View style={{flex:1 , borderWidth:2,borderColor:'black'}}>
            <DrawerContentScrollView {...props} style={{ borderWidth:2,borderColor:'red', position:'relative' }}>
                
                <DrawerItem 
                    label={()=><Text >Home</Text>}
                    
                    onPress = {()=>props.navigation.navigate('Home')}
                />
                <DrawerItem 
                    label={()=><Text >Notis</Text>}
                    
                    onPress = {()=>props.navigation.navigate('Notifications')}
                />
            </DrawerContentScrollView>     
            <View style={styles.container}>
                    <View>
                        <Pressable style={{fontSize:12 }} onPress={()=>props.logOut()}><Text>Log Out Now</Text></Pressable>
                    </View>
            </View>       
        </View>
    )
}