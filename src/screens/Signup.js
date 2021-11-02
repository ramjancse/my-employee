import React, { useState } from "react";
import {
    ActivityIndicator,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { showMessage } from "react-native-flash-message";
import Button from "../components/Button";
import Input from "../components/Input";
import { firebase } from "../Config";

const Signup = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = () => {
    //1. form validation
    //2. setloading true
    setLoading(true);
    //3 create collecions

    firebase
      .auth()
      .createUserWithEmailAndPassword(email.trim(), password)
      .then((response) => {})
      .catch((error) => {
        showMessage({
          message: "Something went wrong",
          type: "danger",
        });
      });
    setLoading(false);
    showMessage({
      message: "User created successfully",
      type: "success",
    });
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}> Email </Text>
        <Input
          placeholder="Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label}> Passwprd </Text>
        </View>
        <View>
          <Text style={styles.subtitle}> Must be at least 8 letters </Text>
        </View>
        <View>
          <Input
            placeholder=""
            onChangeText={(text) => {
              setPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <View>
          <Text style={styles.label}> Confirm password </Text>
        </View>
        <View>
          <Text style={styles.subtitle}> Must match</Text>
        </View>
        <View>
          <Input
            placeholder=""
            onChangeText={(text) => {
              setConfirmPassword(text);
            }}
            secureTextEntry={true}
          />
        </View>
      </View>
      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <Button title="Submit" onPress={signUp} />
        )}
      </View>
      <View>
        <Text style={styles.termsOfService}>
          {" "}
          By continuing, you accept the
          <Text style={styles.insideText}> Terms of Use </Text> and
          <Text style={styles.insideText}> Privacy Policy. </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    color: "#3A4374",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  subtitle: {
    color: "#647196",
    fontSize: 12,
    marginHorizontal: 5,
    marginTop: 5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  termsOfService: {
    color: "#888888",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
  insideText: {
    color: "#18B18D",
  },
});

export default Signup;
