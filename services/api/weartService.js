import fetchWithTimeout from "../../utils/fetchWithTimeOut";
import { URL_BASE } from "../../utils/utils";

export class WeArtService {


    static async getArt(page) {
        //let userToken = userData.token;
        let url =
          URL_BASE+'/getArt/page/'+page;
    
        try {
    
            const response = await fetchWithTimeout(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    // "Content-Type": "application/json",
                },
                timeout: 35000
            });

            const data = await response.json();
           // console.log("-----", data);

            return data;
            
        } catch (e) {
    
          // alert('dial' + e);
          //actions.logout();
    
        }
      }

}

