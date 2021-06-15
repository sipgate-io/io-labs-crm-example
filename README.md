# A simple CRM application that displays contact information and provides voicemail transcriptions

In this example project, we will implement a simple CRM application as a [React app](https://reactjs.org/) by using the [sipgate.io](https://github.com/sipgate-io/sipgateio-node) library.
We use a local JSON file to simulate the contacts database. Furthermore, we use [Vosk](https://alphacephei.com/vosk/) and [FFmpeg](https://www.ffmpeg.org/) to create voicemail transcriptions.

## What is sipgate.io?

[sipgate.io](https://www.sipgate.io/) is a collection of APIs, which enables sipgate's customers to build flexible integrations matching their individual needs.
Among other things, it provides interfaces for sending and receiving text messages or faxes, monitoring the call history, as well as initiating and manipulating calls.
In this tutorial, we will implement a simple Customer Relationship Management (CRM) software that utilizes sipgate.io's REST and Push APIs.

## In this example

The script in this repository creates a local server, which listens to incoming calls.
If contacts.json contains the caller number, we display the name and the number.

To achieve this we use our sipgate.io node-library in combination with [Socket.io](https://socket.io/) and a React Application.

**Prerequisite:**

-   [npm](https://www.npmjs.com/)
-   [node.js](https://nodejs.org/en/)
-   [FFmpeg](https://www.ffmpeg.org/)

## Getting started

To be able to launch this example, navigate to a directory where you want the example service to be stored. In a terminal, you can clone this repository from GitHub and install all required dependencies using `npm install`. (If you want to run it in production, use `npm install --only=production` to ignore dev dependencies.)

Please provide a `contacts.json` file in the root directory, for example, look at `contacts.example.json`.

```bash
git clone https://github.com/sipgate-io/io-labs-display-incoming-calls
cd io-labs-display-incoming-calls
npm install
```

### Download a Vosk language model

First, you need a speech recognition model for your language. You can download a pre-trained model from the [Vosk project page](https://alphacephei.com/vosk/models).
In this example, we will make use of the smallest pre-trained model for the german language.  
If you want to achieve higher accuracy in your parses you can make use of the larger models provided on the Vosk model page.

After completing the download, extract the contents of the archive into the folder `model` inside of your project root folder.

```bash
wget https://alphacephei.com/vosk/models/vosk-model-small-de-0.15.zip
unzip ./vosk-model-small-de-0.15.zip
mv vosk-model-small-de-0.15 ./model
```

### Enter your settings into the _.env_ dotfile

To interact with the sipgate.io API, you will need a personal access token that has the `history:read` scope. You can create a token in your [personal access token settings](https://app.sipgate.com/personal-access-token).

Add your personal access token and your mail sender and recipient to _.env_.

```bash
SIPGATE_TOKEN_ID='{token id}'
SIPGATE_TOKEN='{token}'
MAIL_FROM='"sipgate CRM" <noreply@example.org>'
MAIL_TO='{recipient of your mail}' # you can provide multiple recipients separated by commas
```

It is necessary to connect our local server to the internet.
To do this, you can use [localhost.run](https://localhost.run/).  
Fill in the environment variables in a _.env_ file with the given URL and add your port.
Add the incoming URL in your [sipgate account settings](https://console.sipgate.com/webhooks/urls).

```bash
npm run server
npm start
```

Finally, add your localhost.run address to your `SIPGATE_WEBHOOK_SERVER_ADDRESS` variable in your _.env_ file.

You should now be able to call your sipgate phone number and see the results on the [screen](https://localhost:3000).
