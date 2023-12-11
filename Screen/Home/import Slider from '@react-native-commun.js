import Slider from '@react-native-community/slider';
import 'moment/locale/pt-br';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, ActivityIndicator, Button, FlatList, Modal,StatusBar, Platform, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import ScreenBrightness from 'react-native-screen-brightness';
import Icon from 'react-native-vector-icons/Ionicons';
import { WebView } from 'react-native-webview';
import htmlPathIos from '../../templates/index.html';
import EMBEDDED_HTML from '../../assets/embededHtml'
import themeToStyles from '../../utils/themeToStyles';
import ModalNote from '../ModalNote';
import ModalNotes from '../ModalNotes';
import AsyncStorage from "@react-native-async-storage/async-storage";
import style from './style';
import {_getPages1,_storePages,_storeNote} from './store';

const lightMode = {
    bg: '#FFF !important',
    fg: '#000 !important',
    height:1.5,
    font:'Times New Roman',
    size:'16px'
    
};

const darkMode = {
    bg: '#000 !important',
    fg: '#FFF !important',
    height:1.5,
    font:'Times New Roman',
    size:'16px'
}

const defautThemeReader = {
    bg: '#FFF !important',
    fg: '#000 !important',
    height:1.5,
    font:'Times New Roman',
    
}

