
import { Alert, Dimensions, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Like } from './Like';
import { useEffect, useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from 'react-native-fs';
import { HoriznotalLike } from './horiznotalLike';
import Orientation from 'react-native-orientation-locker';

export const Slider = () => {
  const [data, setData] = useState([])
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()

  const detectOrientation = () => {
    const { width, height } = Dimensions.get('window');
    if (width > height) {
      // setOrientation('landscape');
    } else {
      // setOrientation('portrait');
    }
  };

  const [isHorizontal, setIsHorizontal] = useState(Dimensions.get('window').width > Dimensions.get('window').height);
  const windowDimensions = useWindowDimensions();
  const folderPath = `${RNFS.ExternalDirectoryPath}/spec`;

  const filePath = `${RNFS.ExternalDirectoryPath}/spec/test.txt`;


  useEffect(() => {
    const handleOrientationChange = () => {
      const { width, height } = Dimensions.get('window');
      setWidth(width)
      setHeight(height)
      setIsHorizontal(width > height);
    };

    Dimensions.addEventListener('change', handleOrientationChange);

    // Initial check
    handleOrientationChange();

    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, []);
  // useEffect(() => {
  //   setIsHorizontal(windowDimensions.width > windowDimensions.height);
  // }, [windowDimensions]);

  const getPhotosInFolder = async () => {
    try {
      let content = await RNFS.readFile(filePath, 'utf8')
      let a = content
      const lines = content.split('\n');
      let array = []

      if (content.length > 1) {
        array = lines.map(line => {
          const [url, type, value] = line.split(';');
          return { url, type, value };
        });
      }
      RNFS.readDir(folderPath).then((r) => {
        const photoFile = r.filter(file => file.name && /\.(jpg|jpeg|png|webp)$/i.test(file.name));
        photoFile.map((elm, i) => {
          if (!a.includes(elm.path)) {
            array.push({ url: `file://${elm.path}`, value: "", type: "" })
          }
        })
        setData(array)
        let content = array.map(item => `${item.url};${item.type};${item.value}`).join('\n');
        RNFS.writeFile(filePath, content, 'utf8');
      })

    } catch (error) {
      console.error("Error reading folder: ", error);
    }
  };

  const ChangeFile = async (val, type, i) => {
    try {
      let content = await RNFS.readFile(filePath, 'utf8')

      if (type == 'star') {
        if (val == 1 && data[i].stare == 1) {
          data[i].value = 0
        }
        else {
          data[i].value = val
        }
      }
      else if (type == 'like') {
        if (!data[i].type) {
          data[i].type = "Y"
        }
        else if (data[i].type == "Y") {
          data[i].type = ""
        }
        else if (data[i].type == 'N') {
          data[i].type = "X"
        }
      }
      else if (type == 'dislike') {
        if (!data[i].type) {
          data[i].type = "N"
        }
        else if (data[i].type == "N") {
          data[i].type = ""
        }
        else if (data[i].type == 'Y') {
          data[i].type = "X"
        }
      }
      content = data.map(item => `${item.url};${item.type};${item.value}`).join('\n');
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
      let a = content
      const lines = content.split('\n');
      let array = []

      if (content.length > 1) {
        array = lines.map(line => {
          const [url, type, value] = line.split(';');
          return { url, type, value };
        });
      }
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
          {isHorizontal ? <ImageViewer
            renderIndicator={() => { }}
            renderFooter={() => { }}
            renderHeader={() => { }}
            renderArrowLeft={() => { }}
            footerContainerStyle={{ display: 'none' }}
            menuContext={{}}
            onChange={handleChange}
            saveToLocalByLongPress={false}
            style={{ width: width - 75, height: height }}
            imageUrls={data}
            backgroundColor={'black'}
          /> : <ImageViewer
            renderIndicator={() => { }}
            renderFooter={() => { }}
            renderHeader={() => { }}
            renderArrowLeft={() => { }}
            footerContainerStyle={{ display: 'none' }}
            menuContext={{}}
            onChange={handleChange}
            saveToLocalByLongPress={false}
            style={{ width: width, height: height + 75 }}
            imageUrls={data}
            backgroundColor={'black'}
          />
          }
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