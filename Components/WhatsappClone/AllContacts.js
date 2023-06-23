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


const AllContacts = ({ route ,navigation}) => {
  const { chats,handleChatsMaking } = route.params;

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

const styles = StyleSheet.create({});




// [{"about": "Hello world how are you", "date": 12, "key": "1683877196460", "month": 4, "name": "Talha Shiekh", "number": "0321494671", "photo": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Freact_native_ultimate_projects-a1bbaa6f-a3c1-4216-b247-c000bbd2640e/ImagePicker/015d66f8-7cd6-4971-a82b-37a47f1af1cf.jpeg", "year": 2023}, {"about": "Bdbdbdbbd", "date": 12, "key": "1683877303873", "month": 4, "name": "Ndndndndn", "number": "959595", "photo": "", "year":
// 2023}, {"about": "No one can take place of friends", "date": 12, "key": "1683877402187", "month": 4, "name": "Friends", "number": "032222222222", "photo": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Freact_native_ultimate_projects-a1bbaa6f-a3c1-4216-b247-c000bbd2640e/ImagePicker/96081276-6c22-4067-a269-f31577b99109.jpeg", "year": 2023}, {"about": "Obsessed", "date": 12, "key": "1683877435232", "month": 4, "name": "Specification ", "number": "0000000000", "photo": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Freact_native_ultimate_projects-a1bbaa6f-a3c1-4216-b247-c000bbd2640e/ImagePicker/498da7a4-e75c-44c7-9fb1-09d236e00f28.jpeg", "year": 2023}, {"about": "With marcadise ", "date": 12, "key": "1683877475542", "month": 4, "name": "Talha Shiekh", "number": "03214946471", "photo": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Freact_native_ultimate_projects-a1bbaa6f-a3c1-4216-b247-c000bbd2640e/ImagePicker/c093d341-747e-4e10-acf6-7d65e3b5cecb.jpeg", "year": 2023}, {"about": "Eid day 1", "date": 12, "key": "1683877512737", "month": 4, "name": "Talha Shiekh", "number": "03214946471", "photo": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Freact_native_ultimate_projects-a1bbaa6f-a3c1-4216-b247-c000bbd2640e/ImagePicker/069b8399-6759-4233-90f3-ee03fe28bcbd.jpeg", "year": 2023}, {"about": "Eid day 2", "date": 12, "key": "1683877544664", "month": 4, "name": "Talha Shiekh", "number": "03214946471", "photo": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Freact_native_ultimate_projects-a1bbaa6f-a3c1-4216-b247-c000bbd2640e/ImagePicker/bae154f1-8cf6-436b-84d8-40afcb36bc6a.jpeg", "year": 2023}, {"about": "Eid day 3", "date": 12, "key": "1683877577775", "month": 4, "name": "Talha Shiekh", "number": "03214946471", "photo": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Freact_native_ultimate_projects-a1bbaa6f-a3c1-4216-b247-c000bbd2640e/ImagePicker/be25ce52-ab50-43c8-a880-0a2c5e33340c.jpeg", "year": 2023}, {"about": "Shogran", "date": 12, "key": "1683877620337", "month": 4, "name": "Talha Shiekh", "number": "03214946471", "photo": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Freact_native_ultimate_projects-a1bbaa6f-a3c1-4216-b247-c000bbd2640e/ImagePicker/b92b9896-a2e7-4f2b-82d6-e91aa10422b3.jpeg", "year": 2023}]