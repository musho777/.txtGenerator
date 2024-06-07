import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';


export const Like = ({ i, ChangeFile, data }) => {

  const emptyStarIcons = [
    require('../../assets/star11.png'),
    require('../../assets/star2.png'),
    require('../../assets/star3.png')
  ];


  return <View style={styles.stars}>
    <TouchableOpacity onPress={() => ChangeFile(0, 'dislike')}>
      {(data[i]?.type == "N" || data[i]?.type == "X") ?
        <Image style={{ width: 55, height: 55 }} source={require('../../assets/dislike2.png')} /> :
        <Image style={{ width: 55, height: 55 }} source={require('../../assets/dislike1.png')} />
      }
    </TouchableOpacity>
    {emptyStarIcons.map((elm, index) => {
      if (data[i]?.value > index) {
        return <View key={index}>
          <TouchableOpacity onPress={() => ChangeFile(index + 1, 'star')}>
            <Image source={require('../../assets/star1.png')} style={{ width: 55, height: 55 }} />
          </TouchableOpacity>
        </View>
      }
      return <View key={index}>
        <TouchableOpacity onPress={() => ChangeFile(index + 1, 'star')}>
          <Image source={elm} style={{ width: 55, height: 55 }} />
        </TouchableOpacity>
      </View>
    })}
    <TouchableOpacity onPress={() => ChangeFile(0, 'like')}>
      {(data[i]?.type == "Y" || data[i]?.type == "X") ?
        <Image style={{ width: 55, height: 55 }} source={require("../../assets/like2.png")} /> :
        <Image style={{ width: 55, height: 55 }} source={require("../../assets/like3.png")} />
      }
    </TouchableOpacity>

  </View>
}

const styles = StyleSheet.create({
  stars: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginVertical: 10,
  }
});