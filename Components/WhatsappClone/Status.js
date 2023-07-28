import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from 'react';


const Status = ({setcurrentTabIndex,navigation}) => {
  const isFocused = useIsFocused()

    useEffect(() => {
      if(isFocused){
        setcurrentTabIndex(2);
      }
    },[isFocused])

  return (
    <View>
      <Text>Status</Text>
    </View>
  )
}

export default Status

const styles = StyleSheet.create({})