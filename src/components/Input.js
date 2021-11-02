import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const Input = ({ placeholder, onChangeText, secureTextEntry = false }) => {
  return (
    <View style={styles.input}>
      <TextInput
        // placeholder = {placeholder}
        autoCorrect={false}
        placeholderTextColor="#3A4374"
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F7F8FD",
    marginVertical: 10,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    color: "#3A4374",
  },
});

export default Input;
