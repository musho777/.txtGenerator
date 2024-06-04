import { Image, TouchableOpacity, View, StyleSheet } from "react-native"
import { Slider } from "./src/components/Slider"
import Stars from 'react-native-stars';
import { useState } from "react";
const App = () => {
  const [stars, setStares] = useState(0)
  return <View>
    <Slider />
    <View style={styles.stars}>
      <TouchableOpacity>
        <Image source={require('./assets/like.png')} />
      </TouchableOpacity>
      <Stars
        default={0}
        update={(val) => { setStares({ stars: val }) }}
        spacing={4}
        starSize={28}
        count={3}
        fullStar={require('./assets/star1.png')}
        emptyStar={require('./assets/star.png')}
      />
      <TouchableOpacity >
        <Image source={require("./assets/dislike.png")} />
      </TouchableOpacity>
    </View>
  </View>
}


const styles = StyleSheet.create({
  stars: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40
  }
});

export default App