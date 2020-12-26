const util = require('util');
const exec = util.promisify(require('child_process').exec);

async function getPID() {
  const { error, stdout, stderr } = await exec('for /f "tokens=5" %a in (\'netstat -aon ^| findstr 8045\') do @echo %~nxa');

  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`PID: ${stdout}`);
  return stdout.toString();
}

module.exports.stopWindows = async function () {
    exec('taskkill /f /pid ' + await getPID(), (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
};