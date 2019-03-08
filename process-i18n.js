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

var i18nFolderName = config.i18nFolderName;
var baseLanguage = config.baseLanguage;
var languageCodes = config.languageCodes;
var sourceFolder = config.sourceFolder;

if (!i18nFolderName)
  console.log('No i18nFolderName file was supplied in config');
if (!baseLanguage) console.log('No baseLanguage file was supplied in config');
if (!languageCodes) console.log('No languageCodes file was supplied in config');
if (!sourceFolder) console.log('No sourceFolder file was supplied in config');
if (!i18nFolderName || !baseLanguage || !languageCodes || !sourceFolder)
  return process.exit(1);

if (languageCodes.length > 0) {
  languageCodes.forEach(function(language) {
    if (language !== baseLanguage) {
      if (step === 'init') {
        var pathToI18nFolder = `${sourceFolder}/${i18nFolderName}`;
        var listOfFilesInI18nFolder = [];
        if (!fs.existsSync(pathToI18nFolder)) {
          fs.mkdirSync(pathToI18nFolder);
        }
        fs.readdirSync(pathToI18nFolder).forEach(fileName => {
          listOfFilesInI18nFolder.push(fileName);
        });
        if (listOfFilesInI18nFolder.indexOf(`${language}.po`) < 0) {
          exec(
            `npx ttag init ${language} ${sourceFolder}/${i18nFolderName}/${language}.po`,
            function(err) {
              if (err) {
                console.log(`Error: ${err}`);
                return;
              }
              console.log(
                `New language file created: "${sourceFolder}/${i18nFolderName}/${language}.po"`
              );
            }
          );
          exec(
            `npx ttag update ${sourceFolder}/${i18nFolderName}/${language}.po ${sourceFolder}/`,
            function(err) {
              if (err) {
                console.log(`Error: ${err}`);
                return;
              }
              console.log(
                `New language file updated: "${sourceFolder}/${i18nFolderName}/${language}.po"`
              );
            }
          );
        } else {
          console.log(
            `"${sourceFolder}/${i18nFolderName}/${language}.po" already exists`
          );
        }
      } else if (step === 'update') {
        exec(
          `npx ttag update ${sourceFolder}/${i18nFolderName}/${language}.po ${sourceFolder}/`,
          function(err) {
            if (err) {
              console.log(`Error: ${err}`);
              return;
            }
          }
        );
        exec(
          `npx ttag po2json ${sourceFolder}/${i18nFolderName}/${language}.po > ${sourceFolder}/${i18nFolderName}/${language}.po.json`,
          function(err) {
            if (err) {
              console.log(`Error: ${err}`);
              return;
            }
            console.log(
              `${sourceFolder}/${i18nFolderName}/${language}.po.json updated`
            );
          }
        );
      }
    }
  });
}