function Reader({ navigation, route }) {
    const { title, path,idbook } = route.params;
    const webview = useRef();
    const fontSizes = ["16px", "17px", "18px","19px"];
    const [fontSizeIndex, setFontSizeIndex] = useState(0); // Tamanho de fonte original (100%)
    const [theme, setTheme] = useState(lightMode);
    const [cl, setCl] = useState();
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
    const [brightness, setBrightness] = useState(0);
    const [searchPage, setSearchPage] = useState(progress);
    const [isSearchingPage, setIsSearchingPage] = useState(false);
    const [isVisibleBar, setIsVisibleBar] = useState(true);
    const [lastLoc,setLastLoc] = useState(null);
    const [zoom,setZoom] = useState(100);
    
    
    useEffect(() => {
        //alert(lastLoc);
        _getStorageTheme();
        _getLocation();
        _getPages(idbook);
        _getNotes(idbook);

        

        ScreenBrightness.getBrightness().then((value) => {
            setBrightness(value);
        });



        
    }, []);

    const _storageTheme = async (theme) => {
        try {
                
            return await AsyncStorage.setItem('theme', theme);
    
        } catch (error) {
          // Error saving data
        }
    };
    async function _getStorageTheme() {
        try {
            const value = await AsyncStorage.getItem('theme');
            //alert(value);
    
            //setLastLoc(value);
            if (value == null) {

                setTheme(lightMode);
    
    
            }else{
                if(value == "dark"){
                    goDarkMode(2);
                }else{
                    goDarkMode(1);
                }
            }
        } catch (error) {
            // Error retrieving data
        } 
    }

    

    let injectedJS = `window.BOOK_PATH = "${path}"; window.LOCATIONS = ${locations};window.THEME = ${JSON.stringify(themeToStyles(theme))};`;
    
    const _getPages = (key) => {

        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('pages'+key).then(data => {
                console.log("----value--------",data);
                if(data == null){
                    return ;
                }else{
                    setPages(JSON.parse(data));
                }
                //
                //resolve(JSON.parse(data));
            });
        });
    }

    const _getNotes = (key) => {

        return new Promise((resolve, reject) => {
            AsyncStorage.getItem('notes'+key).then(data => {
                console.log("----value--------",data);
                if(data == null){
                    return ;
                }else{
                    setNotes(JSON.parse(data));
                }
                //
                //resolve(JSON.parse(data));
            });
        });
    }
    const _storeLocation = async () => {
        try {
            //console.log("--------------------------"+idbook+"---------"+cl);
                
            return await AsyncStorage.setItem('location'+idbook, cl);


        } catch (error) {
          // Error saving data
        }
    };

    async function _getLocation() {
          try {
             const value = await AsyncStorage.getItem('location'+idbook);
            //alert(value);
            //webview.current?.injectJavaScript(`window.rendition.display("${value}")`);

            //setLastLoc(value);
            if (value == null) {
                webview.current?.injectJavaScript(`window.rendition.display()`);
              // We have data!!
              console.log(value);
            }else{
                //alert("store = = ="+value);
                webview.current?.injectJavaScript(`window.LOCATIONS=${locations};
                window.rendition.display("${value}");`);
            }
          } catch (error) {
            // Error retrieving data
          }  
    }

    function goPrev() 
    {
        //alert(cl);
        webview.current?.injectJavaScript(`window.rendition.prev(); true`);
        _storeLocation();
    }

    function goNext() {

        //alert(cl)
        webview.current?.injectJavaScript(`window.rendition.next(); true`);
        _storeLocation();
        
    }

    useEffect(() => {
        for (let i = 0; i < pages.length; i++) {
            //
            const page = pages[i];
            console.log("pagess = = =  =",page.progress,"+++++ location = = ",progress);
            if (page.progress == progress) {
                setIsMarked(true);
                return;
            }
        }
        setIsMarked(false);
        
        
        console.log("Logggggg loc",lastLoc);
        
        //console.log("location = = = ",locations);

        //alert(cl);
    }, [cl])

    useEffect(() => {
        for (let i = 0; i < pages.length; i++) {
            const page = pages[i];
            if (page.cfi == cl) {
                setIsMarked(true);
                return;
            }
        }
        
        setIsMarked(false);

        
    }, [cl]);

    function refresh(tema) {
        webview.current?.injectJavaScript(`
        window.THEME = ${JSON.stringify(themeToStyles(tema))};
        window.rendition.themes.register({ theme: window.THEME });
        window.rendition.themes.select('theme'); 
        window.rendition.views().forEach(view => view.pane ? view.pane.render() : null)
        `);
    }

    function goToLocation(href) {
        
        webview.current?.injectJavaScript(`
        window.LOCATIONS=${locations};
        window.rendition.display('${href}'); 
        window.rendition.annotations.remove("${lastMarkedCfi}", "highlight");
        window.rendition.annotations.highlight("${href}", {}, (e) => {}, "", {"fill": "yellow"});
        true`);
        setLastMarkedCfi(href);
        setisModalVisibleSearch(false);
    }

    function goToNote(cfi, page = true, newPage) {



        let pageSave = newPage;
        let locs = JSON.parse(locations);
        webview.current?.injectJavaScript(`
        window.LOCATIONS=${locations};
        window.rendition.display('${locs[pageSave-1]}'); 
        true`);
        
        setProgress(pageSave);

    }

    function goToNote1(cfi, page = true, newPage) {
        
        webview.current?.injectJavaScript(`
        window.LOCATIONS=${locations};
        window.rendition.display('${cfi}'); 
        true`);
        if (page) {
            setIsMarked(true);
        }
        setProgress(newPage);
    }

    function savePage() {
        var newPages = pages;

        if (isMarked) {
            var index = -1;
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                if (page.cfi == cl) {
                    index = i;
                    break;
                }

            }
            if (index > -1) {
                let newPages = pages;
                newPages.splice(index, 1);
                setPages(newPages);
                setIsMarked(false);
            }
        } else {
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                if (page.cfi == cl) {
                    index = i;
                    return;
                }
            }
            newPages.push({ progress, cfi: cl, date: new Date() });
            setIsMarked(true);

        }
        _storePages(idbook,newPages);
        
        //console.log("newPages",newPages);
    }

    function highlightText(data, color = 'yellow') {
        var newNotes = notes;
        let currentDate = new Date();
        removeHighlight(data.cfi);
        newNotes.push({
            cfi: data.cfi,
            data: data.data,
            color: color,
            date: currentDate,
            text: data.text,
            page: progress
        })
        setNotes(newNotes);
        _storeNote(idbook,newNotes);
        webview.current?.injectJavaScript(`
        window.rendition.annotations.remove("${data.cfi}", "highlight");
        window.rendition.annotations.add("highlight", "${data.cfi}", {data: "${data.data}"}, (e) => {}, "", { "fill": "${color}" });
        true`);
    }

    function removeHighlight(c) {
        let index = -1;

        for (let i = 0; i < notes.length; i++) {
            const note = notes[i];
            if (note.cfi == c) {
                index = i;
                break;
            }

        }
        if (index > -1) {
            let newNotes = notes;
            newNotes.splice(index, 1);
            setNotes(newNotes);
            _storeNote(idbook,newNotes);
        }
        webview.current?.injectJavaScript(`
        window.rendition.annotations.remove("${c}", "highlight");
        true`);
    }

    function decreaseFontSize() {
        var newFontSizeIndex = fontSizeIndex;

        if (fontSizeIndex > 0) {
            newFontSizeIndex = fontSizeIndex - 1;
            setFontSizeIndex(newFontSizeIndex);
        }

        var newTheme = theme;
        newTheme.size = fontSizes[newFontSizeIndex];

        setTheme(newTheme);
        refresh(newTheme);
    }

    function increaseFontSize() {
        var newFontSizeIndex = fontSizeIndex;

        if (fontSizeIndex < (fontSizes.length - 1)) {
            newFontSizeIndex = fontSizeIndex + 1;
            setFontSizeIndex(newFontSizeIndex);
        }

        var newTheme = theme;
        newTheme.size = fontSizes[newFontSizeIndex];

        setTheme(newTheme);
        refresh(newTheme);
    }
    function goOpenConfig() {
        setisModalVisibleFont(true);
    }

    function goSearch() {
        setSearchedWord(search);
        setSearchResults([]);
        webview.current?.injectJavaScript(`
        Promise.all(
        	window.book.spine.spineItems.map((item) => {
        		return item.load(window.book.load.bind(window.book)).then(() => {
        		    let results = item.find('${search}'.trim());
        			item.unload();
        			return Promise.resolve(results);
        		});
        	})
        ).then((results) =>
        	window.ReactNativeWebView.postMessage(
        		JSON.stringify({ type: 'search', results: [].concat.apply([], results) })
        	)
        ); true`);
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
                //console.log("--cficur--",parsedData);
                return;
            case 'locations':
                if (isLoading) {
                    setIsLoading(parsedData.isLoading);
                    setTotalPages(parsedData.totalPages)
                    setLocations(parsedData.locations);
                }
                return;
            case 'highlight':
                highlightText(parsedData.data);
                //console.log("++++++bb+++++",parsedData.cfiRange);
                
                return;
            case 'highlightClicked':

                setCurrentNote(parsedData.data);
                //setIsModalVisibleNote(true);
                //console.log("++++++bb+++++",parsedData.cfiRange);
                return;
            case 'isLoading':
                setIsLoading(parsedData.isLoading);
                return;
            case 'bodyClicked':
                if(isVisibleBar){
                    setIsVisibleBar(false)
                }else{

                    setIsVisibleBar(true);
                }
                return;

            default:
                return;
        }
    }

    function goDarkMode(value) {
        if (value == 2 && isDarkMode == false) {
            var newTheme = darkMode;
            newTheme.size = 17;
            setIsDarkMode(true);
            setTheme(newTheme);
            setThemeStyle({ backgroundColor: '#000' });
            setFontStyle({ color: '#FFF' });
            refresh(darkMode);
            _storageTheme("dark");

        }
        else if (value == 1 && isDarkMode == true) {
            var newTheme = lightMode;
            newTheme.size = 17;
            setIsDarkMode(false);
            setTheme(newTheme);
            setThemeStyle({ backgroundColor: '#FFF' });
            setFontStyle({ color: '#000' });
            refresh(lightMode);
            _storageTheme("light");
        }

    }

    function goTeste() {
        if (locations) {
            const l = JSON.parse(locations);
            console.log(l[199]);
            goToLocation(l[199]);
        }
    }

    function changeBrightness(value) {
        ScreenBrightness.setBrightness(value);
    }

    function renderResult({ item }) {
        const v = item.excerpt.toUpperCase().indexOf(searchedWord.toUpperCase());

        return (
            <TouchableOpacity style={[style.resultFound]} activeOpacity={0.4} onPress={() => goToLocation(item.cfi)}>
                <Text style={[style.resultFoundTitle, fontStyle]}>{item.excerpt.slice(0, v)}<Text style={[style.resultFoundTitleBold, fontStyle, { color: '#000' }]}>{item.excerpt.slice(v, v + searchedWord.length)}</Text>{item.excerpt.slice(v + searchedWord.length, item.excerpt.length)}</Text>
            </TouchableOpacity>
        )
    }

    function goToPage(value) {
        setSearchPage(Math.round(value));
    }

    function changePage(value) {
        let nextPage = 5;
        let locs = JSON.parse(locations);
        webview.current?.injectJavaScript(`
        window.LOCATIONS=${locations};
        window.rendition.display('${locs[nextPage - 1]}'); 
        true`);
    }

    return (
        <View  style={[style.container,{backgroundColor:"red"}]} onPress={()=>{alert("dial press webview")}}>
        <StatusBar barStyle={isDarkMode?"light-content":"dark-content"} backgroundColor={isDarkMode? "black":"white"} />

        <WebView
            scalesPageToFit={false}
            bounces={true}
            javaScriptEnabled={true}
            pagingEnabled={false}
            ref={webview}
            source={{html: EMBEDDED_HTML}}
            injectedJavaScriptBeforeContentLoaded={injectedJS}
            originWhitelist={['*']}
            scrollEnabled={false}
            onMessage={(event) => {
                handleMessage(event)
            }}
            allowUniversalAccessFromFileURLs={true}
            allowFileAccessFromFileURLs={true}
            allowFileAccess
            style={[style.manager, {
                backgroundColor: isDarkMode ? '#000' : '#FFF',flex:1 
            }]}
            textZoom={zoom}
            
        />
        {
            isLoading && (
                <View style={{ flex: 1, position: 'absolute', width: '100%', height: '100%', justifyContent: 'center' }}>
                    <ActivityIndicator color="#000" size='large' style={{ marginBottom: 10 }} />
                    <Text style={{ color: '#000', fontWeight: '500', textAlign: 'center' }}>Chargement...</Text>
                </View>
            )
        }
        {isVisibleBar?
        <View
                style={[style.bar, { top: 0,backgroundColor: isDarkMode? '#000':'#ffff'  }]}>
                <View style={style.header}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => navigation.goBack()}>
                            <Icon name="chevron-back-outline" size={35} color={isDarkMode ? '#FFF' : '#000'} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => setIsModalVisibleNoteList(true)}>
                            <Icon name="list-outline" size={35} color={isDarkMode ? '#FFF' : '#000'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={goOpenConfig} style={{ padding: 10, marginRight: 10 }}>
                        <Icon name="text-outline" size={30} color={isDarkMode ? '#FFF' : '#000'} />
                    </TouchableOpacity>
                    </View>
                    <Text style={[{ fontSize: 20, fontWeight: '500' }, fontStyle]}>{title}</Text>
                    <TouchableOpacity style={{ padding: 10 }} onPress={savePage}>
                        <Icon name={isMarked ? "bookmark" : "bookmark-outline"} size={30} color={isDarkMode ? '#FFF' : '#000'} style={style.iconMargin} />
                    </TouchableOpacity>
                </View>

        </View>:null}
        {isVisibleBar?
        <View
                style={[style.bar, { bottom: 0,backgroundColor: isDarkMode? '#000':'#ffff' }]}>

<View style={style.footer}>
    <TouchableOpacity onPress={goPrev} style={{ padding: 20 }}>
        <Icon name="chevron-back-outline" color={isDarkMode ? '#FFF' : '#000'} size={35} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setisModalVisibleSearch(true)} style={{ padding: 10, marginRight: 20 }}>
            <Icon name="search-outline" size={30} color={isDarkMode ? '#FFF' : '#000'} style={style.iconMargin} />
    </TouchableOpacity>


    <TouchableOpacity onPress={goNext} style={{ padding: 10 }}>
            <Icon name="chevron-forward-outline" color={isDarkMode ? '#FFF' : '#000'} size={35} />
    </TouchableOpacity>


