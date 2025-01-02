import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

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
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={form.name}
        onChangeText={(text) => setForm({ ...form, name: text })}
        mode="outlined"
      />
      <TextInput
        label="Email"
        value={form.email}
        onChangeText={(text) => setForm({ ...form, email: text })}
        mode="outlined"
      />
      <TextInput
        label="Password"
        value={form.password}
        onChangeText={(text) => setForm({ ...form, password: text })}
        secureTextEntry
        mode="outlined"
      />
      <TextInput
        label="Confirm Password"
        value={form.confirmPassword}
        onChangeText={(text) => setForm({ ...form, confirmPassword: text })}
        secureTextEntry
        mode="outlined"
      />
      <TextInput
        label="Phone"
        value={form.phone}
        onChangeText={(text) => setForm({ ...form, phone: text })}
        mode="outlined"
      />
      <TextInput
        label="Address"
        value={form.address}
        onChangeText={(text) => setForm({ ...form, address: text })}
        mode="outlined"
        multiline
      />
      <Button mode="contained" onPress={handleRegister}>
        Register
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
