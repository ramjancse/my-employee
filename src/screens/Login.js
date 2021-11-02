import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { showMessage } from "react-native-flash-message";
import Button from "../components/Button";
import Input from "../components/Input";
import { firebase } from "../Config";

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email.trim(), password)
      .then((response) => {
        setLoading(false);
        navigation.navigate("Home");
      })
      .catch(() => {
        setLoading(false);
        showMessage({
          message: "Something went wrong",
          type: "danger",
        });
      });
  };
  const signup = () => {
    navigation.navigate("Signup");
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff" }}>
      <View style={{ marginVertical: 20 }}>
        <Image
          source={require("../../assets/login.png")}
          style={styles.imageContainer}
        />

        <View style={{ marginVertical: 10 }}>
          <Text
            style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}
          >
            {" "}
            MANAGE ALL YOUR EMPLOYEES{" "}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
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
            <Input
              placeholder=""
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry={true}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Login" onPress={login} />
          )}
        </View>

        <TouchableOpacity style={styles.createAccount} onPress={signup}>
          <Text style={{ textAlign: "center" }}>
            {" "}
            Don’t have an account?{" "}
            <Text style={styles.insideText}> Signup </Text>{" "}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: undefined,
    aspectRatio: 16 / 9,
    alignSelf: "center",
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    color: "#3A4374",
    fontSize: 15,
    fontWeight: "bold",
    marginHorizontal: 5,
  },
  buttonContainer: {
    alignItems: "center",
  },
  insideText: {
    color: "#18B18D",
  },
  createAccount: {
    color: "#000000",
    fontSize: 12,
    textAlign: "center",
    marginTop: 20,
  },
});

export default Login;
