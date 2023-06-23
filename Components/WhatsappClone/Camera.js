import { Camera, CameraType } from "expo-camera";
import { useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
import { TITLE_COLOR } from "./WhatsappMainScreen";
import { Platform } from "react-native";
import { UIManager } from "react-native";
import { LayoutAnimation } from "react-native";
import { Animated } from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export default function CameraComponent({navigation}) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const rotateAnimation = useRef(new Animated.Value(0)).current;

  const flashAnimation = useRef(new Animated.Value(0)).current;

  const [isrotated, setisrotated] = useState(false);

  const [istranslated, setistranslated] = useState(false);

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
    setistranslated(istranslted => !istranslted)
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

  if (Platform.OS === "android") {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  const IconsContainer = ({ children, onPress, ...props }) => {
    return (
      <View {...props}>
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>
          <View style={styles.cameraTopButtons}>
            <IconsContainer onPress={() => navigation.navigate("Main")}>
              <Entypo name="cross" size={35} color={TITLE_COLOR} />
            </IconsContainer>
            <IconsContainer
              onPress={handleMoveFlash}
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
              <IconsContainer onPress={() => {}} style={styles.icon}>
                <Foundation name="photo" size={24} color={TITLE_COLOR} />
              </IconsContainer>
            </View>
            <View>
              <TouchableOpacity style={styles.button}>
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
