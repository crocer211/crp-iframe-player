var HTML = document.documentElement.innerHTML;

//function that gets something inside the html.
function catchString(str, first_character, last_character) {
if(str.match(first_character + "(.*)" + last_character) == null){
return null;
}else{
new_str = str.match(first_character + "(.*)" + last_character)[1].trim()
return(new_str)
    }
}
//function that changes the player to a simpler one.
function importPlayer(){
console.log("[CR Premium] Removing player from Crunchyroll...");
var elem = document.getElementById('showmedia_video_player');
    elem.parentNode.removeChild(elem);

console.log("[CR Premium] Getting data from the stream...");
var video_config_media = JSON.parse(getString(HTML, "vilos.config.media = ", ";"));

    console.log("[CR Premium] Adding jwplayer...");
    ifrm = document.createElement("iframe");
    ifrm.setAttribute("id", "frame");
ifrm.setAttribute("src", "https://crocer211.github.io/crp-iframe-player/");
ifrm.setAttribute("width","100%");
ifrm.setAttribute("height","100%");
ifrm.setAttribute("frameborder","0");
ifrm.setAttribute("scrolling","no");
ifrm.setAttribute("allowfullscreen","allowfullscreen");
ifrm.setAttribute("allow","autoplay; encrypted-media *");

if(document.body.querySelector("#showmedia_video_box") != null){
document.body.querySelector("#showmedia_video_box").appendChild(ifrm);
}else{
document.body.querySelector("#showmedia_video_box_wide").appendChild(ifrm);
}

//Remove Top Note About Trying Premium
if (document.body.querySelector(".freetrial-note") != null) {
console.log("[CR Premium] Removing Free Trial Note...");
document.body.querySelector(".freetrial-note").style.display = "none";
}

//Remove warnings that the video nn can be seen
if(document.body.querySelector(".showmedia-trailer-notice") != null){
console.log("[CR Premium] Removing Trailer Notice...");
document.body.querySelector(".showmedia-trailer-notice").style.display = "none";
}

//Remove suggestion to sign up for free trial
if(document.body.querySelector("#showmedia_free_trial_signup") != null){
console.log("[CR Premium] Removing Free Trial Signup...");
document.body.querySelector("#showmedia_free_trial_signup").style.display = "none";
}

        // Simulate user interaction to bring it to fullscreen automatically
var element = document.getElementById("template_scroller");
if (element) element.click();
        
const series = document.querySelector('meta[property="og:title"]');
const up_next = document.querySelector('link[rel=next]');
chrome.storage.sync.get(['follow', 'cooldown'], function(items) {
ifrm.onload = function(){
ifrm.contentWindow.postMessage({
           'video_config_media': [JSON.stringify(video_config_media)],
'lang': [getString(HTML, 'LOCALE = "', '",')],
'series': series ? series.content : undefined,
'up_next': up_next ? up_next.href : undefined,
'up_next_cooldown': items.cooldown === undefined ? 5: items.cooldown,
'up_next_enable': items.next === undefined ? true : items.then,
'version': "1.0.3"
        },"*");
};
});

//console.log(video_config_media);
}
//function when loading page.
function loadfunction() {
if(getString(HTML, "vilos.config.media = ", ";") != null){
importPlayer();
}
}
document.addEventListener("DOMContentLoaded", onloadfunction());
