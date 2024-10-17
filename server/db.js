const fs = require('fs');
const path = require('path');

const { promisify } = require('util');

const readFile = promisify(fs.readFile);

const studentsPath = path.join(__dirname, './students.json');
exports.getStudents = async () => {
    const data = await readFile(studentsPath, 'utf-8');
    return JSON.parse(data);
}

