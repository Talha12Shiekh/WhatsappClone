import {
  Animated,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  Text,
  Platform,
  UIManager,
  LayoutAnimation,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { AntDesign, Ionicons } from "react-native-vector-icons";

import FloatingButton from "./FloatingButton";
import Chat from "./Chat";
import {
  CHAT_BACKROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  INACTIVE_TAB_WHITE_COLOR,
  STORAGE_KEY,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import { useNavigation, useRoute } from "@react-navigation/native";
import CommunityComponent from "./CommunityComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ACTIVE_TAB_GREEN_COLOR } from "./WhatsappMainScreen";
import { FontAwesome5 } from "@expo/vector-icons";
import { showToast } from "./RippleButton";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Chats = ({
  chats,
  setchats,
  opensearchBar,
  FileredChats,
  setFileredChats,
  archived,
  setarchived,
  findSelectedArchved,
  handleChatsMaking,
  isEnabled,
}) => {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const [open, setopen] = useState(false);

  const checkedAnimaton = new Animated.Value(0);
  const [margin, setmargin] = useState(0);

  const makeTickAnmation = () => {
    Animated.spring(checkedAnimaton, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  function ToggleOpen() {
    const toValue = open ? 0 : 1;
    Animated.timing(animation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setopen(!open);
  }

  const findItemstoSelect = (key) => {
    const newChats = [...chats];
    const selectedChats = newChats.map((chat) => {
      if (chat.key == key) {
        return {
          ...chat,
          selected: true,
        };
      }
      return chat;
    });
    setchats(selectedChats);
  };

  const findItemstoDeSelect = (key) => {
    let newChats = [...chats];
    const deselectedChats = newChats.map((chat) => {
      if (chat.selected && chat.key == key) {
        return {
          ...chat,
          selected: false,
        };
      }
      return chat;
    });
    setchats(deselectedChats);
  };

  const handleOpenModel = () => {
    navigation.navigate("Profile", { handleChatsMaking });
    ToggleOpen();
  };

  useEffect(() => {
    if (opensearchBar) {
      setmargin(80);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    } else {
      setmargin(0);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }
  }, [opensearchBar]);

  const ArchivedBar = () => {
    return <TouchableNativeFeedback
    background={TouchableNativeFeedback.Ripple(
      INACTIVE_TAB_WHITE_COLOR,
      false
    )}
    onPress={() =>
      navigation.navigate("Archived", {
        archived,
        setchats,
        setarchived,
      })
    }
  >
    <View
      style={{
        height: 50,
        flexDirection: "row",
        gap: 20,
        paddingLeft: 30,
        borderBottomColor: TAB_BACKGROUND_COLOR,
        borderTopColor: TAB_BACKGROUND_COLOR,
        borderBottomWidth: 1,
        alignItems: "center",
        borderTopWidth:1
      }}
    >
      <View
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <Ionicons
          name="archive-outline"
          size={21}
          color={CHAT_DATA_STATUS_COLOR}
        />
      </View>
      <View>
        <Text
          style={{
            color: TITLE_COLOR,
            fontSize: 18,
            marginLeft: 20,
            fontWeight: "bold",
          }}
        >
          Archived
        </Text>
      </View>
    </View>
  </TouchableNativeFeedback>
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: CHAT_BACKROUND_COLOR,
        marginTop: margin,
      }}
    >
      {chats.length !== 0 ? (
        <View style={{ backgroundColor: CHAT_BACKROUND_COLOR }}>
          {isEnabled ? <View>
          {archived.length !== 0 ? (
              <ArchivedBar/>
          ) : null}
          </View> : null}
          <FlatList
            data={chats}
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
                      <Animated.View
                        style={{
                          zIndex: 111,
                          transform: [{ scale: checkedAnimaton }],
                        }}
                        onLayout={item.selected ? makeTickAnmation() : () => {}}
                      >
                        {item.selected ? (
                          <Ionicons
                            name="checkmark-done-circle-sharp"
                            color={ACTIVE_TAB_GREEN_COLOR}
                            size={20}
                            style={{
                              fontSize: 20,
                              transform: [
                                { translateX: 40 },
                                { translateY: 15 },
                              ],
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
                        width: "25%",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "row",
                        positon: "absolute",
                        left: -35,
                        gap: 20,
                      }}
                    >
                      <FontAwesome5
                        name="volume-mute"
                        color={CHAT_DATA_STATUS_COLOR}
                        size={20}
                        style={{ transform: [{ scale: item.muted ? 1 : 0 }] }}
                      />
                      <AntDesign
                        name="pushpin"
                        color={CHAT_DATA_STATUS_COLOR}
                        size={20}
                        style={{
                          transform: [
                            { rotate: "90deg" },
                            { scale: item.pinned ? 1 : 0 },
                          ],
                        }}
                      />
                      <View
                        style={{
                          width: 20,
                          aspectRatio: 1,
                          backgroundColor: ACTIVE_TAB_GREEN_COLOR,
                          borderRadius: 100,
                          transform: [{ scale: item.readed ? 1 : 0 }],
                        }}
                      ></View>
                    </View>
                  );
                },
                NotshowChatMakingDate: true,
                onPress: () => {
                  findItemstoDeSelect(item.key);
                },
                onLongPress: () => {
                  findItemstoSelect(item.key);
                },
              };
              return <Chat {...itemData} />;
            }}
          />
          {!isEnabled ? <View>
          {archived.length !== 0 ? (
              <ArchivedBar/>
          ) : null}
          </View> : null}
        </View>
      ) : (
        <View style={{ width: "100%", height: "100%" }}>
          <CommunityComponent
            title="Start Chating"
            para="Send and receive messages without keeping your phone online.Use WhatsApp on up to 4 linked devices and 1 phone at the same time."
            btnText="Make Chat"
            imagepath={require("./Images/chats.png")}
            handleChatsMaking={handleChatsMaking}
            onPress={() => {
              navigation.navigate("Profile", { handleChatsMaking });
            }}
          />
        </View>
      )}
      <FloatingButton
        onPress={handleOpenModel}
        ToggleOpen={ToggleOpen}
        animation={animation}
        open={open}
        setopen={setopen}
        chats={chats}
        handleChatsMaking={handleChatsMaking}
      />
    </View>
  );
};

export default Chats;
