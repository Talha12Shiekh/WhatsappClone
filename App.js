import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import WhatsappMainScreen, {
  
} from "./Components/WhatsappClone/WhatsappMainScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import CommunityComponent from "./Components/WhatsappClone/CommunityComponent";
import { IntlProvider } from "react-intl";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Profile from "./Components/WhatsappClone/Profile";
import AllContacts from "./Components/WhatsappClone/AllContacts";
import Archived from "./Components/WhatsappClone/Archived";
import Camera from "./Components/WhatsappClone/Camera";
import CallDetails from "./Components/WhatsappClone/CallDetails";
import CallInfo from "./Components/WhatsappClone/CallInfo";
import MessagesScreen from "./Components/WhatsappClone/MessagesScreen";
import Settings from "./Components/WhatsappClone/Settings";
import { FormattedTime } from "react-intl";




import {
  View,
  Image,
  StyleSheet,
  Text,
  Switch,
  FlatList,
  TouchableNativeFeedback,
  LogBox,
} from "react-native";
import { createContext, useCallback, useContext, useState } from "react";
import BarCodeScannerScreen from "./Components/WhatsappClone/BarCodeScanner";
import CaptureImageScreen from "./Components/WhatsappClone/CaptureImageScreen";
import ImageCropScreen from "./Components/WhatsappClone/ImageCropScreen";
import CallScreen from "./Components/WhatsappClone/CallScreen";
import MessagesInfo from "./Components/WhatsappClone/MessagesInfo";

import {
  CHAT_DATA_STATUS_COLOR,
  INACTIVE_TAB_WHITE_COLOR,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
  CHAT_BACKROUND_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  STORAGE_KEY,
  FILTER_STORAGE_KEY,
  ARCHIVED_STORAGE_KEY,
  CALLS_STORAGE_KEY,
  CALLS_KEY,
  FILTER_CALLS_STORAGE_KEY,
} from "./Components/WhatsappClone/Variables"

LogBox.ignoreLogs([
  "Require cycles are allowed, but can result in uninitialized values. Consider refactoring to remove the need for a cycle.",
  "YellowBox has been replaced with LogBox. Please call LogBox.ignoreLogs() instead.",
]);

export const ChatsContext = createContext([]);
export const CallsContext = createContext([]);
export const ArchivedContext = createContext([]);
export const CallChatsContext = createContext([]);
export const CallFilterChatsContext = createContext([]);
export const FilterChatsContext = createContext([]);

