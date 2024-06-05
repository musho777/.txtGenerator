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