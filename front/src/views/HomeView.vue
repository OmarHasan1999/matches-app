<template>
  <div>
    <v-container class="header py-6" fluid>
      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="4">

          <div class="title" style="display: flex;gap: 1vh;justify-content: end;align-items: center;">
          <h3>الترتيب والمباريات ببساطة</h3>
          <img src="../assets/pngegg.png" alt="">
          </div>
        </v-col>
      </v-row>
    </v-container>

    <div class="mainSection">
      <div class="table">

        <!-- skeleton loader -->
        <v-row v-if="loading">
        <v-col cols="3" v-for="num in 1" :key="num" style="min-height:100vh;">       
            <v-skeleton-loader width="720" color="black" class="skeleton"
            type="article,article,article,article"></v-skeleton-loader>
        </v-col>
        </v-row>

        <div v-else-if="error">حدث خطأ: {{ error }}</div>

        <div v-else>
          <div v-if="!loading && theMatches.length === 0">لا توجد مباريات مشهورة اليوم.</div>


          <div v-else class="champion">
          <div class="dateLinks">
            <router-link to="/yesterday" class="date">yesterday</router-link>
            <router-link to="/today" class="date">Today</router-link>
            <router-link to="/tomorrow" class="date">tomorrow</router-link>
          </div>

          <!-- // order matches with leagues name -->
          <div v-for="(matches,leagueName) in matchesByName" :key="leagueName">
              <div class="nameChampion">
                <h3>{{ leagueName }}</h3>
                <div class="imgLeague">
                  <img :src="matches[0].league.logo">
                </div>

              </div>

      <!-- // loop for matches data -->
      <div class="machResult" v-for="match in matches" :key="match.id">

        <div class="team teamHome">
        <span>{{ shortName(match.teams.home.name) }}</span>
        <img :src="match.teams.home.logo">
        </div>

        <div class="goalsOrDate">
        <template v-if="match.goals.home !== null && match.goals.away !== null">
          {{ match.goals.home }} - {{ match.goals.away }}
        </template>
        <template v-else>
          {{ new Date(match.fixture.date).toLocaleTimeString('EG', { hour: '2-digit', minute: '2-digit' }) }}
        </template>
        </div>

        <div class="team teamAway">
        <img :src="match.teams.away.logo">
        <span>{{ shortName(match.teams.away.name) }}</span>
        </div>

        </div>

</div>
</div>
        </div>
    </div>
    </div>

    <div class="footer">
      <div style="display: flex;flex-direction: column;margin-top: 4vh;gap: 4vh;color: aliceblue;">
        <div class="socialLinks">
          <v-icon class="icon">mdi-facebook</v-icon>
          <v-icon class="icon">mdi-twitter</v-icon>
          <v-icon class="icon">mdi-instagram</v-icon>
          <v-icon class="icon">mdi-whatsapp</v-icon>
        </div>
        <span style="font-size: 14px;">Copyright © 2010 - 2025 جدول</span>
      </div>
    </div>
  </div>
</template>

