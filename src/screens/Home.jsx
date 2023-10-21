import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TextInput,
} from "react-native";
import Project from "../components/Project";
import { useEffect, useState } from "react";
import axios from "axios";
import { useIsFocused } from "@react-navigation/native";

export default function Home({ navigation }) {
  const [projects, setProjects] = useState([]);
  const [modalStatus, setModalStatus] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [completedProjects, setCompleteProjects] = useState(0);

  const isFocused = useIsFocused();
  const watchModalStatus = () => {
    setModalStatus((prev) => !prev);
  };

  const API_ENDPOINT = `https://6531b4f54d4c2e3f333d3cc8.mockapi.io/api/projects`;

  const getProjects = async () => {
    axios.get(API_ENDPOINT).then((response) => {
      setProjects(response.data);
      handleCompleteprojects(response.data);
    });
  };

  const handleCompleteprojects = (projects) => {
    let count = 0;
    projects.filter((project) => {
      if (project.status.includes("Finalizado")) {
        count += 1;
      }
    });
    setCompleteProjects(count);
  };

  const filterProjects = async (value) => {
    axios.get(API_ENDPOINT).then((response) => {
      const results = response.data.filter((project) => {
        return project.title.includes(value);
      });
      setProjects(results);
    });
  };

  useEffect(() => {
    if (isFocused) {
      getProjects();
    }
  }, [isFocused, modalStatus]);

  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <TextInput
          style={styles.search}
          placeholder="Buscar projeto"
          clearButtonMode="always"
          value={searchText}
          onChangeText={(text) => {
            filterProjects(text);
          }}
        />
      </SafeAreaView>

      <View>
        <Text style={styles.greeting}>Olá {"\n"} Kathryn</Text>
      </View>
      <View style={styles.profile}>
        <View style={styles.profileText}>
          <Text style={styles.yourProjects}>Seus{"\n"}Projetos</Text>
          <Text style={styles.completeProjects}>
            {completedProjects} de {projects.length} Completos
          </Text>
        </View>

        <View>
          <Image
            style={styles.profilePicture}
            source={require("../../assets/profile-picture.png")}
          />
        </View>
      </View>

      <View style={styles.review}>
        <Text style={styles.reviewTitle}>Daily Review</Text>

        <View style={styles.reviewList}>
          <FlatList
            data={projects}
            renderItem={({ item }) => (
              <Project
                title={item.title}
                time={item.time}
                status={item.status}
                period={item.period}
                dayOrMonth={item.dayOrMonth}
                urgency={item.urgency}
                id={item.id}
                need={item.need}
                watchModalStatus={watchModalStatus}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 28,
    paddingTop: 100,
  },
  greeting: {
    fontSize: 28,
    color: "#0A0909",
    marginBottom: 16,
  },
  yourProjects: {
    fontSize: 18,
    color: "#0A0909",
  },
  profile: {
    backgroundColor: "#87E4A7C7",
    width: 319,
    height: 180,
    borderRadius: 28,
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  completeProjects: {
    fontSize: 11,
    marginTop: 2,
  },
  profilePicture: {
    width: 124,
    height: 124,
    borderRadius: 124,
  },
  reviewTitle: {
    marginTop: 20,
    fontSize: 17,
  },
  search: {
    width: 319,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#F8F8F6",
    marginBottom: 49,
    padding: 13,
  },
});
