import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { LoadListScreen } from "./LoadListScreen";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { User } from "../types";

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const user = useQuery(api.auth.getUser) as User | null;
  const isAdmin = user?.role === "admin";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isAdmin && (
          <Button
            mode="contained"
            onPress={() => navigation.navigate("AddLoad")}
          >
            Add Load
          </Button>
        )}
        <Button mode="text" onPress={() => navigation.navigate("Chat")}>
          Chat
        </Button>
        <Button mode="text" onPress={() => navigation.replace("Login")}>
          Logout
        </Button>
      </View>
      <LoadListScreen isAdmin={isAdmin} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
});
