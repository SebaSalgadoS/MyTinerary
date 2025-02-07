import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { DATA } from "../../services/country";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de instalar @expo/vector-icons


export default function CityDetail() {
  const { city } = useLocalSearchParams();
  const navigation = useNavigation();

  const cityValue = DATA.find((cityValue) => cityValue.name == city);
  console.log(cityValue.url);

  return (
    <View style={styleCity.container}>
       <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={{ marginLeft: 5, fontSize: 18 }}>Volver</Text>
      </TouchableOpacity>
      <Text style={styleCity.title}>
        Ciudad: {decodeURIComponent(cityValue.name)}
      </Text>
      <Image style={styleCity.img} source={{ uri: cityValue.url }} />
    </View>
  );
}

const styleCity = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    alignContent: "center",
    color: "purple",
  },
  img: {
    width: 400,
    height: 300,
  },
});
