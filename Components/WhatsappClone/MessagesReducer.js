import { createRef } from "react";
import { StyleSheet } from "react-native";
import {
  GREEN_MESSAGE_CLICKED_BACKGROUND,
  MESSAGE_BACKGROUND_COLOR,
  ANSWER_BACKGROUND_COLOR,
} from "./WhatsappMainScreen";

export const ACTIONS = {
  SEND_MESSAGES: "handleSendMessages",
  SELECT_MESSAGES: "handleSelection",
  DE_SELECT_MESSAGES: "handleDeSelection",
  DELETE_MESSAGES: "handleDelete",
  DELETE_FOR_EVERYONE: "handledeleteforeveryone",
  STARRE_MESSAGES: "handleStareMessages",
  COPY_TO_CLIPBOARD: "handleCopyToClipboard",
};

const time = new Date();
const hours = time.getHours();
const minutes = time.getMinutes();
const Messagehours = hours > 12 ? hours - 12 : hours;
const MessageMinutes = minutes > 9 ? minutes : "0" + minutes; 
const am_pm = hours >= 12 ? "PM" : "AM";

export const MessagesReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SEND_MESSAGES: {
      if (payload.value == "") return;

      let messagesObject = {
        message: payload.value,
        key: Date.now().toString(),
        hours:Messagehours,
        minutes:MessageMinutes,
        am_pm,
        messageStatus: "single",
        selected: false,
        ref: createRef(),
        cornerRef:createRef(),
        deleteForEveryone: false,
        starred: false,
      };

      payload.setvalue("")
      
      return [...state, messagesObject];
      
    }
    case ACTIONS.SELECT_MESSAGES: {
      let newMessages = [...state];
      return newMessages.map((msg) => {
        if (msg.key == payload.key) {
          return {
            ...msg,
            selected: true,
          };
        }
        return msg;
      });
    }
    case ACTIONS.DE_SELECT_MESSAGES: {
      let newMessages = [...state];
      let messageStyles = [styles.message];
      let questionMessageCornerStyles = [styles.messageCorner];
      let answerMessageCornerStyles = [styles.answermessageCorner];
      return newMessages.map((msg) => {
        if (msg.key == payload.key) {
          if (msg.selected) {
            return {
              ...msg,
              selected: false,
            };
          }
          if (payload.index % 2 == 0) {
            messageStyles.push(styles.green_selected_background);
            questionMessageCornerStyles.push(styles.green_selected_background);
          } else {
            messageStyles.push(styles.grey_selected_background);
            answerMessageCornerStyles.push(styles.grey_selected_background);
          }
          msg.ref.current.setNativeProps({
            style: messageStyles,
          });
          msg.cornerRef.current.setNativeProps({
            style: payload.index % 2 == 0 ? questionMessageCornerStyles : answerMessageCornerStyles,
          });

          setTimeout(() => {
            if (payload.index % 2 == 0) {
              messageStyles.push(styles.message_background_color);
              questionMessageCornerStyles.push(styles.message_background_color);
            } else {
              messageStyles.push(styles.answer_background_color);
              answerMessageCornerStyles.push(styles.answer_background_color);
            }
            msg.ref.current.setNativeProps({
              style: messageStyles,
            });

            msg.cornerRef.current.setNativeProps({
              style: payload.index % 2 == 0 ? questionMessageCornerStyles : answerMessageCornerStyles,
            });
          }, 1000);
        }
        return msg;
      });
    }
    case ACTIONS.DELETE_MESSAGES: {
      return state.filter((msgs) => !msgs.selected);
    }
    case ACTIONS.DELETE_FOR_EVERYONE: {
      return state.map((msg) => {
        if (msg.selected) {
          return {
            ...msg,
            deleteForEveryone: true,
            selected: false,
          };
        }
        return msg;
      });
    }
    case ACTIONS.STARRE_MESSAGES: {
      return state.map((msg) => {
        if (msg.selected) {
          return {
            ...msg,
            starred: !msg.starred,
            selected:false
          };
        }
        return msg;
      });
    }
    case ACTIONS.COPY_TO_CLIPBOARD: {
      return state.map((msg) => {
        if (msg.selected) {
          return {
            ...msg,
            selected: false,
          };
        }
        return msg;
      });
    }
    default: {
      return state;
    }
  }
};

const styles = StyleSheet.create({
  message: {
    padding: 7,
    borderRadius: 10,
    marginBottom: 5,
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
});
