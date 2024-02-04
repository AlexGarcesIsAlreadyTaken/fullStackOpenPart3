const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },  
  {    
    id: 2,    
    content: "Browser can execute only JavaScript",    
    important: false  
  },  
  {    
    id: 3,    
    content: "GET and POST are the most important methods of HTTP protocol",    
    important: true  
  }
]

app.get( '/',(req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => res.json(notes))

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const note = notes.find(note => note.id === id)
  if (note) res.json(note)
  else {
    res.statusMessage = `does not exist note with id ${id}`
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(note => note.id !== id)
  console.log(notes)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const body = req.body
  
  if (!body.content) res.status(400).json({error: 'content missing'}) 
  else {
     const note = {
      content: body.content,
      important: Boolean(body.important) || false,
      id: (notes.length > 0 ? Math.max(...notes.map(note => note.id)) : 0) + 1
    }
    notes = notes.concat(note)
    res.json(note)
  }
  
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({error: 'unknown endpoint'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
