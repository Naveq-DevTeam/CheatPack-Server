/**
 * Testportal time cheat script. Mechanics written by Lummit (https://github.com/Lumm1t), comments by Naveq (https://github.com/Naveq)
 * IT IS VERY EXPERIMENTAL! USE IT AT YOUR OWN RISK!!!
 * @author Lummit
 * @version 2.4
 */

const antiTestportalTimeScript = document.createElement("script"); // Create script element for cheat
const setInterv = setInterval;
const timeBypass = document.createTextNode(`
    // If time has elapsed, don't do anything.
    onCountdownFinished = () => {};
    // Patent-pending method to clear all intervals in the V8
    for (var i = 0; i < 99999; i++) {
        clearInterval(i);
    }
    // Don't allow any script to create more intervals
    setInterval = function setInterval(a,b) {void("[native code]"); return Math.floor(Math.random() * 65535);};
    // keep a preserved function only for this script and redefine the interval in the focus script
    setInterv(function () {
        window.onblur = null;
        window.onfocus = null;
    },100);
`);

antiTestportalTimeScript.appendChild(timeBypass);
antiTestportalTimeScript.type = "text/javascript"; // Set MIME type for script element
document.body.appendChild(antiTestportalTimeScript);
