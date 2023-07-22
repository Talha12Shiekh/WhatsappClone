import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import {
  TAB_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_DATA_STATUS_COLOR,
  months
} from "./WhatsappMainScreen";
import { RippleButton } from "./RippleButton";
import Chat from "./Chat";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
const CallInfo = ({ route }) => {
  const { item } = route.params;
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
                      right: 0,
                      marginRight: 10,
                    }}
                  >
                    <View>
                      <RippleButton>
                        <Ionicons
                          name="md-call"
                          size={24}
                          color={ACTIVE_TAB_GREEN_COLOR}
                        />
                      </RippleButton>
                    </View>
                    <View>
                      <RippleButton>
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
        <Text style={{ color: CHAT_DATA_STATUS_COLOR ,marginLeft:90,marginTop:10}}>
          {item.date} {months[item.month]}
        </Text>
        <View style={styles.callStatus}>
            <View>
                
            </View>
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
});

export default CallInfo;
