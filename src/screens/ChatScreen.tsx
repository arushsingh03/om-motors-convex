import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Card } from "react-native-paper";
import { MessageSquareText } from "lucide-react-native";

export const ChatScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messageList}>
        <Card style={styles.comingSoonCard}>
          <Card.Content
            style={styles.comingSoonContent}

          >
            <MessageSquareText size={80} color="#FF0000" />
            <Text style={styles.comingSoonText}>Coming Soon</Text>
            <Text style={styles.informativeText}>
              We are working hard to bring you an amazing chat experience. Stay
              tuned!
            </Text>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  messageList: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  comingSoonCard: {
    marginVertical: 16,
    marginHorizontal: 16,
    elevation: 6,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
    width: "100%",
    alignSelf: "center",
    shadowColor: "#000",
  },
  comingSoonContent: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: "100%",
  },
  comingSoonText: {
    marginTop: 10,
    fontSize: 28,
    fontWeight: "bold",
  },
  informativeText: {
    marginTop: 10,
    fontSize: 18,
    color: "#666",
    textAlign: "center",
  },
});
