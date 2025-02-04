# Dossier
Dossier is an application that allows you to store your favorite media, your featured news...
It will allow you to store and organize them in labels.

It also implements a “recent” tab that will show you the latest breaking news.

Finally, it implements a couple of artificial intelligence models that will analyze texts (in English or Spanish) to detect if it is fake news.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Dossier from its package json.
The app uses react, and the framework Vite, a fast frontend build tool
You must run npm install on two places, the main project under the directory /Dossier and under the directory /Dossier/servidor 
```bash
npm run build
```
So, you can see that the app includes two node projects. A web app to manage news a see the results of the tests and a server to connect the app to the ai api and to scrap the articles 

## Configure Mistral

Mistral is the truly free AI used on this project, To configure it you must

1. Obtain your API key on their [webpage](https://docs.mistral.ai/)

2. Paste it on the file "server.js" , replace YOUR_MISTRAl_KEY with your key

## Configure Firebase on Server

You must obtain your credentials on your project control panel. Then go to project settings/Service Accounts and generate API key.

Paste the content of that file inside serviceAccountKey

By defauld, the app wuill run on  http://localhost:5173/ 
To try the app you can use the following user:

- miguelgg1412@outlook.es
- 1234Mgg*

And the server will run on http://localhost:3000

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

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
