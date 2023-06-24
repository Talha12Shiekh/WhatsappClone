import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { TITLE_COLOR } from "./WhatsappMainScreen";
import { Entypo, MaterialIcons, Foundation, Feather } from "@expo/vector-icons";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";

export default function CameraComponent({ navigation }) {
  const [type, setType] = useState(CameraType.back);

  const [permission, requestPermission] = Camera.useCameraPermissions();

  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const flashAnimation = useRef(new Animated.Value(0)).current;

  const [isrotated, setisrotated] = useState(false);

  const [istranslated, setistranslated] = useState(false);

  const Cameraref = useRef(null);

  const [permissionResponse, requestPermissionToSave] =
    MediaLibrary.usePermissions();

  const [flash, setFlash] = useState(true);

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
    setFlash(flsh => !flsh);
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


  const handleTakePicture = async () => {
    if (!Cameraref.current) return;
    const { uri } = await Cameraref.current.takePictureAsync({
      quality: 1,
    });
    requestPermissionToSave();
    if (uri) {
      try {
        navigation.push("ImageScreen",{uri});
      } catch (e) {
        console.log(e)
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
    const uri =  result.assets[0].uri
    if (!result.canceled) {
      navigation.push("ImageScreen",{uri})
    }
  }   

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        flashMode={
          flash ? Camera.Constants.FlashMode.on : Camera.Constants.FlashMode.off
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
                console.log(e.elementType);
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
                <MaterialIcons name="flash-off" size={30} color={TITLE_COLOR} />
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
              <TouchableOpacity
                style={styles.button}
                onPress={handleTakePicture}
              >
                <View style={styles.cameraWrapper}>
                  <View style={styles.cameraButton}></View>
                </View>
              </TouchableOpacity>
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
});
