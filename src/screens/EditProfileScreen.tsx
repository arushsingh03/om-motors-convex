import React from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { User } from "../types";
import { Save } from "lucide-react-native";
import { api } from "../../convex/_generated/api";
import { useQuery, useMutation } from "convex/react";
import { TextInput, Button } from "react-native-paper";

export const EditProfileScreen = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const { userId } = route.params;
  const user = useQuery(api.auth.getUserById, { userId }) as User | null;
  const updateProfile = useMutation(api.auth.updateProfile);

  const [name, setName] = React.useState(user?.name || "");
  const [phone, setPhone] = React.useState(user?.phone || "");
  const [address, setAddress] = React.useState(user?.address || "");
  const [password, setPassword] = React.useState("");

  const handleUpdateProfile = async () => {
    try {
      await updateProfile({ userId, name, phone, address, password });
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/whitebg.jpg")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.contentContainer}>
            <Text style={styles.headerText}>Edit Profile</Text>

            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Phone"
              value={phone}
              onChangeText={setPhone}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Address"
              value={address}
              onChangeText={setAddress}
              style={styles.input}
              mode="outlined"
            />
            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              mode="outlined"
              secureTextEntry
            />
            <Button
              mode="contained"
              onPress={handleUpdateProfile}
              contentStyle={styles.saveButton}
              buttonColor="#FF0000"
              icon={() => <Save size={20} color="white" />}
            >
              Save Changes
            </Button>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    backgroundColor: "rgb(255, 255, 255)",
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
    width: "90%",
  },
  headerText: {
    fontSize: 24,
    color: "#FF0000",
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    marginBottom: 16,
    backgroundColor: "white",
  },
  saveButton: {
    paddingVertical: 8,
  },
});
