import { StatusBar, View } from "react-native"
import 'react-native-gesture-handler';
import { Slider } from "./src/components/Slider"

const App = () => {
  return <View>
    <StatusBar hidden={true} />
    <Slider />
  </View>
}




export default App