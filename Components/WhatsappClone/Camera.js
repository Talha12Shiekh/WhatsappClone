import { Camera, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import {
  BADGE_BACKGROUND_COLOR,
  CHAT_BACKROUND_COLOR,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import { Entypo, MaterialIcons, Foundation, Feather } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function CameraComponent({ navigation }) {
  const [type, setType] = useState(CameraType.back);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const [status, requestPermissionofMicrophone] =
    Camera.useMicrophonePermissions();

  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const flashAnimation = useRef(new Animated.Value(0)).current;

  const [isrotated, setisrotated] = useState(false);

  const [istranslated, setistranslated] = useState(false);

  const Cameraref = useRef(null);

  const [permissionResponse, requestPermissionToSave] =
    MediaLibrary.usePermissions();

  const [flash, setFlash] = useState(true);

  const [loaded, setloaded] = useState(false);

  const [clicked, setclicked] = useState(false);

  const [video, setvideo] = useState(false);

  const handleRotation = () => {
    const toValue = !isrotated ? 1 : 0;
    Animated.timing(rotateAnimation, {
      toValue,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };

  const handleMoveFlash = () => {
    const toValue = !istranslated ? 1 : 0;
    Animated.timing(flashAnimation, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setistranslated((istranslted) => !istranslted);
    setFlash((flsh) => !flsh);
  };

  const TopIconsStyles = {
    transform: [
      {
        translateY: flashAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -35],
        }),
      },
    ],
  };

  navigation.addListener("focus", () => {
    setloaded(true);
  });

  navigation.addListener("blur", () => {
    setloaded(false);
  });

  const handleTakePicture = async () => {
    if (!Cameraref.current) return;
    const { uri } = await Cameraref.current.takePictureAsync({
      quality: 1,
    });
    requestPermissionToSave();
    if (uri) {
      try {
        navigation.push("ImageScreen", { uri ,clicked});
      } catch (e) {
        console.log(e);
      }
    }
  };

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const IconsContainer = ({ children, onPress, ...props }) => {
    return (
      <View {...props}>
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
      </View>
    );
  };

  const handleShowLibrary = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [3, 2],
      quality: 1,
    });
    const uri = result.assets[0].uri;
    if (!result.canceled) {
      navigation.push("ImageScreen", { uri,clicked });
    }
  };

  async function handleMakeVideo() {
    setvideo((vdeo) => !vdeo);
    try {
      if (!video) {
        requestPermissionofMicrophone();
        
        let { uri } = await Cameraref.current.recordAsync({quality:Camera.Constants.VideoQuality["1080p"]});
        if (uri) {
          navigation.push("ImageScreen", { uri,clicked });
        }
      } else {
        Cameraref.current.stopRecording();
      }
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <View style={styles.container}>
      {loaded && (
        <Camera
          style={styles.camera}
          flashMode={
            flash
              ? (!video ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.torch)
              : Camera.Constants.FlashMode.off
          }
          type={type}
          ref={Cameraref}
        >
          <View style={styles.buttonContainer}>
            <View style={styles.cameraTopButtons}>
              <IconsContainer onPress={() => navigation.popToTop()}>
                <Entypo name="cross" size={35} color={TITLE_COLOR} />
              </IconsContainer>
              <IconsContainer
                onPress={(e) => {
                  handleMoveFlash();
                }}
                style={{
                  width: 35,
                  aspectRatio: 1,
                  overflow: "hidden",
                }}
              >
                <Animated.View style={TopIconsStyles}>
                  <Entypo name="flash" size={35} color={TITLE_COLOR} />
                </Animated.View>
                <Animated.View style={TopIconsStyles}>
                  <MaterialIcons
                    name="flash-off"
                    size={30}
                    color={TITLE_COLOR}
                  />
                </Animated.View>
              </IconsContainer>
            </View>
            <View style={{ flex: 7 }}></View>
            <View style={styles.cameraBottomButtons}>
              <View style={styles.cameraSideIcons}>
                <IconsContainer onPress={handleShowLibrary} style={styles.icon}>
                  <Foundation name="photo" size={24} color={TITLE_COLOR} />
                </IconsContainer>
              </View>
              <View>
                {!clicked ? (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={handleTakePicture}
                  >
                    <View style={styles.cameraWrapper}>
                      <View style={styles.cameraButton}></View>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handleMakeVideo}
                    style={styles.button}
                  >
                    {!video ? (
                      <View style={styles.cameraWrapper}>
                        <View
                          style={[styles.cameraButton, { borderWidth: 15 }]}
                        ></View>
                      </View>
                    ) : (
                      <View style={styles.VideoWrapper}>
                        <View style={[styles.videoButton]}></View>
                      </View>
                    )}
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.cameraSideIcons}>
                <TouchableOpacity
                  onPress={() => {
                    toggleCameraType();
                    handleRotation();
                    setisrotated(!isrotated);
                  }}
                >
                  <Animated.View
                    style={[
                      styles.icon,
                      {
                        transform: [
                          {
                            rotate: rotateAnimation.interpolate({
                              inputRange: [0, 1],
                              outputRange: ["0deg", "180deg"],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <Feather name="rotate-ccw" size={24} color={TITLE_COLOR} />
                  </Animated.View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Camera>
      )}
      <View style={styles.bottomSheet}>
        <TouchableOpacity onPress={() => setclicked((clcked) => !clcked)}>
          <View
            style={[
              styles.bottomSheetTextContainer,
              clicked ? styles.activeBackground : {},
            ]}
          >
            <Text style={styles.bottomSheettext}>Video</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setclicked((clcked) => !clcked)}>
          <View
            style={[
              styles.bottomSheetTextContainer,
              !clicked ? styles.activeBackground : {},
            ]}
          >
            <Text style={styles.bottomSheettext}>Image</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    margin: 20,
    justifyContent: "space-between",
    marginBottom: 100,
  },
  cameraButton: {
    width: 60,
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 100,
    borderWidth: 6,
    borderColor: "black",
  },
  cameraWrapper: {
    width: 70,
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraSideIcons: {
    backgroundColor: "red",
    width: 50,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    backgroundColor: "rgba(0,0,0,.5)",
  },
  cameraBottomButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cameraTopButtons: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  bottomSheet: {
    width: "100%",
    height: 80,
    backgroundColor: "red",
    position: "absolute",
    bottom: 0,
    backgroundColor: TAB_BACKGROUND_COLOR,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  bottomSheettext: {
    color: TITLE_COLOR,
    fontWeight: "bold",
  },
  bottomSheetTextContainer: {
    borderRadius: 20,
    width:80,
    height:30,
    elevation: 1,
    justifyContent:"center",
    alignItems:"center"
  },
  activeBackground: {
    backgroundColor: BADGE_BACKGROUND_COLOR,
  },
  videoButton: {
    width: 25,
    aspectRatio: 1,
    backgroundColor: "red",
    borderRadius: 5,
  },
  VideoWrapper: {
    width: 70,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: TITLE_COLOR,
    borderRadius: 50,
  },
});
