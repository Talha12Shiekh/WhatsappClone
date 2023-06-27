import React, { useRef, useState } from "react";
import {
  TouchableOpacity,
  PanResponder,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
  Animated,
} from "react-native";
import {
  ACTIVE_TAB_GREEN_COLOR,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import {
  AntDesign,
  Feather,
  Entypo,
  FontAwesome,
  Foundation,
} from "@expo/vector-icons";
import { showToast } from "./RippleButton";
import * as MediaLibrary from "expo-media-library";

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

const CaptureImageScreen = ({ route, navigation }) => {
  const { uri } = route.params;

  const [title, setTitle] = useState("");

  const pan = useRef(new Animated.ValueXY(0)).current;

  const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }]),
        onPanResponderRelease: () => {
          pan.extractOffset();
        },
      })
    ).current;

  const handledownloadImage = async () => {
    try {
      if (uri) {
        await MediaLibrary.saveToLibraryAsync(uri);
        showToast("Image saved to gallery");
      }
    } catch (err) {
      showToast("Unable to save the picture");
    }
  };

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
  ];
  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        style={{
          width: 50,
          height: 40,
          backgroundColor: "white",
          position: "absolute",
          zIndex: 99999,
          transform: [{translateX:pan.x},{translateY:pan.y}],
          top: "50%",
          left: "50%",
          borderRadius:10
        }}
        {...panResponder.panHandlers}
      >
        {/* <TextInput
          value={title}
          placeholder={"Add text"}
          textAlign={"center"}
          placeholderTextColor={"black"}
          onChangeText={(text) => setTitle(text)}
          style={{
            color: TITLE_COLOR ,
            fontWeight: "bold",
            width: "100%",
            fontSize: 20,
            height: 50,
            padding:10
          }}
        ></TextInput> */}
      </Animated.View>
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
          <IconsContainer
            onPress={() => navigation.navigate("ImageCropScreen", { uri })}
          >
            <Feather name="crop" size={20} color={TITLE_COLOR} />
          </IconsContainer>
          {LastThreeIcons.map((icon) => {
            return (
              <IconsContainer key={icon.key} onPress={icon.onPress}>
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
            <TouchableOpacity onPress={handledownloadImage}>
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
