/* eslint-disable */
const fs = require('fs')
const path = require('path')

const envFilePath = path.resolve(__dirname, '.env')

function setEnvVariablesFromEnvFile(path) {
  const envFileData = fs.readFileSync(path, {
    encoding: 'utf-8',
  })

  const envVarPairs = envFileData.split('\n')

  envVarPairs.forEach((pair) => {
    const [key, value] = pair.split(/(?<=^\w+)=/)
    process.env[key] = value
  })
}

if (fs.existsSync(envFilePath)) {
  setEnvVariablesFromEnvFile(envFilePath)
}
