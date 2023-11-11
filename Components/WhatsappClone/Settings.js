import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_BACKROUND_COLOR,
  TAB_BACKGROUND_COLOR,
} from "./Variables";
import Chat from "./Chat";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useChatsContext } from "../../App";

const Settings = ({ route ,navigation }) => {
  const { handleChatsMaking  } = route.params;

  const { chats } = useChatsContext();

  const findtItemsToEdit = (id) => {
    const findedChattoEdit = chats.find(chat => chat.key == id);
    navigation.navigate("Profile",{handleChatsMaking,findedChattoEdit,edited:true});
  }

  const [settingChats,setsettingChats] = useState([])

  useEffect(() => {
    const pinnedSettingChats = chats.map(chat => {
      return {
        ...chat,
        pinned:true
      }
    });
    setsettingChats(pinnedSettingChats);
  },[chats]);


  return (
    <View style={styles.container}>
      <FlatList
        data={settingChats}
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
                          marginLeft: item.selected ? -20 : 0,
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
                <View>
                  <TouchableOpacity style={{flex:1}} onPress={() => findtItemsToEdit(item.key)}>
                    <View style={styles.rightThing}>
                      <AntDesign
                        name="edit"
                        size={30}
                        color={ACTIVE_TAB_GREEN_COLOR}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
              );
            },
            NotshowChatMakingDate: false,
          };
          return <Chat {...itemData} />;
        }}
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CHAT_BACKROUND_COLOR,
  },
  rightThing:{
    flex:1,
    transform:[{translateY:-15}]
  }
});
