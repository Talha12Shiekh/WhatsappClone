import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Animated,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Chat from "./Chat";
import { AntDesign, Ionicons } from "react-native-vector-icons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_BACKROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import {
  RippleButton,
  MakeAnimation
} from "./Helpers";
import { useFocusEffect } from "@react-navigation/native";
import Menu from "./Menu";
import { useArchivedContext, useChatsContext } from "../../App";

const Archived = ({ route, navigation }) => {
  const checkedAnimaton = new Animated.Value(0);

  const { setarchived,archived } = useArchivedContext()

  const {setchats} = useChatsContext()

  const archivedNavbarAnimation = useRef(new Animated.Value(0)).current;

  const selected = archived.some((chat) => chat.selected);

    if (selected) {
      MakeAnimation(archivedNavbarAnimation,1,300)
    } else {
      MakeAnimation(archivedNavbarAnimation,0,300)
    }

  let newChats = [...archived];

  const archivedSelectedChats = newChats.filter((chat) => chat.selected);

  const handleDeleteChat = () => {
    let newChats = [...archived];
    const deletedChats = newChats.filter((chat) => !chat.selected);
    Alert.alert(
      `Delete ${deletedChats.length > 1 ? deletedChats.length : "this"} Chat${
        deletedChats.length > 1 ? "s" : ""
      } ?`,
      "Messages will only be removed from this device and your devices on the newer versions of the Whatsapp",
      [
        {
          text: "Cancel",
          onPress: () => null,
          style: "default",
        },
        {
          text: "Delete chat",
          onPress: () => {
            setarchived(deletedChats);
          },
        },
      ],
      { cancelable: true }
    );
  };
  const hanldeunArchieveChat = () => {
    const newChats = [...archived];
    const selectedChats = newChats.filter((chat) => chat.selected);

    const unSelectSelectedChats = selectedChats.map((chat) => {
      if (chat.selected) {
        return {
          ...chat,
          selected: false,
        };
      }
    });

    setchats((prevChat) => [...prevChat, ...unSelectSelectedChats]);

    const unSelectedChats = newChats.filter((chat) => !chat.selected);
    setarchived(unSelectedChats);
  };

  const archiveChatMenuAnimation = useRef(new Animated.Value(0)).current;
  
  const [archivereaded,setreaded] = useState(false);

  const selectedarchiveChatMenuAnimation = useRef(
    new Animated.Value(0)
  ).current;

  const SelectedArchivedMenuData = [
    {
      text: "Add chat shortcut",
      key: 1,
      onPress: () => {
        MakeAnimation(archiveChatMenuAnimation,0,1000);
      },
    },
    {
      text: "View Contact",
      key: 2,
      onPress: () => {
        MakeAnimation(archiveChatMenuAnimation,0,1000);
      },
    },
    {
      text: `Mark as ${archivereaded ? "read" : "unread"}`,
      key: 3,
      onPress: () => {
        MakeAnimation(archiveChatMenuAnimation,0,1000);
        const newChats = [...archived];
        const readedChats = newChats.map((chat) => {
          setreaded(!archivereaded)
          if (chat.selected) {
            return {
              ...chat,
              readed: !chat.readed,
            };
          }
          return chat;
        });
        setarchived(readedChats);
      },
    },
  ];

  const ArchivedMenuData = [
    {
      text: "Archive Settings",
      key: 1,
      onPress: () => {
        MakeAnimation(archiveChatMenuAnimation,0,1000);
        navigation.navigate("ArchiveSettings")
      },
    },
  ];

  useFocusEffect(() => {
    navigation.setOptions({
      header: () => {
        return (
          <>
            <View
              style={{
                height: 50,
                backgroundColor: TAB_BACKGROUND_COLOR,
                flexDirection: "row",
                zIndex: -1,
              }}
            >
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <RippleButton onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={20} color={TITLE_COLOR} />
                </RippleButton>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginLeft: 15,
                }}
              >
                <Text style={{ color: TITLE_COLOR, fontSize: 18 }}>
                  Archived
                </Text>
              </View>
              <Menu
                animation={archiveChatMenuAnimation}
                menuData={ArchivedMenuData}
              />
              <View style={{ position: "absolute", right: 0 }}>
                <RippleButton
                  onPress={() => MakeAnimation(archiveChatMenuAnimation,1,1000)}
                >
                  <SimpleLineIcons
                    name="options-vertical"
                    color={TITLE_COLOR}
                    size={18}
                  />
                </RippleButton>
              </View>
            </View>
            <Menu
              animation={selectedarchiveChatMenuAnimation}
              menuData={SelectedArchivedMenuData}
            />
            <Animated.View
              style={[
                styles.selectedChatNavbar,
                {
                  backgroundColor: TAB_BACKGROUND_COLOR,
                  transform: [{ scaleX: archivedNavbarAnimation }],
                  zIndex: 1111,
                  position: "absolute",
                },
              ]}
            >
              <View style={styles.chatsCountContainer}>
                <RippleButton
                  onPress={() => MakeAnimation(archivedNavbarAnimation,0,300)
                  }
                >
                  <AntDesign name="arrowleft" size={24} color={TITLE_COLOR} />
                </RippleButton>
                <Text
                  style={{ fontSize: 20, marginLeft: 15, color: TITLE_COLOR }}
                >
                  {archivedSelectedChats.length}
                </Text>
              </View>
              <View
                style={[
                  styles.iconContainer,
                  { justifyContent: "center", alignItems: "center" },
                ]}
              >
                <RippleButton onPress={handleDeleteChat}>
                  <MaterialIcons name="delete" size={21} color={TITLE_COLOR} />
                </RippleButton>
                <RippleButton onPress={hanldeunArchieveChat}>
                  <Ionicons
                    name="archive-outline"
                    size={21}
                    color={TITLE_COLOR}
                  />
                </RippleButton>
                <RippleButton
                  onPress={() => MakeAnimation(selectedarchiveChatMenuAnimation,1,1000)
                  }
                >
                  <SimpleLineIcons
                    name="options-vertical"
                    color={TITLE_COLOR}
                    size={18}
                  />
                </RippleButton>
              </View>
            </Animated.View>
          </>
        );
      },
    });
  });


  const findArchiveItemsToSelect = (key) => {
    let newChats = [...archived];
    const SelectedArchiveChats = newChats.map((chat) => {
      if (chat.key == key) {
        return {
          ...chat,
          selected: true,
        };
      }
      return chat;
    });
    setarchived(SelectedArchiveChats);
  };

  const findArchiveItemsToDeSelect = (key) => {
    let newChats = [...archived];
    const SelectedArchiveChats = newChats.map((chat) => {
      if (chat.key == key && chat.selected) {
        return {
          ...chat,
          selected: !chat.selected,
        };
      }
      return chat;
    });
    setarchived(SelectedArchiveChats);
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}>
        <View
          style={[
            styles.arhivedText,
            { borderBottomWidth: 1, borderBottomColor: TAB_BACKGROUND_COLOR },
          ]}
        >
          <Text style={{ color: CHAT_DATA_STATUS_COLOR, textAlign: "center" }}>
            These chats stay archived when new messages are received.
          </Text>
        </View>
        <FlatList
          data={archived}
          keyExtractor={(item) => item.key}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{ height: 1, backgroundColor: TAB_BACKGROUND_COLOR }}
              ></View>
            );
          }}
          renderItem={({ item }) => {
            const ItemData = {
              ...item,
              LeftPlaceRenderThing: ({ handleOpenDpModel }) => {
                return (
                  <>
                    <Animated.View
                      style={{
                        zIndex: 111,
                        transform: [{ scale: checkedAnimaton }],
                      }}
                      onLayout={
                        item.selected ? () => MakeAnimation(checkedAnimaton,1,500) : () => {}
                      }
                    >
                      {item.selected ? (
                        <Ionicons
                          name="checkmark-done-circle-sharp"
                          color={ACTIVE_TAB_GREEN_COLOR}
                          size={20}
                          style={{
                            fontSize: 20,
                            transform: [{ translateX: 40 }, { translateY: 15 }],
                          }}
                        />
                      ) : null}
                    </Animated.View>
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
                  <View
                    style={{
                      width: 20,
                      aspectRatio: 1,
                      backgroundColor: ACTIVE_TAB_GREEN_COLOR,
                      borderRadius: 100,
                      marginRight:40,
                      transform: [{ scale: item.readed ? 1 : 0 }],
                    }}
                  ></View>
                );
              },
              NotshowChatMakingDate: true,
              onLongPress: () => {
                findArchiveItemsToSelect(item.key);
                MakeAnimation(checkedAnimaton,1,500)
              },
              onPress: () => {
                findArchiveItemsToDeSelect(item.key);
              },
            };
            return <Chat {...ItemData} />;
          }}
        />
      </View>
    </>
  );
};

export default Archived;

const styles = StyleSheet.create({
  arhivedText: {
    padding: 15,
  },
  archiveNavbar: {
    backgroundColor: "red",
    zIndex: 9999,
    position: "absolute",
    height: 50,
    left: 0,
    right: 0,
  },
  selectedChatNavbar: {
    position: "absolute",
    zIndex: 99,
    flexDirection: "row",
    justifyContent: "space-between",
    top: 0,
    height: 60,
    left: 0,
    right: 0,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 2,
  },
  chatsCountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
