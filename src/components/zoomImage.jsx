import { Dimensions, Image, StyleSheet, View } from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
export const ZoomImage = () => {
  return <View style={{ borderWidth: 1 }}>
    <ImageZoom cropWidth={Dimensions.get('window').width}
      cropHeight={Dimensions.get('window').height}
      imageWidth={200}
      imageHeight={200}>
      <Image
        style={styles.child}
        source={{ uri: 'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsb2ZmaWNlM19zaW1wbGVfbWluaW1hbGlzdF9waG90b19vZl9tb3VudGFpbl9hbmRfbW9vbl9pbl8zNTcwMjM0My1jM2FjLTRlZmItYjgyNS1lMTIwNmYwYTAwNWVfMS5qcGc.jpg' }} />
      <Image
        style={styles.child}
        source={{ uri: 'https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D' }} />
    </ImageZoom>
  </View>
}

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: "100%",
    objectFit: 'cover',
  },
  wrapper: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  horizontalwrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  child: {
    width,
    height: height - 75,
  },
  stars: {
    height: 50,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
  }
});