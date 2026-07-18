(function(){
"use strict";
var KEY="shaye_announcements";
function load(){try{var x=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(x)?x:[]}catch(e){return[]}}
function esc(s){return String(s||"").replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"})[c]})}
function active(a,now){if(!a||a.active===false)return false;if(a.startAt&&new Date(a.startAt).getTime()>now)return false;if(a.endAt&&new Date(a.endAt).getTime()<now)return false;return !!(a.text||a.image)}
function show(){var now=Date.now(),items=load().filter(function(a){return active(a,now)}).sort(function(a,b){return Number(b.priority||0)-Number(a.priority||0)||String(b.createdAt||"").localeCompare(String(a.createdAt||""))});if(!items.length)return;var index=0;
function render(){var a=items[index],old=document.getElementById("shayeAnnouncementOverlay");if(old)old.remove();var overlay=document.createElement("div");overlay.id="shayeAnnouncementOverlay";overlay.className="shaye-announcement-overlay";var html='<div class="shaye-announcement-card"><button type="button" class="shaye-announcement-close" aria-label="بستن">×</button>';
if(a.title)html+='<div class="shaye-announcement-title">'+esc(a.title)+'</div>';
if(a.image)html+='<img class="shaye-announcement-image" src="'+esc(a.image)+'" alt="پیام مدیریت">';
if(a.text)html+='<div class="shaye-announcement-text">'+esc(a.text)+'</div>';
if(a.actionText&&a.actionUrl)html+='<a class="shaye-announcement-action" href="'+esc(a.actionUrl)+'" target="_blank" rel="noopener">'+esc(a.actionText)+'</a>';
if(items.length>1)html+='<div class="shaye-announcement-count">پیام '+(index+1)+' از '+items.length+'</div>';
html+='</div>';overlay.innerHTML=html;document.body.appendChild(overlay);overlay.querySelector(".shaye-announcement-close").onclick=function(){index++;if(index<items.length)render();else overlay.remove()};}
render()}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",show);else show();
window.ShayeAnnouncements={load:load,show:show};
})();