# Dossier
Dossier is an application that allows you to store your favorite media, your featured news...
It will allow you to store and organize them in labels.

It also implements a “recent” tab that will show you the latest breaking news.

Finally, it implements a couple of artificial intelligence models that will analyze texts (in English or Spanish) to detect if it is fake news.

## Installation

Use the package manager [npm](https://pip.pypa.io/en/stable/) to install Dossier from its package json.
The app uses react, and the framework Vite, a fast frontend build tool 
```bash
npm run build
```

## Configure OpenAI

Permanent setup: To make the setup permanent, add the variable through the system properties as follows:

1. Right-click on 'This PC' or 'My Computer' and select 'Properties'.
2. Click on 'Advanced system settings'.
3. Click the 'Environment Variables' button.
4. In the 'System variables' section, click 'New...' and enter OPENAI_API_KEY as the variable name and your API key as the variable value.

## Usage

```terminal
npm run dev

# If you want to run the tests

npm run test

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.
