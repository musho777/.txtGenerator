import { Dimensions, Image, StyleSheet, TouchableOpacity, View } from 'react-native';


export const HoriznotalLike = ({ i, ChangeFile, data }) => {

  const emptyStarIcons = [
    { img: require('../../assets/star3.png'), key: 3 },
    { img: require('../../assets/star2.png'), key: 2 },
    { img: require('../../assets/star11.png'), key: 1 },
  ];

  return <View style={styles.stars}>
    <TouchableOpacity activeOpacity={1} onPress={() => ChangeFile(0, 'like')}>
      {(data[i]?.type == "Y" || data[i]?.type == "X") ?
        <Image style={{ width: 53, height: 53 }} source={require("../../assets/like2.png")} /> :
        <Image style={{ width: 53, height: 53 }} source={require("../../assets/like3.png")} />
      }
    </TouchableOpacity>
    {emptyStarIcons.map((elm, index) => {
      if (data[i]?.value >= elm.key) {
        return <View key={index}>
          <TouchableOpacity activeOpacity={1} onPress={() => ChangeFile(elm.key, 'star')}>
            <Image source={require('../../assets/star1.png')} style={{ width: 53, height: 53 }} />
          </TouchableOpacity>
        </View>
      }
      return <View key={index}>
        <TouchableOpacity activeOpacity={1} onPress={() => ChangeFile(elm.key, 'star')}>
          <Image source={elm.img} style={{ width: 53, height: 53 }} />
        </TouchableOpacity>
      </View>
    })}
    <TouchableOpacity activeOpacity={1} onPress={() => ChangeFile(0, 'dislike')}>
      {(data[i]?.type == "N" || data[i]?.type == "X") ?
        <Image style={{ width: 53, height: 53 }} source={require('../../assets/dislike2.png')} /> :
        <Image style={{ width: 53, height: 53 }} source={require('../../assets/dislike1.png')} />
      }
    </TouchableOpacity>
  </View>
}

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  stars: {
    height: height,
    width: 75,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'space-around',
  }
});