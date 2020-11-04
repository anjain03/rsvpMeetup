/* This is an Login Registration example from https://aboutreact.com/ */
/* https://aboutreact.com/react-native-login-and-signup/ */

//Import React and Hook we needed
import React, { useState , useRef } from 'react';
import DatePicker from 'react-native-datepicker';
import database from '@react-native-firebase/database';

//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import { Item, Picker } from 'native-base';


import Loader from '../components/Loader';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const RsvpForm = props => {
	
  let [userName, setUserName] 			= 	useState('');  
  let [userAge, setUserAge] 			= 	useState('');
  let [userDob, setUserDob] 			= 	useState(''); 
  let [profession, setProfession] 		= 	useState('');
  let [userCity, setUserCity] 			= 	useState('');
  let [userGuest, setUserGuest] 		= 	useState('');  
  let [userAddress, setUserAddress] 	= 	useState('');
  let [loading, setLoading] 			= 	useState(false);
  let [errortext, setErrortext] 		= 	useState('');

  let [userNameError, setUserNameError] 			= 	useState('');  
  let [userAgeError, setUserAgeError] 			= 	useState('');
  let [userDobError, setUserDobError] 			= 	useState(''); 
  let [professionError, setProfessionError] 		= 	useState('');
  let [userCityError, setUserCityError] 			= 	useState('');
  let [userGuestError, setUserGuestError] 		= 	useState('');  
  let [userAddressError, setUserAddressError] 	= 	useState('');

  
  const inputRef = useRef();
  const ageInputRef = useRef();
  const dobInputRef = useRef();
  const professionInputRef = useRef();
  const cityInputRef = useRef();
  const guestInputRef = useRef();
  const addressInputRef = useRef();
   
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  React.useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', () => {  
      setIsRegistraionSuccess(false)
      setUserName('');  
      setUserAge('');
      setUserDob('');
      setProfession('');
      setUserCity('');
      setUserGuest('');  
      setUserAddress('');
      setLoading(false);
      setErrortext('');
      setUserNameError('');
      setUserDobError('');
      setUserAgeError('');
      setProfessionError('');
      setUserCityError('');
      setUserGuestError('');
      setUserAddressError('');
    
    }); 

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);
  
   const _focusNextField = (nextField) => {
       // inputRef[nextField].focus()
    };

  const handleSubmitButton = () => {
  
    let errorFlag = false;

    setUserNameError('');
    setUserDobError('');
    setUserAgeError('');
    setProfessionError('');
    setUserCityError('');
    setUserGuestError('');
    setUserAddressError('');

    if(userName === '')
    {
      errorFlag = true;
      setUserNameError('This field is required.')
    }
    if(userDob === '')
    {
      errorFlag = true;
      setUserDobError('This field is required.')
    }
    if(userAge === '')
    {
      errorFlag = true;
      setUserAgeError('This field is required.')
    }
    else if(isNaN(userAge) === true)
    {
      errorFlag = true;
      setUserAgeError('Only numbers are allowed here.')
    }
    if(profession === '')
    {
      errorFlag = true;
      setProfessionError('This field is required.')
    }
    if(userCity === '')
    {
      errorFlag = true;
      setUserCityError('This field is required.')
    }
    if(userGuest === '')
    {
      errorFlag = true;
      setUserGuestError('This field is required.')
    }
    else if(isNaN(userGuest) === true)
    {
      errorFlag = true;
      setUserGuestError('Only numbers are allowed here.')
    }
    else if(userGuest > 2){
      errorFlag = true;
      setUserGuestError('Only 0 to 2 guests allowed.')
    }
    if(userAddress === '')
    {
      errorFlag = true;
      setUserAddressError('This field is required.')
    }
    else if(userAddress.length > 50){
      errorFlag = true;
      setUserAddressError('Maximum 50 characters allowed.')
    }


    if(errorFlag === false){

    setLoading(true);
    var dataToSend = {
      user_name: userName,
      user_dob: userDob,
      user_age: userAge,
	    user_profession: profession,
	    user_city: userCity,
	    user_guest: userGuest,
      user_address: userAddress,
    };
	
	
     database()
	  .ref('/rsvpUserRegistration')
	  .push(dataToSend)
      .then(responseJson => {
        //Hide Loader
        setLoading(false);
        console.log(responseJson);
        // If server response message same as Data Matched
        setIsRegistraionSuccess(true);
          console.log('Registration Successful. Please Login to proceed');
      })
      .catch(error => {
        //Hide Loader
        setLoading(false);
        console.error(error);
      });
    }
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        <Image
          source={require('../assets/images/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        />
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('RsvpListDrawer')}>
          <Text style={styles.buttonTextStyle}>Rsvp List</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  
  return (
    <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center', marginVertical : responsiveHeight(5) }}>
        <Text style={{alignSelf : 'center', fontSize : responsiveFontSize(2.8), color : '#fff'}}>React JS Meetup</Text>
          
        </View>
        <KeyboardAvoidingView enabled>
          <View style={styles.SectionStyle}>
        
            <TextInput
              value={userName} 
              style={styles.inputStyle}
              onChangeText={UserName => setUserName(UserName)}
              underlineColorAndroid="transparent"
              placeholder="Enter Name"
              placeholderTextColor="#000"
              autoCapitalize="sentences"
              returnKeyType="next"
			        ref={inputRef}            
              onSubmitEditing={() => _focusNextField('2')}
              blurOnSubmit={false}
            />
          </View>        
          {userNameError!= '' && <Text style={styles.errorTextStyle}>{ userNameError } </Text> }
          <View style={styles.SectionStyle}>
            <TextInput
             value={userAge} 
              style={styles.inputStyle}
              onChangeText={userAge => setUserAge(userAge)}
              underlineColorAndroid="transparent"
              placeholder="Enter Age"
              placeholderTextColor="#000"
              keyboardType="numeric"
              ref={ageInputRef}
              onSubmitEditing={() => _focusNextField('3')}
              blurOnSubmit={false}
            />
          </View>
          {userAgeError!= '' && <Text style={styles.errorTextStyle}>{ userAgeError } </Text> }
        <View style={styles.SectionStyle}>
        <View  style={styles.inputStyle}>
            <DatePicker
              style={{ width : responsiveWidth(82),}}
              ref={dobInputRef}		
              onSubmitEditing={() => _focusNextField('4')}
              date={userDob} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="Select DOB"
              format="DD-MM-YYYY"		
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  right: 0,
                  top: 1,
                  marginLeft: 50,
                  // alignSelf:"flex-end"
                },
                dateInput: {
                //  marginLeft: responsiveHeight(10),
                  borderColor:'#fff',
                  height : responsiveHeight(4)
                },
                placeholderText : {textAlign : 'left', alignSelf : 'flex-start',color : '#000'},
                dateText : {textAlign : 'left', alignSelf : 'flex-start',color : '#000'},
               
              }}
              onDateChange={(date) => {
                 setUserDob(date);
              }}
            />
      </View>
      
          </View>
          {userDobError!= '' && <Text style={styles.errorTextStyle}>{ userDobError } </Text> }
		    <View style={styles.SectionStyle}> 
			<View  style={styles.inputStyle}>
			<Picker
				ref={professionInputRef}
				style={{borderColor : 'red', borderWidth : 1, top:-4}}
			  selectedValue={profession}
			  onValueChange={currentProfession => setProfession(currentProfession)}
			  onSubmitEditing={() => _focusNextField('5')}
             
        >
        <Picker.Item label="Please Select Profession" value="" />
			  <Picker.Item label="Employed" value="Employed" />
			  <Picker.Item label="Student" value="Student" />			 
      </Picker>
   
      
      </View>
      
          </View>
          {professionError!= '' && <Text style={styles.errorTextStyle}>{ professionError } </Text> }
		    

          <View style={styles.SectionStyle}> 
            <View  style={styles.inputStyle}>
              <Picker
                ref={cityInputRef}
                style={{borderColor : 'red', borderWidth : 1, top:-4}}
              selectedValue={userCity}
              onValueChange={UserCity => setUserCity(UserCity)}
              onSubmitEditing={() => _focusNextField('5')}
                  
              >
              <Picker.Item label="Please Select Location" value="" />
              <Picker.Item label="Banglore" value="Banglore" />
              <Picker.Item label="Mumbai" value="Mumbai" />			 
              <Picker.Item label="Delhi" value="Delhi" />			 
              <Picker.Item label="Hyderabad" value="Hyderabad" />
              <Picker.Item label="Ahmedabad" value="Ahmedabad" />			 
              <Picker.Item label="Kolkata" value="Kolkata" />			
            </Picker>
            </View>
          </View>
          {userCityError!= '' && <Text style={styles.errorTextStyle}>{ userCityError } </Text> }
		      <View style={styles.SectionStyle}>
            <TextInput
              ref={guestInputRef} 
              value={userGuest} 
              style={styles.inputStyle}
              onChangeText={UserGuest => setUserGuest(UserGuest)}
              underlineColorAndroid="transparent"
              placeholder="Enter Number of Guests (0-2)"
              placeholderTextColor="#000"
              keyboardType="numeric"            
              returnKeyType="next"
              onSubmitEditing={() => _focusNextField('7')}
              blurOnSubmit={false}
            />
          </View>		  
          {userGuestError!= '' && <Text style={styles.errorTextStyle}>{ userGuestError } </Text> }
          <View style={styles.SectionStyle}>
            <TextInput
              ref={addressInputRef} 
              underlineColorAndroid="transparent"
              style={styles.inputStyle}
              onChangeText={UserAddress => setUserAddress(UserAddress)}
              value={userAddress} 
              placeholder="Enter Address"
              placeholderTextColor="#000"
              autoCapitalize="sentences"
			        multiline={true}
			        numberOfLines={1}             
              returnKeyType="next"
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
            
          </View>
          {userAddressError!= '' && <Text style={styles.errorTextStyle}>{ userAddressError } </Text> }
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RsvpForm;

const styles = StyleSheet.create({
  SectionStyle: {
    marginTop: 10,
    alignItems:"center",
    margin: 5,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: responsiveHeight(7),
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
    backgroundColor : '#fff',
    width:responsiveWidth(90),
    // paddingBottom:responsiveHeight(1)
  },
   textareaStyle: {
    flex: 1,
    color: '#000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'transparent',
	  backgroundColor : '#fff',	
    justifyContent: "flex-start",
    height:responsiveHeight(10)
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'left',
    fontSize: responsiveFontSize(1.6),
    borderColor : 'red',
    borderWidth : 0,
    marginLeft:responsiveWidth('8'),
    
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});