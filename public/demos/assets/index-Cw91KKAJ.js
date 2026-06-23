var Ia=Object.defineProperty;var Fa=(i,t,e)=>t in i?Ia(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var _=(i,t,e)=>Fa(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function e(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=e(n);fetch(n.href,o)}})();/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function Ie(i){return i+.5|0}const Rt=(i,t,e)=>Math.max(Math.min(i,e),t);function xe(i){return Rt(Ie(i*2.55),0,255)}function Lt(i){return Rt(Ie(i*255),0,255)}function St(i){return Rt(Ie(i/2.55)/100,0,1)}function Es(i){return Rt(Ie(i*100),0,100)}const gt={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},Ji=[..."0123456789ABCDEF"],ja=i=>Ji[i&15],Ba=i=>Ji[(i&240)>>4]+Ji[i&15],Ve=i=>(i&240)>>4===(i&15),Va=i=>Ve(i.r)&&Ve(i.g)&&Ve(i.b)&&Ve(i.a);function Na(i){var t=i.length,e;return i[0]==="#"&&(t===4||t===5?e={r:255&gt[i[1]]*17,g:255&gt[i[2]]*17,b:255&gt[i[3]]*17,a:t===5?gt[i[4]]*17:255}:(t===7||t===9)&&(e={r:gt[i[1]]<<4|gt[i[2]],g:gt[i[3]]<<4|gt[i[4]],b:gt[i[5]]<<4|gt[i[6]],a:t===9?gt[i[7]]<<4|gt[i[8]]:255})),e}const Ha=(i,t)=>i<255?t(i):"";function Wa(i){var t=Va(i)?ja:Ba;return i?"#"+t(i.r)+t(i.g)+t(i.b)+Ha(i.a,t):void 0}const Ga=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Co(i,t,e){const s=t*Math.min(e,1-e),n=(o,a=(o+i/30)%12)=>e-s*Math.max(Math.min(a-3,9-a,1),-1);return[n(0),n(8),n(4)]}function Ya(i,t,e){const s=(n,o=(n+i/60)%6)=>e-e*t*Math.max(Math.min(o,4-o,1),0);return[s(5),s(3),s(1)]}function Ua(i,t,e){const s=Co(i,1,.5);let n;for(t+e>1&&(n=1/(t+e),t*=n,e*=n),n=0;n<3;n++)s[n]*=1-t-e,s[n]+=t;return s}function Xa(i,t,e,s,n){return i===n?(t-e)/s+(t<e?6:0):t===n?(e-i)/s+2:(i-t)/s+4}function gs(i){const e=i.r/255,s=i.g/255,n=i.b/255,o=Math.max(e,s,n),a=Math.min(e,s,n),r=(o+a)/2;let l,c,d;return o!==a&&(d=o-a,c=r>.5?d/(2-o-a):d/(o+a),l=Xa(e,s,n,d,o),l=l*60+.5),[l|0,c||0,r]}function fs(i,t,e,s){return(Array.isArray(t)?i(t[0],t[1],t[2]):i(t,e,s)).map(Lt)}function bs(i,t,e){return fs(Co,i,t,e)}function qa(i,t,e){return fs(Ua,i,t,e)}function Ka(i,t,e){return fs(Ya,i,t,e)}function zo(i){return(i%360+360)%360}function Ja(i){const t=Ga.exec(i);let e=255,s;if(!t)return;t[5]!==s&&(e=t[6]?xe(+t[5]):Lt(+t[5]));const n=zo(+t[2]),o=+t[3]/100,a=+t[4]/100;return t[1]==="hwb"?s=qa(n,o,a):t[1]==="hsv"?s=Ka(n,o,a):s=bs(n,o,a),{r:s[0],g:s[1],b:s[2],a:e}}function Za(i,t){var e=gs(i);e[0]=zo(e[0]+t),e=bs(e),i.r=e[0],i.g=e[1],i.b=e[2]}function Qa(i){if(!i)return;const t=gs(i),e=t[0],s=Es(t[1]),n=Es(t[2]);return i.a<255?`hsla(${e}, ${s}%, ${n}%, ${St(i.a)})`:`hsl(${e}, ${s}%, ${n}%)`}const Ls={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Is={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function tr(){const i={},t=Object.keys(Is),e=Object.keys(Ls);let s,n,o,a,r;for(s=0;s<t.length;s++){for(a=r=t[s],n=0;n<e.length;n++)o=e[n],r=r.replace(o,Ls[o]);o=parseInt(Is[a],16),i[r]=[o>>16&255,o>>8&255,o&255]}return i}let Ne;function er(i){Ne||(Ne=tr(),Ne.transparent=[0,0,0,0]);const t=Ne[i.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const ir=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function sr(i){const t=ir.exec(i);let e=255,s,n,o;if(t){if(t[7]!==s){const a=+t[7];e=t[8]?xe(a):Rt(a*255,0,255)}return s=+t[1],n=+t[3],o=+t[5],s=255&(t[2]?xe(s):Rt(s,0,255)),n=255&(t[4]?xe(n):Rt(n,0,255)),o=255&(t[6]?xe(o):Rt(o,0,255)),{r:s,g:n,b:o,a:e}}}function nr(i){return i&&(i.a<255?`rgba(${i.r}, ${i.g}, ${i.b}, ${St(i.a)})`:`rgb(${i.r}, ${i.g}, ${i.b})`)}const Ai=i=>i<=.0031308?i*12.92:Math.pow(i,1/2.4)*1.055-.055,ne=i=>i<=.04045?i/12.92:Math.pow((i+.055)/1.055,2.4);function or(i,t,e){const s=ne(St(i.r)),n=ne(St(i.g)),o=ne(St(i.b));return{r:Lt(Ai(s+e*(ne(St(t.r))-s))),g:Lt(Ai(n+e*(ne(St(t.g))-n))),b:Lt(Ai(o+e*(ne(St(t.b))-o))),a:i.a+e*(t.a-i.a)}}function He(i,t,e){if(i){let s=gs(i);s[t]=Math.max(0,Math.min(s[t]+s[t]*e,t===0?360:1)),s=bs(s),i.r=s[0],i.g=s[1],i.b=s[2]}}function Po(i,t){return i&&Object.assign(t||{},i)}function Fs(i){var t={r:0,g:0,b:0,a:255};return Array.isArray(i)?i.length>=3&&(t={r:i[0],g:i[1],b:i[2],a:255},i.length>3&&(t.a=Lt(i[3]))):(t=Po(i,{r:0,g:0,b:0,a:1}),t.a=Lt(t.a)),t}function ar(i){return i.charAt(0)==="r"?sr(i):Ja(i)}class Pe{constructor(t){if(t instanceof Pe)return t;const e=typeof t;let s;e==="object"?s=Fs(t):e==="string"&&(s=Na(t)||er(t)||ar(t)),this._rgb=s,this._valid=!!s}get valid(){return this._valid}get rgb(){var t=Po(this._rgb);return t&&(t.a=St(t.a)),t}set rgb(t){this._rgb=Fs(t)}rgbString(){return this._valid?nr(this._rgb):void 0}hexString(){return this._valid?Wa(this._rgb):void 0}hslString(){return this._valid?Qa(this._rgb):void 0}mix(t,e){if(t){const s=this.rgb,n=t.rgb;let o;const a=e===o?.5:e,r=2*a-1,l=s.a-n.a,c=((r*l===-1?r:(r+l)/(1+r*l))+1)/2;o=1-c,s.r=255&c*s.r+o*n.r+.5,s.g=255&c*s.g+o*n.g+.5,s.b=255&c*s.b+o*n.b+.5,s.a=a*s.a+(1-a)*n.a,this.rgb=s}return this}interpolate(t,e){return t&&(this._rgb=or(this._rgb,t._rgb,e)),this}clone(){return new Pe(this.rgb)}alpha(t){return this._rgb.a=Lt(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=Ie(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return He(this._rgb,2,t),this}darken(t){return He(this._rgb,2,-t),this}saturate(t){return He(this._rgb,1,t),this}desaturate(t){return He(this._rgb,1,-t),this}rotate(t){return Za(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function kt(){}const rr=(()=>{let i=0;return()=>i++})();function E(i){return i==null}function G(i){if(Array.isArray&&Array.isArray(i))return!0;const t=Object.prototype.toString.call(i);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function L(i){return i!==null&&Object.prototype.toString.call(i)==="[object Object]"}function q(i){return(typeof i=="number"||i instanceof Number)&&isFinite(+i)}function ht(i,t){return q(i)?i:t}function D(i,t){return typeof i>"u"?t:i}const lr=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100:+i/t,Ao=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100*t:+i;function N(i,t,e){if(i&&typeof i.call=="function")return i.apply(e,t)}function B(i,t,e,s){let n,o,a;if(G(i))for(o=i.length,n=0;n<o;n++)t.call(e,i[n],n);else if(L(i))for(a=Object.keys(i),o=a.length,n=0;n<o;n++)t.call(e,i[a[n]],a[n])}function ci(i,t){let e,s,n,o;if(!i||!t||i.length!==t.length)return!1;for(e=0,s=i.length;e<s;++e)if(n=i[e],o=t[e],n.datasetIndex!==o.datasetIndex||n.index!==o.index)return!1;return!0}function di(i){if(G(i))return i.map(di);if(L(i)){const t=Object.create(null),e=Object.keys(i),s=e.length;let n=0;for(;n<s;++n)t[e[n]]=di(i[e[n]]);return t}return i}function Ro(i){return["__proto__","prototype","constructor"].indexOf(i)===-1}function cr(i,t,e,s){if(!Ro(i))return;const n=t[i],o=e[i];L(n)&&L(o)?Ae(n,o,s):t[i]=di(o)}function Ae(i,t,e){const s=G(t)?t:[t],n=s.length;if(!L(i))return i;e=e||{};const o=e.merger||cr;let a;for(let r=0;r<n;++r){if(a=s[r],!L(a))continue;const l=Object.keys(a);for(let c=0,d=l.length;c<d;++c)o(l[c],i,a,e)}return i}function $e(i,t){return Ae(i,t,{merger:dr})}function dr(i,t,e){if(!Ro(i))return;const s=t[i],n=e[i];L(s)&&L(n)?$e(s,n):Object.prototype.hasOwnProperty.call(t,i)||(t[i]=di(n))}const js={"":i=>i,x:i=>i.x,y:i=>i.y};function pr(i){const t=i.split("."),e=[];let s="";for(const n of t)s+=n,s.endsWith("\\")?s=s.slice(0,-1)+".":(e.push(s),s="");return e}function hr(i){const t=pr(i);return e=>{for(const s of t){if(s==="")break;e=e&&e[s]}return e}}function It(i,t){return(js[t]||(js[t]=hr(t)))(i)}function ms(i){return i.charAt(0).toUpperCase()+i.slice(1)}const Re=i=>typeof i<"u",Ft=i=>typeof i=="function",Bs=(i,t)=>{if(i.size!==t.size)return!1;for(const e of i)if(!t.has(e))return!1;return!0};function ur(i){return i.type==="mouseup"||i.type==="click"||i.type==="contextmenu"}const F=Math.PI,H=2*F,gr=H+F,pi=Number.POSITIVE_INFINITY,fr=F/180,J=F/2,Ht=F/4,Vs=F*2/3,Dt=Math.log10,_t=Math.sign;function Me(i,t,e){return Math.abs(i-t)<e}function Ns(i){const t=Math.round(i);i=Me(i,t,i/1e3)?t:i;const e=Math.pow(10,Math.floor(Dt(i))),s=i/e;return(s<=1?1:s<=2?2:s<=5?5:10)*e}function br(i){const t=[],e=Math.sqrt(i);let s;for(s=1;s<e;s++)i%s===0&&(t.push(s),t.push(i/s));return e===(e|0)&&t.push(e),t.sort((n,o)=>n-o).pop(),t}function mr(i){return typeof i=="symbol"||typeof i=="object"&&i!==null&&!(Symbol.toPrimitive in i||"toString"in i||"valueOf"in i)}function re(i){return!mr(i)&&!isNaN(parseFloat(i))&&isFinite(i)}function xr(i,t){const e=Math.round(i);return e-t<=i&&e+t>=i}function Do(i,t,e){let s,n,o;for(s=0,n=i.length;s<n;s++)o=i[s][e],isNaN(o)||(t.min=Math.min(t.min,o),t.max=Math.max(t.max,o))}function bt(i){return i*(F/180)}function xs(i){return i*(180/F)}function Hs(i){if(!q(i))return;let t=1,e=0;for(;Math.round(i*t)/t!==i;)t*=10,e++;return e}function To(i,t){const e=t.x-i.x,s=t.y-i.y,n=Math.sqrt(e*e+s*s);let o=Math.atan2(s,e);return o<-.5*F&&(o+=H),{angle:o,distance:n}}function Zi(i,t){return Math.sqrt(Math.pow(t.x-i.x,2)+Math.pow(t.y-i.y,2))}function vr(i,t){return(i-t+gr)%H-F}function ot(i){return(i%H+H)%H}function De(i,t,e,s){const n=ot(i),o=ot(t),a=ot(e),r=ot(o-n),l=ot(a-n),c=ot(n-o),d=ot(n-a);return n===o||n===a||s&&o===a||r>l&&c<d}function et(i,t,e){return Math.max(t,Math.min(e,i))}function yr(i){return et(i,-32768,32767)}function Ct(i,t,e,s=1e-6){return i>=Math.min(t,e)-s&&i<=Math.max(t,e)+s}function vs(i,t,e){e=e||(a=>i[a]<t);let s=i.length-1,n=0,o;for(;s-n>1;)o=n+s>>1,e(o)?n=o:s=o;return{lo:n,hi:s}}const zt=(i,t,e,s)=>vs(i,e,s?n=>{const o=i[n][t];return o<e||o===e&&i[n+1][t]===e}:n=>i[n][t]<e),wr=(i,t,e)=>vs(i,e,s=>i[s][t]>=e);function _r(i,t,e){let s=0,n=i.length;for(;s<n&&i[s]<t;)s++;for(;n>s&&i[n-1]>e;)n--;return s>0||n<i.length?i.slice(s,n):i}const Oo=["push","pop","shift","splice","unshift"];function kr(i,t){if(i._chartjs){i._chartjs.listeners.push(t);return}Object.defineProperty(i,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Oo.forEach(e=>{const s="_onData"+ms(e),n=i[e];Object.defineProperty(i,e,{configurable:!0,enumerable:!1,value(...o){const a=n.apply(this,o);return i._chartjs.listeners.forEach(r=>{typeof r[s]=="function"&&r[s](...o)}),a}})})}function Ws(i,t){const e=i._chartjs;if(!e)return;const s=e.listeners,n=s.indexOf(t);n!==-1&&s.splice(n,1),!(s.length>0)&&(Oo.forEach(o=>{delete i[o]}),delete i._chartjs)}function Eo(i){const t=new Set(i);return t.size===i.length?i:Array.from(t)}const Lo=function(){return typeof window>"u"?function(i){return i()}:window.requestAnimationFrame}();function Io(i,t){let e=[],s=!1;return function(...n){e=n,s||(s=!0,Lo.call(window,()=>{s=!1,i.apply(t,e)}))}}function $r(i,t){let e;return function(...s){return t?(clearTimeout(e),e=setTimeout(i,t,s)):i.apply(this,s),t}}const ys=i=>i==="start"?"left":i==="end"?"right":"center",nt=(i,t,e)=>i==="start"?t:i==="end"?e:(t+e)/2,Mr=(i,t,e,s)=>i===(s?"left":"right")?e:i==="center"?(t+e)/2:t;function Fo(i,t,e){const s=t.length;let n=0,o=s;if(i._sorted){const{iScale:a,vScale:r,_parsed:l}=i,c=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null,d=a.axis,{min:p,max:h,minDefined:u,maxDefined:g}=a.getUserBounds();if(u){if(n=Math.min(zt(l,d,p).lo,e?s:zt(t,d,a.getPixelForValue(p)).lo),c){const f=l.slice(0,n+1).reverse().findIndex(b=>!E(b[r.axis]));n-=Math.max(0,f)}n=et(n,0,s-1)}if(g){let f=Math.max(zt(l,a.axis,h,!0).hi+1,e?0:zt(t,d,a.getPixelForValue(h),!0).hi+1);if(c){const b=l.slice(f-1).findIndex(m=>!E(m[r.axis]));f+=Math.max(0,b)}o=et(f,n,s)-n}else o=s-n}return{start:n,count:o}}function jo(i){const{xScale:t,yScale:e,_scaleRanges:s}=i,n={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!s)return i._scaleRanges=n,!0;const o=s.xmin!==t.min||s.xmax!==t.max||s.ymin!==e.min||s.ymax!==e.max;return Object.assign(s,n),o}const We=i=>i===0||i===1,Gs=(i,t,e)=>-(Math.pow(2,10*(i-=1))*Math.sin((i-t)*H/e)),Ys=(i,t,e)=>Math.pow(2,-10*i)*Math.sin((i-t)*H/e)+1,Se={linear:i=>i,easeInQuad:i=>i*i,easeOutQuad:i=>-i*(i-2),easeInOutQuad:i=>(i/=.5)<1?.5*i*i:-.5*(--i*(i-2)-1),easeInCubic:i=>i*i*i,easeOutCubic:i=>(i-=1)*i*i+1,easeInOutCubic:i=>(i/=.5)<1?.5*i*i*i:.5*((i-=2)*i*i+2),easeInQuart:i=>i*i*i*i,easeOutQuart:i=>-((i-=1)*i*i*i-1),easeInOutQuart:i=>(i/=.5)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2),easeInQuint:i=>i*i*i*i*i,easeOutQuint:i=>(i-=1)*i*i*i*i+1,easeInOutQuint:i=>(i/=.5)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2),easeInSine:i=>-Math.cos(i*J)+1,easeOutSine:i=>Math.sin(i*J),easeInOutSine:i=>-.5*(Math.cos(F*i)-1),easeInExpo:i=>i===0?0:Math.pow(2,10*(i-1)),easeOutExpo:i=>i===1?1:-Math.pow(2,-10*i)+1,easeInOutExpo:i=>We(i)?i:i<.5?.5*Math.pow(2,10*(i*2-1)):.5*(-Math.pow(2,-10*(i*2-1))+2),easeInCirc:i=>i>=1?i:-(Math.sqrt(1-i*i)-1),easeOutCirc:i=>Math.sqrt(1-(i-=1)*i),easeInOutCirc:i=>(i/=.5)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1),easeInElastic:i=>We(i)?i:Gs(i,.075,.3),easeOutElastic:i=>We(i)?i:Ys(i,.075,.3),easeInOutElastic(i){return We(i)?i:i<.5?.5*Gs(i*2,.1125,.45):.5+.5*Ys(i*2-1,.1125,.45)},easeInBack(i){return i*i*((1.70158+1)*i-1.70158)},easeOutBack(i){return(i-=1)*i*((1.70158+1)*i+1.70158)+1},easeInOutBack(i){let t=1.70158;return(i/=.5)<1?.5*(i*i*(((t*=1.525)+1)*i-t)):.5*((i-=2)*i*(((t*=1.525)+1)*i+t)+2)},easeInBounce:i=>1-Se.easeOutBounce(1-i),easeOutBounce(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},easeInOutBounce:i=>i<.5?Se.easeInBounce(i*2)*.5:Se.easeOutBounce(i*2-1)*.5+.5};function ws(i){if(i&&typeof i=="object"){const t=i.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function Us(i){return ws(i)?i:new Pe(i)}function Ri(i){return ws(i)?i:new Pe(i).saturate(.5).darken(.1).hexString()}const Sr=["x","y","borderWidth","radius","tension"],Cr=["color","borderColor","backgroundColor"];function zr(i){i.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),i.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),i.set("animations",{colors:{type:"color",properties:Cr},numbers:{type:"number",properties:Sr}}),i.describe("animations",{_fallback:"animation"}),i.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function Pr(i){i.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const Xs=new Map;function Ar(i,t){t=t||{};const e=i+JSON.stringify(t);let s=Xs.get(e);return s||(s=new Intl.NumberFormat(i,t),Xs.set(e,s)),s}function Fe(i,t,e){return Ar(t,e).format(i)}const Bo={values(i){return G(i)?i:""+i},numeric(i,t,e){if(i===0)return"0";const s=this.chart.options.locale;let n,o=i;if(e.length>1){const c=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(c<1e-4||c>1e15)&&(n="scientific"),o=Rr(i,e)}const a=Dt(Math.abs(o)),r=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),l={notation:n,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(l,this.options.ticks.format),Fe(i,s,l)},logarithmic(i,t,e){if(i===0)return"0";const s=e[t].significand||i/Math.pow(10,Math.floor(Dt(i)));return[1,2,3,5,10,15].includes(s)||t>.8*e.length?Bo.numeric.call(this,i,t,e):""}};function Rr(i,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&i!==Math.floor(i)&&(e=i-Math.floor(i)),e}var xi={formatters:Bo};function Dr(i){i.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:xi.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),i.route("scale.ticks","color","","color"),i.route("scale.grid","color","","borderColor"),i.route("scale.border","color","","borderColor"),i.route("scale.title","color","","color"),i.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),i.describe("scales",{_fallback:"scale"}),i.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const Qt=Object.create(null),Qi=Object.create(null);function Ce(i,t){if(!t)return i;const e=t.split(".");for(let s=0,n=e.length;s<n;++s){const o=e[s];i=i[o]||(i[o]=Object.create(null))}return i}function Di(i,t,e){return typeof t=="string"?Ae(Ce(i,t),e):Ae(Ce(i,""),t)}class Tr{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=s=>s.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(s,n)=>Ri(n.backgroundColor),this.hoverBorderColor=(s,n)=>Ri(n.borderColor),this.hoverColor=(s,n)=>Ri(n.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Di(this,t,e)}get(t){return Ce(this,t)}describe(t,e){return Di(Qi,t,e)}override(t,e){return Di(Qt,t,e)}route(t,e,s,n){const o=Ce(this,t),a=Ce(this,s),r="_"+e;Object.defineProperties(o,{[r]:{value:o[e],writable:!0},[e]:{enumerable:!0,get(){const l=this[r],c=a[n];return L(l)?Object.assign({},c,l):D(l,c)},set(l){this[r]=l}}})}apply(t){t.forEach(e=>e(this))}}var Y=new Tr({_scriptable:i=>!i.startsWith("on"),_indexable:i=>i!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[zr,Pr,Dr]);function Or(i){return!i||E(i.size)||E(i.family)?null:(i.style?i.style+" ":"")+(i.weight?i.weight+" ":"")+i.size+"px "+i.family}function hi(i,t,e,s,n){let o=t[n];return o||(o=t[n]=i.measureText(n).width,e.push(n)),o>s&&(s=o),s}function Er(i,t,e,s){s=s||{};let n=s.data=s.data||{},o=s.garbageCollect=s.garbageCollect||[];s.font!==t&&(n=s.data={},o=s.garbageCollect=[],s.font=t),i.save(),i.font=t;let a=0;const r=e.length;let l,c,d,p,h;for(l=0;l<r;l++)if(p=e[l],p!=null&&!G(p))a=hi(i,n,o,a,p);else if(G(p))for(c=0,d=p.length;c<d;c++)h=p[c],h!=null&&!G(h)&&(a=hi(i,n,o,a,h));i.restore();const u=o.length/2;if(u>e.length){for(l=0;l<u;l++)delete n[o[l]];o.splice(0,u)}return a}function Wt(i,t,e){const s=i.currentDevicePixelRatio,n=e!==0?Math.max(e/2,.5):0;return Math.round((t-n)*s)/s+n}function qs(i,t){!t&&!i||(t=t||i.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,i.width,i.height),t.restore())}function ts(i,t,e,s){Vo(i,t,e,s,null)}function Vo(i,t,e,s,n){let o,a,r,l,c,d,p,h;const u=t.pointStyle,g=t.rotation,f=t.radius;let b=(g||0)*fr;if(u&&typeof u=="object"&&(o=u.toString(),o==="[object HTMLImageElement]"||o==="[object HTMLCanvasElement]")){i.save(),i.translate(e,s),i.rotate(b),i.drawImage(u,-u.width/2,-u.height/2,u.width,u.height),i.restore();return}if(!(isNaN(f)||f<=0)){switch(i.beginPath(),u){default:n?i.ellipse(e,s,n/2,f,0,0,H):i.arc(e,s,f,0,H),i.closePath();break;case"triangle":d=n?n/2:f,i.moveTo(e+Math.sin(b)*d,s-Math.cos(b)*f),b+=Vs,i.lineTo(e+Math.sin(b)*d,s-Math.cos(b)*f),b+=Vs,i.lineTo(e+Math.sin(b)*d,s-Math.cos(b)*f),i.closePath();break;case"rectRounded":c=f*.516,l=f-c,a=Math.cos(b+Ht)*l,p=Math.cos(b+Ht)*(n?n/2-c:l),r=Math.sin(b+Ht)*l,h=Math.sin(b+Ht)*(n?n/2-c:l),i.arc(e-p,s-r,c,b-F,b-J),i.arc(e+h,s-a,c,b-J,b),i.arc(e+p,s+r,c,b,b+J),i.arc(e-h,s+a,c,b+J,b+F),i.closePath();break;case"rect":if(!g){l=Math.SQRT1_2*f,d=n?n/2:l,i.rect(e-d,s-l,2*d,2*l);break}b+=Ht;case"rectRot":p=Math.cos(b)*(n?n/2:f),a=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(n?n/2:f),i.moveTo(e-p,s-r),i.lineTo(e+h,s-a),i.lineTo(e+p,s+r),i.lineTo(e-h,s+a),i.closePath();break;case"crossRot":b+=Ht;case"cross":p=Math.cos(b)*(n?n/2:f),a=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(n?n/2:f),i.moveTo(e-p,s-r),i.lineTo(e+p,s+r),i.moveTo(e+h,s-a),i.lineTo(e-h,s+a);break;case"star":p=Math.cos(b)*(n?n/2:f),a=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(n?n/2:f),i.moveTo(e-p,s-r),i.lineTo(e+p,s+r),i.moveTo(e+h,s-a),i.lineTo(e-h,s+a),b+=Ht,p=Math.cos(b)*(n?n/2:f),a=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(n?n/2:f),i.moveTo(e-p,s-r),i.lineTo(e+p,s+r),i.moveTo(e+h,s-a),i.lineTo(e-h,s+a);break;case"line":a=n?n/2:Math.cos(b)*f,r=Math.sin(b)*f,i.moveTo(e-a,s-r),i.lineTo(e+a,s+r);break;case"dash":i.moveTo(e,s),i.lineTo(e+Math.cos(b)*(n?n/2:f),s+Math.sin(b)*f);break;case!1:i.closePath();break}i.fill(),t.borderWidth>0&&i.stroke()}}function Pt(i,t,e){return e=e||.5,!t||i&&i.x>t.left-e&&i.x<t.right+e&&i.y>t.top-e&&i.y<t.bottom+e}function vi(i,t){i.save(),i.beginPath(),i.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),i.clip()}function yi(i){i.restore()}function Lr(i,t,e,s,n){if(!t)return i.lineTo(e.x,e.y);if(n==="middle"){const o=(t.x+e.x)/2;i.lineTo(o,t.y),i.lineTo(o,e.y)}else n==="after"!=!!s?i.lineTo(t.x,e.y):i.lineTo(e.x,t.y);i.lineTo(e.x,e.y)}function Ir(i,t,e,s){if(!t)return i.lineTo(e.x,e.y);i.bezierCurveTo(s?t.cp1x:t.cp2x,s?t.cp1y:t.cp2y,s?e.cp2x:e.cp1x,s?e.cp2y:e.cp1y,e.x,e.y)}function Fr(i,t){t.translation&&i.translate(t.translation[0],t.translation[1]),E(t.rotation)||i.rotate(t.rotation),t.color&&(i.fillStyle=t.color),t.textAlign&&(i.textAlign=t.textAlign),t.textBaseline&&(i.textBaseline=t.textBaseline)}function jr(i,t,e,s,n){if(n.strikethrough||n.underline){const o=i.measureText(s),a=t-o.actualBoundingBoxLeft,r=t+o.actualBoundingBoxRight,l=e-o.actualBoundingBoxAscent,c=e+o.actualBoundingBoxDescent,d=n.strikethrough?(l+c)/2:c;i.strokeStyle=i.fillStyle,i.beginPath(),i.lineWidth=n.decorationWidth||2,i.moveTo(a,d),i.lineTo(r,d),i.stroke()}}function Br(i,t){const e=i.fillStyle;i.fillStyle=t.color,i.fillRect(t.left,t.top,t.width,t.height),i.fillStyle=e}function te(i,t,e,s,n,o={}){const a=G(t)?t:[t],r=o.strokeWidth>0&&o.strokeColor!=="";let l,c;for(i.save(),i.font=n.string,Fr(i,o),l=0;l<a.length;++l)c=a[l],o.backdrop&&Br(i,o.backdrop),r&&(o.strokeColor&&(i.strokeStyle=o.strokeColor),E(o.strokeWidth)||(i.lineWidth=o.strokeWidth),i.strokeText(c,e,s,o.maxWidth)),i.fillText(c,e,s,o.maxWidth),jr(i,e,s,c,o),s+=Number(n.lineHeight);i.restore()}function Te(i,t){const{x:e,y:s,w:n,h:o,radius:a}=t;i.arc(e+a.topLeft,s+a.topLeft,a.topLeft,1.5*F,F,!0),i.lineTo(e,s+o-a.bottomLeft),i.arc(e+a.bottomLeft,s+o-a.bottomLeft,a.bottomLeft,F,J,!0),i.lineTo(e+n-a.bottomRight,s+o),i.arc(e+n-a.bottomRight,s+o-a.bottomRight,a.bottomRight,J,0,!0),i.lineTo(e+n,s+a.topRight),i.arc(e+n-a.topRight,s+a.topRight,a.topRight,0,-J,!0),i.lineTo(e+a.topLeft,s)}const Vr=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,Nr=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function Hr(i,t){const e=(""+i).match(Vr);if(!e||e[1]==="normal")return t*1.2;switch(i=+e[2],e[3]){case"px":return i;case"%":i/=100;break}return t*i}const Wr=i=>+i||0;function _s(i,t){const e={},s=L(t),n=s?Object.keys(t):t,o=L(i)?s?a=>D(i[a],i[t[a]]):a=>i[a]:()=>i;for(const a of n)e[a]=Wr(o(a));return e}function No(i){return _s(i,{top:"y",right:"x",bottom:"y",left:"x"})}function Jt(i){return _s(i,["topLeft","topRight","bottomLeft","bottomRight"])}function rt(i){const t=No(i);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Q(i,t){i=i||{},t=t||Y.font;let e=D(i.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let s=D(i.style,t.style);s&&!(""+s).match(Nr)&&(console.warn('Invalid font style specified: "'+s+'"'),s=void 0);const n={family:D(i.family,t.family),lineHeight:Hr(D(i.lineHeight,t.lineHeight),e),size:e,style:s,weight:D(i.weight,t.weight),string:""};return n.string=Or(n),n}function ve(i,t,e,s){let n,o,a;for(n=0,o=i.length;n<o;++n)if(a=i[n],a!==void 0&&a!==void 0)return a}function Gr(i,t,e){const{min:s,max:n}=i,o=Ao(t,(n-s)/2),a=(r,l)=>e&&r===0?0:r+l;return{min:a(s,-Math.abs(o)),max:a(n,o)}}function jt(i,t){return Object.assign(Object.create(i),t)}function ks(i,t=[""],e,s,n=()=>i[0]){const o=e||i;typeof s>"u"&&(s=Yo("_fallback",i));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:i,_rootScopes:o,_fallback:s,_getTarget:n,override:r=>ks([r,...i],t,o,s)};return new Proxy(a,{deleteProperty(r,l){return delete r[l],delete r._keys,delete i[0][l],!0},get(r,l){return Wo(r,l,()=>Qr(l,t,i,r))},getOwnPropertyDescriptor(r,l){return Reflect.getOwnPropertyDescriptor(r._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(i[0])},has(r,l){return Js(r).includes(l)},ownKeys(r){return Js(r)},set(r,l,c){const d=r._storage||(r._storage=n());return r[l]=d[l]=c,delete r._keys,!0}})}function le(i,t,e,s){const n={_cacheable:!1,_proxy:i,_context:t,_subProxy:e,_stack:new Set,_descriptors:Ho(i,s),setContext:o=>le(i,o,e,s),override:o=>le(i.override(o),t,e,s)};return new Proxy(n,{deleteProperty(o,a){return delete o[a],delete i[a],!0},get(o,a,r){return Wo(o,a,()=>Ur(o,a,r))},getOwnPropertyDescriptor(o,a){return o._descriptors.allKeys?Reflect.has(i,a)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(i,a)},getPrototypeOf(){return Reflect.getPrototypeOf(i)},has(o,a){return Reflect.has(i,a)},ownKeys(){return Reflect.ownKeys(i)},set(o,a,r){return i[a]=r,delete o[a],!0}})}function Ho(i,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:s=t.indexable,_allKeys:n=t.allKeys}=i;return{allKeys:n,scriptable:e,indexable:s,isScriptable:Ft(e)?e:()=>e,isIndexable:Ft(s)?s:()=>s}}const Yr=(i,t)=>i?i+ms(t):t,$s=(i,t)=>L(t)&&i!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Wo(i,t,e){if(Object.prototype.hasOwnProperty.call(i,t)||t==="constructor")return i[t];const s=e();return i[t]=s,s}function Ur(i,t,e){const{_proxy:s,_context:n,_subProxy:o,_descriptors:a}=i;let r=s[t];return Ft(r)&&a.isScriptable(t)&&(r=Xr(t,r,i,e)),G(r)&&r.length&&(r=qr(t,r,i,a.isIndexable)),$s(t,r)&&(r=le(r,n,o&&o[t],a)),r}function Xr(i,t,e,s){const{_proxy:n,_context:o,_subProxy:a,_stack:r}=e;if(r.has(i))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+i);r.add(i);let l=t(o,a||s);return r.delete(i),$s(i,l)&&(l=Ms(n._scopes,n,i,l)),l}function qr(i,t,e,s){const{_proxy:n,_context:o,_subProxy:a,_descriptors:r}=e;if(typeof o.index<"u"&&s(i))return t[o.index%t.length];if(L(t[0])){const l=t,c=n._scopes.filter(d=>d!==l);t=[];for(const d of l){const p=Ms(c,n,i,d);t.push(le(p,o,a&&a[i],r))}}return t}function Go(i,t,e){return Ft(i)?i(t,e):i}const Kr=(i,t)=>i===!0?t:typeof i=="string"?It(t,i):void 0;function Jr(i,t,e,s,n){for(const o of t){const a=Kr(e,o);if(a){i.add(a);const r=Go(a._fallback,e,n);if(typeof r<"u"&&r!==e&&r!==s)return r}else if(a===!1&&typeof s<"u"&&e!==s)return null}return!1}function Ms(i,t,e,s){const n=t._rootScopes,o=Go(t._fallback,e,s),a=[...i,...n],r=new Set;r.add(s);let l=Ks(r,a,e,o||e,s);return l===null||typeof o<"u"&&o!==e&&(l=Ks(r,a,o,l,s),l===null)?!1:ks(Array.from(r),[""],n,o,()=>Zr(t,e,s))}function Ks(i,t,e,s,n){for(;e;)e=Jr(i,t,e,s,n);return e}function Zr(i,t,e){const s=i._getTarget();t in s||(s[t]={});const n=s[t];return G(n)&&L(e)?e:n||{}}function Qr(i,t,e,s){let n;for(const o of t)if(n=Yo(Yr(o,i),e),typeof n<"u")return $s(i,n)?Ms(e,s,i,n):n}function Yo(i,t){for(const e of t){if(!e)continue;const s=e[i];if(typeof s<"u")return s}}function Js(i){let t=i._keys;return t||(t=i._keys=tl(i._scopes)),t}function tl(i){const t=new Set;for(const e of i)for(const s of Object.keys(e).filter(n=>!n.startsWith("_")))t.add(s);return Array.from(t)}function Uo(i,t,e,s){const{iScale:n}=i,{key:o="r"}=this._parsing,a=new Array(s);let r,l,c,d;for(r=0,l=s;r<l;++r)c=r+e,d=t[c],a[r]={r:n.parse(It(d,o),c)};return a}const el=Number.EPSILON||1e-14,ce=(i,t)=>t<i.length&&!i[t].skip&&i[t],Xo=i=>i==="x"?"y":"x";function il(i,t,e,s){const n=i.skip?t:i,o=t,a=e.skip?t:e,r=Zi(o,n),l=Zi(a,o);let c=r/(r+l),d=l/(r+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const p=s*c,h=s*d;return{previous:{x:o.x-p*(a.x-n.x),y:o.y-p*(a.y-n.y)},next:{x:o.x+h*(a.x-n.x),y:o.y+h*(a.y-n.y)}}}function sl(i,t,e){const s=i.length;let n,o,a,r,l,c=ce(i,0);for(let d=0;d<s-1;++d)if(l=c,c=ce(i,d+1),!(!l||!c)){if(Me(t[d],0,el)){e[d]=e[d+1]=0;continue}n=e[d]/t[d],o=e[d+1]/t[d],r=Math.pow(n,2)+Math.pow(o,2),!(r<=9)&&(a=3/Math.sqrt(r),e[d]=n*a*t[d],e[d+1]=o*a*t[d])}}function nl(i,t,e="x"){const s=Xo(e),n=i.length;let o,a,r,l=ce(i,0);for(let c=0;c<n;++c){if(a=r,r=l,l=ce(i,c+1),!r)continue;const d=r[e],p=r[s];a&&(o=(d-a[e])/3,r[`cp1${e}`]=d-o,r[`cp1${s}`]=p-o*t[c]),l&&(o=(l[e]-d)/3,r[`cp2${e}`]=d+o,r[`cp2${s}`]=p+o*t[c])}}function ol(i,t="x"){const e=Xo(t),s=i.length,n=Array(s).fill(0),o=Array(s);let a,r,l,c=ce(i,0);for(a=0;a<s;++a)if(r=l,l=c,c=ce(i,a+1),!!l){if(c){const d=c[t]-l[t];n[a]=d!==0?(c[e]-l[e])/d:0}o[a]=r?c?_t(n[a-1])!==_t(n[a])?0:(n[a-1]+n[a])/2:n[a-1]:n[a]}sl(i,n,o),nl(i,o,t)}function Ge(i,t,e){return Math.max(Math.min(i,e),t)}function al(i,t){let e,s,n,o,a,r=Pt(i[0],t);for(e=0,s=i.length;e<s;++e)a=o,o=r,r=e<s-1&&Pt(i[e+1],t),o&&(n=i[e],a&&(n.cp1x=Ge(n.cp1x,t.left,t.right),n.cp1y=Ge(n.cp1y,t.top,t.bottom)),r&&(n.cp2x=Ge(n.cp2x,t.left,t.right),n.cp2y=Ge(n.cp2y,t.top,t.bottom)))}function rl(i,t,e,s,n){let o,a,r,l;if(t.spanGaps&&(i=i.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")ol(i,n);else{let c=s?i[i.length-1]:i[0];for(o=0,a=i.length;o<a;++o)r=i[o],l=il(c,r,i[Math.min(o+1,a-(s?0:1))%a],t.tension),r.cp1x=l.previous.x,r.cp1y=l.previous.y,r.cp2x=l.next.x,r.cp2y=l.next.y,c=r}t.capBezierPoints&&al(i,e)}function Ss(){return typeof window<"u"&&typeof document<"u"}function Cs(i){let t=i.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function ui(i,t,e){let s;return typeof i=="string"?(s=parseInt(i,10),i.indexOf("%")!==-1&&(s=s/100*t.parentNode[e])):s=i,s}const wi=i=>i.ownerDocument.defaultView.getComputedStyle(i,null);function ll(i,t){return wi(i).getPropertyValue(t)}const cl=["top","right","bottom","left"];function Zt(i,t,e){const s={};e=e?"-"+e:"";for(let n=0;n<4;n++){const o=cl[n];s[o]=parseFloat(i[t+"-"+o+e])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const dl=(i,t,e)=>(i>0||t>0)&&(!e||!e.shadowRoot);function pl(i,t){const e=i.touches,s=e&&e.length?e[0]:i,{offsetX:n,offsetY:o}=s;let a=!1,r,l;if(dl(n,o,i.target))r=n,l=o;else{const c=t.getBoundingClientRect();r=s.clientX-c.left,l=s.clientY-c.top,a=!0}return{x:r,y:l,box:a}}function Ut(i,t){if("native"in i)return i;const{canvas:e,currentDevicePixelRatio:s}=t,n=wi(e),o=n.boxSizing==="border-box",a=Zt(n,"padding"),r=Zt(n,"border","width"),{x:l,y:c,box:d}=pl(i,e),p=a.left+(d&&r.left),h=a.top+(d&&r.top);let{width:u,height:g}=t;return o&&(u-=a.width+r.width,g-=a.height+r.height),{x:Math.round((l-p)/u*e.width/s),y:Math.round((c-h)/g*e.height/s)}}function hl(i,t,e){let s,n;if(t===void 0||e===void 0){const o=i&&Cs(i);if(!o)t=i.clientWidth,e=i.clientHeight;else{const a=o.getBoundingClientRect(),r=wi(o),l=Zt(r,"border","width"),c=Zt(r,"padding");t=a.width-c.width-l.width,e=a.height-c.height-l.height,s=ui(r.maxWidth,o,"clientWidth"),n=ui(r.maxHeight,o,"clientHeight")}}return{width:t,height:e,maxWidth:s||pi,maxHeight:n||pi}}const Tt=i=>Math.round(i*10)/10;function ul(i,t,e,s){const n=wi(i),o=Zt(n,"margin"),a=ui(n.maxWidth,i,"clientWidth")||pi,r=ui(n.maxHeight,i,"clientHeight")||pi,l=hl(i,t,e);let{width:c,height:d}=l;if(n.boxSizing==="content-box"){const h=Zt(n,"border","width"),u=Zt(n,"padding");c-=u.width+h.width,d-=u.height+h.height}return c=Math.max(0,c-o.width),d=Math.max(0,s?c/s:d-o.height),c=Tt(Math.min(c,a,l.maxWidth)),d=Tt(Math.min(d,r,l.maxHeight)),c&&!d&&(d=Tt(c/2)),(t!==void 0||e!==void 0)&&s&&l.height&&d>l.height&&(d=l.height,c=Tt(Math.floor(d*s))),{width:c,height:d}}function Zs(i,t,e){const s=t||1,n=Tt(i.height*s),o=Tt(i.width*s);i.height=Tt(i.height),i.width=Tt(i.width);const a=i.canvas;return a.style&&(e||!a.style.height&&!a.style.width)&&(a.style.height=`${i.height}px`,a.style.width=`${i.width}px`),i.currentDevicePixelRatio!==s||a.height!==n||a.width!==o?(i.currentDevicePixelRatio=s,a.height=n,a.width=o,i.ctx.setTransform(s,0,0,s,0,0),!0):!1}const gl=function(){let i=!1;try{const t={get passive(){return i=!0,!1}};Ss()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return i}();function Qs(i,t){const e=ll(i,t),s=e&&e.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function Xt(i,t,e,s){return{x:i.x+e*(t.x-i.x),y:i.y+e*(t.y-i.y)}}function fl(i,t,e,s){return{x:i.x+e*(t.x-i.x),y:s==="middle"?e<.5?i.y:t.y:s==="after"?e<1?i.y:t.y:e>0?t.y:i.y}}function bl(i,t,e,s){const n={x:i.cp2x,y:i.cp2y},o={x:t.cp1x,y:t.cp1y},a=Xt(i,n,e),r=Xt(n,o,e),l=Xt(o,t,e),c=Xt(a,r,e),d=Xt(r,l,e);return Xt(c,d,e)}const ml=function(i,t){return{x(e){return i+i+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,s){return e-s},leftForLtr(e,s){return e-s}}},xl=function(){return{x(i){return i},setWidth(i){},textAlign(i){return i},xPlus(i,t){return i+t},leftForLtr(i,t){return i}}};function ae(i,t,e){return i?ml(t,e):xl()}function qo(i,t){let e,s;(t==="ltr"||t==="rtl")&&(e=i.canvas.style,s=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),i.prevTextDirection=s)}function Ko(i,t){t!==void 0&&(delete i.prevTextDirection,i.canvas.style.setProperty("direction",t[0],t[1]))}function Jo(i){return i==="angle"?{between:De,compare:vr,normalize:ot}:{between:Ct,compare:(t,e)=>t-e,normalize:t=>t}}function tn({start:i,end:t,count:e,loop:s,style:n}){return{start:i%e,end:t%e,loop:s&&(t-i+1)%e===0,style:n}}function vl(i,t,e){const{property:s,start:n,end:o}=e,{between:a,normalize:r}=Jo(s),l=t.length;let{start:c,end:d,loop:p}=i,h,u;if(p){for(c+=l,d+=l,h=0,u=l;h<u&&a(r(t[c%l][s]),n,o);++h)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:p,style:i.style}}function Zo(i,t,e){if(!e)return[i];const{property:s,start:n,end:o}=e,a=t.length,{compare:r,between:l,normalize:c}=Jo(s),{start:d,end:p,loop:h,style:u}=vl(i,t,e),g=[];let f=!1,b=null,m,x,w;const y=()=>l(n,w,m)&&r(n,w)!==0,v=()=>r(o,m)===0||l(o,w,m),k=()=>f||y(),$=()=>!f||v();for(let M=d,S=d;M<=p;++M)x=t[M%a],!x.skip&&(m=c(x[s]),m!==w&&(f=l(m,n,o),b===null&&k()&&(b=r(m,n)===0?M:S),b!==null&&$()&&(g.push(tn({start:b,end:M,loop:h,count:a,style:u})),b=null),S=M,w=m));return b!==null&&g.push(tn({start:b,end:p,loop:h,count:a,style:u})),g}function Qo(i,t){const e=[],s=i.segments;for(let n=0;n<s.length;n++){const o=Zo(s[n],i.points,t);o.length&&e.push(...o)}return e}function yl(i,t,e,s){let n=0,o=t-1;if(e&&!s)for(;n<t&&!i[n].skip;)n++;for(;n<t&&i[n].skip;)n++;for(n%=t,e&&(o+=n);o>n&&i[o%t].skip;)o--;return o%=t,{start:n,end:o}}function wl(i,t,e,s){const n=i.length,o=[];let a=t,r=i[t],l;for(l=t+1;l<=e;++l){const c=i[l%n];c.skip||c.stop?r.skip||(s=!1,o.push({start:t%n,end:(l-1)%n,loop:s}),t=a=c.stop?l:null):(a=l,r.skip&&(t=l)),r=c}return a!==null&&o.push({start:t%n,end:a%n,loop:s}),o}function _l(i,t){const e=i.points,s=i.options.spanGaps,n=e.length;if(!n)return[];const o=!!i._loop,{start:a,end:r}=yl(e,n,o,s);if(s===!0)return en(i,[{start:a,end:r,loop:o}],e,t);const l=r<a?r+n:r,c=!!i._fullLoop&&a===0&&r===n-1;return en(i,wl(e,a,l,c),e,t)}function en(i,t,e,s){return!s||!s.setContext||!e?t:kl(i,t,e,s)}function kl(i,t,e,s){const n=i._chart.getContext(),o=sn(i.options),{_datasetIndex:a,options:{spanGaps:r}}=i,l=e.length,c=[];let d=o,p=t[0].start,h=p;function u(g,f,b,m){const x=r?-1:1;if(g!==f){for(g+=l;e[g%l].skip;)g-=x;for(;e[f%l].skip;)f+=x;g%l!==f%l&&(c.push({start:g%l,end:f%l,loop:b,style:m}),d=m,p=f%l)}}for(const g of t){p=r?p:g.start;let f=e[p%l],b;for(h=p+1;h<=g.end;h++){const m=e[h%l];b=sn(s.setContext(jt(n,{type:"segment",p0:f,p1:m,p0DataIndex:(h-1)%l,p1DataIndex:h%l,datasetIndex:a}))),$l(b,d)&&u(p,h-1,g.loop,d),f=m,d=b}p<h-1&&u(p,h-1,g.loop,d)}return c}function sn(i){return{backgroundColor:i.backgroundColor,borderCapStyle:i.borderCapStyle,borderDash:i.borderDash,borderDashOffset:i.borderDashOffset,borderJoinStyle:i.borderJoinStyle,borderWidth:i.borderWidth,borderColor:i.borderColor}}function $l(i,t){if(!t)return!1;const e=[],s=function(n,o){return ws(o)?(e.includes(o)||e.push(o),e.indexOf(o)):o};return JSON.stringify(i,s)!==JSON.stringify(t,s)}function Ye(i,t,e){return i.options.clip?i[e]:t[e]}function Ml(i,t){const{xScale:e,yScale:s}=i;return e&&s?{left:Ye(e,t,"left"),right:Ye(e,t,"right"),top:Ye(s,t,"top"),bottom:Ye(s,t,"bottom")}:t}function ta(i,t){const e=t._clip;if(e.disabled)return!1;const s=Ml(t,i.chartArea);return{left:e.left===!1?0:s.left-(e.left===!0?0:e.left),right:e.right===!1?i.width:s.right+(e.right===!0?0:e.right),top:e.top===!1?0:s.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?i.height:s.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class Sl{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,s,n){const o=e.listeners[n],a=e.duration;o.forEach(r=>r({chart:t,initial:e.initial,numSteps:a,currentStep:Math.min(s-e.start,a)}))}_refresh(){this._request||(this._running=!0,this._request=Lo.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((s,n)=>{if(!s.running||!s.items.length)return;const o=s.items;let a=o.length-1,r=!1,l;for(;a>=0;--a)l=o[a],l._active?(l._total>s.duration&&(s.duration=l._total),l.tick(t),r=!0):(o[a]=o[o.length-1],o.pop());r&&(n.draw(),this._notify(n,s,t,"progress")),o.length||(s.running=!1,this._notify(n,s,t,"complete"),s.initial=!1),e+=o.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let s=e.get(t);return s||(s={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,s)),s}listen(t,e,s){this._getAnims(t).listeners[e].push(s)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((s,n)=>Math.max(s,n._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const s=e.items;let n=s.length-1;for(;n>=0;--n)s[n].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var $t=new Sl;const nn="transparent",Cl={boolean(i,t,e){return e>.5?t:i},color(i,t,e){const s=Us(i||nn),n=s.valid&&Us(t||nn);return n&&n.valid?n.mix(s,e).hexString():t},number(i,t,e){return i+(t-i)*e}};class zl{constructor(t,e,s,n){const o=e[s];n=ve([t.to,n,o,t.from]);const a=ve([t.from,o,n]);this._active=!0,this._fn=t.fn||Cl[t.type||typeof a],this._easing=Se[t.easing]||Se.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=s,this._from=a,this._to=n,this._promises=void 0}active(){return this._active}update(t,e,s){if(this._active){this._notify(!1);const n=this._target[this._prop],o=s-this._start,a=this._duration-o;this._start=s,this._duration=Math.floor(Math.max(a,t.duration)),this._total+=o,this._loop=!!t.loop,this._to=ve([t.to,e,n,t.from]),this._from=ve([t.from,n,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,s=this._duration,n=this._prop,o=this._from,a=this._loop,r=this._to;let l;if(this._active=o!==r&&(a||e<s),!this._active){this._target[n]=r,this._notify(!0);return}if(e<0){this._target[n]=o;return}l=e/s%2,l=a&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[n]=this._fn(o,r,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,s)=>{t.push({res:e,rej:s})})}_notify(t){const e=t?"res":"rej",s=this._promises||[];for(let n=0;n<s.length;n++)s[n][e]()}}class ea{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!L(t))return;const e=Object.keys(Y.animation),s=this._properties;Object.getOwnPropertyNames(t).forEach(n=>{const o=t[n];if(!L(o))return;const a={};for(const r of e)a[r]=o[r];(G(o.properties)&&o.properties||[n]).forEach(r=>{(r===n||!s.has(r))&&s.set(r,a)})})}_animateOptions(t,e){const s=e.options,n=Al(t,s);if(!n)return[];const o=this._createAnimations(n,s);return s.$shared&&Pl(t.options.$animations,s).then(()=>{t.options=s},()=>{}),o}_createAnimations(t,e){const s=this._properties,n=[],o=t.$animations||(t.$animations={}),a=Object.keys(e),r=Date.now();let l;for(l=a.length-1;l>=0;--l){const c=a[l];if(c.charAt(0)==="$")continue;if(c==="options"){n.push(...this._animateOptions(t,e));continue}const d=e[c];let p=o[c];const h=s.get(c);if(p)if(h&&p.active()){p.update(h,d,r);continue}else p.cancel();if(!h||!h.duration){t[c]=d;continue}o[c]=p=new zl(h,t,c,d),n.push(p)}return n}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const s=this._createAnimations(t,e);if(s.length)return $t.add(this._chart,s),!0}}function Pl(i,t){const e=[],s=Object.keys(t);for(let n=0;n<s.length;n++){const o=i[s[n]];o&&o.active()&&e.push(o.wait())}return Promise.all(e)}function Al(i,t){if(!t)return;let e=i.options;if(!e){i.options=t;return}return e.$shared&&(i.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function on(i,t){const e=i&&i.options||{},s=e.reverse,n=e.min===void 0?t:0,o=e.max===void 0?t:0;return{start:s?o:n,end:s?n:o}}function Rl(i,t,e){if(e===!1)return!1;const s=on(i,e),n=on(t,e);return{top:n.end,right:s.end,bottom:n.start,left:s.start}}function Dl(i){let t,e,s,n;return L(i)?(t=i.top,e=i.right,s=i.bottom,n=i.left):t=e=s=n=i,{top:t,right:e,bottom:s,left:n,disabled:i===!1}}function ia(i,t){const e=[],s=i._getSortedDatasetMetas(t);let n,o;for(n=0,o=s.length;n<o;++n)e.push(s[n].index);return e}function an(i,t,e,s={}){const n=i.keys,o=s.mode==="single";let a,r,l,c;if(t===null)return;let d=!1;for(a=0,r=n.length;a<r;++a){if(l=+n[a],l===e){if(d=!0,s.all)continue;break}c=i.values[l],q(c)&&(o||t===0||_t(t)===_t(c))&&(t+=c)}return!d&&!s.all?0:t}function Tl(i,t){const{iScale:e,vScale:s}=t,n=e.axis==="x"?"x":"y",o=s.axis==="x"?"x":"y",a=Object.keys(i),r=new Array(a.length);let l,c,d;for(l=0,c=a.length;l<c;++l)d=a[l],r[l]={[n]:d,[o]:i[d]};return r}function Ti(i,t){const e=i&&i.options.stacked;return e||e===void 0&&t.stack!==void 0}function Ol(i,t,e){return`${i.id}.${t.id}.${e.stack||e.type}`}function El(i){const{min:t,max:e,minDefined:s,maxDefined:n}=i.getUserBounds();return{min:s?t:Number.NEGATIVE_INFINITY,max:n?e:Number.POSITIVE_INFINITY}}function Ll(i,t,e){const s=i[t]||(i[t]={});return s[e]||(s[e]={})}function rn(i,t,e,s){for(const n of t.getMatchingVisibleMetas(s).reverse()){const o=i[n.index];if(e&&o>0||!e&&o<0)return n.index}return null}function ln(i,t){const{chart:e,_cachedMeta:s}=i,n=e._stacks||(e._stacks={}),{iScale:o,vScale:a,index:r}=s,l=o.axis,c=a.axis,d=Ol(o,a,s),p=t.length;let h;for(let u=0;u<p;++u){const g=t[u],{[l]:f,[c]:b}=g,m=g._stacks||(g._stacks={});h=m[c]=Ll(n,d,f),h[r]=b,h._top=rn(h,a,!0,s.type),h._bottom=rn(h,a,!1,s.type);const x=h._visualValues||(h._visualValues={});x[r]=b}}function Oi(i,t){const e=i.scales;return Object.keys(e).filter(s=>e[s].axis===t).shift()}function Il(i,t){return jt(i,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Fl(i,t,e){return jt(i,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function he(i,t){const e=i.controller.index,s=i.vScale&&i.vScale.axis;if(s){t=t||i._parsed;for(const n of t){const o=n._stacks;if(!o||o[s]===void 0||o[s][e]===void 0)return;delete o[s][e],o[s]._visualValues!==void 0&&o[s]._visualValues[e]!==void 0&&delete o[s]._visualValues[e]}}}const Ei=i=>i==="reset"||i==="none",cn=(i,t)=>t?i:Object.assign({},i),jl=(i,t,e)=>i&&!t.hidden&&t._stacked&&{keys:ia(e,!0),values:null};class mt{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Ti(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&he(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,s=this.getDataset(),n=(p,h,u,g)=>p==="x"?h:p==="r"?g:u,o=e.xAxisID=D(s.xAxisID,Oi(t,"x")),a=e.yAxisID=D(s.yAxisID,Oi(t,"y")),r=e.rAxisID=D(s.rAxisID,Oi(t,"r")),l=e.indexAxis,c=e.iAxisID=n(l,o,a,r),d=e.vAxisID=n(l,a,o,r);e.xScale=this.getScaleForId(o),e.yScale=this.getScaleForId(a),e.rScale=this.getScaleForId(r),e.iScale=this.getScaleForId(c),e.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Ws(this._data,this),t._stacked&&he(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),s=this._data;if(L(e)){const n=this._cachedMeta;this._data=Tl(e,n)}else if(s!==e){if(s){Ws(s,this);const n=this._cachedMeta;he(n),n._parsed=[]}e&&Object.isExtensible(e)&&kr(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,s=this.getDataset();let n=!1;this._dataCheck();const o=e._stacked;e._stacked=Ti(e.vScale,e),e.stack!==s.stack&&(n=!0,he(e),e.stack=s.stack),this._resyncElements(t),(n||o!==e._stacked)&&(ln(this,e._parsed),e._stacked=Ti(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),s=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(s,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:s,_data:n}=this,{iScale:o,_stacked:a}=s,r=o.axis;let l=t===0&&e===n.length?!0:s._sorted,c=t>0&&s._parsed[t-1],d,p,h;if(this._parsing===!1)s._parsed=n,s._sorted=!0,h=n;else{G(n[t])?h=this.parseArrayData(s,n,t,e):L(n[t])?h=this.parseObjectData(s,n,t,e):h=this.parsePrimitiveData(s,n,t,e);const u=()=>p[r]===null||c&&p[r]<c[r];for(d=0;d<e;++d)s._parsed[d+t]=p=h[d],l&&(u()&&(l=!1),c=p);s._sorted=l}a&&ln(this,h)}parsePrimitiveData(t,e,s,n){const{iScale:o,vScale:a}=t,r=o.axis,l=a.axis,c=o.getLabels(),d=o===a,p=new Array(n);let h,u,g;for(h=0,u=n;h<u;++h)g=h+s,p[h]={[r]:d||o.parse(c[g],g),[l]:a.parse(e[g],g)};return p}parseArrayData(t,e,s,n){const{xScale:o,yScale:a}=t,r=new Array(n);let l,c,d,p;for(l=0,c=n;l<c;++l)d=l+s,p=e[d],r[l]={x:o.parse(p[0],d),y:a.parse(p[1],d)};return r}parseObjectData(t,e,s,n){const{xScale:o,yScale:a}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=new Array(n);let d,p,h,u;for(d=0,p=n;d<p;++d)h=d+s,u=e[h],c[d]={x:o.parse(It(u,r),h),y:a.parse(It(u,l),h)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,s){const n=this.chart,o=this._cachedMeta,a=e[t.axis],r={keys:ia(n,!0),values:e._stacks[t.axis]._visualValues};return an(r,a,o.index,{mode:s})}updateRangeFromParsed(t,e,s,n){const o=s[e.axis];let a=o===null?NaN:o;const r=n&&s._stacks[e.axis];n&&r&&(n.values=r,a=an(n,o,this._cachedMeta.index)),t.min=Math.min(t.min,a),t.max=Math.max(t.max,a)}getMinMax(t,e){const s=this._cachedMeta,n=s._parsed,o=s._sorted&&t===s.iScale,a=n.length,r=this._getOtherScale(t),l=jl(e,s,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:p}=El(r);let h,u;function g(){u=n[h];const f=u[r.axis];return!q(u[t.axis])||d>f||p<f}for(h=0;h<a&&!(!g()&&(this.updateRangeFromParsed(c,t,u,l),o));++h);if(o){for(h=a-1;h>=0;--h)if(!g()){this.updateRangeFromParsed(c,t,u,l);break}}return c}getAllParsedValues(t){const e=this._cachedMeta._parsed,s=[];let n,o,a;for(n=0,o=e.length;n<o;++n)a=e[n][t.axis],q(a)&&s.push(a);return s}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,s=e.iScale,n=e.vScale,o=this.getParsed(t);return{label:s?""+s.getLabelForValue(o[s.axis]):"",value:n?""+n.getLabelForValue(o[n.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=Dl(D(this.options.clip,Rl(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,s=this._cachedMeta,n=s.data||[],o=e.chartArea,a=[],r=this._drawStart||0,l=this._drawCount||n.length-r,c=this.options.drawActiveElementsOnTop;let d;for(s.dataset&&s.dataset.draw(t,o,r,l),d=r;d<r+l;++d){const p=n[d];p.hidden||(p.active&&c?a.push(p):p.draw(t,o))}for(d=0;d<a.length;++d)a[d].draw(t,o)}getStyle(t,e){const s=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(s):this.resolveDataElementOptions(t||0,s)}getContext(t,e,s){const n=this.getDataset();let o;if(t>=0&&t<this._cachedMeta.data.length){const a=this._cachedMeta.data[t];o=a.$context||(a.$context=Fl(this.getContext(),t,a)),o.parsed=this.getParsed(t),o.raw=n.data[t],o.index=o.dataIndex=t}else o=this.$context||(this.$context=Il(this.chart.getContext(),this.index)),o.dataset=n,o.index=o.datasetIndex=this.index;return o.active=!!e,o.mode=s,o}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",s){const n=e==="active",o=this._cachedDataOpts,a=t+"-"+e,r=o[a],l=this.enableOptionSharing&&Re(s);if(r)return cn(r,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),p=n?[`${t}Hover`,"hover",t,""]:[t,""],h=c.getOptionScopes(this.getDataset(),d),u=Object.keys(Y.elements[t]),g=()=>this.getContext(s,n,e),f=c.resolveNamedOptions(h,u,g,p);return f.$shared&&(f.$shared=l,o[a]=Object.freeze(cn(f,l))),f}_resolveAnimations(t,e,s){const n=this.chart,o=this._cachedDataOpts,a=`animation-${e}`,r=o[a];if(r)return r;let l;if(n.options.animation!==!1){const d=this.chart.config,p=d.datasetAnimationScopeKeys(this._type,e),h=d.getOptionScopes(this.getDataset(),p);l=d.createResolver(h,this.getContext(t,s,e))}const c=new ea(n,l&&l.animations);return l&&l._cacheable&&(o[a]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Ei(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const s=this.resolveDataElementOptions(t,e),n=this._sharedOptions,o=this.getSharedOptions(s),a=this.includeOptions(e,o)||o!==n;return this.updateSharedOptions(o,e,s),{sharedOptions:o,includeOptions:a}}updateElement(t,e,s,n){Ei(n)?Object.assign(t,s):this._resolveAnimations(e,n).update(t,s)}updateSharedOptions(t,e,s){t&&!Ei(e)&&this._resolveAnimations(void 0,e).update(t,s)}_setStyle(t,e,s,n){t.active=n;const o=this.getStyle(e,n);this._resolveAnimations(e,s,n).update(t,{options:!n&&this.getSharedOptions(o)||o})}removeHoverStyle(t,e,s){this._setStyle(t,s,"active",!1)}setHoverStyle(t,e,s){this._setStyle(t,s,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,s=this._cachedMeta.data;for(const[r,l,c]of this._syncList)this[r](l,c);this._syncList=[];const n=s.length,o=e.length,a=Math.min(o,n);a&&this.parse(0,a),o>n?this._insertElements(n,o-n,t):o<n&&this._removeElements(o,n-o)}_insertElements(t,e,s=!0){const n=this._cachedMeta,o=n.data,a=t+e;let r;const l=c=>{for(c.length+=e,r=c.length-1;r>=a;r--)c[r]=c[r-e]};for(l(o),r=t;r<a;++r)o[r]=new this.dataElementType;this._parsing&&l(n._parsed),this.parse(t,e),s&&this.updateElements(o,t,e,"reset")}updateElements(t,e,s,n){}_removeElements(t,e){const s=this._cachedMeta;if(this._parsing){const n=s._parsed.splice(t,e);s._stacked&&he(s,n)}s.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,s,n]=t;this[e](s,n)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const s=arguments.length-2;s&&this._sync(["_insertElements",t,s])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}_(mt,"defaults",{}),_(mt,"datasetElementType",null),_(mt,"dataElementType",null);function Bl(i,t){if(!i._cache.$bar){const e=i.getMatchingVisibleMetas(t);let s=[];for(let n=0,o=e.length;n<o;n++)s=s.concat(e[n].controller.getAllParsedValues(i));i._cache.$bar=Eo(s.sort((n,o)=>n-o))}return i._cache.$bar}function Vl(i){const t=i.iScale,e=Bl(t,i.type);let s=t._length,n,o,a,r;const l=()=>{a===32767||a===-32768||(Re(r)&&(s=Math.min(s,Math.abs(a-r)||s)),r=a)};for(n=0,o=e.length;n<o;++n)a=t.getPixelForValue(e[n]),l();for(r=void 0,n=0,o=t.ticks.length;n<o;++n)a=t.getPixelForTick(n),l();return s}function Nl(i,t,e,s){const n=e.barThickness;let o,a;return E(n)?(o=t.min*e.categoryPercentage,a=e.barPercentage):(o=n*s,a=1),{chunk:o/s,ratio:a,start:t.pixels[i]-o/2}}function Hl(i,t,e,s){const n=t.pixels,o=n[i];let a=i>0?n[i-1]:null,r=i<n.length-1?n[i+1]:null;const l=e.categoryPercentage;a===null&&(a=o-(r===null?t.end-t.start:r-o)),r===null&&(r=o+o-a);const c=o-(o-Math.min(a,r))/2*l;return{chunk:Math.abs(r-a)/2*l/s,ratio:e.barPercentage,start:c}}function Wl(i,t,e,s){const n=e.parse(i[0],s),o=e.parse(i[1],s),a=Math.min(n,o),r=Math.max(n,o);let l=a,c=r;Math.abs(a)>Math.abs(r)&&(l=r,c=a),t[e.axis]=c,t._custom={barStart:l,barEnd:c,start:n,end:o,min:a,max:r}}function sa(i,t,e,s){return G(i)?Wl(i,t,e,s):t[e.axis]=e.parse(i,s),t}function dn(i,t,e,s){const n=i.iScale,o=i.vScale,a=n.getLabels(),r=n===o,l=[];let c,d,p,h;for(c=e,d=e+s;c<d;++c)h=t[c],p={},p[n.axis]=r||n.parse(a[c],c),l.push(sa(h,p,o,c));return l}function Li(i){return i&&i.barStart!==void 0&&i.barEnd!==void 0}function Gl(i,t,e){return i!==0?_t(i):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function Yl(i){let t,e,s,n,o;return i.horizontal?(t=i.base>i.x,e="left",s="right"):(t=i.base<i.y,e="bottom",s="top"),t?(n="end",o="start"):(n="start",o="end"),{start:e,end:s,reverse:t,top:n,bottom:o}}function Ul(i,t,e,s){let n=t.borderSkipped;const o={};if(!n){i.borderSkipped=o;return}if(n===!0){i.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:a,end:r,reverse:l,top:c,bottom:d}=Yl(i);n==="middle"&&e&&(i.enableBorderRadius=!0,(e._top||0)===s?n=c:(e._bottom||0)===s?n=d:(o[pn(d,a,r,l)]=!0,n=c)),o[pn(n,a,r,l)]=!0,i.borderSkipped=o}function pn(i,t,e,s){return s?(i=Xl(i,t,e),i=hn(i,e,t)):i=hn(i,t,e),i}function Xl(i,t,e){return i===t?e:i===e?t:i}function hn(i,t,e){return i==="start"?t:i==="end"?e:i}function ql(i,{inflateAmount:t},e){i.inflateAmount=t==="auto"?e===1?.33:0:t}class ti extends mt{parsePrimitiveData(t,e,s,n){return dn(t,e,s,n)}parseArrayData(t,e,s,n){return dn(t,e,s,n)}parseObjectData(t,e,s,n){const{iScale:o,vScale:a}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=o.axis==="x"?r:l,d=a.axis==="x"?r:l,p=[];let h,u,g,f;for(h=s,u=s+n;h<u;++h)f=e[h],g={},g[o.axis]=o.parse(It(f,c),h),p.push(sa(It(f,d),g,a,h));return p}updateRangeFromParsed(t,e,s,n){super.updateRangeFromParsed(t,e,s,n);const o=s._custom;o&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,o.min),t.max=Math.max(t.max,o.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:s,vScale:n}=e,o=this.getParsed(t),a=o._custom,r=Li(a)?"["+a.start+", "+a.end+"]":""+n.getLabelForValue(o[n.axis]);return{label:""+s.getLabelForValue(o[s.axis]),value:r}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,s,n){const o=n==="reset",{index:a,_cachedMeta:{vScale:r}}=this,l=r.getBasePixel(),c=r.isHorizontal(),d=this._getRuler(),{sharedOptions:p,includeOptions:h}=this._getSharedOptions(e,n);for(let u=e;u<e+s;u++){const g=this.getParsed(u),f=o||E(g[r.axis])?{base:l,head:l}:this._calculateBarValuePixels(u),b=this._calculateBarIndexPixels(u,d),m=(g._stacks||{})[r.axis],x={horizontal:c,base:f.base,enableBorderRadius:!m||Li(g._custom)||a===m._top||a===m._bottom,x:c?f.head:b.center,y:c?b.center:f.head,height:c?b.size:Math.abs(f.size),width:c?Math.abs(f.size):b.size};h&&(x.options=p||this.resolveDataElementOptions(u,t[u].active?"active":n));const w=x.options||t[u].options;Ul(x,w,m,a),ql(x,w,d.ratio),this.updateElement(t[u],u,x,n)}}_getStacks(t,e){const{iScale:s}=this._cachedMeta,n=s.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),o=s.options.stacked,a=[],r=this._cachedMeta.controller.getParsed(e),l=r&&r[s.axis],c=d=>{const p=d._parsed.find(u=>u[s.axis]===l),h=p&&p[d.vScale.axis];if(E(h)||isNaN(h))return!0};for(const d of n)if(!(e!==void 0&&c(d))&&((o===!1||a.indexOf(d.stack)===-1||o===void 0&&d.stack===void 0)&&a.push(d.stack),d.index===t))break;return a.length||a.push(void 0),a}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(s=>t[s].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const s of this.chart.data.datasets)t[D(this.chart.options.indexAxis==="x"?s.xAxisID:s.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,s){const n=this._getStacks(t,s),o=e!==void 0?n.indexOf(e):-1;return o===-1?n.length-1:o}_getRuler(){const t=this.options,e=this._cachedMeta,s=e.iScale,n=[];let o,a;for(o=0,a=e.data.length;o<a;++o)n.push(s.getPixelForValue(this.getParsed(o)[s.axis],o));const r=t.barThickness;return{min:r||Vl(e),pixels:n,start:s._startPixel,end:s._endPixel,stackCount:this._getStackCount(),scale:s,grouped:t.grouped,ratio:r?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:s,index:n},options:{base:o,minBarLength:a}}=this,r=o||0,l=this.getParsed(t),c=l._custom,d=Li(c);let p=l[e.axis],h=0,u=s?this.applyStack(e,l,s):p,g,f;u!==p&&(h=u-p,u=p),d&&(p=c.barStart,u=c.barEnd-c.barStart,p!==0&&_t(p)!==_t(c.barEnd)&&(h=0),h+=p);const b=!E(o)&&!d?o:h;let m=e.getPixelForValue(b);if(this.chart.getDataVisibility(t)?g=e.getPixelForValue(h+u):g=m,f=g-m,Math.abs(f)<a){f=Gl(f,e,r)*a,p===r&&(m-=f/2);const x=e.getPixelForDecimal(0),w=e.getPixelForDecimal(1),y=Math.min(x,w),v=Math.max(x,w);m=Math.max(Math.min(m,v),y),g=m+f,s&&!d&&(l._stacks[e.axis]._visualValues[n]=e.getValueForPixel(g)-e.getValueForPixel(m))}if(m===e.getPixelForValue(r)){const x=_t(f)*e.getLineWidthForValue(r)/2;m+=x,f-=x}return{size:f,base:m,head:g,center:g+f/2}}_calculateBarIndexPixels(t,e){const s=e.scale,n=this.options,o=n.skipNull,a=D(n.maxBarThickness,1/0);let r,l;const c=this._getAxisCount();if(e.grouped){const d=o?this._getStackCount(t):e.stackCount,p=n.barThickness==="flex"?Hl(t,e,n,d*c):Nl(t,e,n,d*c),h=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,u=this._getAxis().indexOf(D(h,this.getFirstScaleIdForIndexAxis())),g=this._getStackIndex(this.index,this._cachedMeta.stack,o?t:void 0)+u;r=p.start+p.chunk*g+p.chunk/2,l=Math.min(a,p.chunk*p.ratio)}else r=s.getPixelForValue(this.getParsed(t)[s.axis],t),l=Math.min(a,e.min*e.ratio);return{base:r-l/2,head:r+l/2,center:r,size:l}}draw(){const t=this._cachedMeta,e=t.vScale,s=t.data,n=s.length;let o=0;for(;o<n;++o)this.getParsed(o)[e.axis]!==null&&!s[o].hidden&&s[o].draw(this._ctx)}}_(ti,"id","bar"),_(ti,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),_(ti,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class ei extends mt{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,s,n){const o=super.parsePrimitiveData(t,e,s,n);for(let a=0;a<o.length;a++)o[a]._custom=this.resolveDataElementOptions(a+s).radius;return o}parseArrayData(t,e,s,n){const o=super.parseArrayData(t,e,s,n);for(let a=0;a<o.length;a++){const r=e[s+a];o[a]._custom=D(r[2],this.resolveDataElementOptions(a+s).radius)}return o}parseObjectData(t,e,s,n){const o=super.parseObjectData(t,e,s,n);for(let a=0;a<o.length;a++){const r=e[s+a];o[a]._custom=D(r&&r.r&&+r.r,this.resolveDataElementOptions(a+s).radius)}return o}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let s=t.length-1;s>=0;--s)e=Math.max(e,t[s].size(this.resolveDataElementOptions(s))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart.data.labels||[],{xScale:n,yScale:o}=e,a=this.getParsed(t),r=n.getLabelForValue(a.x),l=o.getLabelForValue(a.y),c=a._custom;return{label:s[t]||"",value:"("+r+", "+l+(c?", "+c:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,s,n){const o=n==="reset",{iScale:a,vScale:r}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(e,n),d=a.axis,p=r.axis;for(let h=e;h<e+s;h++){const u=t[h],g=!o&&this.getParsed(h),f={},b=f[d]=o?a.getPixelForDecimal(.5):a.getPixelForValue(g[d]),m=f[p]=o?r.getBasePixel():r.getPixelForValue(g[p]);f.skip=isNaN(b)||isNaN(m),c&&(f.options=l||this.resolveDataElementOptions(h,u.active?"active":n),o&&(f.options.radius=0)),this.updateElement(u,h,f,n)}}resolveDataElementOptions(t,e){const s=this.getParsed(t);let n=super.resolveDataElementOptions(t,e);n.$shared&&(n=Object.assign({},n,{$shared:!1}));const o=n.radius;return e!=="active"&&(n.radius=0),n.radius+=D(s&&s._custom,o),n}}_(ei,"id","bubble"),_(ei,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),_(ei,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function Kl(i,t,e){let s=1,n=1,o=0,a=0;if(t<H){const r=i,l=r+t,c=Math.cos(r),d=Math.sin(r),p=Math.cos(l),h=Math.sin(l),u=(w,y,v)=>De(w,r,l,!0)?1:Math.max(y,y*e,v,v*e),g=(w,y,v)=>De(w,r,l,!0)?-1:Math.min(y,y*e,v,v*e),f=u(0,c,p),b=u(J,d,h),m=g(F,c,p),x=g(F+J,d,h);s=(f-m)/2,n=(b-x)/2,o=-(f+m)/2,a=-(b+x)/2}return{ratioX:s,ratioY:n,offsetX:o,offsetY:a}}class qt extends mt{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const s=this.getDataset().data,n=this._cachedMeta;if(this._parsing===!1)n._parsed=s;else{let o=l=>+s[l];if(L(s[t])){const{key:l="value"}=this._parsing;o=c=>+It(s[c],l)}let a,r;for(a=t,r=t+e;a<r;++a)n._parsed[a]=o(a)}}_getRotation(){return bt(this.options.rotation-90)}_getCircumference(){return bt(this.options.circumference)}_getRotationExtents(){let t=H,e=-H;for(let s=0;s<this.chart.data.datasets.length;++s)if(this.chart.isDatasetVisible(s)&&this.chart.getDatasetMeta(s).type===this._type){const n=this.chart.getDatasetMeta(s).controller,o=n._getRotation(),a=n._getCircumference();t=Math.min(t,o),e=Math.max(e,o+a)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:s}=e,n=this._cachedMeta,o=n.data,a=this.getMaxBorderWidth()+this.getMaxOffset(o)+this.options.spacing,r=Math.max((Math.min(s.width,s.height)-a)/2,0),l=Math.min(lr(this.options.cutout,r),1),c=this._getRingWeight(this.index),{circumference:d,rotation:p}=this._getRotationExtents(),{ratioX:h,ratioY:u,offsetX:g,offsetY:f}=Kl(p,d,l),b=(s.width-a)/h,m=(s.height-a)/u,x=Math.max(Math.min(b,m)/2,0),w=Ao(this.options.radius,x),y=Math.max(w*l,0),v=(w-y)/this._getVisibleDatasetWeightTotal();this.offsetX=g*w,this.offsetY=f*w,n.total=this.calculateTotal(),this.outerRadius=w-v*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-v*c,0),this.updateElements(o,0,o.length,t)}_circumference(t,e){const s=this.options,n=this._cachedMeta,o=this._getCircumference();return e&&s.animation.animateRotate||!this.chart.getDataVisibility(t)||n._parsed[t]===null||n.data[t].hidden?0:this.calculateCircumference(n._parsed[t]*o/H)}updateElements(t,e,s,n){const o=n==="reset",a=this.chart,r=a.chartArea,c=a.options.animation,d=(r.left+r.right)/2,p=(r.top+r.bottom)/2,h=o&&c.animateScale,u=h?0:this.innerRadius,g=h?0:this.outerRadius,{sharedOptions:f,includeOptions:b}=this._getSharedOptions(e,n);let m=this._getRotation(),x;for(x=0;x<e;++x)m+=this._circumference(x,o);for(x=e;x<e+s;++x){const w=this._circumference(x,o),y=t[x],v={x:d+this.offsetX,y:p+this.offsetY,startAngle:m,endAngle:m+w,circumference:w,outerRadius:g,innerRadius:u};b&&(v.options=f||this.resolveDataElementOptions(x,y.active?"active":n)),m+=w,this.updateElement(y,x,v,n)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let s=0,n;for(n=0;n<e.length;n++){const o=t._parsed[n];o!==null&&!isNaN(o)&&this.chart.getDataVisibility(n)&&!e[n].hidden&&(s+=Math.abs(o))}return s}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?H*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart,n=s.data.labels||[],o=Fe(e._parsed[t],s.options.locale);return{label:n[t]||"",value:o}}getMaxBorderWidth(t){let e=0;const s=this.chart;let n,o,a,r,l;if(!t){for(n=0,o=s.data.datasets.length;n<o;++n)if(s.isDatasetVisible(n)){a=s.getDatasetMeta(n),t=a.data,r=a.controller;break}}if(!t)return 0;for(n=0,o=t.length;n<o;++n)l=r.resolveDataElementOptions(n),l.borderAlign!=="inner"&&(e=Math.max(e,l.borderWidth||0,l.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let s=0,n=t.length;s<n;++s){const o=this.resolveDataElementOptions(s);e=Math.max(e,o.offset||0,o.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let s=0;s<t;++s)this.chart.isDatasetVisible(s)&&(e+=this._getRingWeight(s));return e}_getRingWeight(t){return Math.max(D(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}_(qt,"id","doughnut"),_(qt,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),_(qt,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),_(qt,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:s,textAlign:n,color:o,useBorderRadius:a,borderRadius:r}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((l,c)=>{const p=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:p.backgroundColor,fontColor:o,hidden:!t.getDataVisibility(c),lineDash:p.borderDash,lineDashOffset:p.borderDashOffset,lineJoin:p.borderJoinStyle,lineWidth:p.borderWidth,strokeStyle:p.borderColor,textAlign:n,pointStyle:s,borderRadius:a&&(r||p.borderRadius),index:c}}):[]}},onClick(t,e,s){s.chart.toggleDataVisibility(e.index),s.chart.update()}}}});class ii extends mt{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:s,data:n=[],_dataset:o}=e,a=this.chart._animationsDisabled;let{start:r,count:l}=Fo(e,n,a);this._drawStart=r,this._drawCount=l,jo(e)&&(r=0,l=n.length),s._chart=this.chart,s._datasetIndex=this.index,s._decimated=!!o._decimated,s.points=n;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(s,void 0,{animated:!a,options:c},t),this.updateElements(n,r,l,t)}updateElements(t,e,s,n){const o=n==="reset",{iScale:a,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:p}=this._getSharedOptions(e,n),h=a.axis,u=r.axis,{spanGaps:g,segment:f}=this.options,b=re(g)?g:Number.POSITIVE_INFINITY,m=this.chart._animationsDisabled||o||n==="none",x=e+s,w=t.length;let y=e>0&&this.getParsed(e-1);for(let v=0;v<w;++v){const k=t[v],$=m?k:{};if(v<e||v>=x){$.skip=!0;continue}const M=this.getParsed(v),S=E(M[u]),T=$[h]=a.getPixelForValue(M[h],v),O=$[u]=o||S?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,M,l):M[u],v);$.skip=isNaN(T)||isNaN(O)||S,$.stop=v>0&&Math.abs(M[h]-y[h])>b,f&&($.parsed=M,$.raw=c.data[v]),p&&($.options=d||this.resolveDataElementOptions(v,k.active?"active":n)),m||this.updateElement(k,v,$,n),y=M}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,s=e.options&&e.options.borderWidth||0,n=t.data||[];if(!n.length)return s;const o=n[0].size(this.resolveDataElementOptions(0)),a=n[n.length-1].size(this.resolveDataElementOptions(n.length-1));return Math.max(s,o,a)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}_(ii,"id","line"),_(ii,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),_(ii,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class ze extends mt{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart,n=s.data.labels||[],o=Fe(e._parsed[t].r,s.options.locale);return{label:n[t]||"",value:o}}parseObjectData(t,e,s,n){return Uo.bind(this)(t,e,s,n)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((s,n)=>{const o=this.getParsed(n).r;!isNaN(o)&&this.chart.getDataVisibility(n)&&(o<e.min&&(e.min=o),o>e.max&&(e.max=o))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,s=t.options,n=Math.min(e.right-e.left,e.bottom-e.top),o=Math.max(n/2,0),a=Math.max(s.cutoutPercentage?o/100*s.cutoutPercentage:1,0),r=(o-a)/t.getVisibleDatasetCount();this.outerRadius=o-r*this.index,this.innerRadius=this.outerRadius-r}updateElements(t,e,s,n){const o=n==="reset",a=this.chart,l=a.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,p=c.yCenter,h=c.getIndexAngle(0)-.5*F;let u=h,g;const f=360/this.countVisibleElements();for(g=0;g<e;++g)u+=this._computeAngle(g,n,f);for(g=e;g<e+s;g++){const b=t[g];let m=u,x=u+this._computeAngle(g,n,f),w=a.getDataVisibility(g)?c.getDistanceFromCenterForValue(this.getParsed(g).r):0;u=x,o&&(l.animateScale&&(w=0),l.animateRotate&&(m=x=h));const y={x:d,y:p,innerRadius:0,outerRadius:w,startAngle:m,endAngle:x,options:this.resolveDataElementOptions(g,b.active?"active":n)};this.updateElement(b,g,y,n)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((s,n)=>{!isNaN(this.getParsed(n).r)&&this.chart.getDataVisibility(n)&&e++}),e}_computeAngle(t,e,s){return this.chart.getDataVisibility(t)?bt(this.resolveDataElementOptions(t,e).angle||s):0}}_(ze,"id","polarArea"),_(ze,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),_(ze,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:s,color:n}}=t.legend.options;return e.labels.map((o,a)=>{const l=t.getDatasetMeta(0).controller.getStyle(a);return{text:o,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:n,lineWidth:l.borderWidth,pointStyle:s,hidden:!t.getDataVisibility(a),index:a}})}return[]}},onClick(t,e,s){s.chart.toggleDataVisibility(e.index),s.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class es extends qt{}_(es,"id","pie"),_(es,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class si extends mt{getLabelAndValue(t){const e=this._cachedMeta.vScale,s=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(s[e.axis])}}parseObjectData(t,e,s,n){return Uo.bind(this)(t,e,s,n)}update(t){const e=this._cachedMeta,s=e.dataset,n=e.data||[],o=e.iScale.getLabels();if(s.points=n,t!=="resize"){const a=this.resolveDatasetElementOptions(t);this.options.showLine||(a.borderWidth=0);const r={_loop:!0,_fullLoop:o.length===n.length,options:a};this.updateElement(s,void 0,r,t)}this.updateElements(n,0,n.length,t)}updateElements(t,e,s,n){const o=this._cachedMeta.rScale,a=n==="reset";for(let r=e;r<e+s;r++){const l=t[r],c=this.resolveDataElementOptions(r,l.active?"active":n),d=o.getPointPositionForValue(r,this.getParsed(r).r),p=a?o.xCenter:d.x,h=a?o.yCenter:d.y,u={x:p,y:h,angle:d.angle,skip:isNaN(p)||isNaN(h),options:c};this.updateElement(l,r,u,n)}}}_(si,"id","radar"),_(si,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),_(si,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class ni extends mt{getLabelAndValue(t){const e=this._cachedMeta,s=this.chart.data.labels||[],{xScale:n,yScale:o}=e,a=this.getParsed(t),r=n.getLabelForValue(a.x),l=o.getLabelForValue(a.y);return{label:s[t]||"",value:"("+r+", "+l+")"}}update(t){const e=this._cachedMeta,{data:s=[]}=e,n=this.chart._animationsDisabled;let{start:o,count:a}=Fo(e,s,n);if(this._drawStart=o,this._drawCount=a,jo(e)&&(o=0,a=s.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:r,_dataset:l}=e;r._chart=this.chart,r._datasetIndex=this.index,r._decimated=!!l._decimated,r.points=s;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(r,void 0,{animated:!n,options:c},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(s,o,a,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,s,n){const o=n==="reset",{iScale:a,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(e,n),p=this.getSharedOptions(d),h=this.includeOptions(n,p),u=a.axis,g=r.axis,{spanGaps:f,segment:b}=this.options,m=re(f)?f:Number.POSITIVE_INFINITY,x=this.chart._animationsDisabled||o||n==="none";let w=e>0&&this.getParsed(e-1);for(let y=e;y<e+s;++y){const v=t[y],k=this.getParsed(y),$=x?v:{},M=E(k[g]),S=$[u]=a.getPixelForValue(k[u],y),T=$[g]=o||M?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,k,l):k[g],y);$.skip=isNaN(S)||isNaN(T)||M,$.stop=y>0&&Math.abs(k[u]-w[u])>m,b&&($.parsed=k,$.raw=c.data[y]),h&&($.options=p||this.resolveDataElementOptions(y,v.active?"active":n)),x||this.updateElement(v,y,$,n),w=k}this.updateSharedOptions(p,n,d)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let r=0;for(let l=e.length-1;l>=0;--l)r=Math.max(r,e[l].size(this.resolveDataElementOptions(l))/2);return r>0&&r}const s=t.dataset,n=s.options&&s.options.borderWidth||0;if(!e.length)return n;const o=e[0].size(this.resolveDataElementOptions(0)),a=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(n,o,a)/2}}_(ni,"id","scatter"),_(ni,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),_(ni,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var Jl=Object.freeze({__proto__:null,BarController:ti,BubbleController:ei,DoughnutController:qt,LineController:ii,PieController:es,PolarAreaController:ze,RadarController:si,ScatterController:ni});function Gt(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class zs{constructor(t){_(this,"options");this.options=t||{}}static override(t){Object.assign(zs.prototype,t)}init(){}formats(){return Gt()}parse(){return Gt()}format(){return Gt()}add(){return Gt()}diff(){return Gt()}startOf(){return Gt()}endOf(){return Gt()}}var Zl={_date:zs};function Ql(i,t,e,s){const{controller:n,data:o,_sorted:a}=i,r=n._cachedMeta.iScale,l=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null;if(r&&t===r.axis&&t!=="r"&&a&&o.length){const c=r._reversePixels?wr:zt;if(s){if(n._sharedOptions){const d=o[0],p=typeof d.getRange=="function"&&d.getRange(t);if(p){const h=c(o,t,e-p),u=c(o,t,e+p);return{lo:h.lo,hi:u.hi}}}}else{const d=c(o,t,e);if(l){const{vScale:p}=n._cachedMeta,{_parsed:h}=i,u=h.slice(0,d.lo+1).reverse().findIndex(f=>!E(f[p.axis]));d.lo-=Math.max(0,u);const g=h.slice(d.hi).findIndex(f=>!E(f[p.axis]));d.hi+=Math.max(0,g)}return d}}return{lo:0,hi:o.length-1}}function _i(i,t,e,s,n){const o=i.getSortedVisibleDatasetMetas(),a=e[t];for(let r=0,l=o.length;r<l;++r){const{index:c,data:d}=o[r],{lo:p,hi:h}=Ql(o[r],t,a,n);for(let u=p;u<=h;++u){const g=d[u];g.skip||s(g,c,u)}}}function tc(i){const t=i.indexOf("x")!==-1,e=i.indexOf("y")!==-1;return function(s,n){const o=t?Math.abs(s.x-n.x):0,a=e?Math.abs(s.y-n.y):0;return Math.sqrt(Math.pow(o,2)+Math.pow(a,2))}}function Ii(i,t,e,s,n){const o=[];return!n&&!i.isPointInArea(t)||_i(i,e,t,function(r,l,c){!n&&!Pt(r,i.chartArea,0)||r.inRange(t.x,t.y,s)&&o.push({element:r,datasetIndex:l,index:c})},!0),o}function ec(i,t,e,s){let n=[];function o(a,r,l){const{startAngle:c,endAngle:d}=a.getProps(["startAngle","endAngle"],s),{angle:p}=To(a,{x:t.x,y:t.y});De(p,c,d)&&n.push({element:a,datasetIndex:r,index:l})}return _i(i,e,t,o),n}function ic(i,t,e,s,n,o){let a=[];const r=tc(e);let l=Number.POSITIVE_INFINITY;function c(d,p,h){const u=d.inRange(t.x,t.y,n);if(s&&!u)return;const g=d.getCenterPoint(n);if(!(!!o||i.isPointInArea(g))&&!u)return;const b=r(t,g);b<l?(a=[{element:d,datasetIndex:p,index:h}],l=b):b===l&&a.push({element:d,datasetIndex:p,index:h})}return _i(i,e,t,c),a}function Fi(i,t,e,s,n,o){return!o&&!i.isPointInArea(t)?[]:e==="r"&&!s?ec(i,t,e,n):ic(i,t,e,s,n,o)}function un(i,t,e,s,n){const o=[],a=e==="x"?"inXRange":"inYRange";let r=!1;return _i(i,e,t,(l,c,d)=>{l[a]&&l[a](t[e],n)&&(o.push({element:l,datasetIndex:c,index:d}),r=r||l.inRange(t.x,t.y,n))}),s&&!r?[]:o}var sc={modes:{index(i,t,e,s){const n=Ut(t,i),o=e.axis||"x",a=e.includeInvisible||!1,r=e.intersect?Ii(i,n,o,s,a):Fi(i,n,o,!1,s,a),l=[];return r.length?(i.getSortedVisibleDatasetMetas().forEach(c=>{const d=r[0].index,p=c.data[d];p&&!p.skip&&l.push({element:p,datasetIndex:c.index,index:d})}),l):[]},dataset(i,t,e,s){const n=Ut(t,i),o=e.axis||"xy",a=e.includeInvisible||!1;let r=e.intersect?Ii(i,n,o,s,a):Fi(i,n,o,!1,s,a);if(r.length>0){const l=r[0].datasetIndex,c=i.getDatasetMeta(l).data;r=[];for(let d=0;d<c.length;++d)r.push({element:c[d],datasetIndex:l,index:d})}return r},point(i,t,e,s){const n=Ut(t,i),o=e.axis||"xy",a=e.includeInvisible||!1;return Ii(i,n,o,s,a)},nearest(i,t,e,s){const n=Ut(t,i),o=e.axis||"xy",a=e.includeInvisible||!1;return Fi(i,n,o,e.intersect,s,a)},x(i,t,e,s){const n=Ut(t,i);return un(i,n,"x",e.intersect,s)},y(i,t,e,s){const n=Ut(t,i);return un(i,n,"y",e.intersect,s)}}};const na=["left","top","right","bottom"];function ue(i,t){return i.filter(e=>e.pos===t)}function gn(i,t){return i.filter(e=>na.indexOf(e.pos)===-1&&e.box.axis===t)}function ge(i,t){return i.sort((e,s)=>{const n=t?s:e,o=t?e:s;return n.weight===o.weight?n.index-o.index:n.weight-o.weight})}function nc(i){const t=[];let e,s,n,o,a,r;for(e=0,s=(i||[]).length;e<s;++e)n=i[e],{position:o,options:{stack:a,stackWeight:r=1}}=n,t.push({index:e,box:n,pos:o,horizontal:n.isHorizontal(),weight:n.weight,stack:a&&o+a,stackWeight:r});return t}function oc(i){const t={};for(const e of i){const{stack:s,pos:n,stackWeight:o}=e;if(!s||!na.includes(n))continue;const a=t[s]||(t[s]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=o}return t}function ac(i,t){const e=oc(i),{vBoxMaxWidth:s,hBoxMaxHeight:n}=t;let o,a,r;for(o=0,a=i.length;o<a;++o){r=i[o];const{fullSize:l}=r.box,c=e[r.stack],d=c&&r.stackWeight/c.weight;r.horizontal?(r.width=d?d*s:l&&t.availableWidth,r.height=n):(r.width=s,r.height=d?d*n:l&&t.availableHeight)}return e}function rc(i){const t=nc(i),e=ge(t.filter(c=>c.box.fullSize),!0),s=ge(ue(t,"left"),!0),n=ge(ue(t,"right")),o=ge(ue(t,"top"),!0),a=ge(ue(t,"bottom")),r=gn(t,"x"),l=gn(t,"y");return{fullSize:e,leftAndTop:s.concat(o),rightAndBottom:n.concat(l).concat(a).concat(r),chartArea:ue(t,"chartArea"),vertical:s.concat(n).concat(l),horizontal:o.concat(a).concat(r)}}function fn(i,t,e,s){return Math.max(i[e],t[e])+Math.max(i[s],t[s])}function oa(i,t){i.top=Math.max(i.top,t.top),i.left=Math.max(i.left,t.left),i.bottom=Math.max(i.bottom,t.bottom),i.right=Math.max(i.right,t.right)}function lc(i,t,e,s){const{pos:n,box:o}=e,a=i.maxPadding;if(!L(n)){e.size&&(i[n]-=e.size);const p=s[e.stack]||{size:0,count:1};p.size=Math.max(p.size,e.horizontal?o.height:o.width),e.size=p.size/p.count,i[n]+=e.size}o.getPadding&&oa(a,o.getPadding());const r=Math.max(0,t.outerWidth-fn(a,i,"left","right")),l=Math.max(0,t.outerHeight-fn(a,i,"top","bottom")),c=r!==i.w,d=l!==i.h;return i.w=r,i.h=l,e.horizontal?{same:c,other:d}:{same:d,other:c}}function cc(i){const t=i.maxPadding;function e(s){const n=Math.max(t[s]-i[s],0);return i[s]+=n,n}i.y+=e("top"),i.x+=e("left"),e("right"),e("bottom")}function dc(i,t){const e=t.maxPadding;function s(n){const o={left:0,top:0,right:0,bottom:0};return n.forEach(a=>{o[a]=Math.max(t[a],e[a])}),o}return s(i?["left","right"]:["top","bottom"])}function ye(i,t,e,s){const n=[];let o,a,r,l,c,d;for(o=0,a=i.length,c=0;o<a;++o){r=i[o],l=r.box,l.update(r.width||t.w,r.height||t.h,dc(r.horizontal,t));const{same:p,other:h}=lc(t,e,r,s);c|=p&&n.length,d=d||h,l.fullSize||n.push(r)}return c&&ye(n,t,e,s)||d}function Ue(i,t,e,s,n){i.top=e,i.left=t,i.right=t+s,i.bottom=e+n,i.width=s,i.height=n}function bn(i,t,e,s){const n=e.padding;let{x:o,y:a}=t;for(const r of i){const l=r.box,c=s[r.stack]||{placed:0,weight:1},d=r.stackWeight/c.weight||1;if(r.horizontal){const p=t.w*d,h=c.size||l.height;Re(c.start)&&(a=c.start),l.fullSize?Ue(l,n.left,a,e.outerWidth-n.right-n.left,h):Ue(l,t.left+c.placed,a,p,h),c.start=a,c.placed+=p,a=l.bottom}else{const p=t.h*d,h=c.size||l.width;Re(c.start)&&(o=c.start),l.fullSize?Ue(l,o,n.top,h,e.outerHeight-n.bottom-n.top):Ue(l,o,t.top+c.placed,h,p),c.start=o,c.placed+=p,o=l.right}}t.x=o,t.y=a}var at={addBox(i,t){i.boxes||(i.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},i.boxes.push(t)},removeBox(i,t){const e=i.boxes?i.boxes.indexOf(t):-1;e!==-1&&i.boxes.splice(e,1)},configure(i,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(i,t,e,s){if(!i)return;const n=rt(i.options.layout.padding),o=Math.max(t-n.width,0),a=Math.max(e-n.height,0),r=rc(i.boxes),l=r.vertical,c=r.horizontal;B(i.boxes,f=>{typeof f.beforeLayout=="function"&&f.beforeLayout()});const d=l.reduce((f,b)=>b.box.options&&b.box.options.display===!1?f:f+1,0)||1,p=Object.freeze({outerWidth:t,outerHeight:e,padding:n,availableWidth:o,availableHeight:a,vBoxMaxWidth:o/2/d,hBoxMaxHeight:a/2}),h=Object.assign({},n);oa(h,rt(s));const u=Object.assign({maxPadding:h,w:o,h:a,x:n.left,y:n.top},n),g=ac(l.concat(c),p);ye(r.fullSize,u,p,g),ye(l,u,p,g),ye(c,u,p,g)&&ye(l,u,p,g),cc(u),bn(r.leftAndTop,u,p,g),u.x+=u.w,u.y+=u.h,bn(r.rightAndBottom,u,p,g),i.chartArea={left:u.left,top:u.top,right:u.left+u.w,bottom:u.top+u.h,height:u.h,width:u.w},B(r.chartArea,f=>{const b=f.box;Object.assign(b,i.chartArea),b.update(u.w,u.h,{left:0,top:0,right:0,bottom:0})})}};class aa{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,s){}removeEventListener(t,e,s){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,s,n){return e=Math.max(0,e||t.width),s=s||t.height,{width:e,height:Math.max(0,n?Math.floor(e/n):s)}}isAttached(t){return!0}updateConfig(t){}}class pc extends aa{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const oi="$chartjs",hc={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},mn=i=>i===null||i==="";function uc(i,t){const e=i.style,s=i.getAttribute("height"),n=i.getAttribute("width");if(i[oi]={initial:{height:s,width:n,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",mn(n)){const o=Qs(i,"width");o!==void 0&&(i.width=o)}if(mn(s))if(i.style.height==="")i.height=i.width/(t||2);else{const o=Qs(i,"height");o!==void 0&&(i.height=o)}return i}const ra=gl?{passive:!0}:!1;function gc(i,t,e){i&&i.addEventListener(t,e,ra)}function fc(i,t,e){i&&i.canvas&&i.canvas.removeEventListener(t,e,ra)}function bc(i,t){const e=hc[i.type]||i.type,{x:s,y:n}=Ut(i,t);return{type:e,chart:t,native:i,x:s!==void 0?s:null,y:n!==void 0?n:null}}function gi(i,t){for(const e of i)if(e===t||e.contains(t))return!0}function mc(i,t,e){const s=i.canvas,n=new MutationObserver(o=>{let a=!1;for(const r of o)a=a||gi(r.addedNodes,s),a=a&&!gi(r.removedNodes,s);a&&e()});return n.observe(document,{childList:!0,subtree:!0}),n}function xc(i,t,e){const s=i.canvas,n=new MutationObserver(o=>{let a=!1;for(const r of o)a=a||gi(r.removedNodes,s),a=a&&!gi(r.addedNodes,s);a&&e()});return n.observe(document,{childList:!0,subtree:!0}),n}const Oe=new Map;let xn=0;function la(){const i=window.devicePixelRatio;i!==xn&&(xn=i,Oe.forEach((t,e)=>{e.currentDevicePixelRatio!==i&&t()}))}function vc(i,t){Oe.size||window.addEventListener("resize",la),Oe.set(i,t)}function yc(i){Oe.delete(i),Oe.size||window.removeEventListener("resize",la)}function wc(i,t,e){const s=i.canvas,n=s&&Cs(s);if(!n)return;const o=Io((r,l)=>{const c=n.clientWidth;e(r,l),c<n.clientWidth&&e()},window),a=new ResizeObserver(r=>{const l=r[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||o(c,d)});return a.observe(n),vc(i,o),a}function ji(i,t,e){e&&e.disconnect(),t==="resize"&&yc(i)}function _c(i,t,e){const s=i.canvas,n=Io(o=>{i.ctx!==null&&e(bc(o,i))},i);return gc(s,t,n),n}class kc extends aa{acquireContext(t,e){const s=t&&t.getContext&&t.getContext("2d");return s&&s.canvas===t?(uc(t,e),s):null}releaseContext(t){const e=t.canvas;if(!e[oi])return!1;const s=e[oi].initial;["height","width"].forEach(o=>{const a=s[o];E(a)?e.removeAttribute(o):e.setAttribute(o,a)});const n=s.style||{};return Object.keys(n).forEach(o=>{e.style[o]=n[o]}),e.width=e.width,delete e[oi],!0}addEventListener(t,e,s){this.removeEventListener(t,e);const n=t.$proxies||(t.$proxies={}),a={attach:mc,detach:xc,resize:wc}[e]||_c;n[e]=a(t,e,s)}removeEventListener(t,e){const s=t.$proxies||(t.$proxies={}),n=s[e];if(!n)return;({attach:ji,detach:ji,resize:ji}[e]||fc)(t,e,n),s[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,s,n){return ul(t,e,s,n)}isAttached(t){const e=t&&Cs(t);return!!(e&&e.isConnected)}}function $c(i){return!Ss()||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas?pc:kc}class xt{constructor(){_(this,"x");_(this,"y");_(this,"active",!1);_(this,"options");_(this,"$animations")}tooltipPosition(t){const{x:e,y:s}=this.getProps(["x","y"],t);return{x:e,y:s}}hasValue(){return re(this.x)&&re(this.y)}getProps(t,e){const s=this.$animations;if(!e||!s)return this;const n={};return t.forEach(o=>{n[o]=s[o]&&s[o].active()?s[o]._to:this[o]}),n}}_(xt,"defaults",{}),_(xt,"defaultRoutes");function Mc(i,t){const e=i.options.ticks,s=Sc(i),n=Math.min(e.maxTicksLimit||s,s),o=e.major.enabled?zc(t):[],a=o.length,r=o[0],l=o[a-1],c=[];if(a>n)return Pc(t,c,o,a/n),c;const d=Cc(o,t,n);if(a>0){let p,h;const u=a>1?Math.round((l-r)/(a-1)):null;for(Xe(t,c,d,E(u)?0:r-u,r),p=0,h=a-1;p<h;p++)Xe(t,c,d,o[p],o[p+1]);return Xe(t,c,d,l,E(u)?t.length:l+u),c}return Xe(t,c,d),c}function Sc(i){const t=i.options.offset,e=i._tickSize(),s=i._length/e+(t?0:1),n=i._maxLength/e;return Math.floor(Math.min(s,n))}function Cc(i,t,e){const s=Ac(i),n=t.length/e;if(!s)return Math.max(n,1);const o=br(s);for(let a=0,r=o.length-1;a<r;a++){const l=o[a];if(l>n)return l}return Math.max(n,1)}function zc(i){const t=[];let e,s;for(e=0,s=i.length;e<s;e++)i[e].major&&t.push(e);return t}function Pc(i,t,e,s){let n=0,o=e[0],a;for(s=Math.ceil(s),a=0;a<i.length;a++)a===o&&(t.push(i[a]),n++,o=e[n*s])}function Xe(i,t,e,s,n){const o=D(s,0),a=Math.min(D(n,i.length),i.length);let r=0,l,c,d;for(e=Math.ceil(e),n&&(l=n-s,e=l/Math.floor(l/e)),d=o;d<0;)r++,d=Math.round(o+r*e);for(c=Math.max(o,0);c<a;c++)c===d&&(t.push(i[c]),r++,d=Math.round(o+r*e))}function Ac(i){const t=i.length;let e,s;if(t<2)return!1;for(s=i[0],e=1;e<t;++e)if(i[e]-i[e-1]!==s)return!1;return s}const Rc=i=>i==="left"?"right":i==="right"?"left":i,vn=(i,t,e)=>t==="top"||t==="left"?i[t]+e:i[t]-e,yn=(i,t)=>Math.min(t||i,i);function wn(i,t){const e=[],s=i.length/t,n=i.length;let o=0;for(;o<n;o+=s)e.push(i[Math.floor(o)]);return e}function Dc(i,t,e){const s=i.ticks.length,n=Math.min(t,s-1),o=i._startPixel,a=i._endPixel,r=1e-6;let l=i.getPixelForTick(n),c;if(!(e&&(s===1?c=Math.max(l-o,a-l):t===0?c=(i.getPixelForTick(1)-l)/2:c=(l-i.getPixelForTick(n-1))/2,l+=n<t?c:-c,l<o-r||l>a+r)))return l}function Tc(i,t){B(i,e=>{const s=e.gc,n=s.length/2;let o;if(n>t){for(o=0;o<n;++o)delete e.data[s[o]];s.splice(0,n)}})}function fe(i){return i.drawTicks?i.tickLength:0}function _n(i,t){if(!i.display)return 0;const e=Q(i.font,t),s=rt(i.padding);return(G(i.text)?i.text.length:1)*e.lineHeight+s.height}function Oc(i,t){return jt(i,{scale:t,type:"scale"})}function Ec(i,t,e){return jt(i,{tick:e,index:t,type:"tick"})}function Lc(i,t,e){let s=ys(i);return(e&&t!=="right"||!e&&t==="right")&&(s=Rc(s)),s}function Ic(i,t,e,s){const{top:n,left:o,bottom:a,right:r,chart:l}=i,{chartArea:c,scales:d}=l;let p=0,h,u,g;const f=a-n,b=r-o;if(i.isHorizontal()){if(u=nt(s,o,r),L(e)){const m=Object.keys(e)[0],x=e[m];g=d[m].getPixelForValue(x)+f-t}else e==="center"?g=(c.bottom+c.top)/2+f-t:g=vn(i,e,t);h=r-o}else{if(L(e)){const m=Object.keys(e)[0],x=e[m];u=d[m].getPixelForValue(x)-b+t}else e==="center"?u=(c.left+c.right)/2-b+t:u=vn(i,e,t);g=nt(s,a,n),p=e==="left"?-J:J}return{titleX:u,titleY:g,maxWidth:h,rotation:p}}class ee extends xt{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:s,_suggestedMax:n}=this;return t=ht(t,Number.POSITIVE_INFINITY),e=ht(e,Number.NEGATIVE_INFINITY),s=ht(s,Number.POSITIVE_INFINITY),n=ht(n,Number.NEGATIVE_INFINITY),{min:ht(t,s),max:ht(e,n),minDefined:q(t),maxDefined:q(e)}}getMinMax(t){let{min:e,max:s,minDefined:n,maxDefined:o}=this.getUserBounds(),a;if(n&&o)return{min:e,max:s};const r=this.getMatchingVisibleMetas();for(let l=0,c=r.length;l<c;++l)a=r[l].controller.getMinMax(this,t),n||(e=Math.min(e,a.min)),o||(s=Math.max(s,a.max));return e=o&&e>s?s:e,s=n&&e>s?e:s,{min:ht(e,ht(s,e)),max:ht(s,ht(e,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){N(this.options.beforeUpdate,[this])}update(t,e,s){const{beginAtZero:n,grace:o,ticks:a}=this.options,r=a.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=s=Object.assign({left:0,right:0,top:0,bottom:0},s),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+s.left+s.right:this.height+s.top+s.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Gr(this,o,n),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=r<this.ticks.length;this._convertTicksToLabels(l?wn(this.ticks,r):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source==="auto")&&(this.ticks=Mc(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,s;this.isHorizontal()?(e=this.left,s=this.right):(e=this.top,s=this.bottom,t=!t),this._startPixel=e,this._endPixel=s,this._reversePixels=t,this._length=s-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){N(this.options.afterUpdate,[this])}beforeSetDimensions(){N(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){N(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),N(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){N(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let s,n,o;for(s=0,n=t.length;s<n;s++)o=t[s],o.label=N(e.callback,[o.value,s,t],this)}afterTickToLabelConversion(){N(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){N(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,s=yn(this.ticks.length,t.ticks.maxTicksLimit),n=e.minRotation||0,o=e.maxRotation;let a=n,r,l,c;if(!this._isVisible()||!e.display||n>=o||s<=1||!this.isHorizontal()){this.labelRotation=n;return}const d=this._getLabelSizes(),p=d.widest.width,h=d.highest.height,u=et(this.chart.width-p,0,this.maxWidth);r=t.offset?this.maxWidth/s:u/(s-1),p+6>r&&(r=u/(s-(t.offset?.5:1)),l=this.maxHeight-fe(t.grid)-e.padding-_n(t.title,this.chart.options.font),c=Math.sqrt(p*p+h*h),a=xs(Math.min(Math.asin(et((d.highest.height+6)/r,-1,1)),Math.asin(et(l/c,-1,1))-Math.asin(et(h/c,-1,1)))),a=Math.max(n,Math.min(o,a))),this.labelRotation=a}afterCalculateLabelRotation(){N(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){N(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:s,title:n,grid:o}}=this,a=this._isVisible(),r=this.isHorizontal();if(a){const l=_n(n,e.options.font);if(r?(t.width=this.maxWidth,t.height=fe(o)+l):(t.height=this.maxHeight,t.width=fe(o)+l),s.display&&this.ticks.length){const{first:c,last:d,widest:p,highest:h}=this._getLabelSizes(),u=s.padding*2,g=bt(this.labelRotation),f=Math.cos(g),b=Math.sin(g);if(r){const m=s.mirror?0:b*p.width+f*h.height;t.height=Math.min(this.maxHeight,t.height+m+u)}else{const m=s.mirror?0:f*p.width+b*h.height;t.width=Math.min(this.maxWidth,t.width+m+u)}this._calculatePadding(c,d,b,f)}}this._handleMargins(),r?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,s,n){const{ticks:{align:o,padding:a},position:r}=this.options,l=this.labelRotation!==0,c=r!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,p=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,u=0;l?c?(h=n*t.width,u=s*e.height):(h=s*t.height,u=n*e.width):o==="start"?u=e.width:o==="end"?h=t.width:o!=="inner"&&(h=t.width/2,u=e.width/2),this.paddingLeft=Math.max((h-d+a)*this.width/(this.width-d),0),this.paddingRight=Math.max((u-p+a)*this.width/(this.width-p),0)}else{let d=e.height/2,p=t.height/2;o==="start"?(d=0,p=t.height):o==="end"&&(d=e.height,p=0),this.paddingTop=d+a,this.paddingBottom=p+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){N(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,s;for(e=0,s=t.length;e<s;e++)E(t[e].label)&&(t.splice(e,1),s--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let s=this.ticks;e<s.length&&(s=wn(s,e)),this._labelSizes=t=this._computeLabelSizes(s,s.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,s){const{ctx:n,_longestTextCache:o}=this,a=[],r=[],l=Math.floor(e/yn(e,s));let c=0,d=0,p,h,u,g,f,b,m,x,w,y,v;for(p=0;p<e;p+=l){if(g=t[p].label,f=this._resolveTickFontOptions(p),n.font=b=f.string,m=o[b]=o[b]||{data:{},gc:[]},x=f.lineHeight,w=y=0,!E(g)&&!G(g))w=hi(n,m.data,m.gc,w,g),y=x;else if(G(g))for(h=0,u=g.length;h<u;++h)v=g[h],!E(v)&&!G(v)&&(w=hi(n,m.data,m.gc,w,v),y+=x);a.push(w),r.push(y),c=Math.max(w,c),d=Math.max(y,d)}Tc(o,e);const k=a.indexOf(c),$=r.indexOf(d),M=S=>({width:a[S]||0,height:r[S]||0});return{first:M(0),last:M(e-1),widest:M(k),highest:M($),widths:a,heights:r}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return yr(this._alignToPixels?Wt(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const s=e[t];return s.$context||(s.$context=Ec(this.getContext(),t,s))}return this.$context||(this.$context=Oc(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=bt(this.labelRotation),s=Math.abs(Math.cos(e)),n=Math.abs(Math.sin(e)),o=this._getLabelSizes(),a=t.autoSkipPadding||0,r=o?o.widest.width+a:0,l=o?o.highest.height+a:0;return this.isHorizontal()?l*s>r*n?r/s:l/n:l*n<r*s?l/s:r/n}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,s=this.chart,n=this.options,{grid:o,position:a,border:r}=n,l=o.offset,c=this.isHorizontal(),p=this.ticks.length+(l?1:0),h=fe(o),u=[],g=r.setContext(this.getContext()),f=g.display?g.width:0,b=f/2,m=function(W){return Wt(s,W,f)};let x,w,y,v,k,$,M,S,T,O,I,it;if(a==="top")x=m(this.bottom),$=this.bottom-h,S=x-b,O=m(t.top)+b,it=t.bottom;else if(a==="bottom")x=m(this.top),O=t.top,it=m(t.bottom)-b,$=x+b,S=this.top+h;else if(a==="left")x=m(this.right),k=this.right-h,M=x-b,T=m(t.left)+b,I=t.right;else if(a==="right")x=m(this.left),T=t.left,I=m(t.right)-b,k=x+b,M=this.left+h;else if(e==="x"){if(a==="center")x=m((t.top+t.bottom)/2+.5);else if(L(a)){const W=Object.keys(a)[0],K=a[W];x=m(this.chart.scales[W].getPixelForValue(K))}O=t.top,it=t.bottom,$=x+b,S=$+h}else if(e==="y"){if(a==="center")x=m((t.left+t.right)/2);else if(L(a)){const W=Object.keys(a)[0],K=a[W];x=m(this.chart.scales[W].getPixelForValue(K))}k=x-b,M=k-h,T=t.left,I=t.right}const pt=D(n.ticks.maxTicksLimit,p),V=Math.max(1,Math.ceil(p/pt));for(w=0;w<p;w+=V){const W=this.getContext(w),K=o.setContext(W),ft=r.setContext(W),st=K.lineWidth,ie=K.color,Be=ft.dash||[],se=ft.dashOffset,de=K.tickWidth,Vt=K.tickColor,pe=K.tickBorderDash||[],Nt=K.tickBorderDashOffset;y=Dc(this,w,l),y!==void 0&&(v=Wt(s,y,st),c?k=M=T=I=v:$=S=O=it=v,u.push({tx1:k,ty1:$,tx2:M,ty2:S,x1:T,y1:O,x2:I,y2:it,width:st,color:ie,borderDash:Be,borderDashOffset:se,tickWidth:de,tickColor:Vt,tickBorderDash:pe,tickBorderDashOffset:Nt}))}return this._ticksLength=p,this._borderValue=x,u}_computeLabelItems(t){const e=this.axis,s=this.options,{position:n,ticks:o}=s,a=this.isHorizontal(),r=this.ticks,{align:l,crossAlign:c,padding:d,mirror:p}=o,h=fe(s.grid),u=h+d,g=p?-d:u,f=-bt(this.labelRotation),b=[];let m,x,w,y,v,k,$,M,S,T,O,I,it="middle";if(n==="top")k=this.bottom-g,$=this._getXAxisLabelAlignment();else if(n==="bottom")k=this.top+g,$=this._getXAxisLabelAlignment();else if(n==="left"){const V=this._getYAxisLabelAlignment(h);$=V.textAlign,v=V.x}else if(n==="right"){const V=this._getYAxisLabelAlignment(h);$=V.textAlign,v=V.x}else if(e==="x"){if(n==="center")k=(t.top+t.bottom)/2+u;else if(L(n)){const V=Object.keys(n)[0],W=n[V];k=this.chart.scales[V].getPixelForValue(W)+u}$=this._getXAxisLabelAlignment()}else if(e==="y"){if(n==="center")v=(t.left+t.right)/2-u;else if(L(n)){const V=Object.keys(n)[0],W=n[V];v=this.chart.scales[V].getPixelForValue(W)}$=this._getYAxisLabelAlignment(h).textAlign}e==="y"&&(l==="start"?it="top":l==="end"&&(it="bottom"));const pt=this._getLabelSizes();for(m=0,x=r.length;m<x;++m){w=r[m],y=w.label;const V=o.setContext(this.getContext(m));M=this.getPixelForTick(m)+o.labelOffset,S=this._resolveTickFontOptions(m),T=S.lineHeight,O=G(y)?y.length:1;const W=O/2,K=V.color,ft=V.textStrokeColor,st=V.textStrokeWidth;let ie=$;a?(v=M,$==="inner"&&(m===x-1?ie=this.options.reverse?"left":"right":m===0?ie=this.options.reverse?"right":"left":ie="center"),n==="top"?c==="near"||f!==0?I=-O*T+T/2:c==="center"?I=-pt.highest.height/2-W*T+T:I=-pt.highest.height+T/2:c==="near"||f!==0?I=T/2:c==="center"?I=pt.highest.height/2-W*T:I=pt.highest.height-O*T,p&&(I*=-1),f!==0&&!V.showLabelBackdrop&&(v+=T/2*Math.sin(f))):(k=M,I=(1-O)*T/2);let Be;if(V.showLabelBackdrop){const se=rt(V.backdropPadding),de=pt.heights[m],Vt=pt.widths[m];let pe=I-se.top,Nt=0-se.left;switch(it){case"middle":pe-=de/2;break;case"bottom":pe-=de;break}switch($){case"center":Nt-=Vt/2;break;case"right":Nt-=Vt;break;case"inner":m===x-1?Nt-=Vt:m>0&&(Nt-=Vt/2);break}Be={left:Nt,top:pe,width:Vt+se.width,height:de+se.height,color:V.backdropColor}}b.push({label:y,font:S,textOffset:I,options:{rotation:f,color:K,strokeColor:ft,strokeWidth:st,textAlign:ie,textBaseline:it,translation:[v,k],backdrop:Be}})}return b}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-bt(this.labelRotation))return t==="top"?"left":"right";let n="center";return e.align==="start"?n="left":e.align==="end"?n="right":e.align==="inner"&&(n="inner"),n}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:s,mirror:n,padding:o}}=this.options,a=this._getLabelSizes(),r=t+o,l=a.widest.width;let c,d;return e==="left"?n?(d=this.right+o,s==="near"?c="left":s==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-r,s==="near"?c="right":s==="center"?(c="center",d-=l/2):(c="left",d=this.left)):e==="right"?n?(d=this.left+o,s==="near"?c="right":s==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+r,s==="near"?c="left":s==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:s,top:n,width:o,height:a}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(s,n,o,a),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const n=this.ticks.findIndex(o=>o.value===t);return n>=0?e.setContext(this.getContext(n)).lineWidth:0}drawGrid(t){const e=this.options.grid,s=this.ctx,n=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let o,a;const r=(l,c,d)=>{!d.width||!d.color||(s.save(),s.lineWidth=d.width,s.strokeStyle=d.color,s.setLineDash(d.borderDash||[]),s.lineDashOffset=d.borderDashOffset,s.beginPath(),s.moveTo(l.x,l.y),s.lineTo(c.x,c.y),s.stroke(),s.restore())};if(e.display)for(o=0,a=n.length;o<a;++o){const l=n[o];e.drawOnChartArea&&r({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),e.drawTicks&&r({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:s,grid:n}}=this,o=s.setContext(this.getContext()),a=s.display?o.width:0;if(!a)return;const r=n.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,p,h;this.isHorizontal()?(c=Wt(t,this.left,a)-a/2,d=Wt(t,this.right,r)+r/2,p=h=l):(p=Wt(t,this.top,a)-a/2,h=Wt(t,this.bottom,r)+r/2,c=d=l),e.save(),e.lineWidth=o.width,e.strokeStyle=o.color,e.beginPath(),e.moveTo(c,p),e.lineTo(d,h),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const s=this.ctx,n=this._computeLabelArea();n&&vi(s,n);const o=this.getLabelItems(t);for(const a of o){const r=a.options,l=a.font,c=a.label,d=a.textOffset;te(s,c,0,d,l,r)}n&&yi(s)}drawTitle(){const{ctx:t,options:{position:e,title:s,reverse:n}}=this;if(!s.display)return;const o=Q(s.font),a=rt(s.padding),r=s.align;let l=o.lineHeight/2;e==="bottom"||e==="center"||L(e)?(l+=a.bottom,G(s.text)&&(l+=o.lineHeight*(s.text.length-1))):l+=a.top;const{titleX:c,titleY:d,maxWidth:p,rotation:h}=Ic(this,l,e,r);te(t,s.text,0,0,o,{color:s.color,maxWidth:p,rotation:h,textAlign:Lc(r,e,n),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,s=D(t.grid&&t.grid.z,-1),n=D(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==ee.prototype.draw?[{z:e,draw:o=>{this.draw(o)}}]:[{z:s,draw:o=>{this.drawBackground(),this.drawGrid(o),this.drawTitle()}},{z:n,draw:()=>{this.drawBorder()}},{z:e,draw:o=>{this.drawLabels(o)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),s=this.axis+"AxisID",n=[];let o,a;for(o=0,a=e.length;o<a;++o){const r=e[o];r[s]===this.id&&(!t||r.type===t)&&n.push(r)}return n}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return Q(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class qe{constructor(t,e,s){this.type=t,this.scope=e,this.override=s,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let s;Bc(e)&&(s=this.register(e));const n=this.items,o=t.id,a=this.scope+"."+o;if(!o)throw new Error("class does not have id: "+t);return o in n||(n[o]=t,Fc(t,a,s),this.override&&Y.override(t.id,t.overrides)),a}get(t){return this.items[t]}unregister(t){const e=this.items,s=t.id,n=this.scope;s in e&&delete e[s],n&&s in Y[n]&&(delete Y[n][s],this.override&&delete Qt[s])}}function Fc(i,t,e){const s=Ae(Object.create(null),[e?Y.get(e):{},Y.get(t),i.defaults]);Y.set(t,s),i.defaultRoutes&&jc(t,i.defaultRoutes),i.descriptors&&Y.describe(t,i.descriptors)}function jc(i,t){Object.keys(t).forEach(e=>{const s=e.split("."),n=s.pop(),o=[i].concat(s).join("."),a=t[e].split("."),r=a.pop(),l=a.join(".");Y.route(o,n,l,r)})}function Bc(i){return"id"in i&&"defaults"in i}class Vc{constructor(){this.controllers=new qe(mt,"datasets",!0),this.elements=new qe(xt,"elements"),this.plugins=new qe(Object,"plugins"),this.scales=new qe(ee,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,s){[...e].forEach(n=>{const o=s||this._getRegistryForType(n);s||o.isForType(n)||o===this.plugins&&n.id?this._exec(t,o,n):B(n,a=>{const r=s||this._getRegistryForType(a);this._exec(t,r,a)})})}_exec(t,e,s){const n=ms(t);N(s["before"+n],[],s),e[t](s),N(s["after"+n],[],s)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const s=this._typedRegistries[e];if(s.isForType(t))return s}return this.plugins}_get(t,e,s){const n=e.get(t);if(n===void 0)throw new Error('"'+t+'" is not a registered '+s+".");return n}}var yt=new Vc;class Nc{constructor(){this._init=void 0}notify(t,e,s,n){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const o=n?this._descriptors(t).filter(n):this._descriptors(t),a=this._notify(o,t,e,s);return e==="afterDestroy"&&(this._notify(o,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),a}_notify(t,e,s,n){n=n||{};for(const o of t){const a=o.plugin,r=a[s],l=[e,n,o.options];if(N(r,l,a)===!1&&n.cancelable)return!1}return!0}invalidate(){E(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const s=t&&t.config,n=D(s.options&&s.options.plugins,{}),o=Hc(s);return n===!1&&!e?[]:Gc(t,o,n,e)}_notifyStateChanges(t){const e=this._oldCache||[],s=this._cache,n=(o,a)=>o.filter(r=>!a.some(l=>r.plugin.id===l.plugin.id));this._notify(n(e,s),t,"stop"),this._notify(n(s,e),t,"start")}}function Hc(i){const t={},e=[],s=Object.keys(yt.plugins.items);for(let o=0;o<s.length;o++)e.push(yt.getPlugin(s[o]));const n=i.plugins||[];for(let o=0;o<n.length;o++){const a=n[o];e.indexOf(a)===-1&&(e.push(a),t[a.id]=!0)}return{plugins:e,localIds:t}}function Wc(i,t){return!t&&i===!1?null:i===!0?{}:i}function Gc(i,{plugins:t,localIds:e},s,n){const o=[],a=i.getContext();for(const r of t){const l=r.id,c=Wc(s[l],n);c!==null&&o.push({plugin:r,options:Yc(i.config,{plugin:r,local:e[l]},c,a)})}return o}function Yc(i,{plugin:t,local:e},s,n){const o=i.pluginScopeKeys(t),a=i.getOptionScopes(s,o);return e&&t.defaults&&a.push(t.defaults),i.createResolver(a,n,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function is(i,t){const e=Y.datasets[i]||{};return((t.datasets||{})[i]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function Uc(i,t){let e=i;return i==="_index_"?e=t:i==="_value_"&&(e=t==="x"?"y":"x"),e}function Xc(i,t){return i===t?"_index_":"_value_"}function kn(i){if(i==="x"||i==="y"||i==="r")return i}function qc(i){if(i==="top"||i==="bottom")return"x";if(i==="left"||i==="right")return"y"}function ss(i,...t){if(kn(i))return i;for(const e of t){const s=e.axis||qc(e.position)||i.length>1&&kn(i[0].toLowerCase());if(s)return s}throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`)}function $n(i,t,e){if(e[t+"AxisID"]===i)return{axis:t}}function Kc(i,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(s=>s.xAxisID===i||s.yAxisID===i);if(e.length)return $n(i,"x",e[0])||$n(i,"y",e[0])}return{}}function Jc(i,t){const e=Qt[i.type]||{scales:{}},s=t.scales||{},n=is(i.type,t),o=Object.create(null);return Object.keys(s).forEach(a=>{const r=s[a];if(!L(r))return console.error(`Invalid scale configuration for scale: ${a}`);if(r._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${a}`);const l=ss(a,r,Kc(a,i),Y.scales[r.type]),c=Xc(l,n),d=e.scales||{};o[a]=$e(Object.create(null),[{axis:l},r,d[l],d[c]])}),i.data.datasets.forEach(a=>{const r=a.type||i.type,l=a.indexAxis||is(r,t),d=(Qt[r]||{}).scales||{};Object.keys(d).forEach(p=>{const h=Uc(p,l),u=a[h+"AxisID"]||h;o[u]=o[u]||Object.create(null),$e(o[u],[{axis:h},s[u],d[p]])})}),Object.keys(o).forEach(a=>{const r=o[a];$e(r,[Y.scales[r.type],Y.scale])}),o}function ca(i){const t=i.options||(i.options={});t.plugins=D(t.plugins,{}),t.scales=Jc(i,t)}function da(i){return i=i||{},i.datasets=i.datasets||[],i.labels=i.labels||[],i}function Zc(i){return i=i||{},i.data=da(i.data),ca(i),i}const Mn=new Map,pa=new Set;function Ke(i,t){let e=Mn.get(i);return e||(e=t(),Mn.set(i,e),pa.add(e)),e}const be=(i,t,e)=>{const s=It(t,e);s!==void 0&&i.add(s)};class Qc{constructor(t){this._config=Zc(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=da(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),ca(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return Ke(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return Ke(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return Ke(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,s=this.type;return Ke(`${s}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const s=this._scopeCache;let n=s.get(t);return(!n||e)&&(n=new Map,s.set(t,n)),n}getOptionScopes(t,e,s){const{options:n,type:o}=this,a=this._cachedScopes(t,s),r=a.get(e);if(r)return r;const l=new Set;e.forEach(d=>{t&&(l.add(t),d.forEach(p=>be(l,t,p))),d.forEach(p=>be(l,n,p)),d.forEach(p=>be(l,Qt[o]||{},p)),d.forEach(p=>be(l,Y,p)),d.forEach(p=>be(l,Qi,p))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),pa.has(e)&&a.set(e,c),c}chartOptionScopes(){const{options:t,type:e}=this;return[t,Qt[e]||{},Y.datasets[e]||{},{type:e},Y,Qi]}resolveNamedOptions(t,e,s,n=[""]){const o={$shared:!0},{resolver:a,subPrefixes:r}=Sn(this._resolverCache,t,n);let l=a;if(ed(a,e)){o.$shared=!1,s=Ft(s)?s():s;const c=this.createResolver(t,s,r);l=le(a,s,c)}for(const c of e)o[c]=l[c];return o}createResolver(t,e,s=[""],n){const{resolver:o}=Sn(this._resolverCache,t,s);return L(e)?le(o,e,void 0,n):o}}function Sn(i,t,e){let s=i.get(t);s||(s=new Map,i.set(t,s));const n=e.join();let o=s.get(n);return o||(o={resolver:ks(t,e),subPrefixes:e.filter(r=>!r.toLowerCase().includes("hover"))},s.set(n,o)),o}const td=i=>L(i)&&Object.getOwnPropertyNames(i).some(t=>Ft(i[t]));function ed(i,t){const{isScriptable:e,isIndexable:s}=Ho(i);for(const n of t){const o=e(n),a=s(n),r=(a||o)&&i[n];if(o&&(Ft(r)||td(r))||a&&G(r))return!0}return!1}var id="4.5.1";const sd=["top","bottom","left","right","chartArea"];function Cn(i,t){return i==="top"||i==="bottom"||sd.indexOf(i)===-1&&t==="x"}function zn(i,t){return function(e,s){return e[i]===s[i]?e[t]-s[t]:e[i]-s[i]}}function Pn(i){const t=i.chart,e=t.options.animation;t.notifyPlugins("afterRender"),N(e&&e.onComplete,[i],t)}function nd(i){const t=i.chart,e=t.options.animation;N(e&&e.onProgress,[i],t)}function ha(i){return Ss()&&typeof i=="string"?i=document.getElementById(i):i&&i.length&&(i=i[0]),i&&i.canvas&&(i=i.canvas),i}const ai={},An=i=>{const t=ha(i);return Object.values(ai).filter(e=>e.canvas===t).pop()};function od(i,t,e){const s=Object.keys(i);for(const n of s){const o=+n;if(o>=t){const a=i[n];delete i[n],(e>0||o>t)&&(i[o+e]=a)}}}function ad(i,t,e,s){return!e||i.type==="mouseout"?null:s?t:i}class ut{static register(...t){yt.add(...t),Rn()}static unregister(...t){yt.remove(...t),Rn()}constructor(t,e){const s=this.config=new Qc(e),n=ha(t),o=An(n);if(o)throw new Error("Canvas is already in use. Chart with ID '"+o.id+"' must be destroyed before the canvas with ID '"+o.canvas.id+"' can be reused.");const a=s.createResolver(s.chartOptionScopes(),this.getContext());this.platform=new(s.platform||$c(n)),this.platform.updateConfig(s);const r=this.platform.acquireContext(n,a.aspectRatio),l=r&&r.canvas,c=l&&l.height,d=l&&l.width;if(this.id=rr(),this.ctx=r,this.canvas=l,this.width=d,this.height=c,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Nc,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=$r(p=>this.update(p),a.resizeDelay||0),this._dataChanges=[],ai[this.id]=this,!r||!l){console.error("Failed to create chart: can't acquire context from the given item");return}$t.listen(this,"complete",Pn),$t.listen(this,"progress",nd),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:s,height:n,_aspectRatio:o}=this;return E(t)?e&&o?o:n?s/n:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return yt}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():Zs(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return qs(this.canvas,this.ctx),this}stop(){return $t.stop(this),this}resize(t,e){$t.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const s=this.options,n=this.canvas,o=s.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(n,t,e,o),r=s.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,Zs(this,r,!0)&&(this.notifyPlugins("resize",{size:a}),N(s.onResize,[this,a],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};B(e,(s,n)=>{s.id=n})}buildOrUpdateScales(){const t=this.options,e=t.scales,s=this.scales,n=Object.keys(s).reduce((a,r)=>(a[r]=!1,a),{});let o=[];e&&(o=o.concat(Object.keys(e).map(a=>{const r=e[a],l=ss(a,r),c=l==="r",d=l==="x";return{options:r,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),B(o,a=>{const r=a.options,l=r.id,c=ss(l,r),d=D(r.type,a.dtype);(r.position===void 0||Cn(r.position,c)!==Cn(a.dposition))&&(r.position=a.dposition),n[l]=!0;let p=null;if(l in s&&s[l].type===d)p=s[l];else{const h=yt.getScale(d);p=new h({id:l,type:d,ctx:this.ctx,chart:this}),s[p.id]=p}p.init(r,t)}),B(n,(a,r)=>{a||delete s[r]}),B(s,a=>{at.configure(this,a,a.options),at.addBox(this,a)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,s=t.length;if(t.sort((n,o)=>n.index-o.index),s>e){for(let n=e;n<s;++n)this._destroyDatasetMeta(n);t.splice(e,s-e)}this._sortedMetasets=t.slice(0).sort(zn("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((s,n)=>{e.filter(o=>o===s._dataset).length===0&&this._destroyDatasetMeta(n)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let s,n;for(this._removeUnreferencedMetasets(),s=0,n=e.length;s<n;s++){const o=e[s];let a=this.getDatasetMeta(s);const r=o.type||this.config.type;if(a.type&&a.type!==r&&(this._destroyDatasetMeta(s),a=this.getDatasetMeta(s)),a.type=r,a.indexAxis=o.indexAxis||is(r,this.options),a.order=o.order||0,a.index=s,a.label=""+o.label,a.visible=this.isDatasetVisible(s),a.controller)a.controller.updateIndex(s),a.controller.linkScales();else{const l=yt.getController(r),{datasetElementType:c,dataElementType:d}=Y.datasets[r];Object.assign(l,{dataElementType:yt.getElement(d),datasetElementType:c&&yt.getElement(c)}),a.controller=new l(this,s),t.push(a.controller)}}return this._updateMetasets(),t}_resetElements(){B(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const s=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),n=this._animationsDisabled=!s.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const o=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let a=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:p}=this.getDatasetMeta(c),h=!n&&o.indexOf(p)===-1;p.buildOrUpdateElements(h),a=Math.max(+p.getMaxOverflow(),a)}a=this._minPadding=s.layout.autoPadding?a:0,this._updateLayout(a),n||B(o,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(zn("z","_idx"));const{_active:r,_lastEvent:l}=this;l?this._eventHandler(l,!0):r.length&&this._updateHoverStyles(r,r,!0),this.render()}_updateScales(){B(this.scales,t=>{at.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),s=new Set(t.events);(!Bs(e,s)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:s,start:n,count:o}of e){const a=s==="_removeElements"?-o:o;od(t,n,a)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,s=o=>new Set(t.filter(a=>a[0]===o).map((a,r)=>r+","+a.splice(1).join(","))),n=s(0);for(let o=1;o<e;o++)if(!Bs(n,s(o)))return;return Array.from(n).map(o=>o.split(",")).map(o=>({method:o[1],start:+o[2],count:+o[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;at.update(this,this.width,this.height,t);const e=this.chartArea,s=e.width<=0||e.height<=0;this._layers=[],B(this.boxes,n=>{s&&n.position==="chartArea"||(n.configure&&n.configure(),this._layers.push(...n._layers()))},this),this._layers.forEach((n,o)=>{n._idx=o}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,s=this.data.datasets.length;e<s;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,s=this.data.datasets.length;e<s;++e)this._updateDataset(e,Ft(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const s=this.getDatasetMeta(t),n={meta:s,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",n)!==!1&&(s.controller._update(e),n.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",n))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&($t.has(this)?this.attached&&!$t.running(this)&&$t.start(this):(this.draw(),Pn({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:s,height:n}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(s,n)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,s=[];let n,o;for(n=0,o=e.length;n<o;++n){const a=e[n];(!t||a.visible)&&s.push(a)}return s}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,s={meta:t,index:t.index,cancelable:!0},n=ta(this,t);this.notifyPlugins("beforeDatasetDraw",s)!==!1&&(n&&vi(e,n),t.controller.draw(),n&&yi(e),s.cancelable=!1,this.notifyPlugins("afterDatasetDraw",s))}isPointInArea(t){return Pt(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,s,n){const o=sc.modes[e];return typeof o=="function"?o(this,t,s,n):[]}getDatasetMeta(t){const e=this.data.datasets[t],s=this._metasets;let n=s.filter(o=>o&&o._dataset===e).pop();return n||(n={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},s.push(n)),n}getContext(){return this.$context||(this.$context=jt(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const s=this.getDatasetMeta(t);return typeof s.hidden=="boolean"?!s.hidden:!e.hidden}setDatasetVisibility(t,e){const s=this.getDatasetMeta(t);s.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,s){const n=s?"show":"hide",o=this.getDatasetMeta(t),a=o.controller._resolveAnimations(void 0,n);Re(e)?(o.data[e].hidden=!s,this.update()):(this.setDatasetVisibility(t,s),a.update(o,{visible:s}),this.update(r=>r.datasetIndex===t?n:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),$t.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),qs(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete ai[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,s=(o,a)=>{e.addEventListener(this,o,a),t[o]=a},n=(o,a,r)=>{o.offsetX=a,o.offsetY=r,this._eventHandler(o)};B(this.options.events,o=>s(o,n))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,s=(l,c)=>{e.addEventListener(this,l,c),t[l]=c},n=(l,c)=>{t[l]&&(e.removeEventListener(this,l,c),delete t[l])},o=(l,c)=>{this.canvas&&this.resize(l,c)};let a;const r=()=>{n("attach",r),this.attached=!0,this.resize(),s("resize",o),s("detach",a)};a=()=>{this.attached=!1,n("resize",o),this._stop(),this._resize(0,0),s("attach",r)},e.isAttached(this.canvas)?r():a()}unbindEvents(){B(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},B(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,s){const n=s?"set":"remove";let o,a,r,l;for(e==="dataset"&&(o=this.getDatasetMeta(t[0].datasetIndex),o.controller["_"+n+"DatasetHoverStyle"]()),r=0,l=t.length;r<l;++r){a=t[r];const c=a&&this.getDatasetMeta(a.datasetIndex).controller;c&&c[n+"HoverStyle"](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],s=t.map(({datasetIndex:o,index:a})=>{const r=this.getDatasetMeta(o);if(!r)throw new Error("No dataset found at index "+o);return{datasetIndex:o,element:r.data[a],index:a}});!ci(s,e)&&(this._active=s,this._lastEvent=null,this._updateHoverStyles(s,e))}notifyPlugins(t,e,s){return this._plugins.notify(this,t,e,s)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,s){const n=this.options.hover,o=(l,c)=>l.filter(d=>!c.some(p=>d.datasetIndex===p.datasetIndex&&d.index===p.index)),a=o(e,t),r=s?t:o(t,e);a.length&&this.updateHoverStyle(a,n.mode,!1),r.length&&n.mode&&this.updateHoverStyle(r,n.mode,!0)}_eventHandler(t,e){const s={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},n=a=>(a.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",s,n)===!1)return;const o=this._handleEvent(t,e,s.inChartArea);return s.cancelable=!1,this.notifyPlugins("afterEvent",s,n),(o||s.changed)&&this.render(),this}_handleEvent(t,e,s){const{_active:n=[],options:o}=this,a=e,r=this._getActiveElements(t,n,s,a),l=ur(t),c=ad(t,this._lastEvent,s,l);s&&(this._lastEvent=null,N(o.onHover,[t,r,this],this),l&&N(o.onClick,[t,r,this],this));const d=!ci(r,n);return(d||e)&&(this._active=r,this._updateHoverStyles(r,n,e)),this._lastEvent=c,d}_getActiveElements(t,e,s,n){if(t.type==="mouseout")return[];if(!s)return e;const o=this.options.hover;return this.getElementsAtEventForMode(t,o.mode,o,n)}}_(ut,"defaults",Y),_(ut,"instances",ai),_(ut,"overrides",Qt),_(ut,"registry",yt),_(ut,"version",id),_(ut,"getChart",An);function Rn(){return B(ut.instances,i=>i._plugins.invalidate())}function rd(i,t,e){const{startAngle:s,x:n,y:o,outerRadius:a,innerRadius:r,options:l}=t,{borderWidth:c,borderJoinStyle:d}=l,p=Math.min(c/a,ot(s-e));if(i.beginPath(),i.arc(n,o,a-c/2,s+p/2,e-p/2),r>0){const h=Math.min(c/r,ot(s-e));i.arc(n,o,r+c/2,e-h/2,s+h/2,!0)}else{const h=Math.min(c/2,a*ot(s-e));if(d==="round")i.arc(n,o,h,e-F/2,s+F/2,!0);else if(d==="bevel"){const u=2*h*h,g=-u*Math.cos(e+F/2)+n,f=-u*Math.sin(e+F/2)+o,b=u*Math.cos(s+F/2)+n,m=u*Math.sin(s+F/2)+o;i.lineTo(g,f),i.lineTo(b,m)}}i.closePath(),i.moveTo(0,0),i.rect(0,0,i.canvas.width,i.canvas.height),i.clip("evenodd")}function ld(i,t,e){const{startAngle:s,pixelMargin:n,x:o,y:a,outerRadius:r,innerRadius:l}=t;let c=n/r;i.beginPath(),i.arc(o,a,r,s-c,e+c),l>n?(c=n/l,i.arc(o,a,l,e+c,s-c,!0)):i.arc(o,a,n,e+J,s-J),i.closePath(),i.clip()}function cd(i){return _s(i,["outerStart","outerEnd","innerStart","innerEnd"])}function dd(i,t,e,s){const n=cd(i.options.borderRadius),o=(e-t)/2,a=Math.min(o,s*t/2),r=l=>{const c=(e-Math.min(o,l))*s/2;return et(l,0,Math.min(o,c))};return{outerStart:r(n.outerStart),outerEnd:r(n.outerEnd),innerStart:et(n.innerStart,0,a),innerEnd:et(n.innerEnd,0,a)}}function oe(i,t,e,s){return{x:e+i*Math.cos(t),y:s+i*Math.sin(t)}}function fi(i,t,e,s,n,o){const{x:a,y:r,startAngle:l,pixelMargin:c,innerRadius:d}=t,p=Math.max(t.outerRadius+s+e-c,0),h=d>0?d+s+e+c:0;let u=0;const g=n-l;if(s){const V=d>0?d-s:0,W=p>0?p-s:0,K=(V+W)/2,ft=K!==0?g*K/(K+s):g;u=(g-ft)/2}const f=Math.max(.001,g*p-e/F)/p,b=(g-f)/2,m=l+b+u,x=n-b-u,{outerStart:w,outerEnd:y,innerStart:v,innerEnd:k}=dd(t,h,p,x-m),$=p-w,M=p-y,S=m+w/$,T=x-y/M,O=h+v,I=h+k,it=m+v/O,pt=x-k/I;if(i.beginPath(),o){const V=(S+T)/2;if(i.arc(a,r,p,S,V),i.arc(a,r,p,V,T),y>0){const st=oe(M,T,a,r);i.arc(st.x,st.y,y,T,x+J)}const W=oe(I,x,a,r);if(i.lineTo(W.x,W.y),k>0){const st=oe(I,pt,a,r);i.arc(st.x,st.y,k,x+J,pt+Math.PI)}const K=(x-k/h+(m+v/h))/2;if(i.arc(a,r,h,x-k/h,K,!0),i.arc(a,r,h,K,m+v/h,!0),v>0){const st=oe(O,it,a,r);i.arc(st.x,st.y,v,it+Math.PI,m-J)}const ft=oe($,m,a,r);if(i.lineTo(ft.x,ft.y),w>0){const st=oe($,S,a,r);i.arc(st.x,st.y,w,m-J,S)}}else{i.moveTo(a,r);const V=Math.cos(S)*p+a,W=Math.sin(S)*p+r;i.lineTo(V,W);const K=Math.cos(T)*p+a,ft=Math.sin(T)*p+r;i.lineTo(K,ft)}i.closePath()}function pd(i,t,e,s,n){const{fullCircles:o,startAngle:a,circumference:r}=t;let l=t.endAngle;if(o){fi(i,t,e,s,l,n);for(let c=0;c<o;++c)i.fill();isNaN(r)||(l=a+(r%H||H))}return fi(i,t,e,s,l,n),i.fill(),l}function hd(i,t,e,s,n){const{fullCircles:o,startAngle:a,circumference:r,options:l}=t,{borderWidth:c,borderJoinStyle:d,borderDash:p,borderDashOffset:h,borderRadius:u}=l,g=l.borderAlign==="inner";if(!c)return;i.setLineDash(p||[]),i.lineDashOffset=h,g?(i.lineWidth=c*2,i.lineJoin=d||"round"):(i.lineWidth=c,i.lineJoin=d||"bevel");let f=t.endAngle;if(o){fi(i,t,e,s,f,n);for(let b=0;b<o;++b)i.stroke();isNaN(r)||(f=a+(r%H||H))}g&&ld(i,t,f),l.selfJoin&&f-a>=F&&u===0&&d!=="miter"&&rd(i,t,f),o||(fi(i,t,e,s,f,n),i.stroke())}class we extends xt{constructor(e){super();_(this,"circumference");_(this,"endAngle");_(this,"fullCircles");_(this,"innerRadius");_(this,"outerRadius");_(this,"pixelMargin");_(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,s,n){const o=this.getProps(["x","y"],n),{angle:a,distance:r}=To(o,{x:e,y:s}),{startAngle:l,endAngle:c,innerRadius:d,outerRadius:p,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],n),u=(this.options.spacing+this.options.borderWidth)/2,g=D(h,c-l),f=De(a,l,c)&&l!==c,b=g>=H||f,m=Ct(r,d+u,p+u);return b&&m}getCenterPoint(e){const{x:s,y:n,startAngle:o,endAngle:a,innerRadius:r,outerRadius:l}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:c,spacing:d}=this.options,p=(o+a)/2,h=(r+l+d+c)/2;return{x:s+Math.cos(p)*h,y:n+Math.sin(p)*h}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:s,circumference:n}=this,o=(s.offset||0)/4,a=(s.spacing||0)/2,r=s.circular;if(this.pixelMargin=s.borderAlign==="inner"?.33:0,this.fullCircles=n>H?Math.floor(n/H):0,n===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const l=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(l)*o,Math.sin(l)*o);const c=1-Math.sin(Math.min(F,n||0)),d=o*c;e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,pd(e,this,d,a,r),hd(e,this,d,a,r),e.restore()}}_(we,"id","arc"),_(we,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),_(we,"defaultRoutes",{backgroundColor:"backgroundColor"}),_(we,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function ua(i,t,e=t){i.lineCap=D(e.borderCapStyle,t.borderCapStyle),i.setLineDash(D(e.borderDash,t.borderDash)),i.lineDashOffset=D(e.borderDashOffset,t.borderDashOffset),i.lineJoin=D(e.borderJoinStyle,t.borderJoinStyle),i.lineWidth=D(e.borderWidth,t.borderWidth),i.strokeStyle=D(e.borderColor,t.borderColor)}function ud(i,t,e){i.lineTo(e.x,e.y)}function gd(i){return i.stepped?Lr:i.tension||i.cubicInterpolationMode==="monotone"?Ir:ud}function ga(i,t,e={}){const s=i.length,{start:n=0,end:o=s-1}=e,{start:a,end:r}=t,l=Math.max(n,a),c=Math.min(o,r),d=n<a&&o<a||n>r&&o>r;return{count:s,start:l,loop:t.loop,ilen:c<l&&!d?s+c-l:c-l}}function fd(i,t,e,s){const{points:n,options:o}=t,{count:a,start:r,loop:l,ilen:c}=ga(n,e,s),d=gd(o);let{move:p=!0,reverse:h}=s||{},u,g,f;for(u=0;u<=c;++u)g=n[(r+(h?c-u:u))%a],!g.skip&&(p?(i.moveTo(g.x,g.y),p=!1):d(i,f,g,h,o.stepped),f=g);return l&&(g=n[(r+(h?c:0))%a],d(i,f,g,h,o.stepped)),!!l}function bd(i,t,e,s){const n=t.points,{count:o,start:a,ilen:r}=ga(n,e,s),{move:l=!0,reverse:c}=s||{};let d=0,p=0,h,u,g,f,b,m;const x=y=>(a+(c?r-y:y))%o,w=()=>{f!==b&&(i.lineTo(d,b),i.lineTo(d,f),i.lineTo(d,m))};for(l&&(u=n[x(0)],i.moveTo(u.x,u.y)),h=0;h<=r;++h){if(u=n[x(h)],u.skip)continue;const y=u.x,v=u.y,k=y|0;k===g?(v<f?f=v:v>b&&(b=v),d=(p*d+y)/++p):(w(),i.lineTo(y,v),g=k,p=0,f=b=v),m=v}w()}function ns(i){const t=i.options,e=t.borderDash&&t.borderDash.length;return!i._decimated&&!i._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?bd:fd}function md(i){return i.stepped?fl:i.tension||i.cubicInterpolationMode==="monotone"?bl:Xt}function xd(i,t,e,s){let n=t._path;n||(n=t._path=new Path2D,t.path(n,e,s)&&n.closePath()),ua(i,t.options),i.stroke(n)}function vd(i,t,e,s){const{segments:n,options:o}=t,a=ns(t);for(const r of n)ua(i,o,r.style),i.beginPath(),a(i,t,r,{start:e,end:e+s-1})&&i.closePath(),i.stroke()}const yd=typeof Path2D=="function";function wd(i,t,e,s){yd&&!t.options.segment?xd(i,t,e,s):vd(i,t,e,s)}class Ot extends xt{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const s=this.options;if((s.tension||s.cubicInterpolationMode==="monotone")&&!s.stepped&&!this._pointsUpdated){const n=s.spanGaps?this._loop:this._fullLoop;rl(this._points,s,t,n,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=_l(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,s=t.length;return s&&e[t[s-1].end]}interpolate(t,e){const s=this.options,n=t[e],o=this.points,a=Qo(this,{property:e,start:n,end:n});if(!a.length)return;const r=[],l=md(s);let c,d;for(c=0,d=a.length;c<d;++c){const{start:p,end:h}=a[c],u=o[p],g=o[h];if(u===g){r.push(u);continue}const f=Math.abs((n-u[e])/(g[e]-u[e])),b=l(u,g,f,s.stepped);b[e]=t[e],r.push(b)}return r.length===1?r[0]:r}pathSegment(t,e,s){return ns(this)(t,this,e,s)}path(t,e,s){const n=this.segments,o=ns(this);let a=this._loop;e=e||0,s=s||this.points.length-e;for(const r of n)a&=o(t,this,r,{start:e,end:e+s-1});return!!a}draw(t,e,s,n){const o=this.options||{};(this.points||[]).length&&o.borderWidth&&(t.save(),wd(t,this,s,n),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}_(Ot,"id","line"),_(Ot,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),_(Ot,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),_(Ot,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function Dn(i,t,e,s){const n=i.options,{[e]:o}=i.getProps([e],s);return Math.abs(t-o)<n.radius+n.hitRadius}class ri extends xt{constructor(e){super();_(this,"parsed");_(this,"skip");_(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,s,n){const o=this.options,{x:a,y:r}=this.getProps(["x","y"],n);return Math.pow(e-a,2)+Math.pow(s-r,2)<Math.pow(o.hitRadius+o.radius,2)}inXRange(e,s){return Dn(this,e,"x",s)}inYRange(e,s){return Dn(this,e,"y",s)}getCenterPoint(e){const{x:s,y:n}=this.getProps(["x","y"],e);return{x:s,y:n}}size(e){e=e||this.options||{};let s=e.radius||0;s=Math.max(s,s&&e.hoverRadius||0);const n=s&&e.borderWidth||0;return(s+n)*2}draw(e,s){const n=this.options;this.skip||n.radius<.1||!Pt(this,s,this.size(n)/2)||(e.strokeStyle=n.borderColor,e.lineWidth=n.borderWidth,e.fillStyle=n.backgroundColor,ts(e,n,this.x,this.y))}getRange(){const e=this.options||{};return e.radius+e.hitRadius}}_(ri,"id","point"),_(ri,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),_(ri,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function fa(i,t){const{x:e,y:s,base:n,width:o,height:a}=i.getProps(["x","y","base","width","height"],t);let r,l,c,d,p;return i.horizontal?(p=a/2,r=Math.min(e,n),l=Math.max(e,n),c=s-p,d=s+p):(p=o/2,r=e-p,l=e+p,c=Math.min(s,n),d=Math.max(s,n)),{left:r,top:c,right:l,bottom:d}}function Et(i,t,e,s){return i?0:et(t,e,s)}function _d(i,t,e){const s=i.options.borderWidth,n=i.borderSkipped,o=No(s);return{t:Et(n.top,o.top,0,e),r:Et(n.right,o.right,0,t),b:Et(n.bottom,o.bottom,0,e),l:Et(n.left,o.left,0,t)}}function kd(i,t,e){const{enableBorderRadius:s}=i.getProps(["enableBorderRadius"]),n=i.options.borderRadius,o=Jt(n),a=Math.min(t,e),r=i.borderSkipped,l=s||L(n);return{topLeft:Et(!l||r.top||r.left,o.topLeft,0,a),topRight:Et(!l||r.top||r.right,o.topRight,0,a),bottomLeft:Et(!l||r.bottom||r.left,o.bottomLeft,0,a),bottomRight:Et(!l||r.bottom||r.right,o.bottomRight,0,a)}}function $d(i){const t=fa(i),e=t.right-t.left,s=t.bottom-t.top,n=_d(i,e/2,s/2),o=kd(i,e/2,s/2);return{outer:{x:t.left,y:t.top,w:e,h:s,radius:o},inner:{x:t.left+n.l,y:t.top+n.t,w:e-n.l-n.r,h:s-n.t-n.b,radius:{topLeft:Math.max(0,o.topLeft-Math.max(n.t,n.l)),topRight:Math.max(0,o.topRight-Math.max(n.t,n.r)),bottomLeft:Math.max(0,o.bottomLeft-Math.max(n.b,n.l)),bottomRight:Math.max(0,o.bottomRight-Math.max(n.b,n.r))}}}}function Bi(i,t,e,s){const n=t===null,o=e===null,r=i&&!(n&&o)&&fa(i,s);return r&&(n||Ct(t,r.left,r.right))&&(o||Ct(e,r.top,r.bottom))}function Md(i){return i.topLeft||i.topRight||i.bottomLeft||i.bottomRight}function Sd(i,t){i.rect(t.x,t.y,t.w,t.h)}function Vi(i,t,e={}){const s=i.x!==e.x?-t:0,n=i.y!==e.y?-t:0,o=(i.x+i.w!==e.x+e.w?t:0)-s,a=(i.y+i.h!==e.y+e.h?t:0)-n;return{x:i.x+s,y:i.y+n,w:i.w+o,h:i.h+a,radius:i.radius}}class li extends xt{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:s,backgroundColor:n}}=this,{inner:o,outer:a}=$d(this),r=Md(a.radius)?Te:Sd;t.save(),(a.w!==o.w||a.h!==o.h)&&(t.beginPath(),r(t,Vi(a,e,o)),t.clip(),r(t,Vi(o,-e,a)),t.fillStyle=s,t.fill("evenodd")),t.beginPath(),r(t,Vi(o,e)),t.fillStyle=n,t.fill(),t.restore()}inRange(t,e,s){return Bi(this,t,e,s)}inXRange(t,e){return Bi(this,t,null,e)}inYRange(t,e){return Bi(this,null,t,e)}getCenterPoint(t){const{x:e,y:s,base:n,horizontal:o}=this.getProps(["x","y","base","horizontal"],t);return{x:o?(e+n)/2:e,y:o?s:(s+n)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}_(li,"id","bar"),_(li,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),_(li,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var Cd=Object.freeze({__proto__:null,ArcElement:we,BarElement:li,LineElement:Ot,PointElement:ri});const os=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],Tn=os.map(i=>i.replace("rgb(","rgba(").replace(")",", 0.5)"));function ba(i){return os[i%os.length]}function ma(i){return Tn[i%Tn.length]}function zd(i,t){return i.borderColor=ba(t),i.backgroundColor=ma(t),++t}function Pd(i,t){return i.backgroundColor=i.data.map(()=>ba(t++)),t}function Ad(i,t){return i.backgroundColor=i.data.map(()=>ma(t++)),t}function Rd(i){let t=0;return(e,s)=>{const n=i.getDatasetMeta(s).controller;n instanceof qt?t=Pd(e,t):n instanceof ze?t=Ad(e,t):n&&(t=zd(e,t))}}function On(i){let t;for(t in i)if(i[t].borderColor||i[t].backgroundColor)return!0;return!1}function Dd(i){return i&&(i.borderColor||i.backgroundColor)}function Td(){return Y.borderColor!=="rgba(0,0,0,0.1)"||Y.backgroundColor!=="rgba(0,0,0,0.1)"}var Od={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(i,t,e){if(!e.enabled)return;const{data:{datasets:s},options:n}=i.config,{elements:o}=n,a=On(s)||Dd(n)||o&&On(o)||Td();if(!e.forceOverride&&a)return;const r=Rd(i);s.forEach(r)}};function Ed(i,t,e,s,n){const o=n.samples||s;if(o>=e)return i.slice(t,t+e);const a=[],r=(e-2)/(o-2);let l=0;const c=t+e-1;let d=t,p,h,u,g,f;for(a[l++]=i[d],p=0;p<o-2;p++){let b=0,m=0,x;const w=Math.floor((p+1)*r)+1+t,y=Math.min(Math.floor((p+2)*r)+1,e)+t,v=y-w;for(x=w;x<y;x++)b+=i[x].x,m+=i[x].y;b/=v,m/=v;const k=Math.floor(p*r)+1+t,$=Math.min(Math.floor((p+1)*r)+1,e)+t,{x:M,y:S}=i[d];for(u=g=-1,x=k;x<$;x++)g=.5*Math.abs((M-b)*(i[x].y-S)-(M-i[x].x)*(m-S)),g>u&&(u=g,h=i[x],f=x);a[l++]=h,d=f}return a[l++]=i[c],a}function Ld(i,t,e,s){let n=0,o=0,a,r,l,c,d,p,h,u,g,f;const b=[],m=t+e-1,x=i[t].x,y=i[m].x-x;for(a=t;a<t+e;++a){r=i[a],l=(r.x-x)/y*s,c=r.y;const v=l|0;if(v===d)c<g?(g=c,p=a):c>f&&(f=c,h=a),n=(o*n+r.x)/++o;else{const k=a-1;if(!E(p)&&!E(h)){const $=Math.min(p,h),M=Math.max(p,h);$!==u&&$!==k&&b.push({...i[$],x:n}),M!==u&&M!==k&&b.push({...i[M],x:n})}a>0&&k!==u&&b.push(i[k]),b.push(r),d=v,o=0,g=f=c,p=h=u=a}}return b}function xa(i){if(i._decimated){const t=i._data;delete i._decimated,delete i._data,Object.defineProperty(i,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function En(i){i.data.datasets.forEach(t=>{xa(t)})}function Id(i,t){const e=t.length;let s=0,n;const{iScale:o}=i,{min:a,max:r,minDefined:l,maxDefined:c}=o.getUserBounds();return l&&(s=et(zt(t,o.axis,a).lo,0,e-1)),c?n=et(zt(t,o.axis,r).hi+1,s,e)-s:n=e-s,{start:s,count:n}}var Fd={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(i,t,e)=>{if(!e.enabled){En(i);return}const s=i.width;i.data.datasets.forEach((n,o)=>{const{_data:a,indexAxis:r}=n,l=i.getDatasetMeta(o),c=a||n.data;if(ve([r,i.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const d=i.scales[l.xAxisID];if(d.type!=="linear"&&d.type!=="time"||i.options.parsing)return;let{start:p,count:h}=Id(l,c);const u=e.threshold||4*s;if(h<=u){xa(n);return}E(a)&&(n._data=c,delete n.data,Object.defineProperty(n,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(f){this._data=f}}));let g;switch(e.algorithm){case"lttb":g=Ed(c,p,h,s,e);break;case"min-max":g=Ld(c,p,h,s);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}n._decimated=g})},destroy(i){En(i)}};function jd(i,t,e){const s=i.segments,n=i.points,o=t.points,a=[];for(const r of s){let{start:l,end:c}=r;c=ki(l,c,n);const d=as(e,n[l],n[c],r.loop);if(!t.segments){a.push({source:r,target:d,start:n[l],end:n[c]});continue}const p=Qo(t,d);for(const h of p){const u=as(e,o[h.start],o[h.end],h.loop),g=Zo(r,n,u);for(const f of g)a.push({source:f,target:h,start:{[e]:Ln(d,u,"start",Math.max)},end:{[e]:Ln(d,u,"end",Math.min)}})}}return a}function as(i,t,e,s){if(s)return;let n=t[i],o=e[i];return i==="angle"&&(n=ot(n),o=ot(o)),{property:i,start:n,end:o}}function Bd(i,t){const{x:e=null,y:s=null}=i||{},n=t.points,o=[];return t.segments.forEach(({start:a,end:r})=>{r=ki(a,r,n);const l=n[a],c=n[r];s!==null?(o.push({x:l.x,y:s}),o.push({x:c.x,y:s})):e!==null&&(o.push({x:e,y:l.y}),o.push({x:e,y:c.y}))}),o}function ki(i,t,e){for(;t>i;t--){const s=e[t];if(!isNaN(s.x)&&!isNaN(s.y))break}return t}function Ln(i,t,e,s){return i&&t?s(i[e],t[e]):i?i[e]:t?t[e]:0}function va(i,t){let e=[],s=!1;return G(i)?(s=!0,e=i):e=Bd(i,t),e.length?new Ot({points:e,options:{tension:0},_loop:s,_fullLoop:s}):null}function In(i){return i&&i.fill!==!1}function Vd(i,t,e){let n=i[t].fill;const o=[t];let a;if(!e)return n;for(;n!==!1&&o.indexOf(n)===-1;){if(!q(n))return n;if(a=i[n],!a)return!1;if(a.visible)return n;o.push(n),n=a.fill}return!1}function Nd(i,t,e){const s=Yd(i);if(L(s))return isNaN(s.value)?!1:s;let n=parseFloat(s);return q(n)&&Math.floor(n)===n?Hd(s[0],t,n,e):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}function Hd(i,t,e,s){return(i==="-"||i==="+")&&(e=t+e),e===t||e<0||e>=s?!1:e}function Wd(i,t){let e=null;return i==="start"?e=t.bottom:i==="end"?e=t.top:L(i)?e=t.getPixelForValue(i.value):t.getBasePixel&&(e=t.getBasePixel()),e}function Gd(i,t,e){let s;return i==="start"?s=e:i==="end"?s=t.options.reverse?t.min:t.max:L(i)?s=i.value:s=t.getBaseValue(),s}function Yd(i){const t=i.options,e=t.fill;let s=D(e&&e.target,e);return s===void 0&&(s=!!t.backgroundColor),s===!1||s===null?!1:s===!0?"origin":s}function Ud(i){const{scale:t,index:e,line:s}=i,n=[],o=s.segments,a=s.points,r=Xd(t,e);r.push(va({x:null,y:t.bottom},s));for(let l=0;l<o.length;l++){const c=o[l];for(let d=c.start;d<=c.end;d++)qd(n,a[d],r)}return new Ot({points:n,options:{}})}function Xd(i,t){const e=[],s=i.getMatchingVisibleMetas("line");for(let n=0;n<s.length;n++){const o=s[n];if(o.index===t)break;o.hidden||e.unshift(o.dataset)}return e}function qd(i,t,e){const s=[];for(let n=0;n<e.length;n++){const o=e[n],{first:a,last:r,point:l}=Kd(o,t,"x");if(!(!l||a&&r)){if(a)s.unshift(l);else if(i.push(l),!r)break}}i.push(...s)}function Kd(i,t,e){const s=i.interpolate(t,e);if(!s)return{};const n=s[e],o=i.segments,a=i.points;let r=!1,l=!1;for(let c=0;c<o.length;c++){const d=o[c],p=a[d.start][e],h=a[d.end][e];if(Ct(n,p,h)){r=n===p,l=n===h;break}}return{first:r,last:l,point:s}}class ya{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,s){const{x:n,y:o,radius:a}=this;return e=e||{start:0,end:H},t.arc(n,o,a,e.end,e.start,!0),!s.bounds}interpolate(t){const{x:e,y:s,radius:n}=this,o=t.angle;return{x:e+Math.cos(o)*n,y:s+Math.sin(o)*n,angle:o}}}function Jd(i){const{chart:t,fill:e,line:s}=i;if(q(e))return Zd(t,e);if(e==="stack")return Ud(i);if(e==="shape")return!0;const n=Qd(i);return n instanceof ya?n:va(n,s)}function Zd(i,t){const e=i.getDatasetMeta(t);return e&&i.isDatasetVisible(t)?e.dataset:null}function Qd(i){return(i.scale||{}).getPointPositionForValue?ep(i):tp(i)}function tp(i){const{scale:t={},fill:e}=i,s=Wd(e,t);if(q(s)){const n=t.isHorizontal();return{x:n?s:null,y:n?null:s}}return null}function ep(i){const{scale:t,fill:e}=i,s=t.options,n=t.getLabels().length,o=s.reverse?t.max:t.min,a=Gd(e,t,o),r=[];if(s.grid.circular){const l=t.getPointPositionForValue(0,o);return new ya({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(a)})}for(let l=0;l<n;++l)r.push(t.getPointPositionForValue(l,a));return r}function Ni(i,t,e){const s=Jd(t),{chart:n,index:o,line:a,scale:r,axis:l}=t,c=a.options,d=c.fill,p=c.backgroundColor,{above:h=p,below:u=p}=d||{},g=n.getDatasetMeta(o),f=ta(n,g);s&&a.points.length&&(vi(i,e),ip(i,{line:a,target:s,above:h,below:u,area:e,scale:r,axis:l,clip:f}),yi(i))}function ip(i,t){const{line:e,target:s,above:n,below:o,area:a,scale:r,clip:l}=t,c=e._loop?"angle":t.axis;i.save();let d=o;o!==n&&(c==="x"?(Fn(i,s,a.top),Hi(i,{line:e,target:s,color:n,scale:r,property:c,clip:l}),i.restore(),i.save(),Fn(i,s,a.bottom)):c==="y"&&(jn(i,s,a.left),Hi(i,{line:e,target:s,color:o,scale:r,property:c,clip:l}),i.restore(),i.save(),jn(i,s,a.right),d=n)),Hi(i,{line:e,target:s,color:d,scale:r,property:c,clip:l}),i.restore()}function Fn(i,t,e){const{segments:s,points:n}=t;let o=!0,a=!1;i.beginPath();for(const r of s){const{start:l,end:c}=r,d=n[l],p=n[ki(l,c,n)];o?(i.moveTo(d.x,d.y),o=!1):(i.lineTo(d.x,e),i.lineTo(d.x,d.y)),a=!!t.pathSegment(i,r,{move:a}),a?i.closePath():i.lineTo(p.x,e)}i.lineTo(t.first().x,e),i.closePath(),i.clip()}function jn(i,t,e){const{segments:s,points:n}=t;let o=!0,a=!1;i.beginPath();for(const r of s){const{start:l,end:c}=r,d=n[l],p=n[ki(l,c,n)];o?(i.moveTo(d.x,d.y),o=!1):(i.lineTo(e,d.y),i.lineTo(d.x,d.y)),a=!!t.pathSegment(i,r,{move:a}),a?i.closePath():i.lineTo(e,p.y)}i.lineTo(e,t.first().y),i.closePath(),i.clip()}function Hi(i,t){const{line:e,target:s,property:n,color:o,scale:a,clip:r}=t,l=jd(e,s,n);for(const{source:c,target:d,start:p,end:h}of l){const{style:{backgroundColor:u=o}={}}=c,g=s!==!0;i.save(),i.fillStyle=u,sp(i,a,r,g&&as(n,p,h)),i.beginPath();const f=!!e.pathSegment(i,c);let b;if(g){f?i.closePath():Bn(i,s,h,n);const m=!!s.pathSegment(i,d,{move:f,reverse:!0});b=f&&m,b||Bn(i,s,p,n)}i.closePath(),i.fill(b?"evenodd":"nonzero"),i.restore()}}function sp(i,t,e,s){const n=t.chart.chartArea,{property:o,start:a,end:r}=s||{};if(o==="x"||o==="y"){let l,c,d,p;o==="x"?(l=a,c=n.top,d=r,p=n.bottom):(l=n.left,c=a,d=n.right,p=r),i.beginPath(),e&&(l=Math.max(l,e.left),d=Math.min(d,e.right),c=Math.max(c,e.top),p=Math.min(p,e.bottom)),i.rect(l,c,d-l,p-c),i.clip()}}function Bn(i,t,e,s){const n=t.interpolate(e,s);n&&i.lineTo(n.x,n.y)}var np={id:"filler",afterDatasetsUpdate(i,t,e){const s=(i.data.datasets||[]).length,n=[];let o,a,r,l;for(a=0;a<s;++a)o=i.getDatasetMeta(a),r=o.dataset,l=null,r&&r.options&&r instanceof Ot&&(l={visible:i.isDatasetVisible(a),index:a,fill:Nd(r,a,s),chart:i,axis:o.controller.options.indexAxis,scale:o.vScale,line:r}),o.$filler=l,n.push(l);for(a=0;a<s;++a)l=n[a],!(!l||l.fill===!1)&&(l.fill=Vd(n,a,e.propagate))},beforeDraw(i,t,e){const s=e.drawTime==="beforeDraw",n=i.getSortedVisibleDatasetMetas(),o=i.chartArea;for(let a=n.length-1;a>=0;--a){const r=n[a].$filler;r&&(r.line.updateControlPoints(o,r.axis),s&&r.fill&&Ni(i.ctx,r,o))}},beforeDatasetsDraw(i,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const s=i.getSortedVisibleDatasetMetas();for(let n=s.length-1;n>=0;--n){const o=s[n].$filler;In(o)&&Ni(i.ctx,o,i.chartArea)}},beforeDatasetDraw(i,t,e){const s=t.meta.$filler;!In(s)||e.drawTime!=="beforeDatasetDraw"||Ni(i.ctx,s,i.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const Vn=(i,t)=>{let{boxHeight:e=t,boxWidth:s=t}=i;return i.usePointStyle&&(e=Math.min(e,t),s=i.pointStyleWidth||Math.min(s,t)),{boxWidth:s,boxHeight:e,itemHeight:Math.max(t,e)}},op=(i,t)=>i!==null&&t!==null&&i.datasetIndex===t.datasetIndex&&i.index===t.index;class Nn extends xt{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,s){this.maxWidth=t,this.maxHeight=e,this._margins=s,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=N(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(s=>t.filter(s,this.chart.data))),t.sort&&(e=e.sort((s,n)=>t.sort(s,n,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const s=t.labels,n=Q(s.font),o=n.size,a=this._computeTitleHeight(),{boxWidth:r,itemHeight:l}=Vn(s,o);let c,d;e.font=n.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(a,o,r,l)+10):(d=this.maxHeight,c=this._fitCols(a,n,r,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,e,s,n){const{ctx:o,maxWidth:a,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=n+r;let p=t;o.textAlign="left",o.textBaseline="middle";let h=-1,u=-d;return this.legendItems.forEach((g,f)=>{const b=s+e/2+o.measureText(g.text).width;(f===0||c[c.length-1]+b+2*r>a)&&(p+=d,c[c.length-(f>0?0:1)]=0,u+=d,h++),l[f]={left:0,top:u,row:h,width:b,height:n},c[c.length-1]+=b+r}),p}_fitCols(t,e,s,n){const{ctx:o,maxHeight:a,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=a-t;let p=r,h=0,u=0,g=0,f=0;return this.legendItems.forEach((b,m)=>{const{itemWidth:x,itemHeight:w}=ap(s,e,o,b,n);m>0&&u+w+2*r>d&&(p+=h+r,c.push({width:h,height:u}),g+=h+r,f++,h=u=0),l[m]={left:g,top:u,col:f,width:x,height:w},h=Math.max(h,x),u+=w+r}),p+=h,c.push({width:h,height:u}),p}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:s,labels:{padding:n},rtl:o}}=this,a=ae(o,this.left,this.width);if(this.isHorizontal()){let r=0,l=nt(s,this.left+n,this.right-this.lineWidths[r]);for(const c of e)r!==c.row&&(r=c.row,l=nt(s,this.left+n,this.right-this.lineWidths[r])),c.top+=this.top+t+n,c.left=a.leftForLtr(a.x(l),c.width),l+=c.width+n}else{let r=0,l=nt(s,this.top+t+n,this.bottom-this.columnSizes[r].height);for(const c of e)c.col!==r&&(r=c.col,l=nt(s,this.top+t+n,this.bottom-this.columnSizes[r].height)),c.top=l,c.left+=this.left+n,c.left=a.leftForLtr(a.x(c.left),c.width),l+=c.height+n}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;vi(t,this),this._draw(),yi(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:s,ctx:n}=this,{align:o,labels:a}=t,r=Y.color,l=ae(t.rtl,this.left,this.width),c=Q(a.font),{padding:d}=a,p=c.size,h=p/2;let u;this.drawTitle(),n.textAlign=l.textAlign("left"),n.textBaseline="middle",n.lineWidth=.5,n.font=c.string;const{boxWidth:g,boxHeight:f,itemHeight:b}=Vn(a,p),m=function(k,$,M){if(isNaN(g)||g<=0||isNaN(f)||f<0)return;n.save();const S=D(M.lineWidth,1);if(n.fillStyle=D(M.fillStyle,r),n.lineCap=D(M.lineCap,"butt"),n.lineDashOffset=D(M.lineDashOffset,0),n.lineJoin=D(M.lineJoin,"miter"),n.lineWidth=S,n.strokeStyle=D(M.strokeStyle,r),n.setLineDash(D(M.lineDash,[])),a.usePointStyle){const T={radius:f*Math.SQRT2/2,pointStyle:M.pointStyle,rotation:M.rotation,borderWidth:S},O=l.xPlus(k,g/2),I=$+h;Vo(n,T,O,I,a.pointStyleWidth&&g)}else{const T=$+Math.max((p-f)/2,0),O=l.leftForLtr(k,g),I=Jt(M.borderRadius);n.beginPath(),Object.values(I).some(it=>it!==0)?Te(n,{x:O,y:T,w:g,h:f,radius:I}):n.rect(O,T,g,f),n.fill(),S!==0&&n.stroke()}n.restore()},x=function(k,$,M){te(n,M.text,k,$+b/2,c,{strikethrough:M.hidden,textAlign:l.textAlign(M.textAlign)})},w=this.isHorizontal(),y=this._computeTitleHeight();w?u={x:nt(o,this.left+d,this.right-s[0]),y:this.top+d+y,line:0}:u={x:this.left+d,y:nt(o,this.top+y+d,this.bottom-e[0].height),line:0},qo(this.ctx,t.textDirection);const v=b+d;this.legendItems.forEach((k,$)=>{n.strokeStyle=k.fontColor,n.fillStyle=k.fontColor;const M=n.measureText(k.text).width,S=l.textAlign(k.textAlign||(k.textAlign=a.textAlign)),T=g+h+M;let O=u.x,I=u.y;l.setWidth(this.width),w?$>0&&O+T+d>this.right&&(I=u.y+=v,u.line++,O=u.x=nt(o,this.left+d,this.right-s[u.line])):$>0&&I+v>this.bottom&&(O=u.x=O+e[u.line].width+d,u.line++,I=u.y=nt(o,this.top+y+d,this.bottom-e[u.line].height));const it=l.x(O);if(m(it,I,k),O=Mr(S,O+g+h,w?O+T:this.right,t.rtl),x(l.x(O),I,k),w)u.x+=T+d;else if(typeof k.text!="string"){const pt=c.lineHeight;u.y+=wa(k,pt)+d}else u.y+=v}),Ko(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,s=Q(e.font),n=rt(e.padding);if(!e.display)return;const o=ae(t.rtl,this.left,this.width),a=this.ctx,r=e.position,l=s.size/2,c=n.top+l;let d,p=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+c,p=nt(t.align,p,this.right-h);else{const g=this.columnSizes.reduce((f,b)=>Math.max(f,b.height),0);d=c+nt(t.align,this.top,this.bottom-g-t.labels.padding-this._computeTitleHeight())}const u=nt(r,p,p+h);a.textAlign=o.textAlign(ys(r)),a.textBaseline="middle",a.strokeStyle=e.color,a.fillStyle=e.color,a.font=s.string,te(a,e.text,u,d,s)}_computeTitleHeight(){const t=this.options.title,e=Q(t.font),s=rt(t.padding);return t.display?e.lineHeight+s.height:0}_getLegendItemAt(t,e){let s,n,o;if(Ct(t,this.left,this.right)&&Ct(e,this.top,this.bottom)){for(o=this.legendHitBoxes,s=0;s<o.length;++s)if(n=o[s],Ct(t,n.left,n.left+n.width)&&Ct(e,n.top,n.top+n.height))return this.legendItems[s]}return null}handleEvent(t){const e=this.options;if(!cp(t.type,e))return;const s=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const n=this._hoveredItem,o=op(n,s);n&&!o&&N(e.onLeave,[t,n,this],this),this._hoveredItem=s,s&&!o&&N(e.onHover,[t,s,this],this)}else s&&N(e.onClick,[t,s,this],this)}}function ap(i,t,e,s,n){const o=rp(s,i,t,e),a=lp(n,s,t.lineHeight);return{itemWidth:o,itemHeight:a}}function rp(i,t,e,s){let n=i.text;return n&&typeof n!="string"&&(n=n.reduce((o,a)=>o.length>a.length?o:a)),t+e.size/2+s.measureText(n).width}function lp(i,t,e){let s=i;return typeof t.text!="string"&&(s=wa(t,e)),s}function wa(i,t){const e=i.text?i.text.length:0;return t*e}function cp(i,t){return!!((i==="mousemove"||i==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(i==="click"||i==="mouseup"))}var dp={id:"legend",_element:Nn,start(i,t,e){const s=i.legend=new Nn({ctx:i.ctx,options:e,chart:i});at.configure(i,s,e),at.addBox(i,s)},stop(i){at.removeBox(i,i.legend),delete i.legend},beforeUpdate(i,t,e){const s=i.legend;at.configure(i,s,e),s.options=e},afterUpdate(i){const t=i.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(i,t){t.replay||i.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(i,t,e){const s=t.datasetIndex,n=e.chart;n.isDatasetVisible(s)?(n.hide(s),t.hidden=!0):(n.show(s),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:i=>i.chart.options.color,boxWidth:40,padding:10,generateLabels(i){const t=i.data.datasets,{labels:{usePointStyle:e,pointStyle:s,textAlign:n,color:o,useBorderRadius:a,borderRadius:r}}=i.legend.options;return i._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(e?0:void 0),d=rt(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:o,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:s||c.pointStyle,rotation:c.rotation,textAlign:n||c.textAlign,borderRadius:a&&(r||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:i=>i.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:i=>!i.startsWith("on"),labels:{_scriptable:i=>!["generateLabels","filter","sort"].includes(i)}}};class Ps extends xt{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const s=this.options;if(this.left=0,this.top=0,!s.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const n=G(s.text)?s.text.length:1;this._padding=rt(s.padding);const o=n*Q(s.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=o:this.width=o}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:s,bottom:n,right:o,options:a}=this,r=a.align;let l=0,c,d,p;return this.isHorizontal()?(d=nt(r,s,o),p=e+t,c=o-s):(a.position==="left"?(d=s+t,p=nt(r,n,e),l=F*-.5):(d=o-t,p=nt(r,e,n),l=F*.5),c=n-e),{titleX:d,titleY:p,maxWidth:c,rotation:l}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const s=Q(e.font),o=s.lineHeight/2+this._padding.top,{titleX:a,titleY:r,maxWidth:l,rotation:c}=this._drawArgs(o);te(t,e.text,0,0,s,{color:e.color,maxWidth:l,rotation:c,textAlign:ys(e.align),textBaseline:"middle",translation:[a,r]})}}function pp(i,t){const e=new Ps({ctx:i.ctx,options:t,chart:i});at.configure(i,e,t),at.addBox(i,e),i.titleBlock=e}var hp={id:"title",_element:Ps,start(i,t,e){pp(i,e)},stop(i){const t=i.titleBlock;at.removeBox(i,t),delete i.titleBlock},beforeUpdate(i,t,e){const s=i.titleBlock;at.configure(i,s,e),s.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Je=new WeakMap;var up={id:"subtitle",start(i,t,e){const s=new Ps({ctx:i.ctx,options:e,chart:i});at.configure(i,s,e),at.addBox(i,s),Je.set(i,s)},stop(i){at.removeBox(i,Je.get(i)),Je.delete(i)},beforeUpdate(i,t,e){const s=Je.get(i);at.configure(i,s,e),s.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const _e={average(i){if(!i.length)return!1;let t,e,s=new Set,n=0,o=0;for(t=0,e=i.length;t<e;++t){const r=i[t].element;if(r&&r.hasValue()){const l=r.tooltipPosition();s.add(l.x),n+=l.y,++o}}return o===0||s.size===0?!1:{x:[...s].reduce((r,l)=>r+l)/s.size,y:n/o}},nearest(i,t){if(!i.length)return!1;let e=t.x,s=t.y,n=Number.POSITIVE_INFINITY,o,a,r;for(o=0,a=i.length;o<a;++o){const l=i[o].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=Zi(t,c);d<n&&(n=d,r=l)}}if(r){const l=r.tooltipPosition();e=l.x,s=l.y}return{x:e,y:s}}};function vt(i,t){return t&&(G(t)?Array.prototype.push.apply(i,t):i.push(t)),i}function Mt(i){return(typeof i=="string"||i instanceof String)&&i.indexOf(`
`)>-1?i.split(`
`):i}function gp(i,t){const{element:e,datasetIndex:s,index:n}=t,o=i.getDatasetMeta(s).controller,{label:a,value:r}=o.getLabelAndValue(n);return{chart:i,label:a,parsed:o.getParsed(n),raw:i.data.datasets[s].data[n],formattedValue:r,dataset:o.getDataset(),dataIndex:n,datasetIndex:s,element:e}}function Hn(i,t){const e=i.chart.ctx,{body:s,footer:n,title:o}=i,{boxWidth:a,boxHeight:r}=t,l=Q(t.bodyFont),c=Q(t.titleFont),d=Q(t.footerFont),p=o.length,h=n.length,u=s.length,g=rt(t.padding);let f=g.height,b=0,m=s.reduce((y,v)=>y+v.before.length+v.lines.length+v.after.length,0);if(m+=i.beforeBody.length+i.afterBody.length,p&&(f+=p*c.lineHeight+(p-1)*t.titleSpacing+t.titleMarginBottom),m){const y=t.displayColors?Math.max(r,l.lineHeight):l.lineHeight;f+=u*y+(m-u)*l.lineHeight+(m-1)*t.bodySpacing}h&&(f+=t.footerMarginTop+h*d.lineHeight+(h-1)*t.footerSpacing);let x=0;const w=function(y){b=Math.max(b,e.measureText(y).width+x)};return e.save(),e.font=c.string,B(i.title,w),e.font=l.string,B(i.beforeBody.concat(i.afterBody),w),x=t.displayColors?a+2+t.boxPadding:0,B(s,y=>{B(y.before,w),B(y.lines,w),B(y.after,w)}),x=0,e.font=d.string,B(i.footer,w),e.restore(),b+=g.width,{width:b,height:f}}function fp(i,t){const{y:e,height:s}=t;return e<s/2?"top":e>i.height-s/2?"bottom":"center"}function bp(i,t,e,s){const{x:n,width:o}=s,a=e.caretSize+e.caretPadding;if(i==="left"&&n+o+a>t.width||i==="right"&&n-o-a<0)return!0}function mp(i,t,e,s){const{x:n,width:o}=e,{width:a,chartArea:{left:r,right:l}}=i;let c="center";return s==="center"?c=n<=(r+l)/2?"left":"right":n<=o/2?c="left":n>=a-o/2&&(c="right"),bp(c,i,t,e)&&(c="center"),c}function Wn(i,t,e){const s=e.yAlign||t.yAlign||fp(i,e);return{xAlign:e.xAlign||t.xAlign||mp(i,t,e,s),yAlign:s}}function xp(i,t){let{x:e,width:s}=i;return t==="right"?e-=s:t==="center"&&(e-=s/2),e}function vp(i,t,e){let{y:s,height:n}=i;return t==="top"?s+=e:t==="bottom"?s-=n+e:s-=n/2,s}function Gn(i,t,e,s){const{caretSize:n,caretPadding:o,cornerRadius:a}=i,{xAlign:r,yAlign:l}=e,c=n+o,{topLeft:d,topRight:p,bottomLeft:h,bottomRight:u}=Jt(a);let g=xp(t,r);const f=vp(t,l,c);return l==="center"?r==="left"?g+=c:r==="right"&&(g-=c):r==="left"?g-=Math.max(d,h)+n:r==="right"&&(g+=Math.max(p,u)+n),{x:et(g,0,s.width-t.width),y:et(f,0,s.height-t.height)}}function Ze(i,t,e){const s=rt(e.padding);return t==="center"?i.x+i.width/2:t==="right"?i.x+i.width-s.right:i.x+s.left}function Yn(i){return vt([],Mt(i))}function yp(i,t,e){return jt(i,{tooltip:t,tooltipItems:e,type:"tooltip"})}function Un(i,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?i.override(e):i}const _a={beforeTitle:kt,title(i){if(i.length>0){const t=i[0],e=t.chart.data.labels,s=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(s>0&&t.dataIndex<s)return e[t.dataIndex]}return""},afterTitle:kt,beforeBody:kt,beforeLabel:kt,label(i){if(this&&this.options&&this.options.mode==="dataset")return i.label+": "+i.formattedValue||i.formattedValue;let t=i.dataset.label||"";t&&(t+=": ");const e=i.formattedValue;return E(e)||(t+=e),t},labelColor(i){const e=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(i){const e=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:kt,afterBody:kt,beforeFooter:kt,footer:kt,afterFooter:kt};function ct(i,t,e,s){const n=i[t].call(e,s);return typeof n>"u"?_a[t].call(e,s):n}class rs extends xt{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,s=this.options.setContext(this.getContext()),n=s.enabled&&e.options.animation&&s.animations,o=new ea(this.chart,n);return n._cacheable&&(this._cachedAnimations=Object.freeze(o)),o}getContext(){return this.$context||(this.$context=yp(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:s}=e,n=ct(s,"beforeTitle",this,t),o=ct(s,"title",this,t),a=ct(s,"afterTitle",this,t);let r=[];return r=vt(r,Mt(n)),r=vt(r,Mt(o)),r=vt(r,Mt(a)),r}getBeforeBody(t,e){return Yn(ct(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:s}=e,n=[];return B(t,o=>{const a={before:[],lines:[],after:[]},r=Un(s,o);vt(a.before,Mt(ct(r,"beforeLabel",this,o))),vt(a.lines,ct(r,"label",this,o)),vt(a.after,Mt(ct(r,"afterLabel",this,o))),n.push(a)}),n}getAfterBody(t,e){return Yn(ct(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:s}=e,n=ct(s,"beforeFooter",this,t),o=ct(s,"footer",this,t),a=ct(s,"afterFooter",this,t);let r=[];return r=vt(r,Mt(n)),r=vt(r,Mt(o)),r=vt(r,Mt(a)),r}_createItems(t){const e=this._active,s=this.chart.data,n=[],o=[],a=[];let r=[],l,c;for(l=0,c=e.length;l<c;++l)r.push(gp(this.chart,e[l]));return t.filter&&(r=r.filter((d,p,h)=>t.filter(d,p,h,s))),t.itemSort&&(r=r.sort((d,p)=>t.itemSort(d,p,s))),B(r,d=>{const p=Un(t.callbacks,d);n.push(ct(p,"labelColor",this,d)),o.push(ct(p,"labelPointStyle",this,d)),a.push(ct(p,"labelTextColor",this,d))}),this.labelColors=n,this.labelPointStyles=o,this.labelTextColors=a,this.dataPoints=r,r}update(t,e){const s=this.options.setContext(this.getContext()),n=this._active;let o,a=[];if(!n.length)this.opacity!==0&&(o={opacity:0});else{const r=_e[s.position].call(this,n,this._eventPosition);a=this._createItems(s),this.title=this.getTitle(a,s),this.beforeBody=this.getBeforeBody(a,s),this.body=this.getBody(a,s),this.afterBody=this.getAfterBody(a,s),this.footer=this.getFooter(a,s);const l=this._size=Hn(this,s),c=Object.assign({},r,l),d=Wn(this.chart,s,c),p=Gn(s,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,o={opacity:1,x:p.x,y:p.y,width:l.width,height:l.height,caretX:r.x,caretY:r.y}}this._tooltipItems=a,this.$context=void 0,o&&this._resolveAnimations().update(this,o),t&&s.external&&s.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,s,n){const o=this.getCaretPosition(t,s,n);e.lineTo(o.x1,o.y1),e.lineTo(o.x2,o.y2),e.lineTo(o.x3,o.y3)}getCaretPosition(t,e,s){const{xAlign:n,yAlign:o}=this,{caretSize:a,cornerRadius:r}=s,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:p}=Jt(r),{x:h,y:u}=t,{width:g,height:f}=e;let b,m,x,w,y,v;return o==="center"?(y=u+f/2,n==="left"?(b=h,m=b-a,w=y+a,v=y-a):(b=h+g,m=b+a,w=y-a,v=y+a),x=b):(n==="left"?m=h+Math.max(l,d)+a:n==="right"?m=h+g-Math.max(c,p)-a:m=this.caretX,o==="top"?(w=u,y=w-a,b=m-a,x=m+a):(w=u+f,y=w+a,b=m+a,x=m-a),v=w),{x1:b,x2:m,x3:x,y1:w,y2:y,y3:v}}drawTitle(t,e,s){const n=this.title,o=n.length;let a,r,l;if(o){const c=ae(s.rtl,this.x,this.width);for(t.x=Ze(this,s.titleAlign,s),e.textAlign=c.textAlign(s.titleAlign),e.textBaseline="middle",a=Q(s.titleFont),r=s.titleSpacing,e.fillStyle=s.titleColor,e.font=a.string,l=0;l<o;++l)e.fillText(n[l],c.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+r,l+1===o&&(t.y+=s.titleMarginBottom-r)}}_drawColorBox(t,e,s,n,o){const a=this.labelColors[s],r=this.labelPointStyles[s],{boxHeight:l,boxWidth:c}=o,d=Q(o.bodyFont),p=Ze(this,"left",o),h=n.x(p),u=l<d.lineHeight?(d.lineHeight-l)/2:0,g=e.y+u;if(o.usePointStyle){const f={radius:Math.min(c,l)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},b=n.leftForLtr(h,c)+c/2,m=g+l/2;t.strokeStyle=o.multiKeyBackground,t.fillStyle=o.multiKeyBackground,ts(t,f,b,m),t.strokeStyle=a.borderColor,t.fillStyle=a.backgroundColor,ts(t,f,b,m)}else{t.lineWidth=L(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,t.strokeStyle=a.borderColor,t.setLineDash(a.borderDash||[]),t.lineDashOffset=a.borderDashOffset||0;const f=n.leftForLtr(h,c),b=n.leftForLtr(n.xPlus(h,1),c-2),m=Jt(a.borderRadius);Object.values(m).some(x=>x!==0)?(t.beginPath(),t.fillStyle=o.multiKeyBackground,Te(t,{x:f,y:g,w:c,h:l,radius:m}),t.fill(),t.stroke(),t.fillStyle=a.backgroundColor,t.beginPath(),Te(t,{x:b,y:g+1,w:c-2,h:l-2,radius:m}),t.fill()):(t.fillStyle=o.multiKeyBackground,t.fillRect(f,g,c,l),t.strokeRect(f,g,c,l),t.fillStyle=a.backgroundColor,t.fillRect(b,g+1,c-2,l-2))}t.fillStyle=this.labelTextColors[s]}drawBody(t,e,s){const{body:n}=this,{bodySpacing:o,bodyAlign:a,displayColors:r,boxHeight:l,boxWidth:c,boxPadding:d}=s,p=Q(s.bodyFont);let h=p.lineHeight,u=0;const g=ae(s.rtl,this.x,this.width),f=function(M){e.fillText(M,g.x(t.x+u),t.y+h/2),t.y+=h+o},b=g.textAlign(a);let m,x,w,y,v,k,$;for(e.textAlign=a,e.textBaseline="middle",e.font=p.string,t.x=Ze(this,b,s),e.fillStyle=s.bodyColor,B(this.beforeBody,f),u=r&&b!=="right"?a==="center"?c/2+d:c+2+d:0,y=0,k=n.length;y<k;++y){for(m=n[y],x=this.labelTextColors[y],e.fillStyle=x,B(m.before,f),w=m.lines,r&&w.length&&(this._drawColorBox(e,t,y,g,s),h=Math.max(p.lineHeight,l)),v=0,$=w.length;v<$;++v)f(w[v]),h=p.lineHeight;B(m.after,f)}u=0,h=p.lineHeight,B(this.afterBody,f),t.y-=o}drawFooter(t,e,s){const n=this.footer,o=n.length;let a,r;if(o){const l=ae(s.rtl,this.x,this.width);for(t.x=Ze(this,s.footerAlign,s),t.y+=s.footerMarginTop,e.textAlign=l.textAlign(s.footerAlign),e.textBaseline="middle",a=Q(s.footerFont),e.fillStyle=s.footerColor,e.font=a.string,r=0;r<o;++r)e.fillText(n[r],l.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+s.footerSpacing}}drawBackground(t,e,s,n){const{xAlign:o,yAlign:a}=this,{x:r,y:l}=t,{width:c,height:d}=s,{topLeft:p,topRight:h,bottomLeft:u,bottomRight:g}=Jt(n.cornerRadius);e.fillStyle=n.backgroundColor,e.strokeStyle=n.borderColor,e.lineWidth=n.borderWidth,e.beginPath(),e.moveTo(r+p,l),a==="top"&&this.drawCaret(t,e,s,n),e.lineTo(r+c-h,l),e.quadraticCurveTo(r+c,l,r+c,l+h),a==="center"&&o==="right"&&this.drawCaret(t,e,s,n),e.lineTo(r+c,l+d-g),e.quadraticCurveTo(r+c,l+d,r+c-g,l+d),a==="bottom"&&this.drawCaret(t,e,s,n),e.lineTo(r+u,l+d),e.quadraticCurveTo(r,l+d,r,l+d-u),a==="center"&&o==="left"&&this.drawCaret(t,e,s,n),e.lineTo(r,l+p),e.quadraticCurveTo(r,l,r+p,l),e.closePath(),e.fill(),n.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,s=this.$animations,n=s&&s.x,o=s&&s.y;if(n||o){const a=_e[t.position].call(this,this._active,this._eventPosition);if(!a)return;const r=this._size=Hn(this,t),l=Object.assign({},a,this._size),c=Wn(e,t,l),d=Gn(t,l,c,e);(n._to!==d.x||o._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=r.width,this.height=r.height,this.caretX=a.x,this.caretY=a.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let s=this.opacity;if(!s)return;this._updateAnimationTarget(e);const n={width:this.width,height:this.height},o={x:this.x,y:this.y};s=Math.abs(s)<.001?0:s;const a=rt(e.padding),r=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&r&&(t.save(),t.globalAlpha=s,this.drawBackground(o,t,n,e),qo(t,e.textDirection),o.y+=a.top,this.drawTitle(o,t,e),this.drawBody(o,t,e),this.drawFooter(o,t,e),Ko(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const s=this._active,n=t.map(({datasetIndex:r,index:l})=>{const c=this.chart.getDatasetMeta(r);if(!c)throw new Error("Cannot find a dataset at index "+r);return{datasetIndex:r,element:c.data[l],index:l}}),o=!ci(s,n),a=this._positionChanged(n,e);(o||a)&&(this._active=n,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,s=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const n=this.options,o=this._active||[],a=this._getActiveElements(t,o,e,s),r=this._positionChanged(a,t),l=e||!ci(a,o)||r;return l&&(this._active=a,(n.enabled||n.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),l}_getActiveElements(t,e,s,n){const o=this.options;if(t.type==="mouseout")return[];if(!n)return e.filter(r=>this.chart.data.datasets[r.datasetIndex]&&this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index)!==void 0);const a=this.chart.getElementsAtEventForMode(t,o.mode,o,s);return o.reverse&&a.reverse(),a}_positionChanged(t,e){const{caretX:s,caretY:n,options:o}=this,a=_e[o.position].call(this,t,e);return a!==!1&&(s!==a.x||n!==a.y)}}_(rs,"positioners",_e);var wp={id:"tooltip",_element:rs,positioners:_e,afterInit(i,t,e){e&&(i.tooltip=new rs({chart:i,options:e}))},beforeUpdate(i,t,e){i.tooltip&&i.tooltip.initialize(e)},reset(i,t,e){i.tooltip&&i.tooltip.initialize(e)},afterDraw(i){const t=i.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(i.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(i.ctx),i.notifyPlugins("afterTooltipDraw",e)}},afterEvent(i,t){if(i.tooltip){const e=t.replay;i.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(i,t)=>t.bodyFont.size,boxWidth:(i,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:_a},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:i=>i!=="filter"&&i!=="itemSort"&&i!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},_p=Object.freeze({__proto__:null,Colors:Od,Decimation:Fd,Filler:np,Legend:dp,SubTitle:up,Title:hp,Tooltip:wp});const kp=(i,t,e,s)=>(typeof t=="string"?(e=i.push(t)-1,s.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function $p(i,t,e,s){const n=i.indexOf(t);if(n===-1)return kp(i,t,e,s);const o=i.lastIndexOf(t);return n!==o?e:n}const Mp=(i,t)=>i===null?null:et(Math.round(i),0,t);function Xn(i){const t=this.getLabels();return i>=0&&i<t.length?t[i]:i}class ls extends ee{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const s=this.getLabels();for(const{index:n,label:o}of e)s[n]===o&&s.splice(n,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(E(t))return null;const s=this.getLabels();return e=isFinite(e)&&s[e]===t?e:$p(s,t,D(e,t),this._addedLabels),Mp(e,s.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:s,max:n}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(s=0),e||(n=this.getLabels().length-1)),this.min=s,this.max=n}buildTicks(){const t=this.min,e=this.max,s=this.options.offset,n=[];let o=this.getLabels();o=t===0&&e===o.length-1?o:o.slice(t,e+1),this._valueRange=Math.max(o.length-(s?0:1),1),this._startValue=this.min-(s?.5:0);for(let a=t;a<=e;a++)n.push({value:a});return n}getLabelForValue(t){return Xn.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}_(ls,"id","category"),_(ls,"defaults",{ticks:{callback:Xn}});function Sp(i,t){const e=[],{bounds:n,step:o,min:a,max:r,precision:l,count:c,maxTicks:d,maxDigits:p,includeBounds:h}=i,u=o||1,g=d-1,{min:f,max:b}=t,m=!E(a),x=!E(r),w=!E(c),y=(b-f)/(p+1);let v=Ns((b-f)/g/u)*u,k,$,M,S;if(v<1e-14&&!m&&!x)return[{value:f},{value:b}];S=Math.ceil(b/v)-Math.floor(f/v),S>g&&(v=Ns(S*v/g/u)*u),E(l)||(k=Math.pow(10,l),v=Math.ceil(v*k)/k),n==="ticks"?($=Math.floor(f/v)*v,M=Math.ceil(b/v)*v):($=f,M=b),m&&x&&o&&xr((r-a)/o,v/1e3)?(S=Math.round(Math.min((r-a)/v,d)),v=(r-a)/S,$=a,M=r):w?($=m?a:$,M=x?r:M,S=c-1,v=(M-$)/S):(S=(M-$)/v,Me(S,Math.round(S),v/1e3)?S=Math.round(S):S=Math.ceil(S));const T=Math.max(Hs(v),Hs($));k=Math.pow(10,E(l)?T:l),$=Math.round($*k)/k,M=Math.round(M*k)/k;let O=0;for(m&&(h&&$!==a?(e.push({value:a}),$<a&&O++,Me(Math.round(($+O*v)*k)/k,a,qn(a,y,i))&&O++):$<a&&O++);O<S;++O){const I=Math.round(($+O*v)*k)/k;if(x&&I>r)break;e.push({value:I})}return x&&h&&M!==r?e.length&&Me(e[e.length-1].value,r,qn(r,y,i))?e[e.length-1].value=r:e.push({value:r}):(!x||M===r)&&e.push({value:M}),e}function qn(i,t,{horizontal:e,minRotation:s}){const n=bt(s),o=(e?Math.sin(n):Math.cos(n))||.001,a=.75*t*(""+i).length;return Math.min(t/o,a)}class bi extends ee{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return E(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:s}=this.getUserBounds();let{min:n,max:o}=this;const a=l=>n=e?n:l,r=l=>o=s?o:l;if(t){const l=_t(n),c=_t(o);l<0&&c<0?r(0):l>0&&c>0&&a(0)}if(n===o){let l=o===0?1:Math.abs(o*.05);r(o+l),t||a(n-l)}this.min=n,this.max=o}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:s}=t,n;return s?(n=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,n>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${n} ticks. Limiting to 1000.`),n=1e3)):(n=this.computeTickLimit(),e=e||11),e&&(n=Math.min(e,n)),n}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let s=this.getTickLimit();s=Math.max(2,s);const n={maxTicks:s,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},o=this._range||this,a=Sp(n,o);return t.bounds==="ticks"&&Do(a,this,"value"),t.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}configure(){const t=this.ticks;let e=this.min,s=this.max;if(super.configure(),this.options.offset&&t.length){const n=(s-e)/Math.max(t.length-1,1)/2;e-=n,s+=n}this._startValue=e,this._endValue=s,this._valueRange=s-e}getLabelForValue(t){return Fe(t,this.chart.options.locale,this.options.ticks.format)}}class cs extends bi{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=q(t)?t:0,this.max=q(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,s=bt(this.options.ticks.minRotation),n=(t?Math.sin(s):Math.cos(s))||.001,o=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,o.lineHeight/n))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}_(cs,"id","linear"),_(cs,"defaults",{ticks:{callback:xi.formatters.numeric}});const Ee=i=>Math.floor(Dt(i)),Yt=(i,t)=>Math.pow(10,Ee(i)+t);function Kn(i){return i/Math.pow(10,Ee(i))===1}function Jn(i,t,e){const s=Math.pow(10,e),n=Math.floor(i/s);return Math.ceil(t/s)-n}function Cp(i,t){const e=t-i;let s=Ee(e);for(;Jn(i,t,s)>10;)s++;for(;Jn(i,t,s)<10;)s--;return Math.min(s,Ee(i))}function zp(i,{min:t,max:e}){t=ht(i.min,t);const s=[],n=Ee(t);let o=Cp(t,e),a=o<0?Math.pow(10,Math.abs(o)):1;const r=Math.pow(10,o),l=n>o?Math.pow(10,n):0,c=Math.round((t-l)*a)/a,d=Math.floor((t-l)/r/10)*r*10;let p=Math.floor((c-d)/Math.pow(10,o)),h=ht(i.min,Math.round((l+d+p*Math.pow(10,o))*a)/a);for(;h<e;)s.push({value:h,major:Kn(h),significand:p}),p>=10?p=p<15?15:20:p++,p>=20&&(o++,p=2,a=o>=0?1:a),h=Math.round((l+d+p*Math.pow(10,o))*a)/a;const u=ht(i.max,h);return s.push({value:u,major:Kn(u),significand:p}),s}class ds extends ee{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const s=bi.prototype.parse.apply(this,[t,e]);if(s===0){this._zero=!0;return}return q(s)&&s>0?s:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=q(t)?Math.max(0,t):null,this.max=q(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!q(this._userMin)&&(this.min=t===Yt(this.min,0)?Yt(this.min,-1):Yt(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let s=this.min,n=this.max;const o=r=>s=t?s:r,a=r=>n=e?n:r;s===n&&(s<=0?(o(1),a(10)):(o(Yt(s,-1)),a(Yt(n,1)))),s<=0&&o(Yt(n,-1)),n<=0&&a(Yt(s,1)),this.min=s,this.max=n}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},s=zp(e,this);return t.bounds==="ticks"&&Do(s,this,"value"),t.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}getLabelForValue(t){return t===void 0?"0":Fe(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Dt(t),this._valueRange=Dt(this.max)-Dt(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Dt(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}_(ds,"id","logarithmic"),_(ds,"defaults",{ticks:{callback:xi.formatters.logarithmic,major:{enabled:!0}}});function ps(i){const t=i.ticks;if(t.display&&i.display){const e=rt(t.backdropPadding);return D(t.font&&t.font.size,Y.font.size)+e.height}return 0}function Pp(i,t,e){return e=G(e)?e:[e],{w:Er(i,t.string,e),h:e.length*t.lineHeight}}function Zn(i,t,e,s,n){return i===s||i===n?{start:t-e/2,end:t+e/2}:i<s||i>n?{start:t-e,end:t}:{start:t,end:t+e}}function Ap(i){const t={l:i.left+i._padding.left,r:i.right-i._padding.right,t:i.top+i._padding.top,b:i.bottom-i._padding.bottom},e=Object.assign({},t),s=[],n=[],o=i._pointLabels.length,a=i.options.pointLabels,r=a.centerPointLabels?F/o:0;for(let l=0;l<o;l++){const c=a.setContext(i.getPointLabelContext(l));n[l]=c.padding;const d=i.getPointPosition(l,i.drawingArea+n[l],r),p=Q(c.font),h=Pp(i.ctx,p,i._pointLabels[l]);s[l]=h;const u=ot(i.getIndexAngle(l)+r),g=Math.round(xs(u)),f=Zn(g,d.x,h.w,0,180),b=Zn(g,d.y,h.h,90,270);Rp(e,t,u,f,b)}i.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),i._pointLabelItems=Op(i,s,n)}function Rp(i,t,e,s,n){const o=Math.abs(Math.sin(e)),a=Math.abs(Math.cos(e));let r=0,l=0;s.start<t.l?(r=(t.l-s.start)/o,i.l=Math.min(i.l,t.l-r)):s.end>t.r&&(r=(s.end-t.r)/o,i.r=Math.max(i.r,t.r+r)),n.start<t.t?(l=(t.t-n.start)/a,i.t=Math.min(i.t,t.t-l)):n.end>t.b&&(l=(n.end-t.b)/a,i.b=Math.max(i.b,t.b+l))}function Dp(i,t,e){const s=i.drawingArea,{extra:n,additionalAngle:o,padding:a,size:r}=e,l=i.getPointPosition(t,s+n+a,o),c=Math.round(xs(ot(l.angle+J))),d=Ip(l.y,r.h,c),p=Ep(c),h=Lp(l.x,r.w,p);return{visible:!0,x:l.x,y:d,textAlign:p,left:h,top:d,right:h+r.w,bottom:d+r.h}}function Tp(i,t){if(!t)return!0;const{left:e,top:s,right:n,bottom:o}=i;return!(Pt({x:e,y:s},t)||Pt({x:e,y:o},t)||Pt({x:n,y:s},t)||Pt({x:n,y:o},t))}function Op(i,t,e){const s=[],n=i._pointLabels.length,o=i.options,{centerPointLabels:a,display:r}=o.pointLabels,l={extra:ps(o)/2,additionalAngle:a?F/n:0};let c;for(let d=0;d<n;d++){l.padding=e[d],l.size=t[d];const p=Dp(i,d,l);s.push(p),r==="auto"&&(p.visible=Tp(p,c),p.visible&&(c=p))}return s}function Ep(i){return i===0||i===180?"center":i<180?"left":"right"}function Lp(i,t,e){return e==="right"?i-=t:e==="center"&&(i-=t/2),i}function Ip(i,t,e){return e===90||e===270?i-=t/2:(e>270||e<90)&&(i-=t),i}function Fp(i,t,e){const{left:s,top:n,right:o,bottom:a}=e,{backdropColor:r}=t;if(!E(r)){const l=Jt(t.borderRadius),c=rt(t.backdropPadding);i.fillStyle=r;const d=s-c.left,p=n-c.top,h=o-s+c.width,u=a-n+c.height;Object.values(l).some(g=>g!==0)?(i.beginPath(),Te(i,{x:d,y:p,w:h,h:u,radius:l}),i.fill()):i.fillRect(d,p,h,u)}}function jp(i,t){const{ctx:e,options:{pointLabels:s}}=i;for(let n=t-1;n>=0;n--){const o=i._pointLabelItems[n];if(!o.visible)continue;const a=s.setContext(i.getPointLabelContext(n));Fp(e,a,o);const r=Q(a.font),{x:l,y:c,textAlign:d}=o;te(e,i._pointLabels[n],l,c+r.lineHeight/2,r,{color:a.color,textAlign:d,textBaseline:"middle"})}}function ka(i,t,e,s){const{ctx:n}=i;if(e)n.arc(i.xCenter,i.yCenter,t,0,H);else{let o=i.getPointPosition(0,t);n.moveTo(o.x,o.y);for(let a=1;a<s;a++)o=i.getPointPosition(a,t),n.lineTo(o.x,o.y)}}function Bp(i,t,e,s,n){const o=i.ctx,a=t.circular,{color:r,lineWidth:l}=t;!a&&!s||!r||!l||e<0||(o.save(),o.strokeStyle=r,o.lineWidth=l,o.setLineDash(n.dash||[]),o.lineDashOffset=n.dashOffset,o.beginPath(),ka(i,e,a,s),o.closePath(),o.stroke(),o.restore())}function Vp(i,t,e){return jt(i,{label:e,index:t,type:"pointLabel"})}class ke extends bi{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=rt(ps(this.options)/2),e=this.width=this.maxWidth-t.width,s=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+s/2+t.top),this.drawingArea=Math.floor(Math.min(e,s)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=q(t)&&!isNaN(t)?t:0,this.max=q(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/ps(this.options))}generateTickLabels(t){bi.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,s)=>{const n=N(this.options.pointLabels.callback,[e,s],this);return n||n===0?n:""}).filter((e,s)=>this.chart.getDataVisibility(s))}fit(){const t=this.options;t.display&&t.pointLabels.display?Ap(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,s,n){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((s-n)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,s,n))}getIndexAngle(t){const e=H/(this._pointLabels.length||1),s=this.options.startAngle||0;return ot(t*e+bt(s))}getDistanceFromCenterForValue(t){if(E(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(E(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const s=e[t];return Vp(this.getContext(),t,s)}}getPointPosition(t,e,s=0){const n=this.getIndexAngle(t)-J+s;return{x:Math.cos(n)*e+this.xCenter,y:Math.sin(n)*e+this.yCenter,angle:n}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:s,right:n,bottom:o}=this._pointLabelItems[t];return{left:e,top:s,right:n,bottom:o}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const s=this.ctx;s.save(),s.beginPath(),ka(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),s.closePath(),s.fillStyle=t,s.fill(),s.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:s,grid:n,border:o}=e,a=this._pointLabels.length;let r,l,c;if(e.pointLabels.display&&jp(this,a),n.display&&this.ticks.forEach((d,p)=>{if(p!==0||p===0&&this.min<0){l=this.getDistanceFromCenterForValue(d.value);const h=this.getContext(p),u=n.setContext(h),g=o.setContext(h);Bp(this,u,l,a,g)}}),s.display){for(t.save(),r=a-1;r>=0;r--){const d=s.setContext(this.getPointLabelContext(r)),{color:p,lineWidth:h}=d;!h||!p||(t.lineWidth=h,t.strokeStyle=p,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,l=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),c=this.getPointPosition(r,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,s=e.ticks;if(!s.display)return;const n=this.getIndexAngle(0);let o,a;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(n),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((r,l)=>{if(l===0&&this.min>=0&&!e.reverse)return;const c=s.setContext(this.getContext(l)),d=Q(c.font);if(o=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=d.string,a=t.measureText(r.label).width,t.fillStyle=c.backdropColor;const p=rt(c.backdropPadding);t.fillRect(-a/2-p.left,-o-d.size/2-p.top,a+p.width,d.size+p.height)}te(t,r.label,0,-o,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}_(ke,"id","radialLinear"),_(ke,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:xi.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),_(ke,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),_(ke,"descriptors",{angleLines:{_fallback:"grid"}});const $i={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},dt=Object.keys($i);function Qn(i,t){return i-t}function to(i,t){if(E(t))return null;const e=i._adapter,{parser:s,round:n,isoWeekday:o}=i._parseOpts;let a=t;return typeof s=="function"&&(a=s(a)),q(a)||(a=typeof s=="string"?e.parse(a,s):e.parse(a)),a===null?null:(n&&(a=n==="week"&&(re(o)||o===!0)?e.startOf(a,"isoWeek",o):e.startOf(a,n)),+a)}function eo(i,t,e,s){const n=dt.length;for(let o=dt.indexOf(i);o<n-1;++o){const a=$i[dt[o]],r=a.steps?a.steps:Number.MAX_SAFE_INTEGER;if(a.common&&Math.ceil((e-t)/(r*a.size))<=s)return dt[o]}return dt[n-1]}function Np(i,t,e,s,n){for(let o=dt.length-1;o>=dt.indexOf(e);o--){const a=dt[o];if($i[a].common&&i._adapter.diff(n,s,a)>=t-1)return a}return dt[e?dt.indexOf(e):0]}function Hp(i){for(let t=dt.indexOf(i)+1,e=dt.length;t<e;++t)if($i[dt[t]].common)return dt[t]}function io(i,t,e){if(!e)i[t]=!0;else if(e.length){const{lo:s,hi:n}=vs(e,t),o=e[s]>=t?e[s]:e[n];i[o]=!0}}function Wp(i,t,e,s){const n=i._adapter,o=+n.startOf(t[0].value,s),a=t[t.length-1].value;let r,l;for(r=o;r<=a;r=+n.add(r,1,s))l=e[r],l>=0&&(t[l].major=!0);return t}function so(i,t,e){const s=[],n={},o=t.length;let a,r;for(a=0;a<o;++a)r=t[a],n[r]=a,s.push({value:r,major:!1});return o===0||!e?s:Wp(i,s,n,e)}class Le extends ee{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const s=t.time||(t.time={}),n=this._adapter=new Zl._date(t.adapters.date);n.init(e),$e(s.displayFormats,n.formats()),this._parseOpts={parser:s.parser,round:s.round,isoWeekday:s.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:to(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,s=t.time.unit||"day";let{min:n,max:o,minDefined:a,maxDefined:r}=this.getUserBounds();function l(c){!a&&!isNaN(c.min)&&(n=Math.min(n,c.min)),!r&&!isNaN(c.max)&&(o=Math.max(o,c.max))}(!a||!r)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),n=q(n)&&!isNaN(n)?n:+e.startOf(Date.now(),s),o=q(o)&&!isNaN(o)?o:+e.endOf(Date.now(),s)+1,this.min=Math.min(n,o-1),this.max=Math.max(n+1,o)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],s=t[t.length-1]),{min:e,max:s}}buildTicks(){const t=this.options,e=t.time,s=t.ticks,n=s.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&n.length&&(this.min=this._userMin||n[0],this.max=this._userMax||n[n.length-1]);const o=this.min,a=this.max,r=_r(n,o,a);return this._unit=e.unit||(s.autoSkip?eo(e.minUnit,this.min,this.max,this._getLabelCapacity(o)):Np(this,r.length,e.minUnit,this.min,this.max)),this._majorUnit=!s.major.enabled||this._unit==="year"?void 0:Hp(this._unit),this.initOffsets(n),t.reverse&&r.reverse(),so(this,r,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,s=0,n,o;this.options.offset&&t.length&&(n=this.getDecimalForValue(t[0]),t.length===1?e=1-n:e=(this.getDecimalForValue(t[1])-n)/2,o=this.getDecimalForValue(t[t.length-1]),t.length===1?s=o:s=(o-this.getDecimalForValue(t[t.length-2]))/2);const a=t.length<3?.5:.25;e=et(e,0,a),s=et(s,0,a),this._offsets={start:e,end:s,factor:1/(e+1+s)}}_generate(){const t=this._adapter,e=this.min,s=this.max,n=this.options,o=n.time,a=o.unit||eo(o.minUnit,e,s,this._getLabelCapacity(e)),r=D(n.ticks.stepSize,1),l=a==="week"?o.isoWeekday:!1,c=re(l)||l===!0,d={};let p=e,h,u;if(c&&(p=+t.startOf(p,"isoWeek",l)),p=+t.startOf(p,c?"day":a),t.diff(s,e,a)>1e5*r)throw new Error(e+" and "+s+" are too far apart with stepSize of "+r+" "+a);const g=n.ticks.source==="data"&&this.getDataTimestamps();for(h=p,u=0;h<s;h=+t.add(h,r,a),u++)io(d,h,g);return(h===s||n.bounds==="ticks"||u===1)&&io(d,h,g),Object.keys(d).sort(Qn).map(f=>+f)}getLabelForValue(t){const e=this._adapter,s=this.options.time;return s.tooltipFormat?e.format(t,s.tooltipFormat):e.format(t,s.displayFormats.datetime)}format(t,e){const n=this.options.time.displayFormats,o=this._unit,a=e||n[o];return this._adapter.format(t,a)}_tickFormatFunction(t,e,s,n){const o=this.options,a=o.ticks.callback;if(a)return N(a,[t,e,s],this);const r=o.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&r[l],p=c&&r[c],h=s[e],u=c&&p&&h&&h.major;return this._adapter.format(t,n||(u?p:d))}generateTickLabels(t){let e,s,n;for(e=0,s=t.length;e<s;++e)n=t[e],n.label=this._tickFormatFunction(n.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,s=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+s)*e.factor)}getValueForPixel(t){const e=this._offsets,s=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+s*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,s=this.ctx.measureText(t).width,n=bt(this.isHorizontal()?e.maxRotation:e.minRotation),o=Math.cos(n),a=Math.sin(n),r=this._resolveTickFontOptions(0).size;return{w:s*o+r*a,h:s*a+r*o}}_getLabelCapacity(t){const e=this.options.time,s=e.displayFormats,n=s[e.unit]||s.millisecond,o=this._tickFormatFunction(t,0,so(this,[t],this._majorUnit),n),a=this._getLabelSize(o),r=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return r>0?r:1}getDataTimestamps(){let t=this._cache.data||[],e,s;if(t.length)return t;const n=this.getMatchingVisibleMetas();if(this._normalized&&n.length)return this._cache.data=n[0].controller.getAllParsedValues(this);for(e=0,s=n.length;e<s;++e)t=t.concat(n[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,s;if(t.length)return t;const n=this.getLabels();for(e=0,s=n.length;e<s;++e)t.push(to(this,n[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Eo(t.sort(Qn))}}_(Le,"id","time"),_(Le,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function Qe(i,t,e){let s=0,n=i.length-1,o,a,r,l;e?(t>=i[s].pos&&t<=i[n].pos&&({lo:s,hi:n}=zt(i,"pos",t)),{pos:o,time:r}=i[s],{pos:a,time:l}=i[n]):(t>=i[s].time&&t<=i[n].time&&({lo:s,hi:n}=zt(i,"time",t)),{time:o,pos:r}=i[s],{time:a,pos:l}=i[n]);const c=a-o;return c?r+(l-r)*(t-o)/c:r}class hs extends Le{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=Qe(e,this.min),this._tableRange=Qe(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:s}=this,n=[],o=[];let a,r,l,c,d;for(a=0,r=t.length;a<r;++a)c=t[a],c>=e&&c<=s&&n.push(c);if(n.length<2)return[{time:e,pos:0},{time:s,pos:1}];for(a=0,r=n.length;a<r;++a)d=n[a+1],l=n[a-1],c=n[a],Math.round((d+l)/2)!==c&&o.push({time:c,pos:a/(r-1)});return o}_generate(){const t=this.min,e=this.max;let s=super.getDataTimestamps();return(!s.includes(t)||!s.length)&&s.splice(0,0,t),(!s.includes(e)||s.length===1)&&s.push(e),s.sort((n,o)=>n-o)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),s=this.getLabelTimestamps();return e.length&&s.length?t=this.normalize(e.concat(s)):t=e.length?e:s,t=this._cache.all=t,t}getDecimalForValue(t){return(Qe(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,s=this.getDecimalForPixel(t)/e.factor-e.end;return Qe(this._table,s*this._tableRange+this._minPos,!0)}}_(hs,"id","timeseries"),_(hs,"defaults",Le.defaults);var Gp=Object.freeze({__proto__:null,CategoryScale:ls,LinearScale:cs,LogarithmicScale:ds,RadialLinearScale:ke,TimeScale:Le,TimeSeriesScale:hs});const Yp=[Jl,Cd,_p,Gp];ut.register(...Yp);const Kt={};function Mi(){return!!document.querySelector(".demo-wrapper.theme-light")}function As(i,t){Kt[i]&&(Kt[i].destroy(),delete Kt[i]);const e=document.getElementById(i);if(!e)return null;const s=Mi();ut.defaults.color=s?"#6b7280":"rgba(255,255,255,0.40)",ut.defaults.borderColor=s?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.06)",ut.defaults.font.family="'Inter', sans-serif",ut.defaults.font.size=12;const n=new ut(e,t);return Kt[i]=n,n}function Up(){Object.values(Kt).forEach(i=>{try{i.destroy()}catch{}}),Object.keys(Kt).forEach(i=>delete Kt[i])}function Rs(){return getComputedStyle(document.documentElement).getPropertyValue("--industry-accent").trim()||"#6366f1"}function Ds(){return getComputedStyle(document.documentElement).getPropertyValue("--industry-accent-rgb").trim()||"99, 102, 241"}function Si(i,{labels:t,datasets:e,height:s=240}){const n=document.getElementById(i);n&&(n.style.height=s+"px");const o=Rs(),a=Ds(),r=Mi(),l=r?"#9ca3af":"rgba(255,255,255,0.35)",c=r?"rgba(0,0,0,0.05)":"rgba(255,255,255,0.04)",d=r?"#374151":"rgba(255,255,255,0.40)",p=r?"#ffffff":"#1f1f1f",h=r?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.10)";return As(i,{type:"line",data:{labels:t,datasets:e.map((u,g)=>({label:u.label,data:u.data,borderColor:g===0?o:`rgba(${a},0.4)`,backgroundColor:g===0?`rgba(${a},0.10)`:"transparent",fill:g===0,tension:.4,pointRadius:4,pointHoverRadius:6,pointBackgroundColor:g===0?o:`rgba(${a},0.4)`,pointBorderColor:"transparent",borderWidth:2,...u.extra}))},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:e.length>1,labels:{color:d,boxWidth:12,padding:16}},tooltip:{backgroundColor:p,borderColor:h,borderWidth:1,padding:12,titleColor:r?"#111827":"rgba(255,255,255,0.80)",bodyColor:r?"#374151":"rgba(255,255,255,0.60)"}},scales:{x:{grid:{color:c},ticks:{color:l}},y:{grid:{color:c},ticks:{color:l},beginAtZero:!0}}}})}function Ci(i,{labels:t,datasets:e,height:s=240,horizontal:n=!1}){const o=document.getElementById(i);o&&(o.style.height=s+"px");const a=Rs(),r=Ds(),l=Mi(),c=l?"#9ca3af":"rgba(255,255,255,0.35)",d=l?"rgba(0,0,0,0.05)":"rgba(255,255,255,0.04)",p=l?"#374151":"rgba(255,255,255,0.40)",h=l?"#ffffff":"#1f1f1f",u=l?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.10)",g=[a,`rgba(${r},0.55)`,`rgba(${r},0.35)`,`rgba(${r},0.20)`];return As(i,{type:"bar",data:{labels:t,datasets:e.map((f,b)=>({label:f.label,data:f.data,backgroundColor:e.length===1?t.map((m,x)=>`rgba(${r},${.9-x*.08})`):g[b],borderRadius:n?4:6,borderSkipped:!1,...f.extra}))},options:{indexAxis:n?"y":"x",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:e.length>1,labels:{color:p}},tooltip:{backgroundColor:h,borderColor:u,borderWidth:1,padding:12,titleColor:l?"#111827":"rgba(255,255,255,0.80)",bodyColor:l?"#374151":"rgba(255,255,255,0.60)"}},scales:{x:{grid:{color:d},ticks:{color:c}},y:{grid:{color:d},ticks:{color:c},beginAtZero:!0}}}})}function zi(i,{labels:t,data:e,height:s=220}){const n=document.getElementById(i);n&&(n.style.height=s+"px");const o=Rs(),a=Ds(),r=Mi(),l=r?"#374151":"rgba(255,255,255,0.50)",c=r?"#ffffff":"#1f1f1f",d=r?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.10)",p=r?"#f1f5f9":"#111111",h=[o,`rgba(${a},0.65)`,`rgba(${a},0.40)`,`rgba(${a},0.22)`,`rgba(${a},0.12)`];return As(i,{type:"doughnut",data:{labels:t,datasets:[{data:e,backgroundColor:h.slice(0,e.length),borderColor:p,borderWidth:3,hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"68%",plugins:{legend:{position:"right",labels:{color:l,boxWidth:12,padding:14,font:{size:12}}},tooltip:{backgroundColor:c,borderColor:d,borderWidth:1,padding:12,titleColor:r?"#111827":"rgba(255,255,255,0.80)",bodyColor:r?"#374151":"rgba(255,255,255,0.60)"}}}})}const us={};function j(i,t){us[i]=t}function Xp(i){window.location.hash=i}function qp(){return window.location.hash.replace("#","")||"/"}async function no(){const i=qp();Up();let t=us[i];if(t||(t=us["/"]),!t)return;const e=document.getElementById("app");e&&(e.style.transition="opacity 0.12s ease",e.style.opacity="0",await new Promise(s=>setTimeout(s,80)),t(),requestAnimationFrame(()=>{e.style.transition="opacity 0.22s ease",e.style.opacity="1"}),window.scrollTo(0,0),window.dispatchEvent(new CustomEvent("routechange",{detail:{path:i}})))}function oo(){window.addEventListener("hashchange",no),no()}const Kp="Nuxorb_2026$",$a="nx_auth";function Jp(){return sessionStorage.getItem($a)==="1"}function Zp(i){const t=document.getElementById("app");t.innerHTML=`
    <div id="nx-login" style="
      min-height: 100vh;
      background: var(--nuxorb-black);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    ">
      <div style="margin-bottom: 3rem; text-align: center;">
        <div style="font-family: 'Inter', sans-serif; font-size: 2.2rem; font-weight: 800; letter-spacing: 0.22em;">
          <span style="color: var(--nuxorb-accent);">NUX</span><span style="color: #fff;">ORB</span>
        </div>
        <div style="margin-top: 0.6rem; font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.35); font-weight: 500;">
          Experience &middot; Acceso privado
        </div>
      </div>

      <div style="
        background: var(--nuxorb-card);
        border: 1px solid var(--border-normal);
        border-radius: var(--radius-xl);
        padding: 2.5rem;
        width: 100%;
        max-width: 420px;
        box-shadow: var(--shadow-xl);
      ">
        <h2 style="color: #fff; font-size: 1.2rem; font-weight: 700; margin: 0 0 0.4rem;">Acceso restringido</h2>
        <p style="color: rgba(255,255,255,0.45); font-size: 0.85rem; margin: 0 0 1.75rem; line-height: 1.6;">
          Esta área es de uso exclusivo para clientes y colaboradores de NUXORB.
        </p>

        <div id="nx-error" style="
          display: none;
          background: rgba(239,68,68,0.10);
          border: 1px solid rgba(239,68,68,0.28);
          border-radius: var(--radius-md);
          padding: 0.7rem 1rem;
          margin-bottom: 1.25rem;
          color: #f87171;
          font-size: 0.8rem;
          letter-spacing: 0.02em;
        ">Contraseña incorrecta. Intenta de nuevo.</div>

        <label for="nx-password" style="
          display: block;
          font-size: 0.68rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          color: rgba(255,255,255,0.4);
          margin-bottom: 0.5rem;
        ">Contraseña</label>

        <input
          id="nx-password"
          type="password"
          placeholder="••••••••••••"
          autocomplete="current-password"
          style="
            width: 100%;
            background: var(--nuxorb-surface);
            border: 1px solid var(--border-normal);
            border-radius: var(--radius-md);
            padding: 0.8rem 1rem;
            color: #fff;
            font-size: 0.95rem;
            font-family: 'Inter', sans-serif;
            outline: none;
            transition: border-color 150ms ease;
            box-sizing: border-box;
          "
        />

        <button id="nx-submit" style="
          width: 100%;
          margin-top: 1.25rem;
          background: var(--nuxorb-accent);
          border: none;
          border-radius: var(--radius-md);
          padding: 0.9rem;
          color: #fff;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: opacity 150ms ease;
        " onmouseover="this.style.opacity='0.88'" onmouseout="this.style.opacity='1'">
          Ingresar &rarr;
        </button>
      </div>

      <div style="margin-top: 2.5rem; font-size: 0.67rem; color: rgba(255,255,255,0.18); letter-spacing: 0.12em; text-transform: uppercase;">
        &copy; 2026 NUXORB &mdash; Uso exclusivo de clientes
      </div>
    </div>
  `;const e=document.getElementById("nx-password"),s=document.getElementById("nx-submit"),n=document.getElementById("nx-error");function o(){e.value===Kp?(sessionStorage.setItem($a,"1"),i()):(n.style.display="block",e.value="",e.style.borderColor="rgba(239,68,68,0.55)",e.focus(),setTimeout(()=>{e.style.borderColor=""},1600))}s.addEventListener("click",o),e.addEventListener("keydown",a=>{a.key==="Enter"&&o()}),requestAnimationFrame(()=>e.focus())}let At=null;function Qp(){return(!At||!document.body.contains(At))&&(At=document.getElementById("toast-container"),At||(At=document.createElement("div"),At.id="toast-container",document.body.appendChild(At))),At}function Pi(i,t="info",e=3e3){const s=Qp(),n={success:"bi-check-circle-fill",error:"bi-x-circle-fill",info:"bi-info-circle-fill",warning:"bi-exclamation-triangle-fill"},o=document.createElement("div");o.className=`toast-nux ${t}`,o.innerHTML=`<i class="bi ${n[t]}"></i><span>${i}</span>`,s.appendChild(o),setTimeout(()=>{o.classList.add("out"),setTimeout(()=>o.remove(),300)},e)}const mi=i=>Pi(i,"success"),th=i=>Pi(i,"error"),Ts=i=>Pi(i,"info"),eh=i=>Pi(i,"warning"),ih=[{key:"restaurantes",nombre:"Restaurantes",desc:"Control de mesas, órdenes en tiempo real, CRM de clientes frecuentes y reportes de ventas.",icon:"bi-cup-hot-fill",accent:"#f97316",accentRgb:"249,115,22",empresa:"La Mesa Digital",demos:[{label:"CRM de Clientes",icon:"bi-people-fill",path:"/restaurantes/crm"},{label:"Dashboard Ejecutivo",icon:"bi-bar-chart-fill",path:"/restaurantes/dashboard"},{label:"Operaciones",icon:"bi-grid-3x3",path:"/restaurantes/operaciones"}]},{key:"salud",nombre:"Salud",desc:"Gestión de citas, expedientes clínicos, control de consultorios y estadísticas médicas.",icon:"bi-heart-pulse-fill",accent:"#06b6d4",accentRgb:"6,182,212",empresa:"MediCore",demos:[{label:"Expedientes",icon:"bi-folder2-open",path:"/salud/crm"},{label:"Dashboard Clínico",icon:"bi-bar-chart-fill",path:"/salud/dashboard"},{label:"Agenda del Día",icon:"bi-calendar-check",path:"/salud/operaciones"}]},{key:"construccion",nombre:"Construcción",desc:"Seguimiento de obras, control de materiales, gestión de personal y avance de proyectos.",icon:"bi-building-gear",accent:"#eab308",accentRgb:"234,179,8",empresa:"BuildPro",demos:[{label:"Gestión de Proyectos",icon:"bi-hammer",path:"/construccion/crm"},{label:"Dashboard de Obra",icon:"bi-bar-chart-fill",path:"/construccion/dashboard"},{label:"Tablero Operativo",icon:"bi-kanban-fill",path:"/construccion/operaciones"}]},{key:"retail",nombre:"Retail",desc:"Punto de venta, inventario inteligente, programa de lealtad y análisis de ventas.",icon:"bi-bag-heart-fill",accent:"#10b981",accentRgb:"16,185,129",empresa:"Storely",demos:[{label:"CRM de Clientes",icon:"bi-people-fill",path:"/retail/crm"},{label:"Dashboard de Ventas",icon:"bi-bar-chart-fill",path:"/retail/dashboard"},{label:"Punto de Venta",icon:"bi-cart-fill",path:"/retail/operaciones"}]},{key:"servicios",nombre:"Servicios",desc:"CRM para empresas de servicios, gestión de tickets, agenda y seguimiento de contratos.",icon:"bi-lightning-charge-fill",accent:"#8b5cf6",accentRgb:"139,92,246",empresa:"FlowService",demos:[{label:"CRM de Clientes",icon:"bi-people-fill",path:"/servicios/crm"},{label:"Dashboard MRR",icon:"bi-bar-chart-fill",path:"/servicios/dashboard"},{label:"Gestión de Tickets",icon:"bi-headset",path:"/servicios/operaciones"}]},{key:"saas",nombre:"SaaS / Software",desc:"MRR, ARR, churn, pipeline de ventas, onboarding y métricas de crecimiento B2B.",icon:"bi-rocket-takeoff-fill",accent:"#6366f1",accentRgb:"99,102,241",empresa:"LaunchPad",demos:[{label:"CRM de Cuentas",icon:"bi-buildings",path:"/saas/crm"},{label:"Dashboard SaaS",icon:"bi-bar-chart-fill",path:"/saas/dashboard"},{label:"Pipeline de Ventas",icon:"bi-kanban-fill",path:"/saas/operaciones"}]},{key:"educacion",nombre:"Educación",desc:"Academia y cursos: seguimiento de alumnos, asistencia, calificaciones y cobros.",icon:"bi-mortarboard-fill",accent:"#f59e0b",accentRgb:"245,158,11",empresa:"EduTrack",demos:[{label:"CRM de Alumnos",icon:"bi-people-fill",path:"/educacion/crm"},{label:"Dashboard Académico",icon:"bi-bar-chart-fill",path:"/educacion/dashboard"},{label:"Operaciones del Día",icon:"bi-calendar3",path:"/educacion/operaciones"}]},{key:"fitness",nombre:"Fitness & Gym",desc:"Membresías, control de acceso, clases grupales, trainers e ingresos del gimnasio.",icon:"bi-heart-pulse-fill",accent:"#ec4899",accentRgb:"236,72,153",empresa:"PowerGym",demos:[{label:"CRM de Miembros",icon:"bi-people-fill",path:"/fitness/crm"},{label:"Dashboard del Gym",icon:"bi-bar-chart-fill",path:"/fitness/dashboard"},{label:"Control de Acceso",icon:"bi-door-open-fill",path:"/fitness/operaciones"}]}];function Ma(){return`
  <!-- ══════════ HERO ══════════ -->
  <section style="min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;padding:80px 24px">
    <div class="orb" style="background:rgba(3,144,132,0.15);top:10%;left:5%;width:500px;height:500px"></div>
    <div class="orb" style="background:rgba(254,93,3,0.10);bottom:15%;right:10%;width:400px;height:400px"></div>
    <div class="orb" style="background:rgba(106,246,228,0.08);top:50%;left:50%;width:350px;height:350px"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.02) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>

    <div style="text-align:center;max-width:820px;position:relative;z-index:1">
      <div class="anim-fade-up" style="display:inline-flex;align-items:center;gap:8px;padding:6px 16px;border-radius:99px;background:rgba(3,144,132,0.12);border:1px solid rgba(3,144,132,0.30);font-size:13px;font-weight:600;color:#6af6e4;margin-bottom:28px">
        <i class="bi bi-stars"></i> Experiencia interactiva de software empresarial
      </div>
      <h1 class="anim-fade-up delay-1" style="font-size:clamp(2.4rem,6vw,4.2rem);font-weight:900;letter-spacing:-0.04em;line-height:1.08;margin-bottom:24px">
        Así podría verse el software que
        <span class="home-gradient-text"> construiremos exclusivamente</span>
        para tu empresa.
      </h1>
      <p class="anim-fade-up delay-2" style="font-size:1.15rem;color:rgba(255,255,255,0.50);max-width:580px;margin:0 auto 40px;line-height:1.75">
        Navega por demos reales de distintas industrias. Cada pantalla refleja cómo se vería un sistema diseñado específicamente para tu negocio.
      </p>
      <div class="anim-fade-up delay-3" style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
        <button class="btn-nux btn-primary-nux" style="font-size:15px;padding:13px 28px;--industry-accent:#fe5d03;--industry-accent-rgb:254,93,3" onclick="scrollToSection('demos')">
          <i class="bi bi-play-fill"></i> Ver demos
        </button>
        <button class="btn-nux btn-secondary-nux" style="font-size:15px;padding:13px 28px" onclick="window.location.hash='/inspiracion'">
          <i class="bi bi-lightbulb"></i> Inspiration Lab
        </button>
      </div>
      <div class="anim-fade-up delay-4" style="display:flex;gap:40px;justify-content:center;margin-top:64px;flex-wrap:wrap">
        ${[{n:"8",label:"Industrias"},{n:"24",label:"Demos interactivos"},{n:"100%",label:"A medida"}].map(i=>`
          <div style="text-align:center">
            <div style="font-size:2rem;font-weight:900;color:white;letter-spacing:-0.04em">${i.n}</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.38);font-weight:500;margin-top:4px">${i.label}</div>
          </div>
        `).join('<div style="width:1px;background:rgba(255,255,255,0.08)"></div>')}
      </div>
    </div>
  </section>

  <!-- ══════════ DEMOS ══════════ -->
  <section id="demos" style="padding:80px 24px;max-width:1280px;margin:0 auto">
    <div style="text-align:center;margin-bottom:56px" data-reveal>
      <div style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6af6e4;padding:5px 14px;border:1px solid rgba(106,246,228,0.30);border-radius:99px;margin-bottom:16px">
        <i class="bi bi-grid-3x3-gap"></i> 24 demos listos para explorar
      </div>
      <h2 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;letter-spacing:-0.04em;color:white;margin-bottom:12px">Elige tu industria y entra directo al demo</h2>
      <p style="font-size:1rem;color:rgba(255,255,255,0.42);max-width:540px;margin:0 auto">Haz clic en cualquiera de los 3 módulos de cada industria para verlo en acción.</p>
    </div>

    <div style="display:flex;flex-direction:column;gap:20px">
      ${ih.map((i,t)=>`
      <div data-reveal style="
        border:1px solid rgba(${i.accentRgb},0.15);
        border-radius:20px;
        overflow:hidden;
        background:rgba(${i.accentRgb},0.03);
        transition:border-color 0.3s ease;
      "
      onmouseenter="this.style.borderColor='rgba(${i.accentRgb},0.30)'"
      onmouseleave="this.style.borderColor='rgba(${i.accentRgb},0.15)'"
      >
        <!-- Header fila -->
        <div style="display:flex;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid rgba(${i.accentRgb},0.10)">
          <div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:rgba(${i.accentRgb},0.12);color:${i.accent};flex-shrink:0">
            <i class="bi ${i.icon}"></i>
          </div>
          <div>
            <div style="font-size:16px;font-weight:800;color:white;letter-spacing:-0.02em">${i.nombre}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.38)">${i.empresa} · ${i.desc.substring(0,60)}...</div>
          </div>
          <div style="margin-left:auto;display:flex;gap:6px">
            <span style="font-size:11px;font-weight:700;color:${i.accent};padding:3px 10px;background:rgba(${i.accentRgb},0.10);border:1px solid rgba(${i.accentRgb},0.20);border-radius:99px">
              3 demos
            </span>
          </div>
        </div>

        <!-- 3 demos en grid -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr)">
          ${i.demos.map((e,s)=>`
          <div onclick="window.location.hash='${e.path}'" style="
            padding:20px 24px;
            cursor:pointer;
            display:flex;align-items:center;gap:14px;
            border-right:${s<2?"1px solid rgba("+i.accentRgb+",0.08)":"none"};
            transition:background 0.2s ease;
            position:relative;
          "
          onmouseenter="this.style.background='rgba(${i.accentRgb},0.08)'"
          onmouseleave="this.style.background='transparent'"
          >
            <div style="width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;background:rgba(${i.accentRgb},0.10);color:${i.accent};flex-shrink:0">
              <i class="bi ${e.icon}"></i>
            </div>
            <div>
              <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.90);margin-bottom:3px">${e.label}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.35);display:flex;align-items:center;gap:4px">
                <i class="bi bi-arrow-right" style="color:${i.accent};font-size:10px"></i> Abrir demo
              </div>
            </div>
          </div>
          `).join("")}
        </div>
      </div>
      `).join("")}
    </div>

    <!-- Inspiration Lab card -->
    <div data-reveal style="margin-top:20px;padding:28px 32px;border:1px dashed rgba(254,93,3,0.25);border-radius:20px;display:flex;align-items:center;gap:24px;cursor:pointer;transition:all 0.3s ease"
    onclick="window.location.hash='/inspiracion'"
    onmouseenter="this.style.background='rgba(254,93,3,0.06)';this.style.borderColor='rgba(254,93,3,0.45)'"
    onmouseleave="this.style.background='transparent';this.style.borderColor='rgba(254,93,3,0.25)'">
      <div style="width:52px;height:52px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;background:rgba(254,93,3,0.12);color:#fe5d03;flex-shrink:0">
        <i class="bi bi-lightbulb-fill"></i>
      </div>
      <div>
        <div style="font-size:16px;font-weight:800;color:white;margin-bottom:4px">Inspiration Lab <span style="font-size:12px;background:rgba(254,93,3,0.15);color:#fe5d03;padding:2px 10px;border-radius:99px;font-weight:600;margin-left:8px">+20 ideas</span></div>
        <div style="font-size:13px;color:rgba(255,255,255,0.40)">¿No ves tu industria? Explora más ideas de software para sembrar nuevas posibilidades en tu negocio.</div>
      </div>
      <div style="margin-left:auto;color:#fe5d03;font-size:20px"><i class="bi bi-arrow-right"></i></div>
    </div>
  </section>

  <!-- ══════════ HOW IT WORKS ══════════ -->
  <section id="how-it-works" style="padding:80px 24px;background:rgba(255,255,255,0.015);border-top:1px solid rgba(255,255,255,0.05);border-bottom:1px solid rgba(255,255,255,0.05)">
    <div style="max-width:1100px;margin:0 auto">
      <div style="text-align:center;margin-bottom:56px">
        <div style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#6af6e4;padding:5px 14px;border:1px solid rgba(106,246,228,0.30);border-radius:99px;margin-bottom:16px">El proceso</div>
        <h2 style="font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;letter-spacing:-0.04em;color:white;margin-bottom:12px">Así construimos tu software</h2>
        <p style="font-size:1rem;color:rgba(255,255,255,0.42);max-width:480px;margin:0 auto">Un proceso claro, sin sorpresas, con resultados que superan expectativas.</p>
      </div>
      <div class="row g-4">
        ${[{n:"01",icon:"bi-chat-dots-fill",title:"Llamada de descubrimiento",desc:"Entendemos tu negocio, tus procesos y qué necesitas automatizar o mejorar."},{n:"02",icon:"bi-pencil-square",title:"Propuesta a medida",desc:"Diseñamos la arquitectura y flujos específicos para tu empresa. Sin plantillas."},{n:"03",icon:"bi-code-slash",title:"Desarrollo iterativo",desc:"Construimos tu software en sprints con entregas continuas y feedback constante."},{n:"04",icon:"bi-rocket-takeoff-fill",title:"Lanzamiento y soporte",desc:"Entregamos, capacitamos a tu equipo y damos soporte continuo post-lanzamiento."}].map((i,t)=>`
          <div class="col-md-6 col-lg-3" data-reveal>
            <div style="padding:24px;height:100%">
              <div style="font-size:11px;font-weight:900;letter-spacing:0.15em;color:rgba(3,144,132,0.7);margin-bottom:12px">${i.n}</div>
              <div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:rgba(3,144,132,0.12);color:#6af6e4;margin-bottom:16px;border:1px solid rgba(3,144,132,0.22)"><i class="bi ${i.icon}"></i></div>
              <h3 style="font-size:1.05rem;font-weight:700;color:white;margin-bottom:8px">${i.title}</h3>
              <p style="font-size:0.88rem;color:rgba(255,255,255,0.45);line-height:1.65">${i.desc}</p>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </section>

  <!-- ══════════ CTA ══════════ -->
  <section style="padding:100px 24px;text-align:center;position:relative;overflow:hidden">
    <div class="orb" style="background:rgba(3,144,132,0.12);top:0;left:50%;transform:translateX(-50%);width:600px;height:600px"></div>
    <div style="position:relative;z-index:1;max-width:620px;margin:0 auto" data-reveal>
      <h2 style="font-size:clamp(1.8rem,4vw,3rem);font-weight:900;letter-spacing:-0.04em;margin-bottom:20px">
        ¿Listo para ver cómo se<br>vería <span class="home-gradient-text">tu software?</span>
      </h2>
      <p style="font-size:1.05rem;color:rgba(255,255,255,0.48);margin-bottom:40px;line-height:1.75">
        Agenda una llamada gratuita. En 30 minutos te mostramos posibilidades reales para tu empresa.
      </p>
      <button class="btn-nux btn-primary-nux" style="font-size:16px;padding:14px 32px;--industry-accent:#fe5d03;--industry-accent-rgb:254,93,3" onclick="window.open('https://wa.me/5214400000000?text=Hola+Nuxorb+quiero+agendar+una+llamada','_blank')">
        <i class="bi bi-whatsapp"></i> Agendar llamada gratis
      </button>
    </div>
  </section>

  <!-- ══════════ FOOTER ══════════ -->
  <footer style="border-top:1px solid rgba(106,246,228,0.10);padding:32px 48px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
    <img src="/logo-full.png" height="44" alt="Nuxorb" style="object-fit:contain"/>
    <div style="font-size:13px;color:rgba(255,255,255,0.28)">Software a medida para PyMEs mexicanas © 2025</div>
    <div style="font-size:13px;color:rgba(255,255,255,0.28)">Demo visual — sin datos reales</div>
  </footer>
  `}function Sa(){}const Ca=[{cat:"Gestión",icon:"bi-people-fill",color:"#6366f1",titulo:"CRM para PyMEs",desc:"Seguimiento de leads, clientes, cotizaciones y ventas en un solo lugar."},{cat:"Operaciones",icon:"bi-kanban-fill",color:"#f97316",titulo:"Tablero Kanban de Proyectos",desc:"Visualiza el avance de tus proyectos con metodología ágil adaptada a tu equipo."},{cat:"E-commerce",icon:"bi-cart-fill",color:"#10b981",titulo:"Tienda en línea propia",desc:"Sin comisiones de terceros. Tu catálogo, tus precios, tu marca."},{cat:"Logística",icon:"bi-truck-fill",color:"#eab308",titulo:"Control de Flotilla",desc:"Rastreo de unidades, asignación de rutas y reportes de combustible."},{cat:"RH",icon:"bi-person-badge-fill",color:"#8b5cf6",titulo:"Portal de Empleados",desc:"Vacaciones, nómina, expedientes digitales y comunicados internos."},{cat:"Salud",icon:"bi-clipboard2-pulse-fill",color:"#06b6d4",titulo:"Expediente Clínico Digital",desc:"Historial médico completo, recetas, estudios y seguimiento por paciente."},{cat:"Educación",icon:"bi-mortarboard-fill",color:"#f97316",titulo:"Plataforma de Cursos",desc:"Clases en video, evaluaciones, certificados y seguimiento de alumnos."},{cat:"Restaurantes",icon:"bi-cup-hot-fill",color:"#ef4444",titulo:"Sistema de Comandas",desc:"Órdenes en tiempo real entre sala, cocina y barra. Sin errores."},{cat:"Construcción",icon:"bi-building-fill",color:"#eab308",titulo:"Control de Obras",desc:"Avance por actividad, bitácora diaria, alertas de materiales y presupuesto."},{cat:"Finanzas",icon:"bi-cash-coin",color:"#10b981",titulo:"Facturación & Cobranza",desc:"Genera facturas CFDI, da seguimiento a pagos y anticipa tu flujo de caja."},{cat:"E-commerce",icon:"bi-bag-heart-fill",color:"#ec4899",titulo:"Programa de Lealtad",desc:"Puntos, niveles, recompensas y comunicación directa con tus clientes frecuentes."},{cat:"Logística",icon:"bi-box-seam-fill",color:"#06b6d4",titulo:"Inventario Inteligente",desc:"Alertas de stock mínimo, trazabilidad de lotes y reportes de rotación."},{cat:"Servicios",icon:"bi-headset",color:"#8b5cf6",titulo:"Mesa de Ayuda (Helpdesk)",desc:"Tickets, SLAs, prioridades y satisfacción del cliente en tiempo real."},{cat:"Marketing",icon:"bi-megaphone-fill",color:"#f97316",titulo:"Automatización de Marketing",desc:"Campañas por WhatsApp, email y SMS activadas por comportamiento del cliente."},{cat:"Salud",icon:"bi-calendar-check-fill",color:"#06b6d4",titulo:"Agenda Médica Online",desc:"Citas por internet, recordatorios automáticos y gestión de consultorios."},{cat:"RH",icon:"bi-graph-up-arrow",color:"#10b981",titulo:"Dashboard de RRHH",desc:"Productividad, asistencia, rotación y métricas de clima laboral."},{cat:"Construcción",icon:"bi-people-fill",color:"#eab308",titulo:"Control de Personal en Obra",desc:"Asistencia con QR, asignación de cuadrillas y registro de incidencias."},{cat:"Finanzas",icon:"bi-bar-chart-fill",color:"#6366f1",titulo:"Reportes Ejecutivos",desc:"KPIs clave de tu negocio en un dashboard que puedes ver desde el celular."},{cat:"Educación",icon:"bi-phone-fill",color:"#f97316",titulo:"App Escolar para Padres",desc:"Calificaciones, avisos, pagos y comunicación directa con maestros."},{cat:"Gestión",icon:"bi-file-earmark-text-fill",color:"#8b5cf6",titulo:"Contratos Digitales",desc:"Firma electrónica, versionado y recordatorios de renovación de contratos."},{cat:"Marketing",icon:"bi-qr-code",color:"#ec4899",titulo:"Portal de Clientes",desc:"Cada cliente accede a su estado de cuenta, facturas y tickets de soporte."},{cat:"Servicios",icon:"bi-calendar3",color:"#06b6d4",titulo:"Agenda Inteligente",desc:"Reservas online con disponibilidad en tiempo real y pagos integrados."}],sh=["Todas",...new Set(Ca.map(i=>i.cat))];function nh(){return`
  <section style="padding:80px 24px 120px;max-width:1200px;margin:0 auto">

    <!-- Header -->
    <div style="margin-bottom:56px" data-reveal>
      <button class="back-btn" onclick="window.location.hash='/'">
        <i class="bi bi-arrow-left"></i> Volver
      </button>
      <div style="margin-top:32px">
        <div class="section-label" style="--industry-accent:#6366f1;--industry-accent-rgb:99,102,241;margin-bottom:10px">
          <i class="bi bi-lightbulb-fill"></i> Inspiration Lab
        </div>
        <h1 style="font-size:clamp(2rem,5vw,3.2rem);font-weight:900;letter-spacing:-0.04em;margin-bottom:16px">
          Ideas de software<br><span class="home-gradient-text">para tu empresa</span>
        </h1>
        <p style="font-size:1.05rem;color:rgba(255,255,255,0.48);max-width:560px;line-height:1.75">
          No todas las empresas necesitan las mismas herramientas. Aquí hay más de 20 ideas de lo que podríamos construir juntos.
        </p>
      </div>
    </div>

    <!-- Filtros de categoría -->
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:40px" id="cat-filters">
      ${sh.map((i,t)=>`
        <button class="btn-nux ${t===0?"btn-primary-nux":"btn-ghost-nux"} cat-filter-btn" data-cat="${i}"
          style="font-size:13px;padding:7px 16px">
          ${i}
        </button>
      `).join("")}
    </div>

    <!-- Ideas grid -->
    <div class="row g-3" id="ideas-grid">
      ${Ca.map((i,t)=>`
        <div class="col-lg-4 col-md-6 idea-card-wrap" data-cat="${i.cat}">
          <div style="
            padding:22px;height:100%;
            background:rgba(255,255,255,0.025);
            border:1px solid rgba(255,255,255,0.07);
            border-radius:var(--radius-lg);
            transition:all 0.25s ease;
            cursor:default;
          "
          class="anim-fade-up delay-${Math.min(t%6+1,8)}"
          onmouseenter="this.style.background='rgba(255,255,255,0.05)';this.style.borderColor='rgba(${za(i.color)},0.30)';this.style.transform='translateY(-2px)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.025)';this.style.borderColor='rgba(255,255,255,0.07)';this.style.transform='none'"
          >
            <div style="display:flex;align-items:flex-start;gap:14px">
              <div style="
                width:44px;height:44px;border-radius:12px;flex-shrink:0;
                display:flex;align-items:center;justify-content:center;font-size:20px;
                background:${ao(i.color,.12)};
                color:${i.color};
                border:1px solid ${ao(i.color,.2)};
              "><i class="bi ${i.icon}"></i></div>
              <div style="flex:1">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:${i.color};margin-bottom:5px">${i.cat}</div>
                <div style="font-size:15px;font-weight:700;color:rgba(255,255,255,0.90);margin-bottom:6px;letter-spacing:-0.01em">${i.titulo}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.45);line-height:1.6">${i.desc}</div>
              </div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- CTA bottom -->
    <div style="margin-top:72px;padding:40px;background:rgba(99,102,241,0.06);border:1px solid rgba(99,102,241,0.18);border-radius:var(--radius-xl);text-align:center" data-reveal>
      <div style="font-size:1.5rem;font-weight:800;color:white;margin-bottom:12px;letter-spacing:-0.03em">¿Ves algo que te llama la atención?</div>
      <p style="color:rgba(255,255,255,0.50);margin-bottom:28px;font-size:0.95rem">Cuéntanos cuál es tu negocio y construimos la solución exacta que necesitas.</p>
      <button class="btn-nux btn-primary-nux" style="font-size:15px;padding:12px 28px" onclick="window.open('https://wa.me/5214400000000?text=Hola+Nuxorb+vi+el+Inspiration+Lab','_blank')">
        <i class="bi bi-whatsapp"></i> Hablar con un experto
      </button>
    </div>
  </section>
  `}function za(i){const t=parseInt(i.slice(1,3),16),e=parseInt(i.slice(3,5),16),s=parseInt(i.slice(5,7),16);return`${t},${e},${s}`}function ao(i,t){return`rgba(${za(i)},${t})`}function oh(){const i=document.querySelectorAll(".cat-filter-btn"),t=document.querySelectorAll(".idea-card-wrap");i.forEach(e=>{e.addEventListener("click",()=>{i.forEach(n=>{n.classList.remove("btn-primary-nux"),n.classList.add("btn-ghost-nux")}),e.classList.add("btn-primary-nux"),e.classList.remove("btn-ghost-nux");const s=e.dataset.cat;t.forEach(n=>{s==="Todas"||n.dataset.cat===s?n.style.display="":n.style.display="none"})})})}function ah(i,t,e=1200,s="",n=""){if(!i)return;const o=performance.now(),a=typeof t=="string"?parseFloat(t.replace(/[^0-9.]/g,"")):t;function r(l){const c=l-o,d=Math.min(c/e,1),p=1-Math.pow(1-d,3),h=Math.floor(p*a);i.textContent=s+h.toLocaleString("es-MX")+n,d<1?requestAnimationFrame(r):i.textContent=s+a.toLocaleString("es-MX")+n}requestAnimationFrame(r)}function Pa(){document.querySelectorAll("[data-counter]").forEach(t=>{const e=t.dataset.counter,s=t.dataset.prefix||"",n=t.dataset.suffix||"",o=parseInt(t.dataset.duration||"1200");ah(t,e,o,s,n)})}function rh(){const i=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(e.target.classList.add("anim-fade-up"),e.target.style.opacity="1",i.unobserve(e.target))})},{threshold:.1});document.querySelectorAll("[data-reveal]").forEach(t=>{t.style.opacity="0",i.observe(t)})}const Aa=(i="1.25rem")=>`<span style="font-family:'Inter',sans-serif;font-size:${i};font-weight:800;letter-spacing:0.2em;line-height:1;display:inline-block"><span style="color:#159b8a">NUX</span><span style="color:#ffffff">ORB</span></span>`;function lh(i=36){return Aa("1rem")}function ch(i=36){return Aa("1.3rem")}function dh(i){return`
  <div style="--industry-accent:#6366f1;--industry-accent-rgb:99,102,241">
    <nav class="home-navbar" id="home-navbar">
      <div onclick="window.location.hash='/'" style="cursor:pointer;display:flex;align-items:center">
        ${ch(52)}
      </div>
      <div class="home-nav-links">
        <span class="home-nav-link" onclick="window.location.hash='/inspiracion'">Ideas</span>
        <span class="home-nav-link" onclick="scrollToSection('industries')">Industrias</span>
        <span class="home-nav-link" onclick="scrollToSection('how-it-works')">¿Cómo funciona?</span>
        <span class="home-nav-link cta" onclick="window.open('https://wa.me/5214400000000?text=Hola+Nuxorb','_blank')">Agendar llamada</span>
      </div>
    </nav>

    <div style="padding-top:64px">
      ${i}
    </div>
  </div>
  <div id="toast-container"></div>
  `}function ph(){const i=document.getElementById("home-navbar"),t=()=>i&&i.classList.toggle("scrolled",window.scrollY>40);window.addEventListener("scroll",t,{passive:!0}),t(),window.scrollToSection=e=>{const s=document.getElementById(e);s&&s.scrollIntoView({behavior:"smooth"})},rh()}let wt=!1;function hh(){return wt}function uh(i,t,e){const s=e.company,n=e.sidebarBg||"",o=n?`style="background:${n}"`:"";return`
  <aside class="sidebar ${wt?"collapsed":""}" id="main-sidebar" ${o}>
    <div class="sidebar-header">
      <div style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;flex-shrink:0">
        ${lh(32)}
      </div>
      <div class="sidebar-label">
        <div class="sidebar-company-name">${s.nombre}</div>
        <div class="sidebar-company-sub">${s.giro}</div>
      </div>
    </div>

    <button class="sidebar-toggle-btn" id="sidebar-toggle" title="${wt?"Expandir":"Colapsar"}">
      <i class="bi ${wt?"bi-chevron-right":"bi-chevron-left"}"></i>
    </button>

    <nav class="sidebar-nav" id="sidebar-nav">
      ${e.groups.map(a=>`
        <div class="sidebar-group-label">${a.label}</div>
        ${a.items.map(r=>`
          <div class="sidebar-nav-item ${t===r.path?"active":""}"
               data-path="${r.path}" title="${r.label}">
            <i class="bi ${r.icon}"></i>
            <span class="sidebar-label">${r.label}</span>
          </div>
        `).join("")}
      `).join("")}
    </nav>

    <div class="sidebar-footer">
      <div class="sidebar-nav-item sidebar-footer-item" data-path="/" title="Volver al inicio">
        <i class="bi bi-arrow-left-circle"></i>
        <span class="sidebar-footer-text" style="font-size:13px">Volver al inicio</span>
      </div>
      <div class="sidebar-nav-item sidebar-footer-item sidebar-demo-tag" title="Demo — sin backend">
        <i class="bi bi-shield-check"></i>
        <span class="sidebar-footer-text" style="font-size:12px">Demo visual</span>
      </div>
    </div>
  </aside>
  `}function gh(){const i=document.getElementById("sidebar-toggle");i&&i.addEventListener("click",()=>{wt=!wt;const t=document.getElementById("main-sidebar"),e=document.getElementById("demo-main");t&&t.classList.toggle("collapsed",wt),e&&e.classList.toggle("sidebar-collapsed",wt),i.title=wt?"Expandir":"Colapsar",i.querySelector("i").className=`bi ${wt?"bi-chevron-right":"bi-chevron-left"}`}),document.querySelectorAll(".sidebar-nav-item[data-path]").forEach(t=>{t.addEventListener("click",()=>{Xp(t.dataset.path)})})}const Ra={restaurantes:{accent:"#f97316",accentRgb:"249,115,22",theme:"dark",sidebarBg:"#130d06",company:{nombre:"La Mesa Digital",giro:"Restaurante & Bar",logo:"bi-cup-hot-fill"},groups:[{label:"Operación",items:[{icon:"bi-grid-3x3",label:"Mesas",path:"/restaurantes/operaciones"},{icon:"bi-receipt",label:"Órdenes",path:"/restaurantes/operaciones"}]},{label:"Gestión",items:[{icon:"bi-people-fill",label:"Clientes",path:"/restaurantes/crm"},{icon:"bi-graph-up",label:"Dashboard",path:"/restaurantes/dashboard"},{icon:"bi-journal-richtext",label:"Recetas",path:"/restaurantes/operaciones"}]},{label:"Config",items:[{icon:"bi-person-lines-fill",label:"Meseros",path:"/restaurantes/crm"},{icon:"bi-gear-fill",label:"Configuración",path:"/restaurantes/operaciones"}]}]},salud:{accent:"#0284c7",accentRgb:"2,132,199",theme:"light",sidebarBg:"#ffffff",company:{nombre:"MediCore",giro:"Clínica Médica",logo:"bi-heart-pulse-fill"},groups:[{label:"Clínica",items:[{icon:"bi-calendar-check",label:"Citas",path:"/salud/operaciones"},{icon:"bi-people-fill",label:"Pacientes",path:"/salud/crm"},{icon:"bi-building-fill",label:"Consultorios",path:"/salud/operaciones"}]},{label:"Gestión",items:[{icon:"bi-graph-up-arrow",label:"Dashboard",path:"/salud/dashboard"},{icon:"bi-capsule",label:"Inventario",path:"/salud/operaciones"}]},{label:"Sistema",items:[{icon:"bi-shield-plus",label:"Expedientes",path:"/salud/crm"},{icon:"bi-gear-fill",label:"Configuración",path:"/salud/operaciones"}]}]},construccion:{accent:"#eab308",accentRgb:"234,179,8",theme:"dark",sidebarBg:"#0f0c03",company:{nombre:"BuildPro",giro:"Constructora",logo:"bi-building-gear"},groups:[{label:"Obras",items:[{icon:"bi-hammer",label:"Proyectos",path:"/construccion/crm"},{icon:"bi-kanban-fill",label:"Tablero",path:"/construccion/operaciones"},{icon:"bi-box-seam-fill",label:"Materiales",path:"/construccion/operaciones"}]},{label:"Gestión",items:[{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/construccion/dashboard"},{icon:"bi-people-fill",label:"Personal",path:"/construccion/crm"}]},{label:"Admin",items:[{icon:"bi-file-earmark-text",label:"Contratos",path:"/construccion/crm"},{icon:"bi-gear-fill",label:"Configuración",path:"/construccion/operaciones"}]}]},retail:{accent:"#059669",accentRgb:"5,150,105",theme:"light",sidebarBg:"#f0fdf9",company:{nombre:"Storely",giro:"Retail & Tienda",logo:"bi-bag-heart-fill"},groups:[{label:"Ventas",items:[{icon:"bi-cart-fill",label:"Punto de Venta",path:"/retail/operaciones"},{icon:"bi-people-fill",label:"Clientes",path:"/retail/crm"},{icon:"bi-tags-fill",label:"Promociones",path:"/retail/operaciones"}]},{label:"Inventario",items:[{icon:"bi-box-seam-fill",label:"Productos",path:"/retail/operaciones"},{icon:"bi-arrow-repeat",label:"Devoluciones",path:"/retail/operaciones"}]},{label:"Reportes",items:[{icon:"bi-graph-up-arrow",label:"Dashboard",path:"/retail/dashboard"},{icon:"bi-gear-fill",label:"Configuración",path:"/retail/operaciones"}]}]},servicios:{accent:"#8b5cf6",accentRgb:"139,92,246",theme:"dark",sidebarBg:"#0c0a1a",company:{nombre:"FlowService",giro:"Servicios Profesionales",logo:"bi-lightning-charge-fill"},groups:[{label:"Clientes",items:[{icon:"bi-people-fill",label:"Clientes",path:"/servicios/crm"},{icon:"bi-headset",label:"Tickets",path:"/servicios/operaciones"},{icon:"bi-calendar3",label:"Agenda",path:"/servicios/operaciones"}]},{label:"Operación",items:[{icon:"bi-lightning-fill",label:"Servicios",path:"/servicios/operaciones"},{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/servicios/dashboard"}]},{label:"Admin",items:[{icon:"bi-file-earmark-text",label:"Contratos",path:"/servicios/crm"},{icon:"bi-gear-fill",label:"Configuración",path:"/servicios/operaciones"}]}]},saas:{accent:"#6366f1",accentRgb:"99,102,241",theme:"dark",sidebarBg:"#08091e",company:{nombre:"LaunchPad",giro:"SaaS B2B",logo:"bi-rocket-takeoff-fill"},groups:[{label:"Clientes",items:[{icon:"bi-buildings",label:"Cuentas",path:"/saas/crm"},{icon:"bi-kanban-fill",label:"Pipeline",path:"/saas/operaciones"}]},{label:"Producto",items:[{icon:"bi-graph-up-arrow",label:"Dashboard",path:"/saas/dashboard"},{icon:"bi-people-fill",label:"Usuarios",path:"/saas/crm"}]},{label:"Admin",items:[{icon:"bi-file-earmark-text",label:"Contratos",path:"/saas/crm"},{icon:"bi-gear-fill",label:"Config",path:"/saas/operaciones"}]}]},educacion:{accent:"#d97706",accentRgb:"217,119,6",theme:"light",sidebarBg:"#fffcf0",company:{nombre:"EduTrack",giro:"Academia & Cursos",logo:"bi-mortarboard-fill"},groups:[{label:"Alumnos",items:[{icon:"bi-people-fill",label:"Alumnos",path:"/educacion/crm"},{icon:"bi-calendar3",label:"Operaciones",path:"/educacion/operaciones"}]},{label:"Académico",items:[{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/educacion/dashboard"},{icon:"bi-book-fill",label:"Cursos",path:"/educacion/crm"}]},{label:"Admin",items:[{icon:"bi-cash-stack",label:"Pagos",path:"/educacion/crm"},{icon:"bi-gear-fill",label:"Config",path:"/educacion/operaciones"}]}]},fitness:{accent:"#ec4899",accentRgb:"236,72,153",theme:"dark",sidebarBg:"#160610",company:{nombre:"PowerGym",giro:"Gimnasio & Fitness",logo:"bi-lightning-charge-fill"},groups:[{label:"Miembros",items:[{icon:"bi-people-fill",label:"Miembros",path:"/fitness/crm"},{icon:"bi-door-open-fill",label:"Accesos",path:"/fitness/operaciones"}]},{label:"Clases",items:[{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/fitness/dashboard"},{icon:"bi-calendar3",label:"Horarios",path:"/fitness/operaciones"}]},{label:"Admin",items:[{icon:"bi-cash-stack",label:"Pagos",path:"/fitness/crm"},{icon:"bi-gear-fill",label:"Config",path:"/fitness/operaciones"}]}]}};function fh(i,t,e){const s=Ra[i];return`
  <header class="topbar">
    <div class="topbar-left">
      <button class="back-btn" onclick="window.location.hash='/${i}'">
        <i class="bi bi-chevron-left"></i>
      </button>
      <div>
        <div class="topbar-title">${t}</div>
      </div>
      <span class="topbar-demo-badge" style="display:flex;align-items:center;gap:6px">
        <img src="/logo-orb.png" width="18" height="18" style="object-fit:contain"/>
        <span>Demo Visual</span>
      </span>
    </div>
    <div class="topbar-right">
      <div class="notif-btn" title="Notificaciones" onclick="window.__showNotif&&window.__showNotif()">
        <i class="bi bi-bell"></i>
        <span class="notif-dot"></span>
      </div>
      <div class="topbar-avatar" title="${s.company.nombre}">
        ${s.company.nombre.charAt(0)}
      </div>
    </div>
  </header>
  `}function bh(i,t,e,s){const n=Ra[i],o=hh();return`
  <div class="demo-wrapper theme-${n.theme||"dark"}" style="--industry-accent:${n.accent};--industry-accent-rgb:${n.accentRgb}">
    ${uh(i,s,n)}
    <div class="demo-main ${o?"sidebar-collapsed":""}" id="demo-main">
      ${fh(i,t)}
      <main class="demo-content">
        ${e}
      </main>
    </div>
  </div>
  <div id="toast-container"></div>
  `}function mh(){gh(),Pa()}const P={nombre:"La Mesa Digital",giro:"Restaurante & Bar",logo:"bi-cup-hot-fill",accent:"#f97316",accentRgb:"249, 115, 22"},ro=[{id:1,nombre:"Carlos Mendoza Reyes",visitas:38,ticket:"$420",ultima:"Hoy",telefono:"55 1234 5678",cumple:"15 Mar",preferencia:"Mesa exterior, sin picante"},{id:2,nombre:"Ana Ruiz Flores",visitas:27,ticket:"$310",ultima:"Ayer",telefono:"55 8765 4321",cumple:"22 Jun",preferencia:"Zona no fumadores"},{id:3,nombre:"Roberto García Silva",visitas:21,ticket:"$580",ultima:"3 días",telefono:"55 2222 3333",cumple:"08 Nov",preferencia:"Ocasiones especiales, vino tinto"},{id:4,nombre:"Laura Martínez Torres",visitas:19,ticket:"$260",ultima:"1 sem",telefono:"55 4444 5555",cumple:"31 Ago",preferencia:"Alérgica al mariscos"},{id:5,nombre:"Miguel Hernández López",visitas:16,ticket:"$350",ultima:"2 sem",telefono:"55 6666 7777",cumple:"02 Dic",preferencia:"Mesa privada, negocios"},{id:6,nombre:"Sofía Ramírez Cruz",visitas:14,ticket:"$290",ultima:"3 sem",telefono:"55 8888 9999",cumple:"18 Feb",preferencia:"Vegetariana"},{id:7,nombre:"Diego Morales Vargas",visitas:12,ticket:"$475",ultima:"1 mes",telefono:"55 1111 0000",cumple:"25 Oct",preferencia:"Paga con tarjeta amex"},{id:8,nombre:"Valentina Jiménez Soto",visitas:10,ticket:"$198",ultima:"5 sem",telefono:"55 3333 2222",cumple:"14 Ene",preferencia:"Menú infantil para 2 niños"}],xh=[{id:1,zona:"Interior",cap:4,estado:"ocupada",mesero:"Luis G.",orden:"ORD-041",tiempo:"22 min",ticket:"$480"},{id:2,zona:"Interior",cap:2,estado:"ocupada",mesero:"Paola R.",orden:"ORD-042",tiempo:"8 min",ticket:"$190"},{id:3,zona:"Interior",cap:6,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:4,zona:"Interior",cap:4,estado:"reservada",mesero:"",orden:"",tiempo:"18:30",ticket:""},{id:5,zona:"Terraza",cap:4,estado:"ocupada",mesero:"Carlos M.",orden:"ORD-043",tiempo:"41 min",ticket:"$620"},{id:6,zona:"Terraza",cap:2,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:7,zona:"Terraza",cap:6,estado:"ocupada",mesero:"Luis G.",orden:"ORD-044",tiempo:"14 min",ticket:"$310"},{id:8,zona:"Bar",cap:2,estado:"ocupada",mesero:"Paola R.",orden:"ORD-045",tiempo:"5 min",ticket:"$150"},{id:9,zona:"Bar",cap:2,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:10,zona:"VIP",cap:8,estado:"reservada",mesero:"",orden:"",tiempo:"20:00",ticket:""},{id:11,zona:"VIP",cap:6,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:12,zona:"Interior",cap:4,estado:"ocupada",mesero:"Carlos M.",orden:"ORD-046",tiempo:"31 min",ticket:"$540"}],vh=[{id:"ORD-041",mesa:1,mesero:"Luis G.",items:["Costilla BBQ x2","Guacamole","Limonada x2"],estado:"en cocina",tiempo:"22 min",total:"$480"},{id:"ORD-042",mesa:2,mesero:"Paola R.",items:["Sopa de Lima","Agua x2"],estado:"entregada",tiempo:"8 min",total:"$190"},{id:"ORD-043",mesa:5,mesero:"Carlos M.",items:["Carne Asada x3","Margarita x2","Postre x3"],estado:"esperando",tiempo:"41 min",total:"$620"},{id:"ORD-044",mesa:7,mesero:"Luis G.",items:["Tacos x4","Cerveza x2"],estado:"en cocina",tiempo:"14 min",total:"$310"},{id:"ORD-045",mesa:8,mesero:"Paola R.",items:["Michelada x2"],estado:"lista",tiempo:"5 min",total:"$150"},{id:"ORD-046",mesa:12,mesero:"Carlos M.",items:["Enchiladas x2","Pozole","Agua x3"],estado:"en cocina",tiempo:"31 min",total:"$540"}],lo={labels:["11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm"],data:[1200,3400,5800,6200,4100,2300,2800,5200,7400,8100,6300]},co={labels:["Platos Fuertes","Bebidas","Entradas","Postres","Especialidades"],data:[42,28,15,8,7]};function yh(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${P.accent};--industry-accent-rgb:${P.accentRgb}">

    <!-- Fondo -->
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${P.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>

    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'">
        <i class="bi bi-arrow-left"></i> Todas las industrias
      </button>

      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${P.accent};margin-bottom:14px">
            <i class="bi ${P.logo}"></i> ${P.giro}
          </div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">
            Software diseñado para <span style="color:${P.accent}">${P.nombre}</span>
          </h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">
            Así podría verse el sistema de gestión de tu restaurante. Control total de mesas, órdenes, clientes y reportes desde una sola plataforma.
          </p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/restaurantes/crm",icon:"bi-people-fill",label:"CRM de Clientes",desc:"Frecuencia, preferencias y valor de cada cliente."},{path:"/restaurantes/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard Ejecutivo",desc:"Ventas, ticket promedio, mesas y satisfacción."},{path:"/restaurantes/operaciones",icon:"bi-grid-3x3",label:"Portal de Operaciones",desc:"Mesas en tiempo real, órdenes y estado de cocina."}].map(i=>`
              <div onclick="window.location.hash='${i.path}'" style="
                display:flex;align-items:center;gap:16px;padding:16px 20px;
                background:rgba(${P.accentRgb},0.06);
                border:1px solid rgba(${P.accentRgb},0.18);
                border-radius:var(--radius-lg);cursor:pointer;
                transition:all 0.25s ease;
              "
              onmouseenter="this.style.background='rgba(${P.accentRgb},0.12)';this.style.borderColor='rgba(${P.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${P.accentRgb},0.06)';this.style.borderColor='rgba(${P.accentRgb},0.18)'"
              >
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${P.accentRgb},0.15);color:${P.accent};flex-shrink:0">
                  <i class="bi ${i.icon}"></i>
                </div>
                <div style="flex:1">
                  <div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${i.label}</div>
                  <div style="font-size:13px;color:rgba(255,255,255,0.42)">${i.desc}</div>
                </div>
                <i class="bi bi-chevron-right" style="color:${P.accent};font-size:14px"></i>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="col-lg-6">
          <!-- Preview card decorativo -->
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${P.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${P.accent},transparent)"></div>

            <!-- Simulated topbar -->
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${P.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${P.accent};font-size:16px">
                <i class="bi ${P.logo}"></i>
              </div>
              <div>
                <div style="font-size:14px;font-weight:700;color:white">${P.nombre}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Sistema de gestión</div>
              </div>
              <span class="badge-nux badge-accent" style="margin-left:auto">En vivo</span>
            </div>

            <!-- Mini KPIs decorativos -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              ${[{label:"Mesas activas",val:"14/20",icon:"bi-grid-3x3"},{label:"Ventas hoy",val:"$18.7K",icon:"bi-cash-stack"},{label:"Ticket prom.",val:"$324",icon:"bi-receipt"},{label:"Satisfacción",val:"4.8 ⭐",icon:"bi-star-fill"}].map(i=>`
                <div style="padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px">
                  <div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:4px">${i.label}</div>
                  <div style="font-size:18px;font-weight:800;color:white;letter-spacing:-0.02em">${i.val}</div>
                </div>
              `).join("")}
            </div>

            <!-- Mini bar chart decorativo -->
            <div style="padding:14px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
              <div style="font-size:11px;color:rgba(255,255,255,0.30);text-transform:uppercase;font-weight:700;margin-bottom:10px">Ventas por hora</div>
              <div style="display:flex;align-items:flex-end;gap:4px;height:50px">
                ${[30,60,80,95,70,50,65,90,100,85,65].map((i,t)=>`
                  <div style="flex:1;height:${i}%;background:rgba(${P.accentRgb},${.3+i/250});border-radius:3px 3px 0 0"></div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}function wh({icon:i,label:t,value:e,delta:s,trend:n,prefix:o="",suffix:a="",animate:r=!0,extra:l=""}){const c=n==="up"?"bi-arrow-up-right":n==="down"?"bi-arrow-down-right":"",d=n==="up"?"up":n==="down"?"down":"",p=r&&typeof e=="number"?`data-counter="${e}" data-prefix="${o}" data-suffix="${a}"`:"";return`
  <div class="kpi-card anim-fade-up">
    <div class="kpi-icon"><i class="bi ${i}"></i></div>
    <div class="kpi-label">${t}</div>
    <div class="kpi-value ${r&&typeof e=="number"?"counter-anim":""}" ${p}>
      ${typeof e=="number"?o+e.toLocaleString("es-MX")+a:e}
    </div>
    ${s?`
    <div class="kpi-delta ${d}">
      ${c?`<i class="bi ${c}"></i>`:""}
      <span>${s} vs ayer</span>
    </div>`:""}
    ${l}
  </div>
  `}function lt(i,t=4){return`
  <div class="row g-3 mb-4">
    ${i.map(e=>`
      <div class="col-lg-${Math.floor(12/t)} col-md-6">
        ${wh(e)}
      </div>
    `).join("")}
  </div>
  `}function Bt({columns:i,rows:t,emptyMsg:e="Sin datos",rowClick:s=null}){return`
  <div style="overflow-x:auto">
    <table class="nux-table">
      <thead>
        <tr>
          ${i.map(n=>`<th style="${n.style||""}">${n.label}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${t.length===0?`
          <tr><td colspan="${i.length}" style="text-align:center;padding:40px;color:rgba(255,255,255,0.25)">${e}</td></tr>
        `:t.map((n,o)=>`
          <tr ${s?`style="cursor:pointer" data-row="${o}"`:""}>
            ${i.map(a=>`<td>${a.render?a.render(n):n[a.key]??"—"}</td>`).join("")}
          </tr>
        `).join("")}
      </tbody>
    </table>
  </div>
  `}function Da(i,t){const e=t[i]||{label:i,cls:"badge-neutral"};return`<span class="badge-nux ${e.cls}">${e.label}</span>`}function _h(i,t="var(--industry-accent)"){return`
  <div style="display:flex;align-items:center;gap:10px;min-width:100px">
    <div class="nux-progress" style="flex:1">
      <div class="nux-progress-bar" style="width:${i}%;background:${t}"></div>
    </div>
    <span style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.60);white-space:nowrap">${i}%</span>
  </div>
  `}function kh(){const i=[{icon:"bi-people-fill",label:"Clientes Registrados",value:284,delta:"+12",trend:"up"},{icon:"bi-star-fill",label:"Clientes Frecuentes",value:48,delta:"+4",trend:"up"},{icon:"bi-cash-stack",label:"Valor Promedio/Cliente",value:"$324",delta:"+8%",trend:"up",animate:!1},{icon:"bi-arrow-repeat",label:"Tasa de Retorno",value:"68%",delta:"+3%",trend:"up",animate:!1}],t=Bt({columns:[{label:"Cliente",key:"nombre",render:e=>`
        <div style="display:flex;align-items:center;gap:12px">
          <div class="avatar">${e.nombre.charAt(0)}</div>
          <div>
            <div style="font-weight:600;color:rgba(255,255,255,0.90)">${e.nombre}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.35)">${e.telefono}</div>
          </div>
        </div>
      `},{label:"Visitas",key:"visitas",render:e=>`<strong>${e.visitas}</strong>`},{label:"Ticket Prom.",key:"ticket",render:e=>`<span style="color:var(--industry-accent);font-weight:600">${e.ticket}</span>`},{label:"Última visita",key:"ultima"},{label:"Cumpleaños",key:"cumple"},{label:"Preferencia",key:"preferencia",render:e=>`<span style="font-size:12px;color:rgba(255,255,255,0.50)">${e.preferencia}</span>`},{label:"",key:"_",render:e=>`<button class="btn-nux btn-accent-nux" style="font-size:12px;padding:6px 12px" onclick="window.__toastSuccess&&window.__toastSuccess('Perfil de ${e.nombre.split(" ")[0]} abierto')">Ver perfil</button>`}],rows:ro});return`
  <div style="--industry-accent:${P.accent};--industry-accent-rgb:${P.accentRgb}">

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-people-fill" style="color:${P.accent};margin-right:10px"></i>CRM de Clientes
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">Gestión de clientes frecuentes de ${P.nombre}</p>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Exportando reporte...')">
          <i class="bi bi-download"></i> Exportar
        </button>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Formulario de nuevo cliente abierto')">
          <i class="bi bi-plus-lg"></i> Nuevo cliente
        </button>
      </div>
    </div>

    <!-- KPIs -->
    ${lt(i,4)}

    <!-- Search + Table -->
    <div class="glass-card p-4">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:15px;font-weight:700;color:white">Todos los clientes</h3>
        <div style="display:flex;gap:10px;align-items:center">
          <div class="search-bar" style="width:240px">
            <i class="bi bi-search"></i>
            <input type="text" placeholder="Buscar cliente..." />
          </div>
          <select class="nux-input" style="width:auto;padding:9px 14px">
            <option>Todos</option>
            <option>Frecuentes</option>
            <option>Con cumpleaños este mes</option>
          </select>
        </div>
      </div>
      ${t}
    </div>

    <!-- Panel de cumpleaños del mes -->
    <div class="row g-3 mt-2">
      <div class="col-md-6">
        <div class="glass-card p-4">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:16px">
            <i class="bi bi-cake2-fill" style="color:${P.accent};margin-right:8px"></i>
            Cumpleaños este mes
          </h3>
          ${[{nombre:"Carlos Mendoza",fecha:"15 Mar",tel:"55 1234 5678"},{nombre:"Ana Ruiz",fecha:"22 Mar",tel:"55 8765 4321"}].map(e=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
              <div class="avatar">${e.nombre.charAt(0)}</div>
              <div style="flex:1">
                <div style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.85)">${e.nombre}</div>
                <div style="font-size:12px;color:rgba(255,255,255,0.40)">${e.fecha}</div>
              </div>
              <button class="btn-nux btn-accent-nux" style="font-size:12px;padding:5px 10px" onclick="window.__toastSuccess&&window.__toastSuccess('Mensaje enviado a ${e.nombre.split(" ")[0]}')">
                <i class="bi bi-whatsapp"></i> Saludar
              </button>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="col-md-6">
        <div class="glass-card p-4">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:16px">
            <i class="bi bi-trophy-fill" style="color:${P.accent};margin-right:8px"></i>
            Top clientes del mes
          </h3>
          ${ro.slice(0,4).map((e,s)=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
              <div style="font-size:18px;font-weight:900;color:rgba(255,255,255,0.15);min-width:28px">${s+1}</div>
              <div class="avatar">${e.nombre.charAt(0)}</div>
              <div style="flex:1">
                <div style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.85)">${e.nombre.split(" ").slice(0,2).join(" ")}</div>
                <div style="font-size:12px;color:rgba(255,255,255,0.35)">${e.visitas} visitas</div>
              </div>
              <span style="font-size:14px;font-weight:700;color:${P.accent}">${e.ticket}</span>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </div>
  `}const $h=[{n:1,p:4,estado:"ocupado",tiempo:"42m"},{n:2,p:2,estado:"libre",tiempo:""},{n:3,p:6,estado:"ocupado",tiempo:"18m"},{n:4,p:4,estado:"reservado",tiempo:"20:30"},{n:5,p:2,estado:"ocupado",tiempo:"55m"},{n:6,p:4,estado:"libre",tiempo:""},{n:7,p:8,estado:"ocupado",tiempo:"12m"},{n:8,p:4,estado:"libre",tiempo:""},{n:9,p:6,estado:"ocupado",tiempo:"8m"},{n:10,p:2,estado:"ocupado",tiempo:"37m"},{n:11,p:4,estado:"libre",tiempo:""},{n:12,p:4,estado:"ocupado",tiempo:"22m"},{n:13,p:2,estado:"reservado",tiempo:"21:00"},{n:14,p:6,estado:"libre",tiempo:""},{n:15,p:4,estado:"ocupado",tiempo:"5m"},{n:16,p:2,estado:"libre",tiempo:""},{n:17,p:4,estado:"ocupado",tiempo:"48m"},{n:18,p:8,estado:"ocupado",tiempo:"31m"},{n:19,p:4,estado:"libre",tiempo:""},{n:20,p:2,estado:"reservado",tiempo:"21:30"}],me={ocupado:"#f97316",libre:"#22c55e",reservado:"#f59e0b"},Mh=[{mesa:3,items:"Tacos x3, Agua",total:"$285",min:18},{mesa:7,items:"Carne asada, Vino",total:"$680",min:12},{mesa:9,items:"Pizza, 2 Cervezas",total:"$320",min:8},{mesa:10,items:"Sopa, Enchiladas",total:"$195",min:37},{mesa:15,items:"Hamburguesa, Refresco",total:"$145",min:5}];function Sh(){const i=[{icon:"bi-grid-3x3",label:"Mesas Activas",value:14,suffix:"/20",delta:"+2 vs ayer",trend:"up",animate:!1},{icon:"bi-cash-stack",label:"Ventas Hoy",value:"$18,740",delta:"+12%",trend:"up",animate:!1},{icon:"bi-receipt",label:"Ticket Promedio",value:"$324",delta:"+8%",trend:"up",animate:!1},{icon:"bi-star-fill",label:"Satisfacción",value:"4.8",suffix:" ⭐",delta:"+0.2",trend:"up",animate:!1}];return`
  <div style="--industry-accent:${P.accent};--industry-accent-rgb:${P.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-grid-3x3" style="color:${P.accent};margin-right:10px"></i>Dashboard del Restaurante
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">La Mesa Digital — ${new Date().toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"})}</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(249,115,22,0.10);border:1px solid rgba(249,115,22,0.25);border-radius:var(--radius-md);font-size:13px;color:${P.accent}">
        <span class="status-dot active"></span> Cocina activa · 7 órdenes en proceso
      </div>
    </div>

    ${lt(i,4)}

    <!-- MAPA DE MESAS -->
    <div class="row g-3 mb-3">
      <div class="col-lg-8">
        <div class="glass-card p-4">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:700;color:white">
              <i class="bi bi-grid-3x3" style="color:${P.accent};margin-right:8px"></i>Mapa del Salón
            </h3>
            <div style="display:flex;gap:14px;font-size:11px">
              ${Object.entries(me).map(([t,e])=>`<span style="display:flex;align-items:center;gap:5px;color:rgba(255,255,255,0.50)"><span style="width:10px;height:10px;border-radius:3px;background:${e};display:inline-block"></span>${t.charAt(0).toUpperCase()+t.slice(1)}</span>`).join("")}
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
            ${$h.map(t=>`
              <div style="background:${me[t.estado]}18;border:1.5px solid ${me[t.estado]}60;border-radius:10px;padding:10px 6px;text-align:center;cursor:default;transition:all 0.2s"
                   onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform=''">
                <div style="font-size:10px;font-weight:700;color:${me[t.estado]};letter-spacing:0.06em;text-transform:uppercase">M${t.n}</div>
                <div style="font-size:16px;font-weight:800;color:white;margin:2px 0">${t.p}<span style="font-size:10px;font-weight:400;color:rgba(255,255,255,0.40)">p</span></div>
                <div style="font-size:10px;color:${me[t.estado]};font-weight:600">${t.tiempo||"—"}</div>
              </div>
            `).join("")}
          </div>
          <div style="display:flex;gap:20px;margin-top:14px;padding-top:14px;border-top:1px solid rgba(255,255,255,0.06)">
            <span style="font-size:12px;color:rgba(255,255,255,0.45)">🔴 <strong style="color:white">9</strong> ocupadas</span>
            <span style="font-size:12px;color:rgba(255,255,255,0.45)">🟢 <strong style="color:white">8</strong> disponibles</span>
            <span style="font-size:12px;color:rgba(255,255,255,0.45)">🟡 <strong style="color:white">3</strong> reservadas</span>
          </div>
        </div>
      </div>

      <!-- ÓRDENES ACTIVAS -->
      <div class="col-lg-4">
        <div class="glass-card p-4 h-100" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${P.accent},rgba(249,115,22,0.3))"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">
            <i class="bi bi-fire" style="color:${P.accent};margin-right:8px"></i>Órdenes Activas
          </h3>
          ${Mh.map(t=>`
            <div style="padding:12px;margin-bottom:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);border-left:3px solid ${t.min<10?"#22c55e":t.min>30?"#f87171":P.accent}">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:12px;font-weight:700;color:white">Mesa ${t.mesa}</span>
                <span style="font-size:12px;font-weight:700;color:${P.accent}">${t.total}</span>
              </div>
              <div style="font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:4px">${t.items}</div>
              <div style="font-size:10px;color:${t.min<10?"#4ade80":t.min>30?"#f87171":"rgba(255,255,255,0.35)"}">⏱ ${t.min} min en mesa</div>
            </div>
          `).join("")}
          <div style="margin-top:8px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);font-size:12px;color:rgba(255,255,255,0.35);text-align:center">
            +2 órdenes en barra
          </div>
        </div>
      </div>
    </div>

    <!-- CHARTS -->
    <div class="row g-3">
      <div class="col-lg-7">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:18px">Ventas por hora</h3>
          <div class="chart-container" style="height:200px"><canvas id="chart-ventas-hora"></canvas></div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:18px">Ventas por categoría</h3>
          <div class="chart-container" style="height:200px"><canvas id="chart-categorias"></canvas></div>
        </div>
      </div>
    </div>
  </div>
  `}function Ch(){Si("chart-ventas-hora",{labels:lo.labels,datasets:[{label:"Ventas ($)",data:lo.data}]}),zi("chart-categorias",{labels:co.labels,data:co.data,height:200}),Pa()}const po={ocupada:{color:"#f97316",bg:"rgba(249,115,22,0.10)",border:"rgba(249,115,22,0.25)",label:"Ocupada"},disponible:{color:"#22c55e",bg:"rgba(34,197,94,0.10)",border:"rgba(34,197,94,0.25)",label:"Libre"},reservada:{color:"#f59e0b",bg:"rgba(245,158,11,0.10)",border:"rgba(245,158,11,0.25)",label:"Reservada"}},zh={"en cocina":{color:"#f97316",label:"En cocina"},entregada:{color:"#22c55e",label:"Entregada"},esperando:{color:"#f59e0b",label:"Esperando"},lista:{color:"#4ade80",label:"Lista"}};function Ph(){return`
  <div style="--industry-accent:${P.accent};--industry-accent-rgb:${P.accentRgb}">

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-grid-3x3" style="color:${P.accent};margin-right:10px"></i>Portal de Operaciones
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">Mesas y órdenes en tiempo real — ${P.nombre}</p>
      </div>
      <div style="display:flex;gap:8px">
        ${[{n:9,label:"Ocupadas",color:"#f97316"},{n:5,label:"Libres",color:"#22c55e"},{n:4,label:"Reserv.",color:"#f59e0b"}].map(i=>`
          <div style="padding:8px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius-md);text-align:center">
            <div style="font-size:18px;font-weight:800;color:${i.color}">${i.n}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;font-weight:700">${i.label}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="row g-3">

      <!-- PLANO DE MESAS -->
      <div class="col-lg-7">
        <div class="glass-card p-4" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${P.accent},transparent)"></div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
            <h3 style="font-size:15px;font-weight:700;color:white">Plano del restaurante</h3>
            <div style="display:flex;gap:10px">
              ${Object.entries(po).map(([i,t])=>`
                <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.50)">
                  <div style="width:10px;height:10px;border-radius:3px;background:${t.color}"></div>
                  ${t.label}
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Zonas -->
          ${["Interior","Terraza","Bar","VIP"].map(i=>{const t=xh.filter(e=>e.zona===i);return`
            <div style="margin-bottom:16px">
              <div style="font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:8px">${i}</div>
              <div style="display:flex;flex-wrap:wrap;gap:8px">
                ${t.map(e=>{const s=po[e.estado];return`
                  <div onclick="window.__selectMesa&&window.__selectMesa(${e.id})"
                    style="
                      width:80px;height:70px;
                      background:${s.bg};
                      border:1px solid ${s.border};
                      border-radius:var(--radius-md);
                      display:flex;flex-direction:column;align-items:center;justify-content:center;
                      cursor:pointer;transition:all 0.2s ease;
                      position:relative;
                    "
                    onmouseenter="this.style.transform='scale(1.05)'"
                    onmouseleave="this.style.transform='none'"
                  >
                    <div style="font-size:16px;font-weight:800;color:${s.color}">M${e.id}</div>
                    <div style="font-size:10px;color:${s.color};opacity:0.8;font-weight:600">${s.label}</div>
                    ${e.tiempo?`<div style="font-size:10px;color:rgba(255,255,255,0.40)">${e.tiempo}</div>`:""}
                    <div style="position:absolute;top:4px;right:4px;font-size:10px;color:rgba(255,255,255,0.35)">${e.cap}p</div>
                  </div>
                  `}).join("")}
              </div>
            </div>
            `}).join("")}
        </div>
      </div>

      <!-- ÓRDENES ACTIVAS -->
      <div class="col-lg-5">
        <div class="glass-card p-4 h-100" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${P.accent},transparent)"></div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:700;color:white">Órdenes activas</h3>
            <button class="btn-nux btn-primary-nux" style="font-size:12px;padding:6px 12px" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva orden creada')">
              <i class="bi bi-plus-lg"></i> Nueva
            </button>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;max-height:520px;overflow-y:auto">
            ${vh.map(i=>{const t=zh[i.estado]||{color:"#888",label:i.estado};return`
              <div style="
                padding:14px;
                background:rgba(255,255,255,0.025);
                border:1px solid rgba(255,255,255,0.07);
                border-left:3px solid ${t.color};
                border-radius:var(--radius-md);
                transition:all 0.2s;
                cursor:pointer;
              "
              onmouseenter="this.style.background='rgba(255,255,255,0.04)'"
              onmouseleave="this.style.background='rgba(255,255,255,0.025)'"
              >
                <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:8px">
                  <div>
                    <span style="font-size:13px;font-weight:700;color:white">${i.id}</span>
                    <span style="font-size:12px;color:rgba(255,255,255,0.35);margin-left:8px">Mesa ${i.mesa}</span>
                  </div>
                  <span style="font-size:11px;font-weight:700;color:${t.color};padding:2px 8px;background:${t.color}18;border-radius:99px;border:1px solid ${t.color}30">${t.label}</span>
                </div>
                <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-bottom:8px">${i.items.join(" · ")}</div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:12px;color:rgba(255,255,255,0.35)">${i.mesero} · ${i.tiempo}</span>
                  <span style="font-size:14px;font-weight:700;color:${P.accent}">${i.total}</span>
                </div>
              </div>
              `}).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>
  `}const z={nombre:"MediCore",giro:"Clínica Médica",logo:"bi-heart-pulse-fill",accent:"#06b6d4",accentRgb:"6, 182, 212"},Ah=[{id:1,nombre:"Elena Vázquez Mora",edad:42,doctor:"Dr. Reyes",proxCita:"Hoy 14:30",dx:"Hipertensión",estatus:"activo",tel:"55 1234 5678"},{id:2,nombre:"Fernando Castillo Ríos",edad:58,doctor:"Dra. Torres",proxCita:"Mañana 10:00",dx:"Diabetes T2",estatus:"activo",tel:"55 8765 4321"},{id:3,nombre:"Mariana López Fuentes",edad:29,doctor:"Dr. Reyes",proxCita:"Jue 11:15",dx:"Control prenatal",estatus:"activo",tel:"55 2222 3333"},{id:4,nombre:"José Ramírez Chávez",edad:65,doctor:"Dr. Medina",proxCita:"Vie 09:00",dx:"Post-quirúrgico",estatus:"seguim.",tel:"55 4444 5555"},{id:5,nombre:"Patricia Gómez Serna",edad:35,doctor:"Dra. Torres",proxCita:"24 Jun",dx:"Chequeo general",estatus:"activo",tel:"55 6666 7777"},{id:6,nombre:"Arturo Mendoza Pérez",edad:51,doctor:"Dr. Medina",proxCita:"26 Jun",dx:"Cardiopatía",estatus:"urgente",tel:"55 8888 9999"},{id:7,nombre:"Claudia Herrera Ruiz",edad:44,doctor:"Dra. Torres",proxCita:"28 Jun",dx:"Tiroides",estatus:"activo",tel:"55 1111 0000"},{id:8,nombre:"Ricardo Santos Mora",edad:72,doctor:"Dr. Reyes",proxCita:"01 Jul",dx:"Osteoartritis",estatus:"activo",tel:"55 3333 2222"}],Rh=[{hora:"08:00",paciente:"Roberto Silva",doctor:"Dr. Reyes",tipo:"Consulta",estado:"atendido"},{hora:"08:30",paciente:"Lupita Morales",doctor:"Dra. Torres",tipo:"Seguimiento",estado:"atendido"},{hora:"09:00",paciente:"Daniel Herrera",doctor:"Dr. Medina",tipo:"Urgencia",estado:"atendido"},{hora:"09:30",paciente:"Gabriela Ríos",doctor:"Dra. Flores",tipo:"Pediatría",estado:"atendido"},{hora:"10:00",paciente:"Marcos Gutiérrez",doctor:"Dr. Reyes",tipo:"Consulta",estado:"atendido"},{hora:"10:30",paciente:"Verónica Núñez",doctor:"Dra. Torres",tipo:"Prenatal",estado:"en sala"},{hora:"11:00",paciente:"Héctor Ramírez",doctor:"Dr. Sánchez",tipo:"Dermatología",estado:"pendiente"},{hora:"11:30",paciente:"Adriana Castro",doctor:"Dra. Rojas",tipo:"Endocrinología",estado:"pendiente"},{hora:"14:00",paciente:"Elena Vázquez",doctor:"Dr. Reyes",tipo:"Control",estado:"en curso"},{hora:"14:30",paciente:"Fernando Castillo",doctor:"Dra. Torres",tipo:"Seguimiento",estado:"pendiente"},{hora:"15:00",paciente:"Patricia Gómez",doctor:"Dr. Medina",tipo:"Chequeo",estado:"pendiente"},{hora:"15:30",paciente:"Arturo Mendoza",doctor:"Dr. Vargas",tipo:"Neurología",estado:"pendiente"}],ho={labels:["Lun","Mar","Mié","Jue","Vie","Sáb"],data:[28,34,31,38,42,18]},uo={labels:["Med. General","Ginecología","Cardiología","Pediatría","Dermatología","Otras"],data:[35,22,18,12,8,5]};function Dh(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${z.accent};--industry-accent-rgb:${z.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${z.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>

    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>

      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${z.accent};margin-bottom:14px">
            <i class="bi ${z.logo}"></i> ${z.giro}
          </div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">
            Software clínico para <span style="color:${z.accent}">${z.nombre}</span>
          </h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">
            Gestión completa de tu clínica: agenda de citas, expedientes, consultorios y estadísticas médicas en tiempo real.
          </p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/salud/crm",icon:"bi-people-fill",label:"Gestión de Pacientes",desc:"Expedientes, historial y próximas citas."},{path:"/salud/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard Clínico",desc:"Citas del día, ocupación y estadísticas."},{path:"/salud/operaciones",icon:"bi-calendar-check",label:"Agenda de Citas",desc:"Vista de consultorios y sala de espera."}].map(i=>`
              <div onclick="window.location.hash='${i.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${z.accentRgb},0.06);border:1px solid rgba(${z.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${z.accentRgb},0.12)';this.style.borderColor='rgba(${z.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${z.accentRgb},0.06)';this.style.borderColor='rgba(${z.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${z.accentRgb},0.15);color:${z.accent};flex-shrink:0"><i class="bi ${i.icon}"></i></div>
                <div style="flex:1">
                  <div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${i.label}</div>
                  <div style="font-size:13px;color:rgba(255,255,255,0.42)">${i.desc}</div>
                </div>
                <i class="bi bi-chevron-right" style="color:${z.accent};font-size:14px"></i>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="col-lg-6">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${z.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${z.accent},transparent)"></div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${z.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${z.accent}"><i class="bi ${z.logo}"></i></div>
              <div><div style="font-size:14px;font-weight:700;color:white">${z.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Sistema clínico</div></div>
              <span class="badge-nux badge-success" style="margin-left:auto">8 Consultorios</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              ${[{label:"Citas hoy",val:"34"},{label:"Atendidos",val:"21"},{label:"En espera",val:"4"},{label:"Satisfacción",val:"4.9 ⭐"}].map(i=>`<div style="padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px"><div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:4px">${i.label}</div><div style="font-size:18px;font-weight:800;color:white">${i.val}</div></div>`).join("")}
            </div>
            <div style="padding:14px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
              <div style="font-size:11px;color:rgba(255,255,255,0.30);text-transform:uppercase;font-weight:700;margin-bottom:10px">Citas por especialidad</div>
              <div style="display:flex;flex-direction:column;gap:6px">
                ${[["Med. General",35],["Ginecología",22],["Cardiología",18],["Pediatría",12]].map(([i,t])=>`
                  <div style="display:flex;align-items:center;gap:8px">
                    <div style="font-size:12px;color:rgba(255,255,255,0.50);width:100px">${i}</div>
                    <div style="flex:1;height:6px;background:rgba(255,255,255,0.06);border-radius:3px">
                      <div style="width:${t}%;height:100%;background:${z.accent};border-radius:3px"></div>
                    </div>
                    <div style="font-size:12px;color:rgba(255,255,255,0.40);width:24px;text-align:right">${t}%</div>
                  </div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}function Th(){const i=[{icon:"bi-people-fill",label:"Pacientes Activos",value:342,delta:"+18",trend:"up"},{icon:"bi-calendar-check",label:"Citas Este Mes",value:486,delta:"+52",trend:"up"},{icon:"bi-clipboard2-pulse",label:"Expedientes Digitales",value:342,delta:"+18",trend:"up"},{icon:"bi-star-fill",label:"Satisfacción",value:"4.9",delta:"+0.1",trend:"up",animate:!1}],t={activo:{label:"Activo",cls:"badge-success"},urgente:{label:"Urgente",cls:"badge-danger"},"seguim.":{label:"Seguim.",cls:"badge-warning"}},e=Bt({columns:[{label:"Paciente",key:"nombre",render:s=>`
        <div style="display:flex;align-items:center;gap:12px">
          <div class="avatar">${s.nombre.charAt(0)}</div>
          <div>
            <div style="font-weight:600;color:rgba(255,255,255,0.90)">${s.nombre}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.35)">${s.tel}</div>
          </div>
        </div>
      `},{label:"Edad",key:"edad",render:s=>`${s.edad} años`},{label:"Doctor",key:"doctor"},{label:"Diagnóstico",key:"dx",render:s=>`<span style="font-size:12px">${s.dx}</span>`},{label:"Próx. Cita",key:"proxCita",render:s=>`<span style="color:var(--industry-accent);font-weight:600">${s.proxCita}</span>`},{label:"Estatus",key:"estatus",render:s=>Da(s.estatus,t)},{label:"",key:"_",render:s=>`<button class="btn-nux btn-accent-nux" style="font-size:12px;padding:6px 12px" onclick="window.__toastInfo&&window.__toastInfo('Expediente de ${s.nombre.split(" ")[0]} abierto')">Expediente</button>`}],rows:Ah});return`
  <div style="--industry-accent:${z.accent};--industry-accent-rgb:${z.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-people-fill" style="color:${z.accent};margin-right:10px"></i>Gestión de Pacientes
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${z.nombre} — Expedientes y seguimiento clínico</p>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Exportando expedientes...')"><i class="bi bi-download"></i> Exportar</button>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Formulario de nuevo paciente abierto')"><i class="bi bi-plus-lg"></i> Nuevo paciente</button>
      </div>
    </div>

    ${lt(i,4)}

    <div class="glass-card p-4">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:15px;font-weight:700;color:white">Directorio de pacientes</h3>
        <div style="display:flex;gap:10px">
          <div class="search-bar" style="width:240px">
            <i class="bi bi-search"></i>
            <input type="text" placeholder="Buscar paciente..." />
          </div>
          <select class="nux-input" style="width:auto;padding:9px 14px">
            <option>Todos</option><option>Urgentes</option><option>Con cita hoy</option>
          </select>
        </div>
      </div>
      ${e}
    </div>
  </div>
  `}const Oh=[{hora:"09:00",paciente:"María González",dr:"Dr. Reyes",esp:"Medicina General",estado:"atendido",sala:"C-01"},{hora:"09:30",paciente:"Roberto Solis",dr:"Dra. Torres",esp:"Ginecología",estado:"atendido",sala:"C-02"},{hora:"10:00",paciente:"Ana Martínez",dr:"Dr. Reyes",esp:"Medicina General",estado:"en_sala",sala:"C-01"},{hora:"10:15",paciente:"Carlos Vega",dr:"Dra. Flores",esp:"Pediatría",estado:"en_sala",sala:"C-04"},{hora:"10:30",paciente:"Laura Pérez",dr:"Dra. Torres",esp:"Ginecología",estado:"esperando",sala:"Sala A"},{hora:"11:00",paciente:"Miguel Ángel R.",dr:"Dr. Medina",esp:"Cardiología",estado:"esperando",sala:"Sala B"},{hora:"11:15",paciente:"Elena Fuentes",dr:"Dra. Flores",esp:"Pediatría",estado:"esperando",sala:"Sala A"},{hora:"11:30",paciente:"Jorge Castillo",dr:"Dr. Sánchez",esp:"Dermatología",estado:"programado",sala:"—"},{hora:"12:00",paciente:"Patricia Ruiz",dr:"Dr. Reyes",esp:"Medicina General",estado:"programado",sala:"—"}],Wi={atendido:"#22c55e",en_sala:"#0284c7",esperando:"#f59e0b",programado:"rgba(255,255,255,0.20)"},Eh={atendido:"Atendido",en_sala:"En consulta",esperando:"En espera",programado:"Programado"},Lh=[{id:"C-01",dr:"Dr. Reyes",esp:"Med. General",estado:"ocupado",paciente:"Ana M."},{id:"C-02",dr:"Dra. Torres",esp:"Ginecología",estado:"ocupado",paciente:"—"},{id:"C-03",dr:"Dr. Medina",esp:"Cardiología",estado:"libre",paciente:""},{id:"C-04",dr:"Dra. Flores",esp:"Pediatría",estado:"ocupado",paciente:"Carlos V."},{id:"C-05",dr:"Dr. Sánchez",esp:"Dermatología",estado:"pausa",paciente:""},{id:"C-06",dr:"Dra. Rojas",esp:"Endocrinología",estado:"ocupado",paciente:"—"}];function Ih(){const i=[{icon:"bi-calendar-check",label:"Citas Hoy",value:34,delta:"+4 vs ayer",trend:"up"},{icon:"bi-person-check",label:"Atendidos",value:21,delta:"+3",trend:"up"},{icon:"bi-clock",label:"Tiempo Espera",value:"12 min",delta:"-5 min",trend:"up",animate:!1},{icon:"bi-cash-stack",label:"Ingresos del Mes",value:"$284,500",delta:"+18%",trend:"up",animate:!1}];return`
  <div style="--industry-accent:${z.accent};--industry-accent-rgb:${z.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-heart-pulse-fill" style="color:${z.accent};margin-right:10px"></i>Dashboard Clínico
        </h1>
        <p style="font-size:14px;color:rgba(0,0,0,0.40)">${z.nombre} — ${new Date().toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"})}</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(2,132,199,0.08);border:1px solid rgba(2,132,199,0.20);border-radius:var(--radius-md);font-size:13px;color:${z.accent}">
        <span class="status-dot active"></span> Sistema activo · 13 citas pendientes
      </div>
    </div>

    ${lt(i,4)}

    <!-- AGENDA DE CITAS -->
    <div class="row g-3 mb-3">
      <div class="col-lg-7">
        <div class="glass-card p-4" style="position:relative;overflow:hidden">
          <div style="position:absolute;top:0;left:0;bottom:0;width:4px;background:linear-gradient(180deg,${z.accent},rgba(2,132,199,0.2))"></div>
          <h3 style="font-size:15px;font-weight:700;margin-bottom:16px;padding-left:8px">
            <i class="bi bi-calendar-week" style="color:${z.accent};margin-right:8px"></i>Agenda de Hoy
          </h3>
          <div style="display:flex;flex-direction:column;gap:6px;max-height:320px;overflow-y:auto">
            ${Oh.map(t=>`
              <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:${Wi[t.estado]}12;border:1px solid ${Wi[t.estado]}30;border-radius:var(--radius-md)">
                <div style="width:44px;text-align:center;flex-shrink:0">
                  <div style="font-size:13px;font-weight:700;color:${z.accent}">${t.hora}</div>
                </div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.paciente}</div>
                  <div style="font-size:11px;color:rgba(0,0,0,0.45)">${t.dr} · ${t.esp}</div>
                </div>
                <div style="text-align:right;flex-shrink:0">
                  <div style="font-size:10px;font-weight:700;color:${Wi[t.estado]};text-transform:uppercase;white-space:nowrap">${Eh[t.estado]}</div>
                  <div style="font-size:10px;color:rgba(0,0,0,0.35)">${t.sala}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- CONSULTORIOS -->
      <div class="col-lg-5">
        <div class="glass-card p-4 h-100">
          <h3 style="font-size:15px;font-weight:700;margin-bottom:16px">
            <i class="bi bi-door-closed" style="color:${z.accent};margin-right:8px"></i>Estado de Consultorios
          </h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${Lh.map(t=>{const e=t.estado==="ocupado"?z.accent:t.estado==="libre"?"#22c55e":"#f59e0b";return`
              <div style="padding:12px;background:${e}0f;border:1px solid ${e}30;border-radius:var(--radius-md);display:flex;align-items:center;gap:12px">
                <div style="width:36px;height:36px;border-radius:8px;background:${e}20;border:2px solid ${e}50;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:${e};flex-shrink:0">${t.id}</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600">${t.dr}</div>
                  <div style="font-size:11px;color:rgba(0,0,0,0.45)">${t.esp}</div>
                </div>
                <span style="font-size:10px;font-weight:700;color:${e};text-transform:uppercase">${t.estado}</span>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
    </div>

    <!-- CHARTS -->
    <div class="row g-3">
      <div class="col-lg-6">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;margin-bottom:18px">Citas por día (semana)</h3>
          <div class="chart-container"><canvas id="chart-citas-dia"></canvas></div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;margin-bottom:18px">Distribución por especialidad</h3>
          <div class="chart-container"><canvas id="chart-especialidades"></canvas></div>
        </div>
      </div>
    </div>
  </div>
  `}function Fh(){Ci("chart-citas-dia",{labels:ho.labels,datasets:[{label:"Citas",data:ho.data}],height:220}),zi("chart-especialidades",{labels:uo.labels,data:uo.data,height:220})}const go={atendido:{color:"#22c55e",bg:"rgba(34,197,94,0.10)"},"en sala":{color:"#f59e0b",bg:"rgba(245,158,11,0.10)"},"en curso":{color:"#06b6d4",bg:"rgba(6,182,212,0.15)"},pendiente:{color:"rgba(255,255,255,0.30)",bg:"rgba(255,255,255,0.04)"}};function jh(){return`
  <div style="--industry-accent:${z.accent};--industry-accent-rgb:${z.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-calendar-check" style="color:${z.accent};margin-right:10px"></i>Agenda de Citas
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${z.nombre} — Vista operativa del día</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva cita agendada')">
        <i class="bi bi-plus-lg"></i> Nueva cita
      </button>
    </div>

    <!-- Stats rápidos -->
    <div class="row g-3 mb-3">
      ${[{label:"Programadas",val:"34",color:"rgba(255,255,255,0.60)",icon:"bi-calendar3"},{label:"Atendidas",val:"21",color:"#22c55e",icon:"bi-check-circle-fill"},{label:"En espera",val:"4",color:"#f59e0b",icon:"bi-hourglass-split"},{label:"Restantes",val:"9",color:z.accent,icon:"bi-clock-fill"}].map(i=>`
        <div class="col-md-3 col-6">
          <div class="glass-card p-3 text-center">
            <i class="bi ${i.icon}" style="font-size:20px;color:${i.color};margin-bottom:8px;display:block"></i>
            <div style="font-size:1.6rem;font-weight:800;color:${i.color}">${i.val}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.35);font-weight:700;text-transform:uppercase">${i.label}</div>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="row g-3">
      <!-- Agenda del día -->
      <div class="col-lg-7">
        <div class="glass-card p-4" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${z.accent},transparent)"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Agenda del día</h3>
          <div style="display:flex;flex-direction:column;gap:6px;max-height:480px;overflow-y:auto">
            ${Rh.map(i=>{const t=go[i.estado]||go.pendiente;return`
              <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:${t.bg};border-radius:var(--radius-md);border-left:3px solid ${t.color};cursor:pointer;transition:filter 0.2s"
              onmouseenter="this.style.filter='brightness(1.15)'"
              onmouseleave="this.style.filter='none'"
              >
                <div style="font-size:12px;font-weight:700;color:${t.color};min-width:44px">${i.hora}</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88)">${i.paciente}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.40)">${i.doctor} · ${i.tipo}</div>
                </div>
                <span style="font-size:10px;font-weight:700;color:${t.color};text-transform:uppercase;padding:2px 8px;background:${t.color}22;border-radius:99px">${i.estado}</span>
              </div>
              `}).join("")}
          </div>
        </div>
      </div>

      <!-- Sala de espera -->
      <div class="col-lg-5">
        <div class="glass-card p-4 h-100">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">
            <i class="bi bi-person-standing" style="color:${z.accent};margin-right:8px"></i>Sala de espera
          </h3>
          ${[{nombre:"Verónica Núñez",dr:"Dra. Torres",esp:"Ginecología",espera:"5 min",turno:1},{nombre:"Héctor Ramírez",dr:"Dr. Sánchez",esp:"Dermatología",espera:"18 min",turno:2},{nombre:"Adriana Castro",dr:"Dra. Rojas",esp:"Endocrinología",espera:"31 min",turno:3},{nombre:"Fernando Castillo",dr:"Dra. Torres",esp:"Seguimiento",espera:"45 min",turno:4}].map(i=>`
            <div style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);margin-bottom:8px">
              <div style="width:32px;height:32px;border-radius:50%;background:rgba(${z.accentRgb},0.15);color:${z.accent};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800">${i.turno}</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88)">${i.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.38)">${i.dr} · ${i.esp}</div>
              </div>
              <div style="text-align:right">
                <div style="font-size:12px;font-weight:700;color:${i.espera.includes("5 min")?"#22c55e":i.espera.includes("18")?"#f59e0b":"#f87171"}">${i.espera}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.30)">en espera</div>
              </div>
            </div>
          `).join("")}

          <div class="nux-divider"></div>
          <div style="padding:12px;background:rgba(${z.accentRgb},0.06);border:1px solid rgba(${z.accentRgb},0.18);border-radius:var(--radius-md)">
            <div style="font-size:12px;font-weight:700;color:${z.accent};margin-bottom:4px"><i class="bi bi-info-circle"></i> Tiempo promedio de espera</div>
            <div style="font-size:24px;font-weight:900;color:white">12 min</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.40)">↓ 5 min vs. promedio semanal</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `}const A={nombre:"BuildPro",giro:"Constructora",logo:"bi-building-gear",accent:"#eab308",accentRgb:"234, 179, 8"},Ta=[{id:1,nombre:"Torres Mirador",cliente:"Inmobiliaria Pedraza",tipo:"Residencial",avance:78,presupuesto:"$3.2M",gastado:"$2.48M",inicio:"15 Ene 2025",fin:"30 Sep 2025",estatus:"en curso",personal:14,obra:"Av. Insurgentes 2240"},{id:2,nombre:"Centro Comercial Hub",cliente:"Grupo Arenas SAB",tipo:"Comercial",avance:45,presupuesto:"$5.8M",gastado:"$2.61M",inicio:"01 Mar 2025",fin:"31 Mar 2026",estatus:"en curso",personal:22,obra:"Periférico Norte km 14"},{id:3,nombre:"Bodega Logística GN",cliente:"GrupoNova Logistics",tipo:"Industrial",avance:92,presupuesto:"$1.4M",gastado:"$1.28M",inicio:"05 Nov 2024",fin:"30 Jun 2025",estatus:"finalizando",personal:8,obra:"Parque Ind. Cuautitlán"},{id:4,nombre:"Residencial Álamos",cliente:"Fam. Castellanos",tipo:"Residencial",avance:32,presupuesto:"$980K",gastado:"$313K",inicio:"10 Abr 2025",fin:"28 Feb 2026",estatus:"en curso",personal:6,obra:"Álamos, Edomex"},{id:5,nombre:"Oficinas Corporat.",cliente:"TechOps México SA",tipo:"Oficinas",avance:58,presupuesto:"$2.1M",gastado:"$1.21M",inicio:"20 Feb 2025",fin:"15 Nov 2025",estatus:"en curso",personal:11,obra:"Polanco, CDMX"},{id:6,nombre:"Escuela Primaria M.",cliente:"Municipio Texcoco",tipo:"Educativo",avance:71,presupuesto:"$640K",gastado:"$454K",inicio:"03 Feb 2025",fin:"31 Jul 2025",estatus:"en curso",personal:9,obra:"Texcoco, Edomex"},{id:7,nombre:"Planta Procesadora",cliente:"Alimentos Del Norte",tipo:"Industrial",avance:15,presupuesto:"$4.2M",gastado:"$630K",inicio:"01 Jun 2025",fin:"31 Dic 2026",estatus:"iniciando",personal:5,obra:"Monterrey, NL"},{id:8,nombre:"Ampliación Hospital",cliente:"Clínica San Ángel",tipo:"Salud",avance:40,presupuesto:"$1.8M",gastado:"$720K",inicio:"15 Mar 2025",fin:"28 Feb 2026",estatus:"en curso",personal:12,obra:"San Ángel, CDMX"}],Bh=[{material:"Cemento Portland 50kg",stock:120,minimo:200,unidad:"bultos",estado:"crítico",proveedor:"Cementos Cruz Azul"},{material:'Varilla 3/8" corrugada',stock:850,minimo:500,unidad:"piezas",estado:"ok",proveedor:"Deacero S.A."},{material:'Grava 3/4"',stock:18,minimo:40,unidad:"m³",estado:"crítico",proveedor:"Materiales Guerrero"},{material:"Arena fina",stock:35,minimo:30,unidad:"m³",estado:"ok",proveedor:"Materiales Guerrero"},{material:"Blocks 12x20x40",stock:600,minimo:800,unidad:"piezas",estado:"bajo",proveedor:"Block Norte SA"},{material:"Cable THW 12 AWG",stock:320,minimo:200,unidad:"metros",estado:"ok",proveedor:"Condumex"},{material:"Tablaroca 4x8",stock:40,minimo:60,unidad:"hojas",estado:"bajo",proveedor:"USG México"},{material:"Pintura Vinílica 19L",stock:28,minimo:20,unidad:"cubetas",estado:"ok",proveedor:"Comex"}],fo={labels:["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8"],datasets:[{label:"Real",data:[8,14,22,31,40,52,61,63]},{label:"Planeado",data:[10,18,26,35,45,55,63,70]}]};Ta.map(i=>i.nombre.split(" ").slice(0,2).join(" "));const Vh=[{nombre:"Ing. Marco Salinas",rol:"Residente de Obra",proyecto:"Torres Mirador",tel:"55 1122 3344",asistencia:"presente"},{nombre:"Ing. Carmen Ruiz",rol:"Supervisora",proyecto:"Centro Comercial Hub",tel:"55 5566 7788",asistencia:"presente"},{nombre:"Arq. Jesús Molina",rol:"Arquitecto",proyecto:"Oficinas Corporat.",tel:"55 9900 1122",asistencia:"presente"},{nombre:"Ing. Beto Vargas",rol:"Jefe de Cuadrilla",proyecto:"Torres Mirador",tel:"55 3344 5566",asistencia:"presente"},{nombre:"Ing. Gloria Torres",rol:"Estructurista",proyecto:"Ampliación Hospital",tel:"55 7788 9900",asistencia:"ausente"}];function Nh(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${A.accent};--industry-accent-rgb:${A.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${A.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>
    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>
      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${A.accent};margin-bottom:14px"><i class="bi ${A.logo}"></i> ${A.giro}</div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">Control total de obras para <span style="color:${A.accent}">${A.nombre}</span></h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">Seguimiento de proyectos en tiempo real, control de materiales, gestión de personal y análisis financiero de tus obras.</p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/construccion/crm",icon:"bi-hammer",label:"Gestión de Proyectos",desc:"Portafolio de obras, avance y presupuesto."},{path:"/construccion/dashboard",icon:"bi-bar-chart-fill",label:"Dashboard de Obra",desc:"KPIs clave, materiales críticos y avance global."},{path:"/construccion/operaciones",icon:"bi-kanban-fill",label:"Tablero Operativo",desc:"Kanban de actividades, cuadrillas y bitácora."}].map(i=>`
              <div onclick="window.location.hash='${i.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${A.accentRgb},0.06);border:1px solid rgba(${A.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${A.accentRgb},0.12)';this.style.borderColor='rgba(${A.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${A.accentRgb},0.06)';this.style.borderColor='rgba(${A.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${A.accentRgb},0.15);color:${A.accent};flex-shrink:0"><i class="bi ${i.icon}"></i></div>
                <div style="flex:1"><div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${i.label}</div><div style="font-size:13px;color:rgba(255,255,255,0.42)">${i.desc}</div></div>
                <i class="bi bi-chevron-right" style="color:${A.accent};font-size:14px"></i>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="col-lg-6">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${A.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${A.accent},transparent)"></div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${A.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${A.accent}"><i class="bi ${A.logo}"></i></div>
              <div><div style="font-size:14px;font-weight:700;color:white">${A.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Control de Obras</div></div>
              <span class="badge-nux badge-warning" style="margin-left:auto">8 Proyectos</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px">
              ${[{nombre:"Torres Mirador",avance:78,color:"#22c55e"},{nombre:"Centro Comercial Hub",avance:45,color:A.accent},{nombre:"Bodega Logística GN",avance:92,color:"#22c55e"},{nombre:"Oficinas Corporativas",avance:58,color:A.accent}].map(i=>`
                <div style="padding:12px;background:rgba(255,255,255,0.025);border-radius:var(--radius-md)">
                  <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <span style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.80)">${i.nombre}</span>
                    <span style="font-size:12px;font-weight:700;color:${i.color}">${i.avance}%</span>
                  </div>
                  <div class="nux-progress"><div class="nux-progress-bar" style="width:${i.avance}%;background:${i.color}"></div></div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}function Hh(){const i=[{icon:"bi-hammer",label:"Proyectos Activos",value:8,delta:"+1",trend:"up"},{icon:"bi-cash-stack",label:"Presupuesto Total",value:"$12.4M",delta:"+2%",trend:"up",animate:!1},{icon:"bi-people-fill",label:"Personal Activo",value:47,delta:"+3",trend:"up"},{icon:"bi-exclamation-diamond",label:"Materiales Críticos",value:3,delta:"+1",trend:"down"}],t={"en curso":{label:"En Curso",cls:"badge-info"},finalizando:{label:"Finalizando",cls:"badge-success"},iniciando:{label:"Iniciando",cls:"badge-warning"},pausado:{label:"Pausado",cls:"badge-danger"}},e=Bt({columns:[{label:"Proyecto",key:"nombre",render:s=>`<div><div style="font-weight:600;color:rgba(255,255,255,0.90)">${s.nombre}</div><div style="font-size:12px;color:rgba(255,255,255,0.35)">${s.tipo} · ${s.obra}</div></div>`},{label:"Cliente",key:"cliente",render:s=>`<span style="font-size:13px">${s.cliente}</span>`},{label:"Avance",key:"avance",render:s=>_h(s.avance)},{label:"Presupuesto",key:"presupuesto",render:s=>`<span style="color:var(--industry-accent);font-weight:600">${s.presupuesto}</span>`},{label:"Gastado",key:"gastado",render:s=>`<span style="font-size:13px">${s.gastado}</span>`},{label:"Personal",key:"personal",render:s=>`<span class="badge-nux badge-neutral">${s.personal} personas</span>`},{label:"Estatus",key:"estatus",render:s=>Da(s.estatus,t)},{label:"",key:"_",render:s=>`<button class="btn-nux btn-accent-nux" style="font-size:12px;padding:6px 12px" onclick="window.__toastInfo&&window.__toastInfo('Abriendo ${s.nombre}')">Ver detalle</button>`}],rows:Ta});return`
  <div style="--industry-accent:${A.accent};--industry-accent-rgb:${A.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-hammer" style="color:${A.accent};margin-right:10px"></i>Gestión de Proyectos
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${A.nombre} — Portafolio de obras activas</p>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando reporte PDF...')"><i class="bi bi-file-pdf"></i> Reporte</button>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Formulario de nuevo proyecto abierto')"><i class="bi bi-plus-lg"></i> Nuevo proyecto</button>
      </div>
    </div>
    ${lt(i,4)}
    <div class="glass-card p-4">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:15px;font-weight:700;color:white">Portafolio de proyectos</h3>
        <div class="search-bar" style="width:240px"><i class="bi bi-search"></i><input type="text" placeholder="Buscar proyecto..."/></div>
      </div>
      ${e}
    </div>
  </div>
  `}const Wh=[{nombre:"Torres Mirador",cliente:"Inmobiliaria Del Valle",avance:63,etapa:"Estructura",personal:22,alerta:!1},{nombre:"Residencial Pinos",cliente:"Grupo Constructor MX",avance:81,etapa:"Acabados",personal:15,alerta:!1},{nombre:"Centro Comercial Q",cliente:"Quetzal Desarrollos",avance:28,etapa:"Cimentación",personal:31,alerta:!0},{nombre:"Bodega Industrial",cliente:"LogisticaMX S.A.",avance:92,etapa:"Entrega",personal:8,alerta:!1},{nombre:"Puente Anular Sur",cliente:"Gobierno Municipal",avance:45,etapa:"Estructura",personal:19,alerta:!0}],bo=["Diseño","Excavación","Cimentación","Estructura","Acabados","Entrega"],Gh={Diseño:0,Excavación:1,Cimentación:2,Estructura:3,Acabados:4,Entrega:5};function Yh(){const i=[{icon:"bi-hammer",label:"Proyectos Activos",value:8,delta:"+1",trend:"up"},{icon:"bi-graph-up-arrow",label:"Avance Promedio",value:"63%",delta:"+5%",trend:"up",animate:!1},{icon:"bi-people-fill",label:"Personal en Obra",value:47,delta:"+3",trend:"up"},{icon:"bi-exclamation-diamond",label:"Alertas Materiales",value:3,delta:"+1",trend:"down"}],t=Bh.filter(e=>e.estado!=="ok");return`
  <div style="--industry-accent:${A.accent};--industry-accent-rgb:${A.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-building-gear" style="color:${A.accent};margin-right:10px"></i>Dashboard de Obra
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${A.nombre} — ${new Date().toLocaleDateString("es-MX",{day:"numeric",month:"long",year:"numeric"})}</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(234,179,8,0.10);border:1px solid rgba(234,179,8,0.25);border-radius:var(--radius-md);font-size:13px;color:${A.accent}">
        <i class="bi bi-exclamation-triangle-fill"></i> 2 proyectos con alerta
      </div>
    </div>

    ${lt(i,4)}

    <!-- PIPELINE DE PROYECTOS -->
    <div class="glass-card p-4 mb-3" style="position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${A.accent},rgba(234,179,8,0.2))"></div>
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:20px">
        <i class="bi bi-kanban" style="color:${A.accent};margin-right:8px"></i>Pipeline de Proyectos — Estado por Etapa
      </h3>

      <!-- Etapas header -->
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin-bottom:14px">
        ${bo.map((e,s)=>`
          <div style="text-align:center;padding:6px 4px;background:rgba(234,179,8,0.08);border-radius:6px;border-top:2px solid ${s<=2?"rgba(234,179,8,0.30)":s<=4?A.accent:"#22c55e"}">
            <div style="font-size:10px;font-weight:700;color:${A.accent};letter-spacing:0.04em">${e.toUpperCase()}</div>
          </div>
        `).join("")}
      </div>

      <!-- Proyectos en pipeline -->
      ${Wh.map(e=>`
        <div style="display:grid;grid-template-columns:200px 1fr;gap:12px;align-items:center;margin-bottom:12px">
          <div>
            <div style="font-size:13px;font-weight:700;color:white;display:flex;align-items:center;gap:6px">
              ${e.alerta?'<i class="bi bi-exclamation-triangle-fill" style="color:#f87171;font-size:12px"></i>':""}
              ${e.nombre}
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.35)">${e.cliente}</div>
          </div>
          <div>
            <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin-bottom:4px">
              ${bo.map((s,n)=>{const o=Gh[e.etapa],a=n<o,r=n===o;return`<div style="height:8px;border-radius:4px;background:${a?A.accent:r?A.accent+"90":"rgba(255,255,255,0.07)"};${r?"box-shadow:0 0 8px rgba(234,179,8,0.5)":""}"></div>`}).join("")}
            </div>
            <div style="display:flex;justify-content:space-between">
              <span style="font-size:11px;color:rgba(255,255,255,0.40)">${e.etapa} · <span style="color:${A.accent};font-weight:700">${e.avance}%</span></span>
              <span style="font-size:11px;color:rgba(255,255,255,0.30)"><i class="bi bi-people-fill"></i> ${e.personal}</span>
            </div>
          </div>
        </div>
        <div style="height:1px;background:rgba(255,255,255,0.04);margin-bottom:12px"></div>
      `).join("")}
    </div>

    <!-- CHARTS + ALERTAS -->
    <div class="row g-3">
      <div class="col-lg-6">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:18px">Avance real vs. planeado</h3>
          <div class="chart-container" style="height:200px"><canvas id="chart-avance"></canvas></div>
        </div>
      </div>
      <div class="col-lg-6">
        <div class="glass-card p-4 h-100">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:14px">⚠️ Alertas de materiales</h3>
          ${t.map(e=>`
            <div style="padding:10px 12px;margin-bottom:8px;background:${e.estado==="crítico"?"rgba(239,68,68,0.06)":"rgba(245,158,11,0.06)"};border:1px solid ${e.estado==="crítico"?"rgba(239,68,68,0.25)":"rgba(245,158,11,0.25)"};border-radius:var(--radius-md)">
              <div style="display:flex;justify-content:space-between;margin-bottom:2px">
                <span style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.85)">${e.material}</span>
                <span style="font-size:11px;font-weight:700;color:${e.estado==="crítico"?"#f87171":"#fbbf24"};text-transform:uppercase">${e.estado}</span>
              </div>
              <div style="font-size:11px;color:rgba(255,255,255,0.40)">Stock: <strong style="color:${e.estado==="crítico"?"#f87171":"#fbbf24"}">${e.stock} ${e.unidad}</strong> · Mín: ${e.minimo} ${e.unidad}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </div>
  `}function Uh(){Si("chart-avance",{labels:fo.labels,datasets:fo.datasets,height:200})}const Xh=[{id:"por-iniciar",label:"Por Iniciar",color:"rgba(255,255,255,0.30)",cards:[{title:"Cimentación Planta GDL",sub:"Planta Procesadora · 3 personas",tag:"Alta"},{title:"Trazo y nivelación Bloque C",sub:"Torres Mirador · 2 personas",tag:"Media"}]},{id:"en-curso",label:"En Curso",color:"#eab308",cards:[{title:"Herrería nivel 4",sub:"Torres Mirador · 4 personas",tag:"Alta"},{title:"Instalaciones eléctricas",sub:"Oficinas Corporativas · 3 per.",tag:"Alta"},{title:"Acabados interiores lobby",sub:"Centro Comercial Hub · 6 per.",tag:"Media"},{title:"Muro cortina fachada",sub:"Torres Mirador · 2 personas",tag:"Urgente"}]},{id:"revision",label:"En Revisión",color:"#06b6d4",cards:[{title:"Pintura exterior bloque A",sub:"Torres Mirador · 2 personas",tag:"Baja"},{title:"Pruebas hidráulicas Piso 3",sub:"Bodega Logística · 1 persona",tag:"Alta"}]},{id:"completado",label:"Completado",color:"#22c55e",cards:[{title:"Excavación y corte",sub:"Centro Comercial Hub",tag:"—"},{title:"Pilotes de cimentación",sub:"Torres Mirador",tag:"—"},{title:"Estructura metálica Nave A",sub:"Bodega Logística",tag:"—"}]}],qh={Alta:"#f97316",Media:"#eab308",Urgente:"#f87171",Baja:"rgba(255,255,255,0.40)","—":"rgba(255,255,255,0.20)"};function Kh(){return`
  <div style="--industry-accent:${A.accent};--industry-accent-rgb:${A.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-kanban-fill" style="color:${A.accent};margin-right:10px"></i>Tablero Operativo
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${A.nombre} — Estado de actividades en obra</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva actividad creada')"><i class="bi bi-plus-lg"></i> Nueva actividad</button>
    </div>

    <!-- Kanban -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;min-height:500px;overflow-x:auto">
      ${Xh.map(i=>`
        <div>
          <div class="kanban-col-title" style="color:${i.color}">
            <div style="width:8px;height:8px;border-radius:50%;background:${i.color};flex-shrink:0"></div>
            ${i.label}
            <span style="margin-left:auto;background:${i.color}22;color:${i.color};font-size:11px;padding:1px 8px;border-radius:99px">${i.cards.length}</span>
          </div>
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:var(--radius-lg);padding:12px;min-height:400px">
            ${i.cards.map(t=>`
              <div class="kanban-card" onclick="window.__toastInfo&&window.__toastInfo('Abriendo: ${t.title}')">
                <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88);margin-bottom:6px">${t.title}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.38);margin-bottom:10px">${t.sub}</div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;font-weight:700;color:${qh[t.tag]||"gray"};text-transform:uppercase">${t.tag!=="—"?t.tag:""}</span>
                  <i class="bi bi-three-dots" style="color:rgba(255,255,255,0.25);cursor:pointer"></i>
                </div>
              </div>
            `).join("")}
            <div style="padding:10px;border:1px dashed rgba(255,255,255,0.08);border-radius:var(--radius-md);text-align:center;cursor:pointer;color:rgba(255,255,255,0.20);font-size:13px;margin-top:4px"
            onclick="window.__toastSuccess&&window.__toastSuccess('Nueva actividad en ${i.label}')">
              <i class="bi bi-plus"></i> Agregar
            </div>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Personal en obra -->
    <div class="glass-card p-4 mt-3">
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px"><i class="bi bi-people-fill" style="color:${A.accent};margin-right:8px"></i>Personal activo hoy</h3>
      <div class="row g-2">
        ${Vh.map(i=>`
          <div class="col-md-4 col-lg-3">
            <div style="padding:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);display:flex;align-items:center;gap:10px">
              <div style="position:relative">
                <div class="avatar avatar-sm">${i.nombre.charAt(0)}</div>
                <span class="status-dot ${i.asistencia==="presente"?"active":"danger"}" style="position:absolute;bottom:0;right:0;width:8px;height:8px;border:2px solid #181818"></span>
              </div>
              <div>
                <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${i.nombre}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.35)">${i.rol}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.25)">${i.proyecto}</div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
  `}const C={nombre:"Storely",giro:"Retail & Tienda",logo:"bi-bag-heart-fill",accent:"#10b981",accentRgb:"16, 185, 129"},Jh=[{id:1,nombre:"Isabel Moreno Gutiérrez",tier:"Oro",puntos:4820,compras:38,ultima:"Hoy",gasto:"$18,400",tel:"55 1234 5678"},{id:2,nombre:"Alejandro Torres Soto",tier:"Plata",puntos:2340,compras:22,ultima:"Ayer",gasto:"$8,600",tel:"55 8765 4321"},{id:3,nombre:"Natalia Reyes Campos",tier:"Oro",puntos:3910,compras:31,ultima:"3 días",gasto:"$14,200",tel:"55 2222 3333"},{id:4,nombre:"Ernesto Vidal Cruz",tier:"Bronce",puntos:890,compras:8,ultima:"1 sem",gasto:"$3,100",tel:"55 4444 5555"},{id:5,nombre:"Daniela Fuentes Peña",tier:"Plata",puntos:1760,compras:17,ultima:"2 sem",gasto:"$6,800",tel:"55 6666 7777"},{id:6,nombre:"Omar Castillo Medina",tier:"Oro",puntos:5100,compras:44,ultima:"3 sem",gasto:"$22,500",tel:"55 8888 9999"},{id:7,nombre:"Camila Espinoza Rivas",tier:"Bronce",puntos:420,compras:4,ultima:"1 mes",gasto:"$1,600",tel:"55 1111 0000"},{id:8,nombre:"Hugo Salinas Cervantes",tier:"Plata",puntos:2080,compras:19,ultima:"5 sem",gasto:"$7,400",tel:"55 3333 2222"}],mo={labels:["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],data:[18400,21200,19800,22100,28600,34200,26400]},xo={labels:["Calzado","Ropa","Accesorios","Deporte","Infantil"],data:[38,32,18,8,4]};function Zh(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${C.accent};--industry-accent-rgb:${C.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${C.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>
    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>
      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${C.accent};margin-bottom:14px"><i class="bi ${C.logo}"></i> ${C.giro}</div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">Retail inteligente para <span style="color:${C.accent}">${C.nombre}</span></h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">Punto de venta integrado, inventario en tiempo real, programa de lealtad y análisis de ventas para tu tienda.</p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/retail/crm",icon:"bi-people-fill",label:"CRM de Clientes",desc:"Programa de lealtad, historial y segmentación."},{path:"/retail/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard de Ventas",desc:"Ventas, ticket promedio, stock y tendencias."},{path:"/retail/operaciones",icon:"bi-cart-fill",label:"Punto de Venta",desc:"POS integrado, inventario y devoluciones."}].map(i=>`
              <div onclick="window.location.hash='${i.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${C.accentRgb},0.06);border:1px solid rgba(${C.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${C.accentRgb},0.12)';this.style.borderColor='rgba(${C.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${C.accentRgb},0.06)';this.style.borderColor='rgba(${C.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${C.accentRgb},0.15);color:${C.accent};flex-shrink:0"><i class="bi ${i.icon}"></i></div>
                <div style="flex:1"><div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${i.label}</div><div style="font-size:13px;color:rgba(255,255,255,0.42)">${i.desc}</div></div>
                <i class="bi bi-chevron-right" style="color:${C.accent};font-size:14px"></i>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="col-lg-6">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${C.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${C.accent},transparent)"></div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${C.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${C.accent}"><i class="bi ${C.logo}"></i></div>
              <div><div style="font-size:14px;font-weight:700;color:white">${C.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Retail platform</div></div>
              <span class="badge-nux badge-success" style="margin-left:auto">Tienda abierta</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              ${[{label:"Ventas hoy",val:"$24,860"},{label:"Transacciones",val:"142"},{label:"Ticket prom.",val:"$175"},{label:"Devoluciones",val:"4"}].map(i=>`<div style="padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px"><div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:4px">${i.label}</div><div style="font-size:18px;font-weight:800;color:white">${i.val}</div></div>`).join("")}
            </div>
            <div style="padding:14px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
              <div style="font-size:11px;color:rgba(255,255,255,0.30);text-transform:uppercase;font-weight:700;margin-bottom:8px">Ventas por categoría</div>
              ${[["Calzado",38],["Ropa",32],["Accesorios",18],["Deporte",12]].map(([i,t])=>`
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <div style="font-size:12px;color:rgba(255,255,255,0.50);width:90px">${i}</div>
                  <div style="flex:1;height:6px;background:rgba(255,255,255,0.06);border-radius:3px"><div style="width:${t}%;height:100%;background:${C.accent};border-radius:3px"></div></div>
                  <div style="font-size:12px;color:rgba(255,255,255,0.40);width:30px;text-align:right">${t}%</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}const Gi={Oro:"#f59e0b",Plata:"rgba(255,255,255,0.65)",Bronce:"#cd7c3a"},Qh=i=>`<span style="font-size:11px;font-weight:700;color:${Gi[i]||"gray"};padding:2px 10px;background:${Gi[i]||"gray"}22;border:1px solid ${Gi[i]||"gray"}33;border-radius:99px">${i}</span>`;function tu(){const i=[{icon:"bi-people-fill",label:"Clientes Registrados",value:1284,delta:"+48",trend:"up"},{icon:"bi-trophy-fill",label:"Clientes Oro",value:124,delta:"+12",trend:"up"},{icon:"bi-cash-stack",label:"LTV Promedio",value:"$8,200",delta:"+5%",trend:"up",animate:!1},{icon:"bi-arrow-repeat",label:"Tasa de Retorno",value:"72%",delta:"+4%",trend:"up",animate:!1}],t=Bt({columns:[{label:"Cliente",key:"nombre",render:e=>`<div style="display:flex;align-items:center;gap:12px"><div class="avatar">${e.nombre.charAt(0)}</div><div><div style="font-weight:600;color:rgba(255,255,255,0.90)">${e.nombre}</div><div style="font-size:12px;color:rgba(255,255,255,0.35)">${e.tel}</div></div></div>`},{label:"Tier",key:"tier",render:e=>Qh(e.tier)},{label:"Puntos",key:"puntos",render:e=>`<span style="color:var(--industry-accent);font-weight:700">${e.puntos.toLocaleString()}</span>`},{label:"Compras",key:"compras"},{label:"Última",key:"ultima"},{label:"Gasto Total",key:"gasto",render:e=>`<strong>${e.gasto}</strong>`},{label:"",key:"_",render:e=>`<button class="btn-nux btn-accent-nux" style="font-size:12px;padding:6px 12px" onclick="window.__toastInfo&&window.__toastInfo('Perfil de ${e.nombre.split(" ")[0]}')">Ver perfil</button>`}],rows:Jh});return`
  <div style="--industry-accent:${C.accent};--industry-accent-rgb:${C.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-people-fill" style="color:${C.accent};margin-right:10px"></i>CRM de Clientes</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${C.nombre} — Programa de lealtad y segmentación</p>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Exportando clientes...')"><i class="bi bi-download"></i> Exportar</button>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nuevo cliente registrado')"><i class="bi bi-plus-lg"></i> Nuevo cliente</button>
      </div>
    </div>
    ${lt(i,4)}
    <div class="glass-card p-4">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:15px;font-weight:700;color:white">Todos los clientes</h3>
        <div style="display:flex;gap:10px">
          <div class="search-bar" style="width:220px"><i class="bi bi-search"></i><input type="text" placeholder="Buscar..."/></div>
          <select class="nux-input" style="width:auto;padding:9px 14px"><option>Todos los tiers</option><option>Oro</option><option>Plata</option><option>Bronce</option></select>
        </div>
      </div>
      ${t}
    </div>
  </div>
  `}const eu=[{nombre:"Ropa & Moda",ventas:"$8,240",pct:33,icono:"bi-bag-fill",items:47},{nombre:"Calzado",ventas:"$4,860",pct:20,icono:"bi-star-fill",items:23},{nombre:"Accesorios",ventas:"$3,100",pct:13,icono:"bi-gem",items:38},{nombre:"Electrónica",ventas:"$5,420",pct:22,icono:"bi-phone-fill",items:15},{nombre:"Hogar",ventas:"$2,100",pct:8,icono:"bi-house-fill",items:29},{nombre:"Deportes",ventas:"$1,140",pct:5,icono:"bi-dribbble",items:18}],iu=[{hora:"11:47",producto:"Sneakers Air Max",total:"$890",metodo:"Tarjeta"},{hora:"11:44",producto:"Camisas x3",total:"$450",metodo:"Efectivo"},{hora:"11:39",producto:"Bolsa de piel",total:"$1,200",metodo:"Tarjeta"},{hora:"11:35",producto:"Audífonos BT",total:"$380",metodo:"Tarjeta"},{hora:"11:28",producto:"Pantalón + Cinto",total:"$560",metodo:"Digital"},{hora:"11:21",producto:"Perfume Set",total:"$720",metodo:"Tarjeta"}];function su(){const i=[{icon:"bi-cash-stack",label:"Ventas Hoy",value:"$24,860",delta:"+15%",trend:"up",animate:!1},{icon:"bi-cart-fill",label:"Transacciones",value:142,delta:"+18",trend:"up"},{icon:"bi-receipt",label:"Ticket Promedio",value:"$175",delta:"+$12",trend:"up",animate:!1},{icon:"bi-arrow-return-left",label:"Devoluciones",value:4,delta:"-2",trend:"up"}];return`
  <div style="--industry-accent:${C.accent};--industry-accent-rgb:${C.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-bag-heart-fill" style="color:${C.accent};margin-right:10px"></i>Dashboard de Ventas
        </h1>
        <p style="font-size:14px;color:rgba(0,0,0,0.40)">Storely — Análisis comercial en tiempo real</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(5,150,105,0.08);border:1px solid rgba(5,150,105,0.20);border-radius:var(--radius-md);font-size:13px;color:${C.accent}">
        <span class="status-dot active"></span> Tienda abierta · 5 cajeros activos
      </div>
    </div>

    ${lt(i,4)}

    <!-- CATEGORÍAS + FEED -->
    <div class="row g-3 mb-3">
      <div class="col-lg-7">
        <div class="glass-card p-4" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${C.accent},rgba(5,150,105,0.2))"></div>
          <h3 style="font-size:15px;font-weight:700;margin-bottom:16px">
            <i class="bi bi-grid-1x2-fill" style="color:${C.accent};margin-right:8px"></i>Ventas por Categoría — Hoy
          </h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${eu.map(t=>`
              <div style="padding:14px;background:rgba(5,150,105,0.06);border:1px solid rgba(5,150,105,0.15);border-radius:var(--radius-md);cursor:default"
                   onmouseover="this.style.borderColor='rgba(5,150,105,0.35)'" onmouseout="this.style.borderColor='rgba(5,150,105,0.15)'">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <div style="width:30px;height:30px;background:rgba(5,150,105,0.15);border-radius:8px;display:flex;align-items:center;justify-content:center">
                      <i class="bi ${t.icono}" style="color:${C.accent};font-size:14px"></i>
                    </div>
                    <span style="font-size:12px;font-weight:600">${t.nombre}</span>
                  </div>
                </div>
                <div style="font-size:1.2rem;font-weight:800;color:${C.accent};margin-bottom:6px">${t.ventas}</div>
                <div style="display:flex;align-items:center;gap:8px">
                  <div style="flex:1;height:4px;background:rgba(5,150,105,0.12);border-radius:4px">
                    <div style="width:${t.pct}%;height:4px;background:${C.accent};border-radius:4px"></div>
                  </div>
                  <span style="font-size:10px;font-weight:700;color:rgba(0,0,0,0.40)">${t.pct}%</span>
                </div>
                <div style="font-size:10px;color:rgba(0,0,0,0.35);margin-top:4px">${t.items} artículos vendidos</div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- TRANSACCIONES EN VIVO -->
      <div class="col-lg-5">
        <div class="glass-card p-4 h-100">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:700">
              <i class="bi bi-activity" style="color:${C.accent};margin-right:8px"></i>Transacciones en Vivo
            </h3>
            <span style="font-size:10px;padding:3px 8px;background:rgba(5,150,105,0.10);color:${C.accent};border-radius:99px;border:1px solid rgba(5,150,105,0.20);font-weight:700">EN VIVO</span>
          </div>
          ${iu.map((t,e)=>`
            <div style="display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.05)${e===5?";border:none":""}">
              <div style="width:40px;text-align:center">
                <div style="font-size:11px;font-weight:700;color:${C.accent}">${t.hora}</div>
              </div>
              <div style="flex:1;min-width:0">
                <div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.producto}</div>
                <div style="font-size:11px;color:rgba(0,0,0,0.40)">${t.metodo}</div>
              </div>
              <div style="font-size:14px;font-weight:800;color:${C.accent};flex-shrink:0">${t.total}</div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>

    <!-- CHARTS -->
    <div class="row g-3">
      <div class="col-lg-7">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;margin-bottom:18px">Ventas diarias — Esta semana</h3>
          <div class="chart-container" style="height:180px"><canvas id="chart-ventas-dia"></canvas></div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;margin-bottom:18px">Distribución de categorías</h3>
          <div class="chart-container" style="height:180px"><canvas id="chart-categorias"></canvas></div>
        </div>
      </div>
    </div>
  </div>
  `}function nu(){Ci("chart-ventas-dia",{labels:mo.labels,datasets:[{label:"Ventas ($)",data:mo.data}],height:180}),zi("chart-categorias",{labels:xo.labels,data:xo.data,height:180})}const ou=[{icon:"bi-shoe-heel",nombre:"Tenis Urban Run",precio:"$1,290",cat:"Calzado",stock:84},{icon:"bi-shirt",nombre:"Sudadera Premium",precio:"$680",cat:"Ropa",stock:47},{icon:"bi-backpack2-fill",nombre:"Mochila Explorer 30L",precio:"$890",cat:"Accesorios",stock:12},{icon:"bi-shirt",nombre:"Pantalón Slim Stretch",precio:"$590",cat:"Ropa",stock:6},{icon:"bi-tag",nombre:"Gorra Bordada",precio:"$280",cat:"Accesorios",stock:134},{icon:"bi-droplet",nombre:"Chamarra Reversible",precio:"$1,450",cat:"Ropa",stock:22}];function au(){return`
  <div style="--industry-accent:${C.accent};--industry-accent-rgb:${C.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-cart-fill" style="color:${C.accent};margin-right:10px"></i>Punto de Venta</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${C.nombre} — POS integrado con inventario</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(16,185,129,0.08);border:1px solid rgba(16,185,129,0.20);border-radius:var(--radius-md);font-size:13px;color:#4ade80">
        <span class="status-dot active"></span> Caja 1 — Abierta
      </div>
    </div>

    <div class="row g-3">
      <!-- Catálogo -->
      <div class="col-lg-7">
        <div class="glass-card p-4">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:700;color:white">Catálogo</h3>
            <div class="search-bar" style="width:200px"><i class="bi bi-search"></i><input type="text" placeholder="Buscar producto..."/></div>
          </div>
          <!-- Filtros de categoría -->
          <div style="display:flex;gap:6px;margin-bottom:16px;flex-wrap:wrap">
            ${["Todos","Calzado","Ropa","Accesorios","Deporte"].map((i,t)=>`
              <button class="btn-nux ${t===0?"btn-primary-nux":"btn-ghost-nux"}" style="font-size:12px;padding:5px 12px" onclick="window.__toastInfo&&window.__toastInfo('Filtrando: ${i}')">${i}</button>
            `).join("")}
          </div>
          <!-- Productos -->
          <div class="row g-2">
            ${ou.map(i=>`
              <div class="col-md-6 col-lg-4">
                <div style="padding:16px;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-md);cursor:pointer;transition:all 0.2s"
                onmouseenter="this.style.borderColor='rgba(${C.accentRgb},0.35)';this.style.background='rgba(${C.accentRgb},0.06)'"
                onmouseleave="this.style.borderColor='rgba(255,255,255,0.07)';this.style.background='rgba(255,255,255,0.025)'"
                onclick="window.__addToCart&&window.__addToCart('${i.nombre}','${i.precio}')">
                  <div style="text-align:center;padding:12px;background:rgba(${C.accentRgb},0.08);border-radius:var(--radius-md);font-size:28px;color:${C.accent};margin-bottom:10px">
                    <i class="bi ${i.icon}"></i>
                  </div>
                  <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88);margin-bottom:4px">${i.nombre}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:8px">${i.cat} · Stock: ${i.stock}</div>
                  <div style="font-size:15px;font-weight:800;color:${C.accent}">${i.precio}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>

      <!-- Carrito / Ticket -->
      <div class="col-lg-5">
        <div class="glass-card p-4" style="position:sticky;top:80px">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">
            <i class="bi bi-receipt" style="color:${C.accent};margin-right:8px"></i>Ticket actual
          </h3>

          <!-- Items en carrito (mock) -->
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;min-height:120px;max-height:280px;overflow-y:auto">
            ${[{nombre:"Tenis Urban Run",precio:"$1,290",cant:1},{nombre:"Gorra Bordada",precio:"$280",cant:2},{nombre:"Sudadera Premium",precio:"$680",cant:1}].map(i=>`
              <div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(255,255,255,0.025);border-radius:var(--radius-md)" id="cart-item-${i.nombre.replace(/\s/g,"")}">
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.85)">${i.nombre}</div>
                  <div style="font-size:12px;color:rgba(255,255,255,0.35)">x${i.cant} · ${i.precio}</div>
                </div>
                <button onclick="window.__toastInfo&&window.__toastInfo('${i.nombre} eliminado')" style="background:none;border:none;color:rgba(255,255,255,0.25);cursor:pointer;padding:4px"><i class="bi bi-x-lg"></i></button>
              </div>
            `).join("")}
          </div>

          <div class="nux-divider"></div>

          <!-- Totales -->
          <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px">
            ${[{label:"Subtotal",val:"$2,250"},{label:"IVA (16%)",val:"$360"},{label:"Descuento",val:"-$100"}].map(i=>`
              <div style="display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,0.45)">
                <span>${i.label}</span><span>${i.val}</span>
              </div>
            `).join("")}
            <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:800;color:white;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08);margin-top:6px">
              <span>Total</span><span style="color:${C.accent}">$2,510</span>
            </div>
          </div>

          <!-- Formas de pago -->
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:14px">
            ${[{icon:"bi-cash",label:"Efectivo"},{icon:"bi-credit-card",label:"Tarjeta"},{icon:"bi-phone",label:"Digital"}].map((i,t)=>`
              <button class="btn-nux ${t===1?"btn-primary-nux":"btn-ghost-nux"}" style="font-size:12px;padding:8px;flex-direction:column;gap:4px;text-align:center">
                <i class="bi ${i.icon}" style="font-size:16px"></i>
                <span>${i.label}</span>
              </button>
            `).join("")}
          </div>

          <button class="btn-nux btn-primary-nux" style="width:100%;justify-content:center;padding:14px;font-size:15px" onclick="window.__toastSuccess&&window.__toastSuccess('Venta procesada: $2,510 ✓')">
            <i class="bi bi-check-circle-fill"></i> Cobrar $2,510
          </button>
        </div>
      </div>
    </div>
  </div>
  `}function ru(){window.__addToCart=(i,t)=>mi(`${i} agregado — ${t}`),window.__toastSuccess=mi,window.__toastInfo=Ts}const R={nombre:"FlowService",giro:"Servicios Profesionales",logo:"bi-lightning-charge-fill",accent:"#8b5cf6",accentRgb:"139, 92, 246"},lu=[{id:1,nombre:"Constructora Arenas SA",plan:"Enterprise",mrr:"$8,400",servicios:4,salud:98,renovacion:"31 Dic 2025",contacto:"Ing. Mario Peña",tel:"55 1234 5678"},{id:2,nombre:"Distribuidora Noriega",plan:"Business",mrr:"$3,200",servicios:2,salud:85,renovacion:"28 Feb 2026",contacto:"Lic. Sara Vidal",tel:"55 8765 4321"},{id:3,nombre:"Clínica Santa Elena",plan:"Business",mrr:"$2,800",servicios:3,salud:92,renovacion:"31 Mar 2026",contacto:"Dr. Luis Ramos",tel:"55 2222 3333"},{id:4,nombre:"Moda Global SRL",plan:"Starter",mrr:"$1,100",servicios:1,salud:64,renovacion:"15 Jul 2025",contacto:"Sra. Gaby Torres",tel:"55 4444 5555"},{id:5,nombre:"TechStart México",plan:"Enterprise",mrr:"$12,000",servicios:6,salud:95,renovacion:"31 Dic 2025",contacto:"CTO Andrés Ríos",tel:"55 6666 7777"},{id:6,nombre:"Restaurantes El Toro SA",plan:"Business",mrr:"$2,400",servicios:2,salud:78,renovacion:"30 Sep 2025",contacto:"Lic. Rosa Méndez",tel:"55 8888 9999"},{id:7,nombre:"Transportes Unidos SC",plan:"Starter",mrr:"$950",servicios:1,salud:88,renovacion:"31 Oct 2025",contacto:"Sr. Felipe Ortiz",tel:"55 1111 0000"},{id:8,nombre:"Escuela Impulso AC",plan:"Business",mrr:"$1,800",servicios:2,salud:91,renovacion:"31 Ene 2026",contacto:"Mtra. Celia Fuentes",tel:"55 3333 2222"}],cu=[{id:"TK-2401",cliente:"Moda Global SRL",prioridad:"alta",estatus:"abierto",tipo:"Error sistema",tecnico:"Diego R.",creado:"Hace 2h",sla:"4h restantes"},{id:"TK-2402",cliente:"Distribuidora Noriega",prioridad:"media",estatus:"en proceso",tipo:"Configuración",tecnico:"Ana S.",creado:"Hace 5h",sla:"19h restantes"},{id:"TK-2403",cliente:"Clínica Santa Elena",prioridad:"baja",estatus:"abierto",tipo:"Consulta",tecnico:"Sin asig.",creado:"Hace 1 día",sla:"47h restantes"},{id:"TK-2404",cliente:"TechStart México",prioridad:"crítica",estatus:"escalado",tipo:"Caída servicio",tecnico:"Carlos M.",creado:"Hace 30 min",sla:"1h restante"},{id:"TK-2405",cliente:"Transportes Unidos SC",prioridad:"media",estatus:"en proceso",tipo:"Reporte",tecnico:"Ana S.",creado:"Hace 3h",sla:"21h restantes"}],du=[{tipo:"Software a Medida",clientes:28,mrr:"$62,400",icono:"bi-code-slash"},{tipo:"Mantenimiento Web",clientes:22,mrr:"$33,000",icono:"bi-tools"},{tipo:"Consultoría IT",clientes:18,mrr:"$28,800",icono:"bi-lightbulb"},{tipo:"Soporte 24/7",clientes:16,mrr:"$24,400",icono:"bi-headset"}],vo={labels:["Ene","Feb","Mar","Abr","May","Jun","Jul"],data:[108e3,114200,118600,124e3,131800,140400,148600]},yo={labels:["Crítica","Alta","Media","Baja"],data:[2,4,8,6]};function pu(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${R.accent};--industry-accent-rgb:${R.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${R.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>
    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>
      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${R.accent};margin-bottom:14px"><i class="bi ${R.logo}"></i> ${R.giro}</div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">Gestión profesional de servicios para <span style="color:${R.accent}">${R.nombre}</span></h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">CRM para empresas de servicios: contratos, tickets, ingresos recurrentes, satisfacción y agenda en un solo lugar.</p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/servicios/crm",icon:"bi-people-fill",label:"CRM de Clientes",desc:"Contratos, health score y renovaciones."},{path:"/servicios/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard MRR",desc:"Ingresos recurrentes, NPS y métricas clave."},{path:"/servicios/operaciones",icon:"bi-headset",label:"Gestión de Tickets",desc:"Cola de soporte, SLAs y asignación de técnicos."}].map(i=>`
              <div onclick="window.location.hash='${i.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${R.accentRgb},0.06);border:1px solid rgba(${R.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${R.accentRgb},0.12)';this.style.borderColor='rgba(${R.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${R.accentRgb},0.06)';this.style.borderColor='rgba(${R.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${R.accentRgb},0.15);color:${R.accent};flex-shrink:0"><i class="bi ${i.icon}"></i></div>
                <div style="flex:1"><div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${i.label}</div><div style="font-size:13px;color:rgba(255,255,255,0.42)">${i.desc}</div></div>
                <i class="bi bi-chevron-right" style="color:${R.accent};font-size:14px"></i>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="col-lg-6">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${R.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${R.accent},transparent)"></div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${R.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${R.accent}"><i class="bi ${R.logo}"></i></div>
              <div><div style="font-size:14px;font-weight:700;color:white">${R.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Service Management</div></div>
              <span class="badge-nux badge-accent" style="margin-left:auto">84 Clientes</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              ${[{label:"MRR",val:"$148,600"},{label:"NPS Score",val:"72"},{label:"Tickets abiertos",val:"11"},{label:"Satisfacción",val:"4.7 ⭐"}].map(i=>`<div style="padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px"><div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:4px">${i.label}</div><div style="font-size:18px;font-weight:800;color:white">${i.val}</div></div>`).join("")}
            </div>
            <div style="padding:14px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
              <div style="font-size:11px;color:rgba(255,255,255,0.30);text-transform:uppercase;font-weight:700;margin-bottom:8px">MRR últimos 6 meses</div>
              <div style="display:flex;align-items:flex-end;gap:4px;height:48px">
                ${[73,78,81,85,90,100].map((i,t)=>`<div style="flex:1;height:${i}%;background:rgba(${R.accentRgb},${.25+i/250});border-radius:3px 3px 0 0"></div>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}const Yi={Enterprise:"#8b5cf6",Business:"#06b6d4",Starter:"rgba(255,255,255,0.50)"},hu=i=>`<span style="font-size:11px;font-weight:700;color:${Yi[i]||"gray"};padding:2px 10px;background:${Yi[i]||"gray"}22;border:1px solid ${Yi[i]||"gray"}33;border-radius:99px">${i}</span>`,uu=i=>`<div style="display:flex;align-items:center;gap:8px"><div class="nux-progress" style="width:60px"><div class="nux-progress-bar" style="width:${i}%;background:${i>=80?"#22c55e":i>=60?"#f59e0b":"#f87171"}"></div></div><span style="font-size:12px;color:rgba(255,255,255,0.55)">${i}%</span></div>`;function gu(){const i=[{icon:"bi-people-fill",label:"Clientes Activos",value:84,delta:"+6",trend:"up"},{icon:"bi-lightning-charge",label:"Servicios en Curso",value:23,delta:"+2",trend:"up"},{icon:"bi-cash-stack",label:"MRR Total",value:"$148,600",delta:"+9%",trend:"up",animate:!1},{icon:"bi-heart-fill",label:"NPS Score",value:72,delta:"+4",trend:"up"}],t=Bt({columns:[{label:"Cliente",key:"nombre",render:e=>`<div><div style="font-weight:600;color:rgba(255,255,255,0.90)">${e.nombre}</div><div style="font-size:12px;color:rgba(255,255,255,0.35)">${e.contacto}</div></div>`},{label:"Plan",key:"plan",render:e=>hu(e.plan)},{label:"MRR",key:"mrr",render:e=>`<span style="color:var(--industry-accent);font-weight:700">${e.mrr}</span>`},{label:"Servicios",key:"servicios",render:e=>`${e.servicios} activos`},{label:"Health",key:"salud",render:e=>uu(e.salud)},{label:"Renovación",key:"renovacion",render:e=>`<span style="font-size:13px">${e.renovacion}</span>`},{label:"",key:"_",render:e=>`<button class="btn-nux btn-accent-nux" style="font-size:12px;padding:6px 12px" onclick="window.__toastInfo&&window.__toastInfo('Cuenta de ${e.nombre.split(" ")[0]}')">Ver cuenta</button>`}],rows:lu});return`
  <div style="--industry-accent:${R.accent};--industry-accent-rgb:${R.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-people-fill" style="color:${R.accent};margin-right:10px"></i>CRM de Clientes</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${R.nombre} — Cuentas, contratos y salud del cliente</p>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Exportando cuentas...')"><i class="bi bi-download"></i> Exportar</button>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva cuenta creada')"><i class="bi bi-plus-lg"></i> Nueva cuenta</button>
      </div>
    </div>
    ${lt(i,4)}

    <!-- Servicios por tipo -->
    <div class="row g-3 mb-3">
      ${du.map(e=>`
        <div class="col-md-6 col-lg-3">
          <div class="glass-card p-4">
            <div style="font-size:22px;color:${R.accent};margin-bottom:10px"><i class="bi ${e.icono}"></i></div>
            <div style="font-size:13px;font-weight:600;color:white;margin-bottom:4px">${e.tipo}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:10px">${e.clientes} clientes</div>
            <div style="font-size:18px;font-weight:800;color:${R.accent}">${e.mrr}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.30)">MRR</div>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="glass-card p-4">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:15px;font-weight:700;color:white">Directorio de cuentas</h3>
        <div style="display:flex;gap:10px">
          <div class="search-bar" style="width:220px"><i class="bi bi-search"></i><input type="text" placeholder="Buscar cuenta..."/></div>
          <select class="nux-input" style="width:auto;padding:9px 14px"><option>Todos los planes</option><option>Enterprise</option><option>Business</option><option>Starter</option></select>
        </div>
      </div>
      ${t}
    </div>
  </div>
  `}const fu={Nuevo:[{id:"T-094",cliente:"Moda Global SRL",asunto:"Integración pago digital",prioridad:"alta",hrs:"1h"},{id:"T-095",cliente:"RestChain MX",asunto:"Error en reportes CSV",prioridad:"media",hrs:"2h"},{id:"T-096",cliente:"Farmacia Plus",asunto:"Acceso usuarios nuevos",prioridad:"baja",hrs:"30m"}],"En proceso":[{id:"T-087",cliente:"FinTech Nexo",asunto:"Migración base de datos",prioridad:"alta",hrs:"4h"},{id:"T-090",cliente:"EduPlatform",asunto:"Dashboard personalizado",prioridad:"media",hrs:"3h"},{id:"T-092",cliente:"LogisticsOps",asunto:"API REST webhook config",prioridad:"alta",hrs:"2h"}],"En revisión":[{id:"T-083",cliente:"HealthTrack SA",asunto:"Módulo de expedientes",prioridad:"alta",hrs:"0h"},{id:"T-085",cliente:"AutoRed Mx",asunto:"CRM sincronización",prioridad:"media",hrs:"0h"}],Cerrado:[{id:"T-078",cliente:"Moda Global SRL",asunto:"Setup inicial sistema",prioridad:"alta",hrs:"12h"},{id:"T-079",cliente:"TechStart MX",asunto:"Onboarding equipo",prioridad:"media",hrs:"6h"},{id:"T-081",cliente:"Courier Express",asunto:"Reporte de entregas",prioridad:"baja",hrs:"3h"}]},Ui={alta:"#f87171",media:"#fbbf24",baja:"#6b7280"};function bu(){const i=[{icon:"bi-people-fill",label:"Clientes Activos",value:84,delta:"+6",trend:"up"},{icon:"bi-cash-stack",label:"MRR",value:"$148,600",delta:"+9%",trend:"up",animate:!1},{icon:"bi-headset",label:"Tickets Abiertos",value:11,delta:"-3",trend:"up"},{icon:"bi-heart-fill",label:"NPS Score",value:72,delta:"+4",trend:"up"}];return`
  <div style="--industry-accent:${R.accent};--industry-accent-rgb:${R.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-lightning-charge-fill" style="color:${R.accent};margin-right:10px"></i>Dashboard Servicios
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">FlowService — Métricas de servicio y clientes</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(139,92,246,0.10);border:1px solid rgba(139,92,246,0.25);border-radius:var(--radius-md);font-size:13px;color:${R.accent}">
        <span class="status-dot active"></span> 7 agentes conectados · SLA 98.2%
      </div>
    </div>

    ${lt(i,4)}

    <!-- KANBAN BOARD -->
    <div class="glass-card p-4 mb-3" style="position:relative">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${R.accent},rgba(139,92,246,0.2))"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="font-size:15px;font-weight:700;color:white">
          <i class="bi bi-kanban-fill" style="color:${R.accent};margin-right:8px"></i>Kanban de Tickets
        </h3>
        <div style="display:flex;gap:8px;font-size:11px">
          ${Object.entries(Ui).map(([t,e])=>`<span style="display:flex;align-items:center;gap:4px;color:rgba(255,255,255,0.45)"><span style="width:8px;height:8px;border-radius:2px;background:${e};display:inline-block"></span>${t}</span>`).join("")}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
        ${Object.entries(fu).map(([t,e])=>`
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.40);letter-spacing:0.08em;text-transform:uppercase">${t}</span>
              <span style="font-size:11px;font-weight:700;color:${R.accent};background:rgba(139,92,246,0.12);padding:2px 7px;border-radius:99px">${e.length}</span>
            </div>
            ${e.map(s=>`
              <div style="padding:10px;margin-bottom:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-md);border-left:3px solid ${Ui[s.prioridad]}">
                <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                  <span style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.35)">${s.id}</span>
                  <span style="font-size:9px;font-weight:700;color:${Ui[s.prioridad]};text-transform:uppercase">${s.prioridad}</span>
                </div>
                <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85);margin-bottom:4px;line-height:1.35">${s.asunto}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.35)">${s.cliente}</div>
                ${s.hrs!=="0h"?`<div style="font-size:10px;color:rgba(255,255,255,0.25);margin-top:4px">⏱ ${s.hrs}</div>`:""}
              </div>
            `).join("")}
          </div>
        `).join("")}
      </div>
    </div>

    <!-- CHARTS -->
    <div class="row g-3">
      <div class="col-lg-7">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:18px">Evolución del MRR</h3>
          <div class="chart-container" style="height:180px"><canvas id="chart-mrr"></canvas></div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:18px">Tickets por prioridad</h3>
          <div class="chart-container" style="height:180px"><canvas id="chart-tickets-prioridad"></canvas></div>
        </div>
      </div>
    </div>
  </div>
  `}function mu(){Si("chart-mrr",{labels:vo.labels,datasets:[{label:"MRR ($)",data:vo.data}],height:180}),zi("chart-tickets-prioridad",{labels:yo.labels,data:yo.data,height:180})}const Xi={crítica:"#f87171",alta:"#f97316",media:"#fbbf24",baja:"rgba(255,255,255,0.40)"},wo={abierto:"#f59e0b","en proceso":"#06b6d4",escalado:"#f87171",resuelto:"#22c55e"};function xu(){return`
  <div style="--industry-accent:${R.accent};--industry-accent-rgb:${R.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-headset" style="color:${R.accent};margin-right:10px"></i>Gestión de Tickets</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${R.nombre} — Cola de soporte y SLA</p>
      </div>
      <div style="display:flex;gap:10px">
        <select class="nux-input" style="width:auto;padding:9px 14px"><option>Todos los estados</option><option>Abierto</option><option>En proceso</option><option>Escalado</option></select>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nuevo ticket creado')"><i class="bi bi-plus-lg"></i> Nuevo ticket</button>
      </div>
    </div>

    <!-- Resumen rápido -->
    <div class="row g-3 mb-3">
      ${[{label:"Abiertos",n:4,color:"#f59e0b",icon:"bi-exclamation-circle-fill"},{label:"En proceso",n:3,color:"#06b6d4",icon:"bi-arrow-clockwise"},{label:"Escalados",n:1,color:"#f87171",icon:"bi-fire"},{label:"Resueltos hoy",n:8,color:"#22c55e",icon:"bi-check-circle-fill"}].map(i=>`
        <div class="col-md-3 col-6">
          <div class="glass-card p-3" style="display:flex;align-items:center;gap:14px">
            <i class="bi ${i.icon}" style="font-size:24px;color:${i.color}"></i>
            <div>
              <div style="font-size:1.6rem;font-weight:800;color:${i.color}">${i.n}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;font-weight:700">${i.label}</div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Tabla de tickets -->
    <div class="glass-card p-4" style="position:relative">
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${R.accent},transparent)"></div>
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Cola de soporte activa</h3>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${cu.map(i=>`
          <div style="
            padding:16px 18px;
            background:rgba(255,255,255,0.025);
            border:1px solid rgba(255,255,255,0.07);
            border-left:3px solid ${Xi[i.prioridad]||"gray"};
            border-radius:var(--radius-md);
            display:grid;grid-template-columns:90px 1fr 130px 130px 120px auto;
            align-items:center;gap:16px;
            cursor:pointer;
            transition:all 0.2s;
          "
          onmouseenter="this.style.background='rgba(255,255,255,0.04)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.025)'"
          onclick="window.__toastInfo&&window.__toastInfo('Abriendo ticket ${i.id}')"
          >
            <div>
              <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.80)">${i.id}</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.30);margin-top:2px">${i.creado}</div>
            </div>
            <div>
              <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88)">${i.cliente}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.38)">${i.tipo}</div>
            </div>
            <div>
              <span style="font-size:11px;font-weight:700;color:${Xi[i.prioridad]||"gray"};text-transform:uppercase;padding:3px 8px;background:${Xi[i.prioridad]||"gray"}22;border-radius:99px">
                ${i.prioridad}
              </span>
            </div>
            <div>
              <span style="font-size:11px;font-weight:700;color:${wo[i.estatus]||"white"};text-transform:uppercase;padding:3px 8px;background:${wo[i.estatus]||"white"}22;border-radius:99px">
                ${i.estatus}
              </span>
            </div>
            <div style="font-size:12px;color:rgba(255,255,255,0.40)">${i.tecnico}</div>
            <div style="text-align:right">
              <div style="font-size:11px;font-weight:700;color:${i.prioridad==="crítica"?"#f87171":"rgba(255,255,255,0.40)"}">${i.sla}</div>
              <button class="btn-nux btn-accent-nux" style="font-size:11px;padding:4px 10px;margin-top:4px" onclick="event.stopPropagation();window.__toastSuccess&&window.__toastSuccess('${i.id} asignado')">
                Asignar
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Técnicos disponibles -->
    <div class="glass-card p-4 mt-3">
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px"><i class="bi bi-person-badge" style="color:${R.accent};margin-right:8px"></i>Técnicos disponibles</h3>
      <div class="row g-2">
        ${[{nombre:"Diego R.",tickets:3,carga:"Alta",estado:"activo"},{nombre:"Ana S.",tickets:2,carga:"Media",estado:"activo"},{nombre:"Carlos M.",tickets:1,carga:"Baja",estado:"activo"},{nombre:"Sara V.",tickets:0,carga:"Libre",estado:"libre"},{nombre:"Luis P.",tickets:4,carga:"Alta",estado:"activo"},{nombre:"Gaby T.",tickets:0,carga:"Libre",estado:"ausente"}].map(i=>`
          <div class="col-md-4 col-lg-2">
            <div style="padding:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);text-align:center">
              <div style="position:relative;display:inline-block;margin-bottom:8px">
                <div class="avatar" style="margin:0 auto">${i.nombre.charAt(0)}</div>
                <span class="status-dot ${i.estado==="activo"?"active":i.estado==="libre"?"accent":"danger"}" style="position:absolute;bottom:0;right:0;width:9px;height:9px;border:2px solid #181818"></span>
              </div>
              <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${i.nombre}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.35)">${i.tickets} tickets</div>
              <div style="font-size:10px;font-weight:700;color:${i.carga==="Alta"?"#f87171":i.carga==="Media"?"#fbbf24":i.carga==="Libre"?R.accent:"rgba(255,255,255,0.30)"};margin-top:4px">${i.carga}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
  `}function vu(){window.__toastSuccess=mi,window.__toastInfo=Ts}const Z={nombre:"LaunchPad",accent:"#6366f1",accentRgb:"99,102,241"},Oa=[{id:1,empresa:"Distribuidora Norteña SA",contacto:"Luis Mendoza",plan:"Enterprise",mrr:"$4,800",seats:24,nps:9,salud:94,renovacion:"31 Dic 2025",etapa:"activo"},{id:2,empresa:"Mueblería El Roble",contacto:"Ana Juárez",plan:"Business",mrr:"$1,200",seats:8,nps:8,salud:88,renovacion:"28 Feb 2026",etapa:"activo"},{id:3,empresa:"Clínica Bienestar SC",contacto:"Dr. Pérez",plan:"Business",mrr:"$1,200",seats:6,nps:7,salud:72,renovacion:"15 Mar 2026",etapa:"en riesgo"},{id:4,empresa:"Transportes VelaGo",contacto:"Marco Silva",plan:"Starter",mrr:"$490",seats:3,nps:6,salud:65,renovacion:"30 Abr 2026",etapa:"en riesgo"},{id:5,empresa:"Agencia Creativa Loop",contacto:"Sara Vidal",plan:"Business",mrr:"$1,200",seats:10,nps:10,salud:98,renovacion:"01 Jun 2026",etapa:"activo"},{id:6,empresa:"Constructora Vértice",contacto:"Ing. Reyes",plan:"Enterprise",mrr:"$4,800",seats:18,nps:9,salud:91,renovacion:"31 Jul 2026",etapa:"activo"},{id:7,empresa:"Retail Modas Tres",contacto:"Gaby Torres",plan:"Starter",mrr:"$490",seats:2,nps:5,salud:58,renovacion:"15 Sep 2026",etapa:"en riesgo"},{id:8,empresa:"Eventos Éxito SRL",contacto:"Fernanda L.",plan:"Business",mrr:"$1,200",seats:7,nps:8,salud:85,renovacion:"30 Nov 2026",etapa:"activo"}],yu=[{empresa:"Hotel Palma Real",fase:"Configuración",dias:3,csm:"Diego R.",estado:"en curso"},{empresa:"Farmacia del Pueblo",fase:"Capacitación",dias:7,csm:"Ana S.",estado:"en curso"},{empresa:"Taller Mecánico GT",fase:"Lanzamiento",dias:14,csm:"Carlos M.",estado:"completado"},{empresa:"Catering La Buena",fase:"Integración API",dias:2,csm:"Diego R.",estado:"bloqueado"}],_o={labels:["Dic","Ene","Feb","Mar","Abr","May","Jun"],data:[68400,74200,79100,84600,91e3,98400,106800]},wu={activo:"badge-success","en riesgo":"badge-warning",churned:"badge-danger"},qi={Enterprise:"#6366f1",Business:"#06b6d4",Starter:"rgba(255,255,255,0.50)"},_u=i=>`<span style="font-size:11px;font-weight:700;color:${qi[i]||"gray"};padding:2px 10px;background:${qi[i]||"gray"}22;border:1px solid ${qi[i]||"gray"}33;border-radius:99px">${i}</span>`,ku=i=>`<div style="display:flex;align-items:center;gap:8px"><div class="nux-progress" style="width:60px"><div class="nux-progress-bar" style="width:${i}%;background:${i>=80?"#22c55e":i>=65?"#f59e0b":"#f87171"}"></div></div><span style="font-size:12px">${i}%</span></div>`;function $u(){const i=[{icon:"bi-buildings",label:"Cuentas Activas",value:84,delta:"+6",trend:"up"},{icon:"bi-cash-stack",label:"MRR",value:"$106,800",delta:"+9%",trend:"up",animate:!1},{icon:"bi-arrow-up-right",label:"NPS Promedio",value:8.2,delta:"+0.4",trend:"up",animate:!1},{icon:"bi-exclamation-triangle",label:"Cuentas en riesgo",value:3,delta:"+1",trend:"down"}],t=Bt({columns:[{label:"Empresa",key:"empresa",render:e=>`<div><div style="font-weight:600;color:rgba(255,255,255,0.90)">${e.empresa}</div><div style="font-size:12px;color:rgba(255,255,255,0.35)">${e.contacto}</div></div>`},{label:"Plan",key:"plan",render:e=>_u(e.plan)},{label:"MRR",key:"mrr",render:e=>`<span style="color:var(--industry-accent);font-weight:700">${e.mrr}</span>`},{label:"Seats",key:"seats",render:e=>`${e.seats} usuarios`},{label:"NPS",key:"nps",render:e=>`<span style="font-size:14px;font-weight:700;color:${e.nps>=8?"#22c55e":e.nps>=6?"#f59e0b":"#f87171"}">${e.nps}/10</span>`},{label:"Health",key:"salud",render:e=>ku(e.salud)},{label:"Renovación",key:"renovacion"},{label:"",key:"_",render:e=>`<span class="badge-nux ${wu[e.etapa]||"badge-neutral"}">${e.etapa}</span>`}],rows:Oa});return`
  <div style="--industry-accent:${Z.accent};--industry-accent-rgb:${Z.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-buildings" style="color:${Z.accent};margin-right:10px"></i>CRM de Cuentas</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${Z.nombre} — Gestión de clientes B2B</p>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Exportando cuentas...')"><i class="bi bi-download"></i> Exportar</button>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva cuenta creada')"><i class="bi bi-plus-lg"></i> Nueva cuenta</button>
      </div>
    </div>
    ${lt(i,4)}

    <!-- Onboarding activo -->
    <div class="row g-3 mb-3">
      <div class="col-12"><h3 style="font-size:14px;font-weight:700;color:rgba(255,255,255,0.50);text-transform:uppercase;letter-spacing:0.08em">Onboarding en curso</h3></div>
      ${yu.map(e=>`
        <div class="col-md-6 col-lg-3">
          <div class="glass-card p-3">
            <div style="display:flex;justify-content:space-between;margin-bottom:8px">
              <span style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.85)">${e.empresa}</span>
              <span style="font-size:11px;font-weight:700;color:${e.estado==="completado"?"#22c55e":e.estado==="bloqueado"?"#f87171":"${empresa.accent}"};text-transform:uppercase">${e.estado}</span>
            </div>
            <div style="font-size:12px;color:rgba(255,255,255,0.40);margin-bottom:6px">${e.fase} · Día ${e.dias}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.30)">CSM: ${e.csm}</div>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="glass-card p-4">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:15px;font-weight:700;color:white">Directorio de cuentas</h3>
        <div class="search-bar" style="width:240px"><i class="bi bi-search"></i><input type="text" placeholder="Buscar empresa..."/></div>
      </div>
      ${t}
    </div>
  </div>
  `}const Mu=[{etapa:"Visitas",n:12840,pct:100,color:"rgba(99,102,241,0.25)"},{etapa:"Trials iniciados",n:1028,pct:8,color:"rgba(99,102,241,0.40)"},{etapa:"Activados",n:544,pct:53,color:"rgba(99,102,241,0.60)"},{etapa:"Pagaron",n:218,pct:40,color:"rgba(99,102,241,0.80)"},{etapa:"Expansión",n:76,pct:35,color:"#6366f1"}],Su=[{label:"LTV Promedio",val:"$12,400",sub:"por cliente",icon:"bi-trophy-fill",col:"#6366f1"},{label:"CAC",val:"$340",sub:"costo adq.",icon:"bi-bullseye",col:"#06b6d4"},{label:"LTV:CAC",val:"36x",sub:"ratio ideal >3x",icon:"bi-graph-up-arrow",col:"#22c55e"},{label:"Payback",val:"2.8 m",sub:"meses",icon:"bi-calendar-check",col:"#f59e0b"}];function Cu(){const i=[{icon:"bi-cash-stack",label:"MRR",value:"$106,800",delta:"+8.5%",trend:"up",animate:!1},{icon:"bi-graph-up-arrow",label:"ARR",value:"$1.28M",delta:"+8.5%",trend:"up",animate:!1},{icon:"bi-people-fill",label:"Usuarios Activos",value:382,delta:"+35",trend:"up"},{icon:"bi-arrow-down-circle",label:"Churn Rate",value:"2.1%",delta:"-0.3%",trend:"up",animate:!1}],t=Oa.filter(e=>e.etapa==="en riesgo");return`
  <div style="--industry-accent:${Z.accent};--industry-accent-rgb:${Z.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-rocket-takeoff-fill" style="color:${Z.accent};margin-right:10px"></i>Dashboard SaaS
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">LaunchPad — Métricas de producto y crecimiento</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(99,102,241,0.10);border:1px solid rgba(99,102,241,0.25);border-radius:var(--radius-md);font-size:13px;color:${Z.accent}">
        <span class="status-dot active"></span> Sistemas operando · +56% en 6 meses
      </div>
    </div>

    ${lt(i,4)}

    <!-- FUNNEL + MÉTRICAS CLAVE -->
    <div class="row g-3 mb-3">
      <div class="col-lg-5">
        <div class="glass-card p-4 h-100" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${Z.accent},rgba(99,102,241,0.2))"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:18px">
            <i class="bi bi-funnel-fill" style="color:${Z.accent};margin-right:8px"></i>Funnel de Conversión
          </h3>
          ${Mu.map(e=>`
            <div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <span style="font-size:13px;color:rgba(255,255,255,0.70)">${e.etapa}</span>
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:11px;color:rgba(255,255,255,0.35)">${e.n.toLocaleString()}</span>
                  ${e.etapa!=="Visitas"?`<span style="font-size:11px;font-weight:700;color:${Z.accent}">${e.pct}%</span>`:""}
                </div>
              </div>
              <div style="height:28px;background:rgba(255,255,255,0.04);border-radius:6px;overflow:hidden">
                <div style="height:100%;width:${e.pct}%;background:${e.color};border-radius:6px;display:flex;align-items:center;padding-left:8px;transition:width 1s ease">
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <div class="col-lg-7">
        <div class="row g-3">
          ${Su.map(e=>`
            <div class="col-md-6">
              <div class="glass-card p-4" style="position:relative;overflow:hidden">
                <div style="position:absolute;top:-20px;right:-20px;width:80px;height:80px;border-radius:50%;background:radial-gradient(circle,${e.col}22,transparent 70%)"></div>
                <div style="width:36px;height:36px;border-radius:var(--radius-md);background:${e.col}18;display:flex;align-items:center;justify-content:center;margin-bottom:12px">
                  <i class="bi ${e.icon}" style="color:${e.col};font-size:16px"></i>
                </div>
                <div style="font-size:1.8rem;font-weight:800;color:white;letter-spacing:-0.03em">${e.val}</div>
                <div style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.40);text-transform:uppercase;letter-spacing:0.06em;margin-top:4px">${e.label}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.25)">${e.sub}</div>
              </div>
            </div>
          `).join("")}
          <div class="col-12">
            <div class="glass-card p-4">
              <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:12px">
                <i class="bi bi-exclamation-triangle-fill" style="color:#f59e0b;margin-right:8px"></i>Cuentas en riesgo de churn
              </h3>
              ${t.map(e=>`
                <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
                  <div class="avatar avatar-sm">${e.empresa.charAt(0)}</div>
                  <div style="flex:1">
                    <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${e.empresa}</div>
                    <div style="font-size:11px;color:rgba(255,255,255,0.35)">MRR: ${e.mrr} · Salud: ${e.salud}%</div>
                  </div>
                  <span style="font-size:10px;font-weight:700;color:#f87171;background:rgba(239,68,68,0.10);padding:3px 8px;border-radius:99px">EN RIESGO</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- CHART -->
    <div class="glass-card p-4">
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:18px">Evolución del MRR — Últimos 7 meses</h3>
      <div class="chart-container" style="height:180px"><canvas id="chart-mrr"></canvas></div>
    </div>
  </div>
  `}function zu(){Si("chart-mrr",{labels:_o.labels,datasets:[{label:"MRR ($)",data:_o.data}],height:180})}const Pu=[{id:"por-contactar",label:"Por Contactar",color:"rgba(255,255,255,0.35)",cards:[{empresa:"Restaurante La Fogata",contacto:"Dueño Pedro G.",mrr:"$490",fuente:"Referido"},{empresa:"Salón de Belleza Noa",contacto:"Karen P.",mrr:"$490",fuente:"Web"},{empresa:"Taller Eléctrico GT",contacto:"Ing. Montes",mrr:"$1,200",fuente:"LinkedIn"}]},{id:"demo",label:"Demo Agendada",color:"#f59e0b",cards:[{empresa:"Distribuidora El Sol",contacto:"Lic. Salas",mrr:"$1,200",fuente:"Referido"},{empresa:"Agencia Promo MX",contacto:"Rebeca V.",mrr:"$4,800",fuente:"Conferencia"}]},{id:"propuesta",label:"Propuesta Enviada",color:"#6366f1",cards:[{empresa:"Manufactura Herrera SA",contacto:"Dir. Herrera",mrr:"$4,800",fuente:"Web"},{empresa:"Logística VelaGo Norte",contacto:"Gerente Ops.",mrr:"$1,200",fuente:"Referido"}]},{id:"negociacion",label:"Negociación",color:"#ec4899",cards:[{empresa:"Grupo Industrial NMX",contacto:"VP Finanzas",mrr:"$4,800",fuente:"Evento"}]},{id:"cerrado",label:"Cerrado ✓",color:"#22c55e",cards:[{empresa:"Hotel Palma Real",contacto:"Dir. General",mrr:"$1,200",fuente:"Referido"},{empresa:"Farmacia del Pueblo",contacto:"Dueño F. López",mrr:"$490",fuente:"Web"}]}];function Au(){return`
  <div style="--industry-accent:${Z.accent};--industry-accent-rgb:${Z.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-kanban-fill" style="color:${Z.accent};margin-right:10px"></i>Pipeline de Ventas</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${Z.nombre} — Seguimiento de deals B2B</p>
      </div>
      <div style="display:flex;gap:10px">
        <div style="padding:8px 16px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.20);border-radius:var(--radius-md);font-size:13px">
          <span style="color:rgba(255,255,255,0.45)">MRR en pipeline: </span>
          <span style="color:${Z.accent};font-weight:700">$26,370</span>
        </div>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nuevo deal creado')"><i class="bi bi-plus-lg"></i> Nuevo deal</button>
      </div>
    </div>

    <!-- Pipeline Kanban -->
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;overflow-x:auto">
      ${Pu.map(i=>`
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:12px;font-weight:700;color:${i.color};text-transform:uppercase;letter-spacing:0.06em">
            <div style="width:8px;height:8px;border-radius:50%;background:${i.color}"></div>
            ${i.label}
            <span style="margin-left:auto;background:${i.color}22;color:${i.color};font-size:11px;padding:1px 8px;border-radius:99px">${i.cards.length}</span>
          </div>
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:var(--radius-lg);padding:10px;min-height:360px">
            ${i.cards.map(t=>`
              <div style="padding:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-md);margin-bottom:8px;cursor:pointer;transition:all 0.2s"
              onmouseenter="this.style.borderColor='rgba(${Z.accentRgb},0.30)';this.style.background='rgba(${Z.accentRgb},0.06)'"
              onmouseleave="this.style.borderColor='rgba(255,255,255,0.07)';this.style.background='rgba(255,255,255,0.03)'"
              onclick="window.__toastInfo&&window.__toastInfo('Deal: ${t.empresa}')">
                <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.88);margin-bottom:4px">${t.empresa}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.38);margin-bottom:8px">${t.contacto}</div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:12px;font-weight:700;color:${Z.accent}">${t.mrr}/mo</span>
                  <span style="font-size:10px;color:rgba(255,255,255,0.30);background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px">${t.fuente}</span>
                </div>
              </div>
            `).join("")}
            <div style="padding:8px;border:1px dashed rgba(255,255,255,0.07);border-radius:var(--radius-md);text-align:center;cursor:pointer;color:rgba(255,255,255,0.20);font-size:12px"
            onclick="window.__toastSuccess&&window.__toastSuccess('Nuevo deal en ${i.label}')">
              <i class="bi bi-plus"></i>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  </div>
  `}const tt={nombre:"EduTrack",accent:"#f59e0b",accentRgb:"245,158,11"},Ea=[{id:1,nombre:"Sofía Ramírez",curso:"Inglés Avanzado",nivel:"B2",asistencia:92,promedio:9.1,mensualidad:"$1,200",estatus:"activo",pago:"al corriente"},{id:2,nombre:"Diego Morales",curso:"Programación Python",nivel:"Intermedio",asistencia:78,promedio:8.4,mensualidad:"$1,500",estatus:"activo",pago:"al corriente"},{id:3,nombre:"Valeria Ortiz",curso:"Diseño Gráfico",nivel:"Básico",asistencia:85,promedio:9.4,mensualidad:"$1,350",estatus:"activo",pago:"pendiente"},{id:4,nombre:"Carlos Herrera",curso:"Inglés Avanzado",nivel:"C1",asistencia:95,promedio:9.8,mensualidad:"$1,200",estatus:"activo",pago:"al corriente"},{id:5,nombre:"Ana González",curso:"Marketing Digital",nivel:"Avanzado",asistencia:70,promedio:7.9,mensualidad:"$1,400",estatus:"en riesgo",pago:"vencido"},{id:6,nombre:"Marco Jiménez",curso:"Programación Python",nivel:"Básico",asistencia:88,promedio:8.7,mensualidad:"$1,500",estatus:"activo",pago:"al corriente"},{id:7,nombre:"Lucía Peña",curso:"Diseño Gráfico",nivel:"Intermedio",asistencia:91,promedio:9.2,mensualidad:"$1,350",estatus:"activo",pago:"al corriente"},{id:8,nombre:"Rodrigo Salinas",curso:"Marketing Digital",nivel:"Básico",asistencia:65,promedio:7.2,mensualidad:"$1,400",estatus:"inactivo",pago:"vencido"}],Ru=[{nombre:"Inglés Avanzado",instructor:"Mtra. Elena Vidal",alumnos:24,capacidad:30,horario:"Lun/Mié/Vie 7pm",duracion:"6 meses",avance:68},{nombre:"Programación Python",instructor:"Ing. Jorge Mora",alumnos:18,capacidad:20,horario:"Mar/Jue 6pm",duracion:"4 meses",avance:45},{nombre:"Diseño Gráfico",instructor:"Dis. Laura Ríos",alumnos:15,capacidad:16,horario:"Sáb 10am",duracion:"5 meses",avance:82},{nombre:"Marketing Digital",instructor:"Lic. Pablo Salas",alumnos:22,capacidad:25,horario:"Lun/Mié 7pm",duracion:"3 meses",avance:30}],ko={labels:["Lun","Mar","Mié","Jue","Vie","Sáb"],datasets:[{label:"Asistencia %",data:[88,82,91,79,85,93]}]},Du={"al corriente":"badge-success",pendiente:"badge-warning",vencido:"badge-danger"},Tu={activo:"badge-success","en riesgo":"badge-warning",inactivo:"badge-neutral"};function Ou(){const i=[{icon:"bi-people-fill",label:"Alumnos Activos",value:79,delta:"+8",trend:"up"},{icon:"bi-mortarboard",label:"Cursos Activos",value:4,delta:"+1",trend:"up"},{icon:"bi-cash-stack",label:"Ingresos Mes",value:"$58,100",delta:"+9%",trend:"up",animate:!1},{icon:"bi-exclamation-circle",label:"Pagos Vencidos",value:6,delta:"+2",trend:"down"}],t=Bt({columns:[{label:"Alumno",key:"nombre",render:e=>`<div style="display:flex;align-items:center;gap:10px"><div class="avatar">${e.nombre.charAt(0)}</div><div><div style="font-weight:600;color:rgba(255,255,255,0.90)">${e.nombre}</div><div style="font-size:11px;color:rgba(255,255,255,0.35)">${e.nivel}</div></div></div>`},{label:"Curso",key:"curso",render:e=>`<span style="font-size:13px">${e.curso}</span>`},{label:"Asistencia",key:"asistencia",render:e=>`<div style="display:flex;align-items:center;gap:8px"><div class="nux-progress" style="width:50px"><div class="nux-progress-bar" style="width:${e.asistencia}%;background:${e.asistencia>=85?"#22c55e":e.asistencia>=70?"#f59e0b":"#f87171"}"></div></div><span style="font-size:12px">${e.asistencia}%</span></div>`},{label:"Promedio",key:"promedio",render:e=>`<span style="font-weight:700;color:${e.promedio>=9?"#22c55e":e.promedio>=7.5?"#f59e0b":"#f87171"}">${e.promedio}</span>`},{label:"Mensualidad",key:"mensualidad"},{label:"Pago",key:"pago",render:e=>`<span class="badge-nux ${Du[e.pago]||"badge-neutral"}">${e.pago}</span>`},{label:"Estatus",key:"estatus",render:e=>`<span class="badge-nux ${Tu[e.estatus]||"badge-neutral"}">${e.estatus}</span>`}],rows:Ea});return`
  <div style="--industry-accent:${tt.accent};--industry-accent-rgb:${tt.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-people-fill" style="color:${tt.accent};margin-right:10px"></i>CRM de Alumnos</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${tt.nombre} — Seguimiento académico y pagos</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nuevo alumno registrado')"><i class="bi bi-plus-lg"></i> Nuevo alumno</button>
    </div>
    ${lt(i,4)}
    <div class="glass-card p-4">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:15px;font-weight:700;color:white">Directorio de alumnos</h3>
        <div class="search-bar" style="width:220px"><i class="bi bi-search"></i><input type="text" placeholder="Buscar alumno..."/></div>
      </div>
      ${t}
    </div>
  </div>
  `}const Eu=[{hora:"07:00",lunes:"Inglés Avanz.",martes:"—",miercoles:"Inglés Avanz.",jueves:"—",viernes:"Inglés Avanz.",sabado:"—"},{hora:"08:00",lunes:"—",martes:"—",miercoles:"—",jueves:"—",viernes:"—",sabado:"—"},{hora:"09:00",lunes:"—",martes:"—",miercoles:"—",jueves:"—",viernes:"—",sabado:"Diseño Gráfico"},{hora:"10:00",lunes:"Marketing Dig.",martes:"—",miercoles:"Marketing Dig.",jueves:"—",viernes:"—",sabado:"Diseño Gráfico"},{hora:"18:00",lunes:"—",martes:"Python",miercoles:"—",jueves:"Python",viernes:"—",sabado:"—"},{hora:"19:00",lunes:"Inglés Avanz.",martes:"—",miercoles:"Inglés Avanz.",jueves:"Marketing Dig.",viernes:"Inglés Avanz.",sabado:"—"}],$o={"Inglés Avanz.":"rgba(245,158,11,0.70)",Python:"rgba(99,102,241,0.70)","Marketing Dig.":"rgba(236,72,153,0.70)","Diseño Gráfico":"rgba(16,185,129,0.70)"},Lu=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];function Iu(){const i=[{icon:"bi-people-fill",label:"Alumnos Activos",value:79,delta:"+8",trend:"up"},{icon:"bi-cash-stack",label:"Ingresos Mes",value:"$58,100",delta:"+9%",trend:"up",animate:!1},{icon:"bi-calendar-check",label:"Asistencia Prom.",value:"84%",delta:"+3%",trend:"up",animate:!1},{icon:"bi-star-fill",label:"Promedio General",value:8.7,delta:"+0.3",trend:"up",animate:!1}];return`
  <div style="--industry-accent:${tt.accent};--industry-accent-rgb:${tt.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-mortarboard-fill" style="color:${tt.accent};margin-right:10px"></i>Dashboard Académico
        </h1>
        <p style="font-size:14px;color:rgba(0,0,0,0.40)">EduTrack — Desempeño e ingresos</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(217,119,6,0.08);border:1px solid rgba(217,119,6,0.20);border-radius:var(--radius-md);font-size:13px;color:${tt.accent}">
        <span class="status-dot active"></span> 4 cursos activos · Periodo Ago-Dic 2025
      </div>
    </div>

    ${lt(i,4)}

    <!-- HORARIO SEMANAL -->
    <div class="glass-card p-4 mb-3" style="position:relative">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${tt.accent},rgba(217,119,6,0.2))"></div>
      <h3 style="font-size:15px;font-weight:700;margin-bottom:16px">
        <i class="bi bi-calendar3" style="color:${tt.accent};margin-right:8px"></i>Horario Semanal
      </h3>
      <div style="display:grid;grid-template-columns:60px repeat(6,1fr);gap:4px">
        <!-- Header días -->
        <div></div>
        ${Lu.map(t=>`<div style="text-align:center;font-size:11px;font-weight:700;color:rgba(0,0,0,0.40);padding:6px 4px;letter-spacing:0.04em">${t.substring(0,3).toUpperCase()}</div>`).join("")}

        <!-- Filas de hora -->
        ${Eu.map(t=>`
          <div style="font-size:10px;color:rgba(0,0,0,0.35);font-weight:600;padding-top:6px;white-space:nowrap">${t.hora}</div>
          ${["lunes","martes","miercoles","jueves","viernes","sabado"].map(e=>{const s=t[e];return`<div style="height:36px;border-radius:6px;background:${s&&s!=="—"?$o[s]||"rgba(217,119,6,0.30)":"transparent"};display:flex;align-items:center;justify-content:center;border:1px solid ${s&&s!=="—"?"transparent":"rgba(0,0,0,0.06)"}">
              ${s&&s!=="—"?`<span style="font-size:9px;font-weight:700;color:white;text-align:center;padding:0 4px;line-height:1.2">${s}</span>`:""}
            </div>`}).join("")}
        `).join("")}
      </div>

      <!-- Leyenda -->
      <div style="display:flex;gap:16px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(0,0,0,0.07);flex-wrap:wrap">
        ${Object.entries($o).map(([t,e])=>`<span style="display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(0,0,0,0.50)"><span style="width:12px;height:12px;border-radius:3px;background:${e};display:inline-block"></span>${t}</span>`).join("")}
      </div>
    </div>

    <!-- CURSOS PROGRESS + CHART -->
    <div class="row g-3">
      <div class="col-lg-6">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;margin-bottom:16px">Avance de cursos</h3>
          ${Ru.map(t=>`
            <div style="margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <div>
                  <div style="font-size:13px;font-weight:600">${t.nombre}</div>
                  <div style="font-size:11px;color:rgba(0,0,0,0.40)">${t.instructor} · ${t.alumnos}/${t.capacidad} alumnos</div>
                </div>
                <span style="font-size:16px;font-weight:800;color:${tt.accent}">${t.avance}%</span>
              </div>
              <div class="nux-progress">
                <div class="nux-progress-bar" style="width:${t.avance}%"></div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
      <div class="col-lg-6">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;margin-bottom:18px">Asistencia semanal (%)</h3>
          <div class="chart-container" style="height:200px"><canvas id="chart-asistencia"></canvas></div>
        </div>
      </div>
    </div>
  </div>
  `}function Fu(){Ci("chart-asistencia",{labels:ko.labels,datasets:ko.datasets,height:200})}function ju(){const i=[{hora:"07:00",curso:"CrossFit 6am",instructor:"Mtra. Elena Vidal",salon:"Aula A",asistentes:18,estado:"en curso"},{hora:"09:00",curso:"Inglés Avanzado",instructor:"Mtra. Elena Vidal",salon:"Aula B",asistentes:22,estado:"en curso"},{hora:"11:00",curso:"Diseño Gráfico",instructor:"Dis. Laura Ríos",salon:"Lab PC",asistentes:14,estado:"próximo"},{hora:"13:00",curso:"Python Básico",instructor:"Ing. Jorge Mora",salon:"Lab PC",asistentes:16,estado:"próximo"},{hora:"17:00",curso:"Marketing Digital",instructor:"Lic. Pablo Salas",salon:"Aula C",asistentes:20,estado:"próximo"},{hora:"19:00",curso:"Inglés Avanzado",instructor:"Mtra. Elena Vidal",salon:"Aula A",asistentes:24,estado:"próximo"}],t={"en curso":"#22c55e",próximo:tt.accent,completado:"rgba(255,255,255,0.30)"};return`
  <div style="--industry-accent:${tt.accent};--industry-accent-rgb:${tt.accentRgb}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-calendar3" style="color:${tt.accent};margin-right:10px"></i>Operaciones del Día</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${tt.nombre} — Clases y asistencia en tiempo real</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Lista de asistencia tomada')"><i class="bi bi-check2-all"></i> Tomar asistencia</button>
    </div>

    <!-- Resumen del día -->
    <div class="row g-3 mb-3">
      ${[{label:"Clases hoy",val:6,icon:"bi-calendar3",color:tt.accent},{label:"Alumnos hoy",val:114,icon:"bi-people-fill",color:"#22c55e"},{label:"Instructores",val:4,icon:"bi-person-video3",color:"#06b6d4"},{label:"Salones activos",val:3,icon:"bi-door-open-fill",color:"#f59e0b"}].map(e=>`
        <div class="col-md-3 col-6">
          <div class="glass-card p-3" style="display:flex;align-items:center;gap:14px">
            <i class="bi ${e.icon}" style="font-size:24px;color:${e.color}"></i>
            <div>
              <div style="font-size:1.6rem;font-weight:800;color:${e.color}">${e.val}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;font-weight:700">${e.label}</div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Timeline de clases -->
    <div class="glass-card p-4 mb-3" style="position:relative">
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${tt.accent},transparent)"></div>
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Horario de hoy</h3>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${i.map(e=>`
          <div style="display:grid;grid-template-columns:70px 1fr auto;align-items:center;gap:16px;padding:14px 18px;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-left:3px solid ${t[e.estado]||"gray"};border-radius:var(--radius-md)">
            <div>
              <div style="font-size:14px;font-weight:800;color:white">${e.hora}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.30)">${e.salon}</div>
            </div>
            <div>
              <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88)">${e.curso}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.38)">${e.instructor} · ${e.asistentes} alumnos</div>
            </div>
            <div style="text-align:right">
              <span style="font-size:11px;font-weight:700;color:${t[e.estado]};text-transform:uppercase;padding:3px 10px;background:${t[e.estado]}22;border-radius:99px">${e.estado}</span>
              ${e.estado==="en curso"?`<br><button class="btn-nux btn-accent-nux" style="font-size:11px;padding:4px 10px;margin-top:6px" onclick="window.__toastSuccess&&window.__toastSuccess('Asistencia guardada')">Asistencia</button>`:""}
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Alumnos con alertas -->
    <div class="glass-card p-4">
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px"><i class="bi bi-exclamation-triangle" style="color:#f59e0b;margin-right:8px"></i>Alertas académicas</h3>
      <div class="row g-2">
        ${Ea.filter(e=>e.asistencia<80||e.pago==="vencido"||e.estatus!=="activo").map(e=>`
          <div class="col-md-6">
            <div style="padding:12px 16px;background:rgba(239,68,68,0.04);border:1px solid rgba(239,68,68,0.15);border-radius:var(--radius-md);display:flex;align-items:center;gap:12px">
              <div class="avatar" style="width:32px;height:32px;font-size:13px">${e.nombre.charAt(0)}</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88)">${e.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.35)">${e.curso}</div>
                <div style="display:flex;gap:8px;margin-top:4px">
                  ${e.asistencia<80?`<span style="font-size:10px;color:#fbbf24">Asistencia: ${e.asistencia}%</span>`:""}
                  ${e.pago==="vencido"?'<span style="font-size:10px;color:#f87171">Pago vencido</span>':""}
                </div>
              </div>
              <button class="btn-nux btn-accent-nux" style="font-size:11px;padding:4px 10px" onclick="window.__toastSuccess&&window.__toastSuccess('Contactando a ${e.nombre.split(" ")[0]}')">Contactar</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
  `}const X={nombre:"PowerGym",accent:"#ec4899",accentRgb:"236,72,153"},Bu=[{id:1,nombre:"Roberto Núñez",plan:"Elite",desde:"Ene 2024",accesos:22,clase:"CrossFit",trainer:"Carlos V.",estado:"activo",pago:"al corriente"},{id:2,nombre:"Gabriela Ríos",plan:"Premium",desde:"Mar 2024",accesos:18,clase:"Yoga",trainer:"Sandra M.",estado:"activo",pago:"al corriente"},{id:3,nombre:"Andrés Lara",plan:"Básico",desde:"Jun 2024",accesos:8,clase:"Spinning",trainer:"-",estado:"activo",pago:"pendiente"},{id:4,nombre:"Paola Serrano",plan:"Elite",desde:"Feb 2024",accesos:26,clase:"CrossFit",trainer:"Carlos V.",estado:"activo",pago:"al corriente"},{id:5,nombre:"Miguel Castro",plan:"Premium",desde:"Abr 2024",accesos:14,clase:"Boxeo",trainer:"Javier R.",estado:"activo",pago:"al corriente"},{id:6,nombre:"Laura Medina",plan:"Básico",desde:"Jul 2024",accesos:4,clase:"-",trainer:"-",estado:"en riesgo",pago:"vencido"},{id:7,nombre:"Tomás Fuentes",plan:"Elite",desde:"Ene 2024",accesos:24,clase:"Pilates",trainer:"Sandra M.",estado:"activo",pago:"al corriente"},{id:8,nombre:"Claudia Vega",plan:"Premium",desde:"May 2024",accesos:16,clase:"Zumba",trainer:"Karen L.",estado:"activo",pago:"al corriente"}],La=[{nombre:"CrossFit 6am",trainer:"Carlos V.",cupo:16,inscritos:14,sala:"Box A",horario:"L-M-V 6:00am"},{nombre:"Yoga Flow",trainer:"Sandra M.",cupo:20,inscritos:18,sala:"Studio B",horario:"L-M-V 7:30am"},{nombre:"Spinning",trainer:"Javier R.",cupo:24,inscritos:20,sala:"Cycling",horario:"Mar-Jue 6:30pm"},{nombre:"Boxeo",trainer:"Javier R.",cupo:12,inscritos:10,sala:"Ring",horario:"Mar-Jue 7:30pm"},{nombre:"Pilates",trainer:"Sandra M.",cupo:15,inscritos:13,sala:"Studio B",horario:"Sáb 9:00am"},{nombre:"Zumba",trainer:"Karen L.",cupo:30,inscritos:27,sala:"Salón D",horario:"L-M-V 8:00pm"}],Mo={labels:["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],data:[87,92,78,95,88,110,45]},Ki={Elite:"#ec4899",Premium:"#8b5cf6",Básico:"rgba(255,255,255,0.50)"},Vu=i=>`<span style="font-size:11px;font-weight:700;color:${Ki[i]||"gray"};padding:2px 10px;background:${Ki[i]||"gray"}22;border:1px solid ${Ki[i]||"gray"}33;border-radius:99px">${i}</span>`,Nu={"al corriente":"badge-success",pendiente:"badge-warning",vencido:"badge-danger"};function Hu(){const i=[{icon:"bi-people-fill",label:"Miembros Activos",value:248,delta:"+14",trend:"up"},{icon:"bi-trophy-fill",label:"Miembros Elite",value:82,delta:"+6",trend:"up"},{icon:"bi-cash-stack",label:"Ingresos Mes",value:"$82,100",delta:"+5%",trend:"up",animate:!1},{icon:"bi-exclamation-circle",label:"Pagos Vencidos",value:11,delta:"+3",trend:"down"}],t=Bt({columns:[{label:"Miembro",key:"nombre",render:e=>`<div style="display:flex;align-items:center;gap:10px"><div class="avatar">${e.nombre.charAt(0)}</div><div><div style="font-weight:600;color:rgba(255,255,255,0.90)">${e.nombre}</div><div style="font-size:11px;color:rgba(255,255,255,0.35)">Desde ${e.desde}</div></div></div>`},{label:"Plan",key:"plan",render:e=>Vu(e.plan)},{label:"Accesos/mes",key:"accesos",render:e=>`<span style="font-weight:700;color:${e.accesos>=20?X.accent:e.accesos>=12?"#f59e0b":"#f87171"}">${e.accesos}</span>`},{label:"Clase fav.",key:"clase"},{label:"Trainer",key:"trainer",render:e=>e.trainer!=="-"?`<span style="font-size:13px">${e.trainer}</span>`:'<span style="color:rgba(255,255,255,0.25)">—</span>'},{label:"Pago",key:"pago",render:e=>`<span class="badge-nux ${Nu[e.pago]||"badge-neutral"}">${e.pago}</span>`},{label:"",key:"_",render:e=>`<button class="btn-nux btn-accent-nux" style="font-size:11px;padding:5px 10px" onclick="window.__toastInfo&&window.__toastInfo('Perfil de ${e.nombre.split(" ")[0]}')">Ver</button>`}],rows:Bu});return`
  <div style="--industry-accent:${X.accent};--industry-accent-rgb:${X.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-people-fill" style="color:${X.accent};margin-right:10px"></i>CRM de Miembros</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${X.nombre} — Membresías y fidelización</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nuevo miembro registrado')"><i class="bi bi-plus-lg"></i> Nuevo miembro</button>
    </div>
    ${lt(i,4)}
    <div class="glass-card p-4">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
        <h3 style="font-size:15px;font-weight:700;color:white">Directorio de miembros</h3>
        <div style="display:flex;gap:10px">
          <div class="search-bar" style="width:200px"><i class="bi bi-search"></i><input type="text" placeholder="Buscar..."/></div>
          <select class="nux-input" style="width:auto;padding:9px 12px"><option>Todos los planes</option><option>Elite</option><option>Premium</option><option>Básico</option></select>
        </div>
      </div>
      ${t}
    </div>
  </div>
  `}const Wu=[{nombre:"Roberto N.",clase:"CrossFit 6am",hora:"05:58",avatar:"R",plan:"Elite"},{nombre:"Paola S.",clase:"CrossFit 6am",hora:"06:02",avatar:"P",plan:"Elite"},{nombre:"Gabriela R.",clase:"Yoga Flow",hora:"07:25",avatar:"G",plan:"Premium"},{nombre:"Tomás F.",clase:"Yoga Flow",hora:"07:28",avatar:"T",plan:"Elite"},{nombre:"Miguel C.",clase:"Spinning",hora:"18:29",avatar:"M",plan:"Premium"},{nombre:"Claudia V.",clase:"Zumba",hora:"19:58",avatar:"C",plan:"Premium"}],So={cardio:"#ec4899",fuerza:"#f97316",mente:"#6366f1",funcional:"#eab308"},Gu={"CrossFit 6am":"fuerza","Yoga Flow":"mente",Spinning:"cardio",Boxeo:"fuerza",Pilates:"mente",Zumba:"cardio"};function Yu(){const i=[{icon:"bi-people-fill",label:"Miembros Activos",value:248,delta:"+14",trend:"up"},{icon:"bi-door-open-fill",label:"Accesos Hoy",value:87,delta:"+12",trend:"up"},{icon:"bi-cash-stack",label:"Ingresos Mes",value:"$82,100",delta:"+5%",trend:"up",animate:!1},{icon:"bi-person-x-fill",label:"Bajas Este Mes",value:4,delta:"-2",trend:"up"}];return`
  <div style="--industry-accent:${X.accent};--industry-accent-rgb:${X.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-lightning-charge-fill" style="color:${X.accent};margin-right:10px"></i>Dashboard del Gym
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">PowerGym — Métricas de membresías y afluencia</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(236,72,153,0.10);border:1px solid rgba(236,72,153,0.25);border-radius:var(--radius-md);font-size:13px;color:${X.accent}">
        <span class="status-dot active"></span> Gym abierto — 87 personas adentro
      </div>
    </div>

    ${lt(i,4)}

    <!-- CLASES DE HOY -->
    <div class="glass-card p-4 mb-3" style="position:relative">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${X.accent},rgba(236,72,153,0.2))"></div>
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">
        <i class="bi bi-calendar-event-fill" style="color:${X.accent};margin-right:8px"></i>Clases de Hoy
      </h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
        ${La.map(t=>{const e=Gu[t.nombre]||"cardio",s=So[e],n=Math.round(t.inscritos/t.cupo*100);return`
          <div style="padding:16px;background:${s}12;border:1.5px solid ${s}30;border-radius:var(--radius-lg);position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:3px;background:${s}"></div>
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:10px">
              <div>
                <div style="font-size:14px;font-weight:800;color:white">${t.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.45)">${t.trainer}</div>
              </div>
              <span style="font-size:10px;font-weight:700;color:${s};text-transform:uppercase;background:${s}20;padding:2px 7px;border-radius:99px">${e}</span>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.40);margin-bottom:8px">
              <i class="bi bi-clock" style="margin-right:4px"></i>${t.horario} · ${t.sala}
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:12px;color:rgba(255,255,255,0.55)">Ocupación</span>
              <span style="font-size:13px;font-weight:700;color:${n>=90?"#f87171":n>=70?"#fbbf24":s}">${t.inscritos}/${t.cupo}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:99px">
              <div style="width:${n}%;height:100%;background:${n>=90?"#f87171":n>=70?"#fbbf24":s};border-radius:99px;box-shadow:0 0 6px ${s}60"></div>
            </div>
          </div>
          `}).join("")}
      </div>
      <div style="display:flex;gap:16px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06)">
        ${Object.entries(So).map(([t,e])=>`<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:rgba(255,255,255,0.40)"><span style="width:8px;height:8px;border-radius:2px;background:${e}"></span>${t.charAt(0).toUpperCase()+t.slice(1)}</span>`).join("")}
      </div>
    </div>

    <!-- CHART + CHECK-INS -->
    <div class="row g-3">
      <div class="col-lg-7">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:18px">Afluencia por día de la semana</h3>
          <div class="chart-container" style="height:180px"><canvas id="chart-accesos"></canvas></div>
        </div>
      </div>
      <div class="col-lg-5">
        <div class="glass-card p-4 h-100">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:14px">
            <i class="bi bi-person-check-fill" style="color:${X.accent};margin-right:8px"></i>Check-ins recientes
          </h3>
          ${Wu.map(t=>`
            <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
              <div style="width:32px;height:32px;border-radius:50%;background:rgba(236,72,153,0.20);border:2px solid rgba(236,72,153,0.40);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${X.accent};flex-shrink:0">${t.avatar}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${t.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.35);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.clase}</div>
              </div>
              <div style="text-align:right;flex-shrink:0">
                <div style="font-size:11px;color:${X.accent};font-weight:700">${t.hora}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.25)">${t.plan}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </div>
  `}function Uu(){Ci("chart-accesos",{labels:Mo.labels,datasets:[{label:"Accesos",data:Mo.data}],height:180})}function Xu(){const i=[{nombre:"Roberto Núñez",hora:"06:02",plan:"Elite",clase:"CrossFit"},{nombre:"Paola Serrano",hora:"06:05",plan:"Elite",clase:"CrossFit"},{nombre:"Gabriela Ríos",hora:"07:28",plan:"Premium",clase:"Yoga"},{nombre:"Miguel Castro",hora:"07:44",plan:"Premium",clase:"Boxeo"},{nombre:"Tomás Fuentes",hora:"08:15",plan:"Elite",clase:"Pilates"},{nombre:"Claudia Vega",hora:"08:22",plan:"Premium",clase:"Zumba"},{nombre:"Andrés Lara",hora:"09:10",plan:"Básico",clase:"Libre"}];return`
  <div style="--industry-accent:${X.accent};--industry-accent-rgb:${X.accentRgb}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-door-open-fill" style="color:${X.accent};margin-right:10px"></i>Control de Acceso</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${X.nombre} — Afluencia en tiempo real</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Check-in manual registrado')"><i class="bi bi-qr-code-scan"></i> Check-in manual</button>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-lg-8">
        <!-- Clases del día -->
        <div class="glass-card p-4" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${X.accent},transparent)"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Clases activas ahora</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
            ${La.map(t=>{const e=Math.round(t.inscritos/t.cupo*100),s=e>=90?"#f87171":e>=70?X.accent:"#22c55e";return`
              <div style="padding:14px;background:rgba(255,255,255,0.025);border:1px solid rgba(${X.accentRgb},0.12);border-radius:var(--radius-md)">
                <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.88);margin-bottom:4px">${t.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.38);margin-bottom:10px">${t.trainer} · ${t.sala}</div>
                <div class="nux-progress" style="margin-bottom:6px"><div class="nux-progress-bar" style="width:${e}%;background:${s}"></div></div>
                <div style="display:flex;justify-content:space-between;font-size:11px">
                  <span style="color:rgba(255,255,255,0.40)">${t.horario}</span>
                  <span style="font-weight:700;color:${s}">${t.inscritos}/${t.cupo}</span>
                </div>
              </div>
            `}).join("")}
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <!-- Accesos recientes -->
        <div class="glass-card p-4 h-100">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:700;color:white">Accesos recientes</h3>
            <span class="status-dot active" style="width:8px;height:8px"></span>
          </div>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${i.map(t=>`
              <div style="display:flex;align-items:center;gap:10px;padding:8px;background:rgba(255,255,255,0.025);border-radius:var(--radius-md)">
                <div class="avatar" style="width:32px;height:32px;font-size:13px">${t.nombre.charAt(0)}</div>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${t.nombre}</div>
                  <div style="font-size:10px;color:rgba(255,255,255,0.35)">${t.clase}</div>
                </div>
                <div style="text-align:right">
                  <div style="font-size:11px;font-weight:700;color:${X.accent}">${t.hora}</div>
                  <div style="font-size:10px;color:rgba(255,255,255,0.30)">${t.plan}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>
  `}window.__toastSuccess=mi;window.__toastError=th;window.__toastInfo=Ts;window.__toastWarning=eh;function qu(){if(!document.getElementById("toast-container")){const i=document.createElement("div");i.id="toast-container",document.body.appendChild(i)}}function Os(i,t){return()=>{const e=dh(i());document.getElementById("app").innerHTML=e,ph(),t&&t()}}function U(i,t,e,s,n){return()=>{const o=bh(i,t,e(),n);document.getElementById("app").innerHTML=o,mh(),s&&requestAnimationFrame(()=>{s&&s()})}}j("/",Os(Ma,Sa));j("/home",Os(Ma,Sa));j("/inspiracion",Os(nh,oh));function je(i){return()=>{document.getElementById("app").innerHTML=i()}}j("/restaurantes",je(yh));j("/salud",je(Dh));j("/construccion",je(Nh));j("/retail",je(Zh));j("/servicios",je(pu));j("/restaurantes/crm",U("restaurantes","CRM de Clientes",kh,null,"/restaurantes/crm"));j("/restaurantes/dashboard",U("restaurantes","Dashboard",Sh,Ch,"/restaurantes/dashboard"));j("/restaurantes/operaciones",U("restaurantes","Operaciones",Ph,null,"/restaurantes/operaciones"));j("/salud/crm",U("salud","Expedientes",Th,null,"/salud/crm"));j("/salud/dashboard",U("salud","Dashboard Clínico",Ih,Fh,"/salud/dashboard"));j("/salud/operaciones",U("salud","Operaciones del Día",jh,null,"/salud/operaciones"));j("/construccion/crm",U("construccion","Gestión de Proyectos",Hh,null,"/construccion/crm"));j("/construccion/dashboard",U("construccion","Dashboard de Obra",Yh,Uh,"/construccion/dashboard"));j("/construccion/operaciones",U("construccion","Tablero Operativo",Kh,null,"/construccion/operaciones"));j("/retail/crm",U("retail","CRM de Clientes",tu,null,"/retail/crm"));j("/retail/dashboard",U("retail","Dashboard de Ventas",su,nu,"/retail/dashboard"));j("/retail/operaciones",U("retail","Punto de Venta",au,ru,"/retail/operaciones"));j("/servicios/crm",U("servicios","CRM de Clientes",gu,null,"/servicios/crm"));j("/servicios/dashboard",U("servicios","Dashboard MRR",bu,mu,"/servicios/dashboard"));j("/servicios/operaciones",U("servicios","Gestión de Tickets",xu,vu,"/servicios/operaciones"));j("/saas/crm",U("saas","CRM de Cuentas",$u,null,"/saas/crm"));j("/saas/dashboard",U("saas","Dashboard SaaS",Cu,zu,"/saas/dashboard"));j("/saas/operaciones",U("saas","Pipeline de Ventas",Au,null,"/saas/operaciones"));j("/educacion/crm",U("educacion","CRM de Alumnos",Ou,null,"/educacion/crm"));j("/educacion/dashboard",U("educacion","Dashboard Académico",Iu,Fu,"/educacion/dashboard"));j("/educacion/operaciones",U("educacion","Operaciones del Día",ju,null,"/educacion/operaciones"));j("/fitness/crm",U("fitness","CRM de Miembros",Hu,null,"/fitness/crm"));j("/fitness/dashboard",U("fitness","Dashboard del Gym",Yu,Uu,"/fitness/dashboard"));j("/fitness/operaciones",U("fitness","Control de Acceso",Xu,null,"/fitness/operaciones"));qu();Jp()?oo():Zp(()=>oo());
