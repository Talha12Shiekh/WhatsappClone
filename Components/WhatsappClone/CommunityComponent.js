import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Button } from "./Helpers";
import {
  ACTIVE_TAB_GREEN_COLOR,
  CHAT_BACKROUND_COLOR,
  CHAT_DATA_STATUS_COLOR,
  TAB_BACKGROUND_COLOR,
  TITLE_COLOR,
} from "./Variables";

const CommunityComponent = ({
  title,
  para,
  btnText,
  imagepath,
  onPress
}) => {

  return (
    <View style={[styles.container, { backgroundColor: CHAT_BACKROUND_COLOR }]}>
      <Image
        source={imagepath}
        style={{ width: "85%", height: "50%" }}
        resizeMode="contain"
      />
      {title ? (
        <Text style={[styles.heading, { color: TITLE_COLOR }]}>{title}</Text>
      ) : null}
      <Text style={[styles.para, { color: CHAT_DATA_STATUS_COLOR }]}>
        {para}
      </Text>
      <Button
        color={ACTIVE_TAB_GREEN_COLOR}
        onPress={onPress}
        width="80%"
      >
        <Text style={[styles.buttonText, { color: CHAT_BACKROUND_COLOR }]}>
          {btnText}
        </Text>
      </Button>
    </View>
  );
};

export default CommunityComponent;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    flex: 1,
  },
  image: {
    width: "50%",
    aspectRatio: 1,
    backgroundColor: "red",
  },
  heading: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  para: {
    textAlign: "center",
    fontSize: 18,
    width: "80%",
    marginVertical: 15,
  },
  buttonText: {
    fontSize: 15,
    textAlign: "center",
  },
});
