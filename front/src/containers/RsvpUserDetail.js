// Example of Infinite Loading Listview in React Native using FlatList
// https://aboutreact.com/infinite-list-view/

import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet,  Dimensions } from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import {View, Text, List, ListItem, Left, Body } from 'native-base';

import Loader from '../components/Loader';


import database from '@react-native-firebase/database';


const RsvpList = ({ route, navigation }) => {


  const [loading, setLoading]                 = useState(false); 
  const [dataSource, setDataSource]           = useState([]); 
  const { itemId }                            = route.params.params;

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {         
       getData(itemId);
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [itemId]);

  const getData = (itemId) => {
				
    setLoading(true);

    database()
    .ref('/rsvpUserRegistration/'+itemId)
    .once('value')
    .then(snapshot => {
    
        let data = snapshot.val() ? snapshot.val() : {};
        setDataSource(data);   
        setLoading(false);
    });

   
  };

  return (
	<SafeAreaView  style={{ flex : 1}}>
	  
	{ loading ? <Loader loading={loading} /> : (
		<View style={{ flex : 1,backgroundColor : '#fff'}}>      
      <List>
      <ListItem>
        <Left><Text>Name : </Text></Left>
        <Body><Text> {dataSource.user_name} </Text></Body>
      </ListItem>
      <ListItem>
        <Left><Text>Age : </Text></Left>
        <Body><Text> {dataSource.user_age} </Text></Body>
      </ListItem>
      <ListItem>
        <Left><Text>DOB : </Text></Left>
        <Body><Text> {dataSource.user_dob} </Text></Body>
      </ListItem>
      <ListItem>
      <Left><Text>Profession : </Text></Left>
      <Body><Text> {dataSource.user_profession} </Text></Body>
        </ListItem>
        <ListItem>
        <Left><Text>Locality : </Text></Left>
        <Body><Text> {dataSource.user_city} </Text></Body>
      </ListItem>
      <ListItem>
      <Left><Text>Number of guests : </Text></Left>
      <Body><Text> {dataSource.user_guest} </Text></Body>
    </ListItem>
        <ListItem>
        <Left><Text>Adress : </Text></Left>
        <Body><Text> {dataSource.user_address} </Text></Body>
        </ListItem>
      </List>
	  </View>
      )}
     </SafeAreaView>
   )

};



const styles = StyleSheet.create({
    flatlistFooter: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },   
    

})

export default RsvpList;