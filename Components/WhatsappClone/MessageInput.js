import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Animated,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { TextInput } from "react-native-gesture-handler";
import {
  ACTIVE_TAB_GREEN_COLOR,
  ANSWER_BACKGROUND_COLOR,
  EMOJI_BACKGROUND_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import { Feather, Fontisto, Entypo,MaterialIcons,Ionicons } from "@expo/vector-icons";
import { ACTIONS } from "./MessagesReducer";

const MessagesRippleButton = ({ children, onPress, ...rest }) => {
  return (
    <View style={{ padding: 10, borderRadius: 100 }} {...rest}>
      <TouchableNativeFeedback
        onPress={onPress}
        background={TouchableNativeFeedback.Ripple(
          TAB_PRESS_ACTIVE_WHITE_COLOR,
          true,
          500
        )}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {children}
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const MessageInput = ({
  value,
  setvalue,
  paddingRight,
  ClipandCameraAnimation,
  setIsOpen,
  sendButtonAnimation,
  dispatch,
  setMenuVisible
}) => {
  return (
    <>
    <View
      style={[
        styles.inputContainer,
        {
          overflow: "hidden",
          marginBottom: 10,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 50,
        },
      ]}
    >
      <View style={[styles.emoji, { alignSelf: "flex-end" }]}>
        <MessagesRippleButton
          onPress={() => {
            setIsOpen((o) => !o);
          }}
        >
          <Fontisto name="smiley" size={20} color={EMOJI_BACKGROUND_COLOR} />
        </MessagesRippleButton>
      </View>
      <View>
        <TextInput
          placeholderTextColor={EMOJI_BACKGROUND_COLOR}
          placeholder="Messages"
          style={[styles.input, { paddingRight: paddingRight }]}
          multiline
          value={value}
          onChangeText={(value) => setvalue(value)}
        />
      </View>
      <Animated.View
        style={[
          styles.camera_and_clip,
          { transform: [{ translateX: ClipandCameraAnimation }] },
        ]}
      >
        <MessagesRippleButton onPress={() => setMenuVisible((v) => !v)}>
          <Entypo name="attachment" size={20} color={EMOJI_BACKGROUND_COLOR} />
        </MessagesRippleButton>
        <MessagesRippleButton onPress={() => navigation.navigate("Camera")}>
          <Feather name="camera" size={20} color={EMOJI_BACKGROUND_COLOR} />
        </MessagesRippleButton>
      </Animated.View>
      
    </View>
    <View style={{ marginLeft: "86%", marginBottom: 5 }}>
    <TouchableOpacity
      onPress={() => {
        let messagesObject = {
          message: value,
          key: Date.now().toString(),
          time: Date.now(),
          messageStatus: "single",
          selected: false,
          deleteForEveryone: false,
          starred: false,
          readedTime: Date.now(),
          delivered: Date.now(),
        };

        if (value == "") return;

        dispatch({
          type: ACTIONS.SEND_MESSAGES,
          payload: {
            messagesObject,
          },
        });

        setTimeout(() => {
          dispatch({
            type: ACTIONS.UPDATE_MESSAGE_STATUS_TO_DOUBLE,
            payload: {
              key: messagesObject.key,
              readedTime: Date.now(),
              delivered: Date.now(),
            },
          });
        }, 60 * 1000);

        setTimeout(() => {
          dispatch({
            type: ACTIONS.UPDATE_MESSAGE_STATUS_TO_TRIPLE,
            payload: {
              key: messagesObject.key,
              readedTime: Date.now(),
              delivered: Date.now(),
            },
          });
        }, 3 * 60 * 1000);

        setvalue("");
      }}
    >
      <View style={[styles.sendButton]}>
        <Animated.View
          style={{
            position: "absolute",
            zIndex: 99999,
            transform: [
              {
                scale: sendButtonAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0],
                }),
              },
            ],
          }}
        >
          <MaterialIcons
            name="keyboard-voice"
            size={25}
            color={TITLE_COLOR}
          />
        </Animated.View>
        <Animated.View
          style={{
            position: "absolute",
            zIndex: -1,
            transform: [
              {
                scale: sendButtonAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}
        >
          <Ionicons name="send" size={24} color={TITLE_COLOR} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  </View>
  </>
  );
};

export default MessageInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 8,
    flexDirection: "row",
    backgroundColor: ANSWER_BACKGROUND_COLOR,
    borderRadius: 100,
    marginHorizontal: 10,
    marginTop: 5,
    height: 45,
  },
  sendButton: {
    // flex:1,
    backgroundColor: ACTIVE_TAB_GREEN_COLOR,
    borderRadius: 100,
    width: 50,
    height: 50,
    // marginRight: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    justifyContent: "center",
    alignItems: "center",
    // marginLeft: 10,
    flex: 1,
    position: "absolute",
    left: 0,
    alignSelf: "center",
    zIndex: 999999,
  },
  input: {
    flex: 5,
    color: TITLE_COLOR,
    fontSize: 18,
    paddingLeft: 50,
  },
  camera_and_clip: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingRight: 10,
    gap: 10,
    position: "absolute",
    right: 0,
    top: 2,
    bottom: 0,
  },
});
