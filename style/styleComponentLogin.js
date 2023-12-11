import {StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
      flex: 1
  
    },
    input: {
      //borderColor: "#000000",
      //borderBottomWidth: 1,
      marginBottom: 20,
      backgroundColor: '#edeef2',
      fontSize: 16,
      padding: 13,
      paddingLeft: 19,
      borderRadius: 15,
    },
    image: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems:"center",
      backgroundColor:"#fff"
    },
    text: {
      color: "white",
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      backgroundColor: "#000000c0"
    },
    connexion: {
      alignItems: "center",
      backgroundColor: "#4d90fe",
      padding: 10,
      width:'90%',
      justifyContent:"center",
      borderRadius:20,
      fontWeight:"bold"
    },
    inscription: {
      alignItems: "center",
      backgroundColor: "#ff914c",
      padding: 10,
      width:'90%',
      justifyContent:"center",
      marginTop:10,
      borderRadius:20
    },
    countContainer: {
      alignItems: "center",
      padding: 10
    },
    signContainer:{
  
      alignItems: "center",
      justifyContent:"center",
      paddingBottom:20,
      paddingTop:40,
      backgroundColor:'#ffff',
      width:'100%',
      opacity:0.9  ,
      flex:1
    },
    text_connexion:{
      color:'white',
      fontWeight:"bold",
      padding:4,
      fontSize:16
  
    },
    text_inscription:{
      color:'black',
      fontWeight:"bold",
      padding:4,
      fontSize:16
  
    }
  });