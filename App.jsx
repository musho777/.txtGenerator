import { StatusBar, View } from "react-native"
import 'react-native-gesture-handler';
import { Slider } from "./src/components/Slider"

const App = () => {
  return <View style={{ backgroundColor: 'black' }}>
    <StatusBar hidden={true} />
    <Slider />
  </View>
}




export default App