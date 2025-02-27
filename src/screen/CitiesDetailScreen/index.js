import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getCity } from '../../services/cities/cities.services'

export default function CityDetail() {
  const params = useLocalSearchParams();
  const [cityValue, setCity] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getCity(`${params.city}`).then((response) => {
      console.log(JSON.stringify(response, null, 2));
      setCity(response);
    });
  }, [params.city]);

  if (!cityValue) {
    <View style={styleCity.loadingContainer}>
      <Text style={styleCity.loadingText}>Cargando...</Text>
    </View>;
  }

  return (
    <View style={styleCity.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{ flexDirection: "row", alignItems: "flex-start" }}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{ marginLeft: 5, fontSize: 18 }}>Volver</Text>
      </TouchableOpacity>
      <Image style={styleCity.img} source={{ uri: cityValue.image }} />
      <View style={styleCity.dividerContainer}>
        <View style={styleCity.divider} />
      </View>
      <Text style={styleCity.title}>
        {decodeURIComponent(cityValue.name)}
      </Text>
      <Text style={styleCity.subtitle}>
        {decodeURIComponent(cityValue.description)}
      </Text>
    </View>
  );
}

const styleCity = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#FFFFF0"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignContent: "center",
    color: "purple",
  },
  img: {
    width: '98%',
    height: 300,
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8, 
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: 5
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "medium",
    alignContent: "center",
    color: "black",
    marginTop: 20,
    marginHorizontal: 20
  },
  loadingText: {
    fontSize: 40,
    fontWeight: "bold",
    alignContent: "center",
    color: "purple",
  },
  loadingContainer: {
    flex:1,
    marginTop: 100,
    alignItems: "center",
    marginBottom: 100
  },
  dividerContainer: {
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    borderTopLeftRadius: 8, 
    borderTopRightRadius: 8, 
  },
});
