var process = require('process');
var exec = require('child_process').exec;
var fs = require('fs');
var po = require('node-po');
var async = require('async');
var AWS = require('aws-sdk');
var awsConfig = require('./awsConfig.json');
var awsTranslate = new AWS.Translate(awsConfig);

function translate(items, lang, cb) {
  var q = async.queue(doTranslate, 5);

  function doTranslate(item, cb) {
    console.log('translating:', item);
    var params = {
      SourceLanguageCode: 'en',
      TargetLanguageCode: lang,
      Text: item.msgid
    };
    awsTranslate.translateText(params, cb);
  }

  var translations = [];
  q.push(items, function(err, data) {
    if (err) return console.log('Error:', err);
    translations.push(data);
  });

  q.drain = function() {
    return cb(null, translations);
  };
}

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
} else if (step !== 'init' && step !== 'translate' && step !== 'update') {
  console.log('Unrecognised step command was supplied, exiting');
  return process.exit(1);
}

var config = JSON.parse(fs.readFileSync(configPath));

var i18nFolderName = config.i18nFolderName;
var baseLanguage = config.baseLanguage;
var languageCodes = config.languageCodes;
var baseFolder = config.baseFolder;

if (!i18nFolderName)
  console.log('No i18nFolderName file was supplied in config');
if (!baseLanguage) console.log('No baseLanguage file was supplied in config');
if (!languageCodes) console.log('No languageCodes file was supplied in config');
if (!baseFolder) console.log('No baseFolder file was supplied in config');
if (!i18nFolderName || !baseLanguage || !languageCodes || !baseFolder)
  return process.exit(1);

if (languageCodes.length > 0) {
  var pathToI18nFolder = `${baseFolder}/${i18nFolderName}`;
  languageCodes.forEach(function(language) {
    var listOfFilesInI18nFolder = [];
    if (language !== baseLanguage) {
      var poFileName = `${pathToI18nFolder}/${language}.po`;
      if (step === 'init') {
        listOfFilesInI18nFolder = [];
        if (!fs.existsSync(pathToI18nFolder)) {
          fs.mkdirSync(pathToI18nFolder);
        }
        fs.readdirSync(pathToI18nFolder).forEach(fileName => {
          listOfFilesInI18nFolder.push(fileName);
        });
        if (listOfFilesInI18nFolder.indexOf(`${language}.po`) < 0) {
          exec(`npx ttag init ${language} ${poFileName}`, function(err) {
            if (err) {
              console.log(`Error: ${err}`);
              return;
            }
            console.log(`New language file created: "${poFileName}"`);
          });
          exec(`npx ttag update ${poFileName} ${baseFolder}/`, function(err) {
            if (err) {
              console.log(`Error: ${err}`);
              return;
            }
            console.log(`New language file updated: "${poFileName}"`);
          });
        } else {
          console.log(`"${poFileName}" already exists`);
        }
      } else if (step === 'translate') {
        listOfFilesInI18nFolder = [];
        if (!fs.existsSync(pathToI18nFolder)) {
          fs.mkdirSync(pathToI18nFolder);
        }
        fs.readdirSync(pathToI18nFolder).forEach(fileName => {
          listOfFilesInI18nFolder.push(fileName);
        });
        if (listOfFilesInI18nFolder.indexOf(`${language}.po`) >= 0) {
          po.load(`${poFileName}`, function(po) {
            translate(po.items, language, function(err, translations) {
              if (err) return console.log(`Error: "${err}"`);

              po.items.forEach(function(item, index) {
                if (translations[index])
                  item.msgstr = translations[index].TranslatedText;
              });

              po.save(poFileName, function() {
                console.log(`New language file translated: "${poFileName}"`);
              });
            });
          });
        } else {
          console.log(
            `"${poFileName}" does not exist. Run "init" to create po file`
          );
        }
      } else if (step === 'update') {
        exec(`npx ttag update ${poFileName} ${baseFolder}/`, function(err) {
          if (err) {
            console.log(`Error: ${err}`);
            return;
          }
        });
        exec(`npx ttag po2json ${poFileName} > ${poFileName}.json`, function(
          err
        ) {
          if (err) {
            console.log(`Error: ${err}`);
            return;
          }
          console.log(`${poFileName}.json updated`);
        });
      }
    }
  });
}
