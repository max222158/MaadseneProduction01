import TrackPlayer from "react-native-track-player";

export const  initializedPlayer = async(album) =>{

    
    

    await TrackPlayer.setupPlayer().then(async () => {

        await TrackPlayer.add(album).then(async () => {

            await TrackPlayer.play();
        });
    });



}


export const addAlbumPlayer = async(album) =>{


    await TrackPlayer.setQueue(album).then(async () => {

        await TrackPlayer.play();
      });

}

export const skipToNext = async() => {
    //alert("skip");
      await TrackPlayer.skipToNext();
  };

  export  const skipToPrevious = async() => {
      await TrackPlayer.skipToPrevious();
  };


  export const togglePlayPause = async playBackState => {
    const currentTrack = await TrackPlayer.getCurrentTrack();
    console.log(currentTrack, playBackState, State.Playing);
    if (currentTrack != null) {
      if (playBackState == State.Paused) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    }
  };