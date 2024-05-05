const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const incomeFolderPath = path.join(__dirname, "storage", "incomeList")

// Method to read an income from the file system
function getIncome(incomeId) {
    try {
        const incomeFilePath = path.join(incomeFolderPath, `${incomeId}.json`)
        const incomeFileData = fs.readFileSync(incomeFilePath, 'utf8')
        return JSON.parse(incomeFileData)
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            throw { code: "failedToReadIncome", message: error.message}
        }
    }
}

// Method to create an income in the file system
function createIncome(income) {
    try {
        income.id = crypto.randomBytes(16).toString("hex")
        const incomeFilePath = path.join(incomeFolderPath, `${income.id}.json`)
        const incomeFileData = JSON.stringify(income)
        fs.writeFileSync(incomeFilePath, incomeFileData, "utf8")
        return income
    }
    catch (error) {
        throw { code: "failedToCreateIncome", message: error.message}
    }
}

// Method to remove an income from the file system
function removeIncome(incomeId) {
    try {
        const incomeFilePath = path.join(incomeFolderPath, `${incomeId}.json`)
        fs.unlinkSync(incomeFilePath)
        return {}
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            throw { code: "failedToRemoveIncome", message: error.message}
        }
    }
}

// Method to update an income in the file system
function updateIncome(income) {
    try {
        const currentIncome = getIncome(income.id)

        if (!currentIncome) return null

        const newIncome = {...currentIncome, ...income}

        const incomeFilePath = path.join(incomeFolderPath, `${income.id}.json`)
        const incomeFileData = JSON.stringify(newIncome)
        fs.writeFileSync(incomeFilePath, incomeFileData, "utf8")

        return newIncome
    } catch (error) {
        throw {
            code: "failedToUpdateIncome", message: error.message
        }
    }
}

// Method to list all incomes from the file system
function listAllIncomes() {
    try {
        const incomeFiles = fs.readdirSync(incomeFolderPath)
        return incomeFiles.map((incomeFile) => {
            const incomeData = fs.readFileSync(
                path.join(incomeFolderPath, incomeFile),
                'utf8'
            )
            return JSON.parse(incomeData)
        })
    }
    catch (error) {
        throw { code: "failedToListAllIncomes", message: error.message}
    }
}

module.exports = {
    getIncome,
    createIncome,
    removeIncome,
    listAllIncomes,
    updateIncome
}