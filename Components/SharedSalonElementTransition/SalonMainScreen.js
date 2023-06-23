import Salon from "./Salon";
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import SalonDetails from "./SalonDetails"

const Stack = createSharedElementStackNavigator();
import React from 'react'

const SalonMainScreen = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Salon"  screenOptions={{headerShown:false}}>
          <Stack.Screen name="Salon" component={Salon}/>
          <Stack.Screen name="SalonDetails" component={SalonDetails}
              sharedElements={(route, otherRoute, showing) => {
                const { item } = route.params;
                return [`item.${item.key}.photo`];
              }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default SalonMainScreen

