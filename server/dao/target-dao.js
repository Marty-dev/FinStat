const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const targetFolderPath = path.join(__dirname, "storage", "targetList")

// Method to read a target from the file system
function getTarget(targetId) {
    try {
        const targetFilePath = path.join(targetFolderPath, `${targetId}.json`)
        const targetFileData = fs.readFileSync(targetFilePath, 'utf8')
        return JSON.parse(targetFileData)
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            throw { code: "failedToReadTarget", message: error.message}
        }
    }
}

// Method to create a target in the file system
function createTarget(target) {
    try {
        target.id = crypto.randomBytes(16).toString("hex")
        const targetFilePath = path.join(targetFolderPath, `${target.id}.json`)
        const targetFileData = JSON.stringify(target)
        fs.writeFileSync(targetFilePath, targetFileData, "utf8")
        return target
    }
    catch (error) {
        throw { code: "failedToCreateTarget", message: error.message}
    }
}

// Method to update a target in the file system
function updateTarget(target) {
    try {
        const currentTarget = getTarget(target.id)

        if (!currentTarget) return null

        const newTarget = {...currentTarget, ...target}

        const targetFilePath = path.join(targetFolderPath, `${target.id}.json`)
        const targetFileData = JSON.stringify(newTarget)
        fs.writeFileSync(targetFilePath, targetFileData, "utf8")

        return newTarget
    } catch (error) {
        throw {
            code: "failedToUpdateTarget", message: error.message
        }
    }
}

// Method to list all targets from the file system
function listAllTargets() {
    try {
        const targetFiles = fs.readdirSync(targetFolderPath)
        return targetFiles.map((targetFile) => {
            const targetData = fs.readFileSync(
                path.join(targetFolderPath, targetFile),
                'utf8'
            )
            return JSON.parse(targetData)
        })
    }
    catch (error) {
        throw { code: "failedToListAllTargets", message: error.message}
    }
}

module.exports = {
    getTarget,
    createTarget,
    updateTarget,
    listAllTargets
}


