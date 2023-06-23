import { FlatList, Image, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {SalonData} from './SalonData';
import { SharedElement } from 'react-navigation-shared-element';


const Salon = ({ navigation }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={{
            paddingTop: insets.top,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left,
            paddingRight: insets.right,
        }}>
            <View>
    <FlatList
        data={SalonData}
        keyExtractor={item => item.key}
        contentContainerStyle={{ padding: 10 }}
        renderItem={({ item }) => {
            return (
                <View>
                    
                    <TouchableOpacity
                        onPress={() => navigation.navigate("SalonDetails", { item })}
                        style={[styles.cards_container, {
                            backgroundColor: item.background
                        }]}>
                        <View style={styles.img_container}>
                            <SharedElement id={`item.${item.key}.photo`}>
                                <Image source={item.image} style={styles.image} />
                            </SharedElement>
                        </View>
                        <View style={styles.text_container}>
                                <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.jobtitle}>{item.jobTitle}</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            )
        }}
    />
            </View>
        </View>
    )
}

export default Salon

const styles = StyleSheet.create({
    cards_container: {
        marginBottom: 10,
        borderRadius: 10,
        height: 180,
    },
    image: {
        width: "40%",
        height: null,
        aspectRatio: 1,
        resizeMode: 'cover',
        position: "absolute",
        right: 0,
        marginTop: 10
    },
    text_container: {
        width: "60%",
        padding: 10
    },
    title: {
        fontSize: 25,
        fontWeight: "bold"
    },
    jobtitle: {
        fontSize: 13,
        marginTop: 10,
        fontWeight: "400"
    }
})