# [Queen's Brothel](https://queensbrothel.com/) Mod Tools
A repository to help create mods for Queen's Brothel.

There are tips at the bottom of the `public/js/mod.js` file.

## Getting Started
Install Node: [node.js](https://nodejs.org/en/)

Run this command in the terminal to install all the necessary packages

`npm install`

Run this command in the terminal to start the local server!

`npm start`

Navigate to the [web server](http://localhost:3000) in your browser:

`http://localhost:3000`

Open the mod.js file and start writing your code!

`public/js/mod.js`

## Building Your Mod
Once you're done programming your mod, edit the config.json file in:

`build/config.json`

**The id field in config.json must be exactly the same as your mod id in `js/mod.js`**
```Javascript
// config.json
{
    {
      "id": "MyMod",
      "name": "My Mod",
      "description": "This is my mod.",
      "version": "1.0",
      "compatible": "0.8.2",
      "script": "mod.js"
    }
}

// js/mod.js
let mod = new Mod("MyMod");
```

Run this command to build your mod into a .zip file:

`npm run build`

The output will be in the "dist" folder.