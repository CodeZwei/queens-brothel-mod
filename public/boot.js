/**
 * Don't touch anything in this file !!
 */
let VERSION = "";
let serverLocation = "https://assets.queensbrothel.com/";
let gameDebugging = false;
let serverAssets = true;
const isLocal = false;
let givenTo = "mod"

const Http = new XMLHttpRequest();
Http.open("GET", 'https://queensbrothel.com/api');
Http.send();

Http.onreadystatechange = (e) => {
    if (Http.readyState === 4 && Http.status === 200) {
        if (Http.responseText) {
            let api = JSON.parse(Http.responseText);
            VERSION = api.versionFree;
            serverLocation = serverLocation + VERSION + "-" + api.latestDIR + "/";
            let a = document.createElement('script');
            a.onload = function () {
                let b = document.createElement('script');
                b.src = "/js/mod.js";
                document.head.appendChild(b);
            };
            a.src = serverLocation + "js/game.min.js";
            document.head.appendChild(a);
        }
    }
};