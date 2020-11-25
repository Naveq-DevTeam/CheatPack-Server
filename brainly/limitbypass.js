/**
 * Brainly homework answers view limit bypass by Naveq (https://github.com/Naveq)
 * @author Naveq
 */

try {
    // This one is a good first attempt 
    localStorage.clear();
} catch(e) {
    // means that the webpage already added a protective proxy on localStorage
    function getAlternateLocalStorage() {
        var ifrm = document.createElement("iframe");
        ifrm.setAttribute("src", "https://brainly.pl");
        document.body.appendChild(ifrm);
        return ifrm;
    }
    var i = getAlternateLocalStorage();
    i.contentWindow.localStorage.clear();
    document.body.removeChild(i);
}
document.getElementsByClassName('js-page-wrapper')[0].click();
