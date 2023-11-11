import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  BackHandler,
} from "react-native";
import {
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_BACKROUND_COLOR,
  INACTIVE_TAB_WHITE_COLOR,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
} from "./WhatsappMainScreen";
import * as ImagePicker from "expo-image-picker";
import { Feather, Ionicons } from "react-native-vector-icons";
import {Button} from "./Helpers";

const Profile = ({ route, navigation }) => {
  const { handleChatsMaking,findedChattoEdit,edited } = route.params;

  
  const [chatinformation, setchatinformation] = useState({
    name: "",
    number: "",
    about: "",
    photo: "",
  });

  useEffect(() => {
    if(edited){
      setchatinformation({
        name: findedChattoEdit.name,
        number: findedChattoEdit.number,
        about: findedChattoEdit.about,
        photo: findedChattoEdit.photo,
      })
    }
  },[edited])


  const handleSubmitModel = () => {
    const { name, number, about, photo } = chatinformation;

    if(edited){
      handleChatsMaking(name, number, about, photo,edited,findedChattoEdit.key);
    }else{
      handleChatsMaking(name, number, about, photo);
    }

    setchatinformation({
      name: "",
      number: "",
      about: "",
      photo: "",
    });
    if ((name, about,number)) {
      navigation.navigate("Chats");
    } 
  };

  const handleChangeInputs = (name, value) => {
    setchatinformation((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [5, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setchatinformation((previous) => {
        return {
          ...previous,
          photo: result.assets[0].uri,
        };
      });
    }
  };

  const backAction = () => {
    if (chatinformation.name !== "" && chatinformation.number !== "") {
      Alert.alert("Hold on!", "Are you sure you want to save the changes ?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => {
            handleSubmitModel()
            navigation.goBack();
          },
        },
      ]);
    }
    return true;
  };

    BackHandler.addEventListener("hardwareBackPress", backAction);


  return (
    <View
      style={[
        styles.centeredView,
        { backgroundColor: CHAT_BACKROUND_COLOR, paddingBottom: 50 },
      ]}
    >
      <View
        style={{
          width: "100%",
          height: 300,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity onPress={handleImageUpload}>
          <View
            style={[
              styles.cameraIcon,
              {
                backgroundColor: ACTIVE_TAB_GREEN_COLOR,
              },
            ]}
          >
            <Feather name="camera" color={TITLE_COLOR} size={22} />
          </View>
        </TouchableOpacity>
        <View style={styles.imageContainer}>
          {chatinformation.photo ? (
            <Image
              source={{ uri: chatinformation.photo }}
              resizeMode="contain"
              style={[styles.image]}
            />
          ) : (
            <Image
              source={require("./Images/user.png")}
              resizeMode="contain"
              style={[styles.image, { tintColor: INACTIVE_TAB_WHITE_COLOR }]}
            />
          )}
        </View>
      </View>
      <KeyboardAvoidingView enabled behavior="position">
        <ScrollView>
          <View style={styles.inputsContainer}>
            <View style={{ marginTop: 15 }}>
              <View style={styles.singleInputWidget}>
                <View style={styles.iconContainer}>
                  <Feather
                    name="camera"
                    color={INACTIVE_TAB_WHITE_COLOR}
                    size={30}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.input}
                    value={chatinformation.name}
                    onChangeText={(value) => handleChangeInputs("name", value)}
                    placeholder="Enter your name"
                    autoFocus
                    placeholderTextColor="#fff"
                  />
                </View>
              </View>

              <View style={styles.singleInputWidget}>
                <View style={styles.iconContainer}>
                  <Feather
                    name="info"
                    color={INACTIVE_TAB_WHITE_COLOR}
                    size={30}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    placeholderTextColor="#fff"
                    style={styles.input}
                    value={chatinformation.number}
                    onChangeText={(value) =>
                      handleChangeInputs("number", value)
                    }
                    placeholder="+92 111 111 111"
                    keyboardType="numeric"
                  />
                </View>
              </View>
              <View style={styles.singleInputWidget}>
                <View style={styles.iconContainer}>
                  <Ionicons
                    name="call"
                    color={INACTIVE_TAB_WHITE_COLOR}
                    size={30}
                  />
                </View>
                <View style={styles.textInputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholderTextColor="#fff"
                    value={chatinformation.about}
                    onChangeText={(value) => handleChangeInputs("about", value)}
                    placeholder="About"
                    textAlignVertical="top"
                  />
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginHorizontal: 20, marginVertical: 10 }}>
            <Button
              color={ACTIVE_TAB_GREEN_COLOR}
              onPress={handleSubmitModel}
              width="100%"
            >
              <Text style={styles.textStyle}>{edited ? "Edit" : "Make"} Chat</Text>
            </Button>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
  },

  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 15,
    fontSize: 17,
    borderBottomColor: "#fff",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    color: "white",
  },
  imageContainer: {
    width: 220,
    height: 220,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    borderRadius: 220 / 2,
    overflow: "hidden",
    zIndex: -111,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 220 / 2,
    transform: [{ scale: 1.5 }],
  },
  cameraIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: -90,
    top: 170,
  },
  singleInputWidget: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 14,
    overflow: "hidden",
  },
  iconContainer: {
    width: "10%",
  },
  textInputContainer: {
    width: "85%",
  },
});
