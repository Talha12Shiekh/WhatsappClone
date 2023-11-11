import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { TITLE_COLOR } from "./Variables";
import { ImageManipulator } from "expo-image-crop";

const ImageCropScreen = ({ route, navigation }) => {
  const { uri } = route.params;
  const [image, setimage] = useState(uri);
  const [isVisible, setisVisible] = useState(false);
  return (
    <View style={{ flex: 1 }}>
      <Image source={{ uri: image }} style={{ flex: 7 }} resizeMode="cover" />
      <ImageManipulator
        photo={{ uri }}
        isVisible={isVisible}
        onPictureChoosed={({ uri: uriM }) => setimage(uriM)}
        onToggleModal={() => setisVisible((vsible) => !vsible)}
      />
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "black",
          alignItems: "flex-end",
          paddingHorizontal: 30,
        }}
      >
        <View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: TITLE_COLOR }}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => setisVisible(true)}>
            <View>
              <MaterialIcons
                name="rotate-90-degrees-ccw"
                size={24}
                color={TITLE_COLOR}
              />
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => navigation.navigate("ImageScreen",{uri:image})}>
            <Text style={{ color: TITLE_COLOR }}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ImageCropScreen;

const styles = StyleSheet.create({});