</View>
<View style={[style.footer,{marginTop:-20}]}>

    {
        !totalPages ? (
            <Text style={[style.footerText, fontStyle, { position: 'absolute', left: 100, right: 100 }]}>Pages...</Text>
        ) :
            <>
                <TouchableOpacity activeOpacity={0.8} onPress={() => setIsSearchingPage(!isSearchingPage)} style={{ position: 'absolute', left: 120, right: 120, padding: 10 }} >
                    <Text style={[style.footerText, fontStyle]}>{progress} de {totalPages}</Text>
                </TouchableOpacity>
                {isSearchingPage && <View style={{ position: 'absolute', top: -50, left: 80, right: 80, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, padding: 5 }}>
                    <Text style={[style.footerText, fontStyle, { color: '#FFF', fontWeight: '500' }]}>Pages {searchPage}</Text>
                    <Slider
                        minimumValue={1}
                        maximumValue={totalPages}
                        minimumTrackTintColor="#307ecc"
                        maximumTrackTintColor="#000000"
                        step={0.1}
                        value={searchPage}
                        onValueChange={goToPage}
                        onSlidingComplete={changePage}
                        thumbTintColor='dodgerblue'
                        minimumTrackTintColor='dodgerblue'
                        maximumTrackTintColor='#FFF'
                        style={{ width: '75%', marginTop: 5 }}
                    />
                </View>}
            </>
    }
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

        <TouchableOpacity onPress={() => setisModalVisibleSearch(true)} style={{ padding: 10, marginRight: 20 }}>
        </TouchableOpacity>

    </View>
