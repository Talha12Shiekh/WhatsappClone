import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Calls from "./Calls";
import Status from "./Status";
import Chats from "./Chats";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import WhatsAppNavbar from "./WhatsAppNavbar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import People from "react-native-vector-icons/Ionicons";
import CommunityComponent from "./CommunityComponent";
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import { showToast } from "./RippleButton";
import { FontAwesome5, Ionicons, Feather,MaterialIcons } from "@expo/vector-icons";
import { useArchivedContext, useCallsChatsContext, useCallsContext, useChatsContext } from "../../App";
import { useDeferredValue } from "react";

const Tab = createMaterialTopTabNavigator();

export const ACTIVE_TAB_GREEN_COLOR = "#00a884";
export const INACTIVE_TAB_WHITE_COLOR = "#88959e";
export const TAB_BACKGROUND_COLOR = "#1f2c34";
export const TAB_PRESS_ACTIVE_WHITE_COLOR = "#4d565d";
export const CHAT_BACKROUND_COLOR = "#121b22";
export const CHAT_HEIGHT = 90;
export const TITLE_COLOR = "white";
export const CHAT_DATA_STATUS_COLOR = "#75828a";
export const STORAGE_KEY = "items";
export const ARCHIVED_STORAGE_KEY = "archived_items";
export const CHAT_SELECTION_BACKGROUND = "#182329";
export const BADGE_BACKGROUND_COLOR = "#27343d";
export const MENU_BACKGROUND_COLOR = "#233239";
export const CALLS_STORAGE_KEY = "call_items";
export const CALLS_KEY = "call_chats";
export const CALLS_ICONS_COLOR = "#787f87";
export const FILTER_STORAGE_KEY = "filter_items";
export const FILTER_CALLS_STORAGE_KEY = "filter_calls";
export const ANSWER_BACKGROUND_COLOR = "#1f2c34";
export const EMOJI_BACKGROUND_COLOR = "#86949d";
export const MESSAGE_BACKGROUND_COLOR = "#005b49";
export const GREEN_MESSAGE_CLICKED_BACKGROUND = "#024033";
export const MODAL_BACKGROUND_COLOR = "#2a3b45";
export const MODAL_TEXT_COLOR = "#7e8f99";
export const BLUE_TICK_BACKGROUND = "#53bdeb";
const TICK_SIZE = 15
export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
export const generateSendTick = (messageStatus) => {
  if (messageStatus == "single") {
    return <MaterialIcons name="done" size={TICK_SIZE} color={TITLE_COLOR} />;
  } else if (messageStatus == "double") {
    return <Ionicons name="checkmark-done" size={TICK_SIZE} color={TITLE_COLOR} />;
  } else {
    return <Ionicons name="checkmark-done" size={TICK_SIZE} color={BLUE_TICK_BACKGROUND} />;
  }
};

export function generateRandomArrow(arrow) {
  if (arrow == "incoming") {
    return (
      <Feather
        name="arrow-down-left"
        size={24}
        color={ACTIVE_TAB_GREEN_COLOR}
      />
    );
  } else if (arrow == "outgoing") {
    return (
      <Feather name="arrow-up-right" size={24} color={ACTIVE_TAB_GREEN_COLOR} />
    );
  } else {
    return <Feather name="arrow-down-left" size={24} color={"red"} />;
  }
}

