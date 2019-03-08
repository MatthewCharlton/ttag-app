var process = require('process');
var exec = require('child_process').exec;
var fs = require('fs');

console.log('\n *Process i18n* \n');

var configPath = process.argv[2];
var step = process.argv[3];

if (!configPath) {
  console.log('No configPath file was supplied, exiting');
  return process.exit(1);
}

if (!step) {
  console.log('No step [init, update] was supplied, exiting');
  return process.exit(1);
} else if (step !== 'init' && step !== 'update') {
  console.log('Unrecognised step command was supplied, exiting');
  return process.exit(1);
}

var config = JSON.parse(fs.readFileSync(configPath));

var path = config.path;
var baseLanguage = config.baseLanguage;
var languageCodes = config.languageCodes;
var sourceFolder = config.sourceFolder;

if (!path) console.log('No path file was supplied in config');
if (!baseLanguage) console.log('No baseLanguage file was supplied in config');
if (!languageCodes) console.log('No languageCodes file was supplied in config');
if (!sourceFolder) console.log('No sourceFolder file was supplied in config');
if (!path || !baseLanguage || !languageCodes || !sourceFolder)
  return process.exit(1);

languageCodes.forEach(function(language) {
  if (language !== baseLanguage) {
    if (step === 'init') {
      exec(
        `npx ttag init ${language} ${sourceFolder}/i18n/${language}.po`,
        function(err, stdout, stderr) {
          if (err) {
            // node couldn't execute the command
            return;
          }

          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        }
      );
    } else if (step === 'update') {
      exec(`npx ttag update ${path}/${language}.po ${sourceFolder}/`, function(
        err,
        stdout,
        stderr
      ) {
        if (err) {
          // node couldn't execute the command
          return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
      exec(
        `npx ttag po2json ${path}/${language}.po > ${path}/${language}.po.json`,
        function(err, stdout, stderr) {
          if (err) {
            // node couldn't execute the command
            return;
          }

          // the *entire* stdout and stderr (buffered)
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        }
      );
    }
  }
});
