import axios from "axios";
import Cache from "./Cache";
import { USERS_API } from "../config";

async function findAll () {

    const cachedUsers = await Cache.get("users");
    if(cachedUsers) return cachedUsers;
    return axios 
        .get(USERS_API)
        .then(response => {
            const users = response.data["hydra:member"];
            Cache.set("users", users);
            return users;
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

function register (user) {
    return axios.post(USERS_API , user); 
}

export default {
    findAll,
    find,
    update,
    register
};