var Za=Object.defineProperty;var Qa=(e,t,i)=>t in e?Za(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var $=(e,t,i)=>Qa(e,typeof t!="symbol"?t+"":t,i);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function ai(e){return e+.5|0}const Gt=(e,t,i)=>Math.max(Math.min(e,i),t);function Ve(e){return Gt(ai(e*2.55),0,255)}function Zt(e){return Gt(ai(e*255),0,255)}function jt(e){return Gt(ai(e/2.55)/100,0,1)}function io(e){return Gt(ai(e*100),0,100)}const xt={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},vs=[..."0123456789ABCDEF"],tr=e=>vs[e&15],er=e=>vs[(e&240)>>4]+vs[e&15],di=e=>(e&240)>>4===(e&15),ir=e=>di(e.r)&&di(e.g)&&di(e.b)&&di(e.a);function sr(e){var t=e.length,i;return e[0]==="#"&&(t===4||t===5?i={r:255&xt[e[1]]*17,g:255&xt[e[2]]*17,b:255&xt[e[3]]*17,a:t===5?xt[e[4]]*17:255}:(t===7||t===9)&&(i={r:xt[e[1]]<<4|xt[e[2]],g:xt[e[3]]<<4|xt[e[4]],b:xt[e[5]]<<4|xt[e[6]],a:t===9?xt[e[7]]<<4|xt[e[8]]:255})),i}const or=(e,t)=>e<255?t(e):"";function nr(e){var t=ir(e)?tr:er;return e?"#"+t(e.r)+t(e.g)+t(e.b)+or(e.a,t):void 0}const ar=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function Nn(e,t,i){const s=t*Math.min(i,1-i),o=(n,a=(n+e/30)%12)=>i-s*Math.max(Math.min(a-3,9-a,1),-1);return[o(0),o(8),o(4)]}function rr(e,t,i){const s=(o,n=(o+e/60)%6)=>i-i*t*Math.max(Math.min(n,4-n,1),0);return[s(5),s(3),s(1)]}function lr(e,t,i){const s=Nn(e,1,.5);let o;for(t+i>1&&(o=1/(t+i),t*=o,i*=o),o=0;o<3;o++)s[o]*=1-t-i,s[o]+=t;return s}function cr(e,t,i,s,o){return e===o?(t-i)/s+(t<i?6:0):t===o?(i-e)/s+2:(e-t)/s+4}function Is(e){const i=e.r/255,s=e.g/255,o=e.b/255,n=Math.max(i,s,o),a=Math.min(i,s,o),r=(n+a)/2;let l,c,d;return n!==a&&(d=n-a,c=r>.5?d/(2-n-a):d/(n+a),l=cr(i,s,o,d,n),l=l*60+.5),[l|0,c||0,r]}function js(e,t,i,s){return(Array.isArray(t)?e(t[0],t[1],t[2]):e(t,i,s)).map(Zt)}function Fs(e,t,i){return js(Nn,e,t,i)}function dr(e,t,i){return js(lr,e,t,i)}function pr(e,t,i){return js(rr,e,t,i)}function Wn(e){return(e%360+360)%360}function hr(e){const t=ar.exec(e);let i=255,s;if(!t)return;t[5]!==s&&(i=t[6]?Ve(+t[5]):Zt(+t[5]));const o=Wn(+t[2]),n=+t[3]/100,a=+t[4]/100;return t[1]==="hwb"?s=dr(o,n,a):t[1]==="hsv"?s=pr(o,n,a):s=Fs(o,n,a),{r:s[0],g:s[1],b:s[2],a:i}}function gr(e,t){var i=Is(e);i[0]=Wn(i[0]+t),i=Fs(i),e.r=i[0],e.g=i[1],e.b=i[2]}function ur(e){if(!e)return;const t=Is(e),i=t[0],s=io(t[1]),o=io(t[2]);return e.a<255?`hsla(${i}, ${s}%, ${o}%, ${jt(e.a)})`:`hsl(${i}, ${s}%, ${o}%)`}const so={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},oo={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function fr(){const e={},t=Object.keys(oo),i=Object.keys(so);let s,o,n,a,r;for(s=0;s<t.length;s++){for(a=r=t[s],o=0;o<i.length;o++)n=i[o],r=r.replace(n,so[n]);n=parseInt(oo[a],16),e[r]=[n>>16&255,n>>8&255,n&255]}return e}let pi;function br(e){pi||(pi=fr(),pi.transparent=[0,0,0,0]);const t=pi[e.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const mr=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function xr(e){const t=mr.exec(e);let i=255,s,o,n;if(t){if(t[7]!==s){const a=+t[7];i=t[8]?Ve(a):Gt(a*255,0,255)}return s=+t[1],o=+t[3],n=+t[5],s=255&(t[2]?Ve(s):Gt(s,0,255)),o=255&(t[4]?Ve(o):Gt(o,0,255)),n=255&(t[6]?Ve(n):Gt(n,0,255)),{r:s,g:o,b:n,a:i}}}function vr(e){return e&&(e.a<255?`rgba(${e.r}, ${e.g}, ${e.b}, ${jt(e.a)})`:`rgb(${e.r}, ${e.g}, ${e.b})`)}const Zi=e=>e<=.0031308?e*12.92:Math.pow(e,1/2.4)*1.055-.055,_e=e=>e<=.04045?e/12.92:Math.pow((e+.055)/1.055,2.4);function yr(e,t,i){const s=_e(jt(e.r)),o=_e(jt(e.g)),n=_e(jt(e.b));return{r:Zt(Zi(s+i*(_e(jt(t.r))-s))),g:Zt(Zi(o+i*(_e(jt(t.g))-o))),b:Zt(Zi(n+i*(_e(jt(t.b))-n))),a:e.a+i*(t.a-e.a)}}function hi(e,t,i){if(e){let s=Is(e);s[t]=Math.max(0,Math.min(s[t]+s[t]*i,t===0?360:1)),s=Fs(s),e.r=s[0],e.g=s[1],e.b=s[2]}}function Gn(e,t){return e&&Object.assign(t||{},e)}function no(e){var t={r:0,g:0,b:0,a:255};return Array.isArray(e)?e.length>=3&&(t={r:e[0],g:e[1],b:e[2],a:255},e.length>3&&(t.a=Zt(e[3]))):(t=Gn(e,{r:0,g:0,b:0,a:1}),t.a=Zt(t.a)),t}function wr(e){return e.charAt(0)==="r"?xr(e):hr(e)}class Ze{constructor(t){if(t instanceof Ze)return t;const i=typeof t;let s;i==="object"?s=no(t):i==="string"&&(s=sr(t)||br(t)||wr(t)),this._rgb=s,this._valid=!!s}get valid(){return this._valid}get rgb(){var t=Gn(this._rgb);return t&&(t.a=jt(t.a)),t}set rgb(t){this._rgb=no(t)}rgbString(){return this._valid?vr(this._rgb):void 0}hexString(){return this._valid?nr(this._rgb):void 0}hslString(){return this._valid?ur(this._rgb):void 0}mix(t,i){if(t){const s=this.rgb,o=t.rgb;let n;const a=i===n?.5:i,r=2*a-1,l=s.a-o.a,c=((r*l===-1?r:(r+l)/(1+r*l))+1)/2;n=1-c,s.r=255&c*s.r+n*o.r+.5,s.g=255&c*s.g+n*o.g+.5,s.b=255&c*s.b+n*o.b+.5,s.a=a*s.a+(1-a)*o.a,this.rgb=s}return this}interpolate(t,i){return t&&(this._rgb=yr(this._rgb,t._rgb,i)),this}clone(){return new Ze(this.rgb)}alpha(t){return this._rgb.a=Zt(t),this}clearer(t){const i=this._rgb;return i.a*=1-t,this}greyscale(){const t=this._rgb,i=ai(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=i,this}opaquer(t){const i=this._rgb;return i.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return hi(this._rgb,2,t),this}darken(t){return hi(this._rgb,2,-t),this}saturate(t){return hi(this._rgb,1,t),this}desaturate(t){return hi(this._rgb,1,-t),this}rotate(t){return gr(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Tt(){}const $r=(()=>{let e=0;return()=>e++})();function T(e){return e==null}function X(e){if(Array.isArray&&Array.isArray(e))return!0;const t=Object.prototype.toString.call(e);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function E(e){return e!==null&&Object.prototype.toString.call(e)==="[object Object]"}function K(e){return(typeof e=="number"||e instanceof Number)&&isFinite(+e)}function bt(e,t){return K(e)?e:t}function C(e,t){return typeof e>"u"?t:e}const _r=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100:+e/t,Yn=(e,t)=>typeof e=="string"&&e.endsWith("%")?parseFloat(e)/100*t:+e;function W(e,t,i){if(e&&typeof e.call=="function")return e.apply(i,t)}function V(e,t,i,s){let o,n,a;if(X(e))for(n=e.length,o=0;o<n;o++)t.call(i,e[o],o);else if(E(e))for(a=Object.keys(e),n=a.length,o=0;o<n;o++)t.call(i,e[a[o]],a[o])}function Ei(e,t){let i,s,o,n;if(!e||!t||e.length!==t.length)return!1;for(i=0,s=e.length;i<s;++i)if(o=e[i],n=t[i],o.datasetIndex!==n.datasetIndex||o.index!==n.index)return!1;return!0}function Li(e){if(X(e))return e.map(Li);if(E(e)){const t=Object.create(null),i=Object.keys(e),s=i.length;let o=0;for(;o<s;++o)t[i[o]]=Li(e[i[o]]);return t}return e}function Xn(e){return["__proto__","prototype","constructor"].indexOf(e)===-1}function kr(e,t,i,s){if(!Xn(e))return;const o=t[e],n=i[e];E(o)&&E(n)?Qe(o,n,s):t[e]=Li(n)}function Qe(e,t,i){const s=X(t)?t:[t],o=s.length;if(!E(e))return e;i=i||{};const n=i.merger||kr;let a;for(let r=0;r<o;++r){if(a=s[r],!E(a))continue;const l=Object.keys(a);for(let c=0,d=l.length;c<d;++c)n(l[c],e,a,i)}return e}function Xe(e,t){return Qe(e,t,{merger:Mr})}function Mr(e,t,i){if(!Xn(e))return;const s=t[e],o=i[e];E(s)&&E(o)?Xe(s,o):Object.prototype.hasOwnProperty.call(t,e)||(t[e]=Li(o))}const ao={"":e=>e,x:e=>e.x,y:e=>e.y};function zr(e){const t=e.split("."),i=[];let s="";for(const o of t)s+=o,s.endsWith("\\")?s=s.slice(0,-1)+".":(i.push(s),s="");return i}function Sr(e){const t=zr(e);return i=>{for(const s of t){if(s==="")break;i=i&&i[s]}return i}}function Qt(e,t){return(ao[t]||(ao[t]=Sr(t)))(e)}function Bs(e){return e.charAt(0).toUpperCase()+e.slice(1)}const ti=e=>typeof e<"u",te=e=>typeof e=="function",ro=(e,t)=>{if(e.size!==t.size)return!1;for(const i of e)if(!t.has(i))return!1;return!0};function Cr(e){return e.type==="mouseup"||e.type==="click"||e.type==="contextmenu"}const F=Math.PI,G=2*F,Pr=G+F,Oi=Number.POSITIVE_INFINITY,Rr=F/180,Z=F/2,ae=F/4,lo=F*2/3,Yt=Math.log10,Dt=Math.sign;function Ue(e,t,i){return Math.abs(e-t)<i}function co(e){const t=Math.round(e);e=Ue(e,t,e/1e3)?t:e;const i=Math.pow(10,Math.floor(Yt(e))),s=e/i;return(s<=1?1:s<=2?2:s<=5?5:10)*i}function Ar(e){const t=[],i=Math.sqrt(e);let s;for(s=1;s<i;s++)e%s===0&&(t.push(s),t.push(e/s));return i===(i|0)&&t.push(i),t.sort((o,n)=>o-n).pop(),t}function Dr(e){return typeof e=="symbol"||typeof e=="object"&&e!==null&&!(Symbol.toPrimitive in e||"toString"in e||"valueOf"in e)}function Pe(e){return!Dr(e)&&!isNaN(parseFloat(e))&&isFinite(e)}function Tr(e,t){const i=Math.round(e);return i-t<=e&&i+t>=e}function Un(e,t,i){let s,o,n;for(s=0,o=e.length;s<o;s++)n=e[s][i],isNaN(n)||(t.min=Math.min(t.min,n),t.max=Math.max(t.max,n))}function Mt(e){return e*(F/180)}function Vs(e){return e*(180/F)}function po(e){if(!K(e))return;let t=1,i=0;for(;Math.round(e*t)/t!==e;)t*=10,i++;return i}function qn(e,t){const i=t.x-e.x,s=t.y-e.y,o=Math.sqrt(i*i+s*s);let n=Math.atan2(s,i);return n<-.5*F&&(n+=G),{angle:n,distance:o}}function ys(e,t){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}function Er(e,t){return(e-t+Pr)%G-F}function nt(e){return(e%G+G)%G}function ei(e,t,i,s){const o=nt(e),n=nt(t),a=nt(i),r=nt(n-o),l=nt(a-o),c=nt(o-n),d=nt(o-a);return o===n||o===a||s&&n===a||r>l&&c<d}function tt(e,t,i){return Math.max(t,Math.min(i,e))}function Lr(e){return tt(e,-32768,32767)}function Ft(e,t,i,s=1e-6){return e>=Math.min(t,i)-s&&e<=Math.max(t,i)+s}function Hs(e,t,i){i=i||(a=>e[a]<t);let s=e.length-1,o=0,n;for(;s-o>1;)n=o+s>>1,i(n)?o=n:s=n;return{lo:o,hi:s}}const Bt=(e,t,i,s)=>Hs(e,i,s?o=>{const n=e[o][t];return n<i||n===i&&e[o+1][t]===i}:o=>e[o][t]<i),Or=(e,t,i)=>Hs(e,i,s=>e[s][t]>=i);function Ir(e,t,i){let s=0,o=e.length;for(;s<o&&e[s]<t;)s++;for(;o>s&&e[o-1]>i;)o--;return s>0||o<e.length?e.slice(s,o):e}const Kn=["push","pop","shift","splice","unshift"];function jr(e,t){if(e._chartjs){e._chartjs.listeners.push(t);return}Object.defineProperty(e,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Kn.forEach(i=>{const s="_onData"+Bs(i),o=e[i];Object.defineProperty(e,i,{configurable:!0,enumerable:!1,value(...n){const a=o.apply(this,n);return e._chartjs.listeners.forEach(r=>{typeof r[s]=="function"&&r[s](...n)}),a}})})}function ho(e,t){const i=e._chartjs;if(!i)return;const s=i.listeners,o=s.indexOf(t);o!==-1&&s.splice(o,1),!(s.length>0)&&(Kn.forEach(n=>{delete e[n]}),delete e._chartjs)}function Jn(e){const t=new Set(e);return t.size===e.length?e:Array.from(t)}const Zn=function(){return typeof window>"u"?function(e){return e()}:window.requestAnimationFrame}();function Qn(e,t){let i=[],s=!1;return function(...o){i=o,s||(s=!0,Zn.call(window,()=>{s=!1,e.apply(t,i)}))}}function Fr(e,t){let i;return function(...s){return t?(clearTimeout(i),i=setTimeout(e,t,s)):e.apply(this,s),t}}const Ns=e=>e==="start"?"left":e==="end"?"right":"center",ot=(e,t,i)=>e==="start"?t:e==="end"?i:(t+i)/2,Br=(e,t,i,s)=>e===(s?"left":"right")?i:e==="center"?(t+i)/2:t;function ta(e,t,i){const s=t.length;let o=0,n=s;if(e._sorted){const{iScale:a,vScale:r,_parsed:l}=e,c=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null,d=a.axis,{min:p,max:h,minDefined:g,maxDefined:u}=a.getUserBounds();if(g){if(o=Math.min(Bt(l,d,p).lo,i?s:Bt(t,d,a.getPixelForValue(p)).lo),c){const f=l.slice(0,o+1).reverse().findIndex(b=>!T(b[r.axis]));o-=Math.max(0,f)}o=tt(o,0,s-1)}if(u){let f=Math.max(Bt(l,a.axis,h,!0).hi+1,i?0:Bt(t,d,a.getPixelForValue(h),!0).hi+1);if(c){const b=l.slice(f-1).findIndex(m=>!T(m[r.axis]));f+=Math.max(0,b)}n=tt(f,o,s)-o}else n=s-o}return{start:o,count:n}}function ea(e){const{xScale:t,yScale:i,_scaleRanges:s}=e,o={xmin:t.min,xmax:t.max,ymin:i.min,ymax:i.max};if(!s)return e._scaleRanges=o,!0;const n=s.xmin!==t.min||s.xmax!==t.max||s.ymin!==i.min||s.ymax!==i.max;return Object.assign(s,o),n}const gi=e=>e===0||e===1,go=(e,t,i)=>-(Math.pow(2,10*(e-=1))*Math.sin((e-t)*G/i)),uo=(e,t,i)=>Math.pow(2,-10*e)*Math.sin((e-t)*G/i)+1,qe={linear:e=>e,easeInQuad:e=>e*e,easeOutQuad:e=>-e*(e-2),easeInOutQuad:e=>(e/=.5)<1?.5*e*e:-.5*(--e*(e-2)-1),easeInCubic:e=>e*e*e,easeOutCubic:e=>(e-=1)*e*e+1,easeInOutCubic:e=>(e/=.5)<1?.5*e*e*e:.5*((e-=2)*e*e+2),easeInQuart:e=>e*e*e*e,easeOutQuart:e=>-((e-=1)*e*e*e-1),easeInOutQuart:e=>(e/=.5)<1?.5*e*e*e*e:-.5*((e-=2)*e*e*e-2),easeInQuint:e=>e*e*e*e*e,easeOutQuint:e=>(e-=1)*e*e*e*e+1,easeInOutQuint:e=>(e/=.5)<1?.5*e*e*e*e*e:.5*((e-=2)*e*e*e*e+2),easeInSine:e=>-Math.cos(e*Z)+1,easeOutSine:e=>Math.sin(e*Z),easeInOutSine:e=>-.5*(Math.cos(F*e)-1),easeInExpo:e=>e===0?0:Math.pow(2,10*(e-1)),easeOutExpo:e=>e===1?1:-Math.pow(2,-10*e)+1,easeInOutExpo:e=>gi(e)?e:e<.5?.5*Math.pow(2,10*(e*2-1)):.5*(-Math.pow(2,-10*(e*2-1))+2),easeInCirc:e=>e>=1?e:-(Math.sqrt(1-e*e)-1),easeOutCirc:e=>Math.sqrt(1-(e-=1)*e),easeInOutCirc:e=>(e/=.5)<1?-.5*(Math.sqrt(1-e*e)-1):.5*(Math.sqrt(1-(e-=2)*e)+1),easeInElastic:e=>gi(e)?e:go(e,.075,.3),easeOutElastic:e=>gi(e)?e:uo(e,.075,.3),easeInOutElastic(e){return gi(e)?e:e<.5?.5*go(e*2,.1125,.45):.5+.5*uo(e*2-1,.1125,.45)},easeInBack(e){return e*e*((1.70158+1)*e-1.70158)},easeOutBack(e){return(e-=1)*e*((1.70158+1)*e+1.70158)+1},easeInOutBack(e){let t=1.70158;return(e/=.5)<1?.5*(e*e*(((t*=1.525)+1)*e-t)):.5*((e-=2)*e*(((t*=1.525)+1)*e+t)+2)},easeInBounce:e=>1-qe.easeOutBounce(1-e),easeOutBounce(e){return e<1/2.75?7.5625*e*e:e<2/2.75?7.5625*(e-=1.5/2.75)*e+.75:e<2.5/2.75?7.5625*(e-=2.25/2.75)*e+.9375:7.5625*(e-=2.625/2.75)*e+.984375},easeInOutBounce:e=>e<.5?qe.easeInBounce(e*2)*.5:qe.easeOutBounce(e*2-1)*.5+.5};function Ws(e){if(e&&typeof e=="object"){const t=e.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function fo(e){return Ws(e)?e:new Ze(e)}function Qi(e){return Ws(e)?e:new Ze(e).saturate(.5).darken(.1).hexString()}const Vr=["x","y","borderWidth","radius","tension"],Hr=["color","borderColor","backgroundColor"];function Nr(e){e.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),e.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),e.set("animations",{colors:{type:"color",properties:Hr},numbers:{type:"number",properties:Vr}}),e.describe("animations",{_fallback:"animation"}),e.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function Wr(e){e.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const bo=new Map;function Gr(e,t){t=t||{};const i=e+JSON.stringify(t);let s=bo.get(i);return s||(s=new Intl.NumberFormat(e,t),bo.set(i,s)),s}function ri(e,t,i){return Gr(t,i).format(e)}const ia={values(e){return X(e)?e:""+e},numeric(e,t,i){if(e===0)return"0";const s=this.chart.options.locale;let o,n=e;if(i.length>1){const c=Math.max(Math.abs(i[0].value),Math.abs(i[i.length-1].value));(c<1e-4||c>1e15)&&(o="scientific"),n=Yr(e,i)}const a=Yt(Math.abs(n)),r=isNaN(a)?1:Math.max(Math.min(-1*Math.floor(a),20),0),l={notation:o,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(l,this.options.ticks.format),ri(e,s,l)},logarithmic(e,t,i){if(e===0)return"0";const s=i[t].significand||e/Math.pow(10,Math.floor(Yt(e)));return[1,2,3,5,10,15].includes(s)||t>.8*i.length?ia.numeric.call(this,e,t,i):""}};function Yr(e,t){let i=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(i)>=1&&e!==Math.floor(e)&&(i=e-Math.floor(e)),i}var Ni={formatters:ia};function Xr(e){e.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,i)=>i.lineWidth,tickColor:(t,i)=>i.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Ni.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),e.route("scale.ticks","color","","color"),e.route("scale.grid","color","","borderColor"),e.route("scale.border","color","","borderColor"),e.route("scale.title","color","","color"),e.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),e.describe("scales",{_fallback:"scale"}),e.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const me=Object.create(null),ws=Object.create(null);function Ke(e,t){if(!t)return e;const i=t.split(".");for(let s=0,o=i.length;s<o;++s){const n=i[s];e=e[n]||(e[n]=Object.create(null))}return e}function ts(e,t,i){return typeof t=="string"?Qe(Ke(e,t),i):Qe(Ke(e,""),t)}class Ur{constructor(t,i){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=s=>s.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(s,o)=>Qi(o.backgroundColor),this.hoverBorderColor=(s,o)=>Qi(o.borderColor),this.hoverColor=(s,o)=>Qi(o.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(i)}set(t,i){return ts(this,t,i)}get(t){return Ke(this,t)}describe(t,i){return ts(ws,t,i)}override(t,i){return ts(me,t,i)}route(t,i,s,o){const n=Ke(this,t),a=Ke(this,s),r="_"+i;Object.defineProperties(n,{[r]:{value:n[i],writable:!0},[i]:{enumerable:!0,get(){const l=this[r],c=a[o];return E(l)?Object.assign({},c,l):C(l,c)},set(l){this[r]=l}}})}apply(t){t.forEach(i=>i(this))}}var U=new Ur({_scriptable:e=>!e.startsWith("on"),_indexable:e=>e!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[Nr,Wr,Xr]);function qr(e){return!e||T(e.size)||T(e.family)?null:(e.style?e.style+" ":"")+(e.weight?e.weight+" ":"")+e.size+"px "+e.family}function Ii(e,t,i,s,o){let n=t[o];return n||(n=t[o]=e.measureText(o).width,i.push(o)),n>s&&(s=n),s}function Kr(e,t,i,s){s=s||{};let o=s.data=s.data||{},n=s.garbageCollect=s.garbageCollect||[];s.font!==t&&(o=s.data={},n=s.garbageCollect=[],s.font=t),e.save(),e.font=t;let a=0;const r=i.length;let l,c,d,p,h;for(l=0;l<r;l++)if(p=i[l],p!=null&&!X(p))a=Ii(e,o,n,a,p);else if(X(p))for(c=0,d=p.length;c<d;c++)h=p[c],h!=null&&!X(h)&&(a=Ii(e,o,n,a,h));e.restore();const g=n.length/2;if(g>i.length){for(l=0;l<g;l++)delete o[n[l]];n.splice(0,g)}return a}function re(e,t,i){const s=e.currentDevicePixelRatio,o=i!==0?Math.max(i/2,.5):0;return Math.round((t-o)*s)/s+o}function mo(e,t){!t&&!e||(t=t||e.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,e.width,e.height),t.restore())}function $s(e,t,i,s){sa(e,t,i,s,null)}function sa(e,t,i,s,o){let n,a,r,l,c,d,p,h;const g=t.pointStyle,u=t.rotation,f=t.radius;let b=(u||0)*Rr;if(g&&typeof g=="object"&&(n=g.toString(),n==="[object HTMLImageElement]"||n==="[object HTMLCanvasElement]")){e.save(),e.translate(i,s),e.rotate(b),e.drawImage(g,-g.width/2,-g.height/2,g.width,g.height),e.restore();return}if(!(isNaN(f)||f<=0)){switch(e.beginPath(),g){default:o?e.ellipse(i,s,o/2,f,0,0,G):e.arc(i,s,f,0,G),e.closePath();break;case"triangle":d=o?o/2:f,e.moveTo(i+Math.sin(b)*d,s-Math.cos(b)*f),b+=lo,e.lineTo(i+Math.sin(b)*d,s-Math.cos(b)*f),b+=lo,e.lineTo(i+Math.sin(b)*d,s-Math.cos(b)*f),e.closePath();break;case"rectRounded":c=f*.516,l=f-c,a=Math.cos(b+ae)*l,p=Math.cos(b+ae)*(o?o/2-c:l),r=Math.sin(b+ae)*l,h=Math.sin(b+ae)*(o?o/2-c:l),e.arc(i-p,s-r,c,b-F,b-Z),e.arc(i+h,s-a,c,b-Z,b),e.arc(i+p,s+r,c,b,b+Z),e.arc(i-h,s+a,c,b+Z,b+F),e.closePath();break;case"rect":if(!u){l=Math.SQRT1_2*f,d=o?o/2:l,e.rect(i-d,s-l,2*d,2*l);break}b+=ae;case"rectRot":p=Math.cos(b)*(o?o/2:f),a=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(o?o/2:f),e.moveTo(i-p,s-r),e.lineTo(i+h,s-a),e.lineTo(i+p,s+r),e.lineTo(i-h,s+a),e.closePath();break;case"crossRot":b+=ae;case"cross":p=Math.cos(b)*(o?o/2:f),a=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(o?o/2:f),e.moveTo(i-p,s-r),e.lineTo(i+p,s+r),e.moveTo(i+h,s-a),e.lineTo(i-h,s+a);break;case"star":p=Math.cos(b)*(o?o/2:f),a=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(o?o/2:f),e.moveTo(i-p,s-r),e.lineTo(i+p,s+r),e.moveTo(i+h,s-a),e.lineTo(i-h,s+a),b+=ae,p=Math.cos(b)*(o?o/2:f),a=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(o?o/2:f),e.moveTo(i-p,s-r),e.lineTo(i+p,s+r),e.moveTo(i+h,s-a),e.lineTo(i-h,s+a);break;case"line":a=o?o/2:Math.cos(b)*f,r=Math.sin(b)*f,e.moveTo(i-a,s-r),e.lineTo(i+a,s+r);break;case"dash":e.moveTo(i,s),e.lineTo(i+Math.cos(b)*(o?o/2:f),s+Math.sin(b)*f);break;case!1:e.closePath();break}e.fill(),t.borderWidth>0&&e.stroke()}}function Vt(e,t,i){return i=i||.5,!t||e&&e.x>t.left-i&&e.x<t.right+i&&e.y>t.top-i&&e.y<t.bottom+i}function Wi(e,t){e.save(),e.beginPath(),e.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),e.clip()}function Gi(e){e.restore()}function Jr(e,t,i,s,o){if(!t)return e.lineTo(i.x,i.y);if(o==="middle"){const n=(t.x+i.x)/2;e.lineTo(n,t.y),e.lineTo(n,i.y)}else o==="after"!=!!s?e.lineTo(t.x,i.y):e.lineTo(i.x,t.y);e.lineTo(i.x,i.y)}function Zr(e,t,i,s){if(!t)return e.lineTo(i.x,i.y);e.bezierCurveTo(s?t.cp1x:t.cp2x,s?t.cp1y:t.cp2y,s?i.cp2x:i.cp1x,s?i.cp2y:i.cp1y,i.x,i.y)}function Qr(e,t){t.translation&&e.translate(t.translation[0],t.translation[1]),T(t.rotation)||e.rotate(t.rotation),t.color&&(e.fillStyle=t.color),t.textAlign&&(e.textAlign=t.textAlign),t.textBaseline&&(e.textBaseline=t.textBaseline)}function tl(e,t,i,s,o){if(o.strikethrough||o.underline){const n=e.measureText(s),a=t-n.actualBoundingBoxLeft,r=t+n.actualBoundingBoxRight,l=i-n.actualBoundingBoxAscent,c=i+n.actualBoundingBoxDescent,d=o.strikethrough?(l+c)/2:c;e.strokeStyle=e.fillStyle,e.beginPath(),e.lineWidth=o.decorationWidth||2,e.moveTo(a,d),e.lineTo(r,d),e.stroke()}}function el(e,t){const i=e.fillStyle;e.fillStyle=t.color,e.fillRect(t.left,t.top,t.width,t.height),e.fillStyle=i}function xe(e,t,i,s,o,n={}){const a=X(t)?t:[t],r=n.strokeWidth>0&&n.strokeColor!=="";let l,c;for(e.save(),e.font=o.string,Qr(e,n),l=0;l<a.length;++l)c=a[l],n.backdrop&&el(e,n.backdrop),r&&(n.strokeColor&&(e.strokeStyle=n.strokeColor),T(n.strokeWidth)||(e.lineWidth=n.strokeWidth),e.strokeText(c,i,s,n.maxWidth)),e.fillText(c,i,s,n.maxWidth),tl(e,i,s,c,n),s+=Number(o.lineHeight);e.restore()}function ii(e,t){const{x:i,y:s,w:o,h:n,radius:a}=t;e.arc(i+a.topLeft,s+a.topLeft,a.topLeft,1.5*F,F,!0),e.lineTo(i,s+n-a.bottomLeft),e.arc(i+a.bottomLeft,s+n-a.bottomLeft,a.bottomLeft,F,Z,!0),e.lineTo(i+o-a.bottomRight,s+n),e.arc(i+o-a.bottomRight,s+n-a.bottomRight,a.bottomRight,Z,0,!0),e.lineTo(i+o,s+a.topRight),e.arc(i+o-a.topRight,s+a.topRight,a.topRight,0,-Z,!0),e.lineTo(i+a.topLeft,s)}const il=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,sl=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function ol(e,t){const i=(""+e).match(il);if(!i||i[1]==="normal")return t*1.2;switch(e=+i[2],i[3]){case"px":return e;case"%":e/=100;break}return t*e}const nl=e=>+e||0;function Gs(e,t){const i={},s=E(t),o=s?Object.keys(t):t,n=E(e)?s?a=>C(e[a],e[t[a]]):a=>e[a]:()=>e;for(const a of o)i[a]=nl(n(a));return i}function oa(e){return Gs(e,{top:"y",right:"x",bottom:"y",left:"x"})}function fe(e){return Gs(e,["topLeft","topRight","bottomLeft","bottomRight"])}function rt(e){const t=oa(e);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function Q(e,t){e=e||{},t=t||U.font;let i=C(e.size,t.size);typeof i=="string"&&(i=parseInt(i,10));let s=C(e.style,t.style);s&&!(""+s).match(sl)&&(console.warn('Invalid font style specified: "'+s+'"'),s=void 0);const o={family:C(e.family,t.family),lineHeight:ol(C(e.lineHeight,t.lineHeight),i),size:i,style:s,weight:C(e.weight,t.weight),string:""};return o.string=qr(o),o}function He(e,t,i,s){let o,n,a;for(o=0,n=e.length;o<n;++o)if(a=e[o],a!==void 0&&a!==void 0)return a}function al(e,t,i){const{min:s,max:o}=e,n=Yn(t,(o-s)/2),a=(r,l)=>i&&r===0?0:r+l;return{min:a(s,-Math.abs(n)),max:a(o,n)}}function ee(e,t){return Object.assign(Object.create(e),t)}function Ys(e,t=[""],i,s,o=()=>e[0]){const n=i||e;typeof s>"u"&&(s=la("_fallback",e));const a={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:e,_rootScopes:n,_fallback:s,_getTarget:o,override:r=>Ys([r,...e],t,n,s)};return new Proxy(a,{deleteProperty(r,l){return delete r[l],delete r._keys,delete e[0][l],!0},get(r,l){return aa(r,l,()=>ul(l,t,e,r))},getOwnPropertyDescriptor(r,l){return Reflect.getOwnPropertyDescriptor(r._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(e[0])},has(r,l){return vo(r).includes(l)},ownKeys(r){return vo(r)},set(r,l,c){const d=r._storage||(r._storage=o());return r[l]=d[l]=c,delete r._keys,!0}})}function Re(e,t,i,s){const o={_cacheable:!1,_proxy:e,_context:t,_subProxy:i,_stack:new Set,_descriptors:na(e,s),setContext:n=>Re(e,n,i,s),override:n=>Re(e.override(n),t,i,s)};return new Proxy(o,{deleteProperty(n,a){return delete n[a],delete e[a],!0},get(n,a,r){return aa(n,a,()=>ll(n,a,r))},getOwnPropertyDescriptor(n,a){return n._descriptors.allKeys?Reflect.has(e,a)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(e,a)},getPrototypeOf(){return Reflect.getPrototypeOf(e)},has(n,a){return Reflect.has(e,a)},ownKeys(){return Reflect.ownKeys(e)},set(n,a,r){return e[a]=r,delete n[a],!0}})}function na(e,t={scriptable:!0,indexable:!0}){const{_scriptable:i=t.scriptable,_indexable:s=t.indexable,_allKeys:o=t.allKeys}=e;return{allKeys:o,scriptable:i,indexable:s,isScriptable:te(i)?i:()=>i,isIndexable:te(s)?s:()=>s}}const rl=(e,t)=>e?e+Bs(t):t,Xs=(e,t)=>E(t)&&e!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function aa(e,t,i){if(Object.prototype.hasOwnProperty.call(e,t)||t==="constructor")return e[t];const s=i();return e[t]=s,s}function ll(e,t,i){const{_proxy:s,_context:o,_subProxy:n,_descriptors:a}=e;let r=s[t];return te(r)&&a.isScriptable(t)&&(r=cl(t,r,e,i)),X(r)&&r.length&&(r=dl(t,r,e,a.isIndexable)),Xs(t,r)&&(r=Re(r,o,n&&n[t],a)),r}function cl(e,t,i,s){const{_proxy:o,_context:n,_subProxy:a,_stack:r}=i;if(r.has(e))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+e);r.add(e);let l=t(n,a||s);return r.delete(e),Xs(e,l)&&(l=Us(o._scopes,o,e,l)),l}function dl(e,t,i,s){const{_proxy:o,_context:n,_subProxy:a,_descriptors:r}=i;if(typeof n.index<"u"&&s(e))return t[n.index%t.length];if(E(t[0])){const l=t,c=o._scopes.filter(d=>d!==l);t=[];for(const d of l){const p=Us(c,o,e,d);t.push(Re(p,n,a&&a[e],r))}}return t}function ra(e,t,i){return te(e)?e(t,i):e}const pl=(e,t)=>e===!0?t:typeof e=="string"?Qt(t,e):void 0;function hl(e,t,i,s,o){for(const n of t){const a=pl(i,n);if(a){e.add(a);const r=ra(a._fallback,i,o);if(typeof r<"u"&&r!==i&&r!==s)return r}else if(a===!1&&typeof s<"u"&&i!==s)return null}return!1}function Us(e,t,i,s){const o=t._rootScopes,n=ra(t._fallback,i,s),a=[...e,...o],r=new Set;r.add(s);let l=xo(r,a,i,n||i,s);return l===null||typeof n<"u"&&n!==i&&(l=xo(r,a,n,l,s),l===null)?!1:Ys(Array.from(r),[""],o,n,()=>gl(t,i,s))}function xo(e,t,i,s,o){for(;i;)i=hl(e,t,i,s,o);return i}function gl(e,t,i){const s=e._getTarget();t in s||(s[t]={});const o=s[t];return X(o)&&E(i)?i:o||{}}function ul(e,t,i,s){let o;for(const n of t)if(o=la(rl(n,e),i),typeof o<"u")return Xs(e,o)?Us(i,s,e,o):o}function la(e,t){for(const i of t){if(!i)continue;const s=i[e];if(typeof s<"u")return s}}function vo(e){let t=e._keys;return t||(t=e._keys=fl(e._scopes)),t}function fl(e){const t=new Set;for(const i of e)for(const s of Object.keys(i).filter(o=>!o.startsWith("_")))t.add(s);return Array.from(t)}function ca(e,t,i,s){const{iScale:o}=e,{key:n="r"}=this._parsing,a=new Array(s);let r,l,c,d;for(r=0,l=s;r<l;++r)c=r+i,d=t[c],a[r]={r:o.parse(Qt(d,n),c)};return a}const bl=Number.EPSILON||1e-14,Ae=(e,t)=>t<e.length&&!e[t].skip&&e[t],da=e=>e==="x"?"y":"x";function ml(e,t,i,s){const o=e.skip?t:e,n=t,a=i.skip?t:i,r=ys(n,o),l=ys(a,n);let c=r/(r+l),d=l/(r+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const p=s*c,h=s*d;return{previous:{x:n.x-p*(a.x-o.x),y:n.y-p*(a.y-o.y)},next:{x:n.x+h*(a.x-o.x),y:n.y+h*(a.y-o.y)}}}function xl(e,t,i){const s=e.length;let o,n,a,r,l,c=Ae(e,0);for(let d=0;d<s-1;++d)if(l=c,c=Ae(e,d+1),!(!l||!c)){if(Ue(t[d],0,bl)){i[d]=i[d+1]=0;continue}o=i[d]/t[d],n=i[d+1]/t[d],r=Math.pow(o,2)+Math.pow(n,2),!(r<=9)&&(a=3/Math.sqrt(r),i[d]=o*a*t[d],i[d+1]=n*a*t[d])}}function vl(e,t,i="x"){const s=da(i),o=e.length;let n,a,r,l=Ae(e,0);for(let c=0;c<o;++c){if(a=r,r=l,l=Ae(e,c+1),!r)continue;const d=r[i],p=r[s];a&&(n=(d-a[i])/3,r[`cp1${i}`]=d-n,r[`cp1${s}`]=p-n*t[c]),l&&(n=(l[i]-d)/3,r[`cp2${i}`]=d+n,r[`cp2${s}`]=p+n*t[c])}}function yl(e,t="x"){const i=da(t),s=e.length,o=Array(s).fill(0),n=Array(s);let a,r,l,c=Ae(e,0);for(a=0;a<s;++a)if(r=l,l=c,c=Ae(e,a+1),!!l){if(c){const d=c[t]-l[t];o[a]=d!==0?(c[i]-l[i])/d:0}n[a]=r?c?Dt(o[a-1])!==Dt(o[a])?0:(o[a-1]+o[a])/2:o[a-1]:o[a]}xl(e,o,n),vl(e,n,t)}function ui(e,t,i){return Math.max(Math.min(e,i),t)}function wl(e,t){let i,s,o,n,a,r=Vt(e[0],t);for(i=0,s=e.length;i<s;++i)a=n,n=r,r=i<s-1&&Vt(e[i+1],t),n&&(o=e[i],a&&(o.cp1x=ui(o.cp1x,t.left,t.right),o.cp1y=ui(o.cp1y,t.top,t.bottom)),r&&(o.cp2x=ui(o.cp2x,t.left,t.right),o.cp2y=ui(o.cp2y,t.top,t.bottom)))}function $l(e,t,i,s,o){let n,a,r,l;if(t.spanGaps&&(e=e.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")yl(e,o);else{let c=s?e[e.length-1]:e[0];for(n=0,a=e.length;n<a;++n)r=e[n],l=ml(c,r,e[Math.min(n+1,a-(s?0:1))%a],t.tension),r.cp1x=l.previous.x,r.cp1y=l.previous.y,r.cp2x=l.next.x,r.cp2y=l.next.y,c=r}t.capBezierPoints&&wl(e,i)}function qs(){return typeof window<"u"&&typeof document<"u"}function Ks(e){let t=e.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function ji(e,t,i){let s;return typeof e=="string"?(s=parseInt(e,10),e.indexOf("%")!==-1&&(s=s/100*t.parentNode[i])):s=e,s}const Yi=e=>e.ownerDocument.defaultView.getComputedStyle(e,null);function _l(e,t){return Yi(e).getPropertyValue(t)}const kl=["top","right","bottom","left"];function be(e,t,i){const s={};i=i?"-"+i:"";for(let o=0;o<4;o++){const n=kl[o];s[n]=parseFloat(e[t+"-"+n+i])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const Ml=(e,t,i)=>(e>0||t>0)&&(!i||!i.shadowRoot);function zl(e,t){const i=e.touches,s=i&&i.length?i[0]:e,{offsetX:o,offsetY:n}=s;let a=!1,r,l;if(Ml(o,n,e.target))r=o,l=n;else{const c=t.getBoundingClientRect();r=s.clientX-c.left,l=s.clientY-c.top,a=!0}return{x:r,y:l,box:a}}function de(e,t){if("native"in e)return e;const{canvas:i,currentDevicePixelRatio:s}=t,o=Yi(i),n=o.boxSizing==="border-box",a=be(o,"padding"),r=be(o,"border","width"),{x:l,y:c,box:d}=zl(e,i),p=a.left+(d&&r.left),h=a.top+(d&&r.top);let{width:g,height:u}=t;return n&&(g-=a.width+r.width,u-=a.height+r.height),{x:Math.round((l-p)/g*i.width/s),y:Math.round((c-h)/u*i.height/s)}}function Sl(e,t,i){let s,o;if(t===void 0||i===void 0){const n=e&&Ks(e);if(!n)t=e.clientWidth,i=e.clientHeight;else{const a=n.getBoundingClientRect(),r=Yi(n),l=be(r,"border","width"),c=be(r,"padding");t=a.width-c.width-l.width,i=a.height-c.height-l.height,s=ji(r.maxWidth,n,"clientWidth"),o=ji(r.maxHeight,n,"clientHeight")}}return{width:t,height:i,maxWidth:s||Oi,maxHeight:o||Oi}}const Xt=e=>Math.round(e*10)/10;function Cl(e,t,i,s){const o=Yi(e),n=be(o,"margin"),a=ji(o.maxWidth,e,"clientWidth")||Oi,r=ji(o.maxHeight,e,"clientHeight")||Oi,l=Sl(e,t,i);let{width:c,height:d}=l;if(o.boxSizing==="content-box"){const h=be(o,"border","width"),g=be(o,"padding");c-=g.width+h.width,d-=g.height+h.height}return c=Math.max(0,c-n.width),d=Math.max(0,s?c/s:d-n.height),c=Xt(Math.min(c,a,l.maxWidth)),d=Xt(Math.min(d,r,l.maxHeight)),c&&!d&&(d=Xt(c/2)),(t!==void 0||i!==void 0)&&s&&l.height&&d>l.height&&(d=l.height,c=Xt(Math.floor(d*s))),{width:c,height:d}}function yo(e,t,i){const s=t||1,o=Xt(e.height*s),n=Xt(e.width*s);e.height=Xt(e.height),e.width=Xt(e.width);const a=e.canvas;return a.style&&(i||!a.style.height&&!a.style.width)&&(a.style.height=`${e.height}px`,a.style.width=`${e.width}px`),e.currentDevicePixelRatio!==s||a.height!==o||a.width!==n?(e.currentDevicePixelRatio=s,a.height=o,a.width=n,e.ctx.setTransform(s,0,0,s,0,0),!0):!1}const Pl=function(){let e=!1;try{const t={get passive(){return e=!0,!1}};qs()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return e}();function wo(e,t){const i=_l(e,t),s=i&&i.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function pe(e,t,i,s){return{x:e.x+i*(t.x-e.x),y:e.y+i*(t.y-e.y)}}function Rl(e,t,i,s){return{x:e.x+i*(t.x-e.x),y:s==="middle"?i<.5?e.y:t.y:s==="after"?i<1?e.y:t.y:i>0?t.y:e.y}}function Al(e,t,i,s){const o={x:e.cp2x,y:e.cp2y},n={x:t.cp1x,y:t.cp1y},a=pe(e,o,i),r=pe(o,n,i),l=pe(n,t,i),c=pe(a,r,i),d=pe(r,l,i);return pe(c,d,i)}const Dl=function(e,t){return{x(i){return e+e+t-i},setWidth(i){t=i},textAlign(i){return i==="center"?i:i==="right"?"left":"right"},xPlus(i,s){return i-s},leftForLtr(i,s){return i-s}}},Tl=function(){return{x(e){return e},setWidth(e){},textAlign(e){return e},xPlus(e,t){return e+t},leftForLtr(e,t){return e}}};function Se(e,t,i){return e?Dl(t,i):Tl()}function pa(e,t){let i,s;(t==="ltr"||t==="rtl")&&(i=e.canvas.style,s=[i.getPropertyValue("direction"),i.getPropertyPriority("direction")],i.setProperty("direction",t,"important"),e.prevTextDirection=s)}function ha(e,t){t!==void 0&&(delete e.prevTextDirection,e.canvas.style.setProperty("direction",t[0],t[1]))}function ga(e){return e==="angle"?{between:ei,compare:Er,normalize:nt}:{between:Ft,compare:(t,i)=>t-i,normalize:t=>t}}function $o({start:e,end:t,count:i,loop:s,style:o}){return{start:e%i,end:t%i,loop:s&&(t-e+1)%i===0,style:o}}function El(e,t,i){const{property:s,start:o,end:n}=i,{between:a,normalize:r}=ga(s),l=t.length;let{start:c,end:d,loop:p}=e,h,g;if(p){for(c+=l,d+=l,h=0,g=l;h<g&&a(r(t[c%l][s]),o,n);++h)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:p,style:e.style}}function ua(e,t,i){if(!i)return[e];const{property:s,start:o,end:n}=i,a=t.length,{compare:r,between:l,normalize:c}=ga(s),{start:d,end:p,loop:h,style:g}=El(e,t,i),u=[];let f=!1,b=null,m,x,w;const y=()=>l(o,w,m)&&r(o,w)!==0,v=()=>r(n,m)===0||l(n,w,m),k=()=>f||y(),_=()=>!f||v();for(let M=d,z=d;M<=p;++M)x=t[M%a],!x.skip&&(m=c(x[s]),m!==w&&(f=l(m,o,n),b===null&&k()&&(b=r(m,o)===0?M:z),b!==null&&_()&&(u.push($o({start:b,end:M,loop:h,count:a,style:g})),b=null),z=M,w=m));return b!==null&&u.push($o({start:b,end:p,loop:h,count:a,style:g})),u}function fa(e,t){const i=[],s=e.segments;for(let o=0;o<s.length;o++){const n=ua(s[o],e.points,t);n.length&&i.push(...n)}return i}function Ll(e,t,i,s){let o=0,n=t-1;if(i&&!s)for(;o<t&&!e[o].skip;)o++;for(;o<t&&e[o].skip;)o++;for(o%=t,i&&(n+=o);n>o&&e[n%t].skip;)n--;return n%=t,{start:o,end:n}}function Ol(e,t,i,s){const o=e.length,n=[];let a=t,r=e[t],l;for(l=t+1;l<=i;++l){const c=e[l%o];c.skip||c.stop?r.skip||(s=!1,n.push({start:t%o,end:(l-1)%o,loop:s}),t=a=c.stop?l:null):(a=l,r.skip&&(t=l)),r=c}return a!==null&&n.push({start:t%o,end:a%o,loop:s}),n}function Il(e,t){const i=e.points,s=e.options.spanGaps,o=i.length;if(!o)return[];const n=!!e._loop,{start:a,end:r}=Ll(i,o,n,s);if(s===!0)return _o(e,[{start:a,end:r,loop:n}],i,t);const l=r<a?r+o:r,c=!!e._fullLoop&&a===0&&r===o-1;return _o(e,Ol(i,a,l,c),i,t)}function _o(e,t,i,s){return!s||!s.setContext||!i?t:jl(e,t,i,s)}function jl(e,t,i,s){const o=e._chart.getContext(),n=ko(e.options),{_datasetIndex:a,options:{spanGaps:r}}=e,l=i.length,c=[];let d=n,p=t[0].start,h=p;function g(u,f,b,m){const x=r?-1:1;if(u!==f){for(u+=l;i[u%l].skip;)u-=x;for(;i[f%l].skip;)f+=x;u%l!==f%l&&(c.push({start:u%l,end:f%l,loop:b,style:m}),d=m,p=f%l)}}for(const u of t){p=r?p:u.start;let f=i[p%l],b;for(h=p+1;h<=u.end;h++){const m=i[h%l];b=ko(s.setContext(ee(o,{type:"segment",p0:f,p1:m,p0DataIndex:(h-1)%l,p1DataIndex:h%l,datasetIndex:a}))),Fl(b,d)&&g(p,h-1,u.loop,d),f=m,d=b}p<h-1&&g(p,h-1,u.loop,d)}return c}function ko(e){return{backgroundColor:e.backgroundColor,borderCapStyle:e.borderCapStyle,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderJoinStyle:e.borderJoinStyle,borderWidth:e.borderWidth,borderColor:e.borderColor}}function Fl(e,t){if(!t)return!1;const i=[],s=function(o,n){return Ws(n)?(i.includes(n)||i.push(n),i.indexOf(n)):n};return JSON.stringify(e,s)!==JSON.stringify(t,s)}function fi(e,t,i){return e.options.clip?e[i]:t[i]}function Bl(e,t){const{xScale:i,yScale:s}=e;return i&&s?{left:fi(i,t,"left"),right:fi(i,t,"right"),top:fi(s,t,"top"),bottom:fi(s,t,"bottom")}:t}function ba(e,t){const i=t._clip;if(i.disabled)return!1;const s=Bl(t,e.chartArea);return{left:i.left===!1?0:s.left-(i.left===!0?0:i.left),right:i.right===!1?e.width:s.right+(i.right===!0?0:i.right),top:i.top===!1?0:s.top-(i.top===!0?0:i.top),bottom:i.bottom===!1?e.height:s.bottom+(i.bottom===!0?0:i.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class Vl{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,i,s,o){const n=i.listeners[o],a=i.duration;n.forEach(r=>r({chart:t,initial:i.initial,numSteps:a,currentStep:Math.min(s-i.start,a)}))}_refresh(){this._request||(this._running=!0,this._request=Zn.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let i=0;this._charts.forEach((s,o)=>{if(!s.running||!s.items.length)return;const n=s.items;let a=n.length-1,r=!1,l;for(;a>=0;--a)l=n[a],l._active?(l._total>s.duration&&(s.duration=l._total),l.tick(t),r=!0):(n[a]=n[n.length-1],n.pop());r&&(o.draw(),this._notify(o,s,t,"progress")),n.length||(s.running=!1,this._notify(o,s,t,"complete"),s.initial=!1),i+=n.length}),this._lastDate=t,i===0&&(this._running=!1)}_getAnims(t){const i=this._charts;let s=i.get(t);return s||(s={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},i.set(t,s)),s}listen(t,i,s){this._getAnims(t).listeners[i].push(s)}add(t,i){!i||!i.length||this._getAnims(t).items.push(...i)}has(t){return this._getAnims(t).items.length>0}start(t){const i=this._charts.get(t);i&&(i.running=!0,i.start=Date.now(),i.duration=i.items.reduce((s,o)=>Math.max(s,o._duration),0),this._refresh())}running(t){if(!this._running)return!1;const i=this._charts.get(t);return!(!i||!i.running||!i.items.length)}stop(t){const i=this._charts.get(t);if(!i||!i.items.length)return;const s=i.items;let o=s.length-1;for(;o>=0;--o)s[o].cancel();i.items=[],this._notify(t,i,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Et=new Vl;const Mo="transparent",Hl={boolean(e,t,i){return i>.5?t:e},color(e,t,i){const s=fo(e||Mo),o=s.valid&&fo(t||Mo);return o&&o.valid?o.mix(s,i).hexString():t},number(e,t,i){return e+(t-e)*i}};class Nl{constructor(t,i,s,o){const n=i[s];o=He([t.to,o,n,t.from]);const a=He([t.from,n,o]);this._active=!0,this._fn=t.fn||Hl[t.type||typeof a],this._easing=qe[t.easing]||qe.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=i,this._prop=s,this._from=a,this._to=o,this._promises=void 0}active(){return this._active}update(t,i,s){if(this._active){this._notify(!1);const o=this._target[this._prop],n=s-this._start,a=this._duration-n;this._start=s,this._duration=Math.floor(Math.max(a,t.duration)),this._total+=n,this._loop=!!t.loop,this._to=He([t.to,i,o,t.from]),this._from=He([t.from,o,i])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const i=t-this._start,s=this._duration,o=this._prop,n=this._from,a=this._loop,r=this._to;let l;if(this._active=n!==r&&(a||i<s),!this._active){this._target[o]=r,this._notify(!0);return}if(i<0){this._target[o]=n;return}l=i/s%2,l=a&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[o]=this._fn(n,r,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((i,s)=>{t.push({res:i,rej:s})})}_notify(t){const i=t?"res":"rej",s=this._promises||[];for(let o=0;o<s.length;o++)s[o][i]()}}class ma{constructor(t,i){this._chart=t,this._properties=new Map,this.configure(i)}configure(t){if(!E(t))return;const i=Object.keys(U.animation),s=this._properties;Object.getOwnPropertyNames(t).forEach(o=>{const n=t[o];if(!E(n))return;const a={};for(const r of i)a[r]=n[r];(X(n.properties)&&n.properties||[o]).forEach(r=>{(r===o||!s.has(r))&&s.set(r,a)})})}_animateOptions(t,i){const s=i.options,o=Gl(t,s);if(!o)return[];const n=this._createAnimations(o,s);return s.$shared&&Wl(t.options.$animations,s).then(()=>{t.options=s},()=>{}),n}_createAnimations(t,i){const s=this._properties,o=[],n=t.$animations||(t.$animations={}),a=Object.keys(i),r=Date.now();let l;for(l=a.length-1;l>=0;--l){const c=a[l];if(c.charAt(0)==="$")continue;if(c==="options"){o.push(...this._animateOptions(t,i));continue}const d=i[c];let p=n[c];const h=s.get(c);if(p)if(h&&p.active()){p.update(h,d,r);continue}else p.cancel();if(!h||!h.duration){t[c]=d;continue}n[c]=p=new Nl(h,t,c,d),o.push(p)}return o}update(t,i){if(this._properties.size===0){Object.assign(t,i);return}const s=this._createAnimations(t,i);if(s.length)return Et.add(this._chart,s),!0}}function Wl(e,t){const i=[],s=Object.keys(t);for(let o=0;o<s.length;o++){const n=e[s[o]];n&&n.active()&&i.push(n.wait())}return Promise.all(i)}function Gl(e,t){if(!t)return;let i=e.options;if(!i){e.options=t;return}return i.$shared&&(e.options=i=Object.assign({},i,{$shared:!1,$animations:{}})),i}function zo(e,t){const i=e&&e.options||{},s=i.reverse,o=i.min===void 0?t:0,n=i.max===void 0?t:0;return{start:s?n:o,end:s?o:n}}function Yl(e,t,i){if(i===!1)return!1;const s=zo(e,i),o=zo(t,i);return{top:o.end,right:s.end,bottom:o.start,left:s.start}}function Xl(e){let t,i,s,o;return E(e)?(t=e.top,i=e.right,s=e.bottom,o=e.left):t=i=s=o=e,{top:t,right:i,bottom:s,left:o,disabled:e===!1}}function xa(e,t){const i=[],s=e._getSortedDatasetMetas(t);let o,n;for(o=0,n=s.length;o<n;++o)i.push(s[o].index);return i}function So(e,t,i,s={}){const o=e.keys,n=s.mode==="single";let a,r,l,c;if(t===null)return;let d=!1;for(a=0,r=o.length;a<r;++a){if(l=+o[a],l===i){if(d=!0,s.all)continue;break}c=e.values[l],K(c)&&(n||t===0||Dt(t)===Dt(c))&&(t+=c)}return!d&&!s.all?0:t}function Ul(e,t){const{iScale:i,vScale:s}=t,o=i.axis==="x"?"x":"y",n=s.axis==="x"?"x":"y",a=Object.keys(e),r=new Array(a.length);let l,c,d;for(l=0,c=a.length;l<c;++l)d=a[l],r[l]={[o]:d,[n]:e[d]};return r}function es(e,t){const i=e&&e.options.stacked;return i||i===void 0&&t.stack!==void 0}function ql(e,t,i){return`${e.id}.${t.id}.${i.stack||i.type}`}function Kl(e){const{min:t,max:i,minDefined:s,maxDefined:o}=e.getUserBounds();return{min:s?t:Number.NEGATIVE_INFINITY,max:o?i:Number.POSITIVE_INFINITY}}function Jl(e,t,i){const s=e[t]||(e[t]={});return s[i]||(s[i]={})}function Co(e,t,i,s){for(const o of t.getMatchingVisibleMetas(s).reverse()){const n=e[o.index];if(i&&n>0||!i&&n<0)return o.index}return null}function Po(e,t){const{chart:i,_cachedMeta:s}=e,o=i._stacks||(i._stacks={}),{iScale:n,vScale:a,index:r}=s,l=n.axis,c=a.axis,d=ql(n,a,s),p=t.length;let h;for(let g=0;g<p;++g){const u=t[g],{[l]:f,[c]:b}=u,m=u._stacks||(u._stacks={});h=m[c]=Jl(o,d,f),h[r]=b,h._top=Co(h,a,!0,s.type),h._bottom=Co(h,a,!1,s.type);const x=h._visualValues||(h._visualValues={});x[r]=b}}function is(e,t){const i=e.scales;return Object.keys(i).filter(s=>i[s].axis===t).shift()}function Zl(e,t){return ee(e,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Ql(e,t,i){return ee(e,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:i,index:t,mode:"default",type:"data"})}function Ee(e,t){const i=e.controller.index,s=e.vScale&&e.vScale.axis;if(s){t=t||e._parsed;for(const o of t){const n=o._stacks;if(!n||n[s]===void 0||n[s][i]===void 0)return;delete n[s][i],n[s]._visualValues!==void 0&&n[s]._visualValues[i]!==void 0&&delete n[s]._visualValues[i]}}}const ss=e=>e==="reset"||e==="none",Ro=(e,t)=>t?e:Object.assign({},e),tc=(e,t,i)=>e&&!t.hidden&&t._stacked&&{keys:xa(i,!0),values:null};class zt{constructor(t,i){this.chart=t,this._ctx=t.ctx,this.index=i,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=es(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&Ee(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,i=this._cachedMeta,s=this.getDataset(),o=(p,h,g,u)=>p==="x"?h:p==="r"?u:g,n=i.xAxisID=C(s.xAxisID,is(t,"x")),a=i.yAxisID=C(s.yAxisID,is(t,"y")),r=i.rAxisID=C(s.rAxisID,is(t,"r")),l=i.indexAxis,c=i.iAxisID=o(l,n,a,r),d=i.vAxisID=o(l,a,n,r);i.xScale=this.getScaleForId(n),i.yScale=this.getScaleForId(a),i.rScale=this.getScaleForId(r),i.iScale=this.getScaleForId(c),i.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const i=this._cachedMeta;return t===i.iScale?i.vScale:i.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&ho(this._data,this),t._stacked&&Ee(t)}_dataCheck(){const t=this.getDataset(),i=t.data||(t.data=[]),s=this._data;if(E(i)){const o=this._cachedMeta;this._data=Ul(i,o)}else if(s!==i){if(s){ho(s,this);const o=this._cachedMeta;Ee(o),o._parsed=[]}i&&Object.isExtensible(i)&&jr(i,this),this._syncList=[],this._data=i}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const i=this._cachedMeta,s=this.getDataset();let o=!1;this._dataCheck();const n=i._stacked;i._stacked=es(i.vScale,i),i.stack!==s.stack&&(o=!0,Ee(i),i.stack=s.stack),this._resyncElements(t),(o||n!==i._stacked)&&(Po(this,i._parsed),i._stacked=es(i.vScale,i))}configure(){const t=this.chart.config,i=t.datasetScopeKeys(this._type),s=t.getOptionScopes(this.getDataset(),i,!0);this.options=t.createResolver(s,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,i){const{_cachedMeta:s,_data:o}=this,{iScale:n,_stacked:a}=s,r=n.axis;let l=t===0&&i===o.length?!0:s._sorted,c=t>0&&s._parsed[t-1],d,p,h;if(this._parsing===!1)s._parsed=o,s._sorted=!0,h=o;else{X(o[t])?h=this.parseArrayData(s,o,t,i):E(o[t])?h=this.parseObjectData(s,o,t,i):h=this.parsePrimitiveData(s,o,t,i);const g=()=>p[r]===null||c&&p[r]<c[r];for(d=0;d<i;++d)s._parsed[d+t]=p=h[d],l&&(g()&&(l=!1),c=p);s._sorted=l}a&&Po(this,h)}parsePrimitiveData(t,i,s,o){const{iScale:n,vScale:a}=t,r=n.axis,l=a.axis,c=n.getLabels(),d=n===a,p=new Array(o);let h,g,u;for(h=0,g=o;h<g;++h)u=h+s,p[h]={[r]:d||n.parse(c[u],u),[l]:a.parse(i[u],u)};return p}parseArrayData(t,i,s,o){const{xScale:n,yScale:a}=t,r=new Array(o);let l,c,d,p;for(l=0,c=o;l<c;++l)d=l+s,p=i[d],r[l]={x:n.parse(p[0],d),y:a.parse(p[1],d)};return r}parseObjectData(t,i,s,o){const{xScale:n,yScale:a}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=new Array(o);let d,p,h,g;for(d=0,p=o;d<p;++d)h=d+s,g=i[h],c[d]={x:n.parse(Qt(g,r),h),y:a.parse(Qt(g,l),h)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,i,s){const o=this.chart,n=this._cachedMeta,a=i[t.axis],r={keys:xa(o,!0),values:i._stacks[t.axis]._visualValues};return So(r,a,n.index,{mode:s})}updateRangeFromParsed(t,i,s,o){const n=s[i.axis];let a=n===null?NaN:n;const r=o&&s._stacks[i.axis];o&&r&&(o.values=r,a=So(o,n,this._cachedMeta.index)),t.min=Math.min(t.min,a),t.max=Math.max(t.max,a)}getMinMax(t,i){const s=this._cachedMeta,o=s._parsed,n=s._sorted&&t===s.iScale,a=o.length,r=this._getOtherScale(t),l=tc(i,s,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:p}=Kl(r);let h,g;function u(){g=o[h];const f=g[r.axis];return!K(g[t.axis])||d>f||p<f}for(h=0;h<a&&!(!u()&&(this.updateRangeFromParsed(c,t,g,l),n));++h);if(n){for(h=a-1;h>=0;--h)if(!u()){this.updateRangeFromParsed(c,t,g,l);break}}return c}getAllParsedValues(t){const i=this._cachedMeta._parsed,s=[];let o,n,a;for(o=0,n=i.length;o<n;++o)a=i[o][t.axis],K(a)&&s.push(a);return s}getMaxOverflow(){return!1}getLabelAndValue(t){const i=this._cachedMeta,s=i.iScale,o=i.vScale,n=this.getParsed(t);return{label:s?""+s.getLabelForValue(n[s.axis]):"",value:o?""+o.getLabelForValue(n[o.axis]):""}}_update(t){const i=this._cachedMeta;this.update(t||"default"),i._clip=Xl(C(this.options.clip,Yl(i.xScale,i.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,i=this.chart,s=this._cachedMeta,o=s.data||[],n=i.chartArea,a=[],r=this._drawStart||0,l=this._drawCount||o.length-r,c=this.options.drawActiveElementsOnTop;let d;for(s.dataset&&s.dataset.draw(t,n,r,l),d=r;d<r+l;++d){const p=o[d];p.hidden||(p.active&&c?a.push(p):p.draw(t,n))}for(d=0;d<a.length;++d)a[d].draw(t,n)}getStyle(t,i){const s=i?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(s):this.resolveDataElementOptions(t||0,s)}getContext(t,i,s){const o=this.getDataset();let n;if(t>=0&&t<this._cachedMeta.data.length){const a=this._cachedMeta.data[t];n=a.$context||(a.$context=Ql(this.getContext(),t,a)),n.parsed=this.getParsed(t),n.raw=o.data[t],n.index=n.dataIndex=t}else n=this.$context||(this.$context=Zl(this.chart.getContext(),this.index)),n.dataset=o,n.index=n.datasetIndex=this.index;return n.active=!!i,n.mode=s,n}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,i){return this._resolveElementOptions(this.dataElementType.id,i,t)}_resolveElementOptions(t,i="default",s){const o=i==="active",n=this._cachedDataOpts,a=t+"-"+i,r=n[a],l=this.enableOptionSharing&&ti(s);if(r)return Ro(r,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),p=o?[`${t}Hover`,"hover",t,""]:[t,""],h=c.getOptionScopes(this.getDataset(),d),g=Object.keys(U.elements[t]),u=()=>this.getContext(s,o,i),f=c.resolveNamedOptions(h,g,u,p);return f.$shared&&(f.$shared=l,n[a]=Object.freeze(Ro(f,l))),f}_resolveAnimations(t,i,s){const o=this.chart,n=this._cachedDataOpts,a=`animation-${i}`,r=n[a];if(r)return r;let l;if(o.options.animation!==!1){const d=this.chart.config,p=d.datasetAnimationScopeKeys(this._type,i),h=d.getOptionScopes(this.getDataset(),p);l=d.createResolver(h,this.getContext(t,s,i))}const c=new ma(o,l&&l.animations);return l&&l._cacheable&&(n[a]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,i){return!i||ss(t)||this.chart._animationsDisabled}_getSharedOptions(t,i){const s=this.resolveDataElementOptions(t,i),o=this._sharedOptions,n=this.getSharedOptions(s),a=this.includeOptions(i,n)||n!==o;return this.updateSharedOptions(n,i,s),{sharedOptions:n,includeOptions:a}}updateElement(t,i,s,o){ss(o)?Object.assign(t,s):this._resolveAnimations(i,o).update(t,s)}updateSharedOptions(t,i,s){t&&!ss(i)&&this._resolveAnimations(void 0,i).update(t,s)}_setStyle(t,i,s,o){t.active=o;const n=this.getStyle(i,o);this._resolveAnimations(i,s,o).update(t,{options:!o&&this.getSharedOptions(n)||n})}removeHoverStyle(t,i,s){this._setStyle(t,s,"active",!1)}setHoverStyle(t,i,s){this._setStyle(t,s,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const i=this._data,s=this._cachedMeta.data;for(const[r,l,c]of this._syncList)this[r](l,c);this._syncList=[];const o=s.length,n=i.length,a=Math.min(n,o);a&&this.parse(0,a),n>o?this._insertElements(o,n-o,t):n<o&&this._removeElements(n,o-n)}_insertElements(t,i,s=!0){const o=this._cachedMeta,n=o.data,a=t+i;let r;const l=c=>{for(c.length+=i,r=c.length-1;r>=a;r--)c[r]=c[r-i]};for(l(n),r=t;r<a;++r)n[r]=new this.dataElementType;this._parsing&&l(o._parsed),this.parse(t,i),s&&this.updateElements(n,t,i,"reset")}updateElements(t,i,s,o){}_removeElements(t,i){const s=this._cachedMeta;if(this._parsing){const o=s._parsed.splice(t,i);s._stacked&&Ee(s,o)}s.data.splice(t,i)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[i,s,o]=t;this[i](s,o)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,i){i&&this._sync(["_removeElements",t,i]);const s=arguments.length-2;s&&this._sync(["_insertElements",t,s])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}$(zt,"defaults",{}),$(zt,"datasetElementType",null),$(zt,"dataElementType",null);function ec(e,t){if(!e._cache.$bar){const i=e.getMatchingVisibleMetas(t);let s=[];for(let o=0,n=i.length;o<n;o++)s=s.concat(i[o].controller.getAllParsedValues(e));e._cache.$bar=Jn(s.sort((o,n)=>o-n))}return e._cache.$bar}function ic(e){const t=e.iScale,i=ec(t,e.type);let s=t._length,o,n,a,r;const l=()=>{a===32767||a===-32768||(ti(r)&&(s=Math.min(s,Math.abs(a-r)||s)),r=a)};for(o=0,n=i.length;o<n;++o)a=t.getPixelForValue(i[o]),l();for(r=void 0,o=0,n=t.ticks.length;o<n;++o)a=t.getPixelForTick(o),l();return s}function sc(e,t,i,s){const o=i.barThickness;let n,a;return T(o)?(n=t.min*i.categoryPercentage,a=i.barPercentage):(n=o*s,a=1),{chunk:n/s,ratio:a,start:t.pixels[e]-n/2}}function oc(e,t,i,s){const o=t.pixels,n=o[e];let a=e>0?o[e-1]:null,r=e<o.length-1?o[e+1]:null;const l=i.categoryPercentage;a===null&&(a=n-(r===null?t.end-t.start:r-n)),r===null&&(r=n+n-a);const c=n-(n-Math.min(a,r))/2*l;return{chunk:Math.abs(r-a)/2*l/s,ratio:i.barPercentage,start:c}}function nc(e,t,i,s){const o=i.parse(e[0],s),n=i.parse(e[1],s),a=Math.min(o,n),r=Math.max(o,n);let l=a,c=r;Math.abs(a)>Math.abs(r)&&(l=r,c=a),t[i.axis]=c,t._custom={barStart:l,barEnd:c,start:o,end:n,min:a,max:r}}function va(e,t,i,s){return X(e)?nc(e,t,i,s):t[i.axis]=i.parse(e,s),t}function Ao(e,t,i,s){const o=e.iScale,n=e.vScale,a=o.getLabels(),r=o===n,l=[];let c,d,p,h;for(c=i,d=i+s;c<d;++c)h=t[c],p={},p[o.axis]=r||o.parse(a[c],c),l.push(va(h,p,n,c));return l}function os(e){return e&&e.barStart!==void 0&&e.barEnd!==void 0}function ac(e,t,i){return e!==0?Dt(e):(t.isHorizontal()?1:-1)*(t.min>=i?1:-1)}function rc(e){let t,i,s,o,n;return e.horizontal?(t=e.base>e.x,i="left",s="right"):(t=e.base<e.y,i="bottom",s="top"),t?(o="end",n="start"):(o="start",n="end"),{start:i,end:s,reverse:t,top:o,bottom:n}}function lc(e,t,i,s){let o=t.borderSkipped;const n={};if(!o){e.borderSkipped=n;return}if(o===!0){e.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:a,end:r,reverse:l,top:c,bottom:d}=rc(e);o==="middle"&&i&&(e.enableBorderRadius=!0,(i._top||0)===s?o=c:(i._bottom||0)===s?o=d:(n[Do(d,a,r,l)]=!0,o=c)),n[Do(o,a,r,l)]=!0,e.borderSkipped=n}function Do(e,t,i,s){return s?(e=cc(e,t,i),e=To(e,i,t)):e=To(e,t,i),e}function cc(e,t,i){return e===t?i:e===i?t:e}function To(e,t,i){return e==="start"?t:e==="end"?i:e}function dc(e,{inflateAmount:t},i){e.inflateAmount=t==="auto"?i===1?.33:0:t}class ki extends zt{parsePrimitiveData(t,i,s,o){return Ao(t,i,s,o)}parseArrayData(t,i,s,o){return Ao(t,i,s,o)}parseObjectData(t,i,s,o){const{iScale:n,vScale:a}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=n.axis==="x"?r:l,d=a.axis==="x"?r:l,p=[];let h,g,u,f;for(h=s,g=s+o;h<g;++h)f=i[h],u={},u[n.axis]=n.parse(Qt(f,c),h),p.push(va(Qt(f,d),u,a,h));return p}updateRangeFromParsed(t,i,s,o){super.updateRangeFromParsed(t,i,s,o);const n=s._custom;n&&i===this._cachedMeta.vScale&&(t.min=Math.min(t.min,n.min),t.max=Math.max(t.max,n.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const i=this._cachedMeta,{iScale:s,vScale:o}=i,n=this.getParsed(t),a=n._custom,r=os(a)?"["+a.start+", "+a.end+"]":""+o.getLabelForValue(n[o.axis]);return{label:""+s.getLabelForValue(n[s.axis]),value:r}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const i=this._cachedMeta;this.updateElements(i.data,0,i.data.length,t)}updateElements(t,i,s,o){const n=o==="reset",{index:a,_cachedMeta:{vScale:r}}=this,l=r.getBasePixel(),c=r.isHorizontal(),d=this._getRuler(),{sharedOptions:p,includeOptions:h}=this._getSharedOptions(i,o);for(let g=i;g<i+s;g++){const u=this.getParsed(g),f=n||T(u[r.axis])?{base:l,head:l}:this._calculateBarValuePixels(g),b=this._calculateBarIndexPixels(g,d),m=(u._stacks||{})[r.axis],x={horizontal:c,base:f.base,enableBorderRadius:!m||os(u._custom)||a===m._top||a===m._bottom,x:c?f.head:b.center,y:c?b.center:f.head,height:c?b.size:Math.abs(f.size),width:c?Math.abs(f.size):b.size};h&&(x.options=p||this.resolveDataElementOptions(g,t[g].active?"active":o));const w=x.options||t[g].options;lc(x,w,m,a),dc(x,w,d.ratio),this.updateElement(t[g],g,x,o)}}_getStacks(t,i){const{iScale:s}=this._cachedMeta,o=s.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),n=s.options.stacked,a=[],r=this._cachedMeta.controller.getParsed(i),l=r&&r[s.axis],c=d=>{const p=d._parsed.find(g=>g[s.axis]===l),h=p&&p[d.vScale.axis];if(T(h)||isNaN(h))return!0};for(const d of o)if(!(i!==void 0&&c(d))&&((n===!1||a.indexOf(d.stack)===-1||n===void 0&&d.stack===void 0)&&a.push(d.stack),d.index===t))break;return a.length||a.push(void 0),a}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,i=this.chart.options.indexAxis;return Object.keys(t).filter(s=>t[s].axis===i).shift()}_getAxis(){const t={},i=this.getFirstScaleIdForIndexAxis();for(const s of this.chart.data.datasets)t[C(this.chart.options.indexAxis==="x"?s.xAxisID:s.yAxisID,i)]=!0;return Object.keys(t)}_getStackIndex(t,i,s){const o=this._getStacks(t,s),n=i!==void 0?o.indexOf(i):-1;return n===-1?o.length-1:n}_getRuler(){const t=this.options,i=this._cachedMeta,s=i.iScale,o=[];let n,a;for(n=0,a=i.data.length;n<a;++n)o.push(s.getPixelForValue(this.getParsed(n)[s.axis],n));const r=t.barThickness;return{min:r||ic(i),pixels:o,start:s._startPixel,end:s._endPixel,stackCount:this._getStackCount(),scale:s,grouped:t.grouped,ratio:r?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:i,_stacked:s,index:o},options:{base:n,minBarLength:a}}=this,r=n||0,l=this.getParsed(t),c=l._custom,d=os(c);let p=l[i.axis],h=0,g=s?this.applyStack(i,l,s):p,u,f;g!==p&&(h=g-p,g=p),d&&(p=c.barStart,g=c.barEnd-c.barStart,p!==0&&Dt(p)!==Dt(c.barEnd)&&(h=0),h+=p);const b=!T(n)&&!d?n:h;let m=i.getPixelForValue(b);if(this.chart.getDataVisibility(t)?u=i.getPixelForValue(h+g):u=m,f=u-m,Math.abs(f)<a){f=ac(f,i,r)*a,p===r&&(m-=f/2);const x=i.getPixelForDecimal(0),w=i.getPixelForDecimal(1),y=Math.min(x,w),v=Math.max(x,w);m=Math.max(Math.min(m,v),y),u=m+f,s&&!d&&(l._stacks[i.axis]._visualValues[o]=i.getValueForPixel(u)-i.getValueForPixel(m))}if(m===i.getPixelForValue(r)){const x=Dt(f)*i.getLineWidthForValue(r)/2;m+=x,f-=x}return{size:f,base:m,head:u,center:u+f/2}}_calculateBarIndexPixels(t,i){const s=i.scale,o=this.options,n=o.skipNull,a=C(o.maxBarThickness,1/0);let r,l;const c=this._getAxisCount();if(i.grouped){const d=n?this._getStackCount(t):i.stackCount,p=o.barThickness==="flex"?oc(t,i,o,d*c):sc(t,i,o,d*c),h=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,g=this._getAxis().indexOf(C(h,this.getFirstScaleIdForIndexAxis())),u=this._getStackIndex(this.index,this._cachedMeta.stack,n?t:void 0)+g;r=p.start+p.chunk*u+p.chunk/2,l=Math.min(a,p.chunk*p.ratio)}else r=s.getPixelForValue(this.getParsed(t)[s.axis],t),l=Math.min(a,i.min*i.ratio);return{base:r-l/2,head:r+l/2,center:r,size:l}}draw(){const t=this._cachedMeta,i=t.vScale,s=t.data,o=s.length;let n=0;for(;n<o;++n)this.getParsed(n)[i.axis]!==null&&!s[n].hidden&&s[n].draw(this._ctx)}}$(ki,"id","bar"),$(ki,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),$(ki,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class Mi extends zt{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,i,s,o){const n=super.parsePrimitiveData(t,i,s,o);for(let a=0;a<n.length;a++)n[a]._custom=this.resolveDataElementOptions(a+s).radius;return n}parseArrayData(t,i,s,o){const n=super.parseArrayData(t,i,s,o);for(let a=0;a<n.length;a++){const r=i[s+a];n[a]._custom=C(r[2],this.resolveDataElementOptions(a+s).radius)}return n}parseObjectData(t,i,s,o){const n=super.parseObjectData(t,i,s,o);for(let a=0;a<n.length;a++){const r=i[s+a];n[a]._custom=C(r&&r.r&&+r.r,this.resolveDataElementOptions(a+s).radius)}return n}getMaxOverflow(){const t=this._cachedMeta.data;let i=0;for(let s=t.length-1;s>=0;--s)i=Math.max(i,t[s].size(this.resolveDataElementOptions(s))/2);return i>0&&i}getLabelAndValue(t){const i=this._cachedMeta,s=this.chart.data.labels||[],{xScale:o,yScale:n}=i,a=this.getParsed(t),r=o.getLabelForValue(a.x),l=n.getLabelForValue(a.y),c=a._custom;return{label:s[t]||"",value:"("+r+", "+l+(c?", "+c:"")+")"}}update(t){const i=this._cachedMeta.data;this.updateElements(i,0,i.length,t)}updateElements(t,i,s,o){const n=o==="reset",{iScale:a,vScale:r}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(i,o),d=a.axis,p=r.axis;for(let h=i;h<i+s;h++){const g=t[h],u=!n&&this.getParsed(h),f={},b=f[d]=n?a.getPixelForDecimal(.5):a.getPixelForValue(u[d]),m=f[p]=n?r.getBasePixel():r.getPixelForValue(u[p]);f.skip=isNaN(b)||isNaN(m),c&&(f.options=l||this.resolveDataElementOptions(h,g.active?"active":o),n&&(f.options.radius=0)),this.updateElement(g,h,f,o)}}resolveDataElementOptions(t,i){const s=this.getParsed(t);let o=super.resolveDataElementOptions(t,i);o.$shared&&(o=Object.assign({},o,{$shared:!1}));const n=o.radius;return i!=="active"&&(o.radius=0),o.radius+=C(s&&s._custom,n),o}}$(Mi,"id","bubble"),$(Mi,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),$(Mi,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function pc(e,t,i){let s=1,o=1,n=0,a=0;if(t<G){const r=e,l=r+t,c=Math.cos(r),d=Math.sin(r),p=Math.cos(l),h=Math.sin(l),g=(w,y,v)=>ei(w,r,l,!0)?1:Math.max(y,y*i,v,v*i),u=(w,y,v)=>ei(w,r,l,!0)?-1:Math.min(y,y*i,v,v*i),f=g(0,c,p),b=g(Z,d,h),m=u(F,c,p),x=u(F+Z,d,h);s=(f-m)/2,o=(b-x)/2,n=-(f+m)/2,a=-(b+x)/2}return{ratioX:s,ratioY:o,offsetX:n,offsetY:a}}class he extends zt{constructor(t,i){super(t,i),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,i){const s=this.getDataset().data,o=this._cachedMeta;if(this._parsing===!1)o._parsed=s;else{let n=l=>+s[l];if(E(s[t])){const{key:l="value"}=this._parsing;n=c=>+Qt(s[c],l)}let a,r;for(a=t,r=t+i;a<r;++a)o._parsed[a]=n(a)}}_getRotation(){return Mt(this.options.rotation-90)}_getCircumference(){return Mt(this.options.circumference)}_getRotationExtents(){let t=G,i=-G;for(let s=0;s<this.chart.data.datasets.length;++s)if(this.chart.isDatasetVisible(s)&&this.chart.getDatasetMeta(s).type===this._type){const o=this.chart.getDatasetMeta(s).controller,n=o._getRotation(),a=o._getCircumference();t=Math.min(t,n),i=Math.max(i,n+a)}return{rotation:t,circumference:i-t}}update(t){const i=this.chart,{chartArea:s}=i,o=this._cachedMeta,n=o.data,a=this.getMaxBorderWidth()+this.getMaxOffset(n)+this.options.spacing,r=Math.max((Math.min(s.width,s.height)-a)/2,0),l=Math.min(_r(this.options.cutout,r),1),c=this._getRingWeight(this.index),{circumference:d,rotation:p}=this._getRotationExtents(),{ratioX:h,ratioY:g,offsetX:u,offsetY:f}=pc(p,d,l),b=(s.width-a)/h,m=(s.height-a)/g,x=Math.max(Math.min(b,m)/2,0),w=Yn(this.options.radius,x),y=Math.max(w*l,0),v=(w-y)/this._getVisibleDatasetWeightTotal();this.offsetX=u*w,this.offsetY=f*w,o.total=this.calculateTotal(),this.outerRadius=w-v*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-v*c,0),this.updateElements(n,0,n.length,t)}_circumference(t,i){const s=this.options,o=this._cachedMeta,n=this._getCircumference();return i&&s.animation.animateRotate||!this.chart.getDataVisibility(t)||o._parsed[t]===null||o.data[t].hidden?0:this.calculateCircumference(o._parsed[t]*n/G)}updateElements(t,i,s,o){const n=o==="reset",a=this.chart,r=a.chartArea,c=a.options.animation,d=(r.left+r.right)/2,p=(r.top+r.bottom)/2,h=n&&c.animateScale,g=h?0:this.innerRadius,u=h?0:this.outerRadius,{sharedOptions:f,includeOptions:b}=this._getSharedOptions(i,o);let m=this._getRotation(),x;for(x=0;x<i;++x)m+=this._circumference(x,n);for(x=i;x<i+s;++x){const w=this._circumference(x,n),y=t[x],v={x:d+this.offsetX,y:p+this.offsetY,startAngle:m,endAngle:m+w,circumference:w,outerRadius:u,innerRadius:g};b&&(v.options=f||this.resolveDataElementOptions(x,y.active?"active":o)),m+=w,this.updateElement(y,x,v,o)}}calculateTotal(){const t=this._cachedMeta,i=t.data;let s=0,o;for(o=0;o<i.length;o++){const n=t._parsed[o];n!==null&&!isNaN(n)&&this.chart.getDataVisibility(o)&&!i[o].hidden&&(s+=Math.abs(n))}return s}calculateCircumference(t){const i=this._cachedMeta.total;return i>0&&!isNaN(t)?G*(Math.abs(t)/i):0}getLabelAndValue(t){const i=this._cachedMeta,s=this.chart,o=s.data.labels||[],n=ri(i._parsed[t],s.options.locale);return{label:o[t]||"",value:n}}getMaxBorderWidth(t){let i=0;const s=this.chart;let o,n,a,r,l;if(!t){for(o=0,n=s.data.datasets.length;o<n;++o)if(s.isDatasetVisible(o)){a=s.getDatasetMeta(o),t=a.data,r=a.controller;break}}if(!t)return 0;for(o=0,n=t.length;o<n;++o)l=r.resolveDataElementOptions(o),l.borderAlign!=="inner"&&(i=Math.max(i,l.borderWidth||0,l.hoverBorderWidth||0));return i}getMaxOffset(t){let i=0;for(let s=0,o=t.length;s<o;++s){const n=this.resolveDataElementOptions(s);i=Math.max(i,n.offset||0,n.hoverOffset||0)}return i}_getRingWeightOffset(t){let i=0;for(let s=0;s<t;++s)this.chart.isDatasetVisible(s)&&(i+=this._getRingWeight(s));return i}_getRingWeight(t){return Math.max(C(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}$(he,"id","doughnut"),$(he,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),$(he,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),$(he,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const i=t.data,{labels:{pointStyle:s,textAlign:o,color:n,useBorderRadius:a,borderRadius:r}}=t.legend.options;return i.labels.length&&i.datasets.length?i.labels.map((l,c)=>{const p=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:p.backgroundColor,fontColor:n,hidden:!t.getDataVisibility(c),lineDash:p.borderDash,lineDashOffset:p.borderDashOffset,lineJoin:p.borderJoinStyle,lineWidth:p.borderWidth,strokeStyle:p.borderColor,textAlign:o,pointStyle:s,borderRadius:a&&(r||p.borderRadius),index:c}}):[]}},onClick(t,i,s){s.chart.toggleDataVisibility(i.index),s.chart.update()}}}});class zi extends zt{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const i=this._cachedMeta,{dataset:s,data:o=[],_dataset:n}=i,a=this.chart._animationsDisabled;let{start:r,count:l}=ta(i,o,a);this._drawStart=r,this._drawCount=l,ea(i)&&(r=0,l=o.length),s._chart=this.chart,s._datasetIndex=this.index,s._decimated=!!n._decimated,s.points=o;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(s,void 0,{animated:!a,options:c},t),this.updateElements(o,r,l,t)}updateElements(t,i,s,o){const n=o==="reset",{iScale:a,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:p}=this._getSharedOptions(i,o),h=a.axis,g=r.axis,{spanGaps:u,segment:f}=this.options,b=Pe(u)?u:Number.POSITIVE_INFINITY,m=this.chart._animationsDisabled||n||o==="none",x=i+s,w=t.length;let y=i>0&&this.getParsed(i-1);for(let v=0;v<w;++v){const k=t[v],_=m?k:{};if(v<i||v>=x){_.skip=!0;continue}const M=this.getParsed(v),z=T(M[g]),P=_[h]=a.getPixelForValue(M[h],v),A=_[g]=n||z?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,M,l):M[g],v);_.skip=isNaN(P)||isNaN(A)||z,_.stop=v>0&&Math.abs(M[h]-y[h])>b,f&&(_.parsed=M,_.raw=c.data[v]),p&&(_.options=d||this.resolveDataElementOptions(v,k.active?"active":o)),m||this.updateElement(k,v,_,o),y=M}}getMaxOverflow(){const t=this._cachedMeta,i=t.dataset,s=i.options&&i.options.borderWidth||0,o=t.data||[];if(!o.length)return s;const n=o[0].size(this.resolveDataElementOptions(0)),a=o[o.length-1].size(this.resolveDataElementOptions(o.length-1));return Math.max(s,n,a)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}$(zi,"id","line"),$(zi,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),$(zi,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class Je extends zt{constructor(t,i){super(t,i),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const i=this._cachedMeta,s=this.chart,o=s.data.labels||[],n=ri(i._parsed[t].r,s.options.locale);return{label:o[t]||"",value:n}}parseObjectData(t,i,s,o){return ca.bind(this)(t,i,s,o)}update(t){const i=this._cachedMeta.data;this._updateRadius(),this.updateElements(i,0,i.length,t)}getMinMax(){const t=this._cachedMeta,i={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((s,o)=>{const n=this.getParsed(o).r;!isNaN(n)&&this.chart.getDataVisibility(o)&&(n<i.min&&(i.min=n),n>i.max&&(i.max=n))}),i}_updateRadius(){const t=this.chart,i=t.chartArea,s=t.options,o=Math.min(i.right-i.left,i.bottom-i.top),n=Math.max(o/2,0),a=Math.max(s.cutoutPercentage?n/100*s.cutoutPercentage:1,0),r=(n-a)/t.getVisibleDatasetCount();this.outerRadius=n-r*this.index,this.innerRadius=this.outerRadius-r}updateElements(t,i,s,o){const n=o==="reset",a=this.chart,l=a.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,p=c.yCenter,h=c.getIndexAngle(0)-.5*F;let g=h,u;const f=360/this.countVisibleElements();for(u=0;u<i;++u)g+=this._computeAngle(u,o,f);for(u=i;u<i+s;u++){const b=t[u];let m=g,x=g+this._computeAngle(u,o,f),w=a.getDataVisibility(u)?c.getDistanceFromCenterForValue(this.getParsed(u).r):0;g=x,n&&(l.animateScale&&(w=0),l.animateRotate&&(m=x=h));const y={x:d,y:p,innerRadius:0,outerRadius:w,startAngle:m,endAngle:x,options:this.resolveDataElementOptions(u,b.active?"active":o)};this.updateElement(b,u,y,o)}}countVisibleElements(){const t=this._cachedMeta;let i=0;return t.data.forEach((s,o)=>{!isNaN(this.getParsed(o).r)&&this.chart.getDataVisibility(o)&&i++}),i}_computeAngle(t,i,s){return this.chart.getDataVisibility(t)?Mt(this.resolveDataElementOptions(t,i).angle||s):0}}$(Je,"id","polarArea"),$(Je,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),$(Je,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const i=t.data;if(i.labels.length&&i.datasets.length){const{labels:{pointStyle:s,color:o}}=t.legend.options;return i.labels.map((n,a)=>{const l=t.getDatasetMeta(0).controller.getStyle(a);return{text:n,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:o,lineWidth:l.borderWidth,pointStyle:s,hidden:!t.getDataVisibility(a),index:a}})}return[]}},onClick(t,i,s){s.chart.toggleDataVisibility(i.index),s.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class _s extends he{}$(_s,"id","pie"),$(_s,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class Si extends zt{getLabelAndValue(t){const i=this._cachedMeta.vScale,s=this.getParsed(t);return{label:i.getLabels()[t],value:""+i.getLabelForValue(s[i.axis])}}parseObjectData(t,i,s,o){return ca.bind(this)(t,i,s,o)}update(t){const i=this._cachedMeta,s=i.dataset,o=i.data||[],n=i.iScale.getLabels();if(s.points=o,t!=="resize"){const a=this.resolveDatasetElementOptions(t);this.options.showLine||(a.borderWidth=0);const r={_loop:!0,_fullLoop:n.length===o.length,options:a};this.updateElement(s,void 0,r,t)}this.updateElements(o,0,o.length,t)}updateElements(t,i,s,o){const n=this._cachedMeta.rScale,a=o==="reset";for(let r=i;r<i+s;r++){const l=t[r],c=this.resolveDataElementOptions(r,l.active?"active":o),d=n.getPointPositionForValue(r,this.getParsed(r).r),p=a?n.xCenter:d.x,h=a?n.yCenter:d.y,g={x:p,y:h,angle:d.angle,skip:isNaN(p)||isNaN(h),options:c};this.updateElement(l,r,g,o)}}}$(Si,"id","radar"),$(Si,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),$(Si,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class Ci extends zt{getLabelAndValue(t){const i=this._cachedMeta,s=this.chart.data.labels||[],{xScale:o,yScale:n}=i,a=this.getParsed(t),r=o.getLabelForValue(a.x),l=n.getLabelForValue(a.y);return{label:s[t]||"",value:"("+r+", "+l+")"}}update(t){const i=this._cachedMeta,{data:s=[]}=i,o=this.chart._animationsDisabled;let{start:n,count:a}=ta(i,s,o);if(this._drawStart=n,this._drawCount=a,ea(i)&&(n=0,a=s.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:r,_dataset:l}=i;r._chart=this.chart,r._datasetIndex=this.index,r._decimated=!!l._decimated,r.points=s;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(r,void 0,{animated:!o,options:c},t)}else this.datasetElementType&&(delete i.dataset,this.datasetElementType=!1);this.updateElements(s,n,a,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,i,s,o){const n=o==="reset",{iScale:a,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(i,o),p=this.getSharedOptions(d),h=this.includeOptions(o,p),g=a.axis,u=r.axis,{spanGaps:f,segment:b}=this.options,m=Pe(f)?f:Number.POSITIVE_INFINITY,x=this.chart._animationsDisabled||n||o==="none";let w=i>0&&this.getParsed(i-1);for(let y=i;y<i+s;++y){const v=t[y],k=this.getParsed(y),_=x?v:{},M=T(k[u]),z=_[g]=a.getPixelForValue(k[g],y),P=_[u]=n||M?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,k,l):k[u],y);_.skip=isNaN(z)||isNaN(P)||M,_.stop=y>0&&Math.abs(k[g]-w[g])>m,b&&(_.parsed=k,_.raw=c.data[y]),h&&(_.options=p||this.resolveDataElementOptions(y,v.active?"active":o)),x||this.updateElement(v,y,_,o),w=k}this.updateSharedOptions(p,o,d)}getMaxOverflow(){const t=this._cachedMeta,i=t.data||[];if(!this.options.showLine){let r=0;for(let l=i.length-1;l>=0;--l)r=Math.max(r,i[l].size(this.resolveDataElementOptions(l))/2);return r>0&&r}const s=t.dataset,o=s.options&&s.options.borderWidth||0;if(!i.length)return o;const n=i[0].size(this.resolveDataElementOptions(0)),a=i[i.length-1].size(this.resolveDataElementOptions(i.length-1));return Math.max(o,n,a)/2}}$(Ci,"id","scatter"),$(Ci,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),$(Ci,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var hc=Object.freeze({__proto__:null,BarController:ki,BubbleController:Mi,DoughnutController:he,LineController:zi,PieController:_s,PolarAreaController:Je,RadarController:Si,ScatterController:Ci});function le(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Js{constructor(t){$(this,"options");this.options=t||{}}static override(t){Object.assign(Js.prototype,t)}init(){}formats(){return le()}parse(){return le()}format(){return le()}add(){return le()}diff(){return le()}startOf(){return le()}endOf(){return le()}}var gc={_date:Js};function uc(e,t,i,s){const{controller:o,data:n,_sorted:a}=e,r=o._cachedMeta.iScale,l=e.dataset&&e.dataset.options?e.dataset.options.spanGaps:null;if(r&&t===r.axis&&t!=="r"&&a&&n.length){const c=r._reversePixels?Or:Bt;if(s){if(o._sharedOptions){const d=n[0],p=typeof d.getRange=="function"&&d.getRange(t);if(p){const h=c(n,t,i-p),g=c(n,t,i+p);return{lo:h.lo,hi:g.hi}}}}else{const d=c(n,t,i);if(l){const{vScale:p}=o._cachedMeta,{_parsed:h}=e,g=h.slice(0,d.lo+1).reverse().findIndex(f=>!T(f[p.axis]));d.lo-=Math.max(0,g);const u=h.slice(d.hi).findIndex(f=>!T(f[p.axis]));d.hi+=Math.max(0,u)}return d}}return{lo:0,hi:n.length-1}}function Xi(e,t,i,s,o){const n=e.getSortedVisibleDatasetMetas(),a=i[t];for(let r=0,l=n.length;r<l;++r){const{index:c,data:d}=n[r],{lo:p,hi:h}=uc(n[r],t,a,o);for(let g=p;g<=h;++g){const u=d[g];u.skip||s(u,c,g)}}}function fc(e){const t=e.indexOf("x")!==-1,i=e.indexOf("y")!==-1;return function(s,o){const n=t?Math.abs(s.x-o.x):0,a=i?Math.abs(s.y-o.y):0;return Math.sqrt(Math.pow(n,2)+Math.pow(a,2))}}function ns(e,t,i,s,o){const n=[];return!o&&!e.isPointInArea(t)||Xi(e,i,t,function(r,l,c){!o&&!Vt(r,e.chartArea,0)||r.inRange(t.x,t.y,s)&&n.push({element:r,datasetIndex:l,index:c})},!0),n}function bc(e,t,i,s){let o=[];function n(a,r,l){const{startAngle:c,endAngle:d}=a.getProps(["startAngle","endAngle"],s),{angle:p}=qn(a,{x:t.x,y:t.y});ei(p,c,d)&&o.push({element:a,datasetIndex:r,index:l})}return Xi(e,i,t,n),o}function mc(e,t,i,s,o,n){let a=[];const r=fc(i);let l=Number.POSITIVE_INFINITY;function c(d,p,h){const g=d.inRange(t.x,t.y,o);if(s&&!g)return;const u=d.getCenterPoint(o);if(!(!!n||e.isPointInArea(u))&&!g)return;const b=r(t,u);b<l?(a=[{element:d,datasetIndex:p,index:h}],l=b):b===l&&a.push({element:d,datasetIndex:p,index:h})}return Xi(e,i,t,c),a}function as(e,t,i,s,o,n){return!n&&!e.isPointInArea(t)?[]:i==="r"&&!s?bc(e,t,i,o):mc(e,t,i,s,o,n)}function Eo(e,t,i,s,o){const n=[],a=i==="x"?"inXRange":"inYRange";let r=!1;return Xi(e,i,t,(l,c,d)=>{l[a]&&l[a](t[i],o)&&(n.push({element:l,datasetIndex:c,index:d}),r=r||l.inRange(t.x,t.y,o))}),s&&!r?[]:n}var xc={modes:{index(e,t,i,s){const o=de(t,e),n=i.axis||"x",a=i.includeInvisible||!1,r=i.intersect?ns(e,o,n,s,a):as(e,o,n,!1,s,a),l=[];return r.length?(e.getSortedVisibleDatasetMetas().forEach(c=>{const d=r[0].index,p=c.data[d];p&&!p.skip&&l.push({element:p,datasetIndex:c.index,index:d})}),l):[]},dataset(e,t,i,s){const o=de(t,e),n=i.axis||"xy",a=i.includeInvisible||!1;let r=i.intersect?ns(e,o,n,s,a):as(e,o,n,!1,s,a);if(r.length>0){const l=r[0].datasetIndex,c=e.getDatasetMeta(l).data;r=[];for(let d=0;d<c.length;++d)r.push({element:c[d],datasetIndex:l,index:d})}return r},point(e,t,i,s){const o=de(t,e),n=i.axis||"xy",a=i.includeInvisible||!1;return ns(e,o,n,s,a)},nearest(e,t,i,s){const o=de(t,e),n=i.axis||"xy",a=i.includeInvisible||!1;return as(e,o,n,i.intersect,s,a)},x(e,t,i,s){const o=de(t,e);return Eo(e,o,"x",i.intersect,s)},y(e,t,i,s){const o=de(t,e);return Eo(e,o,"y",i.intersect,s)}}};const ya=["left","top","right","bottom"];function Le(e,t){return e.filter(i=>i.pos===t)}function Lo(e,t){return e.filter(i=>ya.indexOf(i.pos)===-1&&i.box.axis===t)}function Oe(e,t){return e.sort((i,s)=>{const o=t?s:i,n=t?i:s;return o.weight===n.weight?o.index-n.index:o.weight-n.weight})}function vc(e){const t=[];let i,s,o,n,a,r;for(i=0,s=(e||[]).length;i<s;++i)o=e[i],{position:n,options:{stack:a,stackWeight:r=1}}=o,t.push({index:i,box:o,pos:n,horizontal:o.isHorizontal(),weight:o.weight,stack:a&&n+a,stackWeight:r});return t}function yc(e){const t={};for(const i of e){const{stack:s,pos:o,stackWeight:n}=i;if(!s||!ya.includes(o))continue;const a=t[s]||(t[s]={count:0,placed:0,weight:0,size:0});a.count++,a.weight+=n}return t}function wc(e,t){const i=yc(e),{vBoxMaxWidth:s,hBoxMaxHeight:o}=t;let n,a,r;for(n=0,a=e.length;n<a;++n){r=e[n];const{fullSize:l}=r.box,c=i[r.stack],d=c&&r.stackWeight/c.weight;r.horizontal?(r.width=d?d*s:l&&t.availableWidth,r.height=o):(r.width=s,r.height=d?d*o:l&&t.availableHeight)}return i}function $c(e){const t=vc(e),i=Oe(t.filter(c=>c.box.fullSize),!0),s=Oe(Le(t,"left"),!0),o=Oe(Le(t,"right")),n=Oe(Le(t,"top"),!0),a=Oe(Le(t,"bottom")),r=Lo(t,"x"),l=Lo(t,"y");return{fullSize:i,leftAndTop:s.concat(n),rightAndBottom:o.concat(l).concat(a).concat(r),chartArea:Le(t,"chartArea"),vertical:s.concat(o).concat(l),horizontal:n.concat(a).concat(r)}}function Oo(e,t,i,s){return Math.max(e[i],t[i])+Math.max(e[s],t[s])}function wa(e,t){e.top=Math.max(e.top,t.top),e.left=Math.max(e.left,t.left),e.bottom=Math.max(e.bottom,t.bottom),e.right=Math.max(e.right,t.right)}function _c(e,t,i,s){const{pos:o,box:n}=i,a=e.maxPadding;if(!E(o)){i.size&&(e[o]-=i.size);const p=s[i.stack]||{size:0,count:1};p.size=Math.max(p.size,i.horizontal?n.height:n.width),i.size=p.size/p.count,e[o]+=i.size}n.getPadding&&wa(a,n.getPadding());const r=Math.max(0,t.outerWidth-Oo(a,e,"left","right")),l=Math.max(0,t.outerHeight-Oo(a,e,"top","bottom")),c=r!==e.w,d=l!==e.h;return e.w=r,e.h=l,i.horizontal?{same:c,other:d}:{same:d,other:c}}function kc(e){const t=e.maxPadding;function i(s){const o=Math.max(t[s]-e[s],0);return e[s]+=o,o}e.y+=i("top"),e.x+=i("left"),i("right"),i("bottom")}function Mc(e,t){const i=t.maxPadding;function s(o){const n={left:0,top:0,right:0,bottom:0};return o.forEach(a=>{n[a]=Math.max(t[a],i[a])}),n}return s(e?["left","right"]:["top","bottom"])}function Ne(e,t,i,s){const o=[];let n,a,r,l,c,d;for(n=0,a=e.length,c=0;n<a;++n){r=e[n],l=r.box,l.update(r.width||t.w,r.height||t.h,Mc(r.horizontal,t));const{same:p,other:h}=_c(t,i,r,s);c|=p&&o.length,d=d||h,l.fullSize||o.push(r)}return c&&Ne(o,t,i,s)||d}function bi(e,t,i,s,o){e.top=i,e.left=t,e.right=t+s,e.bottom=i+o,e.width=s,e.height=o}function Io(e,t,i,s){const o=i.padding;let{x:n,y:a}=t;for(const r of e){const l=r.box,c=s[r.stack]||{placed:0,weight:1},d=r.stackWeight/c.weight||1;if(r.horizontal){const p=t.w*d,h=c.size||l.height;ti(c.start)&&(a=c.start),l.fullSize?bi(l,o.left,a,i.outerWidth-o.right-o.left,h):bi(l,t.left+c.placed,a,p,h),c.start=a,c.placed+=p,a=l.bottom}else{const p=t.h*d,h=c.size||l.width;ti(c.start)&&(n=c.start),l.fullSize?bi(l,n,o.top,h,i.outerHeight-o.bottom-o.top):bi(l,n,t.top+c.placed,h,p),c.start=n,c.placed+=p,n=l.right}}t.x=n,t.y=a}var at={addBox(e,t){e.boxes||(e.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(i){t.draw(i)}}]},e.boxes.push(t)},removeBox(e,t){const i=e.boxes?e.boxes.indexOf(t):-1;i!==-1&&e.boxes.splice(i,1)},configure(e,t,i){t.fullSize=i.fullSize,t.position=i.position,t.weight=i.weight},update(e,t,i,s){if(!e)return;const o=rt(e.options.layout.padding),n=Math.max(t-o.width,0),a=Math.max(i-o.height,0),r=$c(e.boxes),l=r.vertical,c=r.horizontal;V(e.boxes,f=>{typeof f.beforeLayout=="function"&&f.beforeLayout()});const d=l.reduce((f,b)=>b.box.options&&b.box.options.display===!1?f:f+1,0)||1,p=Object.freeze({outerWidth:t,outerHeight:i,padding:o,availableWidth:n,availableHeight:a,vBoxMaxWidth:n/2/d,hBoxMaxHeight:a/2}),h=Object.assign({},o);wa(h,rt(s));const g=Object.assign({maxPadding:h,w:n,h:a,x:o.left,y:o.top},o),u=wc(l.concat(c),p);Ne(r.fullSize,g,p,u),Ne(l,g,p,u),Ne(c,g,p,u)&&Ne(l,g,p,u),kc(g),Io(r.leftAndTop,g,p,u),g.x+=g.w,g.y+=g.h,Io(r.rightAndBottom,g,p,u),e.chartArea={left:g.left,top:g.top,right:g.left+g.w,bottom:g.top+g.h,height:g.h,width:g.w},V(r.chartArea,f=>{const b=f.box;Object.assign(b,e.chartArea),b.update(g.w,g.h,{left:0,top:0,right:0,bottom:0})})}};class $a{acquireContext(t,i){}releaseContext(t){return!1}addEventListener(t,i,s){}removeEventListener(t,i,s){}getDevicePixelRatio(){return 1}getMaximumSize(t,i,s,o){return i=Math.max(0,i||t.width),s=s||t.height,{width:i,height:Math.max(0,o?Math.floor(i/o):s)}}isAttached(t){return!0}updateConfig(t){}}class zc extends $a{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const Pi="$chartjs",Sc={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},jo=e=>e===null||e==="";function Cc(e,t){const i=e.style,s=e.getAttribute("height"),o=e.getAttribute("width");if(e[Pi]={initial:{height:s,width:o,style:{display:i.display,height:i.height,width:i.width}}},i.display=i.display||"block",i.boxSizing=i.boxSizing||"border-box",jo(o)){const n=wo(e,"width");n!==void 0&&(e.width=n)}if(jo(s))if(e.style.height==="")e.height=e.width/(t||2);else{const n=wo(e,"height");n!==void 0&&(e.height=n)}return e}const _a=Pl?{passive:!0}:!1;function Pc(e,t,i){e&&e.addEventListener(t,i,_a)}function Rc(e,t,i){e&&e.canvas&&e.canvas.removeEventListener(t,i,_a)}function Ac(e,t){const i=Sc[e.type]||e.type,{x:s,y:o}=de(e,t);return{type:i,chart:t,native:e,x:s!==void 0?s:null,y:o!==void 0?o:null}}function Fi(e,t){for(const i of e)if(i===t||i.contains(t))return!0}function Dc(e,t,i){const s=e.canvas,o=new MutationObserver(n=>{let a=!1;for(const r of n)a=a||Fi(r.addedNodes,s),a=a&&!Fi(r.removedNodes,s);a&&i()});return o.observe(document,{childList:!0,subtree:!0}),o}function Tc(e,t,i){const s=e.canvas,o=new MutationObserver(n=>{let a=!1;for(const r of n)a=a||Fi(r.removedNodes,s),a=a&&!Fi(r.addedNodes,s);a&&i()});return o.observe(document,{childList:!0,subtree:!0}),o}const si=new Map;let Fo=0;function ka(){const e=window.devicePixelRatio;e!==Fo&&(Fo=e,si.forEach((t,i)=>{i.currentDevicePixelRatio!==e&&t()}))}function Ec(e,t){si.size||window.addEventListener("resize",ka),si.set(e,t)}function Lc(e){si.delete(e),si.size||window.removeEventListener("resize",ka)}function Oc(e,t,i){const s=e.canvas,o=s&&Ks(s);if(!o)return;const n=Qn((r,l)=>{const c=o.clientWidth;i(r,l),c<o.clientWidth&&i()},window),a=new ResizeObserver(r=>{const l=r[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||n(c,d)});return a.observe(o),Ec(e,n),a}function rs(e,t,i){i&&i.disconnect(),t==="resize"&&Lc(e)}function Ic(e,t,i){const s=e.canvas,o=Qn(n=>{e.ctx!==null&&i(Ac(n,e))},e);return Pc(s,t,o),o}class jc extends $a{acquireContext(t,i){const s=t&&t.getContext&&t.getContext("2d");return s&&s.canvas===t?(Cc(t,i),s):null}releaseContext(t){const i=t.canvas;if(!i[Pi])return!1;const s=i[Pi].initial;["height","width"].forEach(n=>{const a=s[n];T(a)?i.removeAttribute(n):i.setAttribute(n,a)});const o=s.style||{};return Object.keys(o).forEach(n=>{i.style[n]=o[n]}),i.width=i.width,delete i[Pi],!0}addEventListener(t,i,s){this.removeEventListener(t,i);const o=t.$proxies||(t.$proxies={}),a={attach:Dc,detach:Tc,resize:Oc}[i]||Ic;o[i]=a(t,i,s)}removeEventListener(t,i){const s=t.$proxies||(t.$proxies={}),o=s[i];if(!o)return;({attach:rs,detach:rs,resize:rs}[i]||Rc)(t,i,o),s[i]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,i,s,o){return Cl(t,i,s,o)}isAttached(t){const i=t&&Ks(t);return!!(i&&i.isConnected)}}function Fc(e){return!qs()||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas?zc:jc}class St{constructor(){$(this,"x");$(this,"y");$(this,"active",!1);$(this,"options");$(this,"$animations")}tooltipPosition(t){const{x:i,y:s}=this.getProps(["x","y"],t);return{x:i,y:s}}hasValue(){return Pe(this.x)&&Pe(this.y)}getProps(t,i){const s=this.$animations;if(!i||!s)return this;const o={};return t.forEach(n=>{o[n]=s[n]&&s[n].active()?s[n]._to:this[n]}),o}}$(St,"defaults",{}),$(St,"defaultRoutes");function Bc(e,t){const i=e.options.ticks,s=Vc(e),o=Math.min(i.maxTicksLimit||s,s),n=i.major.enabled?Nc(t):[],a=n.length,r=n[0],l=n[a-1],c=[];if(a>o)return Wc(t,c,n,a/o),c;const d=Hc(n,t,o);if(a>0){let p,h;const g=a>1?Math.round((l-r)/(a-1)):null;for(mi(t,c,d,T(g)?0:r-g,r),p=0,h=a-1;p<h;p++)mi(t,c,d,n[p],n[p+1]);return mi(t,c,d,l,T(g)?t.length:l+g),c}return mi(t,c,d),c}function Vc(e){const t=e.options.offset,i=e._tickSize(),s=e._length/i+(t?0:1),o=e._maxLength/i;return Math.floor(Math.min(s,o))}function Hc(e,t,i){const s=Gc(e),o=t.length/i;if(!s)return Math.max(o,1);const n=Ar(s);for(let a=0,r=n.length-1;a<r;a++){const l=n[a];if(l>o)return l}return Math.max(o,1)}function Nc(e){const t=[];let i,s;for(i=0,s=e.length;i<s;i++)e[i].major&&t.push(i);return t}function Wc(e,t,i,s){let o=0,n=i[0],a;for(s=Math.ceil(s),a=0;a<e.length;a++)a===n&&(t.push(e[a]),o++,n=i[o*s])}function mi(e,t,i,s,o){const n=C(s,0),a=Math.min(C(o,e.length),e.length);let r=0,l,c,d;for(i=Math.ceil(i),o&&(l=o-s,i=l/Math.floor(l/i)),d=n;d<0;)r++,d=Math.round(n+r*i);for(c=Math.max(n,0);c<a;c++)c===d&&(t.push(e[c]),r++,d=Math.round(n+r*i))}function Gc(e){const t=e.length;let i,s;if(t<2)return!1;for(s=e[0],i=1;i<t;++i)if(e[i]-e[i-1]!==s)return!1;return s}const Yc=e=>e==="left"?"right":e==="right"?"left":e,Bo=(e,t,i)=>t==="top"||t==="left"?e[t]+i:e[t]-i,Vo=(e,t)=>Math.min(t||e,e);function Ho(e,t){const i=[],s=e.length/t,o=e.length;let n=0;for(;n<o;n+=s)i.push(e[Math.floor(n)]);return i}function Xc(e,t,i){const s=e.ticks.length,o=Math.min(t,s-1),n=e._startPixel,a=e._endPixel,r=1e-6;let l=e.getPixelForTick(o),c;if(!(i&&(s===1?c=Math.max(l-n,a-l):t===0?c=(e.getPixelForTick(1)-l)/2:c=(l-e.getPixelForTick(o-1))/2,l+=o<t?c:-c,l<n-r||l>a+r)))return l}function Uc(e,t){V(e,i=>{const s=i.gc,o=s.length/2;let n;if(o>t){for(n=0;n<o;++n)delete i.data[s[n]];s.splice(0,o)}})}function Ie(e){return e.drawTicks?e.tickLength:0}function No(e,t){if(!e.display)return 0;const i=Q(e.font,t),s=rt(e.padding);return(X(e.text)?e.text.length:1)*i.lineHeight+s.height}function qc(e,t){return ee(e,{scale:t,type:"scale"})}function Kc(e,t,i){return ee(e,{tick:i,index:t,type:"tick"})}function Jc(e,t,i){let s=Ns(e);return(i&&t!=="right"||!i&&t==="right")&&(s=Yc(s)),s}function Zc(e,t,i,s){const{top:o,left:n,bottom:a,right:r,chart:l}=e,{chartArea:c,scales:d}=l;let p=0,h,g,u;const f=a-o,b=r-n;if(e.isHorizontal()){if(g=ot(s,n,r),E(i)){const m=Object.keys(i)[0],x=i[m];u=d[m].getPixelForValue(x)+f-t}else i==="center"?u=(c.bottom+c.top)/2+f-t:u=Bo(e,i,t);h=r-n}else{if(E(i)){const m=Object.keys(i)[0],x=i[m];g=d[m].getPixelForValue(x)-b+t}else i==="center"?g=(c.left+c.right)/2-b+t:g=Bo(e,i,t);u=ot(s,a,o),p=i==="left"?-Z:Z}return{titleX:g,titleY:u,maxWidth:h,rotation:p}}class ve extends St{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,i){return t}getUserBounds(){let{_userMin:t,_userMax:i,_suggestedMin:s,_suggestedMax:o}=this;return t=bt(t,Number.POSITIVE_INFINITY),i=bt(i,Number.NEGATIVE_INFINITY),s=bt(s,Number.POSITIVE_INFINITY),o=bt(o,Number.NEGATIVE_INFINITY),{min:bt(t,s),max:bt(i,o),minDefined:K(t),maxDefined:K(i)}}getMinMax(t){let{min:i,max:s,minDefined:o,maxDefined:n}=this.getUserBounds(),a;if(o&&n)return{min:i,max:s};const r=this.getMatchingVisibleMetas();for(let l=0,c=r.length;l<c;++l)a=r[l].controller.getMinMax(this,t),o||(i=Math.min(i,a.min)),n||(s=Math.max(s,a.max));return i=n&&i>s?s:i,s=o&&i>s?i:s,{min:bt(i,bt(s,i)),max:bt(s,bt(i,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){W(this.options.beforeUpdate,[this])}update(t,i,s){const{beginAtZero:o,grace:n,ticks:a}=this.options,r=a.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=i,this._margins=s=Object.assign({left:0,right:0,top:0,bottom:0},s),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+s.left+s.right:this.height+s.top+s.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=al(this,n,o),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=r<this.ticks.length;this._convertTicksToLabels(l?Ho(this.ticks,r):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),a.display&&(a.autoSkip||a.source==="auto")&&(this.ticks=Bc(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,i,s;this.isHorizontal()?(i=this.left,s=this.right):(i=this.top,s=this.bottom,t=!t),this._startPixel=i,this._endPixel=s,this._reversePixels=t,this._length=s-i,this._alignToPixels=this.options.alignToPixels}afterUpdate(){W(this.options.afterUpdate,[this])}beforeSetDimensions(){W(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){W(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),W(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){W(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const i=this.options.ticks;let s,o,n;for(s=0,o=t.length;s<o;s++)n=t[s],n.label=W(i.callback,[n.value,s,t],this)}afterTickToLabelConversion(){W(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){W(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,i=t.ticks,s=Vo(this.ticks.length,t.ticks.maxTicksLimit),o=i.minRotation||0,n=i.maxRotation;let a=o,r,l,c;if(!this._isVisible()||!i.display||o>=n||s<=1||!this.isHorizontal()){this.labelRotation=o;return}const d=this._getLabelSizes(),p=d.widest.width,h=d.highest.height,g=tt(this.chart.width-p,0,this.maxWidth);r=t.offset?this.maxWidth/s:g/(s-1),p+6>r&&(r=g/(s-(t.offset?.5:1)),l=this.maxHeight-Ie(t.grid)-i.padding-No(t.title,this.chart.options.font),c=Math.sqrt(p*p+h*h),a=Vs(Math.min(Math.asin(tt((d.highest.height+6)/r,-1,1)),Math.asin(tt(l/c,-1,1))-Math.asin(tt(h/c,-1,1)))),a=Math.max(o,Math.min(n,a))),this.labelRotation=a}afterCalculateLabelRotation(){W(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){W(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:i,options:{ticks:s,title:o,grid:n}}=this,a=this._isVisible(),r=this.isHorizontal();if(a){const l=No(o,i.options.font);if(r?(t.width=this.maxWidth,t.height=Ie(n)+l):(t.height=this.maxHeight,t.width=Ie(n)+l),s.display&&this.ticks.length){const{first:c,last:d,widest:p,highest:h}=this._getLabelSizes(),g=s.padding*2,u=Mt(this.labelRotation),f=Math.cos(u),b=Math.sin(u);if(r){const m=s.mirror?0:b*p.width+f*h.height;t.height=Math.min(this.maxHeight,t.height+m+g)}else{const m=s.mirror?0:f*p.width+b*h.height;t.width=Math.min(this.maxWidth,t.width+m+g)}this._calculatePadding(c,d,b,f)}}this._handleMargins(),r?(this.width=this._length=i.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=i.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,i,s,o){const{ticks:{align:n,padding:a},position:r}=this.options,l=this.labelRotation!==0,c=r!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,p=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,g=0;l?c?(h=o*t.width,g=s*i.height):(h=s*t.height,g=o*i.width):n==="start"?g=i.width:n==="end"?h=t.width:n!=="inner"&&(h=t.width/2,g=i.width/2),this.paddingLeft=Math.max((h-d+a)*this.width/(this.width-d),0),this.paddingRight=Math.max((g-p+a)*this.width/(this.width-p),0)}else{let d=i.height/2,p=t.height/2;n==="start"?(d=0,p=t.height):n==="end"&&(d=i.height,p=0),this.paddingTop=d+a,this.paddingBottom=p+a}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){W(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:i}=this.options;return i==="top"||i==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let i,s;for(i=0,s=t.length;i<s;i++)T(t[i].label)&&(t.splice(i,1),s--,i--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const i=this.options.ticks.sampleSize;let s=this.ticks;i<s.length&&(s=Ho(s,i)),this._labelSizes=t=this._computeLabelSizes(s,s.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,i,s){const{ctx:o,_longestTextCache:n}=this,a=[],r=[],l=Math.floor(i/Vo(i,s));let c=0,d=0,p,h,g,u,f,b,m,x,w,y,v;for(p=0;p<i;p+=l){if(u=t[p].label,f=this._resolveTickFontOptions(p),o.font=b=f.string,m=n[b]=n[b]||{data:{},gc:[]},x=f.lineHeight,w=y=0,!T(u)&&!X(u))w=Ii(o,m.data,m.gc,w,u),y=x;else if(X(u))for(h=0,g=u.length;h<g;++h)v=u[h],!T(v)&&!X(v)&&(w=Ii(o,m.data,m.gc,w,v),y+=x);a.push(w),r.push(y),c=Math.max(w,c),d=Math.max(y,d)}Uc(n,i);const k=a.indexOf(c),_=r.indexOf(d),M=z=>({width:a[z]||0,height:r[z]||0});return{first:M(0),last:M(i-1),widest:M(k),highest:M(_),widths:a,heights:r}}getLabelForValue(t){return t}getPixelForValue(t,i){return NaN}getValueForPixel(t){}getPixelForTick(t){const i=this.ticks;return t<0||t>i.length-1?null:this.getPixelForValue(i[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const i=this._startPixel+t*this._length;return Lr(this._alignToPixels?re(this.chart,i,0):i)}getDecimalForPixel(t){const i=(t-this._startPixel)/this._length;return this._reversePixels?1-i:i}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:i}=this;return t<0&&i<0?i:t>0&&i>0?t:0}getContext(t){const i=this.ticks||[];if(t>=0&&t<i.length){const s=i[t];return s.$context||(s.$context=Kc(this.getContext(),t,s))}return this.$context||(this.$context=qc(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,i=Mt(this.labelRotation),s=Math.abs(Math.cos(i)),o=Math.abs(Math.sin(i)),n=this._getLabelSizes(),a=t.autoSkipPadding||0,r=n?n.widest.width+a:0,l=n?n.highest.height+a:0;return this.isHorizontal()?l*s>r*o?r/s:l/o:l*o<r*s?l/s:r/o}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const i=this.axis,s=this.chart,o=this.options,{grid:n,position:a,border:r}=o,l=n.offset,c=this.isHorizontal(),p=this.ticks.length+(l?1:0),h=Ie(n),g=[],u=r.setContext(this.getContext()),f=u.display?u.width:0,b=f/2,m=function(Y){return re(s,Y,f)};let x,w,y,v,k,_,M,z,P,A,O,et;if(a==="top")x=m(this.bottom),_=this.bottom-h,z=x-b,A=m(t.top)+b,et=t.bottom;else if(a==="bottom")x=m(this.top),A=t.top,et=m(t.bottom)-b,_=x+b,z=this.top+h;else if(a==="left")x=m(this.right),k=this.right-h,M=x-b,P=m(t.left)+b,O=t.right;else if(a==="right")x=m(this.left),P=t.left,O=m(t.right)-b,k=x+b,M=this.left+h;else if(i==="x"){if(a==="center")x=m((t.top+t.bottom)/2+.5);else if(E(a)){const Y=Object.keys(a)[0],J=a[Y];x=m(this.chart.scales[Y].getPixelForValue(J))}A=t.top,et=t.bottom,_=x+b,z=_+h}else if(i==="y"){if(a==="center")x=m((t.left+t.right)/2);else if(E(a)){const Y=Object.keys(a)[0],J=a[Y];x=m(this.chart.scales[Y].getPixelForValue(J))}k=x-b,M=k-h,P=t.left,O=t.right}const gt=C(o.ticks.maxTicksLimit,p),H=Math.max(1,Math.ceil(p/gt));for(w=0;w<p;w+=H){const Y=this.getContext(w),J=n.setContext(Y),_t=r.setContext(Y),it=J.lineWidth,we=J.color,ci=_t.dash||[],$e=_t.dashOffset,De=J.tickWidth,oe=J.tickColor,Te=J.tickBorderDash||[],ne=J.tickBorderDashOffset;y=Xc(this,w,l),y!==void 0&&(v=re(s,y,it),c?k=M=P=O=v:_=z=A=et=v,g.push({tx1:k,ty1:_,tx2:M,ty2:z,x1:P,y1:A,x2:O,y2:et,width:it,color:we,borderDash:ci,borderDashOffset:$e,tickWidth:De,tickColor:oe,tickBorderDash:Te,tickBorderDashOffset:ne}))}return this._ticksLength=p,this._borderValue=x,g}_computeLabelItems(t){const i=this.axis,s=this.options,{position:o,ticks:n}=s,a=this.isHorizontal(),r=this.ticks,{align:l,crossAlign:c,padding:d,mirror:p}=n,h=Ie(s.grid),g=h+d,u=p?-d:g,f=-Mt(this.labelRotation),b=[];let m,x,w,y,v,k,_,M,z,P,A,O,et="middle";if(o==="top")k=this.bottom-u,_=this._getXAxisLabelAlignment();else if(o==="bottom")k=this.top+u,_=this._getXAxisLabelAlignment();else if(o==="left"){const H=this._getYAxisLabelAlignment(h);_=H.textAlign,v=H.x}else if(o==="right"){const H=this._getYAxisLabelAlignment(h);_=H.textAlign,v=H.x}else if(i==="x"){if(o==="center")k=(t.top+t.bottom)/2+g;else if(E(o)){const H=Object.keys(o)[0],Y=o[H];k=this.chart.scales[H].getPixelForValue(Y)+g}_=this._getXAxisLabelAlignment()}else if(i==="y"){if(o==="center")v=(t.left+t.right)/2-g;else if(E(o)){const H=Object.keys(o)[0],Y=o[H];v=this.chart.scales[H].getPixelForValue(Y)}_=this._getYAxisLabelAlignment(h).textAlign}i==="y"&&(l==="start"?et="top":l==="end"&&(et="bottom"));const gt=this._getLabelSizes();for(m=0,x=r.length;m<x;++m){w=r[m],y=w.label;const H=n.setContext(this.getContext(m));M=this.getPixelForTick(m)+n.labelOffset,z=this._resolveTickFontOptions(m),P=z.lineHeight,A=X(y)?y.length:1;const Y=A/2,J=H.color,_t=H.textStrokeColor,it=H.textStrokeWidth;let we=_;a?(v=M,_==="inner"&&(m===x-1?we=this.options.reverse?"left":"right":m===0?we=this.options.reverse?"right":"left":we="center"),o==="top"?c==="near"||f!==0?O=-A*P+P/2:c==="center"?O=-gt.highest.height/2-Y*P+P:O=-gt.highest.height+P/2:c==="near"||f!==0?O=P/2:c==="center"?O=gt.highest.height/2-Y*P:O=gt.highest.height-A*P,p&&(O*=-1),f!==0&&!H.showLabelBackdrop&&(v+=P/2*Math.sin(f))):(k=M,O=(1-A)*P/2);let ci;if(H.showLabelBackdrop){const $e=rt(H.backdropPadding),De=gt.heights[m],oe=gt.widths[m];let Te=O-$e.top,ne=0-$e.left;switch(et){case"middle":Te-=De/2;break;case"bottom":Te-=De;break}switch(_){case"center":ne-=oe/2;break;case"right":ne-=oe;break;case"inner":m===x-1?ne-=oe:m>0&&(ne-=oe/2);break}ci={left:ne,top:Te,width:oe+$e.width,height:De+$e.height,color:H.backdropColor}}b.push({label:y,font:z,textOffset:O,options:{rotation:f,color:J,strokeColor:_t,strokeWidth:it,textAlign:we,textBaseline:et,translation:[v,k],backdrop:ci}})}return b}_getXAxisLabelAlignment(){const{position:t,ticks:i}=this.options;if(-Mt(this.labelRotation))return t==="top"?"left":"right";let o="center";return i.align==="start"?o="left":i.align==="end"?o="right":i.align==="inner"&&(o="inner"),o}_getYAxisLabelAlignment(t){const{position:i,ticks:{crossAlign:s,mirror:o,padding:n}}=this.options,a=this._getLabelSizes(),r=t+n,l=a.widest.width;let c,d;return i==="left"?o?(d=this.right+n,s==="near"?c="left":s==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-r,s==="near"?c="right":s==="center"?(c="center",d-=l/2):(c="left",d=this.left)):i==="right"?o?(d=this.left+n,s==="near"?c="right":s==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+r,s==="near"?c="left":s==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,i=this.options.position;if(i==="left"||i==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(i==="top"||i==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:i},left:s,top:o,width:n,height:a}=this;i&&(t.save(),t.fillStyle=i,t.fillRect(s,o,n,a),t.restore())}getLineWidthForValue(t){const i=this.options.grid;if(!this._isVisible()||!i.display)return 0;const o=this.ticks.findIndex(n=>n.value===t);return o>=0?i.setContext(this.getContext(o)).lineWidth:0}drawGrid(t){const i=this.options.grid,s=this.ctx,o=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let n,a;const r=(l,c,d)=>{!d.width||!d.color||(s.save(),s.lineWidth=d.width,s.strokeStyle=d.color,s.setLineDash(d.borderDash||[]),s.lineDashOffset=d.borderDashOffset,s.beginPath(),s.moveTo(l.x,l.y),s.lineTo(c.x,c.y),s.stroke(),s.restore())};if(i.display)for(n=0,a=o.length;n<a;++n){const l=o[n];i.drawOnChartArea&&r({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),i.drawTicks&&r({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:i,options:{border:s,grid:o}}=this,n=s.setContext(this.getContext()),a=s.display?n.width:0;if(!a)return;const r=o.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,p,h;this.isHorizontal()?(c=re(t,this.left,a)-a/2,d=re(t,this.right,r)+r/2,p=h=l):(p=re(t,this.top,a)-a/2,h=re(t,this.bottom,r)+r/2,c=d=l),i.save(),i.lineWidth=n.width,i.strokeStyle=n.color,i.beginPath(),i.moveTo(c,p),i.lineTo(d,h),i.stroke(),i.restore()}drawLabels(t){if(!this.options.ticks.display)return;const s=this.ctx,o=this._computeLabelArea();o&&Wi(s,o);const n=this.getLabelItems(t);for(const a of n){const r=a.options,l=a.font,c=a.label,d=a.textOffset;xe(s,c,0,d,l,r)}o&&Gi(s)}drawTitle(){const{ctx:t,options:{position:i,title:s,reverse:o}}=this;if(!s.display)return;const n=Q(s.font),a=rt(s.padding),r=s.align;let l=n.lineHeight/2;i==="bottom"||i==="center"||E(i)?(l+=a.bottom,X(s.text)&&(l+=n.lineHeight*(s.text.length-1))):l+=a.top;const{titleX:c,titleY:d,maxWidth:p,rotation:h}=Zc(this,l,i,r);xe(t,s.text,0,0,n,{color:s.color,maxWidth:p,rotation:h,textAlign:Jc(r,i,o),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,i=t.ticks&&t.ticks.z||0,s=C(t.grid&&t.grid.z,-1),o=C(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==ve.prototype.draw?[{z:i,draw:n=>{this.draw(n)}}]:[{z:s,draw:n=>{this.drawBackground(),this.drawGrid(n),this.drawTitle()}},{z:o,draw:()=>{this.drawBorder()}},{z:i,draw:n=>{this.drawLabels(n)}}]}getMatchingVisibleMetas(t){const i=this.chart.getSortedVisibleDatasetMetas(),s=this.axis+"AxisID",o=[];let n,a;for(n=0,a=i.length;n<a;++n){const r=i[n];r[s]===this.id&&(!t||r.type===t)&&o.push(r)}return o}_resolveTickFontOptions(t){const i=this.options.ticks.setContext(this.getContext(t));return Q(i.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class xi{constructor(t,i,s){this.type=t,this.scope=i,this.override=s,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const i=Object.getPrototypeOf(t);let s;ed(i)&&(s=this.register(i));const o=this.items,n=t.id,a=this.scope+"."+n;if(!n)throw new Error("class does not have id: "+t);return n in o||(o[n]=t,Qc(t,a,s),this.override&&U.override(t.id,t.overrides)),a}get(t){return this.items[t]}unregister(t){const i=this.items,s=t.id,o=this.scope;s in i&&delete i[s],o&&s in U[o]&&(delete U[o][s],this.override&&delete me[s])}}function Qc(e,t,i){const s=Qe(Object.create(null),[i?U.get(i):{},U.get(t),e.defaults]);U.set(t,s),e.defaultRoutes&&td(t,e.defaultRoutes),e.descriptors&&U.describe(t,e.descriptors)}function td(e,t){Object.keys(t).forEach(i=>{const s=i.split("."),o=s.pop(),n=[e].concat(s).join("."),a=t[i].split("."),r=a.pop(),l=a.join(".");U.route(n,o,l,r)})}function ed(e){return"id"in e&&"defaults"in e}class id{constructor(){this.controllers=new xi(zt,"datasets",!0),this.elements=new xi(St,"elements"),this.plugins=new xi(Object,"plugins"),this.scales=new xi(ve,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,i,s){[...i].forEach(o=>{const n=s||this._getRegistryForType(o);s||n.isForType(o)||n===this.plugins&&o.id?this._exec(t,n,o):V(o,a=>{const r=s||this._getRegistryForType(a);this._exec(t,r,a)})})}_exec(t,i,s){const o=Bs(t);W(s["before"+o],[],s),i[t](s),W(s["after"+o],[],s)}_getRegistryForType(t){for(let i=0;i<this._typedRegistries.length;i++){const s=this._typedRegistries[i];if(s.isForType(t))return s}return this.plugins}_get(t,i,s){const o=i.get(t);if(o===void 0)throw new Error('"'+t+'" is not a registered '+s+".");return o}}var Rt=new id;class sd{constructor(){this._init=void 0}notify(t,i,s,o){if(i==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const n=o?this._descriptors(t).filter(o):this._descriptors(t),a=this._notify(n,t,i,s);return i==="afterDestroy"&&(this._notify(n,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),a}_notify(t,i,s,o){o=o||{};for(const n of t){const a=n.plugin,r=a[s],l=[i,o,n.options];if(W(r,l,a)===!1&&o.cancelable)return!1}return!0}invalidate(){T(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const i=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),i}_createDescriptors(t,i){const s=t&&t.config,o=C(s.options&&s.options.plugins,{}),n=od(s);return o===!1&&!i?[]:ad(t,n,o,i)}_notifyStateChanges(t){const i=this._oldCache||[],s=this._cache,o=(n,a)=>n.filter(r=>!a.some(l=>r.plugin.id===l.plugin.id));this._notify(o(i,s),t,"stop"),this._notify(o(s,i),t,"start")}}function od(e){const t={},i=[],s=Object.keys(Rt.plugins.items);for(let n=0;n<s.length;n++)i.push(Rt.getPlugin(s[n]));const o=e.plugins||[];for(let n=0;n<o.length;n++){const a=o[n];i.indexOf(a)===-1&&(i.push(a),t[a.id]=!0)}return{plugins:i,localIds:t}}function nd(e,t){return!t&&e===!1?null:e===!0?{}:e}function ad(e,{plugins:t,localIds:i},s,o){const n=[],a=e.getContext();for(const r of t){const l=r.id,c=nd(s[l],o);c!==null&&n.push({plugin:r,options:rd(e.config,{plugin:r,local:i[l]},c,a)})}return n}function rd(e,{plugin:t,local:i},s,o){const n=e.pluginScopeKeys(t),a=e.getOptionScopes(s,n);return i&&t.defaults&&a.push(t.defaults),e.createResolver(a,o,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function ks(e,t){const i=U.datasets[e]||{};return((t.datasets||{})[e]||{}).indexAxis||t.indexAxis||i.indexAxis||"x"}function ld(e,t){let i=e;return e==="_index_"?i=t:e==="_value_"&&(i=t==="x"?"y":"x"),i}function cd(e,t){return e===t?"_index_":"_value_"}function Wo(e){if(e==="x"||e==="y"||e==="r")return e}function dd(e){if(e==="top"||e==="bottom")return"x";if(e==="left"||e==="right")return"y"}function Ms(e,...t){if(Wo(e))return e;for(const i of t){const s=i.axis||dd(i.position)||e.length>1&&Wo(e[0].toLowerCase());if(s)return s}throw new Error(`Cannot determine type of '${e}' axis. Please provide 'axis' or 'position' option.`)}function Go(e,t,i){if(i[t+"AxisID"]===e)return{axis:t}}function pd(e,t){if(t.data&&t.data.datasets){const i=t.data.datasets.filter(s=>s.xAxisID===e||s.yAxisID===e);if(i.length)return Go(e,"x",i[0])||Go(e,"y",i[0])}return{}}function hd(e,t){const i=me[e.type]||{scales:{}},s=t.scales||{},o=ks(e.type,t),n=Object.create(null);return Object.keys(s).forEach(a=>{const r=s[a];if(!E(r))return console.error(`Invalid scale configuration for scale: ${a}`);if(r._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${a}`);const l=Ms(a,r,pd(a,e),U.scales[r.type]),c=cd(l,o),d=i.scales||{};n[a]=Xe(Object.create(null),[{axis:l},r,d[l],d[c]])}),e.data.datasets.forEach(a=>{const r=a.type||e.type,l=a.indexAxis||ks(r,t),d=(me[r]||{}).scales||{};Object.keys(d).forEach(p=>{const h=ld(p,l),g=a[h+"AxisID"]||h;n[g]=n[g]||Object.create(null),Xe(n[g],[{axis:h},s[g],d[p]])})}),Object.keys(n).forEach(a=>{const r=n[a];Xe(r,[U.scales[r.type],U.scale])}),n}function Ma(e){const t=e.options||(e.options={});t.plugins=C(t.plugins,{}),t.scales=hd(e,t)}function za(e){return e=e||{},e.datasets=e.datasets||[],e.labels=e.labels||[],e}function gd(e){return e=e||{},e.data=za(e.data),Ma(e),e}const Yo=new Map,Sa=new Set;function vi(e,t){let i=Yo.get(e);return i||(i=t(),Yo.set(e,i),Sa.add(i)),i}const je=(e,t,i)=>{const s=Qt(t,i);s!==void 0&&e.add(s)};class ud{constructor(t){this._config=gd(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=za(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),Ma(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return vi(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,i){return vi(`${t}.transition.${i}`,()=>[[`datasets.${t}.transitions.${i}`,`transitions.${i}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,i){return vi(`${t}-${i}`,()=>[[`datasets.${t}.elements.${i}`,`datasets.${t}`,`elements.${i}`,""]])}pluginScopeKeys(t){const i=t.id,s=this.type;return vi(`${s}-plugin-${i}`,()=>[[`plugins.${i}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,i){const s=this._scopeCache;let o=s.get(t);return(!o||i)&&(o=new Map,s.set(t,o)),o}getOptionScopes(t,i,s){const{options:o,type:n}=this,a=this._cachedScopes(t,s),r=a.get(i);if(r)return r;const l=new Set;i.forEach(d=>{t&&(l.add(t),d.forEach(p=>je(l,t,p))),d.forEach(p=>je(l,o,p)),d.forEach(p=>je(l,me[n]||{},p)),d.forEach(p=>je(l,U,p)),d.forEach(p=>je(l,ws,p))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),Sa.has(i)&&a.set(i,c),c}chartOptionScopes(){const{options:t,type:i}=this;return[t,me[i]||{},U.datasets[i]||{},{type:i},U,ws]}resolveNamedOptions(t,i,s,o=[""]){const n={$shared:!0},{resolver:a,subPrefixes:r}=Xo(this._resolverCache,t,o);let l=a;if(bd(a,i)){n.$shared=!1,s=te(s)?s():s;const c=this.createResolver(t,s,r);l=Re(a,s,c)}for(const c of i)n[c]=l[c];return n}createResolver(t,i,s=[""],o){const{resolver:n}=Xo(this._resolverCache,t,s);return E(i)?Re(n,i,void 0,o):n}}function Xo(e,t,i){let s=e.get(t);s||(s=new Map,e.set(t,s));const o=i.join();let n=s.get(o);return n||(n={resolver:Ys(t,i),subPrefixes:i.filter(r=>!r.toLowerCase().includes("hover"))},s.set(o,n)),n}const fd=e=>E(e)&&Object.getOwnPropertyNames(e).some(t=>te(e[t]));function bd(e,t){const{isScriptable:i,isIndexable:s}=na(e);for(const o of t){const n=i(o),a=s(o),r=(a||n)&&e[o];if(n&&(te(r)||fd(r))||a&&X(r))return!0}return!1}var md="4.5.1";const xd=["top","bottom","left","right","chartArea"];function Uo(e,t){return e==="top"||e==="bottom"||xd.indexOf(e)===-1&&t==="x"}function qo(e,t){return function(i,s){return i[e]===s[e]?i[t]-s[t]:i[e]-s[e]}}function Ko(e){const t=e.chart,i=t.options.animation;t.notifyPlugins("afterRender"),W(i&&i.onComplete,[e],t)}function vd(e){const t=e.chart,i=t.options.animation;W(i&&i.onProgress,[e],t)}function Ca(e){return qs()&&typeof e=="string"?e=document.getElementById(e):e&&e.length&&(e=e[0]),e&&e.canvas&&(e=e.canvas),e}const Ri={},Jo=e=>{const t=Ca(e);return Object.values(Ri).filter(i=>i.canvas===t).pop()};function yd(e,t,i){const s=Object.keys(e);for(const o of s){const n=+o;if(n>=t){const a=e[o];delete e[o],(i>0||n>t)&&(e[n+i]=a)}}}function wd(e,t,i,s){return!i||e.type==="mouseout"?null:s?t:e}class mt{static register(...t){Rt.add(...t),Zo()}static unregister(...t){Rt.remove(...t),Zo()}constructor(t,i){const s=this.config=new ud(i),o=Ca(t),n=Jo(o);if(n)throw new Error("Canvas is already in use. Chart with ID '"+n.id+"' must be destroyed before the canvas with ID '"+n.canvas.id+"' can be reused.");const a=s.createResolver(s.chartOptionScopes(),this.getContext());this.platform=new(s.platform||Fc(o)),this.platform.updateConfig(s);const r=this.platform.acquireContext(o,a.aspectRatio),l=r&&r.canvas,c=l&&l.height,d=l&&l.width;if(this.id=$r(),this.ctx=r,this.canvas=l,this.width=d,this.height=c,this._options=a,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new sd,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=Fr(p=>this.update(p),a.resizeDelay||0),this._dataChanges=[],Ri[this.id]=this,!r||!l){console.error("Failed to create chart: can't acquire context from the given item");return}Et.listen(this,"complete",Ko),Et.listen(this,"progress",vd),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:i},width:s,height:o,_aspectRatio:n}=this;return T(t)?i&&n?n:o?s/o:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return Rt}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():yo(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return mo(this.canvas,this.ctx),this}stop(){return Et.stop(this),this}resize(t,i){Et.running(this)?this._resizeBeforeDraw={width:t,height:i}:this._resize(t,i)}_resize(t,i){const s=this.options,o=this.canvas,n=s.maintainAspectRatio&&this.aspectRatio,a=this.platform.getMaximumSize(o,t,i,n),r=s.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=a.width,this.height=a.height,this._aspectRatio=this.aspectRatio,yo(this,r,!0)&&(this.notifyPlugins("resize",{size:a}),W(s.onResize,[this,a],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const i=this.options.scales||{};V(i,(s,o)=>{s.id=o})}buildOrUpdateScales(){const t=this.options,i=t.scales,s=this.scales,o=Object.keys(s).reduce((a,r)=>(a[r]=!1,a),{});let n=[];i&&(n=n.concat(Object.keys(i).map(a=>{const r=i[a],l=Ms(a,r),c=l==="r",d=l==="x";return{options:r,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),V(n,a=>{const r=a.options,l=r.id,c=Ms(l,r),d=C(r.type,a.dtype);(r.position===void 0||Uo(r.position,c)!==Uo(a.dposition))&&(r.position=a.dposition),o[l]=!0;let p=null;if(l in s&&s[l].type===d)p=s[l];else{const h=Rt.getScale(d);p=new h({id:l,type:d,ctx:this.ctx,chart:this}),s[p.id]=p}p.init(r,t)}),V(o,(a,r)=>{a||delete s[r]}),V(s,a=>{at.configure(this,a,a.options),at.addBox(this,a)})}_updateMetasets(){const t=this._metasets,i=this.data.datasets.length,s=t.length;if(t.sort((o,n)=>o.index-n.index),s>i){for(let o=i;o<s;++o)this._destroyDatasetMeta(o);t.splice(i,s-i)}this._sortedMetasets=t.slice(0).sort(qo("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:i}}=this;t.length>i.length&&delete this._stacks,t.forEach((s,o)=>{i.filter(n=>n===s._dataset).length===0&&this._destroyDatasetMeta(o)})}buildOrUpdateControllers(){const t=[],i=this.data.datasets;let s,o;for(this._removeUnreferencedMetasets(),s=0,o=i.length;s<o;s++){const n=i[s];let a=this.getDatasetMeta(s);const r=n.type||this.config.type;if(a.type&&a.type!==r&&(this._destroyDatasetMeta(s),a=this.getDatasetMeta(s)),a.type=r,a.indexAxis=n.indexAxis||ks(r,this.options),a.order=n.order||0,a.index=s,a.label=""+n.label,a.visible=this.isDatasetVisible(s),a.controller)a.controller.updateIndex(s),a.controller.linkScales();else{const l=Rt.getController(r),{datasetElementType:c,dataElementType:d}=U.datasets[r];Object.assign(l,{dataElementType:Rt.getElement(d),datasetElementType:c&&Rt.getElement(c)}),a.controller=new l(this,s),t.push(a.controller)}}return this._updateMetasets(),t}_resetElements(){V(this.data.datasets,(t,i)=>{this.getDatasetMeta(i).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const i=this.config;i.update();const s=this._options=i.createResolver(i.chartOptionScopes(),this.getContext()),o=this._animationsDisabled=!s.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const n=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let a=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:p}=this.getDatasetMeta(c),h=!o&&n.indexOf(p)===-1;p.buildOrUpdateElements(h),a=Math.max(+p.getMaxOverflow(),a)}a=this._minPadding=s.layout.autoPadding?a:0,this._updateLayout(a),o||V(n,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(qo("z","_idx"));const{_active:r,_lastEvent:l}=this;l?this._eventHandler(l,!0):r.length&&this._updateHoverStyles(r,r,!0),this.render()}_updateScales(){V(this.scales,t=>{at.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,i=new Set(Object.keys(this._listeners)),s=new Set(t.events);(!ro(i,s)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,i=this._getUniformDataChanges()||[];for(const{method:s,start:o,count:n}of i){const a=s==="_removeElements"?-n:n;yd(t,o,a)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const i=this.data.datasets.length,s=n=>new Set(t.filter(a=>a[0]===n).map((a,r)=>r+","+a.splice(1).join(","))),o=s(0);for(let n=1;n<i;n++)if(!ro(o,s(n)))return;return Array.from(o).map(n=>n.split(",")).map(n=>({method:n[1],start:+n[2],count:+n[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;at.update(this,this.width,this.height,t);const i=this.chartArea,s=i.width<=0||i.height<=0;this._layers=[],V(this.boxes,o=>{s&&o.position==="chartArea"||(o.configure&&o.configure(),this._layers.push(...o._layers()))},this),this._layers.forEach((o,n)=>{o._idx=n}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let i=0,s=this.data.datasets.length;i<s;++i)this.getDatasetMeta(i).controller.configure();for(let i=0,s=this.data.datasets.length;i<s;++i)this._updateDataset(i,te(t)?t({datasetIndex:i}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,i){const s=this.getDatasetMeta(t),o={meta:s,index:t,mode:i,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",o)!==!1&&(s.controller._update(i),o.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",o))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Et.has(this)?this.attached&&!Et.running(this)&&Et.start(this):(this.draw(),Ko({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:s,height:o}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(s,o)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const i=this._layers;for(t=0;t<i.length&&i[t].z<=0;++t)i[t].draw(this.chartArea);for(this._drawDatasets();t<i.length;++t)i[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const i=this._sortedMetasets,s=[];let o,n;for(o=0,n=i.length;o<n;++o){const a=i[o];(!t||a.visible)&&s.push(a)}return s}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let i=t.length-1;i>=0;--i)this._drawDataset(t[i]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const i=this.ctx,s={meta:t,index:t.index,cancelable:!0},o=ba(this,t);this.notifyPlugins("beforeDatasetDraw",s)!==!1&&(o&&Wi(i,o),t.controller.draw(),o&&Gi(i),s.cancelable=!1,this.notifyPlugins("afterDatasetDraw",s))}isPointInArea(t){return Vt(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,i,s,o){const n=xc.modes[i];return typeof n=="function"?n(this,t,s,o):[]}getDatasetMeta(t){const i=this.data.datasets[t],s=this._metasets;let o=s.filter(n=>n&&n._dataset===i).pop();return o||(o={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:i&&i.order||0,index:t,_dataset:i,_parsed:[],_sorted:!1},s.push(o)),o}getContext(){return this.$context||(this.$context=ee(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const i=this.data.datasets[t];if(!i)return!1;const s=this.getDatasetMeta(t);return typeof s.hidden=="boolean"?!s.hidden:!i.hidden}setDatasetVisibility(t,i){const s=this.getDatasetMeta(t);s.hidden=!i}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,i,s){const o=s?"show":"hide",n=this.getDatasetMeta(t),a=n.controller._resolveAnimations(void 0,o);ti(i)?(n.data[i].hidden=!s,this.update()):(this.setDatasetVisibility(t,s),a.update(n,{visible:s}),this.update(r=>r.datasetIndex===t?o:void 0))}hide(t,i){this._updateVisibility(t,i,!1)}show(t,i){this._updateVisibility(t,i,!0)}_destroyDatasetMeta(t){const i=this._metasets[t];i&&i.controller&&i.controller._destroy(),delete this._metasets[t]}_stop(){let t,i;for(this.stop(),Et.remove(this),t=0,i=this.data.datasets.length;t<i;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:i}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),mo(t,i),this.platform.releaseContext(i),this.canvas=null,this.ctx=null),delete Ri[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,i=this.platform,s=(n,a)=>{i.addEventListener(this,n,a),t[n]=a},o=(n,a,r)=>{n.offsetX=a,n.offsetY=r,this._eventHandler(n)};V(this.options.events,n=>s(n,o))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,i=this.platform,s=(l,c)=>{i.addEventListener(this,l,c),t[l]=c},o=(l,c)=>{t[l]&&(i.removeEventListener(this,l,c),delete t[l])},n=(l,c)=>{this.canvas&&this.resize(l,c)};let a;const r=()=>{o("attach",r),this.attached=!0,this.resize(),s("resize",n),s("detach",a)};a=()=>{this.attached=!1,o("resize",n),this._stop(),this._resize(0,0),s("attach",r)},i.isAttached(this.canvas)?r():a()}unbindEvents(){V(this._listeners,(t,i)=>{this.platform.removeEventListener(this,i,t)}),this._listeners={},V(this._responsiveListeners,(t,i)=>{this.platform.removeEventListener(this,i,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,i,s){const o=s?"set":"remove";let n,a,r,l;for(i==="dataset"&&(n=this.getDatasetMeta(t[0].datasetIndex),n.controller["_"+o+"DatasetHoverStyle"]()),r=0,l=t.length;r<l;++r){a=t[r];const c=a&&this.getDatasetMeta(a.datasetIndex).controller;c&&c[o+"HoverStyle"](a.element,a.datasetIndex,a.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const i=this._active||[],s=t.map(({datasetIndex:n,index:a})=>{const r=this.getDatasetMeta(n);if(!r)throw new Error("No dataset found at index "+n);return{datasetIndex:n,element:r.data[a],index:a}});!Ei(s,i)&&(this._active=s,this._lastEvent=null,this._updateHoverStyles(s,i))}notifyPlugins(t,i,s){return this._plugins.notify(this,t,i,s)}isPluginEnabled(t){return this._plugins._cache.filter(i=>i.plugin.id===t).length===1}_updateHoverStyles(t,i,s){const o=this.options.hover,n=(l,c)=>l.filter(d=>!c.some(p=>d.datasetIndex===p.datasetIndex&&d.index===p.index)),a=n(i,t),r=s?t:n(t,i);a.length&&this.updateHoverStyle(a,o.mode,!1),r.length&&o.mode&&this.updateHoverStyle(r,o.mode,!0)}_eventHandler(t,i){const s={event:t,replay:i,cancelable:!0,inChartArea:this.isPointInArea(t)},o=a=>(a.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",s,o)===!1)return;const n=this._handleEvent(t,i,s.inChartArea);return s.cancelable=!1,this.notifyPlugins("afterEvent",s,o),(n||s.changed)&&this.render(),this}_handleEvent(t,i,s){const{_active:o=[],options:n}=this,a=i,r=this._getActiveElements(t,o,s,a),l=Cr(t),c=wd(t,this._lastEvent,s,l);s&&(this._lastEvent=null,W(n.onHover,[t,r,this],this),l&&W(n.onClick,[t,r,this],this));const d=!Ei(r,o);return(d||i)&&(this._active=r,this._updateHoverStyles(r,o,i)),this._lastEvent=c,d}_getActiveElements(t,i,s,o){if(t.type==="mouseout")return[];if(!s)return i;const n=this.options.hover;return this.getElementsAtEventForMode(t,n.mode,n,o)}}$(mt,"defaults",U),$(mt,"instances",Ri),$(mt,"overrides",me),$(mt,"registry",Rt),$(mt,"version",md),$(mt,"getChart",Jo);function Zo(){return V(mt.instances,e=>e._plugins.invalidate())}function $d(e,t,i){const{startAngle:s,x:o,y:n,outerRadius:a,innerRadius:r,options:l}=t,{borderWidth:c,borderJoinStyle:d}=l,p=Math.min(c/a,nt(s-i));if(e.beginPath(),e.arc(o,n,a-c/2,s+p/2,i-p/2),r>0){const h=Math.min(c/r,nt(s-i));e.arc(o,n,r+c/2,i-h/2,s+h/2,!0)}else{const h=Math.min(c/2,a*nt(s-i));if(d==="round")e.arc(o,n,h,i-F/2,s+F/2,!0);else if(d==="bevel"){const g=2*h*h,u=-g*Math.cos(i+F/2)+o,f=-g*Math.sin(i+F/2)+n,b=g*Math.cos(s+F/2)+o,m=g*Math.sin(s+F/2)+n;e.lineTo(u,f),e.lineTo(b,m)}}e.closePath(),e.moveTo(0,0),e.rect(0,0,e.canvas.width,e.canvas.height),e.clip("evenodd")}function _d(e,t,i){const{startAngle:s,pixelMargin:o,x:n,y:a,outerRadius:r,innerRadius:l}=t;let c=o/r;e.beginPath(),e.arc(n,a,r,s-c,i+c),l>o?(c=o/l,e.arc(n,a,l,i+c,s-c,!0)):e.arc(n,a,o,i+Z,s-Z),e.closePath(),e.clip()}function kd(e){return Gs(e,["outerStart","outerEnd","innerStart","innerEnd"])}function Md(e,t,i,s){const o=kd(e.options.borderRadius),n=(i-t)/2,a=Math.min(n,s*t/2),r=l=>{const c=(i-Math.min(n,l))*s/2;return tt(l,0,Math.min(n,c))};return{outerStart:r(o.outerStart),outerEnd:r(o.outerEnd),innerStart:tt(o.innerStart,0,a),innerEnd:tt(o.innerEnd,0,a)}}function ke(e,t,i,s){return{x:i+e*Math.cos(t),y:s+e*Math.sin(t)}}function Bi(e,t,i,s,o,n){const{x:a,y:r,startAngle:l,pixelMargin:c,innerRadius:d}=t,p=Math.max(t.outerRadius+s+i-c,0),h=d>0?d+s+i+c:0;let g=0;const u=o-l;if(s){const H=d>0?d-s:0,Y=p>0?p-s:0,J=(H+Y)/2,_t=J!==0?u*J/(J+s):u;g=(u-_t)/2}const f=Math.max(.001,u*p-i/F)/p,b=(u-f)/2,m=l+b+g,x=o-b-g,{outerStart:w,outerEnd:y,innerStart:v,innerEnd:k}=Md(t,h,p,x-m),_=p-w,M=p-y,z=m+w/_,P=x-y/M,A=h+v,O=h+k,et=m+v/A,gt=x-k/O;if(e.beginPath(),n){const H=(z+P)/2;if(e.arc(a,r,p,z,H),e.arc(a,r,p,H,P),y>0){const it=ke(M,P,a,r);e.arc(it.x,it.y,y,P,x+Z)}const Y=ke(O,x,a,r);if(e.lineTo(Y.x,Y.y),k>0){const it=ke(O,gt,a,r);e.arc(it.x,it.y,k,x+Z,gt+Math.PI)}const J=(x-k/h+(m+v/h))/2;if(e.arc(a,r,h,x-k/h,J,!0),e.arc(a,r,h,J,m+v/h,!0),v>0){const it=ke(A,et,a,r);e.arc(it.x,it.y,v,et+Math.PI,m-Z)}const _t=ke(_,m,a,r);if(e.lineTo(_t.x,_t.y),w>0){const it=ke(_,z,a,r);e.arc(it.x,it.y,w,m-Z,z)}}else{e.moveTo(a,r);const H=Math.cos(z)*p+a,Y=Math.sin(z)*p+r;e.lineTo(H,Y);const J=Math.cos(P)*p+a,_t=Math.sin(P)*p+r;e.lineTo(J,_t)}e.closePath()}function zd(e,t,i,s,o){const{fullCircles:n,startAngle:a,circumference:r}=t;let l=t.endAngle;if(n){Bi(e,t,i,s,l,o);for(let c=0;c<n;++c)e.fill();isNaN(r)||(l=a+(r%G||G))}return Bi(e,t,i,s,l,o),e.fill(),l}function Sd(e,t,i,s,o){const{fullCircles:n,startAngle:a,circumference:r,options:l}=t,{borderWidth:c,borderJoinStyle:d,borderDash:p,borderDashOffset:h,borderRadius:g}=l,u=l.borderAlign==="inner";if(!c)return;e.setLineDash(p||[]),e.lineDashOffset=h,u?(e.lineWidth=c*2,e.lineJoin=d||"round"):(e.lineWidth=c,e.lineJoin=d||"bevel");let f=t.endAngle;if(n){Bi(e,t,i,s,f,o);for(let b=0;b<n;++b)e.stroke();isNaN(r)||(f=a+(r%G||G))}u&&_d(e,t,f),l.selfJoin&&f-a>=F&&g===0&&d!=="miter"&&$d(e,t,f),n||(Bi(e,t,i,s,f,o),e.stroke())}class We extends St{constructor(i){super();$(this,"circumference");$(this,"endAngle");$(this,"fullCircles");$(this,"innerRadius");$(this,"outerRadius");$(this,"pixelMargin");$(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,i&&Object.assign(this,i)}inRange(i,s,o){const n=this.getProps(["x","y"],o),{angle:a,distance:r}=qn(n,{x:i,y:s}),{startAngle:l,endAngle:c,innerRadius:d,outerRadius:p,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],o),g=(this.options.spacing+this.options.borderWidth)/2,u=C(h,c-l),f=ei(a,l,c)&&l!==c,b=u>=G||f,m=Ft(r,d+g,p+g);return b&&m}getCenterPoint(i){const{x:s,y:o,startAngle:n,endAngle:a,innerRadius:r,outerRadius:l}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],i),{offset:c,spacing:d}=this.options,p=(n+a)/2,h=(r+l+d+c)/2;return{x:s+Math.cos(p)*h,y:o+Math.sin(p)*h}}tooltipPosition(i){return this.getCenterPoint(i)}draw(i){const{options:s,circumference:o}=this,n=(s.offset||0)/4,a=(s.spacing||0)/2,r=s.circular;if(this.pixelMargin=s.borderAlign==="inner"?.33:0,this.fullCircles=o>G?Math.floor(o/G):0,o===0||this.innerRadius<0||this.outerRadius<0)return;i.save();const l=(this.startAngle+this.endAngle)/2;i.translate(Math.cos(l)*n,Math.sin(l)*n);const c=1-Math.sin(Math.min(F,o||0)),d=n*c;i.fillStyle=s.backgroundColor,i.strokeStyle=s.borderColor,zd(i,this,d,a,r),Sd(i,this,d,a,r),i.restore()}}$(We,"id","arc"),$(We,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),$(We,"defaultRoutes",{backgroundColor:"backgroundColor"}),$(We,"descriptors",{_scriptable:!0,_indexable:i=>i!=="borderDash"});function Pa(e,t,i=t){e.lineCap=C(i.borderCapStyle,t.borderCapStyle),e.setLineDash(C(i.borderDash,t.borderDash)),e.lineDashOffset=C(i.borderDashOffset,t.borderDashOffset),e.lineJoin=C(i.borderJoinStyle,t.borderJoinStyle),e.lineWidth=C(i.borderWidth,t.borderWidth),e.strokeStyle=C(i.borderColor,t.borderColor)}function Cd(e,t,i){e.lineTo(i.x,i.y)}function Pd(e){return e.stepped?Jr:e.tension||e.cubicInterpolationMode==="monotone"?Zr:Cd}function Ra(e,t,i={}){const s=e.length,{start:o=0,end:n=s-1}=i,{start:a,end:r}=t,l=Math.max(o,a),c=Math.min(n,r),d=o<a&&n<a||o>r&&n>r;return{count:s,start:l,loop:t.loop,ilen:c<l&&!d?s+c-l:c-l}}function Rd(e,t,i,s){const{points:o,options:n}=t,{count:a,start:r,loop:l,ilen:c}=Ra(o,i,s),d=Pd(n);let{move:p=!0,reverse:h}=s||{},g,u,f;for(g=0;g<=c;++g)u=o[(r+(h?c-g:g))%a],!u.skip&&(p?(e.moveTo(u.x,u.y),p=!1):d(e,f,u,h,n.stepped),f=u);return l&&(u=o[(r+(h?c:0))%a],d(e,f,u,h,n.stepped)),!!l}function Ad(e,t,i,s){const o=t.points,{count:n,start:a,ilen:r}=Ra(o,i,s),{move:l=!0,reverse:c}=s||{};let d=0,p=0,h,g,u,f,b,m;const x=y=>(a+(c?r-y:y))%n,w=()=>{f!==b&&(e.lineTo(d,b),e.lineTo(d,f),e.lineTo(d,m))};for(l&&(g=o[x(0)],e.moveTo(g.x,g.y)),h=0;h<=r;++h){if(g=o[x(h)],g.skip)continue;const y=g.x,v=g.y,k=y|0;k===u?(v<f?f=v:v>b&&(b=v),d=(p*d+y)/++p):(w(),e.lineTo(y,v),u=k,p=0,f=b=v),m=v}w()}function zs(e){const t=e.options,i=t.borderDash&&t.borderDash.length;return!e._decimated&&!e._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!i?Ad:Rd}function Dd(e){return e.stepped?Rl:e.tension||e.cubicInterpolationMode==="monotone"?Al:pe}function Td(e,t,i,s){let o=t._path;o||(o=t._path=new Path2D,t.path(o,i,s)&&o.closePath()),Pa(e,t.options),e.stroke(o)}function Ed(e,t,i,s){const{segments:o,options:n}=t,a=zs(t);for(const r of o)Pa(e,n,r.style),e.beginPath(),a(e,t,r,{start:i,end:i+s-1})&&e.closePath(),e.stroke()}const Ld=typeof Path2D=="function";function Od(e,t,i,s){Ld&&!t.options.segment?Td(e,t,i,s):Ed(e,t,i,s)}class Ut extends St{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,i){const s=this.options;if((s.tension||s.cubicInterpolationMode==="monotone")&&!s.stepped&&!this._pointsUpdated){const o=s.spanGaps?this._loop:this._fullLoop;$l(this._points,s,t,o,i),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=Il(this,this.options.segment))}first(){const t=this.segments,i=this.points;return t.length&&i[t[0].start]}last(){const t=this.segments,i=this.points,s=t.length;return s&&i[t[s-1].end]}interpolate(t,i){const s=this.options,o=t[i],n=this.points,a=fa(this,{property:i,start:o,end:o});if(!a.length)return;const r=[],l=Dd(s);let c,d;for(c=0,d=a.length;c<d;++c){const{start:p,end:h}=a[c],g=n[p],u=n[h];if(g===u){r.push(g);continue}const f=Math.abs((o-g[i])/(u[i]-g[i])),b=l(g,u,f,s.stepped);b[i]=t[i],r.push(b)}return r.length===1?r[0]:r}pathSegment(t,i,s){return zs(this)(t,this,i,s)}path(t,i,s){const o=this.segments,n=zs(this);let a=this._loop;i=i||0,s=s||this.points.length-i;for(const r of o)a&=n(t,this,r,{start:i,end:i+s-1});return!!a}draw(t,i,s,o){const n=this.options||{};(this.points||[]).length&&n.borderWidth&&(t.save(),Od(t,this,s,o),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}$(Ut,"id","line"),$(Ut,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),$(Ut,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),$(Ut,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function Qo(e,t,i,s){const o=e.options,{[i]:n}=e.getProps([i],s);return Math.abs(t-n)<o.radius+o.hitRadius}class Ai extends St{constructor(i){super();$(this,"parsed");$(this,"skip");$(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,i&&Object.assign(this,i)}inRange(i,s,o){const n=this.options,{x:a,y:r}=this.getProps(["x","y"],o);return Math.pow(i-a,2)+Math.pow(s-r,2)<Math.pow(n.hitRadius+n.radius,2)}inXRange(i,s){return Qo(this,i,"x",s)}inYRange(i,s){return Qo(this,i,"y",s)}getCenterPoint(i){const{x:s,y:o}=this.getProps(["x","y"],i);return{x:s,y:o}}size(i){i=i||this.options||{};let s=i.radius||0;s=Math.max(s,s&&i.hoverRadius||0);const o=s&&i.borderWidth||0;return(s+o)*2}draw(i,s){const o=this.options;this.skip||o.radius<.1||!Vt(this,s,this.size(o)/2)||(i.strokeStyle=o.borderColor,i.lineWidth=o.borderWidth,i.fillStyle=o.backgroundColor,$s(i,o,this.x,this.y))}getRange(){const i=this.options||{};return i.radius+i.hitRadius}}$(Ai,"id","point"),$(Ai,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),$(Ai,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Aa(e,t){const{x:i,y:s,base:o,width:n,height:a}=e.getProps(["x","y","base","width","height"],t);let r,l,c,d,p;return e.horizontal?(p=a/2,r=Math.min(i,o),l=Math.max(i,o),c=s-p,d=s+p):(p=n/2,r=i-p,l=i+p,c=Math.min(s,o),d=Math.max(s,o)),{left:r,top:c,right:l,bottom:d}}function qt(e,t,i,s){return e?0:tt(t,i,s)}function Id(e,t,i){const s=e.options.borderWidth,o=e.borderSkipped,n=oa(s);return{t:qt(o.top,n.top,0,i),r:qt(o.right,n.right,0,t),b:qt(o.bottom,n.bottom,0,i),l:qt(o.left,n.left,0,t)}}function jd(e,t,i){const{enableBorderRadius:s}=e.getProps(["enableBorderRadius"]),o=e.options.borderRadius,n=fe(o),a=Math.min(t,i),r=e.borderSkipped,l=s||E(o);return{topLeft:qt(!l||r.top||r.left,n.topLeft,0,a),topRight:qt(!l||r.top||r.right,n.topRight,0,a),bottomLeft:qt(!l||r.bottom||r.left,n.bottomLeft,0,a),bottomRight:qt(!l||r.bottom||r.right,n.bottomRight,0,a)}}function Fd(e){const t=Aa(e),i=t.right-t.left,s=t.bottom-t.top,o=Id(e,i/2,s/2),n=jd(e,i/2,s/2);return{outer:{x:t.left,y:t.top,w:i,h:s,radius:n},inner:{x:t.left+o.l,y:t.top+o.t,w:i-o.l-o.r,h:s-o.t-o.b,radius:{topLeft:Math.max(0,n.topLeft-Math.max(o.t,o.l)),topRight:Math.max(0,n.topRight-Math.max(o.t,o.r)),bottomLeft:Math.max(0,n.bottomLeft-Math.max(o.b,o.l)),bottomRight:Math.max(0,n.bottomRight-Math.max(o.b,o.r))}}}}function ls(e,t,i,s){const o=t===null,n=i===null,r=e&&!(o&&n)&&Aa(e,s);return r&&(o||Ft(t,r.left,r.right))&&(n||Ft(i,r.top,r.bottom))}function Bd(e){return e.topLeft||e.topRight||e.bottomLeft||e.bottomRight}function Vd(e,t){e.rect(t.x,t.y,t.w,t.h)}function cs(e,t,i={}){const s=e.x!==i.x?-t:0,o=e.y!==i.y?-t:0,n=(e.x+e.w!==i.x+i.w?t:0)-s,a=(e.y+e.h!==i.y+i.h?t:0)-o;return{x:e.x+s,y:e.y+o,w:e.w+n,h:e.h+a,radius:e.radius}}class Di extends St{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:i,options:{borderColor:s,backgroundColor:o}}=this,{inner:n,outer:a}=Fd(this),r=Bd(a.radius)?ii:Vd;t.save(),(a.w!==n.w||a.h!==n.h)&&(t.beginPath(),r(t,cs(a,i,n)),t.clip(),r(t,cs(n,-i,a)),t.fillStyle=s,t.fill("evenodd")),t.beginPath(),r(t,cs(n,i)),t.fillStyle=o,t.fill(),t.restore()}inRange(t,i,s){return ls(this,t,i,s)}inXRange(t,i){return ls(this,t,null,i)}inYRange(t,i){return ls(this,null,t,i)}getCenterPoint(t){const{x:i,y:s,base:o,horizontal:n}=this.getProps(["x","y","base","horizontal"],t);return{x:n?(i+o)/2:i,y:n?s:(s+o)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}$(Di,"id","bar"),$(Di,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),$(Di,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var Hd=Object.freeze({__proto__:null,ArcElement:We,BarElement:Di,LineElement:Ut,PointElement:Ai});const Ss=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],tn=Ss.map(e=>e.replace("rgb(","rgba(").replace(")",", 0.5)"));function Da(e){return Ss[e%Ss.length]}function Ta(e){return tn[e%tn.length]}function Nd(e,t){return e.borderColor=Da(t),e.backgroundColor=Ta(t),++t}function Wd(e,t){return e.backgroundColor=e.data.map(()=>Da(t++)),t}function Gd(e,t){return e.backgroundColor=e.data.map(()=>Ta(t++)),t}function Yd(e){let t=0;return(i,s)=>{const o=e.getDatasetMeta(s).controller;o instanceof he?t=Wd(i,t):o instanceof Je?t=Gd(i,t):o&&(t=Nd(i,t))}}function en(e){let t;for(t in e)if(e[t].borderColor||e[t].backgroundColor)return!0;return!1}function Xd(e){return e&&(e.borderColor||e.backgroundColor)}function Ud(){return U.borderColor!=="rgba(0,0,0,0.1)"||U.backgroundColor!=="rgba(0,0,0,0.1)"}var qd={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(e,t,i){if(!i.enabled)return;const{data:{datasets:s},options:o}=e.config,{elements:n}=o,a=en(s)||Xd(o)||n&&en(n)||Ud();if(!i.forceOverride&&a)return;const r=Yd(e);s.forEach(r)}};function Kd(e,t,i,s,o){const n=o.samples||s;if(n>=i)return e.slice(t,t+i);const a=[],r=(i-2)/(n-2);let l=0;const c=t+i-1;let d=t,p,h,g,u,f;for(a[l++]=e[d],p=0;p<n-2;p++){let b=0,m=0,x;const w=Math.floor((p+1)*r)+1+t,y=Math.min(Math.floor((p+2)*r)+1,i)+t,v=y-w;for(x=w;x<y;x++)b+=e[x].x,m+=e[x].y;b/=v,m/=v;const k=Math.floor(p*r)+1+t,_=Math.min(Math.floor((p+1)*r)+1,i)+t,{x:M,y:z}=e[d];for(g=u=-1,x=k;x<_;x++)u=.5*Math.abs((M-b)*(e[x].y-z)-(M-e[x].x)*(m-z)),u>g&&(g=u,h=e[x],f=x);a[l++]=h,d=f}return a[l++]=e[c],a}function Jd(e,t,i,s){let o=0,n=0,a,r,l,c,d,p,h,g,u,f;const b=[],m=t+i-1,x=e[t].x,y=e[m].x-x;for(a=t;a<t+i;++a){r=e[a],l=(r.x-x)/y*s,c=r.y;const v=l|0;if(v===d)c<u?(u=c,p=a):c>f&&(f=c,h=a),o=(n*o+r.x)/++n;else{const k=a-1;if(!T(p)&&!T(h)){const _=Math.min(p,h),M=Math.max(p,h);_!==g&&_!==k&&b.push({...e[_],x:o}),M!==g&&M!==k&&b.push({...e[M],x:o})}a>0&&k!==g&&b.push(e[k]),b.push(r),d=v,n=0,u=f=c,p=h=g=a}}return b}function Ea(e){if(e._decimated){const t=e._data;delete e._decimated,delete e._data,Object.defineProperty(e,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function sn(e){e.data.datasets.forEach(t=>{Ea(t)})}function Zd(e,t){const i=t.length;let s=0,o;const{iScale:n}=e,{min:a,max:r,minDefined:l,maxDefined:c}=n.getUserBounds();return l&&(s=tt(Bt(t,n.axis,a).lo,0,i-1)),c?o=tt(Bt(t,n.axis,r).hi+1,s,i)-s:o=i-s,{start:s,count:o}}var Qd={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(e,t,i)=>{if(!i.enabled){sn(e);return}const s=e.width;e.data.datasets.forEach((o,n)=>{const{_data:a,indexAxis:r}=o,l=e.getDatasetMeta(n),c=a||o.data;if(He([r,e.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const d=e.scales[l.xAxisID];if(d.type!=="linear"&&d.type!=="time"||e.options.parsing)return;let{start:p,count:h}=Zd(l,c);const g=i.threshold||4*s;if(h<=g){Ea(o);return}T(a)&&(o._data=c,delete o.data,Object.defineProperty(o,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(f){this._data=f}}));let u;switch(i.algorithm){case"lttb":u=Kd(c,p,h,s,i);break;case"min-max":u=Jd(c,p,h,s);break;default:throw new Error(`Unsupported decimation algorithm '${i.algorithm}'`)}o._decimated=u})},destroy(e){sn(e)}};function tp(e,t,i){const s=e.segments,o=e.points,n=t.points,a=[];for(const r of s){let{start:l,end:c}=r;c=Ui(l,c,o);const d=Cs(i,o[l],o[c],r.loop);if(!t.segments){a.push({source:r,target:d,start:o[l],end:o[c]});continue}const p=fa(t,d);for(const h of p){const g=Cs(i,n[h.start],n[h.end],h.loop),u=ua(r,o,g);for(const f of u)a.push({source:f,target:h,start:{[i]:on(d,g,"start",Math.max)},end:{[i]:on(d,g,"end",Math.min)}})}}return a}function Cs(e,t,i,s){if(s)return;let o=t[e],n=i[e];return e==="angle"&&(o=nt(o),n=nt(n)),{property:e,start:o,end:n}}function ep(e,t){const{x:i=null,y:s=null}=e||{},o=t.points,n=[];return t.segments.forEach(({start:a,end:r})=>{r=Ui(a,r,o);const l=o[a],c=o[r];s!==null?(n.push({x:l.x,y:s}),n.push({x:c.x,y:s})):i!==null&&(n.push({x:i,y:l.y}),n.push({x:i,y:c.y}))}),n}function Ui(e,t,i){for(;t>e;t--){const s=i[t];if(!isNaN(s.x)&&!isNaN(s.y))break}return t}function on(e,t,i,s){return e&&t?s(e[i],t[i]):e?e[i]:t?t[i]:0}function La(e,t){let i=[],s=!1;return X(e)?(s=!0,i=e):i=ep(e,t),i.length?new Ut({points:i,options:{tension:0},_loop:s,_fullLoop:s}):null}function nn(e){return e&&e.fill!==!1}function ip(e,t,i){let o=e[t].fill;const n=[t];let a;if(!i)return o;for(;o!==!1&&n.indexOf(o)===-1;){if(!K(o))return o;if(a=e[o],!a)return!1;if(a.visible)return o;n.push(o),o=a.fill}return!1}function sp(e,t,i){const s=rp(e);if(E(s))return isNaN(s.value)?!1:s;let o=parseFloat(s);return K(o)&&Math.floor(o)===o?op(s[0],t,o,i):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}function op(e,t,i,s){return(e==="-"||e==="+")&&(i=t+i),i===t||i<0||i>=s?!1:i}function np(e,t){let i=null;return e==="start"?i=t.bottom:e==="end"?i=t.top:E(e)?i=t.getPixelForValue(e.value):t.getBasePixel&&(i=t.getBasePixel()),i}function ap(e,t,i){let s;return e==="start"?s=i:e==="end"?s=t.options.reverse?t.min:t.max:E(e)?s=e.value:s=t.getBaseValue(),s}function rp(e){const t=e.options,i=t.fill;let s=C(i&&i.target,i);return s===void 0&&(s=!!t.backgroundColor),s===!1||s===null?!1:s===!0?"origin":s}function lp(e){const{scale:t,index:i,line:s}=e,o=[],n=s.segments,a=s.points,r=cp(t,i);r.push(La({x:null,y:t.bottom},s));for(let l=0;l<n.length;l++){const c=n[l];for(let d=c.start;d<=c.end;d++)dp(o,a[d],r)}return new Ut({points:o,options:{}})}function cp(e,t){const i=[],s=e.getMatchingVisibleMetas("line");for(let o=0;o<s.length;o++){const n=s[o];if(n.index===t)break;n.hidden||i.unshift(n.dataset)}return i}function dp(e,t,i){const s=[];for(let o=0;o<i.length;o++){const n=i[o],{first:a,last:r,point:l}=pp(n,t,"x");if(!(!l||a&&r)){if(a)s.unshift(l);else if(e.push(l),!r)break}}e.push(...s)}function pp(e,t,i){const s=e.interpolate(t,i);if(!s)return{};const o=s[i],n=e.segments,a=e.points;let r=!1,l=!1;for(let c=0;c<n.length;c++){const d=n[c],p=a[d.start][i],h=a[d.end][i];if(Ft(o,p,h)){r=o===p,l=o===h;break}}return{first:r,last:l,point:s}}class Oa{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,i,s){const{x:o,y:n,radius:a}=this;return i=i||{start:0,end:G},t.arc(o,n,a,i.end,i.start,!0),!s.bounds}interpolate(t){const{x:i,y:s,radius:o}=this,n=t.angle;return{x:i+Math.cos(n)*o,y:s+Math.sin(n)*o,angle:n}}}function hp(e){const{chart:t,fill:i,line:s}=e;if(K(i))return gp(t,i);if(i==="stack")return lp(e);if(i==="shape")return!0;const o=up(e);return o instanceof Oa?o:La(o,s)}function gp(e,t){const i=e.getDatasetMeta(t);return i&&e.isDatasetVisible(t)?i.dataset:null}function up(e){return(e.scale||{}).getPointPositionForValue?bp(e):fp(e)}function fp(e){const{scale:t={},fill:i}=e,s=np(i,t);if(K(s)){const o=t.isHorizontal();return{x:o?s:null,y:o?null:s}}return null}function bp(e){const{scale:t,fill:i}=e,s=t.options,o=t.getLabels().length,n=s.reverse?t.max:t.min,a=ap(i,t,n),r=[];if(s.grid.circular){const l=t.getPointPositionForValue(0,n);return new Oa({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(a)})}for(let l=0;l<o;++l)r.push(t.getPointPositionForValue(l,a));return r}function ds(e,t,i){const s=hp(t),{chart:o,index:n,line:a,scale:r,axis:l}=t,c=a.options,d=c.fill,p=c.backgroundColor,{above:h=p,below:g=p}=d||{},u=o.getDatasetMeta(n),f=ba(o,u);s&&a.points.length&&(Wi(e,i),mp(e,{line:a,target:s,above:h,below:g,area:i,scale:r,axis:l,clip:f}),Gi(e))}function mp(e,t){const{line:i,target:s,above:o,below:n,area:a,scale:r,clip:l}=t,c=i._loop?"angle":t.axis;e.save();let d=n;n!==o&&(c==="x"?(an(e,s,a.top),ps(e,{line:i,target:s,color:o,scale:r,property:c,clip:l}),e.restore(),e.save(),an(e,s,a.bottom)):c==="y"&&(rn(e,s,a.left),ps(e,{line:i,target:s,color:n,scale:r,property:c,clip:l}),e.restore(),e.save(),rn(e,s,a.right),d=o)),ps(e,{line:i,target:s,color:d,scale:r,property:c,clip:l}),e.restore()}function an(e,t,i){const{segments:s,points:o}=t;let n=!0,a=!1;e.beginPath();for(const r of s){const{start:l,end:c}=r,d=o[l],p=o[Ui(l,c,o)];n?(e.moveTo(d.x,d.y),n=!1):(e.lineTo(d.x,i),e.lineTo(d.x,d.y)),a=!!t.pathSegment(e,r,{move:a}),a?e.closePath():e.lineTo(p.x,i)}e.lineTo(t.first().x,i),e.closePath(),e.clip()}function rn(e,t,i){const{segments:s,points:o}=t;let n=!0,a=!1;e.beginPath();for(const r of s){const{start:l,end:c}=r,d=o[l],p=o[Ui(l,c,o)];n?(e.moveTo(d.x,d.y),n=!1):(e.lineTo(i,d.y),e.lineTo(d.x,d.y)),a=!!t.pathSegment(e,r,{move:a}),a?e.closePath():e.lineTo(i,p.y)}e.lineTo(i,t.first().y),e.closePath(),e.clip()}function ps(e,t){const{line:i,target:s,property:o,color:n,scale:a,clip:r}=t,l=tp(i,s,o);for(const{source:c,target:d,start:p,end:h}of l){const{style:{backgroundColor:g=n}={}}=c,u=s!==!0;e.save(),e.fillStyle=g,xp(e,a,r,u&&Cs(o,p,h)),e.beginPath();const f=!!i.pathSegment(e,c);let b;if(u){f?e.closePath():ln(e,s,h,o);const m=!!s.pathSegment(e,d,{move:f,reverse:!0});b=f&&m,b||ln(e,s,p,o)}e.closePath(),e.fill(b?"evenodd":"nonzero"),e.restore()}}function xp(e,t,i,s){const o=t.chart.chartArea,{property:n,start:a,end:r}=s||{};if(n==="x"||n==="y"){let l,c,d,p;n==="x"?(l=a,c=o.top,d=r,p=o.bottom):(l=o.left,c=a,d=o.right,p=r),e.beginPath(),i&&(l=Math.max(l,i.left),d=Math.min(d,i.right),c=Math.max(c,i.top),p=Math.min(p,i.bottom)),e.rect(l,c,d-l,p-c),e.clip()}}function ln(e,t,i,s){const o=t.interpolate(i,s);o&&e.lineTo(o.x,o.y)}var vp={id:"filler",afterDatasetsUpdate(e,t,i){const s=(e.data.datasets||[]).length,o=[];let n,a,r,l;for(a=0;a<s;++a)n=e.getDatasetMeta(a),r=n.dataset,l=null,r&&r.options&&r instanceof Ut&&(l={visible:e.isDatasetVisible(a),index:a,fill:sp(r,a,s),chart:e,axis:n.controller.options.indexAxis,scale:n.vScale,line:r}),n.$filler=l,o.push(l);for(a=0;a<s;++a)l=o[a],!(!l||l.fill===!1)&&(l.fill=ip(o,a,i.propagate))},beforeDraw(e,t,i){const s=i.drawTime==="beforeDraw",o=e.getSortedVisibleDatasetMetas(),n=e.chartArea;for(let a=o.length-1;a>=0;--a){const r=o[a].$filler;r&&(r.line.updateControlPoints(n,r.axis),s&&r.fill&&ds(e.ctx,r,n))}},beforeDatasetsDraw(e,t,i){if(i.drawTime!=="beforeDatasetsDraw")return;const s=e.getSortedVisibleDatasetMetas();for(let o=s.length-1;o>=0;--o){const n=s[o].$filler;nn(n)&&ds(e.ctx,n,e.chartArea)}},beforeDatasetDraw(e,t,i){const s=t.meta.$filler;!nn(s)||i.drawTime!=="beforeDatasetDraw"||ds(e.ctx,s,e.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const cn=(e,t)=>{let{boxHeight:i=t,boxWidth:s=t}=e;return e.usePointStyle&&(i=Math.min(i,t),s=e.pointStyleWidth||Math.min(s,t)),{boxWidth:s,boxHeight:i,itemHeight:Math.max(t,i)}},yp=(e,t)=>e!==null&&t!==null&&e.datasetIndex===t.datasetIndex&&e.index===t.index;class dn extends St{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,i,s){this.maxWidth=t,this.maxHeight=i,this._margins=s,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let i=W(t.generateLabels,[this.chart],this)||[];t.filter&&(i=i.filter(s=>t.filter(s,this.chart.data))),t.sort&&(i=i.sort((s,o)=>t.sort(s,o,this.chart.data))),this.options.reverse&&i.reverse(),this.legendItems=i}fit(){const{options:t,ctx:i}=this;if(!t.display){this.width=this.height=0;return}const s=t.labels,o=Q(s.font),n=o.size,a=this._computeTitleHeight(),{boxWidth:r,itemHeight:l}=cn(s,n);let c,d;i.font=o.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(a,n,r,l)+10):(d=this.maxHeight,c=this._fitCols(a,o,r,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,i,s,o){const{ctx:n,maxWidth:a,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=o+r;let p=t;n.textAlign="left",n.textBaseline="middle";let h=-1,g=-d;return this.legendItems.forEach((u,f)=>{const b=s+i/2+n.measureText(u.text).width;(f===0||c[c.length-1]+b+2*r>a)&&(p+=d,c[c.length-(f>0?0:1)]=0,g+=d,h++),l[f]={left:0,top:g,row:h,width:b,height:o},c[c.length-1]+=b+r}),p}_fitCols(t,i,s,o){const{ctx:n,maxHeight:a,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=a-t;let p=r,h=0,g=0,u=0,f=0;return this.legendItems.forEach((b,m)=>{const{itemWidth:x,itemHeight:w}=wp(s,i,n,b,o);m>0&&g+w+2*r>d&&(p+=h+r,c.push({width:h,height:g}),u+=h+r,f++,h=g=0),l[m]={left:u,top:g,col:f,width:x,height:w},h=Math.max(h,x),g+=w+r}),p+=h,c.push({width:h,height:g}),p}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:i,options:{align:s,labels:{padding:o},rtl:n}}=this,a=Se(n,this.left,this.width);if(this.isHorizontal()){let r=0,l=ot(s,this.left+o,this.right-this.lineWidths[r]);for(const c of i)r!==c.row&&(r=c.row,l=ot(s,this.left+o,this.right-this.lineWidths[r])),c.top+=this.top+t+o,c.left=a.leftForLtr(a.x(l),c.width),l+=c.width+o}else{let r=0,l=ot(s,this.top+t+o,this.bottom-this.columnSizes[r].height);for(const c of i)c.col!==r&&(r=c.col,l=ot(s,this.top+t+o,this.bottom-this.columnSizes[r].height)),c.top=l,c.left+=this.left+o,c.left=a.leftForLtr(a.x(c.left),c.width),l+=c.height+o}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Wi(t,this),this._draw(),Gi(t)}}_draw(){const{options:t,columnSizes:i,lineWidths:s,ctx:o}=this,{align:n,labels:a}=t,r=U.color,l=Se(t.rtl,this.left,this.width),c=Q(a.font),{padding:d}=a,p=c.size,h=p/2;let g;this.drawTitle(),o.textAlign=l.textAlign("left"),o.textBaseline="middle",o.lineWidth=.5,o.font=c.string;const{boxWidth:u,boxHeight:f,itemHeight:b}=cn(a,p),m=function(k,_,M){if(isNaN(u)||u<=0||isNaN(f)||f<0)return;o.save();const z=C(M.lineWidth,1);if(o.fillStyle=C(M.fillStyle,r),o.lineCap=C(M.lineCap,"butt"),o.lineDashOffset=C(M.lineDashOffset,0),o.lineJoin=C(M.lineJoin,"miter"),o.lineWidth=z,o.strokeStyle=C(M.strokeStyle,r),o.setLineDash(C(M.lineDash,[])),a.usePointStyle){const P={radius:f*Math.SQRT2/2,pointStyle:M.pointStyle,rotation:M.rotation,borderWidth:z},A=l.xPlus(k,u/2),O=_+h;sa(o,P,A,O,a.pointStyleWidth&&u)}else{const P=_+Math.max((p-f)/2,0),A=l.leftForLtr(k,u),O=fe(M.borderRadius);o.beginPath(),Object.values(O).some(et=>et!==0)?ii(o,{x:A,y:P,w:u,h:f,radius:O}):o.rect(A,P,u,f),o.fill(),z!==0&&o.stroke()}o.restore()},x=function(k,_,M){xe(o,M.text,k,_+b/2,c,{strikethrough:M.hidden,textAlign:l.textAlign(M.textAlign)})},w=this.isHorizontal(),y=this._computeTitleHeight();w?g={x:ot(n,this.left+d,this.right-s[0]),y:this.top+d+y,line:0}:g={x:this.left+d,y:ot(n,this.top+y+d,this.bottom-i[0].height),line:0},pa(this.ctx,t.textDirection);const v=b+d;this.legendItems.forEach((k,_)=>{o.strokeStyle=k.fontColor,o.fillStyle=k.fontColor;const M=o.measureText(k.text).width,z=l.textAlign(k.textAlign||(k.textAlign=a.textAlign)),P=u+h+M;let A=g.x,O=g.y;l.setWidth(this.width),w?_>0&&A+P+d>this.right&&(O=g.y+=v,g.line++,A=g.x=ot(n,this.left+d,this.right-s[g.line])):_>0&&O+v>this.bottom&&(A=g.x=A+i[g.line].width+d,g.line++,O=g.y=ot(n,this.top+y+d,this.bottom-i[g.line].height));const et=l.x(A);if(m(et,O,k),A=Br(z,A+u+h,w?A+P:this.right,t.rtl),x(l.x(A),O,k),w)g.x+=P+d;else if(typeof k.text!="string"){const gt=c.lineHeight;g.y+=Ia(k,gt)+d}else g.y+=v}),ha(this.ctx,t.textDirection)}drawTitle(){const t=this.options,i=t.title,s=Q(i.font),o=rt(i.padding);if(!i.display)return;const n=Se(t.rtl,this.left,this.width),a=this.ctx,r=i.position,l=s.size/2,c=o.top+l;let d,p=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+c,p=ot(t.align,p,this.right-h);else{const u=this.columnSizes.reduce((f,b)=>Math.max(f,b.height),0);d=c+ot(t.align,this.top,this.bottom-u-t.labels.padding-this._computeTitleHeight())}const g=ot(r,p,p+h);a.textAlign=n.textAlign(Ns(r)),a.textBaseline="middle",a.strokeStyle=i.color,a.fillStyle=i.color,a.font=s.string,xe(a,i.text,g,d,s)}_computeTitleHeight(){const t=this.options.title,i=Q(t.font),s=rt(t.padding);return t.display?i.lineHeight+s.height:0}_getLegendItemAt(t,i){let s,o,n;if(Ft(t,this.left,this.right)&&Ft(i,this.top,this.bottom)){for(n=this.legendHitBoxes,s=0;s<n.length;++s)if(o=n[s],Ft(t,o.left,o.left+o.width)&&Ft(i,o.top,o.top+o.height))return this.legendItems[s]}return null}handleEvent(t){const i=this.options;if(!kp(t.type,i))return;const s=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const o=this._hoveredItem,n=yp(o,s);o&&!n&&W(i.onLeave,[t,o,this],this),this._hoveredItem=s,s&&!n&&W(i.onHover,[t,s,this],this)}else s&&W(i.onClick,[t,s,this],this)}}function wp(e,t,i,s,o){const n=$p(s,e,t,i),a=_p(o,s,t.lineHeight);return{itemWidth:n,itemHeight:a}}function $p(e,t,i,s){let o=e.text;return o&&typeof o!="string"&&(o=o.reduce((n,a)=>n.length>a.length?n:a)),t+i.size/2+s.measureText(o).width}function _p(e,t,i){let s=e;return typeof t.text!="string"&&(s=Ia(t,i)),s}function Ia(e,t){const i=e.text?e.text.length:0;return t*i}function kp(e,t){return!!((e==="mousemove"||e==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(e==="click"||e==="mouseup"))}var Mp={id:"legend",_element:dn,start(e,t,i){const s=e.legend=new dn({ctx:e.ctx,options:i,chart:e});at.configure(e,s,i),at.addBox(e,s)},stop(e){at.removeBox(e,e.legend),delete e.legend},beforeUpdate(e,t,i){const s=e.legend;at.configure(e,s,i),s.options=i},afterUpdate(e){const t=e.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(e,t){t.replay||e.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(e,t,i){const s=t.datasetIndex,o=i.chart;o.isDatasetVisible(s)?(o.hide(s),t.hidden=!0):(o.show(s),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:e=>e.chart.options.color,boxWidth:40,padding:10,generateLabels(e){const t=e.data.datasets,{labels:{usePointStyle:i,pointStyle:s,textAlign:o,color:n,useBorderRadius:a,borderRadius:r}}=e.legend.options;return e._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(i?0:void 0),d=rt(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:n,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:s||c.pointStyle,rotation:c.rotation,textAlign:o||c.textAlign,borderRadius:a&&(r||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:e=>e.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:e=>!e.startsWith("on"),labels:{_scriptable:e=>!["generateLabels","filter","sort"].includes(e)}}};class Zs extends St{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,i){const s=this.options;if(this.left=0,this.top=0,!s.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=i;const o=X(s.text)?s.text.length:1;this._padding=rt(s.padding);const n=o*Q(s.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=n:this.width=n}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:i,left:s,bottom:o,right:n,options:a}=this,r=a.align;let l=0,c,d,p;return this.isHorizontal()?(d=ot(r,s,n),p=i+t,c=n-s):(a.position==="left"?(d=s+t,p=ot(r,o,i),l=F*-.5):(d=n-t,p=ot(r,i,o),l=F*.5),c=o-i),{titleX:d,titleY:p,maxWidth:c,rotation:l}}draw(){const t=this.ctx,i=this.options;if(!i.display)return;const s=Q(i.font),n=s.lineHeight/2+this._padding.top,{titleX:a,titleY:r,maxWidth:l,rotation:c}=this._drawArgs(n);xe(t,i.text,0,0,s,{color:i.color,maxWidth:l,rotation:c,textAlign:Ns(i.align),textBaseline:"middle",translation:[a,r]})}}function zp(e,t){const i=new Zs({ctx:e.ctx,options:t,chart:e});at.configure(e,i,t),at.addBox(e,i),e.titleBlock=i}var Sp={id:"title",_element:Zs,start(e,t,i){zp(e,i)},stop(e){const t=e.titleBlock;at.removeBox(e,t),delete e.titleBlock},beforeUpdate(e,t,i){const s=e.titleBlock;at.configure(e,s,i),s.options=i},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const yi=new WeakMap;var Cp={id:"subtitle",start(e,t,i){const s=new Zs({ctx:e.ctx,options:i,chart:e});at.configure(e,s,i),at.addBox(e,s),yi.set(e,s)},stop(e){at.removeBox(e,yi.get(e)),yi.delete(e)},beforeUpdate(e,t,i){const s=yi.get(e);at.configure(e,s,i),s.options=i},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const Ge={average(e){if(!e.length)return!1;let t,i,s=new Set,o=0,n=0;for(t=0,i=e.length;t<i;++t){const r=e[t].element;if(r&&r.hasValue()){const l=r.tooltipPosition();s.add(l.x),o+=l.y,++n}}return n===0||s.size===0?!1:{x:[...s].reduce((r,l)=>r+l)/s.size,y:o/n}},nearest(e,t){if(!e.length)return!1;let i=t.x,s=t.y,o=Number.POSITIVE_INFINITY,n,a,r;for(n=0,a=e.length;n<a;++n){const l=e[n].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=ys(t,c);d<o&&(o=d,r=l)}}if(r){const l=r.tooltipPosition();i=l.x,s=l.y}return{x:i,y:s}}};function Pt(e,t){return t&&(X(t)?Array.prototype.push.apply(e,t):e.push(t)),e}function Lt(e){return(typeof e=="string"||e instanceof String)&&e.indexOf(`
`)>-1?e.split(`
`):e}function Pp(e,t){const{element:i,datasetIndex:s,index:o}=t,n=e.getDatasetMeta(s).controller,{label:a,value:r}=n.getLabelAndValue(o);return{chart:e,label:a,parsed:n.getParsed(o),raw:e.data.datasets[s].data[o],formattedValue:r,dataset:n.getDataset(),dataIndex:o,datasetIndex:s,element:i}}function pn(e,t){const i=e.chart.ctx,{body:s,footer:o,title:n}=e,{boxWidth:a,boxHeight:r}=t,l=Q(t.bodyFont),c=Q(t.titleFont),d=Q(t.footerFont),p=n.length,h=o.length,g=s.length,u=rt(t.padding);let f=u.height,b=0,m=s.reduce((y,v)=>y+v.before.length+v.lines.length+v.after.length,0);if(m+=e.beforeBody.length+e.afterBody.length,p&&(f+=p*c.lineHeight+(p-1)*t.titleSpacing+t.titleMarginBottom),m){const y=t.displayColors?Math.max(r,l.lineHeight):l.lineHeight;f+=g*y+(m-g)*l.lineHeight+(m-1)*t.bodySpacing}h&&(f+=t.footerMarginTop+h*d.lineHeight+(h-1)*t.footerSpacing);let x=0;const w=function(y){b=Math.max(b,i.measureText(y).width+x)};return i.save(),i.font=c.string,V(e.title,w),i.font=l.string,V(e.beforeBody.concat(e.afterBody),w),x=t.displayColors?a+2+t.boxPadding:0,V(s,y=>{V(y.before,w),V(y.lines,w),V(y.after,w)}),x=0,i.font=d.string,V(e.footer,w),i.restore(),b+=u.width,{width:b,height:f}}function Rp(e,t){const{y:i,height:s}=t;return i<s/2?"top":i>e.height-s/2?"bottom":"center"}function Ap(e,t,i,s){const{x:o,width:n}=s,a=i.caretSize+i.caretPadding;if(e==="left"&&o+n+a>t.width||e==="right"&&o-n-a<0)return!0}function Dp(e,t,i,s){const{x:o,width:n}=i,{width:a,chartArea:{left:r,right:l}}=e;let c="center";return s==="center"?c=o<=(r+l)/2?"left":"right":o<=n/2?c="left":o>=a-n/2&&(c="right"),Ap(c,e,t,i)&&(c="center"),c}function hn(e,t,i){const s=i.yAlign||t.yAlign||Rp(e,i);return{xAlign:i.xAlign||t.xAlign||Dp(e,t,i,s),yAlign:s}}function Tp(e,t){let{x:i,width:s}=e;return t==="right"?i-=s:t==="center"&&(i-=s/2),i}function Ep(e,t,i){let{y:s,height:o}=e;return t==="top"?s+=i:t==="bottom"?s-=o+i:s-=o/2,s}function gn(e,t,i,s){const{caretSize:o,caretPadding:n,cornerRadius:a}=e,{xAlign:r,yAlign:l}=i,c=o+n,{topLeft:d,topRight:p,bottomLeft:h,bottomRight:g}=fe(a);let u=Tp(t,r);const f=Ep(t,l,c);return l==="center"?r==="left"?u+=c:r==="right"&&(u-=c):r==="left"?u-=Math.max(d,h)+o:r==="right"&&(u+=Math.max(p,g)+o),{x:tt(u,0,s.width-t.width),y:tt(f,0,s.height-t.height)}}function wi(e,t,i){const s=rt(i.padding);return t==="center"?e.x+e.width/2:t==="right"?e.x+e.width-s.right:e.x+s.left}function un(e){return Pt([],Lt(e))}function Lp(e,t,i){return ee(e,{tooltip:t,tooltipItems:i,type:"tooltip"})}function fn(e,t){const i=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return i?e.override(i):e}const ja={beforeTitle:Tt,title(e){if(e.length>0){const t=e[0],i=t.chart.data.labels,s=i?i.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(s>0&&t.dataIndex<s)return i[t.dataIndex]}return""},afterTitle:Tt,beforeBody:Tt,beforeLabel:Tt,label(e){if(this&&this.options&&this.options.mode==="dataset")return e.label+": "+e.formattedValue||e.formattedValue;let t=e.dataset.label||"";t&&(t+=": ");const i=e.formattedValue;return T(i)||(t+=i),t},labelColor(e){const i=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{borderColor:i.borderColor,backgroundColor:i.backgroundColor,borderWidth:i.borderWidth,borderDash:i.borderDash,borderDashOffset:i.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(e){const i=e.chart.getDatasetMeta(e.datasetIndex).controller.getStyle(e.dataIndex);return{pointStyle:i.pointStyle,rotation:i.rotation}},afterLabel:Tt,afterBody:Tt,beforeFooter:Tt,footer:Tt,afterFooter:Tt};function lt(e,t,i,s){const o=e[t].call(i,s);return typeof o>"u"?ja[t].call(i,s):o}class Ps extends St{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const i=this.chart,s=this.options.setContext(this.getContext()),o=s.enabled&&i.options.animation&&s.animations,n=new ma(this.chart,o);return o._cacheable&&(this._cachedAnimations=Object.freeze(n)),n}getContext(){return this.$context||(this.$context=Lp(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,i){const{callbacks:s}=i,o=lt(s,"beforeTitle",this,t),n=lt(s,"title",this,t),a=lt(s,"afterTitle",this,t);let r=[];return r=Pt(r,Lt(o)),r=Pt(r,Lt(n)),r=Pt(r,Lt(a)),r}getBeforeBody(t,i){return un(lt(i.callbacks,"beforeBody",this,t))}getBody(t,i){const{callbacks:s}=i,o=[];return V(t,n=>{const a={before:[],lines:[],after:[]},r=fn(s,n);Pt(a.before,Lt(lt(r,"beforeLabel",this,n))),Pt(a.lines,lt(r,"label",this,n)),Pt(a.after,Lt(lt(r,"afterLabel",this,n))),o.push(a)}),o}getAfterBody(t,i){return un(lt(i.callbacks,"afterBody",this,t))}getFooter(t,i){const{callbacks:s}=i,o=lt(s,"beforeFooter",this,t),n=lt(s,"footer",this,t),a=lt(s,"afterFooter",this,t);let r=[];return r=Pt(r,Lt(o)),r=Pt(r,Lt(n)),r=Pt(r,Lt(a)),r}_createItems(t){const i=this._active,s=this.chart.data,o=[],n=[],a=[];let r=[],l,c;for(l=0,c=i.length;l<c;++l)r.push(Pp(this.chart,i[l]));return t.filter&&(r=r.filter((d,p,h)=>t.filter(d,p,h,s))),t.itemSort&&(r=r.sort((d,p)=>t.itemSort(d,p,s))),V(r,d=>{const p=fn(t.callbacks,d);o.push(lt(p,"labelColor",this,d)),n.push(lt(p,"labelPointStyle",this,d)),a.push(lt(p,"labelTextColor",this,d))}),this.labelColors=o,this.labelPointStyles=n,this.labelTextColors=a,this.dataPoints=r,r}update(t,i){const s=this.options.setContext(this.getContext()),o=this._active;let n,a=[];if(!o.length)this.opacity!==0&&(n={opacity:0});else{const r=Ge[s.position].call(this,o,this._eventPosition);a=this._createItems(s),this.title=this.getTitle(a,s),this.beforeBody=this.getBeforeBody(a,s),this.body=this.getBody(a,s),this.afterBody=this.getAfterBody(a,s),this.footer=this.getFooter(a,s);const l=this._size=pn(this,s),c=Object.assign({},r,l),d=hn(this.chart,s,c),p=gn(s,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,n={opacity:1,x:p.x,y:p.y,width:l.width,height:l.height,caretX:r.x,caretY:r.y}}this._tooltipItems=a,this.$context=void 0,n&&this._resolveAnimations().update(this,n),t&&s.external&&s.external.call(this,{chart:this.chart,tooltip:this,replay:i})}drawCaret(t,i,s,o){const n=this.getCaretPosition(t,s,o);i.lineTo(n.x1,n.y1),i.lineTo(n.x2,n.y2),i.lineTo(n.x3,n.y3)}getCaretPosition(t,i,s){const{xAlign:o,yAlign:n}=this,{caretSize:a,cornerRadius:r}=s,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:p}=fe(r),{x:h,y:g}=t,{width:u,height:f}=i;let b,m,x,w,y,v;return n==="center"?(y=g+f/2,o==="left"?(b=h,m=b-a,w=y+a,v=y-a):(b=h+u,m=b+a,w=y-a,v=y+a),x=b):(o==="left"?m=h+Math.max(l,d)+a:o==="right"?m=h+u-Math.max(c,p)-a:m=this.caretX,n==="top"?(w=g,y=w-a,b=m-a,x=m+a):(w=g+f,y=w+a,b=m+a,x=m-a),v=w),{x1:b,x2:m,x3:x,y1:w,y2:y,y3:v}}drawTitle(t,i,s){const o=this.title,n=o.length;let a,r,l;if(n){const c=Se(s.rtl,this.x,this.width);for(t.x=wi(this,s.titleAlign,s),i.textAlign=c.textAlign(s.titleAlign),i.textBaseline="middle",a=Q(s.titleFont),r=s.titleSpacing,i.fillStyle=s.titleColor,i.font=a.string,l=0;l<n;++l)i.fillText(o[l],c.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+r,l+1===n&&(t.y+=s.titleMarginBottom-r)}}_drawColorBox(t,i,s,o,n){const a=this.labelColors[s],r=this.labelPointStyles[s],{boxHeight:l,boxWidth:c}=n,d=Q(n.bodyFont),p=wi(this,"left",n),h=o.x(p),g=l<d.lineHeight?(d.lineHeight-l)/2:0,u=i.y+g;if(n.usePointStyle){const f={radius:Math.min(c,l)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},b=o.leftForLtr(h,c)+c/2,m=u+l/2;t.strokeStyle=n.multiKeyBackground,t.fillStyle=n.multiKeyBackground,$s(t,f,b,m),t.strokeStyle=a.borderColor,t.fillStyle=a.backgroundColor,$s(t,f,b,m)}else{t.lineWidth=E(a.borderWidth)?Math.max(...Object.values(a.borderWidth)):a.borderWidth||1,t.strokeStyle=a.borderColor,t.setLineDash(a.borderDash||[]),t.lineDashOffset=a.borderDashOffset||0;const f=o.leftForLtr(h,c),b=o.leftForLtr(o.xPlus(h,1),c-2),m=fe(a.borderRadius);Object.values(m).some(x=>x!==0)?(t.beginPath(),t.fillStyle=n.multiKeyBackground,ii(t,{x:f,y:u,w:c,h:l,radius:m}),t.fill(),t.stroke(),t.fillStyle=a.backgroundColor,t.beginPath(),ii(t,{x:b,y:u+1,w:c-2,h:l-2,radius:m}),t.fill()):(t.fillStyle=n.multiKeyBackground,t.fillRect(f,u,c,l),t.strokeRect(f,u,c,l),t.fillStyle=a.backgroundColor,t.fillRect(b,u+1,c-2,l-2))}t.fillStyle=this.labelTextColors[s]}drawBody(t,i,s){const{body:o}=this,{bodySpacing:n,bodyAlign:a,displayColors:r,boxHeight:l,boxWidth:c,boxPadding:d}=s,p=Q(s.bodyFont);let h=p.lineHeight,g=0;const u=Se(s.rtl,this.x,this.width),f=function(M){i.fillText(M,u.x(t.x+g),t.y+h/2),t.y+=h+n},b=u.textAlign(a);let m,x,w,y,v,k,_;for(i.textAlign=a,i.textBaseline="middle",i.font=p.string,t.x=wi(this,b,s),i.fillStyle=s.bodyColor,V(this.beforeBody,f),g=r&&b!=="right"?a==="center"?c/2+d:c+2+d:0,y=0,k=o.length;y<k;++y){for(m=o[y],x=this.labelTextColors[y],i.fillStyle=x,V(m.before,f),w=m.lines,r&&w.length&&(this._drawColorBox(i,t,y,u,s),h=Math.max(p.lineHeight,l)),v=0,_=w.length;v<_;++v)f(w[v]),h=p.lineHeight;V(m.after,f)}g=0,h=p.lineHeight,V(this.afterBody,f),t.y-=n}drawFooter(t,i,s){const o=this.footer,n=o.length;let a,r;if(n){const l=Se(s.rtl,this.x,this.width);for(t.x=wi(this,s.footerAlign,s),t.y+=s.footerMarginTop,i.textAlign=l.textAlign(s.footerAlign),i.textBaseline="middle",a=Q(s.footerFont),i.fillStyle=s.footerColor,i.font=a.string,r=0;r<n;++r)i.fillText(o[r],l.x(t.x),t.y+a.lineHeight/2),t.y+=a.lineHeight+s.footerSpacing}}drawBackground(t,i,s,o){const{xAlign:n,yAlign:a}=this,{x:r,y:l}=t,{width:c,height:d}=s,{topLeft:p,topRight:h,bottomLeft:g,bottomRight:u}=fe(o.cornerRadius);i.fillStyle=o.backgroundColor,i.strokeStyle=o.borderColor,i.lineWidth=o.borderWidth,i.beginPath(),i.moveTo(r+p,l),a==="top"&&this.drawCaret(t,i,s,o),i.lineTo(r+c-h,l),i.quadraticCurveTo(r+c,l,r+c,l+h),a==="center"&&n==="right"&&this.drawCaret(t,i,s,o),i.lineTo(r+c,l+d-u),i.quadraticCurveTo(r+c,l+d,r+c-u,l+d),a==="bottom"&&this.drawCaret(t,i,s,o),i.lineTo(r+g,l+d),i.quadraticCurveTo(r,l+d,r,l+d-g),a==="center"&&n==="left"&&this.drawCaret(t,i,s,o),i.lineTo(r,l+p),i.quadraticCurveTo(r,l,r+p,l),i.closePath(),i.fill(),o.borderWidth>0&&i.stroke()}_updateAnimationTarget(t){const i=this.chart,s=this.$animations,o=s&&s.x,n=s&&s.y;if(o||n){const a=Ge[t.position].call(this,this._active,this._eventPosition);if(!a)return;const r=this._size=pn(this,t),l=Object.assign({},a,this._size),c=hn(i,t,l),d=gn(t,l,c,i);(o._to!==d.x||n._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=r.width,this.height=r.height,this.caretX=a.x,this.caretY=a.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const i=this.options.setContext(this.getContext());let s=this.opacity;if(!s)return;this._updateAnimationTarget(i);const o={width:this.width,height:this.height},n={x:this.x,y:this.y};s=Math.abs(s)<.001?0:s;const a=rt(i.padding),r=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;i.enabled&&r&&(t.save(),t.globalAlpha=s,this.drawBackground(n,t,o,i),pa(t,i.textDirection),n.y+=a.top,this.drawTitle(n,t,i),this.drawBody(n,t,i),this.drawFooter(n,t,i),ha(t,i.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,i){const s=this._active,o=t.map(({datasetIndex:r,index:l})=>{const c=this.chart.getDatasetMeta(r);if(!c)throw new Error("Cannot find a dataset at index "+r);return{datasetIndex:r,element:c.data[l],index:l}}),n=!Ei(s,o),a=this._positionChanged(o,i);(n||a)&&(this._active=o,this._eventPosition=i,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,i,s=!0){if(i&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const o=this.options,n=this._active||[],a=this._getActiveElements(t,n,i,s),r=this._positionChanged(a,t),l=i||!Ei(a,n)||r;return l&&(this._active=a,(o.enabled||o.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,i))),l}_getActiveElements(t,i,s,o){const n=this.options;if(t.type==="mouseout")return[];if(!o)return i.filter(r=>this.chart.data.datasets[r.datasetIndex]&&this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index)!==void 0);const a=this.chart.getElementsAtEventForMode(t,n.mode,n,s);return n.reverse&&a.reverse(),a}_positionChanged(t,i){const{caretX:s,caretY:o,options:n}=this,a=Ge[n.position].call(this,t,i);return a!==!1&&(s!==a.x||o!==a.y)}}$(Ps,"positioners",Ge);var Op={id:"tooltip",_element:Ps,positioners:Ge,afterInit(e,t,i){i&&(e.tooltip=new Ps({chart:e,options:i}))},beforeUpdate(e,t,i){e.tooltip&&e.tooltip.initialize(i)},reset(e,t,i){e.tooltip&&e.tooltip.initialize(i)},afterDraw(e){const t=e.tooltip;if(t&&t._willRender()){const i={tooltip:t};if(e.notifyPlugins("beforeTooltipDraw",{...i,cancelable:!0})===!1)return;t.draw(e.ctx),e.notifyPlugins("afterTooltipDraw",i)}},afterEvent(e,t){if(e.tooltip){const i=t.replay;e.tooltip.handleEvent(t.event,i,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(e,t)=>t.bodyFont.size,boxWidth:(e,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:ja},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:e=>e!=="filter"&&e!=="itemSort"&&e!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},Ip=Object.freeze({__proto__:null,Colors:qd,Decimation:Qd,Filler:vp,Legend:Mp,SubTitle:Cp,Title:Sp,Tooltip:Op});const jp=(e,t,i,s)=>(typeof t=="string"?(i=e.push(t)-1,s.unshift({index:i,label:t})):isNaN(t)&&(i=null),i);function Fp(e,t,i,s){const o=e.indexOf(t);if(o===-1)return jp(e,t,i,s);const n=e.lastIndexOf(t);return o!==n?i:o}const Bp=(e,t)=>e===null?null:tt(Math.round(e),0,t);function bn(e){const t=this.getLabels();return e>=0&&e<t.length?t[e]:e}class Rs extends ve{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const i=this._addedLabels;if(i.length){const s=this.getLabels();for(const{index:o,label:n}of i)s[o]===n&&s.splice(o,1);this._addedLabels=[]}super.init(t)}parse(t,i){if(T(t))return null;const s=this.getLabels();return i=isFinite(i)&&s[i]===t?i:Fp(s,t,C(i,t),this._addedLabels),Bp(i,s.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:i}=this.getUserBounds();let{min:s,max:o}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(s=0),i||(o=this.getLabels().length-1)),this.min=s,this.max=o}buildTicks(){const t=this.min,i=this.max,s=this.options.offset,o=[];let n=this.getLabels();n=t===0&&i===n.length-1?n:n.slice(t,i+1),this._valueRange=Math.max(n.length-(s?0:1),1),this._startValue=this.min-(s?.5:0);for(let a=t;a<=i;a++)o.push({value:a});return o}getLabelForValue(t){return bn.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const i=this.ticks;return t<0||t>i.length-1?null:this.getPixelForValue(i[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}$(Rs,"id","category"),$(Rs,"defaults",{ticks:{callback:bn}});function Vp(e,t){const i=[],{bounds:o,step:n,min:a,max:r,precision:l,count:c,maxTicks:d,maxDigits:p,includeBounds:h}=e,g=n||1,u=d-1,{min:f,max:b}=t,m=!T(a),x=!T(r),w=!T(c),y=(b-f)/(p+1);let v=co((b-f)/u/g)*g,k,_,M,z;if(v<1e-14&&!m&&!x)return[{value:f},{value:b}];z=Math.ceil(b/v)-Math.floor(f/v),z>u&&(v=co(z*v/u/g)*g),T(l)||(k=Math.pow(10,l),v=Math.ceil(v*k)/k),o==="ticks"?(_=Math.floor(f/v)*v,M=Math.ceil(b/v)*v):(_=f,M=b),m&&x&&n&&Tr((r-a)/n,v/1e3)?(z=Math.round(Math.min((r-a)/v,d)),v=(r-a)/z,_=a,M=r):w?(_=m?a:_,M=x?r:M,z=c-1,v=(M-_)/z):(z=(M-_)/v,Ue(z,Math.round(z),v/1e3)?z=Math.round(z):z=Math.ceil(z));const P=Math.max(po(v),po(_));k=Math.pow(10,T(l)?P:l),_=Math.round(_*k)/k,M=Math.round(M*k)/k;let A=0;for(m&&(h&&_!==a?(i.push({value:a}),_<a&&A++,Ue(Math.round((_+A*v)*k)/k,a,mn(a,y,e))&&A++):_<a&&A++);A<z;++A){const O=Math.round((_+A*v)*k)/k;if(x&&O>r)break;i.push({value:O})}return x&&h&&M!==r?i.length&&Ue(i[i.length-1].value,r,mn(r,y,e))?i[i.length-1].value=r:i.push({value:r}):(!x||M===r)&&i.push({value:M}),i}function mn(e,t,{horizontal:i,minRotation:s}){const o=Mt(s),n=(i?Math.sin(o):Math.cos(o))||.001,a=.75*t*(""+e).length;return Math.min(t/n,a)}class Vi extends ve{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,i){return T(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:i,maxDefined:s}=this.getUserBounds();let{min:o,max:n}=this;const a=l=>o=i?o:l,r=l=>n=s?n:l;if(t){const l=Dt(o),c=Dt(n);l<0&&c<0?r(0):l>0&&c>0&&a(0)}if(o===n){let l=n===0?1:Math.abs(n*.05);r(n+l),t||a(o-l)}this.min=o,this.max=n}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:i,stepSize:s}=t,o;return s?(o=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,o>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${o} ticks. Limiting to 1000.`),o=1e3)):(o=this.computeTickLimit(),i=i||11),i&&(o=Math.min(i,o)),o}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,i=t.ticks;let s=this.getTickLimit();s=Math.max(2,s);const o={maxTicks:s,bounds:t.bounds,min:t.min,max:t.max,precision:i.precision,step:i.stepSize,count:i.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:i.minRotation||0,includeBounds:i.includeBounds!==!1},n=this._range||this,a=Vp(o,n);return t.bounds==="ticks"&&Un(a,this,"value"),t.reverse?(a.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),a}configure(){const t=this.ticks;let i=this.min,s=this.max;if(super.configure(),this.options.offset&&t.length){const o=(s-i)/Math.max(t.length-1,1)/2;i-=o,s+=o}this._startValue=i,this._endValue=s,this._valueRange=s-i}getLabelForValue(t){return ri(t,this.chart.options.locale,this.options.ticks.format)}}class As extends Vi{determineDataLimits(){const{min:t,max:i}=this.getMinMax(!0);this.min=K(t)?t:0,this.max=K(i)?i:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),i=t?this.width:this.height,s=Mt(this.options.ticks.minRotation),o=(t?Math.sin(s):Math.cos(s))||.001,n=this._resolveTickFontOptions(0);return Math.ceil(i/Math.min(40,n.lineHeight/o))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}$(As,"id","linear"),$(As,"defaults",{ticks:{callback:Ni.formatters.numeric}});const oi=e=>Math.floor(Yt(e)),ce=(e,t)=>Math.pow(10,oi(e)+t);function xn(e){return e/Math.pow(10,oi(e))===1}function vn(e,t,i){const s=Math.pow(10,i),o=Math.floor(e/s);return Math.ceil(t/s)-o}function Hp(e,t){const i=t-e;let s=oi(i);for(;vn(e,t,s)>10;)s++;for(;vn(e,t,s)<10;)s--;return Math.min(s,oi(e))}function Np(e,{min:t,max:i}){t=bt(e.min,t);const s=[],o=oi(t);let n=Hp(t,i),a=n<0?Math.pow(10,Math.abs(n)):1;const r=Math.pow(10,n),l=o>n?Math.pow(10,o):0,c=Math.round((t-l)*a)/a,d=Math.floor((t-l)/r/10)*r*10;let p=Math.floor((c-d)/Math.pow(10,n)),h=bt(e.min,Math.round((l+d+p*Math.pow(10,n))*a)/a);for(;h<i;)s.push({value:h,major:xn(h),significand:p}),p>=10?p=p<15?15:20:p++,p>=20&&(n++,p=2,a=n>=0?1:a),h=Math.round((l+d+p*Math.pow(10,n))*a)/a;const g=bt(e.max,h);return s.push({value:g,major:xn(g),significand:p}),s}class Ds extends ve{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,i){const s=Vi.prototype.parse.apply(this,[t,i]);if(s===0){this._zero=!0;return}return K(s)&&s>0?s:null}determineDataLimits(){const{min:t,max:i}=this.getMinMax(!0);this.min=K(t)?Math.max(0,t):null,this.max=K(i)?Math.max(0,i):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!K(this._userMin)&&(this.min=t===ce(this.min,0)?ce(this.min,-1):ce(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:i}=this.getUserBounds();let s=this.min,o=this.max;const n=r=>s=t?s:r,a=r=>o=i?o:r;s===o&&(s<=0?(n(1),a(10)):(n(ce(s,-1)),a(ce(o,1)))),s<=0&&n(ce(o,-1)),o<=0&&a(ce(s,1)),this.min=s,this.max=o}buildTicks(){const t=this.options,i={min:this._userMin,max:this._userMax},s=Np(i,this);return t.bounds==="ticks"&&Un(s,this,"value"),t.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}getLabelForValue(t){return t===void 0?"0":ri(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Yt(t),this._valueRange=Yt(this.max)-Yt(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Yt(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const i=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+i*this._valueRange)}}$(Ds,"id","logarithmic"),$(Ds,"defaults",{ticks:{callback:Ni.formatters.logarithmic,major:{enabled:!0}}});function Ts(e){const t=e.ticks;if(t.display&&e.display){const i=rt(t.backdropPadding);return C(t.font&&t.font.size,U.font.size)+i.height}return 0}function Wp(e,t,i){return i=X(i)?i:[i],{w:Kr(e,t.string,i),h:i.length*t.lineHeight}}function yn(e,t,i,s,o){return e===s||e===o?{start:t-i/2,end:t+i/2}:e<s||e>o?{start:t-i,end:t}:{start:t,end:t+i}}function Gp(e){const t={l:e.left+e._padding.left,r:e.right-e._padding.right,t:e.top+e._padding.top,b:e.bottom-e._padding.bottom},i=Object.assign({},t),s=[],o=[],n=e._pointLabels.length,a=e.options.pointLabels,r=a.centerPointLabels?F/n:0;for(let l=0;l<n;l++){const c=a.setContext(e.getPointLabelContext(l));o[l]=c.padding;const d=e.getPointPosition(l,e.drawingArea+o[l],r),p=Q(c.font),h=Wp(e.ctx,p,e._pointLabels[l]);s[l]=h;const g=nt(e.getIndexAngle(l)+r),u=Math.round(Vs(g)),f=yn(u,d.x,h.w,0,180),b=yn(u,d.y,h.h,90,270);Yp(i,t,g,f,b)}e.setCenterPoint(t.l-i.l,i.r-t.r,t.t-i.t,i.b-t.b),e._pointLabelItems=qp(e,s,o)}function Yp(e,t,i,s,o){const n=Math.abs(Math.sin(i)),a=Math.abs(Math.cos(i));let r=0,l=0;s.start<t.l?(r=(t.l-s.start)/n,e.l=Math.min(e.l,t.l-r)):s.end>t.r&&(r=(s.end-t.r)/n,e.r=Math.max(e.r,t.r+r)),o.start<t.t?(l=(t.t-o.start)/a,e.t=Math.min(e.t,t.t-l)):o.end>t.b&&(l=(o.end-t.b)/a,e.b=Math.max(e.b,t.b+l))}function Xp(e,t,i){const s=e.drawingArea,{extra:o,additionalAngle:n,padding:a,size:r}=i,l=e.getPointPosition(t,s+o+a,n),c=Math.round(Vs(nt(l.angle+Z))),d=Zp(l.y,r.h,c),p=Kp(c),h=Jp(l.x,r.w,p);return{visible:!0,x:l.x,y:d,textAlign:p,left:h,top:d,right:h+r.w,bottom:d+r.h}}function Up(e,t){if(!t)return!0;const{left:i,top:s,right:o,bottom:n}=e;return!(Vt({x:i,y:s},t)||Vt({x:i,y:n},t)||Vt({x:o,y:s},t)||Vt({x:o,y:n},t))}function qp(e,t,i){const s=[],o=e._pointLabels.length,n=e.options,{centerPointLabels:a,display:r}=n.pointLabels,l={extra:Ts(n)/2,additionalAngle:a?F/o:0};let c;for(let d=0;d<o;d++){l.padding=i[d],l.size=t[d];const p=Xp(e,d,l);s.push(p),r==="auto"&&(p.visible=Up(p,c),p.visible&&(c=p))}return s}function Kp(e){return e===0||e===180?"center":e<180?"left":"right"}function Jp(e,t,i){return i==="right"?e-=t:i==="center"&&(e-=t/2),e}function Zp(e,t,i){return i===90||i===270?e-=t/2:(i>270||i<90)&&(e-=t),e}function Qp(e,t,i){const{left:s,top:o,right:n,bottom:a}=i,{backdropColor:r}=t;if(!T(r)){const l=fe(t.borderRadius),c=rt(t.backdropPadding);e.fillStyle=r;const d=s-c.left,p=o-c.top,h=n-s+c.width,g=a-o+c.height;Object.values(l).some(u=>u!==0)?(e.beginPath(),ii(e,{x:d,y:p,w:h,h:g,radius:l}),e.fill()):e.fillRect(d,p,h,g)}}function th(e,t){const{ctx:i,options:{pointLabels:s}}=e;for(let o=t-1;o>=0;o--){const n=e._pointLabelItems[o];if(!n.visible)continue;const a=s.setContext(e.getPointLabelContext(o));Qp(i,a,n);const r=Q(a.font),{x:l,y:c,textAlign:d}=n;xe(i,e._pointLabels[o],l,c+r.lineHeight/2,r,{color:a.color,textAlign:d,textBaseline:"middle"})}}function Fa(e,t,i,s){const{ctx:o}=e;if(i)o.arc(e.xCenter,e.yCenter,t,0,G);else{let n=e.getPointPosition(0,t);o.moveTo(n.x,n.y);for(let a=1;a<s;a++)n=e.getPointPosition(a,t),o.lineTo(n.x,n.y)}}function eh(e,t,i,s,o){const n=e.ctx,a=t.circular,{color:r,lineWidth:l}=t;!a&&!s||!r||!l||i<0||(n.save(),n.strokeStyle=r,n.lineWidth=l,n.setLineDash(o.dash||[]),n.lineDashOffset=o.dashOffset,n.beginPath(),Fa(e,i,a,s),n.closePath(),n.stroke(),n.restore())}function ih(e,t,i){return ee(e,{label:i,index:t,type:"pointLabel"})}class Ye extends Vi{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=rt(Ts(this.options)/2),i=this.width=this.maxWidth-t.width,s=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+i/2+t.left),this.yCenter=Math.floor(this.top+s/2+t.top),this.drawingArea=Math.floor(Math.min(i,s)/2)}determineDataLimits(){const{min:t,max:i}=this.getMinMax(!1);this.min=K(t)&&!isNaN(t)?t:0,this.max=K(i)&&!isNaN(i)?i:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/Ts(this.options))}generateTickLabels(t){Vi.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((i,s)=>{const o=W(this.options.pointLabels.callback,[i,s],this);return o||o===0?o:""}).filter((i,s)=>this.chart.getDataVisibility(s))}fit(){const t=this.options;t.display&&t.pointLabels.display?Gp(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,i,s,o){this.xCenter+=Math.floor((t-i)/2),this.yCenter+=Math.floor((s-o)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,i,s,o))}getIndexAngle(t){const i=G/(this._pointLabels.length||1),s=this.options.startAngle||0;return nt(t*i+Mt(s))}getDistanceFromCenterForValue(t){if(T(t))return NaN;const i=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*i:(t-this.min)*i}getValueForDistanceFromCenter(t){if(T(t))return NaN;const i=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-i:this.min+i}getPointLabelContext(t){const i=this._pointLabels||[];if(t>=0&&t<i.length){const s=i[t];return ih(this.getContext(),t,s)}}getPointPosition(t,i,s=0){const o=this.getIndexAngle(t)-Z+s;return{x:Math.cos(o)*i+this.xCenter,y:Math.sin(o)*i+this.yCenter,angle:o}}getPointPositionForValue(t,i){return this.getPointPosition(t,this.getDistanceFromCenterForValue(i))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:i,top:s,right:o,bottom:n}=this._pointLabelItems[t];return{left:i,top:s,right:o,bottom:n}}drawBackground(){const{backgroundColor:t,grid:{circular:i}}=this.options;if(t){const s=this.ctx;s.save(),s.beginPath(),Fa(this,this.getDistanceFromCenterForValue(this._endValue),i,this._pointLabels.length),s.closePath(),s.fillStyle=t,s.fill(),s.restore()}}drawGrid(){const t=this.ctx,i=this.options,{angleLines:s,grid:o,border:n}=i,a=this._pointLabels.length;let r,l,c;if(i.pointLabels.display&&th(this,a),o.display&&this.ticks.forEach((d,p)=>{if(p!==0||p===0&&this.min<0){l=this.getDistanceFromCenterForValue(d.value);const h=this.getContext(p),g=o.setContext(h),u=n.setContext(h);eh(this,g,l,a,u)}}),s.display){for(t.save(),r=a-1;r>=0;r--){const d=s.setContext(this.getPointLabelContext(r)),{color:p,lineWidth:h}=d;!h||!p||(t.lineWidth=h,t.strokeStyle=p,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,l=this.getDistanceFromCenterForValue(i.reverse?this.min:this.max),c=this.getPointPosition(r,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,i=this.options,s=i.ticks;if(!s.display)return;const o=this.getIndexAngle(0);let n,a;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(o),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((r,l)=>{if(l===0&&this.min>=0&&!i.reverse)return;const c=s.setContext(this.getContext(l)),d=Q(c.font);if(n=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=d.string,a=t.measureText(r.label).width,t.fillStyle=c.backdropColor;const p=rt(c.backdropPadding);t.fillRect(-a/2-p.left,-n-d.size/2-p.top,a+p.width,d.size+p.height)}xe(t,r.label,0,-n,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}$(Ye,"id","radialLinear"),$(Ye,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Ni.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),$(Ye,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),$(Ye,"descriptors",{angleLines:{_fallback:"grid"}});const qi={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ht=Object.keys(qi);function wn(e,t){return e-t}function $n(e,t){if(T(t))return null;const i=e._adapter,{parser:s,round:o,isoWeekday:n}=e._parseOpts;let a=t;return typeof s=="function"&&(a=s(a)),K(a)||(a=typeof s=="string"?i.parse(a,s):i.parse(a)),a===null?null:(o&&(a=o==="week"&&(Pe(n)||n===!0)?i.startOf(a,"isoWeek",n):i.startOf(a,o)),+a)}function _n(e,t,i,s){const o=ht.length;for(let n=ht.indexOf(e);n<o-1;++n){const a=qi[ht[n]],r=a.steps?a.steps:Number.MAX_SAFE_INTEGER;if(a.common&&Math.ceil((i-t)/(r*a.size))<=s)return ht[n]}return ht[o-1]}function sh(e,t,i,s,o){for(let n=ht.length-1;n>=ht.indexOf(i);n--){const a=ht[n];if(qi[a].common&&e._adapter.diff(o,s,a)>=t-1)return a}return ht[i?ht.indexOf(i):0]}function oh(e){for(let t=ht.indexOf(e)+1,i=ht.length;t<i;++t)if(qi[ht[t]].common)return ht[t]}function kn(e,t,i){if(!i)e[t]=!0;else if(i.length){const{lo:s,hi:o}=Hs(i,t),n=i[s]>=t?i[s]:i[o];e[n]=!0}}function nh(e,t,i,s){const o=e._adapter,n=+o.startOf(t[0].value,s),a=t[t.length-1].value;let r,l;for(r=n;r<=a;r=+o.add(r,1,s))l=i[r],l>=0&&(t[l].major=!0);return t}function Mn(e,t,i){const s=[],o={},n=t.length;let a,r;for(a=0;a<n;++a)r=t[a],o[r]=a,s.push({value:r,major:!1});return n===0||!i?s:nh(e,s,o,i)}class ni extends ve{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,i={}){const s=t.time||(t.time={}),o=this._adapter=new gc._date(t.adapters.date);o.init(i),Xe(s.displayFormats,o.formats()),this._parseOpts={parser:s.parser,round:s.round,isoWeekday:s.isoWeekday},super.init(t),this._normalized=i.normalized}parse(t,i){return t===void 0?null:$n(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,i=this._adapter,s=t.time.unit||"day";let{min:o,max:n,minDefined:a,maxDefined:r}=this.getUserBounds();function l(c){!a&&!isNaN(c.min)&&(o=Math.min(o,c.min)),!r&&!isNaN(c.max)&&(n=Math.max(n,c.max))}(!a||!r)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),o=K(o)&&!isNaN(o)?o:+i.startOf(Date.now(),s),n=K(n)&&!isNaN(n)?n:+i.endOf(Date.now(),s)+1,this.min=Math.min(o,n-1),this.max=Math.max(o+1,n)}_getLabelBounds(){const t=this.getLabelTimestamps();let i=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;return t.length&&(i=t[0],s=t[t.length-1]),{min:i,max:s}}buildTicks(){const t=this.options,i=t.time,s=t.ticks,o=s.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&o.length&&(this.min=this._userMin||o[0],this.max=this._userMax||o[o.length-1]);const n=this.min,a=this.max,r=Ir(o,n,a);return this._unit=i.unit||(s.autoSkip?_n(i.minUnit,this.min,this.max,this._getLabelCapacity(n)):sh(this,r.length,i.minUnit,this.min,this.max)),this._majorUnit=!s.major.enabled||this._unit==="year"?void 0:oh(this._unit),this.initOffsets(o),t.reverse&&r.reverse(),Mn(this,r,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let i=0,s=0,o,n;this.options.offset&&t.length&&(o=this.getDecimalForValue(t[0]),t.length===1?i=1-o:i=(this.getDecimalForValue(t[1])-o)/2,n=this.getDecimalForValue(t[t.length-1]),t.length===1?s=n:s=(n-this.getDecimalForValue(t[t.length-2]))/2);const a=t.length<3?.5:.25;i=tt(i,0,a),s=tt(s,0,a),this._offsets={start:i,end:s,factor:1/(i+1+s)}}_generate(){const t=this._adapter,i=this.min,s=this.max,o=this.options,n=o.time,a=n.unit||_n(n.minUnit,i,s,this._getLabelCapacity(i)),r=C(o.ticks.stepSize,1),l=a==="week"?n.isoWeekday:!1,c=Pe(l)||l===!0,d={};let p=i,h,g;if(c&&(p=+t.startOf(p,"isoWeek",l)),p=+t.startOf(p,c?"day":a),t.diff(s,i,a)>1e5*r)throw new Error(i+" and "+s+" are too far apart with stepSize of "+r+" "+a);const u=o.ticks.source==="data"&&this.getDataTimestamps();for(h=p,g=0;h<s;h=+t.add(h,r,a),g++)kn(d,h,u);return(h===s||o.bounds==="ticks"||g===1)&&kn(d,h,u),Object.keys(d).sort(wn).map(f=>+f)}getLabelForValue(t){const i=this._adapter,s=this.options.time;return s.tooltipFormat?i.format(t,s.tooltipFormat):i.format(t,s.displayFormats.datetime)}format(t,i){const o=this.options.time.displayFormats,n=this._unit,a=i||o[n];return this._adapter.format(t,a)}_tickFormatFunction(t,i,s,o){const n=this.options,a=n.ticks.callback;if(a)return W(a,[t,i,s],this);const r=n.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&r[l],p=c&&r[c],h=s[i],g=c&&p&&h&&h.major;return this._adapter.format(t,o||(g?p:d))}generateTickLabels(t){let i,s,o;for(i=0,s=t.length;i<s;++i)o=t[i],o.label=this._tickFormatFunction(o.value,i,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const i=this._offsets,s=this.getDecimalForValue(t);return this.getPixelForDecimal((i.start+s)*i.factor)}getValueForPixel(t){const i=this._offsets,s=this.getDecimalForPixel(t)/i.factor-i.end;return this.min+s*(this.max-this.min)}_getLabelSize(t){const i=this.options.ticks,s=this.ctx.measureText(t).width,o=Mt(this.isHorizontal()?i.maxRotation:i.minRotation),n=Math.cos(o),a=Math.sin(o),r=this._resolveTickFontOptions(0).size;return{w:s*n+r*a,h:s*a+r*n}}_getLabelCapacity(t){const i=this.options.time,s=i.displayFormats,o=s[i.unit]||s.millisecond,n=this._tickFormatFunction(t,0,Mn(this,[t],this._majorUnit),o),a=this._getLabelSize(n),r=Math.floor(this.isHorizontal()?this.width/a.w:this.height/a.h)-1;return r>0?r:1}getDataTimestamps(){let t=this._cache.data||[],i,s;if(t.length)return t;const o=this.getMatchingVisibleMetas();if(this._normalized&&o.length)return this._cache.data=o[0].controller.getAllParsedValues(this);for(i=0,s=o.length;i<s;++i)t=t.concat(o[i].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let i,s;if(t.length)return t;const o=this.getLabels();for(i=0,s=o.length;i<s;++i)t.push($n(this,o[i]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Jn(t.sort(wn))}}$(ni,"id","time"),$(ni,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function $i(e,t,i){let s=0,o=e.length-1,n,a,r,l;i?(t>=e[s].pos&&t<=e[o].pos&&({lo:s,hi:o}=Bt(e,"pos",t)),{pos:n,time:r}=e[s],{pos:a,time:l}=e[o]):(t>=e[s].time&&t<=e[o].time&&({lo:s,hi:o}=Bt(e,"time",t)),{time:n,pos:r}=e[s],{time:a,pos:l}=e[o]);const c=a-n;return c?r+(l-r)*(t-n)/c:r}class Es extends ni{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),i=this._table=this.buildLookupTable(t);this._minPos=$i(i,this.min),this._tableRange=$i(i,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:i,max:s}=this,o=[],n=[];let a,r,l,c,d;for(a=0,r=t.length;a<r;++a)c=t[a],c>=i&&c<=s&&o.push(c);if(o.length<2)return[{time:i,pos:0},{time:s,pos:1}];for(a=0,r=o.length;a<r;++a)d=o[a+1],l=o[a-1],c=o[a],Math.round((d+l)/2)!==c&&n.push({time:c,pos:a/(r-1)});return n}_generate(){const t=this.min,i=this.max;let s=super.getDataTimestamps();return(!s.includes(t)||!s.length)&&s.splice(0,0,t),(!s.includes(i)||s.length===1)&&s.push(i),s.sort((o,n)=>o-n)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const i=this.getDataTimestamps(),s=this.getLabelTimestamps();return i.length&&s.length?t=this.normalize(i.concat(s)):t=i.length?i:s,t=this._cache.all=t,t}getDecimalForValue(t){return($i(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const i=this._offsets,s=this.getDecimalForPixel(t)/i.factor-i.end;return $i(this._table,s*this._tableRange+this._minPos,!0)}}$(Es,"id","timeseries"),$(Es,"defaults",ni.defaults);var ah=Object.freeze({__proto__:null,CategoryScale:Rs,LinearScale:As,LogarithmicScale:Ds,RadialLinearScale:Ye,TimeScale:ni,TimeSeriesScale:Es});const rh=[hc,Hd,Ip,ah];mt.register(...rh);const ge={};function Qs(){return!!document.querySelector(".demo-wrapper.theme-light")}function Ba(e,t){ge[e]&&(ge[e].destroy(),delete ge[e]);const i=document.getElementById(e);if(!i)return null;const s=Qs();mt.defaults.color=s?"#6b7280":"rgba(255,255,255,0.40)",mt.defaults.borderColor=s?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.06)",mt.defaults.font.family="'Inter', sans-serif",mt.defaults.font.size=12;const o=new mt(i,t);return ge[e]=o,o}function lh(){Object.values(ge).forEach(e=>{try{e.destroy()}catch{}}),Object.keys(ge).forEach(e=>delete ge[e])}function Va(){return getComputedStyle(document.documentElement).getPropertyValue("--industry-accent").trim()||"#6366f1"}function Ha(){return getComputedStyle(document.documentElement).getPropertyValue("--industry-accent-rgb").trim()||"99, 102, 241"}function Ki(e,{labels:t,datasets:i,height:s=240}){const o=document.getElementById(e);o&&(o.style.height=s+"px");const n=Va(),a=Ha(),r=Qs(),l=r?"#9ca3af":"rgba(255,255,255,0.35)",c=r?"rgba(0,0,0,0.05)":"rgba(255,255,255,0.04)",d=r?"#374151":"rgba(255,255,255,0.40)",p=r?"#ffffff":"#1f1f1f",h=r?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.10)";return Ba(e,{type:"line",data:{labels:t,datasets:i.map((g,u)=>({label:g.label,data:g.data,borderColor:u===0?n:`rgba(${a},0.4)`,backgroundColor:u===0?`rgba(${a},0.10)`:"transparent",fill:u===0,tension:.4,pointRadius:4,pointHoverRadius:6,pointBackgroundColor:u===0?n:`rgba(${a},0.4)`,pointBorderColor:"transparent",borderWidth:2,...g.extra}))},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:i.length>1,labels:{color:d,boxWidth:12,padding:16}},tooltip:{backgroundColor:p,borderColor:h,borderWidth:1,padding:12,titleColor:r?"#111827":"rgba(255,255,255,0.80)",bodyColor:r?"#374151":"rgba(255,255,255,0.60)"}},scales:{x:{grid:{color:c},ticks:{color:l}},y:{grid:{color:c},ticks:{color:l},beginAtZero:!0}}}})}function Na(e,{labels:t,data:i,height:s=220}){const o=document.getElementById(e);o&&(o.style.height=s+"px");const n=Va(),a=Ha(),r=Qs(),l=r?"#374151":"rgba(255,255,255,0.50)",c=r?"#ffffff":"#1f1f1f",d=r?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.10)",p=r?"#f1f5f9":"#111111",h=[n,`rgba(${a},0.65)`,`rgba(${a},0.40)`,`rgba(${a},0.22)`,`rgba(${a},0.12)`];return Ba(e,{type:"doughnut",data:{labels:t,datasets:[{data:i,backgroundColor:h.slice(0,i.length),borderColor:p,borderWidth:3,hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"68%",plugins:{legend:{position:"right",labels:{color:l,boxWidth:12,padding:14,font:{size:12}}},tooltip:{backgroundColor:c,borderColor:d,borderWidth:1,padding:12,titleColor:r?"#111827":"rgba(255,255,255,0.80)",bodyColor:r?"#374151":"rgba(255,255,255,0.60)"}}}})}const Ls={};function B(e,t){Ls[e]=t}function ch(e){window.location.hash=e}function dh(){return window.location.hash.replace("#","")||"/"}async function zn(){const e=dh();lh();let t=Ls[e];if(t||(t=Ls["/"]),!t)return;const i=document.getElementById("app");i&&(i.style.transition="opacity 0.12s ease",i.style.opacity="0",await new Promise(s=>setTimeout(s,80)),t(),requestAnimationFrame(()=>{i.style.transition="opacity 0.22s ease",i.style.opacity="1"}),window.scrollTo(0,0),window.dispatchEvent(new CustomEvent("routechange",{detail:{path:e}})))}function Sn(){window.addEventListener("hashchange",zn),zn()}const ph="Nuxorb_2026$",Wa="nx_auth";function hh(){return sessionStorage.getItem(Wa)==="1"}function gh(e){const t=document.getElementById("app");t.innerHTML=`
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
  `;const i=document.getElementById("nx-password"),s=document.getElementById("nx-submit"),o=document.getElementById("nx-error");function n(){i.value===ph?(sessionStorage.setItem(Wa,"1"),e()):(o.style.display="block",i.value="",i.style.borderColor="rgba(239,68,68,0.55)",i.focus(),setTimeout(()=>{i.style.borderColor=""},1600))}s.addEventListener("click",n),i.addEventListener("keydown",a=>{a.key==="Enter"&&n()}),requestAnimationFrame(()=>i.focus())}let Ht=null;function uh(){return(!Ht||!document.body.contains(Ht))&&(Ht=document.getElementById("toast-container"),Ht||(Ht=document.createElement("div"),Ht.id="toast-container",document.body.appendChild(Ht))),Ht}function Ji(e,t="info",i=3e3){const s=uh(),o={success:"bi-check-circle-fill",error:"bi-x-circle-fill",info:"bi-info-circle-fill",warning:"bi-exclamation-triangle-fill"},n=document.createElement("div");n.className=`toast-nux ${t}`,n.innerHTML=`<i class="bi ${o[t]}"></i><span>${e}</span>`,s.appendChild(n),setTimeout(()=>{n.classList.add("out"),setTimeout(()=>n.remove(),300)},i)}const Hi=e=>Ji(e,"success"),fh=e=>Ji(e,"error"),to=e=>Ji(e,"info"),bh=e=>Ji(e,"warning"),mh=[{key:"restaurantes",nombre:"Restaurantes",desc:"Control de mesas, órdenes en tiempo real, CRM de clientes frecuentes y reportes de ventas.",icon:"bi-cup-hot-fill",accent:"#f97316",accentRgb:"249,115,22",empresa:"La Mesa Digital",demos:[{label:"CRM de Clientes",icon:"bi-people-fill",path:"/restaurantes/crm"},{label:"Dashboard Ejecutivo",icon:"bi-bar-chart-fill",path:"/restaurantes/dashboard"},{label:"Operaciones",icon:"bi-grid-3x3",path:"/restaurantes/operaciones"}]},{key:"salud",nombre:"Salud",desc:"Gestión de citas, expedientes clínicos, control de consultorios y estadísticas médicas.",icon:"bi-heart-pulse-fill",accent:"#06b6d4",accentRgb:"6,182,212",empresa:"MediCore",demos:[{label:"Expedientes",icon:"bi-folder2-open",path:"/salud/crm"},{label:"Dashboard Clínico",icon:"bi-bar-chart-fill",path:"/salud/dashboard"},{label:"Agenda del Día",icon:"bi-calendar-check",path:"/salud/operaciones"}]},{key:"construccion",nombre:"Construcción",desc:"Seguimiento de obras, control de materiales, gestión de personal y avance de proyectos.",icon:"bi-building-gear",accent:"#eab308",accentRgb:"234,179,8",empresa:"BuildPro",demos:[{label:"Gestión de Proyectos",icon:"bi-hammer",path:"/construccion/crm"},{label:"Dashboard de Obra",icon:"bi-bar-chart-fill",path:"/construccion/dashboard"},{label:"Tablero Operativo",icon:"bi-kanban-fill",path:"/construccion/operaciones"}]},{key:"retail",nombre:"Retail",desc:"Punto de venta, inventario inteligente, programa de lealtad y análisis de ventas.",icon:"bi-bag-heart-fill",accent:"#10b981",accentRgb:"16,185,129",empresa:"Storely",demos:[{label:"CRM de Clientes",icon:"bi-people-fill",path:"/retail/crm"},{label:"Dashboard de Ventas",icon:"bi-bar-chart-fill",path:"/retail/dashboard"},{label:"Punto de Venta",icon:"bi-cart-fill",path:"/retail/operaciones"}]},{key:"servicios",nombre:"Servicios",desc:"CRM para empresas de servicios, gestión de tickets, agenda y seguimiento de contratos.",icon:"bi-lightning-charge-fill",accent:"#8b5cf6",accentRgb:"139,92,246",empresa:"FlowService",demos:[{label:"CRM de Clientes",icon:"bi-people-fill",path:"/servicios/crm"},{label:"Dashboard MRR",icon:"bi-bar-chart-fill",path:"/servicios/dashboard"},{label:"Gestión de Tickets",icon:"bi-headset",path:"/servicios/operaciones"}]},{key:"saas",nombre:"SaaS / Software",desc:"MRR, ARR, churn, pipeline de ventas, onboarding y métricas de crecimiento B2B.",icon:"bi-rocket-takeoff-fill",accent:"#6366f1",accentRgb:"99,102,241",empresa:"LaunchPad",demos:[{label:"CRM de Cuentas",icon:"bi-buildings",path:"/saas/crm"},{label:"Dashboard SaaS",icon:"bi-bar-chart-fill",path:"/saas/dashboard"},{label:"Pipeline de Ventas",icon:"bi-kanban-fill",path:"/saas/operaciones"}]},{key:"educacion",nombre:"Educación",desc:"Academia y cursos: seguimiento de alumnos, asistencia, calificaciones y cobros.",icon:"bi-mortarboard-fill",accent:"#f59e0b",accentRgb:"245,158,11",empresa:"EduTrack",demos:[{label:"CRM de Alumnos",icon:"bi-people-fill",path:"/educacion/crm"},{label:"Dashboard Académico",icon:"bi-bar-chart-fill",path:"/educacion/dashboard"},{label:"Operaciones del Día",icon:"bi-calendar3",path:"/educacion/operaciones"}]},{key:"fitness",nombre:"Fitness & Gym",desc:"Membresías, control de acceso, clases grupales, trainers e ingresos del gimnasio.",icon:"bi-heart-pulse-fill",accent:"#ec4899",accentRgb:"236,72,153",empresa:"PowerGym",demos:[{label:"CRM de Miembros",icon:"bi-people-fill",path:"/fitness/crm"},{label:"Dashboard del Gym",icon:"bi-bar-chart-fill",path:"/fitness/dashboard"},{label:"Control de Acceso",icon:"bi-door-open-fill",path:"/fitness/operaciones"}]}];function Ga(){return`
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
        ${[{n:"8",label:"Industrias"},{n:"24",label:"Demos interactivos"},{n:"100%",label:"A medida"}].map(e=>`
          <div style="text-align:center">
            <div style="font-size:2rem;font-weight:900;color:white;letter-spacing:-0.04em">${e.n}</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.38);font-weight:500;margin-top:4px">${e.label}</div>
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
      ${mh.map((e,t)=>`
      <div data-reveal style="
        border:1px solid rgba(${e.accentRgb},0.15);
        border-radius:20px;
        overflow:hidden;
        background:rgba(${e.accentRgb},0.03);
        transition:border-color 0.3s ease;
      "
      onmouseenter="this.style.borderColor='rgba(${e.accentRgb},0.30)'"
      onmouseleave="this.style.borderColor='rgba(${e.accentRgb},0.15)'"
      >
        <!-- Header fila -->
        <div style="display:flex;align-items:center;gap:16px;padding:20px 24px;border-bottom:1px solid rgba(${e.accentRgb},0.10)">
          <div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:rgba(${e.accentRgb},0.12);color:${e.accent};flex-shrink:0">
            <i class="bi ${e.icon}"></i>
          </div>
          <div>
            <div style="font-size:16px;font-weight:800;color:white;letter-spacing:-0.02em">${e.nombre}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.38)">${e.empresa} · ${e.desc.substring(0,60)}...</div>
          </div>
          <div style="margin-left:auto;display:flex;gap:6px">
            <span style="font-size:11px;font-weight:700;color:${e.accent};padding:3px 10px;background:rgba(${e.accentRgb},0.10);border:1px solid rgba(${e.accentRgb},0.20);border-radius:99px">
              3 demos
            </span>
          </div>
        </div>

        <!-- 3 demos en grid -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr)">
          ${e.demos.map((i,s)=>`
          <div onclick="window.location.hash='${i.path}'" style="
            padding:20px 24px;
            cursor:pointer;
            display:flex;align-items:center;gap:14px;
            border-right:${s<2?"1px solid rgba("+e.accentRgb+",0.08)":"none"};
            transition:background 0.2s ease;
            position:relative;
          "
          onmouseenter="this.style.background='rgba(${e.accentRgb},0.08)'"
          onmouseleave="this.style.background='transparent'"
          >
            <div style="width:38px;height:38px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;background:rgba(${e.accentRgb},0.10);color:${e.accent};flex-shrink:0">
              <i class="bi ${i.icon}"></i>
            </div>
            <div>
              <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.90);margin-bottom:3px">${i.label}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.35);display:flex;align-items:center;gap:4px">
                <i class="bi bi-arrow-right" style="color:${e.accent};font-size:10px"></i> Abrir demo
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
        ${[{n:"01",icon:"bi-chat-dots-fill",title:"Llamada de descubrimiento",desc:"Entendemos tu negocio, tus procesos y qué necesitas automatizar o mejorar."},{n:"02",icon:"bi-pencil-square",title:"Propuesta a medida",desc:"Diseñamos la arquitectura y flujos específicos para tu empresa. Sin plantillas."},{n:"03",icon:"bi-code-slash",title:"Desarrollo iterativo",desc:"Construimos tu software en sprints con entregas continuas y feedback constante."},{n:"04",icon:"bi-rocket-takeoff-fill",title:"Lanzamiento y soporte",desc:"Entregamos, capacitamos a tu equipo y damos soporte continuo post-lanzamiento."}].map((e,t)=>`
          <div class="col-md-6 col-lg-3" data-reveal>
            <div style="padding:24px;height:100%">
              <div style="font-size:11px;font-weight:900;letter-spacing:0.15em;color:rgba(3,144,132,0.7);margin-bottom:12px">${e.n}</div>
              <div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:20px;background:rgba(3,144,132,0.12);color:#6af6e4;margin-bottom:16px;border:1px solid rgba(3,144,132,0.22)"><i class="bi ${e.icon}"></i></div>
              <h3 style="font-size:1.05rem;font-weight:700;color:white;margin-bottom:8px">${e.title}</h3>
              <p style="font-size:0.88rem;color:rgba(255,255,255,0.45);line-height:1.65">${e.desc}</p>
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
  `}function Ya(){}const Xa=[{cat:"Gestión",icon:"bi-people-fill",color:"#6366f1",titulo:"CRM para PyMEs",desc:"Seguimiento de leads, clientes, cotizaciones y ventas en un solo lugar."},{cat:"Operaciones",icon:"bi-kanban-fill",color:"#f97316",titulo:"Tablero Kanban de Proyectos",desc:"Visualiza el avance de tus proyectos con metodología ágil adaptada a tu equipo."},{cat:"E-commerce",icon:"bi-cart-fill",color:"#10b981",titulo:"Tienda en línea propia",desc:"Sin comisiones de terceros. Tu catálogo, tus precios, tu marca."},{cat:"Logística",icon:"bi-truck-fill",color:"#eab308",titulo:"Control de Flotilla",desc:"Rastreo de unidades, asignación de rutas y reportes de combustible."},{cat:"RH",icon:"bi-person-badge-fill",color:"#8b5cf6",titulo:"Portal de Empleados",desc:"Vacaciones, nómina, expedientes digitales y comunicados internos."},{cat:"Salud",icon:"bi-clipboard2-pulse-fill",color:"#06b6d4",titulo:"Expediente Clínico Digital",desc:"Historial médico completo, recetas, estudios y seguimiento por paciente."},{cat:"Educación",icon:"bi-mortarboard-fill",color:"#f97316",titulo:"Plataforma de Cursos",desc:"Clases en video, evaluaciones, certificados y seguimiento de alumnos."},{cat:"Restaurantes",icon:"bi-cup-hot-fill",color:"#ef4444",titulo:"Sistema de Comandas",desc:"Órdenes en tiempo real entre sala, cocina y barra. Sin errores."},{cat:"Construcción",icon:"bi-building-fill",color:"#eab308",titulo:"Control de Obras",desc:"Avance por actividad, bitácora diaria, alertas de materiales y presupuesto."},{cat:"Finanzas",icon:"bi-cash-coin",color:"#10b981",titulo:"Facturación & Cobranza",desc:"Genera facturas CFDI, da seguimiento a pagos y anticipa tu flujo de caja."},{cat:"E-commerce",icon:"bi-bag-heart-fill",color:"#ec4899",titulo:"Programa de Lealtad",desc:"Puntos, niveles, recompensas y comunicación directa con tus clientes frecuentes."},{cat:"Logística",icon:"bi-box-seam-fill",color:"#06b6d4",titulo:"Inventario Inteligente",desc:"Alertas de stock mínimo, trazabilidad de lotes y reportes de rotación."},{cat:"Servicios",icon:"bi-headset",color:"#8b5cf6",titulo:"Mesa de Ayuda (Helpdesk)",desc:"Tickets, SLAs, prioridades y satisfacción del cliente en tiempo real."},{cat:"Marketing",icon:"bi-megaphone-fill",color:"#f97316",titulo:"Automatización de Marketing",desc:"Campañas por WhatsApp, email y SMS activadas por comportamiento del cliente."},{cat:"Salud",icon:"bi-calendar-check-fill",color:"#06b6d4",titulo:"Agenda Médica Online",desc:"Citas por internet, recordatorios automáticos y gestión de consultorios."},{cat:"RH",icon:"bi-graph-up-arrow",color:"#10b981",titulo:"Dashboard de RRHH",desc:"Productividad, asistencia, rotación y métricas de clima laboral."},{cat:"Construcción",icon:"bi-people-fill",color:"#eab308",titulo:"Control de Personal en Obra",desc:"Asistencia con QR, asignación de cuadrillas y registro de incidencias."},{cat:"Finanzas",icon:"bi-bar-chart-fill",color:"#6366f1",titulo:"Reportes Ejecutivos",desc:"KPIs clave de tu negocio en un dashboard que puedes ver desde el celular."},{cat:"Educación",icon:"bi-phone-fill",color:"#f97316",titulo:"App Escolar para Padres",desc:"Calificaciones, avisos, pagos y comunicación directa con maestros."},{cat:"Gestión",icon:"bi-file-earmark-text-fill",color:"#8b5cf6",titulo:"Contratos Digitales",desc:"Firma electrónica, versionado y recordatorios de renovación de contratos."},{cat:"Marketing",icon:"bi-qr-code",color:"#ec4899",titulo:"Portal de Clientes",desc:"Cada cliente accede a su estado de cuenta, facturas y tickets de soporte."},{cat:"Servicios",icon:"bi-calendar3",color:"#06b6d4",titulo:"Agenda Inteligente",desc:"Reservas online con disponibilidad en tiempo real y pagos integrados."}],xh=["Todas",...new Set(Xa.map(e=>e.cat))];function vh(){return`
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
      ${xh.map((e,t)=>`
        <button class="btn-nux ${t===0?"btn-primary-nux":"btn-ghost-nux"} cat-filter-btn" data-cat="${e}"
          style="font-size:13px;padding:7px 16px">
          ${e}
        </button>
      `).join("")}
    </div>

    <!-- Ideas grid -->
    <div class="row g-3" id="ideas-grid">
      ${Xa.map((e,t)=>`
        <div class="col-lg-4 col-md-6 idea-card-wrap" data-cat="${e.cat}">
          <div style="
            padding:22px;height:100%;
            background:rgba(255,255,255,0.025);
            border:1px solid rgba(255,255,255,0.07);
            border-radius:var(--radius-lg);
            transition:all 0.25s ease;
            cursor:default;
          "
          class="anim-fade-up delay-${Math.min(t%6+1,8)}"
          onmouseenter="this.style.background='rgba(255,255,255,0.05)';this.style.borderColor='rgba(${Ua(e.color)},0.30)';this.style.transform='translateY(-2px)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.025)';this.style.borderColor='rgba(255,255,255,0.07)';this.style.transform='none'"
          >
            <div style="display:flex;align-items:flex-start;gap:14px">
              <div style="
                width:44px;height:44px;border-radius:12px;flex-shrink:0;
                display:flex;align-items:center;justify-content:center;font-size:20px;
                background:${Cn(e.color,.12)};
                color:${e.color};
                border:1px solid ${Cn(e.color,.2)};
              "><i class="bi ${e.icon}"></i></div>
              <div style="flex:1">
                <div style="font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:${e.color};margin-bottom:5px">${e.cat}</div>
                <div style="font-size:15px;font-weight:700;color:rgba(255,255,255,0.90);margin-bottom:6px;letter-spacing:-0.01em">${e.titulo}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.45);line-height:1.6">${e.desc}</div>
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
  `}function Ua(e){const t=parseInt(e.slice(1,3),16),i=parseInt(e.slice(3,5),16),s=parseInt(e.slice(5,7),16);return`${t},${i},${s}`}function Cn(e,t){return`rgba(${Ua(e)},${t})`}function yh(){const e=document.querySelectorAll(".cat-filter-btn"),t=document.querySelectorAll(".idea-card-wrap");e.forEach(i=>{i.addEventListener("click",()=>{e.forEach(o=>{o.classList.remove("btn-primary-nux"),o.classList.add("btn-ghost-nux")}),i.classList.add("btn-primary-nux"),i.classList.remove("btn-ghost-nux");const s=i.dataset.cat;t.forEach(o=>{s==="Todas"||o.dataset.cat===s?o.style.display="":o.style.display="none"})})})}function wh(e,t,i=1200,s="",o=""){if(!e)return;const n=performance.now(),a=typeof t=="string"?parseFloat(t.replace(/[^0-9.]/g,"")):t;function r(l){const c=l-n,d=Math.min(c/i,1),p=1-Math.pow(1-d,3),h=Math.floor(p*a);e.textContent=s+h.toLocaleString("es-MX")+o,d<1?requestAnimationFrame(r):e.textContent=s+a.toLocaleString("es-MX")+o}requestAnimationFrame(r)}function ye(){document.querySelectorAll("[data-counter]").forEach(t=>{const i=t.dataset.counter,s=t.dataset.prefix||"",o=t.dataset.suffix||"",n=parseInt(t.dataset.duration||"1200");wh(t,i,n,s,o)})}function $h(){const e=new IntersectionObserver(t=>{t.forEach(i=>{i.isIntersecting&&(i.target.classList.add("anim-fade-up"),i.target.style.opacity="1",e.unobserve(i.target))})},{threshold:.1});document.querySelectorAll("[data-reveal]").forEach(t=>{t.style.opacity="0",e.observe(t)})}const qa=(e="1.25rem")=>`<span style="font-family:'Inter',sans-serif;font-size:${e};font-weight:800;letter-spacing:0.2em;line-height:1;display:inline-block"><span style="color:#159b8a">NUX</span><span style="color:#ffffff">ORB</span></span>`;function _h(e=36){return qa("1rem")}function kh(e=36){return qa("1.3rem")}function Mh(e){return`
  <div style="--industry-accent:#6366f1;--industry-accent-rgb:99,102,241">
    <nav class="home-navbar" id="home-navbar">
      <div onclick="window.location.hash='/'" style="cursor:pointer;display:flex;align-items:center">
        ${kh(52)}
      </div>
      <div class="home-nav-links">
        <span class="home-nav-link" onclick="window.location.hash='/inspiracion'">Ideas</span>
        <span class="home-nav-link" onclick="scrollToSection('industries')">Industrias</span>
        <span class="home-nav-link" onclick="scrollToSection('how-it-works')">¿Cómo funciona?</span>
        <span class="home-nav-link cta" onclick="window.open('https://wa.me/5214400000000?text=Hola+Nuxorb','_blank')">Agendar llamada</span>
      </div>
      <button id="home-hamburger" aria-label="Abrir menú">
        <i class="bi bi-list"></i>
      </button>
    </nav>

    <div id="home-mobile-nav">
      <span class="home-nav-link" onclick="window.location.hash='/inspiracion';window.__closeHomeNav&&window.__closeHomeNav()">Ideas</span>
      <span class="home-nav-link" onclick="scrollToSection('industries');window.__closeHomeNav&&window.__closeHomeNav()">Industrias</span>
      <span class="home-nav-link" onclick="scrollToSection('how-it-works');window.__closeHomeNav&&window.__closeHomeNav()">¿Cómo funciona?</span>
      <span class="home-nav-link cta" onclick="window.open('https://wa.me/5214400000000?text=Hola+Nuxorb','_blank')">Agendar llamada</span>
    </div>

    <div style="padding-top:64px">
      ${e}
    </div>
  </div>
  <div id="toast-container"></div>
  `}function zh(){const e=document.getElementById("home-navbar"),t=document.getElementById("home-hamburger"),i=document.getElementById("home-mobile-nav"),s=()=>e&&e.classList.toggle("scrolled",window.scrollY>40);window.addEventListener("scroll",s,{passive:!0}),s(),window.scrollToSection=o=>{const n=document.getElementById(o);n&&n.scrollIntoView({behavior:"smooth"})},window.__closeHomeNav=()=>{i&&i.classList.remove("open"),t&&(t.querySelector("i").className="bi bi-list")},t&&i&&t.addEventListener("click",()=>{const o=i.classList.toggle("open");t.querySelector("i").className=o?"bi bi-x-lg":"bi bi-list"}),$h()}let At=!1;function Sh(){return At}function Ch(e,t,i){const s=i.company,o=i.sidebarBg||"",n=o?`style="background:${o}"`:"";return`
  <aside class="sidebar ${At?"collapsed":""}" id="main-sidebar" ${n}>
    <div class="sidebar-header">
      <div style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;flex-shrink:0">
        ${_h(32)}
      </div>
      <div class="sidebar-label">
        <div class="sidebar-company-name">${s.nombre}</div>
        <div class="sidebar-company-sub">${s.giro}</div>
      </div>
    </div>

    <button class="sidebar-toggle-btn" id="sidebar-toggle" title="${At?"Expandir":"Colapsar"}">
      <i class="bi ${At?"bi-chevron-right":"bi-chevron-left"}"></i>
    </button>

    <nav class="sidebar-nav" id="sidebar-nav">
      ${i.groups.map(a=>`
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
  `}function Ph(){const e=document.getElementById("sidebar-toggle");e&&e.addEventListener("click",()=>{At=!At;const t=document.getElementById("main-sidebar"),i=document.getElementById("demo-main");t&&t.classList.toggle("collapsed",At),i&&i.classList.toggle("sidebar-collapsed",At),e.title=At?"Expandir":"Colapsar",e.querySelector("i").className=`bi ${At?"bi-chevron-right":"bi-chevron-left"}`}),document.querySelectorAll(".sidebar-nav-item[data-path]").forEach(t=>{t.addEventListener("click",()=>{ch(t.dataset.path)})})}const Ka={restaurantes:{accent:"#f97316",accentRgb:"249,115,22",theme:"dark",sidebarBg:"#130d06",company:{nombre:"La Mesa Digital",giro:"Restaurante & Bar",logo:"bi-cup-hot-fill"},groups:[{label:"Servicio en piso",items:[{icon:"bi-grid-3x3",label:"Mesas en vivo",path:"/restaurantes/dashboard"},{icon:"bi-fire",label:"Órdenes activas",path:"/restaurantes/operaciones"},{icon:"bi-clock-history",label:"Historial de ventas",path:"/restaurantes/dashboard"}]},{label:"Cocina",items:[{icon:"bi-journal-richtext",label:"Comanda del día",path:"/restaurantes/operaciones"},{icon:"bi-box-seam-fill",label:"Inventario",path:"/restaurantes/operaciones"},{icon:"bi-truck",label:"Proveedores",path:"/restaurantes/operaciones"}]},{label:"Relación con clientes",items:[{icon:"bi-people-fill",label:"Clientes VIP",path:"/restaurantes/crm"},{icon:"bi-calendar-heart",label:"Reservaciones",path:"/restaurantes/operaciones"},{icon:"bi-megaphone-fill",label:"Campañas",path:"/restaurantes/crm"}]},{label:"Reportes & Config",items:[{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/restaurantes/dashboard"},{icon:"bi-person-vcard",label:"Personal",path:"/restaurantes/operaciones"},{icon:"bi-gear-fill",label:"Configuración",path:"/restaurantes/operaciones"}]}]},salud:{accent:"#0284c7",accentRgb:"2,132,199",theme:"light",sidebarBg:"#f8fafc",company:{nombre:"MediCore",giro:"Clínica & Hospital",logo:"bi-heart-pulse-fill"},groups:[{label:"Atención médica",items:[{icon:"bi-clock-fill",label:"Sala de espera",path:"/salud/dashboard"},{icon:"bi-calendar-check",label:"Agenda de hoy",path:"/salud/operaciones"},{icon:"bi-door-open-fill",label:"Consultorios",path:"/salud/dashboard"}]},{label:"Pacientes",items:[{icon:"bi-shield-plus",label:"Expedientes",path:"/salud/crm"},{icon:"bi-clipboard2-pulse",label:"Signos vitales",path:"/salud/crm"},{icon:"bi-bandaid-fill",label:"Diagnósticos",path:"/salud/crm"}]},{label:"Clínica",items:[{icon:"bi-capsule-pill",label:"Farmacia",path:"/salud/operaciones"},{icon:"bi-droplet-fill",label:"Laboratorio",path:"/salud/operaciones"},{icon:"bi-file-earmark-medical",label:"Recetas",path:"/salud/operaciones"}]},{label:"Gestión",items:[{icon:"bi-graph-up-arrow",label:"Dashboard clínico",path:"/salud/dashboard"},{icon:"bi-cash-stack",label:"Facturación",path:"/salud/operaciones"},{icon:"bi-gear-fill",label:"Configuración",path:"/salud/operaciones"}]}]},construccion:{accent:"#eab308",accentRgb:"234,179,8",theme:"dark",sidebarBg:"#0f0c03",company:{nombre:"BuildPro",giro:"Constructora & Obra",logo:"bi-building-gear"},groups:[{label:"Proyectos activos",items:[{icon:"bi-hammer",label:"Tablero de obras",path:"/construccion/dashboard"},{icon:"bi-kanban-fill",label:"Fases & avance",path:"/construccion/operaciones"},{icon:"bi-map-fill",label:"Mapa de sitios",path:"/construccion/crm"}]},{label:"Recursos",items:[{icon:"bi-people-fill",label:"Personal y cuadrillas",path:"/construccion/crm"},{icon:"bi-box-seam-fill",label:"Materiales",path:"/construccion/operaciones"},{icon:"bi-truck-flatbed",label:"Equipos y maquinaria",path:"/construccion/operaciones"}]},{label:"Financiero",items:[{icon:"bi-file-earmark-text",label:"Cotizaciones",path:"/construccion/crm"},{icon:"bi-receipt-cutoff",label:"Estimaciones",path:"/construccion/crm"},{icon:"bi-cash-stack",label:"Presupuestos",path:"/construccion/dashboard"}]},{label:"Análisis",items:[{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/construccion/dashboard"},{icon:"bi-journal-text",label:"Bitácora de obra",path:"/construccion/operaciones"},{icon:"bi-gear-fill",label:"Configuración",path:"/construccion/operaciones"}]}]},retail:{accent:"#059669",accentRgb:"5,150,105",theme:"light",sidebarBg:"#f0fdf9",company:{nombre:"Storely",giro:"Retail & Moda",logo:"bi-bag-heart-fill"},groups:[{label:"Punto de venta",items:[{icon:"bi-upc-scan",label:"Caja — POS",path:"/retail/operaciones"},{icon:"bi-arrow-repeat",label:"Devoluciones",path:"/retail/operaciones"},{icon:"bi-receipt",label:"Cierres de caja",path:"/retail/dashboard"}]},{label:"Clientes",items:[{icon:"bi-people-fill",label:"Directorio CRM",path:"/retail/crm"},{icon:"bi-award-fill",label:"Programa lealtad",path:"/retail/crm"},{icon:"bi-gift-fill",label:"Campañas & cupones",path:"/retail/crm"}]},{label:"Inventario",items:[{icon:"bi-box-seam-fill",label:"Catálogo",path:"/retail/operaciones"},{icon:"bi-tags-fill",label:"Categorías",path:"/retail/operaciones"},{icon:"bi-truck",label:"Proveedores",path:"/retail/operaciones"}]},{label:"Análisis",items:[{icon:"bi-graph-up-arrow",label:"Dashboard de ventas",path:"/retail/dashboard"},{icon:"bi-bar-chart-line",label:"Reportes",path:"/retail/dashboard"},{icon:"bi-gear-fill",label:"Configuración",path:"/retail/operaciones"}]}]},servicios:{accent:"#8b5cf6",accentRgb:"139,92,246",theme:"dark",sidebarBg:"#0c0a1a",company:{nombre:"FlowService",giro:"IT & Servicios Gestionados",logo:"bi-shield-check-fill"},groups:[{label:"Mesa de ayuda",items:[{icon:"bi-headset",label:"Bandeja de tickets",path:"/servicios/operaciones"},{icon:"bi-lightning-fill",label:"Prioridad alta",path:"/servicios/operaciones"},{icon:"bi-chat-dots-fill",label:"Chat en vivo",path:"/servicios/operaciones"}]},{label:"Cuentas",items:[{icon:"bi-buildings",label:"Clientes",path:"/servicios/crm"},{icon:"bi-file-earmark-text",label:"Contratos SLA",path:"/servicios/crm"},{icon:"bi-person-check-fill",label:"Onboarding",path:"/servicios/crm"}]},{label:"Operación",items:[{icon:"bi-server",label:"Estado del sistema",path:"/servicios/dashboard"},{icon:"bi-book-half",label:"Base de conocimiento",path:"/servicios/operaciones"},{icon:"bi-calendar3",label:"Agenda de servicio",path:"/servicios/operaciones"}]},{label:"Métricas",items:[{icon:"bi-bar-chart-fill",label:"Dashboard MRR",path:"/servicios/dashboard"},{icon:"bi-shield-fill-check",label:"Cumplimiento SLA",path:"/servicios/dashboard"},{icon:"bi-gear-fill",label:"Configuración",path:"/servicios/operaciones"}]}]},saas:{accent:"#6366f1",accentRgb:"99,102,241",theme:"dark",sidebarBg:"#08091e",company:{nombre:"LaunchPad",giro:"SaaS B2B · Software",logo:"bi-rocket-takeoff-fill"},groups:[{label:"Revenue",items:[{icon:"bi-graph-up-arrow",label:"MRR & ARR",path:"/saas/dashboard"},{icon:"bi-people-fill",label:"Cohort retención",path:"/saas/dashboard"},{icon:"bi-arrow-down-circle",label:"Churn & expansión",path:"/saas/dashboard"}]},{label:"Clientes",items:[{icon:"bi-buildings",label:"Cuentas",path:"/saas/crm"},{icon:"bi-kanban-fill",label:"Pipeline de ventas",path:"/saas/operaciones"},{icon:"bi-exclamation-triangle-fill",label:"Riesgo de churn",path:"/saas/crm"}]},{label:"Producto",items:[{icon:"bi-bar-chart-steps",label:"Uso de features",path:"/saas/operaciones"},{icon:"bi-bug-fill",label:"Bugs & feedback",path:"/saas/operaciones"},{icon:"bi-signpost-split",label:"Roadmap",path:"/saas/operaciones"}]},{label:"Admin",items:[{icon:"bi-file-earmark-text",label:"Contratos & billing",path:"/saas/crm"},{icon:"bi-plug-fill",label:"Integraciones",path:"/saas/operaciones"},{icon:"bi-gear-fill",label:"Config",path:"/saas/operaciones"}]}]},educacion:{accent:"#d97706",accentRgb:"217,119,6",theme:"light",sidebarBg:"#fffcf0",company:{nombre:"EduTrack",giro:"Academia & Educación",logo:"bi-mortarboard-fill"},groups:[{label:"Alumnos",items:[{icon:"bi-people-fill",label:"Directorio",path:"/educacion/crm"},{icon:"bi-person-plus-fill",label:"Inscripciones",path:"/educacion/operaciones"},{icon:"bi-cash-stack",label:"Cobranza & becas",path:"/educacion/crm"}]},{label:"Académico",items:[{icon:"bi-journal-richtext",label:"Calificaciones",path:"/educacion/crm"},{icon:"bi-calendar-week",label:"Horarios y grupos",path:"/educacion/operaciones"},{icon:"bi-check2-square",label:"Asistencia",path:"/educacion/operaciones"}]},{label:"Contenido",items:[{icon:"bi-book-fill",label:"Cursos",path:"/educacion/crm"},{icon:"bi-camera-video-fill",label:"Clases grabadas",path:"/educacion/operaciones"},{icon:"bi-trophy-fill",label:"Certificaciones",path:"/educacion/crm"}]},{label:"Institución",items:[{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/educacion/dashboard"},{icon:"bi-person-badge-fill",label:"Maestros",path:"/educacion/operaciones"},{icon:"bi-gear-fill",label:"Config",path:"/educacion/operaciones"}]}]},fitness:{accent:"#ec4899",accentRgb:"236,72,153",theme:"dark",sidebarBg:"#160610",company:{nombre:"PowerGym",giro:"Gym & Wellness",logo:"bi-fire"},groups:[{label:"Miembros",items:[{icon:"bi-qr-code-scan",label:"Check-in rápido",path:"/fitness/operaciones"},{icon:"bi-people-fill",label:"Directorio",path:"/fitness/crm"},{icon:"bi-award-fill",label:"Membresías & planes",path:"/fitness/crm"}]},{label:"Clases",items:[{icon:"bi-calendar-week",label:"Horario de clases",path:"/fitness/operaciones"},{icon:"bi-person-standing",label:"Entrenadores",path:"/fitness/operaciones"},{icon:"bi-clipboard2-check",label:"Reservas",path:"/fitness/operaciones"}]},{label:"Bienestar",items:[{icon:"bi-heart-pulse-fill",label:"Seguimiento físico",path:"/fitness/crm"},{icon:"bi-egg-fried",label:"Nutrición",path:"/fitness/operaciones"},{icon:"bi-graph-up-arrow",label:"Progreso del mes",path:"/fitness/dashboard"}]},{label:"Negocio",items:[{icon:"bi-lightning-charge-fill",label:"Dashboard",path:"/fitness/dashboard"},{icon:"bi-cash-stack",label:"Facturación",path:"/fitness/crm"},{icon:"bi-gear-fill",label:"Configuración",path:"/fitness/operaciones"}]}]}};function Rh(e,t,i){const s=Ka[e];return`
  <header class="topbar">
    <div class="topbar-left">
      <button class="sidebar-mobile-toggle" id="sidebar-mobile-toggle" aria-label="Abrir menú">
        <i class="bi bi-list"></i>
      </button>
      <button class="back-btn" onclick="window.location.hash='/${e}'">
        <i class="bi bi-chevron-left"></i>
      </button>
      <div>
        <div class="topbar-title">${t}</div>
      </div>
      <span class="topbar-demo-badge" style="display:flex;align-items:center;gap:6px">
        <i class="bi bi-shield-check" style="font-size:11px"></i>
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
  `}function Ah(e,t,i,s){const o=Ka[e],n=Sh();return`
  <div class="demo-wrapper theme-${o.theme||"dark"}" style="--industry-accent:${o.accent};--industry-accent-rgb:${o.accentRgb}">
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    ${Ch(e,s,o)}
    <div class="demo-main ${n?"sidebar-collapsed":""}" id="demo-main">
      ${Rh(e,t)}
      <main class="demo-content">
        ${i}
      </main>
    </div>
  </div>
  <div id="toast-container"></div>
  `}function Dh(){Ph(),ye();const e=document.getElementById("sidebar-mobile-toggle"),t=document.getElementById("sidebar-overlay"),i=document.getElementById("main-sidebar");function s(){i&&i.classList.add("mobile-open"),t&&t.classList.add("active"),document.body.style.overflow="hidden"}function o(){i&&i.classList.remove("mobile-open"),t&&t.classList.remove("active"),document.body.style.overflow=""}e&&e.addEventListener("click",s),t&&t.addEventListener("click",o),document.querySelectorAll(".sidebar-nav-item[data-path]").forEach(n=>{n.addEventListener("click",()=>{window.innerWidth<768&&o()})})}const S={nombre:"La Mesa Digital",giro:"Restaurante & Bar",logo:"bi-cup-hot-fill",accent:"#f97316",accentRgb:"249, 115, 22"},Th=[{id:1,zona:"Interior",cap:4,estado:"ocupada",mesero:"Luis G.",orden:"ORD-041",tiempo:"22 min",ticket:"$480"},{id:2,zona:"Interior",cap:2,estado:"ocupada",mesero:"Paola R.",orden:"ORD-042",tiempo:"8 min",ticket:"$190"},{id:3,zona:"Interior",cap:6,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:4,zona:"Interior",cap:4,estado:"reservada",mesero:"",orden:"",tiempo:"18:30",ticket:""},{id:5,zona:"Terraza",cap:4,estado:"ocupada",mesero:"Carlos M.",orden:"ORD-043",tiempo:"41 min",ticket:"$620"},{id:6,zona:"Terraza",cap:2,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:7,zona:"Terraza",cap:6,estado:"ocupada",mesero:"Luis G.",orden:"ORD-044",tiempo:"14 min",ticket:"$310"},{id:8,zona:"Bar",cap:2,estado:"ocupada",mesero:"Paola R.",orden:"ORD-045",tiempo:"5 min",ticket:"$150"},{id:9,zona:"Bar",cap:2,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:10,zona:"VIP",cap:8,estado:"reservada",mesero:"",orden:"",tiempo:"20:00",ticket:""},{id:11,zona:"VIP",cap:6,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:12,zona:"Interior",cap:4,estado:"ocupada",mesero:"Carlos M.",orden:"ORD-046",tiempo:"31 min",ticket:"$540"}],Eh=[{id:"ORD-041",mesa:1,mesero:"Luis G.",items:["Costilla BBQ x2","Guacamole","Limonada x2"],estado:"en cocina",tiempo:"22 min",total:"$480"},{id:"ORD-042",mesa:2,mesero:"Paola R.",items:["Sopa de Lima","Agua x2"],estado:"entregada",tiempo:"8 min",total:"$190"},{id:"ORD-043",mesa:5,mesero:"Carlos M.",items:["Carne Asada x3","Margarita x2","Postre x3"],estado:"esperando",tiempo:"41 min",total:"$620"},{id:"ORD-044",mesa:7,mesero:"Luis G.",items:["Tacos x4","Cerveza x2"],estado:"en cocina",tiempo:"14 min",total:"$310"},{id:"ORD-045",mesa:8,mesero:"Paola R.",items:["Michelada x2"],estado:"lista",tiempo:"5 min",total:"$150"},{id:"ORD-046",mesa:12,mesero:"Carlos M.",items:["Enchiladas x2","Pozole","Agua x3"],estado:"en cocina",tiempo:"31 min",total:"$540"}],Pn={labels:["11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm"],data:[1200,3400,5800,6200,4100,2300,2800,5200,7400,8100,6300]},Rn={labels:["Platos Fuertes","Bebidas","Entradas","Postres","Especialidades"],data:[42,28,15,8,7]};function Lh(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${S.accent};--industry-accent-rgb:${S.accentRgb}">

    <!-- Fondo -->
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${S.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>

    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'">
        <i class="bi bi-arrow-left"></i> Todas las industrias
      </button>

      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${S.accent};margin-bottom:14px">
            <i class="bi ${S.logo}"></i> ${S.giro}
          </div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">
            Software diseñado para <span style="color:${S.accent}">${S.nombre}</span>
          </h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">
            Así podría verse el sistema de gestión de tu restaurante. Control total de mesas, órdenes, clientes y reportes desde una sola plataforma.
          </p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/restaurantes/crm",icon:"bi-people-fill",label:"CRM de Clientes",desc:"Frecuencia, preferencias y valor de cada cliente."},{path:"/restaurantes/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard Ejecutivo",desc:"Ventas, ticket promedio, mesas y satisfacción."},{path:"/restaurantes/operaciones",icon:"bi-grid-3x3",label:"Portal de Operaciones",desc:"Mesas en tiempo real, órdenes y estado de cocina."}].map(e=>`
              <div onclick="window.location.hash='${e.path}'" style="
                display:flex;align-items:center;gap:16px;padding:16px 20px;
                background:rgba(${S.accentRgb},0.06);
                border:1px solid rgba(${S.accentRgb},0.18);
                border-radius:var(--radius-lg);cursor:pointer;
                transition:all 0.25s ease;
              "
              onmouseenter="this.style.background='rgba(${S.accentRgb},0.12)';this.style.borderColor='rgba(${S.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${S.accentRgb},0.06)';this.style.borderColor='rgba(${S.accentRgb},0.18)'"
              >
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${S.accentRgb},0.15);color:${S.accent};flex-shrink:0">
                  <i class="bi ${e.icon}"></i>
                </div>
                <div style="flex:1">
                  <div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${e.label}</div>
                  <div style="font-size:13px;color:rgba(255,255,255,0.42)">${e.desc}</div>
                </div>
                <i class="bi bi-chevron-right" style="color:${S.accent};font-size:14px"></i>
              </div>
            `).join("")}
          </div>
        </div>

        <div class="col-lg-6">
          <!-- Preview card decorativo -->
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${S.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${S.accent},transparent)"></div>

            <!-- Simulated topbar -->
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${S.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${S.accent};font-size:16px">
                <i class="bi ${S.logo}"></i>
              </div>
              <div>
                <div style="font-size:14px;font-weight:700;color:white">${S.nombre}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Sistema de gestión</div>
              </div>
              <span class="badge-nux badge-accent" style="margin-left:auto">En vivo</span>
            </div>

            <!-- Mini KPIs decorativos -->
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              ${[{label:"Mesas activas",val:"14/20",icon:"bi-grid-3x3"},{label:"Ventas hoy",val:"$18.7K",icon:"bi-cash-stack"},{label:"Ticket prom.",val:"$324",icon:"bi-receipt"},{label:"Satisfacción",val:"4.8 ⭐",icon:"bi-star-fill"}].map(e=>`
                <div style="padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px">
                  <div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:4px">${e.label}</div>
                  <div style="font-size:18px;font-weight:800;color:white;letter-spacing:-0.02em">${e.val}</div>
                </div>
              `).join("")}
            </div>

            <!-- Mini bar chart decorativo -->
            <div style="padding:14px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
              <div style="font-size:11px;color:rgba(255,255,255,0.30);text-transform:uppercase;font-weight:700;margin-bottom:10px">Ventas por hora</div>
              <div style="display:flex;align-items:flex-end;gap:4px;height:50px">
                ${[30,60,80,95,70,50,65,90,100,85,65].map((e,t)=>`
                  <div style="flex:1;height:${e}%;background:rgba(${S.accentRgb},${.3+e/250});border-radius:3px 3px 0 0"></div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}function j({icon:e,label:t,value:i,delta:s,trend:o,prefix:n="",suffix:a="",animate:r=!0,extra:l="",cardColor:c=null,deltaLabel:d="vs ayer"}){const p=o==="up"?"bi-arrow-up-right":o==="down"?"bi-arrow-down-right":"",h=o==="up"?"up":o==="down"?"down":"",g=r&&typeof i=="number"?`data-counter="${i}" data-prefix="${n}" data-suffix="${a}"`:"";return c?`
    <div class="kpi-card anim-fade-up" style="background:${c};border-color:transparent">
      <div style="position:absolute;top:-16px;right:-16px;width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,0.08);pointer-events:none"></div>
      <div style="width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;font-size:16px;color:white;margin-bottom:14px;flex-shrink:0;position:relative">
        <i class="bi ${e}"></i>
      </div>
      <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px">${t}</div>
      <div class="${r&&typeof i=="number"?"counter-anim":""}" style="font-size:2rem;font-weight:800;color:white;letter-spacing:-0.03em;line-height:1;position:relative" ${g}>
        ${typeof i=="number"?n+i.toLocaleString("es-MX")+a:i}
      </div>
      ${s?`
      <div style="margin-top:8px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:4px;color:rgba(255,255,255,0.72)">
        ${p?`<i class="bi ${p}"></i>`:""}
        <span>${s} ${d}</span>
      </div>`:""}
      ${l}
    </div>`:`
  <div class="kpi-card anim-fade-up">
    <div class="kpi-icon"><i class="bi ${e}"></i></div>
    <div class="kpi-label">${t}</div>
    <div class="kpi-value ${r&&typeof i=="number"?"counter-anim":""}" ${g}>
      ${typeof i=="number"?n+i.toLocaleString("es-MX")+a:i}
    </div>
    ${s?`
    <div class="kpi-delta ${h}">
      ${p?`<i class="bi ${p}"></i>`:""}
      <span>${s} ${d}</span>
    </div>`:""}
    ${l}
  </div>`}function Oh(e,t=4){return`
  <div class="row g-3 mb-4">
    ${e.map(i=>`
      <div class="col-lg-${Math.floor(12/t)} col-md-6">
        ${j(i)}
      </div>
    `).join("")}
  </div>
  `}function ie({stages:e,currentIndex:t,accent:i}){return`
  <div style="display:flex;margin-bottom:24px;border-radius:var(--radius-md);overflow:hidden;border:1px solid rgba(255,255,255,0.08)">
    ${e.map((s,o)=>{const n=o===t,a=o<t,r=n?i:a?i+"28":"rgba(255,255,255,0.025)";return`
      <div style="
        flex:1;padding:11px 6px;text-align:center;
        font-size:11.5px;font-weight:${n?"700":"500"};
        background:${r};color:${n?"#fff":a?i:"rgba(255,255,255,0.28)"};
        border-right:${o<e.length-1?"1px solid rgba(255,255,255,0.06)":"none"};
        white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        display:flex;align-items:center;justify-content:center;gap:4px;
        cursor:default;user-select:none;
      ">
        ${a?'<i class="bi bi-check2" style="font-size:11px;flex-shrink:0"></i>':""}
        <span>${s}</span>
      </div>`}).join("")}
  </div>`}function se(e,t){return e.map(i=>`
    <span style="
      display:inline-flex;align-items:center;gap:5px;
      padding:3px 10px;border-radius:var(--radius-full);
      background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);
      font-size:11.5px;font-weight:600;color:rgba(255,255,255,0.65);
      white-space:nowrap;
    ">${i}</span>
  `).join("")}const Ct={nombre:"Carlos Mendoza Reyes",iniciales:"CM",telefono:"55 1234 5678",email:"carlos.mendoza@gmail.com",cumple:"15 de Marzo",miembro_desde:"Enero 2021",preferencias:"Mesa exterior, sin picante, vino tinto",puntos:4820,mesero_fav:"Luis González",proxima_reserva:"Sábado 29 Jun · 20:30"},Ih=[{fecha:"Hoy 14:20",mesa:7,personas:2,platillos:"Carne Asada · Margarita x2",total:"$480",estado:"Completada",color:"#16a34a"},{fecha:"Hace 3 días",mesa:5,personas:4,platillos:"Costilla BBQ x2 · Guacamole · Agua x4",total:"$860",estado:"Completada",color:"#16a34a"},{fecha:"Hace 1 sem",mesa:12,personas:2,platillos:"Tacos x4 · Cerveza artesanal x2",total:"$310",estado:"Completada",color:"#16a34a"},{fecha:"Hace 2 sem",mesa:3,personas:6,platillos:"Menú degustación · Vino Malbec",total:"$1,240",estado:"Completada",color:"#16a34a"},{fecha:"Hace 1 mes",mesa:7,personas:2,platillos:"Salmón · Agua mineral · Postre",total:"$520",estado:"Completada",color:"#16a34a"},{fecha:"Hace 6 sem",mesa:5,personas:3,platillos:"Enchiladas · Pozole · Cerveza x3",total:"$410",estado:"Completada",color:"#16a34a"}],jh=[{texto:"Enviar felicitación de cumpleaños (15 Mar)",icono:"bi-cake2-fill",color:"#f59e0b"},{texto:"Confirmar reserva del sábado",icono:"bi-calendar-check",color:S.accent},{texto:"Aplicar descuento fidelidad 10%",icono:"bi-tag-fill",color:"#6366f1"}];function Fh(){const e=["Nuevo","Recurrente","Frecuente","VIP","Embajador"];return`
  <div style="--industry-accent:${S.accent};--industry-accent-rgb:${S.accentRgb}">

    <!-- Encabezado del registro -->
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:${S.accent};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">
          ${Ct.iniciales}
        </div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${Ct.nombre}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${se(["VIP ⭐","Frecuente","Sin picante","Mesa exterior"])}
          </div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Abriendo historial completo...')">
          <i class="bi bi-clock-history"></i> Historial
        </button>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Reserva creada para Carlos')">
          <i class="bi bi-calendar-plus"></i> Nueva reserva
        </button>
      </div>
    </div>

    <!-- Pipeline de fidelidad -->
    ${ie({stages:e,currentIndex:3,accent:S.accent})}

    <!-- Body: dos columnas -->
    <div class="row g-3">

      <!-- Columna izquierda: perfil -->
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Perfil del cliente</div>

          ${[{icon:"bi-telephone-fill",label:"Teléfono",val:Ct.telefono},{icon:"bi-envelope-fill",label:"Email",val:Ct.email},{icon:"bi-cake2-fill",label:"Cumpleaños",val:Ct.cumple},{icon:"bi-calendar3",label:"Miembro desde",val:Ct.miembro_desde},{icon:"bi-person-heart-fill",label:"Mesero favorito",val:Ct.mesero_fav}].map(i=>`
            <div style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-start">
              <i class="bi ${i.icon}" style="color:${S.accent};font-size:14px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${i.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:2px">${i.val}</div>
              </div>
            </div>
          `).join("")}

          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Preferencias</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.6">${Ct.preferencias}</div>
          </div>

          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">Puntos NUX</span>
              <span style="font-size:18px;font-weight:800;color:${S.accent}">${Ct.puntos.toLocaleString("es-MX")}</span>
            </div>
            <div style="margin-top:8px;height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:82%;background:${S.accent};border-radius:99px"></div>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.30);margin-top:5px">180 pts para nivel Embajador</div>
          </div>

          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">
              <i class="bi bi-calendar-event" style="margin-right:4px"></i>Próxima reserva
            </div>
            <div style="font-size:13px;font-weight:600;color:white">${Ct.proxima_reserva}</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.40);margin-top:2px">Mesa para 2 personas · Terraza</div>
          </div>
        </div>
      </div>

      <!-- Columna derecha: contenido principal -->
      <div class="col-lg-9">

        <!-- KPIs de colores -->
        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">
            ${j({icon:"bi-person-check-fill",label:"Visitas totales",value:38,delta:"+3",trend:"up",cardColor:"#1d4ed8"})}
          </div>
          <div class="col-6 col-xl-3">
            ${j({icon:"bi-cash-stack",label:"Ticket promedio",value:"$420",delta:"+8%",trend:"up",cardColor:"#1e40af",animate:!1})}
          </div>
          <div class="col-6 col-xl-3">
            ${j({icon:"bi-clock-history",label:"Días desde visita",value:0,delta:"Hoy",trend:"up",cardColor:"#b45309",animate:!1,deltaLabel:""})}
          </div>
          <div class="col-6 col-xl-3">
            ${j({icon:"bi-star-fill",label:"Satisfacción",value:"4.9",delta:"+0.1",trend:"up",cardColor:"#15803d",animate:!1})}
          </div>
        </div>

        <!-- Próximas acciones -->
        <div class="glass-card p-4 mb-3">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <h3 style="font-size:14px;font-weight:700;color:white;display:flex;align-items:center;gap:8px">
              <i class="bi bi-lightning-charge-fill" style="color:${S.accent}"></i>
              Próximas acciones
            </h3>
            <button class="btn-nux btn-accent-nux" style="font-size:12px;padding:5px 10px" onclick="window.__toastSuccess&&window.__toastSuccess('Acción añadida')">
              <i class="bi bi-plus"></i> Añadir
            </button>
          </div>
          ${jh.map(i=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer"
              onclick="window.__toastSuccess&&window.__toastSuccess('Acción marcada como completada')">
              <div style="width:30px;height:30px;border-radius:8px;background:${i.color}22;border:1px solid ${i.color}44;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                <i class="bi ${i.icono}" style="color:${i.color};font-size:13px"></i>
              </div>
              <span style="font-size:13px;color:rgba(255,255,255,0.72);flex:1">${i.texto}</span>
              <i class="bi bi-circle" style="color:rgba(255,255,255,0.20);font-size:16px"></i>
            </div>
          `).join("")}
        </div>

        <!-- Historial de visitas -->
        <div class="glass-card p-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Historial de visitas</h3>
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">38 visitas registradas</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table">
              <thead><tr>
                <th>Fecha</th><th>Mesa</th><th>Personas</th><th>Pedido</th><th style="text-align:right">Total</th><th>Estado</th>
              </tr></thead>
              <tbody>
                ${Ih.map(i=>`
                  <tr>
                    <td style="color:rgba(255,255,255,0.50);white-space:nowrap">${i.fecha}</td>
                    <td><strong>M${i.mesa}</strong></td>
                    <td><span style="color:rgba(255,255,255,0.50)">${i.personas} pax</span></td>
                    <td style="font-size:12px;color:rgba(255,255,255,0.55);max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${i.platillos}</td>
                    <td style="text-align:right;font-weight:700;color:${S.accent}">${i.total}</td>
                    <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${i.color}22;color:${i.color};border:1px solid ${i.color}33">${i.estado}</span></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const Bh=[{n:1,p:4,estado:"ocupado",tiempo:"42m"},{n:2,p:2,estado:"libre",tiempo:""},{n:3,p:6,estado:"ocupado",tiempo:"18m"},{n:4,p:4,estado:"reservado",tiempo:"20:30"},{n:5,p:2,estado:"ocupado",tiempo:"55m"},{n:6,p:4,estado:"libre",tiempo:""},{n:7,p:8,estado:"ocupado",tiempo:"12m"},{n:8,p:4,estado:"libre",tiempo:""},{n:9,p:6,estado:"ocupado",tiempo:"8m"},{n:10,p:2,estado:"ocupado",tiempo:"37m"},{n:11,p:4,estado:"libre",tiempo:""},{n:12,p:4,estado:"ocupado",tiempo:"22m"},{n:13,p:2,estado:"reservado",tiempo:"21:00"},{n:14,p:6,estado:"libre",tiempo:""},{n:15,p:4,estado:"ocupado",tiempo:"5m"},{n:16,p:2,estado:"libre",tiempo:""},{n:17,p:4,estado:"ocupado",tiempo:"48m"},{n:18,p:8,estado:"ocupado",tiempo:"31m"},{n:19,p:4,estado:"libre",tiempo:""},{n:20,p:2,estado:"reservado",tiempo:"21:30"}],Fe={ocupado:"#f97316",libre:"#22c55e",reservado:"#f59e0b"},Vh=[{mesa:3,items:"Tacos x3, Agua",total:"$285",min:18},{mesa:7,items:"Carne asada, Vino",total:"$680",min:12},{mesa:9,items:"Pizza, 2 Cervezas",total:"$320",min:8},{mesa:10,items:"Sopa, Enchiladas",total:"$195",min:37},{mesa:15,items:"Hamburguesa, Refresco",total:"$145",min:5}];function Hh(){const e=[{icon:"bi-grid-3x3",label:"Mesas Activas",value:14,suffix:"/20",delta:"+2 vs ayer",trend:"up",animate:!1},{icon:"bi-cash-stack",label:"Ventas Hoy",value:"$18,740",delta:"+12%",trend:"up",animate:!1},{icon:"bi-receipt",label:"Ticket Promedio",value:"$324",delta:"+8%",trend:"up",animate:!1},{icon:"bi-star-fill",label:"Satisfacción",value:"4.8",suffix:" ⭐",delta:"+0.2",trend:"up",animate:!1}];return`
  <div style="--industry-accent:${S.accent};--industry-accent-rgb:${S.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-grid-3x3" style="color:${S.accent};margin-right:10px"></i>Dashboard del Restaurante
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">La Mesa Digital — ${new Date().toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"})}</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(249,115,22,0.10);border:1px solid rgba(249,115,22,0.25);border-radius:var(--radius-md);font-size:13px;color:${S.accent}">
        <span class="status-dot active"></span> Cocina activa · 7 órdenes en proceso
      </div>
    </div>

    ${Oh(e,4)}

    <!-- MAPA DE MESAS -->
    <div class="row g-3 mb-3">
      <div class="col-lg-8">
        <div class="glass-card p-4">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:700;color:white">
              <i class="bi bi-grid-3x3" style="color:${S.accent};margin-right:8px"></i>Mapa del Salón
            </h3>
            <div style="display:flex;gap:14px;font-size:11px">
              ${Object.entries(Fe).map(([t,i])=>`<span style="display:flex;align-items:center;gap:5px;color:rgba(255,255,255,0.50)"><span style="width:10px;height:10px;border-radius:3px;background:${i};display:inline-block"></span>${t.charAt(0).toUpperCase()+t.slice(1)}</span>`).join("")}
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
            ${Bh.map(t=>`
              <div style="background:${Fe[t.estado]}18;border:1.5px solid ${Fe[t.estado]}60;border-radius:10px;padding:10px 6px;text-align:center;cursor:default;transition:all 0.2s"
                   onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform=''">
                <div style="font-size:10px;font-weight:700;color:${Fe[t.estado]};letter-spacing:0.06em;text-transform:uppercase">M${t.n}</div>
                <div style="font-size:16px;font-weight:800;color:white;margin:2px 0">${t.p}<span style="font-size:10px;font-weight:400;color:rgba(255,255,255,0.40)">p</span></div>
                <div style="font-size:10px;color:${Fe[t.estado]};font-weight:600">${t.tiempo||"—"}</div>
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
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${S.accent},rgba(249,115,22,0.3))"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">
            <i class="bi bi-fire" style="color:${S.accent};margin-right:8px"></i>Órdenes Activas
          </h3>
          ${Vh.map(t=>`
            <div style="padding:12px;margin-bottom:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);border-left:3px solid ${t.min<10?"#22c55e":t.min>30?"#f87171":S.accent}">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:12px;font-weight:700;color:white">Mesa ${t.mesa}</span>
                <span style="font-size:12px;font-weight:700;color:${S.accent}">${t.total}</span>
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
  `}function Nh(){Ki("chart-ventas-hora",{labels:Pn.labels,datasets:[{label:"Ventas ($)",data:Pn.data}]}),Na("chart-categorias",{labels:Rn.labels,data:Rn.data,height:200}),ye()}const An={ocupada:{color:"#f97316",bg:"rgba(249,115,22,0.10)",border:"rgba(249,115,22,0.25)",label:"Ocupada"},disponible:{color:"#22c55e",bg:"rgba(34,197,94,0.10)",border:"rgba(34,197,94,0.25)",label:"Libre"},reservada:{color:"#f59e0b",bg:"rgba(245,158,11,0.10)",border:"rgba(245,158,11,0.25)",label:"Reservada"}},Wh={"en cocina":{color:"#f97316",label:"En cocina"},entregada:{color:"#22c55e",label:"Entregada"},esperando:{color:"#f59e0b",label:"Esperando"},lista:{color:"#4ade80",label:"Lista"}};function Gh(){return`
  <div style="--industry-accent:${S.accent};--industry-accent-rgb:${S.accentRgb}">

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-grid-3x3" style="color:${S.accent};margin-right:10px"></i>Portal de Operaciones
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">Mesas y órdenes en tiempo real — ${S.nombre}</p>
      </div>
      <div style="display:flex;gap:8px">
        ${[{n:9,label:"Ocupadas",color:"#f97316"},{n:5,label:"Libres",color:"#22c55e"},{n:4,label:"Reserv.",color:"#f59e0b"}].map(e=>`
          <div style="padding:8px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:var(--radius-md);text-align:center">
            <div style="font-size:18px;font-weight:800;color:${e.color}">${e.n}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;font-weight:700">${e.label}</div>
          </div>
        `).join("")}
      </div>
    </div>

    <div class="row g-3">

      <!-- PLANO DE MESAS -->
      <div class="col-lg-7">
        <div class="glass-card p-4" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${S.accent},transparent)"></div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
            <h3 style="font-size:15px;font-weight:700;color:white">Plano del restaurante</h3>
            <div style="display:flex;gap:10px">
              ${Object.entries(An).map(([e,t])=>`
                <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.50)">
                  <div style="width:10px;height:10px;border-radius:3px;background:${t.color}"></div>
                  ${t.label}
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Zonas -->
          ${["Interior","Terraza","Bar","VIP"].map(e=>{const t=Th.filter(i=>i.zona===e);return`
            <div style="margin-bottom:16px">
              <div style="font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:8px">${e}</div>
              <div style="display:flex;flex-wrap:wrap;gap:8px">
                ${t.map(i=>{const s=An[i.estado];return`
                  <div onclick="window.__selectMesa&&window.__selectMesa(${i.id})"
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
                    <div style="font-size:16px;font-weight:800;color:${s.color}">M${i.id}</div>
                    <div style="font-size:10px;color:${s.color};opacity:0.8;font-weight:600">${s.label}</div>
                    ${i.tiempo?`<div style="font-size:10px;color:rgba(255,255,255,0.40)">${i.tiempo}</div>`:""}
                    <div style="position:absolute;top:4px;right:4px;font-size:10px;color:rgba(255,255,255,0.35)">${i.cap}p</div>
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
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${S.accent},transparent)"></div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:700;color:white">Órdenes activas</h3>
            <button class="btn-nux btn-primary-nux" style="font-size:12px;padding:6px 12px" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva orden creada')">
              <i class="bi bi-plus-lg"></i> Nueva
            </button>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;max-height:520px;overflow-y:auto">
            ${Eh.map(e=>{const t=Wh[e.estado]||{color:"#888",label:e.estado};return`
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
                    <span style="font-size:13px;font-weight:700;color:white">${e.id}</span>
                    <span style="font-size:12px;color:rgba(255,255,255,0.35);margin-left:8px">Mesa ${e.mesa}</span>
                  </div>
                  <span style="font-size:11px;font-weight:700;color:${t.color};padding:2px 8px;background:${t.color}18;border-radius:99px;border:1px solid ${t.color}30">${t.label}</span>
                </div>
                <div style="font-size:12px;color:rgba(255,255,255,0.45);margin-bottom:8px">${e.items.join(" · ")}</div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:12px;color:rgba(255,255,255,0.35)">${e.mesero} · ${e.tiempo}</span>
                  <span style="font-size:14px;font-weight:700;color:${S.accent}">${e.total}</span>
                </div>
              </div>
              `}).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>
  `}const R={nombre:"MediCore",giro:"Clínica Médica",logo:"bi-heart-pulse-fill",accent:"#06b6d4",accentRgb:"6, 182, 212"},Yh=[{hora:"08:00",paciente:"Roberto Silva",doctor:"Dr. Reyes",tipo:"Consulta",estado:"atendido"},{hora:"08:30",paciente:"Lupita Morales",doctor:"Dra. Torres",tipo:"Seguimiento",estado:"atendido"},{hora:"09:00",paciente:"Daniel Herrera",doctor:"Dr. Medina",tipo:"Urgencia",estado:"atendido"},{hora:"09:30",paciente:"Gabriela Ríos",doctor:"Dra. Flores",tipo:"Pediatría",estado:"atendido"},{hora:"10:00",paciente:"Marcos Gutiérrez",doctor:"Dr. Reyes",tipo:"Consulta",estado:"atendido"},{hora:"10:30",paciente:"Verónica Núñez",doctor:"Dra. Torres",tipo:"Prenatal",estado:"en sala"},{hora:"11:00",paciente:"Héctor Ramírez",doctor:"Dr. Sánchez",tipo:"Dermatología",estado:"pendiente"},{hora:"11:30",paciente:"Adriana Castro",doctor:"Dra. Rojas",tipo:"Endocrinología",estado:"pendiente"},{hora:"14:00",paciente:"Elena Vázquez",doctor:"Dr. Reyes",tipo:"Control",estado:"en curso"},{hora:"14:30",paciente:"Fernando Castillo",doctor:"Dra. Torres",tipo:"Seguimiento",estado:"pendiente"},{hora:"15:00",paciente:"Patricia Gómez",doctor:"Dr. Medina",tipo:"Chequeo",estado:"pendiente"},{hora:"15:30",paciente:"Arturo Mendoza",doctor:"Dr. Vargas",tipo:"Neurología",estado:"pendiente"}],Dn={labels:["Lun","Mar","Mié","Jue","Vie","Sáb"],data:[28,34,31,38,42,18]};function Xh(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${R.accent};--industry-accent-rgb:${R.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${R.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>

    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>

      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${R.accent};margin-bottom:14px">
            <i class="bi ${R.logo}"></i> ${R.giro}
          </div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">
            Software clínico para <span style="color:${R.accent}">${R.nombre}</span>
          </h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">
            Gestión completa de tu clínica: agenda de citas, expedientes, consultorios y estadísticas médicas en tiempo real.
          </p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/salud/crm",icon:"bi-people-fill",label:"Gestión de Pacientes",desc:"Expedientes, historial y próximas citas."},{path:"/salud/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard Clínico",desc:"Citas del día, ocupación y estadísticas."},{path:"/salud/operaciones",icon:"bi-calendar-check",label:"Agenda de Citas",desc:"Vista de consultorios y sala de espera."}].map(e=>`
              <div onclick="window.location.hash='${e.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${R.accentRgb},0.06);border:1px solid rgba(${R.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${R.accentRgb},0.12)';this.style.borderColor='rgba(${R.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${R.accentRgb},0.06)';this.style.borderColor='rgba(${R.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${R.accentRgb},0.15);color:${R.accent};flex-shrink:0"><i class="bi ${e.icon}"></i></div>
                <div style="flex:1">
                  <div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${e.label}</div>
                  <div style="font-size:13px;color:rgba(255,255,255,0.42)">${e.desc}</div>
                </div>
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
              <div><div style="font-size:14px;font-weight:700;color:white">${R.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Sistema clínico</div></div>
              <span class="badge-nux badge-success" style="margin-left:auto">8 Consultorios</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              ${[{label:"Citas hoy",val:"34"},{label:"Atendidos",val:"21"},{label:"En espera",val:"4"},{label:"Satisfacción",val:"4.9 ⭐"}].map(e=>`<div style="padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px"><div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:4px">${e.label}</div><div style="font-size:18px;font-weight:800;color:white">${e.val}</div></div>`).join("")}
            </div>
            <div style="padding:14px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
              <div style="font-size:11px;color:rgba(255,255,255,0.30);text-transform:uppercase;font-weight:700;margin-bottom:10px">Citas por especialidad</div>
              <div style="display:flex;flex-direction:column;gap:6px">
                ${[["Med. General",35],["Ginecología",22],["Cardiología",18],["Pediatría",12]].map(([e,t])=>`
                  <div style="display:flex;align-items:center;gap:8px">
                    <div style="font-size:12px;color:rgba(255,255,255,0.50);width:100px">${e}</div>
                    <div style="flex:1;height:6px;background:rgba(255,255,255,0.06);border-radius:3px">
                      <div style="width:${t}%;height:100%;background:${R.accent};border-radius:3px"></div>
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
  `}const ct={nombre:"Elena Vázquez Mora",iniciales:"EV",edad:42,tel:"55 1234 5678",sangre:"A+",nss:"45871234",nacimiento:"14 Agosto 1982",doctor:"Dr. Alejandro Reyes",especialidad:"Medicina Interna",consultorio:"C-01",diagnosticos:["Hipertensión arterial (CIE-10: I10)","Dislipidemia (CIE-10: E78)","Sobrepeso (CIE-10: E66)"],alergias:["Penicilina","AINEs (moderado)"],proxima_cita:"Hoy — 14:30 h"},Uh=[{nombre:"Losartán 50mg",dosis:"1 tab c/24h",inicio:"12 Ene 2025"},{nombre:"Atorvastatina 20mg",dosis:"1 tab c/24h",inicio:"12 Ene 2025"},{nombre:"Metformina 850mg",dosis:"1 tab c/12h",inicio:"04 Mar 2025"}],qh=[{fecha:"Hoy 14:30",motivo:"Control mensual",doctor:"Dr. Reyes",dx:"Hipertensión",r:"Pendiente",c:"#f59e0b"},{fecha:"28 May 2025",motivo:"Rev. laboratorios",doctor:"Dr. Reyes",dx:"Colesterol elevado",r:"Ajuste tx",c:"#16a34a"},{fecha:"01 May 2025",motivo:"Control mensual",doctor:"Dr. Reyes",dx:"TA estable",r:"Estable",c:"#16a34a"},{fecha:"12 Mar 2025",motivo:"Revisión general",doctor:"Dr. Reyes",dx:"Evaluación inicial",r:"Inicio tx",c:"#16a34a"},{fecha:"20 Ene 2025",motivo:"Primera consulta",doctor:"Dr. Reyes",dx:"Diagnóstico emitido",r:"Dx",c:"#16a34a"}];function Kh(){const e=R.accent,t=[{icon:"bi-telephone-fill",label:"Teléfono",val:ct.tel},{icon:"bi-droplet-fill",label:"Tipo de sangre",val:ct.sangre},{icon:"bi-calendar3",label:"Nacimiento",val:`${ct.nacimiento}`},{icon:"bi-shield-fill",label:"NSS",val:ct.nss}];return`
  <div style="--industry-accent:${e};--industry-accent-rgb:${R.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:${e};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${ct.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">
            ${ct.nombre}
            <span style="font-size:13px;font-weight:400;color:rgba(255,255,255,0.38);margin-left:6px">${ct.edad} años · ${ct.sangre}</span>
          </h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${se(["Hipertensión","Dislipidemia","⚠ Alerg. AINEs","Control mensual"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando receta...')"><i class="bi bi-file-earmark-medical"></i> Receta</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Cita agendada para Elena')"><i class="bi bi-calendar-plus"></i> Agendar</button>
      </div>
    </div>

    ${ie({stages:["Primera cita","Diagnóstico","Tratamiento","Control","Alta"],currentIndex:2,accent:e})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Datos del paciente</div>
          ${t.map(i=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${i.icon}" style="color:${e};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${i.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${i.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:10px">Médico tratante</div>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar" style="background:rgba(6,182,212,0.18);color:${e}">R</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:white">${ct.doctor}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.40)">${ct.especialidad} · ${ct.consultorio}</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Alergias conocidas</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">${ct.alergias.map(i=>`<span style="padding:3px 8px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.25);border-radius:99px;font-size:11px;color:#f87171;font-weight:600">${i}</span>`).join("")}</div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="display:flex;align-items:center;gap:8px;padding:10px;background:rgba(245,158,11,0.10);border:1px solid rgba(245,158,11,0.25);border-radius:var(--radius-md)">
              <i class="bi bi-alarm-fill" style="color:#f59e0b"></i>
              <div>
                <div style="font-size:11px;font-weight:700;color:#f59e0b">Próxima cita</div>
                <div style="font-size:13px;font-weight:600;color:white">${ct.proxima_cita}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">${j({icon:"bi-clipboard2-pulse-fill",label:"Consultas totales",value:18,delta:"+2",trend:"up",cardColor:"#1d4ed8"})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-capsule-pill",label:"Medicamentos activos",value:3,delta:"Vigentes",trend:"up",cardColor:"#1e40af",deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-activity",label:"Última TA registrada",value:"128/84",delta:"Monitorear",trend:"down",cardColor:"#b45309",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-emoji-smile-fill",label:"Adherencia tratam.",value:"94%",delta:"Excelente",trend:"up",cardColor:"#15803d",animate:!1,deltaLabel:""})}</div>
        </div>

        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px;display:flex;align-items:center;gap:8px">
            <i class="bi bi-clipboard2-fill" style="color:${e}"></i> Diagnósticos activos
          </h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
            ${ct.diagnosticos.map(i=>`<div style="padding:8px 14px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.20);border-radius:var(--radius-md);font-size:13px;color:rgba(255,255,255,0.80)">${i}</div>`).join("")}
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:14px">
            <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:10px">Medicación actual</div>
            ${Uh.map(i=>`
              <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:var(--radius-md);border:1px solid rgba(255,255,255,0.06);margin-bottom:6px">
                <i class="bi bi-capsule-pill" style="color:${e};flex-shrink:0"></i>
                <div style="flex:1"><span style="font-size:13px;font-weight:600;color:white">${i.nombre}</span> <span style="font-size:12px;color:rgba(255,255,255,0.40);margin-left:8px">${i.dosis}</span></div>
                <span style="font-size:11px;color:rgba(255,255,255,0.30)">desde ${i.inicio}</span>
              </div>`).join("")}
          </div>
        </div>

        <div class="glass-card p-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Historial de consultas</h3>
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">18 registradas</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>Fecha</th><th>Motivo</th><th>Médico</th><th>Dx / Nota</th><th>Resultado</th></tr></thead>
            <tbody>${qh.map(i=>`<tr>
              <td style="white-space:nowrap;color:rgba(255,255,255,0.45)">${i.fecha}</td>
              <td><strong>${i.motivo}</strong></td>
              <td style="color:rgba(255,255,255,0.55)">${i.doctor}</td>
              <td style="font-size:12px;color:rgba(255,255,255,0.55)">${i.dx}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${i.c}22;color:${i.c};border:1px solid ${i.c}33">${i.r}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const Me=R.accent,Jh=R.accentRgb;function Be(e,t,i,s,o,n,a,r){const h=270*((e-t)/(i-t)),g=225,u=g+h;function f(M,z){const P=(M-90)*Math.PI/180;return[50+z*Math.cos(P),50+z*Math.sin(P)]}const[b,m]=f(g,36),[x,w]=f(u,36),y=h>180?1:0,v=`M${f(g,36).join(",")} A36 36 0 1 1 ${f(g+270,36).join(",")}`,k=`M${b},${m} A36 36 0 ${y} 1 ${x},${w}`,_=e>=r?"#ef4444":e>=a?"#f59e0b":n;return`
  <div style="text-align:center">
    <svg viewBox="0 0 100 72" style="width:88px;height:68px;overflow:visible">
      <path d="${v}" fill="none" stroke="${_}18" stroke-width="7" stroke-linecap="round"/>
      <path d="${k}" fill="none" stroke="${_}" stroke-width="7" stroke-linecap="round"/>
      <text x="50" y="47" text-anchor="middle" fill="white" font-size="14" font-weight="800" font-family="Inter,sans-serif">${e}</text>
      <text x="50" y="58" text-anchor="middle" fill="rgba(255,255,255,0.40)" font-size="8" font-family="Inter,sans-serif">${s}</text>
    </svg>
    <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${_};margin-top:-4px">${o}</div>
  </div>`}const Zh={urgente:"#ef4444",prioritario:"#f97316",normal:"#0284c7",programado:"rgba(255,255,255,0.28)"},Qh={urgente:"Urgente",prioritario:"Prioritario",normal:"Normal",programado:"Programado"},Os=[{nombre:"Ana M.",edad:68,motivo:"Dolor pecho",tiempo_espera:"2 min",dr:"Dr. Medina",esp:"Cardiología",nivel:"urgente"},{nombre:"Carlos V.",edad:8,motivo:"Fiebre alta 39.5",tiempo_espera:"8 min",dr:"Dra. Flores",esp:"Pediatría",nivel:"urgente"},{nombre:"Laura P.",edad:34,motivo:"Control ginecológico",tiempo_espera:"14 min",dr:"Dra. Torres",esp:"Ginecología",nivel:"normal"},{nombre:"Miguel R.",edad:55,motivo:"Chequeo cardiaco",tiempo_espera:"22 min",dr:"Dr. Medina",esp:"Cardiología",nivel:"prioritario"},{nombre:"Elena F.",edad:29,motivo:"Vacunación",tiempo_espera:"18 min",dr:"Dra. Flores",esp:"Pediatría",nivel:"normal"},{nombre:"Jorge C.",edad:45,motivo:"Dermatitis",tiempo_espera:"35 min",dr:"Dr. Sánchez",esp:"Dermatología",nivel:"normal"},{nombre:"Patricia R.",edad:62,motivo:"Control diabetes",tiempo_espera:"—",dr:"Dr. Reyes",esp:"Medicina General",nivel:"programado"}];function tg(){return Os.map(e=>{var i;const t=Zh[e.nivel];return`
    <div style="display:flex;align-items:center;gap:10px;padding:9px 10px;margin-bottom:5px;background:${t}08;border:1px solid ${t}25;border-left:3px solid ${t};border-radius:0 var(--radius-md) var(--radius-md) 0">
      <div style="width:34px;height:34px;border-radius:50%;background:${t}18;border:1.5px solid ${t}40;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${t};flex-shrink:0">
        ${e.nombre.charAt(0)}${((i=e.nombre.split(" ")[1])==null?void 0:i.charAt(0))||""}
      </div>
      <div style="flex:1;min-width:0">
        <div style="font-size:12px;font-weight:700;color:white;display:flex;align-items:center;gap:6px">
          ${e.nombre} <span style="font-size:10px;color:rgba(255,255,255,0.35)">(${e.edad}a)</span>
        </div>
        <div style="font-size:11px;color:rgba(255,255,255,0.45);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.motivo}</div>
      </div>
      <div style="text-align:right;flex-shrink:0">
        <div style="font-size:10px;font-weight:700;color:${t}">${Qh[e.nivel]}</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.30);margin-top:1px">⏱ ${e.tiempo_espera}</div>
      </div>
    </div>`}).join("")}const eg=[{id:"C-01",dr:"Dr. Reyes",esp:"Medicina General",estado:"ocupado"},{id:"C-02",dr:"Dra. Torres",esp:"Ginecología",estado:"ocupado"},{id:"C-03",dr:"Dr. Medina",esp:"Cardiología",estado:"libre"},{id:"C-04",dr:"Dra. Flores",esp:"Pediatría",estado:"ocupado"},{id:"C-05",dr:"Dr. Sánchez",esp:"Dermatología",estado:"pausa"},{id:"C-06",dr:"Dra. Rojas",esp:"Endocrinología",estado:"ocupado"}];function ig(){return`<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
    ${eg.map(e=>{const t=e.estado==="ocupado"?Me:e.estado==="libre"?"#22c55e":"#f59e0b",i=e.estado==="ocupado"?"En consulta":e.estado==="libre"?"Disponible":"Pausa";return`
      <div style="padding:10px;background:${t}0a;border:1px solid ${t}28;border-radius:var(--radius-md);position:relative;overflow:hidden">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:${t}"></div>
        <div style="font-size:13px;font-weight:800;color:${t};margin-bottom:4px">${e.id}</div>
        <div style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.80);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.dr}</div>
        <div style="font-size:10px;color:rgba(255,255,255,0.40);margin-top:1px">${e.esp}</div>
        <div style="font-size:10px;font-weight:700;color:${t};margin-top:5px;text-transform:uppercase;letter-spacing:0.05em">${i}</div>
      </div>`}).join("")}
  </div>`}function sg(){const e=Os.filter(i=>i.nivel==="urgente").length,t=Os.filter(i=>i.nivel!=="programado").length;return`
  <div style="--industry-accent:${Me};--industry-accent-rgb:${Jh}">

    <!-- Clinical header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:2px">
          <i class="bi bi-heart-pulse-fill" style="color:${Me};margin-right:10px"></i>Centro de Control Clínico
        </h1>
        <p style="font-size:13px;color:rgba(255,255,255,0.38)">MediCore · ${e} urgente${e!==1?"s":""} · ${t} pacientes en espera</p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${e>0?`<div style="padding:6px 12px;background:rgba(239,68,68,0.15);border:1px solid rgba(239,68,68,0.30);border-radius:var(--radius-md);font-size:12px;font-weight:700;color:#f87171;display:flex;align-items:center;gap:6px"><span style="animation:pulse 1s infinite;width:6px;height:6px;border-radius:50%;background:#f87171;display:inline-block"></span>${e} caso urgente</div>`:""}
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva cita registrada')"><i class="bi bi-calendar-plus"></i> Nueva cita</button>
      </div>
    </div>

    <!-- Vitals panel — unique to health industry -->
    <div class="glass-card p-4 mb-3">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <h3 style="font-size:13px;font-weight:700;color:white;display:flex;align-items:center;gap:8px">
          <i class="bi bi-clipboard2-pulse-fill" style="color:${Me}"></i> Signos vitales promedio — Pacientes activos hoy
        </h3>
        <span style="font-size:11px;color:rgba(255,255,255,0.30)">Actualizado hace 3 min</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-around;flex-wrap:wrap;gap:12px">
        ${Be(128,80,180,"mmHg","SISTÓLICA",Me,130,160)}
        ${Be(82,60,120,"mmHg","DIASTÓLICA","#22c55e",85,100)}
        ${Be(76,40,120,"bpm","FREC. CARDÍACA","#f59e0b",90,110)}
        ${Be(98,90,100,"%","SPO₂","#06b6d4",0,94)}
        ${Be(36.8,35,40,"°C","TEMPERATURA","#8b5cf6",37.5,38.5)}
        <div style="text-align:center;padding:0 10px">
          <div style="font-size:2rem;font-weight:900;color:white;line-height:1">34</div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.35);margin-top:4px">CITAS HOY</div>
          <div style="font-size:11px;color:#22c55e;margin-top:4px">21 atendidos</div>
        </div>
        <div style="text-align:center;padding:0 10px">
          <div style="font-size:2rem;font-weight:900;color:white;line-height:1">12</div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.35);margin-top:4px">MIN ESPERA</div>
          <div style="font-size:11px;color:#22c55e;margin-top:4px">−5 min</div>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <!-- Patient queue -->
      <div class="col-lg-6">
        <div class="glass-card p-4 h-100">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <h3 style="font-size:14px;font-weight:700;color:white">Cola de atención</h3>
            <div style="display:flex;gap:6px">
              <span style="font-size:10px;font-weight:700;padding:2px 7px;background:rgba(239,68,68,0.15);color:#f87171;border-radius:99px">2 urgente</span>
              <span style="font-size:10px;font-weight:700;padding:2px 7px;background:rgba(249,115,22,0.12);color:#fb923c;border-radius:99px">1 prio.</span>
            </div>
          </div>
          ${tg()}
        </div>
      </div>

      <!-- Consultories + chart -->
      <div class="col-lg-6">
        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:12px">Estado de consultorios</h3>
          ${ig()}
        </div>
        <div class="glass-card p-4">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:12px">Citas por día</h3>
          <div class="chart-container" style="height:120px"><canvas id="chart-citas-dia"></canvas></div>
        </div>
      </div>
    </div>

    <!-- Quick stats row -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:10px">
      ${[{label:"Pacientes atendidos",val:"21",sub:"de 34 citas del día",c:Me},{label:"Ingresos del mes",val:"$284K",sub:"+18% vs anterior",c:"#22c55e"},{label:"Satisfacción",val:"4.9 ⭐",sub:"Últimos 30 días",c:"#f59e0b"},{label:"Recetas emitidas",val:"47",sub:"Hoy",c:"#8b5cf6"},{label:"Laboratorios solicit.",val:"12",sub:"5 en proceso",c:"#06b6d4"}].map(i=>`
        <div class="glass-card p-3">
          <div style="font-size:1.5rem;font-weight:800;color:white;line-height:1">${i.val}</div>
          <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:rgba(255,255,255,0.30);margin-top:4px">${i.label}</div>
          <div style="font-size:10px;color:${i.c};margin-top:2px">${i.sub}</div>
        </div>`).join("")}
    </div>
  </div>`}function og(){Ki("chart-citas-dia",{labels:Dn.labels,datasets:[{label:"Citas",data:Dn.data}],height:120}),ye()}const Tn={atendido:{color:"#22c55e",bg:"rgba(34,197,94,0.10)"},"en sala":{color:"#f59e0b",bg:"rgba(245,158,11,0.10)"},"en curso":{color:"#06b6d4",bg:"rgba(6,182,212,0.15)"},pendiente:{color:"rgba(255,255,255,0.30)",bg:"rgba(255,255,255,0.04)"}};function ng(){return`
  <div style="--industry-accent:${R.accent};--industry-accent-rgb:${R.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-calendar-check" style="color:${R.accent};margin-right:10px"></i>Agenda de Citas
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${R.nombre} — Vista operativa del día</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva cita agendada')">
        <i class="bi bi-plus-lg"></i> Nueva cita
      </button>
    </div>

    <!-- Stats rápidos -->
    <div class="row g-3 mb-3">
      ${[{label:"Programadas",val:"34",color:"rgba(255,255,255,0.60)",icon:"bi-calendar3"},{label:"Atendidas",val:"21",color:"#22c55e",icon:"bi-check-circle-fill"},{label:"En espera",val:"4",color:"#f59e0b",icon:"bi-hourglass-split"},{label:"Restantes",val:"9",color:R.accent,icon:"bi-clock-fill"}].map(e=>`
        <div class="col-md-3 col-6">
          <div class="glass-card p-3 text-center">
            <i class="bi ${e.icon}" style="font-size:20px;color:${e.color};margin-bottom:8px;display:block"></i>
            <div style="font-size:1.6rem;font-weight:800;color:${e.color}">${e.val}</div>
            <div style="font-size:11px;color:rgba(255,255,255,0.35);font-weight:700;text-transform:uppercase">${e.label}</div>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="row g-3">
      <!-- Agenda del día -->
      <div class="col-lg-7">
        <div class="glass-card p-4" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${R.accent},transparent)"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Agenda del día</h3>
          <div style="display:flex;flex-direction:column;gap:6px;max-height:480px;overflow-y:auto">
            ${Yh.map(e=>{const t=Tn[e.estado]||Tn.pendiente;return`
              <div style="display:flex;align-items:center;gap:12px;padding:12px 14px;background:${t.bg};border-radius:var(--radius-md);border-left:3px solid ${t.color};cursor:pointer;transition:filter 0.2s"
              onmouseenter="this.style.filter='brightness(1.15)'"
              onmouseleave="this.style.filter='none'"
              >
                <div style="font-size:12px;font-weight:700;color:${t.color};min-width:44px">${e.hora}</div>
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88)">${e.paciente}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.40)">${e.doctor} · ${e.tipo}</div>
                </div>
                <span style="font-size:10px;font-weight:700;color:${t.color};text-transform:uppercase;padding:2px 8px;background:${t.color}22;border-radius:99px">${e.estado}</span>
              </div>
              `}).join("")}
          </div>
        </div>
      </div>

      <!-- Sala de espera -->
      <div class="col-lg-5">
        <div class="glass-card p-4 h-100">
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">
            <i class="bi bi-person-standing" style="color:${R.accent};margin-right:8px"></i>Sala de espera
          </h3>
          ${[{nombre:"Verónica Núñez",dr:"Dra. Torres",esp:"Ginecología",espera:"5 min",turno:1},{nombre:"Héctor Ramírez",dr:"Dr. Sánchez",esp:"Dermatología",espera:"18 min",turno:2},{nombre:"Adriana Castro",dr:"Dra. Rojas",esp:"Endocrinología",espera:"31 min",turno:3},{nombre:"Fernando Castillo",dr:"Dra. Torres",esp:"Seguimiento",espera:"45 min",turno:4}].map(e=>`
            <div style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);margin-bottom:8px">
              <div style="width:32px;height:32px;border-radius:50%;background:rgba(${R.accentRgb},0.15);color:${R.accent};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800">${e.turno}</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88)">${e.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.38)">${e.dr} · ${e.esp}</div>
              </div>
              <div style="text-align:right">
                <div style="font-size:12px;font-weight:700;color:${e.espera.includes("5 min")?"#22c55e":e.espera.includes("18")?"#f59e0b":"#f87171"}">${e.espera}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.30)">en espera</div>
              </div>
            </div>
          `).join("")}

          <div class="nux-divider"></div>
          <div style="padding:12px;background:rgba(${R.accentRgb},0.06);border:1px solid rgba(${R.accentRgb},0.18);border-radius:var(--radius-md)">
            <div style="font-size:12px;font-weight:700;color:${R.accent};margin-bottom:4px"><i class="bi bi-info-circle"></i> Tiempo promedio de espera</div>
            <div style="font-size:24px;font-weight:900;color:white">12 min</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.40)">↓ 5 min vs. promedio semanal</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `}const I={nombre:"BuildPro",giro:"Constructora",logo:"bi-building-gear",accent:"#eab308",accentRgb:"234, 179, 8"},ag=[{id:1,nombre:"Torres Mirador",cliente:"Inmobiliaria Pedraza",tipo:"Residencial",avance:78,presupuesto:"$3.2M",gastado:"$2.48M",inicio:"15 Ene 2025",fin:"30 Sep 2025",estatus:"en curso",personal:14,obra:"Av. Insurgentes 2240"},{id:2,nombre:"Centro Comercial Hub",cliente:"Grupo Arenas SAB",tipo:"Comercial",avance:45,presupuesto:"$5.8M",gastado:"$2.61M",inicio:"01 Mar 2025",fin:"31 Mar 2026",estatus:"en curso",personal:22,obra:"Periférico Norte km 14"},{id:3,nombre:"Bodega Logística GN",cliente:"GrupoNova Logistics",tipo:"Industrial",avance:92,presupuesto:"$1.4M",gastado:"$1.28M",inicio:"05 Nov 2024",fin:"30 Jun 2025",estatus:"finalizando",personal:8,obra:"Parque Ind. Cuautitlán"},{id:4,nombre:"Residencial Álamos",cliente:"Fam. Castellanos",tipo:"Residencial",avance:32,presupuesto:"$980K",gastado:"$313K",inicio:"10 Abr 2025",fin:"28 Feb 2026",estatus:"en curso",personal:6,obra:"Álamos, Edomex"},{id:5,nombre:"Oficinas Corporat.",cliente:"TechOps México SA",tipo:"Oficinas",avance:58,presupuesto:"$2.1M",gastado:"$1.21M",inicio:"20 Feb 2025",fin:"15 Nov 2025",estatus:"en curso",personal:11,obra:"Polanco, CDMX"},{id:6,nombre:"Escuela Primaria M.",cliente:"Municipio Texcoco",tipo:"Educativo",avance:71,presupuesto:"$640K",gastado:"$454K",inicio:"03 Feb 2025",fin:"31 Jul 2025",estatus:"en curso",personal:9,obra:"Texcoco, Edomex"},{id:7,nombre:"Planta Procesadora",cliente:"Alimentos Del Norte",tipo:"Industrial",avance:15,presupuesto:"$4.2M",gastado:"$630K",inicio:"01 Jun 2025",fin:"31 Dic 2026",estatus:"iniciando",personal:5,obra:"Monterrey, NL"},{id:8,nombre:"Ampliación Hospital",cliente:"Clínica San Ángel",tipo:"Salud",avance:40,presupuesto:"$1.8M",gastado:"$720K",inicio:"15 Mar 2025",fin:"28 Feb 2026",estatus:"en curso",personal:12,obra:"San Ángel, CDMX"}];ag.map(e=>e.nombre.split(" ").slice(0,2).join(" "));const rg=[{nombre:"Ing. Marco Salinas",rol:"Residente de Obra",proyecto:"Torres Mirador",tel:"55 1122 3344",asistencia:"presente"},{nombre:"Ing. Carmen Ruiz",rol:"Supervisora",proyecto:"Centro Comercial Hub",tel:"55 5566 7788",asistencia:"presente"},{nombre:"Arq. Jesús Molina",rol:"Arquitecto",proyecto:"Oficinas Corporat.",tel:"55 9900 1122",asistencia:"presente"},{nombre:"Ing. Beto Vargas",rol:"Jefe de Cuadrilla",proyecto:"Torres Mirador",tel:"55 3344 5566",asistencia:"presente"},{nombre:"Ing. Gloria Torres",rol:"Estructurista",proyecto:"Ampliación Hospital",tel:"55 7788 9900",asistencia:"ausente"}];function lg(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${I.accent};--industry-accent-rgb:${I.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${I.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>
    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>
      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${I.accent};margin-bottom:14px"><i class="bi ${I.logo}"></i> ${I.giro}</div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">Control total de obras para <span style="color:${I.accent}">${I.nombre}</span></h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">Seguimiento de proyectos en tiempo real, control de materiales, gestión de personal y análisis financiero de tus obras.</p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/construccion/crm",icon:"bi-hammer",label:"Gestión de Proyectos",desc:"Portafolio de obras, avance y presupuesto."},{path:"/construccion/dashboard",icon:"bi-bar-chart-fill",label:"Dashboard de Obra",desc:"KPIs clave, materiales críticos y avance global."},{path:"/construccion/operaciones",icon:"bi-kanban-fill",label:"Tablero Operativo",desc:"Kanban de actividades, cuadrillas y bitácora."}].map(e=>`
              <div onclick="window.location.hash='${e.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${I.accentRgb},0.06);border:1px solid rgba(${I.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${I.accentRgb},0.12)';this.style.borderColor='rgba(${I.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${I.accentRgb},0.06)';this.style.borderColor='rgba(${I.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${I.accentRgb},0.15);color:${I.accent};flex-shrink:0"><i class="bi ${e.icon}"></i></div>
                <div style="flex:1"><div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${e.label}</div><div style="font-size:13px;color:rgba(255,255,255,0.42)">${e.desc}</div></div>
                <i class="bi bi-chevron-right" style="color:${I.accent};font-size:14px"></i>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="col-lg-6">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${I.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${I.accent},transparent)"></div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${I.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${I.accent}"><i class="bi ${I.logo}"></i></div>
              <div><div style="font-size:14px;font-weight:700;color:white">${I.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Control de Obras</div></div>
              <span class="badge-nux badge-warning" style="margin-left:auto">8 Proyectos</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px">
              ${[{nombre:"Torres Mirador",avance:78,color:"#22c55e"},{nombre:"Centro Comercial Hub",avance:45,color:I.accent},{nombre:"Bodega Logística GN",avance:92,color:"#22c55e"},{nombre:"Oficinas Corporativas",avance:58,color:I.accent}].map(e=>`
                <div style="padding:12px;background:rgba(255,255,255,0.025);border-radius:var(--radius-md)">
                  <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                    <span style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.80)">${e.nombre}</span>
                    <span style="font-size:12px;font-weight:700;color:${e.color}">${e.avance}%</span>
                  </div>
                  <div class="nux-progress"><div class="nux-progress-bar" style="width:${e.avance}%;background:${e.color}"></div></div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}const ut={nombre:"Torre Residencial Prado",codigo:"PRY-0012",cliente:"Inmobiliaria Castellanos SA",contacto:"Arq. Roberto Castellanos",tel:"55 4400 1234",tipo:"Residencial · 24 departamentos",ubicacion:"Av. Reforma 2240, CDMX",avance:78,inicio:"15 Ene 2025",fin_estimado:"30 Sep 2025",personal:14,supervisor:"Ing. Marco Herrera"},hs=[{nombre:"Cimentación y estructura",fechaPlaneada:"28 Feb 2025",fechaReal:"25 Feb 2025",estatus:"Completado",c:"#16a34a"},{nombre:"Instalaciones eléctricas",fechaPlaneada:"31 Mar 2025",fechaReal:"04 Abr 2025",estatus:"Completado",c:"#16a34a"},{nombre:"Instalaciones hidráulicas",fechaPlaneada:"30 Abr 2025",fechaReal:"30 Abr 2025",estatus:"Completado",c:"#16a34a"},{nombre:"Acabados interiores",fechaPlaneada:"30 Jun 2025",fechaReal:"—",estatus:"En proceso",c:"#f59e0b"},{nombre:"Fachada y áreas comunes",fechaPlaneada:"31 Jul 2025",fechaReal:"—",estatus:"Pendiente",c:"rgba(255,255,255,0.30)"},{nombre:"Entrega final y escrituras",fechaPlaneada:"30 Sep 2025",fechaReal:"—",estatus:"Pendiente",c:"rgba(255,255,255,0.30)"}],cg=[{texto:"Entrega de acero estructural retrasada 4 días",icono:"bi-exclamation-triangle-fill",color:"#f59e0b"},{texto:"Inspección municipal — programar visita",icono:"bi-building-check",color:"#06b6d4"},{texto:"Pago estimación #7 pendiente de cliente",icono:"bi-cash-stack",color:"#16a34a"}];function dg(){const e=I.accent;return`
  <div style="--industry-accent:${e};--industry-accent-rgb:${I.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:var(--radius-md);background:${e};display:flex;align-items:center;justify-content:center;font-size:22px;color:white;flex-shrink:0">
          <i class="bi bi-building"></i>
        </div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${ut.nombre} <span style="font-size:13px;font-weight:400;color:rgba(255,255,255,0.35)">${ut.codigo}</span></h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${se([ut.tipo,"En tiempo","Alta prioridad","Cliente VIP"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando reporte de avance...')"><i class="bi bi-file-earmark-bar-graph"></i> Reporte</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Estimación creada')"><i class="bi bi-plus-lg"></i> Nueva estimación</button>
      </div>
    </div>

    ${ie({stages:["Prospecto","Cotización","Contrato firmado","En obra","Entregado"],currentIndex:3,accent:e})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Datos del proyecto</div>
          ${[{icon:"bi-person-lines-fill",label:"Cliente",val:ut.cliente},{icon:"bi-person-fill",label:"Contacto",val:ut.contacto},{icon:"bi-telephone-fill",label:"Teléfono",val:ut.tel},{icon:"bi-geo-alt-fill",label:"Ubicación",val:ut.ubicacion},{icon:"bi-calendar-range",label:"Período",val:`${ut.inicio} → ${ut.fin_estimado}`},{icon:"bi-people-fill",label:"Personal activo",val:`${ut.personal} trabajadores`}].map(t=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${t.icon}" style="color:${e};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${t.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${t.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">Avance general</span>
              <span style="font-size:18px;font-weight:800;color:${e}">${ut.avance}%</span>
            </div>
            <div style="height:8px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${ut.avance}%;background:${e};border-radius:99px;transition:width 1s ease"></div>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Supervisor de obra</div>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar" style="background:rgba(234,179,8,0.18);color:${e}">H</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:white">${ut.supervisor}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.40)">Residente de obra</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">${j({icon:"bi-bar-chart-fill",label:"Avance de obra",value:"78%",delta:"+5% esta sem.",trend:"up",cardColor:"#1d4ed8",animate:!1})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-cash-stack",label:"Presupuesto ejercido",value:"$2.48M",delta:"de $3.2M total",trend:"up",cardColor:"#1e40af",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-clock-fill",label:"Días para entrega",value:96,delta:"En tiempo",trend:"up",cardColor:"#b45309"})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-people-fill",label:"Trabajadores activos",value:14,delta:"+2 esta semana",trend:"up",cardColor:"#15803d"})}</div>
        </div>

        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px;display:flex;align-items:center;gap:8px">
            <i class="bi bi-lightning-charge-fill" style="color:${e}"></i> Alertas y pendientes
          </h3>
          ${cg.map(t=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
              <div style="width:30px;height:30px;border-radius:8px;background:${t.color}22;border:1px solid ${t.color}44;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                <i class="bi ${t.icono}" style="color:${t.color};font-size:13px"></i>
              </div>
              <span style="font-size:13px;color:rgba(255,255,255,0.72);flex:1">${t.texto}</span>
              <button class="btn-nux btn-ghost-nux" style="font-size:11px;padding:4px 10px" onclick="window.__toastSuccess&&window.__toastSuccess('Marcado como revisado')">Revisar</button>
            </div>`).join("")}
        </div>

        <div class="glass-card p-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Hitos del proyecto</h3>
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">${hs.filter(t=>t.estatus==="Completado").length}/${hs.length} completados</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>Hito</th><th>Fecha planeada</th><th>Fecha real</th><th>Estado</th></tr></thead>
            <tbody>${hs.map(t=>`<tr>
              <td><strong>${t.nombre}</strong></td>
              <td style="color:rgba(255,255,255,0.50);white-space:nowrap">${t.fechaPlaneada}</td>
              <td style="color:rgba(255,255,255,0.50);white-space:nowrap">${t.fechaReal}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${t.c}22;color:${t.c};border:1px solid ${t.c}33">${t.estatus}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const Kt=I.accent,pg=I.accentRgb,ue=[{nombre:"Torre Residencial Prado",cliente:"Inm. Castellanos",avance:78,status:"en_obra",presupuesto:3200,gastado:2480,personal:14,dias_restantes:96,color:Kt},{nombre:"Centro Comercial Norte",cliente:"Grupo Norteña",avance:42,status:"en_obra",presupuesto:8600,gastado:3612,personal:31,dias_restantes:187,color:"#22c55e"},{nombre:"Parque Industrial Bajío",cliente:"ProLogis MX",avance:15,status:"inicio",presupuesto:5400,gastado:810,personal:8,dias_restantes:312,color:"#6366f1"},{nombre:"Remodelación CDMX Office",cliente:"Corp. Azul",avance:91,status:"terminando",presupuesto:480,gastado:437,personal:5,dias_restantes:12,color:"#f97316"},{nombre:"Bodega Logística SLP",cliente:"Logistics SA",avance:58,status:"en_obra",presupuesto:1200,gastado:696,personal:9,dias_restantes:74,color:"#06b6d4"}],hg={en_obra:"En obra",inicio:"Inicio",terminando:"Terminando",pausado:"Pausado"},gs={en_obra:Kt,inicio:"#6366f1",terminando:"#f97316",pausado:"rgba(255,255,255,0.30)"};function gg(){return ue.map(e=>`
  <div style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;flex-wrap:wrap;gap:6px">
      <div style="display:flex;align-items:center;gap:10px">
        <div style="width:10px;height:10px;border-radius:50%;background:${e.color};flex-shrink:0;box-shadow:0 0 6px ${e.color}80"></div>
        <div>
          <div style="font-size:13px;font-weight:700;color:white">${e.nombre}</div>
          <div style="font-size:11px;color:rgba(255,255,255,0.40)">${e.cliente}</div>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:10px;flex-shrink:0">
        <span style="font-size:10px;font-weight:700;padding:2px 8px;background:${gs[e.status]}22;color:${gs[e.status]};border:1px solid ${gs[e.status]}44;border-radius:99px">${hg[e.status]}</span>
        <span style="font-size:11px;color:rgba(255,255,255,0.35)">${e.dias_restantes}d</span>
        <span style="font-size:14px;font-weight:800;color:${e.color}">${e.avance}%</span>
      </div>
    </div>
    <div style="position:relative;height:10px;background:rgba(255,255,255,0.06);border-radius:99px;overflow:hidden">
      <div style="position:absolute;left:0;top:0;height:100%;width:${e.avance}%;background:linear-gradient(90deg,${e.color},${e.color}aa);border-radius:99px;transition:width 1s ease"></div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:5px">
      <span style="font-size:10px;color:rgba(255,255,255,0.28)">Ejercido: $${(e.gastado/1e3).toFixed(1)}M / $${(e.presupuesto/1e3).toFixed(1)}M</span>
      <span style="font-size:10px;color:rgba(255,255,255,0.28)">${e.personal} personas</span>
    </div>
  </div>`).join("")}const ug=[{nombre:"Cuadrilla estructura",personas:18,total:20,color:Kt},{nombre:"Instalaciones eléctricas",personas:8,total:10,color:"#22c55e"},{nombre:"Acabados interiores",personas:12,total:15,color:"#6366f1"},{nombre:"Operadores de equipo pesado",personas:5,total:6,color:"#f97316"},{nombre:"Supervisores de obra",personas:4,total:4,color:"#f59e0b"}];function fg(){return ug.map(e=>{const t=Math.round(e.personas/e.total*100);return`
    <div style="margin-bottom:10px">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
        <span style="font-size:12px;color:rgba(255,255,255,0.65)">${e.nombre}</span>
        <div style="display:flex;align-items:center;gap:8px">
          <span style="font-size:11px;color:rgba(255,255,255,0.35)">${e.personas}/${e.total}</span>
          <span style="font-size:12px;font-weight:700;color:${e.color}">${t}%</span>
        </div>
      </div>
      <div style="height:8px;background:rgba(255,255,255,0.06);border-radius:99px;overflow:hidden">
        <div style="height:100%;width:${t}%;background:${e.color};border-radius:99px"></div>
      </div>
    </div>`}).join("")}const us=[{dia:"Hoy",obra:"Torre Prado",nota:"Colada de losa nivel 8 completada",c:"#22c55e"},{dia:"Ayer",obra:"CDMX Office",nota:"Inspección municipal — sin observaciones",c:"#22c55e"},{dia:"Jun 24",obra:"Centro Comercial",nota:"Retraso acero — proveedor 4 días",c:"#f59e0b"},{dia:"Jun 23",obra:"Bodega SLP",nota:"Personal completo incorporado al frente",c:Kt},{dia:"Jun 22",obra:"Parque Industrial",nota:"Topografía y trazo inicial completado",c:"#6366f1"}];function bg(){const e=ue.reduce((s,o)=>s+o.presupuesto,0),t=ue.reduce((s,o)=>s+o.gastado,0),i=ue.reduce((s,o)=>s+o.personal,0);return`
  <div style="--industry-accent:${Kt};--industry-accent-rgb:${pg}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:2px">
          <i class="bi bi-building-gear" style="color:${Kt};margin-right:10px"></i>Tablero de Obras
        </h1>
        <p style="font-size:13px;color:rgba(255,255,255,0.38)">BuildPro — ${ue.length} proyectos activos</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Reporte generado')">
        <i class="bi bi-file-earmark-bar-graph"></i> Reporte ejecutivo
      </button>
    </div>

    <!-- Stats strip — no kpiGrid, custom horizontal pills -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:16px">
      ${[{label:"Proyectos activos",val:"5",sub:"1 inicio · 1 terminando",icon:"bi-hammer",color:Kt},{label:"Presupuesto total",val:`$${(e/1e3).toFixed(1)}M`,sub:`Ejercido $${(t/1e3).toFixed(1)}M`,icon:"bi-cash-stack",color:"#22c55e"},{label:"Personal en campo",val:i,sub:"en 5 frentes activos",icon:"bi-people-fill",color:"#6366f1"},{label:"Avance promedio",val:"57%",sub:"+3% vs semana anterior",icon:"bi-bar-chart-fill",color:"#f97316"}].map(s=>`
        <div class="glass-card p-3" style="display:flex;align-items:center;gap:12px">
          <div style="width:38px;height:38px;border-radius:9px;background:${s.color}18;display:flex;align-items:center;justify-content:center;flex-shrink:0">
            <i class="bi ${s.icon}" style="color:${s.color};font-size:17px"></i>
          </div>
          <div>
            <div style="font-size:1.4rem;font-weight:800;color:white;line-height:1">${s.val}</div>
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:rgba(255,255,255,0.30);margin-top:1px">${s.label}</div>
            <div style="font-size:10px;color:${s.color};margin-top:1px">${s.sub}</div>
          </div>
        </div>`).join("")}
    </div>

    <div class="row g-3 mb-3">
      <div class="col-lg-7">
        <div class="glass-card p-4 h-100">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
            <h3 style="font-size:14px;font-weight:700;color:white">Estado de proyectos</h3>
            <span style="font-size:11px;color:rgba(255,255,255,0.35)">Avance · Presupuesto · Días</span>
          </div>
          ${gg()}
        </div>
      </div>
      <div class="col-lg-5">
        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px">Presupuesto global</h3>
          <div class="chart-container" style="height:156px"><canvas id="chart-presupuesto"></canvas></div>
        </div>
        <div class="glass-card p-4">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px">Utilización de personal</h3>
          ${fg()}
        </div>
      </div>
    </div>

    <div class="glass-card p-4">
      <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px">
        <i class="bi bi-journal-text" style="color:${Kt};margin-right:8px"></i>Bitácora de obra
      </h3>
      <div>
        ${us.map((s,o)=>`
          <div style="display:flex;gap:14px;padding:10px 0;border-bottom:${o<us.length-1?"1px solid rgba(255,255,255,0.05)":"none"}">
            <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0;padding-top:3px">
              <div style="width:10px;height:10px;border-radius:50%;background:${s.c};flex-shrink:0"></div>
              ${o<us.length-1?'<div style="width:1px;flex:1;background:rgba(255,255,255,0.06);margin-top:4px"></div>':""}
            </div>
            <div style="flex:1">
              <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
                <span style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.80)">${s.obra}</span>
                <span style="font-size:12px;color:rgba(255,255,255,0.50)">— ${s.nota}</span>
              </div>
              <div style="font-size:10px;color:rgba(255,255,255,0.28);margin-top:2px">${s.dia}</div>
            </div>
          </div>`).join("")}
      </div>
    </div>
  </div>`}function mg(){const e=ue.reduce((i,s)=>i+s.presupuesto,0),t=ue.reduce((i,s)=>i+s.gastado,0);Na("chart-presupuesto",{labels:["Ejercido","Disponible"],data:[t,e-t],height:156}),ye()}const xg=[{id:"por-iniciar",label:"Por Iniciar",color:"rgba(255,255,255,0.30)",cards:[{title:"Cimentación Planta GDL",sub:"Planta Procesadora · 3 personas",tag:"Alta"},{title:"Trazo y nivelación Bloque C",sub:"Torres Mirador · 2 personas",tag:"Media"}]},{id:"en-curso",label:"En Curso",color:"#eab308",cards:[{title:"Herrería nivel 4",sub:"Torres Mirador · 4 personas",tag:"Alta"},{title:"Instalaciones eléctricas",sub:"Oficinas Corporativas · 3 per.",tag:"Alta"},{title:"Acabados interiores lobby",sub:"Centro Comercial Hub · 6 per.",tag:"Media"},{title:"Muro cortina fachada",sub:"Torres Mirador · 2 personas",tag:"Urgente"}]},{id:"revision",label:"En Revisión",color:"#06b6d4",cards:[{title:"Pintura exterior bloque A",sub:"Torres Mirador · 2 personas",tag:"Baja"},{title:"Pruebas hidráulicas Piso 3",sub:"Bodega Logística · 1 persona",tag:"Alta"}]},{id:"completado",label:"Completado",color:"#22c55e",cards:[{title:"Excavación y corte",sub:"Centro Comercial Hub",tag:"—"},{title:"Pilotes de cimentación",sub:"Torres Mirador",tag:"—"},{title:"Estructura metálica Nave A",sub:"Bodega Logística",tag:"—"}]}],vg={Alta:"#f97316",Media:"#eab308",Urgente:"#f87171",Baja:"rgba(255,255,255,0.40)","—":"rgba(255,255,255,0.20)"};function yg(){return`
  <div style="--industry-accent:${I.accent};--industry-accent-rgb:${I.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-kanban-fill" style="color:${I.accent};margin-right:10px"></i>Tablero Operativo
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${I.nombre} — Estado de actividades en obra</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva actividad creada')"><i class="bi bi-plus-lg"></i> Nueva actividad</button>
    </div>

    <!-- Kanban -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;min-height:500px;overflow-x:auto">
      ${xg.map(e=>`
        <div>
          <div class="kanban-col-title" style="color:${e.color}">
            <div style="width:8px;height:8px;border-radius:50%;background:${e.color};flex-shrink:0"></div>
            ${e.label}
            <span style="margin-left:auto;background:${e.color}22;color:${e.color};font-size:11px;padding:1px 8px;border-radius:99px">${e.cards.length}</span>
          </div>
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:var(--radius-lg);padding:12px;min-height:400px">
            ${e.cards.map(t=>`
              <div class="kanban-card" onclick="window.__toastInfo&&window.__toastInfo('Abriendo: ${t.title}')">
                <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88);margin-bottom:6px">${t.title}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.38);margin-bottom:10px">${t.sub}</div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:10px;font-weight:700;color:${vg[t.tag]||"gray"};text-transform:uppercase">${t.tag!=="—"?t.tag:""}</span>
                  <i class="bi bi-three-dots" style="color:rgba(255,255,255,0.25);cursor:pointer"></i>
                </div>
              </div>
            `).join("")}
            <div style="padding:10px;border:1px dashed rgba(255,255,255,0.08);border-radius:var(--radius-md);text-align:center;cursor:pointer;color:rgba(255,255,255,0.20);font-size:13px;margin-top:4px"
            onclick="window.__toastSuccess&&window.__toastSuccess('Nueva actividad en ${e.label}')">
              <i class="bi bi-plus"></i> Agregar
            </div>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Personal en obra -->
    <div class="glass-card p-4 mt-3">
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px"><i class="bi bi-people-fill" style="color:${I.accent};margin-right:8px"></i>Personal activo hoy</h3>
      <div class="row g-2">
        ${rg.map(e=>`
          <div class="col-md-4 col-lg-3">
            <div style="padding:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);display:flex;align-items:center;gap:10px">
              <div style="position:relative">
                <div class="avatar avatar-sm">${e.nombre.charAt(0)}</div>
                <span class="status-dot ${e.asistencia==="presente"?"active":"danger"}" style="position:absolute;bottom:0;right:0;width:8px;height:8px;border:2px solid #181818"></span>
              </div>
              <div>
                <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${e.nombre}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.35)">${e.rol}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.25)">${e.proyecto}</div>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
  `}const D={nombre:"Storely",giro:"Retail & Tienda",logo:"bi-bag-heart-fill",accent:"#10b981",accentRgb:"16, 185, 129"};function wg(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${D.accent};--industry-accent-rgb:${D.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${D.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>
    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>
      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${D.accent};margin-bottom:14px"><i class="bi ${D.logo}"></i> ${D.giro}</div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">Retail inteligente para <span style="color:${D.accent}">${D.nombre}</span></h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">Punto de venta integrado, inventario en tiempo real, programa de lealtad y análisis de ventas para tu tienda.</p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/retail/crm",icon:"bi-people-fill",label:"CRM de Clientes",desc:"Programa de lealtad, historial y segmentación."},{path:"/retail/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard de Ventas",desc:"Ventas, ticket promedio, stock y tendencias."},{path:"/retail/operaciones",icon:"bi-cart-fill",label:"Punto de Venta",desc:"POS integrado, inventario y devoluciones."}].map(e=>`
              <div onclick="window.location.hash='${e.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${D.accentRgb},0.06);border:1px solid rgba(${D.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${D.accentRgb},0.12)';this.style.borderColor='rgba(${D.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${D.accentRgb},0.06)';this.style.borderColor='rgba(${D.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${D.accentRgb},0.15);color:${D.accent};flex-shrink:0"><i class="bi ${e.icon}"></i></div>
                <div style="flex:1"><div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${e.label}</div><div style="font-size:13px;color:rgba(255,255,255,0.42)">${e.desc}</div></div>
                <i class="bi bi-chevron-right" style="color:${D.accent};font-size:14px"></i>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="col-lg-6">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${D.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${D.accent},transparent)"></div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${D.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${D.accent}"><i class="bi ${D.logo}"></i></div>
              <div><div style="font-size:14px;font-weight:700;color:white">${D.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Retail platform</div></div>
              <span class="badge-nux badge-success" style="margin-left:auto">Tienda abierta</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              ${[{label:"Ventas hoy",val:"$24,860"},{label:"Transacciones",val:"142"},{label:"Ticket prom.",val:"$175"},{label:"Devoluciones",val:"4"}].map(e=>`<div style="padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px"><div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:4px">${e.label}</div><div style="font-size:18px;font-weight:800;color:white">${e.val}</div></div>`).join("")}
            </div>
            <div style="padding:14px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
              <div style="font-size:11px;color:rgba(255,255,255,0.30);text-transform:uppercase;font-weight:700;margin-bottom:8px">Ventas por categoría</div>
              ${[["Calzado",38],["Ropa",32],["Accesorios",18],["Deporte",12]].map(([e,t])=>`
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">
                  <div style="font-size:12px;color:rgba(255,255,255,0.50);width:90px">${e}</div>
                  <div style="flex:1;height:6px;background:rgba(255,255,255,0.06);border-radius:3px"><div style="width:${t}%;height:100%;background:${D.accent};border-radius:3px"></div></div>
                  <div style="font-size:12px;color:rgba(255,255,255,0.40);width:30px;text-align:right">${t}%</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}const dt={nombre:"Isabel Moreno Gutiérrez",iniciales:"IM",tel:"55 1234 5678",email:"isabel.moreno@gmail.com",membresia:"Tarjeta Oro",desde:"Marzo 2020",puntos:4820,puntos_max:6e3,talla:"M · 38 zapato",preferencias:"Ropa casual, paleta neutral, marcas premium",asesor:"Valeria Soto"},$g=[{fecha:"Hoy 11:34",articulos:"Vestido lino · Sandalias piel",monto:"$1,840",metodo:"Visa •••6411",estado:"Entregado",c:"#16a34a"},{fecha:"Hace 1 sem",articulos:"Blusa seda · Pantalón sastre x2",monto:"$2,460",metodo:"Amex •••2201",estado:"Entregado",c:"#16a34a"},{fecha:"Hace 3 sem",articulos:"Bolsa cuero · Pañuelo seda",monto:"$3,200",metodo:"Visa •••6411",estado:"Devuelto",c:"#f87171"},{fecha:"Hace 1 mes",articulos:"Conjunto casual verano",monto:"$1,180",metodo:"Visa •••6411",estado:"Entregado",c:"#16a34a"},{fecha:"Hace 6 sem",articulos:"Perfume importado · Crema premium",monto:"$2,100",metodo:"Efectivo",estado:"Entregado",c:"#16a34a"}],En=[{nombre:"Abrigo cachemira beige",precio:"$4,800",disp:"Disponible"},{nombre:"Zapato Oxford negro",precio:"$2,200",disp:"Últimas 2 piezas"},{nombre:"Cartera cuero café",precio:"$1,400",disp:"Agotado — esp. restock"}];function _g(){const e=D.accent;return`
  <div style="--industry-accent:${e};--industry-accent-rgb:${D.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:${e};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${dt.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${dt.nombre}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${se(["Tarjeta Oro ⭐","Clienta VIP","38 compras","Devolución reciente"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Enviando notificación de wishlist...')"><i class="bi bi-bell"></i> Avisar wishlist</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Cupón especial enviado a Isabel')"><i class="bi bi-gift"></i> Enviar cupón</button>
      </div>
    </div>

    ${ie({stages:["Visitante","Recurrente","Fiel","Oro","Embajadora"],currentIndex:3,accent:e})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Perfil de la cliente</div>
          ${[{icon:"bi-telephone-fill",label:"Teléfono",val:dt.tel},{icon:"bi-envelope-fill",label:"Email",val:dt.email},{icon:"bi-award-fill",label:"Membresía",val:dt.membresia},{icon:"bi-calendar3",label:"Cliente desde",val:dt.desde},{icon:"bi-person-check",label:"Asesor asignado",val:dt.asesor}].map(t=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${t.icon}" style="color:${e};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${t.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${t.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:6px">Talla habitual</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.80)">${dt.talla}</div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:6px">Preferencias</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.60);line-height:1.6">${dt.preferencias}</div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">Puntos acumulados</span>
              <span style="font-size:16px;font-weight:800;color:${e}">${dt.puntos.toLocaleString("es-MX")}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${Math.round(dt.puntos/dt.puntos_max*100)}%;background:${e};border-radius:99px"></div>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.30);margin-top:5px">${(dt.puntos_max-dt.puntos).toLocaleString("es-MX")} pts para Embajadora</div>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">${j({icon:"bi-bag-fill",label:"Compras totales",value:38,delta:"+3 este mes",trend:"up",cardColor:"#1d4ed8"})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-graph-up-arrow",label:"Valor de vida (LTV)",value:"$18,400",delta:"+$1.8K este mes",trend:"up",cardColor:"#1e40af",animate:!1})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-clock-history",label:"Última visita",value:"Hoy",delta:"11:34 h",trend:"up",cardColor:"#b45309",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-star-fill",label:"NPS personal",value:9,delta:"Promotora activa",trend:"up",cardColor:"#15803d",deltaLabel:""})}</div>
        </div>

        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px;display:flex;align-items:center;gap:8px">
            <i class="bi bi-heart-fill" style="color:${e}"></i> Lista de deseos (${En.length} artículos)
          </h3>
          ${En.map(t=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
              <i class="bi bi-tag-fill" style="color:${e};flex-shrink:0"></i>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;color:white">${t.nombre}</div>
                <div style="font-size:12px;color:rgba(255,255,255,0.40)">${t.disp}</div>
              </div>
              <span style="font-size:14px;font-weight:700;color:${e}">${t.precio}</span>
              <button class="btn-nux btn-accent-nux" style="font-size:11px;padding:4px 10px" onclick="window.__toastSuccess&&window.__toastSuccess('Notificación enviada a Isabel')">Avisar</button>
            </div>`).join("")}
        </div>

        <div class="glass-card p-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Historial de compras</h3>
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">38 transacciones · $18,400 LTV</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>Fecha</th><th>Artículos</th><th>Método de pago</th><th style="text-align:right">Monto</th><th>Estado</th></tr></thead>
            <tbody>${$g.map(t=>`<tr>
              <td style="white-space:nowrap;color:rgba(255,255,255,0.45)">${t.fecha}</td>
              <td style="font-size:12px;color:rgba(255,255,255,0.70)">${t.articulos}</td>
              <td style="font-size:12px;color:rgba(255,255,255,0.45)">${t.metodo}</td>
              <td style="text-align:right;font-weight:700;color:${e}">${t.monto}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${t.c}22;color:${t.c};border:1px solid ${t.c}33">${t.estado}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const ze=D.accent,It=D.accentRgb,Ln=[{label:"Visitantes",n:3840,pct:100},{label:"Entradas a tienda",n:1260,pct:33},{label:"Probador",n:487,pct:39},{label:"Caja",n:318,pct:65},{label:"Compra completada",n:280,pct:88}];function kg(){const s=Ln.length*42,o=Ln.map((n,a)=>{const r=260*(1-a*.15),l=260*(1-(a+1)*.15),c=(260-r)/2,d=(260-l)/2,p=a*42,h=.2+a*.16;return`
    <path d="M${c} ${p} L${c+r} ${p} L${d+l} ${p+38} L${d} ${p+38} Z"
          fill="rgba(${It},${h})" rx="4"/>
    <text x="${260/2}" y="${p+38/2+4}" text-anchor="middle" fill="white" font-size="11.5" font-weight="700" font-family="Inter,sans-serif">${n.label}</text>
    <text x="${260-(260-l)/2+6}" y="${p+38/2+4}" text-anchor="start" fill="${a===0?"rgba(255,255,255,0.50)":ze}" font-size="10" font-weight="700" font-family="Inter,sans-serif">${a===0?n.n.toLocaleString():n.pct+"% →"}</text>`}).join("");return`<svg viewBox="0 0 260 ${s}" style="width:100%;height:${s}px">${o}</svg>`}const Mg=[{nombre:"Vestido lino blanco",cat:"Vestidos",ventas:42,ingresos:"$77,280",pct:18,trend:[8,12,10,15,14,18,20]},{nombre:"Sandalias piel camel",cat:"Calzado",ventas:38,ingresos:"$60,800",pct:14,trend:[6,9,11,12,15,16,18]},{nombre:"Bolsa cuero negro",cat:"Accesorios",ventas:29,ingresos:"$92,800",pct:22,trend:[4,7,8,10,12,14,16]},{nombre:"Blusa seda off-white",cat:"Blusas",ventas:54,ingresos:"$43,200",pct:10,trend:[10,12,14,16,18,22,24]},{nombre:"Pantalón sastre beige",cat:"Pantalones",ventas:33,ingresos:"$59,400",pct:14,trend:[5,8,9,12,14,15,16]}];function zg(e,t){const i=Math.max(...e),s=Math.min(...e),o=70,n=28,a=e.map((r,l)=>{const c=l/(e.length-1)*o,d=n-(r-s)/(i-s||1)*n;return`${c},${d}`}).join(" ");return`<svg viewBox="0 0 ${o} ${n}" style="width:70px;height:28px;flex-shrink:0">
    <polyline points="${a}" fill="none" stroke="${t}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>
  </svg>`}const Sg=["8h","9h","10h","11h","12h","13h","14h","15h","16h","17h","18h","19h","20h"],Cg=["L","M","X","J","V","S","D"],On=[[2,3,4,5,6,7,6,5,5,7,8,9,6],[1,2,3,4,5,6,5,4,5,6,7,8,5],[2,3,4,5,6,7,6,5,6,7,8,9,6],[1,2,3,4,5,6,5,4,5,6,8,9,5],[2,3,5,6,7,8,7,6,7,8,9,10,7],[3,5,7,9,8,8,7,8,9,10,10,8,6],[1,2,3,4,3,4,3,3,4,5,6,5,3]];function Pg(){const e=Math.max(...On.flat());function t(i){const s=i/e;return s>.8?`rgba(${It},0.90)`:s>.6?`rgba(${It},0.65)`:s>.4?`rgba(${It},0.40)`:s>.2?`rgba(${It},0.20)`:"rgba(0,0,0,0.06)"}return`
  <div style="overflow-x:auto">
    <div style="min-width:420px">
      <div style="display:flex;gap:4px;margin-bottom:4px;padding-left:24px">
        ${Sg.map(i=>`<div style="flex:1;text-align:center;font-size:9px;color:rgba(0,0,0,0.35)">${i}</div>`).join("")}
      </div>
      ${Cg.map((i,s)=>`
        <div style="display:flex;align-items:center;gap:4px;margin-bottom:4px">
          <div style="width:18px;font-size:10px;color:rgba(0,0,0,0.40);font-weight:600;flex-shrink:0">${i}</div>
          ${On[s].map((o,n)=>`
            <div style="flex:1;height:22px;background:${t(o)};border-radius:4px;display:flex;align-items:center;justify-content:center" title="$${(o*2800).toLocaleString("es-MX")} aprox.">
            </div>`).join("")}
        </div>`).join("")}
      <div style="display:flex;align-items:center;gap:6px;margin-top:8px;padding-left:24px;flex-wrap:wrap">
        ${["rgba(0,0,0,0.06)",`rgba(${It},0.20)`,`rgba(${It},0.45)`,`rgba(${It},0.90)`].map((i,s)=>`
          <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:rgba(0,0,0,0.45)">
            <div style="width:14px;height:14px;border-radius:3px;background:${i}"></div>
            ${["Sin ventas","Bajo","Medio","Alto"][s]}
          </div>`).join("")}
      </div>
    </div>
  </div>`}function Rg(){return`
  <div style="--industry-accent:${ze};--industry-accent-rgb:${It}">

    <!-- Hero revenue number — Shopify-style -->
    <div style="background:white;border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-lg);padding:24px 28px;margin-bottom:16px;box-shadow:0 1px 6px rgba(0,0,0,0.05);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px">
      <div>
        <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(0,0,0,0.35);margin-bottom:6px">Ventas de hoy</div>
        <div style="font-size:3rem;font-weight:900;color:#111827;letter-spacing:-0.04em;line-height:1">$24,860</div>
        <div style="display:flex;align-items:center;gap:6px;margin-top:8px">
          <span style="font-size:13px;font-weight:700;color:#16a34a;display:flex;align-items:center;gap:3px"><i class="bi bi-arrow-up-right"></i>+15%</span>
          <span style="font-size:13px;color:rgba(0,0,0,0.40)">vs mismo día semana pasada</span>
        </div>
      </div>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        ${[{label:"Transacciones",val:"142",delta:"+18",dc:"#16a34a"},{label:"Ticket prom.",val:"$175",delta:"+$12",dc:"#16a34a"},{label:"Devoluciones",val:"4",delta:"−2",dc:"#16a34a"},{label:"Clientes nuevos",val:"28",delta:"+6",dc:"#16a34a"}].map(e=>`
          <div>
            <div style="font-size:1.4rem;font-weight:800;color:#111827">${e.val}</div>
            <div style="font-size:11px;color:rgba(0,0,0,0.40)">${e.label}</div>
            <div style="font-size:11px;font-weight:700;color:${e.dc}">${e.delta}</div>
          </div>`).join("")}
      </div>
    </div>

    <div class="row g-3 mb-3">
      <!-- Sales funnel -->
      <div class="col-lg-4">
        <div style="background:white;border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-lg);padding:20px;box-shadow:0 1px 6px rgba(0,0,0,0.05)">
          <h3 style="font-size:14px;font-weight:700;color:#111827;margin-bottom:14px">Embudo de conversión</h3>
          ${kg()}
          <div style="margin-top:10px;padding-top:10px;border-top:1px solid rgba(0,0,0,0.06);font-size:11px;color:rgba(0,0,0,0.40)">
            Conversión total: <strong style="color:${ze}">7.3%</strong> · Industria: 5.1%
          </div>
        </div>
      </div>

      <!-- Top products with sparklines -->
      <div class="col-lg-8">
        <div style="background:white;border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-lg);padding:20px;box-shadow:0 1px 6px rgba(0,0,0,0.05)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <h3 style="font-size:14px;font-weight:700;color:#111827">Top productos — Esta semana</h3>
            <span style="font-size:11px;color:rgba(0,0,0,0.35)">Tendencia 7 días</span>
          </div>
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr>
                ${["Producto","Categoría","Ventas","Ingresos","7 días","Cont."].map(e=>`<th style="padding:6px 8px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:rgba(0,0,0,0.40);text-align:left;border-bottom:1px solid rgba(0,0,0,0.06)">${e}</th>`).join("")}
              </tr>
            </thead>
            <tbody>
              ${Mg.map((e,t)=>`<tr style="${t%2===0?"background:rgba(0,0,0,0.015)":""}">
                <td style="padding:10px 8px;font-size:13px;font-weight:600;color:#111827;max-width:160px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${e.nombre}</td>
                <td style="padding:10px 8px;font-size:12px;color:rgba(0,0,0,0.45)">${e.cat}</td>
                <td style="padding:10px 8px;font-size:13px;font-weight:700;color:#111827">${e.ventas}</td>
                <td style="padding:10px 8px;font-size:13px;font-weight:700;color:${ze}">${e.ingresos}</td>
                <td style="padding:10px 8px">${zg(e.trend,ze)}</td>
                <td style="padding:10px 8px">
                  <div style="display:flex;align-items:center;gap:6px">
                    <div style="height:5px;width:${e.pct*3}px;background:${ze};border-radius:99px;max-width:60px"></div>
                    <span style="font-size:11px;font-weight:700;color:rgba(0,0,0,0.50)">${e.pct}%</span>
                  </div>
                </td>
              </tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Hourly heatmap -->
    <div style="background:white;border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-lg);padding:20px;box-shadow:0 1px 6px rgba(0,0,0,0.05)">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
        <h3 style="font-size:14px;font-weight:700;color:#111827">Mapa de calor de ventas — Por hora y día</h3>
        <span style="font-size:11px;color:rgba(0,0,0,0.35)">Última semana</span>
      </div>
      ${Pg()}
    </div>
  </div>`}function Ag(){ye()}const Dg=[{icon:"bi-shoe-heel",nombre:"Tenis Urban Run",precio:"$1,290",cat:"Calzado",stock:84},{icon:"bi-shirt",nombre:"Sudadera Premium",precio:"$680",cat:"Ropa",stock:47},{icon:"bi-backpack2-fill",nombre:"Mochila Explorer 30L",precio:"$890",cat:"Accesorios",stock:12},{icon:"bi-shirt",nombre:"Pantalón Slim Stretch",precio:"$590",cat:"Ropa",stock:6},{icon:"bi-tag",nombre:"Gorra Bordada",precio:"$280",cat:"Accesorios",stock:134},{icon:"bi-droplet",nombre:"Chamarra Reversible",precio:"$1,450",cat:"Ropa",stock:22}];function Tg(){return`
  <div style="--industry-accent:${D.accent};--industry-accent-rgb:${D.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-cart-fill" style="color:${D.accent};margin-right:10px"></i>Punto de Venta</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${D.nombre} — POS integrado con inventario</p>
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
            ${["Todos","Calzado","Ropa","Accesorios","Deporte"].map((e,t)=>`
              <button class="btn-nux ${t===0?"btn-primary-nux":"btn-ghost-nux"}" style="font-size:12px;padding:5px 12px" onclick="window.__toastInfo&&window.__toastInfo('Filtrando: ${e}')">${e}</button>
            `).join("")}
          </div>
          <!-- Productos -->
          <div class="row g-2">
            ${Dg.map(e=>`
              <div class="col-md-6 col-lg-4">
                <div style="padding:16px;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-md);cursor:pointer;transition:all 0.2s"
                onmouseenter="this.style.borderColor='rgba(${D.accentRgb},0.35)';this.style.background='rgba(${D.accentRgb},0.06)'"
                onmouseleave="this.style.borderColor='rgba(255,255,255,0.07)';this.style.background='rgba(255,255,255,0.025)'"
                onclick="window.__addToCart&&window.__addToCart('${e.nombre}','${e.precio}')">
                  <div style="text-align:center;padding:12px;background:rgba(${D.accentRgb},0.08);border-radius:var(--radius-md);font-size:28px;color:${D.accent};margin-bottom:10px">
                    <i class="bi ${e.icon}"></i>
                  </div>
                  <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88);margin-bottom:4px">${e.nombre}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-bottom:8px">${e.cat} · Stock: ${e.stock}</div>
                  <div style="font-size:15px;font-weight:800;color:${D.accent}">${e.precio}</div>
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
            <i class="bi bi-receipt" style="color:${D.accent};margin-right:8px"></i>Ticket actual
          </h3>

          <!-- Items en carrito (mock) -->
          <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:16px;min-height:120px;max-height:280px;overflow-y:auto">
            ${[{nombre:"Tenis Urban Run",precio:"$1,290",cant:1},{nombre:"Gorra Bordada",precio:"$280",cant:2},{nombre:"Sudadera Premium",precio:"$680",cant:1}].map(e=>`
              <div style="display:flex;align-items:center;gap:10px;padding:10px;background:rgba(255,255,255,0.025);border-radius:var(--radius-md)" id="cart-item-${e.nombre.replace(/\s/g,"")}">
                <div style="flex:1">
                  <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.85)">${e.nombre}</div>
                  <div style="font-size:12px;color:rgba(255,255,255,0.35)">x${e.cant} · ${e.precio}</div>
                </div>
                <button onclick="window.__toastInfo&&window.__toastInfo('${e.nombre} eliminado')" style="background:none;border:none;color:rgba(255,255,255,0.25);cursor:pointer;padding:4px"><i class="bi bi-x-lg"></i></button>
              </div>
            `).join("")}
          </div>

          <div class="nux-divider"></div>

          <!-- Totales -->
          <div style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px">
            ${[{label:"Subtotal",val:"$2,250"},{label:"IVA (16%)",val:"$360"},{label:"Descuento",val:"-$100"}].map(e=>`
              <div style="display:flex;justify-content:space-between;font-size:13px;color:rgba(255,255,255,0.45)">
                <span>${e.label}</span><span>${e.val}</span>
              </div>
            `).join("")}
            <div style="display:flex;justify-content:space-between;font-size:18px;font-weight:800;color:white;padding-top:8px;border-top:1px solid rgba(255,255,255,0.08);margin-top:6px">
              <span>Total</span><span style="color:${D.accent}">$2,510</span>
            </div>
          </div>

          <!-- Formas de pago -->
          <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:6px;margin-bottom:14px">
            ${[{icon:"bi-cash",label:"Efectivo"},{icon:"bi-credit-card",label:"Tarjeta"},{icon:"bi-phone",label:"Digital"}].map((e,t)=>`
              <button class="btn-nux ${t===1?"btn-primary-nux":"btn-ghost-nux"}" style="font-size:12px;padding:8px;flex-direction:column;gap:4px;text-align:center">
                <i class="bi ${e.icon}" style="font-size:16px"></i>
                <span>${e.label}</span>
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
  `}function Eg(){window.__addToCart=(e,t)=>Hi(`${e} agregado — ${t}`),window.__toastSuccess=Hi,window.__toastInfo=to}const L={nombre:"FlowService",giro:"Servicios Profesionales",logo:"bi-lightning-charge-fill",accent:"#8b5cf6",accentRgb:"139, 92, 246"},Lg=[{id:"TK-2401",cliente:"Moda Global SRL",prioridad:"alta",estatus:"abierto",tipo:"Error sistema",tecnico:"Diego R.",creado:"Hace 2h",sla:"4h restantes"},{id:"TK-2402",cliente:"Distribuidora Noriega",prioridad:"media",estatus:"en proceso",tipo:"Configuración",tecnico:"Ana S.",creado:"Hace 5h",sla:"19h restantes"},{id:"TK-2403",cliente:"Clínica Santa Elena",prioridad:"baja",estatus:"abierto",tipo:"Consulta",tecnico:"Sin asig.",creado:"Hace 1 día",sla:"47h restantes"},{id:"TK-2404",cliente:"TechStart México",prioridad:"crítica",estatus:"escalado",tipo:"Caída servicio",tecnico:"Carlos M.",creado:"Hace 30 min",sla:"1h restante"},{id:"TK-2405",cliente:"Transportes Unidos SC",prioridad:"media",estatus:"en proceso",tipo:"Reporte",tecnico:"Ana S.",creado:"Hace 3h",sla:"21h restantes"}],In={labels:["Ene","Feb","Mar","Abr","May","Jun","Jul"],data:[108e3,114200,118600,124e3,131800,140400,148600]};function Og(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${L.accent};--industry-accent-rgb:${L.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${L.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>
    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>
      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${L.accent};margin-bottom:14px"><i class="bi ${L.logo}"></i> ${L.giro}</div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">Gestión profesional de servicios para <span style="color:${L.accent}">${L.nombre}</span></h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">CRM para empresas de servicios: contratos, tickets, ingresos recurrentes, satisfacción y agenda en un solo lugar.</p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/servicios/crm",icon:"bi-people-fill",label:"CRM de Clientes",desc:"Contratos, health score y renovaciones."},{path:"/servicios/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard MRR",desc:"Ingresos recurrentes, NPS y métricas clave."},{path:"/servicios/operaciones",icon:"bi-headset",label:"Gestión de Tickets",desc:"Cola de soporte, SLAs y asignación de técnicos."}].map(e=>`
              <div onclick="window.location.hash='${e.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${L.accentRgb},0.06);border:1px solid rgba(${L.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${L.accentRgb},0.12)';this.style.borderColor='rgba(${L.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${L.accentRgb},0.06)';this.style.borderColor='rgba(${L.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${L.accentRgb},0.15);color:${L.accent};flex-shrink:0"><i class="bi ${e.icon}"></i></div>
                <div style="flex:1"><div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${e.label}</div><div style="font-size:13px;color:rgba(255,255,255,0.42)">${e.desc}</div></div>
                <i class="bi bi-chevron-right" style="color:${L.accent};font-size:14px"></i>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="col-lg-6">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${L.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${L.accent},transparent)"></div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${L.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${L.accent}"><i class="bi ${L.logo}"></i></div>
              <div><div style="font-size:14px;font-weight:700;color:white">${L.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Service Management</div></div>
              <span class="badge-nux badge-accent" style="margin-left:auto">84 Clientes</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              ${[{label:"MRR",val:"$148,600"},{label:"NPS Score",val:"72"},{label:"Tickets abiertos",val:"11"},{label:"Satisfacción",val:"4.7 ⭐"}].map(e=>`<div style="padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px"><div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:4px">${e.label}</div><div style="font-size:18px;font-weight:800;color:white">${e.val}</div></div>`).join("")}
            </div>
            <div style="padding:14px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
              <div style="font-size:11px;color:rgba(255,255,255,0.30);text-transform:uppercase;font-weight:700;margin-bottom:8px">MRR últimos 6 meses</div>
              <div style="display:flex;align-items:flex-end;gap:4px;height:48px">
                ${[73,78,81,85,90,100].map((e,t)=>`<div style="flex:1;height:${e}%;background:rgba(${L.accentRgb},${.25+e/250});border-radius:3px 3px 0 0"></div>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}const vt={nombre:"Constructora Arenas SA",iniciales:"CA",mrr:"$8,400",contacto:"Ing. Mario Peña",cargo:"Director de TI",tel:"55 1234 5678",email:"mario.pena@arenas.mx",contrato_inicio:"01 Ene 2025",contrato_fin:"31 Dic 2025",salud:98,ejecutivo:"Diana Rojas"},Ig=[{id:"TKT-0088",fecha:"Hoy 09:15",asunto:"Integración API ERP — error 503",prioridad:"Alta",estado:"En atención",c:"#f59e0b"},{id:"TKT-0085",fecha:"Ayer",asunto:"Actualización módulo facturación",prioridad:"Media",estado:"Resuelto",c:"#16a34a"},{id:"TKT-0081",fecha:"22 Jun",asunto:"Capacitación nuevo personal (5 pers)",prioridad:"Baja",estado:"Cerrado",c:"rgba(255,255,255,0.35)"},{id:"TKT-0074",fecha:"10 Jun",asunto:"Migración servidor staging",prioridad:"Alta",estado:"Cerrado",c:"rgba(255,255,255,0.35)"},{id:"TKT-0068",fecha:"02 Jun",asunto:"Reporte de cumplimiento ISO 27001",prioridad:"Media",estado:"Cerrado",c:"rgba(255,255,255,0.35)"}],jg=[{nombre:"ERP Cloud Enterprise",estado:"Activo",renovacion:"31 Dic 2025",precio:"$3,800/mes"},{nombre:"Soporte prioritario 24/7",estado:"Activo",renovacion:"31 Dic 2025",precio:"$2,200/mes"},{nombre:"Business Intelligence",estado:"Activo",renovacion:"31 Dic 2025",precio:"$1,400/mes"},{nombre:"Backup y recuperación",estado:"Activo",renovacion:"31 Dic 2025",precio:"$1,000/mes"}];function Fg(){const e=L.accent;return`
  <div style="--industry-accent:${e};--industry-accent-rgb:${L.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:var(--radius-md);background:${e};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${vt.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${vt.nombre}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${se(["Enterprise","Cuenta Estratégica","NPS 9","Renovación Dic 2025"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando propuesta de renovación...')"><i class="bi bi-file-earmark-text"></i> Propuesta</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Ticket abierto para Constructora Arenas')"><i class="bi bi-headset"></i> Nuevo ticket</button>
      </div>
    </div>

    ${ie({stages:["Prospecto","Propuesta","Negociación","Contrato activo","Renovación"],currentIndex:3,accent:e})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Datos de la cuenta</div>
          ${[{icon:"bi-person-fill",label:"Contacto principal",val:vt.contacto},{icon:"bi-briefcase-fill",label:"Cargo",val:vt.cargo},{icon:"bi-telephone-fill",label:"Teléfono",val:vt.tel},{icon:"bi-envelope-fill",label:"Email",val:vt.email},{icon:"bi-calendar-range",label:"Vigencia contrato",val:`${vt.contrato_inicio} → ${vt.contrato_fin}`},{icon:"bi-person-check-fill",label:"Ejecutivo de cuenta",val:vt.ejecutivo}].map(t=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${t.icon}" style="color:${e};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${t.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${t.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Salud de la cuenta</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:13px;color:rgba(255,255,255,0.60)">Score general</span>
              <span style="font-size:18px;font-weight:800;color:#16a34a">${vt.salud}/100</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${vt.salud}%;background:#16a34a;border-radius:99px"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">${j({icon:"bi-currency-dollar",label:"MRR mensual",value:"$8,400",delta:"+$0 (renovado)",trend:"up",cardColor:"#1d4ed8",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-headset",label:"Tickets este mes",value:5,delta:"-3 vs mes ant.",trend:"up",cardColor:"#1e40af"})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-shield-check-fill",label:"SLA cumplimiento",value:"99.2%",delta:"↑ Meta: 99%",trend:"up",cardColor:"#15803d",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-star-fill",label:"NPS del cliente",value:9,delta:"Promotor activo",trend:"up",cardColor:"#7c3aed",deltaLabel:""})}</div>
        </div>

        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px;display:flex;align-items:center;gap:8px">
            <i class="bi bi-layers-fill" style="color:${e}"></i> Servicios contratados
          </h3>
          ${jg.map(t=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
              <div style="width:8px;height:8px;border-radius:50%;background:#16a34a;flex-shrink:0"></div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;color:white">${t.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.35)">Renovación: ${t.renovacion}</div>
              </div>
              <span style="font-size:13px;font-weight:700;color:${e}">${t.precio}</span>
            </div>`).join("")}
          <div style="padding-top:12px;display:flex;justify-content:flex-end;gap:8px;align-items:center">
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">Total mensual:</span>
            <span style="font-size:18px;font-weight:800;color:${e}">${vt.mrr}/mes</span>
          </div>
        </div>

        <div class="glass-card p-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Tickets de soporte</h3>
            <span class="badge-nux badge-warning">1 en atención</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>ID</th><th>Fecha</th><th>Asunto</th><th>Prioridad</th><th>Estado</th></tr></thead>
            <tbody>${Ig.map(t=>`<tr>
              <td><strong style="color:${e}">${t.id}</strong></td>
              <td style="white-space:nowrap;color:rgba(255,255,255,0.45)">${t.fecha}</td>
              <td style="font-size:12px;color:rgba(255,255,255,0.70)">${t.asunto}</td>
              <td style="font-size:12px;color:rgba(255,255,255,0.50)">${t.prioridad}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${t.c}22;color:${t.c};border:1px solid ${t.c}33">${t.estado}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const Jt=L.accent,Bg=L.accentRgb;function _i(e,t,i,s){const n=Math.PI*44,a=n*e/100;return`
  <div style="text-align:center">
    <svg viewBox="0 0 120 72" style="width:120px;height:72px;overflow:visible">
      <path d="M16 60 A44 44 0 0 1 104 60" fill="none" stroke="${t}18" stroke-width="10" stroke-linecap="round"/>
      <path d="M16 60 A44 44 0 0 1 104 60" fill="none" stroke="${t}" stroke-width="10" stroke-linecap="round"
        stroke-dasharray="${a} ${n}" style="transition:stroke-dasharray 1s ease"/>
      <text x="60" y="56" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Inter,sans-serif">${s}</text>
    </svg>
    <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:${t};margin-top:-4px">${i}</div>
  </div>`}const Vg=[{id:"TKT-0210",cliente:"Constructora Arenas",asunto:"Error 503 API ERP",prio:"Crítico",sla:"⚠ 48 min restantes",eta:"2h",c:"#ef4444"},{id:"TKT-0208",cliente:"Tech Solutions MX",asunto:"Fallo sincronización CRM",prio:"Alto",sla:"3h 12min restantes",eta:"4h",c:"#f97316"},{id:"TKT-0205",cliente:"Retail Mx SA",asunto:"Módulo facturación lento",prio:"Alto",sla:"6h restantes",eta:"8h",c:"#f97316"},{id:"TKT-0201",cliente:"Logistics MX",asunto:"Acceso denegado reportes",prio:"Medio",sla:"1d 4h restantes",eta:"1d",c:"#f59e0b"},{id:"TKT-0198",cliente:"EduTrack",asunto:"Exportar calificaciones CSV",prio:"Bajo",sla:"2d restantes",eta:"2d",c:"rgba(255,255,255,0.40)"}];function Hg(){return Vg.map(e=>`
  <div style="padding:12px;margin-bottom:6px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-left:3px solid ${e.c};border-radius:0 var(--radius-md) var(--radius-md) 0">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px;flex-wrap:wrap;gap:4px">
      <div style="display:flex;align-items:center;gap:8px">
        <span style="font-size:10px;font-weight:700;color:${Jt};letter-spacing:0.04em">${e.id}</span>
        <span style="font-size:10px;font-weight:700;padding:1px 7px;background:${e.c}18;color:${e.c};border-radius:99px">${e.prio}</span>
      </div>
      <span style="font-size:10px;color:rgba(255,255,255,0.30)">ETA: ${e.eta}</span>
    </div>
    <div style="font-size:13px;font-weight:600;color:white;margin-bottom:2px">${e.asunto}</div>
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span style="font-size:11px;color:rgba(255,255,255,0.40)">${e.cliente}</span>
      <span style="font-size:10px;color:${e.c};font-weight:600">${e.sla}</span>
    </div>
  </div>`).join("")}const Ng=[{nombre:"Diana R.",tickets:8,resueltos:7,csat:4.9,avatar:"DR",load:88},{nombre:"Pablo M.",tickets:6,resueltos:5,csat:4.7,avatar:"PM",load:72},{nombre:"Sandra L.",tickets:9,resueltos:8,csat:4.8,avatar:"SL",load:95},{nombre:"Rodrigo V.",tickets:5,resueltos:5,csat:5,avatar:"RV",load:60}];function Wg(){return`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
    ${Ng.map(e=>{const t=e.load>90?"#ef4444":e.load>75?"#f59e0b":"#22c55e";return`
      <div style="padding:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-md)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px">
          <div style="width:32px;height:32px;border-radius:50%;background:${Jt}22;border:1.5px solid ${Jt}55;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:${Jt};flex-shrink:0">${e.avatar}</div>
          <div>
            <div style="font-size:12px;font-weight:600;color:white">${e.nombre}</div>
            <div style="font-size:10px;color:rgba(255,255,255,0.35)">CSAT: ⭐ ${e.csat}</div>
          </div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:rgba(255,255,255,0.45);margin-bottom:5px">
          <span>${e.resueltos}/${e.tickets} resueltos</span>
          <span style="color:${t};font-weight:700">${e.load}% carga</span>
        </div>
        <div style="height:4px;background:rgba(255,255,255,0.06);border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${e.load}%;background:${t};border-radius:99px"></div>
        </div>
      </div>`}).join("")}
  </div>`}function Gg(){return`
  <div style="--industry-accent:${Jt};--industry-accent-rgb:${Bg}">

    <!-- Header — service desk style -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:2px">
          <i class="bi bi-shield-check-fill" style="color:${Jt};margin-right:10px"></i>Mesa de Servicio
        </h1>
        <p style="font-size:13px;color:rgba(255,255,255,0.38)">FlowService · 11 tickets activos · 1 crítico</p>
      </div>
      <div style="display:flex;gap:8px">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Actualizando...')"><i class="bi bi-arrow-clockwise"></i> Actualizar</button>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Ticket abierto')"><i class="bi bi-plus-lg"></i> Nuevo ticket</button>
      </div>
    </div>

    <!-- SLA Gauges row — unique to IT/servicios -->
    <div class="glass-card p-4 mb-3">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
        <h3 style="font-size:14px;font-weight:700;color:white">Cumplimiento de SLA</h3>
        <span style="font-size:11px;color:rgba(255,255,255,0.35)">Últimas 24 horas</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-around;flex-wrap:wrap;gap:16px">
        ${_i(96,"#22c55e","Respuesta inicial","96%")}
        ${_i(89,Jt,"Resolución en tiempo","89%")}
        ${_i(94,"#06b6d4","CSAT","4.8 ⭐")}
        ${_i(78,"#f59e0b","Primer contacto","78%")}
        <div style="text-align:center">
          <div style="font-size:2.2rem;font-weight:900;color:white;letter-spacing:-0.04em">$148K</div>
          <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.35);margin-top:4px">MRR</div>
          <div style="font-size:11px;font-weight:700;color:#22c55e;margin-top:2px">+9% este mes</div>
        </div>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <!-- Live ticket queue -->
      <div class="col-lg-5">
        <div class="glass-card p-4 h-100">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
            <h3 style="font-size:14px;font-weight:700;color:white">Cola activa</h3>
            <div style="display:flex;gap:6px">
              <span style="font-size:10px;font-weight:700;padding:2px 7px;background:rgba(239,68,68,0.15);color:#f87171;border-radius:99px">1 crítico</span>
              <span style="font-size:10px;font-weight:700;padding:2px 7px;background:rgba(249,115,22,0.15);color:#fb923c;border-radius:99px">2 alto</span>
            </div>
          </div>
          ${Hg()}
        </div>
      </div>

      <!-- Team grid + MRR chart -->
      <div class="col-lg-7">
        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:12px">Performance del equipo</h3>
          ${Wg()}
        </div>
        <div class="glass-card p-4">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px">Evolución del MRR</h3>
          <div class="chart-container" style="height:130px"><canvas id="chart-mrr-svc"></canvas></div>
        </div>
      </div>
    </div>

    <!-- Status badges row -->
    <div class="glass-card p-4">
      <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px">
        <i class="bi bi-server" style="color:${Jt};margin-right:8px"></i>Estado de sistemas monitoreados
      </h3>
      <div style="display:flex;flex-wrap:wrap;gap:10px">
        ${[{sys:"ERP Cloud",status:"Operativo",uptime:"99.98%",c:"#22c55e"},{sys:"Portal clientes",status:"Operativo",uptime:"100%",c:"#22c55e"},{sys:"API Gateway",status:"Degradado",uptime:"99.12%",c:"#f59e0b"},{sys:"BI Analytics",status:"Operativo",uptime:"99.95%",c:"#22c55e"},{sys:"Backup nocturno",status:"Operativo",uptime:"100%",c:"#22c55e"},{sys:"Email relay",status:"Operativo",uptime:"99.87%",c:"#22c55e"}].map(e=>`
          <div style="display:flex;align-items:center;gap:8px;padding:8px 12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-md)">
            <div style="width:8px;height:8px;border-radius:50%;background:${e.c};flex-shrink:0;${e.c==="#22c55e"?"box-shadow:0 0 5px #22c55e90":""}"></div>
            <div>
              <div style="font-size:12px;font-weight:600;color:white">${e.sys}</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.35)">${e.status} · ${e.uptime}</div>
            </div>
          </div>`).join("")}
      </div>
    </div>
  </div>`}function Yg(){Ki("chart-mrr-svc",{labels:In.labels,datasets:[{label:"MRR ($)",data:In.data}],height:130}),ye()}const fs={crítica:"#f87171",alta:"#f97316",media:"#fbbf24",baja:"rgba(255,255,255,0.40)"},jn={abierto:"#f59e0b","en proceso":"#06b6d4",escalado:"#f87171",resuelto:"#22c55e"};function Xg(){return`
  <div style="--industry-accent:${L.accent};--industry-accent-rgb:${L.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-headset" style="color:${L.accent};margin-right:10px"></i>Gestión de Tickets</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${L.nombre} — Cola de soporte y SLA</p>
      </div>
      <div style="display:flex;gap:10px">
        <select class="nux-input" style="width:auto;padding:9px 14px"><option>Todos los estados</option><option>Abierto</option><option>En proceso</option><option>Escalado</option></select>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nuevo ticket creado')"><i class="bi bi-plus-lg"></i> Nuevo ticket</button>
      </div>
    </div>

    <!-- Resumen rápido -->
    <div class="row g-3 mb-3">
      ${[{label:"Abiertos",n:4,color:"#f59e0b",icon:"bi-exclamation-circle-fill"},{label:"En proceso",n:3,color:"#06b6d4",icon:"bi-arrow-clockwise"},{label:"Escalados",n:1,color:"#f87171",icon:"bi-fire"},{label:"Resueltos hoy",n:8,color:"#22c55e",icon:"bi-check-circle-fill"}].map(e=>`
        <div class="col-md-3 col-6">
          <div class="glass-card p-3" style="display:flex;align-items:center;gap:14px">
            <i class="bi ${e.icon}" style="font-size:24px;color:${e.color}"></i>
            <div>
              <div style="font-size:1.6rem;font-weight:800;color:${e.color}">${e.n}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;font-weight:700">${e.label}</div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Tabla de tickets -->
    <div class="glass-card p-4" style="position:relative">
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${L.accent},transparent)"></div>
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Cola de soporte activa</h3>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${Lg.map(e=>`
          <div style="
            padding:16px 18px;
            background:rgba(255,255,255,0.025);
            border:1px solid rgba(255,255,255,0.07);
            border-left:3px solid ${fs[e.prioridad]||"gray"};
            border-radius:var(--radius-md);
            display:grid;grid-template-columns:90px 1fr 130px 130px 120px auto;
            align-items:center;gap:16px;
            cursor:pointer;
            transition:all 0.2s;
          "
          onmouseenter="this.style.background='rgba(255,255,255,0.04)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.025)'"
          onclick="window.__toastInfo&&window.__toastInfo('Abriendo ticket ${e.id}')"
          >
            <div>
              <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.80)">${e.id}</div>
              <div style="font-size:10px;color:rgba(255,255,255,0.30);margin-top:2px">${e.creado}</div>
            </div>
            <div>
              <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88)">${e.cliente}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.38)">${e.tipo}</div>
            </div>
            <div>
              <span style="font-size:11px;font-weight:700;color:${fs[e.prioridad]||"gray"};text-transform:uppercase;padding:3px 8px;background:${fs[e.prioridad]||"gray"}22;border-radius:99px">
                ${e.prioridad}
              </span>
            </div>
            <div>
              <span style="font-size:11px;font-weight:700;color:${jn[e.estatus]||"white"};text-transform:uppercase;padding:3px 8px;background:${jn[e.estatus]||"white"}22;border-radius:99px">
                ${e.estatus}
              </span>
            </div>
            <div style="font-size:12px;color:rgba(255,255,255,0.40)">${e.tecnico}</div>
            <div style="text-align:right">
              <div style="font-size:11px;font-weight:700;color:${e.prioridad==="crítica"?"#f87171":"rgba(255,255,255,0.40)"}">${e.sla}</div>
              <button class="btn-nux btn-accent-nux" style="font-size:11px;padding:4px 10px;margin-top:4px" onclick="event.stopPropagation();window.__toastSuccess&&window.__toastSuccess('${e.id} asignado')">
                Asignar
              </button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Técnicos disponibles -->
    <div class="glass-card p-4 mt-3">
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px"><i class="bi bi-person-badge" style="color:${L.accent};margin-right:8px"></i>Técnicos disponibles</h3>
      <div class="row g-2">
        ${[{nombre:"Diego R.",tickets:3,carga:"Alta",estado:"activo"},{nombre:"Ana S.",tickets:2,carga:"Media",estado:"activo"},{nombre:"Carlos M.",tickets:1,carga:"Baja",estado:"activo"},{nombre:"Sara V.",tickets:0,carga:"Libre",estado:"libre"},{nombre:"Luis P.",tickets:4,carga:"Alta",estado:"activo"},{nombre:"Gaby T.",tickets:0,carga:"Libre",estado:"ausente"}].map(e=>`
          <div class="col-md-4 col-lg-2">
            <div style="padding:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);text-align:center">
              <div style="position:relative;display:inline-block;margin-bottom:8px">
                <div class="avatar" style="margin:0 auto">${e.nombre.charAt(0)}</div>
                <span class="status-dot ${e.estado==="activo"?"active":e.estado==="libre"?"accent":"danger"}" style="position:absolute;bottom:0;right:0;width:9px;height:9px;border:2px solid #181818"></span>
              </div>
              <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${e.nombre}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.35)">${e.tickets} tickets</div>
              <div style="font-size:10px;font-weight:700;color:${e.carga==="Alta"?"#f87171":e.carga==="Media"?"#fbbf24":e.carga==="Libre"?L.accent:"rgba(255,255,255,0.30)"};margin-top:4px">${e.carga}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
  `}function Ug(){window.__toastSuccess=Hi,window.__toastInfo=to}const yt={nombre:"LaunchPad",accent:"#6366f1",accentRgb:"99,102,241"},qg=[{id:1,empresa:"Distribuidora Norteña SA",contacto:"Luis Mendoza",plan:"Enterprise",mrr:"$4,800",seats:24,nps:9,salud:94,renovacion:"31 Dic 2025",etapa:"activo"},{id:2,empresa:"Mueblería El Roble",contacto:"Ana Juárez",plan:"Business",mrr:"$1,200",seats:8,nps:8,salud:88,renovacion:"28 Feb 2026",etapa:"activo"},{id:3,empresa:"Clínica Bienestar SC",contacto:"Dr. Pérez",plan:"Business",mrr:"$1,200",seats:6,nps:7,salud:72,renovacion:"15 Mar 2026",etapa:"en riesgo"},{id:4,empresa:"Transportes VelaGo",contacto:"Marco Silva",plan:"Starter",mrr:"$490",seats:3,nps:6,salud:65,renovacion:"30 Abr 2026",etapa:"en riesgo"},{id:5,empresa:"Agencia Creativa Loop",contacto:"Sara Vidal",plan:"Business",mrr:"$1,200",seats:10,nps:10,salud:98,renovacion:"01 Jun 2026",etapa:"activo"},{id:6,empresa:"Constructora Vértice",contacto:"Ing. Reyes",plan:"Enterprise",mrr:"$4,800",seats:18,nps:9,salud:91,renovacion:"31 Jul 2026",etapa:"activo"},{id:7,empresa:"Retail Modas Tres",contacto:"Gaby Torres",plan:"Starter",mrr:"$490",seats:2,nps:5,salud:58,renovacion:"15 Sep 2026",etapa:"en riesgo"},{id:8,empresa:"Eventos Éxito SRL",contacto:"Fernanda L.",plan:"Business",mrr:"$1,200",seats:7,nps:8,salud:85,renovacion:"30 Nov 2026",etapa:"activo"}],Fn={labels:["Dic","Ene","Feb","Mar","Abr","May","Jun"],data:[68400,74200,79100,84600,91e3,98400,106800]},st={nombre:"Distribuidora Norteña SA",iniciales:"DN",seats:24,uso:87,contacto:"Luis Mendoza",cargo:"CEO",tel:"55 9988 7766",email:"l.mendoza@disnortena.mx",inicio:"01 Feb 2025",renovacion:"31 Dic 2025",csm:"Andrea Vega"},bs=[{fecha:"Hoy 08:42",evento:"24 usuarios activos simultáneos — nuevo máximo",tipo:"pico",c:"#16a34a"},{fecha:"Ayer 17:30",evento:"Luis Mendoza exportó reporte Q2 2025",tipo:"uso",c:"#6366f1"},{fecha:"23 Jun",evento:"Onboarding completado — 22/24 usuarios",tipo:"hito",c:"#16a34a"},{fecha:"20 Jun",evento:"Soporte chat — pregunta sobre API webhooks",tipo:"ticket",c:"#f59e0b"},{fecha:"15 Jun",evento:"Acceso al módulo BI habilitado",tipo:"config",c:"#06b6d4"},{fecha:"10 Jun",evento:"Primer inicio de sesión — cuenta activa",tipo:"hito",c:"#16a34a"}],Kg=[{texto:"Llamada de revisión trimestral — agendar para Jul",icono:"bi-telephone-fill",color:"#6366f1"},{texto:"Proponer expansión a 30 seats (+6 usuarios)",icono:"bi-people-fill",color:"#16a34a"},{texto:"Compartir caso de éxito en blog de NUXORB",icono:"bi-megaphone-fill",color:"#f59e0b"}];function Jg(){const e=yt.accent;return`
  <div style="--industry-accent:${e};--industry-accent-rgb:${yt.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:var(--radius-md);background:${e};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${st.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${st.nombre}
            <span style="font-size:13px;font-weight:500;margin-left:8px;padding:2px 10px;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.30);border-radius:99px;color:#818cf8">Enterprise</span>
          </h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${se(["24 seats activos","NPS 9 — Promotor","Renovación Dic 2025","Salud 94%"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Abriendo análisis de expansión...')"><i class="bi bi-graph-up-arrow"></i> Expansión</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Reunión agendada con Luis Mendoza')"><i class="bi bi-calendar-check"></i> Agendar reunión</button>
      </div>
    </div>

    ${ie({stages:["Lead","Demo","Trial","Cliente activo","Expansión"],currentIndex:3,accent:e})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Datos de la cuenta</div>
          ${[{icon:"bi-person-fill",label:"Contacto clave",val:st.contacto},{icon:"bi-briefcase-fill",label:"Cargo",val:st.cargo},{icon:"bi-telephone-fill",label:"Teléfono",val:st.tel},{icon:"bi-envelope-fill",label:"Email",val:st.email},{icon:"bi-calendar-range",label:"Contrato",val:`${st.inicio} → ${st.renovacion}`},{icon:"bi-person-check-fill",label:"CSM asignada",val:st.csm}].map(t=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${t.icon}" style="color:${e};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${t.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${t.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Uso de la plataforma</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:13px;color:rgba(255,255,255,0.60)">${st.seats} seats</span>
              <span style="font-size:15px;font-weight:800;color:#16a34a">${st.uso}%</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${st.uso}%;background:#16a34a;border-radius:99px"></div>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.30);margin-top:5px">${Math.round(st.seats*st.uso/100)}/${st.seats} usuarios activos hoy</div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="display:flex;align-items:center;gap:6px;padding:8px 12px;background:rgba(245,158,11,0.10);border:1px solid rgba(245,158,11,0.25);border-radius:var(--radius-md)">
              <i class="bi bi-clock-history" style="color:#f59e0b"></i>
              <div>
                <div style="font-size:11px;font-weight:700;color:#f59e0b">Renovación en</div>
                <div style="font-size:13px;font-weight:600;color:white">188 días</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">${j({icon:"bi-currency-dollar",label:"MRR mensual",value:"$4,800",delta:"+0% (fijo)",trend:"up",cardColor:"#1d4ed8",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-people-fill",label:"Usuarios activos",value:21,delta:`de ${st.seats} seats`,trend:"up",cardColor:"#1e40af",deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-bar-chart-fill",label:"Uso plataforma",value:"87%",delta:"↑ +4% este mes",trend:"up",cardColor:"#15803d",animate:!1})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-heart-fill",label:"Health score",value:94,delta:"Excelente",trend:"up",cardColor:"#7c3aed",deltaLabel:""})}</div>
        </div>

        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px;display:flex;align-items:center;gap:8px">
            <i class="bi bi-lightning-charge-fill" style="color:${e}"></i> Próximos pasos — CSM
          </h3>
          ${Kg.map(t=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
              <div style="width:30px;height:30px;border-radius:8px;background:${t.color}22;border:1px solid ${t.color}44;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                <i class="bi ${t.icono}" style="color:${t.color};font-size:13px"></i>
              </div>
              <span style="font-size:13px;color:rgba(255,255,255,0.72);flex:1">${t.texto}</span>
              <button class="btn-nux btn-ghost-nux" style="font-size:11px;padding:4px 10px" onclick="window.__toastSuccess&&window.__toastSuccess('Acción registrada')">Marcar</button>
            </div>`).join("")}
        </div>

        <div class="glass-card p-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Actividad de la cuenta</h3>
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">Últimos 30 días</span>
          </div>
          <div style="display:flex;flex-direction:column;gap:0">
            ${bs.map((t,i)=>`
              <div style="display:flex;gap:14px;padding:12px 0;border-bottom:${i<bs.length-1?"1px solid rgba(255,255,255,0.05)":"none"}">
                <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">
                  <div style="width:8px;height:8px;border-radius:50%;background:${t.c};margin-top:4px"></div>
                  ${i<bs.length-1?'<div style="width:1px;flex:1;background:rgba(255,255,255,0.06);margin-top:6px"></div>':""}
                </div>
                <div style="flex:1;padding-bottom:4px">
                  <div style="font-size:13px;color:rgba(255,255,255,0.80)">${t.evento}</div>
                  <div style="font-size:11px;color:rgba(255,255,255,0.30);margin-top:3px">${t.fecha}</div>
                </div>
              </div>`).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>`}const Ti=yt.accent,pt=yt.accentRgb,Zg=[{mes:"Ene",data:[100,88,82,76,71,68]},{mes:"Feb",data:[100,91,85,79,73]},{mes:"Mar",data:[100,89,83,77]},{mes:"Abr",data:[100,92,86]},{mes:"May",data:[100,90]},{mes:"Jun",data:[100]}];function Qg(e){return e===100?`rgba(${pt},0.85)`:e>=85?`rgba(${pt},0.55)`:e>=75?`rgba(${pt},0.35)`:e>=65?`rgba(${pt},0.18)`:"rgba(255,255,255,0.05)"}function tu(){const e=["M0","M1","M2","M3","M4","M5"];return`
  <div style="overflow-x:auto">
    <table style="border-collapse:collapse;font-size:12px;width:100%;min-width:320px">
      <thead>
        <tr>
          <th style="padding:6px 8px;color:rgba(255,255,255,0.35);font-weight:600;text-align:left">Cohort</th>
          ${e.map(t=>`<th style="padding:6px 8px;color:rgba(255,255,255,0.35);font-weight:600;text-align:center">${t}</th>`).join("")}
        </tr>
      </thead>
      <tbody>
        ${Zg.map(t=>`
          <tr>
            <td style="padding:5px 8px;font-weight:600;color:rgba(255,255,255,0.60);white-space:nowrap">${t.mes} '25</td>
            ${e.map((i,s)=>{const o=t.data[s];return o!==void 0?`<td style="padding:5px 8px;text-align:center"><div style="padding:5px 8px;background:${Qg(o)};border-radius:5px;font-weight:700;color:${o===100?"white":"rgba(255,255,255,0.80)"}">${o}%</div></td>`:'<td style="padding:5px 8px;text-align:center"><div style="padding:5px 8px;background:rgba(255,255,255,0.03);border-radius:5px;color:rgba(255,255,255,0.12)">—</div></td>'}).join("")}
          </tr>`).join("")}
      </tbody>
    </table>
  </div>`}const Bn=[{label:"MRR Anterior",val:98400,color:"rgba(255,255,255,0.08)",textC:"rgba(255,255,255,0.50)"},{label:"New MRR",val:12600,color:"rgba(34,197,94,0.25)",textC:"#4ade80"},{label:"Expansión",val:6800,color:"rgba(99,102,241,0.30)",textC:"#818cf8"},{label:"Contracción",val:-4200,color:"rgba(239,68,68,0.15)",textC:"#f87171"},{label:"Churn",val:-6800,color:"rgba(239,68,68,0.20)",textC:"#fca5a5"},{label:"MRR Final",val:106800,color:`rgba(${pt},0.35)`,textC:Ti}];function eu(){const e=Math.max(...Bn.map(t=>Math.abs(t.val)));return Bn.map(t=>{const i=Math.round(Math.abs(t.val)/e*100),s=t.val>0&&t.label!=="MRR Anterior"&&t.label!=="MRR Final"?"+":"";return`
    <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">
      <div style="width:88px;font-size:11px;color:rgba(255,255,255,0.50);text-align:right;flex-shrink:0">${t.label}</div>
      <div style="flex:1;height:28px;background:${t.color};border-radius:5px;display:flex;align-items:center;padding:0 10px;position:relative;overflow:hidden;min-width:${i}%;max-width:100%">
        <span style="font-size:12px;font-weight:700;color:${t.textC};white-space:nowrap">${s}$${Math.abs(t.val).toLocaleString("es-MX")}</span>
      </div>
    </div>`}).join("")}function iu(){const e=qg.filter(t=>t.etapa==="en riesgo");return`
  <div style="--industry-accent:${Ti};--industry-accent-rgb:${pt}">

    <!-- Hero MRR — Baremetrics style -->
    <div style="margin-bottom:24px">
      <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:28px;background:linear-gradient(135deg,rgba(${pt},0.10) 0%,rgba(${pt},0.03) 100%);border:1px solid rgba(${pt},0.20);border-radius:var(--radius-lg);position:relative;overflow:hidden">
        <div style="position:absolute;top:-40px;right:-40px;width:200px;height:200px;border-radius:50%;background:radial-gradient(circle,rgba(${pt},0.08),transparent 70%);pointer-events:none"></div>
        <div>
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:rgba(255,255,255,0.35);margin-bottom:8px">Monthly Recurring Revenue</div>
          <div style="font-size:3.5rem;font-weight:900;color:white;letter-spacing:-0.04em;line-height:1">$106,800</div>
          <div style="display:flex;align-items:center;gap:8px;margin-top:10px">
            <span style="font-size:14px;font-weight:700;color:#4ade80;display:flex;align-items:center;gap:4px"><i class="bi bi-arrow-up-right"></i>+8.5%</span>
            <span style="font-size:13px;color:rgba(255,255,255,0.35)">vs mes anterior</span>
          </div>
        </div>
        <div style="display:flex;gap:28px;flex-wrap:wrap">
          ${[{label:"ARR",val:"$1.28M",delta:"+8.5%",dc:"#4ade80"},{label:"Clientes",val:"382",delta:"+35",dc:"#818cf8"},{label:"ARPU",val:"$280",delta:"+$12",dc:"#4ade80"},{label:"Churn rate",val:"2.1%",delta:"−0.3%",dc:"#4ade80"}].map(t=>`
            <div style="min-width:90px">
              <div style="font-size:11px;font-weight:600;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px">${t.label}</div>
              <div style="font-size:1.4rem;font-weight:800;color:white">${t.val}</div>
              <div style="font-size:11px;font-weight:700;color:${t.dc}">${t.delta}</div>
            </div>`).join("")}
        </div>
      </div>
    </div>

    <div class="row g-3 mb-3">
      <!-- Cohort grid -->
      <div class="col-lg-6">
        <div class="glass-card p-4 h-100">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Retención de cohortes</h3>
            <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:rgba(255,255,255,0.30)">
              ${[`rgba(${pt},0.18)`,`rgba(${pt},0.35)`,`rgba(${pt},0.55)`,`rgba(${pt},0.85)`].map(t=>`<div style="width:14px;height:14px;border-radius:3px;background:${t}"></div>`).join("")}
              ↑ retención
            </div>
          </div>
          ${tu()}
          <div style="margin-top:10px;font-size:11px;color:rgba(255,255,255,0.25)">Retención promedio M3: <strong style="color:${Ti}">77%</strong> · Benchmark SaaS: 70%</div>
        </div>
      </div>

      <!-- Waterfall MRR -->
      <div class="col-lg-6">
        <div class="glass-card p-4 h-100">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:16px">Movimiento de MRR — Junio</h3>
          ${eu()}
          <div style="margin-top:12px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:16px;flex-wrap:wrap">
            ${[["#4ade80","New + Expansión: +$19.4K"],["#f87171","Churn + Contr.: −$11K"]].map(([t,i])=>`
              <div style="display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(255,255,255,0.40)">
                <div style="width:10px;height:10px;border-radius:2px;background:${t}"></div>${i}
              </div>`).join("")}
          </div>
        </div>
      </div>
    </div>

    <!-- MRR trend + churn risk -->
    <div class="row g-3">
      <div class="col-lg-8">
        <div class="glass-card p-4">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:18px">Evolución MRR — Últimos 7 meses</h3>
          <div class="chart-container" style="height:160px"><canvas id="chart-mrr"></canvas></div>
        </div>
      </div>
      <div class="col-lg-4">
        <div class="glass-card p-4 h-100">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <i class="bi bi-exclamation-triangle-fill" style="color:#f59e0b"></i>
            <h3 style="font-size:14px;font-weight:700;color:white">Riesgo de churn</h3>
            <span style="margin-left:auto;font-size:11px;font-weight:700;padding:2px 8px;background:rgba(245,158,11,0.15);color:#f59e0b;border-radius:99px">${e.length} cuentas</span>
          </div>
          ${e.map(t=>`
            <div style="padding:10px;margin-bottom:6px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);border-radius:var(--radius-md)">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${t.empresa}</span>
                <span style="font-size:11px;font-weight:700;color:${Ti}">${t.mrr}</span>
              </div>
              <div style="display:flex;align-items:center;gap:8px">
                <div style="flex:1;height:3px;background:rgba(255,255,255,0.06);border-radius:99px;overflow:hidden">
                  <div style="height:100%;width:${t.salud}%;background:#f87171;border-radius:99px"></div>
                </div>
                <span style="font-size:10px;color:#f87171">Salud ${t.salud}%</span>
              </div>
            </div>`).join("")}
        </div>
      </div>
    </div>
  </div>`}function su(){Ki("chart-mrr",{labels:Fn.labels,datasets:[{label:"MRR ($)",data:Fn.data}],height:160})}const ou=[{id:"por-contactar",label:"Por Contactar",color:"rgba(255,255,255,0.35)",cards:[{empresa:"Restaurante La Fogata",contacto:"Dueño Pedro G.",mrr:"$490",fuente:"Referido"},{empresa:"Salón de Belleza Noa",contacto:"Karen P.",mrr:"$490",fuente:"Web"},{empresa:"Taller Eléctrico GT",contacto:"Ing. Montes",mrr:"$1,200",fuente:"LinkedIn"}]},{id:"demo",label:"Demo Agendada",color:"#f59e0b",cards:[{empresa:"Distribuidora El Sol",contacto:"Lic. Salas",mrr:"$1,200",fuente:"Referido"},{empresa:"Agencia Promo MX",contacto:"Rebeca V.",mrr:"$4,800",fuente:"Conferencia"}]},{id:"propuesta",label:"Propuesta Enviada",color:"#6366f1",cards:[{empresa:"Manufactura Herrera SA",contacto:"Dir. Herrera",mrr:"$4,800",fuente:"Web"},{empresa:"Logística VelaGo Norte",contacto:"Gerente Ops.",mrr:"$1,200",fuente:"Referido"}]},{id:"negociacion",label:"Negociación",color:"#ec4899",cards:[{empresa:"Grupo Industrial NMX",contacto:"VP Finanzas",mrr:"$4,800",fuente:"Evento"}]},{id:"cerrado",label:"Cerrado ✓",color:"#22c55e",cards:[{empresa:"Hotel Palma Real",contacto:"Dir. General",mrr:"$1,200",fuente:"Referido"},{empresa:"Farmacia del Pueblo",contacto:"Dueño F. López",mrr:"$490",fuente:"Web"}]}];function nu(){return`
  <div style="--industry-accent:${yt.accent};--industry-accent-rgb:${yt.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-kanban-fill" style="color:${yt.accent};margin-right:10px"></i>Pipeline de Ventas</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${yt.nombre} — Seguimiento de deals B2B</p>
      </div>
      <div style="display:flex;gap:10px">
        <div style="padding:8px 16px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.20);border-radius:var(--radius-md);font-size:13px">
          <span style="color:rgba(255,255,255,0.45)">MRR en pipeline: </span>
          <span style="color:${yt.accent};font-weight:700">$26,370</span>
        </div>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nuevo deal creado')"><i class="bi bi-plus-lg"></i> Nuevo deal</button>
      </div>
    </div>

    <!-- Pipeline Kanban -->
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;overflow-x:auto">
      ${ou.map(e=>`
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:12px;font-weight:700;color:${e.color};text-transform:uppercase;letter-spacing:0.06em">
            <div style="width:8px;height:8px;border-radius:50%;background:${e.color}"></div>
            ${e.label}
            <span style="margin-left:auto;background:${e.color}22;color:${e.color};font-size:11px;padding:1px 8px;border-radius:99px">${e.cards.length}</span>
          </div>
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:var(--radius-lg);padding:10px;min-height:360px">
            ${e.cards.map(t=>`
              <div style="padding:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-md);margin-bottom:8px;cursor:pointer;transition:all 0.2s"
              onmouseenter="this.style.borderColor='rgba(${yt.accentRgb},0.30)';this.style.background='rgba(${yt.accentRgb},0.06)'"
              onmouseleave="this.style.borderColor='rgba(255,255,255,0.07)';this.style.background='rgba(255,255,255,0.03)'"
              onclick="window.__toastInfo&&window.__toastInfo('Deal: ${t.empresa}')">
                <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.88);margin-bottom:4px">${t.empresa}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.38);margin-bottom:8px">${t.contacto}</div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:12px;font-weight:700;color:${yt.accent}">${t.mrr}/mo</span>
                  <span style="font-size:10px;color:rgba(255,255,255,0.30);background:rgba(255,255,255,0.05);padding:2px 6px;border-radius:4px">${t.fuente}</span>
                </div>
              </div>
            `).join("")}
            <div style="padding:8px;border:1px dashed rgba(255,255,255,0.07);border-radius:var(--radius-md);text-align:center;cursor:pointer;color:rgba(255,255,255,0.20);font-size:12px"
            onclick="window.__toastSuccess&&window.__toastSuccess('Nuevo deal en ${e.label}')">
              <i class="bi bi-plus"></i>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  </div>
  `}const $t={nombre:"EduTrack",accent:"#f59e0b",accentRgb:"245,158,11"},Ot=[{id:1,nombre:"Sofía Ramírez",curso:"Inglés Avanzado",nivel:"B2",asistencia:92,promedio:9.1,mensualidad:"$1,200",estatus:"activo",pago:"al corriente"},{id:2,nombre:"Diego Morales",curso:"Programación Python",nivel:"Intermedio",asistencia:78,promedio:8.4,mensualidad:"$1,500",estatus:"activo",pago:"al corriente"},{id:3,nombre:"Valeria Ortiz",curso:"Diseño Gráfico",nivel:"Básico",asistencia:85,promedio:9.4,mensualidad:"$1,350",estatus:"activo",pago:"pendiente"},{id:4,nombre:"Carlos Herrera",curso:"Inglés Avanzado",nivel:"C1",asistencia:95,promedio:9.8,mensualidad:"$1,200",estatus:"activo",pago:"al corriente"},{id:5,nombre:"Ana González",curso:"Marketing Digital",nivel:"Avanzado",asistencia:70,promedio:7.9,mensualidad:"$1,400",estatus:"en riesgo",pago:"vencido"},{id:6,nombre:"Marco Jiménez",curso:"Programación Python",nivel:"Básico",asistencia:88,promedio:8.7,mensualidad:"$1,500",estatus:"activo",pago:"al corriente"},{id:7,nombre:"Lucía Peña",curso:"Diseño Gráfico",nivel:"Intermedio",asistencia:91,promedio:9.2,mensualidad:"$1,350",estatus:"activo",pago:"al corriente"},{id:8,nombre:"Rodrigo Salinas",curso:"Marketing Digital",nivel:"Básico",asistencia:65,promedio:7.2,mensualidad:"$1,400",estatus:"inactivo",pago:"vencido"}],au=[{nombre:"Inglés Avanzado",instructor:"Mtra. Elena Vidal",alumnos:24,capacidad:30,horario:"Lun/Mié/Vie 7pm",duracion:"6 meses",avance:68},{nombre:"Programación Python",instructor:"Ing. Jorge Mora",alumnos:18,capacidad:20,horario:"Mar/Jue 6pm",duracion:"4 meses",avance:45},{nombre:"Diseño Gráfico",instructor:"Dis. Laura Ríos",alumnos:15,capacidad:16,horario:"Sáb 10am",duracion:"5 meses",avance:82},{nombre:"Marketing Digital",instructor:"Lic. Pablo Salas",alumnos:22,capacidad:25,horario:"Lun/Mié 7pm",duracion:"3 meses",avance:30}],kt={nombre:"Sofía Ramírez Torres",iniciales:"SR",tel:"55 6677 8899",email:"sofia.ramirez@gmail.com",programa:"Inglés Avanzado · Certificación Cambridge",nivel:"B2 — Upper Intermediate",tutor:"Mtra. Carolina López",inicio:"Ago 2024",beca:"Beca parcial 30%",asistencia:92},ru=[{nombre:"Reading & Comprehension",calificacion:9.4,creditos:6,estatus:"Aprobado",c:"#16a34a"},{nombre:"Grammar & Writing",calificacion:8.8,creditos:6,estatus:"Aprobado",c:"#16a34a"},{nombre:"Listening & Speaking",calificacion:9.2,creditos:6,estatus:"En curso",c:"#f59e0b"},{nombre:"Business English",calificacion:null,creditos:4,estatus:"Próximo",c:"rgba(255,255,255,0.30)"},{nombre:"Cambridge Exam Prep",calificacion:null,creditos:4,estatus:"Próximo",c:"rgba(255,255,255,0.30)"}],lu=[{mes:"Junio 2025",monto:"$1,200",fecha:"01 Jun",metodo:"Transferencia",estado:"Pagado",c:"#16a34a"},{mes:"Mayo 2025",monto:"$1,200",fecha:"01 May",metodo:"Tarjeta",estado:"Pagado",c:"#16a34a"},{mes:"Abril 2025",monto:"$1,200",fecha:"03 Abr",metodo:"Transferencia",estado:"Pagado",c:"#16a34a"},{mes:"Marzo 2025",monto:"$1,200",fecha:"05 Mar",metodo:"Efectivo",estado:"Pagado",c:"#16a34a"},{mes:"Julio 2025",monto:"$1,200",fecha:"01 Jul",metodo:"—",estado:"Pendiente",c:"#f59e0b"}];function cu(){const e=$t.accent;return`
  <div style="--industry-accent:${e};--industry-accent-rgb:${$t.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:${e};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${kt.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${kt.nombre}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${se(["B2 Upper-Intermediate","Beca 30%","Promedio 9.1","Al corriente"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando constancia de estudios...')"><i class="bi bi-file-earmark-fill"></i> Constancia</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Mensaje enviado a Sofía')"><i class="bi bi-chat-dots-fill"></i> Contactar</button>
      </div>
    </div>

    ${ie({stages:["Interesada","Pre-inscrita","Activa","Avanzada","Graduada"],currentIndex:2,accent:e})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Datos del alumno</div>
          ${[{icon:"bi-telephone-fill",label:"Teléfono",val:kt.tel},{icon:"bi-envelope-fill",label:"Email",val:kt.email},{icon:"bi-book-fill",label:"Programa",val:kt.programa},{icon:"bi-translate",label:"Nivel actual",val:kt.nivel},{icon:"bi-calendar3",label:"Ingreso",val:kt.inicio},{icon:"bi-award-fill",label:"Beca",val:kt.beca}].map(i=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${i.icon}" style="color:${e};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${i.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${i.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:10px">Tutora asignada</div>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar" style="background:rgba(245,158,11,0.18);color:${e}">C</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:white">${kt.tutor}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.40)">Inglés Avanzado</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Asistencia</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:13px;color:rgba(255,255,255,0.60)">Este período</span>
              <span style="font-size:16px;font-weight:800;color:#16a34a">${kt.asistencia}%</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${kt.asistencia}%;background:#16a34a;border-radius:99px"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">${j({icon:"bi-book-fill",label:"Materias cursadas",value:3,delta:"de 5 del programa",trend:"up",cardColor:"#1d4ed8",deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-mortarboard-fill",label:"Promedio general",value:`${9.1}`,delta:"Excelente",trend:"up",cardColor:"#1e40af",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-calendar-check-fill",label:"Clases asistidas",value:46,delta:"de 50 totales",trend:"up",cardColor:"#15803d",deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-cash-stack",label:"Saldo pendiente",value:"$0",delta:"Al corriente",trend:"up",cardColor:"#7c3aed",animate:!1,deltaLabel:""})}</div>
        </div>

        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px;display:flex;align-items:center;gap:8px">
            <i class="bi bi-journal-richtext" style="color:${e}"></i> Plan de estudios y calificaciones
          </h3>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>Materia</th><th>Créditos</th><th style="text-align:right">Calificación</th><th>Estado</th></tr></thead>
            <tbody>${ru.map(i=>`<tr>
              <td><strong>${i.nombre}</strong></td>
              <td style="color:rgba(255,255,255,0.45)">${i.creditos}</td>
              <td style="text-align:right;font-size:15px;font-weight:700;color:${i.calificacion?e:"rgba(255,255,255,0.25)"}">${i.calificacion??"—"}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${i.c}22;color:${i.c};border:1px solid ${i.c}33">${i.estatus}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>

        <div class="glass-card p-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Historial de pagos</h3>
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">Mensualidad: $1,200 · Beca: $360</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>Período</th><th>Fecha pago</th><th>Método</th><th style="text-align:right">Monto</th><th>Estado</th></tr></thead>
            <tbody>${lu.map(i=>`<tr>
              <td><strong>${i.mes}</strong></td>
              <td style="color:rgba(255,255,255,0.45)">${i.fecha}</td>
              <td style="color:rgba(255,255,255,0.50)">${i.metodo}</td>
              <td style="text-align:right;font-weight:700;color:${e}">${i.monto}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${i.c}22;color:${i.c};border:1px solid ${i.c}33">${i.estado}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const Nt=$t.accent,Wt=$t.accentRgb;function du(e,t,i=60){const s=i/2-6,o=2*Math.PI*s,n=o*e/100;return`
  <svg width="${i}" height="${i}" viewBox="0 0 ${i} ${i}" style="flex-shrink:0">
    <circle cx="${i/2}" cy="${i/2}" r="${s}" fill="none" stroke="${t}22" stroke-width="5"/>
    <circle cx="${i/2}" cy="${i/2}" r="${s}" fill="none" stroke="${t}" stroke-width="5"
      stroke-dasharray="${n} ${o-n}" stroke-dashoffset="${o*.25}" stroke-linecap="round"/>
    <text x="${i/2}" y="${i/2+4}" text-anchor="middle" fill="${t}" font-size="11" font-weight="800" font-family="Inter,sans-serif">${e}%</text>
  </svg>`}function pu(){const e=["L","M","X","J","V","S","D"],t=[[null,null,null,null,null,92,85],[88,91,75,93,88,90,82],[95,88,90,87,92,88,null],[90,86,94,91,88,null,null]];function i(s){return s===null?"transparent":s>=90?`rgba(${Wt},0.85)`:s>=80?`rgba(${Wt},0.55)`:s>=70?`rgba(${Wt},0.30)`:"rgba(239,68,68,0.40)"}return`
  <div>
    <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:8px">
      ${e.map(s=>`<div style="text-align:center;font-size:10px;font-weight:700;color:rgba(0,0,0,0.35);padding:2px">${s}</div>`).join("")}
    </div>
    ${t.map(s=>`
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:6px;margin-bottom:6px">
        ${s.map((o,n)=>o!==null?`<div style="background:${i(o)};border-radius:6px;padding:6px 2px;text-align:center;cursor:default" title="Asistencia: ${o}%">
               <div style="font-size:10px;font-weight:700;color:${o>=90?"white":o>=70?"rgba(0,0,0,0.70)":"rgba(0,0,0,0.60)"}">${o}%</div>
             </div>`:'<div style="background:rgba(0,0,0,0.04);border-radius:6px;padding:6px 2px"></div>').join("")}
      </div>`).join("")}
    <div style="display:flex;align-items:center;gap:10px;margin-top:8px;flex-wrap:wrap">
      ${[[`rgba(${Wt},0.85)`,"≥90%"],[`rgba(${Wt},0.55)`,"80–89%"],[`rgba(${Wt},0.30)`,"70–79%"],["rgba(239,68,68,0.40)","<70%"]].map(([s,o])=>`
        <div style="display:flex;align-items:center;gap:4px;font-size:10px;color:rgba(0,0,0,0.45)">
          <div style="width:12px;height:12px;border-radius:3px;background:${s}"></div>${o}
        </div>`).join("")}
    </div>
  </div>`}const Vn=[{rango:"< 6.0",count:3,color:"#ef4444"},{rango:"6.0–6.9",count:8,color:"#f97316"},{rango:"7.0–7.9",count:18,color:"#f59e0b"},{rango:"8.0–8.9",count:32,color:`rgba(${Wt},0.70)`},{rango:"9.0–10",count:27,color:Nt}];function hu(){const e=Math.max(...Vn.map(t=>t.count));return`
  <div style="display:flex;align-items:flex-end;gap:8px;height:120px;margin-bottom:8px">
    ${Vn.map(t=>{const i=Math.round(t.count/e*100);return`
      <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:4px">
        <div style="font-size:11px;font-weight:700;color:${t.color}">${t.count}</div>
        <div style="width:100%;height:${i}px;background:${t.color};border-radius:5px 5px 2px 2px;min-height:4px;transition:height 0.8s ease"></div>
        <div style="font-size:10px;color:rgba(0,0,0,0.45);white-space:nowrap">${t.rango}</div>
      </div>`}).join("")}
  </div>
  <div style="font-size:11px;color:rgba(0,0,0,0.40)">Total 88 alumnos evaluados · Promedio institucional: <strong style="color:${Nt}">8.6</strong></div>`}function gu(){const e=Ot.filter(o=>o.estatus==="activo").length,t=Ot.filter(o=>o.estatus==="en riesgo").length,i=Ot.filter(o=>o.pago==="al corriente").length,s=Math.round(Ot.reduce((o,n)=>o+n.asistencia,0)/Ot.length);return(Ot.reduce((o,n)=>o+n.promedio,0)/Ot.length).toFixed(1),`
  <div style="--industry-accent:${Nt};--industry-accent-rgb:${Wt}">

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.5rem;font-weight:800;color:#111827;letter-spacing:-0.03em;margin-bottom:2px">
          <i class="bi bi-mortarboard-fill" style="color:${Nt};margin-right:10px"></i>Panel Académico
        </h1>
        <p style="font-size:13px;color:rgba(0,0,0,0.40)">${$t.nombre} — ${new Date().toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"})}</p>
      </div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        ${[{val:e,label:"Activos",color:Nt},{val:t,label:"En riesgo",color:"#ef4444"},{val:i,label:"Al corriente",color:"#16a34a"}].map(o=>`
          <div style="padding:8px 14px;background:white;border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-md);box-shadow:0 1px 4px rgba(0,0,0,0.06)">
            <div style="font-size:20px;font-weight:800;color:${o.color};line-height:1">${o.val}</div>
            <div style="font-size:10px;color:rgba(0,0,0,0.45)">${o.label}</div>
          </div>`).join("")}
      </div>
    </div>

    <!-- Courses as cards with progress rings — LMS style -->
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-bottom:16px">
      ${au.map(o=>{const n=o.calificacionPromedio||8.5,a=o.asistenciaPromedio||85,r=o.inscritos||18,l=o.cupo||25,c=Math.round(r/l*100);return`
        <div style="background:white;border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-lg);padding:16px;box-shadow:0 1px 6px rgba(0,0,0,0.05);cursor:default;transition:box-shadow 0.2s"
             onmouseover="this.style.boxShadow='0 4px 18px rgba(0,0,0,0.12)'" onmouseout="this.style.boxShadow='0 1px 6px rgba(0,0,0,0.05)'">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:12px">
            <div>
              <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:2px">${o.nombre}</div>
              <div style="font-size:11px;color:rgba(0,0,0,0.40)">${o.instructor||"Instructor"} · ${o.horario||"Ver horario"}</div>
            </div>
            ${du(c,Nt,52)}
          </div>
          <div style="display:flex;gap:12px;margin-top:8px;padding-top:8px;border-top:1px solid rgba(0,0,0,0.06)">
            <div>
              <div style="font-size:16px;font-weight:800;color:${Nt}">${n}</div>
              <div style="font-size:10px;color:rgba(0,0,0,0.40)">Promedio</div>
            </div>
            <div>
              <div style="font-size:16px;font-weight:800;color:#374151">${a}%</div>
              <div style="font-size:10px;color:rgba(0,0,0,0.40)">Asistencia</div>
            </div>
            <div>
              <div style="font-size:16px;font-weight:800;color:#374151">${r}</div>
              <div style="font-size:10px;color:rgba(0,0,0,0.40)">Alumnos</div>
            </div>
          </div>
        </div>`}).join("")}
    </div>

    <div class="row g-3">
      <!-- Attendance calendar -->
      <div class="col-lg-5">
        <div style="background:white;border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-lg);padding:20px;box-shadow:0 1px 6px rgba(0,0,0,0.05)">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <h3 style="font-size:14px;font-weight:700;color:#111827">Asistencia — Junio 2025</h3>
            <span style="font-size:13px;font-weight:800;color:${Nt}">${s}% prom.</span>
          </div>
          ${pu()}
        </div>
      </div>

      <!-- Grade distribution -->
      <div class="col-lg-4">
        <div style="background:white;border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-lg);padding:20px;box-shadow:0 1px 6px rgba(0,0,0,0.05)">
          <h3 style="font-size:14px;font-weight:700;color:#111827;margin-bottom:16px">Distribución de calificaciones</h3>
          ${hu()}
        </div>
      </div>

      <!-- Alumnos en riesgo -->
      <div class="col-lg-3">
        <div style="background:white;border:1px solid rgba(0,0,0,0.08);border-radius:var(--radius-lg);padding:20px;box-shadow:0 1px 6px rgba(0,0,0,0.05)">
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px">
            <i class="bi bi-exclamation-circle-fill" style="color:#ef4444;font-size:14px"></i>
            <h3 style="font-size:14px;font-weight:700;color:#111827">Atención urgente</h3>
          </div>
          ${Ot.filter(o=>o.estatus==="en riesgo"||o.pago==="vencido").map(o=>`
            <div style="padding:10px 0;border-bottom:1px solid rgba(0,0,0,0.06)">
              <div style="font-size:12px;font-weight:600;color:#111827">${o.nombre}</div>
              <div style="font-size:11px;color:rgba(0,0,0,0.40)">${o.curso}</div>
              <div style="display:flex;gap:6px;margin-top:4px;flex-wrap:wrap">
                ${o.pago==="vencido"?'<span style="font-size:10px;font-weight:700;padding:1px 7px;background:rgba(239,68,68,0.10);color:#ef4444;border-radius:99px">Pago vencido</span>':""}
                ${o.asistencia<70?`<span style="font-size:10px;font-weight:700;padding:1px 7px;background:rgba(245,158,11,0.10);color:#d97706;border-radius:99px">Asist. ${o.asistencia}%</span>`:""}
              </div>
            </div>`).join("")}
        </div>
      </div>
    </div>
  </div>`}function uu(){}function fu(){const e=[{hora:"07:00",curso:"CrossFit 6am",instructor:"Mtra. Elena Vidal",salon:"Aula A",asistentes:18,estado:"en curso"},{hora:"09:00",curso:"Inglés Avanzado",instructor:"Mtra. Elena Vidal",salon:"Aula B",asistentes:22,estado:"en curso"},{hora:"11:00",curso:"Diseño Gráfico",instructor:"Dis. Laura Ríos",salon:"Lab PC",asistentes:14,estado:"próximo"},{hora:"13:00",curso:"Python Básico",instructor:"Ing. Jorge Mora",salon:"Lab PC",asistentes:16,estado:"próximo"},{hora:"17:00",curso:"Marketing Digital",instructor:"Lic. Pablo Salas",salon:"Aula C",asistentes:20,estado:"próximo"},{hora:"19:00",curso:"Inglés Avanzado",instructor:"Mtra. Elena Vidal",salon:"Aula A",asistentes:24,estado:"próximo"}],t={"en curso":"#22c55e",próximo:$t.accent,completado:"rgba(255,255,255,0.30)"};return`
  <div style="--industry-accent:${$t.accent};--industry-accent-rgb:${$t.accentRgb}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-calendar3" style="color:${$t.accent};margin-right:10px"></i>Operaciones del Día</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${$t.nombre} — Clases y asistencia en tiempo real</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Lista de asistencia tomada')"><i class="bi bi-check2-all"></i> Tomar asistencia</button>
    </div>

    <!-- Resumen del día -->
    <div class="row g-3 mb-3">
      ${[{label:"Clases hoy",val:6,icon:"bi-calendar3",color:$t.accent},{label:"Alumnos hoy",val:114,icon:"bi-people-fill",color:"#22c55e"},{label:"Instructores",val:4,icon:"bi-person-video3",color:"#06b6d4"},{label:"Salones activos",val:3,icon:"bi-door-open-fill",color:"#f59e0b"}].map(i=>`
        <div class="col-md-3 col-6">
          <div class="glass-card p-3" style="display:flex;align-items:center;gap:14px">
            <i class="bi ${i.icon}" style="font-size:24px;color:${i.color}"></i>
            <div>
              <div style="font-size:1.6rem;font-weight:800;color:${i.color}">${i.val}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.35);text-transform:uppercase;font-weight:700">${i.label}</div>
            </div>
          </div>
        </div>
      `).join("")}
    </div>

    <!-- Timeline de clases -->
    <div class="glass-card p-4 mb-3" style="position:relative">
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${$t.accent},transparent)"></div>
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Horario de hoy</h3>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${e.map(i=>`
          <div style="display:grid;grid-template-columns:70px 1fr auto;align-items:center;gap:16px;padding:14px 18px;background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.06);border-left:3px solid ${t[i.estado]||"gray"};border-radius:var(--radius-md)">
            <div>
              <div style="font-size:14px;font-weight:800;color:white">${i.hora}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.30)">${i.salon}</div>
            </div>
            <div>
              <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88)">${i.curso}</div>
              <div style="font-size:11px;color:rgba(255,255,255,0.38)">${i.instructor} · ${i.asistentes} alumnos</div>
            </div>
            <div style="text-align:right">
              <span style="font-size:11px;font-weight:700;color:${t[i.estado]};text-transform:uppercase;padding:3px 10px;background:${t[i.estado]}22;border-radius:99px">${i.estado}</span>
              ${i.estado==="en curso"?`<br><button class="btn-nux btn-accent-nux" style="font-size:11px;padding:4px 10px;margin-top:6px" onclick="window.__toastSuccess&&window.__toastSuccess('Asistencia guardada')">Asistencia</button>`:""}
            </div>
          </div>
        `).join("")}
      </div>
    </div>

    <!-- Alumnos con alertas -->
    <div class="glass-card p-4">
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px"><i class="bi bi-exclamation-triangle" style="color:#f59e0b;margin-right:8px"></i>Alertas académicas</h3>
      <div class="row g-2">
        ${Ot.filter(i=>i.asistencia<80||i.pago==="vencido"||i.estatus!=="activo").map(i=>`
          <div class="col-md-6">
            <div style="padding:12px 16px;background:rgba(239,68,68,0.04);border:1px solid rgba(239,68,68,0.15);border-radius:var(--radius-md);display:flex;align-items:center;gap:12px">
              <div class="avatar" style="width:32px;height:32px;font-size:13px">${i.nombre.charAt(0)}</div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;color:rgba(255,255,255,0.88)">${i.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.35)">${i.curso}</div>
                <div style="display:flex;gap:8px;margin-top:4px">
                  ${i.asistencia<80?`<span style="font-size:10px;color:#fbbf24">Asistencia: ${i.asistencia}%</span>`:""}
                  ${i.pago==="vencido"?'<span style="font-size:10px;color:#f87171">Pago vencido</span>':""}
                </div>
              </div>
              <button class="btn-nux btn-accent-nux" style="font-size:11px;padding:4px 10px" onclick="window.__toastSuccess&&window.__toastSuccess('Contactando a ${i.nombre.split(" ")[0]}')">Contactar</button>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
  `}const wt={nombre:"PowerGym",accent:"#ec4899",accentRgb:"236,72,153"},bu=[{nombre:"CrossFit 6am",trainer:"Carlos V.",cupo:16,inscritos:14,sala:"Box A",horario:"L-M-V 6:00am"},{nombre:"Yoga Flow",trainer:"Sandra M.",cupo:20,inscritos:18,sala:"Studio B",horario:"L-M-V 7:30am"},{nombre:"Spinning",trainer:"Javier R.",cupo:24,inscritos:20,sala:"Cycling",horario:"Mar-Jue 6:30pm"},{nombre:"Boxeo",trainer:"Javier R.",cupo:12,inscritos:10,sala:"Ring",horario:"Mar-Jue 7:30pm"},{nombre:"Pilates",trainer:"Sandra M.",cupo:15,inscritos:13,sala:"Studio B",horario:"Sáb 9:00am"},{nombre:"Zumba",trainer:"Karen L.",cupo:30,inscritos:27,sala:"Salón D",horario:"L-M-V 8:00pm"}],N={nombre:"Alejandro Torres Vega",iniciales:"AT",edad:31,tel:"55 5566 7788",email:"alejandro.tv@gmail.com",plan:"Elite",desde:"Sep 2023",vencimiento:"Sep 2025",peso_inicio:88,peso_actual:79,meta:75,sesiones_mes:16,racha:21,nps:10,coach:"Lic. Fernanda Ruiz",horario:"Mar/Jue/Sáb 07:00",objetivo:"Bajar peso · Definición muscular"},ms=[{nombre:"CrossFit 7am",fecha:"Hoy 07:00",instructor:"F. Ruiz",asistencia:!0,cal:480},{nombre:"Spinning Lunes",fecha:"Lun 18:00",instructor:"J. Ochoa",asistencia:!0,cal:420},{nombre:"HIIT Avanzado",fecha:"Sáb 09:00",instructor:"F. Ruiz",asistencia:!0,cal:510},{nombre:"Fuerza Total",fecha:"Jue 07:00",instructor:"M. Rios",asistencia:!1,cal:0},{nombre:"CrossFit 7am",fecha:"Mar 07:00",instructor:"F. Ruiz",asistencia:!0,cal:465},{nombre:"Yoga Stretch",fecha:"Dom 10:00",instructor:"P. Lagos",asistencia:!0,cal:210}],mu=[{periodo:"Sep 2025",monto:"$1,400",fecha:"01 Sep 2025",metodo:"Domiciliación",estado:"Programado",c:"#6366f1"},{periodo:"Jun 2025",monto:"$1,400",fecha:"01 Jun 2025",metodo:"Domiciliación",estado:"Pagado",c:"#16a34a"},{periodo:"May 2025",monto:"$1,400",fecha:"01 May 2025",metodo:"Domiciliación",estado:"Pagado",c:"#16a34a"},{periodo:"Abr 2025",monto:"$1,400",fecha:"01 Abr 2025",metodo:"Domiciliación",estado:"Pagado",c:"#16a34a"}],Hn=[{semana:"Inicio (Sep 23)",peso:88},{semana:"Ene 24",peso:85},{semana:"May 24",peso:83},{semana:"Sep 24",peso:81},{semana:"Ene 25",peso:80},{semana:"Hoy",peso:79}];function xu(){const e=wt.accent,t=N.peso_actual-N.meta,i=Math.round((N.peso_inicio-N.peso_actual)/(N.peso_inicio-N.meta)*100);return`
  <div style="--industry-accent:${e};--industry-accent-rgb:${wt.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:${e};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${N.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${N.nombre}
            <span style="font-size:13px;font-weight:400;color:rgba(255,255,255,0.35);margin-left:6px">${N.edad} años</span>
          </h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${se(["Elite ⭐","Racha 21 días","Meta: 75 kg","NPS 10"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando plan personalizado...')"><i class="bi bi-clipboard2-data"></i> Plan</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Mensaje enviado a Alejandro')"><i class="bi bi-chat-dots-fill"></i> Contactar</button>
      </div>
    </div>

    ${ie({stages:["Visitante","Básico","Premium","Elite","Embajador"],currentIndex:3,accent:e})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Perfil del miembro</div>
          ${[{icon:"bi-telephone-fill",label:"Teléfono",val:N.tel},{icon:"bi-envelope-fill",label:"Email",val:N.email},{icon:"bi-award-fill",label:"Plan",val:N.plan},{icon:"bi-calendar3",label:"Miembro desde",val:N.desde},{icon:"bi-arrow-repeat",label:"Vencimiento",val:N.vencimiento},{icon:"bi-alarm-fill",label:"Horario habitual",val:N.horario}].map(s=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${s.icon}" style="color:${e};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${s.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${s.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:10px">Coach asignado</div>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar" style="background:rgba(236,72,153,0.18);color:${e}">F</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:white">${N.coach}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.40)">CrossFit · HIIT</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:6px">Objetivo</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.60);line-height:1.6">${N.objetivo}</div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Meta de peso</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:12px;color:rgba(255,255,255,0.50)">88 kg → 75 kg</span>
              <span style="font-size:15px;font-weight:800;color:#16a34a">${i}%</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${i}%;background:#16a34a;border-radius:99px"></div>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.30);margin-top:5px">Hoy: ${N.peso_actual} kg · Faltan ${t} kg para meta</div>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">${j({icon:"bi-fire",label:"Sesiones este mes",value:N.sesiones_mes,delta:"+4 vs mes ant.",trend:"up",cardColor:"#1d4ed8"})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-lightning-fill",label:"Racha actual",value:`${N.racha} días`,delta:"Récord personal",trend:"up",cardColor:"#7c3aed",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-arrow-down-circle-fill",label:"Peso actual",value:`${N.peso_actual} kg`,delta:`-${N.peso_inicio-N.peso_actual} kg bajados`,trend:"up",cardColor:"#15803d",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-heart-fill",label:"NPS personal",value:N.nps,delta:"Promotor activo",trend:"up",cardColor:"#b45309",deltaLabel:""})}</div>
        </div>

        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px;display:flex;align-items:center;gap:8px">
            <i class="bi bi-graph-down-arrow" style="color:${e}"></i> Progreso de peso (últimos 18 meses)
          </h3>
          <div style="display:flex;align-items:flex-end;gap:6px;height:80px;margin-bottom:8px">
            ${Hn.map((s,o)=>{const n=Math.round((s.peso-74)/15*80),a=o===Hn.length-1;return`<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1">
                <div style="font-size:10px;font-weight:700;color:${a?e:"rgba(255,255,255,0.35)"}">
                  ${s.peso}
                </div>
                <div style="width:100%;height:${n}px;background:${a?e:"rgba(255,255,255,0.08)"};border-radius:4px 4px 0 0;min-height:4px;transition:all 0.3s"></div>
                <div style="font-size:9px;color:rgba(255,255,255,0.30);white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:44px;text-align:center">${s.semana}</div>
              </div>`}).join("")}
          </div>
          <div style="display:flex;align-items:center;gap:16px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06)">
            <div style="display:flex;align-items:center;gap:6px"><div style="width:8px;height:8px;border-radius:50%;background:#16a34a"></div><span style="font-size:11px;color:rgba(255,255,255,0.40)">Bajó ${N.peso_inicio-N.peso_actual} kg en 21 meses</span></div>
            <div style="display:flex;align-items:center;gap:6px"><div style="width:8px;height:8px;border-radius:50%;background:${e}"></div><span style="font-size:11px;color:rgba(255,255,255,0.40)">Meta: 75 kg (${t} kg restantes)</span></div>
          </div>
        </div>

        <div class="glass-card p-4 mb-3">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Asistencia reciente</h3>
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">${ms.filter(s=>s.asistencia).length}/${ms.length} sesiones asistidas</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>Clase</th><th>Fecha</th><th>Instructor</th><th style="text-align:right">Cals</th><th>Asistencia</th></tr></thead>
            <tbody>${ms.map(s=>`<tr>
              <td><strong>${s.nombre}</strong></td>
              <td style="color:rgba(255,255,255,0.45);white-space:nowrap">${s.fecha}</td>
              <td style="color:rgba(255,255,255,0.50)">${s.instructor}</td>
              <td style="text-align:right;font-weight:700;color:${s.asistencia?e:"rgba(255,255,255,0.20)"}">${s.asistencia?s.cal+"kcal":"—"}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${s.asistencia?"rgba(22,163,74,0.15)":"rgba(239,68,68,0.12)"};color:${s.asistencia?"#4ade80":"#f87171"};border:1px solid ${s.asistencia?"rgba(22,163,74,0.30)":"rgba(239,68,68,0.25)"}">${s.asistencia?"Asistió":"Falta"}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>

        <div class="glass-card p-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Historial de pagos</h3>
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">Plan Elite · $1,400/mes</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>Período</th><th>Fecha</th><th>Método</th><th style="text-align:right">Monto</th><th>Estado</th></tr></thead>
            <tbody>${mu.map(s=>`<tr>
              <td><strong>${s.periodo}</strong></td>
              <td style="color:rgba(255,255,255,0.45)">${s.fecha}</td>
              <td style="color:rgba(255,255,255,0.50)">${s.metodo}</td>
              <td style="text-align:right;font-weight:700;color:${e}">${s.monto}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${s.c}22;color:${s.c};border:1px solid ${s.c}33">${s.estado}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const ft=wt.accent,Ce=wt.accentRgb;function xs(e,t,i,s,o,n,a,r){const l=2*Math.PI*i,c=l*s/100,d=l-c;return`
  <g>
    <circle cx="${e}" cy="${t}" r="${i}" fill="none" stroke="${o}22" stroke-width="14"/>
    <circle cx="${e}" cy="${t}" r="${i}" fill="none" stroke="${o}" stroke-width="14"
      stroke-dasharray="${c} ${d}" stroke-dashoffset="${l*.25}"
      stroke-linecap="round" style="transition:stroke-dasharray 1.2s ease"/>
    <text x="${e}" y="${t-6}" text-anchor="middle" fill="white" font-size="18" font-weight="800" font-family="Inter,sans-serif">${a}</text>
    <text x="${e}" y="${t+12}" text-anchor="middle" fill="${o}" font-size="9" font-weight="700" font-family="Inter,sans-serif" letter-spacing="1">${r}</text>
    <text x="${e}" y="${t+26}" text-anchor="middle" fill="rgba(255,255,255,0.35)" font-size="8.5" font-family="Inter,sans-serif">${n}</text>
  </g>`}const vu=Array.from({length:84},(e,t)=>{const i=Math.random();return i<.18?0:i<.38?1:i<.62?2:i<.82?3:4}),yu=["rgba(255,255,255,0.05)",`rgba(${Ce},0.20)`,`rgba(${Ce},0.40)`,`rgba(${Ce},0.65)`,ft],wu=["L","M","X","J","V","S","D"],$u=["Ene","","Feb","","Mar","","Abr","","May","","Jun",""];function _u(){const e=vu.map((s,o)=>{const n=o%12,a=Math.floor(o/12),r=n*22+24,l=a*22+2;return`<rect x="${r}" y="${l}" width="18" height="18" rx="3" fill="${yu[s]}" opacity="${s===0?.4:1}">
      <title>${s===0?"Sin actividad":s===1?"1-2 check-ins":s===2?"3-5 check-ins":s===3?"6-8 check-ins":"9+ check-ins"}</title>
    </rect>`}).join(""),t=wu.map((s,o)=>`<text x="4" y="${o*22+15}" fill="rgba(255,255,255,0.30)" font-size="9" font-family="Inter,sans-serif">${s}</text>`).join(""),i=$u.map((s,o)=>`<text x="${o*22+26}" y="-4" fill="rgba(255,255,255,0.28)" font-size="9" font-family="Inter,sans-serif">${s}</text>`).join("");return`<svg viewBox="-4 -14 292 170" style="width:100%;height:170px">${t}${i}${e}</svg>`}const Ja=[{nombre:"CrossFit 6am",hora:"06:00",durMin:60,color:"#f97316",trainer:"Carlos V.",cupo:20,inscritos:18},{nombre:"Yoga Flow",hora:"08:00",durMin:75,color:"#6366f1",trainer:"Paola S.",cupo:15,inscritos:12},{nombre:"Spinning",hora:"10:00",durMin:50,color:ft,trainer:"Mireya R.",cupo:25,inscritos:25},{nombre:"Pilates Core",hora:"12:00",durMin:60,color:"#22c55e",trainer:"Ana L.",cupo:12,inscritos:9},{nombre:"Boxeo",hora:"17:00",durMin:60,color:"#eab308",trainer:"Javier O.",cupo:18,inscritos:14},{nombre:"Zumba Night",hora:"19:00",durMin:60,color:"#f43f5e",trainer:"Claudia V.",cupo:30,inscritos:27}];function ku(){return Ja.map(e=>{const t=Math.round(e.inscritos/e.cupo*100),i=t>=100;return`
    <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
      <div style="width:44px;text-align:right;flex-shrink:0">
        <span style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.55)">${e.hora}</span>
      </div>
      <div style="width:4px;height:36px;border-radius:2px;background:${e.color};flex-shrink:0"></div>
      <div style="flex:1;min-width:0">
        <div style="font-size:13px;font-weight:700;color:white;display:flex;align-items:center;gap:6px">
          ${e.nombre}
          ${i?'<span style="font-size:9px;font-weight:800;padding:1px 6px;background:rgba(239,68,68,0.15);color:#f87171;border-radius:99px;letter-spacing:0.05em">LLENO</span>':""}
        </div>
        <div style="font-size:11px;color:rgba(255,255,255,0.35);margin-top:1px">${e.trainer} · ${e.durMin} min</div>
      </div>
      <div style="width:80px;flex-shrink:0">
        <div style="display:flex;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:10px;color:rgba(255,255,255,0.35)">${e.inscritos}/${e.cupo}</span>
          <span style="font-size:10px;font-weight:700;color:${i?"#f87171":e.color}">${t}%</span>
        </div>
        <div style="height:4px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
          <div style="height:100%;width:${Math.min(t,100)}%;background:${i?"#f87171":e.color};border-radius:99px"></div>
        </div>
      </div>
    </div>`}).join("")}function Mu(){return`
  <div style="--industry-accent:${ft};--industry-accent-rgb:${Ce}">

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:2px">
          <i class="bi bi-fire" style="color:${ft};margin-right:10px"></i>PowerGym · Hoy
        </h1>
        <p style="font-size:13px;color:rgba(255,255,255,0.38)">${new Date().toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"})} — 87 personas en el gym ahora mismo</p>
      </div>
      <div style="display:flex;gap:8px">
        <div style="padding:6px 14px;background:rgba(236,72,153,0.10);border:1px solid rgba(236,72,153,0.25);border-radius:var(--radius-md);font-size:12px;color:${ft};display:flex;align-items:center;gap:6px">
          <span style="width:6px;height:6px;border-radius:50%;background:${ft};display:inline-block;box-shadow:0 0 6px ${ft}"></span>
          Gym abierto
        </div>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Check-in registrado')">
          <i class="bi bi-qr-code-scan"></i> Check-in
        </button>
      </div>
    </div>

    <!-- Activity rings + stats -->
    <div class="row g-3 mb-3">
      <div class="col-lg-4">
        <div class="glass-card p-4" style="text-align:center">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.30);margin-bottom:16px">Actividad del mes</div>
          <svg viewBox="0 0 200 200" style="width:180px;height:180px;margin:0 auto;display:block">
            ${xs(100,100,78,87,"#ec4899","ASISTENCIAS","87","días")}
            ${xs(100,100,56,74,"#f97316","CALORÍAS","74k","kcal")}
            ${xs(100,100,34,62,"#6366f1","CLASES","62","%")}
          </svg>
          <div style="display:flex;justify-content:center;gap:20px;margin-top:12px">
            ${[["#ec4899","Asistencia"],["#f97316","Calorías"],["#6366f1","Ocupación"]].map(([e,t])=>`
              <div style="display:flex;align-items:center;gap:5px">
                <div style="width:10px;height:10px;border-radius:50%;background:${e}"></div>
                <span style="font-size:10px;color:rgba(255,255,255,0.40)">${t}</span>
              </div>`).join("")}
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="glass-card p-4 h-100">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.30);margin-bottom:14px">Métricas clave</div>
          ${[{label:"Miembros activos",val:"248",sub:"+14 este mes",color:ft},{label:"Ingresos del mes",val:"$82,100",sub:"+5% vs anterior",color:"#22c55e"},{label:"Bajas este mes",val:"4",sub:"−2 vs anterior",color:"#f59e0b"},{label:"NPS miembros",val:"9.1",sub:"Promotores: 82%",color:"#6366f1"}].map(e=>`
            <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
              <div>
                <div style="font-size:11px;color:rgba(255,255,255,0.40)">${e.label}</div>
                <div style="font-size:10px;color:${e.color};margin-top:1px">${e.sub}</div>
              </div>
              <div style="font-size:1.25rem;font-weight:800;color:white">${e.val}</div>
            </div>`).join("")}
        </div>
      </div>

      <div class="col-lg-4">
        <div class="glass-card p-4 h-100">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.30);margin-bottom:14px">Check-ins recientes</div>
          ${[{n:"Roberto N.",c:"CrossFit",h:"06:02",ini:"RN"},{n:"Paola S.",c:"CrossFit",h:"06:05",ini:"PS"},{n:"Gabriela R.",c:"Yoga Flow",h:"07:28",ini:"GR"},{n:"Tomás F.",c:"Yoga Flow",h:"07:31",ini:"TF"},{n:"Miguel C.",c:"Spinning",h:"09:58",ini:"MC"},{n:"Claudia V.",c:"Spinning",h:"10:01",ini:"CV"}].map(e=>`
            <div style="display:flex;align-items:center;gap:10px;padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
              <div style="width:30px;height:30px;border-radius:50%;background:${ft}22;border:1.5px solid ${ft}55;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:${ft};flex-shrink:0">${e.ini}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${e.n}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.35)">${e.c}</div>
              </div>
              <span style="font-size:11px;font-weight:700;color:${ft}">${e.h}</span>
            </div>`).join("")}
        </div>
      </div>
    </div>

    <!-- Heatmap + Class schedule -->
    <div class="row g-3">
      <div class="col-lg-7">
        <div class="glass-card p-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px">
            <h3 style="font-size:14px;font-weight:700;color:white">Afluencia — Últimas 12 semanas</h3>
            <div style="display:flex;align-items:center;gap:6px;font-size:10px;color:rgba(255,255,255,0.30)">
              <div style="display:flex;gap:3px">
                ${["rgba(255,255,255,0.05)",`rgba(${Ce},0.20)`,`rgba(${Ce},0.45)`,ft].map(e=>`<div style="width:12px;height:12px;border-radius:2px;background:${e}"></div>`).join("")}
              </div>
              Menos → Más
            </div>
          </div>
          ${_u()}
        </div>
      </div>

      <div class="col-lg-5">
        <div class="glass-card p-4 h-100">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
            <h3 style="font-size:14px;font-weight:700;color:white">Horario de hoy</h3>
            <span style="font-size:11px;color:rgba(255,255,255,0.35)">${Ja.length} clases</span>
          </div>
          ${ku()}
        </div>
      </div>
    </div>
  </div>`}function zu(){ye()}function Su(){const e=[{nombre:"Roberto Núñez",hora:"06:02",plan:"Elite",clase:"CrossFit"},{nombre:"Paola Serrano",hora:"06:05",plan:"Elite",clase:"CrossFit"},{nombre:"Gabriela Ríos",hora:"07:28",plan:"Premium",clase:"Yoga"},{nombre:"Miguel Castro",hora:"07:44",plan:"Premium",clase:"Boxeo"},{nombre:"Tomás Fuentes",hora:"08:15",plan:"Elite",clase:"Pilates"},{nombre:"Claudia Vega",hora:"08:22",plan:"Premium",clase:"Zumba"},{nombre:"Andrés Lara",hora:"09:10",plan:"Básico",clase:"Libre"}];return`
  <div style="--industry-accent:${wt.accent};--industry-accent-rgb:${wt.accentRgb}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-door-open-fill" style="color:${wt.accent};margin-right:10px"></i>Control de Acceso</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${wt.nombre} — Afluencia en tiempo real</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Check-in manual registrado')"><i class="bi bi-qr-code-scan"></i> Check-in manual</button>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-lg-8">
        <!-- Clases del día -->
        <div class="glass-card p-4" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${wt.accent},transparent)"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Clases activas ahora</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
            ${bu.map(t=>{const i=Math.round(t.inscritos/t.cupo*100),s=i>=90?"#f87171":i>=70?wt.accent:"#22c55e";return`
              <div style="padding:14px;background:rgba(255,255,255,0.025);border:1px solid rgba(${wt.accentRgb},0.12);border-radius:var(--radius-md)">
                <div style="font-size:13px;font-weight:700;color:rgba(255,255,255,0.88);margin-bottom:4px">${t.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.38);margin-bottom:10px">${t.trainer} · ${t.sala}</div>
                <div class="nux-progress" style="margin-bottom:6px"><div class="nux-progress-bar" style="width:${i}%;background:${s}"></div></div>
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
            ${e.map(t=>`
              <div style="display:flex;align-items:center;gap:10px;padding:8px;background:rgba(255,255,255,0.025);border-radius:var(--radius-md)">
                <div class="avatar" style="width:32px;height:32px;font-size:13px">${t.nombre.charAt(0)}</div>
                <div style="flex:1">
                  <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${t.nombre}</div>
                  <div style="font-size:10px;color:rgba(255,255,255,0.35)">${t.clase}</div>
                </div>
                <div style="text-align:right">
                  <div style="font-size:11px;font-weight:700;color:${wt.accent}">${t.hora}</div>
                  <div style="font-size:10px;color:rgba(255,255,255,0.30)">${t.plan}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>
  `}window.__toastSuccess=Hi;window.__toastError=fh;window.__toastInfo=to;window.__toastWarning=bh;function Cu(){if(!document.getElementById("toast-container")){const e=document.createElement("div");e.id="toast-container",document.body.appendChild(e)}}function eo(e,t){return()=>{const i=Mh(e());document.getElementById("app").innerHTML=i,zh(),t&&t()}}function q(e,t,i,s,o){return()=>{const n=Ah(e,t,i(),o);document.getElementById("app").innerHTML=n,Dh(),s&&requestAnimationFrame(()=>{s&&s()})}}B("/",eo(Ga,Ya));B("/home",eo(Ga,Ya));B("/inspiracion",eo(vh,yh));function li(e){return()=>{document.getElementById("app").innerHTML=e()}}B("/restaurantes",li(Lh));B("/salud",li(Xh));B("/construccion",li(lg));B("/retail",li(wg));B("/servicios",li(Og));B("/restaurantes/crm",q("restaurantes","CRM de Clientes",Fh,null,"/restaurantes/crm"));B("/restaurantes/dashboard",q("restaurantes","Dashboard",Hh,Nh,"/restaurantes/dashboard"));B("/restaurantes/operaciones",q("restaurantes","Operaciones",Gh,null,"/restaurantes/operaciones"));B("/salud/crm",q("salud","Expedientes",Kh,null,"/salud/crm"));B("/salud/dashboard",q("salud","Dashboard Clínico",sg,og,"/salud/dashboard"));B("/salud/operaciones",q("salud","Operaciones del Día",ng,null,"/salud/operaciones"));B("/construccion/crm",q("construccion","Gestión de Proyectos",dg,null,"/construccion/crm"));B("/construccion/dashboard",q("construccion","Dashboard de Obra",bg,mg,"/construccion/dashboard"));B("/construccion/operaciones",q("construccion","Tablero Operativo",yg,null,"/construccion/operaciones"));B("/retail/crm",q("retail","CRM de Clientes",_g,null,"/retail/crm"));B("/retail/dashboard",q("retail","Dashboard de Ventas",Rg,Ag,"/retail/dashboard"));B("/retail/operaciones",q("retail","Punto de Venta",Tg,Eg,"/retail/operaciones"));B("/servicios/crm",q("servicios","CRM de Clientes",Fg,null,"/servicios/crm"));B("/servicios/dashboard",q("servicios","Dashboard MRR",Gg,Yg,"/servicios/dashboard"));B("/servicios/operaciones",q("servicios","Gestión de Tickets",Xg,Ug,"/servicios/operaciones"));B("/saas/crm",q("saas","CRM de Cuentas",Jg,null,"/saas/crm"));B("/saas/dashboard",q("saas","Dashboard SaaS",iu,su,"/saas/dashboard"));B("/saas/operaciones",q("saas","Pipeline de Ventas",nu,null,"/saas/operaciones"));B("/educacion/crm",q("educacion","CRM de Alumnos",cu,null,"/educacion/crm"));B("/educacion/dashboard",q("educacion","Dashboard Académico",gu,uu,"/educacion/dashboard"));B("/educacion/operaciones",q("educacion","Operaciones del Día",fu,null,"/educacion/operaciones"));B("/fitness/crm",q("fitness","CRM de Miembros",xu,null,"/fitness/crm"));B("/fitness/dashboard",q("fitness","Dashboard del Gym",Mu,zu,"/fitness/dashboard"));B("/fitness/operaciones",q("fitness","Control de Acceso",Su,null,"/fitness/operaciones"));Cu();hh()?Sn():gh(()=>Sn());
