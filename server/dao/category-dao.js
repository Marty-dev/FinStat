const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const categoryFolderPath = path.join(__dirname, "storage", "categoryList")

// Method to read a category from the file system
function getCategory(categoryId) {
    try {
        const categoryFilePath = path.join(categoryFolderPath, `${categoryId}.json`)
        const categoryFileData = fs.readFileSync(categoryFilePath, 'utf8')
        return JSON.parse(categoryFileData)
    }
    catch (error) {
        if (error.code === 'ENOENT') {
           throw { code: "failedToReadCategory", message: error.message}
        }
    }
}

// Method to create a category in the file system
function createCategory(category) {
    try {
        category.id = crypto.randomBytes(16).toString("hex")
        const categoryFilePath = path.join(categoryFolderPath, `${category.id}.json`)
        const categoryFileData = JSON.stringify(category)
        fs.writeFileSync(categoryFilePath, categoryFileData, "utf8")
        return category
    }
    catch (error) {
        throw { code: "failedToCreateCategory", message: error.message}
    }
}

// Method to remove a category from the file system
function removeCategory(categoryId) {
    try {
        const categoryFilePath = path.join(categoryFolderPath, `${categoryId}.json`)
        fs.unlinkSync(categoryFilePath)
        return {}
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            throw { code: "failedToRemoveCategory", message: error.message}
        }
    }
}

// Method to list all categories from the file system
function listAllCategories() {
    try {
        const categoryFiles = fs.readdirSync(categoryFolderPath)
        return categoryFiles.map((categoryFile) => {
            const categoryData = fs.readFileSync(
                path.join(categoryFolderPath, categoryFile),
                'utf8'
            )
            return JSON.parse(categoryData)
        })
    }
    catch (error) {
        throw { code: "failedToListAllCategories", message: error.message}
    }
}

module.exports = {
    getCategory,
    createCategory,
    removeCategory,
    listAllCategories
}


