# Dossier
Dossier is an application that allows you to store your favorite media, your featured news...
It will allow you to store and organize them in labels.

It also implements a “recent” tab that will show you the latest breaking news.

Finally, it implements a couple of artificial intelligence models that will analyze texts (in English or Spanish) to detect if it is fake news.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Dossier from its package json.
The app uses react, and the framework Vite, a fast frontend build tool
You must run npm install on thre places, the main project under the directory /Dossier , under the directory /Dossier/servidor and on /Dossier/dossier-extension
```bash
npm install
```
So, you can see that the app includes two node projects. A web app to manage news a see the results of the tests and a server to connect the app to the ai api and to scrap the articles 

## Configure Firebase on the main App

To do this, you must go to Dossier/src/utils/firebase.js and paste the configuration of the Firebase control panel on the firebaseConfig object

## Configure Mistral

Mistral is the truly free AI used on this project, To configure it you must

1. Obtain your API key on their [webpage](https://docs.mistral.ai/)

2. Paste it on the file "server.js" , replace YOUR_MISTRAl_KEY with your key

## Configure Firebase on Server

You must obtain your credentials on your project control panel. Then go to project settings/Service Accounts and generate API key.

Paste the content of that file inside serviceAccountKey

Plus, you need and OAuth Client id, follow [this](https://www.plasmo.com/blog/posts/firebase-chrome-extension) tutorial to obtain one

By defauld, the app wuill run on  http://localhost:5173/ 
To try the app you can create and register a new user from the register page

And the server will run on http://localhost:3000

## Extension

For the extension you must create a file .env.development inside /Dossier/extension/dossier-extension. You must fill it with the data, following [this guide](https://www.plasmo.com/blog/posts/firebase-chrome-extension)

## Usage
Inside /Dossier
```terminal
npm run dev

# If you want to run the tests

npm run test

```


Inside /Dossier/Servidor
```terminal
node .\server.js

# If you want to run the tests

npm run test
```

- miguelgg1412@outlook.es
- 1234Mgg*

And, to build the extensión, for the first time, you must run 
```terminal
 pnpm run dev
```
inside  /Dossier/extension/dossier-extension. It will generate a folder with the name "build". Inside it you can find the extension to import to chromium based browser

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
