export class SettingsFunction{

    static changeTheme = (webViewRef,themeColor) =>{
        if (webViewRef && webViewRef.current) {
            webViewRef.current.injectJavaScript(`document.getElementById(${themeColor}).click();true`);
        } else {
            console.error("La référence webViewRef ou sa propriété current est indéfinie.");
        }
    }
}