// Some beautiful changes ;)
const logo = Array.from(
    document.querySelectorAll("img.logo_wide.logo_default")
)[0];
logo.src = "https://cdn.jsdelivr.net/gh/Naveq-DevTeam/CheatPack-Server/testportal/testportal.png";

// We're blocking sending errors to the server. Fuck testportal ¯\_(ツ)_/¯
const antiLogScript = document.createElement("script");
const logOverride = document.createTextNode(`
          function logToServer() {
              console.log('Fuck testportal ツ');
          };
          `);
antiLogScript.appendChild(logOverride);
antiLogScript.type = "text/javascript";

// Don't allow the site to block copy/cut/paste
const forceCCCP = document.createElement("script");
const forceCCCPSource = document.createTextNode(`
  var forceBrowserDefault = function (e) {
      e.stopImmediatePropagation();
      return true;
  }
  
  document.addEventListener("copy", forceBrowserDefault, true);
  document.addEventListener("cut", forceBrowserDefault, true);
  document.addEventListener("paste", forceBrowserDefault, true);
  
  var stylesheet = \`
      * {
          user-select: text !important;
      }
  \`
  window.document.styleSheets[0].insertRule(stylesheet, 0);
  
  var oCopy = copy;
  copy = function() {
      void("[native code]");
      return undefined;
  }
  `);
forceCCCP.appendChild(forceCCCPSource);
forceCCCP.type = "text/javascript";

// Don't allow the site to block opening devtools. Yes you can go in settings > more tools > tools for developers but it's nice to be able to use F12 all time
const forceDevtoolsDefault = document.createElement("script");
const forceDevtoolsDefaultSource = document.createTextNode(`
  document.addEventListener("keydown", function(e) {
    // Event.stopImmediatePropagation stops executing any other event listeners, thus forcing a browser default
    if (e.keyCode == 123) e.stopImmediatePropagation();
  })
`)
forceDevtoolsDefault.appendChild(forceDevtoolsDefaultSource);
forceDevtoolsDefault.type = "text/javascript"

// Re-enable rightclick
const forceRCDefault = document.createElement("script");
const forceRCSource = document.createTextNode(`
  document.addEventListener("contextmenu", function(e) {
    e.stopImmediatePropagation();
    return true;
  })
`)
forceRCDefault.appendChild(forceRCSource);
forceRCDefault.type = "text/javascript";

document.body.appendChild(antiLogScript);
document.body.appendChild(forceCCCP);
document.body.appendChild(forceDevtoolsDefault);
document.body.appendChild(forceRCDefault);
