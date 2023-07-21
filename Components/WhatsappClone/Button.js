import { StyleSheet, Text, View,TouchableOpacity } from "react-native";
import React from "react";

const Button = ({color,onPress,children,width}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color,width:width }]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center"
      },
});
