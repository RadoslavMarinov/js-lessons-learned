import connect from './mongo-connect'
import express from 'express';
import { rescheduleJobs, start} from './jobs/agenda/agenda'
import AgendaJobs from './models/Agenda'
import {agenda} from './jobs/agenda/agenda'

import dummyJob from './jobs/agenda/jobs/createDummyTextFile'
import appendToDummyFileJob from './jobs/agenda/jobs/appendToDummyFile';
import path from 'path'

import fs from 'fs'
import Agenda from 'agenda';

const app = express()

const PORT = process.env.PORT || 3000

app.get('/',async (req:any,res:any) => {
  const {query} = req
  console.log(`QUERY: `, query);
  res.send(`<a href="http://localhost:${PORT}/append">Append</a>`)
})

app.get('/job/one-time/create-file',async (req:any,res:any) => {
  const { query } = req;
  const after = query.after || 10;
  const agn = await start();
  const {jobName} = await dummyJob(agn)
  console.log(`Schedule job ${jobName} after ${after} seconds`);
  agn?.schedule(new Date((new Date()).getTime() + Number(after) * 1000), jobName,{age:30} )
  res.json({after: after, units: 'seconds'})
})

app.get('/job/periodic/append',async (req:any,res:any) => {
  const { query } = req;
  const after = query.after || 10;
  const agn = await start();
  agenda.every(`${after} seconds`, appendToDummyFileJob(agn),{age:123});
  res.json({every: after, units: `seconds`, name: `appendToDummyFile`})
})


app.listen(PORT,async () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

(async () => {
  console.log(`DIRNAME : `,path.resolve( __dirname, "riko.txt"));
  await connect()
  const agenda = await start();
  await rescheduleJobs()
})()

console.log(__filename);