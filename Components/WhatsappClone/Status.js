import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useIsFocused } from "@react-navigation/native";
import { useEffect } from "react";
import {
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_BACKROUND_COLOR,
  TAB_BACKGROUND_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import { FlatList } from "react-native";
import { ChatGreenLeftComponent } from "./RippleButton";
import Chat from "./Chat";
import { Zocial, Feather, MaterialIcons } from "@expo/vector-icons";
import { KeyboardAvoidingView } from "react-native";
import FloatingButton from "./FloatingButton";
import { Animated } from "react-native";
import { TouchableNativeFeedback } from "react-native";

const STATUS_BUTTON = [
  {
    name: "My status",
    number: "",
    about: "Tap to add status update",
    key: 1,
    photo: "",
    type: "chat",
    messages:[]
  },
];

const Status = ({ setcurrentTabIndex, navigation }) => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setcurrentTabIndex(2);
    }
  }, [isFocused]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}
    >
      <FlatList
        data={STATUS_BUTTON}
        keyExtractor={(chat) => chat.key}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{ height: 1, backgroundColor: TAB_BACKGROUND_COLOR }}
            ></View>
          );
        }}
        renderItem={({ item }) => {
          const itemData = {
            ...item,
            LeftPlaceRenderThing: () => {
              return (
                <ChatGreenLeftComponent>
                  <Zocial name="statusnet" size={24} color={TITLE_COLOR} />
                </ChatGreenLeftComponent>
              );
            },
            RightPlaceRenderThing: () => null,
            NotshowChatMakingDate: false,
          };
          return <Chat {...itemData} />;
        }}
      />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.button,
            {
              backgroundColor: TAB_BACKGROUND_COLOR,
              transform: [{ translateY: -80 }],
              width: 50,
              height: 50,
              right: 25,
            },
          ]}
        >
          <TouchableNativeFeedback
            onPress={() => {}}
            background={TouchableNativeFeedback.Ripple(TITLE_COLOR, true)}
          >
            <View style={[styles.button, { bottom: 10, right: -5, top: -6 }]}>
              <MaterialIcons name="edit" size={25} color={TITLE_COLOR} />
            </View>
          </TouchableNativeFeedback>
        </Animated.View>
        <TouchableNativeFeedback
          background={TouchableNativeFeedback.SelectableBackgroundBorderless(
            30
          )}
        >
          <View
            style={[styles.button, { backgroundColor: ACTIVE_TAB_GREEN_COLOR }]}
          >
            <Text style={styles.payText}>
              <Feather name="camera" size={24} color={TITLE_COLOR} />
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

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
    borderRadius: 30,
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

export default Status;
