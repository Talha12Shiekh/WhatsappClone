import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableNativeFeedback,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React from "react";
import {
  ACTIVE_TAB_GREEN_COLOR,
  TAB_BACKGROUND_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  TITLE_COLOR,
  CHAT_DATA_STATUS_COLOR,
} from "./WhatsappMainScreen";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
} from "react-native-vector-icons";
import { useNavigation } from "@react-navigation/native";

export const center = {
  justifyContent: "center",
  alignItems: "center",
};

export const RippleButton = ({ children, onPress }) => {
  return (
    <View style={{ padding: 15, borderRadius: 50 }}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple("#4d565d", true, 100)}
      >
        <View>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

export const PopupIconsRippleButton = ({ children }) => {
  return (
    <View style={{ borderRadius: 200, padding: 10 }}>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple(
          TAB_PRESS_ACTIVE_WHITE_COLOR,
          true
        )}
      >
        <View>{children}</View>
      </TouchableNativeFeedback>
    </View>
  );
};

export const showToast = (message) => {
  ToastAndroid.showWithGravity(message, ToastAndroid.LONG, ToastAndroid.CENTER);
};

export const ModelComponent = ({ name, photo, onPress }) => {
  const navigation = useNavigation();
  return (
    <Pressable style={styles.centeredView} onPress={onPress}>
      <View style={[styles.modalView]}>
        <View style={styles.imageContainer}>
          <Text
            style={{
              zIndex: 111,
              backgroundColor: "rgba(0,0,0,.4)",
              color: TITLE_COLOR,
              padding: 8,
              position: "absolute",
              width: "100%",
              fontSize: 18,
            }}
          >
            {name}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("ProfileImage", { photo, name });
              onPress();
            }}
          >
            <View>
              <Image
                source={
                  photo ? { uri: photo } : require("./Images/profile.png")
                }
                resizeMode="cover"
                style={{ width: "100%", height: "100%" }}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.iconsContainer,
            { backgroundColor: TAB_BACKGROUND_COLOR },
          ]}
        >
          <PopupIconsRippleButton>
            <Ionicons name="call" color={ACTIVE_TAB_GREEN_COLOR} size={23} />
          </PopupIconsRippleButton>
          <PopupIconsRippleButton>
            <MaterialCommunityIcons
              name="message-text-outline"
              color={ACTIVE_TAB_GREEN_COLOR}
              size={23}
            />
          </PopupIconsRippleButton>
          <PopupIconsRippleButton>
            <Feather name="info" color={ACTIVE_TAB_GREEN_COLOR} size={23} />
          </PopupIconsRippleButton>
          <PopupIconsRippleButton>
            <Ionicons
              name="videocam"
              color={ACTIVE_TAB_GREEN_COLOR}
              size={23}
            />
          </PopupIconsRippleButton>
        </View>
      </View>
    </Pressable>
  );
};

export const ClosenavbarAnimation = (closeanim) => {
  return Animated.timing(closeanim, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  }).start();
};

export const navbarAnimation = (openanim) => {
  Animated.timing(openanim, {
    toValue: 1,
    duration: 300,
    useNativeDriver: true,
  }).start();
};

export const NormalChatComponent = ({ showText, LeftComponent }) => {
  const date = new Date();
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const miutes =
    date.getMinutes() > 9 ? date.getMinutes() : "0" + date.getMinutes();
  const am_pm = date.getHours() >= 12 ? "PM" : "AM";
  function generatePassword() {
    let length = 22,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
        n = charset.length;
    for (let i = 0; i < length; i++) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
};
  const passwordString = generatePassword() 
  return (
    <View
      style={{
        width: "100%",
        height: 80,
        marginTop: 10,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <LeftComponent />
      </View>
      {showText ? (
        <View style={{ marginLeft: 15 }}>
          <Text
            style={{
              color: TITLE_COLOR,
              marginBottom: 4,
              fontSize: 15,
              fontWeight: 400,
            }}
          >
            Goggle Chrome (Windows)
          </Text>
          <Text style={{ color: CHAT_DATA_STATUS_COLOR }}>
            Last active today at {hour}:{miutes} {am_pm}
          </Text>
        </View>
      ) : (
          <TouchableOpacity>
            <View>
              <Text style={{color:"#1a0dab"}}>https://call.whatsapp.com/video/{passwordString}</Text>
            </View>
          </TouchableOpacity>
      )}
    </View>
  );
};

export const ChatGreenLeftComponent = ({ children,...rest }) => {
  return (
    <View style={{ ...center }}>
      <View style={styles.callLeftPlaceImage}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flexDirection: "row",
    flex: 1,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    width: 300,
    height: 300,
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
    left: 40,
  },
  imageContainer: {
    width: "100%",
    aspectRatio: 2 / 1.9,
    position: "relative",
  },
  iconsContainer: {
    width: "100%",
    height: "17%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  callLeftPlaceImage: {
    width: 50,
    aspectRatio: 1,
    borderRadius: 50,
    marginTop: 10,
    ...center,
    backgroundColor:ACTIVE_TAB_GREEN_COLOR
  },
});
