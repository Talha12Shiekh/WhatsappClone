import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  TAB_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import { Entypo } from "@expo/vector-icons";
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

const Calls = ({ callChats,setcurrentTabIndex, navigation }) => {
  useFocusEffect(() => {
    setcurrentTabIndex(3);
  });
  return (
    <View style={{flex:1,backgroundColor:CHAT_BACKROUND_COLOR}}>
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
              navigation.navigate("CallDetails",{callChats});
            },
          };
          return <Chat {...itemData} />;
        }}
      />
    </View>
  );
};

export default Calls;
