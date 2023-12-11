import React, { useEffect, useState } from 'react';
import { Modal, SafeAreaView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import style from './style';

function ModalNote({ toggleModal, currentNote, isModalVisible, isDarkMode, saveNote, removeNote }) {
    const [note, setNote] = useState(currentNote ? currentNote.data : "");
    const [color, setColor] = useState('dodgerblue');

    useEffect(() => {
        setNote(currentNote ? currentNote.data : "")
    }, [isModalVisible])

    return (
        <SafeAreaView style={[style.container]}>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}>
                <View style={{ flex: 1 }}>
                    <TouchableWithoutFeedback onPress={() => {}} >
                        <View style={{ flex: 0.5, backgroundColor: 'rgba(0,0,0,0.5)' }}></View>
                    </TouchableWithoutFeedback>
                    <View style={[style.resultsContainer, { backgroundColor: isDarkMode ? '#666' : '#FFF' }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => { removeNote(currentNote.epubcfi); toggleModal(false); }} style={{ padding: 10, alignSelf: 'flex-end' }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: 'dodgerblue', marginBottom: 10 }}>Supprimer</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { saveNote({ cfi: currentNote.epubcfi, text: currentNote.text, data: note }, color); toggleModal(false); }} style={{ padding: 10, alignSelf: 'flex-end' }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: 'dodgerblue', marginBottom: 10 }}>Sauver</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => toggleModal(false)} style={{ padding: 10, alignSelf: 'flex-end' }}>
                                <Text style={{ textAlign: 'center', fontSize: 18, color: 'dodgerblue', marginBottom: 10 }}>Fermer</Text>
                            </TouchableOpacity>
                        </View>

                        {currentNote && <Text style={{ fontSize: 18, padding: 20, backgroundColor: '#ebebeb', borderLeftWidth: 4, borderLeftColor: color, marginBottom: 10, color: 'gray' }} numberOfLines={3} ellipsizeMode='tail'>{currentNote.text}</Text>}
                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
                            <TouchableOpacity onPress={() => setColor('dodgerblue')}>
                                <View style={{ width: 50, height: 50, backgroundColor: 'dodgerblue', borderRadius: 25 }}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setColor('tomato')}>
                                <View style={{ width: 50, height: 50, backgroundColor: 'tomato', borderRadius: 25, marginHorizontal: 10 }}></View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setColor('mediumseagreen')}>
                                <View style={{ width: 50, height: 50, backgroundColor: 'mediumseagreen', borderRadius: 25 }}></View>
                            </TouchableOpacity>
                        </View>
                        <TextInput
                            placeholder="Ajouter une note"
                            placeholderTextColor={isDarkMode ? '#FFF' : 'gray'}
                            autoFocus={true}
                            multiline={true}
                            textAlignVertical='top'
                            numberOfLines={3}
                            value={note}
                            onChangeText={setNote}
                            style={{ fontSize: 18, color: isDarkMode ? '#FFF' : '#000' }}
                        />
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    )
}

export default ModalNote;