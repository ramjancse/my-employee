import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const Button = ({title, onPress}) => {
    return (
        <TouchableOpacity style={styles.button}>
            <Text style={styles.titleText} onPress = {onPress}> {title} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button  : {
        width : 165,
        height: 45,
        backgroundColor : '#FFE600',
        justifyContent : 'center',
        alignItems : 'center',
        borderRadius: 25,
    },
    titleText : {
        fontSize : 15,
        fontWeight: 'bold',
        color : '#333333'
    }
})
export default Button
