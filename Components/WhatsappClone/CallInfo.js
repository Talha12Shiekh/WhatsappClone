import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import {
  TAB_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_DATA_STATUS_COLOR,
  months,
  TITLE_COLOR,
  generateRandomArrow,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
} from "./WhatsappMainScreen";
import { RippleButton } from "./RippleButton";
import Chat from "./Chat";
import { FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import { useState } from "react";
const CallInfo = ({ route, navigation }) => {
  const { item } = route.params;

  const CallArray = Array.from({ length: item.count }).fill();

  const [currentItem, setCurrentItem] = useState({
    ...item,
  });

  const handleOpenCallScreen = () => {
    setCurrentItem({
      ...item,
      video: true,
    });
    navigation.navigate("CallScreen", { item: currentItem });
  };

  const handleOpenVideoScreen = () => {
    setCurrentItem({
      ...item,
      video: false,
    });
    navigation.navigate("CallScreen", { item: currentItem });
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const CallInfoComponent = (item) => {
    return (
      <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        TAB_PRESS_ACTIVE_WHITE_COLOR,
        false
      )}
      >
      <View style={{ flexDirection: "row", width: "90%", alignSelf: "center",paddingVertical:10}}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {generateRandomArrow(item.arrowColor)}
        </View>
        <View style={{ marginLeft: 40 }}>
          <Text style={{ color: TITLE_COLOR, fontSize: 17 }}>
            {capitalizeFirstLetter(item.arrowColor)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginTop: 3,
            }}
          >
            {!item.video ? (
              <Ionicons name="call" size={12} color={CHAT_DATA_STATUS_COLOR} />
            ) : (
              <FontAwesome5
                name="video"
                size={12}
                color={CHAT_DATA_STATUS_COLOR}
              />
            )}
            <View>
              <Text style={{ color: CHAT_DATA_STATUS_COLOR, marginLeft: 10 }}>
                {item.hour}:{item.minutes} {item.hour >= 12 ? "am" : "pm"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View>
          <FlatList
            data={[item]}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => {
              const itemData = {
                ...item,
                type: "chat",
                LeftPlaceRenderThing: ({ handleOpenDpModel }) => {
                  return (
                    <>
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
                        flexDirection: "row",
                        position: "absolute",
                        alignSelf: "flex-end",
                        right: 20,
                      }}
                    >
                      <View>
                        <RippleButton onPress={handleOpenCallScreen}>
                          <Ionicons
                            name="md-call"
                            size={24}
                            color={ACTIVE_TAB_GREEN_COLOR}
                          />
                        </RippleButton>
                      </View>
                      <View>
                        <RippleButton onPress={handleOpenVideoScreen}>
                          <FontAwesome5
                            name="video"
                            size={24}
                            color={ACTIVE_TAB_GREEN_COLOR}
                          />
                        </RippleButton>
                      </View>
                    </View>
                  );
                },
                NotshowChatMakingDate: false,
              };
              return (
                <>
                  <Chat {...itemData} />
                  <View
                    style={{ height: 1, backgroundColor: TAB_BACKGROUND_COLOR }}
                  ></View>
                </>
              );
            }}
          />
        </View>
        <Text
          style={{
            color: CHAT_DATA_STATUS_COLOR,
            marginLeft: 90,
            marginTop: 10,
          }}
        >
          {item.date} {months[item.month]}
        </Text>
        <View style={styles.callStatus}>
          {item.count > 0 ? (
            CallArray.map((_,i) => {
              return <CallInfoComponent key={i} {...item} />
            })
          ) : (
            <CallInfoComponent {...item} />
          )}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CHAT_BACKROUND_COLOR,
  },
  callStatus: {
    marginTop: 20,
  },
});

export default CallInfo;