const WhatsappMainScreen = ({ isEnabled }) => {
  const {chats,setchats} = useChatsContext();

  const {calls,setcalls} = useCallsContext();

  const {archived,setarchived} = useArchivedContext();

  const {callChats,setcallChats} = useCallsChatsContext();  

  const [callFilterChats, setcallFilterChats] = useState([]);

  const getChats = async () => {
    let asyncChats = await AsyncStorage.getItem(STORAGE_KEY);
    let updatedchats = await JSON.parse(asyncChats);
    if (updatedchats !== null) {
      setchats(updatedchats);
      setFileredChats(updatedchats);
    } else {
      setchats([]);
      setFileredChats([]);
    }

    storeCallChats();
  };

  const getCallChats = async () => {
    let asyncCallChats = await AsyncStorage.getItem(CALLS_STORAGE_KEY);
    let updatedCallchats = await JSON.parse(asyncCallChats);
    if (updatedCallchats !== null) {
      setcallChats(updatedCallchats);
    } else {
      setcallChats([]);
    }
  };

  const getCalls = async () => {
    let asyncCalls = await AsyncStorage.getItem(CALLS_KEY);
    let updatedCalls = await JSON.parse(asyncCalls);
    if (updatedCalls !== null) {
      setcalls(updatedCalls);
      setcallFilterChats(updatedCalls);
    } else {
      setcalls([]);
      setcallFilterChats([]);
    }
  };

  const getFilterChats = async () => {
    let asyncfilterChats = await AsyncStorage.getItem(FILTER_STORAGE_KEY);
    let updatedFilterChats = await JSON.parse(asyncfilterChats);
    if (updatedFilterChats !== null) {
      setFileredChats(updatedFilterChats);
    } else {
      setFileredChats([]);
    }
  };

  const getArchivedChats = async () => {
    let asyncArchivedChats = await AsyncStorage.getItem(ARCHIVED_STORAGE_KEY);
    let updatedArchivedchats = await JSON.parse(asyncArchivedChats);
    if (updatedArchivedchats !== null) {
      setarchived(updatedArchivedchats);
    } else {
      setarchived([]);
    }
  };

  const getFilterCalls = async () => {
    let asyncFilterCalls = await AsyncStorage.getItem(FILTER_CALLS_STORAGE_KEY);
    let updatedFilterCalls = await JSON.parse(asyncFilterCalls);
    if (updatedFilterCalls !== null) {
      storeFilterCalls(updatedFilterCalls);
    } else {
      storeFilterCalls([]);
    }
  };

  useEffect(() => {
    getChats();
    getArchivedChats();
    getCallChats();
    getCalls();
    getFilterChats();
    getFilterCalls();
  }, []);

  const [FileredChats, setFileredChats] = useState([]);

  const [opensearchBar, setopensearchBar] = useState(false);

  const [currentTabIndex, setcurrentTabIndex] = useState(1);

  const [activeRoute, setactiveRoute] = useState("Chats");

  const time = new Date();

  const date = time.getDate();

  const month = time.getMonth();

  const year = time.getFullYear();

  const storeChats = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  };

  const storeFilterChats = async () => {
    await AsyncStorage.setItem(
      FILTER_STORAGE_KEY,
      JSON.stringify(FileredChats)
    );
  };

  const storeArchivedChats = async () => {
    await AsyncStorage.setItem(ARCHIVED_STORAGE_KEY, JSON.stringify(archived));
  };

  const storeCallChats = async () => {
    await AsyncStorage.setItem(CALLS_STORAGE_KEY, JSON.stringify(callChats));
  };

  const storeCalls = async () => {
    await AsyncStorage.setItem(CALLS_KEY, JSON.stringify(calls));
  };

  const storeFilterCalls = async () => {
    await AsyncStorage.setItem(
      FILTER_CALLS_STORAGE_KEY,
      JSON.stringify(callFilterChats)
    );
  };

  const handleChatsMaking = useCallback(
    (name, number, about, photo, edited, editedKey) => {
      if (name.length == "" && number.length == "") {
        showToast("You can not make an empty chat");
      } else {
        const ChatInformation = {
          name,
          number,
          about,
          key: Date.now().toString(),
          date,
          month,
          year,
          photo,
          type: "chat",
          selected: false,
          pinned: false,
          muted: false,
          readed: false,
          blocked: false,
          messages:[]
        };
        const callInformation = {
          name,
          key: Date.now().toString(),
          label: name,
          value: name,
          photo,
          about,
          number,
        };
        if (!edited) {
          setchats((chts) => [...chts, ChatInformation]);
          setFileredChats((chts) => [...chts, ChatInformation]);
        } else {
          let newCalls = [...calls];
          const ChatToEdit = chats.findIndex(
            (chat) => chat.key == editedKey
          );
          const CallToEdit = newCalls.find(
            (call) => call.name == chats[ChatToEdit].name
          );
          chats[ChatToEdit] = {
            name,
            number,
            about,
            key: chats[ChatToEdit].key,
            date: chats[ChatToEdit].date,
            month: chats[ChatToEdit].month,
            year: chats[ChatToEdit].year,
            photo,
            type: "chat",
            selected: false,
            pinned: false,
            muted: false,
            readed: false,
            blocked: false,
          };
          if (CallToEdit) {
            CallToEdit.name = name;
          }
          setchats(chats);
          setcalls([...calls]);
          showToast("Chat edited successfully !");
          edited = false;
        }
        setcallChats((chts) => [...chts, callInformation]);
        storeChats();
        storeCalls();
      }
    },
    [chats, calls, callFilterChats, FileredChats]
  );

  useEffect(() => {
    storeChats();
    storeCallChats();
    storeFilterChats();
  }, [chats]);

  useEffect(() => {
    storeCalls();
    storeFilterCalls();
  }, [calls]);

  useEffect(() => {
    storeCallChats();
    storeCalls();
  }, [callChats]);

  useEffect(() => {
    storeArchivedChats();
  }, [archived]);

  const Community = ({ setcurrentTabIndex }) => {
    const navigation = useNavigation();

    const isFocused = useIsFocused();

    useEffect(() => {
      if (isFocused) {
        setcurrentTabIndex(0);
      }
    }, [isFocused]);

    return (
      <View style={{ flex: 1 }}>
        <CommunityComponent
          title="Introducing communities"
          para="Easily organize your related groups and send announcements. Now, your communities, like neighborhoods or schools, can have their own space."
          btnText="Start a community"
          imagepath={require("./Images/community.png")}
          onPress={() => {
            navigation.navigate("Profile", { handleChatsMaking });
          }}
        />
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <WhatsAppNavbar
        opensearchBar={opensearchBar}
        setopensearchBar={setopensearchBar}
        FileredChats={FileredChats}
        setFileredChats={setFileredChats}
        handleChatsMaking={handleChatsMaking}
        currentTabIndex={currentTabIndex}
        setactiveRoute={setactiveRoute}
        activeRoute={activeRoute}
        storeChats={storeChats}
        callFilterChats={callFilterChats}
        setcallFilterChats={setcallFilterChats}
        storeCallChats={storeCallChats}
      />
      <Tab.Navigator
        initialRouteName="Chats"
        screenOptions={({ route }) => ({
          tabBarActiveTintColor: ACTIVE_TAB_GREEN_COLOR,
          tabBarInactiveTintColor: INACTIVE_TAB_WHITE_COLOR,
          tabBarStyle: { backgroundColor: TAB_BACKGROUND_COLOR },
          tabBarIndicatorStyle: {
            backgroundColor: ACTIVE_TAB_GREEN_COLOR,
            height: 4,
          },

          tabBarLabelStyle: {
            textTransform: "none",
            fontWeight: "bold",
            fontSize: 15,
          },
          tabBarPressColor: TAB_PRESS_ACTIVE_WHITE_COLOR,
          tabBarPressOpacity: 1,
          tabBarAndroidRipple: { borderless: false },
          tabBarItemStyle: {
            flexDirection: "row-reverse",
            justifyContent: "center",
            alignItems: "center",
            zIndex: -1,
          },
          tabBarIcon: ({ focused, color }) => {
            let iconName;

            if (route.name === "Chats") {
              iconName = focused ? "numeric-1-circle" : "";
            } else if (route.name === "Status") {
              iconName = focused ? "numeric-1-circle" : "";
            } else if (route.name === "Profile") {
              iconName = focused ? "numeric-1-circle" : "";
            }

            return (
              <MaterialCommunityIcons name={iconName} size={22} color={color} />
            );
          },
        })}
      >
        <Tab.Screen
          name={"Community"}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View>
                  <People
                    name="people"
                    size={25}
                    color={
                      focused ? ACTIVE_TAB_GREEN_COLOR : CHAT_DATA_STATUS_COLOR
                    }
                  />
                </View>
              );
            },
            tabBarLabel: "",
          }}
        >
          {(props) => {
            return (
              <Community {...props} setcurrentTabIndex={setcurrentTabIndex} />
            );
          }}
        </Tab.Screen>
        <Tab.Screen
          name="Chats"
          options={{
            tabBarLabel: "Chats",
          }}
        >
          {(props) => {
            return (
              <Chats
                {...props}
                opensearchBar={opensearchBar}
                FileredChats={FileredChats}
                setFileredChats={setFileredChats}
                handleChatsMaking={handleChatsMaking}
                isEnabled={isEnabled}
                setcurrentTabIndex={setcurrentTabIndex}
              />
            );
          }}
        </Tab.Screen>
        <Tab.Screen name="Status" options={{ tabBarLabel: "Status" }}>
          {(props) => {
            return (
              <Status {...props} setcurrentTabIndex={setcurrentTabIndex} />
            );
          }}
        </Tab.Screen>
        <Tab.Screen name="Calls" options={{ tabBarLabel: "Calls" }}>
          {(props) => {
            return (
              <Calls
                {...props}
                setcurrentTabIndex={setcurrentTabIndex}
                setcallFilterChats={setcallFilterChats}
              />
            );
          }}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default WhatsappMainScreen;
