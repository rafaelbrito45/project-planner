import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Picker } from "@react-native-picker/picker";
import ContentBox from "./ContentBox";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import FontIcon from "react-native-vector-icons/FontAwesome";

function Project({
  title,
  time,
  status,
  urgency,
  dayOrMonth,
  period,
  id,
  need,
  watchModalStatus,
}) {
  const [displayModal, setDisplayModal] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  const requestProject = (method) => {
    console.log(method);
    if (newStatus !== status || method === "delete") {
      axios({
        method,
        url: `https://6531b4f54d4c2e3f333d3cc8.mockapi.io/api/projects/${id}`,
        data: { status: newStatus },
      })
        .then((response) => {
          console.log(response.data);
          setDisplayModal(false);
          watchModalStatus();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleNeeds = (need) => {
    if (need === "announcements") {
      return "Anúncios";
    }
    if (need === "identity") {
      return "Identidade";
    }
    if (need === "development") {
      return "Desenvolvimento";
    }
  };
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setDisplayModal(true);
      }}
    >
      <View style={styles.icon}>
        <Icon name="briefcase" size={20} color={"#787a79"} />
      </View>

      <View style={styles.cardText}>
        <Text>{title}</Text>
        <Text>
          {time} - {status}
        </Text>
      </View>
      <View style={styles.rightIcon}>
        <Icon name="greater-than" size={10} color={"#787a79"} />
      </View>

      <Modal animationType="slide" visible={displayModal}>
        <View style={styles.container}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setDisplayModal(false);
                watchModalStatus();
              }}
            >
              <FontIcon name="close" size={20} color={"#787a79"} />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.textTitle}>{title}</Text>
          </View>
          <View style={styles.content}>
            <ContentBox
              title={"Período"}
              information={`${period} ${dayOrMonth}`}
            />
            <ContentBox title={"Urgência"} information={urgency} />
            <ContentBox title={"Necessidade"} information={handleNeeds(need)} />
          </View>

          <View style={styles.statusPicker}>
            <Text>Marcar Projeto como :</Text>
            <Picker
              styles={styles.pickerInput}
              selectedValue={newStatus}
              onValueChange={(itemValue, itemIndex) => {
                setNewStatus(itemValue);
              }}
            >
              <Picker.Item label="Finalizado" value="Finalizado" />
              <Picker.Item label="Em andamento" value="Em andamento" />
              <Picker.Item label="Adiado" value="Adiado" />
            </Picker>

            <TouchableOpacity
              style={styles.update}
              onPress={() => {
                requestProject("put");
              }}
            >
              <Text style={styles.updateLabel}>Atualizar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.delete}
              onPress={() => {
                requestProject("delete");
              }}
            >
              <Text style={styles.updateLabel}>Deletar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F8F8F6",
    borderRadius: 24,
    width: 319,
    height: 72,
    padding: 15,
    marginBottom: 12,
    flexDirection: "row",
  },
  cardText: {
    marginLeft: 15,
    width: 225,
  },
  icon: {
    justifyContent: "center",
  },
  rightIcon: {
    justifyContent: "center",
    width: 20,
    alignItems: "flex-end",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 28,
  },
  textTitle: {
    fontSize: 27,
    marginTop: 20,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  statusPicker: {
    marginTop: 20,
    backgroundColor: "#F8F8F6",
    borderRadius: 14,
    height: 250,
    padding: 20,
  },
  update: {
    alignItems: "center",
    widht: 10,
    height: 30,
    backgroundColor: "#87E4A7C7",
    marginTop: 20,
    borderRadius: 14,
  },
  updateLabel: {
    fontSize: 18,
  },
  pickerInput: {
    backgroundColor: "#F8F8F6",
    width: 100,
  },
  delete: {
    alignItems: "center",
    widht: 10,
    height: 30,
    backgroundColor: "#a83242",
    marginTop: 40,
    borderRadius: 14,
  },
});

export default Project;
