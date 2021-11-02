import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Shift = ({ label, value, setValue, size = "small" }) => {
  const isSelected = value === label;

  return (
    <TouchableOpacity style={sytles.container} onPress={() => setValue(label)}>
      <View
        style={[
          sytles.innerCircle,
          isSelected && sytles.selectedInnerCircle,
          size === "big" && sytles.bigInnerCircle,
        ]}
      >
        <View>
          <Text style={[sytles.day, isSelected && sytles.daySeleected]}>
            {" "}
            {label}{" "}
          </Text>
        </View>
      </View>
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
    height: 16,
    width: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  innerCircle: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 6,
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
    color: "white",
  },
  day: {
    fontSize: 8,
  },
  daySeleected: {
    fontSize: 8,
    color: "white",
  },

  selectedOuterCircle: {
    borderColor: "#D87E4A",
  },
  selectedInnerCircle: {
    backgroundColor: "black",
  },
});
export default Shift;
