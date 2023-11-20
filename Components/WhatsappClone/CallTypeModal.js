import React, { useState } from 'react';

import {
    Button,
    Dialog,
    CheckBox,
    ListItem,
    Avatar,
    Icon
} from '@rneui/themed';
import { ACTIVE_TAB_GREEN_COLOR, TAB_BACKGROUND_COLOR, TITLE_COLOR } from './Variables';

const CallTypeArray = [{ key: 1, type: "Video" }, { key: 2, type: "Voice" }]

const CallTypeModal = ({ visibleTypeModal = false, setvisibleTypeModal, setVoice, setVideo }) => {
    const [checked, setChecked] = useState(1);


    return (
        <Dialog
            isVisible={visibleTypeModal}
            overlayStyle={{ backgroundColor: TAB_BACKGROUND_COLOR }}
            onBackdropPress={() => setvisibleTypeModal(p => !p)}
        >
            <Dialog.Title title="Select Call Type" titleStyle={{ color: TITLE_COLOR }} />
            {CallTypeArray.map((item, i) => (
                <CheckBox
                    title={item.type}
                    containerStyle={{ backgroundColor: TAB_BACKGROUND_COLOR, borderWidth: 0 }}
                    checkedColor={ACTIVE_TAB_GREEN_COLOR}
                    checkedIcon={
                        <Icon
                            name="radio-button-checked"
                            type="material"
                            color={ACTIVE_TAB_GREEN_COLOR}
                            size={25}
                        />
                    }
                    uncheckedIcon={
                        <Icon
                            name="radio-button-unchecked"
                            type="material"
                            color={"grey"}
                            size={25}
                        />
                    }
                    checked={checked === i + 1}
                    onPress={() => {
                        setChecked(i + 1);

                        if (checked == 2) {
                            setVoice(false);
                            setVideo(true);
                            setTimeout(() => {
                                setvisibleTypeModal(p => !p);
                            }, 200);
                        } else if (checked == 1) {
                            setVoice(true);
                            setVideo(false);
                            setTimeout(() => {
                                setvisibleTypeModal(p => !p);
                            }, 200);
                        }
                    }}
                    textStyle={{ fontSize: 18, color: TITLE_COLOR }}
                />
            ))}
        </Dialog>
    )
}

export default CallTypeModal;
