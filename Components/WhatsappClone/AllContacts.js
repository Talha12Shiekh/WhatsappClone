import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import Chat from "./Chat";
import { AntDesign } from "react-native-vector-icons";
import {
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_BACKROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  TAB_BACKGROUND_COLOR,
} from "./WhatsappMainScreen";
import { useChatsContext } from "../../App";


const AllContacts = ({ route ,navigation}) => {
  const { handleChatsMaking } = route.params;

  const {chats} = useChatsContext();

  const sections = [
    {
      data: [
        {
          name: "New Group",
          number: "",
          about: "",
          photo: "",
          key:1,
          type:"contact"
        },
        {
          name: "New Contact",
          number: "",
          about: "",
          photo: "",
          key: 2,
          type:"contact"
        },
        {
          name: "New Commuity",
          number: "",
          about: "",
          photo: "",
          key: 3,
          type:"contact"
        }
      ]
    },
    {
      title: "Recent Contacts",
      data: chats,
    }
  ];

  const renderItem = ({ item }) => {
    return (
      <Chat
        {...item}
        LeftPlaceRenderThing={({ handleOpenDpModel }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                if (item.type === "contact") {
                  
                } else {
                  handleOpenDpModel(item.photo, item.name);
                }
              }}
            >
              <View
                style={{ justifyContent: "center", alignItems: "center" }}
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
                    backgroundColor:
                      item.type === "contact"
                        ? ACTIVE_TAB_GREEN_COLOR
                        : undefined,
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        }}
        RightPlaceRenderThing={() => null}
        NotshowChatMakingDate={item.type === "contact" ? false:true}
        onPress={item.type === "contact" ? () => navigation.navigate("Profile",{handleChatsMaking}) : null}
      />
    );
  };

  return (
    <SectionList
      sections={sections}
      keyExtractor={(item) => item.key}
      renderItem={renderItem}
      ItemSeparatorComponent={() => {
        return <View style={{height:1,backgroundColor:TAB_BACKGROUND_COLOR}}></View>
      }}
      renderSectionHeader={({ section: { title } }) => (
        <Text
          style={{
            marginLeft: 25,
            color: CHAT_DATA_STATUS_COLOR,
            fontWeight: "bold",
          }}
        >
          {title ? title : null}
        </Text>
      )}
      style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}
    />
  );
};

export default AllContacts;