import moment from 'moment';
import 'moment/locale/fr';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
    ScrollView, ActivityIndicator, Button, FlatList, Modal, StatusBar,
    Platform, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Dimensions, Animated, Image, ImageBackground
} from 'react-native';
import ScreenBrightness from 'react-native-screen-brightness';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';

import AsyncStorage from "@react-native-async-storage/async-storage";
import style from './style';
import { _getPages1, _storePages, _storeNote } from './store';
import { openDatabase } from "react-native-sqlite-storage";
import { useSelector } from 'react-redux';
import ModalSettingComponent from './ModalSettingComponent';
import { BooksService } from '../../../services/api/booksService';

const db = openDatabase({
    name: "maadsene",
});
const lightMode = {
    bg: '#FFF !important',
    fg: '#000 !important',
    height: 1.5,
    font: 'Times New Roman',
    size: '20px'

};

const darkMode = {
    bg: '#000 !important',
    fg: '#FFF !important',
    height: 1.5,
    font: 'Times New Roman',
    size: '20px'
}

const defautThemeReader = {
    bg: '#FFF !important',
    fg: '#000 !important',
    height: 2,
    font: 'Times New Roman',
    size: '25px'

}

const heightWidow = Dimensions.get('window').height;
const widthWindow = Dimensions.get('window').width;
function Reader({ navigation, route, goBack }) {
    const { title, path, idbook, image, imageUrl } = route.params;
    const webview = useRef();
    const fontSizes = ["20px", "21px", "22px", "23px"];
    const [fontSizeIndex, setFontSizeIndex] = useState(0); // Tamanho de fonte original (100%)
    const [theme, setTheme] = useState(lightMode);
    const [cl, setCl] = useState();
    const [cl1, setCl1] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [search, setSearch] = useState('');
    const [searchedWord, setSearchedWord] = useState('');
    const [isModalVisibleFont, setisModalVisibleFont] = useState(false);
    const [isModalVisibleSearch, setisModalVisibleSearch] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [themeStyle, setThemeStyle] = useState({ backgroundColor: '#FFF' });
    const [fontStyle, setFontStyle] = useState({ color: '#000' })
    const [lastMarkedCfi, setLastMarkedCfi] = useState("");
    const [totalPages, setTotalPages] = useState(null);
    const [progress, setProgress] = useState(1);
    const [locations, setLocations] = useState(null);
    const [isModalVisibleNote, setIsModalVisibleNote] = useState(false);
    const [isModalVisibleNoteList, setIsModalVisibleNoteList] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);
    const [notes, setNotes] = useState([]);
    const [pages, setPages] = useState([]);
    const [isMarked, setIsMarked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openBook, setOpenBook] = useState(false);
    const [brightness, setBrightness] = useState(0);
    const [searchPage, setSearchPage] = useState(progress);
    const [isSearchingPage, setIsSearchingPage] = useState(false);
    const [isVisibleBar, setIsVisibleBar] = useState(true);
    const [settingsVisi, setSettingsVisi] = useState(false);
    const [lastLoc, setLastLoc] = useState(0);
    const [zoom, setZoom] = useState(100);
    const [js, setJs] = useState(0);
    const [isStart, setIsStart] = useState(false);
    const [finish, setIsFinish] = useState(false);
    const [statusV, setStatusV] = useState(false);
    const [visibleToc, setvisibleToc] = useState(false);
    const [visibleSetting, setvisibleSetting] = useState(false);
    const [visiblebookmark, setvisiblebookmark] = useState(false);
    const [jsCode, setJsCode] = useState(null);

    const [toc, setToc] = useState(null);
    const [url, setUrl] = useState("");
    const [urlBookmark, setUrlBookmark] = useState("");
    const [position, setPosition] = useState("");
    const [cfi, setCfi] = useState("");
    const [pathUrl, setPathUrl] = useState(path);
    const [urlEntier, setUrlEntier] = useState("");
    const [ titleChapitre, setTitleChapitre] = useState("");

   

    const isEpubReader = useSelector(state => state.userAuth.isEpubReader);

    let bookSend = { id: idbook, path: path };


    function changeBrightness(value) {
        ScreenBrightness.setBrightness(value);
        AsyncStorage.setItem('brightness', value.toString())
    }
    const createTables = () => {
        db.transaction(txn => {
            txn.executeSql(
                `CREATE TABLE IF NOT EXISTS bookmark (id INTEGER PRIMARY KEY AUTOINCREMENT, bookmark json,idbook VARCHAR(30))`,
                //`DROP TABLE IF EXISTS bookmark `,

                [],
                (sqlTxn, res) => {
                    console.log("table created successfully");

                },
                error => {
                    console.log("error on creating table " + error.message);
                },
            );
        });
    };

    const retrieveBookmark = () => {


        db.transaction(txn => {



            txn.executeSql(
                `SELECT * FROM bookmark where idbook=? LIMIT 1`,
                [idbook],
                (sqlTxn, res) => {
                    console.log("bookmark retrieved successfully" + idbook);
                    let len = res.rows.length;
                    //alert(len);

                    if (len > 0) {

                        let results = [];
                        for (let i = 0; i < len; i++) {
                            let item = res.rows.item(i);
                            results.push(item.bookmark);
                            //alert(item.bookmark);
                            // alert(item.location+"----"+item.idbook);
                        }

                        let loc = JSON.parse(results);
                        setPages(loc);
                        //alert(JSON.stringify(loc));

                        //alert(typeof(loc));
                        //setLocations(loc);
                    } else {




                        db.transaction(txn => {
                            txn.executeSql(
                                `INSERT INTO bookmark (bookmark,idbook) VALUES (?,?)`,
                                ["", idbook],
                                (sqlTxn, res) => {
                                    //console.log(`${category} category added successfully`);
                                    //alert("insertion");

                                },
                                error => {
                                    console.log("error on adding category " + error.message);
                                },
                            );

                        });

                    }
                },
                error => {
                    console.log("error on getting categories " + error.message);
                },
            );
        });
    };

    //let animatedHederValue = new Animated.Value(0);
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const fadeIn = () => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start();
    }

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start();
    }
    useEffect(() => {

        setJsCode(`window.myValue = ${JSON.stringify(bookSend)};true;`);

        //alert(JSON.stringify(pages));
        //AsyncStorage.clear();
        //alert(url);

        //ScreenBrightness.setBrightness(brightness);
        console.log(pathUrl);
        _getBrightness();


    }, []);
    useEffect(() => {

        //alert(JSON.stringify(pages));
        //AsyncStorage.clear();

        console.log(pathUrl);


    }, [pathUrl]);

    useEffect(() => {
    
    
        // Stocker la valeur actuelle de item dans la référence
    
        const timeoutId = setTimeout(() => {
          // Comparer la valeur actuelle de item avec la valeur stockée dans la référence

    
            //PodcastService.updateNumberOfViewPodcast(idPodcast);
            BooksService.updateNumberOfViewBooks(idbook);
    
        }, 10000);
    
        // Nettoyer la référence si le composant est démonté avant que le setTimeout ne soit atteint.
        return () => clearTimeout(timeoutId);
      }, []);

    useLayoutEffect(() => {



        //alert(lastLoc);
        //_getLocation();
        createTables();
        retrieveBookmark();





    }, []);


    useEffect(() => {

        //alert(urlBookmark);
    }, [urlBookmark]);


    useEffect(() => {
        const urlBookmark1 = urlBookmark;
        const posi = position;
        console.log(urlBookmark1);
        
        // Vérifiez si la valeur de urlBookmark existe dans le tableau
        const elementTrouve = pages.find(element => element.url === urlBookmark1);
        
        // Si l'élément est trouvé, comparez la position
        if (elementTrouve) {
          const positionEnEntier = Math.floor(posi);
          const positionElement = Math.floor(elementTrouve.position);
          console.log(positionEnEntier ,"----", positionElement);
          // Comparez la position en tant qu'entier
          const estPositionIdentique = positionEnEntier === positionElement;
          
          console.log(estPositionIdentique);
          if(estPositionIdentique){

            setIsMarked(true);

          }else{
            setIsMarked(false);
          }
          
        } else {
        setIsMarked(false);
          console.log(false); // Si l'élément n'est pas trouvé
        }
    }, [position]);


    const _storageTheme = async (theme) => {
        try {

            return await AsyncStorage.setItem('theme', theme);

        } catch (error) {
            // Error saving data
        }
    };



    const _storeLocation = async (uri) => {
        try {
            console.log("--------------------------" + idbook + "---------" + uri);

            return await AsyncStorage.setItem('location' + idbook, uri);


        } catch (error) {
            // Error saving data
        }
    };
    async function _getBrightness() {
        try {

            const value = await AsyncStorage.getItem('brightness');
            setBrightness(+value);



        } catch (error) {
            // Error retrieving data
        }
    }






    function refresh(tema) {
        webview.current?.injectJavaScript(`
        window.THEME = ${JSON.stringify(themeToStyles(tema))};
        window.rendition.themes.register({ theme: window.THEME });
        window.rendition.themes.select('theme'); 
        window.rendition.views().forEach(view => view.pane ? view.pane.render() : null)
        `);
    }








    function goOpenConfig() {
        webview.current?.injectJavaScript(`$(".icon-settings").trigger("click")`);
    }




    function handleMessage(msg) {
        let parsedData = JSON.parse(msg.nativeEvent.data);
        let { type } = parsedData;

        delete parsedData.type;
        switch (type) {
            case 'search':
                const results = parsedData.results;
                if (results.length > 0) {
                    setSearchResults(results);
                    //console.log("search----------",results);
                }
                return;
            case 'loc':

                setProgress(parsedData.progress + 1);
                setSearchPage(parsedData.progress + 1);
                setCl(parsedData.cfi);

                return;
            case 'isStart':
                setIsStart(true);


                return;
            case 'start':
                setIsStart(true);
                //alert("start");


                return;

            case 'finish':
                setIsFinish(true);
                //alert("start true");


                return;
            case 'tableofmatiere':
                setToc(parsedData.data);
                //alert(JSON.stringify(parsedData.data));


                return;

            case 'titleChapitre':
                    setTitleChapitre(parsedData.data);
                    //alert(JSON.stringify(parsedData.data));
    
    
                    return;
    
            /// POUR REALISER LE BOOKMARK STOCKER LE LIEN DU CHAPITRE ///////
            case 'url_chapter':
                //setToc(parsedData.data);
                let data = parsedData.data;


                setUrlBookmark(data.url);

                //alert(JSON.stringify(parsedData.data));



                return;

            case 'reload':
                //webview.current?.injectJavaScript(`window.myValue = ${JSON.stringify(bookSend)};true;`);

                webview.current.injectJavaScript(`reloadIfNotRead('${idbook}','${path}');`);

                

                return;
            case 'highlight':
                return;

            case 'readiumtest':
                //alert("test readium");
                setOpenBook(true);


                return;
            case 'textBycfi':
                //alert(JSON.stringify(cfi));
                setCfi(parsedData.bycfi);

            case 'isLoading':
                setIsLoading(parsedData.isLoading);
                return;
            case 'position':
                    setPosition(parsedData.data);
                    //alert(parsedData.data)

                    console.log(position);

                    return;

            case 'NextPreviousTouch':
                   
                    setIsVisibleBar(false)
                    fadeOut();
                    setStatusV(true);
                    setvisibleToc(false);
                    setvisibleSetting(false);
                    setvisiblebookmark(false);
                return;
            case 'singleTouch':
                if (isVisibleBar) {
                    setIsVisibleBar(false)
                    fadeOut();
                    setStatusV(true);
                    setvisibleToc(false);
                    setvisibleSetting(false);
                    setvisiblebookmark(false);
                } else {
                    fadeIn();

                    setIsVisibleBar(true);
                    setStatusV(false);
                }
                return;

            default:
                return;
        }
    }

    function savePage() {
        //var newPages = pages;

        if(!isMarked){
            setIsMarked(true);
            let pageSaved = {url:urlBookmark, position:position,title:titleChapitre, date: new Date()}
            pages.unshift(pageSaved);
    
            //alert(JSON.stringify(pages));
    
            db.transaction(txn => {   
                txn.executeSql(
                    `Update bookmark set bookmark = ? where idbook =? `,
                    [JSON.stringify(pages), idbook],
                    (sqlTxn, res) => {
                      //console.log(`${category} category added successfully`);
                      //alert("update"+JSON.stringify(newPages));
                      
                      
                    },
                    error => {
                      console.log("error on adding category " + error.message);
                    },
                  );
                  
                });
    

        }else{

            const urlRecherchee = urlBookmark;
            const positionRecherchee = position;
            
            // Utilisation de findIndex pour trouver l'index correspondant à l'URL et la position
            const indexTrouve = pages.findIndex(element => element.url === urlRecherchee && element.position === positionRecherchee);
            
            if (indexTrouve !== -1) {
                let newPages = pages;
                newPages.splice(indexTrouve, 1);
                setPages(newPages);

                db.transaction(txn => {   
                    txn.executeSql(
                        `Update bookmark set bookmark = ? where idbook =? `,
                        [JSON.stringify(newPages), idbook],
                        (sqlTxn, res) => {
                          //console.log(`${category} category added successfully`);
                          //alert("update"+JSON.stringify(newPages));
                          
                          
                        },
                        error => {
                          console.log("error on adding category " + error.message);
                        },
                      );
                      
                    });
                    console.log("L'index correspondant est :", indexTrouve);
            } else {
              console.log("Aucune correspondance trouvée dans le tableau.");
            }
/*             let newPages = pages;
            newPages.splice(index, 1);
            setPages(newPages); */

            setIsMarked(false);

        }

     
    }

    const tableOfMatiere = () => {
        if (visibleToc == true) {

            setvisibleToc(false);
        } else {
            setvisibleToc(true);
        }
        //webview.current?.injectJavaScript(`$("#dropmenu").addClass("open");true`);
        //webview.current?.injectJavaScript(`$("#dropmenu").attr("class") == "dropdown open"? $("#dropmenu").removeClass("open"): $("#dropmenu").addClass("open");true`);
    }

    const settingsFunc = () => {


        if (visibleSetting == true) {

            setvisibleSetting(false);
        } else {
            setvisibleSetting(true);
            setvisiblebookmark(false);
        }
    }

    const closeSettingsModal = () => {
        setSettingsVisi(false);
      };
    //alert(jsCode);
    if (jsCode == null || jsCode == "") {

        return (

            <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignContent: 'center', alignItems: 'center', backgroundColor: "white" }}>
                <ImageBackground
                    source={{ uri: image }}
                    //resizeMode="cover"
                    style={{ width: 200, height: 300, alignItems: "center", justifyContent: 'center' }}
                    imageStyle={{ borderWidth: 0 }}

                >
                    <ActivityIndicator size={40} color="black" style={{ backgroundColor: "white", borderRadius: 50, padding: 10 }} />
                    <Text style={{ color: '#000', fontWeight: '500', textAlign: 'center' }}>Chargement...</Text>
                </ImageBackground>

            </View>);
    }


    return (

        <SafeAreaView style={[style.container, { backgroundColor: "black" }]} onPress={() => { }}>


            <StatusBar barStyle={isDarkMode ? "light-content" : "dark-content"} backgroundColor="black" />


            {/*             <GestureRecognizer
                onSwipeLeft={() => {
                    //alert('1');
                    webview.current?.injectJavaScript(`$("#right-page-btn").trigger("click");true`);                
                }}
                onSwipeRight={() => {
                    //alert(2);
                    webview.current?.injectJavaScript(`$("#left-page-btn").trigger("click");true`);
                }}
                config={{
                    velocityThreshold: 0.1,
                    directionalOffsetThreshold: 100,
                }}
                style={{
                    width:'100%',
                    height:'100%',
                    position: 'relative',
                }}
            > */}


            <View style={{ flex: 1 }}>


                <WebView
                    ref={webview}
                    style={{ flex: 1 }}
                    /*  source={{ uri: 'http://localhost:3000' }} */
                    //source={{html: htmlCode}}
                    /* source={{ uri: 'https://araf.newspreneuriat.com/public/cloud-reader2/index.html?epub=epub_content%2Fnuit_de_noce1' }} */
                    source={{ uri: "https://reader.maadsenemobi.com?path" }}
                    /*                          source={{
                                            uri: `file:///android_asset/cloud-reader/index.html?epub=${uri}` }}   */
                    /*  source={{ uri: 'file:///data/user/0/com.araf/files/html/index.html' }} */
                    originWhitelist={['*']}
                    javaScriptEnabled={true}
                    injectedJavaScriptBeforeContentLoaded={jsCode}
                    domStorageEnabled={true}
                    scrollEnabled={false}
                    onMessage={(event) => {
                        handleMessage(event)
                    }}
                    //cacheEnabled={true}
                    //cacheMode="LOAD_DEFAULT"
                    //incognito={true}
                    allowUniversalAccessFromFileURLs={true}
                    allowFileAccessFromFileURLs={true}
                    allowFileAccess
                    /*                     style={[style.manager, {
                                            backgroundColor: isDarkMode ? '#000' : '#FFF',flex:1 
                                        }]} */


                    allowsLinkPreview={false}

                />
            </View>





            {/* {
    isStart == false ? <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center',alignContent:'center',alignItems:'center', backgroundColor:"white" }}>
            <ImageBackground
                    source={{ uri:  image }}
                    //resizeMode="cover"
                    style={{width:200,height:300,alignItems:"center",justifyContent:'center'}}
                    imageStyle={{borderWidth:0}}

            >
                <ActivityIndicator size={40} color="black" style={{backgroundColor:"white",borderRadius:50,padding:10}} />
{/*                 <Text style={{ color: '#000', fontWeight: '500', textAlign: 'center' }}>Chargement...</Text> */}
            {/*</SafeAreaView></ImageBackground>

   </View>:null
}   */}

            {
                settingsVisi ? <ModalSettingComponent webView={webview} closeSettingsModal={closeSettingsModal} /> : null
            }
            {isVisibleBar?
            <Animated.View
                style={[style.bar, { backgroundColor: isDarkMode ? '#000' : '#ffff', opacity: fadeAnim, }]}>

                <View style={[style.header, { backgroundColor: '#00000000', flex: 1 }]}>
                    <View style={{ flexDirection: 'row', flex: 2 / 3 }}>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.goBack()}>
                            <Icon name="chevron-back-outline" size={35} color={isDarkMode ? '#FFF' : '#000'} />
                        </TouchableOpacity>
                        <TouchableOpacity /*disabled={isLoading?true:false}*/ style={{ padding: 10 }} onPress={() => tableOfMatiere()}>
                            <Icon name="list-outline" size={35} color={isDarkMode ? '#FFF' : '#000'} />
                        </TouchableOpacity>
                        <TouchableOpacity /*disabled={isLoading?true:false}*/ onPress={() => {
                            

                            if (settingsVisi == true) {
                                setSettingsVisi(false);
                            } else {
                                setSettingsVisi(true);
                            }

                        }
                        } style={{ padding: 10, marginRight: 10 }}>
                            <Icon name="text-outline" size={30} color={isDarkMode ? '#FFF' : '#000'} />
                        </TouchableOpacity>

                        <Text style={[{ fontSize: 20, fontWeight: '500' }, fontStyle]}>{title}</Text>

                    </View>
                    <View style={{ flex: 1 / 3, flexDirection: 'row', alignItems: 'flex-end', alignContent: 'flex-end', justifyContent: 'flex-end' }}>
                        <TouchableOpacity /*disabled={isLoading?true:false}*/ style={{ paddingTop: 10, paddingBottom: 10, alignSelf: 'flex-end' }} onPress={savePage}>
                            <Icon name={isMarked ? "bookmark" : "bookmark-outline"} size={30} color={isDarkMode ? '#FFF' : '#000'} style={style.iconMargin} />
                        </TouchableOpacity>
                        <TouchableOpacity /*disabled={isLoading?true:false}*/
                            style={{ paddingTop: 10, paddingBottom: 10, alignSelf: 'flex-end' }} onPress={settingsFunc}>
                            <Icon name="ellipsis-vertical" size={30} color={isDarkMode ? '#FFF' : '#000'} style={style.iconMargin} />
                        </TouchableOpacity>
                    </View>

                </View>

            </Animated.View>:null
            
            
            }
            {visibleToc ?

                <SafeAreaView style={{ position: 'absolute', backgroundColor: 'white', top: 60, width: '80%', height: '100%', borderColor: "#dddddd82", borderWidth: 2 }} >

                    <Text style={{ fontSize: 22, alignSelf: 'center', paddingTop: 20, marginBottom: 15 }}>Table des matières</Text>
                    <FlatList
                        style={{ backgroundColor: "#blue" }}

                        data={toc}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={{
                                paddingLeft: 25, paddingTop: 10,
                                paddingBottom: 10, paddingRight: 18, borderBottomWidth: 1, margin: 5,
                                borderTopWidth: 1, borderColor: "#dddddd82"
                            }}
                                onPress={() => {

                                    let path1 = path+""+item.href;
                                    //alert(path1);
                                    webview.current.injectJavaScript(`gotoChapterLocationTOC('${idbook}','${path1}');`);

                                    //alert(item.id);
                                    //setIsMarked(true);

                                    setvisibleToc(false);
                                }}>

                                <Text style={{ color: 'black', fontSize: 15 }}>{item.chapitre}</Text>
                            </TouchableOpacity>




                        )}

                    />

                </SafeAreaView> : null}



            {visibleSetting ?

                <SafeAreaView style={{ position: 'absolute', padding: 10, backgroundColor: 'white', top: 60, right: 5, width: 250, borderColor: "#dddddd82", borderWidth: 5 }} >

                    <TouchableOpacity /*disabled={isLoading?true:false}*/
                        style={{ paddingTop: 10, paddingBottom: 0, paddingLeft: 10 }} onPress={() => { setvisibleSetting(false); setvisiblebookmark(true) }}>
                        <Text style={{ fontSize: 16, marginBottom: 15,fontFamily:'Poppins-Bold' }}>Pages enregistrées</Text>
                    </TouchableOpacity>

                </SafeAreaView> : null}

            {visiblebookmark ? <SafeAreaView style={{ position: 'absolute', backgroundColor: 'white', top: 60, width: '100%', height: '100%', borderColor: "#dddddd82", borderWidth: 2 }} >
                <View style={{ flexDirection: 'row', padding: 20, marginBottom: 15 }}>
                    <View style={{ flex: 1 / 2 }}>
                        <Text style={{ fontSize: 19 }}>Pages enregistrées</Text>

                    </View>
                    <View style={{ flex: 1 / 2 }}>
                        <TouchableOpacity /*disabled={isLoading?true:false}*/
                            style={{ backgroundColor: 'red', borderRadius: 50, width: 30, height: 30, alignSelf: 'flex-end', alignItems: 'center' }} onPress={() => { setvisiblebookmark(false) }}>
                            <Text style={{ fontSize: 20, color: 'white' }}>X</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                <FlatList
                    style={{ backgroundColor: "#blue", marginBottom: 70 }}

                    data={pages}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={{ paddingLeft: 25, paddingTop: 10, paddingBottom: 10, paddingRight: 18, borderBottomWidth: 1, margin: 5, borderTopWidth: 1, borderColor: "#dddddd82" }}
                            onPress={() => {
                                //setPathUrl(pathUrl+"&goto ="+item.cfi);
                                //webview.current?.injectJavaScript(`$("#firstdivmaad").trigger("click",['par1','par2']);true`); 
                                //


                                //alert(pathUrl);
                                setvisibleToc(false);
                                setvisiblebookmark(false);
                                setIsMarked(true);
                                let path_bookmark = item.url
                                let position = item.position
                                webview.current.injectJavaScript(`gotoChapterLocation('${idbook}','${path}','${path_bookmark}','${position}');`);



                            }}>

                            <Text style={{ color: 'black', fontSize: 15 }}>{moment(item.date).fromNow()}</Text>
                            <Text style={{ color: 'gray', fontSize: 13 }}>Chapitre: {item.chapitre}</Text>
                            <Text numberOfLines={3} style={{color:'orange'}}>{parseInt(item.position, 10)} %</Text>
                        </TouchableOpacity>




                    )}

                />

            </SafeAreaView> : null}
        </SafeAreaView>

    );

}

export default Reader;
