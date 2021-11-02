import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View
} from "react-native";
import { showMessage } from "react-native-flash-message";
import Button from "../components/Button";
import Input from "../components/Input";
import RadioInput from "../components/RadioInput";
import Shift from "../components/Shift";
import { firebase } from "../Config";

const Create = ({ navigation, route, user }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setgender] = useState("");
  const [day, setDay] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const userid = user.uid;

  const OPTIONS = ["Male", "Female"];
  const DYAS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const onSave = () => {
    //.1 collection reference
    const employeeRef = firebase.firestore().collection("employees");
    setLoading(true);

    //2. tile stamp
    const timeStamp = firebase.firestore.FieldValue.serverTimestamp();

    // create object
    const data = {
      name,
      age,
      gender,
      day,
      authorId: userid,
      createAt: timeStamp,
      image: image,
    };
    //save data
    employeeRef
      .add(data)
      .then((response) => {
        setLoading(false);
        showMessage({
          message: "Employess created successfully",
          type: "success",
        });
        navigation.navigate("Home");
      })
      .catch((error) => {
        setLoading(false);
        showMessage({
          message: "Something went wrong",
          type: "danger",
        });
      });
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    const uri = result.uri;

    if (!result.cancelled) {
      setImageUploading(true);

      //https://github.com/expo/expo/issues/2402#issuecomment-443726662
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };
        xhr.onerror = function () {
          reject(new TypeError("Network request failed"));
        };
        xhr.responseType = "blob";
        xhr.open("GET", uri, true);
        xhr.send(null);
      });

      const imageName = new Date().getTime().toString() + userid;

      //get the reference
      const ref = firebase.storage().ref().child(imageName);

      //upload the blob
      const snapshot = await ref.put(blob);

      //close the bolb
      //   xhr.close();

      //get the url
      const url = await snapshot.ref.getDownloadURL();

      //set image url
      setImage(url);
      setImageUploading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.createEmployee}> Create Employee </Text>
      {imageUploading ? (
        <ActivityIndicator size="small" color="blue" />
      ) : (
        <Pressable style={{ alignSelf: "center" }} onPress={pickImage}>
          <View style={styles.plusSignContainer}>
            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                }}
              />
            ) : (
              <AntDesign name="plus" size={30} color="black" />
            )}
          </View>
        </Pressable>
      )}
      <View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Name</Text>
          <Input
            placeholder=""
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}> Age</Text>
          <Input
            placeholder=""
            onChangeText={(text) => {
              setAge(text);
            }}
          />
        </View>
        <View style={{ marginTop: 20, marginHorizontal: 10 }}>
          {OPTIONS.map((option, index) => (
            <RadioInput
              key={index}
              label={option}
              value={gender}
              setValue={setgender}
            />
          ))}
        </View>
        <View style={{ marginHorizontal: 10 }}>
          <Text> Select shifts </Text>
        </View>
        <View
          style={{ marginTop: 20, flexDirection: "row", marginHorizontal: 10 }}
        >
          {DYAS.map((option, index) => (
            <Shift key={index} label={option} value={day} setValue={setDay} />
          ))}
        </View>

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Create" onPress={onSave} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
    paddingHorizontal: 5,
    backgroundColor: "#fff",
  },
  plusSignContainer: {
    borderWidth: 1,
    borderColor: "#333",
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonContainer: {
    alignItems: "center",
  },
  createEmployee: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginVertical: 20,
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
});

export default Create;
