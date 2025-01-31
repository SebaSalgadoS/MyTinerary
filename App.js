import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeroComponent from './src/components/Hero/index'
import CountryCarrousel from './src/components/Carrousel/index'

export default function App() {

  const titleHero = "MyTinerary"
  const subtitleHero = "Find your perfect travel itinerary"
  return (
    <ScrollView>
      <View style={styles.container}>
        <HeroComponent title={titleHero} subtitle={subtitleHero}></HeroComponent>
        <CountryCarrousel/>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 100
  },
});
