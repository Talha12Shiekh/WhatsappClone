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
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useRef,useState } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import {
  TAB_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  TITLE_COLOR,
  CHAT_DATA_STATUS_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  CHAT_HEIGHT,
} from "./Variables";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialIcons,
  AntDesign,
} from "@expo/vector-icons";
import Chat from "./Chat";
import { ChatGreenLeftComponent, MakeAnimation } from "./Helpers";
import { useCallsChatsContext, useCallsContext, useChatsContext,useCallsFilterChatsContext } from "../../App";

const CALLS_BUTTON = [
  {
    name: "Create call link",
    number: "",
    about: "Share a link for your Whatsapp call",
    key: 1,
    photo: "",
    type: "chat",
    messages:[]
  },
];

const Calls = ({
  navigation,
  setcurrentTabIndex,
}) => {
  const isFocused = useIsFocused();

  const {calls,setcalls} = useCallsContext();

  const {setcallFilterChats} = useCallsFilterChatsContext()

  useEffect(() => {
    if(isFocused){
      setcurrentTabIndex(3);
    }
  },[isFocused])

  const checkedAnimaton = useRef(new Animated.Value(0)).current;

  const [repeatedDates,setRepatedDates] = useState([]);

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
    setcallFilterChats(SelectedCalls)
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
      setcallFilterChats(deselectedCalls);
    };

  
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}>
      
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
                setRepatedDates,
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
          estimatedItemSize={CHAT_HEIGHT}
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
                      onLayout={item.selected ? MakeAnimation(checkedAnimaton,1,200) : () => {}}
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
                  <>
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
                        transform:  [{ translateY: -15 }],
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
                  </>
                );
              },
              NotshowChatMakingDate: false,
              onPress: () => {
                if(item.selected){
                  findItemstoDeSelect(item.key)
                }else {
                  navigation.navigate("CallInfo", { item,repeatedDates });
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
    </KeyboardAvoidingView>
  );
};

export default Calls;


// Completed at 7/26/2023