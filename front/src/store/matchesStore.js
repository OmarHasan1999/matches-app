import { defineStore } from "pinia";
import axios from "axios";

export const matchesStore = defineStore("matchesStore", {
    state : () => ({
        matches:{},
        error: null
        
    }),

    getters:{
        
    },

    actions:{
        async getMatches(date){

            // check if the data in the store for not send request to api
            // load data from store if it access

            // get the data from the store with return (memory) if it exist and the date is not "today" because the data of today is changing every minute
            if(this.matches[date] && date !== 'today'){
                // console.log(`✅ تم تحميل بيانات ${date} من الذاكرة (store)`);
                return 
            }
            try{
                this.error = null;
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/matches/${date}`)
                // load data from api and send request
                this.matches[date] = response.data
                // console.log(response.data);
                // this.matches.forEach((match) => {
                // console.log(match.league.name);
    // })
            }
            catch(err){
                this.error = err.message
            }
        }
    }
})