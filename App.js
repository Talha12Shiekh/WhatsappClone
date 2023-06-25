import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import WhatsappMainScreen, {
  CHAT_DATA_STATUS_COLOR,
  INACTIVE_TAB_WHITE_COLOR,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
  CHAT_BACKROUND_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
} from "./Components/WhatsappClone/WhatsappMainScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import CommunityComponent from "./Components/WhatsappClone/CommunityComponent";
import Chat from "./Components/WhatsappClone/Chat";

import Profile from "./Components/WhatsappClone/Profile";
import AllContacts from "./Components/WhatsappClone/AllContacts";
import Archived from "./Components/WhatsappClone/Archived";
import Camera from "./Components/WhatsappClone/Camera";
import {
  View,
  Image,
  StyleSheet,
  Text,
  Switch,
  FlatList,
  TouchableNativeFeedback,
} from "react-native";
import { useCallback } from "react";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { RippleButton } from "./Components/WhatsappClone/RippleButton";
import { useState } from "react";
import BarCodeScannerScreen from "./Components/WhatsappClone/BarCodeScanner";
import CaptureImageScreen from "./Components/WhatsappClone/CaptureImageScreen";
import ImageCropScreen from "./Components/WhatsappClone/ImageCropScreen";

export default function App() {
  const Stack = createStackNavigator();

  const date = new Date();
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const miutes = date.getMinutes() > 9 ? date.getMinutes() : "0"+date.getMinutes();
  const am_pm = date.getHours() >= 12 ? "PM" : "AM";

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

  const LinkedDevices = ({ handleChatsMaking }) => {
    const navigation = useNavigation();

    const [isscanned,setisscanned] = useState(false);

    return (
      <View style={{ flex: 1, backgroundColor: CHAT_BACKROUND_COLOR }}>
        <View style={{ backgroundColor: CHAT_BACKROUND_COLOR, flex: 2 }}>
          <CommunityComponent
            para="Use Whatsapp on Web,Desktop and other devices"
            btnText="Link a device"
            imagepath={require("./Components/WhatsappClone/Images/connection.png")}
            handleChatsMaking={handleChatsMaking}
            onPress={() => {
              navigation.navigate("BarCodeScanner",{setisscanned});
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
           {isscanned && <View
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
                    Last active today at {hour}:{miutes} {am_pm}
                  </Text>
                </View>
              </View>
            </TouchableNativeFeedback>
          </View> }
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {(props) => {
            return <WhatsappMainScreen {...props} isEnabled={isEnabled} />;
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
              headerLeft:() => null,
            }}
          />
          <Stack.Screen
            name="ImageScreen"
            component={CaptureImageScreen}
            options={{
              title: "",
              headerLeft:() => null,
            }}
          />
          <Stack.Screen
            name="ImageCropScreen"
            component={ImageCropScreen}
            options={{
              title: "",
              headerLeft:() => null,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
