import { useEffect, useState } from 'react';
import { Alert, Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import RNFS from 'react-native-fs';


export const Like = ({ i }) => {
  const [data, setData] = useState([])

  const emptyStarIcons = [
    require('../../assets/star11.png'),
    require('../../assets/star2.png'),
    require('../../assets/star3.png')
  ];

  const filePath = `${RNFS.DocumentDirectoryPath}/test.txt`;

  const ChangeFile = async (val, type) => {
    try {
      const content = await RNFS.readFile(filePath, 'utf8')
      const jsonString = "[" + content.replace(/(\w+):/g, '"$1":') + "]";
      const array = JSON.parse(jsonString);
      if (type == 'star') {
        array[i].stare = val
      }
      else if (type == 'like') {
        array[i].like = true
      }
      else if (type == 'dislike') {
        array[i].disLike = true
      }
      const reconstructedString = array.map(obj => {
        return `{${Object.entries(obj).map(([key, value]) => `${key}:${value}`).join(",")}}`;
      }).join(",");

      await RNFS.writeFile(filePath, reconstructedString, 'utf8');
      readFile()
      console.log('File modified and saved successfully.', reconstructedString);
    } catch (error) {
      Alert.alert(JSON.stringify(error))
      console.error('Error reading or writing file:', error);
    }
  };


  const writeFile = async () => {
    try {
      await RNFS.writeFile(filePath, "{image:1,stare:0,like:false,disLike:false},{image:2,stare:0,like:false,disLike:false},{image:3,stare:0,like:false,disLike:false},{image:4,stare:0,like:false,disLike:false}", 'utf8');
      console.log('File modified and saved successfully.');
    } catch (error) {
      console.error('Error reading or writing file:', error);
    }
  };

  const readFile = async () => {
    try {
      const content = await RNFS.readFile(filePath, 'utf8')
      const jsonString = "[" + content.replace(/(\w+):/g, '"$1":') + "]";
      const array = JSON.parse(jsonString);
      setData(array)
    } catch (error) {
      console.error('Error reading or writing file:', error);
    }
  };




  useEffect(() => {
    readFile()
    // writeFile()
  }, [])

  useEffect(() => {

  }, [])


  return <View style={styles.stars}>
    <TouchableOpacity onPress={() => ChangeFile(0, 'like')}>
      {data[i]?.like ?
        <Image style={{ width: 40, height: 40 }} source={require("../../assets/like2.png")} /> :
        <Image style={{ width: 40, height: 40 }} source={require("../../assets/like3.png")} />
      }
    </TouchableOpacity>
    <View style={{ flexDirection: 'row', gap: 15 }}>
      {emptyStarIcons.map((elm, index) => {
        if (data[i]?.stare > index) {
          return <View key={index}>
            <TouchableOpacity onPress={() => ChangeFile(index + 1, 'star')}>
              <Image source={require('../../assets/star1.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
        }
        return <View key={index}>
          <TouchableOpacity onPress={() => ChangeFile(index + 1, 'star')}>
            <Image source={elm} style={{ width: 40, height: 40 }} />
          </TouchableOpacity>
        </View>
      })}
    </View>

    <TouchableOpacity onPress={() => ChangeFile(0, 'dislike')}>
      {data[i]?.disLike ?
        <Image style={{ width: 40, height: 40 }} source={require('../../assets/dislike2.png')} /> :
        <Image style={{ width: 40, height: 40 }} source={require('../../assets/dislike1.png')} />
      }
    </TouchableOpacity>
  </View>
}

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  stars: {
    height: 50,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  }
});