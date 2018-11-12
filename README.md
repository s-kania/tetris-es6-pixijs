# Tetris

Tetris written in Javascript/ES6 using **[Pixi.js](http://www.pixijs.com/)** and OOP practices.

## Setup

Clone the repository:

```bash
git clone https://github.com/rybeusz/tetris-es6-pixijs.git
```

Install the (dev)dependencies:

```bash
npm install
```

## Development

Start the development server (with hot reloading enabled):

```bash
npm start
```

After the initial build, navigate to **[localhost:8080](http://localhost:8080)**.

*(Any changes you make to the source code files will automatically trigger a
rebuild and reload the page.)*

## Building

To build the application and optimise for production:

```bash
npm run build
```

This will copy all build artifacts to the `dist/` folder.

*(You may run into CORS errors when trying to open the `dist/index.html` file
directly. Make sure to serve this folder using a file server instead, or wrap
everything inside another framework of your choice for distribution.)*
