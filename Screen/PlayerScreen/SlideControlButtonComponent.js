import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useEffect, useRef, useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMat from 'react-native-vector-icons/MaterialCommunityIcons';
import Slider from '@react-native-community/slider';
import { useProgress } from 'react-native-track-player';

const SlideControlButtonComponent = ({ repeter, progress, TrackPlayer, replay, chargement, loadingPlayer, playBackState, State }) => {
    const width = Dimensions.get("window").width;
    const isExist = (book) => {
        return true; //favorite.find(item => item.id === idsong) !== undefined;
    };

    return (
        <View style={{
            position: 'absolute', bottom: 30, flex: 1, width: width <= 600 ? width - 30 : 580 - 30, alignSelf: 'center'
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',

            }}>
                <TouchableOpacity style={{
                    flexDirection: 'row'


                }}
                    onPress={() => {
                        if (repeter == false) {
                            setRepeter(true)
                        } else {
                            setRepeter(false)
                        }
                    }}

                >
                    <IconMat size={30} name={repeter ? "repeat" : "repeat-off"} color={repeter ? "orange" : "white"} />
                    {/* <Text style={{ color: repeter ? "orange" : color, fontSize: 14, marginLeft: 5 }}>Répéter</Text> */}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {


                }} style={{ textAlign: 'center', alignItems: 'center' }}>
                    <Icon size={30} name="share-outline" color='white' />
                    {/* <Text style={{ color: mode == "clair" ? "black" : 'white' }}>Chapitres</Text> */}
                </TouchableOpacity>


                {!isExist() ?
                    <TouchableOpacity
                        /* onPress={createData} */

                        style={{ marginRight: 20 }}>
                        <IconMat name="heart-outline" size={30} color={color} />

                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        //onPress={removeData}

                        style={{ marginRight: 20 }}>
                        <Icon name="heart" size={30} color="red" />
                    </TouchableOpacity>}
            </View>
            <Slider
                style={[styles.progressBar, { height: 20 }]}
                thumbTintColor='white'
                minimumTrackTintColor="blue"
                maximumTrackTintColor="#bbb"
                minimumValue={0}
                value={progress.position}
                maximumValue={progress.duration}
                onSlidingComplete={async value => {

                    await TrackPlayer.seekTo(value);


                }}

            />

            <View style={{
                width: "100%", flexDirection: 'row', alignSelf: 'center',
                color: 'black', justifyContent: 'space-between', marginBottom: 0, paddingLeft: 15, paddingRight: 15
            }} >
                <Text style={{ color: 'white' }}>

                    {new Date(progress.position * 1000).toLocaleTimeString('en-US', { hour12: false, hourCycle: 'h23' }).substring(3)}
                </Text>

                <Text style={{ color: 'white' }}>
                    {new Date((progress.duration - progress.position) * 1000).toLocaleTimeString('en-US', { hour12: false, hourCycle: 'h23' }).substring(3)}
                </Text>


            </View>

            <View
                style={{
                    width: width <= 600 ? '100%' : 580,
                    flexDirection: 'row', marginRight: 10, marginTop: 5,
                    justifyContent: 'space-around', alignSelf: 'center', alignItems: 'center',
                    borderTopColor: '#242424', paddingTop: 20
                }}
            >
                    <TouchableOpacity  /* disabled={songIndexList ==0?true:false} */
                        style={{ marginRight: 10, backgroundColor: '#8787879c', padding: 5, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => { TrackPlayer.seekTo(progress.position - 15); }}>
                        <Icon name="play-skip-back-outline" size={30}
                            color='white' />
                    </TouchableOpacity>
                <View style={{
                    flexDirection: 'row', justifyContent: 'center', alignItems: 'center'
                }}>


                    <TouchableOpacity  /* disabled={songIndexList ==0?true:false} */
                        style={{ marginRight: 10, backgroundColor: '#8787879c', padding: 5, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }} onPress={() => { TrackPlayer.seekTo(progress.position - 15); }}>
                        <IconMat name="rewind-15" size={30}
                            color='white' />
                    </TouchableOpacity>
                    {/*      {

                    replay == false ?

                        chargement || loadingPlayer ? <TouchableOpacity style={{ width: 70, height: 70, borderRadius: 50, marginRight: 10, backgroundColor: 'white', justifyContent: 'center' }} onPress={() => {



                        }} >
                            <ActivityIndicator size={30} color="white" />

                        </TouchableOpacity> : */}

                    <TouchableOpacity
                        style={{
                            width: 70, flexDirection: 'row', justifyContent: 'center',

                            alignItems: 'center', height: 70,
                            marginRight: 10, backgroundColor: 'white', borderRadius: 50
                        }}
                        onPress={() => {

                            playPause(playBackState);


                        }} >
                        <Ionicons name={
                            playBackState === State.Playing ? "ios-pause" : "ios-play"
                        } size={40} color="green" style={{ zIndex: 1000, alignSelf: 'center', marginLeft: 5 }} />
                    </TouchableOpacity>

                    {/*                         :

                        <TouchableOpacity onPress={() => {

                            //playPause(playBackState);

                        }} >
                            <IconMat name="replay" size={60} color="green" />

                        </TouchableOpacity>

                } */}

                    <TouchableOpacity onPress={() => { TrackPlayer.seekTo(progress.position + 15); }} style={{ backgroundColor: '#8787879c', padding: 5, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <IconMat name="fast-forward-15" size={30} color="white"/>

                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { TrackPlayer.seekTo(progress.position + 15); }} style={{ backgroundColor: '#8787879c', padding: 5, borderRadius: 50, height: 50, width: 50, justifyContent: 'center', alignItems: 'center' }}>
                        <Icon name="play-skip-forward-outline" size={30} color="white" />

                    </TouchableOpacity>


            </View>








        </View>
    )
}

export default SlideControlButtonComponent

const styles = StyleSheet.create({})