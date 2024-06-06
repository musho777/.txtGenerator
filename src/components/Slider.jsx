
import { Dimensions, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Like } from './Like';
import { useEffect, useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from 'react-native-fs';
import { HoriznotalLike } from './horiznotalLike';


export const Slider = () => {
  const [data, setData] = useState([])


  const [isHorizontal, setIsHorizontal] = useState(Dimensions.get('window').width > Dimensions.get('window').height);
  const windowDimensions = useWindowDimensions();
  const folderPath = `${RNFS.DocumentDirectoryPath}/spec`;

  const filePath = `${RNFS.DocumentDirectoryPath}/spec/test.txt`;

  useEffect(() => {
    setIsHorizontal(windowDimensions.width > windowDimensions.height);
  }, [windowDimensions]);

  const getPhotosInFolder = async () => {
    try {
      let content = await RNFS.readFile(filePath, 'utf8')
      let array = JSON.parse("[" + content.replace(/}{/g, "},{") + "]");

      RNFS.readDir(folderPath).then((r) => {
        const photoFile = r.filter(file => file.name && /\.(jpg|jpeg|png|webp)$/i.test(file.name));

        photoFile.map((elm, i) => {
          if (!array.some(obj => obj.url.includes(`file://${elm.path}`))) {
            array.push({ url: `file://${elm.path}`, stare: 0, like: false, disLike: false })
          }
        })
        setData(array)
        content = array.map(obj => JSON.stringify(obj)).join('');
        RNFS.writeFile(filePath, content, 'utf8');
      })

    } catch (error) {
      console.error("Error reading folder: ", error);
    }
  };


  const ChangeFile = async (val, type, i) => {
    try {
      let content = await RNFS.readFile(filePath, 'utf8')
      let array = JSON.parse("[" + content.replace(/}{/g, "},{") + "]");
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
      content = array.map(obj => JSON.stringify(obj)).join('');
      await RNFS.writeFile(filePath, content, 'utf8');
      readFile()
    } catch (error) {
      Alert.alert(JSON.stringify(error))
    }
  };


  const writeFile = async () => {
    try {
      const folderExists = await RNFS.exists(folderPath);
      if (!folderExists) {
        await RNFS.mkdir(folderPath);
        await RNFS.writeFile(filePath, "", 'utf8');
        getPhotosInFolder()
      } else {
        const txtExists = await RNFS.exists(filePath);
        if (!txtExists) {
          await RNFS.writeFile(filePath, "", 'utf8');
        }
        getPhotosInFolder()
      }
      readFile()
    } catch (error) {
    }
  };

  const readFile = async () => {
    try {
      const content = await RNFS.readFile(filePath, 'utf8')
      let array = JSON.parse("[" + content.replace(/}{/g, "},{") + "]");
      setData(array)
    } catch (error) {
      console.error('Error reading or writing file:', error);
    }
  };




  useEffect(() => {
    writeFile()
  }, [])


  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (index) => {
    setActiveIndex(index);
  };
  return <View style={styles.container}>
    <SwiperFlatList
      autoplayLoop
      index={0}
      data={data}
      renderItem={({ item, i }) => {
        return <View key={i} style={!isHorizontal ? styles.wrapper : styles.horizontalwrapper}>
          {isHorizontal && <HoriznotalLike data={data} ChangeFile={(i, e) => ChangeFile(i, e, activeIndex)} i={activeIndex} />}
          <ImageViewer
            renderIndicator={() => { }}
            renderFooter={() => { }}
            renderHeader={() => { }}
            renderArrowLeft={() => { }}
            footerContainerStyle={{ display: 'none' }}
            menuContext={{}}
            onChange={handleChange}
            saveToLocalByLongPress={false}
            style={!isHorizontal ? styles.child : styles.child1}
            imageUrls={data}
            backgroundColor={'white'}
          />
          {!isHorizontal && <Like data={data} ChangeFile={(i, e) => ChangeFile(i, e, activeIndex)} i={activeIndex} />}
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

  },
  child1: {
    width: width - 75,
    height: height,
  },
});