import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { HomeScreen } from "../screens/HomeScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { RegisterScreen } from "../screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import { ChatScreen } from "../screens/ChatScreen";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { User } from "../types";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { MessageSquareText, LogOut } from "lucide-react-native";

// Define the type for your navigation parameters
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
  Chat: undefined;
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
        onPress={() => navigation.navigate("Chat")}
        icon={() => <MessageSquareText size={20} color="#FF3B30" />}
      >
        {/* Empty fragment as children */}
        <></>
      </Button>
      <Button
        mode="text"
        compact
        onPress={() => navigation.replace("Login")}
        icon={() => <LogOut size={20} color="#FF3B30" />}
      >
        {/* Empty fragment as children */}
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
