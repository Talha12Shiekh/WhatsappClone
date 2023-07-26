import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  TouchableNativeFeedback,
  Animated,
  ScrollView
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
import { RippleButton, showToast } from "./RippleButton";
import Chat from "./Chat";
import {
  FontAwesome5,
  Ionicons,
  Feather,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Menu from "./Menu";
import { useRef } from "react";
import { Alert } from "react-native";
const CallInfo = ({ route, navigation }) => {
  const { item, calls, setcalls, chats, setchats } = route.params;

  const CallArray = Array.from({ length: item.count }).fill({key:Date.now().toString()});

  const selectedCallsAnimation = useRef(new Animated.Value(0)).current;

  const [currentItem, setCurrentItem] = useState({
    ...item,
  });

  const SelectedArchivedMenuData = [
    {
      text: "Remove from call log",
      key: 1,
      onPress: () => {
        let newCalls = [...calls];
        let findedCall = newCalls.find((cll) => cll.key == item.key);
        let deletedCalls = newCalls.filter(
          (call) => call.key !== findedCall.key
        );
        navigation.goBack();
        setcalls(deletedCalls);
      },
    },
    {
      text: !item.blocked ? "Block" : "Unblock",
      key: 2,
      onPress: () => {
        let newCalls = [...calls];
        let newChats = [...chats];
        let findedCall = newCalls.find((cll) => cll.key == item.key);
        let blockedCalls = newCalls.map(call => {
          if(call.key == item.key){
            return {
              ...call,
              blocked:!call.blocked
            }
          }
          return call
        });

        setcalls(blockedCalls)

        if (findedCall !== undefined) {
          let blockedChats = newChats.map((chat) => {
            if (chat.name) {
              if (chat.name == findedCall.name) {
                return {
                  ...chat,
                  blocked: !chat.blocked,
                };
              }
            } else if (chat.number) {
              if (chat.number == findedCall.number) {
                return {
                  ...chat,
                  blocked: !chat.blocked,
                };
              }
            }
            return chat;
          });

          Alert.alert(`${item.blocked ? "Unblock" : "Block"} ${findedCall.name}`, '', [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {text: `${item.blocked ? "Unblock" : "Block"}`, onPress: () => {
              setchats(blockedChats);
              showToast(`${findedCall.name} has been blocked`)
            }},
          ]);

        }
      },
    },
  ];

  const handleOpenMenu = () => {
    Animated.timing(selectedCallsAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  useFocusEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <>
            <Menu
              animation={selectedCallsAnimation}
              menuData={SelectedArchivedMenuData}
            />
            <View style={{ flexDirection: "row" }}>
              <View>
                <RippleButton>
                  <MaterialIcons name="message" size={24} color={TITLE_COLOR} />
                </RippleButton>
              </View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <RippleButton onPress={handleOpenMenu}>
                  <SimpleLineIcons
                    name="options-vertical"
                    color={TITLE_COLOR}
                    size={18}
                  />
                </RippleButton>
              </View>
            </View>
          </>
        );
      },
    });
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
        <View
          style={{
            flexDirection: "row",
            width: "90%",
            alignSelf: "center",
            paddingVertical: 10,
          }}
        >
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
                <Ionicons
                  name="call"
                  size={12}
                  color={CHAT_DATA_STATUS_COLOR}
                />
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
          <ScrollView>
          {item.count > 0 ? (
            CallArray.map((_, i) => {
              return <CallInfoComponent key={_.key} {...item} />;
            })
          ) : (
            <CallInfoComponent {...item} />
          )}
          </ScrollView>
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
