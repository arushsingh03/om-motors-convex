import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  Text,
  ScrollView,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Add this import for eye icons

export const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    React.useState(false);

  const register = useMutation(api.auth.register);

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        phone: form.phone,
        address: form.address,
      });
      navigation.replace("Login");
    } catch (error) {
      console.error(error);
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
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Create Account</Text>
              <Text style={styles.subHeaderText}>
                Please fill in the details below
              </Text>
            </View>

            <View style={styles.formContainer}>
              <TextInput
                label="Name"
                value={form.name}
                onChangeText={(text) => setForm({ ...form, name: text })}
                mode="outlined"
                style={styles.input}
                theme={{ colors: { primary: "#FF0000" } }}
                outlineColor="#000000"
              />
              <TextInput
                label="Email"
                value={form.email}
                onChangeText={(text) => setForm({ ...form, email: text })}
                mode="outlined"
                style={styles.input}
                theme={{ colors: { primary: "#FF0000" } }}
                outlineColor="#000000"
              />
              <TextInput
                label="Password"
                value={form.password}
                onChangeText={(text) => setForm({ ...form, password: text })}
                secureTextEntry={!passwordVisible}
                mode="outlined"
                style={styles.input}
                theme={{ colors: { primary: "#FF0000" } }}
                outlineColor="#000000"
                right={
                  <TextInput.Icon
                    icon={() =>
                      passwordVisible ? (
                        <Icon
                          name="eye-off"
                          size={24}
                          onPress={() => setPasswordVisible(false)}
                        />
                      ) : (
                        <Icon
                          name="eye"
                          size={24}
                          onPress={() => setPasswordVisible(true)}
                        />
                      )
                    }
                  />
                }
              />
              <TextInput
                label="Confirm Password"
                value={form.confirmPassword}
                onChangeText={(text) =>
                  setForm({ ...form, confirmPassword: text })
                }
                secureTextEntry={!confirmPasswordVisible}
                mode="outlined"
                style={styles.input}
                theme={{ colors: { primary: "#FF0000" } }}
                outlineColor="#000000"
                right={
                  <TextInput.Icon
                    icon={() =>
                      confirmPasswordVisible ? (
                        <Icon
                          name="eye-off"
                          size={24}
                          onPress={() => setConfirmPasswordVisible(false)}
                        />
                      ) : (
                        <Icon
                          name="eye"
                          size={24}
                          onPress={() => setConfirmPasswordVisible(true)}
                        />
                      )
                    }
                  />
                }
              />
              <TextInput
                label="Phone"
                value={form.phone}
                onChangeText={(text) => setForm({ ...form, phone: text })}
                mode="outlined"
                style={styles.input}
                theme={{ colors: { primary: "#FF0000" } }}
                outlineColor="#000000"
              />
              <TextInput
                label="Address"
                value={form.address}
                onChangeText={(text) => setForm({ ...form, address: text })}
                mode="outlined"
                style={styles.input}
                theme={{ colors: { primary: "#FF0000" } }}
                outlineColor="#000000"
                multiline
                numberOfLines={3}
              />

              <Button
                mode="contained"
                onPress={handleRegister}
                style={styles.registerButton}
                buttonColor="#FF0000"
              >
                Register
              </Button>

              <Button
                mode="outlined"
                onPress={() => navigation.navigate("Login")}
                style={styles.loginButton}
                textColor="#000000"
              >
                Back to Login
              </Button>
            </View>
          </View>
        </ScrollView>
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
    marginTop: 85,
  },
  contentContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 15,
    padding: 20,
    margin: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#FF0000",
    fontWeight: "bold",
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: "#000",
  },
  formContainer: {
    width: "100%",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  registerButton: {
    marginTop: 10,
    marginBottom: 10,
    paddingVertical: 8,
  },
  loginButton: {
    borderColor: "#000000",
  },
});
