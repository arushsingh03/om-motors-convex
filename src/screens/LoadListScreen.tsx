import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import MapView, { Marker } from 'react-native-maps';
import { SearchDates } from '../types';

interface LoadListScreenProps {
  isAdmin: boolean;
}

export const LoadListScreen: React.FC<LoadListScreenProps> = ({ isAdmin }) => {
  const loads = useQuery(api.loads.list);
  const [searchDates, setSearchDates] = React.useState<SearchDates>({
    from: null,
    to: null,
  });
  const [searchLocation, setSearchLocation] = React.useState('');

  const filteredLoads = React.useMemo(() => {
    if (!loads) return [];
    
    if (!isAdmin) {
      return loads.filter(load => 
        new Date(load.createdAt).toDateString() === new Date().toDateString()
      );
    }

    return loads.filter(load => {
      if (searchDates.from && searchDates.to) {
        const loadDate = new Date(load.createdAt);
        if (loadDate < searchDates.from || loadDate > searchDates.to) {
          return false;
        }
      }
      
      if (searchLocation) {
        return load.currentLocation.includes(searchLocation) ||
               load.destinationLocation.includes(searchLocation);
      }
      return true;
    });
  }, [loads, searchDates, searchLocation, isAdmin]);

  return (
    <View style={styles.container}>
      {isAdmin && (
        <View style={styles.searchContainer}>
          {/* Add search components */}
        </View>
      )}
      <FlatList
        data={filteredLoads}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            {!isAdmin && (
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
            )}
            <Card.Content>
              <Title>{item.currentLocation} → {item.destinationLocation}</Title>
              <Paragraph>Weight: {item.weight} {item.weightUnit}</Paragraph>
              <Paragraph>Length: {item.truckLength} {item.lengthUnit}</Paragraph>
              <Paragraph>Contact: {item.contactNumber}</Paragraph>
            </Card.Content>
          </Card>
        )}
        keyExtractor={item => item._id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  map: {
    height: 200,
    marginBottom: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  }
});