export default function App() {
  const Stack = createStackNavigator();

  const ProfileImage = ({ route, navigation }) => {
    const { photo, name } = route.params;

    useFocusEffect(
      useCallback(() => {
        navigation.setOptions({
          title: name,
        });
      }, [navigation, name])
    );

    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={StyleSheet.absoluteFill}
            resizeMode="contain"
          />
        ) : (
          <View>
            <Text style={{ color: CHAT_DATA_STATUS_COLOR }}>
              No Profile photo
            </Text>
          </View>
        )}
      </View>
    );
  };

  const LinkedDevices = () => {
    const navigation = useNavigation();

    const [isscanned, setisscanned] = useState(false);

    const time = Date.now()

    return (
      <View style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}>
        <View style={{ backgroundColor: CHAT_BACKROUND_COLOR, flex: 2 }}>
          <CommunityComponent
            para="Use Whatsapp on Web,Desktop and other devices"
            btnText="Link a device"
            imagepath={require("./Components/WhatsappClone/Images/connection.png")}
            onPress={() => {
              navigation.navigate("BarCodeScanner", { setisscanned });
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: CHAT_BACKROUND_COLOR,
            padding: 10,
            borderTopWidth: StyleSheet.hairlineWidth,
            borderTopColor: CHAT_DATA_STATUS_COLOR,
          }}
        >
          {isscanned && (
            <View
              style={{
                width: "100%",
                height: 160,
                backgroundColor: TAB_BACKGROUND_COLOR,
                paddingHorizontal: 10,
                paddingVertical: 10,
              }}
            >
              <Text style={{ color: CHAT_DATA_STATUS_COLOR, marginBottom: 10 }}>
                Device status
              </Text>
              <Text style={{ color: CHAT_DATA_STATUS_COLOR }}>
                Tap a device log out
              </Text>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(
                  TAB_PRESS_ACTIVE_WHITE_COLOR,
                  false
                )}
              >
                <View
                  style={{
                    width: "100%",
                    height: 80,
                    marginTop: 10,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Image
                      source={require("./Components/WhatsappClone/Images/chrome.png")}
                      style={{ aspectRatio: 1, height: 50 }}
                    />
                  </View>
                  <View style={{ marginLeft: 15 }}>
                    <Text
                      style={{
                        color: TITLE_COLOR,
                        marginBottom: 4,
                        fontSize: 15,
                        fontWeight: 400,
                      }}
                    >
                      Goggle Chrome (Windows)
                    </Text>
                    <Text style={{ color: CHAT_DATA_STATUS_COLOR }}>
                      Last active today at <FormattedTime value={new Date(time)} />
                    </Text>
                  </View>
                </View>
              </TouchableNativeFeedback>
            </View>
          )}
        </View>
      </View>
    );
  };

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  const ArchiveSettings = () => {
    return (
      <View style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 15,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <View style={{ width: "75%" }}>
            <Text style={{ color: TITLE_COLOR, fontSize: 16 }}>
              Keep chats archived
            </Text>
            <Text style={{ color: CHAT_DATA_STATUS_COLOR }}>
              Archive chats will remain archived when you recievea new message
            </Text>
          </View>
          <View>
            <Switch
              trackColor={{ false: "#334048", true: "#12433f" }}
              thumbColor={isEnabled ? ACTIVE_TAB_GREEN_COLOR : "#82929d"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
      </View>
    );
  };

  const MyProviders = ({ children }) => {
    const [chats, setchats] = useState([]);
    const [calls, setcalls] = useState([]);
    const [archived, setarchived] = useState([]);
    const [callChats, setcallChats] = useState([]);
    const [callFilterChats, setcallFilterChats] = useState([]);
    const [FileredChats, setFileredChats] = useState([]);

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
      await AsyncStorage.setItem(
        ARCHIVED_STORAGE_KEY,
        JSON.stringify(archived)
      );
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
    return (
      <ChatsContext.Provider value={{ chats, setchats, storeChats }}>
        <CallsContext.Provider value={{ calls, setcalls, storeCalls }}>
          <ArchivedContext.Provider
            value={{ archived, setarchived, storeArchivedChats }}
          >
            <CallChatsContext.Provider
              value={{ callChats, setcallChats, storeCallChats }}
            >
              <CallFilterChatsContext.Provider
                value={{
                  callFilterChats,
                  setcallFilterChats,
                  storeFilterCalls,
                }}
              >
                <FilterChatsContext.Provider
                  value={{ FileredChats, setFileredChats, storeFilterChats }}
                >
                  {children}
                </FilterChatsContext.Provider>
              </CallFilterChatsContext.Provider>
            </CallChatsContext.Provider>
          </ArchivedContext.Provider>
        </CallsContext.Provider>
      </ChatsContext.Provider>
    );
  };

  return (
    
      <IntlProvider locale="en" onError={(error) => console.log(error)}>
        <MyProviders>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
              <Stack.Screen name="Main" options={{ headerShown: false }}>
                {(props) => {
                  return (
                    <WhatsappMainScreen {...props} isEnabled={isEnabled} />
                  );
                }}
              </Stack.Screen>
              <Stack.Group
                screenOptions={{
                  headerStyle: {
                    backgroundColor: TAB_BACKGROUND_COLOR,
                  },
                  headerTintColor: TITLE_COLOR,
                }}
              >
                <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={{
                    presentation: "modal",
                  }}
                />
                <Stack.Screen name="AllContacts" component={AllContacts} />
                <Stack.Screen name="Archived" component={Archived} />
                <Stack.Screen
                  name="ProfileImage"
                  component={ProfileImage}
                  options={{
                    headerStyle: {
                      backgroundColor: "black",
                    },
                  }}
                />
                <Stack.Screen
                  name="LinkedDevices"
                  component={LinkedDevices}
                  options={{
                    title: "Linked devices",
                  }}
                />
                <Stack.Screen
                  name="ArchiveSettings"
                  component={ArchiveSettings}
                  options={{
                    title: "Archive settings",
                  }}
                />
                <Stack.Screen
                  name="BarCodeScanner"
                  component={BarCodeScannerScreen}
                  options={{
                    title: "Scan QR code",
                  }}
                />
                <Stack.Screen
                  name="Camera"
                  component={Camera}
                  options={{
                    title: "",
                    headerLeft: () => null,
                  }}
                />
                <Stack.Screen
                  name="ImageScreen"
                  component={CaptureImageScreen}
                  options={{
                    title: "",
                    headerLeft: () => null,
                  }}
                />
                <Stack.Screen
                  name="ImageCropScreen"
                  component={ImageCropScreen}
                  options={{
                    title: "",
                    headerLeft: () => null,
                  }}
                />
                <Stack.Screen
                  name="CallDetails"
                  component={CallDetails}
                  options={{
                    title: "Create call link",
                    headerTintColor: CHAT_DATA_STATUS_COLOR,
                  }}
                />
                <Stack.Screen
                  name="CallScreen"
                  component={CallScreen}
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="CallInfo"
                  component={CallInfo}
                  options={{
                    title: "Call Info",
                  }}
                />
                <Stack.Screen name="Settings" component={Settings} />
                <Stack.Screen
                  name="MessagesScreen"
                  component={MessagesScreen}
                />
                <Stack.Screen
                  name="MessagesInfo"
                  component={MessagesInfo}
                  options={{ headerTransparent: true }}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </MyProviders>
      </IntlProvider>
  );
}

export function useChatsContext() {
  return useContext(ChatsContext);
}
export function useCallsContext() {
  return useContext(CallsContext);
}
export function useArchivedContext() {
  return useContext(ArchivedContext);
}
export function useCallsChatsContext() {
  return useContext(CallChatsContext);
}
export function useCallsFilterChatsContext() {
  return useContext(CallFilterChatsContext);
}
export function useFilterChatsContext() {
  return useContext(FilterChatsContext);
}
