import { createRef } from "react";
import { StyleSheet } from "react-native";
import {GREEN_MESSAGE_CLICKED_BACKGROUND,MESSAGE_BACKGROUND_COLOR,ANSWER_BACKGROUND_COLOR} from "./WhatsappMainScreen";


export const ACTIONS = {
  SEND_MESSAGES: "handleSendMessages",
  SELECT_MESSAGES: "handleSelection",
  DE_SELECT_MESSAGES: "handleDeSelection",
  DELETE_MESSAGES:"handleDelete",
  DELETE_FOR_EVERYONE:"handledeleteforeveryone",
  STARRE_MESSAGES:"handleStareMessages"
};

const time = new Date();
const hours = time.getHours() > 12 ? time.getHours() - 12 : time.getHours();
const minutes =
  time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
const am_pm = time.getHours() >= 12 ? "PM" : "AM";

export const MessagesReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SEND_MESSAGES: {
      if (payload.value == "") return;

      let messagesObject = {
        message: payload.value,
        key: Date.now(),
        hours,
        minutes,
        am_pm,
        messageStatus: "single",
        selected: false,
        ref: createRef(),
        deleteForEveryone:false,
        starred:false
      };

      payload.setvalue("");

      setTimeout(() => {
        // setmessages((prev) =>
        return state.map((msg) =>
          msg.key === messagesObject.key
            ? { ...msg, messageStatus: "double" }
            : msg
        );
        // );
      }, 60000);

      // After 3 minutes, update message status to "triple" and change color
      setTimeout(() => {
        return state.map((msg) =>
          msg.key === messagesObject.key
            ? { ...msg, messageStatus: "triple" }
            : msg
        );
      }, 180000);

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
          } else {
            messageStyles.push(styles.grey_selected_background);
          }
          msg.ref.current.setNativeProps({
            style: messageStyles,
          });

          setTimeout(() => {
            if (payload.index % 2 == 0) {
              messageStyles.push(styles.message_background_color);
            } else {
              messageStyles.push(styles.answer_background_color);
            }
            msg.ref.current.setNativeProps({
              style: messageStyles,
            });
          }, 1000);
        }
        return msg;
      });
    }
    case ACTIONS.DELETE_MESSAGES :{
      return state.filter(msgs => !msgs.selected);
    }
    case ACTIONS.DELETE_FOR_EVERYONE :{
      return state.map(msg => {
        if(msg.selected){
          return {
            ...msg,
            deleteForEveryone:true,
            selected:false
          }
        }
        return msg;
      })
    }
    case ACTIONS.STARRE_MESSAGES:{
      return state.map(msg => {
        if(msg.selected){
          return {
            ...msg,starred:true
          }
        }
        return msg;
      })
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
});
