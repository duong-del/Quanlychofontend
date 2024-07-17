import axios from "axios";
import {BASE_URL} from "@/utils/contanst"
import { getAuthToken } from "@/utils/localStorage";

export default async function callApi(method, url, params, headers)
{
    console.log(params);
    const token = getAuthToken();
    const header = {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : ""
    };

    return axios({
        method: method,
        url: url,
        baseURL: BASE_URL,
        data: params,
        params: method === 'GET' ? params : '',
        headers: headers ? {...headers, ...header} : header,

    }).then(function (response) {
        return response.data;
      })
      .catch((error) => {
        let response = error.response ? error.response : error;
        return response
      })
}
