
import 'react-native-gesture-handler';

import {Text,LogBox} from 'react-native'
import React, { useEffect, useState } from 'react'
import  {auth}  from './src/firebase/config'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import RegistrationScreen from "./src/screen/auth/Registration"
import LoginScreen from "./src/screen/auth/LoginScreen"
import HomeScreen from "./src/screen/HomeScreen"

LogBox.ignoreLogs([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
]);


const StackAuth = createStackNavigator();
const AppStack = createStackNavigator();


export default function App() {
  const [user, setUser] = useState(null)
  const [Loading, setLoading] = useState(true);

  useEffect(() => {

    const unsubscribeAuth = auth.onAuthStateChanged(async authUser => {
      try {
        await (authUser ? setUser(authUser) : setUser(null));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    });
    
    return unsubscribeAuth;
  }, []);
 
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setLoading(false);
  //     if (user) {
  //       setCurrUser(user);
  //     }
  //   });
  //   return () => unsubscribe();
  // }, []);

  if (Loading) {
    return <Text>Loading...</Text>;
  }
  const AppHome = () => {
    return (
      <AppStack.Navigator>
        <AppStack.Screen name='Home'component={HomeScreen}/>
        
      </AppStack.Navigator>
    )
  }

  const Auth =()=>{
    return(

      <StackAuth.Navigator>
      <StackAuth.Screen name='Login'component={LoginScreen}/>
      <StackAuth.Screen name='Registration'component={RegistrationScreen}/>
      </StackAuth.Navigator>
  
    )
   

  }
  return (
    
<NavigationContainer>
{user ? <AppHome/> : <Auth/>}

</NavigationContainer>
  )
} 