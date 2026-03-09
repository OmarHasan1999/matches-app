// import express from 'express'
// import axios from 'axios'
// import cors from 'cors'

// import dotenv from 'dotenv'
// dotenv.config()

// const app = express()
// const port = process.env.PORT || 3001

// app.use(cors({
//   origin: '*',
//   methods: ['GET','POST','OPTIONS'],
//   allowedHeaders: ['Content-Type','Authorization']
// }))

// app.options('*', cors())

// app.get('/', (req, res) => {
//   res.send('API is running ✅')
// })

// app.get('/matches/:date', async (req, res) => {
//   try {

//     // select date
//     const {date} = req.params
//     const now = new Date()
//     let targetDate = new Date()

//     if(date === 'yesterday'){
//       targetDate.setDate(now.getDate() - 1)
//     }
//     else if(date === 'tomorrow'){
//       targetDate.setDate(now.getDate() + 1)
//     }
//     else if(date === 'today'){
//       targetDate.setDate(now.getDate());
// }

//     const formatDate = targetDate.toISOString().split('T')[0]

//     const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
//       headers: {
//         'x-apisports-key': process.env.API_KEY
//       },
//       params: {
//         date: formatDate
//       }
//     })

//     res.json(response.data.response)
    
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// if(process.env.NODE_ENV !== 'production') {
//   app.listen(3001, () => console.log('Server running on port 3001'))
// }

// export default app

// // app.listen(port, "0.0.0.0", () => {
// //   console.log(`Server running at http://localhost:${port}`)
// // })


import express from 'express'
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

app.use(cors())

// مهم جداً لـ Vercel
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  next()
})

app.get('/', (req, res) => {
  res.send('API is running')
})

app.get('/matches/:date', async (req, res) => {
  try {

    const { date } = req.params
    const now = new Date()
    let targetDate = new Date()

    if(date === 'yesterday'){
      targetDate.setDate(now.getDate() - 1)
    }
    else if(date === 'tomorrow'){
      targetDate.setDate(now.getDate() + 1)
    }
    else{
      targetDate.setDate(now.getDate())
    }

    const formatDate = targetDate.toISOString().split('T')[0]

    const response = await axios.get('https://v3.football.api-sports.io/fixtures', {
      headers: {
        'x-apisports-key': process.env.API_KEY
      },
      params: {
        date: formatDate
      }
    })

    res.json(response.data.response)

  } catch (err) {
  console.log(err.response?.data)
  res.status(err.response?.status || 500).json(err.response?.data || { error: err.message })
}
})
export default app