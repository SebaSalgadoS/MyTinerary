import { FlatList, Text, Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {router} from 'expo-router'
import {DATA} from '../../services/country'

const Item = ({ name, url }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{name}</Text>
    <Image style={styles.img} source={{ uri: url }} />
  </View>
);

export default function CityListComponent() {
    const navigation = useNavigation();

  return (
     <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => router.push('/citydetail/'+ item.name)}
          style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: "#ccc" }}
        >
           <Item name={item.name} url={item.url}/>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.name}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "orange",
  },
  img: {
    width: 300,
    height: 200,
  },
});
