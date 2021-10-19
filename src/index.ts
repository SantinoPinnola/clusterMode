import myServer from './services/server';
import { dbConnection } from './db/mongoDB';
import { initWsServer } from './services/sockets';
import { allArguments } from './utils/getArgs';
import {exec} from 'child_process'

const commandFork =
'pm2 start src/index.js --name="ServerFork" --watch -- 8080';
const commandCluster =
'pm2 start src/index.js --name="ServerCluster"--watch -i max -- 8081';

if (allArguments.s == "cluster") {
    exec(commandCluster, (err, stdout, stderr) => {
      if (err) {
        console.log(`Error => ${err.message}`);
        return;
      }
      console.log(stderr);
  
      if (stderr) {
        console.log("STDERR");
        console.log(stderr);
        return;
      }
      console.log(stdout);
      console.log(process.pid);
      initWsServer(myServer);
      dbConnection();
      myServer.listen(8080, () => console.log(`Escuchando puerto $8080`));
    });
  } else {
    exec(commandFork, (err, stdout, stderr) => {
      if (err) {
        console.log(`Error => ${err.message}`);
        return;
      }
      console.log(stderr);
  
      if (stderr) {
        console.log("STDERR");
        console.log(stderr);
        return;
      }
  
      console.log(stdout);
      //Imprimo PID
      console.log(process.pid);
      initWsServer(myServer);
      dbConnection();
      myServer.listen(8080, () => console.log(`Escuchando puerto $8080`));
    });
}