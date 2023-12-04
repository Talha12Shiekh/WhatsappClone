import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { CheckBox, Dialog, Icon } from '@rneui/base';
import { ACTIVE_TAB_GREEN_COLOR, CHAT_BACKROUND_COLOR, EMOJI_BACKGROUND_COLOR, TAB_BACKGROUND_COLOR, TITLE_COLOR } from './Variables';
import { ACTIONS } from './MessagesReducer';
import { useChatsContext } from '../../App';
import { showToast } from './Helpers';

export const MuteNotificationsDialog = ({ mutedDialogOpen, setmutedDialogOpen }) => {
    const [mutedModalData, setmutedModalData] = useState([
        { text: "8 hours", checked: false, key: 1 },
        { text: "1 week", checked: false, key: 2 },
        { text: "Always", checked: true, key: 3 },
    ]);


    function handleUpdateChatsMutedNotifications(checkedText) {
        const newChatData = chats.map(chat => {
            if (chat.key == item.key) {
                return {
                    ...chat,
                    mutedNotifications: checkedText
                }
            }
            return chat;
        });

        setchats(newChatData)
    }

    function handleChangeCheckbox(ind, mutedItem) {

        const newMutedData = mutedModalData.map((item, index) => {
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

        setmutedModalData(newMutedData);
        // 
    }


    return (
        <Dialog
            overlayStyle={{ backgroundColor: TAB_BACKGROUND_COLOR }}
            isVisible={mutedDialogOpen}
            onBackdropPress={() => setmutedDialogOpen(p => !p)}
        >
            <Dialog.Title titleStyle={{ color: TITLE_COLOR }} title="Mute notifications" />
            <Text style={{ marginBottom: 10, color: EMOJI_BACKGROUND_COLOR, fontSize: 15 }}>Other participants will not see that you muted this chat, You will still be notified if you are mentioned</Text>
            {mutedModalData.map((l, index) => (
                <CheckBox
                    key={l.key}
                    containerStyle={{ backgroundColor: TAB_BACKGROUND_COLOR, borderWidth: 0 }}
                    checkedIcon={
                        <Icon
                            name="radio-button-checked"
                            type="material"
                            color="green"
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
                    onPress={(p) => handleChangeCheckbox(index, l)}
                />
            ))}

            <Dialog.Actions>
                <Dialog.Button
                    titleStyle={{ color: "lightgreen" }}
                    title="Ok"
                    onPress={() => {
                        setmutedDialogOpen(p => !p);
                        const checkedCheckBox = mutedModalData.find(box => box.checked);
                        handleUpdateChatsMutedNotifications(checkedCheckBox.text)
                    }}
                />
                <Dialog.Button titleStyle={{ color: "lightgreen" }} title="Cancel" onPress={() => setmutedDialogOpen(p => !p)} />
            </Dialog.Actions>
        </Dialog>
    )
}

export const LoadingModal = ({ showloadingDialog, setshowloadingDialog, }) => {
    return <Dialog overlayStyle={{ backgroundColor: TAB_BACKGROUND_COLOR }} isVisible={showloadingDialog} onBackdropPress={() => setshowloadingDialog(p => !p)}>
        <View style={{ flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
            <View>
                <Dialog.Loading loadingProps={{ size: 50, color: ACTIVE_TAB_GREEN_COLOR }}
                />
            </View>
            <View>

                <Text style={{ color: TITLE_COLOR }}>Please wait a moment</Text>
            </View>
        </View>
    </Dialog>
}

export const BlockModal = ({ name, openBlockModal, setopenBlockModal,item ,setshowloadingDialog}) => {
    const [checked, setchecked] = useState(false);

    const {chats,setchats} = useChatsContext();

    const handleBlockChat = () => {
          const newChats = chats.map(chat => {
            if (chat.key == item.key) {
                return {
                    ...chat,
                    blocked: !chat.blocked
                }
            }
            return chat;
        });

        setshowloadingDialog(p => !p);

        setTimeout(() => {
            setshowloadingDialog(false);
            showToast("You blocked this contact")
        }, 1000);


        
        setchats(newChats);
        setopenBlockModal(p => !p)
    }

    return <Dialog
        isVisible={openBlockModal}
        overlayStyle={{ backgroundColor: TAB_BACKGROUND_COLOR }}
        onBackdropPress={() => setopenBlockModal(p => !p)}
    >
        <Dialog.Title
            titleStyle={{ color: TITLE_COLOR }}
            title={`Block ${name} ?`}

        />

        <Text style={{ marginBottom: 10, color: EMOJI_BACKGROUND_COLOR, fontSize: 15 }}>Blocked contacts cannot call or send you messages. This contact will not be notified</Text>

        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
            <View style={{ alignSelf: 'flex-start' }}>
                <CheckBox
                    containerStyle={{ backgroundColor: TAB_BACKGROUND_COLOR }}
                    checked={checked}
                    onPress={() => setchecked(p => !p)}
                    iconType="material-community"
                    checkedIcon="checkbox-marked"
                    uncheckedIcon="checkbox-blank-outline"
                    checkedColor={EMOJI_BACKGROUND_COLOR}
                />
            </View>
            <View>
                <Text style={{ marginBottom: 5, color: EMOJI_BACKGROUND_COLOR, fontSize: 15, fontWeight: 'bold' }}>Report contact</Text>
                <Text style={{ color: EMOJI_BACKGROUND_COLOR, fontSize: 15 }}>The last 5 messages will be forwarded to WhatsApp</Text>
            </View>
        </View>

        <Dialog.Actions>

            <Dialog.Button onPress={handleBlockChat} titleStyle={{ color: "lightgreen" }} title="Block" />
            <Dialog.Button
                onPress={() => setopenBlockModal(p => !p)}
                titleStyle={{ color: "lightgreen" }}
                title="Cancel"
            />
        </Dialog.Actions>
    </Dialog>
}



