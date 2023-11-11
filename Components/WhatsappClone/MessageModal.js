import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  Feather,
  FontAwesome,
  Fontisto,
  Entypo,
  Foundation,
  Ionicons
} from "@expo/vector-icons";
import { CHAT_DATA_STATUS_COLOR, MENU_BACKGROUND_COLOR, TITLE_COLOR } from "./Variables";

const PURPLE = "#765fee";
const RED = "#fd2e74";
const PINK = "#c861fa";
const ORANGE = "#f96632";
const GREEN = "#1fa755";
const BLUE = "#029ce2";
const LIGHTGREEN = "#01a698";

const MessageModal = ({MenuVisible,setMenuVisible}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={MenuVisible}
      onRequestClose={() => setMenuVisible((v) => !v)}
    >
      <TouchableWithoutFeedback onPress={() => setMenuVisible((v) => !v)}>
        <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,.1)" }} />
      </TouchableWithoutFeedback>
      <Animated.View
        style={[
          styles.messagesMenu,
          {
            zIndex: 3333333333333,
            transform: [{ translateY: -30 }],
          },
        ]}
      >
        <View style={styles.singleLineOfMenu}>
          <TouchableOpacity>
            <View>
              <View style={[styles.menuButton, { backgroundColor: PURPLE }]}>
                <Ionicons name="document" size={24} color={TITLE_COLOR} />
              </View>
              <Text style={styles.menuText}>Document</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <View style={[styles.menuButton, { backgroundColor: RED }]}>
                <FontAwesome name="camera" size={24} color={TITLE_COLOR} />
              </View>
              <Text style={styles.menuText}>Camera</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <View style={[styles.menuButton, { backgroundColor: PINK }]}>
                <Foundation name="photo" size={24} color={TITLE_COLOR} />
              </View>
              <Text style={styles.menuText}>Gallery</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.singleLineOfMenu}>
          <TouchableOpacity>
            <View>
              <View style={[styles.menuButton, { backgroundColor: ORANGE }]}>
                <FontAwesome5 name="headphones" size={24} color={TITLE_COLOR} />
              </View>
              <Text style={styles.menuText}>Audio</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <View style={[styles.menuButton, { backgroundColor: GREEN }]}>
                <Ionicons
                  name="md-location-sharp"
                  size={24}
                  color={TITLE_COLOR}
                />
              </View>
              <Text style={styles.menuText}>Location</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View>
              <View style={[styles.menuButton, { backgroundColor: BLUE }]}>
                <Feather name="user" size={24} color={TITLE_COLOR} />
              </View>
              <Text style={styles.menuText}>Contact</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <View>
            <View style={[styles.menuButton, { backgroundColor: LIGHTGREEN }]}>
              <MaterialCommunityIcons
                name="poll"
                size={24}
                color={TITLE_COLOR}
              />
            </View>
            <Text style={styles.menuText}>Poll</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    messagesMenu: {
        position: "absolute",
        width: 350,
        height: 320,
        backgroundColor: MENU_BACKGROUND_COLOR,
        bottom: 56,
        alignSelf: "center",
        borderRadius: 10,
        flexDirection: "row",
        paddingHorizontal: 50,
        paddingVertical: 20,
        flexWrap: "wrap",
        alignItems: "center",
        zIndex: 9999999,
      },
      menuButton: {
        width: 60,
        aspectRatio: 1,
        backgroundColor: "green",
        alignSelf: "center",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
      },
      menuText: {
        textAlign: "center",
        color: CHAT_DATA_STATUS_COLOR,
      },
      singleLineOfMenu: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        marginTop: 20,
      },
})

export default MessageModal;
