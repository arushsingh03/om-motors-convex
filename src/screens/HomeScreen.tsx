import React from "react";
import { User } from "../types";
import { useQuery } from "convex/react";
import { View, StyleSheet } from "react-native";
import { LoadListScreen } from "./LoadListScreen";
import { api } from "../../convex/_generated/api";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Button, TextInput, Portal, Modal } from "react-native-paper";
import { Calendar, Search, MapPin, Filter, Plus } from "lucide-react-native";

export const HomeScreen = ({ navigation }: { navigation: any }) => {
  const user = useQuery(api.auth.getUser) as User | null;
  const isAdmin = user?.role === "admin";

  const [showFilterModal, setShowFilterModal] = React.useState(false);
  const [searchParams, setSearchParams] = React.useState({
    location: "",
    dates: {
      from: new Date(),
      to: new Date(),
    },
  });

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [dateType, setDateType] = React.useState<"from" | "to">("from");

  const handleShowDatePicker = (type: "from" | "to") => {
    setDateType(type);
    setShowDatePicker(true);
  };

  const handleSearch = () => {
    setShowFilterModal(false);
    // Implement search logic here
    console.log("Searching with params:", searchParams);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {isAdmin && (
          <>
            <Button
              mode="contained"
              onPress={() => setShowFilterModal(true)}
              icon={() => <Filter size={20} color="white" />}
              style={styles.filterButton}
            >
              Filter Loads
            </Button>
            <Button
              mode="contained"
              onPress={() => navigation.navigate("AddLoad")}
              style={styles.addButton}
              icon={() => <Plus size={20} color="white" />}
            >
              Add Load
            </Button>
          </>
        )}
      </View>

      <LoadListScreen isAdmin={isAdmin} />

      <Portal>
        {/* Filter Modal */}
        <Modal
          visible={showFilterModal}
          onDismiss={() => setShowFilterModal(false)}
          contentContainerStyle={styles.filterModalContainer}
        >
          <View style={styles.filterContent}>
            <View style={styles.dateButtonsContainer}>
              <Button
                mode="contained"
                onPress={() => handleShowDatePicker("from")}
                icon={() => <Calendar size={20} color="white" />}
                style={styles.dateButton}
              >
                From: {searchParams.dates.from.toLocaleDateString()}
              </Button>
              <Button
                mode="contained"
                onPress={() => handleShowDatePicker("to")}
                icon={() => <Calendar size={20} color="white" />}
                style={styles.dateButton}
              >
                To: {searchParams.dates.to.toLocaleDateString()}
              </Button>
            </View>

            <TextInput
              label="Search Load"
              value={searchParams.location}
              onChangeText={(text) =>
                setSearchParams((prev) => ({ ...prev, location: text }))
              }
              mode="outlined"
              style={styles.searchInput}
              right={
                <TextInput.Icon
                  icon={() => <MapPin size={20} color="#FF0000" />}
                />
              }
            />

            <View style={styles.filterActions}>
              <Button
                mode="outlined"
                onPress={() => setShowFilterModal(false)}
                style={styles.cancelButton}
              >
                Cancel
              </Button>
              <Button
                mode="contained"
                onPress={handleSearch}
                icon={() => <Search size={20} color="white" />}
                style={styles.searchButton}
              >
                Apply Filter
              </Button>
            </View>
          </View>
        </Modal>

        {/* Date Picker Modal */}
        <Modal
          visible={showDatePicker}
          onDismiss={() => setShowDatePicker(false)}
          contentContainerStyle={styles.datePickerContainer}
        >
          <DateTimePicker
            value={
              dateType === "from"
                ? searchParams.dates.from
                : searchParams.dates.to
            }
            mode="date"
            onChange={(event, date) => {
              if (date) {
                setSearchParams((prev) => ({
                  ...prev,
                  dates: {
                    ...prev.dates,
                    [dateType]: date,
                  },
                }));
              }
              setShowDatePicker(false);
            }}
          />
        </Modal>
      </Portal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 8,
    marginBottom: 18,
  },
  filterButton: {
    backgroundColor: "#FF0000",
  },
  addButton: {
    backgroundColor: "#FF0000",
  },
  filterModalContainer: {
    backgroundColor: "white",
    margin: 20,
    borderRadius: 8,
  },
  filterContent: {
    padding: 16,
  },
  dateButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    gap: 8,
  },
  dateButton: {
    flex: 1,
    backgroundColor: "#FF0000",
  },
  searchInput: {
    backgroundColor: "white",
    marginBottom: 16,
  },
  filterActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  searchButton: {
    backgroundColor: "#FF0000",
  },
  cancelButton: {
    borderColor: "#FF0000",
  },
  datePickerContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderRadius: 8,
  },
});
