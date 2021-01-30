import React from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert} from 'react-native';
import { Dimensions } from 'react-native';
import Geocoder from 'react-native-geocoding';


export default class Main extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      City:'',
      State:'',
      Country:'',
      location:'',
    }
  }

  // to know the location
  latlong = () => {
    const address = this.state.City +' , '+this.state.State +' , '+this.state.Country // concatenate city, state, country into one string
    // Initialize the module (needs to be done only once)
    Geocoder.init("AIzaSyBT2yAQ3xwRG6Z-x-E3VisLgbNdqiGVQa0", {language : "en"}); // use a valid API key & set the language
    
    // Search by address ang get location
    Geocoder.from(address)
    .then(json => {
      this.setState({location:json.results[0].geometry.location}) //update to a component state
    })
    .catch(error => console.warn(error));
    setTimeout(() => {this.weather();},1000) // setTimeout is used for delay , setState may take few milliseconds to update.
  }


  // to know the current weather
  weather = () => {
    // openweathermap api is used to get current weather detail
    fetch('http://api.openweathermap.org/data/2.5/weather?lat='+this.state.location.lat+'&lon='+this.state.location.lng+'&appid=cf94ba42c4190c8bf7df0b5637fa39a7&units=metric',{
          method:'get',
           headers: new Headers({
           'Accept':'application/json',
           'Content-Type':'application/json; charset=utf-8',
         }),
         }).then((response)=>response.json())
            .then((responseJson)=>{
              this.props.navigation.navigate('Weather',{weather:responseJson}) //navigate to Weather detail screen with parameter
            })
            .catch((error)=>{
             console.error(error); 
            });
  }



  render() {
      return (
         <View style = {styles.container}>
            <Text style = {{fontSize:18, margin:'4%', textAlign:'center'}}> Enter City, State and Country to know {'\n'} Weather of that location</Text>

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter City"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               onChangeText = {City=> this.setState({City})}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter State"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               onChangeText = {State=> this.setState({State})}/> 

            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Enter Country"
               placeholderTextColor = "#808080"
               autoCapitalize = "none"
               onChangeText = {Country=> this.setState({Country})}/> 

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.latlong()
               }>
               <Text style = {styles.submitButtonText}> Get Current Weather</Text>
            </TouchableOpacity>
         </View>
      )
   }
}


const styles = StyleSheet.create({
   container: {
      flex:1,
      width:Dimensions.get('window').width,
      height:Dimensions.get('window').height,
      marginTop:'15%'
   },
   input: {
      margin: "4%",
      height: 50,
      borderColor: '#341e11',
      borderWidth: 1,
      borderRadius: 15,
      color:'black',
      fontSize: 18,
      textAlign : 'center',
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