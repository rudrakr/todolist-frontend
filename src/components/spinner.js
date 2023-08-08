import React from "react";
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Dimensions,
} from "react-native";

// dimenstion
const { width, height } = Dimensions.get("window");

const Spinner = ({ visible, ...props }) => {
  if (!visible) return null;
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.container}>
        <ActivityIndicator color="white" size={height * 0.07} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(1,0,23,0.65)",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Spinner;