import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';

const books = [
    {
        title: "Biologia - Colégio CEV",
        path: "https://maadsene.s3.amazonaws.com/pdf-1+(5).epub"
    },
    {
        title: "Knight without Armour",
        path: "https://maadsene.s3.amazonaws.com/pdf-1+(5).epub"
    }
]

function Home({ navigation }) {

    function renderBook({ item }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('Reader1', { title: item.title, path: item.path })} style={{ borderBottomWidth: 1, borderBottomColor: 'lightgray', paddingBottom: 20, marginBottom: 10, marginTop: 20 }}>
                <Text style={{ fontSize: 18 }}>{item.title}</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{ backgroundColor: '#FFF', padding: 20, flex: 1 }}>
            <Text style={{ fontSize: 18, fontWeight: '500', color: 'gray' }}>Selecione um Livro</Text>
            <FlatList
                data={books}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderBook}
            />
        </View>
    )
}

export default Home;