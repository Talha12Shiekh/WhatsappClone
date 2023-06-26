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
  const pan = useRef(new Animated.ValueXY()).current;

  const [ButtonClicked,setButtonClicked] = useState(false);

  const [title,setTitle] = useState("");

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

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
          width: 300,
          height: 50,
          position: "absolute",
          zIndex: 9999999999,
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          paddingHorizontal: 10,
        }}
      >
        <View>
          <TouchableOpacity>
            <View
              style={{
                width: 60,
                height: 30,
                backgroundColor: "transparent",
                borderColor: TITLE_COLOR,
                borderWidth: 1,
                borderRadius: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 12, color: TITLE_COLOR }}>Done</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <TouchableOpacity>
            <View>
              <Feather name="align-center" size={24} color={TITLE_COLOR} />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setButtonClicked(btnClcked => !btnClcked)}>
            <View
              style={{
                backgroundColor: ButtonClicked ? "black" : TITLE_COLOR,
                width: 25,
                aspectRatio: 1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <Foundation name="text-color" size={20} color={ButtonClicked ? TITLE_COLOR : "black"} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          backgroundColor: "rgba(0,0,0,.5)",
          position: "absolute",
          zIndex: 1000000,
          ...StyleSheet.absoluteFill,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            borderRadius: 20,
            backgroundColor:ButtonClicked ? TITLE_COLOR : "transparent",
            transform: pan.getTranslateTransform(),
            height:50,
            justifyContent:"center",
            alignItems:'center',
            paddingHorizontal:10
          }}
          {...panResponder.panHandlers}
        >
          <TextInput
            value={title}
            placeholder={"Add text"}
            textAlign="center"
            placeholderTextColor={TITLE_COLOR}
            onChangeText={(text) => setTitle(text)}
            style={{ color: !ButtonClicked ? TITLE_COLOR : "black",fontWeight:"bold",width:"100%",fontSize:20 }}
          ></TextInput>
        </Animated.View>
      </View>
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
