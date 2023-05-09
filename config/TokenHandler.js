import {CLIENT_SECRET, CLIENT_ID} from '@env';
import {useState} from "react";
export async function getTokenData() {
    const [token, setToken] = useState(null);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "grant_type=client_credentials&client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
    };
    const getTokenData = await fetch("https://accounts.spotify.com/api/token", options)
        .then(res => res.json())
        .catch(error => console.error(error));
    setToken(getTokenData);


    const returnOptions = {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token.access_token.toString()
        }
    }
    return returnOptions

}