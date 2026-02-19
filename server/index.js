import express from 'express'
import axios from 'axios'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3001

app.use(cors())


app.get('/matches/:date', async (req, res) => {
  try {

    // select date
    const {date} = req.params
    const now = new Date()
    let targetDate = new Date()

    if(date === 'yesterday'){
      targetDate.setDate(now.getDate() - 1)
    }
    else if(date === 'tomorrow'){
      targetDate.setDate(now.getDate() + 1)
    }
    else if(date === 'today'){
      targetDate.setDate(now.getDate());
}

    const formatDate = targetDate.toISOString().split('T')[0]

    const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
      headers: {
        'x-apisports-key': '05b9e01bfc3dd2079bf951432c044346'
      },
      params: {
        date: formatDate
      }
    })

    res.json(response.data.response)
    
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

app.listen(port, "0.0.0.0", () => {
  console.log(`Server running at http://localhost:${port}`)
})