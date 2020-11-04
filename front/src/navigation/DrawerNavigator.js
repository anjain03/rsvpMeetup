import 'react-native-gesture-handler';

import * as React from 'react';
import { Button, View, Text, TouchableOpacity, Image } from 'react-native';


import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator, HeaderBackButton  } from '@react-navigation/stack';

import RsvpList from '../containers/RsvpList';
import RsvpReport from '../containers/RsvpReport';
import RsvpForm from '../containers/RsvpForm';
import RsvpUserDetail from '../containers/RsvpUserDetail';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();


const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  

  return (
    <View style={{ flexDirection: 'row', padding : 5 }}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={(props.white) ? require('../assets/images/drawerWhite.png') :  require('../assets/images/drawer.png')}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
}

function RsvpFormStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="RsvpForm"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="RsvpForm"
        component={RsvpForm}
        options={{
			header: ()=> null,
		}}
      />
     
    </Stack.Navigator>
  );
}


function RsvpListStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="RsvpList"
      screenOptions={{ gestureEnabled: false,headerStyle:{backgroundColor: '#307ecc' },headerTintColor: '#fff', }}
    >
   
      <Stack.Screen
        name="RsvpList"
        component={RsvpList}
          options={{
            title: 'RSVP List',
            headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} white={true} />,
          
        }}
      />
      <Stack.Screen
      name="RsvpUserDetail"
      component={RsvpUserDetail}
        options={{
          title: 'RSVP User Detail',         
      }}
    />
    </Stack.Navigator>
  );
}


function RsvpReportStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Report"
      screenOptions={{ gestureEnabled: false,headerStyle:{backgroundColor: '#307ecc' },headerTintColor: '#fff', }}
    >      
	  <Stack.Screen
        name="RsvpReport"
        component={RsvpReport}
        options={{
        title: 'RSVP Report',
			  headerLeft: ()=> <NavigationDrawerStructure navigationProps={navigation} white={true} />,
		}}
      />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="RsvpFormDrawer">
      <Drawer.Screen
        name="RsvpFormDrawer"
        component={RsvpFormStack}
        options={{ drawerLabel: 'RsvpForm' }}
      />
      <Drawer.Screen
        name="RsvpListDrawer"
        component={RsvpListStack}
        options={{ drawerLabel: 'RSVP Users List' }}
      />
      <Drawer.Screen
        name="RsvpReportDrawer"
        component={RsvpReportStack}
        options={{ drawerLabel: 'Report' }}
      />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator