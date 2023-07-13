import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  TAB_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  TITLE_COLOR,
  CHAT_DATA_STATUS_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
} from "./WhatsappMainScreen";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import Chat from "./Chat";
import { ChatGreenLeftComponent } from "./RippleButton";

const CALLS_BUTTON = [
  {
    name: "Create call link",
    number: "",
    about: "Share a link for your Whatsapp call",
    key: 1,
    photo: "https://source.unsplash.com/random/900×700/?cool",
  },
];

const Calls = ({
  calls,
  setcalls,
  callChats,
  setcurrentTabIndex,
  navigation,
}) => {
  useFocusEffect(() => {
    setcurrentTabIndex(3);
  });
  return (
    <View style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}>
      <FlatList
        data={CALLS_BUTTON}
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
                  <Entypo name="attachment" size={20} color={TITLE_COLOR} />
                </ChatGreenLeftComponent>
              );
            },
            RightPlaceRenderThing: () => null,
            NotshowChatMakingDate: false,
            onPress: () => {
              navigation.navigate("CallDetails", { callChats, setcalls });
            },
          };
          return <Chat {...itemData} />;
        }}
      />
      <View
        style={{
          height: "87%",
        }}
      >
        <FlatList
          data={calls}
          ListHeaderComponent={() => {
            if (calls.length !== 0) {
              return (
                <Text
                  style={{
                    color: TITLE_COLOR,
                    marginLeft: "5%",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Recent
                </Text>
              );
            }
          }}
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
              LeftPlaceRenderThing: ({ handleOpenDpModel }) => {
                return (
                  <>
                    <TouchableOpacity
                      onPress={() => handleOpenDpModel(item.photo, item.name)}
                    >
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Image
                          source={
                            item.photo
                              ? { uri: item.photo }
                              : require("./Images/profile.png")
                          }
                          style={{
                            height: 55,
                            aspectRatio: 1,
                            borderRadius: 50,
                          }}
                          resizeMode="contain"
                        />
                      </View>
                    </TouchableOpacity>
                  </>
                );
              },
              RightPlaceRenderThing: () => {
                return (
                  <TouchableNativeFeedback
                    background={TouchableNativeFeedback.Ripple(
                      TAB_PRESS_ACTIVE_WHITE_COLOR,
                      true,
                      50
                    )}
                  >
                    <View
                      style={{
                        transform: [{ translateX: -32 }, { translateY: -15 }],
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {item.video ? (
                        <FontAwesome
                          name="video-camera"
                          size={24}
                          color={ACTIVE_TAB_GREEN_COLOR}
                        />
                      ) : (
                        <Ionicons
                          name="call"
                          size={24}
                          color={ACTIVE_TAB_GREEN_COLOR}
                        />
                      )}
                    </View>
                  </TouchableNativeFeedback>
                );
              },
              NotshowChatMakingDate: false,
              onPress: () => {},
            };
            return <Chat {...itemData} />;
          }}
        />
      </View>
    </View>
  );
};

export default Calls;
