var process = require('process');
var exec = require('child_process').exec;

var config = process.argv[2];
if (!config) {
  console.log('No config file was supplied, exiting');
  return process.exit(1);
}

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
    exec(
      `npx ttag init ${language} ${sourceFolder}/i18n/${language}.po`,
      (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          return;
        }

        // the *entire* stdout and stderr (buffered)
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      }
    );
    exec(
      `npx ttag update ${path}${language}.po ${sourceFolder}/`,
      (err, stdout, stderr) => {
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
});