<script>
import { matchesStore } from "../store/matchesStore"
import {mapState,mapActions} from "pinia"
export default {
  data() {
    return {
      loading:false
    }
  },
  computed: {
    ...mapState(matchesStore,["matches","error"]),

    theDate(){
      return this.$route.params.date || 'today'
    },

    theMatches(){
      return this.matches[this.theDate] || []
    },

    // filter the matches with league name
    matchesByName(){
      const group = {}
      this.theMatches.forEach(match => {
        const league = match.league.name
        if(!group[league]) group[league] = []
        group[league].push(match)
      })
      return group
    }
  },
  methods: {
    ...mapActions(matchesStore,["getMatches"]),

    shortName(e){
      const part = e.split(' ')
      if(part.length >= 3){
        return part.slice(0,2).join(' ')
      }
      return e
    }
  },
  mounted() {
    const date = this.$route.params.date || 'today'
    this.getMatches(date)
    this.loading=true
    setTimeout(() => {
      this.loading=false
    }, 1000);
  },
  watch: {
    $route(){
      const date = this.$route.params.date || 'today'
      this.getMatches(date)

      this.loading=true
      setTimeout(() => {
      this.loading=false
    }, 1000);
    }
  },
}
</script>
<style lang="css">
  *{
    padding: 0%;
    margin: 0%;
    scroll-behavior: smooth;
    box-sizing: border-box;
  }
  html,body{
    overflow-x: hidden;
  }
  .header{
    background: rgba(0, 0, 0, 0.904);
  }
  .header h3{
    color: aliceblue;
    font-size: 20px;
  }
  .header img{
    width: 4vh;
  }
  
  .footer{
    background: black;
    width: 100%;
    padding: 8vh 0vh;
    display: flex;
    justify-content: center;
  }
  .socialLinks .icon{
    margin-left: 1.5vh;
    margin-right: 1.5vh;
  }
  .mainSection{
    width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.923);
  }
  .table{
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3vh;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.651);
    color: aliceblue;
  }

  .champion{
    background-color: rgba(240, 248, 255, 0.446);
    min-height: 100vh;
    text-align: right;
    overflow: hidden;
    width: 120vh;
  }
  .nameChampion{
    display: flex;
    justify-content: end;
    align-items: center;
    padding: 3vh 1vh 3vh 0;
    gap: 1.5vh;
    background-color: rgba(0, 0, 0, 0.386);
  }
  .dateLinks{
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

  }
  .dateLinks .date{
    color: aliceblue;
    text-decoration: none;
    display: flex;
    padding: 2vh 15vh 2vh 15vh ;
    transition: 0.5s ease;
    font-weight: bold;
    font-family:Arial, Helvetica, sans-serif;
  }
  .dateLinks .date:hover{
    background-color: rgba(0, 0, 0, 0.611);
  }
  .nameChampion .imgLeague{
    border: 1px solid transparent;
    width: 40px;
    background-color: aliceblue;
    border-radius: 7px;
    display: flex;
    justify-content: center;
  }
  .imgLeague img{
    width: 20px;
  }
  .nameChampion h3{
    font-size: 16px;
    font-weight: 400;
  }
  .machResult{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 3vh 4vh;
    background-color: rgba(0, 0, 0, 0.581);
    gap: 2vh;
    border: 1px solid transparent;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.156);
    cursor: pointer;
  }
  .machResult .team{
    display: flex;
    align-items: center;
    gap: 1.5vh;
    min-width: 30%;
    flex: 1;
  }
  .machResult .teamHome{
    margin-left: 10vh;
  }
  .machResult .teamAway{
    margin-left: 20vh;
    margin-right: 18vh;
  }
  .machResult .goalsOrDate{
    color: aliceblue;
    font-size: 16px;
    font-weight: bold;
    min-width: 30%;
    margin-left: -20vh;
  }

  .machResult img{
    width: 25px;
  }
  .machResult span{
    font-size: 15px;
  }
  .machResult:hover{
    background-color: rgba(0, 0, 0, 0.685);
  }

  /* media queries */
  @media (max-width:800px) {
    .champion{
    width: 110vh;
  }
  .dateLinks .date{
    padding: 2.5vh 12vh 2.5vh 12vh ;
  }
  .machResult .teamHome{
    margin-left: 6vh;
  }
  .machResult{
    padding: 4vh 0;
  }
   .machResult .teamAway{
    margin-left: 16vh;
    margin-right: 16vh;
  }
   .machResult span{
    font-size: 13px;
  }
  .machResult .goalsOrDate{
    margin-left: -14vh;
  }
  .skeleton{
    padding: 0 1vh;
  }
  }

  @media (max-width:700px) {
    .champion{
    width: 95vh;
  }
  .dateLinks .date{
    padding: 2vh 10vh 2vh 10vh ;
  }
  .machResult{
    padding: 5vh 1vh;
  }
  .machResult .team{
    gap: 0.6vh;
  }
  .machResult .teamHome{
    margin-left: 6vh;
  }
   .machResult .teamAway{
    margin-right: 2vh;
  }
  .machResult .goalsOrDate{
    margin-left: -15vh;
    font-size: 13px;
  }
  .machResult img{
    width: 20px;
  }
  .machResult span{
    font-size: 13px;
  }
  .title {
    width: 70vh;
    padding-right: 18vh;
    margin-left: -18vh;
  }
  .skeleton{
    padding: 0 1vh;
  }
  }

  @media (max-width:570px){
    .title {
    width: 70vh;
    padding-right: 22vh;
    margin-left: -20vh;
  }
  }
  @media (max-width:500px){
    .champion{
    width: 70vh;
  }
  .dateLinks .date{
    padding: 2.5vh 5vh 2.5vh 5vh ;
  }
  .nameChampion h3{
    font-size: 13px;
    font-weight: 400;
  }
  .machResult img{
    width: 17px;
  }
  .machResult span{
    font-size: 11px;
  }
  .machResult .goalsOrDate{
    width: 50px;
    text-align: center;
    flex: 0 0 auto;
    font-size: 11px;
  }
  .machResult .team{
    gap: 0.2vh;
    margin: 0 -2vh;
  }
  .machResult .teamHome{
    margin-left: 2vh;
  }
  .machResult .teamAway{
    margin-right: -12vh;
  }
  .title {
    width: 70vh;
    padding-right: 27vh;
    margin-left: -25vh;
  }
  .date{
    font-size: 14px;
  }
   .skeleton{
    padding: 0 13vh;
  }
  }

  @media (max-width:400px){
  .champion{
    width: 50vh;
  }
  .dateLinks .date{
    padding: 2.5vh 3.5vh 2.5vh 3.5vh ;
    font-size: 13px;
  }
  .machResult img{
    width: 13px;
  }
  .machResult .teamAway{
    margin-right: -13vh;
  }
  .title {
    padding-right: 27vh;
    margin-left: -28vh;
  }
  .machResult .goalsOrDate{
    padding-right: 1vh;
    font-size: 11px;
  }
  .skeleton{
    padding: 0 23vh;
  }
  }
  @media (max-width:340px){
    .champion{
    width: 50vh;
  }
  .title {
    padding-right: 27vh;
    margin-left: -31vh;
    opacity: 1;
  }
  .machResult .teamAway{
    margin-right: -9vh;
  }
   .nameChampion h3{
    font-size: 12px;
    font-weight: 400;
  }
  .machResult .goalsOrDate{
    padding-left: 4vh;
    font-size: 11px;
  }
  
  }
  

</style>