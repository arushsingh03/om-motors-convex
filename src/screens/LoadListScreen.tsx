import React from "react";
import { format } from "date-fns";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import MapView, { Marker } from "react-native-maps";
import { View, FlatList, StyleSheet } from "react-native";
import { Card, Title, Text, Divider } from "react-native-paper";

interface LoadListScreenProps {
  isAdmin: boolean;
  searchParams?: {
    location: string;
    dates: {
      from: Date;
      to: Date;
    };
  };
}

export const LoadListScreen: React.FC<LoadListScreenProps> = ({
  isAdmin,
  searchParams,
}) => {
  const loads = useQuery(api.loads.list);

  const filteredLoads = React.useMemo(() => {
    if (!loads) return [];

    if (!isAdmin) {
      return loads.filter(
        (load) =>
          new Date(load.createdAt).toDateString() === new Date().toDateString()
      );
    }

    return loads.filter((load) => {
      if (searchParams?.dates.from && searchParams?.dates.to) {
        const loadDate = new Date(load.createdAt);
        if (
          loadDate < searchParams.dates.from ||
          loadDate > searchParams.dates.to
        ) {
          return false;
        }
      }

      if (searchParams?.location) {
        const searchTerm = searchParams.location.toLowerCase();
        return (
          load.currentLocation.toLowerCase().includes(searchTerm) ||
          load.destinationLocation.toLowerCase().includes(searchTerm)
        );
      }
      return true;
    });
  }, [loads, searchParams, isAdmin]);

  const renderTableRow = (label: string, value: string) => (
    <View style={styles.tableRow}>
      <View style={styles.tableCell}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      <View style={[styles.tableCell, styles.valueCellBorder]}>
        <Text style={styles.valueText}>{value}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={filteredLoads}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Card style={styles.card} mode="outlined">
          <Card.Content>
            <Title style={styles.cardTitle}>Load Details</Title>
            <Divider style={styles.divider} />

            <View style={styles.table}>
              {renderTableRow("From Location", item.currentLocation)}
              {renderTableRow("To Location", item.destinationLocation)}
              {renderTableRow("Weight", `${item.weight} ${item.weightUnit}`)}
              {renderTableRow(
                "Truck Length",
                `${item.truckLength} ${item.lengthUnit}`
              )}
              {renderTableRow("Contact Number", item.contactNumber)}
              {renderTableRow("Email", item.email)}
              {renderTableRow(
                "Added On",
                format(new Date(item.createdAt), "MMM dd, yyyy")
              )}
              {renderTableRow(
                "Time",
                format(new Date(item.createdAt), "hh:mm a")
              )}
            </View>

            {!isAdmin && (
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.map}
                  initialRegion={{
                    latitude: item.coordinates.current.latitude,
                    longitude: item.coordinates.current.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                >
                  <Marker coordinate={item.coordinates.current} />
                  <Marker coordinate={item.coordinates.destination} />
                </MapView>
              </View>
            )}
          </Card.Content>
        </Card>
      )}
      keyExtractor={(item) => item._id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 4,
    borderRadius: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FF0000",
    textAlign: "center",
  },
  divider: {
    backgroundColor: "#ddd",
    height: 1,
    marginVertical: 8,
  },
  table: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    overflow: "hidden",
    marginTop: 8,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    padding: 12,
    justifyContent: "center",
  },
  labelText: {
    fontWeight: "bold",
    color: "#333",
    width: 120,
  },
  valueText: {
    color: "#666",
  },
  valueCellBorder: {
    flex: 1,
    borderLeftWidth: 1,
    borderLeftColor: "#ddd",
  },
  mapContainer: {
    marginTop: 16,
    borderRadius: 8,
    overflow: "hidden",
  },
  map: {
    height: 200,
  },
});