</View>

<Modal
    visible={isModalVisibleFont}
    animationType="slide"
    transparent={true}>
    <View style={{ flex: 1 }}>

        <TouchableWithoutFeedback onPress={() => setisModalVisibleFont(false)} >
            <View style={{ flex: 0.5, backgroundColor: 'rgba(0,0,0,0.5)' }}></View>
        </TouchableWithoutFeedback>
        <ScrollView style={{ flex: 1 }}>
        <View style={[style.resultsContainer, { backgroundColor: isDarkMode ? '#666' : '#FFF' }]}>
            <View style={style.resultHeader}>
                <View></View>
                <Text style={[style.resultTitle, fontStyle, { position: 'absolute', left: 0, right: 0, textAlign: 'center' }]}>Configuration du thème</Text>
                <Button title="x" onPress={() => setisModalVisibleFont(false)} />
            </View>
            <View style={{ marginTop: 20 }}>
                
                <Text style={[{ fontSize: 18, textAlign: 'center' }, fontStyle]}></Text>
                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
       
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={[{ fontSize: 18, textAlign: 'center' }, fontStyle]}>Thème de lecture</Text>
                <View style={{ flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                    <TouchableOpacity style={{ marginRight: 50 }} onPress={() => goDarkMode(1)} >
                        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#fafafa', borderColor: 'lightgray', borderWidth: 1 }}></View>
                        <Text style={[{ fontSize: 18, textAlign: 'center' }, fontStyle]}>Blanc</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => goDarkMode(2)} >
                        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#444', borderColor: 'lightgray', borderWidth: 1 }}></View>
                        <Text style={[{ fontSize: 18, textAlign: 'center' }, fontStyle]}>Sombre</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginTop: 40 }}>
                
                <Text style={[{ fontSize: 18, textAlign: 'center' }, fontStyle]}>Taille police</Text>
                <View style={{ flexDirection: 'row', marginTop: 20,marginBottom:20, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ marginRight: 40 }} onPress={decreaseFontSize} >
                        <View style={[{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 30, borderColor: 'lightgray', borderWidth: 1 }, themeStyle]}>
                            <Text style={[{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }, fontStyle]}>-</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={increaseFontSize} >
                        <View style={[{ justifyContent: 'center', alignItems: 'center', width: 50, height: 50, borderRadius: 30, borderColor: 'lightgray', borderWidth: 1 }, themeStyle]}>
                            <Text style={[{ fontSize: 25, fontWeight: 'bold', textAlign: 'center' }, fontStyle]}>+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
             
            </View>

            {/* <FlatList
                data={searchResults}
                renderItem={renderResult}
                keyExtractor={(item, index) => index.toString()} /> */}
        </View>
        </ScrollView>
    </View>
