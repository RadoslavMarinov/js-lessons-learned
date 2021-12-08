import Agenda from 'agenda';
import fs from 'fs';
const fsp = fs.promises

export default (agenda:Agenda) => {
  const jobName =  'appendToDummyFile'
  agenda.define(jobName, async () => {
    await fsp.appendFile('file.txt',`${(new Date()).toISOString()}\n`)
    console.log(`APPEND to file`);
  })
  return jobName
}