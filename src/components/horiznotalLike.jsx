import { useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import Stars from 'react-native-stars';
import RNFS from 'react-native-fs';


export const HoriznotalLike = ({ i }) => {
  const [data, setData] = useState([])

  const emptyStarIcons = [
    { img: require('../../assets/star3.png'), key: 3 },
    { img: require('../../assets/star2.png'), key: 2 },
    { img: require('../../assets/star11.png'), key: 1 },
  ];

  const filePath = `${RNFS.DocumentDirectoryPath}/test.txt`;

  const ChangeFile = async (val, type) => {
    try {
      const content = await RNFS.readFile(filePath, 'utf8')
      const jsonString = "[" + content.replace(/(\w+):/g, '"$1":') + "]";
      const array = JSON.parse(jsonString);
      if (type == 'star') {
        if (val == 1 && array[i].stare == 1) {
          array[i].stare = 0
        }
        else {
          array[i].stare = val
        }
      }
      else if (type == 'like') {
        array[i].like = !array[i].like
      }
      else if (type == 'dislike') {
        array[i].disLike = !array[i].disLike
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
  }, [])


  return <View style={styles.stars}>
    <TouchableOpacity onPress={() => ChangeFile(0, 'like')}>
      {data[i]?.like ?
        <Image style={{ width: 40, height: 40 }} source={require("../../assets/like2.png")} /> :
        <Image style={{ width: 40, height: 40 }} source={require("../../assets/like3.png")} />
      }
    </TouchableOpacity>
    <View style={{ flexDirection: 'column', gap: 15 }}>
      {emptyStarIcons.map((elm, index) => {
        if (data[i]?.stare >= elm.key) {
          return <View key={index}>
            <TouchableOpacity onPress={() => ChangeFile(elm.key, 'star')}>
              <Image source={require('../../assets/star1.png')} style={{ width: 40, height: 40 }} />
            </TouchableOpacity>
          </View>
        }
        return <View key={index}>
          <TouchableOpacity onPress={() => ChangeFile(elm.key, 'star')}>
            <Image source={elm.img} style={{ width: 40, height: 40 }} />
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

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  stars: {
    height: height,
    paddingVertical: 10,
    width: 75,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
});