</Modal>
<Modal
    visible={isModalVisibleSearch}
    animationType="slide"
    transparent={true}>
    <View style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={() => setisModalVisibleSearch(false)} >
            <View style={{ flex: 0.5, backgroundColor: 'rgba(0,0,0,0.5)' }}></View>
        </TouchableWithoutFeedback>
        <View style={[style.resultsContainer, { backgroundColor: isDarkMode ? '#666' : '#FFF' }]}>
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
                <TextInput value={search} placeholder='Rechercher ...' onChangeText={setSearch} style={{ padding: 10, borderRadius: 5, backgroundColor: 'lightgray', flex: 1 }} placeholderTextColor='#000' />
                <View style={{ width: 20 }}></View>
                <Button title="Chercher" onPress={goSearch} style={{ width: '100%' }} />
                <View style={{ width: 20 }}></View>
            </View>
            <FlatList
                data={searchResults}
                renderItem={renderResult}
                keyExtractor={(item, index) => index.toString()} />
        </View>
    </View>
</Modal>
<ModalNote
    isModalVisible={isModalVisibleNote}
    toggleModal={setIsModalVisibleNote}
    currentNote={currentNote}
    isDarkMode={isDarkMode}
    saveNote={highlightText}
    removeNote={removeHighlight}
/>
<ModalNotes
    isModalVisible={isModalVisibleNoteList}
    toggleModal={setIsModalVisibleNoteList}
    notes={notes}
    isDarkMode={isDarkMode}
    pages={pages}
    goToNote={goToNote}
/>

        </View>:null}
    </View>
    )
}

export default Reader;
