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
        <img :src="match.teams.home.logo">
        <span>{{ shortName(match.teams.home.name) }}</span>
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

    // filter the matches with 5 leagues and order them with the name of the league
    matchesByName(){
   const priority = {
    "La Liga": 1,
    "Serie A": 2,
    "Bundesliga": 3,
    "Ligue 1": 4,
    "UEFA Champions League": 5,
  }

  const group = {}

  this.theMatches.forEach(match => {
    const league = match.league.name
    if(!group[league]) group[league] = []
    group[league].push(match)
  })

  return Object.fromEntries(
    Object.entries(group).sort((a,b) => {
      const aPriority = priority[a[0]] || 999
      const bPriority = priority[b[0]] || 999
      return aPriority - bPriority
    })
  )
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

  /* header section */
  .header{
    background: rgba(0, 0, 0, 0.9);
  }
  .header h3{
    color: aliceblue;
    font-size: 20px;
  }
  .header img{
    width: 35px;
  }
  
  /* footer section */
  .footer{
    background: black;
    width: 100%;
    padding: 60px 0;
    display: flex;
    justify-content: center;
  }
  .socialLinks .icon{
    margin:0 10px;
  }

  /* main section */
  .mainSection{
    width: 100%;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.92);
  }
  .table{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: rgba(0, 0, 0, 0.65);
    color: aliceblue;
  }

  /* champion box */
  .champion{
    background-color: rgba(240,248,255,0.1);
    min-height: 100vh;
    overflow: hidden;
    width: 90%;
    max-width: 800px;
  }

  /* Date Links */
  .dateLinks{
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

  }
  .dateLinks .date{
    flex: 1;
    color: aliceblue;
    text-align: center;
    text-decoration: none;
    padding: 16px 0;
    transition: 0.5s ease;
    font-weight: bold;
    font-family:Arial, Helvetica, sans-serif;
  }
  .dateLinks .date:hover{
    background-color: rgba(0, 0, 0, 0.6);
  }

  /* league name  */
  .nameChampion{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 12px 16px;
    gap: 10px;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .nameChampion .imgLeague{
    width: 36px;
    height: 36px;
    background-color: aliceblue;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .imgLeague img{
    width: 22px;
  }
  .nameChampion h3{
    font-size: 15px;
    font-weight: 400;
    color: aliceblue;
  }

  /* MATCH ROW */
  .machResult{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    background-color: rgba(0, 0, 0, 0.58);
    gap: 8px;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.156);
    transition: 0.3s ease;
    cursor: pointer;
  }

  /* team */
  .machResult .team{
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
    flex: 1;
  }
  .machResult .teamAway{
    flex-direction: row-reverse;
    text-align: right;
  }
  .machResult .team span{
    font-size: 14px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* SCORE / TIME */
  .machResult .goalsOrDate{
    color: aliceblue;
    font-size: 16px;
    font-weight: bold;
    flex: 0 0 70px;
    text-align: center;
    flex-wrap: nowrap;
  }

  .machResult img{
    width: 28px;
    height: 28px;
    object-fit: cover;
    flex-shrink: 0;
  }
  .machResult:hover{
    background-color: rgba(0, 0, 0, 0.685);
  }

  /* media queries */
  @media (max-width:800px) {
  .skeleton{
    padding: 0 1vh;
  }
  }

  @media (max-width:700px) {
  .title {
    width: 70vh;
    padding-right: 25vh;
    margin-left: -18vh;
  } 
  .skeleton{
    padding: 0 1vh;
  }
  }

  @media (max-width:600px){
    .champion{
    width: 100%;
  }
  .machResult{
    gap: 6px;
    padding:12px 10px;
  }
  .machResult img{
    width: 22px;
    height: 22px;
  }
  .machResult .team span{
    font-size: 12px;
  }
  .dateLinks .date{
    padding: 12px 0;
    font-size: 13px;
  }
  .machResult .goalsOrDate{
    font-size: 14px;
    flex: 0 0 55px;
  }
  .title {
    width: 70vh;
    padding-right: 27vh;
    margin-left: -25vh;
  }
  .skeleton{
    padding: 0 13vh;
  }
  }

  @media (max-width:400px){
    .nameChampion h3{
    font-size: 13px;
  }
  .machResult .team span{
    font-size: 11px;
  }
  .machResult .goalsOrDate{
    font-size: 13px;
    flex: 0 0 50px;
  }
  .title {
    padding-right: 30vh;
  }
  .skeleton{
    padding: 0 23vh;
  }

}

  @media (max-width:360px){
  .title {
    padding-right: 25vh;
    margin-left: -31vh;
    opacity: 1;
  }
}
  

</style>