import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
  Animated,
  Modal,
} from "react-native";
import React, { useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  TAB_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  TITLE_COLOR,
  CHAT_DATA_STATUS_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
} from "./WhatsappMainScreen";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import Chat from "./Chat";
import { ChatGreenLeftComponent, ClosenavbarAnimation, RippleButton, navbarAnimation } from "./RippleButton";

const CALLS_BUTTON = [
  {
    name: "Create call link",
    number: "",
    about: "Share a link for your Whatsapp call",
    key: 1,
    photo: "https://source.unsplash.com/random/900×700/?cool",
    type: "chat",
  },
];

const Calls = ({
  calls,
  setcalls,
  callChats,
  navigation,
  setcurrentTabIndex,
  chats,
  setchats
}) => {
  useFocusEffect(() => {
    setcurrentTabIndex(3);
  });

  const checkedAnimaton = useRef(new Animated.Value(0)).current;

  const makeTickAnmation = () => {
    Animated.spring(checkedAnimaton, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const findCallsToDelete = (id) => {
    let newCalls = [...calls];
    const SelectedCalls = newCalls.map(cll => {
      if(cll.key == id){
        return {
          ...cll,
          selected:true
        }
      }
      return cll
    });
    setcalls(SelectedCalls)
  }

    const findItemstoDeSelect = (key) => {
      let newCalls = [...calls];
      const deselectedCalls = newCalls.map(call => {
        if (call.selected && call.key == key) {
          return {
            ...call,
            selected: false,
          };
        }
        return call;
      });
      setcalls(deselectedCalls);
    };

    const selectedCalls = calls.filter(cll => cll.selected);

    const selectedCallNavbarAnimation = useRef(new Animated.Value(0)).current;

    const isCallSelected = calls.some(cll => cll.selected);

    useEffect(() => {
      if(isCallSelected){
        navbarAnimation(selectedCallNavbarAnimation)
      }else {
        ClosenavbarAnimation(selectedCallNavbarAnimation)
      }
    },[isCallSelected]);

    const handleCallDelete = () => {
      const newCalls = [...calls];
      const deletedCalls = newCalls.filter(cll => !cll.selected);
      setcalls(deletedCalls);
    }

  
  return (
    <View style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}>
      <Animated.View
        style={[
          styles.selectedChatNavbar,
          {
            backgroundColor: TAB_BACKGROUND_COLOR,
            transform: [{ scaleX: selectedCallNavbarAnimation }],
          },
        ]}
      >
        <View style={styles.chatsCountContainer}>
          <RippleButton
          onPress={() => ClosenavbarAnimation(selectedCallNavbarAnimation)}
          >
            <AntDesign name="arrowleft" size={24} color={TITLE_COLOR} />
          </RippleButton>
          <Text style={{ fontSize: 20, marginLeft: 15, color: TITLE_COLOR }}>
            {selectedCalls.length}
          </Text>
        </View>
        <View
          style={[
            styles.iconContainer,
            { justifyContent: "center", alignItems: "center" },
          ]}
        >
          <RippleButton onPress={handleCallDelete}>
            <MaterialIcons name="delete" size={21} color={TITLE_COLOR} />
          </RippleButton>
        </View>
      </Animated.View>
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
              navigation.navigate("CallDetails", {
                callChats,
                setcalls,
                calls,
              });
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
                    <Animated.View
                      style={{
                        zIndex: 1,
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
                  <TouchableNativeFeedback
                    onPress={() => {
                      navigation.navigate("CallScreen", { item });
                    }}
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
              onPress: () => {
                if(item.selected){
                  findItemstoDeSelect(item.key)
                }else {
                  navigation.navigate("CallInfo", { item,calls,setcalls,chats,setchats });
                }
              },
              onLongPress: () => {
                findCallsToDelete(item.key)
              },
            };
            return <Chat {...itemData} />;
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  selectedChatNavbar: {
    width: "100%",
    height: "8%",
    backgroundColor: "red",
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-between",
    top: 0,
    zIndex: 999999999,
  },
  chatsCountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    flexDirection: "row",
    gap: 2,
  },
});

export default Calls;
