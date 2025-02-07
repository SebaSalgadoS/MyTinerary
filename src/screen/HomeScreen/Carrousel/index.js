import React from 'react'
import Carrousel from 'react-native-reanimated-carousel'
import { Text, Image, StyleSheet, Dimensions, View} from 'react-native'

const DATA = [
    {
        name: "Chile",
        url: "https://dschile.cl/wp-content/uploads/2021/07/aerial-view-of-road-jungtion-and-manquehue-hill-in-2CXE7DY.jpg"
    },
    {
        name:"Argentina",
        url: "https://media.admagazine.com/photos/618a6a585e45a526c6be8f63/master/w_1600%2Cc_limit/61333.jpg"
    },
    {
        name:"Brazil",
        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Cidade_Maravilhosa.jpg/800px-Cidade_Maravilhosa.jpg"
    },
    {
        name:"Canada",
        url: "https://travelingua.es/wp-content/uploads/2024/07/mejores-ciudades-para-trabajar-en-canada.jpg"
    },
    {
        name:"Mexico",
        url: "https://patytour.cl/wp-content/uploads/2023/10/Ciudad-de-Mexico-Zocalo.webp"
    },
    {
        name:"Japon",
        url: "https://www.advantour.com/img/japan/images/index.jpg"
    },
    {
        name:"Korea",
        url: "https://elordenmundial.com/wp-content/uploads/2014/01/Corea-asia-pacifico-historia-e1657020545689.jpg"
    },
    {
        name:"Rusia",
        url: "https://static.nationalgeographic.es/files/styles/image_3200/public/2772.600x450.jpg?w=1900&h=1425"
    },
    {
        name:"Alemania",
        url: "https://img.huffingtonpost.es/files/image_1200_720/uploads/2024/11/08/el-parlamento-aleman-y-la-bandera-de-alemania.jpeg"
    },
    {
        name:"Egipto",
        url: "https://multidestinos.cl/wp-content/uploads/2022/11/Egipto-Multidestinos.jpg"
    },
    {
        name:"China",
        url: "https://static.nationalgeographicla.com/files/styles/image_3200/public/chinese_new_year_decorations_in_chinatown-_singapore-_.webp?w=1600&h=900"
    }
]

const Item = ({name, url}) => (
    <View style={countryStyles.container}>
      <Text style={countryStyles.nameText}>{name}</Text>
      <Image style={countryStyles.img} source={{uri:url}}/>
    </View>
  );

export default function CountryCarrousel(){
    const width = Dimensions.get('window').width;
    return(
        <Carrousel
            width={width}
            height={width / 2}
            autoPlay={true}
            data={DATA}
            loop
            scrollAnimationDuration={1000}
            renderItem={({item}) => {
                return (
                     <Item name={item.name} url={item.url}/>
                )
            }}
        >
        </Carrousel>
    );
}

const countryStyles = StyleSheet.create({
    nameText: {
      fontSize: 20,
      fontWeight: 'bold',
      color:'orange'
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginTop: 10
    },
    img: {
        width: 300,
        height: 200,
    }
  });