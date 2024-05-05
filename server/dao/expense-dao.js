const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const expenseFolderPath = path.join(__dirname, "storage", "expenseList")

// Method to read an expense from the file system
function getExpense(expenseId) {
    try {
        const expenseFilePath = path.join(expenseFolderPath, `${expenseId}.json`)
        const expenseFileData = fs.readFileSync(expenseFilePath, 'utf8')
        return JSON.parse(expenseFileData)
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            throw { code: "failedToReadExpense", message: error.message}
        }
    }
}

// Method to create an expense in the file system
function createExpense(expense) {
    try {
        expense.id = crypto.randomBytes(16).toString("hex")
        const expenseFilePath = path.join(expenseFolderPath, `${expense.id}.json`)
        const expenseFileData = JSON.stringify(expense)
        fs.writeFileSync(expenseFilePath, expenseFileData, "utf8")
        return expense
    }
    catch (error) {
        throw { code: "failedToCreateExpense", message: error.message}
    }
}

// Method to remove an expense from the file system
function removeExpense(expenseId) {
    try {
        const expenseFilePath = path.join(expenseFolderPath, `${expenseId}.json`)
        fs.unlinkSync(expenseFilePath)
        return {}
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            throw { code: "failedToRemoveExpense", message: error.message}
        }
    }
}

// Method to update an expense in the file system
function updateExpense(expense) {
    try {
        const currentExpense = getExpense(expense.id)

        if (!currentExpense) return null

        const newExpense = {...currentExpense, ...expense}

        const expenseFilePath = path.join(expenseFolderPath, `${expense.id}.json`)
        const expenseFileData = JSON.stringify(newExpense)
        fs.writeFileSync(expenseFilePath, expenseFileData, "utf8")

        return newExpense
    } catch (error) {
        throw {
            code: "failedToUpdateExpense", message: error.message
        }
    }
}

// Method to list all expenses from the file system
function listAllExpenses() {
    try {
        const expenseFiles = fs.readdirSync(expenseFolderPath)
        return expenseFiles.map((expenseFile) => {
            const expenseData = fs.readFileSync(
                path.join(expenseFolderPath, expenseFile),
                'utf8'
            )
            return JSON.parse(expenseData)
        })
    }
    catch (error) {
        throw { code: "failedToListAllExpenses", message: error.message}
    }
}

module.exports = {
    getExpense,
    createExpense,
    removeExpense,
    listAllExpenses,
    updateExpense
}