import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState,useCallback } from "react";
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
import { useFocusEffect, useNavigation, useNavigationState, useRoute } from "@react-navigation/native";

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
export const CHAT_SELECTION_BACKGROUND = "#182329";
export const BADGE_BACKGROUND_COLOR = "#27343d";
export const MENU_BACKGROUND_COLOR = "#233239";

const getData = async () => {
  let localItems = await AsyncStorage.getItem(STORAGE_KEY);
  if (localItems !== null) {
    return JSON.parse(localItems);
  } else {
    return [];
  }
};

  
  const WhatsappMainScreen = ({isEnabled}) => {

  const [chats, setchats] = useState([]);

  const [FileredChats, setFileredChats] = useState([]);

  const [opensearchBar, setopensearchBar] = useState(false);

  const [archived,setarchived] = useState([]);

  const time = new Date();

  const date = time.getDate();

  const month = time.getMonth();

  const year = time.getFullYear();



  const storeData = async () => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  };

  const handleChatsMaking = useCallback(
    (name, number, about, photo) => {
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
          selected: false,
          pinned: false,
          muted: false,
          readed:false
        };
        setchats((chts) => [...chts, ChatInformation]);
        setFileredChats((chts) => [...chts, ChatInformation]);
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
      }
    },
    [chats]
  );

  const Community = ({setisFocused}) => {
    const navigation = useNavigation()
    return (
      <View style={{ flex: 1 }}>
        <CommunityComponent
          title="Introducing communities"
          para="Easily organize your related groups and send announcements. Now, your communities, like neighborhoods or schools, can have their own space."
          btnText="Start a community"
          imagepath={require("./Images/community.png")}
          setisFocused={setisFocused}
          onPress={() => {
            navigation.navigate("Profile", { handleChatsMaking });
          }}
        />
      </View>
    );
  };

  useEffect(() => {
    storeData();
  }, [chats]);

  useEffect(() => {
    const fetchData = async () => {
      let items = await getData();
      if (items) {
        setchats(items);
      }
    };
    fetchData();
  }, []);

  const findSelected = chats.some((chat) => chat.selected);

  const [Focused,setisFocused] = useState(false);

  return (
    <SafeAreaProvider>
      <WhatsAppNavbar
        selected={findSelected}
        chats={chats}
        setchats={setchats}
        opensearchBar={opensearchBar}
        setopensearchBar={setopensearchBar}
        FileredChats={FileredChats}
        setFileredChats={setFileredChats}
        archived={archived}
        setarchived={setarchived}
        handleChatsMaking={handleChatsMaking}
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
            const route = useRoute()
            return <Community {...props} setisFocused={setisFocused}
            route={route}/>
          }}
        </Tab.Screen>
        <Tab.Screen
          name="Chats"
          options={{
            tabBarLabel: "Chats",
          }}
        >
          {(props) => {
            const route = useRoute()
            return <Chats
              {...props}
              route={route}
              chats={chats}
              setchats={setchats}
              opensearchBar={opensearchBar}
              FileredChats={FileredChats}
              setFileredChats={setFileredChats}
              archived={archived}
              setarchived={setarchived}
              handleChatsMaking={handleChatsMaking}
              isEnabled={isEnabled}
            />
          }}
        </Tab.Screen>
        <Tab.Screen
          name="Status"
          component={Status}
          options={{ tabBarLabel: "Status" }}
        />
        <Tab.Screen
          name="Calls"
          component={Calls}
          options={{ tabBarLabel: "Calls" }}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default WhatsappMainScreen;
