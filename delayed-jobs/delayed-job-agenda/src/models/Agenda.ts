import { Schema , model} from 'mongoose'

import connect from '../mongo-connect'

connect()

const agendaSchema = new Schema({
  name: {type: String},
  data: {type: {}},
  priority: {type: Number},
  type: {type: String},
  nextRunAt:{type:Date},
  lastFinishedAt: Date,
  repeatInterval: String
},{ collection: 'agendaJobs' })

export default model('AgendaJobs', agendaSchema);