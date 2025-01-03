import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { TextInput, Button, SegmentedButtons } from "react-native-paper";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Truck, MapPin } from "lucide-react-native";

const weightUnits = [
  { label: "KG", value: "kg" },
  { label: "Ton", value: "ton" },
];

const lengthUnits = [
  { label: "Meters", value: "m" },
  { label: "Feet", value: "ft" },
];

export const AddLoadScreen = ({ navigation }: { navigation: any }) => {
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
      navigation.goBack();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.formContainer}>
        <TextInput
          label="Current Location"
          value={load.currentLocation}
          onChangeText={(text) => setLoad({ ...load, currentLocation: text })}
          mode="outlined"
          style={styles.input}
          right={
            <TextInput.Icon icon={() => <MapPin size={20} color="#FF0000" />} />
          }
        />

        <TextInput
          label="Destination Location"
          value={load.destinationLocation}
          onChangeText={(text) =>
            setLoad({ ...load, destinationLocation: text })
          }
          mode="outlined"
          style={styles.input}
          right={
            <TextInput.Icon icon={() => <MapPin size={20} color="#FF0000" />} />
          }
        />

        <View style={styles.row}>
          <TextInput
            label="Weight"
            value={load.weight}
            onChangeText={(text) => setLoad({ ...load, weight: text })}
            mode="outlined"
            keyboardType="numeric"
            style={[styles.input, styles.flex1]}
          />
          <SegmentedButtons
            value={load.weightUnit}
            onValueChange={(value) => setLoad({ ...load, weightUnit: value })}
            buttons={weightUnits}
            style={styles.segmentedButton}
          />
        </View>

        <View style={styles.row}>
          <TextInput
            label="Truck Length"
            value={load.truckLength}
            onChangeText={(text) => setLoad({ ...load, truckLength: text })}
            mode="outlined"
            keyboardType="numeric"
            style={[styles.input, styles.flex1]}
          />
          <SegmentedButtons
            value={load.lengthUnit}
            onValueChange={(value) => setLoad({ ...load, lengthUnit: value })}
            buttons={lengthUnits}
            style={styles.segmentedButton}
          />
        </View>

        <TextInput
          label="Contact Number"
          value={load.contactNumber}
          onChangeText={(text) => setLoad({ ...load, contactNumber: text })}
          mode="outlined"
          keyboardType="phone-pad"
          style={styles.input}
        />

        <TextInput
          label="Email"
          value={load.email}
          onChangeText={(text) => setLoad({ ...load, email: text })}
          mode="outlined"
          keyboardType="email-address"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleAddLoad}
          style={styles.addButton}
          icon={() => <Truck size={20} color="white" />}
        >
          Add Load
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  formContainer: {
    padding: 16,
  },
  input: {
    backgroundColor: "white",
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },
  flex1: {
    flex: 1,
  },
  segmentedButton: {
    width: 150,
  },
  addButton: {
    marginTop: 16,
    backgroundColor: "#FF0000",
    padding: 8,
  },
});
