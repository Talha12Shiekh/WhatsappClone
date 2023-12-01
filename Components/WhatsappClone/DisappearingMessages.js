import { StyleSheet, Text, View, Image, TouchableNativeFeedback } from 'react-native'
import React, { useState } from 'react'
import { CHAT_BACKROUND_COLOR, CHAT_DATA_STATUS_COLOR, TAB_BACKGROUND_COLOR, TITLE_COLOR, ACTIVE_TAB_GREEN_COLOR, TAB_PRESS_ACTIVE_WHITE_COLOR } from './Variables'
import image from "./Images/dImage.png";
import { Dialog, CheckBox, Icon } from '@rneui/themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useChatsContext } from "../../App";


const DisappearingMessages = ({ route }) => {

  const { key } = route.params;

  const { chats, setchats } = useChatsContext()

  const [disappearingMessagesCheckBoxesData, setdisappearingMessagesCheckBoxesData] = useState([
    { text: "24 hours", checked: false, key: 1 },
    { text: "7 days", checked: false, key: 2 },
    { text: "90 days", checked: false, key: 3 },
    { text: "Off", checked: true, key: 4 },
  ])

  function handleChangeCheckbox(ind, item) {



    const newDisappearingMessagesData = disappearingMessagesCheckBoxesData.map((item, index) => {
      if (index == ind) {
        return {
          ...item,
          checked: true
        }
      } else {
        return {
          ...item,
          checked: false
        }
      }
    })

    setdisappearingMessagesCheckBoxesData(newDisappearingMessagesData);
  }

  function handleUpdateChats(item) {

    const newChats = chats.map(chat => {
      if (chat.key == key) {
        return {
          ...chat,
          disappearingMessages: item.text
        }
      }
      return chat;
    })

    setchats(newChats)
  }

  return (
    <>
      <View style={styles.contianer}>
        <View style={styles.paddingHorizontal}>

          <Image resizeMode='cover' style={styles.image} source={image} />
          <Text style={[styles.text, { fontWeight: "bold" }]}>Make messages in the chat disappear</Text>
          <Text style={styles.text}>For more privacy and storage new messages will disappear from this chat for everyone after the selected duration excpet when kep Anyone in the chat can change this setting </Text>
        </View>
        <View style={styles.straightLine} />
        <View style={[styles.paddingHorizontal]}>
          <Text style={styles.msgTimer}>Message Timer</Text>
          <View style={styles.checkboxesContainer}>
            {
              disappearingMessagesCheckBoxesData.map((l, index) => {
                return <CheckBox
                  key={l.key}
                  containerStyle={{ backgroundColor: CHAT_BACKROUND_COLOR, borderWidth: 0 }}
                  checkedIcon={
                    <Icon
                      name="radio-button-checked"
                      type="material"
                      color="#6fc11d"
                      size={25}
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  uncheckedIcon={
                    <Icon
                      name="radio-button-unchecked"
                      type="material"
                      color="grey"
                      size={25}
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  checked={l.checked}
                  textStyle={{ color: TITLE_COLOR }}
                  title={l.text}
                  onPress={(p) => { handleChangeCheckbox(index, l); handleUpdateChats(l) }}
                />
              })
            }
          </View>
        </View>
        <View style={styles.straightLine} />
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(TAB_PRESS_ACTIVE_WHITE_COLOR, false)}>
          <View style={[styles.paddingHorizontal, { justifyContent: "center", alignItems: 'center', flex: 1 }]}>
            <View style={[styles.bottomContext]}>
              <View>
                <MaterialCommunityIcons name="cog-clockwise" size={24} color={ACTIVE_TAB_GREEN_COLOR} />
              </View>
              <View>
                <Text style={{ color: TITLE_COLOR, fontSize: 18, marginBottom: 5 }}>Try a default message timer</Text>
                <Text style={{ color: CHAT_DATA_STATUS_COLOR }}>Start your new chats with disappearing messgages</Text>
              </View>
            </View>
          </View>
        </TouchableNativeFeedback>
      </View>
    </>
  )
}

export default DisappearingMessages

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    backgroundColor: CHAT_BACKROUND_COLOR,
  },
  text: {
    color: CHAT_DATA_STATUS_COLOR,
    marginBottom: 5
  },
  paddingHorizontal: {
    paddingHorizontal: 30,
    paddingVertical: 10
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  straightLine: { height: 1, backgroundColor: CHAT_DATA_STATUS_COLOR, marginTop: 10 },
  msgTimer: { color: TITLE_COLOR, fontSize: 20, marginBottom: 5 },
  bottomContext: {
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row"
  }
})