import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { AntDesign, MaterialCommunityIcons } from "react-native-vector-icons";
import {
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_BACKROUND_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import { useNavigation } from "@react-navigation/native";

const FloatingButton = ({ onPress, ToggleOpen, animation,handleChatsMaking }) => {
  const navigation = useNavigation()
  const reloadStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -70],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const orderStyle = {
    transform: [
      {
        scale: animation,
      },
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -140],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const bgStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 30],
        }),
      },
    ],
  };

  const labelPositionInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [-30, -120],
  });
  const opacityInterpolate = animation.interpolate({
    inputRange: [0, 0.8, 1],
    outputRange: [0, 0, 1],
  });

  const labelStyle = {
    opacity: opacityInterpolate,
    transform: [{ translateX: labelPositionInterpolate }],
  };

  return (
    <View style={styles.container}>
        <Animated.View style={[styles.background, bgStyle]} />
      <Animated.View
        style={[
          styles.button,
          { backgroundColor: TAB_PRESS_ACTIVE_WHITE_COLOR },
          orderStyle,
        ]}
      >
        <TouchableNativeFeedback
          onPress={onPress}
          background={TouchableNativeFeedback.Ripple(TITLE_COLOR, true)}
        >
          <View style={[styles.button, { bottom: 0, right: 0 }]}>
            <Animated.Text style={[styles.label, labelStyle]}>
              Add Chat
            </Animated.Text>
            <AntDesign name="pluscircleo" size={25} color={TITLE_COLOR} />
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
      <Animated.View
        style={[
          styles.button,
          { backgroundColor: TAB_PRESS_ACTIVE_WHITE_COLOR },
          reloadStyle,
        ]}
      >
        <TouchableNativeFeedback
            onPress={() => navigation.navigate("AllContacts",{handleChatsMaking})}
          background={TouchableNativeFeedback.Ripple(TITLE_COLOR, true)}
        >
          <View style={[styles.button, { bottom: 0, right: 0 }]}>
            <Animated.Text style={[styles.label, labelStyle]}>
              Show Chats
            </Animated.Text>
            <MaterialCommunityIcons
              name="android-messages"
              size={25}
              color={TITLE_COLOR}
            />
          </View>
        </TouchableNativeFeedback>
      </Animated.View>
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackgroundBorderless(30)}
        onPress={ToggleOpen}
      >
        <View
          style={[styles.button, { backgroundColor: ACTIVE_TAB_GREEN_COLOR }]}
        >
          <Text style={styles.payText}>
            <AntDesign name="plus" size={25} />
          </Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({
  container: { flex: 1 },
  button: {
    height: 60,
    width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    bottom: 30,
    right: 20,
    shadowColor: "#333",
    shadowOpacity: 0.1,
    shadowOffset: { x: 2, y: 0 },
    shadowRadius: 2,
    borderRadius: 30,
    elevation: 20,
    position: "absolute",
  },
  payText: { color: "white" },
  label: {
    color: "white",
    position: "absolute",
    fontSize: 15,
    backgroundColor: "transparent",
    width: 100,
  },
  background: {
    backgroundColor: "rgba(0,0,0,.2)",
    height: 60,
    width: 60,
    bottom: 30,
    right: 20,
    position: "absolute",
    borderRadius: 30,
  },
});
