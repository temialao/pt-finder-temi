import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { UserContext } from "../UserContext";

const LoginScreen = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currUser) => {
      if (currUser) {
        setUser(currUser);
        navigation.navigate("Dashboard");
      }
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.inputContainer}>
        {/* <Image source={require("../images/app-logo.png")} /> */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
        />
      </View>
      <h3>User Logged in: {user?.email}</h3>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate("RegisterScreen");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonOutlineText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  inputContainer: { width: "80%" },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: { color: "white", fontWeight: "700", fontSize: 16 },
  buttonOutlineText: { color: "white", fontWeight: "700", fontSize: 16 },
});

export default LoginScreen;
export { styles };
