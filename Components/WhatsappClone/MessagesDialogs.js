import { Text, View } from 'react-native'
import React, { useState } from 'react'
import { CheckBox, Dialog, Icon } from '@rneui/base';
import { ACTIVE_TAB_GREEN_COLOR, CHAT_BACKROUND_COLOR, CHAT_DATA_STATUS_COLOR, CUSTOM_MODAL_BACKGROUND, EMOJI_BACKGROUND_COLOR, TAB_BACKGROUND_COLOR, TITLE_COLOR } from './Variables';
import { ACTIONS } from './MessagesReducer';
import { useChatsContext } from '../../App';
import { showToast } from './Helpers';
import CustomModal from './CustomModal';

export const MuteNotificationsDialog = ({ mutedDialogOpen, setmutedDialogOpen,item }) => {
    const [mutedModalData, setmutedModalData] = useState([
        { text: "8 hours", checked: false, key: 1 },
        { text: "1 week", checked: false, key: 2 },
        { text: "Always", checked: true, key: 3 },
    ]);

    const {chats,setchats} = useChatsContext()


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
        <CustomModal
            title="Mute notifications ?"
            description="Other participants will not see that you muted this chat, You will still be notified if you are mentioned"
            visible={mutedDialogOpen}
            handleCancelPressed={() => {}}
            handleSucess={() => {
                const checkedCheckBox = mutedModalData.find(box => box.checked);
                handleUpdateChatsMutedNotifications(checkedCheckBox.text)
            }}
            setvisible={setmutedDialogOpen}
            AdditionalContent={() => {
                return <View style={{marginTop:5}}>
                {mutedModalData.map((l, index) => (
                <CheckBox
                    key={l.key}
                    containerStyle={{ backgroundColor: CUSTOM_MODAL_BACKGROUND, borderWidth: 0 }}
                    checkedIcon={
                        <Icon
                            name="radio-button-checked"
                            type="material"
                            color={ACTIVE_TAB_GREEN_COLOR}
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

                </View>
            }}
            secondBtnText="Ok"
        />
    )
}

export const LoadingModal = ({ showloadingDialog, setshowloadingDialog, }) => {
    return <Dialog overlayStyle={{ backgroundColor: CUSTOM_MODAL_BACKGROUND }} isVisible={showloadingDialog} onBackdropPress={() => setshowloadingDialog(p => !p)}>
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
    }

    return <CustomModal
    
    visible={openBlockModal}
    setvisible={setopenBlockModal}
    AdditionalContent={() => {
        return        <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 20 }}>
        <View style={{ alignSelf: 'flex-start' }}>
            <CheckBox
                containerStyle={{ backgroundColor: CUSTOM_MODAL_BACKGROUND }}
                checked={checked}
                onPress={() => setchecked(p => !p)}
                iconType="material-community"
                checkedIcon="checkbox-marked"
                uncheckedIcon="checkbox-blank-outline"
                checkedColor={EMOJI_BACKGROUND_COLOR}
            />
        </View>
        <View style={{maxWidth:280}}>
            <Text style={{ marginBottom: 5, color: EMOJI_BACKGROUND_COLOR, fontSize: 15, fontWeight: 'bold' }}>Report contact</Text>
            <Text style={{ color: EMOJI_BACKGROUND_COLOR, fontSize: 15 }}>The last 5 messages will be forwarded to WhatsApp</Text>
        </View>
    </View>
    }}
    title={`Block ${name} ?`}
    description="Blocked contacts cannot call or send you messages. This contact will not be notified"
    secondBtnText="Block"
    handleCancelPressed={() => {}}
    handleSucess={handleBlockChat}
    />
    
}

export const ClearChatModal = ({clearChatModal,setclearChatModal,handleClearChat}) => {
    const [c,sc] = useState(false);
    return <CustomModal
    title={"Clear this chat ?"}
    description={""}
    visible={clearChatModal}
    setvisible={setclearChatModal}
    AdditionalContent={() => {
        return <View style={{flexDirection:"row",maxWidth:250,marginRight:30,alignItems:"center",alignSelf:'flex-start',marginTop:-20 }}>
        <CheckBox
            containerStyle={{ backgroundColor: CUSTOM_MODAL_BACKGROUND,marginLeft:0 }}
            checked={c}
            onPress={() => sc(p => !p)}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor={ACTIVE_TAB_GREEN_COLOR}
        />
        <Text style={{color:CHAT_DATA_STATUS_COLOR}}>Also delete the media received in the chat from the device gallery</Text>
    </View>
    }}
    secondBtnText="Clear chat"
    handleCancelPressed={() => {}}
    handleSucess={handleClearChat}
    />
}


export const ReportModal = ({showReportModal,setshowReportModal,name,handleSuccess,checkedReport,setCheckedReport}) => {
    return <CustomModal
    visible={showReportModal}
    setvisible={setshowReportModal}
    AdditionalContent={() => {
        return        <View style={{flexDirection:"row",maxWidth:250,marginRight:30,alignItems:"center",alignSelf:'flex-start',marginTop:0 }}>
        <CheckBox
            containerStyle={{ backgroundColor: CUSTOM_MODAL_BACKGROUND,marginLeft:0 }}
            checked={checkedReport}
            onPress={() => setCheckedReport(prev => !prev)}
            iconType="material-community"
            checkedIcon="checkbox-marked"
            uncheckedIcon="checkbox-blank-outline"
            checkedColor={ACTIVE_TAB_GREEN_COLOR}
        />
        <Text style={{color:CHAT_DATA_STATUS_COLOR}}>Block contact and delete chat</Text>
    </View>
    }}
    title={`Report ${name} ?`}
    description="This last 5 messages from this contact will be forwarded to WhatsApp This contact will not be notified "
    secondBtnText={"Report"}
    handleCancelPressed={() => {}}
    handleSucess={handleSuccess}
    
    />
}


