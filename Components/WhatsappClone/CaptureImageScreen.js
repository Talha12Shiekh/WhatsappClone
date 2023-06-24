import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
import {
  ACTIVE_TAB_GREEN_COLOR,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import { AntDesign, Feather, Entypo, FontAwesome } from "@expo/vector-icons";

const IconsContainer = ({ children, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          width: 38,
          aspectRatio: 1,
          backgroundColor: "rgba(0,0,0,.5)",
          borderRadius: 100,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

const CaptureImageScreen = ({ route,navigation }) => {
  const { uri } = route.params;
  const LastThreeIcons = [
    {
      name: "photo",
      onPress: () => {},
      key: 1,
    },
    {
      name: "text-width",
      onPress: () => {},
      key: 2,
    },
    {
      name: "pencil",
      onPress: () => {},
      key: 3,
    },
  ];
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 60,
          position: "absolute",
          zIndex: 1111,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <IconsContainer onPress={() => navigation.navigate("Camera")}>
          <Entypo name="cross" size={24} color={TITLE_COLOR} />
        </IconsContainer>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <IconsContainer>
            <Feather name="crop" size={20} color={TITLE_COLOR} />
          </IconsContainer>
          {LastThreeIcons.map((icon) => {
            return (
              <IconsContainer key={icon.key}>
                <FontAwesome name={icon.name} size={20} color={TITLE_COLOR} />
              </IconsContainer>
            );
          })}
        </View>
      </View>
      <Image source={{ uri }} style={{ flex: 5 }} resizeMode="cover" />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <AntDesign
              name="addfile"
              size={20}
              style={{ position: "absolute", left: 20, zIndex: 1111 }}
              color={TITLE_COLOR}
            />
            <TextInput
              placeholder="Add a caption..."
              placeholderTextColor={TITLE_COLOR}
              style={{
                width: "90%",
                backgroundColor: TAB_BACKGROUND_COLOR,
                padding: 12,
                fontSize: 18,
                borderRadius: 30,
                paddingLeft: 50,
                alignSelf: "flex-start",
                marginLeft: 5,
                color: TITLE_COLOR,
              }}
            />
            <View style={{ position: "absolute", right: 45 }}>
              <TouchableOpacity>
                <View
                  style={{
                    width: 20,
                    aspectRatio: 1,
                    borderColor: TITLE_COLOR,
                    borderRadius: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    borderWidth: 2,
                    zIndex: 777777,
                  }}
                >
                  <Text style={{ color: TITLE_COLOR, fontSize: 10 }}>1</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity>
              <View
                style={{
                  width: 45,
                  aspectRatio: 1,
                  backgroundColor: ACTIVE_TAB_GREEN_COLOR,
                  borderRadius: 100,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather name="download" size={24} color={TITLE_COLOR} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CaptureImageScreen;

const styles = StyleSheet.create({});
