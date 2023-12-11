import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function _getPages(idbook,page){
  try {
      console.log("--------------------------"+idbook+"---------"+cl);
          
      return AsyncStorage.setItem('pages'+idbook, page);


  } catch (error) {
    // Error saving data
  }
};

export function _getPages1(key) {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem('pages'+key).then(data => {
      console.log("----value--------",data);
			resolve(JSON.parse(data));
		});
	});
}

export function _storePages(idbook,data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem('pages'+idbook, data);
}

export function _storeNote(idbook,data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem('notes'+idbook, data);
}
