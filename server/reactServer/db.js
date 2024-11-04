const fs = require('fs')
const path = require('path')
const { promisify } = require('util')


const readFile = promisify(fs.readFile)
const writeFile = promisify(fs.writeFile)

const commentListPath = path.join(__dirname, './commentList.json')
const userPath = path.join(__dirname, './user.json')

exports.getCommentList = async () => {
    const data = await readFile(commentListPath, 'utf8')
    return JSON.parse(data)
}

exports.updateCommentList = async list => {
    const data = JSON.stringify(list, null, "  ")
    await writeFile(commentListPath, data)
}

exports.getUser = async () => {
    const data = await readFile(userPath, 'utf8')
    return JSON.parse(data)
}