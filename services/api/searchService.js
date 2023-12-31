import fetchWithTimeout from "../../utils/fetchWithTimeOut";
import { URL_BASE } from "../../utils/utils";

export class SearchService {
    static async getAllSearchData(word) {
        try {
            let url = URL_BASE + "/getAllSearchData/word/"+word;

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

            return data; // Add this line to return the data
        } catch (error) {
            console.error("Error fetching podcast:", error);
            // Handle errors (e.g., log or display an error message)
            throw error; // You may choose to rethrow the error or handle it as needed
        }
    }

}

