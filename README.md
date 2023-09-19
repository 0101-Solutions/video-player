# Udemy Clone

## Requirements

For development, you will only need Node.js installed on your environement.
And please use the appropriate [Editorconfig](http://editorconfig.org/) plugin for your Editor (Mandatory).

### Node

[Node](http://nodejs.org/) is really easy to install & now include [NPM](https://npmjs.org/).
You should be able to run the following command after the installation procedure
below.

    $ node --version
    v16.16.0

    $ npm --version
    9.2.0

#### Node installation on OS X

You will need to use a Terminal. On OS X, you can find the default terminal in
`/Applications/Utilities/Terminal.app`.

Please install [Homebrew](http://brew.sh/) if it's not already done with the following command.

    $ ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"

If everything when fine, you should run

    brew install node

#### Node installation on Linux

    sudo apt-get install python-software-properties
    sudo add-apt-repository ppa:chris-lea/node.js
    sudo apt-get update
    sudo apt-get install nodejs

#### Node installation on Windows

Just go on [official Node.js website](http://nodejs.org/) & grab the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it.

---

## Install

    $ git clone https://github.com/0101-Solutions/ggghs-sms-frontend.git
    $ cd ggghs-sms-frontend
    $ npm install

### Configure app

Ensure the backend is running and edit the configs on how to start in production and development.

## Start & watch

    $ npm run dev

## Preview build & build for production

    $ npm run preview
    $ npm run build

## Update sources

Some packages usages might change so you should run `npm prune` & `npm install` often.
A common way to update is by doing

    $ git pull
    $ npm prune
    $ npm install

To run those 3 commands you can just do

    $ npm run pull

**Note:** Unix user can just link the `git-hooks/post-merge`:

### `post-merge` (≃ `npm install`)

This hook will `npm prune && npm install` each time you `git pull` something if the `package.json` has been modified.

## Frameworks & tools

- [Vite](https://vitejs.dev/) - A build tool that aims to provide a faster and leaner development experience for modern web projects.

- [React](http://reactjs.org/) - A JavaScript library for building user interfaces.


- [Axios](https://axios-http.com/) - A promise based HTTP client for the browser and Node.js.

- [React-Redux](https://react-redux.js.org/) - The Official React bindings for Redux.

- [React-Router-Dom](https://reactrouter.com/en/main) - React Router enables "client side routing".

- [Redux-Devtools-Extension](https://github.com/reduxjs/redux-devtools/tree/main/extension/) - The extension is a suite of tools which give you absolute control over your Redux store - it allows you to inspect and replay actions, explore your state at different times, dispatch actions directly to the store, and much more.

- [Redux-Thunk](https://github.com/reduxjs/redux-thunk/) - Thunk middleware for Redux. It allows writing functions with logic inside that can interact with a Redux store's dispatch and getState methods.

### CSS

- [Bootstrap](https://getbootstrap.com/) - A Powerful, extensible, and feature-packed frontend toolkit.

- [React-Bootstrap](https://react-bootstrap.github.io/) - It  replaces the Bootstrap JavaScript.

### Static server with Livereload

The app embed for development a static connect server with livereload plugged.
So each time you start the app, you get automatic refresh in the browser whenever you update a file.

Refer to the terminal after starting your app.