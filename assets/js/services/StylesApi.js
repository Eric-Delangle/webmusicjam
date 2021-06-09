import axios from "axios";
import Cache from "./Cache";
import { STYLES_API } from "../config";

async function findAll () {
console.log("haha");
    const cachedStyles = await Cache.get("styles");
    if(cachedStyles) return cachedStyles;
    return axios 
        .get(STYLES_API)
        .then(response => {
            const styles = response.data["hydra:member"];
            Cache.set("styles", styles);
            return styles;
        });
}

async function find(id) {
    const cachedUser = await Cache.get("users." + id);
    if(cachedUser) return cachedUser;

    return axios
    .get(USERS_API + "/" + id)
    .then(response => {
       const user =  response.data;
       Cache.set("user." + id, user);
       return user;
       
    } );
}

function update (id, user) {
    return axios.put(USERS_API + "/" + id ,  user ).then( async response => {
        const cachedUsers= await Cache.get("users");
        const cachedUser = await Cache.get("users." + id);
        if(cachedUser) {
            Cache.set("users." + id, response.data);
        }

        if (cachedUsers) {
        const index= cachedUsers.findIndex(c => c.id ===  + id);
        cachedUsers[index] = response.data;
        }
        return response;
    });
   
}

function create (styles) {
    return axios.post(STYLES_API ,  styles ).then( async response =>{
        const cachedStyles = await Cache.get("styles");
        if (cachedStyles) {
            Cache.set("styles",  [...cachedStyles, response.data]);
        }
        return response;
    })
}

export default {
    findAll,
    find,
    create,
    update
};