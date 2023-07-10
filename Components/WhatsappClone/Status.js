import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { useNavigation, useRoute,useFocusEffect } from "@react-navigation/native";


const Status = ({setcurrentTabIndex}) => {
  useFocusEffect(() => {
    setcurrentTabIndex(2)
  })
  return (
    <View>
      <Text>Status</Text>
    </View>
  )
}

export default Status

const styles = StyleSheet.create({})