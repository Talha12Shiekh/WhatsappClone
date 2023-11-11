import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  useWindowDimensions,
} from "react-native";
import React, { useState } from "react";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import {
  BADGE_BACKGROUND_COLOR,
  CALLS_ICONS_COLOR,
  CHAT_BACKROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  INACTIVE_TAB_WHITE_COLOR,
  TAB_BACKGROUND_COLOR,
  TAB_PRESS_ACTIVE_WHITE_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import UpperArrow from "react-native-vector-icons/MaterialIcons";
import { FlatList, PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from "react-native-reanimated";
import { Camera, CameraType } from "expo-camera";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import { RippleButton } from "./Helpers";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageBackground } from "react-native";
import { Audio } from "expo-av";
import Chat from "./Chat";

const CallScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { height } = useWindowDimensions();
  const ICONS_BACKGROUND_COLOR = CALLS_ICONS_COLOR;
  const ICONS_SIZE = 25;
  const [loaded, setloaded] = useState(false);
  const [sound, setSound] = React.useState();
  const [isSpeaker, setisSpeaker] = useState(false);

  React.useEffect(() => {
    (async () => {
      requestPermissionsOfAudio();
      const { sound } = await Audio.Sound.createAsync(
        require("./Images/ringing.mp3")
      );
      let newVolume = isSpeaker ? 1 : 0.1;
      await sound.setVolumeAsync(newVolume);
      setSound(sound);
      await sound.playAsync();
    })();
  }, [isSpeaker]);

  React.useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const translateY = useSharedValue(320);

  const [type, setType] = useState(CameraType.front);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [permissionResponse, requestPermissionsOfAudio] =
    Audio.usePermissions();

  const [iconsToggle, setIconsToggle] = useState({
    volume: false,
    video: false,
    microphone: false,
    backCamera: false,
  });

  navigation.addListener("focus", () => {
    setloaded(true);
  });

  navigation.addListener("blur", () => {
    setloaded(false);
  });

  const MAX_TRANSLATE_Y = 320;
  const MIN_TRANSLATE_Y = -(height / 3 - 320);

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      // Apply the boundary on the translateY value
      translateY.value = Math.max(
        Math.min(event.translationY + context.translateY, MAX_TRANSLATE_Y),
        MIN_TRANSLATE_Y
      );
    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  React.useEffect(() => {
    requestPermission();
  }, []);

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const CallChat = ({ image, text, showDots, opacity, key }) => {
    return (
      <View style={[styles.ParticipantContainer, { opacity }]} key={key}>
        <View style={[styles.participant]}>
          <Image
            resizeMode="contain"
            style={[
              styles.participantImage,
              {
                tintColor: showDots ? "" : TITLE_COLOR,
              },
            ]}
            source={image}
          />
        </View>
        <View style={styles.participantTextContainer}>
          <Text style={styles.participantText}>{text}</Text>
        </View>
        {showDots && (
          <View
            style={{
              position: "absolute",
              right: 0,
              justifyContent: "center",
              alignItems: "center",
              top: 20,
              transform: [{ rotate: "90deg" }],
            }}
          >
            <SimpleLineIcons
              name="options-vertical"
              color={TITLE_COLOR}
              size={18}
            />
          </View>
        )}
      </View>
    );
  };

  const IconsContainer = ({ children, colorToggle, onPress }) => {
    return (
      <Pressable onPress={onPress}>
        <View
          style={{
            width: 40,
            aspectRatio: 1,
            backgroundColor: colorToggle ? "rgba(255,255,255,.3)" : "",
            borderRadius: 100,
            ...styles.center,
            transform: [{ translateY: 9 }],
          }}
        >
          {children}
        </View>
      </Pressable>
    );
  };

  const Container = ({ children }) => {
    if (item.video) {
      return (
        <View style={styles.container}>
          {loaded && (
            <Camera style={styles.camera} type={type}>
              {children}
            </Camera>
          )}
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsYm_-QeIrbm6nog9g_k7tixcI3Q7ARmUKCQ&usqp=CAU",
          }}
          style={[styles.container]}
          resizeMode="cover"
        >
          {children}
        </ImageBackground>
      );
    }
  };

  return (
    <Container>
      <View style={styles.callUpperContent}>
        <View style={styles.encrypted}>
          <FontAwesome
            name="lock"
            size={20}
            color={INACTIVE_TAB_WHITE_COLOR}
            style={{ marginRight: 5 }}
          />
          <Text style={{ color: INACTIVE_TAB_WHITE_COLOR }}>
            End-to-end Encrypted
          </Text>
        </View>
        <View style={styles.imageContainer}>
          {!item.video && (
            <Image
              resizeMode="contain"
              source={
                item.photo
                  ? { uri: item.photo }
                  : require("./Images/profile.png")
              }
              style={styles.callsPhoto}
            />
          )}
        </View>
        <View style={styles.imageContainer}>
          <Text style={[styles.text, { fontSize: 30 }]}>{item.name}</Text>
          <Text style={[styles.text, { fontSize: 18, marginTop: 15 }]}>
            Calling
          </Text>
        </View>
      </View>
      <PanGestureHandler onGestureEvent={onDrag}>
        <Animated.View style={[styles.bottomSheet, containerStyle]}>
          <View style={[styles.upperArrow, styles.center]}>
            <UpperArrow
              name="arrow-back-ios"
              size={24}
              color={CHAT_DATA_STATUS_COLOR}
              style={styles.arrow}
            />
          </View>
          <View style={[styles.CallIconsContainer]}>
            {!item.video ? (
              <IconsContainer
                colorToggle={iconsToggle.volume}
                onPress={() => {
                  setisSpeaker((v) => !v);
                  setIconsToggle((prev) => {
                    return {
                      ...prev,
                      volume: !prev.volume,
                    };
                  });
                }}
              >
                <MaterialCommunityIcons
                  name="volume-high"
                  size={ICONS_SIZE}
                  color={
                    iconsToggle.volume ? TITLE_COLOR : ICONS_BACKGROUND_COLOR
                  }
                />
              </IconsContainer>
            ) : (
              <IconsContainer
                colorToggle={iconsToggle.backCamera}
                onPress={() => {
                  setIconsToggle((prev) => {
                    return {
                      ...prev,
                      backCamera: !prev.backCamera,
                    };
                  });
                  toggleCameraType();
                }}
              >
                <MaterialCommunityIcons
                  name="camera-flip-outline"
                  size={ICONS_SIZE}
                  color={
                    iconsToggle.backCamera
                      ? TITLE_COLOR
                      : ICONS_BACKGROUND_COLOR
                  }
                />
              </IconsContainer>
            )}
            <IconsContainer
              colorToggle={iconsToggle.video}
              onPress={() => {
                setIconsToggle((prev) => {
                  return {
                    ...prev,
                    video: !prev.video,
                  };
                });
              }}
            >
              {iconsToggle.video ? (
                <Ionicons
                  name="md-videocam"
                  size={ICONS_SIZE}
                  color={
                    iconsToggle.video ? TITLE_COLOR : ICONS_BACKGROUND_COLOR
                  }
                />
              ) : (
                <Feather
                  name="video-off"
                  color={
                    iconsToggle.video ? TITLE_COLOR : ICONS_BACKGROUND_COLOR
                  }
                  size={24}
                />
              )}
            </IconsContainer>
            <IconsContainer
              colorToggle={iconsToggle.microphone}
              onPress={() => {
                setIconsToggle((prev) => {
                  return {
                    ...prev,
                    microphone: !prev.microphone,
                  };
                });
              }}
            >
              <MaterialCommunityIcons
                name={iconsToggle.microphone ? "microphone" : "microphone-off"}
                size={ICONS_SIZE}
                color={
                  iconsToggle.microphone ? TITLE_COLOR : ICONS_BACKGROUND_COLOR
                }
              />
            </IconsContainer>
            <TouchableNativeFeedback onPress={() => navigation.goBack()}>
              <View style={[styles.callEnd, styles.center]}>
                <MaterialIcons
                  name="call-end"
                  size={ICONS_SIZE}
                  color={TITLE_COLOR}
                  style={{ zIndex: 9999999999999 }}
                />
              </View>
            </TouchableNativeFeedback>
          </View>
          <View
            style={{
              height: 0.5,
              backgroundColor: CHAT_DATA_STATUS_COLOR,
              marginTop: 30,
            }}
          />
          <TouchableNativeFeedback>
            <View style={{ height:80 }}>
            <CallChat
              text={"Add Participant"}
              key={1}
              image={require("./Images/participant.png")}
              showDots={false}
              opacity={1}
            />
            </View>
          </TouchableNativeFeedback>

            <TouchableOpacity>
              <CallChat
                image={
                  item.photo
                    ? { uri: item.photo }
                    : require("./Images/profile.png")
                }
                key={2}
                text={item.name}
                showDots={true}
                opacity={0.5}
              />
            </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CHAT_BACKROUND_COLOR,
  },
  bottomSheet: {
    backgroundColor: TAB_BACKGROUND_COLOR,
    flex: 1,
    transform: [
      {
        translateY: 320,
      },
    ],
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  callUpperContent: {
    flex: 1,
  },
  upperArrow: {
    height: 20,
  },
  arrow: {
    transform: [{ rotate: "90deg" }, { translateX: 10 }],
  },
  CallIconsContainer: {
    width: "80%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  callEnd: {
    width: 50,
    aspectRatio: 1,
    backgroundColor: "red",
    borderRadius: 100,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  encrypted: {
    alignSelf: "center",
    flexDirection: "row",
    marginTop: 20,
  },
  callsPhoto: {
    width: 120,
    height: 120,
    alignSelf: "center",
    borderRadius: 100,
  },
  imageContainer: {
    marginTop: 20,
  },
  text: {
    alignSelf: "center",
    color: TITLE_COLOR,
  },
  camera: {
    flex: 1,
  },
  participantImage: {
    height: 40,
    width: 40,
    borderRadius: 100,
    resizeMode: "cover",
  },
  participantText: {
    color: TITLE_COLOR,
    fontSize: 17,
  },
  participantTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  ParticipantContainer: {
    width: "90%",
    alignSelf: "center",
    gap: 20,
    marginTop: 15,
    flexDirection: "row",
    paddingVertical: 10,
  },
  participant: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: TAB_PRESS_ACTIVE_WHITE_COLOR,
  },
});
