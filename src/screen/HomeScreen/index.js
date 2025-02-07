import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import HeroComponent from './Hero/index'
import CountryCarrousel from './Carrousel/index'

export default function HomeScreen() {

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