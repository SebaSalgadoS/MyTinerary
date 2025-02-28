import { Text, View, Button, StyleSheet, Image} from 'react-native';

export default function HeroComponen({title, subtitle}){
  return (
    <View>
      <Text style={textStyles.titleText}>{title}</Text>
      <Text style={textStyles.subtitleText}>{subtitle}</Text>
      <Button title="Explore" color="#841584"></Button>
    </View>
  );
}

const textStyles = StyleSheet.create({
  titleText: {
    fontSize: 30,
    fontWeight: 'bold',
    color:'black'
  },
  subtitleText: {
    fontSize: 20,
    color: 'purple',
    fontWeight: 'condensedBold',
    marginVertical: 5
  }
});
