const os = require('os');
const log = require('./logger');

const interval = 1000;

setInterval(() => {
  const { freemem, totalmem } = os;

  const totalMemory = parseInt(totalmem() / 1024 / 1024);

  const freeMemory = parseInt(freemem() / 1024 / 1024);

  const usingMemory =  parseInt(totalMemory - freeMemory);

  const percentsUsage = parseInt((usingMemory / totalMemory) * 100);

  const avaibleMemory = parseInt((freeMemory / totalMemory) * 100);

  const stats = {
    Free_Memory: `${freeMemory} MB`,
    Using_Memory: `${usingMemory} MB`,
    Total_Memory: `${totalMemory} MB`,
    Usage_Memory: `${percentsUsage} %`,
    Avaible_Memory: `${avaibleMemory} %`
  }
  console.clear()
  console.log("======= PC STATS =======");
  console.table(stats);

  log(`${JSON.stringify(stats)}\n`);
}, interval);

