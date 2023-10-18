import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Animated,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ACTIONS } from "./MessagesReducer";
import {
  ANSWER_BACKGROUND_COLOR,
  GREEN_MESSAGE_CLICKED_BACKGROUND,
  INACTIVE_TAB_WHITE_COLOR,
  MESSAGE_BACKGROUND_COLOR,
  TITLE_COLOR,
  generateSendTick,
} from "./WhatsappMainScreen";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { FormattedTime } from "react-intl";

const SingleMessage = ({
  isEven,
  ColumnOrRow,
  index,
  dispatch,
  selected,
  keyOfMessage,
  deleteForEveryone,
  message,
  starred,
  messageStatus,
  time,
  setdraggedIndex,
  setemojiModalPositon
}) => {
  const messageRef = useRef(null);

  const cornerRef = useRef(null);

  let messageStyles = [styles.message];
  let questionMessageCornerStyles = [styles.messageCorner];
  let answerMessageCornerStyles = [styles.answermessageCorner];

  const handleChangeMessageBackground = (event) => {
    // setdraggedIndex(index);
    if (index % 2 == 0) {
      messageStyles.push(styles.green_selected_background);
      questionMessageCornerStyles.push(styles.green_selected_background);
    } else {
      messageStyles.push(styles.grey_selected_background);
      answerMessageCornerStyles.push(styles.grey_selected_background);
    }
    messageRef.current.setNativeProps({
      style: messageStyles,
    });
    cornerRef.current.setNativeProps({
      style:
        index % 2 == 0
          ? questionMessageCornerStyles
          : answerMessageCornerStyles,
    });
  };

  const handleUnChangeMessageBackground = () => {
    if (index % 2 == 0) {
      messageStyles.push(styles.message_background_color);
      questionMessageCornerStyles.push(styles.message_background_color);
    } else {
      messageStyles.push(styles.answer_background_color);
      answerMessageCornerStyles.push(styles.answer_background_color);
    }
    messageRef.current.setNativeProps({
      style: messageStyles,
    });

    cornerRef.current.setNativeProps({
      style:
        index % 2 == 0
          ? questionMessageCornerStyles
          : answerMessageCornerStyles,
    });
  };

  const starScaleAnimation = useRef(new Animated.Value(0)).current;

  const overlayRef = useRef(null);

  const msgReplyRef = useRef(null)

  let overlayStyles = [styles.overlay];

  let replyMsgstyles = [styles.replyMessageStyles];

  const [heightofMessage, setheightofMessage] = useState(null);

  const messageContainerRef = useRef(null);

  overlayStyles?.push({
    height: heightofMessage,
    backgroundColor: selected ? "#00800094" : "transparent",
  });

  overlayRef?.current?.setNativeProps({
    style: overlayStyles,
  });

  useEffect(() => {

    // messageRef?.current?.measure((x, y, width, height, pageX, pageY) => {
    //   overlayStyles?.push({
    //     height,
    //     backgroundColor: selected ? "#00800094" : "transparent",
    //   });
    //   overlayRef?.current?.setNativeProps({
    //     style: overlayStyles,
    //   });
    //   setemojiModalPositon({ x: pageX, y: pageY, opacity: 1 })
    // });
    if (selected) {

      messageRef?.current?.measure((x, y, width, height, pageX, pageY) => {
        setheightofMessage(height);
        //! setemojiModalPositon({ x : x, y, opacity: 1 })
      })
    } else {
      setheightofMessage(null);
      //! setemojiModalPositon({ x:0, y:0, opacity: 0 })
    }

  }, [selected]);


  // useEffect(() => {
  //   if(replied){
  //     messageRef?.current?.measure((x, y, width, height, pageX, pageY) => {
  //       replyMsgstyles.push({width,transform:[{translateX:pageX},{translateY:8}],borderRadius:5})
  //       msgReplyRef?.current?.setNativeProps({
  //         style: replyMsgstyles,
  //       });
  //     });
  //   }
  // },[replied])

  useEffect(() => {
    Animated.timing(starScaleAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(starScaleAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    });
  }, [starred]);

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          if (selected) {
            dispatch({
              type: ACTIONS.DE_SELECT_MESSAGES,
              payload: {
                key: keyOfMessage,
                index,
              },
            });
          }
        }}
        style={{ zIndex: 99999 }}
      >
        <Animated.View pointerEvents={selected ? "auto" : "none"} ref={overlayRef} />
      </TouchableOpacity>
      {/* here is the reply Container that i have */}
      {/* {replied && <View style={{backgroundColor:"red"}} ref={msgReplyRef}>
          
      </View>} */}
      {/*  */}
      <Pressable
        
        onPressIn={handleChangeMessageBackground}
        onPressOut={handleUnChangeMessageBackground}
        onLongPress={() => {
          dispatch({
            type: ACTIONS.SELECT_MESSAGES,
            payload: {
              key: keyOfMessage,
            },
          })
        }
        }
      >
        <View
          style={[
            styles.arrowIcon,
            {
              left: -40,
              width: 30,
              aspectRatio: 1,
              borderRadius: 50,
              backgroundColor: "rgba(0,0,0,.5)",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <Ionicons name="arrow-undo-sharp" size={18} color={TITLE_COLOR} />
        </View>
        <View
          style={[
            styles.messagesContainer,
            { alignSelf: isEven ? "flex-end" : "flex-start" },
          ]}
          ref={messageContainerRef}
        >
          <View
            style={isEven ? styles.messageCorner : styles.answermessageCorner}
            ref={cornerRef}
          />

          <View
            ref={messageRef}
            style={[
              styles.message,
              {
                transform: [{ translateX: isEven ? -20 : 20 }],
                flexDirection: "row",
                backgroundColor: isEven
                  ? MESSAGE_BACKGROUND_COLOR
                  : ANSWER_BACKGROUND_COLOR,
                position: "relative",
              },
            ]}
          >
            <View
              style={{
                flexDirection: ColumnOrRow,
              }}
            >
              {!deleteForEveryone ? (
                <View>
                  <Text
                    style={{
                      color: TITLE_COLOR,
                      fontSize: 15,
                      marginRight: 10,
                    }}
                  >
                    {message}
                  </Text>
                </View>
              ) : (
                <View style={{ flexDirection: "row" }}>
                  <Text style={{ marginRight: 5 }}>
                    <MaterialIcons
                      name="block-flipped"
                      size={20}
                      color={INACTIVE_TAB_WHITE_COLOR}
                    />
                  </Text>
                  <Text
                    style={{
                      color: INACTIVE_TAB_WHITE_COLOR,
                      fontSize: 15,
                      marginRight: 10,
                      fontStyle: "italic",
                    }}
                  >
                    You deleted this message
                  </Text>
                </View>
              )}
              <View
                style={{
                  alignSelf: "flex-end",
                  marginTop: 5,
                  flexDirection: "row",
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: TITLE_COLOR, fontSize: 10 }}>
                    <View
                      style={{
                        position: "absolute",
                        transform: [{ translateX: -35 }],
                      }}
                    ></View>
                    {starred && (
                      <>
                        <View style={{ marginRight: 10 }}>
                          <FontAwesome
                            name="star"
                            size={8}
                            color={TITLE_COLOR}
                          />
                        </View>
                        <Animated.View
                          style={{
                            position: "absolute",
                            transform: [
                              { translateX: -7 },
                              {
                                translateY: starScaleAnimation.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, -50],
                                }),
                              },
                              {
                                scale: starScaleAnimation.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: [0, 3.4],
                                }),
                              },
                            ],
                            opacity: starScaleAnimation.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 0],
                            }),
                          }}
                        >
                          <FontAwesome name="star" size={8} color={"yellow"} />
                        </Animated.View>
                      </>
                    )}
                    {"  "}
                    <FormattedTime value={new Date(time)} />
                    {"  "}
                  </Text>
                  {isEven && !deleteForEveryone && (
                    <View>
                      <Text style={{ color: TITLE_COLOR, fontSize: 10 }}>
                        {generateSendTick(messageStatus)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </Pressable>
    </>
  );
};

export default SingleMessage;

const styles = StyleSheet.create({
  message: {
    padding: 7,
    borderRadius: 10,
    marginBottom: 5,
  },
  messagesContainer: {
    flex: 1,
    flexWrap: "wrap",
    maxWidth: "80%",
  },
  messageCorner: {
    width: 15,
    height: 15,
    backgroundColor: MESSAGE_BACKGROUND_COLOR,
    position: "absolute",
    zIndex: -1,
    right: 12,
    borderBottomLeftRadius: 100,
    top: 0,
    transform: [{ rotate: "270deg" }],
  },
  answermessageCorner: {
    width: 15,
    height: 15,
    backgroundColor: ANSWER_BACKGROUND_COLOR,
    position: "absolute",
    zIndex: -1,
    left: 12,
    borderBottomLeftRadius: 100,
    top: 0,
  },
  singleLineOfMenu: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
  },
  green_selected_background: {
    backgroundColor: GREEN_MESSAGE_CLICKED_BACKGROUND,
  },
  grey_selected_background: {
    backgroundColor: "black",
  },
  message_background_color: {
    backgroundColor: MESSAGE_BACKGROUND_COLOR,
  },
  answer_background_color: {
    backgroundColor: ANSWER_BACKGROUND_COLOR,
  },
  arrowIcon: {
    position: "absolute",
    top: "10%",
  },
  overlay: {
    position: "absolute",
    zIndex: 99999999999,
    width: "100%",
    backgroundColor: "red",
  },

  replyMessageStyles: {
    height: 50,
    backgroundColor: "red"
  }
});
