import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert} from 'react-native';
import { Dimensions } from 'react-native';
import Geocoder from 'react-native-geocoding';


export default class Weather extends React.Component {
  
  render() {
    const {params}= this.props.navigation.state; 
    const weather = params?params.weather:null;  //Get the data which is passed as parameter from previous screen
    if(weather.cod === 200){
      return (
         <View style = {styles.container}>
            <Text style = {{fontSize:18, margin:'4%', textAlign:'center'}}>Weather of {weather.name}</Text>
            <Text style = {styles.text}>Latitude : {weather.coord.lat}  {'\n'}Longitude : {weather.coord.lon}</Text>
            <Text style = {styles.text}>Temperature : {weather.main.temp}℃  {'\n'}humidity : {weather.main.humidity}%</Text>
            <Text style = {styles.text}>Weather Type : {weather.weather[0].main}</Text>
            <Text style = {styles.text}>Clouds : {weather.clouds.all}%</Text>
         </View>
      )
    }
    else{
       return (
         <View style = {styles.container}>
            <Text style = {{fontSize:18, margin:'4%', textAlign:'center'}}>Error : {weather.cod}</Text>
             <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () =>{this.props.navigation.goBack();}
               }>
               <Text style = {styles.submitButtonText}> Go Back</Text>
            </TouchableOpacity>
         </View>
      )
     }
  }
}  

const styles = StyleSheet.create({
   container: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
      marginTop:'15%',
   },
   text:{
      fontSize:18,
      textAlign:'left',
      margin:'4%'
   },
   submitButton: {
      backgroundColor: '#463529',
      padding:8,
      margin: "4%",
      height: 50,
      alignItems: 'center',
      borderRadius:15
   },
   submitButtonText:{
      color: 'white',
      fontSize:20
   }
})