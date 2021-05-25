# Display contact information for incoming calls

In this example project, we will display contact information for incoming calls in a [React app](https://reactjs.org/) by using the [sipgate.io](https://github.com/sipgate-io/sipgateio-node) library.
We use a local JSON file to simulate the contacts database.

## What is sipgate.io?

[sipgate.io](https://www.sipgate.io/) is a collection of APIs, which enables sipgate's customers to build flexible integrations matching their individual needs.
Among other things, it provides interfaces for sending and receiving text messages or faxes, monitoring the call history, as well as initiating and manipulating calls.
In this tutorial, we will use sipgate.io's contact API to import contacts from your company's Microsoft Outlook address book.

## In this example

The script in this repository creates a local server, which listens to incoming calls.
If contacts.json contains the caller number, we display the name and the number.

To achieve this we use our sipgate.io node-library in combination with [Socket.io](https://socket.io/) and a React Application.


**Prerequisite:** 
- [npm](https://www.npmjs.com/)
- [node.js](https://nodejs.org/en/)
- [socket.io](https://www.npmjs.com/package/socket.io)
- [socket.io-client](https://www.npmjs.com/package/socket.io-client)
- [react-application-install](https://reactjs.org/docs/create-a-new-react-app.html)

## Getting started

To be able to launch this example, navigate to a directory where you want the example service to be stored. In a terminal, you can clone this repository from GitHub and install all required dependencies using `npm install`. (If you want to run it in production, use `npm install --only=production` to ignore dev dependecies.)

```bash
git clone https://github.com/sipgate-io/io-labs-display-incoming-calls
cd io-labs-display-incoming-calls
npm install
```

It is necessary to connect our local server to the internet.
To do this, you can use [localhost.run](https://localhost.run/). 
Fill in the environment variables in a `.env` file with the given url and add your port. 
Add the incoming url in your [sipgate account settings](https://console.sipgate.com/webhooks/urls).

```bash
npm run server
npm start
```

You should now be able to call your sipgate phone number and see the results on the [screen](https://localhost:3000).

