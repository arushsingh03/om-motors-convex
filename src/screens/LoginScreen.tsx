import React from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";

export const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const login = useMutation(api.auth.login);

  const handleLogin = async () => {
    try {
      await login({ email, password });
      navigation.replace("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        mode="outlined"
      />
      <Button mode="contained" onPress={handleLogin}>
        Login
      </Button>
      <Button onPress={() => navigation.navigate("Register")}>Register</Button>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
