const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const categoryController = require('./controller/category.js')

app.use(express.json())  // support for application/json
app.use(express.urlencoded({ extended: true }))  // support for application/x-www-form-urlencoded

app.use(cors())

app.use('/category', categoryController)

app.get('/', (req, res) => {
    res.send('Welcome to the server!')
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})