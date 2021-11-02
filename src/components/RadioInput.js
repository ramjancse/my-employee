import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RadioInput = ({ label, value, setValue, size = "small" }) => {
  const isSelected = value === label;

  return (
    <TouchableOpacity style={sytles.container} onPress={() => setValue(label)}>
      <View
        style={[
          sytles.outerCircle,
          isSelected && sytles.selectedOuterCircle,
          size === "big" && sytles.bigOuterCircle,
        ]}
      >
        <View
          style={[
            sytles.innerCircle,
            isSelected && sytles.selectedInnerCircle,
            size === "big" && sytles.bigInnerCircle,
          ]}
        />
      </View>
      <Text style={sytles.gender}> {label} </Text>
    </TouchableOpacity>
  );
};

const sytles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  outerCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 10,
    width: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  bigOuterCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
  bigInnerCircle: {
    height: 16,
    width: 16,
    borderRadius: 8,
  },
  gender: {
    fontWeight: "bold",
    marginLeft: 10,
  },
  selectedOuterCircle: {
    borderColor: "#D87E4A",
  },
  selectedInnerCircle: {
    borderColor: "#D87E4A",
    backgroundColor: "#D87E4A",
  },
});
export default RadioInput;
