import connect from '../../mongo-connect'
import AgendaJobs from '../../models/Agenda'
import { Agenda } from "agenda";
import { Mongoose , ObjectId} from 'mongoose';
import path from 'path'
const jobsDir = path.resolve(__dirname, './jobs')

var ready = false
export var agenda:Agenda;

export function start():Promise<Agenda>{
  return new Promise((resolve, reject) => {
    if(ready) {
      if(agenda){
        return resolve(agenda);
      }
      return reject(`agenda must be defined at this point`)
    }
    connect().then(conn=>{
      const _agenda = new Agenda({mongo: conn.collection('agendaJobs').conn.db});
      agenda = _agenda
      registerEventListenders(agenda);
      _agenda.start().then(()=> resolve(_agenda))
    })
  });
}

function registerEventListenders(agenda:Agenda){
  agenda.on(`ready`, () => {
    console.log(`✅ AGENDA is ready!`);
    ready = true;
  })
  agenda.on(`error`, (err) => {
    console.log(`❌ AGENDA encountered error!`, err);
    ready = false;
  })
}

export async function rescheduleJobs(){
  await rescheduleOneTimeTasks();
  
  await reloadPeriodicJobs()
}

async function reloadPeriodicJobs() {
    const periodicJobs = await AgendaJobs.find({repeatInterval: {$exists: true}})
    console.log(`${periodicJobs.length} Periodic jobs found`, periodicJobs);
    
    for (const job of periodicJobs) {
      const taskPath = `${jobsDir}/${job.name}`
      console.log(taskPath);
      let task = (await import(taskPath)).default
      await task(agenda || await start())
    }
}

async function rescheduleOneTimeTasks(){
  const allJobs = await AgendaJobs.find({lastFinishedAt:{$exists: false}, repeatInterval: {$exists: false}})
  console.log(`${allJobs.length} OneTime jobs found`, allJobs);
  let _agenda = agenda || await start()
  for (const job of allJobs) {
    let task = (await import(`${jobsDir}/${job.name}`)).default
    let t = await task(_agenda);
    let {_id, name, data, nextRunAt} = job;
    console.log(_id, name, data, nextRunAt);
    if(nextRunAt < new Date()){
      nextRunAt = new Date().getTime() + (5 * 1000)
      await AgendaJobs.findByIdAndRemove({_id: _id});
      _agenda.schedule(nextRunAt, job.name, data)
    }
  }
}


let graceful = () => {
  agenda.stop().then( r => process.exit(0));
};

process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);