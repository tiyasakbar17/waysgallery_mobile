import { Text, View } from 'native-base'
import React from 'react'
import { StyleSheet, Image } from 'react-native'

const Card = ({ image, fullName, description, title, avatar, time }) => {
    var options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(time).toLocaleDateString("id-ID", options)
    // const date = new Date(Date.now()).toLocaleDateString("id-ID", options)
    return (
        <View style={styles.cardContainer}>
            <View style={styles.upperField}>
                <View style={styles.namecontainer}>
                    <View style={styles.avatar}>
                        <Image style={styles.image}
                            source={{ uri: avatar || 'https://pbs.twimg.com/profile_images/1309197377903886342/9AznESJy.jpg' }}
                        />
                    </View>
                    <View style={styles.titleContainer} >
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            {title || "Ini Title"}
                        </Text>
                        <Text>
                            {fullName || "Tiyas Tamvan"}
                        </Text>
                    </View>
                </View>
                <View>
                    <Text style={{ fontSize: 12 }} >
                        {date}
                    </Text>
                </View>
            </View>
            <View style={styles.imageContainer}>
                <Image style={styles.image}
                    source={{ uri: image || 'https://cdns.klimg.com/kapanlagi.com/wallpaper/img/the-changcuters-5502.jpg' }}
                />
            </View>
            <Text>
                {description || "ini Descrirptions"}
            </Text>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    namecontainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"
    },
    imageContainer: {
        marginTop: 5,
        width: "100%",
        height: 250
    },
    image: {
        borderRadius: 5,
        width: "100%",
        height: "100%",
        resizeMode: 'cover'
    },
    cardContainer: {
        width: "95%",
        height: 350,
        marginTop: 20,
        marginRight: "auto",
        marginLeft: "auto",
        marginBottom: 10,
    },
    upperField: {
        width: "98%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 40,
        backgroundColor: "#2fc4b2",
        overflow: "hidden"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 10
    }
})
