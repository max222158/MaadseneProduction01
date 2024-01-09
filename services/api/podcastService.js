import AsyncStorage from "@react-native-async-storage/async-storage";
import fetchWithTimeout from "../../utils/fetchWithTimeOut";
import { URL_BASE } from "../../utils/utils";

export class PodcastService {
    static async getPodcastOfWeek() {
        try {
            let url = URL_BASE + "/getSelectionOfWeek";

            const response = await fetchWithTimeout(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    // "Content-Type": "application/json",
                },
                timeout: 35000
            });

            const data = await response.json();
            //console.log("-----", data);

            return data; // Add this line to return the data
        } catch (error) {
            console.error("Error fetching podcast:", error);
            // Handle errors (e.g., log or display an error message)
            throw error; // You may choose to rethrow the error or handle it as needed
        }
    }

    static async geEpisodesById(idpodcast) {
        try {
            let url = URL_BASE + "getPodcastEpisodes/id/" + idpodcast;
            //alert(url);

            const response = await fetchWithTimeout(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    // "Content-Type": "application/json",
                },
                timeout: 35000
            });

            const data = await response.json();
            //console.log("-----", data);

            return data; // Add this line to return the data
        } catch (error) {
            console.error("Error fetching podcast:", error);
            // Handle errors (e.g., log or display an error message)
            throw error; // You may choose to rethrow the error or handle it as needed
        }
    }


    static async getPodcastPagination(page) {
        try {
            let url = URL_BASE + "getPodcastPagination/page/" + page;
            //alert(url);

            const response = await fetchWithTimeout(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    // "Content-Type": "application/json",
                },
                timeout: 35000
            });

            const data = await response.json();
            //console.log("-----", data);

            return data; // Add this line to return the data
        } catch (error) {
            console.error("Error fetching podcast:", error);
            // Handle errors (e.g., log or display an error message)
            throw error; // You may choose to rethrow the error or handle it as needed
        }
    }

    static async getPodcastByCateg() {
        try {
            let url = URL_BASE + "/databycateg";
            //alert(url);

            const response = await fetchWithTimeout(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    // "Content-Type": "application/json",
                },
                timeout: 35000
            });

            const data = await response.json();
            console.log("-----", data);

            return data; // Add this line to return the data
        } catch (error) {
            console.error("Error fetching podcast:", error);
            // Handle errors (e.g., log or display an error message)
            throw error; // You may choose to rethrow the error or handle it as needed
        }
    }



    static async storePodcastToLocal(key, value) {

        try {
            await AsyncStorage.setItem(key, JSON.stringify(value));
            //console.log(`Data with key '${key}' stored successfully.`);
        } catch (error) {
            console.error('Error storing data:', error);
            // Gérer les erreurs, par exemple, afficher un message à l'utilisateur
        }


    }

    static async getPodcastToLocal(key) {

        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // La valeur a été récupérée avec succès
                //console.log(`Data with key '${key}' retrieved successfully:`, JSON.parse(value));
                return JSON.parse(value);
            } else {
                // La clé n'a pas été trouvée dans AsyncStorage
                console.log(`No data found with key '${key}'.`);
                return null;
            }
        } catch (error) {
            console.error('Error retrieving data:', error);
            // Gérer les erreurs, par exemple, afficher un message à l'utilisateur
            return null;
        }


    }


    static async updateNumberOfViewPodcast(id){
        try {
            let url = URL_BASE + "incrementViewPodcasts/id/" + id;
            //alert(url);

            const response = await fetchWithTimeout(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json, text/plain, */*',
                    // "Content-Type": "application/json",
                },
                timeout: 35000
            });
 // Add this line to return the data
        } catch (error) {
            console.error("Error fetching podcast:", error);
            // Handle errors (e.g., log or display an error message)
            throw error; // You may choose to rethrow the error or handle it as needed
        }    
        
    }
}

