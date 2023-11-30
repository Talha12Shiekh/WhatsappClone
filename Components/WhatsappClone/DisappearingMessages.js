import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { CHAT_BACKROUND_COLOR, CHAT_DATA_STATUS_COLOR } from './Variables'
import image from "./Images/dImage.png"

const DisappearingMessages = () => {
    
  return (
    <>
    <View style={styles.contianer}>
        <View style={styles.paddingHorizontal}>
        
      <Image resizeMode='cover' style={styles.image} source={image}/>
      <Text style={[styles.text,{fontWeight:"bold"}]}>Make messages in the chat disappear</Text>
      <Text style={styles.text}>For more privacy and storage new messages will disappear from this chat for everyone after the selected duration excpet when kep Anyone in the chat can change this setting </Text>
      </View>
      <View style={{height:1,backgroundColor:CHAT_DATA_STATUS_COLOR,marginTop:10}}/>
    </View>
    </>
  )
}

export default DisappearingMessages

const styles = StyleSheet.create({
    contianer:{
        flex:1,
        backgroundColor:CHAT_BACKROUND_COLOR,
    },
    text:{
        color:CHAT_DATA_STATUS_COLOR,
        marginBottom:5
    },
    paddingHorizontal:{
        paddingHorizontal:30
    },
    image:{
        width:300,
        height:300,
    }
})