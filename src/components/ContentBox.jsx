import { View, Text, StyleSheet } from "react-native";

function ContentBox({ title, information, icon }) {
  return (
    <View style={styles.box}>
      <Text style={styles.boxInfo}>{information}</Text>
      <Text style={styles.boxTitle}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 130,
    height: 130,
    marginTop: 25,
    backgroundColor: "#F8F8F6",
    borderRadius: 14,
    alignItems: "center",
  },
  boxInfo: {
    fontSize: 15,
    margin: 15,
  },
  boxTitle: {
    fontSize: 10,
  },
});

export default ContentBox;
