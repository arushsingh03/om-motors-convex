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
import { Button } from "react-native-paper";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { User } from "../types";
import { Edit } from "lucide-react-native";

export const ProfileScreen = ({ navigation }: { navigation: any }) => {
  const user = useQuery(api.auth.getUser) as User | null;

  const userInfo = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Phone", value: user?.phone },
    { label: "Address", value: user?.address },
    { label: "Role", value: user?.role },
  ];

  return (
    <ImageBackground
      source={require("../../assets/whitebg.jpg")}
      style={styles.backgroundImage}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView>
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.headerText}>Profile</Text>
              <Text style={styles.subHeaderText}>
                Your personal information
              </Text>
            </View>

            <View style={styles.tableContainer}>
              {userInfo.map((info, index) => (
                <View style={styles.tableRow} key={index}>
                  <Text style={styles.tableCell}>{info.label}</Text>
                  <Text style={styles.tableCell}>{info.value}</Text>
                </View>
              ))}
            </View>

            <Button
              mode="contained"
              onPress={() =>
                navigation.navigate("EditProfile", { userId: user?._id })
              }
              style={styles.editButton}
              buttonColor="#FF0000"
              icon={() => <Edit size={20} color="white" />}
            >
              Edit Profile
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
    marginTop: 100,
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
    marginTop: 120,
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
    marginBottom: 15,
  },
  tableContainer: {
    width: "100%",
    marginBottom: 20,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#333",
    textAlign: "left",
  },
  editButton: {
    marginTop: 20,
    paddingVertical: 8,
  },
});
