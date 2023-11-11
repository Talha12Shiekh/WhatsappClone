import { View } from "react-native";
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
  useIsFocused,
} from "@react-navigation/native";
import { showToast } from "./Helpers";
import { useArchivedContext, useCallsChatsContext, useCallsContext, useChatsContext, useCallsFilterChatsContext, useFilterChatsContext } from "../../App";
import { ACTIVE_TAB_GREEN_COLOR, INACTIVE_TAB_WHITE_COLOR, TAB_BACKGROUND_COLOR, TAB_PRESS_ACTIVE_WHITE_COLOR, CHAT_DATA_STATUS_COLOR, STORAGE_KEY, CALLS_STORAGE_KEY, CALLS_KEY, FILTER_STORAGE_KEY, ARCHIVED_STORAGE_KEY, FILTER_CALLS_STORAGE_KEY } from "./Variables"

const Tab = createMaterialTopTabNavigator();


const WhatsappMainScreen = ({ isEnabled }) => {
  const { chats, setchats, storeChats } = useChatsContext();

  const { calls, setcalls, storeCalls } = useCallsContext();

  const { archived, setarchived, storeArchivedChats } = useArchivedContext();

  const { callChats, setcallChats, storeCallChats } = useCallsChatsContext();

  const { callFilterChats, setcallFilterChats, storeFilterCalls } = useCallsFilterChatsContext();

  const { FileredChats, setFileredChats, storeFilterChats } = useFilterChatsContext()


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


  const [opensearchBar, setopensearchBar] = useState(false);

  const [currentTabIndex, setcurrentTabIndex] = useState(1);

  const [activeRoute, setactiveRoute] = useState("Chats");

  const timeInMilliseconds = Date.now()

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
          time: timeInMilliseconds,
          photo,
          type: "chat",
          selected: false,
          pinned: false,
          muted: false,
          readed: false,
          blocked: false,
          messages: []
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
          const ChatToEdit = chats.findIndex(
            (chat) => chat.key == editedKey
          );
          const CallToEdit = calls?.find(
            (call) => call.name == chats[ChatToEdit].name
          );
          chats[ChatToEdit] = {
            name,
            number,
            about,
            time: chats[ChatToEdit].time,
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
        handleChatsMaking={handleChatsMaking}
        currentTabIndex={currentTabIndex}
        setactiveRoute={setactiveRoute}
        activeRoute={activeRoute}
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
              />
            );
          }}
        </Tab.Screen>
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default WhatsappMainScreen;
