import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useNavigation, useRoute,useFocusEffect } from "@react-navigation/native";

const Calls = ({setcurrentTabIndex}) => {
  useFocusEffect(() => {
    setcurrentTabIndex(3) 
  })
  return (
    <View>
      <Text>Calls</Text>
    </View>
  )
}

export default Calls

const styles = StyleSheet.create({})