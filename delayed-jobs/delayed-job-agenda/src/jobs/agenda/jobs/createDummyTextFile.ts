import Agenda from 'agenda';
import fs from 'fs';
import path from 'path';

export default async function (agenda: Agenda): Promise<{ jobName: string }> {
  const jobName = `createDummyTextFile`;

  const filePath = path.resolve(
    __dirname,
    `${new Date().toISOString()}-file.txt`
  );

  agenda.define(
    jobName,
    {
      concurrency: 1,
      lockLimit: 1,
      lockLifetime: 60 * 1000,
      priority: 2
    },
    async (job, done) => {
      try {
        console.log(`WILL WRITE FILE AT: `, filePath);
        fs.writeFileSync(filePath, `HELLO RIKO ${new Date().toISOString()}}`);
        console.log(`FILE WRITTEN AT: `, filePath);
        done();
      } catch (error) {
        console.error(error);
        throw error        
      }
    }
  );

  return { jobName };
}
