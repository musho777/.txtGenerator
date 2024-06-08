
import { Alert, Dimensions, Image, StatusBar, StyleSheet, View } from 'react-native';
import { Like } from './Like';
import { useEffect, useState } from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';
import RNFS from 'react-native-fs';
import { HoriznotalLike } from './horiznotalLike';

export const Slider = () => {
  const [data, setData] = useState([])
  const [width, setWidth] = useState()
  const [height, setHeight] = useState()
  const [image, setImage] = useState(true)

  const [isHorizontal, setIsHorizontal] = useState(Dimensions.get('window').width > Dimensions.get('window').height);
  const folderPath = `${RNFS.ExternalDirectoryPath}/spec`;
  let dir = `${RNFS.ExternalDirectoryPath}/spec`;

  const filePath = `${RNFS.ExternalDirectoryPath}/spec/Photo.Stars.txt`;

  useEffect(() => {
    const handleOrientationChange = () => {
      const { width, height } = Dimensions.get('window');
      setWidth(width)
      setHeight(height)
      setIsHorizontal(width > height);
    };

    Dimensions.addEventListener('change', handleOrientationChange);

    handleOrientationChange();

    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  const getImagesFromFolder = async (folderPath) => {
    const result = await RNFS.readDir(folderPath);
    let images = [];
    for (const item of result) {
      if (item.isDirectory()) {
        const nestedImages = await getImagesFromFolder(item.path);
        images = images.concat(nestedImages);
      } else if (item.isFile() && (item.name.endsWith('.jpg') || item.name.endsWith('.png') || item.name.endsWith('.webp') || item.name.endsWith('.jpeg') || item.name.endsWith('.avif'))) {
        images.push(item.path);
      }
    }
    return images;
    // let content = await RNFS.readFile(filePath, 'utf8')
  }

  // const getImagesFromFolder = async (folderPath) => {
  //   const result = await RNFS.readDir(folderPath);
  //   let images = [];
  //   for (const item of result) {
  //     if (item.isDirectory()) {
  //       const nestedImages = await getImagesFromFolder(item.path);
  //       images = images.concat(nestedImages);
  //     } else if (item.isFile() && (item.name.endsWith('.jpg') || item.name.endsWith('.png') || item.name.endsWith('.webp') || item.name.endsWith('.jpeg') || item.name.endsWith('.avif'))) {
  //       images.push(item.path);
  //     }
  //   }

  // let content = await RNFS.readFile(filePath, 'utf8')
  // let a = content
  // const lines = content.split('\n');
  // let array = []
  // let array2 = []
  // if (content.length > 1) {
  //   array = lines.map(line => {
  //     const [url, type, value] = line.split(';');
  //     return { url, type, value };
  //   });
  //   array2 = lines.map(line => {
  //     const [url, type, value] = line.split(';');
  //     return { url: `file://${dir}${url}`, type, value };
  //   });
  // }

  // images.map((elm, i) => {
  //   if (!a.includes(`/${elm.split('/')[9]}/${elm.split('/')[10]}`)) {
  //     array.push({ url: `/${elm.split('/')[9]}/${elm.split('/')[10]}`, value: "", type: "" })
  //     array2.push({ url: `file://${dir}/${elm.split('/')[9]}/${elm.split('/')[10]}`, value: "", type: "" })
  //   }
  // })
  // content = array.map(item => `${item.url};${item.type};${item.value}`).join('\n');
  // RNFS.writeFile(filePath, content, 'utf8');
  // setData(array2)

  // return images;
  // };



  const ChangeFile = async (val, type, i) => {
    try {
      let content = await RNFS.readFile(filePath, 'utf8')

      if (type == 'star') {
        if (val == 1 && data[i].value == 1) {
          data[i].value = ""
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
        else if (data[i].type == 'X') {
          data[i].type = "N"
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
        else if (data[i].type == 'X') {
          data[i].type = "Y"
        }
      }
      content = data.map(item => {
        const parts = item.url.split('/');
        const part11 = parts[11];
        const part12 = parts[12];
        const urlPart = part12 ? `/${part11}/${part12}` : `/${part11}`;
        return `${urlPart};${item.type};${item.value}`;
      }).join('\n');
      // content = data.map(item => `${`/${item.url.split('/')[11]}/${item.url.split('/')[12]}`};${item.type};${item.value}`).join('\n');
      await RNFS.writeFile(filePath, content, 'utf8');
      readFile()
    } catch (error) {
      Alert.alert(JSON.stringify(error))
    }
  };
  // file:///storage/emulated/0/Android/data/com.Photo.Star/files/spec/33/




  // useEffect(() => {
  //   if (image && data.length > 0) {
  //     let a = data
  //     setData([])
  //     setTimeout(() => {
  //       setData(a)
  //     }, [3000])
  //   }
  // }, [])


  const writeFile = async () => {
    try {
      const folderExists = await RNFS.exists(folderPath);
      if (!folderExists) {
        await RNFS.mkdir(folderPath);
        await RNFS.writeFile(filePath, "", 'utf8');
      } else {
        const txtExists = await RNFS.exists(filePath);
        if (!txtExists) {
          await RNFS.writeFile(filePath, "", 'utf8');
        }
      }
      let images = await getImagesFromFolder(folderPath)
      let content = await RNFS.readFile(filePath, 'utf8')
      let a = content
      const lines = content.split('\n');
      let array = []
      let array2 = []
      if (content.length > 1) {
        array = lines.map(line => {
          const [url, type, value] = line.split(';');
          return { url, type, value };
        });
        array2 = lines.map(line => {
          const [url, type, value] = line.split(';');
          return { url: `file://${dir}${url}`, type, value };
        });
      }
      images.map((elm, i) => {
        if (elm.split('/')[10]) {
          if (!a.includes(`/${elm.split('/')[9]}/${elm.split('/')[10]}`)) {
            array.push({ url: `/${elm.split('/')[9]}/${elm.split('/')[10]}`, value: "", type: "" })
            array2.push({ url: `file://${dir}/${elm.split('/')[9]}/${elm.split('/')[10]}`, value: "", type: "" })
          }
        }
        else {
          if (!a.includes(`/${elm.split('/')[9]}`)) {
            array.push({ url: `/${elm.split('/')[9]}`, value: "", type: "" })
            array2.push({ url: `file://${dir}/${elm.split('/')[9]}`, value: "", type: "" })
          }
        }
      })
      content = array.map(item => `${item.url};${item.type};${item.value}`).join('\n');
      RNFS.writeFile(filePath, content, 'utf8');
      setData(array2)
      readFile()
    } catch (error) {
    }
  };

  const readFile = async () => {
    try {
      const content = await RNFS.readFile(filePath, 'utf8')
      const lines = content.split('\n');
      let array = []
      if (content.length > 1) {
        array = lines.map(line => {
          const [url, type, value] = line.split(';');
          if (url.split('/')[2]) {
            return {
              url: `file://${folderPath}/${url.split('/')[1]}/${url.split('/')[2]}`, type, value
            };
          }
          else {
            return {
              url: `file://${folderPath}/${url.split('/')[1]}`, type, value
            };
          }
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
    <StatusBar hidden={true} />
    {data.length > 0 && <View style={!isHorizontal ? styles.wrapper : styles.horizontalwrapper}>
      {isHorizontal && <HoriznotalLike data={data} ChangeFile={(i, e) => ChangeFile(i, e, activeIndex)} i={activeIndex} />}
      <View style={isHorizontal ? { width: width - 75, height: height } : { width: width, height: height - 100 }} >
        <ImageViewer
          renderIndicator={() => { }}
          renderFooter={() => { }}
          renderHeader={() => { }}
          renderArrowLeft={() => { }}
          footerContainerStyle={{ display: 'none' }}
          menuContext={{}}
          onChange={handleChange}
          style={isHorizontal ? { width: width - 75, height: height } : { width: width, height: height - 100 }}
          saveToLocalByLongPress={false}
          imageUrls={data}
          backgroundColor={'black'}
        />
      </View>
      {!isHorizontal && <Like data={data} ChangeFile={(i, e) => ChangeFile(i, e, activeIndex)} i={activeIndex} />}
    </View>}
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