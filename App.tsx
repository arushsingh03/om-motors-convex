import React from "react";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { PaperProvider } from "react-native-paper";
import { AppNavigator } from "./src/navigation/AppNavigator";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL);

export default function App() {
  return (
    <ConvexProvider client={convex}>
      <PaperProvider>
        <AppNavigator />
      </PaperProvider>
    </ConvexProvider>
  );
}
