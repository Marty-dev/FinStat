const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const categoryController = require('./controller/category.js')
const incomeController = require('./controller/income.js')
const expenseController = require('./controller/expense.js')
const targetController = require('./controller/target.js')

app.use(express.json())  // support for application/json
app.use(express.urlencoded({ extended: true }))  // support for application/x-www-form-urlencoded

app.use(cors())

app.use('/category', categoryController)
app.use('/income', incomeController)
app.use('/expense', expenseController)
app.use('/target', targetController)

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})