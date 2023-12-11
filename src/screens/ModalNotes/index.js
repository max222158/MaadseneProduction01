import moment from 'moment';
import 'moment/locale/fr';
import React, { useState } from 'react';
import { FlatList, Modal, SafeAreaView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import style from './style';

function NotesPages({ notes, toggleModal, isModalVisible, isDarkMode, goToNote, pages }) {
    const [isSelected, setIsSelected] = useState(false);

    return (
        <SafeAreaView style={[style.container]}>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => toggleModal(false)} >
                        <View style={{ flex: 0.5, backgroundColor: 'rgba(0,0,0,0.5)' }}></View>
                    </TouchableWithoutFeedback>
                    <View style={{ flex: 1.5, backgroundColor: isDarkMode ? '#666' : '#FFF' }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                            <TouchableOpacity activeOpacity={0.6} onPress={() => setIsSelected(false)}>
                                <Text style={{ fontSize: 18, padding: 20, textAlign: 'center', borderBottomWidth: !isSelected ? 4 : 0, borderBottomColor: 'dodgerblue', color: !isSelected ? '#000' : 'gray' }}>Pages marquées</Text>
                            </TouchableOpacity>
                        </View>

                        {
                            !isSelected && <ModalPages pages={pages} toggleModal={toggleModal} isModalVisible={isModalVisible} isDarkMode={isDarkMode} goToNote={goToNote} />
                        }

                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    )
}

function ModalNotes({ notes, toggleModal, isModalVisible, isDarkMode, goToNote }) {

    function renderNote({ item }) {
        moment.locale('fr');
        const relativeDate = moment(item.date).fromNow();
        return (
            <TouchableOpacity onPress={() => { goToNote(item.cfi, false, item.page); toggleModal(false) }} style={{ borderBottomWidth: 0.5, borderBottomColor: 'lightgray', paddingBottom: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 14, textAlign: 'right', color: isDarkMode ? '#FFF' : 'gray' }}>Page {item.page}</Text>
                    <Text style={{ fontSize: 14, textAlign: 'right', color: isDarkMode ? '#FFF' : 'gray' }}>{relativeDate}</Text>
                </View>
                <View style={{ paddingVertical: 10, paddingLeft: 10, borderLeftWidth: 4, borderLeftColor: item.color }}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 16, color: isDarkMode ? '#FFF' : 'gray' }}>{item.text}</Text>
                </View>
                {item.data != "" && <View style={{ paddingTop: 10 }}>
                    <Text style={{ fontSize: 18, color: isDarkMode ? '#FFF' : '#000' }} numberOfLines={3} ellipsizeMode='tail'>{item.data}</Text>
                </View>}
            </TouchableOpacity>
        )
    }

    return (

        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={notes}
                renderItem={renderNote}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
                ListHeaderComponent={() => <View style={{ height: 10 }}></View>}
                ListFooterComponent={() => <View style={{ height: 10 }}></View>}
                ListEmptyComponent={() => <Text style={{ color: 'gray', fontSize: 16, textAlign: 'center', marginTop: 20 }}>Pas d'annotations</Text>}
            />
        </View>
    )
}

function ModalPages({ pages, toggleModal, isModalVisible, isDarkMode, goToNote }) {

    function renderPage({ item }) {
        moment.locale('fr');
        const relativeDate = moment(item.date).fromNow();
        return (
            <TouchableOpacity onPress={() => { goToNote(item.cfi, true, item.progress); toggleModal(false) }} style={{ borderBottomWidth: 0.5, borderBottomColor: 'lightgray', paddingBottom: 15 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' }}>
                    <View></View>
                    <Text style={{ fontSize: 14, textAlign: 'right', color: isDarkMode ? '#FFF' : 'gray' }}>{relativeDate}</Text>
                </View>
                <View style={{ paddingVertical: 10, paddingLeft: 10, borderLeftWidth: 4, borderLeftColor: item.color }}>
                    <Text numberOfLines={2} ellipsizeMode='tail' style={{ fontSize: 16, color: isDarkMode ? '#FFF' : 'gray' }}>Page {item.progress}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    return (

        <View style={{ flex: 1, padding: 10 }}>
            <FlatList
                data={pages}
                renderItem={renderPage}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={() => <View style={{ height: 10 }}></View>}
                ListHeaderComponent={() => <View style={{ height: 10 }}></View>}
                ListFooterComponent={() => <View style={{ height: 10 }}></View>}
                ListEmptyComponent={() => <Text style={{ color: 'gray', fontSize: 16, textAlign: 'center', marginTop: 20 }}>Pas de sauvegarges</Text>}
            />
        </View>
    )
}


export default NotesPages;