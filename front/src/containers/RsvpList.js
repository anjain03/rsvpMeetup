// Example of Infinite Loading Listview in React Native using FlatList
// https://aboutreact.com/infinite-list-view/

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, RefreshControl, TextInput, Dimensions } from 'react-native';

import { responsiveHeight, responsiveWidth, responsiveFontSize} from 'react-native-responsive-dimensions';
import {View, Text } from 'native-base';

import Loader from '../components/Loader';
import { SearchBar } from 'react-native-elements';

import { TouchableOpacity } from 'react-native-gesture-handler';
import {Icon} from 'react-native-elements';

import database from '@react-native-firebase/database';


const RsvpList = ({ navigation }) => {

  const [firstLoading, setFirstLoading]       = useState(true);
  const [loading, setLoading]                 = useState(false);
  const [refreshing, setRefreshing]           = useState(false);
  const [searchLoader, setSearchLoader]       = useState(false);
  const [dataSource, setDataSource]           = useState([]); 
  const [fullDataSource, setFullDataSource]           = useState([]); 
  const [offset, setOffset]                   = useState(1);
  const [isListEnd, setIsListEnd]             = useState(false);
  const [message, setMessage] 	              = useState([]);  
  const [searchText, setSearchText] 			    = useState(null);  
  const [searchInputVal, setSearchInputVal] 	= useState('');  

  useEffect(() => {   
    getData();   
  }, []);  

  React.useEffect(() => {
    if (refreshing === true) {

        getData();
    }
  }, [refreshing]);
  
  const onRefresh = () => {
  
    //Clear old data of the list   
    setOffset(offset => 1);      
    setLoading(false);
    setRefreshing(true);
    //Call the Service to get the latest data   
  };

  const handleSearch = () => {      
    setSearchText(searchInputVal) ;
    searchFilterFunction(searchInputVal)
 }

 const handleSearchClear = () => {     
     setSearchInputVal('');
    setSearchText('')	

    searchFilterFunction('')
  }


  const searchFilterFunction = (text) => {
    // Check if searched text is not blank

    setSearchLoader(true);

    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = dataSource.filter(item => {      
        const itemData = `${item.user_name.toUpperCase()}   ${item.user_city.toUpperCase()}`;
        
         const textData = text.toUpperCase();
          
         return itemData.indexOf(textData) > -1;    
      });
      setDataSource(newData);
      setSearchLoader(false);
     // setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setDataSource(fullDataSource);
      setSearchLoader(false);
     // setSearch(text);
    }
  };


  const getData = () => {
				
    if (!loading && !isListEnd) {

   
   
      database().ref('/rsvpUserRegistration').on('value', querySnapShot => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};

          let wholeArray = Object.keys(data).map(key => {
            let newArray  =  data[key];
            newArray['Id']  = key;
            return newArray;
          });    
          
          setDataSource(wholeArray);
          setFullDataSource(wholeArray);
       
          setLoading(false);
         
          setFirstLoading(false);
      });
    }
  };

  const renderFooter = () => {
    return (
      // Footer View with Loader
      <View style={styles.flatlistFooter}>
        {loading ? (
          <ActivityIndicator
            color="white"
            style={{margin: 15}} />
        ) : null}
      </View>
    );
  };


 	const renderRow = ({item,index}) => {	  
		return (
      <View key={'rsvp-'+index} style={{flex : 1,  flexDirection: "row",  borderColor:'#e3e3e3',borderLeftWidth:1, borderRightWidth:1, borderTopWidth:1,  paddingHorizontal: responsiveWidth(2),  paddingVertical: responsiveHeight(2),    alignItems: "center",  backgroundColor: "#fff"  }}>
        <View style={{width : responsiveWidth(50)}}>
          <Text style={{ color:'#14171a',
          fontSize:responsiveFontSize(1.8),
          fontWeight:'900',  paddingLeft: responsiveHeight(2),}} numberOfLines={1}>{item.user_name}</Text>
        </View>
        <View  style={{width : responsiveWidth(30)}}>
          <Text numberOfLines={1}>{item.user_city}</Text>
        </View>
        <View  style={{width : responsiveWidth(20)}}>
        <TouchableOpacity      
            onPress={() => navigation.navigate('RsvpUserDetail', {
            screen	: 'ArticleDetail',           
            initial : false,		
            params	: {itemId: item.Id },   			
            })}
          >         
           <Icon name="streetview" type="FontAwesome" />
           </TouchableOpacity>      
        </View>
      </View>
		);
  };

  return (
	<SafeAreaView  style={{ flex : 1}}>
	  
	{ firstLoading ? <Loader loading={firstLoading} /> : (
		<View style={{ flex : 1,backgroundColor : '#fff'}}>      
      <View style={{alignItems:"center", marginTop:responsiveHeight(2)}}>
        <View style={{borderBottomWidth:0.5,  borderBottomColor:"#000", width:responsiveWidth(82),  flexDirection:"row",  alignItems:"center"}}>
              <TextInput 
                placeholder ='Search For...' 
                value={searchInputVal} 
                placeholderTextColor="#000" 
                onChangeText={(val) => setSearchInputVal(val)} 
                onSubmitEditing={() => handleSearch()}
                keyboardType={"default"} 
                returnKeyType="search"
                returnKeyLabel={"Search"}
                autoFocus={false}  
                style={{width:responsiveWidth(75)}}            
              />
              { searchText  != '' && searchText != null ?
              <TouchableOpacity onPress={() => handleSearchClear()}>
              <Icon name="close" type="FontAwesome" color={'#000'} size={22} />
              </TouchableOpacity>
              :
              <TouchableOpacity onPress={() => handleSearch()}>
              <Icon name="search" type="FontAwesome" color={'#000'} size={25} />
              </TouchableOpacity>
             }
          </View>
      </View>     
		   <View style={{flex : 1, paddingTop : responsiveHeight(2), justifyContent : 'center', alignItems : 'center' }}>
       { dataSource.length > 0 ?         
        <FlatList       
          key={1}
          data={dataSource}      
          keyExtractor={(item, index) => index.toString()}       
          renderItem={renderRow}        
          ListFooterComponent={renderFooter}
          refreshControl={
            <RefreshControl
                //refresh control used for the Pull to Refresh
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
          }     
          />
          : [
            ( searchLoader ? 
              <View key={'load-data'} style={{ paddingHorizontal : responsiveWidth(2.5),paddingVertical : responsiveHeight(5),justifyContent : 'center' }}>
              <Text style={{color : '#000',fontSize: responsiveFontSize(2),textAlign :'center'}}>Loading ...</Text>
            </View>
              : 
            <View key={'no-data'} style={{ paddingHorizontal : responsiveWidth(2.5),paddingVertical : responsiveHeight(5),justifyContent : 'center' }}>
            <Text style={{color : '#000',fontSize: responsiveFontSize(2),textAlign :'center'}}>No Record Found</Text>
          </View>
            )
          ]
         }
	      </View>
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