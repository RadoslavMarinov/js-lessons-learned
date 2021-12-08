const { Worker } = require('worker_threads');
console.log(Worker);

const runService = (WorkerData) => {
  return new Promise((resolve, reject) => {
    // import workerExample.js script..

    const worker = new Worker('./workerExample.js', { WorkerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) reject(new Error(`stopped with  ${code} exit code`));
    });
  });
};    

const run = async () => {
  const result = await runService('hello John Doe');
  console.log(result);
};

run().catch((err) => console.error(err));
