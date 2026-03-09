<template>
  <div>
    <v-container class="header py-6" fluid>
      <v-row>
        <v-col cols="8"></v-col>
        <v-col cols="4">

          <div class="title" style="display: flex;gap: 1vh;justify-content: end;align-items: center;">
          <h3>MatchDay Hub</h3>
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
            <v-skeleton-loader width="600" color="black" class="skeleton"
            type="article,article,article,article"></v-skeleton-loader>
        </v-col>
        </v-row>

        <div v-else-if="error">{{ error }}</div>

        <div v-else>
          <div v-if="!loading && theMatches.length === 0">error ..</div>


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

        <!-- showing the result  -->
        <div class="goalsOrDate">
        <template v-if="match.goals.home !== null && match.goals.away !== null">
          <!-- if the match is live or in the first half or in the second half or in the extra time or in the penalty shootout show a green dot and minute -->
          <div v-if="['1H','2H','HT','LIVE','ET','P'].includes(match.fixture.status.short)"
          class="live-match">
          <span class="dot-green"></span>
          <span class="minute-match">{{ match.fixture.status.elapsed }}'</span>
          </div>
          
          {{ match.goals.home }} - {{ match.goals.away }}
        </template>

        <!-- showing the time of the match -->
        <template v-else>
          {{ new Date(match.fixture.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false }) }}
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


<script setup>
import { matchesStore } from "../store/matchesStore"
import { onMounted, computed, ref, watch } from "vue"
import {storeToRefs} from "pinia"
import { useRoute } from "vue-router"

const route = useRoute()

const loading = ref(false)

const theMatchesStore = matchesStore() 
const { getMatches } = theMatchesStore
const { matches, error } = storeToRefs(theMatchesStore)

const theDate = computed(() => route.params.date || 'today')

const theMatches = computed(() => matches.value[theDate.value] || [])

const matchesByName = computed(() => {
  const priority = {
    "UEFA Champions League": 1,
    "UEFA Europa League": 2,
    "Premier League": 3,
    "La Liga": 4,
    "Serie A": 5,
    "Bundesliga": 6,
    "Ligue 1": 7,
    "Saudi Pro League": 8,
  }

  const group = {}

  theMatches.value.forEach(match => {
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
})

const shortName = (e) => {
  const part = e.split(' ')
  if(part.length >= 3){
    return part.slice(0,2).join(' ')
  }
  return e
}

const loadMatches = () => {
  getMatches(theDate.value)
  loading.value = true
  setTimeout(() => loading.value = false, 1000)
}

onMounted(() => loadMatches())

watch(route, () => loadMatches())
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
    width: 25px;
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
    font-size: 14px;
    font-weight: bold;
    font-family: 'Rajdhani', sans-serif;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
  .dateLinks .date:hover{
    background-color: rgba(0, 0, 0, 0.27);
  }

  .dateLinks .date.router-link-active {
  background-color: rgba(0, 0, 0, 0.55);
  color: aliceblue;
  border-color: rgba(255, 255, 255, 0.435);
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
    overflow: hidden;
    position: relative;
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
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: aliceblue;
    font-size: 16px;
    font-weight: bold;
    flex: 0 0 70px;
    text-align: center;
    flex-wrap: nowrap;
    position: relative;
    height: 45px;
  }

  .live-match{
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: -46%;
    left: 50%;
    transform: translateX(-50%);
    gap: 4px;
    border: 1px solid rgba(76, 175, 80, 0.4);
    border-top: none;
    border-radius: 12%;
    background-color: rgba(76, 175, 80, 0.1);
    padding: 1px 13px;
  }

  .live-match .dot-green{
    width: 6px;
    height: 6px;
    background-color: #4CAF50;
    border-radius: 50%;
    margin-top: 4px;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%   { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.6); }
  70%  { box-shadow: 0 0 0 4px rgba(76, 175, 80, 0); }
  100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
  }

  .live-match .minute-match {
  color: aliceblue;
  font-size: 12px;
  font-weight: 500;
  font-family: 'Rajdhani', sans-serif;
  letter-spacing: 0.5px;
  margin-top: 6px;
}

  .machResult img{
    width: 28px;
    height: 28px;
    object-fit: contain;
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
  .live-match .dot-green{
    margin-top: 9px;
  }
  .live-match .minute-match {
    margin-top: 9px;
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