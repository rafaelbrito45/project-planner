import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import Icon from "react-native-vector-icons/FontAwesome5";
import EntypoIcon from "react-native-vector-icons/Entypo";

function AddProject({ navigation }) {
  const [options, setOptions] = useState({
    announcements: false,
    indentity: false,
    development: false,
  });

  const [project, setProject] = useState({
    title: "",
    time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    status: "Em andamento",
    period: "30",
    dayOrMonth: "Dias",
    urgency: "Alta",
    need: "",
  });

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState("date");

  const [titleError, setTitleError] = useState("");
  const [needError, setNeedsError] = useState("");

  const onTimeChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
    setProject({
      ...project,
      time: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
    });
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showTimepicker = () => {
    return showMode("time");
  };

  const goBack = () => {
    navigation.navigate("Home");
  };

  const handleSubmit = async () => {
    if (project.title === "") {
      setTitleError("Preencha o tipo do projeto");
    }

    if (project.need === "") {
      setNeedsError("Selecione a necessidade");
    }

    if (titleError !== "" || needError !== "") {
      return;
    }

    axios
      .post("https://6531b4f54d4c2e3f333d3cc8.mockapi.io/api/projects", project)
      .then((response) => {
        console.log(response);
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          goBack();
        }}
      >
        <View style={styles.backIcon}>
          <Icon name="arrow-left" size={20} color={"#787a79"} />
        </View>
      </TouchableOpacity>
      <Text style={styles.title}>Nova demanda</Text>

      <View style={styles.input}>
        <Text style={styles.inputLabel}>Tipo do projeto</Text>
        <View style={styles.inputAndIcon}>
          <View style={styles.icon}>
            <Icon name="briefcase" size={20} color={"#787a79"} />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="nome do projeto"
            underlineColorAndroid={"transparent"}
            value={project.title}
            onChangeText={(title) => {
              setProject({ ...project, title });
            }}
          />
        </View>
        <Text style={styles.error}>{titleError}</Text>
      </View>

      <Text style={styles.inputLabel}>Urgência e tempo esperado</Text>
      <View style={styles.periodAndUrgency}>
        <View
          style={{
            top: 17,
            left: 20,
            zIndex: 10,
          }}
        >
          <Icon name="exclamation" size={20} color={"#787a79"} />
        </View>
        <View style={styles.urgencyPickerInput}>
          <Picker
            selectedValue={project.urgency}
            onValueChange={(itemValue, itemIndex) => {
              setProject({ ...project, urgency: itemValue });
            }}
          >
            <Picker.Item label="Alta" value="Alta" />
            <Picker.Item label="Moderada" value="Moderada" />
            <Picker.Item label="Baixa" value="Baixa" />
          </Picker>
        </View>

        <View style={styles.projectPeriod}>
          <View style={styles.icon}>
            <Icon name="calendar-week" size={15} color={"#787a79"} />
          </View>
          <TextInput
            style={styles.projectPeriodNumber}
            value={project.period}
            keyboardType="phone-pad"
            onChangeText={(text) => {
              setProject({ ...project, period: text });
            }}
          />
          <Picker
            style={styles.projectPeriodPicker}
            selectedValue={project.dayOrMonth}
            onValueChange={(itemValue, itemIndex) => {
              setProject({ ...project, dayOrMonth: itemValue });
            }}
          >
            <Picker.Item label="Dias" value="Dias" />
            <Picker.Item label="Meses" value="Meses" />
          </Picker>
        </View>
      </View>

      <View style={styles.needs}>
        <Pressable
          onPress={() => {
            setOptions({
              ...options,
              indentity: true,
              announcements: false,
              development: false,
            });
            setProject({ ...project, need: "indentity" });
          }}
          style={[
            options.indentity ? styles.optionActive : styles.option,
            styles.btn,
          ]}
        >
          <View style={styles.needIcon}>
            <Icon
              name="lightbulb"
              size={30}
              color={options.indentity ? "#FFF" : "#b0b5b2"}
            />
          </View>
          <Text
            style={[
              options.indentity ? { color: "#FFF" } : { color: "#000" },
              styles.needText,
            ]}
          >
            Identidade
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setOptions({
              ...options,
              announcements: true,
              indentity: false,
              development: false,
            });
            setProject({ ...project, need: "announcements" });
          }}
          style={[
            options.announcements ? styles.optionActive : styles.option,
            styles.btn,
          ]}
        >
          <View style={styles.needIcon}>
            <EntypoIcon
              name="megaphone"
              size={30}
              color={options.announcements ? "#FFF" : "#b0b5b2"}
            />
          </View>
          <Text
            style={[
              options.announcements ? { color: "#FFF" } : { color: "#000" },
              ,
              styles.needText,
            ]}
          >
            Anúncios
          </Text>
        </Pressable>

        <Pressable
          onPress={() => {
            setOptions({
              ...options,
              announcements: false,
              indentity: false,
              development: true,
            });
            setProject({ ...project, need: "development" });
          }}
          style={[
            options.development ? styles.optionActive : styles.option,
            styles.btn,
          ]}
        >
          <View style={styles.needIcon}>
            <Icon
              name="person-booth"
              size={30}
              color={options.development ? "#FFF" : "#b0b5b2"}
            />
          </View>
          <Text
            style={[
              options.development ? { color: "#FFF" } : { color: "#000" },
              ,
              styles.needText,
            ]}
          >
            Desenvolvimento
          </Text>
        </Pressable>
      </View>
      <Text style={styles.error}>{needError}</Text>

      <View style={styles.notification}>
        <Text style={styles.inputLabel}>Notificações</Text>

        <View style={styles.datePicker}>
          <View style={styles.outputAndIcon}>
            <View style={styles.icon}>
              <Icon name="calendar-week" size={15} color={"#787a79"} />
            </View>
            <TextInput
              onChangeText={(text) => {
                setProject({ ...project, time: text });
              }}
              style={styles.datePickerOutput}
              value={project.time}
              editable={false}
            />
          </View>

          <Pressable style={styles.addTime} onPress={showTimepicker}>
            <Icon name="plus" size={15} color={"#1BD15D"} />
          </Pressable>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={false}
              onChange={onTimeChange}
            />
          )}
        </View>
      </View>

      <View style={{ marginTop: 62 }}>
        <TouchableOpacity
          style={styles.sendButton}
          onPress={() => {
            handleSubmit();
          }}
        >
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const defaultBlack = "#0A0909";
const inputColor = "#F8F8F6";
const activeGreen = "#1BD15D";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingTop: 80,
  },
  backIcon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 38,
    color: defaultBlack,
    marginBottom: 12,
    fontWeight: "bold",
  },
  input: {
    marginBottom: 20,
  },
  inputLabel: {
    color: defaultBlack,
    fontSize: 15,
    marginBottom: 14,
  },
  inputAndIcon: {
    flexDirection: "row",
    width: 319,
    height: 48,
    padding: 14,
    borderRadius: 24,
    backgroundColor: inputColor,
  },
  icon: {
    justifyContent: "center",
    marginRight: 15,
  },
  needIcon: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  periodAndUrgency: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  urgencyPickerInput: {
    backgroundColor: inputColor,
    borderRadius: 14,
    width: 160,
    paddingLeft: 15,
  },
  projectPeriod: {
    flexDirection: "row",
    backgroundColor: inputColor,
    borderRadius: 14,
    width: 152,
    paddingHorizontal: 10,
  },
  projectPeriodPicker: {
    width: 120,
  },
  projectPeriodNumber: {
    width: 30,
    marginLeft: 10,
  },
  needs: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  notification: {
    marginTop: 10,
  },
  needText: {
    fontSize: 10,
  },
  btn: {
    height: 96,
    width: 96,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  option: {
    backgroundColor: inputColor,
  },
  optionActive: {
    backgroundColor: activeGreen,
  },
  datePicker: {
    flexDirection: "row",
    marginTop: 4,
  },
  outputAndIcon: {
    flexDirection: "row",
    backgroundColor: inputColor,
    width: 255,
    height: 48,
    marginRight: 20,
    borderRadius: 14,
    paddingHorizontal: 20,
    paddingVertical: 14,
    alignItems: "center",
  },
  datePickerOutput: {
    color: "#0A0909",
    height: 48,
    borderRadius: 14,
    fontSize: 17,
    padding: 10,
    marginRight: 16,
  },
  addTime: {
    width: 48,
    height: 48,
    borderRadius: 14,
    padding: 12,
    backgroundColor: "#acfad3",
    justifyContent: "center",
    alignItems: "center",
  },
  sendButton: {
    width: 319,
    height: 56,
    backgroundColor: activeGreen,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  sendText: {
    color: "#FFF",
    fontSize: 17,
  },
  error: {
    fontSize: 10,
    marginTop: 10,
    marginLeft: 15,
    color: "red",
  },
});

export default AddProject;
