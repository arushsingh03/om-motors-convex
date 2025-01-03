import React from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { TextInput, Button, HelperText } from "react-native-paper";

export const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const login = useMutation(api.auth.login);

  const handleLogin = async () => {
    try {
      await login({ email, password });
      navigation.replace("Home");
    } catch (error: unknown) {
      console.error(error);
      if (error instanceof Error) {
        if (error.message.includes("email")) {
          setEmailError("Invalid email address.");
        } else if (error.message.includes("password")) {
          setPasswordError("Incorrect password.");
        } else {
          setEmailError("");
          setPasswordError(
            "Login failed. Please check your email and password."
          );
        }
      } else {
        setEmailError("");
        setPasswordError("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.logoText}>
              Effortless <Text style={styles.logoTextHighlight}>Transport</Text>
            </Text>
            <Text style={styles.logoText}>
              Solutions at your{" "}
              <Text style={styles.logoTextHighlight}>Fingertips.</Text>
            </Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: "#FF0000" } }}
              outlineColor="#000000"
              error={!!emailError}
            />
            <HelperText type="error" visible={!!emailError}>
              {emailError}
            </HelperText>

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              mode="outlined"
              style={styles.input}
              theme={{ colors: { primary: "#FF0000" } }}
              outlineColor="#000000"
              error={!!passwordError}
            />
            <HelperText type="error" visible={!!passwordError}>
              {passwordError}
            </HelperText>

            <Button
              mode="contained"
              onPress={handleLogin}
              style={styles.loginButton}
              buttonColor="#FF0000"
            >
              Login
            </Button>

            <Button
              mode="outlined"
              onPress={() => navigation.navigate("Register")}
              style={styles.registerButton}
              textColor="#000000"
            >
              Register
            </Button>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  contentContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  logoText: {
    fontSize: 20,
    color: "#000000",
    fontWeight: "bold",
    textAlign: "center",
  },
  logoTextHighlight: {
    color: "#FF0000",
  },
  formContainer: {
    width: "100%",
  },
  input: {
    backgroundColor: "white",
  },
  loginButton: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 8,
  },
  registerButton: {
    borderColor: "#000000",
  },
});
