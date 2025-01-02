import React from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

export const AddLoadScreen = () => {
  const [load, setLoad] = React.useState({
    currentLocation: "",
    destinationLocation: "",
    weight: "",
    weightUnit: "kg",
    truckLength: "",
    lengthUnit: "m",
    contactNumber: "",
    email: "",
    coordinates: {
      current: { latitude: 0, longitude: 0 },
      destination: { latitude: 0, longitude: 0 },
    },
  });

  const addLoad = useMutation(api.loads.add);

  const handleAddLoad = async () => {
    try {
      await addLoad({
        ...load,
        weight: Number(load.weight),
        truckLength: Number(load.truckLength),
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Current Location"
        value={load.currentLocation}
        onChangeText={(text) => setLoad({ ...load, currentLocation: text })}
        mode="outlined"
      />
      {/* Add other fields similarly */}
      <Button mode="contained" onPress={handleAddLoad}>
        Add Load
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
