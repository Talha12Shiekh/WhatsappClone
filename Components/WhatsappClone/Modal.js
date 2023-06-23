import { View, Image,Pressable,StyleSheet,Text,TouchableNativeFeedback } from "react-native";
import React from "react";
import { SharedElement } from "react-navigation-shared-element";
import { ACTIVE_TAB_GREEN_COLOR, TAB_BACKGROUND_COLOR, TAB_PRESS_ACTIVE_WHITE_COLOR, TITLE_COLOR } from "./WhatsappMainScreen";
import { PopupIconsRippleButton, showToast,ModelComponent } from "./RippleButton";

const Modal = ({ route ,navigation}) => {
  const { item } = route.params;
  if(!item.photo){
    return showToast("Profile photo does not exists")
  }else{
    return (
      <Pressable style={{ flex:1 }} onPress={() => navigation.goBack()}>
        <View>
          <ModelComponent name={item.name} photo={item.photo} onPress={() => {}}/>
        </View>
      </Pressable>
    );
  }
};

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: "row",
    flex:1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    width: 250,
    height: 250,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    top: 100,
    left: 60,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 2 / 1.9,
    position: "relative",
  },
  iconsContainer: {
    width: "100%",
    height: "17%",
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center"
  },
})

export default Modal;
