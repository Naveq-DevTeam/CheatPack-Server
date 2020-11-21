const inject = document.createElement("script"); // Create anti-testportal script
const anti_blurspy = document.createTextNode(`
   // generate random function hashes to prevent TP from seeing there are exotic functions inside
    function generateRandomHash() {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        var length = 20 - Math.floor(Math.random() * 10);
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    var originalToString = "";
    var fxProtName = "";

    // make sure the randomly generated hashes don't overwrite any other native methods
    while (Function.prototype.hasOwnProperty(originalToString = generateRandomHash())) {};
    while (Function.prototype.hasOwnProperty(fxProtName = generateRandomHash())) {};

    // spoof Function.prototype.toString() so we can just include void("[native code]") when overwriting a native function, to still return a native code object
    eval(\`Function.prototype["\` + originalToString + \`"] = Function.prototype.toString;
    Function.prototype["\` + fxProtName + \`"] = function() {
        return arguments.callee.name;
    }
    Function.prototype.toString = function () {
        if (this["\` + originalToString + \`"]().includes("[native code]")) {
            return "function " + this["\` + fxProtName + \`"]() + "() { [native code] }"
        }
        return this["\` + originalToString + \`"]();
    }\`)

    // spoof string.includes so when it is tested for native code crap, it will return a false positive
    // TP actually doesn't use this but a good futureproof method
    eval(\`String.prototype["\` + originalToString + \`"] = String.prototype.includes;
    String.prototype.includes = function (a, b) {
        if (this["\` + originalToString + \`"]("native code") && this["\` + originalToString + \`"]("function")) {
            return true;
        }
        return this["\` + originalToString + \`"](a, b);
    }\`)

    // spoof regexp.test the same way as we did with string.include
    // TP actually uses this to test if we overwrote a native method
    eval(\`var o = RegExp.prototype.test;
    RegExp.prototype["\` + originalToString + \`"] = RegExp.prototype.toString;
    RegExp.prototype.toString = Function.prototype.toString;
    RegExp.prototype.test = function (s) {
        if (this["\` + originalToString + \`"]().includes("native code") && this["\` + originalToString + \`"]().includes("function")) {
            return true;
        }
        return o.call(this, s);
    }\`)

    // make the system think you're actually in the test page
    document.hasFocus = function() {
        void("[native code]");
        return true;
    }
    // block adding event listeners that can potentially see if you exit the window
    // futureproof method
    dadv = document.addEventListener;
    document.addEventListener = function(a, b, c) {
        void("[native code]");
        if (!(a == "blur" || a == "focus")) {
            return dadv(a, b, c);
        }
        return true;
    }
    // erase onblur/onfocus methods, same principle as blocking adding event listeners
    // futureproof method
    setInterval(()=>{
        window.onblur = null;
        window.onfocus = null;
    }, 100);
`);
inject.appendChild(anti_blurspy);
inject.type = "text/javascript"; 
document.body.appendChild(inject);
