import {
  FlatList,
  Text,
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getCities } from "../../services/cities/cities.services";

const Item = ({ name, url }) => (
  <View style={styles.card}>
    <Text style={styles.title}>{name}</Text>
    <Image style={styles.img} source={{ uri: url }} />
  </View>
);

export default function CityListComponent(props) {
  const [cities, setCities] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  useEffect(() => {
    getCities().then((response) => {
      console.log(JSON.stringify(response, null, 2));
      setCities(response);
      setFilteredCities(response.data.data);
    });
  }, []);

  useEffect(() => {
    const filtered = cities.filter((city) =>
      city.name.trim().toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCities(filtered);
  }, [searchText, cities]);

  if (cities.length == 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerSearch}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        onChangeText={(text) => setSearchText(text)}
        value={searchText}
      />
      <FlatList
        data={filteredCities}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => router.push(`/citydetail/${item._id}`)}
            style={{
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ccc",
            }}
          >
            <Item name={item.name} url={item.image} />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "purple",
  },
  img: {
    width: "100%",
    height: 200,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
    color: "purple",
  },
  loadingContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
    marginBottom: 100,
  },
  card: {
    backgroundColor: "#FFFFF0",
    borderRadius: 8,
    overflow: "hidden",
    margin: 10,
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 10,
  },
  containerSearch: {
    flex: 1,
    padding: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 20,
    marginHorizontal: 10,
    paddingHorizontal: 8,
  },
});
