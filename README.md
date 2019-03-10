# TTAG i18n Demo

*Demo of using ttag and AWS Translate to handle internationalisation of text in a React project*

## Setup 

In the *i18nConfig.json* in the project directory modify the array of *languageCodes* you wish to translate to <br>
In the *awsConfig.json* add the missing credentials 

## Available Scripts

In the project directory, you can run:

#### `npm install` 
This will install all dependencies to run the demo

#### `npm run i18n:init` 
This will bootstrap the project and create the i18n folder and locale.po files that were configured in the *i18nConfig.json* file

#### `npm run i18n:update` 
This will convert the *locale.po* files into *locale.po.json* format that *ttag* will use in the app

If you wish to use human beings to translate the *locale.po* files you simply need to run `npm run i18n:update` once all the *locale.po* files have been translated. **However** if you want to be a maverick and trust the power of Machine Learning then you can also let a machine translate the files for you by running `npm run i18n:translate`.

#### `npm run i18n:translate` 
This will get Amazon AWS Translation API to automatically translate the *locale.po* files. You can then run `npm run i18n:update` to update the *locale.po.json*


Note: As this project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) you can also run the following:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

