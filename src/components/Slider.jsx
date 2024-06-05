
import { Dimensions, Image, StyleSheet, View, useWindowDimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Like } from './Like';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { useEffect, useState } from 'react';
import { HorizntalSlider } from './horiznotalSlider';


export const Slider = ({ setCurent }) => {

  const [isHorizontal, setIsHorizontal] = useState(Dimensions.get('window').width > Dimensions.get('window').height);
  const windowDimensions = useWindowDimensions();

  useEffect(() => {
    setIsHorizontal(windowDimensions.width > windowDimensions.height);
  }, [windowDimensions]);

  const colors = [
    'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTAxL3Jhd3BpeGVsb2ZmaWNlM19zaW1wbGVfbWluaW1hbGlzdF9waG90b19vZl9tb3VudGFpbl9hbmRfbW9vbl9pbl8zNTcwMjM0My1jM2FjLTRlZmItYjgyNS1lMTIwNmYwYTAwNWVfMS5qcGc.jpg',
    'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA5L3Jhd3BpeGVsX29mZmljZV8zM193YWxscGFwZXJfcGF0dGVybl9vZl9wYXN0ZWxfY29sb3JlZF9wZW5jaWxfdF9kNzIzNTM5YS1iMDJiLTQ0ZmItYjA5Zi1mNzQwNjMxYjM1NTNfMS5qcGc.jpg',
    'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTExL3Jhd3BpeGVsX29mZmljZV8yNl9pbGx1c3RyYXRpb25fYXVyb3JhX2dyZWVuX3dpdGhfc3BhcmtsZV9sYW5kc181YjA0NzRiZi0zM2Q1LTQ5MWItODBlZi1kMWExMWFjOWVjYjFfMS5qcGc.jpg',
    'https://images.unsplash.com/photo-1559583985-c80d8ad9b29f?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMDY1OTc2fHxlbnwwfHx8fHw%3D',
  ];
  if (isHorizontal) {
    return <HorizntalSlider />
  }
  return <View style={styles.container}>
    <SwiperFlatList
      autoplayLoop
      index={0}
      data={colors}
      renderItem={({ item, i }) => {
        return <View key={i} style={styles.wrapper}>
          <ReactNativeZoomableView
            maxZoom={1.5}
            minZoom={0.5}
            zoomStep={0.5}
            initialZoom={1}
            bindToBorders={true}
          >
            <Image source={{ uri: item }} style={[styles.child]} />
          </ReactNativeZoomableView>
          <Like i={colors.findIndex((elm) => elm == item)} />
        </View>
      }}
    />

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