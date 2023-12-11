import * as React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import RNBootSplash from "react-native-bootsplash";

const FirstRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#ff4081' }} />
);

const SecondRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);

const threeRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const fourRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#673ab7' }} />
);
const cinqRoute = () => (
  <View style={{ flex: 1, backgroundColor: '#67hji' }} />
);
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  three: threeRoute,
  four: fourRoute,
  cinq: cinqRoute,

});


export default function TabHome() {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 'three', title: 'three' },
    { key: 'four', title: 'four' },
    { key: 'cinq', title: 'cinq' },
  ]);
  React.useEffect(() => {
    const init = async () => {
      // …do multiple sync or async tasks
    };

    init().finally(async () => {
      await RNBootSplash.hide({ fade: true });
      console.log("Bootsplash has been hidden successfully");
    });
  }, []);
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}