import React from "react";
import { Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { AddLoadScreen } from "../screens/AddLoadScreen";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { User } from "../types";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { ChatScreen } from "../screens/ChatScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { EditProfileScreen } from "../screens/EditProfileScreen";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import {
  MessageSquareText,
  LogOut,
  User as UserIcon,
} from "lucide-react-native";

// Update the type for your navigation parameters
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Chat: undefined;
  Profile: undefined;
  EditProfile: { userId: string };
  AddLoad: undefined; // Add this line
};

// Create a typed version of the stack navigator
const Stack = createStackNavigator<RootStackParamList>();

// Type for the navigation prop
type NavigationProp = StackNavigationProp<RootStackParamList>;

interface HeaderComponentProps {
  navigation: NavigationProp;
}

export const AppNavigator = () => {
  const user = useQuery(api.auth.getUser) as User | null;

  const HeaderRight = ({ navigation }: HeaderComponentProps) => (
    <View style={styles.headerButtonsContainer}>
      <Button
        mode="text"
        compact
        onPress={() => navigation.navigate("Profile")}
        icon={() => <UserIcon size={20} color="#FF3B30" />}
      >
        <></>
      </Button>
      <Button
        mode="text"
        compact
        onPress={() => navigation.navigate("Chat")}
        icon={() => <MessageSquareText size={20} color="#FF3B30" />}
      >
        <></>
      </Button>
      <Button
        mode="text"
        compact
        onPress={() => navigation.replace("Login")}
        icon={() => <LogOut size={20} color="#FF3B30" />}
      >
        <></>
      </Button>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea} edges={["right", "left"]}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={({ navigation }) => ({
              headerStyle: {
                backgroundColor: "#fff",
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 1,
                borderBottomColor: "#E5E5E5",
              },
              headerTitleStyle: {
                fontWeight: "600",
                color: "#000",
              },
              headerRight: () => <HeaderRight navigation={navigation} />,
            })}
          >
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                title: "Dashboard",
              }}
            />
            <Stack.Screen
              name="Chat"
              component={ChatScreen}
              options={{
                title: "Messages",
              }}
            />
            <Stack.Screen
              name="Profile"
              component={ProfileScreen}
              options={{
                title: "Profile",
              }}
            />
            <Stack.Screen
              name="EditProfile"
              component={EditProfileScreen}
              options={{
                title: "Edit Profile",
              }}
            />
            {/* Add this new screen */}
            <Stack.Screen
              name="AddLoad"
              component={AddLoadScreen}
              options={{
                title: "Add Load",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
  },
  headerButton: {
    marginHorizontal: 4,
  },
});
