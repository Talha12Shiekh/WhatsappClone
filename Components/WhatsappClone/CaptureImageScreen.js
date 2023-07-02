import React, { useRef, useState } from "react";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import {
  TouchableOpacity,
  PanResponder,
  TextInput,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import EmojiPicker from "./EmojiPicker";
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
import EmojiShower from "./EmojiShower";
import TextEditor from "./TextEditor";

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

  const AnimatedView = Animated.createAnimatedComponent(View);

  const translateX = useSharedValue(0);

  const translateY = useSharedValue(0);

  const inputValue = useRef("");

  const [showInput, setshowInput] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);

  const [emojis, setemojis] = useState([]);

  const [TextmodalVisible, setTextModalVisible] = React.useState(false);



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

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        }
      ],
    };
  });

  const LastThreeIcons = [
    {
      name: "photo",
      onPress: () => {
        setModalVisible(true);
      },
      key: 1,
    },
    {
      name: "text-width",
      onPress: () => {
        setTextModalVisible(true);
      },
      key: 2,
    },
  ];
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TextEditor modalVisible={TextmodalVisible} setModalVisible={setTextModalVisible}/>
      <EmojiPicker
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        setemojis={setemojis}
      />
      <PanGestureHandler onGestureEvent={onDrag}>
        <AnimatedView
          style={[
            containerStyle,
            {
              backgroundColor: TITLE_COLOR,
              position: "absolute",
              zIndex: 99999,
              borderRadius: 10,
              top: 240,
              padding: 10,
              opacity: showInput ? 1 : 0,
            },
          ]}
        >
          <TextInput
            ref={inputValue}
            placeholder={"Add text"}
            textAlign={"center"}
            placeholderTextColor={"black"}
            style={{
              color: "black",
              fontWeight: "bold",
              width: "100%",
              fontSize: 20,
              height: 50,
              padding: 10,
            }}
          ></TextInput>
        </AnimatedView>
      </PanGestureHandler>
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
      <EmojiShower emojis={emojis}/>
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
    </GestureHandlerRootView>
  );
};

export default CaptureImageScreen;

