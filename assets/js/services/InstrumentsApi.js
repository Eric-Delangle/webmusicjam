import axios from "axios";
import Cache from "./Cache";
import { INSTRUMENTS_API } from "../config";

async function findAll () {

    const cachedInstruments = await Cache.get("instruments");
    if(cachedInstruments) return cachedInstruments;
    return axios 
        .get(INSTRUMENTS_API)
        .then(response => {
            const instruments = response.data["hydra:member"];
            Cache.set("instruments", instruments);
            return instruments;
        });
}

async function find(id) {
    const cachedUser = await Cache.get("users." + id);
    if(cachedUser) return cachedUser;

    return axios
    .get(INSTRUMENTS_API + "/" + id)
    .then(response => {
       const user =  response.data;
       Cache.set("user." + id, instruments);
       return instruments;
       
    } );
}

function create (list) {
    return axios.post(INSTRUMENTS_API , list);
}

export default {
    findAll,
    find,
    create
};