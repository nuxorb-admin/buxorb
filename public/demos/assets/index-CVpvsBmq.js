var Hn=Object.defineProperty;var Wn=(i,t,e)=>t in i?Hn(i,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):i[t]=e;var _=(i,t,e)=>Wn(i,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const a of o)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function e(o){const a={};return o.integrity&&(a.integrity=o.integrity),o.referrerPolicy&&(a.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?a.credentials="include":o.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(o){if(o.ep)return;o.ep=!0;const a=e(o);fetch(o.href,a)}})();/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */function Ue(i){return i+.5|0}const Ft=(i,t,e)=>Math.max(Math.min(i,e),t);function Ce(i){return Ft(Ue(i*2.55),0,255)}function Wt(i){return Ft(Ue(i*255),0,255)}function Et(i){return Ft(Ue(i/2.55)/100,0,1)}function Ws(i){return Ft(Ue(i*100),0,100)}const vt={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,A:10,B:11,C:12,D:13,E:14,F:15,a:10,b:11,c:12,d:13,e:14,f:15},ns=[..."0123456789ABCDEF"],Gn=i=>ns[i&15],Yn=i=>ns[(i&240)>>4]+ns[i&15],Je=i=>(i&240)>>4===(i&15),Un=i=>Je(i.r)&&Je(i.g)&&Je(i.b)&&Je(i.a);function Xn(i){var t=i.length,e;return i[0]==="#"&&(t===4||t===5?e={r:255&vt[i[1]]*17,g:255&vt[i[2]]*17,b:255&vt[i[3]]*17,a:t===5?vt[i[4]]*17:255}:(t===7||t===9)&&(e={r:vt[i[1]]<<4|vt[i[2]],g:vt[i[3]]<<4|vt[i[4]],b:vt[i[5]]<<4|vt[i[6]],a:t===9?vt[i[7]]<<4|vt[i[8]]:255})),e}const Kn=(i,t)=>i<255?t(i):"";function qn(i){var t=Un(i)?Gn:Yn;return i?"#"+t(i.r)+t(i.g)+t(i.b)+Kn(i.a,t):void 0}const Jn=/^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;function La(i,t,e){const s=t*Math.min(e,1-e),o=(a,n=(a+i/30)%12)=>e-s*Math.max(Math.min(n-3,9-n,1),-1);return[o(0),o(8),o(4)]}function Zn(i,t,e){const s=(o,a=(o+i/60)%6)=>e-e*t*Math.max(Math.min(a,4-a,1),0);return[s(5),s(3),s(1)]}function Qn(i,t,e){const s=La(i,1,.5);let o;for(t+e>1&&(o=1/(t+e),t*=o,e*=o),o=0;o<3;o++)s[o]*=1-t-e,s[o]+=t;return s}function tr(i,t,e,s,o){return i===o?(t-e)/s+(t<e?6:0):t===o?(e-i)/s+2:(i-t)/s+4}function $s(i){const e=i.r/255,s=i.g/255,o=i.b/255,a=Math.max(e,s,o),n=Math.min(e,s,o),r=(a+n)/2;let l,c,d;return a!==n&&(d=a-n,c=r>.5?d/(2-a-n):d/(a+n),l=tr(e,s,o,d,a),l=l*60+.5),[l|0,c||0,r]}function ks(i,t,e,s){return(Array.isArray(t)?i(t[0],t[1],t[2]):i(t,e,s)).map(Wt)}function Ms(i,t,e){return ks(La,i,t,e)}function er(i,t,e){return ks(Qn,i,t,e)}function ir(i,t,e){return ks(Zn,i,t,e)}function Ia(i){return(i%360+360)%360}function sr(i){const t=Jn.exec(i);let e=255,s;if(!t)return;t[5]!==s&&(e=t[6]?Ce(+t[5]):Wt(+t[5]));const o=Ia(+t[2]),a=+t[3]/100,n=+t[4]/100;return t[1]==="hwb"?s=er(o,a,n):t[1]==="hsv"?s=ir(o,a,n):s=Ms(o,a,n),{r:s[0],g:s[1],b:s[2],a:e}}function or(i,t){var e=$s(i);e[0]=Ia(e[0]+t),e=Ms(e),i.r=e[0],i.g=e[1],i.b=e[2]}function ar(i){if(!i)return;const t=$s(i),e=t[0],s=Ws(t[1]),o=Ws(t[2]);return i.a<255?`hsla(${e}, ${s}%, ${o}%, ${Et(i.a)})`:`hsl(${e}, ${s}%, ${o}%)`}const Gs={x:"dark",Z:"light",Y:"re",X:"blu",W:"gr",V:"medium",U:"slate",A:"ee",T:"ol",S:"or",B:"ra",C:"lateg",D:"ights",R:"in",Q:"turquois",E:"hi",P:"ro",O:"al",N:"le",M:"de",L:"yello",F:"en",K:"ch",G:"arks",H:"ea",I:"ightg",J:"wh"},Ys={OiceXe:"f0f8ff",antiquewEte:"faebd7",aqua:"ffff",aquamarRe:"7fffd4",azuY:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"0",blanKedOmond:"ffebcd",Xe:"ff",XeviTet:"8a2be2",bPwn:"a52a2a",burlywood:"deb887",caMtXe:"5f9ea0",KartYuse:"7fff00",KocTate:"d2691e",cSO:"ff7f50",cSnflowerXe:"6495ed",cSnsilk:"fff8dc",crimson:"dc143c",cyan:"ffff",xXe:"8b",xcyan:"8b8b",xgTMnPd:"b8860b",xWay:"a9a9a9",xgYF:"6400",xgYy:"a9a9a9",xkhaki:"bdb76b",xmagFta:"8b008b",xTivegYF:"556b2f",xSange:"ff8c00",xScEd:"9932cc",xYd:"8b0000",xsOmon:"e9967a",xsHgYF:"8fbc8f",xUXe:"483d8b",xUWay:"2f4f4f",xUgYy:"2f4f4f",xQe:"ced1",xviTet:"9400d3",dAppRk:"ff1493",dApskyXe:"bfff",dimWay:"696969",dimgYy:"696969",dodgerXe:"1e90ff",fiYbrick:"b22222",flSOwEte:"fffaf0",foYstWAn:"228b22",fuKsia:"ff00ff",gaRsbSo:"dcdcdc",ghostwEte:"f8f8ff",gTd:"ffd700",gTMnPd:"daa520",Way:"808080",gYF:"8000",gYFLw:"adff2f",gYy:"808080",honeyMw:"f0fff0",hotpRk:"ff69b4",RdianYd:"cd5c5c",Rdigo:"4b0082",ivSy:"fffff0",khaki:"f0e68c",lavFMr:"e6e6fa",lavFMrXsh:"fff0f5",lawngYF:"7cfc00",NmoncEffon:"fffacd",ZXe:"add8e6",ZcSO:"f08080",Zcyan:"e0ffff",ZgTMnPdLw:"fafad2",ZWay:"d3d3d3",ZgYF:"90ee90",ZgYy:"d3d3d3",ZpRk:"ffb6c1",ZsOmon:"ffa07a",ZsHgYF:"20b2aa",ZskyXe:"87cefa",ZUWay:"778899",ZUgYy:"778899",ZstAlXe:"b0c4de",ZLw:"ffffe0",lime:"ff00",limegYF:"32cd32",lRF:"faf0e6",magFta:"ff00ff",maPon:"800000",VaquamarRe:"66cdaa",VXe:"cd",VScEd:"ba55d3",VpurpN:"9370db",VsHgYF:"3cb371",VUXe:"7b68ee",VsprRggYF:"fa9a",VQe:"48d1cc",VviTetYd:"c71585",midnightXe:"191970",mRtcYam:"f5fffa",mistyPse:"ffe4e1",moccasR:"ffe4b5",navajowEte:"ffdead",navy:"80",Tdlace:"fdf5e6",Tive:"808000",TivedBb:"6b8e23",Sange:"ffa500",SangeYd:"ff4500",ScEd:"da70d6",pOegTMnPd:"eee8aa",pOegYF:"98fb98",pOeQe:"afeeee",pOeviTetYd:"db7093",papayawEp:"ffefd5",pHKpuff:"ffdab9",peru:"cd853f",pRk:"ffc0cb",plum:"dda0dd",powMrXe:"b0e0e6",purpN:"800080",YbeccapurpN:"663399",Yd:"ff0000",Psybrown:"bc8f8f",PyOXe:"4169e1",saddNbPwn:"8b4513",sOmon:"fa8072",sandybPwn:"f4a460",sHgYF:"2e8b57",sHshell:"fff5ee",siFna:"a0522d",silver:"c0c0c0",skyXe:"87ceeb",UXe:"6a5acd",UWay:"708090",UgYy:"708090",snow:"fffafa",sprRggYF:"ff7f",stAlXe:"4682b4",tan:"d2b48c",teO:"8080",tEstN:"d8bfd8",tomato:"ff6347",Qe:"40e0d0",viTet:"ee82ee",JHt:"f5deb3",wEte:"ffffff",wEtesmoke:"f5f5f5",Lw:"ffff00",LwgYF:"9acd32"};function nr(){const i={},t=Object.keys(Ys),e=Object.keys(Gs);let s,o,a,n,r;for(s=0;s<t.length;s++){for(n=r=t[s],o=0;o<e.length;o++)a=e[o],r=r.replace(a,Gs[a]);a=parseInt(Ys[n],16),i[r]=[a>>16&255,a>>8&255,a&255]}return i}let Ze;function rr(i){Ze||(Ze=nr(),Ze.transparent=[0,0,0,0]);const t=Ze[i.toLowerCase()];return t&&{r:t[0],g:t[1],b:t[2],a:t.length===4?t[3]:255}}const lr=/^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;function cr(i){const t=lr.exec(i);let e=255,s,o,a;if(t){if(t[7]!==s){const n=+t[7];e=t[8]?Ce(n):Ft(n*255,0,255)}return s=+t[1],o=+t[3],a=+t[5],s=255&(t[2]?Ce(s):Ft(s,0,255)),o=255&(t[4]?Ce(o):Ft(o,0,255)),a=255&(t[6]?Ce(a):Ft(a,0,255)),{r:s,g:o,b:a,a:e}}}function dr(i){return i&&(i.a<255?`rgba(${i.r}, ${i.g}, ${i.b}, ${Et(i.a)})`:`rgb(${i.r}, ${i.g}, ${i.b})`)}const Bi=i=>i<=.0031308?i*12.92:Math.pow(i,1/2.4)*1.055-.055,ue=i=>i<=.04045?i/12.92:Math.pow((i+.055)/1.055,2.4);function pr(i,t,e){const s=ue(Et(i.r)),o=ue(Et(i.g)),a=ue(Et(i.b));return{r:Wt(Bi(s+e*(ue(Et(t.r))-s))),g:Wt(Bi(o+e*(ue(Et(t.g))-o))),b:Wt(Bi(a+e*(ue(Et(t.b))-a))),a:i.a+e*(t.a-i.a)}}function Qe(i,t,e){if(i){let s=$s(i);s[t]=Math.max(0,Math.min(s[t]+s[t]*e,t===0?360:1)),s=Ms(s),i.r=s[0],i.g=s[1],i.b=s[2]}}function ja(i,t){return i&&Object.assign(t||{},i)}function Us(i){var t={r:0,g:0,b:0,a:255};return Array.isArray(i)?i.length>=3&&(t={r:i[0],g:i[1],b:i[2],a:255},i.length>3&&(t.a=Wt(i[3]))):(t=ja(i,{r:0,g:0,b:0,a:1}),t.a=Wt(t.a)),t}function hr(i){return i.charAt(0)==="r"?cr(i):sr(i)}class Fe{constructor(t){if(t instanceof Fe)return t;const e=typeof t;let s;e==="object"?s=Us(t):e==="string"&&(s=Xn(t)||rr(t)||hr(t)),this._rgb=s,this._valid=!!s}get valid(){return this._valid}get rgb(){var t=ja(this._rgb);return t&&(t.a=Et(t.a)),t}set rgb(t){this._rgb=Us(t)}rgbString(){return this._valid?dr(this._rgb):void 0}hexString(){return this._valid?qn(this._rgb):void 0}hslString(){return this._valid?ar(this._rgb):void 0}mix(t,e){if(t){const s=this.rgb,o=t.rgb;let a;const n=e===a?.5:e,r=2*n-1,l=s.a-o.a,c=((r*l===-1?r:(r+l)/(1+r*l))+1)/2;a=1-c,s.r=255&c*s.r+a*o.r+.5,s.g=255&c*s.g+a*o.g+.5,s.b=255&c*s.b+a*o.b+.5,s.a=n*s.a+(1-n)*o.a,this.rgb=s}return this}interpolate(t,e){return t&&(this._rgb=pr(this._rgb,t._rgb,e)),this}clone(){return new Fe(this.rgb)}alpha(t){return this._rgb.a=Wt(t),this}clearer(t){const e=this._rgb;return e.a*=1-t,this}greyscale(){const t=this._rgb,e=Ue(t.r*.3+t.g*.59+t.b*.11);return t.r=t.g=t.b=e,this}opaquer(t){const e=this._rgb;return e.a*=1+t,this}negate(){const t=this._rgb;return t.r=255-t.r,t.g=255-t.g,t.b=255-t.b,this}lighten(t){return Qe(this._rgb,2,t),this}darken(t){return Qe(this._rgb,2,-t),this}saturate(t){return Qe(this._rgb,1,t),this}desaturate(t){return Qe(this._rgb,1,-t),this}rotate(t){return or(this._rgb,t),this}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */function Rt(){}const gr=(()=>{let i=0;return()=>i++})();function O(i){return i==null}function U(i){if(Array.isArray&&Array.isArray(i))return!0;const t=Object.prototype.toString.call(i);return t.slice(0,7)==="[object"&&t.slice(-6)==="Array]"}function L(i){return i!==null&&Object.prototype.toString.call(i)==="[object Object]"}function q(i){return(typeof i=="number"||i instanceof Number)&&isFinite(+i)}function mt(i,t){return q(i)?i:t}function R(i,t){return typeof i>"u"?t:i}const ur=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100:+i/t,Fa=(i,t)=>typeof i=="string"&&i.endsWith("%")?parseFloat(i)/100*t:+i;function W(i,t,e){if(i&&typeof i.call=="function")return i.apply(e,t)}function V(i,t,e,s){let o,a,n;if(U(i))for(a=i.length,o=0;o<a;o++)t.call(e,i[o],o);else if(L(i))for(n=Object.keys(i),a=n.length,o=0;o<a;o++)t.call(e,i[n[o]],n[o])}function vi(i,t){let e,s,o,a;if(!i||!t||i.length!==t.length)return!1;for(e=0,s=i.length;e<s;++e)if(o=i[e],a=t[e],o.datasetIndex!==a.datasetIndex||o.index!==a.index)return!1;return!0}function yi(i){if(U(i))return i.map(yi);if(L(i)){const t=Object.create(null),e=Object.keys(i),s=e.length;let o=0;for(;o<s;++o)t[e[o]]=yi(i[e[o]]);return t}return i}function Ba(i){return["__proto__","prototype","constructor"].indexOf(i)===-1}function fr(i,t,e,s){if(!Ba(i))return;const o=t[i],a=e[i];L(o)&&L(a)?Be(o,a,s):t[i]=yi(a)}function Be(i,t,e){const s=U(t)?t:[t],o=s.length;if(!L(i))return i;e=e||{};const a=e.merger||fr;let n;for(let r=0;r<o;++r){if(n=s[r],!L(n))continue;const l=Object.keys(n);for(let c=0,d=l.length;c<d;++c)a(l[c],i,n,e)}return i}function Ee(i,t){return Be(i,t,{merger:br})}function br(i,t,e){if(!Ba(i))return;const s=t[i],o=e[i];L(s)&&L(o)?Ee(s,o):Object.prototype.hasOwnProperty.call(t,i)||(t[i]=yi(o))}const Xs={"":i=>i,x:i=>i.x,y:i=>i.y};function mr(i){const t=i.split("."),e=[];let s="";for(const o of t)s+=o,s.endsWith("\\")?s=s.slice(0,-1)+".":(e.push(s),s="");return e}function xr(i){const t=mr(i);return e=>{for(const s of t){if(s==="")break;e=e&&e[s]}return e}}function Gt(i,t){return(Xs[t]||(Xs[t]=xr(t)))(i)}function Ss(i){return i.charAt(0).toUpperCase()+i.slice(1)}const Ve=i=>typeof i<"u",Yt=i=>typeof i=="function",Ks=(i,t)=>{if(i.size!==t.size)return!1;for(const e of i)if(!t.has(e))return!1;return!0};function vr(i){return i.type==="mouseup"||i.type==="click"||i.type==="contextmenu"}const F=Math.PI,G=2*F,yr=G+F,wi=Number.POSITIVE_INFINITY,wr=F/180,Z=F/2,Qt=F/4,qs=F*2/3,Bt=Math.log10,Pt=Math.sign;function Oe(i,t,e){return Math.abs(i-t)<e}function Js(i){const t=Math.round(i);i=Oe(i,t,i/1e3)?t:i;const e=Math.pow(10,Math.floor(Bt(i))),s=i/e;return(s<=1?1:s<=2?2:s<=5?5:10)*e}function _r(i){const t=[],e=Math.sqrt(i);let s;for(s=1;s<e;s++)i%s===0&&(t.push(s),t.push(i/s));return e===(e|0)&&t.push(e),t.sort((o,a)=>o-a).pop(),t}function $r(i){return typeof i=="symbol"||typeof i=="object"&&i!==null&&!(Symbol.toPrimitive in i||"toString"in i||"valueOf"in i)}function me(i){return!$r(i)&&!isNaN(parseFloat(i))&&isFinite(i)}function kr(i,t){const e=Math.round(i);return e-t<=i&&e+t>=i}function Va(i,t,e){let s,o,a;for(s=0,o=i.length;s<o;s++)a=i[s][e],isNaN(a)||(t.min=Math.min(t.min,a),t.max=Math.max(t.max,a))}function $t(i){return i*(F/180)}function zs(i){return i*(180/F)}function Zs(i){if(!q(i))return;let t=1,e=0;for(;Math.round(i*t)/t!==i;)t*=10,e++;return e}function Na(i,t){const e=t.x-i.x,s=t.y-i.y,o=Math.sqrt(e*e+s*s);let a=Math.atan2(s,e);return a<-.5*F&&(a+=G),{angle:a,distance:o}}function rs(i,t){return Math.sqrt(Math.pow(t.x-i.x,2)+Math.pow(t.y-i.y,2))}function Mr(i,t){return(i-t+yr)%G-F}function rt(i){return(i%G+G)%G}function Ne(i,t,e,s){const o=rt(i),a=rt(t),n=rt(e),r=rt(a-o),l=rt(n-o),c=rt(o-a),d=rt(o-n);return o===a||o===n||s&&a===n||r>l&&c<d}function et(i,t,e){return Math.max(t,Math.min(e,i))}function Sr(i){return et(i,-32768,32767)}function Ot(i,t,e,s=1e-6){return i>=Math.min(t,e)-s&&i<=Math.max(t,e)+s}function Cs(i,t,e){e=e||(n=>i[n]<t);let s=i.length-1,o=0,a;for(;s-o>1;)a=o+s>>1,e(a)?o=a:s=a;return{lo:o,hi:s}}const Lt=(i,t,e,s)=>Cs(i,e,s?o=>{const a=i[o][t];return a<e||a===e&&i[o+1][t]===e}:o=>i[o][t]<e),zr=(i,t,e)=>Cs(i,e,s=>i[s][t]>=e);function Cr(i,t,e){let s=0,o=i.length;for(;s<o&&i[s]<t;)s++;for(;o>s&&i[o-1]>e;)o--;return s>0||o<i.length?i.slice(s,o):i}const Ha=["push","pop","shift","splice","unshift"];function Ar(i,t){if(i._chartjs){i._chartjs.listeners.push(t);return}Object.defineProperty(i,"_chartjs",{configurable:!0,enumerable:!1,value:{listeners:[t]}}),Ha.forEach(e=>{const s="_onData"+Ss(e),o=i[e];Object.defineProperty(i,e,{configurable:!0,enumerable:!1,value(...a){const n=o.apply(this,a);return i._chartjs.listeners.forEach(r=>{typeof r[s]=="function"&&r[s](...a)}),n}})})}function Qs(i,t){const e=i._chartjs;if(!e)return;const s=e.listeners,o=s.indexOf(t);o!==-1&&s.splice(o,1),!(s.length>0)&&(Ha.forEach(a=>{delete i[a]}),delete i._chartjs)}function Wa(i){const t=new Set(i);return t.size===i.length?i:Array.from(t)}const Ga=function(){return typeof window>"u"?function(i){return i()}:window.requestAnimationFrame}();function Ya(i,t){let e=[],s=!1;return function(...o){e=o,s||(s=!0,Ga.call(window,()=>{s=!1,i.apply(t,e)}))}}function Pr(i,t){let e;return function(...s){return t?(clearTimeout(e),e=setTimeout(i,t,s)):i.apply(this,s),t}}const As=i=>i==="start"?"left":i==="end"?"right":"center",nt=(i,t,e)=>i==="start"?t:i==="end"?e:(t+e)/2,Rr=(i,t,e,s)=>i===(s?"left":"right")?e:i==="center"?(t+e)/2:t;function Ua(i,t,e){const s=t.length;let o=0,a=s;if(i._sorted){const{iScale:n,vScale:r,_parsed:l}=i,c=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null,d=n.axis,{min:p,max:h,minDefined:g,maxDefined:u}=n.getUserBounds();if(g){if(o=Math.min(Lt(l,d,p).lo,e?s:Lt(t,d,n.getPixelForValue(p)).lo),c){const f=l.slice(0,o+1).reverse().findIndex(b=>!O(b[r.axis]));o-=Math.max(0,f)}o=et(o,0,s-1)}if(u){let f=Math.max(Lt(l,n.axis,h,!0).hi+1,e?0:Lt(t,d,n.getPixelForValue(h),!0).hi+1);if(c){const b=l.slice(f-1).findIndex(m=>!O(m[r.axis]));f+=Math.max(0,b)}a=et(f,o,s)-o}else a=s-o}return{start:o,count:a}}function Xa(i){const{xScale:t,yScale:e,_scaleRanges:s}=i,o={xmin:t.min,xmax:t.max,ymin:e.min,ymax:e.max};if(!s)return i._scaleRanges=o,!0;const a=s.xmin!==t.min||s.xmax!==t.max||s.ymin!==e.min||s.ymax!==e.max;return Object.assign(s,o),a}const ti=i=>i===0||i===1,to=(i,t,e)=>-(Math.pow(2,10*(i-=1))*Math.sin((i-t)*G/e)),eo=(i,t,e)=>Math.pow(2,-10*i)*Math.sin((i-t)*G/e)+1,Le={linear:i=>i,easeInQuad:i=>i*i,easeOutQuad:i=>-i*(i-2),easeInOutQuad:i=>(i/=.5)<1?.5*i*i:-.5*(--i*(i-2)-1),easeInCubic:i=>i*i*i,easeOutCubic:i=>(i-=1)*i*i+1,easeInOutCubic:i=>(i/=.5)<1?.5*i*i*i:.5*((i-=2)*i*i+2),easeInQuart:i=>i*i*i*i,easeOutQuart:i=>-((i-=1)*i*i*i-1),easeInOutQuart:i=>(i/=.5)<1?.5*i*i*i*i:-.5*((i-=2)*i*i*i-2),easeInQuint:i=>i*i*i*i*i,easeOutQuint:i=>(i-=1)*i*i*i*i+1,easeInOutQuint:i=>(i/=.5)<1?.5*i*i*i*i*i:.5*((i-=2)*i*i*i*i+2),easeInSine:i=>-Math.cos(i*Z)+1,easeOutSine:i=>Math.sin(i*Z),easeInOutSine:i=>-.5*(Math.cos(F*i)-1),easeInExpo:i=>i===0?0:Math.pow(2,10*(i-1)),easeOutExpo:i=>i===1?1:-Math.pow(2,-10*i)+1,easeInOutExpo:i=>ti(i)?i:i<.5?.5*Math.pow(2,10*(i*2-1)):.5*(-Math.pow(2,-10*(i*2-1))+2),easeInCirc:i=>i>=1?i:-(Math.sqrt(1-i*i)-1),easeOutCirc:i=>Math.sqrt(1-(i-=1)*i),easeInOutCirc:i=>(i/=.5)<1?-.5*(Math.sqrt(1-i*i)-1):.5*(Math.sqrt(1-(i-=2)*i)+1),easeInElastic:i=>ti(i)?i:to(i,.075,.3),easeOutElastic:i=>ti(i)?i:eo(i,.075,.3),easeInOutElastic(i){return ti(i)?i:i<.5?.5*to(i*2,.1125,.45):.5+.5*eo(i*2-1,.1125,.45)},easeInBack(i){return i*i*((1.70158+1)*i-1.70158)},easeOutBack(i){return(i-=1)*i*((1.70158+1)*i+1.70158)+1},easeInOutBack(i){let t=1.70158;return(i/=.5)<1?.5*(i*i*(((t*=1.525)+1)*i-t)):.5*((i-=2)*i*(((t*=1.525)+1)*i+t)+2)},easeInBounce:i=>1-Le.easeOutBounce(1-i),easeOutBounce(i){return i<1/2.75?7.5625*i*i:i<2/2.75?7.5625*(i-=1.5/2.75)*i+.75:i<2.5/2.75?7.5625*(i-=2.25/2.75)*i+.9375:7.5625*(i-=2.625/2.75)*i+.984375},easeInOutBounce:i=>i<.5?Le.easeInBounce(i*2)*.5:Le.easeOutBounce(i*2-1)*.5+.5};function Ps(i){if(i&&typeof i=="object"){const t=i.toString();return t==="[object CanvasPattern]"||t==="[object CanvasGradient]"}return!1}function io(i){return Ps(i)?i:new Fe(i)}function Vi(i){return Ps(i)?i:new Fe(i).saturate(.5).darken(.1).hexString()}const Dr=["x","y","borderWidth","radius","tension"],Tr=["color","borderColor","backgroundColor"];function Er(i){i.set("animation",{delay:void 0,duration:1e3,easing:"easeOutQuart",fn:void 0,from:void 0,loop:void 0,to:void 0,type:void 0}),i.describe("animation",{_fallback:!1,_indexable:!1,_scriptable:t=>t!=="onProgress"&&t!=="onComplete"&&t!=="fn"}),i.set("animations",{colors:{type:"color",properties:Tr},numbers:{type:"number",properties:Dr}}),i.describe("animations",{_fallback:"animation"}),i.set("transitions",{active:{animation:{duration:400}},resize:{animation:{duration:0}},show:{animations:{colors:{from:"transparent"},visible:{type:"boolean",duration:0}}},hide:{animations:{colors:{to:"transparent"},visible:{type:"boolean",easing:"linear",fn:t=>t|0}}}})}function Or(i){i.set("layout",{autoPadding:!0,padding:{top:0,right:0,bottom:0,left:0}})}const so=new Map;function Lr(i,t){t=t||{};const e=i+JSON.stringify(t);let s=so.get(e);return s||(s=new Intl.NumberFormat(i,t),so.set(e,s)),s}function Xe(i,t,e){return Lr(t,e).format(i)}const Ka={values(i){return U(i)?i:""+i},numeric(i,t,e){if(i===0)return"0";const s=this.chart.options.locale;let o,a=i;if(e.length>1){const c=Math.max(Math.abs(e[0].value),Math.abs(e[e.length-1].value));(c<1e-4||c>1e15)&&(o="scientific"),a=Ir(i,e)}const n=Bt(Math.abs(a)),r=isNaN(n)?1:Math.max(Math.min(-1*Math.floor(n),20),0),l={notation:o,minimumFractionDigits:r,maximumFractionDigits:r};return Object.assign(l,this.options.ticks.format),Xe(i,s,l)},logarithmic(i,t,e){if(i===0)return"0";const s=e[t].significand||i/Math.pow(10,Math.floor(Bt(i)));return[1,2,3,5,10,15].includes(s)||t>.8*e.length?Ka.numeric.call(this,i,t,e):""}};function Ir(i,t){let e=t.length>3?t[2].value-t[1].value:t[1].value-t[0].value;return Math.abs(e)>=1&&i!==Math.floor(i)&&(e=i-Math.floor(i)),e}var Ci={formatters:Ka};function jr(i){i.set("scale",{display:!0,offset:!1,reverse:!1,beginAtZero:!1,bounds:"ticks",clip:!0,grace:0,grid:{display:!0,lineWidth:1,drawOnChartArea:!0,drawTicks:!0,tickLength:8,tickWidth:(t,e)=>e.lineWidth,tickColor:(t,e)=>e.color,offset:!1},border:{display:!0,dash:[],dashOffset:0,width:1},title:{display:!1,text:"",padding:{top:4,bottom:4}},ticks:{minRotation:0,maxRotation:50,mirror:!1,textStrokeWidth:0,textStrokeColor:"",padding:3,display:!0,autoSkip:!0,autoSkipPadding:3,labelOffset:0,callback:Ci.formatters.values,minor:{},major:{},align:"center",crossAlign:"near",showLabelBackdrop:!1,backdropColor:"rgba(255, 255, 255, 0.75)",backdropPadding:2}}),i.route("scale.ticks","color","","color"),i.route("scale.grid","color","","borderColor"),i.route("scale.border","color","","borderColor"),i.route("scale.title","color","","color"),i.describe("scale",{_fallback:!1,_scriptable:t=>!t.startsWith("before")&&!t.startsWith("after")&&t!=="callback"&&t!=="parser",_indexable:t=>t!=="borderDash"&&t!=="tickBorderDash"&&t!=="dash"}),i.describe("scales",{_fallback:"scale"}),i.describe("scale.ticks",{_scriptable:t=>t!=="backdropPadding"&&t!=="callback",_indexable:t=>t!=="backdropPadding"})}const ce=Object.create(null),ls=Object.create(null);function Ie(i,t){if(!t)return i;const e=t.split(".");for(let s=0,o=e.length;s<o;++s){const a=e[s];i=i[a]||(i[a]=Object.create(null))}return i}function Ni(i,t,e){return typeof t=="string"?Be(Ie(i,t),e):Be(Ie(i,""),t)}class Fr{constructor(t,e){this.animation=void 0,this.backgroundColor="rgba(0,0,0,0.1)",this.borderColor="rgba(0,0,0,0.1)",this.color="#666",this.datasets={},this.devicePixelRatio=s=>s.chart.platform.getDevicePixelRatio(),this.elements={},this.events=["mousemove","mouseout","click","touchstart","touchmove"],this.font={family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",size:12,style:"normal",lineHeight:1.2,weight:null},this.hover={},this.hoverBackgroundColor=(s,o)=>Vi(o.backgroundColor),this.hoverBorderColor=(s,o)=>Vi(o.borderColor),this.hoverColor=(s,o)=>Vi(o.color),this.indexAxis="x",this.interaction={mode:"nearest",intersect:!0,includeInvisible:!1},this.maintainAspectRatio=!0,this.onHover=null,this.onClick=null,this.parsing=!0,this.plugins={},this.responsive=!0,this.scale=void 0,this.scales={},this.showLine=!0,this.drawActiveElementsOnTop=!0,this.describe(t),this.apply(e)}set(t,e){return Ni(this,t,e)}get(t){return Ie(this,t)}describe(t,e){return Ni(ls,t,e)}override(t,e){return Ni(ce,t,e)}route(t,e,s,o){const a=Ie(this,t),n=Ie(this,s),r="_"+e;Object.defineProperties(a,{[r]:{value:a[e],writable:!0},[e]:{enumerable:!0,get(){const l=this[r],c=n[o];return L(l)?Object.assign({},c,l):R(l,c)},set(l){this[r]=l}}})}apply(t){t.forEach(e=>e(this))}}var X=new Fr({_scriptable:i=>!i.startsWith("on"),_indexable:i=>i!=="events",hover:{_fallback:"interaction"},interaction:{_scriptable:!1,_indexable:!1}},[Er,Or,jr]);function Br(i){return!i||O(i.size)||O(i.family)?null:(i.style?i.style+" ":"")+(i.weight?i.weight+" ":"")+i.size+"px "+i.family}function _i(i,t,e,s,o){let a=t[o];return a||(a=t[o]=i.measureText(o).width,e.push(o)),a>s&&(s=a),s}function Vr(i,t,e,s){s=s||{};let o=s.data=s.data||{},a=s.garbageCollect=s.garbageCollect||[];s.font!==t&&(o=s.data={},a=s.garbageCollect=[],s.font=t),i.save(),i.font=t;let n=0;const r=e.length;let l,c,d,p,h;for(l=0;l<r;l++)if(p=e[l],p!=null&&!U(p))n=_i(i,o,a,n,p);else if(U(p))for(c=0,d=p.length;c<d;c++)h=p[c],h!=null&&!U(h)&&(n=_i(i,o,a,n,h));i.restore();const g=a.length/2;if(g>e.length){for(l=0;l<g;l++)delete o[a[l]];a.splice(0,g)}return n}function te(i,t,e){const s=i.currentDevicePixelRatio,o=e!==0?Math.max(e/2,.5):0;return Math.round((t-o)*s)/s+o}function oo(i,t){!t&&!i||(t=t||i.getContext("2d"),t.save(),t.resetTransform(),t.clearRect(0,0,i.width,i.height),t.restore())}function cs(i,t,e,s){qa(i,t,e,s,null)}function qa(i,t,e,s,o){let a,n,r,l,c,d,p,h;const g=t.pointStyle,u=t.rotation,f=t.radius;let b=(u||0)*wr;if(g&&typeof g=="object"&&(a=g.toString(),a==="[object HTMLImageElement]"||a==="[object HTMLCanvasElement]")){i.save(),i.translate(e,s),i.rotate(b),i.drawImage(g,-g.width/2,-g.height/2,g.width,g.height),i.restore();return}if(!(isNaN(f)||f<=0)){switch(i.beginPath(),g){default:o?i.ellipse(e,s,o/2,f,0,0,G):i.arc(e,s,f,0,G),i.closePath();break;case"triangle":d=o?o/2:f,i.moveTo(e+Math.sin(b)*d,s-Math.cos(b)*f),b+=qs,i.lineTo(e+Math.sin(b)*d,s-Math.cos(b)*f),b+=qs,i.lineTo(e+Math.sin(b)*d,s-Math.cos(b)*f),i.closePath();break;case"rectRounded":c=f*.516,l=f-c,n=Math.cos(b+Qt)*l,p=Math.cos(b+Qt)*(o?o/2-c:l),r=Math.sin(b+Qt)*l,h=Math.sin(b+Qt)*(o?o/2-c:l),i.arc(e-p,s-r,c,b-F,b-Z),i.arc(e+h,s-n,c,b-Z,b),i.arc(e+p,s+r,c,b,b+Z),i.arc(e-h,s+n,c,b+Z,b+F),i.closePath();break;case"rect":if(!u){l=Math.SQRT1_2*f,d=o?o/2:l,i.rect(e-d,s-l,2*d,2*l);break}b+=Qt;case"rectRot":p=Math.cos(b)*(o?o/2:f),n=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(o?o/2:f),i.moveTo(e-p,s-r),i.lineTo(e+h,s-n),i.lineTo(e+p,s+r),i.lineTo(e-h,s+n),i.closePath();break;case"crossRot":b+=Qt;case"cross":p=Math.cos(b)*(o?o/2:f),n=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(o?o/2:f),i.moveTo(e-p,s-r),i.lineTo(e+p,s+r),i.moveTo(e+h,s-n),i.lineTo(e-h,s+n);break;case"star":p=Math.cos(b)*(o?o/2:f),n=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(o?o/2:f),i.moveTo(e-p,s-r),i.lineTo(e+p,s+r),i.moveTo(e+h,s-n),i.lineTo(e-h,s+n),b+=Qt,p=Math.cos(b)*(o?o/2:f),n=Math.cos(b)*f,r=Math.sin(b)*f,h=Math.sin(b)*(o?o/2:f),i.moveTo(e-p,s-r),i.lineTo(e+p,s+r),i.moveTo(e+h,s-n),i.lineTo(e-h,s+n);break;case"line":n=o?o/2:Math.cos(b)*f,r=Math.sin(b)*f,i.moveTo(e-n,s-r),i.lineTo(e+n,s+r);break;case"dash":i.moveTo(e,s),i.lineTo(e+Math.cos(b)*(o?o/2:f),s+Math.sin(b)*f);break;case!1:i.closePath();break}i.fill(),t.borderWidth>0&&i.stroke()}}function It(i,t,e){return e=e||.5,!t||i&&i.x>t.left-e&&i.x<t.right+e&&i.y>t.top-e&&i.y<t.bottom+e}function Ai(i,t){i.save(),i.beginPath(),i.rect(t.left,t.top,t.right-t.left,t.bottom-t.top),i.clip()}function Pi(i){i.restore()}function Nr(i,t,e,s,o){if(!t)return i.lineTo(e.x,e.y);if(o==="middle"){const a=(t.x+e.x)/2;i.lineTo(a,t.y),i.lineTo(a,e.y)}else o==="after"!=!!s?i.lineTo(t.x,e.y):i.lineTo(e.x,t.y);i.lineTo(e.x,e.y)}function Hr(i,t,e,s){if(!t)return i.lineTo(e.x,e.y);i.bezierCurveTo(s?t.cp1x:t.cp2x,s?t.cp1y:t.cp2y,s?e.cp2x:e.cp1x,s?e.cp2y:e.cp1y,e.x,e.y)}function Wr(i,t){t.translation&&i.translate(t.translation[0],t.translation[1]),O(t.rotation)||i.rotate(t.rotation),t.color&&(i.fillStyle=t.color),t.textAlign&&(i.textAlign=t.textAlign),t.textBaseline&&(i.textBaseline=t.textBaseline)}function Gr(i,t,e,s,o){if(o.strikethrough||o.underline){const a=i.measureText(s),n=t-a.actualBoundingBoxLeft,r=t+a.actualBoundingBoxRight,l=e-a.actualBoundingBoxAscent,c=e+a.actualBoundingBoxDescent,d=o.strikethrough?(l+c)/2:c;i.strokeStyle=i.fillStyle,i.beginPath(),i.lineWidth=o.decorationWidth||2,i.moveTo(n,d),i.lineTo(r,d),i.stroke()}}function Yr(i,t){const e=i.fillStyle;i.fillStyle=t.color,i.fillRect(t.left,t.top,t.width,t.height),i.fillStyle=e}function de(i,t,e,s,o,a={}){const n=U(t)?t:[t],r=a.strokeWidth>0&&a.strokeColor!=="";let l,c;for(i.save(),i.font=o.string,Wr(i,a),l=0;l<n.length;++l)c=n[l],a.backdrop&&Yr(i,a.backdrop),r&&(a.strokeColor&&(i.strokeStyle=a.strokeColor),O(a.strokeWidth)||(i.lineWidth=a.strokeWidth),i.strokeText(c,e,s,a.maxWidth)),i.fillText(c,e,s,a.maxWidth),Gr(i,e,s,c,a),s+=Number(o.lineHeight);i.restore()}function He(i,t){const{x:e,y:s,w:o,h:a,radius:n}=t;i.arc(e+n.topLeft,s+n.topLeft,n.topLeft,1.5*F,F,!0),i.lineTo(e,s+a-n.bottomLeft),i.arc(e+n.bottomLeft,s+a-n.bottomLeft,n.bottomLeft,F,Z,!0),i.lineTo(e+o-n.bottomRight,s+a),i.arc(e+o-n.bottomRight,s+a-n.bottomRight,n.bottomRight,Z,0,!0),i.lineTo(e+o,s+n.topRight),i.arc(e+o-n.topRight,s+n.topRight,n.topRight,0,-Z,!0),i.lineTo(e+n.topLeft,s)}const Ur=/^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/,Xr=/^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;function Kr(i,t){const e=(""+i).match(Ur);if(!e||e[1]==="normal")return t*1.2;switch(i=+e[2],e[3]){case"px":return i;case"%":i/=100;break}return t*i}const qr=i=>+i||0;function Rs(i,t){const e={},s=L(t),o=s?Object.keys(t):t,a=L(i)?s?n=>R(i[n],i[t[n]]):n=>i[n]:()=>i;for(const n of o)e[n]=qr(a(n));return e}function Ja(i){return Rs(i,{top:"y",right:"x",bottom:"y",left:"x"})}function re(i){return Rs(i,["topLeft","topRight","bottomLeft","bottomRight"])}function dt(i){const t=Ja(i);return t.width=t.left+t.right,t.height=t.top+t.bottom,t}function tt(i,t){i=i||{},t=t||X.font;let e=R(i.size,t.size);typeof e=="string"&&(e=parseInt(e,10));let s=R(i.style,t.style);s&&!(""+s).match(Xr)&&(console.warn('Invalid font style specified: "'+s+'"'),s=void 0);const o={family:R(i.family,t.family),lineHeight:Kr(R(i.lineHeight,t.lineHeight),e),size:e,style:s,weight:R(i.weight,t.weight),string:""};return o.string=Br(o),o}function Ae(i,t,e,s){let o,a,n;for(o=0,a=i.length;o<a;++o)if(n=i[o],n!==void 0&&n!==void 0)return n}function Jr(i,t,e){const{min:s,max:o}=i,a=Fa(t,(o-s)/2),n=(r,l)=>e&&r===0?0:r+l;return{min:n(s,-Math.abs(a)),max:n(o,a)}}function Ut(i,t){return Object.assign(Object.create(i),t)}function Ds(i,t=[""],e,s,o=()=>i[0]){const a=e||i;typeof s>"u"&&(s=en("_fallback",i));const n={[Symbol.toStringTag]:"Object",_cacheable:!0,_scopes:i,_rootScopes:a,_fallback:s,_getTarget:o,override:r=>Ds([r,...i],t,a,s)};return new Proxy(n,{deleteProperty(r,l){return delete r[l],delete r._keys,delete i[0][l],!0},get(r,l){return Qa(r,l,()=>al(l,t,i,r))},getOwnPropertyDescriptor(r,l){return Reflect.getOwnPropertyDescriptor(r._scopes[0],l)},getPrototypeOf(){return Reflect.getPrototypeOf(i[0])},has(r,l){return no(r).includes(l)},ownKeys(r){return no(r)},set(r,l,c){const d=r._storage||(r._storage=o());return r[l]=d[l]=c,delete r._keys,!0}})}function xe(i,t,e,s){const o={_cacheable:!1,_proxy:i,_context:t,_subProxy:e,_stack:new Set,_descriptors:Za(i,s),setContext:a=>xe(i,a,e,s),override:a=>xe(i.override(a),t,e,s)};return new Proxy(o,{deleteProperty(a,n){return delete a[n],delete i[n],!0},get(a,n,r){return Qa(a,n,()=>Qr(a,n,r))},getOwnPropertyDescriptor(a,n){return a._descriptors.allKeys?Reflect.has(i,n)?{enumerable:!0,configurable:!0}:void 0:Reflect.getOwnPropertyDescriptor(i,n)},getPrototypeOf(){return Reflect.getPrototypeOf(i)},has(a,n){return Reflect.has(i,n)},ownKeys(){return Reflect.ownKeys(i)},set(a,n,r){return i[n]=r,delete a[n],!0}})}function Za(i,t={scriptable:!0,indexable:!0}){const{_scriptable:e=t.scriptable,_indexable:s=t.indexable,_allKeys:o=t.allKeys}=i;return{allKeys:o,scriptable:e,indexable:s,isScriptable:Yt(e)?e:()=>e,isIndexable:Yt(s)?s:()=>s}}const Zr=(i,t)=>i?i+Ss(t):t,Ts=(i,t)=>L(t)&&i!=="adapters"&&(Object.getPrototypeOf(t)===null||t.constructor===Object);function Qa(i,t,e){if(Object.prototype.hasOwnProperty.call(i,t)||t==="constructor")return i[t];const s=e();return i[t]=s,s}function Qr(i,t,e){const{_proxy:s,_context:o,_subProxy:a,_descriptors:n}=i;let r=s[t];return Yt(r)&&n.isScriptable(t)&&(r=tl(t,r,i,e)),U(r)&&r.length&&(r=el(t,r,i,n.isIndexable)),Ts(t,r)&&(r=xe(r,o,a&&a[t],n)),r}function tl(i,t,e,s){const{_proxy:o,_context:a,_subProxy:n,_stack:r}=e;if(r.has(i))throw new Error("Recursion detected: "+Array.from(r).join("->")+"->"+i);r.add(i);let l=t(a,n||s);return r.delete(i),Ts(i,l)&&(l=Es(o._scopes,o,i,l)),l}function el(i,t,e,s){const{_proxy:o,_context:a,_subProxy:n,_descriptors:r}=e;if(typeof a.index<"u"&&s(i))return t[a.index%t.length];if(L(t[0])){const l=t,c=o._scopes.filter(d=>d!==l);t=[];for(const d of l){const p=Es(c,o,i,d);t.push(xe(p,a,n&&n[i],r))}}return t}function tn(i,t,e){return Yt(i)?i(t,e):i}const il=(i,t)=>i===!0?t:typeof i=="string"?Gt(t,i):void 0;function sl(i,t,e,s,o){for(const a of t){const n=il(e,a);if(n){i.add(n);const r=tn(n._fallback,e,o);if(typeof r<"u"&&r!==e&&r!==s)return r}else if(n===!1&&typeof s<"u"&&e!==s)return null}return!1}function Es(i,t,e,s){const o=t._rootScopes,a=tn(t._fallback,e,s),n=[...i,...o],r=new Set;r.add(s);let l=ao(r,n,e,a||e,s);return l===null||typeof a<"u"&&a!==e&&(l=ao(r,n,a,l,s),l===null)?!1:Ds(Array.from(r),[""],o,a,()=>ol(t,e,s))}function ao(i,t,e,s,o){for(;e;)e=sl(i,t,e,s,o);return e}function ol(i,t,e){const s=i._getTarget();t in s||(s[t]={});const o=s[t];return U(o)&&L(e)?e:o||{}}function al(i,t,e,s){let o;for(const a of t)if(o=en(Zr(a,i),e),typeof o<"u")return Ts(i,o)?Es(e,s,i,o):o}function en(i,t){for(const e of t){if(!e)continue;const s=e[i];if(typeof s<"u")return s}}function no(i){let t=i._keys;return t||(t=i._keys=nl(i._scopes)),t}function nl(i){const t=new Set;for(const e of i)for(const s of Object.keys(e).filter(o=>!o.startsWith("_")))t.add(s);return Array.from(t)}function sn(i,t,e,s){const{iScale:o}=i,{key:a="r"}=this._parsing,n=new Array(s);let r,l,c,d;for(r=0,l=s;r<l;++r)c=r+e,d=t[c],n[r]={r:o.parse(Gt(d,a),c)};return n}const rl=Number.EPSILON||1e-14,ve=(i,t)=>t<i.length&&!i[t].skip&&i[t],on=i=>i==="x"?"y":"x";function ll(i,t,e,s){const o=i.skip?t:i,a=t,n=e.skip?t:e,r=rs(a,o),l=rs(n,a);let c=r/(r+l),d=l/(r+l);c=isNaN(c)?0:c,d=isNaN(d)?0:d;const p=s*c,h=s*d;return{previous:{x:a.x-p*(n.x-o.x),y:a.y-p*(n.y-o.y)},next:{x:a.x+h*(n.x-o.x),y:a.y+h*(n.y-o.y)}}}function cl(i,t,e){const s=i.length;let o,a,n,r,l,c=ve(i,0);for(let d=0;d<s-1;++d)if(l=c,c=ve(i,d+1),!(!l||!c)){if(Oe(t[d],0,rl)){e[d]=e[d+1]=0;continue}o=e[d]/t[d],a=e[d+1]/t[d],r=Math.pow(o,2)+Math.pow(a,2),!(r<=9)&&(n=3/Math.sqrt(r),e[d]=o*n*t[d],e[d+1]=a*n*t[d])}}function dl(i,t,e="x"){const s=on(e),o=i.length;let a,n,r,l=ve(i,0);for(let c=0;c<o;++c){if(n=r,r=l,l=ve(i,c+1),!r)continue;const d=r[e],p=r[s];n&&(a=(d-n[e])/3,r[`cp1${e}`]=d-a,r[`cp1${s}`]=p-a*t[c]),l&&(a=(l[e]-d)/3,r[`cp2${e}`]=d+a,r[`cp2${s}`]=p+a*t[c])}}function pl(i,t="x"){const e=on(t),s=i.length,o=Array(s).fill(0),a=Array(s);let n,r,l,c=ve(i,0);for(n=0;n<s;++n)if(r=l,l=c,c=ve(i,n+1),!!l){if(c){const d=c[t]-l[t];o[n]=d!==0?(c[e]-l[e])/d:0}a[n]=r?c?Pt(o[n-1])!==Pt(o[n])?0:(o[n-1]+o[n])/2:o[n-1]:o[n]}cl(i,o,a),dl(i,a,t)}function ei(i,t,e){return Math.max(Math.min(i,e),t)}function hl(i,t){let e,s,o,a,n,r=It(i[0],t);for(e=0,s=i.length;e<s;++e)n=a,a=r,r=e<s-1&&It(i[e+1],t),a&&(o=i[e],n&&(o.cp1x=ei(o.cp1x,t.left,t.right),o.cp1y=ei(o.cp1y,t.top,t.bottom)),r&&(o.cp2x=ei(o.cp2x,t.left,t.right),o.cp2y=ei(o.cp2y,t.top,t.bottom)))}function gl(i,t,e,s,o){let a,n,r,l;if(t.spanGaps&&(i=i.filter(c=>!c.skip)),t.cubicInterpolationMode==="monotone")pl(i,o);else{let c=s?i[i.length-1]:i[0];for(a=0,n=i.length;a<n;++a)r=i[a],l=ll(c,r,i[Math.min(a+1,n-(s?0:1))%n],t.tension),r.cp1x=l.previous.x,r.cp1y=l.previous.y,r.cp2x=l.next.x,r.cp2y=l.next.y,c=r}t.capBezierPoints&&hl(i,e)}function Os(){return typeof window<"u"&&typeof document<"u"}function Ls(i){let t=i.parentNode;return t&&t.toString()==="[object ShadowRoot]"&&(t=t.host),t}function $i(i,t,e){let s;return typeof i=="string"?(s=parseInt(i,10),i.indexOf("%")!==-1&&(s=s/100*t.parentNode[e])):s=i,s}const Ri=i=>i.ownerDocument.defaultView.getComputedStyle(i,null);function ul(i,t){return Ri(i).getPropertyValue(t)}const fl=["top","right","bottom","left"];function le(i,t,e){const s={};e=e?"-"+e:"";for(let o=0;o<4;o++){const a=fl[o];s[a]=parseFloat(i[t+"-"+a+e])||0}return s.width=s.left+s.right,s.height=s.top+s.bottom,s}const bl=(i,t,e)=>(i>0||t>0)&&(!e||!e.shadowRoot);function ml(i,t){const e=i.touches,s=e&&e.length?e[0]:i,{offsetX:o,offsetY:a}=s;let n=!1,r,l;if(bl(o,a,i.target))r=o,l=a;else{const c=t.getBoundingClientRect();r=s.clientX-c.left,l=s.clientY-c.top,n=!0}return{x:r,y:l,box:n}}function se(i,t){if("native"in i)return i;const{canvas:e,currentDevicePixelRatio:s}=t,o=Ri(e),a=o.boxSizing==="border-box",n=le(o,"padding"),r=le(o,"border","width"),{x:l,y:c,box:d}=ml(i,e),p=n.left+(d&&r.left),h=n.top+(d&&r.top);let{width:g,height:u}=t;return a&&(g-=n.width+r.width,u-=n.height+r.height),{x:Math.round((l-p)/g*e.width/s),y:Math.round((c-h)/u*e.height/s)}}function xl(i,t,e){let s,o;if(t===void 0||e===void 0){const a=i&&Ls(i);if(!a)t=i.clientWidth,e=i.clientHeight;else{const n=a.getBoundingClientRect(),r=Ri(a),l=le(r,"border","width"),c=le(r,"padding");t=n.width-c.width-l.width,e=n.height-c.height-l.height,s=$i(r.maxWidth,a,"clientWidth"),o=$i(r.maxHeight,a,"clientHeight")}}return{width:t,height:e,maxWidth:s||wi,maxHeight:o||wi}}const Vt=i=>Math.round(i*10)/10;function vl(i,t,e,s){const o=Ri(i),a=le(o,"margin"),n=$i(o.maxWidth,i,"clientWidth")||wi,r=$i(o.maxHeight,i,"clientHeight")||wi,l=xl(i,t,e);let{width:c,height:d}=l;if(o.boxSizing==="content-box"){const h=le(o,"border","width"),g=le(o,"padding");c-=g.width+h.width,d-=g.height+h.height}return c=Math.max(0,c-a.width),d=Math.max(0,s?c/s:d-a.height),c=Vt(Math.min(c,n,l.maxWidth)),d=Vt(Math.min(d,r,l.maxHeight)),c&&!d&&(d=Vt(c/2)),(t!==void 0||e!==void 0)&&s&&l.height&&d>l.height&&(d=l.height,c=Vt(Math.floor(d*s))),{width:c,height:d}}function ro(i,t,e){const s=t||1,o=Vt(i.height*s),a=Vt(i.width*s);i.height=Vt(i.height),i.width=Vt(i.width);const n=i.canvas;return n.style&&(e||!n.style.height&&!n.style.width)&&(n.style.height=`${i.height}px`,n.style.width=`${i.width}px`),i.currentDevicePixelRatio!==s||n.height!==o||n.width!==a?(i.currentDevicePixelRatio=s,n.height=o,n.width=a,i.ctx.setTransform(s,0,0,s,0,0),!0):!1}const yl=function(){let i=!1;try{const t={get passive(){return i=!0,!1}};Os()&&(window.addEventListener("test",null,t),window.removeEventListener("test",null,t))}catch{}return i}();function lo(i,t){const e=ul(i,t),s=e&&e.match(/^(\d+)(\.\d+)?px$/);return s?+s[1]:void 0}function oe(i,t,e,s){return{x:i.x+e*(t.x-i.x),y:i.y+e*(t.y-i.y)}}function wl(i,t,e,s){return{x:i.x+e*(t.x-i.x),y:s==="middle"?e<.5?i.y:t.y:s==="after"?e<1?i.y:t.y:e>0?t.y:i.y}}function _l(i,t,e,s){const o={x:i.cp2x,y:i.cp2y},a={x:t.cp1x,y:t.cp1y},n=oe(i,o,e),r=oe(o,a,e),l=oe(a,t,e),c=oe(n,r,e),d=oe(r,l,e);return oe(c,d,e)}const $l=function(i,t){return{x(e){return i+i+t-e},setWidth(e){t=e},textAlign(e){return e==="center"?e:e==="right"?"left":"right"},xPlus(e,s){return e-s},leftForLtr(e,s){return e-s}}},kl=function(){return{x(i){return i},setWidth(i){},textAlign(i){return i},xPlus(i,t){return i+t},leftForLtr(i,t){return i}}};function be(i,t,e){return i?$l(t,e):kl()}function an(i,t){let e,s;(t==="ltr"||t==="rtl")&&(e=i.canvas.style,s=[e.getPropertyValue("direction"),e.getPropertyPriority("direction")],e.setProperty("direction",t,"important"),i.prevTextDirection=s)}function nn(i,t){t!==void 0&&(delete i.prevTextDirection,i.canvas.style.setProperty("direction",t[0],t[1]))}function rn(i){return i==="angle"?{between:Ne,compare:Mr,normalize:rt}:{between:Ot,compare:(t,e)=>t-e,normalize:t=>t}}function co({start:i,end:t,count:e,loop:s,style:o}){return{start:i%e,end:t%e,loop:s&&(t-i+1)%e===0,style:o}}function Ml(i,t,e){const{property:s,start:o,end:a}=e,{between:n,normalize:r}=rn(s),l=t.length;let{start:c,end:d,loop:p}=i,h,g;if(p){for(c+=l,d+=l,h=0,g=l;h<g&&n(r(t[c%l][s]),o,a);++h)c--,d--;c%=l,d%=l}return d<c&&(d+=l),{start:c,end:d,loop:p,style:i.style}}function ln(i,t,e){if(!e)return[i];const{property:s,start:o,end:a}=e,n=t.length,{compare:r,between:l,normalize:c}=rn(s),{start:d,end:p,loop:h,style:g}=Ml(i,t,e),u=[];let f=!1,b=null,m,x,w;const y=()=>l(o,w,m)&&r(o,w)!==0,v=()=>r(a,m)===0||l(a,w,m),$=()=>f||y(),k=()=>!f||v();for(let M=d,S=d;M<=p;++M)x=t[M%n],!x.skip&&(m=c(x[s]),m!==w&&(f=l(m,o,a),b===null&&$()&&(b=r(m,o)===0?M:S),b!==null&&k()&&(u.push(co({start:b,end:M,loop:h,count:n,style:g})),b=null),S=M,w=m));return b!==null&&u.push(co({start:b,end:p,loop:h,count:n,style:g})),u}function cn(i,t){const e=[],s=i.segments;for(let o=0;o<s.length;o++){const a=ln(s[o],i.points,t);a.length&&e.push(...a)}return e}function Sl(i,t,e,s){let o=0,a=t-1;if(e&&!s)for(;o<t&&!i[o].skip;)o++;for(;o<t&&i[o].skip;)o++;for(o%=t,e&&(a+=o);a>o&&i[a%t].skip;)a--;return a%=t,{start:o,end:a}}function zl(i,t,e,s){const o=i.length,a=[];let n=t,r=i[t],l;for(l=t+1;l<=e;++l){const c=i[l%o];c.skip||c.stop?r.skip||(s=!1,a.push({start:t%o,end:(l-1)%o,loop:s}),t=n=c.stop?l:null):(n=l,r.skip&&(t=l)),r=c}return n!==null&&a.push({start:t%o,end:n%o,loop:s}),a}function Cl(i,t){const e=i.points,s=i.options.spanGaps,o=e.length;if(!o)return[];const a=!!i._loop,{start:n,end:r}=Sl(e,o,a,s);if(s===!0)return po(i,[{start:n,end:r,loop:a}],e,t);const l=r<n?r+o:r,c=!!i._fullLoop&&n===0&&r===o-1;return po(i,zl(e,n,l,c),e,t)}function po(i,t,e,s){return!s||!s.setContext||!e?t:Al(i,t,e,s)}function Al(i,t,e,s){const o=i._chart.getContext(),a=ho(i.options),{_datasetIndex:n,options:{spanGaps:r}}=i,l=e.length,c=[];let d=a,p=t[0].start,h=p;function g(u,f,b,m){const x=r?-1:1;if(u!==f){for(u+=l;e[u%l].skip;)u-=x;for(;e[f%l].skip;)f+=x;u%l!==f%l&&(c.push({start:u%l,end:f%l,loop:b,style:m}),d=m,p=f%l)}}for(const u of t){p=r?p:u.start;let f=e[p%l],b;for(h=p+1;h<=u.end;h++){const m=e[h%l];b=ho(s.setContext(Ut(o,{type:"segment",p0:f,p1:m,p0DataIndex:(h-1)%l,p1DataIndex:h%l,datasetIndex:n}))),Pl(b,d)&&g(p,h-1,u.loop,d),f=m,d=b}p<h-1&&g(p,h-1,u.loop,d)}return c}function ho(i){return{backgroundColor:i.backgroundColor,borderCapStyle:i.borderCapStyle,borderDash:i.borderDash,borderDashOffset:i.borderDashOffset,borderJoinStyle:i.borderJoinStyle,borderWidth:i.borderWidth,borderColor:i.borderColor}}function Pl(i,t){if(!t)return!1;const e=[],s=function(o,a){return Ps(a)?(e.includes(a)||e.push(a),e.indexOf(a)):a};return JSON.stringify(i,s)!==JSON.stringify(t,s)}function ii(i,t,e){return i.options.clip?i[e]:t[e]}function Rl(i,t){const{xScale:e,yScale:s}=i;return e&&s?{left:ii(e,t,"left"),right:ii(e,t,"right"),top:ii(s,t,"top"),bottom:ii(s,t,"bottom")}:t}function dn(i,t){const e=t._clip;if(e.disabled)return!1;const s=Rl(t,i.chartArea);return{left:e.left===!1?0:s.left-(e.left===!0?0:e.left),right:e.right===!1?i.width:s.right+(e.right===!0?0:e.right),top:e.top===!1?0:s.top-(e.top===!0?0:e.top),bottom:e.bottom===!1?i.height:s.bottom+(e.bottom===!0?0:e.bottom)}}/*!
 * Chart.js v4.5.1
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */class Dl{constructor(){this._request=null,this._charts=new Map,this._running=!1,this._lastDate=void 0}_notify(t,e,s,o){const a=e.listeners[o],n=e.duration;a.forEach(r=>r({chart:t,initial:e.initial,numSteps:n,currentStep:Math.min(s-e.start,n)}))}_refresh(){this._request||(this._running=!0,this._request=Ga.call(window,()=>{this._update(),this._request=null,this._running&&this._refresh()}))}_update(t=Date.now()){let e=0;this._charts.forEach((s,o)=>{if(!s.running||!s.items.length)return;const a=s.items;let n=a.length-1,r=!1,l;for(;n>=0;--n)l=a[n],l._active?(l._total>s.duration&&(s.duration=l._total),l.tick(t),r=!0):(a[n]=a[a.length-1],a.pop());r&&(o.draw(),this._notify(o,s,t,"progress")),a.length||(s.running=!1,this._notify(o,s,t,"complete"),s.initial=!1),e+=a.length}),this._lastDate=t,e===0&&(this._running=!1)}_getAnims(t){const e=this._charts;let s=e.get(t);return s||(s={running:!1,initial:!0,items:[],listeners:{complete:[],progress:[]}},e.set(t,s)),s}listen(t,e,s){this._getAnims(t).listeners[e].push(s)}add(t,e){!e||!e.length||this._getAnims(t).items.push(...e)}has(t){return this._getAnims(t).items.length>0}start(t){const e=this._charts.get(t);e&&(e.running=!0,e.start=Date.now(),e.duration=e.items.reduce((s,o)=>Math.max(s,o._duration),0),this._refresh())}running(t){if(!this._running)return!1;const e=this._charts.get(t);return!(!e||!e.running||!e.items.length)}stop(t){const e=this._charts.get(t);if(!e||!e.items.length)return;const s=e.items;let o=s.length-1;for(;o>=0;--o)s[o].cancel();e.items=[],this._notify(t,e,Date.now(),"complete")}remove(t){return this._charts.delete(t)}}var Dt=new Dl;const go="transparent",Tl={boolean(i,t,e){return e>.5?t:i},color(i,t,e){const s=io(i||go),o=s.valid&&io(t||go);return o&&o.valid?o.mix(s,e).hexString():t},number(i,t,e){return i+(t-i)*e}};class El{constructor(t,e,s,o){const a=e[s];o=Ae([t.to,o,a,t.from]);const n=Ae([t.from,a,o]);this._active=!0,this._fn=t.fn||Tl[t.type||typeof n],this._easing=Le[t.easing]||Le.linear,this._start=Math.floor(Date.now()+(t.delay||0)),this._duration=this._total=Math.floor(t.duration),this._loop=!!t.loop,this._target=e,this._prop=s,this._from=n,this._to=o,this._promises=void 0}active(){return this._active}update(t,e,s){if(this._active){this._notify(!1);const o=this._target[this._prop],a=s-this._start,n=this._duration-a;this._start=s,this._duration=Math.floor(Math.max(n,t.duration)),this._total+=a,this._loop=!!t.loop,this._to=Ae([t.to,e,o,t.from]),this._from=Ae([t.from,o,e])}}cancel(){this._active&&(this.tick(Date.now()),this._active=!1,this._notify(!1))}tick(t){const e=t-this._start,s=this._duration,o=this._prop,a=this._from,n=this._loop,r=this._to;let l;if(this._active=a!==r&&(n||e<s),!this._active){this._target[o]=r,this._notify(!0);return}if(e<0){this._target[o]=a;return}l=e/s%2,l=n&&l>1?2-l:l,l=this._easing(Math.min(1,Math.max(0,l))),this._target[o]=this._fn(a,r,l)}wait(){const t=this._promises||(this._promises=[]);return new Promise((e,s)=>{t.push({res:e,rej:s})})}_notify(t){const e=t?"res":"rej",s=this._promises||[];for(let o=0;o<s.length;o++)s[o][e]()}}class pn{constructor(t,e){this._chart=t,this._properties=new Map,this.configure(e)}configure(t){if(!L(t))return;const e=Object.keys(X.animation),s=this._properties;Object.getOwnPropertyNames(t).forEach(o=>{const a=t[o];if(!L(a))return;const n={};for(const r of e)n[r]=a[r];(U(a.properties)&&a.properties||[o]).forEach(r=>{(r===o||!s.has(r))&&s.set(r,n)})})}_animateOptions(t,e){const s=e.options,o=Ll(t,s);if(!o)return[];const a=this._createAnimations(o,s);return s.$shared&&Ol(t.options.$animations,s).then(()=>{t.options=s},()=>{}),a}_createAnimations(t,e){const s=this._properties,o=[],a=t.$animations||(t.$animations={}),n=Object.keys(e),r=Date.now();let l;for(l=n.length-1;l>=0;--l){const c=n[l];if(c.charAt(0)==="$")continue;if(c==="options"){o.push(...this._animateOptions(t,e));continue}const d=e[c];let p=a[c];const h=s.get(c);if(p)if(h&&p.active()){p.update(h,d,r);continue}else p.cancel();if(!h||!h.duration){t[c]=d;continue}a[c]=p=new El(h,t,c,d),o.push(p)}return o}update(t,e){if(this._properties.size===0){Object.assign(t,e);return}const s=this._createAnimations(t,e);if(s.length)return Dt.add(this._chart,s),!0}}function Ol(i,t){const e=[],s=Object.keys(t);for(let o=0;o<s.length;o++){const a=i[s[o]];a&&a.active()&&e.push(a.wait())}return Promise.all(e)}function Ll(i,t){if(!t)return;let e=i.options;if(!e){i.options=t;return}return e.$shared&&(i.options=e=Object.assign({},e,{$shared:!1,$animations:{}})),e}function uo(i,t){const e=i&&i.options||{},s=e.reverse,o=e.min===void 0?t:0,a=e.max===void 0?t:0;return{start:s?a:o,end:s?o:a}}function Il(i,t,e){if(e===!1)return!1;const s=uo(i,e),o=uo(t,e);return{top:o.end,right:s.end,bottom:o.start,left:s.start}}function jl(i){let t,e,s,o;return L(i)?(t=i.top,e=i.right,s=i.bottom,o=i.left):t=e=s=o=i,{top:t,right:e,bottom:s,left:o,disabled:i===!1}}function hn(i,t){const e=[],s=i._getSortedDatasetMetas(t);let o,a;for(o=0,a=s.length;o<a;++o)e.push(s[o].index);return e}function fo(i,t,e,s={}){const o=i.keys,a=s.mode==="single";let n,r,l,c;if(t===null)return;let d=!1;for(n=0,r=o.length;n<r;++n){if(l=+o[n],l===e){if(d=!0,s.all)continue;break}c=i.values[l],q(c)&&(a||t===0||Pt(t)===Pt(c))&&(t+=c)}return!d&&!s.all?0:t}function Fl(i,t){const{iScale:e,vScale:s}=t,o=e.axis==="x"?"x":"y",a=s.axis==="x"?"x":"y",n=Object.keys(i),r=new Array(n.length);let l,c,d;for(l=0,c=n.length;l<c;++l)d=n[l],r[l]={[o]:d,[a]:i[d]};return r}function Hi(i,t){const e=i&&i.options.stacked;return e||e===void 0&&t.stack!==void 0}function Bl(i,t,e){return`${i.id}.${t.id}.${e.stack||e.type}`}function Vl(i){const{min:t,max:e,minDefined:s,maxDefined:o}=i.getUserBounds();return{min:s?t:Number.NEGATIVE_INFINITY,max:o?e:Number.POSITIVE_INFINITY}}function Nl(i,t,e){const s=i[t]||(i[t]={});return s[e]||(s[e]={})}function bo(i,t,e,s){for(const o of t.getMatchingVisibleMetas(s).reverse()){const a=i[o.index];if(e&&a>0||!e&&a<0)return o.index}return null}function mo(i,t){const{chart:e,_cachedMeta:s}=i,o=e._stacks||(e._stacks={}),{iScale:a,vScale:n,index:r}=s,l=a.axis,c=n.axis,d=Bl(a,n,s),p=t.length;let h;for(let g=0;g<p;++g){const u=t[g],{[l]:f,[c]:b}=u,m=u._stacks||(u._stacks={});h=m[c]=Nl(o,d,f),h[r]=b,h._top=bo(h,n,!0,s.type),h._bottom=bo(h,n,!1,s.type);const x=h._visualValues||(h._visualValues={});x[r]=b}}function Wi(i,t){const e=i.scales;return Object.keys(e).filter(s=>e[s].axis===t).shift()}function Hl(i,t){return Ut(i,{active:!1,dataset:void 0,datasetIndex:t,index:t,mode:"default",type:"dataset"})}function Wl(i,t,e){return Ut(i,{active:!1,dataIndex:t,parsed:void 0,raw:void 0,element:e,index:t,mode:"default",type:"data"})}function _e(i,t){const e=i.controller.index,s=i.vScale&&i.vScale.axis;if(s){t=t||i._parsed;for(const o of t){const a=o._stacks;if(!a||a[s]===void 0||a[s][e]===void 0)return;delete a[s][e],a[s]._visualValues!==void 0&&a[s]._visualValues[e]!==void 0&&delete a[s]._visualValues[e]}}}const Gi=i=>i==="reset"||i==="none",xo=(i,t)=>t?i:Object.assign({},i),Gl=(i,t,e)=>i&&!t.hidden&&t._stacked&&{keys:hn(e,!0),values:null};class kt{constructor(t,e){this.chart=t,this._ctx=t.ctx,this.index=e,this._cachedDataOpts={},this._cachedMeta=this.getMeta(),this._type=this._cachedMeta.type,this.options=void 0,this._parsing=!1,this._data=void 0,this._objectData=void 0,this._sharedOptions=void 0,this._drawStart=void 0,this._drawCount=void 0,this.enableOptionSharing=!1,this.supportsDecimation=!1,this.$context=void 0,this._syncList=[],this.datasetElementType=new.target.datasetElementType,this.dataElementType=new.target.dataElementType,this.initialize()}initialize(){const t=this._cachedMeta;this.configure(),this.linkScales(),t._stacked=Hi(t.vScale,t),this.addElements(),this.options.fill&&!this.chart.isPluginEnabled("filler")&&console.warn("Tried to use the 'fill' option without the 'Filler' plugin enabled. Please import and register the 'Filler' plugin and make sure it is not disabled in the options")}updateIndex(t){this.index!==t&&_e(this._cachedMeta),this.index=t}linkScales(){const t=this.chart,e=this._cachedMeta,s=this.getDataset(),o=(p,h,g,u)=>p==="x"?h:p==="r"?u:g,a=e.xAxisID=R(s.xAxisID,Wi(t,"x")),n=e.yAxisID=R(s.yAxisID,Wi(t,"y")),r=e.rAxisID=R(s.rAxisID,Wi(t,"r")),l=e.indexAxis,c=e.iAxisID=o(l,a,n,r),d=e.vAxisID=o(l,n,a,r);e.xScale=this.getScaleForId(a),e.yScale=this.getScaleForId(n),e.rScale=this.getScaleForId(r),e.iScale=this.getScaleForId(c),e.vScale=this.getScaleForId(d)}getDataset(){return this.chart.data.datasets[this.index]}getMeta(){return this.chart.getDatasetMeta(this.index)}getScaleForId(t){return this.chart.scales[t]}_getOtherScale(t){const e=this._cachedMeta;return t===e.iScale?e.vScale:e.iScale}reset(){this._update("reset")}_destroy(){const t=this._cachedMeta;this._data&&Qs(this._data,this),t._stacked&&_e(t)}_dataCheck(){const t=this.getDataset(),e=t.data||(t.data=[]),s=this._data;if(L(e)){const o=this._cachedMeta;this._data=Fl(e,o)}else if(s!==e){if(s){Qs(s,this);const o=this._cachedMeta;_e(o),o._parsed=[]}e&&Object.isExtensible(e)&&Ar(e,this),this._syncList=[],this._data=e}}addElements(){const t=this._cachedMeta;this._dataCheck(),this.datasetElementType&&(t.dataset=new this.datasetElementType)}buildOrUpdateElements(t){const e=this._cachedMeta,s=this.getDataset();let o=!1;this._dataCheck();const a=e._stacked;e._stacked=Hi(e.vScale,e),e.stack!==s.stack&&(o=!0,_e(e),e.stack=s.stack),this._resyncElements(t),(o||a!==e._stacked)&&(mo(this,e._parsed),e._stacked=Hi(e.vScale,e))}configure(){const t=this.chart.config,e=t.datasetScopeKeys(this._type),s=t.getOptionScopes(this.getDataset(),e,!0);this.options=t.createResolver(s,this.getContext()),this._parsing=this.options.parsing,this._cachedDataOpts={}}parse(t,e){const{_cachedMeta:s,_data:o}=this,{iScale:a,_stacked:n}=s,r=a.axis;let l=t===0&&e===o.length?!0:s._sorted,c=t>0&&s._parsed[t-1],d,p,h;if(this._parsing===!1)s._parsed=o,s._sorted=!0,h=o;else{U(o[t])?h=this.parseArrayData(s,o,t,e):L(o[t])?h=this.parseObjectData(s,o,t,e):h=this.parsePrimitiveData(s,o,t,e);const g=()=>p[r]===null||c&&p[r]<c[r];for(d=0;d<e;++d)s._parsed[d+t]=p=h[d],l&&(g()&&(l=!1),c=p);s._sorted=l}n&&mo(this,h)}parsePrimitiveData(t,e,s,o){const{iScale:a,vScale:n}=t,r=a.axis,l=n.axis,c=a.getLabels(),d=a===n,p=new Array(o);let h,g,u;for(h=0,g=o;h<g;++h)u=h+s,p[h]={[r]:d||a.parse(c[u],u),[l]:n.parse(e[u],u)};return p}parseArrayData(t,e,s,o){const{xScale:a,yScale:n}=t,r=new Array(o);let l,c,d,p;for(l=0,c=o;l<c;++l)d=l+s,p=e[d],r[l]={x:a.parse(p[0],d),y:n.parse(p[1],d)};return r}parseObjectData(t,e,s,o){const{xScale:a,yScale:n}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=new Array(o);let d,p,h,g;for(d=0,p=o;d<p;++d)h=d+s,g=e[h],c[d]={x:a.parse(Gt(g,r),h),y:n.parse(Gt(g,l),h)};return c}getParsed(t){return this._cachedMeta._parsed[t]}getDataElement(t){return this._cachedMeta.data[t]}applyStack(t,e,s){const o=this.chart,a=this._cachedMeta,n=e[t.axis],r={keys:hn(o,!0),values:e._stacks[t.axis]._visualValues};return fo(r,n,a.index,{mode:s})}updateRangeFromParsed(t,e,s,o){const a=s[e.axis];let n=a===null?NaN:a;const r=o&&s._stacks[e.axis];o&&r&&(o.values=r,n=fo(o,a,this._cachedMeta.index)),t.min=Math.min(t.min,n),t.max=Math.max(t.max,n)}getMinMax(t,e){const s=this._cachedMeta,o=s._parsed,a=s._sorted&&t===s.iScale,n=o.length,r=this._getOtherScale(t),l=Gl(e,s,this.chart),c={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY},{min:d,max:p}=Vl(r);let h,g;function u(){g=o[h];const f=g[r.axis];return!q(g[t.axis])||d>f||p<f}for(h=0;h<n&&!(!u()&&(this.updateRangeFromParsed(c,t,g,l),a));++h);if(a){for(h=n-1;h>=0;--h)if(!u()){this.updateRangeFromParsed(c,t,g,l);break}}return c}getAllParsedValues(t){const e=this._cachedMeta._parsed,s=[];let o,a,n;for(o=0,a=e.length;o<a;++o)n=e[o][t.axis],q(n)&&s.push(n);return s}getMaxOverflow(){return!1}getLabelAndValue(t){const e=this._cachedMeta,s=e.iScale,o=e.vScale,a=this.getParsed(t);return{label:s?""+s.getLabelForValue(a[s.axis]):"",value:o?""+o.getLabelForValue(a[o.axis]):""}}_update(t){const e=this._cachedMeta;this.update(t||"default"),e._clip=jl(R(this.options.clip,Il(e.xScale,e.yScale,this.getMaxOverflow())))}update(t){}draw(){const t=this._ctx,e=this.chart,s=this._cachedMeta,o=s.data||[],a=e.chartArea,n=[],r=this._drawStart||0,l=this._drawCount||o.length-r,c=this.options.drawActiveElementsOnTop;let d;for(s.dataset&&s.dataset.draw(t,a,r,l),d=r;d<r+l;++d){const p=o[d];p.hidden||(p.active&&c?n.push(p):p.draw(t,a))}for(d=0;d<n.length;++d)n[d].draw(t,a)}getStyle(t,e){const s=e?"active":"default";return t===void 0&&this._cachedMeta.dataset?this.resolveDatasetElementOptions(s):this.resolveDataElementOptions(t||0,s)}getContext(t,e,s){const o=this.getDataset();let a;if(t>=0&&t<this._cachedMeta.data.length){const n=this._cachedMeta.data[t];a=n.$context||(n.$context=Wl(this.getContext(),t,n)),a.parsed=this.getParsed(t),a.raw=o.data[t],a.index=a.dataIndex=t}else a=this.$context||(this.$context=Hl(this.chart.getContext(),this.index)),a.dataset=o,a.index=a.datasetIndex=this.index;return a.active=!!e,a.mode=s,a}resolveDatasetElementOptions(t){return this._resolveElementOptions(this.datasetElementType.id,t)}resolveDataElementOptions(t,e){return this._resolveElementOptions(this.dataElementType.id,e,t)}_resolveElementOptions(t,e="default",s){const o=e==="active",a=this._cachedDataOpts,n=t+"-"+e,r=a[n],l=this.enableOptionSharing&&Ve(s);if(r)return xo(r,l);const c=this.chart.config,d=c.datasetElementScopeKeys(this._type,t),p=o?[`${t}Hover`,"hover",t,""]:[t,""],h=c.getOptionScopes(this.getDataset(),d),g=Object.keys(X.elements[t]),u=()=>this.getContext(s,o,e),f=c.resolveNamedOptions(h,g,u,p);return f.$shared&&(f.$shared=l,a[n]=Object.freeze(xo(f,l))),f}_resolveAnimations(t,e,s){const o=this.chart,a=this._cachedDataOpts,n=`animation-${e}`,r=a[n];if(r)return r;let l;if(o.options.animation!==!1){const d=this.chart.config,p=d.datasetAnimationScopeKeys(this._type,e),h=d.getOptionScopes(this.getDataset(),p);l=d.createResolver(h,this.getContext(t,s,e))}const c=new pn(o,l&&l.animations);return l&&l._cacheable&&(a[n]=Object.freeze(c)),c}getSharedOptions(t){if(t.$shared)return this._sharedOptions||(this._sharedOptions=Object.assign({},t))}includeOptions(t,e){return!e||Gi(t)||this.chart._animationsDisabled}_getSharedOptions(t,e){const s=this.resolveDataElementOptions(t,e),o=this._sharedOptions,a=this.getSharedOptions(s),n=this.includeOptions(e,a)||a!==o;return this.updateSharedOptions(a,e,s),{sharedOptions:a,includeOptions:n}}updateElement(t,e,s,o){Gi(o)?Object.assign(t,s):this._resolveAnimations(e,o).update(t,s)}updateSharedOptions(t,e,s){t&&!Gi(e)&&this._resolveAnimations(void 0,e).update(t,s)}_setStyle(t,e,s,o){t.active=o;const a=this.getStyle(e,o);this._resolveAnimations(e,s,o).update(t,{options:!o&&this.getSharedOptions(a)||a})}removeHoverStyle(t,e,s){this._setStyle(t,s,"active",!1)}setHoverStyle(t,e,s){this._setStyle(t,s,"active",!0)}_removeDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!1)}_setDatasetHoverStyle(){const t=this._cachedMeta.dataset;t&&this._setStyle(t,void 0,"active",!0)}_resyncElements(t){const e=this._data,s=this._cachedMeta.data;for(const[r,l,c]of this._syncList)this[r](l,c);this._syncList=[];const o=s.length,a=e.length,n=Math.min(a,o);n&&this.parse(0,n),a>o?this._insertElements(o,a-o,t):a<o&&this._removeElements(a,o-a)}_insertElements(t,e,s=!0){const o=this._cachedMeta,a=o.data,n=t+e;let r;const l=c=>{for(c.length+=e,r=c.length-1;r>=n;r--)c[r]=c[r-e]};for(l(a),r=t;r<n;++r)a[r]=new this.dataElementType;this._parsing&&l(o._parsed),this.parse(t,e),s&&this.updateElements(a,t,e,"reset")}updateElements(t,e,s,o){}_removeElements(t,e){const s=this._cachedMeta;if(this._parsing){const o=s._parsed.splice(t,e);s._stacked&&_e(s,o)}s.data.splice(t,e)}_sync(t){if(this._parsing)this._syncList.push(t);else{const[e,s,o]=t;this[e](s,o)}this.chart._dataChanges.push([this.index,...t])}_onDataPush(){const t=arguments.length;this._sync(["_insertElements",this.getDataset().data.length-t,t])}_onDataPop(){this._sync(["_removeElements",this._cachedMeta.data.length-1,1])}_onDataShift(){this._sync(["_removeElements",0,1])}_onDataSplice(t,e){e&&this._sync(["_removeElements",t,e]);const s=arguments.length-2;s&&this._sync(["_insertElements",t,s])}_onDataUnshift(){this._sync(["_insertElements",0,arguments.length])}}_(kt,"defaults",{}),_(kt,"datasetElementType",null),_(kt,"dataElementType",null);function Yl(i,t){if(!i._cache.$bar){const e=i.getMatchingVisibleMetas(t);let s=[];for(let o=0,a=e.length;o<a;o++)s=s.concat(e[o].controller.getAllParsedValues(i));i._cache.$bar=Wa(s.sort((o,a)=>o-a))}return i._cache.$bar}function Ul(i){const t=i.iScale,e=Yl(t,i.type);let s=t._length,o,a,n,r;const l=()=>{n===32767||n===-32768||(Ve(r)&&(s=Math.min(s,Math.abs(n-r)||s)),r=n)};for(o=0,a=e.length;o<a;++o)n=t.getPixelForValue(e[o]),l();for(r=void 0,o=0,a=t.ticks.length;o<a;++o)n=t.getPixelForTick(o),l();return s}function Xl(i,t,e,s){const o=e.barThickness;let a,n;return O(o)?(a=t.min*e.categoryPercentage,n=e.barPercentage):(a=o*s,n=1),{chunk:a/s,ratio:n,start:t.pixels[i]-a/2}}function Kl(i,t,e,s){const o=t.pixels,a=o[i];let n=i>0?o[i-1]:null,r=i<o.length-1?o[i+1]:null;const l=e.categoryPercentage;n===null&&(n=a-(r===null?t.end-t.start:r-a)),r===null&&(r=a+a-n);const c=a-(a-Math.min(n,r))/2*l;return{chunk:Math.abs(r-n)/2*l/s,ratio:e.barPercentage,start:c}}function ql(i,t,e,s){const o=e.parse(i[0],s),a=e.parse(i[1],s),n=Math.min(o,a),r=Math.max(o,a);let l=n,c=r;Math.abs(n)>Math.abs(r)&&(l=r,c=n),t[e.axis]=c,t._custom={barStart:l,barEnd:c,start:o,end:a,min:n,max:r}}function gn(i,t,e,s){return U(i)?ql(i,t,e,s):t[e.axis]=e.parse(i,s),t}function vo(i,t,e,s){const o=i.iScale,a=i.vScale,n=o.getLabels(),r=o===a,l=[];let c,d,p,h;for(c=e,d=e+s;c<d;++c)h=t[c],p={},p[o.axis]=r||o.parse(n[c],c),l.push(gn(h,p,a,c));return l}function Yi(i){return i&&i.barStart!==void 0&&i.barEnd!==void 0}function Jl(i,t,e){return i!==0?Pt(i):(t.isHorizontal()?1:-1)*(t.min>=e?1:-1)}function Zl(i){let t,e,s,o,a;return i.horizontal?(t=i.base>i.x,e="left",s="right"):(t=i.base<i.y,e="bottom",s="top"),t?(o="end",a="start"):(o="start",a="end"),{start:e,end:s,reverse:t,top:o,bottom:a}}function Ql(i,t,e,s){let o=t.borderSkipped;const a={};if(!o){i.borderSkipped=a;return}if(o===!0){i.borderSkipped={top:!0,right:!0,bottom:!0,left:!0};return}const{start:n,end:r,reverse:l,top:c,bottom:d}=Zl(i);o==="middle"&&e&&(i.enableBorderRadius=!0,(e._top||0)===s?o=c:(e._bottom||0)===s?o=d:(a[yo(d,n,r,l)]=!0,o=c)),a[yo(o,n,r,l)]=!0,i.borderSkipped=a}function yo(i,t,e,s){return s?(i=tc(i,t,e),i=wo(i,e,t)):i=wo(i,t,e),i}function tc(i,t,e){return i===t?e:i===e?t:i}function wo(i,t,e){return i==="start"?t:i==="end"?e:i}function ec(i,{inflateAmount:t},e){i.inflateAmount=t==="auto"?e===1?.33:0:t}class di extends kt{parsePrimitiveData(t,e,s,o){return vo(t,e,s,o)}parseArrayData(t,e,s,o){return vo(t,e,s,o)}parseObjectData(t,e,s,o){const{iScale:a,vScale:n}=t,{xAxisKey:r="x",yAxisKey:l="y"}=this._parsing,c=a.axis==="x"?r:l,d=n.axis==="x"?r:l,p=[];let h,g,u,f;for(h=s,g=s+o;h<g;++h)f=e[h],u={},u[a.axis]=a.parse(Gt(f,c),h),p.push(gn(Gt(f,d),u,n,h));return p}updateRangeFromParsed(t,e,s,o){super.updateRangeFromParsed(t,e,s,o);const a=s._custom;a&&e===this._cachedMeta.vScale&&(t.min=Math.min(t.min,a.min),t.max=Math.max(t.max,a.max))}getMaxOverflow(){return 0}getLabelAndValue(t){const e=this._cachedMeta,{iScale:s,vScale:o}=e,a=this.getParsed(t),n=a._custom,r=Yi(n)?"["+n.start+", "+n.end+"]":""+o.getLabelForValue(a[o.axis]);return{label:""+s.getLabelForValue(a[s.axis]),value:r}}initialize(){this.enableOptionSharing=!0,super.initialize();const t=this._cachedMeta;t.stack=this.getDataset().stack}update(t){const e=this._cachedMeta;this.updateElements(e.data,0,e.data.length,t)}updateElements(t,e,s,o){const a=o==="reset",{index:n,_cachedMeta:{vScale:r}}=this,l=r.getBasePixel(),c=r.isHorizontal(),d=this._getRuler(),{sharedOptions:p,includeOptions:h}=this._getSharedOptions(e,o);for(let g=e;g<e+s;g++){const u=this.getParsed(g),f=a||O(u[r.axis])?{base:l,head:l}:this._calculateBarValuePixels(g),b=this._calculateBarIndexPixels(g,d),m=(u._stacks||{})[r.axis],x={horizontal:c,base:f.base,enableBorderRadius:!m||Yi(u._custom)||n===m._top||n===m._bottom,x:c?f.head:b.center,y:c?b.center:f.head,height:c?b.size:Math.abs(f.size),width:c?Math.abs(f.size):b.size};h&&(x.options=p||this.resolveDataElementOptions(g,t[g].active?"active":o));const w=x.options||t[g].options;Ql(x,w,m,n),ec(x,w,d.ratio),this.updateElement(t[g],g,x,o)}}_getStacks(t,e){const{iScale:s}=this._cachedMeta,o=s.getMatchingVisibleMetas(this._type).filter(d=>d.controller.options.grouped),a=s.options.stacked,n=[],r=this._cachedMeta.controller.getParsed(e),l=r&&r[s.axis],c=d=>{const p=d._parsed.find(g=>g[s.axis]===l),h=p&&p[d.vScale.axis];if(O(h)||isNaN(h))return!0};for(const d of o)if(!(e!==void 0&&c(d))&&((a===!1||n.indexOf(d.stack)===-1||a===void 0&&d.stack===void 0)&&n.push(d.stack),d.index===t))break;return n.length||n.push(void 0),n}_getStackCount(t){return this._getStacks(void 0,t).length}_getAxisCount(){return this._getAxis().length}getFirstScaleIdForIndexAxis(){const t=this.chart.scales,e=this.chart.options.indexAxis;return Object.keys(t).filter(s=>t[s].axis===e).shift()}_getAxis(){const t={},e=this.getFirstScaleIdForIndexAxis();for(const s of this.chart.data.datasets)t[R(this.chart.options.indexAxis==="x"?s.xAxisID:s.yAxisID,e)]=!0;return Object.keys(t)}_getStackIndex(t,e,s){const o=this._getStacks(t,s),a=e!==void 0?o.indexOf(e):-1;return a===-1?o.length-1:a}_getRuler(){const t=this.options,e=this._cachedMeta,s=e.iScale,o=[];let a,n;for(a=0,n=e.data.length;a<n;++a)o.push(s.getPixelForValue(this.getParsed(a)[s.axis],a));const r=t.barThickness;return{min:r||Ul(e),pixels:o,start:s._startPixel,end:s._endPixel,stackCount:this._getStackCount(),scale:s,grouped:t.grouped,ratio:r?1:t.categoryPercentage*t.barPercentage}}_calculateBarValuePixels(t){const{_cachedMeta:{vScale:e,_stacked:s,index:o},options:{base:a,minBarLength:n}}=this,r=a||0,l=this.getParsed(t),c=l._custom,d=Yi(c);let p=l[e.axis],h=0,g=s?this.applyStack(e,l,s):p,u,f;g!==p&&(h=g-p,g=p),d&&(p=c.barStart,g=c.barEnd-c.barStart,p!==0&&Pt(p)!==Pt(c.barEnd)&&(h=0),h+=p);const b=!O(a)&&!d?a:h;let m=e.getPixelForValue(b);if(this.chart.getDataVisibility(t)?u=e.getPixelForValue(h+g):u=m,f=u-m,Math.abs(f)<n){f=Jl(f,e,r)*n,p===r&&(m-=f/2);const x=e.getPixelForDecimal(0),w=e.getPixelForDecimal(1),y=Math.min(x,w),v=Math.max(x,w);m=Math.max(Math.min(m,v),y),u=m+f,s&&!d&&(l._stacks[e.axis]._visualValues[o]=e.getValueForPixel(u)-e.getValueForPixel(m))}if(m===e.getPixelForValue(r)){const x=Pt(f)*e.getLineWidthForValue(r)/2;m+=x,f-=x}return{size:f,base:m,head:u,center:u+f/2}}_calculateBarIndexPixels(t,e){const s=e.scale,o=this.options,a=o.skipNull,n=R(o.maxBarThickness,1/0);let r,l;const c=this._getAxisCount();if(e.grouped){const d=a?this._getStackCount(t):e.stackCount,p=o.barThickness==="flex"?Kl(t,e,o,d*c):Xl(t,e,o,d*c),h=this.chart.options.indexAxis==="x"?this.getDataset().xAxisID:this.getDataset().yAxisID,g=this._getAxis().indexOf(R(h,this.getFirstScaleIdForIndexAxis())),u=this._getStackIndex(this.index,this._cachedMeta.stack,a?t:void 0)+g;r=p.start+p.chunk*u+p.chunk/2,l=Math.min(n,p.chunk*p.ratio)}else r=s.getPixelForValue(this.getParsed(t)[s.axis],t),l=Math.min(n,e.min*e.ratio);return{base:r-l/2,head:r+l/2,center:r,size:l}}draw(){const t=this._cachedMeta,e=t.vScale,s=t.data,o=s.length;let a=0;for(;a<o;++a)this.getParsed(a)[e.axis]!==null&&!s[a].hidden&&s[a].draw(this._ctx)}}_(di,"id","bar"),_(di,"defaults",{datasetElementType:!1,dataElementType:"bar",categoryPercentage:.8,barPercentage:.9,grouped:!0,animations:{numbers:{type:"number",properties:["x","y","base","width","height"]}}}),_(di,"overrides",{scales:{_index_:{type:"category",offset:!0,grid:{offset:!0}},_value_:{type:"linear",beginAtZero:!0}}});class pi extends kt{initialize(){this.enableOptionSharing=!0,super.initialize()}parsePrimitiveData(t,e,s,o){const a=super.parsePrimitiveData(t,e,s,o);for(let n=0;n<a.length;n++)a[n]._custom=this.resolveDataElementOptions(n+s).radius;return a}parseArrayData(t,e,s,o){const a=super.parseArrayData(t,e,s,o);for(let n=0;n<a.length;n++){const r=e[s+n];a[n]._custom=R(r[2],this.resolveDataElementOptions(n+s).radius)}return a}parseObjectData(t,e,s,o){const a=super.parseObjectData(t,e,s,o);for(let n=0;n<a.length;n++){const r=e[s+n];a[n]._custom=R(r&&r.r&&+r.r,this.resolveDataElementOptions(n+s).radius)}return a}getMaxOverflow(){const t=this._cachedMeta.data;let e=0;for(let s=t.length-1;s>=0;--s)e=Math.max(e,t[s].size(this.resolveDataElementOptions(s))/2);return e>0&&e}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart.data.labels||[],{xScale:o,yScale:a}=e,n=this.getParsed(t),r=o.getLabelForValue(n.x),l=a.getLabelForValue(n.y),c=n._custom;return{label:s[t]||"",value:"("+r+", "+l+(c?", "+c:"")+")"}}update(t){const e=this._cachedMeta.data;this.updateElements(e,0,e.length,t)}updateElements(t,e,s,o){const a=o==="reset",{iScale:n,vScale:r}=this._cachedMeta,{sharedOptions:l,includeOptions:c}=this._getSharedOptions(e,o),d=n.axis,p=r.axis;for(let h=e;h<e+s;h++){const g=t[h],u=!a&&this.getParsed(h),f={},b=f[d]=a?n.getPixelForDecimal(.5):n.getPixelForValue(u[d]),m=f[p]=a?r.getBasePixel():r.getPixelForValue(u[p]);f.skip=isNaN(b)||isNaN(m),c&&(f.options=l||this.resolveDataElementOptions(h,g.active?"active":o),a&&(f.options.radius=0)),this.updateElement(g,h,f,o)}}resolveDataElementOptions(t,e){const s=this.getParsed(t);let o=super.resolveDataElementOptions(t,e);o.$shared&&(o=Object.assign({},o,{$shared:!1}));const a=o.radius;return e!=="active"&&(o.radius=0),o.radius+=R(s&&s._custom,a),o}}_(pi,"id","bubble"),_(pi,"defaults",{datasetElementType:!1,dataElementType:"point",animations:{numbers:{type:"number",properties:["x","y","borderWidth","radius"]}}}),_(pi,"overrides",{scales:{x:{type:"linear"},y:{type:"linear"}}});function ic(i,t,e){let s=1,o=1,a=0,n=0;if(t<G){const r=i,l=r+t,c=Math.cos(r),d=Math.sin(r),p=Math.cos(l),h=Math.sin(l),g=(w,y,v)=>Ne(w,r,l,!0)?1:Math.max(y,y*e,v,v*e),u=(w,y,v)=>Ne(w,r,l,!0)?-1:Math.min(y,y*e,v,v*e),f=g(0,c,p),b=g(Z,d,h),m=u(F,c,p),x=u(F+Z,d,h);s=(f-m)/2,o=(b-x)/2,a=-(f+m)/2,n=-(b+x)/2}return{ratioX:s,ratioY:o,offsetX:a,offsetY:n}}class ae extends kt{constructor(t,e){super(t,e),this.enableOptionSharing=!0,this.innerRadius=void 0,this.outerRadius=void 0,this.offsetX=void 0,this.offsetY=void 0}linkScales(){}parse(t,e){const s=this.getDataset().data,o=this._cachedMeta;if(this._parsing===!1)o._parsed=s;else{let a=l=>+s[l];if(L(s[t])){const{key:l="value"}=this._parsing;a=c=>+Gt(s[c],l)}let n,r;for(n=t,r=t+e;n<r;++n)o._parsed[n]=a(n)}}_getRotation(){return $t(this.options.rotation-90)}_getCircumference(){return $t(this.options.circumference)}_getRotationExtents(){let t=G,e=-G;for(let s=0;s<this.chart.data.datasets.length;++s)if(this.chart.isDatasetVisible(s)&&this.chart.getDatasetMeta(s).type===this._type){const o=this.chart.getDatasetMeta(s).controller,a=o._getRotation(),n=o._getCircumference();t=Math.min(t,a),e=Math.max(e,a+n)}return{rotation:t,circumference:e-t}}update(t){const e=this.chart,{chartArea:s}=e,o=this._cachedMeta,a=o.data,n=this.getMaxBorderWidth()+this.getMaxOffset(a)+this.options.spacing,r=Math.max((Math.min(s.width,s.height)-n)/2,0),l=Math.min(ur(this.options.cutout,r),1),c=this._getRingWeight(this.index),{circumference:d,rotation:p}=this._getRotationExtents(),{ratioX:h,ratioY:g,offsetX:u,offsetY:f}=ic(p,d,l),b=(s.width-n)/h,m=(s.height-n)/g,x=Math.max(Math.min(b,m)/2,0),w=Fa(this.options.radius,x),y=Math.max(w*l,0),v=(w-y)/this._getVisibleDatasetWeightTotal();this.offsetX=u*w,this.offsetY=f*w,o.total=this.calculateTotal(),this.outerRadius=w-v*this._getRingWeightOffset(this.index),this.innerRadius=Math.max(this.outerRadius-v*c,0),this.updateElements(a,0,a.length,t)}_circumference(t,e){const s=this.options,o=this._cachedMeta,a=this._getCircumference();return e&&s.animation.animateRotate||!this.chart.getDataVisibility(t)||o._parsed[t]===null||o.data[t].hidden?0:this.calculateCircumference(o._parsed[t]*a/G)}updateElements(t,e,s,o){const a=o==="reset",n=this.chart,r=n.chartArea,c=n.options.animation,d=(r.left+r.right)/2,p=(r.top+r.bottom)/2,h=a&&c.animateScale,g=h?0:this.innerRadius,u=h?0:this.outerRadius,{sharedOptions:f,includeOptions:b}=this._getSharedOptions(e,o);let m=this._getRotation(),x;for(x=0;x<e;++x)m+=this._circumference(x,a);for(x=e;x<e+s;++x){const w=this._circumference(x,a),y=t[x],v={x:d+this.offsetX,y:p+this.offsetY,startAngle:m,endAngle:m+w,circumference:w,outerRadius:u,innerRadius:g};b&&(v.options=f||this.resolveDataElementOptions(x,y.active?"active":o)),m+=w,this.updateElement(y,x,v,o)}}calculateTotal(){const t=this._cachedMeta,e=t.data;let s=0,o;for(o=0;o<e.length;o++){const a=t._parsed[o];a!==null&&!isNaN(a)&&this.chart.getDataVisibility(o)&&!e[o].hidden&&(s+=Math.abs(a))}return s}calculateCircumference(t){const e=this._cachedMeta.total;return e>0&&!isNaN(t)?G*(Math.abs(t)/e):0}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart,o=s.data.labels||[],a=Xe(e._parsed[t],s.options.locale);return{label:o[t]||"",value:a}}getMaxBorderWidth(t){let e=0;const s=this.chart;let o,a,n,r,l;if(!t){for(o=0,a=s.data.datasets.length;o<a;++o)if(s.isDatasetVisible(o)){n=s.getDatasetMeta(o),t=n.data,r=n.controller;break}}if(!t)return 0;for(o=0,a=t.length;o<a;++o)l=r.resolveDataElementOptions(o),l.borderAlign!=="inner"&&(e=Math.max(e,l.borderWidth||0,l.hoverBorderWidth||0));return e}getMaxOffset(t){let e=0;for(let s=0,o=t.length;s<o;++s){const a=this.resolveDataElementOptions(s);e=Math.max(e,a.offset||0,a.hoverOffset||0)}return e}_getRingWeightOffset(t){let e=0;for(let s=0;s<t;++s)this.chart.isDatasetVisible(s)&&(e+=this._getRingWeight(s));return e}_getRingWeight(t){return Math.max(R(this.chart.data.datasets[t].weight,1),0)}_getVisibleDatasetWeightTotal(){return this._getRingWeightOffset(this.chart.data.datasets.length)||1}}_(ae,"id","doughnut"),_(ae,"defaults",{datasetElementType:!1,dataElementType:"arc",animation:{animateRotate:!0,animateScale:!1},animations:{numbers:{type:"number",properties:["circumference","endAngle","innerRadius","outerRadius","startAngle","x","y","offset","borderWidth","spacing"]}},cutout:"50%",rotation:0,circumference:360,radius:"100%",spacing:0,indexAxis:"r"}),_(ae,"descriptors",{_scriptable:t=>t!=="spacing",_indexable:t=>t!=="spacing"&&!t.startsWith("borderDash")&&!t.startsWith("hoverBorderDash")}),_(ae,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data,{labels:{pointStyle:s,textAlign:o,color:a,useBorderRadius:n,borderRadius:r}}=t.legend.options;return e.labels.length&&e.datasets.length?e.labels.map((l,c)=>{const p=t.getDatasetMeta(0).controller.getStyle(c);return{text:l,fillStyle:p.backgroundColor,fontColor:a,hidden:!t.getDataVisibility(c),lineDash:p.borderDash,lineDashOffset:p.borderDashOffset,lineJoin:p.borderJoinStyle,lineWidth:p.borderWidth,strokeStyle:p.borderColor,textAlign:o,pointStyle:s,borderRadius:n&&(r||p.borderRadius),index:c}}):[]}},onClick(t,e,s){s.chart.toggleDataVisibility(e.index),s.chart.update()}}}});class hi extends kt{initialize(){this.enableOptionSharing=!0,this.supportsDecimation=!0,super.initialize()}update(t){const e=this._cachedMeta,{dataset:s,data:o=[],_dataset:a}=e,n=this.chart._animationsDisabled;let{start:r,count:l}=Ua(e,o,n);this._drawStart=r,this._drawCount=l,Xa(e)&&(r=0,l=o.length),s._chart=this.chart,s._datasetIndex=this.index,s._decimated=!!a._decimated,s.points=o;const c=this.resolveDatasetElementOptions(t);this.options.showLine||(c.borderWidth=0),c.segment=this.options.segment,this.updateElement(s,void 0,{animated:!n,options:c},t),this.updateElements(o,r,l,t)}updateElements(t,e,s,o){const a=o==="reset",{iScale:n,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,{sharedOptions:d,includeOptions:p}=this._getSharedOptions(e,o),h=n.axis,g=r.axis,{spanGaps:u,segment:f}=this.options,b=me(u)?u:Number.POSITIVE_INFINITY,m=this.chart._animationsDisabled||a||o==="none",x=e+s,w=t.length;let y=e>0&&this.getParsed(e-1);for(let v=0;v<w;++v){const $=t[v],k=m?$:{};if(v<e||v>=x){k.skip=!0;continue}const M=this.getParsed(v),S=O(M[g]),T=k[h]=n.getPixelForValue(M[h],v),E=k[g]=a||S?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,M,l):M[g],v);k.skip=isNaN(T)||isNaN(E)||S,k.stop=v>0&&Math.abs(M[h]-y[h])>b,f&&(k.parsed=M,k.raw=c.data[v]),p&&(k.options=d||this.resolveDataElementOptions(v,$.active?"active":o)),m||this.updateElement($,v,k,o),y=M}}getMaxOverflow(){const t=this._cachedMeta,e=t.dataset,s=e.options&&e.options.borderWidth||0,o=t.data||[];if(!o.length)return s;const a=o[0].size(this.resolveDataElementOptions(0)),n=o[o.length-1].size(this.resolveDataElementOptions(o.length-1));return Math.max(s,a,n)/2}draw(){const t=this._cachedMeta;t.dataset.updateControlPoints(this.chart.chartArea,t.iScale.axis),super.draw()}}_(hi,"id","line"),_(hi,"defaults",{datasetElementType:"line",dataElementType:"point",showLine:!0,spanGaps:!1}),_(hi,"overrides",{scales:{_index_:{type:"category"},_value_:{type:"linear"}}});class je extends kt{constructor(t,e){super(t,e),this.innerRadius=void 0,this.outerRadius=void 0}getLabelAndValue(t){const e=this._cachedMeta,s=this.chart,o=s.data.labels||[],a=Xe(e._parsed[t].r,s.options.locale);return{label:o[t]||"",value:a}}parseObjectData(t,e,s,o){return sn.bind(this)(t,e,s,o)}update(t){const e=this._cachedMeta.data;this._updateRadius(),this.updateElements(e,0,e.length,t)}getMinMax(){const t=this._cachedMeta,e={min:Number.POSITIVE_INFINITY,max:Number.NEGATIVE_INFINITY};return t.data.forEach((s,o)=>{const a=this.getParsed(o).r;!isNaN(a)&&this.chart.getDataVisibility(o)&&(a<e.min&&(e.min=a),a>e.max&&(e.max=a))}),e}_updateRadius(){const t=this.chart,e=t.chartArea,s=t.options,o=Math.min(e.right-e.left,e.bottom-e.top),a=Math.max(o/2,0),n=Math.max(s.cutoutPercentage?a/100*s.cutoutPercentage:1,0),r=(a-n)/t.getVisibleDatasetCount();this.outerRadius=a-r*this.index,this.innerRadius=this.outerRadius-r}updateElements(t,e,s,o){const a=o==="reset",n=this.chart,l=n.options.animation,c=this._cachedMeta.rScale,d=c.xCenter,p=c.yCenter,h=c.getIndexAngle(0)-.5*F;let g=h,u;const f=360/this.countVisibleElements();for(u=0;u<e;++u)g+=this._computeAngle(u,o,f);for(u=e;u<e+s;u++){const b=t[u];let m=g,x=g+this._computeAngle(u,o,f),w=n.getDataVisibility(u)?c.getDistanceFromCenterForValue(this.getParsed(u).r):0;g=x,a&&(l.animateScale&&(w=0),l.animateRotate&&(m=x=h));const y={x:d,y:p,innerRadius:0,outerRadius:w,startAngle:m,endAngle:x,options:this.resolveDataElementOptions(u,b.active?"active":o)};this.updateElement(b,u,y,o)}}countVisibleElements(){const t=this._cachedMeta;let e=0;return t.data.forEach((s,o)=>{!isNaN(this.getParsed(o).r)&&this.chart.getDataVisibility(o)&&e++}),e}_computeAngle(t,e,s){return this.chart.getDataVisibility(t)?$t(this.resolveDataElementOptions(t,e).angle||s):0}}_(je,"id","polarArea"),_(je,"defaults",{dataElementType:"arc",animation:{animateRotate:!0,animateScale:!0},animations:{numbers:{type:"number",properties:["x","y","startAngle","endAngle","innerRadius","outerRadius"]}},indexAxis:"r",startAngle:0}),_(je,"overrides",{aspectRatio:1,plugins:{legend:{labels:{generateLabels(t){const e=t.data;if(e.labels.length&&e.datasets.length){const{labels:{pointStyle:s,color:o}}=t.legend.options;return e.labels.map((a,n)=>{const l=t.getDatasetMeta(0).controller.getStyle(n);return{text:a,fillStyle:l.backgroundColor,strokeStyle:l.borderColor,fontColor:o,lineWidth:l.borderWidth,pointStyle:s,hidden:!t.getDataVisibility(n),index:n}})}return[]}},onClick(t,e,s){s.chart.toggleDataVisibility(e.index),s.chart.update()}}},scales:{r:{type:"radialLinear",angleLines:{display:!1},beginAtZero:!0,grid:{circular:!0},pointLabels:{display:!1},startAngle:0}}});class ds extends ae{}_(ds,"id","pie"),_(ds,"defaults",{cutout:0,rotation:0,circumference:360,radius:"100%"});class gi extends kt{getLabelAndValue(t){const e=this._cachedMeta.vScale,s=this.getParsed(t);return{label:e.getLabels()[t],value:""+e.getLabelForValue(s[e.axis])}}parseObjectData(t,e,s,o){return sn.bind(this)(t,e,s,o)}update(t){const e=this._cachedMeta,s=e.dataset,o=e.data||[],a=e.iScale.getLabels();if(s.points=o,t!=="resize"){const n=this.resolveDatasetElementOptions(t);this.options.showLine||(n.borderWidth=0);const r={_loop:!0,_fullLoop:a.length===o.length,options:n};this.updateElement(s,void 0,r,t)}this.updateElements(o,0,o.length,t)}updateElements(t,e,s,o){const a=this._cachedMeta.rScale,n=o==="reset";for(let r=e;r<e+s;r++){const l=t[r],c=this.resolveDataElementOptions(r,l.active?"active":o),d=a.getPointPositionForValue(r,this.getParsed(r).r),p=n?a.xCenter:d.x,h=n?a.yCenter:d.y,g={x:p,y:h,angle:d.angle,skip:isNaN(p)||isNaN(h),options:c};this.updateElement(l,r,g,o)}}}_(gi,"id","radar"),_(gi,"defaults",{datasetElementType:"line",dataElementType:"point",indexAxis:"r",showLine:!0,elements:{line:{fill:"start"}}}),_(gi,"overrides",{aspectRatio:1,scales:{r:{type:"radialLinear"}}});class ui extends kt{getLabelAndValue(t){const e=this._cachedMeta,s=this.chart.data.labels||[],{xScale:o,yScale:a}=e,n=this.getParsed(t),r=o.getLabelForValue(n.x),l=a.getLabelForValue(n.y);return{label:s[t]||"",value:"("+r+", "+l+")"}}update(t){const e=this._cachedMeta,{data:s=[]}=e,o=this.chart._animationsDisabled;let{start:a,count:n}=Ua(e,s,o);if(this._drawStart=a,this._drawCount=n,Xa(e)&&(a=0,n=s.length),this.options.showLine){this.datasetElementType||this.addElements();const{dataset:r,_dataset:l}=e;r._chart=this.chart,r._datasetIndex=this.index,r._decimated=!!l._decimated,r.points=s;const c=this.resolveDatasetElementOptions(t);c.segment=this.options.segment,this.updateElement(r,void 0,{animated:!o,options:c},t)}else this.datasetElementType&&(delete e.dataset,this.datasetElementType=!1);this.updateElements(s,a,n,t)}addElements(){const{showLine:t}=this.options;!this.datasetElementType&&t&&(this.datasetElementType=this.chart.registry.getElement("line")),super.addElements()}updateElements(t,e,s,o){const a=o==="reset",{iScale:n,vScale:r,_stacked:l,_dataset:c}=this._cachedMeta,d=this.resolveDataElementOptions(e,o),p=this.getSharedOptions(d),h=this.includeOptions(o,p),g=n.axis,u=r.axis,{spanGaps:f,segment:b}=this.options,m=me(f)?f:Number.POSITIVE_INFINITY,x=this.chart._animationsDisabled||a||o==="none";let w=e>0&&this.getParsed(e-1);for(let y=e;y<e+s;++y){const v=t[y],$=this.getParsed(y),k=x?v:{},M=O($[u]),S=k[g]=n.getPixelForValue($[g],y),T=k[u]=a||M?r.getBasePixel():r.getPixelForValue(l?this.applyStack(r,$,l):$[u],y);k.skip=isNaN(S)||isNaN(T)||M,k.stop=y>0&&Math.abs($[g]-w[g])>m,b&&(k.parsed=$,k.raw=c.data[y]),h&&(k.options=p||this.resolveDataElementOptions(y,v.active?"active":o)),x||this.updateElement(v,y,k,o),w=$}this.updateSharedOptions(p,o,d)}getMaxOverflow(){const t=this._cachedMeta,e=t.data||[];if(!this.options.showLine){let r=0;for(let l=e.length-1;l>=0;--l)r=Math.max(r,e[l].size(this.resolveDataElementOptions(l))/2);return r>0&&r}const s=t.dataset,o=s.options&&s.options.borderWidth||0;if(!e.length)return o;const a=e[0].size(this.resolveDataElementOptions(0)),n=e[e.length-1].size(this.resolveDataElementOptions(e.length-1));return Math.max(o,a,n)/2}}_(ui,"id","scatter"),_(ui,"defaults",{datasetElementType:!1,dataElementType:"point",showLine:!1,fill:!1}),_(ui,"overrides",{interaction:{mode:"point"},scales:{x:{type:"linear"},y:{type:"linear"}}});var sc=Object.freeze({__proto__:null,BarController:di,BubbleController:pi,DoughnutController:ae,LineController:hi,PieController:ds,PolarAreaController:je,RadarController:gi,ScatterController:ui});function ee(){throw new Error("This method is not implemented: Check that a complete date adapter is provided.")}class Is{constructor(t){_(this,"options");this.options=t||{}}static override(t){Object.assign(Is.prototype,t)}init(){}formats(){return ee()}parse(){return ee()}format(){return ee()}add(){return ee()}diff(){return ee()}startOf(){return ee()}endOf(){return ee()}}var oc={_date:Is};function ac(i,t,e,s){const{controller:o,data:a,_sorted:n}=i,r=o._cachedMeta.iScale,l=i.dataset&&i.dataset.options?i.dataset.options.spanGaps:null;if(r&&t===r.axis&&t!=="r"&&n&&a.length){const c=r._reversePixels?zr:Lt;if(s){if(o._sharedOptions){const d=a[0],p=typeof d.getRange=="function"&&d.getRange(t);if(p){const h=c(a,t,e-p),g=c(a,t,e+p);return{lo:h.lo,hi:g.hi}}}}else{const d=c(a,t,e);if(l){const{vScale:p}=o._cachedMeta,{_parsed:h}=i,g=h.slice(0,d.lo+1).reverse().findIndex(f=>!O(f[p.axis]));d.lo-=Math.max(0,g);const u=h.slice(d.hi).findIndex(f=>!O(f[p.axis]));d.hi+=Math.max(0,u)}return d}}return{lo:0,hi:a.length-1}}function Di(i,t,e,s,o){const a=i.getSortedVisibleDatasetMetas(),n=e[t];for(let r=0,l=a.length;r<l;++r){const{index:c,data:d}=a[r],{lo:p,hi:h}=ac(a[r],t,n,o);for(let g=p;g<=h;++g){const u=d[g];u.skip||s(u,c,g)}}}function nc(i){const t=i.indexOf("x")!==-1,e=i.indexOf("y")!==-1;return function(s,o){const a=t?Math.abs(s.x-o.x):0,n=e?Math.abs(s.y-o.y):0;return Math.sqrt(Math.pow(a,2)+Math.pow(n,2))}}function Ui(i,t,e,s,o){const a=[];return!o&&!i.isPointInArea(t)||Di(i,e,t,function(r,l,c){!o&&!It(r,i.chartArea,0)||r.inRange(t.x,t.y,s)&&a.push({element:r,datasetIndex:l,index:c})},!0),a}function rc(i,t,e,s){let o=[];function a(n,r,l){const{startAngle:c,endAngle:d}=n.getProps(["startAngle","endAngle"],s),{angle:p}=Na(n,{x:t.x,y:t.y});Ne(p,c,d)&&o.push({element:n,datasetIndex:r,index:l})}return Di(i,e,t,a),o}function lc(i,t,e,s,o,a){let n=[];const r=nc(e);let l=Number.POSITIVE_INFINITY;function c(d,p,h){const g=d.inRange(t.x,t.y,o);if(s&&!g)return;const u=d.getCenterPoint(o);if(!(!!a||i.isPointInArea(u))&&!g)return;const b=r(t,u);b<l?(n=[{element:d,datasetIndex:p,index:h}],l=b):b===l&&n.push({element:d,datasetIndex:p,index:h})}return Di(i,e,t,c),n}function Xi(i,t,e,s,o,a){return!a&&!i.isPointInArea(t)?[]:e==="r"&&!s?rc(i,t,e,o):lc(i,t,e,s,o,a)}function _o(i,t,e,s,o){const a=[],n=e==="x"?"inXRange":"inYRange";let r=!1;return Di(i,e,t,(l,c,d)=>{l[n]&&l[n](t[e],o)&&(a.push({element:l,datasetIndex:c,index:d}),r=r||l.inRange(t.x,t.y,o))}),s&&!r?[]:a}var cc={modes:{index(i,t,e,s){const o=se(t,i),a=e.axis||"x",n=e.includeInvisible||!1,r=e.intersect?Ui(i,o,a,s,n):Xi(i,o,a,!1,s,n),l=[];return r.length?(i.getSortedVisibleDatasetMetas().forEach(c=>{const d=r[0].index,p=c.data[d];p&&!p.skip&&l.push({element:p,datasetIndex:c.index,index:d})}),l):[]},dataset(i,t,e,s){const o=se(t,i),a=e.axis||"xy",n=e.includeInvisible||!1;let r=e.intersect?Ui(i,o,a,s,n):Xi(i,o,a,!1,s,n);if(r.length>0){const l=r[0].datasetIndex,c=i.getDatasetMeta(l).data;r=[];for(let d=0;d<c.length;++d)r.push({element:c[d],datasetIndex:l,index:d})}return r},point(i,t,e,s){const o=se(t,i),a=e.axis||"xy",n=e.includeInvisible||!1;return Ui(i,o,a,s,n)},nearest(i,t,e,s){const o=se(t,i),a=e.axis||"xy",n=e.includeInvisible||!1;return Xi(i,o,a,e.intersect,s,n)},x(i,t,e,s){const o=se(t,i);return _o(i,o,"x",e.intersect,s)},y(i,t,e,s){const o=se(t,i);return _o(i,o,"y",e.intersect,s)}}};const un=["left","top","right","bottom"];function $e(i,t){return i.filter(e=>e.pos===t)}function $o(i,t){return i.filter(e=>un.indexOf(e.pos)===-1&&e.box.axis===t)}function ke(i,t){return i.sort((e,s)=>{const o=t?s:e,a=t?e:s;return o.weight===a.weight?o.index-a.index:o.weight-a.weight})}function dc(i){const t=[];let e,s,o,a,n,r;for(e=0,s=(i||[]).length;e<s;++e)o=i[e],{position:a,options:{stack:n,stackWeight:r=1}}=o,t.push({index:e,box:o,pos:a,horizontal:o.isHorizontal(),weight:o.weight,stack:n&&a+n,stackWeight:r});return t}function pc(i){const t={};for(const e of i){const{stack:s,pos:o,stackWeight:a}=e;if(!s||!un.includes(o))continue;const n=t[s]||(t[s]={count:0,placed:0,weight:0,size:0});n.count++,n.weight+=a}return t}function hc(i,t){const e=pc(i),{vBoxMaxWidth:s,hBoxMaxHeight:o}=t;let a,n,r;for(a=0,n=i.length;a<n;++a){r=i[a];const{fullSize:l}=r.box,c=e[r.stack],d=c&&r.stackWeight/c.weight;r.horizontal?(r.width=d?d*s:l&&t.availableWidth,r.height=o):(r.width=s,r.height=d?d*o:l&&t.availableHeight)}return e}function gc(i){const t=dc(i),e=ke(t.filter(c=>c.box.fullSize),!0),s=ke($e(t,"left"),!0),o=ke($e(t,"right")),a=ke($e(t,"top"),!0),n=ke($e(t,"bottom")),r=$o(t,"x"),l=$o(t,"y");return{fullSize:e,leftAndTop:s.concat(a),rightAndBottom:o.concat(l).concat(n).concat(r),chartArea:$e(t,"chartArea"),vertical:s.concat(o).concat(l),horizontal:a.concat(n).concat(r)}}function ko(i,t,e,s){return Math.max(i[e],t[e])+Math.max(i[s],t[s])}function fn(i,t){i.top=Math.max(i.top,t.top),i.left=Math.max(i.left,t.left),i.bottom=Math.max(i.bottom,t.bottom),i.right=Math.max(i.right,t.right)}function uc(i,t,e,s){const{pos:o,box:a}=e,n=i.maxPadding;if(!L(o)){e.size&&(i[o]-=e.size);const p=s[e.stack]||{size:0,count:1};p.size=Math.max(p.size,e.horizontal?a.height:a.width),e.size=p.size/p.count,i[o]+=e.size}a.getPadding&&fn(n,a.getPadding());const r=Math.max(0,t.outerWidth-ko(n,i,"left","right")),l=Math.max(0,t.outerHeight-ko(n,i,"top","bottom")),c=r!==i.w,d=l!==i.h;return i.w=r,i.h=l,e.horizontal?{same:c,other:d}:{same:d,other:c}}function fc(i){const t=i.maxPadding;function e(s){const o=Math.max(t[s]-i[s],0);return i[s]+=o,o}i.y+=e("top"),i.x+=e("left"),e("right"),e("bottom")}function bc(i,t){const e=t.maxPadding;function s(o){const a={left:0,top:0,right:0,bottom:0};return o.forEach(n=>{a[n]=Math.max(t[n],e[n])}),a}return s(i?["left","right"]:["top","bottom"])}function Pe(i,t,e,s){const o=[];let a,n,r,l,c,d;for(a=0,n=i.length,c=0;a<n;++a){r=i[a],l=r.box,l.update(r.width||t.w,r.height||t.h,bc(r.horizontal,t));const{same:p,other:h}=uc(t,e,r,s);c|=p&&o.length,d=d||h,l.fullSize||o.push(r)}return c&&Pe(o,t,e,s)||d}function si(i,t,e,s,o){i.top=e,i.left=t,i.right=t+s,i.bottom=e+o,i.width=s,i.height=o}function Mo(i,t,e,s){const o=e.padding;let{x:a,y:n}=t;for(const r of i){const l=r.box,c=s[r.stack]||{placed:0,weight:1},d=r.stackWeight/c.weight||1;if(r.horizontal){const p=t.w*d,h=c.size||l.height;Ve(c.start)&&(n=c.start),l.fullSize?si(l,o.left,n,e.outerWidth-o.right-o.left,h):si(l,t.left+c.placed,n,p,h),c.start=n,c.placed+=p,n=l.bottom}else{const p=t.h*d,h=c.size||l.width;Ve(c.start)&&(a=c.start),l.fullSize?si(l,a,o.top,h,e.outerHeight-o.bottom-o.top):si(l,a,t.top+c.placed,h,p),c.start=a,c.placed+=p,a=l.right}}t.x=a,t.y=n}var ct={addBox(i,t){i.boxes||(i.boxes=[]),t.fullSize=t.fullSize||!1,t.position=t.position||"top",t.weight=t.weight||0,t._layers=t._layers||function(){return[{z:0,draw(e){t.draw(e)}}]},i.boxes.push(t)},removeBox(i,t){const e=i.boxes?i.boxes.indexOf(t):-1;e!==-1&&i.boxes.splice(e,1)},configure(i,t,e){t.fullSize=e.fullSize,t.position=e.position,t.weight=e.weight},update(i,t,e,s){if(!i)return;const o=dt(i.options.layout.padding),a=Math.max(t-o.width,0),n=Math.max(e-o.height,0),r=gc(i.boxes),l=r.vertical,c=r.horizontal;V(i.boxes,f=>{typeof f.beforeLayout=="function"&&f.beforeLayout()});const d=l.reduce((f,b)=>b.box.options&&b.box.options.display===!1?f:f+1,0)||1,p=Object.freeze({outerWidth:t,outerHeight:e,padding:o,availableWidth:a,availableHeight:n,vBoxMaxWidth:a/2/d,hBoxMaxHeight:n/2}),h=Object.assign({},o);fn(h,dt(s));const g=Object.assign({maxPadding:h,w:a,h:n,x:o.left,y:o.top},o),u=hc(l.concat(c),p);Pe(r.fullSize,g,p,u),Pe(l,g,p,u),Pe(c,g,p,u)&&Pe(l,g,p,u),fc(g),Mo(r.leftAndTop,g,p,u),g.x+=g.w,g.y+=g.h,Mo(r.rightAndBottom,g,p,u),i.chartArea={left:g.left,top:g.top,right:g.left+g.w,bottom:g.top+g.h,height:g.h,width:g.w},V(r.chartArea,f=>{const b=f.box;Object.assign(b,i.chartArea),b.update(g.w,g.h,{left:0,top:0,right:0,bottom:0})})}};class bn{acquireContext(t,e){}releaseContext(t){return!1}addEventListener(t,e,s){}removeEventListener(t,e,s){}getDevicePixelRatio(){return 1}getMaximumSize(t,e,s,o){return e=Math.max(0,e||t.width),s=s||t.height,{width:e,height:Math.max(0,o?Math.floor(e/o):s)}}isAttached(t){return!0}updateConfig(t){}}class mc extends bn{acquireContext(t){return t&&t.getContext&&t.getContext("2d")||null}updateConfig(t){t.options.animation=!1}}const fi="$chartjs",xc={touchstart:"mousedown",touchmove:"mousemove",touchend:"mouseup",pointerenter:"mouseenter",pointerdown:"mousedown",pointermove:"mousemove",pointerup:"mouseup",pointerleave:"mouseout",pointerout:"mouseout"},So=i=>i===null||i==="";function vc(i,t){const e=i.style,s=i.getAttribute("height"),o=i.getAttribute("width");if(i[fi]={initial:{height:s,width:o,style:{display:e.display,height:e.height,width:e.width}}},e.display=e.display||"block",e.boxSizing=e.boxSizing||"border-box",So(o)){const a=lo(i,"width");a!==void 0&&(i.width=a)}if(So(s))if(i.style.height==="")i.height=i.width/(t||2);else{const a=lo(i,"height");a!==void 0&&(i.height=a)}return i}const mn=yl?{passive:!0}:!1;function yc(i,t,e){i&&i.addEventListener(t,e,mn)}function wc(i,t,e){i&&i.canvas&&i.canvas.removeEventListener(t,e,mn)}function _c(i,t){const e=xc[i.type]||i.type,{x:s,y:o}=se(i,t);return{type:e,chart:t,native:i,x:s!==void 0?s:null,y:o!==void 0?o:null}}function ki(i,t){for(const e of i)if(e===t||e.contains(t))return!0}function $c(i,t,e){const s=i.canvas,o=new MutationObserver(a=>{let n=!1;for(const r of a)n=n||ki(r.addedNodes,s),n=n&&!ki(r.removedNodes,s);n&&e()});return o.observe(document,{childList:!0,subtree:!0}),o}function kc(i,t,e){const s=i.canvas,o=new MutationObserver(a=>{let n=!1;for(const r of a)n=n||ki(r.removedNodes,s),n=n&&!ki(r.addedNodes,s);n&&e()});return o.observe(document,{childList:!0,subtree:!0}),o}const We=new Map;let zo=0;function xn(){const i=window.devicePixelRatio;i!==zo&&(zo=i,We.forEach((t,e)=>{e.currentDevicePixelRatio!==i&&t()}))}function Mc(i,t){We.size||window.addEventListener("resize",xn),We.set(i,t)}function Sc(i){We.delete(i),We.size||window.removeEventListener("resize",xn)}function zc(i,t,e){const s=i.canvas,o=s&&Ls(s);if(!o)return;const a=Ya((r,l)=>{const c=o.clientWidth;e(r,l),c<o.clientWidth&&e()},window),n=new ResizeObserver(r=>{const l=r[0],c=l.contentRect.width,d=l.contentRect.height;c===0&&d===0||a(c,d)});return n.observe(o),Mc(i,a),n}function Ki(i,t,e){e&&e.disconnect(),t==="resize"&&Sc(i)}function Cc(i,t,e){const s=i.canvas,o=Ya(a=>{i.ctx!==null&&e(_c(a,i))},i);return yc(s,t,o),o}class Ac extends bn{acquireContext(t,e){const s=t&&t.getContext&&t.getContext("2d");return s&&s.canvas===t?(vc(t,e),s):null}releaseContext(t){const e=t.canvas;if(!e[fi])return!1;const s=e[fi].initial;["height","width"].forEach(a=>{const n=s[a];O(n)?e.removeAttribute(a):e.setAttribute(a,n)});const o=s.style||{};return Object.keys(o).forEach(a=>{e.style[a]=o[a]}),e.width=e.width,delete e[fi],!0}addEventListener(t,e,s){this.removeEventListener(t,e);const o=t.$proxies||(t.$proxies={}),n={attach:$c,detach:kc,resize:zc}[e]||Cc;o[e]=n(t,e,s)}removeEventListener(t,e){const s=t.$proxies||(t.$proxies={}),o=s[e];if(!o)return;({attach:Ki,detach:Ki,resize:Ki}[e]||wc)(t,e,o),s[e]=void 0}getDevicePixelRatio(){return window.devicePixelRatio}getMaximumSize(t,e,s,o){return vl(t,e,s,o)}isAttached(t){const e=t&&Ls(t);return!!(e&&e.isConnected)}}function Pc(i){return!Os()||typeof OffscreenCanvas<"u"&&i instanceof OffscreenCanvas?mc:Ac}class Mt{constructor(){_(this,"x");_(this,"y");_(this,"active",!1);_(this,"options");_(this,"$animations")}tooltipPosition(t){const{x:e,y:s}=this.getProps(["x","y"],t);return{x:e,y:s}}hasValue(){return me(this.x)&&me(this.y)}getProps(t,e){const s=this.$animations;if(!e||!s)return this;const o={};return t.forEach(a=>{o[a]=s[a]&&s[a].active()?s[a]._to:this[a]}),o}}_(Mt,"defaults",{}),_(Mt,"defaultRoutes");function Rc(i,t){const e=i.options.ticks,s=Dc(i),o=Math.min(e.maxTicksLimit||s,s),a=e.major.enabled?Ec(t):[],n=a.length,r=a[0],l=a[n-1],c=[];if(n>o)return Oc(t,c,a,n/o),c;const d=Tc(a,t,o);if(n>0){let p,h;const g=n>1?Math.round((l-r)/(n-1)):null;for(oi(t,c,d,O(g)?0:r-g,r),p=0,h=n-1;p<h;p++)oi(t,c,d,a[p],a[p+1]);return oi(t,c,d,l,O(g)?t.length:l+g),c}return oi(t,c,d),c}function Dc(i){const t=i.options.offset,e=i._tickSize(),s=i._length/e+(t?0:1),o=i._maxLength/e;return Math.floor(Math.min(s,o))}function Tc(i,t,e){const s=Lc(i),o=t.length/e;if(!s)return Math.max(o,1);const a=_r(s);for(let n=0,r=a.length-1;n<r;n++){const l=a[n];if(l>o)return l}return Math.max(o,1)}function Ec(i){const t=[];let e,s;for(e=0,s=i.length;e<s;e++)i[e].major&&t.push(e);return t}function Oc(i,t,e,s){let o=0,a=e[0],n;for(s=Math.ceil(s),n=0;n<i.length;n++)n===a&&(t.push(i[n]),o++,a=e[o*s])}function oi(i,t,e,s,o){const a=R(s,0),n=Math.min(R(o,i.length),i.length);let r=0,l,c,d;for(e=Math.ceil(e),o&&(l=o-s,e=l/Math.floor(l/e)),d=a;d<0;)r++,d=Math.round(a+r*e);for(c=Math.max(a,0);c<n;c++)c===d&&(t.push(i[c]),r++,d=Math.round(a+r*e))}function Lc(i){const t=i.length;let e,s;if(t<2)return!1;for(s=i[0],e=1;e<t;++e)if(i[e]-i[e-1]!==s)return!1;return s}const Ic=i=>i==="left"?"right":i==="right"?"left":i,Co=(i,t,e)=>t==="top"||t==="left"?i[t]+e:i[t]-e,Ao=(i,t)=>Math.min(t||i,i);function Po(i,t){const e=[],s=i.length/t,o=i.length;let a=0;for(;a<o;a+=s)e.push(i[Math.floor(a)]);return e}function jc(i,t,e){const s=i.ticks.length,o=Math.min(t,s-1),a=i._startPixel,n=i._endPixel,r=1e-6;let l=i.getPixelForTick(o),c;if(!(e&&(s===1?c=Math.max(l-a,n-l):t===0?c=(i.getPixelForTick(1)-l)/2:c=(l-i.getPixelForTick(o-1))/2,l+=o<t?c:-c,l<a-r||l>n+r)))return l}function Fc(i,t){V(i,e=>{const s=e.gc,o=s.length/2;let a;if(o>t){for(a=0;a<o;++a)delete e.data[s[a]];s.splice(0,o)}})}function Me(i){return i.drawTicks?i.tickLength:0}function Ro(i,t){if(!i.display)return 0;const e=tt(i.font,t),s=dt(i.padding);return(U(i.text)?i.text.length:1)*e.lineHeight+s.height}function Bc(i,t){return Ut(i,{scale:t,type:"scale"})}function Vc(i,t,e){return Ut(i,{tick:e,index:t,type:"tick"})}function Nc(i,t,e){let s=As(i);return(e&&t!=="right"||!e&&t==="right")&&(s=Ic(s)),s}function Hc(i,t,e,s){const{top:o,left:a,bottom:n,right:r,chart:l}=i,{chartArea:c,scales:d}=l;let p=0,h,g,u;const f=n-o,b=r-a;if(i.isHorizontal()){if(g=nt(s,a,r),L(e)){const m=Object.keys(e)[0],x=e[m];u=d[m].getPixelForValue(x)+f-t}else e==="center"?u=(c.bottom+c.top)/2+f-t:u=Co(i,e,t);h=r-a}else{if(L(e)){const m=Object.keys(e)[0],x=e[m];g=d[m].getPixelForValue(x)-b+t}else e==="center"?g=(c.left+c.right)/2-b+t:g=Co(i,e,t);u=nt(s,n,o),p=e==="left"?-Z:Z}return{titleX:g,titleY:u,maxWidth:h,rotation:p}}class pe extends Mt{constructor(t){super(),this.id=t.id,this.type=t.type,this.options=void 0,this.ctx=t.ctx,this.chart=t.chart,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this._margins={left:0,right:0,top:0,bottom:0},this.maxWidth=void 0,this.maxHeight=void 0,this.paddingTop=void 0,this.paddingBottom=void 0,this.paddingLeft=void 0,this.paddingRight=void 0,this.axis=void 0,this.labelRotation=void 0,this.min=void 0,this.max=void 0,this._range=void 0,this.ticks=[],this._gridLineItems=null,this._labelItems=null,this._labelSizes=null,this._length=0,this._maxLength=0,this._longestTextCache={},this._startPixel=void 0,this._endPixel=void 0,this._reversePixels=!1,this._userMax=void 0,this._userMin=void 0,this._suggestedMax=void 0,this._suggestedMin=void 0,this._ticksLength=0,this._borderValue=0,this._cache={},this._dataLimitsCached=!1,this.$context=void 0}init(t){this.options=t.setContext(this.getContext()),this.axis=t.axis,this._userMin=this.parse(t.min),this._userMax=this.parse(t.max),this._suggestedMin=this.parse(t.suggestedMin),this._suggestedMax=this.parse(t.suggestedMax)}parse(t,e){return t}getUserBounds(){let{_userMin:t,_userMax:e,_suggestedMin:s,_suggestedMax:o}=this;return t=mt(t,Number.POSITIVE_INFINITY),e=mt(e,Number.NEGATIVE_INFINITY),s=mt(s,Number.POSITIVE_INFINITY),o=mt(o,Number.NEGATIVE_INFINITY),{min:mt(t,s),max:mt(e,o),minDefined:q(t),maxDefined:q(e)}}getMinMax(t){let{min:e,max:s,minDefined:o,maxDefined:a}=this.getUserBounds(),n;if(o&&a)return{min:e,max:s};const r=this.getMatchingVisibleMetas();for(let l=0,c=r.length;l<c;++l)n=r[l].controller.getMinMax(this,t),o||(e=Math.min(e,n.min)),a||(s=Math.max(s,n.max));return e=a&&e>s?s:e,s=o&&e>s?e:s,{min:mt(e,mt(s,e)),max:mt(s,mt(e,s))}}getPadding(){return{left:this.paddingLeft||0,top:this.paddingTop||0,right:this.paddingRight||0,bottom:this.paddingBottom||0}}getTicks(){return this.ticks}getLabels(){const t=this.chart.data;return this.options.labels||(this.isHorizontal()?t.xLabels:t.yLabels)||t.labels||[]}getLabelItems(t=this.chart.chartArea){return this._labelItems||(this._labelItems=this._computeLabelItems(t))}beforeLayout(){this._cache={},this._dataLimitsCached=!1}beforeUpdate(){W(this.options.beforeUpdate,[this])}update(t,e,s){const{beginAtZero:o,grace:a,ticks:n}=this.options,r=n.sampleSize;this.beforeUpdate(),this.maxWidth=t,this.maxHeight=e,this._margins=s=Object.assign({left:0,right:0,top:0,bottom:0},s),this.ticks=null,this._labelSizes=null,this._gridLineItems=null,this._labelItems=null,this.beforeSetDimensions(),this.setDimensions(),this.afterSetDimensions(),this._maxLength=this.isHorizontal()?this.width+s.left+s.right:this.height+s.top+s.bottom,this._dataLimitsCached||(this.beforeDataLimits(),this.determineDataLimits(),this.afterDataLimits(),this._range=Jr(this,a,o),this._dataLimitsCached=!0),this.beforeBuildTicks(),this.ticks=this.buildTicks()||[],this.afterBuildTicks();const l=r<this.ticks.length;this._convertTicksToLabels(l?Po(this.ticks,r):this.ticks),this.configure(),this.beforeCalculateLabelRotation(),this.calculateLabelRotation(),this.afterCalculateLabelRotation(),n.display&&(n.autoSkip||n.source==="auto")&&(this.ticks=Rc(this,this.ticks),this._labelSizes=null,this.afterAutoSkip()),l&&this._convertTicksToLabels(this.ticks),this.beforeFit(),this.fit(),this.afterFit(),this.afterUpdate()}configure(){let t=this.options.reverse,e,s;this.isHorizontal()?(e=this.left,s=this.right):(e=this.top,s=this.bottom,t=!t),this._startPixel=e,this._endPixel=s,this._reversePixels=t,this._length=s-e,this._alignToPixels=this.options.alignToPixels}afterUpdate(){W(this.options.afterUpdate,[this])}beforeSetDimensions(){W(this.options.beforeSetDimensions,[this])}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=0,this.right=this.width):(this.height=this.maxHeight,this.top=0,this.bottom=this.height),this.paddingLeft=0,this.paddingTop=0,this.paddingRight=0,this.paddingBottom=0}afterSetDimensions(){W(this.options.afterSetDimensions,[this])}_callHooks(t){this.chart.notifyPlugins(t,this.getContext()),W(this.options[t],[this])}beforeDataLimits(){this._callHooks("beforeDataLimits")}determineDataLimits(){}afterDataLimits(){this._callHooks("afterDataLimits")}beforeBuildTicks(){this._callHooks("beforeBuildTicks")}buildTicks(){return[]}afterBuildTicks(){this._callHooks("afterBuildTicks")}beforeTickToLabelConversion(){W(this.options.beforeTickToLabelConversion,[this])}generateTickLabels(t){const e=this.options.ticks;let s,o,a;for(s=0,o=t.length;s<o;s++)a=t[s],a.label=W(e.callback,[a.value,s,t],this)}afterTickToLabelConversion(){W(this.options.afterTickToLabelConversion,[this])}beforeCalculateLabelRotation(){W(this.options.beforeCalculateLabelRotation,[this])}calculateLabelRotation(){const t=this.options,e=t.ticks,s=Ao(this.ticks.length,t.ticks.maxTicksLimit),o=e.minRotation||0,a=e.maxRotation;let n=o,r,l,c;if(!this._isVisible()||!e.display||o>=a||s<=1||!this.isHorizontal()){this.labelRotation=o;return}const d=this._getLabelSizes(),p=d.widest.width,h=d.highest.height,g=et(this.chart.width-p,0,this.maxWidth);r=t.offset?this.maxWidth/s:g/(s-1),p+6>r&&(r=g/(s-(t.offset?.5:1)),l=this.maxHeight-Me(t.grid)-e.padding-Ro(t.title,this.chart.options.font),c=Math.sqrt(p*p+h*h),n=zs(Math.min(Math.asin(et((d.highest.height+6)/r,-1,1)),Math.asin(et(l/c,-1,1))-Math.asin(et(h/c,-1,1)))),n=Math.max(o,Math.min(a,n))),this.labelRotation=n}afterCalculateLabelRotation(){W(this.options.afterCalculateLabelRotation,[this])}afterAutoSkip(){}beforeFit(){W(this.options.beforeFit,[this])}fit(){const t={width:0,height:0},{chart:e,options:{ticks:s,title:o,grid:a}}=this,n=this._isVisible(),r=this.isHorizontal();if(n){const l=Ro(o,e.options.font);if(r?(t.width=this.maxWidth,t.height=Me(a)+l):(t.height=this.maxHeight,t.width=Me(a)+l),s.display&&this.ticks.length){const{first:c,last:d,widest:p,highest:h}=this._getLabelSizes(),g=s.padding*2,u=$t(this.labelRotation),f=Math.cos(u),b=Math.sin(u);if(r){const m=s.mirror?0:b*p.width+f*h.height;t.height=Math.min(this.maxHeight,t.height+m+g)}else{const m=s.mirror?0:f*p.width+b*h.height;t.width=Math.min(this.maxWidth,t.width+m+g)}this._calculatePadding(c,d,b,f)}}this._handleMargins(),r?(this.width=this._length=e.width-this._margins.left-this._margins.right,this.height=t.height):(this.width=t.width,this.height=this._length=e.height-this._margins.top-this._margins.bottom)}_calculatePadding(t,e,s,o){const{ticks:{align:a,padding:n},position:r}=this.options,l=this.labelRotation!==0,c=r!=="top"&&this.axis==="x";if(this.isHorizontal()){const d=this.getPixelForTick(0)-this.left,p=this.right-this.getPixelForTick(this.ticks.length-1);let h=0,g=0;l?c?(h=o*t.width,g=s*e.height):(h=s*t.height,g=o*e.width):a==="start"?g=e.width:a==="end"?h=t.width:a!=="inner"&&(h=t.width/2,g=e.width/2),this.paddingLeft=Math.max((h-d+n)*this.width/(this.width-d),0),this.paddingRight=Math.max((g-p+n)*this.width/(this.width-p),0)}else{let d=e.height/2,p=t.height/2;a==="start"?(d=0,p=t.height):a==="end"&&(d=e.height,p=0),this.paddingTop=d+n,this.paddingBottom=p+n}}_handleMargins(){this._margins&&(this._margins.left=Math.max(this.paddingLeft,this._margins.left),this._margins.top=Math.max(this.paddingTop,this._margins.top),this._margins.right=Math.max(this.paddingRight,this._margins.right),this._margins.bottom=Math.max(this.paddingBottom,this._margins.bottom))}afterFit(){W(this.options.afterFit,[this])}isHorizontal(){const{axis:t,position:e}=this.options;return e==="top"||e==="bottom"||t==="x"}isFullSize(){return this.options.fullSize}_convertTicksToLabels(t){this.beforeTickToLabelConversion(),this.generateTickLabels(t);let e,s;for(e=0,s=t.length;e<s;e++)O(t[e].label)&&(t.splice(e,1),s--,e--);this.afterTickToLabelConversion()}_getLabelSizes(){let t=this._labelSizes;if(!t){const e=this.options.ticks.sampleSize;let s=this.ticks;e<s.length&&(s=Po(s,e)),this._labelSizes=t=this._computeLabelSizes(s,s.length,this.options.ticks.maxTicksLimit)}return t}_computeLabelSizes(t,e,s){const{ctx:o,_longestTextCache:a}=this,n=[],r=[],l=Math.floor(e/Ao(e,s));let c=0,d=0,p,h,g,u,f,b,m,x,w,y,v;for(p=0;p<e;p+=l){if(u=t[p].label,f=this._resolveTickFontOptions(p),o.font=b=f.string,m=a[b]=a[b]||{data:{},gc:[]},x=f.lineHeight,w=y=0,!O(u)&&!U(u))w=_i(o,m.data,m.gc,w,u),y=x;else if(U(u))for(h=0,g=u.length;h<g;++h)v=u[h],!O(v)&&!U(v)&&(w=_i(o,m.data,m.gc,w,v),y+=x);n.push(w),r.push(y),c=Math.max(w,c),d=Math.max(y,d)}Fc(a,e);const $=n.indexOf(c),k=r.indexOf(d),M=S=>({width:n[S]||0,height:r[S]||0});return{first:M(0),last:M(e-1),widest:M($),highest:M(k),widths:n,heights:r}}getLabelForValue(t){return t}getPixelForValue(t,e){return NaN}getValueForPixel(t){}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getPixelForDecimal(t){this._reversePixels&&(t=1-t);const e=this._startPixel+t*this._length;return Sr(this._alignToPixels?te(this.chart,e,0):e)}getDecimalForPixel(t){const e=(t-this._startPixel)/this._length;return this._reversePixels?1-e:e}getBasePixel(){return this.getPixelForValue(this.getBaseValue())}getBaseValue(){const{min:t,max:e}=this;return t<0&&e<0?e:t>0&&e>0?t:0}getContext(t){const e=this.ticks||[];if(t>=0&&t<e.length){const s=e[t];return s.$context||(s.$context=Vc(this.getContext(),t,s))}return this.$context||(this.$context=Bc(this.chart.getContext(),this))}_tickSize(){const t=this.options.ticks,e=$t(this.labelRotation),s=Math.abs(Math.cos(e)),o=Math.abs(Math.sin(e)),a=this._getLabelSizes(),n=t.autoSkipPadding||0,r=a?a.widest.width+n:0,l=a?a.highest.height+n:0;return this.isHorizontal()?l*s>r*o?r/s:l/o:l*o<r*s?l/s:r/o}_isVisible(){const t=this.options.display;return t!=="auto"?!!t:this.getMatchingVisibleMetas().length>0}_computeGridLineItems(t){const e=this.axis,s=this.chart,o=this.options,{grid:a,position:n,border:r}=o,l=a.offset,c=this.isHorizontal(),p=this.ticks.length+(l?1:0),h=Me(a),g=[],u=r.setContext(this.getContext()),f=u.display?u.width:0,b=f/2,m=function(Y){return te(s,Y,f)};let x,w,y,v,$,k,M,S,T,E,I,it;if(n==="top")x=m(this.bottom),k=this.bottom-h,S=x-b,E=m(t.top)+b,it=t.bottom;else if(n==="bottom")x=m(this.top),E=t.top,it=m(t.bottom)-b,k=x+b,S=this.top+h;else if(n==="left")x=m(this.right),$=this.right-h,M=x-b,T=m(t.left)+b,I=t.right;else if(n==="right")x=m(this.left),T=t.left,I=m(t.right)-b,$=x+b,M=this.left+h;else if(e==="x"){if(n==="center")x=m((t.top+t.bottom)/2+.5);else if(L(n)){const Y=Object.keys(n)[0],J=n[Y];x=m(this.chart.scales[Y].getPixelForValue(J))}E=t.top,it=t.bottom,k=x+b,S=k+h}else if(e==="y"){if(n==="center")x=m((t.left+t.right)/2);else if(L(n)){const Y=Object.keys(n)[0],J=n[Y];x=m(this.chart.scales[Y].getPixelForValue(J))}$=x-b,M=$-h,T=t.left,I=t.right}const ft=R(o.ticks.maxTicksLimit,p),N=Math.max(1,Math.ceil(p/ft));for(w=0;w<p;w+=N){const Y=this.getContext(w),J=a.setContext(Y),wt=r.setContext(Y),ot=J.lineWidth,he=J.color,qe=wt.dash||[],ge=wt.dashOffset,ye=J.tickWidth,Jt=J.tickColor,we=J.tickBorderDash||[],Zt=J.tickBorderDashOffset;y=jc(this,w,l),y!==void 0&&(v=te(s,y,ot),c?$=M=T=I=v:k=S=E=it=v,g.push({tx1:$,ty1:k,tx2:M,ty2:S,x1:T,y1:E,x2:I,y2:it,width:ot,color:he,borderDash:qe,borderDashOffset:ge,tickWidth:ye,tickColor:Jt,tickBorderDash:we,tickBorderDashOffset:Zt}))}return this._ticksLength=p,this._borderValue=x,g}_computeLabelItems(t){const e=this.axis,s=this.options,{position:o,ticks:a}=s,n=this.isHorizontal(),r=this.ticks,{align:l,crossAlign:c,padding:d,mirror:p}=a,h=Me(s.grid),g=h+d,u=p?-d:g,f=-$t(this.labelRotation),b=[];let m,x,w,y,v,$,k,M,S,T,E,I,it="middle";if(o==="top")$=this.bottom-u,k=this._getXAxisLabelAlignment();else if(o==="bottom")$=this.top+u,k=this._getXAxisLabelAlignment();else if(o==="left"){const N=this._getYAxisLabelAlignment(h);k=N.textAlign,v=N.x}else if(o==="right"){const N=this._getYAxisLabelAlignment(h);k=N.textAlign,v=N.x}else if(e==="x"){if(o==="center")$=(t.top+t.bottom)/2+g;else if(L(o)){const N=Object.keys(o)[0],Y=o[N];$=this.chart.scales[N].getPixelForValue(Y)+g}k=this._getXAxisLabelAlignment()}else if(e==="y"){if(o==="center")v=(t.left+t.right)/2-g;else if(L(o)){const N=Object.keys(o)[0],Y=o[N];v=this.chart.scales[N].getPixelForValue(Y)}k=this._getYAxisLabelAlignment(h).textAlign}e==="y"&&(l==="start"?it="top":l==="end"&&(it="bottom"));const ft=this._getLabelSizes();for(m=0,x=r.length;m<x;++m){w=r[m],y=w.label;const N=a.setContext(this.getContext(m));M=this.getPixelForTick(m)+a.labelOffset,S=this._resolveTickFontOptions(m),T=S.lineHeight,E=U(y)?y.length:1;const Y=E/2,J=N.color,wt=N.textStrokeColor,ot=N.textStrokeWidth;let he=k;n?(v=M,k==="inner"&&(m===x-1?he=this.options.reverse?"left":"right":m===0?he=this.options.reverse?"right":"left":he="center"),o==="top"?c==="near"||f!==0?I=-E*T+T/2:c==="center"?I=-ft.highest.height/2-Y*T+T:I=-ft.highest.height+T/2:c==="near"||f!==0?I=T/2:c==="center"?I=ft.highest.height/2-Y*T:I=ft.highest.height-E*T,p&&(I*=-1),f!==0&&!N.showLabelBackdrop&&(v+=T/2*Math.sin(f))):($=M,I=(1-E)*T/2);let qe;if(N.showLabelBackdrop){const ge=dt(N.backdropPadding),ye=ft.heights[m],Jt=ft.widths[m];let we=I-ge.top,Zt=0-ge.left;switch(it){case"middle":we-=ye/2;break;case"bottom":we-=ye;break}switch(k){case"center":Zt-=Jt/2;break;case"right":Zt-=Jt;break;case"inner":m===x-1?Zt-=Jt:m>0&&(Zt-=Jt/2);break}qe={left:Zt,top:we,width:Jt+ge.width,height:ye+ge.height,color:N.backdropColor}}b.push({label:y,font:S,textOffset:I,options:{rotation:f,color:J,strokeColor:wt,strokeWidth:ot,textAlign:he,textBaseline:it,translation:[v,$],backdrop:qe}})}return b}_getXAxisLabelAlignment(){const{position:t,ticks:e}=this.options;if(-$t(this.labelRotation))return t==="top"?"left":"right";let o="center";return e.align==="start"?o="left":e.align==="end"?o="right":e.align==="inner"&&(o="inner"),o}_getYAxisLabelAlignment(t){const{position:e,ticks:{crossAlign:s,mirror:o,padding:a}}=this.options,n=this._getLabelSizes(),r=t+a,l=n.widest.width;let c,d;return e==="left"?o?(d=this.right+a,s==="near"?c="left":s==="center"?(c="center",d+=l/2):(c="right",d+=l)):(d=this.right-r,s==="near"?c="right":s==="center"?(c="center",d-=l/2):(c="left",d=this.left)):e==="right"?o?(d=this.left+a,s==="near"?c="right":s==="center"?(c="center",d-=l/2):(c="left",d-=l)):(d=this.left+r,s==="near"?c="left":s==="center"?(c="center",d+=l/2):(c="right",d=this.right)):c="right",{textAlign:c,x:d}}_computeLabelArea(){if(this.options.ticks.mirror)return;const t=this.chart,e=this.options.position;if(e==="left"||e==="right")return{top:0,left:this.left,bottom:t.height,right:this.right};if(e==="top"||e==="bottom")return{top:this.top,left:0,bottom:this.bottom,right:t.width}}drawBackground(){const{ctx:t,options:{backgroundColor:e},left:s,top:o,width:a,height:n}=this;e&&(t.save(),t.fillStyle=e,t.fillRect(s,o,a,n),t.restore())}getLineWidthForValue(t){const e=this.options.grid;if(!this._isVisible()||!e.display)return 0;const o=this.ticks.findIndex(a=>a.value===t);return o>=0?e.setContext(this.getContext(o)).lineWidth:0}drawGrid(t){const e=this.options.grid,s=this.ctx,o=this._gridLineItems||(this._gridLineItems=this._computeGridLineItems(t));let a,n;const r=(l,c,d)=>{!d.width||!d.color||(s.save(),s.lineWidth=d.width,s.strokeStyle=d.color,s.setLineDash(d.borderDash||[]),s.lineDashOffset=d.borderDashOffset,s.beginPath(),s.moveTo(l.x,l.y),s.lineTo(c.x,c.y),s.stroke(),s.restore())};if(e.display)for(a=0,n=o.length;a<n;++a){const l=o[a];e.drawOnChartArea&&r({x:l.x1,y:l.y1},{x:l.x2,y:l.y2},l),e.drawTicks&&r({x:l.tx1,y:l.ty1},{x:l.tx2,y:l.ty2},{color:l.tickColor,width:l.tickWidth,borderDash:l.tickBorderDash,borderDashOffset:l.tickBorderDashOffset})}}drawBorder(){const{chart:t,ctx:e,options:{border:s,grid:o}}=this,a=s.setContext(this.getContext()),n=s.display?a.width:0;if(!n)return;const r=o.setContext(this.getContext(0)).lineWidth,l=this._borderValue;let c,d,p,h;this.isHorizontal()?(c=te(t,this.left,n)-n/2,d=te(t,this.right,r)+r/2,p=h=l):(p=te(t,this.top,n)-n/2,h=te(t,this.bottom,r)+r/2,c=d=l),e.save(),e.lineWidth=a.width,e.strokeStyle=a.color,e.beginPath(),e.moveTo(c,p),e.lineTo(d,h),e.stroke(),e.restore()}drawLabels(t){if(!this.options.ticks.display)return;const s=this.ctx,o=this._computeLabelArea();o&&Ai(s,o);const a=this.getLabelItems(t);for(const n of a){const r=n.options,l=n.font,c=n.label,d=n.textOffset;de(s,c,0,d,l,r)}o&&Pi(s)}drawTitle(){const{ctx:t,options:{position:e,title:s,reverse:o}}=this;if(!s.display)return;const a=tt(s.font),n=dt(s.padding),r=s.align;let l=a.lineHeight/2;e==="bottom"||e==="center"||L(e)?(l+=n.bottom,U(s.text)&&(l+=a.lineHeight*(s.text.length-1))):l+=n.top;const{titleX:c,titleY:d,maxWidth:p,rotation:h}=Hc(this,l,e,r);de(t,s.text,0,0,a,{color:s.color,maxWidth:p,rotation:h,textAlign:Nc(r,e,o),textBaseline:"middle",translation:[c,d]})}draw(t){this._isVisible()&&(this.drawBackground(),this.drawGrid(t),this.drawBorder(),this.drawTitle(),this.drawLabels(t))}_layers(){const t=this.options,e=t.ticks&&t.ticks.z||0,s=R(t.grid&&t.grid.z,-1),o=R(t.border&&t.border.z,0);return!this._isVisible()||this.draw!==pe.prototype.draw?[{z:e,draw:a=>{this.draw(a)}}]:[{z:s,draw:a=>{this.drawBackground(),this.drawGrid(a),this.drawTitle()}},{z:o,draw:()=>{this.drawBorder()}},{z:e,draw:a=>{this.drawLabels(a)}}]}getMatchingVisibleMetas(t){const e=this.chart.getSortedVisibleDatasetMetas(),s=this.axis+"AxisID",o=[];let a,n;for(a=0,n=e.length;a<n;++a){const r=e[a];r[s]===this.id&&(!t||r.type===t)&&o.push(r)}return o}_resolveTickFontOptions(t){const e=this.options.ticks.setContext(this.getContext(t));return tt(e.font)}_maxDigits(){const t=this._resolveTickFontOptions(0).lineHeight;return(this.isHorizontal()?this.width:this.height)/t}}class ai{constructor(t,e,s){this.type=t,this.scope=e,this.override=s,this.items=Object.create(null)}isForType(t){return Object.prototype.isPrototypeOf.call(this.type.prototype,t.prototype)}register(t){const e=Object.getPrototypeOf(t);let s;Yc(e)&&(s=this.register(e));const o=this.items,a=t.id,n=this.scope+"."+a;if(!a)throw new Error("class does not have id: "+t);return a in o||(o[a]=t,Wc(t,n,s),this.override&&X.override(t.id,t.overrides)),n}get(t){return this.items[t]}unregister(t){const e=this.items,s=t.id,o=this.scope;s in e&&delete e[s],o&&s in X[o]&&(delete X[o][s],this.override&&delete ce[s])}}function Wc(i,t,e){const s=Be(Object.create(null),[e?X.get(e):{},X.get(t),i.defaults]);X.set(t,s),i.defaultRoutes&&Gc(t,i.defaultRoutes),i.descriptors&&X.describe(t,i.descriptors)}function Gc(i,t){Object.keys(t).forEach(e=>{const s=e.split("."),o=s.pop(),a=[i].concat(s).join("."),n=t[e].split("."),r=n.pop(),l=n.join(".");X.route(a,o,l,r)})}function Yc(i){return"id"in i&&"defaults"in i}class Uc{constructor(){this.controllers=new ai(kt,"datasets",!0),this.elements=new ai(Mt,"elements"),this.plugins=new ai(Object,"plugins"),this.scales=new ai(pe,"scales"),this._typedRegistries=[this.controllers,this.scales,this.elements]}add(...t){this._each("register",t)}remove(...t){this._each("unregister",t)}addControllers(...t){this._each("register",t,this.controllers)}addElements(...t){this._each("register",t,this.elements)}addPlugins(...t){this._each("register",t,this.plugins)}addScales(...t){this._each("register",t,this.scales)}getController(t){return this._get(t,this.controllers,"controller")}getElement(t){return this._get(t,this.elements,"element")}getPlugin(t){return this._get(t,this.plugins,"plugin")}getScale(t){return this._get(t,this.scales,"scale")}removeControllers(...t){this._each("unregister",t,this.controllers)}removeElements(...t){this._each("unregister",t,this.elements)}removePlugins(...t){this._each("unregister",t,this.plugins)}removeScales(...t){this._each("unregister",t,this.scales)}_each(t,e,s){[...e].forEach(o=>{const a=s||this._getRegistryForType(o);s||a.isForType(o)||a===this.plugins&&o.id?this._exec(t,a,o):V(o,n=>{const r=s||this._getRegistryForType(n);this._exec(t,r,n)})})}_exec(t,e,s){const o=Ss(t);W(s["before"+o],[],s),e[t](s),W(s["after"+o],[],s)}_getRegistryForType(t){for(let e=0;e<this._typedRegistries.length;e++){const s=this._typedRegistries[e];if(s.isForType(t))return s}return this.plugins}_get(t,e,s){const o=e.get(t);if(o===void 0)throw new Error('"'+t+'" is not a registered '+s+".");return o}}var Ct=new Uc;class Xc{constructor(){this._init=void 0}notify(t,e,s,o){if(e==="beforeInit"&&(this._init=this._createDescriptors(t,!0),this._notify(this._init,t,"install")),this._init===void 0)return;const a=o?this._descriptors(t).filter(o):this._descriptors(t),n=this._notify(a,t,e,s);return e==="afterDestroy"&&(this._notify(a,t,"stop"),this._notify(this._init,t,"uninstall"),this._init=void 0),n}_notify(t,e,s,o){o=o||{};for(const a of t){const n=a.plugin,r=n[s],l=[e,o,a.options];if(W(r,l,n)===!1&&o.cancelable)return!1}return!0}invalidate(){O(this._cache)||(this._oldCache=this._cache,this._cache=void 0)}_descriptors(t){if(this._cache)return this._cache;const e=this._cache=this._createDescriptors(t);return this._notifyStateChanges(t),e}_createDescriptors(t,e){const s=t&&t.config,o=R(s.options&&s.options.plugins,{}),a=Kc(s);return o===!1&&!e?[]:Jc(t,a,o,e)}_notifyStateChanges(t){const e=this._oldCache||[],s=this._cache,o=(a,n)=>a.filter(r=>!n.some(l=>r.plugin.id===l.plugin.id));this._notify(o(e,s),t,"stop"),this._notify(o(s,e),t,"start")}}function Kc(i){const t={},e=[],s=Object.keys(Ct.plugins.items);for(let a=0;a<s.length;a++)e.push(Ct.getPlugin(s[a]));const o=i.plugins||[];for(let a=0;a<o.length;a++){const n=o[a];e.indexOf(n)===-1&&(e.push(n),t[n.id]=!0)}return{plugins:e,localIds:t}}function qc(i,t){return!t&&i===!1?null:i===!0?{}:i}function Jc(i,{plugins:t,localIds:e},s,o){const a=[],n=i.getContext();for(const r of t){const l=r.id,c=qc(s[l],o);c!==null&&a.push({plugin:r,options:Zc(i.config,{plugin:r,local:e[l]},c,n)})}return a}function Zc(i,{plugin:t,local:e},s,o){const a=i.pluginScopeKeys(t),n=i.getOptionScopes(s,a);return e&&t.defaults&&n.push(t.defaults),i.createResolver(n,o,[""],{scriptable:!1,indexable:!1,allKeys:!0})}function ps(i,t){const e=X.datasets[i]||{};return((t.datasets||{})[i]||{}).indexAxis||t.indexAxis||e.indexAxis||"x"}function Qc(i,t){let e=i;return i==="_index_"?e=t:i==="_value_"&&(e=t==="x"?"y":"x"),e}function td(i,t){return i===t?"_index_":"_value_"}function Do(i){if(i==="x"||i==="y"||i==="r")return i}function ed(i){if(i==="top"||i==="bottom")return"x";if(i==="left"||i==="right")return"y"}function hs(i,...t){if(Do(i))return i;for(const e of t){const s=e.axis||ed(e.position)||i.length>1&&Do(i[0].toLowerCase());if(s)return s}throw new Error(`Cannot determine type of '${i}' axis. Please provide 'axis' or 'position' option.`)}function To(i,t,e){if(e[t+"AxisID"]===i)return{axis:t}}function id(i,t){if(t.data&&t.data.datasets){const e=t.data.datasets.filter(s=>s.xAxisID===i||s.yAxisID===i);if(e.length)return To(i,"x",e[0])||To(i,"y",e[0])}return{}}function sd(i,t){const e=ce[i.type]||{scales:{}},s=t.scales||{},o=ps(i.type,t),a=Object.create(null);return Object.keys(s).forEach(n=>{const r=s[n];if(!L(r))return console.error(`Invalid scale configuration for scale: ${n}`);if(r._proxy)return console.warn(`Ignoring resolver passed as options for scale: ${n}`);const l=hs(n,r,id(n,i),X.scales[r.type]),c=td(l,o),d=e.scales||{};a[n]=Ee(Object.create(null),[{axis:l},r,d[l],d[c]])}),i.data.datasets.forEach(n=>{const r=n.type||i.type,l=n.indexAxis||ps(r,t),d=(ce[r]||{}).scales||{};Object.keys(d).forEach(p=>{const h=Qc(p,l),g=n[h+"AxisID"]||h;a[g]=a[g]||Object.create(null),Ee(a[g],[{axis:h},s[g],d[p]])})}),Object.keys(a).forEach(n=>{const r=a[n];Ee(r,[X.scales[r.type],X.scale])}),a}function vn(i){const t=i.options||(i.options={});t.plugins=R(t.plugins,{}),t.scales=sd(i,t)}function yn(i){return i=i||{},i.datasets=i.datasets||[],i.labels=i.labels||[],i}function od(i){return i=i||{},i.data=yn(i.data),vn(i),i}const Eo=new Map,wn=new Set;function ni(i,t){let e=Eo.get(i);return e||(e=t(),Eo.set(i,e),wn.add(e)),e}const Se=(i,t,e)=>{const s=Gt(t,e);s!==void 0&&i.add(s)};class ad{constructor(t){this._config=od(t),this._scopeCache=new Map,this._resolverCache=new Map}get platform(){return this._config.platform}get type(){return this._config.type}set type(t){this._config.type=t}get data(){return this._config.data}set data(t){this._config.data=yn(t)}get options(){return this._config.options}set options(t){this._config.options=t}get plugins(){return this._config.plugins}update(){const t=this._config;this.clearCache(),vn(t)}clearCache(){this._scopeCache.clear(),this._resolverCache.clear()}datasetScopeKeys(t){return ni(t,()=>[[`datasets.${t}`,""]])}datasetAnimationScopeKeys(t,e){return ni(`${t}.transition.${e}`,()=>[[`datasets.${t}.transitions.${e}`,`transitions.${e}`],[`datasets.${t}`,""]])}datasetElementScopeKeys(t,e){return ni(`${t}-${e}`,()=>[[`datasets.${t}.elements.${e}`,`datasets.${t}`,`elements.${e}`,""]])}pluginScopeKeys(t){const e=t.id,s=this.type;return ni(`${s}-plugin-${e}`,()=>[[`plugins.${e}`,...t.additionalOptionScopes||[]]])}_cachedScopes(t,e){const s=this._scopeCache;let o=s.get(t);return(!o||e)&&(o=new Map,s.set(t,o)),o}getOptionScopes(t,e,s){const{options:o,type:a}=this,n=this._cachedScopes(t,s),r=n.get(e);if(r)return r;const l=new Set;e.forEach(d=>{t&&(l.add(t),d.forEach(p=>Se(l,t,p))),d.forEach(p=>Se(l,o,p)),d.forEach(p=>Se(l,ce[a]||{},p)),d.forEach(p=>Se(l,X,p)),d.forEach(p=>Se(l,ls,p))});const c=Array.from(l);return c.length===0&&c.push(Object.create(null)),wn.has(e)&&n.set(e,c),c}chartOptionScopes(){const{options:t,type:e}=this;return[t,ce[e]||{},X.datasets[e]||{},{type:e},X,ls]}resolveNamedOptions(t,e,s,o=[""]){const a={$shared:!0},{resolver:n,subPrefixes:r}=Oo(this._resolverCache,t,o);let l=n;if(rd(n,e)){a.$shared=!1,s=Yt(s)?s():s;const c=this.createResolver(t,s,r);l=xe(n,s,c)}for(const c of e)a[c]=l[c];return a}createResolver(t,e,s=[""],o){const{resolver:a}=Oo(this._resolverCache,t,s);return L(e)?xe(a,e,void 0,o):a}}function Oo(i,t,e){let s=i.get(t);s||(s=new Map,i.set(t,s));const o=e.join();let a=s.get(o);return a||(a={resolver:Ds(t,e),subPrefixes:e.filter(r=>!r.toLowerCase().includes("hover"))},s.set(o,a)),a}const nd=i=>L(i)&&Object.getOwnPropertyNames(i).some(t=>Yt(i[t]));function rd(i,t){const{isScriptable:e,isIndexable:s}=Za(i);for(const o of t){const a=e(o),n=s(o),r=(n||a)&&i[o];if(a&&(Yt(r)||nd(r))||n&&U(r))return!0}return!1}var ld="4.5.1";const cd=["top","bottom","left","right","chartArea"];function Lo(i,t){return i==="top"||i==="bottom"||cd.indexOf(i)===-1&&t==="x"}function Io(i,t){return function(e,s){return e[i]===s[i]?e[t]-s[t]:e[i]-s[i]}}function jo(i){const t=i.chart,e=t.options.animation;t.notifyPlugins("afterRender"),W(e&&e.onComplete,[i],t)}function dd(i){const t=i.chart,e=t.options.animation;W(e&&e.onProgress,[i],t)}function _n(i){return Os()&&typeof i=="string"?i=document.getElementById(i):i&&i.length&&(i=i[0]),i&&i.canvas&&(i=i.canvas),i}const bi={},Fo=i=>{const t=_n(i);return Object.values(bi).filter(e=>e.canvas===t).pop()};function pd(i,t,e){const s=Object.keys(i);for(const o of s){const a=+o;if(a>=t){const n=i[o];delete i[o],(e>0||a>t)&&(i[a+e]=n)}}}function hd(i,t,e,s){return!e||i.type==="mouseout"?null:s?t:i}class xt{static register(...t){Ct.add(...t),Bo()}static unregister(...t){Ct.remove(...t),Bo()}constructor(t,e){const s=this.config=new ad(e),o=_n(t),a=Fo(o);if(a)throw new Error("Canvas is already in use. Chart with ID '"+a.id+"' must be destroyed before the canvas with ID '"+a.canvas.id+"' can be reused.");const n=s.createResolver(s.chartOptionScopes(),this.getContext());this.platform=new(s.platform||Pc(o)),this.platform.updateConfig(s);const r=this.platform.acquireContext(o,n.aspectRatio),l=r&&r.canvas,c=l&&l.height,d=l&&l.width;if(this.id=gr(),this.ctx=r,this.canvas=l,this.width=d,this.height=c,this._options=n,this._aspectRatio=this.aspectRatio,this._layers=[],this._metasets=[],this._stacks=void 0,this.boxes=[],this.currentDevicePixelRatio=void 0,this.chartArea=void 0,this._active=[],this._lastEvent=void 0,this._listeners={},this._responsiveListeners=void 0,this._sortedMetasets=[],this.scales={},this._plugins=new Xc,this.$proxies={},this._hiddenIndices={},this.attached=!1,this._animationsDisabled=void 0,this.$context=void 0,this._doResize=Pr(p=>this.update(p),n.resizeDelay||0),this._dataChanges=[],bi[this.id]=this,!r||!l){console.error("Failed to create chart: can't acquire context from the given item");return}Dt.listen(this,"complete",jo),Dt.listen(this,"progress",dd),this._initialize(),this.attached&&this.update()}get aspectRatio(){const{options:{aspectRatio:t,maintainAspectRatio:e},width:s,height:o,_aspectRatio:a}=this;return O(t)?e&&a?a:o?s/o:null:t}get data(){return this.config.data}set data(t){this.config.data=t}get options(){return this._options}set options(t){this.config.options=t}get registry(){return Ct}_initialize(){return this.notifyPlugins("beforeInit"),this.options.responsive?this.resize():ro(this,this.options.devicePixelRatio),this.bindEvents(),this.notifyPlugins("afterInit"),this}clear(){return oo(this.canvas,this.ctx),this}stop(){return Dt.stop(this),this}resize(t,e){Dt.running(this)?this._resizeBeforeDraw={width:t,height:e}:this._resize(t,e)}_resize(t,e){const s=this.options,o=this.canvas,a=s.maintainAspectRatio&&this.aspectRatio,n=this.platform.getMaximumSize(o,t,e,a),r=s.devicePixelRatio||this.platform.getDevicePixelRatio(),l=this.width?"resize":"attach";this.width=n.width,this.height=n.height,this._aspectRatio=this.aspectRatio,ro(this,r,!0)&&(this.notifyPlugins("resize",{size:n}),W(s.onResize,[this,n],this),this.attached&&this._doResize(l)&&this.render())}ensureScalesHaveIDs(){const e=this.options.scales||{};V(e,(s,o)=>{s.id=o})}buildOrUpdateScales(){const t=this.options,e=t.scales,s=this.scales,o=Object.keys(s).reduce((n,r)=>(n[r]=!1,n),{});let a=[];e&&(a=a.concat(Object.keys(e).map(n=>{const r=e[n],l=hs(n,r),c=l==="r",d=l==="x";return{options:r,dposition:c?"chartArea":d?"bottom":"left",dtype:c?"radialLinear":d?"category":"linear"}}))),V(a,n=>{const r=n.options,l=r.id,c=hs(l,r),d=R(r.type,n.dtype);(r.position===void 0||Lo(r.position,c)!==Lo(n.dposition))&&(r.position=n.dposition),o[l]=!0;let p=null;if(l in s&&s[l].type===d)p=s[l];else{const h=Ct.getScale(d);p=new h({id:l,type:d,ctx:this.ctx,chart:this}),s[p.id]=p}p.init(r,t)}),V(o,(n,r)=>{n||delete s[r]}),V(s,n=>{ct.configure(this,n,n.options),ct.addBox(this,n)})}_updateMetasets(){const t=this._metasets,e=this.data.datasets.length,s=t.length;if(t.sort((o,a)=>o.index-a.index),s>e){for(let o=e;o<s;++o)this._destroyDatasetMeta(o);t.splice(e,s-e)}this._sortedMetasets=t.slice(0).sort(Io("order","index"))}_removeUnreferencedMetasets(){const{_metasets:t,data:{datasets:e}}=this;t.length>e.length&&delete this._stacks,t.forEach((s,o)=>{e.filter(a=>a===s._dataset).length===0&&this._destroyDatasetMeta(o)})}buildOrUpdateControllers(){const t=[],e=this.data.datasets;let s,o;for(this._removeUnreferencedMetasets(),s=0,o=e.length;s<o;s++){const a=e[s];let n=this.getDatasetMeta(s);const r=a.type||this.config.type;if(n.type&&n.type!==r&&(this._destroyDatasetMeta(s),n=this.getDatasetMeta(s)),n.type=r,n.indexAxis=a.indexAxis||ps(r,this.options),n.order=a.order||0,n.index=s,n.label=""+a.label,n.visible=this.isDatasetVisible(s),n.controller)n.controller.updateIndex(s),n.controller.linkScales();else{const l=Ct.getController(r),{datasetElementType:c,dataElementType:d}=X.datasets[r];Object.assign(l,{dataElementType:Ct.getElement(d),datasetElementType:c&&Ct.getElement(c)}),n.controller=new l(this,s),t.push(n.controller)}}return this._updateMetasets(),t}_resetElements(){V(this.data.datasets,(t,e)=>{this.getDatasetMeta(e).controller.reset()},this)}reset(){this._resetElements(),this.notifyPlugins("reset")}update(t){const e=this.config;e.update();const s=this._options=e.createResolver(e.chartOptionScopes(),this.getContext()),o=this._animationsDisabled=!s.animation;if(this._updateScales(),this._checkEventBindings(),this._updateHiddenIndices(),this._plugins.invalidate(),this.notifyPlugins("beforeUpdate",{mode:t,cancelable:!0})===!1)return;const a=this.buildOrUpdateControllers();this.notifyPlugins("beforeElementsUpdate");let n=0;for(let c=0,d=this.data.datasets.length;c<d;c++){const{controller:p}=this.getDatasetMeta(c),h=!o&&a.indexOf(p)===-1;p.buildOrUpdateElements(h),n=Math.max(+p.getMaxOverflow(),n)}n=this._minPadding=s.layout.autoPadding?n:0,this._updateLayout(n),o||V(a,c=>{c.reset()}),this._updateDatasets(t),this.notifyPlugins("afterUpdate",{mode:t}),this._layers.sort(Io("z","_idx"));const{_active:r,_lastEvent:l}=this;l?this._eventHandler(l,!0):r.length&&this._updateHoverStyles(r,r,!0),this.render()}_updateScales(){V(this.scales,t=>{ct.removeBox(this,t)}),this.ensureScalesHaveIDs(),this.buildOrUpdateScales()}_checkEventBindings(){const t=this.options,e=new Set(Object.keys(this._listeners)),s=new Set(t.events);(!Ks(e,s)||!!this._responsiveListeners!==t.responsive)&&(this.unbindEvents(),this.bindEvents())}_updateHiddenIndices(){const{_hiddenIndices:t}=this,e=this._getUniformDataChanges()||[];for(const{method:s,start:o,count:a}of e){const n=s==="_removeElements"?-a:a;pd(t,o,n)}}_getUniformDataChanges(){const t=this._dataChanges;if(!t||!t.length)return;this._dataChanges=[];const e=this.data.datasets.length,s=a=>new Set(t.filter(n=>n[0]===a).map((n,r)=>r+","+n.splice(1).join(","))),o=s(0);for(let a=1;a<e;a++)if(!Ks(o,s(a)))return;return Array.from(o).map(a=>a.split(",")).map(a=>({method:a[1],start:+a[2],count:+a[3]}))}_updateLayout(t){if(this.notifyPlugins("beforeLayout",{cancelable:!0})===!1)return;ct.update(this,this.width,this.height,t);const e=this.chartArea,s=e.width<=0||e.height<=0;this._layers=[],V(this.boxes,o=>{s&&o.position==="chartArea"||(o.configure&&o.configure(),this._layers.push(...o._layers()))},this),this._layers.forEach((o,a)=>{o._idx=a}),this.notifyPlugins("afterLayout")}_updateDatasets(t){if(this.notifyPlugins("beforeDatasetsUpdate",{mode:t,cancelable:!0})!==!1){for(let e=0,s=this.data.datasets.length;e<s;++e)this.getDatasetMeta(e).controller.configure();for(let e=0,s=this.data.datasets.length;e<s;++e)this._updateDataset(e,Yt(t)?t({datasetIndex:e}):t);this.notifyPlugins("afterDatasetsUpdate",{mode:t})}}_updateDataset(t,e){const s=this.getDatasetMeta(t),o={meta:s,index:t,mode:e,cancelable:!0};this.notifyPlugins("beforeDatasetUpdate",o)!==!1&&(s.controller._update(e),o.cancelable=!1,this.notifyPlugins("afterDatasetUpdate",o))}render(){this.notifyPlugins("beforeRender",{cancelable:!0})!==!1&&(Dt.has(this)?this.attached&&!Dt.running(this)&&Dt.start(this):(this.draw(),jo({chart:this})))}draw(){let t;if(this._resizeBeforeDraw){const{width:s,height:o}=this._resizeBeforeDraw;this._resizeBeforeDraw=null,this._resize(s,o)}if(this.clear(),this.width<=0||this.height<=0||this.notifyPlugins("beforeDraw",{cancelable:!0})===!1)return;const e=this._layers;for(t=0;t<e.length&&e[t].z<=0;++t)e[t].draw(this.chartArea);for(this._drawDatasets();t<e.length;++t)e[t].draw(this.chartArea);this.notifyPlugins("afterDraw")}_getSortedDatasetMetas(t){const e=this._sortedMetasets,s=[];let o,a;for(o=0,a=e.length;o<a;++o){const n=e[o];(!t||n.visible)&&s.push(n)}return s}getSortedVisibleDatasetMetas(){return this._getSortedDatasetMetas(!0)}_drawDatasets(){if(this.notifyPlugins("beforeDatasetsDraw",{cancelable:!0})===!1)return;const t=this.getSortedVisibleDatasetMetas();for(let e=t.length-1;e>=0;--e)this._drawDataset(t[e]);this.notifyPlugins("afterDatasetsDraw")}_drawDataset(t){const e=this.ctx,s={meta:t,index:t.index,cancelable:!0},o=dn(this,t);this.notifyPlugins("beforeDatasetDraw",s)!==!1&&(o&&Ai(e,o),t.controller.draw(),o&&Pi(e),s.cancelable=!1,this.notifyPlugins("afterDatasetDraw",s))}isPointInArea(t){return It(t,this.chartArea,this._minPadding)}getElementsAtEventForMode(t,e,s,o){const a=cc.modes[e];return typeof a=="function"?a(this,t,s,o):[]}getDatasetMeta(t){const e=this.data.datasets[t],s=this._metasets;let o=s.filter(a=>a&&a._dataset===e).pop();return o||(o={type:null,data:[],dataset:null,controller:null,hidden:null,xAxisID:null,yAxisID:null,order:e&&e.order||0,index:t,_dataset:e,_parsed:[],_sorted:!1},s.push(o)),o}getContext(){return this.$context||(this.$context=Ut(null,{chart:this,type:"chart"}))}getVisibleDatasetCount(){return this.getSortedVisibleDatasetMetas().length}isDatasetVisible(t){const e=this.data.datasets[t];if(!e)return!1;const s=this.getDatasetMeta(t);return typeof s.hidden=="boolean"?!s.hidden:!e.hidden}setDatasetVisibility(t,e){const s=this.getDatasetMeta(t);s.hidden=!e}toggleDataVisibility(t){this._hiddenIndices[t]=!this._hiddenIndices[t]}getDataVisibility(t){return!this._hiddenIndices[t]}_updateVisibility(t,e,s){const o=s?"show":"hide",a=this.getDatasetMeta(t),n=a.controller._resolveAnimations(void 0,o);Ve(e)?(a.data[e].hidden=!s,this.update()):(this.setDatasetVisibility(t,s),n.update(a,{visible:s}),this.update(r=>r.datasetIndex===t?o:void 0))}hide(t,e){this._updateVisibility(t,e,!1)}show(t,e){this._updateVisibility(t,e,!0)}_destroyDatasetMeta(t){const e=this._metasets[t];e&&e.controller&&e.controller._destroy(),delete this._metasets[t]}_stop(){let t,e;for(this.stop(),Dt.remove(this),t=0,e=this.data.datasets.length;t<e;++t)this._destroyDatasetMeta(t)}destroy(){this.notifyPlugins("beforeDestroy");const{canvas:t,ctx:e}=this;this._stop(),this.config.clearCache(),t&&(this.unbindEvents(),oo(t,e),this.platform.releaseContext(e),this.canvas=null,this.ctx=null),delete bi[this.id],this.notifyPlugins("afterDestroy")}toBase64Image(...t){return this.canvas.toDataURL(...t)}bindEvents(){this.bindUserEvents(),this.options.responsive?this.bindResponsiveEvents():this.attached=!0}bindUserEvents(){const t=this._listeners,e=this.platform,s=(a,n)=>{e.addEventListener(this,a,n),t[a]=n},o=(a,n,r)=>{a.offsetX=n,a.offsetY=r,this._eventHandler(a)};V(this.options.events,a=>s(a,o))}bindResponsiveEvents(){this._responsiveListeners||(this._responsiveListeners={});const t=this._responsiveListeners,e=this.platform,s=(l,c)=>{e.addEventListener(this,l,c),t[l]=c},o=(l,c)=>{t[l]&&(e.removeEventListener(this,l,c),delete t[l])},a=(l,c)=>{this.canvas&&this.resize(l,c)};let n;const r=()=>{o("attach",r),this.attached=!0,this.resize(),s("resize",a),s("detach",n)};n=()=>{this.attached=!1,o("resize",a),this._stop(),this._resize(0,0),s("attach",r)},e.isAttached(this.canvas)?r():n()}unbindEvents(){V(this._listeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._listeners={},V(this._responsiveListeners,(t,e)=>{this.platform.removeEventListener(this,e,t)}),this._responsiveListeners=void 0}updateHoverStyle(t,e,s){const o=s?"set":"remove";let a,n,r,l;for(e==="dataset"&&(a=this.getDatasetMeta(t[0].datasetIndex),a.controller["_"+o+"DatasetHoverStyle"]()),r=0,l=t.length;r<l;++r){n=t[r];const c=n&&this.getDatasetMeta(n.datasetIndex).controller;c&&c[o+"HoverStyle"](n.element,n.datasetIndex,n.index)}}getActiveElements(){return this._active||[]}setActiveElements(t){const e=this._active||[],s=t.map(({datasetIndex:a,index:n})=>{const r=this.getDatasetMeta(a);if(!r)throw new Error("No dataset found at index "+a);return{datasetIndex:a,element:r.data[n],index:n}});!vi(s,e)&&(this._active=s,this._lastEvent=null,this._updateHoverStyles(s,e))}notifyPlugins(t,e,s){return this._plugins.notify(this,t,e,s)}isPluginEnabled(t){return this._plugins._cache.filter(e=>e.plugin.id===t).length===1}_updateHoverStyles(t,e,s){const o=this.options.hover,a=(l,c)=>l.filter(d=>!c.some(p=>d.datasetIndex===p.datasetIndex&&d.index===p.index)),n=a(e,t),r=s?t:a(t,e);n.length&&this.updateHoverStyle(n,o.mode,!1),r.length&&o.mode&&this.updateHoverStyle(r,o.mode,!0)}_eventHandler(t,e){const s={event:t,replay:e,cancelable:!0,inChartArea:this.isPointInArea(t)},o=n=>(n.options.events||this.options.events).includes(t.native.type);if(this.notifyPlugins("beforeEvent",s,o)===!1)return;const a=this._handleEvent(t,e,s.inChartArea);return s.cancelable=!1,this.notifyPlugins("afterEvent",s,o),(a||s.changed)&&this.render(),this}_handleEvent(t,e,s){const{_active:o=[],options:a}=this,n=e,r=this._getActiveElements(t,o,s,n),l=vr(t),c=hd(t,this._lastEvent,s,l);s&&(this._lastEvent=null,W(a.onHover,[t,r,this],this),l&&W(a.onClick,[t,r,this],this));const d=!vi(r,o);return(d||e)&&(this._active=r,this._updateHoverStyles(r,o,e)),this._lastEvent=c,d}_getActiveElements(t,e,s,o){if(t.type==="mouseout")return[];if(!s)return e;const a=this.options.hover;return this.getElementsAtEventForMode(t,a.mode,a,o)}}_(xt,"defaults",X),_(xt,"instances",bi),_(xt,"overrides",ce),_(xt,"registry",Ct),_(xt,"version",ld),_(xt,"getChart",Fo);function Bo(){return V(xt.instances,i=>i._plugins.invalidate())}function gd(i,t,e){const{startAngle:s,x:o,y:a,outerRadius:n,innerRadius:r,options:l}=t,{borderWidth:c,borderJoinStyle:d}=l,p=Math.min(c/n,rt(s-e));if(i.beginPath(),i.arc(o,a,n-c/2,s+p/2,e-p/2),r>0){const h=Math.min(c/r,rt(s-e));i.arc(o,a,r+c/2,e-h/2,s+h/2,!0)}else{const h=Math.min(c/2,n*rt(s-e));if(d==="round")i.arc(o,a,h,e-F/2,s+F/2,!0);else if(d==="bevel"){const g=2*h*h,u=-g*Math.cos(e+F/2)+o,f=-g*Math.sin(e+F/2)+a,b=g*Math.cos(s+F/2)+o,m=g*Math.sin(s+F/2)+a;i.lineTo(u,f),i.lineTo(b,m)}}i.closePath(),i.moveTo(0,0),i.rect(0,0,i.canvas.width,i.canvas.height),i.clip("evenodd")}function ud(i,t,e){const{startAngle:s,pixelMargin:o,x:a,y:n,outerRadius:r,innerRadius:l}=t;let c=o/r;i.beginPath(),i.arc(a,n,r,s-c,e+c),l>o?(c=o/l,i.arc(a,n,l,e+c,s-c,!0)):i.arc(a,n,o,e+Z,s-Z),i.closePath(),i.clip()}function fd(i){return Rs(i,["outerStart","outerEnd","innerStart","innerEnd"])}function bd(i,t,e,s){const o=fd(i.options.borderRadius),a=(e-t)/2,n=Math.min(a,s*t/2),r=l=>{const c=(e-Math.min(a,l))*s/2;return et(l,0,Math.min(a,c))};return{outerStart:r(o.outerStart),outerEnd:r(o.outerEnd),innerStart:et(o.innerStart,0,n),innerEnd:et(o.innerEnd,0,n)}}function fe(i,t,e,s){return{x:e+i*Math.cos(t),y:s+i*Math.sin(t)}}function Mi(i,t,e,s,o,a){const{x:n,y:r,startAngle:l,pixelMargin:c,innerRadius:d}=t,p=Math.max(t.outerRadius+s+e-c,0),h=d>0?d+s+e+c:0;let g=0;const u=o-l;if(s){const N=d>0?d-s:0,Y=p>0?p-s:0,J=(N+Y)/2,wt=J!==0?u*J/(J+s):u;g=(u-wt)/2}const f=Math.max(.001,u*p-e/F)/p,b=(u-f)/2,m=l+b+g,x=o-b-g,{outerStart:w,outerEnd:y,innerStart:v,innerEnd:$}=bd(t,h,p,x-m),k=p-w,M=p-y,S=m+w/k,T=x-y/M,E=h+v,I=h+$,it=m+v/E,ft=x-$/I;if(i.beginPath(),a){const N=(S+T)/2;if(i.arc(n,r,p,S,N),i.arc(n,r,p,N,T),y>0){const ot=fe(M,T,n,r);i.arc(ot.x,ot.y,y,T,x+Z)}const Y=fe(I,x,n,r);if(i.lineTo(Y.x,Y.y),$>0){const ot=fe(I,ft,n,r);i.arc(ot.x,ot.y,$,x+Z,ft+Math.PI)}const J=(x-$/h+(m+v/h))/2;if(i.arc(n,r,h,x-$/h,J,!0),i.arc(n,r,h,J,m+v/h,!0),v>0){const ot=fe(E,it,n,r);i.arc(ot.x,ot.y,v,it+Math.PI,m-Z)}const wt=fe(k,m,n,r);if(i.lineTo(wt.x,wt.y),w>0){const ot=fe(k,S,n,r);i.arc(ot.x,ot.y,w,m-Z,S)}}else{i.moveTo(n,r);const N=Math.cos(S)*p+n,Y=Math.sin(S)*p+r;i.lineTo(N,Y);const J=Math.cos(T)*p+n,wt=Math.sin(T)*p+r;i.lineTo(J,wt)}i.closePath()}function md(i,t,e,s,o){const{fullCircles:a,startAngle:n,circumference:r}=t;let l=t.endAngle;if(a){Mi(i,t,e,s,l,o);for(let c=0;c<a;++c)i.fill();isNaN(r)||(l=n+(r%G||G))}return Mi(i,t,e,s,l,o),i.fill(),l}function xd(i,t,e,s,o){const{fullCircles:a,startAngle:n,circumference:r,options:l}=t,{borderWidth:c,borderJoinStyle:d,borderDash:p,borderDashOffset:h,borderRadius:g}=l,u=l.borderAlign==="inner";if(!c)return;i.setLineDash(p||[]),i.lineDashOffset=h,u?(i.lineWidth=c*2,i.lineJoin=d||"round"):(i.lineWidth=c,i.lineJoin=d||"bevel");let f=t.endAngle;if(a){Mi(i,t,e,s,f,o);for(let b=0;b<a;++b)i.stroke();isNaN(r)||(f=n+(r%G||G))}u&&ud(i,t,f),l.selfJoin&&f-n>=F&&g===0&&d!=="miter"&&gd(i,t,f),a||(Mi(i,t,e,s,f,o),i.stroke())}class Re extends Mt{constructor(e){super();_(this,"circumference");_(this,"endAngle");_(this,"fullCircles");_(this,"innerRadius");_(this,"outerRadius");_(this,"pixelMargin");_(this,"startAngle");this.options=void 0,this.circumference=void 0,this.startAngle=void 0,this.endAngle=void 0,this.innerRadius=void 0,this.outerRadius=void 0,this.pixelMargin=0,this.fullCircles=0,e&&Object.assign(this,e)}inRange(e,s,o){const a=this.getProps(["x","y"],o),{angle:n,distance:r}=Na(a,{x:e,y:s}),{startAngle:l,endAngle:c,innerRadius:d,outerRadius:p,circumference:h}=this.getProps(["startAngle","endAngle","innerRadius","outerRadius","circumference"],o),g=(this.options.spacing+this.options.borderWidth)/2,u=R(h,c-l),f=Ne(n,l,c)&&l!==c,b=u>=G||f,m=Ot(r,d+g,p+g);return b&&m}getCenterPoint(e){const{x:s,y:o,startAngle:a,endAngle:n,innerRadius:r,outerRadius:l}=this.getProps(["x","y","startAngle","endAngle","innerRadius","outerRadius"],e),{offset:c,spacing:d}=this.options,p=(a+n)/2,h=(r+l+d+c)/2;return{x:s+Math.cos(p)*h,y:o+Math.sin(p)*h}}tooltipPosition(e){return this.getCenterPoint(e)}draw(e){const{options:s,circumference:o}=this,a=(s.offset||0)/4,n=(s.spacing||0)/2,r=s.circular;if(this.pixelMargin=s.borderAlign==="inner"?.33:0,this.fullCircles=o>G?Math.floor(o/G):0,o===0||this.innerRadius<0||this.outerRadius<0)return;e.save();const l=(this.startAngle+this.endAngle)/2;e.translate(Math.cos(l)*a,Math.sin(l)*a);const c=1-Math.sin(Math.min(F,o||0)),d=a*c;e.fillStyle=s.backgroundColor,e.strokeStyle=s.borderColor,md(e,this,d,n,r),xd(e,this,d,n,r),e.restore()}}_(Re,"id","arc"),_(Re,"defaults",{borderAlign:"center",borderColor:"#fff",borderDash:[],borderDashOffset:0,borderJoinStyle:void 0,borderRadius:0,borderWidth:2,offset:0,spacing:0,angle:void 0,circular:!0,selfJoin:!1}),_(Re,"defaultRoutes",{backgroundColor:"backgroundColor"}),_(Re,"descriptors",{_scriptable:!0,_indexable:e=>e!=="borderDash"});function $n(i,t,e=t){i.lineCap=R(e.borderCapStyle,t.borderCapStyle),i.setLineDash(R(e.borderDash,t.borderDash)),i.lineDashOffset=R(e.borderDashOffset,t.borderDashOffset),i.lineJoin=R(e.borderJoinStyle,t.borderJoinStyle),i.lineWidth=R(e.borderWidth,t.borderWidth),i.strokeStyle=R(e.borderColor,t.borderColor)}function vd(i,t,e){i.lineTo(e.x,e.y)}function yd(i){return i.stepped?Nr:i.tension||i.cubicInterpolationMode==="monotone"?Hr:vd}function kn(i,t,e={}){const s=i.length,{start:o=0,end:a=s-1}=e,{start:n,end:r}=t,l=Math.max(o,n),c=Math.min(a,r),d=o<n&&a<n||o>r&&a>r;return{count:s,start:l,loop:t.loop,ilen:c<l&&!d?s+c-l:c-l}}function wd(i,t,e,s){const{points:o,options:a}=t,{count:n,start:r,loop:l,ilen:c}=kn(o,e,s),d=yd(a);let{move:p=!0,reverse:h}=s||{},g,u,f;for(g=0;g<=c;++g)u=o[(r+(h?c-g:g))%n],!u.skip&&(p?(i.moveTo(u.x,u.y),p=!1):d(i,f,u,h,a.stepped),f=u);return l&&(u=o[(r+(h?c:0))%n],d(i,f,u,h,a.stepped)),!!l}function _d(i,t,e,s){const o=t.points,{count:a,start:n,ilen:r}=kn(o,e,s),{move:l=!0,reverse:c}=s||{};let d=0,p=0,h,g,u,f,b,m;const x=y=>(n+(c?r-y:y))%a,w=()=>{f!==b&&(i.lineTo(d,b),i.lineTo(d,f),i.lineTo(d,m))};for(l&&(g=o[x(0)],i.moveTo(g.x,g.y)),h=0;h<=r;++h){if(g=o[x(h)],g.skip)continue;const y=g.x,v=g.y,$=y|0;$===u?(v<f?f=v:v>b&&(b=v),d=(p*d+y)/++p):(w(),i.lineTo(y,v),u=$,p=0,f=b=v),m=v}w()}function gs(i){const t=i.options,e=t.borderDash&&t.borderDash.length;return!i._decimated&&!i._loop&&!t.tension&&t.cubicInterpolationMode!=="monotone"&&!t.stepped&&!e?_d:wd}function $d(i){return i.stepped?wl:i.tension||i.cubicInterpolationMode==="monotone"?_l:oe}function kd(i,t,e,s){let o=t._path;o||(o=t._path=new Path2D,t.path(o,e,s)&&o.closePath()),$n(i,t.options),i.stroke(o)}function Md(i,t,e,s){const{segments:o,options:a}=t,n=gs(t);for(const r of o)$n(i,a,r.style),i.beginPath(),n(i,t,r,{start:e,end:e+s-1})&&i.closePath(),i.stroke()}const Sd=typeof Path2D=="function";function zd(i,t,e,s){Sd&&!t.options.segment?kd(i,t,e,s):Md(i,t,e,s)}class Nt extends Mt{constructor(t){super(),this.animated=!0,this.options=void 0,this._chart=void 0,this._loop=void 0,this._fullLoop=void 0,this._path=void 0,this._points=void 0,this._segments=void 0,this._decimated=!1,this._pointsUpdated=!1,this._datasetIndex=void 0,t&&Object.assign(this,t)}updateControlPoints(t,e){const s=this.options;if((s.tension||s.cubicInterpolationMode==="monotone")&&!s.stepped&&!this._pointsUpdated){const o=s.spanGaps?this._loop:this._fullLoop;gl(this._points,s,t,o,e),this._pointsUpdated=!0}}set points(t){this._points=t,delete this._segments,delete this._path,this._pointsUpdated=!1}get points(){return this._points}get segments(){return this._segments||(this._segments=Cl(this,this.options.segment))}first(){const t=this.segments,e=this.points;return t.length&&e[t[0].start]}last(){const t=this.segments,e=this.points,s=t.length;return s&&e[t[s-1].end]}interpolate(t,e){const s=this.options,o=t[e],a=this.points,n=cn(this,{property:e,start:o,end:o});if(!n.length)return;const r=[],l=$d(s);let c,d;for(c=0,d=n.length;c<d;++c){const{start:p,end:h}=n[c],g=a[p],u=a[h];if(g===u){r.push(g);continue}const f=Math.abs((o-g[e])/(u[e]-g[e])),b=l(g,u,f,s.stepped);b[e]=t[e],r.push(b)}return r.length===1?r[0]:r}pathSegment(t,e,s){return gs(this)(t,this,e,s)}path(t,e,s){const o=this.segments,a=gs(this);let n=this._loop;e=e||0,s=s||this.points.length-e;for(const r of o)n&=a(t,this,r,{start:e,end:e+s-1});return!!n}draw(t,e,s,o){const a=this.options||{};(this.points||[]).length&&a.borderWidth&&(t.save(),zd(t,this,s,o),t.restore()),this.animated&&(this._pointsUpdated=!1,this._path=void 0)}}_(Nt,"id","line"),_(Nt,"defaults",{borderCapStyle:"butt",borderDash:[],borderDashOffset:0,borderJoinStyle:"miter",borderWidth:3,capBezierPoints:!0,cubicInterpolationMode:"default",fill:!1,spanGaps:!1,stepped:!1,tension:0}),_(Nt,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"}),_(Nt,"descriptors",{_scriptable:!0,_indexable:t=>t!=="borderDash"&&t!=="fill"});function Vo(i,t,e,s){const o=i.options,{[e]:a}=i.getProps([e],s);return Math.abs(t-a)<o.radius+o.hitRadius}class mi extends Mt{constructor(e){super();_(this,"parsed");_(this,"skip");_(this,"stop");this.options=void 0,this.parsed=void 0,this.skip=void 0,this.stop=void 0,e&&Object.assign(this,e)}inRange(e,s,o){const a=this.options,{x:n,y:r}=this.getProps(["x","y"],o);return Math.pow(e-n,2)+Math.pow(s-r,2)<Math.pow(a.hitRadius+a.radius,2)}inXRange(e,s){return Vo(this,e,"x",s)}inYRange(e,s){return Vo(this,e,"y",s)}getCenterPoint(e){const{x:s,y:o}=this.getProps(["x","y"],e);return{x:s,y:o}}size(e){e=e||this.options||{};let s=e.radius||0;s=Math.max(s,s&&e.hoverRadius||0);const o=s&&e.borderWidth||0;return(s+o)*2}draw(e,s){const o=this.options;this.skip||o.radius<.1||!It(this,s,this.size(o)/2)||(e.strokeStyle=o.borderColor,e.lineWidth=o.borderWidth,e.fillStyle=o.backgroundColor,cs(e,o,this.x,this.y))}getRange(){const e=this.options||{};return e.radius+e.hitRadius}}_(mi,"id","point"),_(mi,"defaults",{borderWidth:1,hitRadius:1,hoverBorderWidth:1,hoverRadius:4,pointStyle:"circle",radius:3,rotation:0}),_(mi,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});function Mn(i,t){const{x:e,y:s,base:o,width:a,height:n}=i.getProps(["x","y","base","width","height"],t);let r,l,c,d,p;return i.horizontal?(p=n/2,r=Math.min(e,o),l=Math.max(e,o),c=s-p,d=s+p):(p=a/2,r=e-p,l=e+p,c=Math.min(s,o),d=Math.max(s,o)),{left:r,top:c,right:l,bottom:d}}function Ht(i,t,e,s){return i?0:et(t,e,s)}function Cd(i,t,e){const s=i.options.borderWidth,o=i.borderSkipped,a=Ja(s);return{t:Ht(o.top,a.top,0,e),r:Ht(o.right,a.right,0,t),b:Ht(o.bottom,a.bottom,0,e),l:Ht(o.left,a.left,0,t)}}function Ad(i,t,e){const{enableBorderRadius:s}=i.getProps(["enableBorderRadius"]),o=i.options.borderRadius,a=re(o),n=Math.min(t,e),r=i.borderSkipped,l=s||L(o);return{topLeft:Ht(!l||r.top||r.left,a.topLeft,0,n),topRight:Ht(!l||r.top||r.right,a.topRight,0,n),bottomLeft:Ht(!l||r.bottom||r.left,a.bottomLeft,0,n),bottomRight:Ht(!l||r.bottom||r.right,a.bottomRight,0,n)}}function Pd(i){const t=Mn(i),e=t.right-t.left,s=t.bottom-t.top,o=Cd(i,e/2,s/2),a=Ad(i,e/2,s/2);return{outer:{x:t.left,y:t.top,w:e,h:s,radius:a},inner:{x:t.left+o.l,y:t.top+o.t,w:e-o.l-o.r,h:s-o.t-o.b,radius:{topLeft:Math.max(0,a.topLeft-Math.max(o.t,o.l)),topRight:Math.max(0,a.topRight-Math.max(o.t,o.r)),bottomLeft:Math.max(0,a.bottomLeft-Math.max(o.b,o.l)),bottomRight:Math.max(0,a.bottomRight-Math.max(o.b,o.r))}}}}function qi(i,t,e,s){const o=t===null,a=e===null,r=i&&!(o&&a)&&Mn(i,s);return r&&(o||Ot(t,r.left,r.right))&&(a||Ot(e,r.top,r.bottom))}function Rd(i){return i.topLeft||i.topRight||i.bottomLeft||i.bottomRight}function Dd(i,t){i.rect(t.x,t.y,t.w,t.h)}function Ji(i,t,e={}){const s=i.x!==e.x?-t:0,o=i.y!==e.y?-t:0,a=(i.x+i.w!==e.x+e.w?t:0)-s,n=(i.y+i.h!==e.y+e.h?t:0)-o;return{x:i.x+s,y:i.y+o,w:i.w+a,h:i.h+n,radius:i.radius}}class xi extends Mt{constructor(t){super(),this.options=void 0,this.horizontal=void 0,this.base=void 0,this.width=void 0,this.height=void 0,this.inflateAmount=void 0,t&&Object.assign(this,t)}draw(t){const{inflateAmount:e,options:{borderColor:s,backgroundColor:o}}=this,{inner:a,outer:n}=Pd(this),r=Rd(n.radius)?He:Dd;t.save(),(n.w!==a.w||n.h!==a.h)&&(t.beginPath(),r(t,Ji(n,e,a)),t.clip(),r(t,Ji(a,-e,n)),t.fillStyle=s,t.fill("evenodd")),t.beginPath(),r(t,Ji(a,e)),t.fillStyle=o,t.fill(),t.restore()}inRange(t,e,s){return qi(this,t,e,s)}inXRange(t,e){return qi(this,t,null,e)}inYRange(t,e){return qi(this,null,t,e)}getCenterPoint(t){const{x:e,y:s,base:o,horizontal:a}=this.getProps(["x","y","base","horizontal"],t);return{x:a?(e+o)/2:e,y:a?s:(s+o)/2}}getRange(t){return t==="x"?this.width/2:this.height/2}}_(xi,"id","bar"),_(xi,"defaults",{borderSkipped:"start",borderWidth:0,borderRadius:0,inflateAmount:"auto",pointStyle:void 0}),_(xi,"defaultRoutes",{backgroundColor:"backgroundColor",borderColor:"borderColor"});var Td=Object.freeze({__proto__:null,ArcElement:Re,BarElement:xi,LineElement:Nt,PointElement:mi});const us=["rgb(54, 162, 235)","rgb(255, 99, 132)","rgb(255, 159, 64)","rgb(255, 205, 86)","rgb(75, 192, 192)","rgb(153, 102, 255)","rgb(201, 203, 207)"],No=us.map(i=>i.replace("rgb(","rgba(").replace(")",", 0.5)"));function Sn(i){return us[i%us.length]}function zn(i){return No[i%No.length]}function Ed(i,t){return i.borderColor=Sn(t),i.backgroundColor=zn(t),++t}function Od(i,t){return i.backgroundColor=i.data.map(()=>Sn(t++)),t}function Ld(i,t){return i.backgroundColor=i.data.map(()=>zn(t++)),t}function Id(i){let t=0;return(e,s)=>{const o=i.getDatasetMeta(s).controller;o instanceof ae?t=Od(e,t):o instanceof je?t=Ld(e,t):o&&(t=Ed(e,t))}}function Ho(i){let t;for(t in i)if(i[t].borderColor||i[t].backgroundColor)return!0;return!1}function jd(i){return i&&(i.borderColor||i.backgroundColor)}function Fd(){return X.borderColor!=="rgba(0,0,0,0.1)"||X.backgroundColor!=="rgba(0,0,0,0.1)"}var Bd={id:"colors",defaults:{enabled:!0,forceOverride:!1},beforeLayout(i,t,e){if(!e.enabled)return;const{data:{datasets:s},options:o}=i.config,{elements:a}=o,n=Ho(s)||jd(o)||a&&Ho(a)||Fd();if(!e.forceOverride&&n)return;const r=Id(i);s.forEach(r)}};function Vd(i,t,e,s,o){const a=o.samples||s;if(a>=e)return i.slice(t,t+e);const n=[],r=(e-2)/(a-2);let l=0;const c=t+e-1;let d=t,p,h,g,u,f;for(n[l++]=i[d],p=0;p<a-2;p++){let b=0,m=0,x;const w=Math.floor((p+1)*r)+1+t,y=Math.min(Math.floor((p+2)*r)+1,e)+t,v=y-w;for(x=w;x<y;x++)b+=i[x].x,m+=i[x].y;b/=v,m/=v;const $=Math.floor(p*r)+1+t,k=Math.min(Math.floor((p+1)*r)+1,e)+t,{x:M,y:S}=i[d];for(g=u=-1,x=$;x<k;x++)u=.5*Math.abs((M-b)*(i[x].y-S)-(M-i[x].x)*(m-S)),u>g&&(g=u,h=i[x],f=x);n[l++]=h,d=f}return n[l++]=i[c],n}function Nd(i,t,e,s){let o=0,a=0,n,r,l,c,d,p,h,g,u,f;const b=[],m=t+e-1,x=i[t].x,y=i[m].x-x;for(n=t;n<t+e;++n){r=i[n],l=(r.x-x)/y*s,c=r.y;const v=l|0;if(v===d)c<u?(u=c,p=n):c>f&&(f=c,h=n),o=(a*o+r.x)/++a;else{const $=n-1;if(!O(p)&&!O(h)){const k=Math.min(p,h),M=Math.max(p,h);k!==g&&k!==$&&b.push({...i[k],x:o}),M!==g&&M!==$&&b.push({...i[M],x:o})}n>0&&$!==g&&b.push(i[$]),b.push(r),d=v,a=0,u=f=c,p=h=g=n}}return b}function Cn(i){if(i._decimated){const t=i._data;delete i._decimated,delete i._data,Object.defineProperty(i,"data",{configurable:!0,enumerable:!0,writable:!0,value:t})}}function Wo(i){i.data.datasets.forEach(t=>{Cn(t)})}function Hd(i,t){const e=t.length;let s=0,o;const{iScale:a}=i,{min:n,max:r,minDefined:l,maxDefined:c}=a.getUserBounds();return l&&(s=et(Lt(t,a.axis,n).lo,0,e-1)),c?o=et(Lt(t,a.axis,r).hi+1,s,e)-s:o=e-s,{start:s,count:o}}var Wd={id:"decimation",defaults:{algorithm:"min-max",enabled:!1},beforeElementsUpdate:(i,t,e)=>{if(!e.enabled){Wo(i);return}const s=i.width;i.data.datasets.forEach((o,a)=>{const{_data:n,indexAxis:r}=o,l=i.getDatasetMeta(a),c=n||o.data;if(Ae([r,i.options.indexAxis])==="y"||!l.controller.supportsDecimation)return;const d=i.scales[l.xAxisID];if(d.type!=="linear"&&d.type!=="time"||i.options.parsing)return;let{start:p,count:h}=Hd(l,c);const g=e.threshold||4*s;if(h<=g){Cn(o);return}O(n)&&(o._data=c,delete o.data,Object.defineProperty(o,"data",{configurable:!0,enumerable:!0,get:function(){return this._decimated},set:function(f){this._data=f}}));let u;switch(e.algorithm){case"lttb":u=Vd(c,p,h,s,e);break;case"min-max":u=Nd(c,p,h,s);break;default:throw new Error(`Unsupported decimation algorithm '${e.algorithm}'`)}o._decimated=u})},destroy(i){Wo(i)}};function Gd(i,t,e){const s=i.segments,o=i.points,a=t.points,n=[];for(const r of s){let{start:l,end:c}=r;c=Ti(l,c,o);const d=fs(e,o[l],o[c],r.loop);if(!t.segments){n.push({source:r,target:d,start:o[l],end:o[c]});continue}const p=cn(t,d);for(const h of p){const g=fs(e,a[h.start],a[h.end],h.loop),u=ln(r,o,g);for(const f of u)n.push({source:f,target:h,start:{[e]:Go(d,g,"start",Math.max)},end:{[e]:Go(d,g,"end",Math.min)}})}}return n}function fs(i,t,e,s){if(s)return;let o=t[i],a=e[i];return i==="angle"&&(o=rt(o),a=rt(a)),{property:i,start:o,end:a}}function Yd(i,t){const{x:e=null,y:s=null}=i||{},o=t.points,a=[];return t.segments.forEach(({start:n,end:r})=>{r=Ti(n,r,o);const l=o[n],c=o[r];s!==null?(a.push({x:l.x,y:s}),a.push({x:c.x,y:s})):e!==null&&(a.push({x:e,y:l.y}),a.push({x:e,y:c.y}))}),a}function Ti(i,t,e){for(;t>i;t--){const s=e[t];if(!isNaN(s.x)&&!isNaN(s.y))break}return t}function Go(i,t,e,s){return i&&t?s(i[e],t[e]):i?i[e]:t?t[e]:0}function An(i,t){let e=[],s=!1;return U(i)?(s=!0,e=i):e=Yd(i,t),e.length?new Nt({points:e,options:{tension:0},_loop:s,_fullLoop:s}):null}function Yo(i){return i&&i.fill!==!1}function Ud(i,t,e){let o=i[t].fill;const a=[t];let n;if(!e)return o;for(;o!==!1&&a.indexOf(o)===-1;){if(!q(o))return o;if(n=i[o],!n)return!1;if(n.visible)return o;a.push(o),o=n.fill}return!1}function Xd(i,t,e){const s=Zd(i);if(L(s))return isNaN(s.value)?!1:s;let o=parseFloat(s);return q(o)&&Math.floor(o)===o?Kd(s[0],t,o,e):["origin","start","end","stack","shape"].indexOf(s)>=0&&s}function Kd(i,t,e,s){return(i==="-"||i==="+")&&(e=t+e),e===t||e<0||e>=s?!1:e}function qd(i,t){let e=null;return i==="start"?e=t.bottom:i==="end"?e=t.top:L(i)?e=t.getPixelForValue(i.value):t.getBasePixel&&(e=t.getBasePixel()),e}function Jd(i,t,e){let s;return i==="start"?s=e:i==="end"?s=t.options.reverse?t.min:t.max:L(i)?s=i.value:s=t.getBaseValue(),s}function Zd(i){const t=i.options,e=t.fill;let s=R(e&&e.target,e);return s===void 0&&(s=!!t.backgroundColor),s===!1||s===null?!1:s===!0?"origin":s}function Qd(i){const{scale:t,index:e,line:s}=i,o=[],a=s.segments,n=s.points,r=tp(t,e);r.push(An({x:null,y:t.bottom},s));for(let l=0;l<a.length;l++){const c=a[l];for(let d=c.start;d<=c.end;d++)ep(o,n[d],r)}return new Nt({points:o,options:{}})}function tp(i,t){const e=[],s=i.getMatchingVisibleMetas("line");for(let o=0;o<s.length;o++){const a=s[o];if(a.index===t)break;a.hidden||e.unshift(a.dataset)}return e}function ep(i,t,e){const s=[];for(let o=0;o<e.length;o++){const a=e[o],{first:n,last:r,point:l}=ip(a,t,"x");if(!(!l||n&&r)){if(n)s.unshift(l);else if(i.push(l),!r)break}}i.push(...s)}function ip(i,t,e){const s=i.interpolate(t,e);if(!s)return{};const o=s[e],a=i.segments,n=i.points;let r=!1,l=!1;for(let c=0;c<a.length;c++){const d=a[c],p=n[d.start][e],h=n[d.end][e];if(Ot(o,p,h)){r=o===p,l=o===h;break}}return{first:r,last:l,point:s}}class Pn{constructor(t){this.x=t.x,this.y=t.y,this.radius=t.radius}pathSegment(t,e,s){const{x:o,y:a,radius:n}=this;return e=e||{start:0,end:G},t.arc(o,a,n,e.end,e.start,!0),!s.bounds}interpolate(t){const{x:e,y:s,radius:o}=this,a=t.angle;return{x:e+Math.cos(a)*o,y:s+Math.sin(a)*o,angle:a}}}function sp(i){const{chart:t,fill:e,line:s}=i;if(q(e))return op(t,e);if(e==="stack")return Qd(i);if(e==="shape")return!0;const o=ap(i);return o instanceof Pn?o:An(o,s)}function op(i,t){const e=i.getDatasetMeta(t);return e&&i.isDatasetVisible(t)?e.dataset:null}function ap(i){return(i.scale||{}).getPointPositionForValue?rp(i):np(i)}function np(i){const{scale:t={},fill:e}=i,s=qd(e,t);if(q(s)){const o=t.isHorizontal();return{x:o?s:null,y:o?null:s}}return null}function rp(i){const{scale:t,fill:e}=i,s=t.options,o=t.getLabels().length,a=s.reverse?t.max:t.min,n=Jd(e,t,a),r=[];if(s.grid.circular){const l=t.getPointPositionForValue(0,a);return new Pn({x:l.x,y:l.y,radius:t.getDistanceFromCenterForValue(n)})}for(let l=0;l<o;++l)r.push(t.getPointPositionForValue(l,n));return r}function Zi(i,t,e){const s=sp(t),{chart:o,index:a,line:n,scale:r,axis:l}=t,c=n.options,d=c.fill,p=c.backgroundColor,{above:h=p,below:g=p}=d||{},u=o.getDatasetMeta(a),f=dn(o,u);s&&n.points.length&&(Ai(i,e),lp(i,{line:n,target:s,above:h,below:g,area:e,scale:r,axis:l,clip:f}),Pi(i))}function lp(i,t){const{line:e,target:s,above:o,below:a,area:n,scale:r,clip:l}=t,c=e._loop?"angle":t.axis;i.save();let d=a;a!==o&&(c==="x"?(Uo(i,s,n.top),Qi(i,{line:e,target:s,color:o,scale:r,property:c,clip:l}),i.restore(),i.save(),Uo(i,s,n.bottom)):c==="y"&&(Xo(i,s,n.left),Qi(i,{line:e,target:s,color:a,scale:r,property:c,clip:l}),i.restore(),i.save(),Xo(i,s,n.right),d=o)),Qi(i,{line:e,target:s,color:d,scale:r,property:c,clip:l}),i.restore()}function Uo(i,t,e){const{segments:s,points:o}=t;let a=!0,n=!1;i.beginPath();for(const r of s){const{start:l,end:c}=r,d=o[l],p=o[Ti(l,c,o)];a?(i.moveTo(d.x,d.y),a=!1):(i.lineTo(d.x,e),i.lineTo(d.x,d.y)),n=!!t.pathSegment(i,r,{move:n}),n?i.closePath():i.lineTo(p.x,e)}i.lineTo(t.first().x,e),i.closePath(),i.clip()}function Xo(i,t,e){const{segments:s,points:o}=t;let a=!0,n=!1;i.beginPath();for(const r of s){const{start:l,end:c}=r,d=o[l],p=o[Ti(l,c,o)];a?(i.moveTo(d.x,d.y),a=!1):(i.lineTo(e,d.y),i.lineTo(d.x,d.y)),n=!!t.pathSegment(i,r,{move:n}),n?i.closePath():i.lineTo(e,p.y)}i.lineTo(e,t.first().y),i.closePath(),i.clip()}function Qi(i,t){const{line:e,target:s,property:o,color:a,scale:n,clip:r}=t,l=Gd(e,s,o);for(const{source:c,target:d,start:p,end:h}of l){const{style:{backgroundColor:g=a}={}}=c,u=s!==!0;i.save(),i.fillStyle=g,cp(i,n,r,u&&fs(o,p,h)),i.beginPath();const f=!!e.pathSegment(i,c);let b;if(u){f?i.closePath():Ko(i,s,h,o);const m=!!s.pathSegment(i,d,{move:f,reverse:!0});b=f&&m,b||Ko(i,s,p,o)}i.closePath(),i.fill(b?"evenodd":"nonzero"),i.restore()}}function cp(i,t,e,s){const o=t.chart.chartArea,{property:a,start:n,end:r}=s||{};if(a==="x"||a==="y"){let l,c,d,p;a==="x"?(l=n,c=o.top,d=r,p=o.bottom):(l=o.left,c=n,d=o.right,p=r),i.beginPath(),e&&(l=Math.max(l,e.left),d=Math.min(d,e.right),c=Math.max(c,e.top),p=Math.min(p,e.bottom)),i.rect(l,c,d-l,p-c),i.clip()}}function Ko(i,t,e,s){const o=t.interpolate(e,s);o&&i.lineTo(o.x,o.y)}var dp={id:"filler",afterDatasetsUpdate(i,t,e){const s=(i.data.datasets||[]).length,o=[];let a,n,r,l;for(n=0;n<s;++n)a=i.getDatasetMeta(n),r=a.dataset,l=null,r&&r.options&&r instanceof Nt&&(l={visible:i.isDatasetVisible(n),index:n,fill:Xd(r,n,s),chart:i,axis:a.controller.options.indexAxis,scale:a.vScale,line:r}),a.$filler=l,o.push(l);for(n=0;n<s;++n)l=o[n],!(!l||l.fill===!1)&&(l.fill=Ud(o,n,e.propagate))},beforeDraw(i,t,e){const s=e.drawTime==="beforeDraw",o=i.getSortedVisibleDatasetMetas(),a=i.chartArea;for(let n=o.length-1;n>=0;--n){const r=o[n].$filler;r&&(r.line.updateControlPoints(a,r.axis),s&&r.fill&&Zi(i.ctx,r,a))}},beforeDatasetsDraw(i,t,e){if(e.drawTime!=="beforeDatasetsDraw")return;const s=i.getSortedVisibleDatasetMetas();for(let o=s.length-1;o>=0;--o){const a=s[o].$filler;Yo(a)&&Zi(i.ctx,a,i.chartArea)}},beforeDatasetDraw(i,t,e){const s=t.meta.$filler;!Yo(s)||e.drawTime!=="beforeDatasetDraw"||Zi(i.ctx,s,i.chartArea)},defaults:{propagate:!0,drawTime:"beforeDatasetDraw"}};const qo=(i,t)=>{let{boxHeight:e=t,boxWidth:s=t}=i;return i.usePointStyle&&(e=Math.min(e,t),s=i.pointStyleWidth||Math.min(s,t)),{boxWidth:s,boxHeight:e,itemHeight:Math.max(t,e)}},pp=(i,t)=>i!==null&&t!==null&&i.datasetIndex===t.datasetIndex&&i.index===t.index;class Jo extends Mt{constructor(t){super(),this._added=!1,this.legendHitBoxes=[],this._hoveredItem=null,this.doughnutMode=!1,this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this.legendItems=void 0,this.columnSizes=void 0,this.lineWidths=void 0,this.maxHeight=void 0,this.maxWidth=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.height=void 0,this.width=void 0,this._margins=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e,s){this.maxWidth=t,this.maxHeight=e,this._margins=s,this.setDimensions(),this.buildLabels(),this.fit()}setDimensions(){this.isHorizontal()?(this.width=this.maxWidth,this.left=this._margins.left,this.right=this.width):(this.height=this.maxHeight,this.top=this._margins.top,this.bottom=this.height)}buildLabels(){const t=this.options.labels||{};let e=W(t.generateLabels,[this.chart],this)||[];t.filter&&(e=e.filter(s=>t.filter(s,this.chart.data))),t.sort&&(e=e.sort((s,o)=>t.sort(s,o,this.chart.data))),this.options.reverse&&e.reverse(),this.legendItems=e}fit(){const{options:t,ctx:e}=this;if(!t.display){this.width=this.height=0;return}const s=t.labels,o=tt(s.font),a=o.size,n=this._computeTitleHeight(),{boxWidth:r,itemHeight:l}=qo(s,a);let c,d;e.font=o.string,this.isHorizontal()?(c=this.maxWidth,d=this._fitRows(n,a,r,l)+10):(d=this.maxHeight,c=this._fitCols(n,o,r,l)+10),this.width=Math.min(c,t.maxWidth||this.maxWidth),this.height=Math.min(d,t.maxHeight||this.maxHeight)}_fitRows(t,e,s,o){const{ctx:a,maxWidth:n,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],c=this.lineWidths=[0],d=o+r;let p=t;a.textAlign="left",a.textBaseline="middle";let h=-1,g=-d;return this.legendItems.forEach((u,f)=>{const b=s+e/2+a.measureText(u.text).width;(f===0||c[c.length-1]+b+2*r>n)&&(p+=d,c[c.length-(f>0?0:1)]=0,g+=d,h++),l[f]={left:0,top:g,row:h,width:b,height:o},c[c.length-1]+=b+r}),p}_fitCols(t,e,s,o){const{ctx:a,maxHeight:n,options:{labels:{padding:r}}}=this,l=this.legendHitBoxes=[],c=this.columnSizes=[],d=n-t;let p=r,h=0,g=0,u=0,f=0;return this.legendItems.forEach((b,m)=>{const{itemWidth:x,itemHeight:w}=hp(s,e,a,b,o);m>0&&g+w+2*r>d&&(p+=h+r,c.push({width:h,height:g}),u+=h+r,f++,h=g=0),l[m]={left:u,top:g,col:f,width:x,height:w},h=Math.max(h,x),g+=w+r}),p+=h,c.push({width:h,height:g}),p}adjustHitBoxes(){if(!this.options.display)return;const t=this._computeTitleHeight(),{legendHitBoxes:e,options:{align:s,labels:{padding:o},rtl:a}}=this,n=be(a,this.left,this.width);if(this.isHorizontal()){let r=0,l=nt(s,this.left+o,this.right-this.lineWidths[r]);for(const c of e)r!==c.row&&(r=c.row,l=nt(s,this.left+o,this.right-this.lineWidths[r])),c.top+=this.top+t+o,c.left=n.leftForLtr(n.x(l),c.width),l+=c.width+o}else{let r=0,l=nt(s,this.top+t+o,this.bottom-this.columnSizes[r].height);for(const c of e)c.col!==r&&(r=c.col,l=nt(s,this.top+t+o,this.bottom-this.columnSizes[r].height)),c.top=l,c.left+=this.left+o,c.left=n.leftForLtr(n.x(c.left),c.width),l+=c.height+o}}isHorizontal(){return this.options.position==="top"||this.options.position==="bottom"}draw(){if(this.options.display){const t=this.ctx;Ai(t,this),this._draw(),Pi(t)}}_draw(){const{options:t,columnSizes:e,lineWidths:s,ctx:o}=this,{align:a,labels:n}=t,r=X.color,l=be(t.rtl,this.left,this.width),c=tt(n.font),{padding:d}=n,p=c.size,h=p/2;let g;this.drawTitle(),o.textAlign=l.textAlign("left"),o.textBaseline="middle",o.lineWidth=.5,o.font=c.string;const{boxWidth:u,boxHeight:f,itemHeight:b}=qo(n,p),m=function($,k,M){if(isNaN(u)||u<=0||isNaN(f)||f<0)return;o.save();const S=R(M.lineWidth,1);if(o.fillStyle=R(M.fillStyle,r),o.lineCap=R(M.lineCap,"butt"),o.lineDashOffset=R(M.lineDashOffset,0),o.lineJoin=R(M.lineJoin,"miter"),o.lineWidth=S,o.strokeStyle=R(M.strokeStyle,r),o.setLineDash(R(M.lineDash,[])),n.usePointStyle){const T={radius:f*Math.SQRT2/2,pointStyle:M.pointStyle,rotation:M.rotation,borderWidth:S},E=l.xPlus($,u/2),I=k+h;qa(o,T,E,I,n.pointStyleWidth&&u)}else{const T=k+Math.max((p-f)/2,0),E=l.leftForLtr($,u),I=re(M.borderRadius);o.beginPath(),Object.values(I).some(it=>it!==0)?He(o,{x:E,y:T,w:u,h:f,radius:I}):o.rect(E,T,u,f),o.fill(),S!==0&&o.stroke()}o.restore()},x=function($,k,M){de(o,M.text,$,k+b/2,c,{strikethrough:M.hidden,textAlign:l.textAlign(M.textAlign)})},w=this.isHorizontal(),y=this._computeTitleHeight();w?g={x:nt(a,this.left+d,this.right-s[0]),y:this.top+d+y,line:0}:g={x:this.left+d,y:nt(a,this.top+y+d,this.bottom-e[0].height),line:0},an(this.ctx,t.textDirection);const v=b+d;this.legendItems.forEach(($,k)=>{o.strokeStyle=$.fontColor,o.fillStyle=$.fontColor;const M=o.measureText($.text).width,S=l.textAlign($.textAlign||($.textAlign=n.textAlign)),T=u+h+M;let E=g.x,I=g.y;l.setWidth(this.width),w?k>0&&E+T+d>this.right&&(I=g.y+=v,g.line++,E=g.x=nt(a,this.left+d,this.right-s[g.line])):k>0&&I+v>this.bottom&&(E=g.x=E+e[g.line].width+d,g.line++,I=g.y=nt(a,this.top+y+d,this.bottom-e[g.line].height));const it=l.x(E);if(m(it,I,$),E=Rr(S,E+u+h,w?E+T:this.right,t.rtl),x(l.x(E),I,$),w)g.x+=T+d;else if(typeof $.text!="string"){const ft=c.lineHeight;g.y+=Rn($,ft)+d}else g.y+=v}),nn(this.ctx,t.textDirection)}drawTitle(){const t=this.options,e=t.title,s=tt(e.font),o=dt(e.padding);if(!e.display)return;const a=be(t.rtl,this.left,this.width),n=this.ctx,r=e.position,l=s.size/2,c=o.top+l;let d,p=this.left,h=this.width;if(this.isHorizontal())h=Math.max(...this.lineWidths),d=this.top+c,p=nt(t.align,p,this.right-h);else{const u=this.columnSizes.reduce((f,b)=>Math.max(f,b.height),0);d=c+nt(t.align,this.top,this.bottom-u-t.labels.padding-this._computeTitleHeight())}const g=nt(r,p,p+h);n.textAlign=a.textAlign(As(r)),n.textBaseline="middle",n.strokeStyle=e.color,n.fillStyle=e.color,n.font=s.string,de(n,e.text,g,d,s)}_computeTitleHeight(){const t=this.options.title,e=tt(t.font),s=dt(t.padding);return t.display?e.lineHeight+s.height:0}_getLegendItemAt(t,e){let s,o,a;if(Ot(t,this.left,this.right)&&Ot(e,this.top,this.bottom)){for(a=this.legendHitBoxes,s=0;s<a.length;++s)if(o=a[s],Ot(t,o.left,o.left+o.width)&&Ot(e,o.top,o.top+o.height))return this.legendItems[s]}return null}handleEvent(t){const e=this.options;if(!fp(t.type,e))return;const s=this._getLegendItemAt(t.x,t.y);if(t.type==="mousemove"||t.type==="mouseout"){const o=this._hoveredItem,a=pp(o,s);o&&!a&&W(e.onLeave,[t,o,this],this),this._hoveredItem=s,s&&!a&&W(e.onHover,[t,s,this],this)}else s&&W(e.onClick,[t,s,this],this)}}function hp(i,t,e,s,o){const a=gp(s,i,t,e),n=up(o,s,t.lineHeight);return{itemWidth:a,itemHeight:n}}function gp(i,t,e,s){let o=i.text;return o&&typeof o!="string"&&(o=o.reduce((a,n)=>a.length>n.length?a:n)),t+e.size/2+s.measureText(o).width}function up(i,t,e){let s=i;return typeof t.text!="string"&&(s=Rn(t,e)),s}function Rn(i,t){const e=i.text?i.text.length:0;return t*e}function fp(i,t){return!!((i==="mousemove"||i==="mouseout")&&(t.onHover||t.onLeave)||t.onClick&&(i==="click"||i==="mouseup"))}var bp={id:"legend",_element:Jo,start(i,t,e){const s=i.legend=new Jo({ctx:i.ctx,options:e,chart:i});ct.configure(i,s,e),ct.addBox(i,s)},stop(i){ct.removeBox(i,i.legend),delete i.legend},beforeUpdate(i,t,e){const s=i.legend;ct.configure(i,s,e),s.options=e},afterUpdate(i){const t=i.legend;t.buildLabels(),t.adjustHitBoxes()},afterEvent(i,t){t.replay||i.legend.handleEvent(t.event)},defaults:{display:!0,position:"top",align:"center",fullSize:!0,reverse:!1,weight:1e3,onClick(i,t,e){const s=t.datasetIndex,o=e.chart;o.isDatasetVisible(s)?(o.hide(s),t.hidden=!0):(o.show(s),t.hidden=!1)},onHover:null,onLeave:null,labels:{color:i=>i.chart.options.color,boxWidth:40,padding:10,generateLabels(i){const t=i.data.datasets,{labels:{usePointStyle:e,pointStyle:s,textAlign:o,color:a,useBorderRadius:n,borderRadius:r}}=i.legend.options;return i._getSortedDatasetMetas().map(l=>{const c=l.controller.getStyle(e?0:void 0),d=dt(c.borderWidth);return{text:t[l.index].label,fillStyle:c.backgroundColor,fontColor:a,hidden:!l.visible,lineCap:c.borderCapStyle,lineDash:c.borderDash,lineDashOffset:c.borderDashOffset,lineJoin:c.borderJoinStyle,lineWidth:(d.width+d.height)/4,strokeStyle:c.borderColor,pointStyle:s||c.pointStyle,rotation:c.rotation,textAlign:o||c.textAlign,borderRadius:n&&(r||c.borderRadius),datasetIndex:l.index}},this)}},title:{color:i=>i.chart.options.color,display:!1,position:"center",text:""}},descriptors:{_scriptable:i=>!i.startsWith("on"),labels:{_scriptable:i=>!["generateLabels","filter","sort"].includes(i)}}};class js extends Mt{constructor(t){super(),this.chart=t.chart,this.options=t.options,this.ctx=t.ctx,this._padding=void 0,this.top=void 0,this.bottom=void 0,this.left=void 0,this.right=void 0,this.width=void 0,this.height=void 0,this.position=void 0,this.weight=void 0,this.fullSize=void 0}update(t,e){const s=this.options;if(this.left=0,this.top=0,!s.display){this.width=this.height=this.right=this.bottom=0;return}this.width=this.right=t,this.height=this.bottom=e;const o=U(s.text)?s.text.length:1;this._padding=dt(s.padding);const a=o*tt(s.font).lineHeight+this._padding.height;this.isHorizontal()?this.height=a:this.width=a}isHorizontal(){const t=this.options.position;return t==="top"||t==="bottom"}_drawArgs(t){const{top:e,left:s,bottom:o,right:a,options:n}=this,r=n.align;let l=0,c,d,p;return this.isHorizontal()?(d=nt(r,s,a),p=e+t,c=a-s):(n.position==="left"?(d=s+t,p=nt(r,o,e),l=F*-.5):(d=a-t,p=nt(r,e,o),l=F*.5),c=o-e),{titleX:d,titleY:p,maxWidth:c,rotation:l}}draw(){const t=this.ctx,e=this.options;if(!e.display)return;const s=tt(e.font),a=s.lineHeight/2+this._padding.top,{titleX:n,titleY:r,maxWidth:l,rotation:c}=this._drawArgs(a);de(t,e.text,0,0,s,{color:e.color,maxWidth:l,rotation:c,textAlign:As(e.align),textBaseline:"middle",translation:[n,r]})}}function mp(i,t){const e=new js({ctx:i.ctx,options:t,chart:i});ct.configure(i,e,t),ct.addBox(i,e),i.titleBlock=e}var xp={id:"title",_element:js,start(i,t,e){mp(i,e)},stop(i){const t=i.titleBlock;ct.removeBox(i,t),delete i.titleBlock},beforeUpdate(i,t,e){const s=i.titleBlock;ct.configure(i,s,e),s.options=e},defaults:{align:"center",display:!1,font:{weight:"bold"},fullSize:!0,padding:10,position:"top",text:"",weight:2e3},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const ri=new WeakMap;var vp={id:"subtitle",start(i,t,e){const s=new js({ctx:i.ctx,options:e,chart:i});ct.configure(i,s,e),ct.addBox(i,s),ri.set(i,s)},stop(i){ct.removeBox(i,ri.get(i)),ri.delete(i)},beforeUpdate(i,t,e){const s=ri.get(i);ct.configure(i,s,e),s.options=e},defaults:{align:"center",display:!1,font:{weight:"normal"},fullSize:!0,padding:0,position:"top",text:"",weight:1500},defaultRoutes:{color:"color"},descriptors:{_scriptable:!0,_indexable:!1}};const De={average(i){if(!i.length)return!1;let t,e,s=new Set,o=0,a=0;for(t=0,e=i.length;t<e;++t){const r=i[t].element;if(r&&r.hasValue()){const l=r.tooltipPosition();s.add(l.x),o+=l.y,++a}}return a===0||s.size===0?!1:{x:[...s].reduce((r,l)=>r+l)/s.size,y:o/a}},nearest(i,t){if(!i.length)return!1;let e=t.x,s=t.y,o=Number.POSITIVE_INFINITY,a,n,r;for(a=0,n=i.length;a<n;++a){const l=i[a].element;if(l&&l.hasValue()){const c=l.getCenterPoint(),d=rs(t,c);d<o&&(o=d,r=l)}}if(r){const l=r.tooltipPosition();e=l.x,s=l.y}return{x:e,y:s}}};function zt(i,t){return t&&(U(t)?Array.prototype.push.apply(i,t):i.push(t)),i}function Tt(i){return(typeof i=="string"||i instanceof String)&&i.indexOf(`
`)>-1?i.split(`
`):i}function yp(i,t){const{element:e,datasetIndex:s,index:o}=t,a=i.getDatasetMeta(s).controller,{label:n,value:r}=a.getLabelAndValue(o);return{chart:i,label:n,parsed:a.getParsed(o),raw:i.data.datasets[s].data[o],formattedValue:r,dataset:a.getDataset(),dataIndex:o,datasetIndex:s,element:e}}function Zo(i,t){const e=i.chart.ctx,{body:s,footer:o,title:a}=i,{boxWidth:n,boxHeight:r}=t,l=tt(t.bodyFont),c=tt(t.titleFont),d=tt(t.footerFont),p=a.length,h=o.length,g=s.length,u=dt(t.padding);let f=u.height,b=0,m=s.reduce((y,v)=>y+v.before.length+v.lines.length+v.after.length,0);if(m+=i.beforeBody.length+i.afterBody.length,p&&(f+=p*c.lineHeight+(p-1)*t.titleSpacing+t.titleMarginBottom),m){const y=t.displayColors?Math.max(r,l.lineHeight):l.lineHeight;f+=g*y+(m-g)*l.lineHeight+(m-1)*t.bodySpacing}h&&(f+=t.footerMarginTop+h*d.lineHeight+(h-1)*t.footerSpacing);let x=0;const w=function(y){b=Math.max(b,e.measureText(y).width+x)};return e.save(),e.font=c.string,V(i.title,w),e.font=l.string,V(i.beforeBody.concat(i.afterBody),w),x=t.displayColors?n+2+t.boxPadding:0,V(s,y=>{V(y.before,w),V(y.lines,w),V(y.after,w)}),x=0,e.font=d.string,V(i.footer,w),e.restore(),b+=u.width,{width:b,height:f}}function wp(i,t){const{y:e,height:s}=t;return e<s/2?"top":e>i.height-s/2?"bottom":"center"}function _p(i,t,e,s){const{x:o,width:a}=s,n=e.caretSize+e.caretPadding;if(i==="left"&&o+a+n>t.width||i==="right"&&o-a-n<0)return!0}function $p(i,t,e,s){const{x:o,width:a}=e,{width:n,chartArea:{left:r,right:l}}=i;let c="center";return s==="center"?c=o<=(r+l)/2?"left":"right":o<=a/2?c="left":o>=n-a/2&&(c="right"),_p(c,i,t,e)&&(c="center"),c}function Qo(i,t,e){const s=e.yAlign||t.yAlign||wp(i,e);return{xAlign:e.xAlign||t.xAlign||$p(i,t,e,s),yAlign:s}}function kp(i,t){let{x:e,width:s}=i;return t==="right"?e-=s:t==="center"&&(e-=s/2),e}function Mp(i,t,e){let{y:s,height:o}=i;return t==="top"?s+=e:t==="bottom"?s-=o+e:s-=o/2,s}function ta(i,t,e,s){const{caretSize:o,caretPadding:a,cornerRadius:n}=i,{xAlign:r,yAlign:l}=e,c=o+a,{topLeft:d,topRight:p,bottomLeft:h,bottomRight:g}=re(n);let u=kp(t,r);const f=Mp(t,l,c);return l==="center"?r==="left"?u+=c:r==="right"&&(u-=c):r==="left"?u-=Math.max(d,h)+o:r==="right"&&(u+=Math.max(p,g)+o),{x:et(u,0,s.width-t.width),y:et(f,0,s.height-t.height)}}function li(i,t,e){const s=dt(e.padding);return t==="center"?i.x+i.width/2:t==="right"?i.x+i.width-s.right:i.x+s.left}function ea(i){return zt([],Tt(i))}function Sp(i,t,e){return Ut(i,{tooltip:t,tooltipItems:e,type:"tooltip"})}function ia(i,t){const e=t&&t.dataset&&t.dataset.tooltip&&t.dataset.tooltip.callbacks;return e?i.override(e):i}const Dn={beforeTitle:Rt,title(i){if(i.length>0){const t=i[0],e=t.chart.data.labels,s=e?e.length:0;if(this&&this.options&&this.options.mode==="dataset")return t.dataset.label||"";if(t.label)return t.label;if(s>0&&t.dataIndex<s)return e[t.dataIndex]}return""},afterTitle:Rt,beforeBody:Rt,beforeLabel:Rt,label(i){if(this&&this.options&&this.options.mode==="dataset")return i.label+": "+i.formattedValue||i.formattedValue;let t=i.dataset.label||"";t&&(t+=": ");const e=i.formattedValue;return O(e)||(t+=e),t},labelColor(i){const e=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{borderColor:e.borderColor,backgroundColor:e.backgroundColor,borderWidth:e.borderWidth,borderDash:e.borderDash,borderDashOffset:e.borderDashOffset,borderRadius:0}},labelTextColor(){return this.options.bodyColor},labelPointStyle(i){const e=i.chart.getDatasetMeta(i.datasetIndex).controller.getStyle(i.dataIndex);return{pointStyle:e.pointStyle,rotation:e.rotation}},afterLabel:Rt,afterBody:Rt,beforeFooter:Rt,footer:Rt,afterFooter:Rt};function pt(i,t,e,s){const o=i[t].call(e,s);return typeof o>"u"?Dn[t].call(e,s):o}class bs extends Mt{constructor(t){super(),this.opacity=0,this._active=[],this._eventPosition=void 0,this._size=void 0,this._cachedAnimations=void 0,this._tooltipItems=[],this.$animations=void 0,this.$context=void 0,this.chart=t.chart,this.options=t.options,this.dataPoints=void 0,this.title=void 0,this.beforeBody=void 0,this.body=void 0,this.afterBody=void 0,this.footer=void 0,this.xAlign=void 0,this.yAlign=void 0,this.x=void 0,this.y=void 0,this.height=void 0,this.width=void 0,this.caretX=void 0,this.caretY=void 0,this.labelColors=void 0,this.labelPointStyles=void 0,this.labelTextColors=void 0}initialize(t){this.options=t,this._cachedAnimations=void 0,this.$context=void 0}_resolveAnimations(){const t=this._cachedAnimations;if(t)return t;const e=this.chart,s=this.options.setContext(this.getContext()),o=s.enabled&&e.options.animation&&s.animations,a=new pn(this.chart,o);return o._cacheable&&(this._cachedAnimations=Object.freeze(a)),a}getContext(){return this.$context||(this.$context=Sp(this.chart.getContext(),this,this._tooltipItems))}getTitle(t,e){const{callbacks:s}=e,o=pt(s,"beforeTitle",this,t),a=pt(s,"title",this,t),n=pt(s,"afterTitle",this,t);let r=[];return r=zt(r,Tt(o)),r=zt(r,Tt(a)),r=zt(r,Tt(n)),r}getBeforeBody(t,e){return ea(pt(e.callbacks,"beforeBody",this,t))}getBody(t,e){const{callbacks:s}=e,o=[];return V(t,a=>{const n={before:[],lines:[],after:[]},r=ia(s,a);zt(n.before,Tt(pt(r,"beforeLabel",this,a))),zt(n.lines,pt(r,"label",this,a)),zt(n.after,Tt(pt(r,"afterLabel",this,a))),o.push(n)}),o}getAfterBody(t,e){return ea(pt(e.callbacks,"afterBody",this,t))}getFooter(t,e){const{callbacks:s}=e,o=pt(s,"beforeFooter",this,t),a=pt(s,"footer",this,t),n=pt(s,"afterFooter",this,t);let r=[];return r=zt(r,Tt(o)),r=zt(r,Tt(a)),r=zt(r,Tt(n)),r}_createItems(t){const e=this._active,s=this.chart.data,o=[],a=[],n=[];let r=[],l,c;for(l=0,c=e.length;l<c;++l)r.push(yp(this.chart,e[l]));return t.filter&&(r=r.filter((d,p,h)=>t.filter(d,p,h,s))),t.itemSort&&(r=r.sort((d,p)=>t.itemSort(d,p,s))),V(r,d=>{const p=ia(t.callbacks,d);o.push(pt(p,"labelColor",this,d)),a.push(pt(p,"labelPointStyle",this,d)),n.push(pt(p,"labelTextColor",this,d))}),this.labelColors=o,this.labelPointStyles=a,this.labelTextColors=n,this.dataPoints=r,r}update(t,e){const s=this.options.setContext(this.getContext()),o=this._active;let a,n=[];if(!o.length)this.opacity!==0&&(a={opacity:0});else{const r=De[s.position].call(this,o,this._eventPosition);n=this._createItems(s),this.title=this.getTitle(n,s),this.beforeBody=this.getBeforeBody(n,s),this.body=this.getBody(n,s),this.afterBody=this.getAfterBody(n,s),this.footer=this.getFooter(n,s);const l=this._size=Zo(this,s),c=Object.assign({},r,l),d=Qo(this.chart,s,c),p=ta(s,c,d,this.chart);this.xAlign=d.xAlign,this.yAlign=d.yAlign,a={opacity:1,x:p.x,y:p.y,width:l.width,height:l.height,caretX:r.x,caretY:r.y}}this._tooltipItems=n,this.$context=void 0,a&&this._resolveAnimations().update(this,a),t&&s.external&&s.external.call(this,{chart:this.chart,tooltip:this,replay:e})}drawCaret(t,e,s,o){const a=this.getCaretPosition(t,s,o);e.lineTo(a.x1,a.y1),e.lineTo(a.x2,a.y2),e.lineTo(a.x3,a.y3)}getCaretPosition(t,e,s){const{xAlign:o,yAlign:a}=this,{caretSize:n,cornerRadius:r}=s,{topLeft:l,topRight:c,bottomLeft:d,bottomRight:p}=re(r),{x:h,y:g}=t,{width:u,height:f}=e;let b,m,x,w,y,v;return a==="center"?(y=g+f/2,o==="left"?(b=h,m=b-n,w=y+n,v=y-n):(b=h+u,m=b+n,w=y-n,v=y+n),x=b):(o==="left"?m=h+Math.max(l,d)+n:o==="right"?m=h+u-Math.max(c,p)-n:m=this.caretX,a==="top"?(w=g,y=w-n,b=m-n,x=m+n):(w=g+f,y=w+n,b=m+n,x=m-n),v=w),{x1:b,x2:m,x3:x,y1:w,y2:y,y3:v}}drawTitle(t,e,s){const o=this.title,a=o.length;let n,r,l;if(a){const c=be(s.rtl,this.x,this.width);for(t.x=li(this,s.titleAlign,s),e.textAlign=c.textAlign(s.titleAlign),e.textBaseline="middle",n=tt(s.titleFont),r=s.titleSpacing,e.fillStyle=s.titleColor,e.font=n.string,l=0;l<a;++l)e.fillText(o[l],c.x(t.x),t.y+n.lineHeight/2),t.y+=n.lineHeight+r,l+1===a&&(t.y+=s.titleMarginBottom-r)}}_drawColorBox(t,e,s,o,a){const n=this.labelColors[s],r=this.labelPointStyles[s],{boxHeight:l,boxWidth:c}=a,d=tt(a.bodyFont),p=li(this,"left",a),h=o.x(p),g=l<d.lineHeight?(d.lineHeight-l)/2:0,u=e.y+g;if(a.usePointStyle){const f={radius:Math.min(c,l)/2,pointStyle:r.pointStyle,rotation:r.rotation,borderWidth:1},b=o.leftForLtr(h,c)+c/2,m=u+l/2;t.strokeStyle=a.multiKeyBackground,t.fillStyle=a.multiKeyBackground,cs(t,f,b,m),t.strokeStyle=n.borderColor,t.fillStyle=n.backgroundColor,cs(t,f,b,m)}else{t.lineWidth=L(n.borderWidth)?Math.max(...Object.values(n.borderWidth)):n.borderWidth||1,t.strokeStyle=n.borderColor,t.setLineDash(n.borderDash||[]),t.lineDashOffset=n.borderDashOffset||0;const f=o.leftForLtr(h,c),b=o.leftForLtr(o.xPlus(h,1),c-2),m=re(n.borderRadius);Object.values(m).some(x=>x!==0)?(t.beginPath(),t.fillStyle=a.multiKeyBackground,He(t,{x:f,y:u,w:c,h:l,radius:m}),t.fill(),t.stroke(),t.fillStyle=n.backgroundColor,t.beginPath(),He(t,{x:b,y:u+1,w:c-2,h:l-2,radius:m}),t.fill()):(t.fillStyle=a.multiKeyBackground,t.fillRect(f,u,c,l),t.strokeRect(f,u,c,l),t.fillStyle=n.backgroundColor,t.fillRect(b,u+1,c-2,l-2))}t.fillStyle=this.labelTextColors[s]}drawBody(t,e,s){const{body:o}=this,{bodySpacing:a,bodyAlign:n,displayColors:r,boxHeight:l,boxWidth:c,boxPadding:d}=s,p=tt(s.bodyFont);let h=p.lineHeight,g=0;const u=be(s.rtl,this.x,this.width),f=function(M){e.fillText(M,u.x(t.x+g),t.y+h/2),t.y+=h+a},b=u.textAlign(n);let m,x,w,y,v,$,k;for(e.textAlign=n,e.textBaseline="middle",e.font=p.string,t.x=li(this,b,s),e.fillStyle=s.bodyColor,V(this.beforeBody,f),g=r&&b!=="right"?n==="center"?c/2+d:c+2+d:0,y=0,$=o.length;y<$;++y){for(m=o[y],x=this.labelTextColors[y],e.fillStyle=x,V(m.before,f),w=m.lines,r&&w.length&&(this._drawColorBox(e,t,y,u,s),h=Math.max(p.lineHeight,l)),v=0,k=w.length;v<k;++v)f(w[v]),h=p.lineHeight;V(m.after,f)}g=0,h=p.lineHeight,V(this.afterBody,f),t.y-=a}drawFooter(t,e,s){const o=this.footer,a=o.length;let n,r;if(a){const l=be(s.rtl,this.x,this.width);for(t.x=li(this,s.footerAlign,s),t.y+=s.footerMarginTop,e.textAlign=l.textAlign(s.footerAlign),e.textBaseline="middle",n=tt(s.footerFont),e.fillStyle=s.footerColor,e.font=n.string,r=0;r<a;++r)e.fillText(o[r],l.x(t.x),t.y+n.lineHeight/2),t.y+=n.lineHeight+s.footerSpacing}}drawBackground(t,e,s,o){const{xAlign:a,yAlign:n}=this,{x:r,y:l}=t,{width:c,height:d}=s,{topLeft:p,topRight:h,bottomLeft:g,bottomRight:u}=re(o.cornerRadius);e.fillStyle=o.backgroundColor,e.strokeStyle=o.borderColor,e.lineWidth=o.borderWidth,e.beginPath(),e.moveTo(r+p,l),n==="top"&&this.drawCaret(t,e,s,o),e.lineTo(r+c-h,l),e.quadraticCurveTo(r+c,l,r+c,l+h),n==="center"&&a==="right"&&this.drawCaret(t,e,s,o),e.lineTo(r+c,l+d-u),e.quadraticCurveTo(r+c,l+d,r+c-u,l+d),n==="bottom"&&this.drawCaret(t,e,s,o),e.lineTo(r+g,l+d),e.quadraticCurveTo(r,l+d,r,l+d-g),n==="center"&&a==="left"&&this.drawCaret(t,e,s,o),e.lineTo(r,l+p),e.quadraticCurveTo(r,l,r+p,l),e.closePath(),e.fill(),o.borderWidth>0&&e.stroke()}_updateAnimationTarget(t){const e=this.chart,s=this.$animations,o=s&&s.x,a=s&&s.y;if(o||a){const n=De[t.position].call(this,this._active,this._eventPosition);if(!n)return;const r=this._size=Zo(this,t),l=Object.assign({},n,this._size),c=Qo(e,t,l),d=ta(t,l,c,e);(o._to!==d.x||a._to!==d.y)&&(this.xAlign=c.xAlign,this.yAlign=c.yAlign,this.width=r.width,this.height=r.height,this.caretX=n.x,this.caretY=n.y,this._resolveAnimations().update(this,d))}}_willRender(){return!!this.opacity}draw(t){const e=this.options.setContext(this.getContext());let s=this.opacity;if(!s)return;this._updateAnimationTarget(e);const o={width:this.width,height:this.height},a={x:this.x,y:this.y};s=Math.abs(s)<.001?0:s;const n=dt(e.padding),r=this.title.length||this.beforeBody.length||this.body.length||this.afterBody.length||this.footer.length;e.enabled&&r&&(t.save(),t.globalAlpha=s,this.drawBackground(a,t,o,e),an(t,e.textDirection),a.y+=n.top,this.drawTitle(a,t,e),this.drawBody(a,t,e),this.drawFooter(a,t,e),nn(t,e.textDirection),t.restore())}getActiveElements(){return this._active||[]}setActiveElements(t,e){const s=this._active,o=t.map(({datasetIndex:r,index:l})=>{const c=this.chart.getDatasetMeta(r);if(!c)throw new Error("Cannot find a dataset at index "+r);return{datasetIndex:r,element:c.data[l],index:l}}),a=!vi(s,o),n=this._positionChanged(o,e);(a||n)&&(this._active=o,this._eventPosition=e,this._ignoreReplayEvents=!0,this.update(!0))}handleEvent(t,e,s=!0){if(e&&this._ignoreReplayEvents)return!1;this._ignoreReplayEvents=!1;const o=this.options,a=this._active||[],n=this._getActiveElements(t,a,e,s),r=this._positionChanged(n,t),l=e||!vi(n,a)||r;return l&&(this._active=n,(o.enabled||o.external)&&(this._eventPosition={x:t.x,y:t.y},this.update(!0,e))),l}_getActiveElements(t,e,s,o){const a=this.options;if(t.type==="mouseout")return[];if(!o)return e.filter(r=>this.chart.data.datasets[r.datasetIndex]&&this.chart.getDatasetMeta(r.datasetIndex).controller.getParsed(r.index)!==void 0);const n=this.chart.getElementsAtEventForMode(t,a.mode,a,s);return a.reverse&&n.reverse(),n}_positionChanged(t,e){const{caretX:s,caretY:o,options:a}=this,n=De[a.position].call(this,t,e);return n!==!1&&(s!==n.x||o!==n.y)}}_(bs,"positioners",De);var zp={id:"tooltip",_element:bs,positioners:De,afterInit(i,t,e){e&&(i.tooltip=new bs({chart:i,options:e}))},beforeUpdate(i,t,e){i.tooltip&&i.tooltip.initialize(e)},reset(i,t,e){i.tooltip&&i.tooltip.initialize(e)},afterDraw(i){const t=i.tooltip;if(t&&t._willRender()){const e={tooltip:t};if(i.notifyPlugins("beforeTooltipDraw",{...e,cancelable:!0})===!1)return;t.draw(i.ctx),i.notifyPlugins("afterTooltipDraw",e)}},afterEvent(i,t){if(i.tooltip){const e=t.replay;i.tooltip.handleEvent(t.event,e,t.inChartArea)&&(t.changed=!0)}},defaults:{enabled:!0,external:null,position:"average",backgroundColor:"rgba(0,0,0,0.8)",titleColor:"#fff",titleFont:{weight:"bold"},titleSpacing:2,titleMarginBottom:6,titleAlign:"left",bodyColor:"#fff",bodySpacing:2,bodyFont:{},bodyAlign:"left",footerColor:"#fff",footerSpacing:2,footerMarginTop:6,footerFont:{weight:"bold"},footerAlign:"left",padding:6,caretPadding:2,caretSize:5,cornerRadius:6,boxHeight:(i,t)=>t.bodyFont.size,boxWidth:(i,t)=>t.bodyFont.size,multiKeyBackground:"#fff",displayColors:!0,boxPadding:0,borderColor:"rgba(0,0,0,0)",borderWidth:0,animation:{duration:400,easing:"easeOutQuart"},animations:{numbers:{type:"number",properties:["x","y","width","height","caretX","caretY"]},opacity:{easing:"linear",duration:200}},callbacks:Dn},defaultRoutes:{bodyFont:"font",footerFont:"font",titleFont:"font"},descriptors:{_scriptable:i=>i!=="filter"&&i!=="itemSort"&&i!=="external",_indexable:!1,callbacks:{_scriptable:!1,_indexable:!1},animation:{_fallback:!1},animations:{_fallback:"animation"}},additionalOptionScopes:["interaction"]},Cp=Object.freeze({__proto__:null,Colors:Bd,Decimation:Wd,Filler:dp,Legend:bp,SubTitle:vp,Title:xp,Tooltip:zp});const Ap=(i,t,e,s)=>(typeof t=="string"?(e=i.push(t)-1,s.unshift({index:e,label:t})):isNaN(t)&&(e=null),e);function Pp(i,t,e,s){const o=i.indexOf(t);if(o===-1)return Ap(i,t,e,s);const a=i.lastIndexOf(t);return o!==a?e:o}const Rp=(i,t)=>i===null?null:et(Math.round(i),0,t);function sa(i){const t=this.getLabels();return i>=0&&i<t.length?t[i]:i}class ms extends pe{constructor(t){super(t),this._startValue=void 0,this._valueRange=0,this._addedLabels=[]}init(t){const e=this._addedLabels;if(e.length){const s=this.getLabels();for(const{index:o,label:a}of e)s[o]===a&&s.splice(o,1);this._addedLabels=[]}super.init(t)}parse(t,e){if(O(t))return null;const s=this.getLabels();return e=isFinite(e)&&s[e]===t?e:Pp(s,t,R(e,t),this._addedLabels),Rp(e,s.length-1)}determineDataLimits(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let{min:s,max:o}=this.getMinMax(!0);this.options.bounds==="ticks"&&(t||(s=0),e||(o=this.getLabels().length-1)),this.min=s,this.max=o}buildTicks(){const t=this.min,e=this.max,s=this.options.offset,o=[];let a=this.getLabels();a=t===0&&e===a.length-1?a:a.slice(t,e+1),this._valueRange=Math.max(a.length-(s?0:1),1),this._startValue=this.min-(s?.5:0);for(let n=t;n<=e;n++)o.push({value:n});return o}getLabelForValue(t){return sa.call(this,t)}configure(){super.configure(),this.isHorizontal()||(this._reversePixels=!this._reversePixels)}getPixelForValue(t){return typeof t!="number"&&(t=this.parse(t)),t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getPixelForTick(t){const e=this.ticks;return t<0||t>e.length-1?null:this.getPixelForValue(e[t].value)}getValueForPixel(t){return Math.round(this._startValue+this.getDecimalForPixel(t)*this._valueRange)}getBasePixel(){return this.bottom}}_(ms,"id","category"),_(ms,"defaults",{ticks:{callback:sa}});function Dp(i,t){const e=[],{bounds:o,step:a,min:n,max:r,precision:l,count:c,maxTicks:d,maxDigits:p,includeBounds:h}=i,g=a||1,u=d-1,{min:f,max:b}=t,m=!O(n),x=!O(r),w=!O(c),y=(b-f)/(p+1);let v=Js((b-f)/u/g)*g,$,k,M,S;if(v<1e-14&&!m&&!x)return[{value:f},{value:b}];S=Math.ceil(b/v)-Math.floor(f/v),S>u&&(v=Js(S*v/u/g)*g),O(l)||($=Math.pow(10,l),v=Math.ceil(v*$)/$),o==="ticks"?(k=Math.floor(f/v)*v,M=Math.ceil(b/v)*v):(k=f,M=b),m&&x&&a&&kr((r-n)/a,v/1e3)?(S=Math.round(Math.min((r-n)/v,d)),v=(r-n)/S,k=n,M=r):w?(k=m?n:k,M=x?r:M,S=c-1,v=(M-k)/S):(S=(M-k)/v,Oe(S,Math.round(S),v/1e3)?S=Math.round(S):S=Math.ceil(S));const T=Math.max(Zs(v),Zs(k));$=Math.pow(10,O(l)?T:l),k=Math.round(k*$)/$,M=Math.round(M*$)/$;let E=0;for(m&&(h&&k!==n?(e.push({value:n}),k<n&&E++,Oe(Math.round((k+E*v)*$)/$,n,oa(n,y,i))&&E++):k<n&&E++);E<S;++E){const I=Math.round((k+E*v)*$)/$;if(x&&I>r)break;e.push({value:I})}return x&&h&&M!==r?e.length&&Oe(e[e.length-1].value,r,oa(r,y,i))?e[e.length-1].value=r:e.push({value:r}):(!x||M===r)&&e.push({value:M}),e}function oa(i,t,{horizontal:e,minRotation:s}){const o=$t(s),a=(e?Math.sin(o):Math.cos(o))||.001,n=.75*t*(""+i).length;return Math.min(t/a,n)}class Si extends pe{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._endValue=void 0,this._valueRange=0}parse(t,e){return O(t)||(typeof t=="number"||t instanceof Number)&&!isFinite(+t)?null:+t}handleTickRangeOptions(){const{beginAtZero:t}=this.options,{minDefined:e,maxDefined:s}=this.getUserBounds();let{min:o,max:a}=this;const n=l=>o=e?o:l,r=l=>a=s?a:l;if(t){const l=Pt(o),c=Pt(a);l<0&&c<0?r(0):l>0&&c>0&&n(0)}if(o===a){let l=a===0?1:Math.abs(a*.05);r(a+l),t||n(o-l)}this.min=o,this.max=a}getTickLimit(){const t=this.options.ticks;let{maxTicksLimit:e,stepSize:s}=t,o;return s?(o=Math.ceil(this.max/s)-Math.floor(this.min/s)+1,o>1e3&&(console.warn(`scales.${this.id}.ticks.stepSize: ${s} would result generating up to ${o} ticks. Limiting to 1000.`),o=1e3)):(o=this.computeTickLimit(),e=e||11),e&&(o=Math.min(e,o)),o}computeTickLimit(){return Number.POSITIVE_INFINITY}buildTicks(){const t=this.options,e=t.ticks;let s=this.getTickLimit();s=Math.max(2,s);const o={maxTicks:s,bounds:t.bounds,min:t.min,max:t.max,precision:e.precision,step:e.stepSize,count:e.count,maxDigits:this._maxDigits(),horizontal:this.isHorizontal(),minRotation:e.minRotation||0,includeBounds:e.includeBounds!==!1},a=this._range||this,n=Dp(o,a);return t.bounds==="ticks"&&Va(n,this,"value"),t.reverse?(n.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),n}configure(){const t=this.ticks;let e=this.min,s=this.max;if(super.configure(),this.options.offset&&t.length){const o=(s-e)/Math.max(t.length-1,1)/2;e-=o,s+=o}this._startValue=e,this._endValue=s,this._valueRange=s-e}getLabelForValue(t){return Xe(t,this.chart.options.locale,this.options.ticks.format)}}class xs extends Si{determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=q(t)?t:0,this.max=q(e)?e:1,this.handleTickRangeOptions()}computeTickLimit(){const t=this.isHorizontal(),e=t?this.width:this.height,s=$t(this.options.ticks.minRotation),o=(t?Math.sin(s):Math.cos(s))||.001,a=this._resolveTickFontOptions(0);return Math.ceil(e/Math.min(40,a.lineHeight/o))}getPixelForValue(t){return t===null?NaN:this.getPixelForDecimal((t-this._startValue)/this._valueRange)}getValueForPixel(t){return this._startValue+this.getDecimalForPixel(t)*this._valueRange}}_(xs,"id","linear"),_(xs,"defaults",{ticks:{callback:Ci.formatters.numeric}});const Ge=i=>Math.floor(Bt(i)),ie=(i,t)=>Math.pow(10,Ge(i)+t);function aa(i){return i/Math.pow(10,Ge(i))===1}function na(i,t,e){const s=Math.pow(10,e),o=Math.floor(i/s);return Math.ceil(t/s)-o}function Tp(i,t){const e=t-i;let s=Ge(e);for(;na(i,t,s)>10;)s++;for(;na(i,t,s)<10;)s--;return Math.min(s,Ge(i))}function Ep(i,{min:t,max:e}){t=mt(i.min,t);const s=[],o=Ge(t);let a=Tp(t,e),n=a<0?Math.pow(10,Math.abs(a)):1;const r=Math.pow(10,a),l=o>a?Math.pow(10,o):0,c=Math.round((t-l)*n)/n,d=Math.floor((t-l)/r/10)*r*10;let p=Math.floor((c-d)/Math.pow(10,a)),h=mt(i.min,Math.round((l+d+p*Math.pow(10,a))*n)/n);for(;h<e;)s.push({value:h,major:aa(h),significand:p}),p>=10?p=p<15?15:20:p++,p>=20&&(a++,p=2,n=a>=0?1:n),h=Math.round((l+d+p*Math.pow(10,a))*n)/n;const g=mt(i.max,h);return s.push({value:g,major:aa(g),significand:p}),s}class vs extends pe{constructor(t){super(t),this.start=void 0,this.end=void 0,this._startValue=void 0,this._valueRange=0}parse(t,e){const s=Si.prototype.parse.apply(this,[t,e]);if(s===0){this._zero=!0;return}return q(s)&&s>0?s:null}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!0);this.min=q(t)?Math.max(0,t):null,this.max=q(e)?Math.max(0,e):null,this.options.beginAtZero&&(this._zero=!0),this._zero&&this.min!==this._suggestedMin&&!q(this._userMin)&&(this.min=t===ie(this.min,0)?ie(this.min,-1):ie(this.min,0)),this.handleTickRangeOptions()}handleTickRangeOptions(){const{minDefined:t,maxDefined:e}=this.getUserBounds();let s=this.min,o=this.max;const a=r=>s=t?s:r,n=r=>o=e?o:r;s===o&&(s<=0?(a(1),n(10)):(a(ie(s,-1)),n(ie(o,1)))),s<=0&&a(ie(o,-1)),o<=0&&n(ie(s,1)),this.min=s,this.max=o}buildTicks(){const t=this.options,e={min:this._userMin,max:this._userMax},s=Ep(e,this);return t.bounds==="ticks"&&Va(s,this,"value"),t.reverse?(s.reverse(),this.start=this.max,this.end=this.min):(this.start=this.min,this.end=this.max),s}getLabelForValue(t){return t===void 0?"0":Xe(t,this.chart.options.locale,this.options.ticks.format)}configure(){const t=this.min;super.configure(),this._startValue=Bt(t),this._valueRange=Bt(this.max)-Bt(t)}getPixelForValue(t){return(t===void 0||t===0)&&(t=this.min),t===null||isNaN(t)?NaN:this.getPixelForDecimal(t===this.min?0:(Bt(t)-this._startValue)/this._valueRange)}getValueForPixel(t){const e=this.getDecimalForPixel(t);return Math.pow(10,this._startValue+e*this._valueRange)}}_(vs,"id","logarithmic"),_(vs,"defaults",{ticks:{callback:Ci.formatters.logarithmic,major:{enabled:!0}}});function ys(i){const t=i.ticks;if(t.display&&i.display){const e=dt(t.backdropPadding);return R(t.font&&t.font.size,X.font.size)+e.height}return 0}function Op(i,t,e){return e=U(e)?e:[e],{w:Vr(i,t.string,e),h:e.length*t.lineHeight}}function ra(i,t,e,s,o){return i===s||i===o?{start:t-e/2,end:t+e/2}:i<s||i>o?{start:t-e,end:t}:{start:t,end:t+e}}function Lp(i){const t={l:i.left+i._padding.left,r:i.right-i._padding.right,t:i.top+i._padding.top,b:i.bottom-i._padding.bottom},e=Object.assign({},t),s=[],o=[],a=i._pointLabels.length,n=i.options.pointLabels,r=n.centerPointLabels?F/a:0;for(let l=0;l<a;l++){const c=n.setContext(i.getPointLabelContext(l));o[l]=c.padding;const d=i.getPointPosition(l,i.drawingArea+o[l],r),p=tt(c.font),h=Op(i.ctx,p,i._pointLabels[l]);s[l]=h;const g=rt(i.getIndexAngle(l)+r),u=Math.round(zs(g)),f=ra(u,d.x,h.w,0,180),b=ra(u,d.y,h.h,90,270);Ip(e,t,g,f,b)}i.setCenterPoint(t.l-e.l,e.r-t.r,t.t-e.t,e.b-t.b),i._pointLabelItems=Bp(i,s,o)}function Ip(i,t,e,s,o){const a=Math.abs(Math.sin(e)),n=Math.abs(Math.cos(e));let r=0,l=0;s.start<t.l?(r=(t.l-s.start)/a,i.l=Math.min(i.l,t.l-r)):s.end>t.r&&(r=(s.end-t.r)/a,i.r=Math.max(i.r,t.r+r)),o.start<t.t?(l=(t.t-o.start)/n,i.t=Math.min(i.t,t.t-l)):o.end>t.b&&(l=(o.end-t.b)/n,i.b=Math.max(i.b,t.b+l))}function jp(i,t,e){const s=i.drawingArea,{extra:o,additionalAngle:a,padding:n,size:r}=e,l=i.getPointPosition(t,s+o+n,a),c=Math.round(zs(rt(l.angle+Z))),d=Hp(l.y,r.h,c),p=Vp(c),h=Np(l.x,r.w,p);return{visible:!0,x:l.x,y:d,textAlign:p,left:h,top:d,right:h+r.w,bottom:d+r.h}}function Fp(i,t){if(!t)return!0;const{left:e,top:s,right:o,bottom:a}=i;return!(It({x:e,y:s},t)||It({x:e,y:a},t)||It({x:o,y:s},t)||It({x:o,y:a},t))}function Bp(i,t,e){const s=[],o=i._pointLabels.length,a=i.options,{centerPointLabels:n,display:r}=a.pointLabels,l={extra:ys(a)/2,additionalAngle:n?F/o:0};let c;for(let d=0;d<o;d++){l.padding=e[d],l.size=t[d];const p=jp(i,d,l);s.push(p),r==="auto"&&(p.visible=Fp(p,c),p.visible&&(c=p))}return s}function Vp(i){return i===0||i===180?"center":i<180?"left":"right"}function Np(i,t,e){return e==="right"?i-=t:e==="center"&&(i-=t/2),i}function Hp(i,t,e){return e===90||e===270?i-=t/2:(e>270||e<90)&&(i-=t),i}function Wp(i,t,e){const{left:s,top:o,right:a,bottom:n}=e,{backdropColor:r}=t;if(!O(r)){const l=re(t.borderRadius),c=dt(t.backdropPadding);i.fillStyle=r;const d=s-c.left,p=o-c.top,h=a-s+c.width,g=n-o+c.height;Object.values(l).some(u=>u!==0)?(i.beginPath(),He(i,{x:d,y:p,w:h,h:g,radius:l}),i.fill()):i.fillRect(d,p,h,g)}}function Gp(i,t){const{ctx:e,options:{pointLabels:s}}=i;for(let o=t-1;o>=0;o--){const a=i._pointLabelItems[o];if(!a.visible)continue;const n=s.setContext(i.getPointLabelContext(o));Wp(e,n,a);const r=tt(n.font),{x:l,y:c,textAlign:d}=a;de(e,i._pointLabels[o],l,c+r.lineHeight/2,r,{color:n.color,textAlign:d,textBaseline:"middle"})}}function Tn(i,t,e,s){const{ctx:o}=i;if(e)o.arc(i.xCenter,i.yCenter,t,0,G);else{let a=i.getPointPosition(0,t);o.moveTo(a.x,a.y);for(let n=1;n<s;n++)a=i.getPointPosition(n,t),o.lineTo(a.x,a.y)}}function Yp(i,t,e,s,o){const a=i.ctx,n=t.circular,{color:r,lineWidth:l}=t;!n&&!s||!r||!l||e<0||(a.save(),a.strokeStyle=r,a.lineWidth=l,a.setLineDash(o.dash||[]),a.lineDashOffset=o.dashOffset,a.beginPath(),Tn(i,e,n,s),a.closePath(),a.stroke(),a.restore())}function Up(i,t,e){return Ut(i,{label:e,index:t,type:"pointLabel"})}class Te extends Si{constructor(t){super(t),this.xCenter=void 0,this.yCenter=void 0,this.drawingArea=void 0,this._pointLabels=[],this._pointLabelItems=[]}setDimensions(){const t=this._padding=dt(ys(this.options)/2),e=this.width=this.maxWidth-t.width,s=this.height=this.maxHeight-t.height;this.xCenter=Math.floor(this.left+e/2+t.left),this.yCenter=Math.floor(this.top+s/2+t.top),this.drawingArea=Math.floor(Math.min(e,s)/2)}determineDataLimits(){const{min:t,max:e}=this.getMinMax(!1);this.min=q(t)&&!isNaN(t)?t:0,this.max=q(e)&&!isNaN(e)?e:0,this.handleTickRangeOptions()}computeTickLimit(){return Math.ceil(this.drawingArea/ys(this.options))}generateTickLabels(t){Si.prototype.generateTickLabels.call(this,t),this._pointLabels=this.getLabels().map((e,s)=>{const o=W(this.options.pointLabels.callback,[e,s],this);return o||o===0?o:""}).filter((e,s)=>this.chart.getDataVisibility(s))}fit(){const t=this.options;t.display&&t.pointLabels.display?Lp(this):this.setCenterPoint(0,0,0,0)}setCenterPoint(t,e,s,o){this.xCenter+=Math.floor((t-e)/2),this.yCenter+=Math.floor((s-o)/2),this.drawingArea-=Math.min(this.drawingArea/2,Math.max(t,e,s,o))}getIndexAngle(t){const e=G/(this._pointLabels.length||1),s=this.options.startAngle||0;return rt(t*e+$t(s))}getDistanceFromCenterForValue(t){if(O(t))return NaN;const e=this.drawingArea/(this.max-this.min);return this.options.reverse?(this.max-t)*e:(t-this.min)*e}getValueForDistanceFromCenter(t){if(O(t))return NaN;const e=t/(this.drawingArea/(this.max-this.min));return this.options.reverse?this.max-e:this.min+e}getPointLabelContext(t){const e=this._pointLabels||[];if(t>=0&&t<e.length){const s=e[t];return Up(this.getContext(),t,s)}}getPointPosition(t,e,s=0){const o=this.getIndexAngle(t)-Z+s;return{x:Math.cos(o)*e+this.xCenter,y:Math.sin(o)*e+this.yCenter,angle:o}}getPointPositionForValue(t,e){return this.getPointPosition(t,this.getDistanceFromCenterForValue(e))}getBasePosition(t){return this.getPointPositionForValue(t||0,this.getBaseValue())}getPointLabelPosition(t){const{left:e,top:s,right:o,bottom:a}=this._pointLabelItems[t];return{left:e,top:s,right:o,bottom:a}}drawBackground(){const{backgroundColor:t,grid:{circular:e}}=this.options;if(t){const s=this.ctx;s.save(),s.beginPath(),Tn(this,this.getDistanceFromCenterForValue(this._endValue),e,this._pointLabels.length),s.closePath(),s.fillStyle=t,s.fill(),s.restore()}}drawGrid(){const t=this.ctx,e=this.options,{angleLines:s,grid:o,border:a}=e,n=this._pointLabels.length;let r,l,c;if(e.pointLabels.display&&Gp(this,n),o.display&&this.ticks.forEach((d,p)=>{if(p!==0||p===0&&this.min<0){l=this.getDistanceFromCenterForValue(d.value);const h=this.getContext(p),g=o.setContext(h),u=a.setContext(h);Yp(this,g,l,n,u)}}),s.display){for(t.save(),r=n-1;r>=0;r--){const d=s.setContext(this.getPointLabelContext(r)),{color:p,lineWidth:h}=d;!h||!p||(t.lineWidth=h,t.strokeStyle=p,t.setLineDash(d.borderDash),t.lineDashOffset=d.borderDashOffset,l=this.getDistanceFromCenterForValue(e.reverse?this.min:this.max),c=this.getPointPosition(r,l),t.beginPath(),t.moveTo(this.xCenter,this.yCenter),t.lineTo(c.x,c.y),t.stroke())}t.restore()}}drawBorder(){}drawLabels(){const t=this.ctx,e=this.options,s=e.ticks;if(!s.display)return;const o=this.getIndexAngle(0);let a,n;t.save(),t.translate(this.xCenter,this.yCenter),t.rotate(o),t.textAlign="center",t.textBaseline="middle",this.ticks.forEach((r,l)=>{if(l===0&&this.min>=0&&!e.reverse)return;const c=s.setContext(this.getContext(l)),d=tt(c.font);if(a=this.getDistanceFromCenterForValue(this.ticks[l].value),c.showLabelBackdrop){t.font=d.string,n=t.measureText(r.label).width,t.fillStyle=c.backdropColor;const p=dt(c.backdropPadding);t.fillRect(-n/2-p.left,-a-d.size/2-p.top,n+p.width,d.size+p.height)}de(t,r.label,0,-a,d,{color:c.color,strokeColor:c.textStrokeColor,strokeWidth:c.textStrokeWidth})}),t.restore()}drawTitle(){}}_(Te,"id","radialLinear"),_(Te,"defaults",{display:!0,animate:!0,position:"chartArea",angleLines:{display:!0,lineWidth:1,borderDash:[],borderDashOffset:0},grid:{circular:!1},startAngle:0,ticks:{showLabelBackdrop:!0,callback:Ci.formatters.numeric},pointLabels:{backdropColor:void 0,backdropPadding:2,display:!0,font:{size:10},callback(t){return t},padding:5,centerPointLabels:!1}}),_(Te,"defaultRoutes",{"angleLines.color":"borderColor","pointLabels.color":"color","ticks.color":"color"}),_(Te,"descriptors",{angleLines:{_fallback:"grid"}});const Ei={millisecond:{common:!0,size:1,steps:1e3},second:{common:!0,size:1e3,steps:60},minute:{common:!0,size:6e4,steps:60},hour:{common:!0,size:36e5,steps:24},day:{common:!0,size:864e5,steps:30},week:{common:!1,size:6048e5,steps:4},month:{common:!0,size:2628e6,steps:12},quarter:{common:!1,size:7884e6,steps:4},year:{common:!0,size:3154e7}},ut=Object.keys(Ei);function la(i,t){return i-t}function ca(i,t){if(O(t))return null;const e=i._adapter,{parser:s,round:o,isoWeekday:a}=i._parseOpts;let n=t;return typeof s=="function"&&(n=s(n)),q(n)||(n=typeof s=="string"?e.parse(n,s):e.parse(n)),n===null?null:(o&&(n=o==="week"&&(me(a)||a===!0)?e.startOf(n,"isoWeek",a):e.startOf(n,o)),+n)}function da(i,t,e,s){const o=ut.length;for(let a=ut.indexOf(i);a<o-1;++a){const n=Ei[ut[a]],r=n.steps?n.steps:Number.MAX_SAFE_INTEGER;if(n.common&&Math.ceil((e-t)/(r*n.size))<=s)return ut[a]}return ut[o-1]}function Xp(i,t,e,s,o){for(let a=ut.length-1;a>=ut.indexOf(e);a--){const n=ut[a];if(Ei[n].common&&i._adapter.diff(o,s,n)>=t-1)return n}return ut[e?ut.indexOf(e):0]}function Kp(i){for(let t=ut.indexOf(i)+1,e=ut.length;t<e;++t)if(Ei[ut[t]].common)return ut[t]}function pa(i,t,e){if(!e)i[t]=!0;else if(e.length){const{lo:s,hi:o}=Cs(e,t),a=e[s]>=t?e[s]:e[o];i[a]=!0}}function qp(i,t,e,s){const o=i._adapter,a=+o.startOf(t[0].value,s),n=t[t.length-1].value;let r,l;for(r=a;r<=n;r=+o.add(r,1,s))l=e[r],l>=0&&(t[l].major=!0);return t}function ha(i,t,e){const s=[],o={},a=t.length;let n,r;for(n=0;n<a;++n)r=t[n],o[r]=n,s.push({value:r,major:!1});return a===0||!e?s:qp(i,s,o,e)}class Ye extends pe{constructor(t){super(t),this._cache={data:[],labels:[],all:[]},this._unit="day",this._majorUnit=void 0,this._offsets={},this._normalized=!1,this._parseOpts=void 0}init(t,e={}){const s=t.time||(t.time={}),o=this._adapter=new oc._date(t.adapters.date);o.init(e),Ee(s.displayFormats,o.formats()),this._parseOpts={parser:s.parser,round:s.round,isoWeekday:s.isoWeekday},super.init(t),this._normalized=e.normalized}parse(t,e){return t===void 0?null:ca(this,t)}beforeLayout(){super.beforeLayout(),this._cache={data:[],labels:[],all:[]}}determineDataLimits(){const t=this.options,e=this._adapter,s=t.time.unit||"day";let{min:o,max:a,minDefined:n,maxDefined:r}=this.getUserBounds();function l(c){!n&&!isNaN(c.min)&&(o=Math.min(o,c.min)),!r&&!isNaN(c.max)&&(a=Math.max(a,c.max))}(!n||!r)&&(l(this._getLabelBounds()),(t.bounds!=="ticks"||t.ticks.source!=="labels")&&l(this.getMinMax(!1))),o=q(o)&&!isNaN(o)?o:+e.startOf(Date.now(),s),a=q(a)&&!isNaN(a)?a:+e.endOf(Date.now(),s)+1,this.min=Math.min(o,a-1),this.max=Math.max(o+1,a)}_getLabelBounds(){const t=this.getLabelTimestamps();let e=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY;return t.length&&(e=t[0],s=t[t.length-1]),{min:e,max:s}}buildTicks(){const t=this.options,e=t.time,s=t.ticks,o=s.source==="labels"?this.getLabelTimestamps():this._generate();t.bounds==="ticks"&&o.length&&(this.min=this._userMin||o[0],this.max=this._userMax||o[o.length-1]);const a=this.min,n=this.max,r=Cr(o,a,n);return this._unit=e.unit||(s.autoSkip?da(e.minUnit,this.min,this.max,this._getLabelCapacity(a)):Xp(this,r.length,e.minUnit,this.min,this.max)),this._majorUnit=!s.major.enabled||this._unit==="year"?void 0:Kp(this._unit),this.initOffsets(o),t.reverse&&r.reverse(),ha(this,r,this._majorUnit)}afterAutoSkip(){this.options.offsetAfterAutoskip&&this.initOffsets(this.ticks.map(t=>+t.value))}initOffsets(t=[]){let e=0,s=0,o,a;this.options.offset&&t.length&&(o=this.getDecimalForValue(t[0]),t.length===1?e=1-o:e=(this.getDecimalForValue(t[1])-o)/2,a=this.getDecimalForValue(t[t.length-1]),t.length===1?s=a:s=(a-this.getDecimalForValue(t[t.length-2]))/2);const n=t.length<3?.5:.25;e=et(e,0,n),s=et(s,0,n),this._offsets={start:e,end:s,factor:1/(e+1+s)}}_generate(){const t=this._adapter,e=this.min,s=this.max,o=this.options,a=o.time,n=a.unit||da(a.minUnit,e,s,this._getLabelCapacity(e)),r=R(o.ticks.stepSize,1),l=n==="week"?a.isoWeekday:!1,c=me(l)||l===!0,d={};let p=e,h,g;if(c&&(p=+t.startOf(p,"isoWeek",l)),p=+t.startOf(p,c?"day":n),t.diff(s,e,n)>1e5*r)throw new Error(e+" and "+s+" are too far apart with stepSize of "+r+" "+n);const u=o.ticks.source==="data"&&this.getDataTimestamps();for(h=p,g=0;h<s;h=+t.add(h,r,n),g++)pa(d,h,u);return(h===s||o.bounds==="ticks"||g===1)&&pa(d,h,u),Object.keys(d).sort(la).map(f=>+f)}getLabelForValue(t){const e=this._adapter,s=this.options.time;return s.tooltipFormat?e.format(t,s.tooltipFormat):e.format(t,s.displayFormats.datetime)}format(t,e){const o=this.options.time.displayFormats,a=this._unit,n=e||o[a];return this._adapter.format(t,n)}_tickFormatFunction(t,e,s,o){const a=this.options,n=a.ticks.callback;if(n)return W(n,[t,e,s],this);const r=a.time.displayFormats,l=this._unit,c=this._majorUnit,d=l&&r[l],p=c&&r[c],h=s[e],g=c&&p&&h&&h.major;return this._adapter.format(t,o||(g?p:d))}generateTickLabels(t){let e,s,o;for(e=0,s=t.length;e<s;++e)o=t[e],o.label=this._tickFormatFunction(o.value,e,t)}getDecimalForValue(t){return t===null?NaN:(t-this.min)/(this.max-this.min)}getPixelForValue(t){const e=this._offsets,s=this.getDecimalForValue(t);return this.getPixelForDecimal((e.start+s)*e.factor)}getValueForPixel(t){const e=this._offsets,s=this.getDecimalForPixel(t)/e.factor-e.end;return this.min+s*(this.max-this.min)}_getLabelSize(t){const e=this.options.ticks,s=this.ctx.measureText(t).width,o=$t(this.isHorizontal()?e.maxRotation:e.minRotation),a=Math.cos(o),n=Math.sin(o),r=this._resolveTickFontOptions(0).size;return{w:s*a+r*n,h:s*n+r*a}}_getLabelCapacity(t){const e=this.options.time,s=e.displayFormats,o=s[e.unit]||s.millisecond,a=this._tickFormatFunction(t,0,ha(this,[t],this._majorUnit),o),n=this._getLabelSize(a),r=Math.floor(this.isHorizontal()?this.width/n.w:this.height/n.h)-1;return r>0?r:1}getDataTimestamps(){let t=this._cache.data||[],e,s;if(t.length)return t;const o=this.getMatchingVisibleMetas();if(this._normalized&&o.length)return this._cache.data=o[0].controller.getAllParsedValues(this);for(e=0,s=o.length;e<s;++e)t=t.concat(o[e].controller.getAllParsedValues(this));return this._cache.data=this.normalize(t)}getLabelTimestamps(){const t=this._cache.labels||[];let e,s;if(t.length)return t;const o=this.getLabels();for(e=0,s=o.length;e<s;++e)t.push(ca(this,o[e]));return this._cache.labels=this._normalized?t:this.normalize(t)}normalize(t){return Wa(t.sort(la))}}_(Ye,"id","time"),_(Ye,"defaults",{bounds:"data",adapters:{},time:{parser:!1,unit:!1,round:!1,isoWeekday:!1,minUnit:"millisecond",displayFormats:{}},ticks:{source:"auto",callback:!1,major:{enabled:!1}}});function ci(i,t,e){let s=0,o=i.length-1,a,n,r,l;e?(t>=i[s].pos&&t<=i[o].pos&&({lo:s,hi:o}=Lt(i,"pos",t)),{pos:a,time:r}=i[s],{pos:n,time:l}=i[o]):(t>=i[s].time&&t<=i[o].time&&({lo:s,hi:o}=Lt(i,"time",t)),{time:a,pos:r}=i[s],{time:n,pos:l}=i[o]);const c=n-a;return c?r+(l-r)*(t-a)/c:r}class ws extends Ye{constructor(t){super(t),this._table=[],this._minPos=void 0,this._tableRange=void 0}initOffsets(){const t=this._getTimestampsForTable(),e=this._table=this.buildLookupTable(t);this._minPos=ci(e,this.min),this._tableRange=ci(e,this.max)-this._minPos,super.initOffsets(t)}buildLookupTable(t){const{min:e,max:s}=this,o=[],a=[];let n,r,l,c,d;for(n=0,r=t.length;n<r;++n)c=t[n],c>=e&&c<=s&&o.push(c);if(o.length<2)return[{time:e,pos:0},{time:s,pos:1}];for(n=0,r=o.length;n<r;++n)d=o[n+1],l=o[n-1],c=o[n],Math.round((d+l)/2)!==c&&a.push({time:c,pos:n/(r-1)});return a}_generate(){const t=this.min,e=this.max;let s=super.getDataTimestamps();return(!s.includes(t)||!s.length)&&s.splice(0,0,t),(!s.includes(e)||s.length===1)&&s.push(e),s.sort((o,a)=>o-a)}_getTimestampsForTable(){let t=this._cache.all||[];if(t.length)return t;const e=this.getDataTimestamps(),s=this.getLabelTimestamps();return e.length&&s.length?t=this.normalize(e.concat(s)):t=e.length?e:s,t=this._cache.all=t,t}getDecimalForValue(t){return(ci(this._table,t)-this._minPos)/this._tableRange}getValueForPixel(t){const e=this._offsets,s=this.getDecimalForPixel(t)/e.factor-e.end;return ci(this._table,s*this._tableRange+this._minPos,!0)}}_(ws,"id","timeseries"),_(ws,"defaults",Ye.defaults);var Jp=Object.freeze({__proto__:null,CategoryScale:ms,LinearScale:xs,LogarithmicScale:vs,RadialLinearScale:Te,TimeScale:Ye,TimeSeriesScale:ws});const Zp=[sc,Td,Cp,Jp];xt.register(...Zp);const ne={};function Oi(){return!!document.querySelector(".demo-wrapper.theme-light")}function Fs(i,t){ne[i]&&(ne[i].destroy(),delete ne[i]);const e=document.getElementById(i);if(!e)return null;const s=Oi();xt.defaults.color=s?"#6b7280":"rgba(255,255,255,0.40)",xt.defaults.borderColor=s?"rgba(0,0,0,0.06)":"rgba(255,255,255,0.06)",xt.defaults.font.family="'Inter', sans-serif",xt.defaults.font.size=12;const o=new xt(e,t);return ne[i]=o,o}function Qp(){Object.values(ne).forEach(i=>{try{i.destroy()}catch{}}),Object.keys(ne).forEach(i=>delete ne[i])}function Bs(){return getComputedStyle(document.documentElement).getPropertyValue("--industry-accent").trim()||"#6366f1"}function Vs(){return getComputedStyle(document.documentElement).getPropertyValue("--industry-accent-rgb").trim()||"99, 102, 241"}function Li(i,{labels:t,datasets:e,height:s=240}){const o=document.getElementById(i);o&&(o.style.height=s+"px");const a=Bs(),n=Vs(),r=Oi(),l=r?"#9ca3af":"rgba(255,255,255,0.35)",c=r?"rgba(0,0,0,0.05)":"rgba(255,255,255,0.04)",d=r?"#374151":"rgba(255,255,255,0.40)",p=r?"#ffffff":"#1f1f1f",h=r?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.10)";return Fs(i,{type:"line",data:{labels:t,datasets:e.map((g,u)=>({label:g.label,data:g.data,borderColor:u===0?a:`rgba(${n},0.4)`,backgroundColor:u===0?`rgba(${n},0.10)`:"transparent",fill:u===0,tension:.4,pointRadius:4,pointHoverRadius:6,pointBackgroundColor:u===0?a:`rgba(${n},0.4)`,pointBorderColor:"transparent",borderWidth:2,...g.extra}))},options:{responsive:!0,maintainAspectRatio:!1,interaction:{mode:"index",intersect:!1},plugins:{legend:{display:e.length>1,labels:{color:d,boxWidth:12,padding:16}},tooltip:{backgroundColor:p,borderColor:h,borderWidth:1,padding:12,titleColor:r?"#111827":"rgba(255,255,255,0.80)",bodyColor:r?"#374151":"rgba(255,255,255,0.60)"}},scales:{x:{grid:{color:c},ticks:{color:l}},y:{grid:{color:c},ticks:{color:l},beginAtZero:!0}}}})}function Ii(i,{labels:t,datasets:e,height:s=240,horizontal:o=!1}){const a=document.getElementById(i);a&&(a.style.height=s+"px");const n=Bs(),r=Vs(),l=Oi(),c=l?"#9ca3af":"rgba(255,255,255,0.35)",d=l?"rgba(0,0,0,0.05)":"rgba(255,255,255,0.04)",p=l?"#374151":"rgba(255,255,255,0.40)",h=l?"#ffffff":"#1f1f1f",g=l?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.10)",u=[n,`rgba(${r},0.55)`,`rgba(${r},0.35)`,`rgba(${r},0.20)`];return Fs(i,{type:"bar",data:{labels:t,datasets:e.map((f,b)=>({label:f.label,data:f.data,backgroundColor:e.length===1?t.map((m,x)=>`rgba(${r},${.9-x*.08})`):u[b],borderRadius:o?4:6,borderSkipped:!1,...f.extra}))},options:{indexAxis:o?"y":"x",responsive:!0,maintainAspectRatio:!1,plugins:{legend:{display:e.length>1,labels:{color:p}},tooltip:{backgroundColor:h,borderColor:g,borderWidth:1,padding:12,titleColor:l?"#111827":"rgba(255,255,255,0.80)",bodyColor:l?"#374151":"rgba(255,255,255,0.60)"}},scales:{x:{grid:{color:d},ticks:{color:c}},y:{grid:{color:d},ticks:{color:c},beginAtZero:!0}}}})}function ji(i,{labels:t,data:e,height:s=220}){const o=document.getElementById(i);o&&(o.style.height=s+"px");const a=Bs(),n=Vs(),r=Oi(),l=r?"#374151":"rgba(255,255,255,0.50)",c=r?"#ffffff":"#1f1f1f",d=r?"rgba(0,0,0,0.08)":"rgba(255,255,255,0.10)",p=r?"#f1f5f9":"#111111",h=[a,`rgba(${n},0.65)`,`rgba(${n},0.40)`,`rgba(${n},0.22)`,`rgba(${n},0.12)`];return Fs(i,{type:"doughnut",data:{labels:t,datasets:[{data:e,backgroundColor:h.slice(0,e.length),borderColor:p,borderWidth:3,hoverOffset:8}]},options:{responsive:!0,maintainAspectRatio:!1,cutout:"68%",plugins:{legend:{position:"right",labels:{color:l,boxWidth:12,padding:14,font:{size:12}}},tooltip:{backgroundColor:c,borderColor:d,borderWidth:1,padding:12,titleColor:r?"#111827":"rgba(255,255,255,0.80)",bodyColor:r?"#374151":"rgba(255,255,255,0.60)"}}}})}const _s={};function B(i,t){_s[i]=t}function th(i){window.location.hash=i}function eh(){return window.location.hash.replace("#","")||"/"}async function ga(){const i=eh();Qp();let t=_s[i];if(t||(t=_s["/"]),!t)return;const e=document.getElementById("app");e&&(e.style.transition="opacity 0.12s ease",e.style.opacity="0",await new Promise(s=>setTimeout(s,80)),t(),requestAnimationFrame(()=>{e.style.transition="opacity 0.22s ease",e.style.opacity="1"}),window.scrollTo(0,0),window.dispatchEvent(new CustomEvent("routechange",{detail:{path:i}})))}function ua(){window.addEventListener("hashchange",ga),ga()}const ih="Nuxorb_2026$",En="nx_auth";function sh(){return sessionStorage.getItem(En)==="1"}function oh(i){const t=document.getElementById("app");t.innerHTML=`
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
  `;const e=document.getElementById("nx-password"),s=document.getElementById("nx-submit"),o=document.getElementById("nx-error");function a(){e.value===ih?(sessionStorage.setItem(En,"1"),i()):(o.style.display="block",e.value="",e.style.borderColor="rgba(239,68,68,0.55)",e.focus(),setTimeout(()=>{e.style.borderColor=""},1600))}s.addEventListener("click",a),e.addEventListener("keydown",n=>{n.key==="Enter"&&a()}),requestAnimationFrame(()=>e.focus())}let jt=null;function ah(){return(!jt||!document.body.contains(jt))&&(jt=document.getElementById("toast-container"),jt||(jt=document.createElement("div"),jt.id="toast-container",document.body.appendChild(jt))),jt}function Fi(i,t="info",e=3e3){const s=ah(),o={success:"bi-check-circle-fill",error:"bi-x-circle-fill",info:"bi-info-circle-fill",warning:"bi-exclamation-triangle-fill"},a=document.createElement("div");a.className=`toast-nux ${t}`,a.innerHTML=`<i class="bi ${o[t]}"></i><span>${i}</span>`,s.appendChild(a),setTimeout(()=>{a.classList.add("out"),setTimeout(()=>a.remove(),300)},e)}const zi=i=>Fi(i,"success"),nh=i=>Fi(i,"error"),Ns=i=>Fi(i,"info"),rh=i=>Fi(i,"warning"),lh=[{key:"restaurantes",nombre:"Restaurantes",desc:"Control de mesas, órdenes en tiempo real, CRM de clientes frecuentes y reportes de ventas.",icon:"bi-cup-hot-fill",accent:"#f97316",accentRgb:"249,115,22",empresa:"La Mesa Digital",demos:[{label:"CRM de Clientes",icon:"bi-people-fill",path:"/restaurantes/crm"},{label:"Dashboard Ejecutivo",icon:"bi-bar-chart-fill",path:"/restaurantes/dashboard"},{label:"Operaciones",icon:"bi-grid-3x3",path:"/restaurantes/operaciones"}]},{key:"salud",nombre:"Salud",desc:"Gestión de citas, expedientes clínicos, control de consultorios y estadísticas médicas.",icon:"bi-heart-pulse-fill",accent:"#06b6d4",accentRgb:"6,182,212",empresa:"MediCore",demos:[{label:"Expedientes",icon:"bi-folder2-open",path:"/salud/crm"},{label:"Dashboard Clínico",icon:"bi-bar-chart-fill",path:"/salud/dashboard"},{label:"Agenda del Día",icon:"bi-calendar-check",path:"/salud/operaciones"}]},{key:"construccion",nombre:"Construcción",desc:"Seguimiento de obras, control de materiales, gestión de personal y avance de proyectos.",icon:"bi-building-gear",accent:"#eab308",accentRgb:"234,179,8",empresa:"BuildPro",demos:[{label:"Gestión de Proyectos",icon:"bi-hammer",path:"/construccion/crm"},{label:"Dashboard de Obra",icon:"bi-bar-chart-fill",path:"/construccion/dashboard"},{label:"Tablero Operativo",icon:"bi-kanban-fill",path:"/construccion/operaciones"}]},{key:"retail",nombre:"Retail",desc:"Punto de venta, inventario inteligente, programa de lealtad y análisis de ventas.",icon:"bi-bag-heart-fill",accent:"#10b981",accentRgb:"16,185,129",empresa:"Storely",demos:[{label:"CRM de Clientes",icon:"bi-people-fill",path:"/retail/crm"},{label:"Dashboard de Ventas",icon:"bi-bar-chart-fill",path:"/retail/dashboard"},{label:"Punto de Venta",icon:"bi-cart-fill",path:"/retail/operaciones"}]},{key:"servicios",nombre:"Servicios",desc:"CRM para empresas de servicios, gestión de tickets, agenda y seguimiento de contratos.",icon:"bi-lightning-charge-fill",accent:"#8b5cf6",accentRgb:"139,92,246",empresa:"FlowService",demos:[{label:"CRM de Clientes",icon:"bi-people-fill",path:"/servicios/crm"},{label:"Dashboard MRR",icon:"bi-bar-chart-fill",path:"/servicios/dashboard"},{label:"Gestión de Tickets",icon:"bi-headset",path:"/servicios/operaciones"}]},{key:"saas",nombre:"SaaS / Software",desc:"MRR, ARR, churn, pipeline de ventas, onboarding y métricas de crecimiento B2B.",icon:"bi-rocket-takeoff-fill",accent:"#6366f1",accentRgb:"99,102,241",empresa:"LaunchPad",demos:[{label:"CRM de Cuentas",icon:"bi-buildings",path:"/saas/crm"},{label:"Dashboard SaaS",icon:"bi-bar-chart-fill",path:"/saas/dashboard"},{label:"Pipeline de Ventas",icon:"bi-kanban-fill",path:"/saas/operaciones"}]},{key:"educacion",nombre:"Educación",desc:"Academia y cursos: seguimiento de alumnos, asistencia, calificaciones y cobros.",icon:"bi-mortarboard-fill",accent:"#f59e0b",accentRgb:"245,158,11",empresa:"EduTrack",demos:[{label:"CRM de Alumnos",icon:"bi-people-fill",path:"/educacion/crm"},{label:"Dashboard Académico",icon:"bi-bar-chart-fill",path:"/educacion/dashboard"},{label:"Operaciones del Día",icon:"bi-calendar3",path:"/educacion/operaciones"}]},{key:"fitness",nombre:"Fitness & Gym",desc:"Membresías, control de acceso, clases grupales, trainers e ingresos del gimnasio.",icon:"bi-heart-pulse-fill",accent:"#ec4899",accentRgb:"236,72,153",empresa:"PowerGym",demos:[{label:"CRM de Miembros",icon:"bi-people-fill",path:"/fitness/crm"},{label:"Dashboard del Gym",icon:"bi-bar-chart-fill",path:"/fitness/dashboard"},{label:"Control de Acceso",icon:"bi-door-open-fill",path:"/fitness/operaciones"}]}];function On(){return`
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
      ${lh.map((i,t)=>`
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
  `}function Ln(){}const In=[{cat:"Gestión",icon:"bi-people-fill",color:"#6366f1",titulo:"CRM para PyMEs",desc:"Seguimiento de leads, clientes, cotizaciones y ventas en un solo lugar."},{cat:"Operaciones",icon:"bi-kanban-fill",color:"#f97316",titulo:"Tablero Kanban de Proyectos",desc:"Visualiza el avance de tus proyectos con metodología ágil adaptada a tu equipo."},{cat:"E-commerce",icon:"bi-cart-fill",color:"#10b981",titulo:"Tienda en línea propia",desc:"Sin comisiones de terceros. Tu catálogo, tus precios, tu marca."},{cat:"Logística",icon:"bi-truck-fill",color:"#eab308",titulo:"Control de Flotilla",desc:"Rastreo de unidades, asignación de rutas y reportes de combustible."},{cat:"RH",icon:"bi-person-badge-fill",color:"#8b5cf6",titulo:"Portal de Empleados",desc:"Vacaciones, nómina, expedientes digitales y comunicados internos."},{cat:"Salud",icon:"bi-clipboard2-pulse-fill",color:"#06b6d4",titulo:"Expediente Clínico Digital",desc:"Historial médico completo, recetas, estudios y seguimiento por paciente."},{cat:"Educación",icon:"bi-mortarboard-fill",color:"#f97316",titulo:"Plataforma de Cursos",desc:"Clases en video, evaluaciones, certificados y seguimiento de alumnos."},{cat:"Restaurantes",icon:"bi-cup-hot-fill",color:"#ef4444",titulo:"Sistema de Comandas",desc:"Órdenes en tiempo real entre sala, cocina y barra. Sin errores."},{cat:"Construcción",icon:"bi-building-fill",color:"#eab308",titulo:"Control de Obras",desc:"Avance por actividad, bitácora diaria, alertas de materiales y presupuesto."},{cat:"Finanzas",icon:"bi-cash-coin",color:"#10b981",titulo:"Facturación & Cobranza",desc:"Genera facturas CFDI, da seguimiento a pagos y anticipa tu flujo de caja."},{cat:"E-commerce",icon:"bi-bag-heart-fill",color:"#ec4899",titulo:"Programa de Lealtad",desc:"Puntos, niveles, recompensas y comunicación directa con tus clientes frecuentes."},{cat:"Logística",icon:"bi-box-seam-fill",color:"#06b6d4",titulo:"Inventario Inteligente",desc:"Alertas de stock mínimo, trazabilidad de lotes y reportes de rotación."},{cat:"Servicios",icon:"bi-headset",color:"#8b5cf6",titulo:"Mesa de Ayuda (Helpdesk)",desc:"Tickets, SLAs, prioridades y satisfacción del cliente en tiempo real."},{cat:"Marketing",icon:"bi-megaphone-fill",color:"#f97316",titulo:"Automatización de Marketing",desc:"Campañas por WhatsApp, email y SMS activadas por comportamiento del cliente."},{cat:"Salud",icon:"bi-calendar-check-fill",color:"#06b6d4",titulo:"Agenda Médica Online",desc:"Citas por internet, recordatorios automáticos y gestión de consultorios."},{cat:"RH",icon:"bi-graph-up-arrow",color:"#10b981",titulo:"Dashboard de RRHH",desc:"Productividad, asistencia, rotación y métricas de clima laboral."},{cat:"Construcción",icon:"bi-people-fill",color:"#eab308",titulo:"Control de Personal en Obra",desc:"Asistencia con QR, asignación de cuadrillas y registro de incidencias."},{cat:"Finanzas",icon:"bi-bar-chart-fill",color:"#6366f1",titulo:"Reportes Ejecutivos",desc:"KPIs clave de tu negocio en un dashboard que puedes ver desde el celular."},{cat:"Educación",icon:"bi-phone-fill",color:"#f97316",titulo:"App Escolar para Padres",desc:"Calificaciones, avisos, pagos y comunicación directa con maestros."},{cat:"Gestión",icon:"bi-file-earmark-text-fill",color:"#8b5cf6",titulo:"Contratos Digitales",desc:"Firma electrónica, versionado y recordatorios de renovación de contratos."},{cat:"Marketing",icon:"bi-qr-code",color:"#ec4899",titulo:"Portal de Clientes",desc:"Cada cliente accede a su estado de cuenta, facturas y tickets de soporte."},{cat:"Servicios",icon:"bi-calendar3",color:"#06b6d4",titulo:"Agenda Inteligente",desc:"Reservas online con disponibilidad en tiempo real y pagos integrados."}],ch=["Todas",...new Set(In.map(i=>i.cat))];function dh(){return`
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
      ${ch.map((i,t)=>`
        <button class="btn-nux ${t===0?"btn-primary-nux":"btn-ghost-nux"} cat-filter-btn" data-cat="${i}"
          style="font-size:13px;padding:7px 16px">
          ${i}
        </button>
      `).join("")}
    </div>

    <!-- Ideas grid -->
    <div class="row g-3" id="ideas-grid">
      ${In.map((i,t)=>`
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
          onmouseenter="this.style.background='rgba(255,255,255,0.05)';this.style.borderColor='rgba(${jn(i.color)},0.30)';this.style.transform='translateY(-2px)'"
          onmouseleave="this.style.background='rgba(255,255,255,0.025)';this.style.borderColor='rgba(255,255,255,0.07)';this.style.transform='none'"
          >
            <div style="display:flex;align-items:flex-start;gap:14px">
              <div style="
                width:44px;height:44px;border-radius:12px;flex-shrink:0;
                display:flex;align-items:center;justify-content:center;font-size:20px;
                background:${fa(i.color,.12)};
                color:${i.color};
                border:1px solid ${fa(i.color,.2)};
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
  `}function jn(i){const t=parseInt(i.slice(1,3),16),e=parseInt(i.slice(3,5),16),s=parseInt(i.slice(5,7),16);return`${t},${e},${s}`}function fa(i,t){return`rgba(${jn(i)},${t})`}function ph(){const i=document.querySelectorAll(".cat-filter-btn"),t=document.querySelectorAll(".idea-card-wrap");i.forEach(e=>{e.addEventListener("click",()=>{i.forEach(o=>{o.classList.remove("btn-primary-nux"),o.classList.add("btn-ghost-nux")}),e.classList.add("btn-primary-nux"),e.classList.remove("btn-ghost-nux");const s=e.dataset.cat;t.forEach(o=>{s==="Todas"||o.dataset.cat===s?o.style.display="":o.style.display="none"})})})}function hh(i,t,e=1200,s="",o=""){if(!i)return;const a=performance.now(),n=typeof t=="string"?parseFloat(t.replace(/[^0-9.]/g,"")):t;function r(l){const c=l-a,d=Math.min(c/e,1),p=1-Math.pow(1-d,3),h=Math.floor(p*n);i.textContent=s+h.toLocaleString("es-MX")+o,d<1?requestAnimationFrame(r):i.textContent=s+n.toLocaleString("es-MX")+o}requestAnimationFrame(r)}function Fn(){document.querySelectorAll("[data-counter]").forEach(t=>{const e=t.dataset.counter,s=t.dataset.prefix||"",o=t.dataset.suffix||"",a=parseInt(t.dataset.duration||"1200");hh(t,e,a,s,o)})}function gh(){const i=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting&&(e.target.classList.add("anim-fade-up"),e.target.style.opacity="1",i.unobserve(e.target))})},{threshold:.1});document.querySelectorAll("[data-reveal]").forEach(t=>{t.style.opacity="0",i.observe(t)})}const Bn=(i="1.25rem")=>`<span style="font-family:'Inter',sans-serif;font-size:${i};font-weight:800;letter-spacing:0.2em;line-height:1;display:inline-block"><span style="color:#159b8a">NUX</span><span style="color:#ffffff">ORB</span></span>`;function uh(i=36){return Bn("1rem")}function fh(i=36){return Bn("1.3rem")}function bh(i){return`
  <div style="--industry-accent:#6366f1;--industry-accent-rgb:99,102,241">
    <nav class="home-navbar" id="home-navbar">
      <div onclick="window.location.hash='/'" style="cursor:pointer;display:flex;align-items:center">
        ${fh(52)}
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
      ${i}
    </div>
  </div>
  <div id="toast-container"></div>
  `}function mh(){const i=document.getElementById("home-navbar"),t=document.getElementById("home-hamburger"),e=document.getElementById("home-mobile-nav"),s=()=>i&&i.classList.toggle("scrolled",window.scrollY>40);window.addEventListener("scroll",s,{passive:!0}),s(),window.scrollToSection=o=>{const a=document.getElementById(o);a&&a.scrollIntoView({behavior:"smooth"})},window.__closeHomeNav=()=>{e&&e.classList.remove("open"),t&&(t.querySelector("i").className="bi bi-list")},t&&e&&t.addEventListener("click",()=>{const o=e.classList.toggle("open");t.querySelector("i").className=o?"bi bi-x-lg":"bi bi-list"}),gh()}let At=!1;function xh(){return At}function vh(i,t,e){const s=e.company,o=e.sidebarBg||"",a=o?`style="background:${o}"`:"";return`
  <aside class="sidebar ${At?"collapsed":""}" id="main-sidebar" ${a}>
    <div class="sidebar-header">
      <div style="display:flex;align-items:center;justify-content:center;width:36px;height:36px;flex-shrink:0">
        ${uh(32)}
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
      ${e.groups.map(n=>`
        <div class="sidebar-group-label">${n.label}</div>
        ${n.items.map(r=>`
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
  `}function yh(){const i=document.getElementById("sidebar-toggle");i&&i.addEventListener("click",()=>{At=!At;const t=document.getElementById("main-sidebar"),e=document.getElementById("demo-main");t&&t.classList.toggle("collapsed",At),e&&e.classList.toggle("sidebar-collapsed",At),i.title=At?"Expandir":"Colapsar",i.querySelector("i").className=`bi ${At?"bi-chevron-right":"bi-chevron-left"}`}),document.querySelectorAll(".sidebar-nav-item[data-path]").forEach(t=>{t.addEventListener("click",()=>{th(t.dataset.path)})})}const Vn={restaurantes:{accent:"#f97316",accentRgb:"249,115,22",theme:"dark",sidebarBg:"#130d06",company:{nombre:"La Mesa Digital",giro:"Restaurante & Bar",logo:"bi-cup-hot-fill"},groups:[{label:"Operación",items:[{icon:"bi-grid-3x3",label:"Mesas",path:"/restaurantes/operaciones"},{icon:"bi-receipt",label:"Órdenes",path:"/restaurantes/operaciones"}]},{label:"Gestión",items:[{icon:"bi-people-fill",label:"Clientes",path:"/restaurantes/crm"},{icon:"bi-graph-up",label:"Dashboard",path:"/restaurantes/dashboard"},{icon:"bi-journal-richtext",label:"Recetas",path:"/restaurantes/operaciones"}]},{label:"Config",items:[{icon:"bi-person-lines-fill",label:"Meseros",path:"/restaurantes/crm"},{icon:"bi-gear-fill",label:"Configuración",path:"/restaurantes/operaciones"}]}]},salud:{accent:"#0284c7",accentRgb:"2,132,199",theme:"light",sidebarBg:"#ffffff",company:{nombre:"MediCore",giro:"Clínica Médica",logo:"bi-heart-pulse-fill"},groups:[{label:"Clínica",items:[{icon:"bi-calendar-check",label:"Citas",path:"/salud/operaciones"},{icon:"bi-people-fill",label:"Pacientes",path:"/salud/crm"},{icon:"bi-building-fill",label:"Consultorios",path:"/salud/operaciones"}]},{label:"Gestión",items:[{icon:"bi-graph-up-arrow",label:"Dashboard",path:"/salud/dashboard"},{icon:"bi-capsule",label:"Inventario",path:"/salud/operaciones"}]},{label:"Sistema",items:[{icon:"bi-shield-plus",label:"Expedientes",path:"/salud/crm"},{icon:"bi-gear-fill",label:"Configuración",path:"/salud/operaciones"}]}]},construccion:{accent:"#eab308",accentRgb:"234,179,8",theme:"dark",sidebarBg:"#0f0c03",company:{nombre:"BuildPro",giro:"Constructora",logo:"bi-building-gear"},groups:[{label:"Obras",items:[{icon:"bi-hammer",label:"Proyectos",path:"/construccion/crm"},{icon:"bi-kanban-fill",label:"Tablero",path:"/construccion/operaciones"},{icon:"bi-box-seam-fill",label:"Materiales",path:"/construccion/operaciones"}]},{label:"Gestión",items:[{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/construccion/dashboard"},{icon:"bi-people-fill",label:"Personal",path:"/construccion/crm"}]},{label:"Admin",items:[{icon:"bi-file-earmark-text",label:"Contratos",path:"/construccion/crm"},{icon:"bi-gear-fill",label:"Configuración",path:"/construccion/operaciones"}]}]},retail:{accent:"#059669",accentRgb:"5,150,105",theme:"light",sidebarBg:"#f0fdf9",company:{nombre:"Storely",giro:"Retail & Tienda",logo:"bi-bag-heart-fill"},groups:[{label:"Ventas",items:[{icon:"bi-cart-fill",label:"Punto de Venta",path:"/retail/operaciones"},{icon:"bi-people-fill",label:"Clientes",path:"/retail/crm"},{icon:"bi-tags-fill",label:"Promociones",path:"/retail/operaciones"}]},{label:"Inventario",items:[{icon:"bi-box-seam-fill",label:"Productos",path:"/retail/operaciones"},{icon:"bi-arrow-repeat",label:"Devoluciones",path:"/retail/operaciones"}]},{label:"Reportes",items:[{icon:"bi-graph-up-arrow",label:"Dashboard",path:"/retail/dashboard"},{icon:"bi-gear-fill",label:"Configuración",path:"/retail/operaciones"}]}]},servicios:{accent:"#8b5cf6",accentRgb:"139,92,246",theme:"dark",sidebarBg:"#0c0a1a",company:{nombre:"FlowService",giro:"Servicios Profesionales",logo:"bi-lightning-charge-fill"},groups:[{label:"Clientes",items:[{icon:"bi-people-fill",label:"Clientes",path:"/servicios/crm"},{icon:"bi-headset",label:"Tickets",path:"/servicios/operaciones"},{icon:"bi-calendar3",label:"Agenda",path:"/servicios/operaciones"}]},{label:"Operación",items:[{icon:"bi-lightning-fill",label:"Servicios",path:"/servicios/operaciones"},{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/servicios/dashboard"}]},{label:"Admin",items:[{icon:"bi-file-earmark-text",label:"Contratos",path:"/servicios/crm"},{icon:"bi-gear-fill",label:"Configuración",path:"/servicios/operaciones"}]}]},saas:{accent:"#6366f1",accentRgb:"99,102,241",theme:"dark",sidebarBg:"#08091e",company:{nombre:"LaunchPad",giro:"SaaS B2B",logo:"bi-rocket-takeoff-fill"},groups:[{label:"Clientes",items:[{icon:"bi-buildings",label:"Cuentas",path:"/saas/crm"},{icon:"bi-kanban-fill",label:"Pipeline",path:"/saas/operaciones"}]},{label:"Producto",items:[{icon:"bi-graph-up-arrow",label:"Dashboard",path:"/saas/dashboard"},{icon:"bi-people-fill",label:"Usuarios",path:"/saas/crm"}]},{label:"Admin",items:[{icon:"bi-file-earmark-text",label:"Contratos",path:"/saas/crm"},{icon:"bi-gear-fill",label:"Config",path:"/saas/operaciones"}]}]},educacion:{accent:"#d97706",accentRgb:"217,119,6",theme:"light",sidebarBg:"#fffcf0",company:{nombre:"EduTrack",giro:"Academia & Cursos",logo:"bi-mortarboard-fill"},groups:[{label:"Alumnos",items:[{icon:"bi-people-fill",label:"Alumnos",path:"/educacion/crm"},{icon:"bi-calendar3",label:"Operaciones",path:"/educacion/operaciones"}]},{label:"Académico",items:[{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/educacion/dashboard"},{icon:"bi-book-fill",label:"Cursos",path:"/educacion/crm"}]},{label:"Admin",items:[{icon:"bi-cash-stack",label:"Pagos",path:"/educacion/crm"},{icon:"bi-gear-fill",label:"Config",path:"/educacion/operaciones"}]}]},fitness:{accent:"#ec4899",accentRgb:"236,72,153",theme:"dark",sidebarBg:"#160610",company:{nombre:"PowerGym",giro:"Gimnasio & Fitness",logo:"bi-lightning-charge-fill"},groups:[{label:"Miembros",items:[{icon:"bi-people-fill",label:"Miembros",path:"/fitness/crm"},{icon:"bi-door-open-fill",label:"Accesos",path:"/fitness/operaciones"}]},{label:"Clases",items:[{icon:"bi-bar-chart-fill",label:"Dashboard",path:"/fitness/dashboard"},{icon:"bi-calendar3",label:"Horarios",path:"/fitness/operaciones"}]},{label:"Admin",items:[{icon:"bi-cash-stack",label:"Pagos",path:"/fitness/crm"},{icon:"bi-gear-fill",label:"Config",path:"/fitness/operaciones"}]}]}};function wh(i,t,e){const s=Vn[i];return`
  <header class="topbar">
    <div class="topbar-left">
      <button class="sidebar-mobile-toggle" id="sidebar-mobile-toggle" aria-label="Abrir menú">
        <i class="bi bi-list"></i>
      </button>
      <button class="back-btn" onclick="window.location.hash='/${i}'">
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
  `}function _h(i,t,e,s){const o=Vn[i],a=xh();return`
  <div class="demo-wrapper theme-${o.theme||"dark"}" style="--industry-accent:${o.accent};--industry-accent-rgb:${o.accentRgb}">
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    ${vh(i,s,o)}
    <div class="demo-main ${a?"sidebar-collapsed":""}" id="demo-main">
      ${wh(i,t)}
      <main class="demo-content">
        ${e}
      </main>
    </div>
  </div>
  <div id="toast-container"></div>
  `}function $h(){yh(),Fn();const i=document.getElementById("sidebar-mobile-toggle"),t=document.getElementById("sidebar-overlay"),e=document.getElementById("main-sidebar");function s(){e&&e.classList.add("mobile-open"),t&&t.classList.add("active"),document.body.style.overflow="hidden"}function o(){e&&e.classList.remove("mobile-open"),t&&t.classList.remove("active"),document.body.style.overflow=""}i&&i.addEventListener("click",s),t&&t.addEventListener("click",o),document.querySelectorAll(".sidebar-nav-item[data-path]").forEach(a=>{a.addEventListener("click",()=>{window.innerWidth<768&&o()})})}const z={nombre:"La Mesa Digital",giro:"Restaurante & Bar",logo:"bi-cup-hot-fill",accent:"#f97316",accentRgb:"249, 115, 22"},kh=[{id:1,zona:"Interior",cap:4,estado:"ocupada",mesero:"Luis G.",orden:"ORD-041",tiempo:"22 min",ticket:"$480"},{id:2,zona:"Interior",cap:2,estado:"ocupada",mesero:"Paola R.",orden:"ORD-042",tiempo:"8 min",ticket:"$190"},{id:3,zona:"Interior",cap:6,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:4,zona:"Interior",cap:4,estado:"reservada",mesero:"",orden:"",tiempo:"18:30",ticket:""},{id:5,zona:"Terraza",cap:4,estado:"ocupada",mesero:"Carlos M.",orden:"ORD-043",tiempo:"41 min",ticket:"$620"},{id:6,zona:"Terraza",cap:2,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:7,zona:"Terraza",cap:6,estado:"ocupada",mesero:"Luis G.",orden:"ORD-044",tiempo:"14 min",ticket:"$310"},{id:8,zona:"Bar",cap:2,estado:"ocupada",mesero:"Paola R.",orden:"ORD-045",tiempo:"5 min",ticket:"$150"},{id:9,zona:"Bar",cap:2,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:10,zona:"VIP",cap:8,estado:"reservada",mesero:"",orden:"",tiempo:"20:00",ticket:""},{id:11,zona:"VIP",cap:6,estado:"disponible",mesero:"",orden:"",tiempo:"",ticket:""},{id:12,zona:"Interior",cap:4,estado:"ocupada",mesero:"Carlos M.",orden:"ORD-046",tiempo:"31 min",ticket:"$540"}],Mh=[{id:"ORD-041",mesa:1,mesero:"Luis G.",items:["Costilla BBQ x2","Guacamole","Limonada x2"],estado:"en cocina",tiempo:"22 min",total:"$480"},{id:"ORD-042",mesa:2,mesero:"Paola R.",items:["Sopa de Lima","Agua x2"],estado:"entregada",tiempo:"8 min",total:"$190"},{id:"ORD-043",mesa:5,mesero:"Carlos M.",items:["Carne Asada x3","Margarita x2","Postre x3"],estado:"esperando",tiempo:"41 min",total:"$620"},{id:"ORD-044",mesa:7,mesero:"Luis G.",items:["Tacos x4","Cerveza x2"],estado:"en cocina",tiempo:"14 min",total:"$310"},{id:"ORD-045",mesa:8,mesero:"Paola R.",items:["Michelada x2"],estado:"lista",tiempo:"5 min",total:"$150"},{id:"ORD-046",mesa:12,mesero:"Carlos M.",items:["Enchiladas x2","Pozole","Agua x3"],estado:"en cocina",tiempo:"31 min",total:"$540"}],ba={labels:["11am","12pm","1pm","2pm","3pm","4pm","5pm","6pm","7pm","8pm","9pm"],data:[1200,3400,5800,6200,4100,2300,2800,5200,7400,8100,6300]},ma={labels:["Platos Fuertes","Bebidas","Entradas","Postres","Especialidades"],data:[42,28,15,8,7]};function Sh(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${z.accent};--industry-accent-rgb:${z.accentRgb}">

    <!-- Fondo -->
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${z.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>

    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'">
        <i class="bi bi-arrow-left"></i> Todas las industrias
      </button>

      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${z.accent};margin-bottom:14px">
            <i class="bi ${z.logo}"></i> ${z.giro}
          </div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">
            Software diseñado para <span style="color:${z.accent}">${z.nombre}</span>
          </h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">
            Así podría verse el sistema de gestión de tu restaurante. Control total de mesas, órdenes, clientes y reportes desde una sola plataforma.
          </p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/restaurantes/crm",icon:"bi-people-fill",label:"CRM de Clientes",desc:"Frecuencia, preferencias y valor de cada cliente."},{path:"/restaurantes/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard Ejecutivo",desc:"Ventas, ticket promedio, mesas y satisfacción."},{path:"/restaurantes/operaciones",icon:"bi-grid-3x3",label:"Portal de Operaciones",desc:"Mesas en tiempo real, órdenes y estado de cocina."}].map(i=>`
              <div onclick="window.location.hash='${i.path}'" style="
                display:flex;align-items:center;gap:16px;padding:16px 20px;
                background:rgba(${z.accentRgb},0.06);
                border:1px solid rgba(${z.accentRgb},0.18);
                border-radius:var(--radius-lg);cursor:pointer;
                transition:all 0.25s ease;
              "
              onmouseenter="this.style.background='rgba(${z.accentRgb},0.12)';this.style.borderColor='rgba(${z.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${z.accentRgb},0.06)';this.style.borderColor='rgba(${z.accentRgb},0.18)'"
              >
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${z.accentRgb},0.15);color:${z.accent};flex-shrink:0">
                  <i class="bi ${i.icon}"></i>
                </div>
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
          <!-- Preview card decorativo -->
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${z.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${z.accent},transparent)"></div>

            <!-- Simulated topbar -->
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${z.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${z.accent};font-size:16px">
                <i class="bi ${z.logo}"></i>
              </div>
              <div>
                <div style="font-size:14px;font-weight:700;color:white">${z.nombre}</div>
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
                  <div style="flex:1;height:${i}%;background:rgba(${z.accentRgb},${.3+i/250});border-radius:3px 3px 0 0"></div>
                `).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}function j({icon:i,label:t,value:e,delta:s,trend:o,prefix:a="",suffix:n="",animate:r=!0,extra:l="",cardColor:c=null,deltaLabel:d="vs ayer"}){const p=o==="up"?"bi-arrow-up-right":o==="down"?"bi-arrow-down-right":"",h=o==="up"?"up":o==="down"?"down":"",g=r&&typeof e=="number"?`data-counter="${e}" data-prefix="${a}" data-suffix="${n}"`:"";return c?`
    <div class="kpi-card anim-fade-up" style="background:${c};border-color:transparent">
      <div style="position:absolute;top:-16px;right:-16px;width:72px;height:72px;border-radius:50%;background:rgba(255,255,255,0.08);pointer-events:none"></div>
      <div style="width:34px;height:34px;border-radius:8px;background:rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;font-size:16px;color:white;margin-bottom:14px;flex-shrink:0;position:relative">
        <i class="bi ${i}"></i>
      </div>
      <div style="font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px">${t}</div>
      <div class="${r&&typeof e=="number"?"counter-anim":""}" style="font-size:2rem;font-weight:800;color:white;letter-spacing:-0.03em;line-height:1;position:relative" ${g}>
        ${typeof e=="number"?a+e.toLocaleString("es-MX")+n:e}
      </div>
      ${s?`
      <div style="margin-top:8px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:4px;color:rgba(255,255,255,0.72)">
        ${p?`<i class="bi ${p}"></i>`:""}
        <span>${s} ${d}</span>
      </div>`:""}
      ${l}
    </div>`:`
  <div class="kpi-card anim-fade-up">
    <div class="kpi-icon"><i class="bi ${i}"></i></div>
    <div class="kpi-label">${t}</div>
    <div class="kpi-value ${r&&typeof e=="number"?"counter-anim":""}" ${g}>
      ${typeof e=="number"?a+e.toLocaleString("es-MX")+n:e}
    </div>
    ${s?`
    <div class="kpi-delta ${h}">
      ${p?`<i class="bi ${p}"></i>`:""}
      <span>${s} ${d}</span>
    </div>`:""}
    ${l}
  </div>`}function Xt(i,t=4){return`
  <div class="row g-3 mb-4">
    ${i.map(e=>`
      <div class="col-lg-${Math.floor(12/t)} col-md-6">
        ${j(e)}
      </div>
    `).join("")}
  </div>
  `}function Kt({stages:i,currentIndex:t,accent:e}){return`
  <div style="display:flex;margin-bottom:24px;border-radius:var(--radius-md);overflow:hidden;border:1px solid rgba(255,255,255,0.08)">
    ${i.map((s,o)=>{const a=o===t,n=o<t,r=a?e:n?e+"28":"rgba(255,255,255,0.025)";return`
      <div style="
        flex:1;padding:11px 6px;text-align:center;
        font-size:11.5px;font-weight:${a?"700":"500"};
        background:${r};color:${a?"#fff":n?e:"rgba(255,255,255,0.28)"};
        border-right:${o<i.length-1?"1px solid rgba(255,255,255,0.06)":"none"};
        white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
        display:flex;align-items:center;justify-content:center;gap:4px;
        cursor:default;user-select:none;
      ">
        ${n?'<i class="bi bi-check2" style="font-size:11px;flex-shrink:0"></i>':""}
        <span>${s}</span>
      </div>`}).join("")}
  </div>`}function qt(i,t){return i.map(e=>`
    <span style="
      display:inline-flex;align-items:center;gap:5px;
      padding:3px 10px;border-radius:var(--radius-full);
      background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.10);
      font-size:11.5px;font-weight:600;color:rgba(255,255,255,0.65);
      white-space:nowrap;
    ">${e}</span>
  `).join("")}const St={nombre:"Carlos Mendoza Reyes",iniciales:"CM",telefono:"55 1234 5678",email:"carlos.mendoza@gmail.com",cumple:"15 de Marzo",miembro_desde:"Enero 2021",preferencias:"Mesa exterior, sin picante, vino tinto",puntos:4820,mesero_fav:"Luis González",proxima_reserva:"Sábado 29 Jun · 20:30"},zh=[{fecha:"Hoy 14:20",mesa:7,personas:2,platillos:"Carne Asada · Margarita x2",total:"$480",estado:"Completada",color:"#16a34a"},{fecha:"Hace 3 días",mesa:5,personas:4,platillos:"Costilla BBQ x2 · Guacamole · Agua x4",total:"$860",estado:"Completada",color:"#16a34a"},{fecha:"Hace 1 sem",mesa:12,personas:2,platillos:"Tacos x4 · Cerveza artesanal x2",total:"$310",estado:"Completada",color:"#16a34a"},{fecha:"Hace 2 sem",mesa:3,personas:6,platillos:"Menú degustación · Vino Malbec",total:"$1,240",estado:"Completada",color:"#16a34a"},{fecha:"Hace 1 mes",mesa:7,personas:2,platillos:"Salmón · Agua mineral · Postre",total:"$520",estado:"Completada",color:"#16a34a"},{fecha:"Hace 6 sem",mesa:5,personas:3,platillos:"Enchiladas · Pozole · Cerveza x3",total:"$410",estado:"Completada",color:"#16a34a"}],Ch=[{texto:"Enviar felicitación de cumpleaños (15 Mar)",icono:"bi-cake2-fill",color:"#f59e0b"},{texto:"Confirmar reserva del sábado",icono:"bi-calendar-check",color:z.accent},{texto:"Aplicar descuento fidelidad 10%",icono:"bi-tag-fill",color:"#6366f1"}];function Ah(){const i=["Nuevo","Recurrente","Frecuente","VIP","Embajador"];return`
  <div style="--industry-accent:${z.accent};--industry-accent-rgb:${z.accentRgb}">

    <!-- Encabezado del registro -->
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:${z.accent};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">
          ${St.iniciales}
        </div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${St.nombre}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">
            ${qt(["VIP ⭐","Frecuente","Sin picante","Mesa exterior"])}
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
    ${Kt({stages:i,currentIndex:3,accent:z.accent})}

    <!-- Body: dos columnas -->
    <div class="row g-3">

      <!-- Columna izquierda: perfil -->
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Perfil del cliente</div>

          ${[{icon:"bi-telephone-fill",label:"Teléfono",val:St.telefono},{icon:"bi-envelope-fill",label:"Email",val:St.email},{icon:"bi-cake2-fill",label:"Cumpleaños",val:St.cumple},{icon:"bi-calendar3",label:"Miembro desde",val:St.miembro_desde},{icon:"bi-person-heart-fill",label:"Mesero favorito",val:St.mesero_fav}].map(e=>`
            <div style="display:flex;gap:10px;margin-bottom:14px;align-items:flex-start">
              <i class="bi ${e.icon}" style="color:${z.accent};font-size:14px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${e.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:2px">${e.val}</div>
              </div>
            </div>
          `).join("")}

          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Preferencias</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.6">${St.preferencias}</div>
          </div>

          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="display:flex;justify-content:space-between;align-items:center">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">Puntos NUX</span>
              <span style="font-size:18px;font-weight:800;color:${z.accent}">${St.puntos.toLocaleString("es-MX")}</span>
            </div>
            <div style="margin-top:8px;height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:82%;background:${z.accent};border-radius:99px"></div>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.30);margin-top:5px">180 pts para nivel Embajador</div>
          </div>

          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">
              <i class="bi bi-calendar-event" style="margin-right:4px"></i>Próxima reserva
            </div>
            <div style="font-size:13px;font-weight:600;color:white">${St.proxima_reserva}</div>
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
              <i class="bi bi-lightning-charge-fill" style="color:${z.accent}"></i>
              Próximas acciones
            </h3>
            <button class="btn-nux btn-accent-nux" style="font-size:12px;padding:5px 10px" onclick="window.__toastSuccess&&window.__toastSuccess('Acción añadida')">
              <i class="bi bi-plus"></i> Añadir
            </button>
          </div>
          ${Ch.map(e=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);cursor:pointer"
              onclick="window.__toastSuccess&&window.__toastSuccess('Acción marcada como completada')">
              <div style="width:30px;height:30px;border-radius:8px;background:${e.color}22;border:1px solid ${e.color}44;display:flex;align-items:center;justify-content:center;flex-shrink:0">
                <i class="bi ${e.icono}" style="color:${e.color};font-size:13px"></i>
              </div>
              <span style="font-size:13px;color:rgba(255,255,255,0.72);flex:1">${e.texto}</span>
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
                ${zh.map(e=>`
                  <tr>
                    <td style="color:rgba(255,255,255,0.50);white-space:nowrap">${e.fecha}</td>
                    <td><strong>M${e.mesa}</strong></td>
                    <td><span style="color:rgba(255,255,255,0.50)">${e.personas} pax</span></td>
                    <td style="font-size:12px;color:rgba(255,255,255,0.55);max-width:200px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${e.platillos}</td>
                    <td style="text-align:right;font-weight:700;color:${z.accent}">${e.total}</td>
                    <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${e.color}22;color:${e.color};border:1px solid ${e.color}33">${e.estado}</span></td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const Ph=[{n:1,p:4,estado:"ocupado",tiempo:"42m"},{n:2,p:2,estado:"libre",tiempo:""},{n:3,p:6,estado:"ocupado",tiempo:"18m"},{n:4,p:4,estado:"reservado",tiempo:"20:30"},{n:5,p:2,estado:"ocupado",tiempo:"55m"},{n:6,p:4,estado:"libre",tiempo:""},{n:7,p:8,estado:"ocupado",tiempo:"12m"},{n:8,p:4,estado:"libre",tiempo:""},{n:9,p:6,estado:"ocupado",tiempo:"8m"},{n:10,p:2,estado:"ocupado",tiempo:"37m"},{n:11,p:4,estado:"libre",tiempo:""},{n:12,p:4,estado:"ocupado",tiempo:"22m"},{n:13,p:2,estado:"reservado",tiempo:"21:00"},{n:14,p:6,estado:"libre",tiempo:""},{n:15,p:4,estado:"ocupado",tiempo:"5m"},{n:16,p:2,estado:"libre",tiempo:""},{n:17,p:4,estado:"ocupado",tiempo:"48m"},{n:18,p:8,estado:"ocupado",tiempo:"31m"},{n:19,p:4,estado:"libre",tiempo:""},{n:20,p:2,estado:"reservado",tiempo:"21:30"}],ze={ocupado:"#f97316",libre:"#22c55e",reservado:"#f59e0b"},Rh=[{mesa:3,items:"Tacos x3, Agua",total:"$285",min:18},{mesa:7,items:"Carne asada, Vino",total:"$680",min:12},{mesa:9,items:"Pizza, 2 Cervezas",total:"$320",min:8},{mesa:10,items:"Sopa, Enchiladas",total:"$195",min:37},{mesa:15,items:"Hamburguesa, Refresco",total:"$145",min:5}];function Dh(){const i=[{icon:"bi-grid-3x3",label:"Mesas Activas",value:14,suffix:"/20",delta:"+2 vs ayer",trend:"up",animate:!1},{icon:"bi-cash-stack",label:"Ventas Hoy",value:"$18,740",delta:"+12%",trend:"up",animate:!1},{icon:"bi-receipt",label:"Ticket Promedio",value:"$324",delta:"+8%",trend:"up",animate:!1},{icon:"bi-star-fill",label:"Satisfacción",value:"4.8",suffix:" ⭐",delta:"+0.2",trend:"up",animate:!1}];return`
  <div style="--industry-accent:${z.accent};--industry-accent-rgb:${z.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-grid-3x3" style="color:${z.accent};margin-right:10px"></i>Dashboard del Restaurante
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">La Mesa Digital — ${new Date().toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"})}</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(249,115,22,0.10);border:1px solid rgba(249,115,22,0.25);border-radius:var(--radius-md);font-size:13px;color:${z.accent}">
        <span class="status-dot active"></span> Cocina activa · 7 órdenes en proceso
      </div>
    </div>

    ${Xt(i,4)}

    <!-- MAPA DE MESAS -->
    <div class="row g-3 mb-3">
      <div class="col-lg-8">
        <div class="glass-card p-4">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:700;color:white">
              <i class="bi bi-grid-3x3" style="color:${z.accent};margin-right:8px"></i>Mapa del Salón
            </h3>
            <div style="display:flex;gap:14px;font-size:11px">
              ${Object.entries(ze).map(([t,e])=>`<span style="display:flex;align-items:center;gap:5px;color:rgba(255,255,255,0.50)"><span style="width:10px;height:10px;border-radius:3px;background:${e};display:inline-block"></span>${t.charAt(0).toUpperCase()+t.slice(1)}</span>`).join("")}
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:8px">
            ${Ph.map(t=>`
              <div style="background:${ze[t.estado]}18;border:1.5px solid ${ze[t.estado]}60;border-radius:10px;padding:10px 6px;text-align:center;cursor:default;transition:all 0.2s"
                   onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform=''">
                <div style="font-size:10px;font-weight:700;color:${ze[t.estado]};letter-spacing:0.06em;text-transform:uppercase">M${t.n}</div>
                <div style="font-size:16px;font-weight:800;color:white;margin:2px 0">${t.p}<span style="font-size:10px;font-weight:400;color:rgba(255,255,255,0.40)">p</span></div>
                <div style="font-size:10px;color:${ze[t.estado]};font-weight:600">${t.tiempo||"—"}</div>
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
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${z.accent},rgba(249,115,22,0.3))"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">
            <i class="bi bi-fire" style="color:${z.accent};margin-right:8px"></i>Órdenes Activas
          </h3>
          ${Rh.map(t=>`
            <div style="padding:12px;margin-bottom:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);border-left:3px solid ${t.min<10?"#22c55e":t.min>30?"#f87171":z.accent}">
              <div style="display:flex;justify-content:space-between;margin-bottom:4px">
                <span style="font-size:12px;font-weight:700;color:white">Mesa ${t.mesa}</span>
                <span style="font-size:12px;font-weight:700;color:${z.accent}">${t.total}</span>
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
  `}function Th(){Li("chart-ventas-hora",{labels:ba.labels,datasets:[{label:"Ventas ($)",data:ba.data}]}),ji("chart-categorias",{labels:ma.labels,data:ma.data,height:200}),Fn()}const xa={ocupada:{color:"#f97316",bg:"rgba(249,115,22,0.10)",border:"rgba(249,115,22,0.25)",label:"Ocupada"},disponible:{color:"#22c55e",bg:"rgba(34,197,94,0.10)",border:"rgba(34,197,94,0.25)",label:"Libre"},reservada:{color:"#f59e0b",bg:"rgba(245,158,11,0.10)",border:"rgba(245,158,11,0.25)",label:"Reservada"}},Eh={"en cocina":{color:"#f97316",label:"En cocina"},entregada:{color:"#22c55e",label:"Entregada"},esperando:{color:"#f59e0b",label:"Esperando"},lista:{color:"#4ade80",label:"Lista"}};function Oh(){return`
  <div style="--industry-accent:${z.accent};--industry-accent-rgb:${z.accentRgb}">

    <!-- Header -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-grid-3x3" style="color:${z.accent};margin-right:10px"></i>Portal de Operaciones
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">Mesas y órdenes en tiempo real — ${z.nombre}</p>
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
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${z.accent},transparent)"></div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
            <h3 style="font-size:15px;font-weight:700;color:white">Plano del restaurante</h3>
            <div style="display:flex;gap:10px">
              ${Object.entries(xa).map(([i,t])=>`
                <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.50)">
                  <div style="width:10px;height:10px;border-radius:3px;background:${t.color}"></div>
                  ${t.label}
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Zonas -->
          ${["Interior","Terraza","Bar","VIP"].map(i=>{const t=kh.filter(e=>e.zona===i);return`
            <div style="margin-bottom:16px">
              <div style="font-size:10px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:8px">${i}</div>
              <div style="display:flex;flex-wrap:wrap;gap:8px">
                ${t.map(e=>{const s=xa[e.estado];return`
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
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${z.accent},transparent)"></div>

          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
            <h3 style="font-size:15px;font-weight:700;color:white">Órdenes activas</h3>
            <button class="btn-nux btn-primary-nux" style="font-size:12px;padding:6px 12px" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva orden creada')">
              <i class="bi bi-plus-lg"></i> Nueva
            </button>
          </div>

          <div style="display:flex;flex-direction:column;gap:10px;max-height:520px;overflow-y:auto">
            ${Mh.map(i=>{const t=Eh[i.estado]||{color:"#888",label:i.estado};return`
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
                  <span style="font-size:14px;font-weight:700;color:${z.accent}">${i.total}</span>
                </div>
              </div>
              `}).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>
  `}const A={nombre:"MediCore",giro:"Clínica Médica",logo:"bi-heart-pulse-fill",accent:"#06b6d4",accentRgb:"6, 182, 212"},Lh=[{hora:"08:00",paciente:"Roberto Silva",doctor:"Dr. Reyes",tipo:"Consulta",estado:"atendido"},{hora:"08:30",paciente:"Lupita Morales",doctor:"Dra. Torres",tipo:"Seguimiento",estado:"atendido"},{hora:"09:00",paciente:"Daniel Herrera",doctor:"Dr. Medina",tipo:"Urgencia",estado:"atendido"},{hora:"09:30",paciente:"Gabriela Ríos",doctor:"Dra. Flores",tipo:"Pediatría",estado:"atendido"},{hora:"10:00",paciente:"Marcos Gutiérrez",doctor:"Dr. Reyes",tipo:"Consulta",estado:"atendido"},{hora:"10:30",paciente:"Verónica Núñez",doctor:"Dra. Torres",tipo:"Prenatal",estado:"en sala"},{hora:"11:00",paciente:"Héctor Ramírez",doctor:"Dr. Sánchez",tipo:"Dermatología",estado:"pendiente"},{hora:"11:30",paciente:"Adriana Castro",doctor:"Dra. Rojas",tipo:"Endocrinología",estado:"pendiente"},{hora:"14:00",paciente:"Elena Vázquez",doctor:"Dr. Reyes",tipo:"Control",estado:"en curso"},{hora:"14:30",paciente:"Fernando Castillo",doctor:"Dra. Torres",tipo:"Seguimiento",estado:"pendiente"},{hora:"15:00",paciente:"Patricia Gómez",doctor:"Dr. Medina",tipo:"Chequeo",estado:"pendiente"},{hora:"15:30",paciente:"Arturo Mendoza",doctor:"Dr. Vargas",tipo:"Neurología",estado:"pendiente"}],va={labels:["Lun","Mar","Mié","Jue","Vie","Sáb"],data:[28,34,31,38,42,18]},ya={labels:["Med. General","Ginecología","Cardiología","Pediatría","Dermatología","Otras"],data:[35,22,18,12,8,5]};function Ih(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${A.accent};--industry-accent-rgb:${A.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${A.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>

    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>

      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${A.accent};margin-bottom:14px">
            <i class="bi ${A.logo}"></i> ${A.giro}
          </div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">
            Software clínico para <span style="color:${A.accent}">${A.nombre}</span>
          </h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">
            Gestión completa de tu clínica: agenda de citas, expedientes, consultorios y estadísticas médicas en tiempo real.
          </p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/salud/crm",icon:"bi-people-fill",label:"Gestión de Pacientes",desc:"Expedientes, historial y próximas citas."},{path:"/salud/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard Clínico",desc:"Citas del día, ocupación y estadísticas."},{path:"/salud/operaciones",icon:"bi-calendar-check",label:"Agenda de Citas",desc:"Vista de consultorios y sala de espera."}].map(i=>`
              <div onclick="window.location.hash='${i.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${A.accentRgb},0.06);border:1px solid rgba(${A.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${A.accentRgb},0.12)';this.style.borderColor='rgba(${A.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${A.accentRgb},0.06)';this.style.borderColor='rgba(${A.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${A.accentRgb},0.15);color:${A.accent};flex-shrink:0"><i class="bi ${i.icon}"></i></div>
                <div style="flex:1">
                  <div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${i.label}</div>
                  <div style="font-size:13px;color:rgba(255,255,255,0.42)">${i.desc}</div>
                </div>
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
              <div><div style="font-size:14px;font-weight:700;color:white">${A.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Sistema clínico</div></div>
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
                      <div style="width:${t}%;height:100%;background:${A.accent};border-radius:3px"></div>
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
  `}const ht={nombre:"Elena Vázquez Mora",iniciales:"EV",edad:42,tel:"55 1234 5678",sangre:"A+",nss:"45871234",nacimiento:"14 Agosto 1982",doctor:"Dr. Alejandro Reyes",especialidad:"Medicina Interna",consultorio:"C-01",diagnosticos:["Hipertensión arterial (CIE-10: I10)","Dislipidemia (CIE-10: E78)","Sobrepeso (CIE-10: E66)"],alergias:["Penicilina","AINEs (moderado)"],proxima_cita:"Hoy — 14:30 h"},jh=[{nombre:"Losartán 50mg",dosis:"1 tab c/24h",inicio:"12 Ene 2025"},{nombre:"Atorvastatina 20mg",dosis:"1 tab c/24h",inicio:"12 Ene 2025"},{nombre:"Metformina 850mg",dosis:"1 tab c/12h",inicio:"04 Mar 2025"}],Fh=[{fecha:"Hoy 14:30",motivo:"Control mensual",doctor:"Dr. Reyes",dx:"Hipertensión",r:"Pendiente",c:"#f59e0b"},{fecha:"28 May 2025",motivo:"Rev. laboratorios",doctor:"Dr. Reyes",dx:"Colesterol elevado",r:"Ajuste tx",c:"#16a34a"},{fecha:"01 May 2025",motivo:"Control mensual",doctor:"Dr. Reyes",dx:"TA estable",r:"Estable",c:"#16a34a"},{fecha:"12 Mar 2025",motivo:"Revisión general",doctor:"Dr. Reyes",dx:"Evaluación inicial",r:"Inicio tx",c:"#16a34a"},{fecha:"20 Ene 2025",motivo:"Primera consulta",doctor:"Dr. Reyes",dx:"Diagnóstico emitido",r:"Dx",c:"#16a34a"}];function Bh(){const i=A.accent,t=[{icon:"bi-telephone-fill",label:"Teléfono",val:ht.tel},{icon:"bi-droplet-fill",label:"Tipo de sangre",val:ht.sangre},{icon:"bi-calendar3",label:"Nacimiento",val:`${ht.nacimiento}`},{icon:"bi-shield-fill",label:"NSS",val:ht.nss}];return`
  <div style="--industry-accent:${i};--industry-accent-rgb:${A.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:${i};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${ht.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">
            ${ht.nombre}
            <span style="font-size:13px;font-weight:400;color:rgba(255,255,255,0.38);margin-left:6px">${ht.edad} años · ${ht.sangre}</span>
          </h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${qt(["Hipertensión","Dislipidemia","⚠ Alerg. AINEs","Control mensual"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando receta...')"><i class="bi bi-file-earmark-medical"></i> Receta</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Cita agendada para Elena')"><i class="bi bi-calendar-plus"></i> Agendar</button>
      </div>
    </div>

    ${Kt({stages:["Primera cita","Diagnóstico","Tratamiento","Control","Alta"],currentIndex:2,accent:i})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Datos del paciente</div>
          ${t.map(e=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${e.icon}" style="color:${i};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${e.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${e.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:10px">Médico tratante</div>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar" style="background:rgba(6,182,212,0.18);color:${i}">R</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:white">${ht.doctor}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.40)">${ht.especialidad} · ${ht.consultorio}</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Alergias conocidas</div>
            <div style="display:flex;flex-wrap:wrap;gap:6px">${ht.alergias.map(e=>`<span style="padding:3px 8px;background:rgba(239,68,68,0.12);border:1px solid rgba(239,68,68,0.25);border-radius:99px;font-size:11px;color:#f87171;font-weight:600">${e}</span>`).join("")}</div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="display:flex;align-items:center;gap:8px;padding:10px;background:rgba(245,158,11,0.10);border:1px solid rgba(245,158,11,0.25);border-radius:var(--radius-md)">
              <i class="bi bi-alarm-fill" style="color:#f59e0b"></i>
              <div>
                <div style="font-size:11px;font-weight:700;color:#f59e0b">Próxima cita</div>
                <div style="font-size:13px;font-weight:600;color:white">${ht.proxima_cita}</div>
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
            <i class="bi bi-clipboard2-fill" style="color:${i}"></i> Diagnósticos activos
          </h3>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:16px">
            ${ht.diagnosticos.map(e=>`<div style="padding:8px 14px;background:rgba(6,182,212,0.08);border:1px solid rgba(6,182,212,0.20);border-radius:var(--radius-md);font-size:13px;color:rgba(255,255,255,0.80)">${e}</div>`).join("")}
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.06);padding-top:14px">
            <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:10px">Medicación actual</div>
            ${jh.map(e=>`
              <div style="display:flex;align-items:center;gap:12px;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:var(--radius-md);border:1px solid rgba(255,255,255,0.06);margin-bottom:6px">
                <i class="bi bi-capsule-pill" style="color:${i};flex-shrink:0"></i>
                <div style="flex:1"><span style="font-size:13px;font-weight:600;color:white">${e.nombre}</span> <span style="font-size:12px;color:rgba(255,255,255,0.40);margin-left:8px">${e.dosis}</span></div>
                <span style="font-size:11px;color:rgba(255,255,255,0.30)">desde ${e.inicio}</span>
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
            <tbody>${Fh.map(e=>`<tr>
              <td style="white-space:nowrap;color:rgba(255,255,255,0.45)">${e.fecha}</td>
              <td><strong>${e.motivo}</strong></td>
              <td style="color:rgba(255,255,255,0.55)">${e.doctor}</td>
              <td style="font-size:12px;color:rgba(255,255,255,0.55)">${e.dx}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${e.c}22;color:${e.c};border:1px solid ${e.c}33">${e.r}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const Vh=[{hora:"09:00",paciente:"María González",dr:"Dr. Reyes",esp:"Medicina General",estado:"atendido",sala:"C-01"},{hora:"09:30",paciente:"Roberto Solis",dr:"Dra. Torres",esp:"Ginecología",estado:"atendido",sala:"C-02"},{hora:"10:00",paciente:"Ana Martínez",dr:"Dr. Reyes",esp:"Medicina General",estado:"en_sala",sala:"C-01"},{hora:"10:15",paciente:"Carlos Vega",dr:"Dra. Flores",esp:"Pediatría",estado:"en_sala",sala:"C-04"},{hora:"10:30",paciente:"Laura Pérez",dr:"Dra. Torres",esp:"Ginecología",estado:"esperando",sala:"Sala A"},{hora:"11:00",paciente:"Miguel Ángel R.",dr:"Dr. Medina",esp:"Cardiología",estado:"esperando",sala:"Sala B"},{hora:"11:15",paciente:"Elena Fuentes",dr:"Dra. Flores",esp:"Pediatría",estado:"esperando",sala:"Sala A"},{hora:"11:30",paciente:"Jorge Castillo",dr:"Dr. Sánchez",esp:"Dermatología",estado:"programado",sala:"—"},{hora:"12:00",paciente:"Patricia Ruiz",dr:"Dr. Reyes",esp:"Medicina General",estado:"programado",sala:"—"}],ts={atendido:"#22c55e",en_sala:"#0284c7",esperando:"#f59e0b",programado:"rgba(255,255,255,0.20)"},Nh={atendido:"Atendido",en_sala:"En consulta",esperando:"En espera",programado:"Programado"},Hh=[{id:"C-01",dr:"Dr. Reyes",esp:"Med. General",estado:"ocupado",paciente:"Ana M."},{id:"C-02",dr:"Dra. Torres",esp:"Ginecología",estado:"ocupado",paciente:"—"},{id:"C-03",dr:"Dr. Medina",esp:"Cardiología",estado:"libre",paciente:""},{id:"C-04",dr:"Dra. Flores",esp:"Pediatría",estado:"ocupado",paciente:"Carlos V."},{id:"C-05",dr:"Dr. Sánchez",esp:"Dermatología",estado:"pausa",paciente:""},{id:"C-06",dr:"Dra. Rojas",esp:"Endocrinología",estado:"ocupado",paciente:"—"}];function Wh(){const i=[{icon:"bi-calendar-check",label:"Citas Hoy",value:34,delta:"+4 vs ayer",trend:"up"},{icon:"bi-person-check",label:"Atendidos",value:21,delta:"+3",trend:"up"},{icon:"bi-clock",label:"Tiempo Espera",value:"12 min",delta:"-5 min",trend:"up",animate:!1},{icon:"bi-cash-stack",label:"Ingresos del Mes",value:"$284,500",delta:"+18%",trend:"up",animate:!1}];return`
  <div style="--industry-accent:${A.accent};--industry-accent-rgb:${A.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-heart-pulse-fill" style="color:${A.accent};margin-right:10px"></i>Dashboard Clínico
        </h1>
        <p style="font-size:14px;color:rgba(0,0,0,0.40)">${A.nombre} — ${new Date().toLocaleDateString("es-MX",{weekday:"long",day:"numeric",month:"long"})}</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(2,132,199,0.08);border:1px solid rgba(2,132,199,0.20);border-radius:var(--radius-md);font-size:13px;color:${A.accent}">
        <span class="status-dot active"></span> Sistema activo · 13 citas pendientes
      </div>
    </div>

    ${Xt(i,4)}

    <!-- AGENDA DE CITAS -->
    <div class="row g-3 mb-3">
      <div class="col-lg-7">
        <div class="glass-card p-4" style="position:relative;overflow:hidden">
          <div style="position:absolute;top:0;left:0;bottom:0;width:4px;background:linear-gradient(180deg,${A.accent},rgba(2,132,199,0.2))"></div>
          <h3 style="font-size:15px;font-weight:700;margin-bottom:16px;padding-left:8px">
            <i class="bi bi-calendar-week" style="color:${A.accent};margin-right:8px"></i>Agenda de Hoy
          </h3>
          <div style="display:flex;flex-direction:column;gap:6px;max-height:320px;overflow-y:auto">
            ${Vh.map(t=>`
              <div style="display:flex;align-items:center;gap:12px;padding:10px 12px;background:${ts[t.estado]}12;border:1px solid ${ts[t.estado]}30;border-radius:var(--radius-md)">
                <div style="width:44px;text-align:center;flex-shrink:0">
                  <div style="font-size:13px;font-weight:700;color:${A.accent}">${t.hora}</div>
                </div>
                <div style="flex:1;min-width:0">
                  <div style="font-size:13px;font-weight:600;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.paciente}</div>
                  <div style="font-size:11px;color:rgba(0,0,0,0.45)">${t.dr} · ${t.esp}</div>
                </div>
                <div style="text-align:right;flex-shrink:0">
                  <div style="font-size:10px;font-weight:700;color:${ts[t.estado]};text-transform:uppercase;white-space:nowrap">${Nh[t.estado]}</div>
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
            <i class="bi bi-door-closed" style="color:${A.accent};margin-right:8px"></i>Estado de Consultorios
          </h3>
          <div style="display:flex;flex-direction:column;gap:8px">
            ${Hh.map(t=>{const e=t.estado==="ocupado"?A.accent:t.estado==="libre"?"#22c55e":"#f59e0b";return`
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
  `}function Gh(){Ii("chart-citas-dia",{labels:va.labels,datasets:[{label:"Citas",data:va.data}],height:220}),ji("chart-especialidades",{labels:ya.labels,data:ya.data,height:220})}const wa={atendido:{color:"#22c55e",bg:"rgba(34,197,94,0.10)"},"en sala":{color:"#f59e0b",bg:"rgba(245,158,11,0.10)"},"en curso":{color:"#06b6d4",bg:"rgba(6,182,212,0.15)"},pendiente:{color:"rgba(255,255,255,0.30)",bg:"rgba(255,255,255,0.04)"}};function Yh(){return`
  <div style="--industry-accent:${A.accent};--industry-accent-rgb:${A.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-calendar-check" style="color:${A.accent};margin-right:10px"></i>Agenda de Citas
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${A.nombre} — Vista operativa del día</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva cita agendada')">
        <i class="bi bi-plus-lg"></i> Nueva cita
      </button>
    </div>

    <!-- Stats rápidos -->
    <div class="row g-3 mb-3">
      ${[{label:"Programadas",val:"34",color:"rgba(255,255,255,0.60)",icon:"bi-calendar3"},{label:"Atendidas",val:"21",color:"#22c55e",icon:"bi-check-circle-fill"},{label:"En espera",val:"4",color:"#f59e0b",icon:"bi-hourglass-split"},{label:"Restantes",val:"9",color:A.accent,icon:"bi-clock-fill"}].map(i=>`
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
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${A.accent},transparent)"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Agenda del día</h3>
          <div style="display:flex;flex-direction:column;gap:6px;max-height:480px;overflow-y:auto">
            ${Lh.map(i=>{const t=wa[i.estado]||wa.pendiente;return`
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
            <i class="bi bi-person-standing" style="color:${A.accent};margin-right:8px"></i>Sala de espera
          </h3>
          ${[{nombre:"Verónica Núñez",dr:"Dra. Torres",esp:"Ginecología",espera:"5 min",turno:1},{nombre:"Héctor Ramírez",dr:"Dr. Sánchez",esp:"Dermatología",espera:"18 min",turno:2},{nombre:"Adriana Castro",dr:"Dra. Rojas",esp:"Endocrinología",espera:"31 min",turno:3},{nombre:"Fernando Castillo",dr:"Dra. Torres",esp:"Seguimiento",espera:"45 min",turno:4}].map(i=>`
            <div style="display:flex;align-items:center;gap:12px;padding:12px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);margin-bottom:8px">
              <div style="width:32px;height:32px;border-radius:50%;background:rgba(${A.accentRgb},0.15);color:${A.accent};display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800">${i.turno}</div>
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
          <div style="padding:12px;background:rgba(${A.accentRgb},0.06);border:1px solid rgba(${A.accentRgb},0.18);border-radius:var(--radius-md)">
            <div style="font-size:12px;font-weight:700;color:${A.accent};margin-bottom:4px"><i class="bi bi-info-circle"></i> Tiempo promedio de espera</div>
            <div style="font-size:24px;font-weight:900;color:white">12 min</div>
            <div style="font-size:12px;color:rgba(255,255,255,0.40)">↓ 5 min vs. promedio semanal</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `}const P={nombre:"BuildPro",giro:"Constructora",logo:"bi-building-gear",accent:"#eab308",accentRgb:"234, 179, 8"},Uh=[{id:1,nombre:"Torres Mirador",cliente:"Inmobiliaria Pedraza",tipo:"Residencial",avance:78,presupuesto:"$3.2M",gastado:"$2.48M",inicio:"15 Ene 2025",fin:"30 Sep 2025",estatus:"en curso",personal:14,obra:"Av. Insurgentes 2240"},{id:2,nombre:"Centro Comercial Hub",cliente:"Grupo Arenas SAB",tipo:"Comercial",avance:45,presupuesto:"$5.8M",gastado:"$2.61M",inicio:"01 Mar 2025",fin:"31 Mar 2026",estatus:"en curso",personal:22,obra:"Periférico Norte km 14"},{id:3,nombre:"Bodega Logística GN",cliente:"GrupoNova Logistics",tipo:"Industrial",avance:92,presupuesto:"$1.4M",gastado:"$1.28M",inicio:"05 Nov 2024",fin:"30 Jun 2025",estatus:"finalizando",personal:8,obra:"Parque Ind. Cuautitlán"},{id:4,nombre:"Residencial Álamos",cliente:"Fam. Castellanos",tipo:"Residencial",avance:32,presupuesto:"$980K",gastado:"$313K",inicio:"10 Abr 2025",fin:"28 Feb 2026",estatus:"en curso",personal:6,obra:"Álamos, Edomex"},{id:5,nombre:"Oficinas Corporat.",cliente:"TechOps México SA",tipo:"Oficinas",avance:58,presupuesto:"$2.1M",gastado:"$1.21M",inicio:"20 Feb 2025",fin:"15 Nov 2025",estatus:"en curso",personal:11,obra:"Polanco, CDMX"},{id:6,nombre:"Escuela Primaria M.",cliente:"Municipio Texcoco",tipo:"Educativo",avance:71,presupuesto:"$640K",gastado:"$454K",inicio:"03 Feb 2025",fin:"31 Jul 2025",estatus:"en curso",personal:9,obra:"Texcoco, Edomex"},{id:7,nombre:"Planta Procesadora",cliente:"Alimentos Del Norte",tipo:"Industrial",avance:15,presupuesto:"$4.2M",gastado:"$630K",inicio:"01 Jun 2025",fin:"31 Dic 2026",estatus:"iniciando",personal:5,obra:"Monterrey, NL"},{id:8,nombre:"Ampliación Hospital",cliente:"Clínica San Ángel",tipo:"Salud",avance:40,presupuesto:"$1.8M",gastado:"$720K",inicio:"15 Mar 2025",fin:"28 Feb 2026",estatus:"en curso",personal:12,obra:"San Ángel, CDMX"}],Xh=[{material:"Cemento Portland 50kg",stock:120,minimo:200,unidad:"bultos",estado:"crítico",proveedor:"Cementos Cruz Azul"},{material:'Varilla 3/8" corrugada',stock:850,minimo:500,unidad:"piezas",estado:"ok",proveedor:"Deacero S.A."},{material:'Grava 3/4"',stock:18,minimo:40,unidad:"m³",estado:"crítico",proveedor:"Materiales Guerrero"},{material:"Arena fina",stock:35,minimo:30,unidad:"m³",estado:"ok",proveedor:"Materiales Guerrero"},{material:"Blocks 12x20x40",stock:600,minimo:800,unidad:"piezas",estado:"bajo",proveedor:"Block Norte SA"},{material:"Cable THW 12 AWG",stock:320,minimo:200,unidad:"metros",estado:"ok",proveedor:"Condumex"},{material:"Tablaroca 4x8",stock:40,minimo:60,unidad:"hojas",estado:"bajo",proveedor:"USG México"},{material:"Pintura Vinílica 19L",stock:28,minimo:20,unidad:"cubetas",estado:"ok",proveedor:"Comex"}],_a={labels:["Sem 1","Sem 2","Sem 3","Sem 4","Sem 5","Sem 6","Sem 7","Sem 8"],datasets:[{label:"Real",data:[8,14,22,31,40,52,61,63]},{label:"Planeado",data:[10,18,26,35,45,55,63,70]}]};Uh.map(i=>i.nombre.split(" ").slice(0,2).join(" "));const Kh=[{nombre:"Ing. Marco Salinas",rol:"Residente de Obra",proyecto:"Torres Mirador",tel:"55 1122 3344",asistencia:"presente"},{nombre:"Ing. Carmen Ruiz",rol:"Supervisora",proyecto:"Centro Comercial Hub",tel:"55 5566 7788",asistencia:"presente"},{nombre:"Arq. Jesús Molina",rol:"Arquitecto",proyecto:"Oficinas Corporat.",tel:"55 9900 1122",asistencia:"presente"},{nombre:"Ing. Beto Vargas",rol:"Jefe de Cuadrilla",proyecto:"Torres Mirador",tel:"55 3344 5566",asistencia:"presente"},{nombre:"Ing. Gloria Torres",rol:"Estructurista",proyecto:"Ampliación Hospital",tel:"55 7788 9900",asistencia:"ausente"}];function qh(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${P.accent};--industry-accent-rgb:${P.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${P.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>
    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>
      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${P.accent};margin-bottom:14px"><i class="bi ${P.logo}"></i> ${P.giro}</div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">Control total de obras para <span style="color:${P.accent}">${P.nombre}</span></h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">Seguimiento de proyectos en tiempo real, control de materiales, gestión de personal y análisis financiero de tus obras.</p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/construccion/crm",icon:"bi-hammer",label:"Gestión de Proyectos",desc:"Portafolio de obras, avance y presupuesto."},{path:"/construccion/dashboard",icon:"bi-bar-chart-fill",label:"Dashboard de Obra",desc:"KPIs clave, materiales críticos y avance global."},{path:"/construccion/operaciones",icon:"bi-kanban-fill",label:"Tablero Operativo",desc:"Kanban de actividades, cuadrillas y bitácora."}].map(i=>`
              <div onclick="window.location.hash='${i.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${P.accentRgb},0.06);border:1px solid rgba(${P.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${P.accentRgb},0.12)';this.style.borderColor='rgba(${P.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${P.accentRgb},0.06)';this.style.borderColor='rgba(${P.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${P.accentRgb},0.15);color:${P.accent};flex-shrink:0"><i class="bi ${i.icon}"></i></div>
                <div style="flex:1"><div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${i.label}</div><div style="font-size:13px;color:rgba(255,255,255,0.42)">${i.desc}</div></div>
                <i class="bi bi-chevron-right" style="color:${P.accent};font-size:14px"></i>
              </div>
            `).join("")}
          </div>
        </div>
        <div class="col-lg-6">
          <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(${P.accentRgb},0.20);border-radius:var(--radius-xl);padding:28px;position:relative;overflow:hidden">
            <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${P.accent},transparent)"></div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06)">
              <div style="width:32px;height:32px;border-radius:8px;background:rgba(${P.accentRgb},0.15);display:flex;align-items:center;justify-content:center;color:${P.accent}"><i class="bi ${P.logo}"></i></div>
              <div><div style="font-size:14px;font-weight:700;color:white">${P.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Control de Obras</div></div>
              <span class="badge-nux badge-warning" style="margin-left:auto">8 Proyectos</span>
            </div>
            <div style="display:flex;flex-direction:column;gap:10px">
              ${[{nombre:"Torres Mirador",avance:78,color:"#22c55e"},{nombre:"Centro Comercial Hub",avance:45,color:P.accent},{nombre:"Bodega Logística GN",avance:92,color:"#22c55e"},{nombre:"Oficinas Corporativas",avance:58,color:P.accent}].map(i=>`
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
  `}const bt={nombre:"Torre Residencial Prado",codigo:"PRY-0012",cliente:"Inmobiliaria Castellanos SA",contacto:"Arq. Roberto Castellanos",tel:"55 4400 1234",tipo:"Residencial · 24 departamentos",ubicacion:"Av. Reforma 2240, CDMX",avance:78,inicio:"15 Ene 2025",fin_estimado:"30 Sep 2025",personal:14,supervisor:"Ing. Marco Herrera"},es=[{nombre:"Cimentación y estructura",fechaPlaneada:"28 Feb 2025",fechaReal:"25 Feb 2025",estatus:"Completado",c:"#16a34a"},{nombre:"Instalaciones eléctricas",fechaPlaneada:"31 Mar 2025",fechaReal:"04 Abr 2025",estatus:"Completado",c:"#16a34a"},{nombre:"Instalaciones hidráulicas",fechaPlaneada:"30 Abr 2025",fechaReal:"30 Abr 2025",estatus:"Completado",c:"#16a34a"},{nombre:"Acabados interiores",fechaPlaneada:"30 Jun 2025",fechaReal:"—",estatus:"En proceso",c:"#f59e0b"},{nombre:"Fachada y áreas comunes",fechaPlaneada:"31 Jul 2025",fechaReal:"—",estatus:"Pendiente",c:"rgba(255,255,255,0.30)"},{nombre:"Entrega final y escrituras",fechaPlaneada:"30 Sep 2025",fechaReal:"—",estatus:"Pendiente",c:"rgba(255,255,255,0.30)"}],Jh=[{texto:"Entrega de acero estructural retrasada 4 días",icono:"bi-exclamation-triangle-fill",color:"#f59e0b"},{texto:"Inspección municipal — programar visita",icono:"bi-building-check",color:"#06b6d4"},{texto:"Pago estimación #7 pendiente de cliente",icono:"bi-cash-stack",color:"#16a34a"}];function Zh(){const i=P.accent;return`
  <div style="--industry-accent:${i};--industry-accent-rgb:${P.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:var(--radius-md);background:${i};display:flex;align-items:center;justify-content:center;font-size:22px;color:white;flex-shrink:0">
          <i class="bi bi-building"></i>
        </div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${bt.nombre} <span style="font-size:13px;font-weight:400;color:rgba(255,255,255,0.35)">${bt.codigo}</span></h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${qt([bt.tipo,"En tiempo","Alta prioridad","Cliente VIP"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando reporte de avance...')"><i class="bi bi-file-earmark-bar-graph"></i> Reporte</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Estimación creada')"><i class="bi bi-plus-lg"></i> Nueva estimación</button>
      </div>
    </div>

    ${Kt({stages:["Prospecto","Cotización","Contrato firmado","En obra","Entregado"],currentIndex:3,accent:i})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Datos del proyecto</div>
          ${[{icon:"bi-person-lines-fill",label:"Cliente",val:bt.cliente},{icon:"bi-person-fill",label:"Contacto",val:bt.contacto},{icon:"bi-telephone-fill",label:"Teléfono",val:bt.tel},{icon:"bi-geo-alt-fill",label:"Ubicación",val:bt.ubicacion},{icon:"bi-calendar-range",label:"Período",val:`${bt.inicio} → ${bt.fin_estimado}`},{icon:"bi-people-fill",label:"Personal activo",val:`${bt.personal} trabajadores`}].map(t=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${t.icon}" style="color:${i};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${t.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${t.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">Avance general</span>
              <span style="font-size:18px;font-weight:800;color:${i}">${bt.avance}%</span>
            </div>
            <div style="height:8px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${bt.avance}%;background:${i};border-radius:99px;transition:width 1s ease"></div>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Supervisor de obra</div>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar" style="background:rgba(234,179,8,0.18);color:${i}">H</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:white">${bt.supervisor}</div>
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
            <i class="bi bi-lightning-charge-fill" style="color:${i}"></i> Alertas y pendientes
          </h3>
          ${Jh.map(t=>`
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
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">${es.filter(t=>t.estatus==="Completado").length}/${es.length} completados</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>Hito</th><th>Fecha planeada</th><th>Fecha real</th><th>Estado</th></tr></thead>
            <tbody>${es.map(t=>`<tr>
              <td><strong>${t.nombre}</strong></td>
              <td style="color:rgba(255,255,255,0.50);white-space:nowrap">${t.fechaPlaneada}</td>
              <td style="color:rgba(255,255,255,0.50);white-space:nowrap">${t.fechaReal}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${t.c}22;color:${t.c};border:1px solid ${t.c}33">${t.estatus}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const Qh=[{nombre:"Torres Mirador",cliente:"Inmobiliaria Del Valle",avance:63,etapa:"Estructura",personal:22,alerta:!1},{nombre:"Residencial Pinos",cliente:"Grupo Constructor MX",avance:81,etapa:"Acabados",personal:15,alerta:!1},{nombre:"Centro Comercial Q",cliente:"Quetzal Desarrollos",avance:28,etapa:"Cimentación",personal:31,alerta:!0},{nombre:"Bodega Industrial",cliente:"LogisticaMX S.A.",avance:92,etapa:"Entrega",personal:8,alerta:!1},{nombre:"Puente Anular Sur",cliente:"Gobierno Municipal",avance:45,etapa:"Estructura",personal:19,alerta:!0}],$a=["Diseño","Excavación","Cimentación","Estructura","Acabados","Entrega"],tg={Diseño:0,Excavación:1,Cimentación:2,Estructura:3,Acabados:4,Entrega:5};function eg(){const i=[{icon:"bi-hammer",label:"Proyectos Activos",value:8,delta:"+1",trend:"up"},{icon:"bi-graph-up-arrow",label:"Avance Promedio",value:"63%",delta:"+5%",trend:"up",animate:!1},{icon:"bi-people-fill",label:"Personal en Obra",value:47,delta:"+3",trend:"up"},{icon:"bi-exclamation-diamond",label:"Alertas Materiales",value:3,delta:"+1",trend:"down"}],t=Xh.filter(e=>e.estado!=="ok");return`
  <div style="--industry-accent:${P.accent};--industry-accent-rgb:${P.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-building-gear" style="color:${P.accent};margin-right:10px"></i>Dashboard de Obra
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${P.nombre} — ${new Date().toLocaleDateString("es-MX",{day:"numeric",month:"long",year:"numeric"})}</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(234,179,8,0.10);border:1px solid rgba(234,179,8,0.25);border-radius:var(--radius-md);font-size:13px;color:${P.accent}">
        <i class="bi bi-exclamation-triangle-fill"></i> 2 proyectos con alerta
      </div>
    </div>

    ${Xt(i,4)}

    <!-- PIPELINE DE PROYECTOS -->
    <div class="glass-card p-4 mb-3" style="position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${P.accent},rgba(234,179,8,0.2))"></div>
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:20px">
        <i class="bi bi-kanban" style="color:${P.accent};margin-right:8px"></i>Pipeline de Proyectos — Estado por Etapa
      </h3>

      <!-- Etapas header -->
      <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:4px;margin-bottom:14px">
        ${$a.map((e,s)=>`
          <div style="text-align:center;padding:6px 4px;background:rgba(234,179,8,0.08);border-radius:6px;border-top:2px solid ${s<=2?"rgba(234,179,8,0.30)":s<=4?P.accent:"#22c55e"}">
            <div style="font-size:10px;font-weight:700;color:${P.accent};letter-spacing:0.04em">${e.toUpperCase()}</div>
          </div>
        `).join("")}
      </div>

      <!-- Proyectos en pipeline -->
      ${Qh.map(e=>`
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
              ${$a.map((s,o)=>{const a=tg[e.etapa],n=o<a,r=o===a;return`<div style="height:8px;border-radius:4px;background:${n?P.accent:r?P.accent+"90":"rgba(255,255,255,0.07)"};${r?"box-shadow:0 0 8px rgba(234,179,8,0.5)":""}"></div>`}).join("")}
            </div>
            <div style="display:flex;justify-content:space-between">
              <span style="font-size:11px;color:rgba(255,255,255,0.40)">${e.etapa} · <span style="color:${P.accent};font-weight:700">${e.avance}%</span></span>
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
  `}function ig(){Li("chart-avance",{labels:_a.labels,datasets:_a.datasets,height:200})}const sg=[{id:"por-iniciar",label:"Por Iniciar",color:"rgba(255,255,255,0.30)",cards:[{title:"Cimentación Planta GDL",sub:"Planta Procesadora · 3 personas",tag:"Alta"},{title:"Trazo y nivelación Bloque C",sub:"Torres Mirador · 2 personas",tag:"Media"}]},{id:"en-curso",label:"En Curso",color:"#eab308",cards:[{title:"Herrería nivel 4",sub:"Torres Mirador · 4 personas",tag:"Alta"},{title:"Instalaciones eléctricas",sub:"Oficinas Corporativas · 3 per.",tag:"Alta"},{title:"Acabados interiores lobby",sub:"Centro Comercial Hub · 6 per.",tag:"Media"},{title:"Muro cortina fachada",sub:"Torres Mirador · 2 personas",tag:"Urgente"}]},{id:"revision",label:"En Revisión",color:"#06b6d4",cards:[{title:"Pintura exterior bloque A",sub:"Torres Mirador · 2 personas",tag:"Baja"},{title:"Pruebas hidráulicas Piso 3",sub:"Bodega Logística · 1 persona",tag:"Alta"}]},{id:"completado",label:"Completado",color:"#22c55e",cards:[{title:"Excavación y corte",sub:"Centro Comercial Hub",tag:"—"},{title:"Pilotes de cimentación",sub:"Torres Mirador",tag:"—"},{title:"Estructura metálica Nave A",sub:"Bodega Logística",tag:"—"}]}],og={Alta:"#f97316",Media:"#eab308",Urgente:"#f87171",Baja:"rgba(255,255,255,0.40)","—":"rgba(255,255,255,0.20)"};function ag(){return`
  <div style="--industry-accent:${P.accent};--industry-accent-rgb:${P.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-kanban-fill" style="color:${P.accent};margin-right:10px"></i>Tablero Operativo
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${P.nombre} — Estado de actividades en obra</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nueva actividad creada')"><i class="bi bi-plus-lg"></i> Nueva actividad</button>
    </div>

    <!-- Kanban -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;min-height:500px;overflow-x:auto">
      ${sg.map(i=>`
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
                  <span style="font-size:10px;font-weight:700;color:${og[t.tag]||"gray"};text-transform:uppercase">${t.tag!=="—"?t.tag:""}</span>
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
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px"><i class="bi bi-people-fill" style="color:${P.accent};margin-right:8px"></i>Personal activo hoy</h3>
      <div class="row g-2">
        ${Kh.map(i=>`
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
  `}const C={nombre:"Storely",giro:"Retail & Tienda",logo:"bi-bag-heart-fill",accent:"#10b981",accentRgb:"16, 185, 129"},ka={labels:["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],data:[18400,21200,19800,22100,28600,34200,26400]},Ma={labels:["Calzado","Ropa","Accesorios","Deporte","Infantil"],data:[38,32,18,8,4]};function ng(){return`
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
  `}const gt={nombre:"Isabel Moreno Gutiérrez",iniciales:"IM",tel:"55 1234 5678",email:"isabel.moreno@gmail.com",membresia:"Tarjeta Oro",desde:"Marzo 2020",puntos:4820,puntos_max:6e3,talla:"M · 38 zapato",preferencias:"Ropa casual, paleta neutral, marcas premium",asesor:"Valeria Soto"},rg=[{fecha:"Hoy 11:34",articulos:"Vestido lino · Sandalias piel",monto:"$1,840",metodo:"Visa •••6411",estado:"Entregado",c:"#16a34a"},{fecha:"Hace 1 sem",articulos:"Blusa seda · Pantalón sastre x2",monto:"$2,460",metodo:"Amex •••2201",estado:"Entregado",c:"#16a34a"},{fecha:"Hace 3 sem",articulos:"Bolsa cuero · Pañuelo seda",monto:"$3,200",metodo:"Visa •••6411",estado:"Devuelto",c:"#f87171"},{fecha:"Hace 1 mes",articulos:"Conjunto casual verano",monto:"$1,180",metodo:"Visa •••6411",estado:"Entregado",c:"#16a34a"},{fecha:"Hace 6 sem",articulos:"Perfume importado · Crema premium",monto:"$2,100",metodo:"Efectivo",estado:"Entregado",c:"#16a34a"}],Sa=[{nombre:"Abrigo cachemira beige",precio:"$4,800",disp:"Disponible"},{nombre:"Zapato Oxford negro",precio:"$2,200",disp:"Últimas 2 piezas"},{nombre:"Cartera cuero café",precio:"$1,400",disp:"Agotado — esp. restock"}];function lg(){const i=C.accent;return`
  <div style="--industry-accent:${i};--industry-accent-rgb:${C.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:${i};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${gt.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${gt.nombre}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${qt(["Tarjeta Oro ⭐","Clienta VIP","38 compras","Devolución reciente"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Enviando notificación de wishlist...')"><i class="bi bi-bell"></i> Avisar wishlist</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Cupón especial enviado a Isabel')"><i class="bi bi-gift"></i> Enviar cupón</button>
      </div>
    </div>

    ${Kt({stages:["Visitante","Recurrente","Fiel","Oro","Embajadora"],currentIndex:3,accent:i})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Perfil de la cliente</div>
          ${[{icon:"bi-telephone-fill",label:"Teléfono",val:gt.tel},{icon:"bi-envelope-fill",label:"Email",val:gt.email},{icon:"bi-award-fill",label:"Membresía",val:gt.membresia},{icon:"bi-calendar3",label:"Cliente desde",val:gt.desde},{icon:"bi-person-check",label:"Asesor asignado",val:gt.asesor}].map(t=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${t.icon}" style="color:${i};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${t.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${t.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:6px">Talla habitual</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.80)">${gt.talla}</div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:6px">Preferencias</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.60);line-height:1.6">${gt.preferencias}</div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">Puntos acumulados</span>
              <span style="font-size:16px;font-weight:800;color:${i}">${gt.puntos.toLocaleString("es-MX")}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${Math.round(gt.puntos/gt.puntos_max*100)}%;background:${i};border-radius:99px"></div>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.30);margin-top:5px">${(gt.puntos_max-gt.puntos).toLocaleString("es-MX")} pts para Embajadora</div>
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
            <i class="bi bi-heart-fill" style="color:${i}"></i> Lista de deseos (${Sa.length} artículos)
          </h3>
          ${Sa.map(t=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
              <i class="bi bi-tag-fill" style="color:${i};flex-shrink:0"></i>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;color:white">${t.nombre}</div>
                <div style="font-size:12px;color:rgba(255,255,255,0.40)">${t.disp}</div>
              </div>
              <span style="font-size:14px;font-weight:700;color:${i}">${t.precio}</span>
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
            <tbody>${rg.map(t=>`<tr>
              <td style="white-space:nowrap;color:rgba(255,255,255,0.45)">${t.fecha}</td>
              <td style="font-size:12px;color:rgba(255,255,255,0.70)">${t.articulos}</td>
              <td style="font-size:12px;color:rgba(255,255,255,0.45)">${t.metodo}</td>
              <td style="text-align:right;font-weight:700;color:${i}">${t.monto}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${t.c}22;color:${t.c};border:1px solid ${t.c}33">${t.estado}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const cg=[{nombre:"Ropa & Moda",ventas:"$8,240",pct:33,icono:"bi-bag-fill",items:47},{nombre:"Calzado",ventas:"$4,860",pct:20,icono:"bi-star-fill",items:23},{nombre:"Accesorios",ventas:"$3,100",pct:13,icono:"bi-gem",items:38},{nombre:"Electrónica",ventas:"$5,420",pct:22,icono:"bi-phone-fill",items:15},{nombre:"Hogar",ventas:"$2,100",pct:8,icono:"bi-house-fill",items:29},{nombre:"Deportes",ventas:"$1,140",pct:5,icono:"bi-dribbble",items:18}],dg=[{hora:"11:47",producto:"Sneakers Air Max",total:"$890",metodo:"Tarjeta"},{hora:"11:44",producto:"Camisas x3",total:"$450",metodo:"Efectivo"},{hora:"11:39",producto:"Bolsa de piel",total:"$1,200",metodo:"Tarjeta"},{hora:"11:35",producto:"Audífonos BT",total:"$380",metodo:"Tarjeta"},{hora:"11:28",producto:"Pantalón + Cinto",total:"$560",metodo:"Digital"},{hora:"11:21",producto:"Perfume Set",total:"$720",metodo:"Tarjeta"}];function pg(){const i=[{icon:"bi-cash-stack",label:"Ventas Hoy",value:"$24,860",delta:"+15%",trend:"up",animate:!1},{icon:"bi-cart-fill",label:"Transacciones",value:142,delta:"+18",trend:"up"},{icon:"bi-receipt",label:"Ticket Promedio",value:"$175",delta:"+$12",trend:"up",animate:!1},{icon:"bi-arrow-return-left",label:"Devoluciones",value:4,delta:"-2",trend:"up"}];return`
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

    ${Xt(i,4)}

    <!-- CATEGORÍAS + FEED -->
    <div class="row g-3 mb-3">
      <div class="col-lg-7">
        <div class="glass-card p-4" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${C.accent},rgba(5,150,105,0.2))"></div>
          <h3 style="font-size:15px;font-weight:700;margin-bottom:16px">
            <i class="bi bi-grid-1x2-fill" style="color:${C.accent};margin-right:8px"></i>Ventas por Categoría — Hoy
          </h3>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
            ${cg.map(t=>`
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
          ${dg.map((t,e)=>`
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
  `}function hg(){Ii("chart-ventas-dia",{labels:ka.labels,datasets:[{label:"Ventas ($)",data:ka.data}],height:180}),ji("chart-categorias",{labels:Ma.labels,data:Ma.data,height:180})}const gg=[{icon:"bi-shoe-heel",nombre:"Tenis Urban Run",precio:"$1,290",cat:"Calzado",stock:84},{icon:"bi-shirt",nombre:"Sudadera Premium",precio:"$680",cat:"Ropa",stock:47},{icon:"bi-backpack2-fill",nombre:"Mochila Explorer 30L",precio:"$890",cat:"Accesorios",stock:12},{icon:"bi-shirt",nombre:"Pantalón Slim Stretch",precio:"$590",cat:"Ropa",stock:6},{icon:"bi-tag",nombre:"Gorra Bordada",precio:"$280",cat:"Accesorios",stock:134},{icon:"bi-droplet",nombre:"Chamarra Reversible",precio:"$1,450",cat:"Ropa",stock:22}];function ug(){return`
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
            ${gg.map(i=>`
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
  `}function fg(){window.__addToCart=(i,t)=>zi(`${i} agregado — ${t}`),window.__toastSuccess=zi,window.__toastInfo=Ns}const D={nombre:"FlowService",giro:"Servicios Profesionales",logo:"bi-lightning-charge-fill",accent:"#8b5cf6",accentRgb:"139, 92, 246"},bg=[{id:"TK-2401",cliente:"Moda Global SRL",prioridad:"alta",estatus:"abierto",tipo:"Error sistema",tecnico:"Diego R.",creado:"Hace 2h",sla:"4h restantes"},{id:"TK-2402",cliente:"Distribuidora Noriega",prioridad:"media",estatus:"en proceso",tipo:"Configuración",tecnico:"Ana S.",creado:"Hace 5h",sla:"19h restantes"},{id:"TK-2403",cliente:"Clínica Santa Elena",prioridad:"baja",estatus:"abierto",tipo:"Consulta",tecnico:"Sin asig.",creado:"Hace 1 día",sla:"47h restantes"},{id:"TK-2404",cliente:"TechStart México",prioridad:"crítica",estatus:"escalado",tipo:"Caída servicio",tecnico:"Carlos M.",creado:"Hace 30 min",sla:"1h restante"},{id:"TK-2405",cliente:"Transportes Unidos SC",prioridad:"media",estatus:"en proceso",tipo:"Reporte",tecnico:"Ana S.",creado:"Hace 3h",sla:"21h restantes"}],za={labels:["Ene","Feb","Mar","Abr","May","Jun","Jul"],data:[108e3,114200,118600,124e3,131800,140400,148600]},Ca={labels:["Crítica","Alta","Media","Baja"],data:[2,4,8,6]};function mg(){return`
  <section style="min-height:100vh;display:flex;align-items:center;padding:80px 24px;position:relative;overflow:hidden;--industry-accent:${D.accent};--industry-accent-rgb:${D.accentRgb}">
    <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 60% 30%, rgba(${D.accentRgb},0.08) 0%,transparent 60%);pointer-events:none"></div>
    <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,0.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.015) 1px,transparent 1px);background-size:60px 60px;pointer-events:none"></div>
    <div style="max-width:1100px;margin:0 auto;width:100%">
      <button class="back-btn" onclick="window.location.hash='/'"><i class="bi bi-arrow-left"></i> Todas las industrias</button>
      <div class="row align-items-center g-5 mt-3">
        <div class="col-lg-6">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${D.accent};margin-bottom:14px"><i class="bi ${D.logo}"></i> ${D.giro}</div>
          <h1 style="font-size:clamp(2.5rem,5vw,3.8rem);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px">Gestión profesional de servicios para <span style="color:${D.accent}">${D.nombre}</span></h1>
          <p style="font-size:1.05rem;color:rgba(255,255,255,0.50);line-height:1.75;margin-bottom:36px">CRM para empresas de servicios: contratos, tickets, ingresos recurrentes, satisfacción y agenda en un solo lugar.</p>
          <div style="display:flex;flex-direction:column;gap:12px">
            ${[{path:"/servicios/crm",icon:"bi-people-fill",label:"CRM de Clientes",desc:"Contratos, health score y renovaciones."},{path:"/servicios/dashboard",icon:"bi-graph-up-arrow",label:"Dashboard MRR",desc:"Ingresos recurrentes, NPS y métricas clave."},{path:"/servicios/operaciones",icon:"bi-headset",label:"Gestión de Tickets",desc:"Cola de soporte, SLAs y asignación de técnicos."}].map(i=>`
              <div onclick="window.location.hash='${i.path}'" style="display:flex;align-items:center;gap:16px;padding:16px 20px;background:rgba(${D.accentRgb},0.06);border:1px solid rgba(${D.accentRgb},0.18);border-radius:var(--radius-lg);cursor:pointer;transition:all 0.25s ease"
              onmouseenter="this.style.background='rgba(${D.accentRgb},0.12)';this.style.borderColor='rgba(${D.accentRgb},0.35)'"
              onmouseleave="this.style.background='rgba(${D.accentRgb},0.06)';this.style.borderColor='rgba(${D.accentRgb},0.18)'">
                <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;background:rgba(${D.accentRgb},0.15);color:${D.accent};flex-shrink:0"><i class="bi ${i.icon}"></i></div>
                <div style="flex:1"><div style="font-size:15px;font-weight:700;color:white;margin-bottom:3px">${i.label}</div><div style="font-size:13px;color:rgba(255,255,255,0.42)">${i.desc}</div></div>
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
              <div><div style="font-size:14px;font-weight:700;color:white">${D.nombre}</div><div style="font-size:10px;color:rgba(255,255,255,0.30);text-transform:uppercase;letter-spacing:0.08em">Service Management</div></div>
              <span class="badge-nux badge-accent" style="margin-left:auto">84 Clientes</span>
            </div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px">
              ${[{label:"MRR",val:"$148,600"},{label:"NPS Score",val:"72"},{label:"Tickets abiertos",val:"11"},{label:"Satisfacción",val:"4.7 ⭐"}].map(i=>`<div style="padding:14px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:10px"><div style="font-size:10px;color:rgba(255,255,255,0.35);text-transform:uppercase;letter-spacing:0.08em;font-weight:700;margin-bottom:4px">${i.label}</div><div style="font-size:18px;font-weight:800;color:white">${i.val}</div></div>`).join("")}
            </div>
            <div style="padding:14px;background:rgba(255,255,255,0.02);border-radius:10px;border:1px solid rgba(255,255,255,0.05)">
              <div style="font-size:11px;color:rgba(255,255,255,0.30);text-transform:uppercase;font-weight:700;margin-bottom:8px">MRR últimos 6 meses</div>
              <div style="display:flex;align-items:flex-end;gap:4px;height:48px">
                ${[73,78,81,85,90,100].map((i,t)=>`<div style="flex:1;height:${i}%;background:rgba(${D.accentRgb},${.25+i/250});border-radius:3px 3px 0 0"></div>`).join("")}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `}const yt={nombre:"Constructora Arenas SA",iniciales:"CA",mrr:"$8,400",contacto:"Ing. Mario Peña",cargo:"Director de TI",tel:"55 1234 5678",email:"mario.pena@arenas.mx",contrato_inicio:"01 Ene 2025",contrato_fin:"31 Dic 2025",salud:98,ejecutivo:"Diana Rojas"},xg=[{id:"TKT-0088",fecha:"Hoy 09:15",asunto:"Integración API ERP — error 503",prioridad:"Alta",estado:"En atención",c:"#f59e0b"},{id:"TKT-0085",fecha:"Ayer",asunto:"Actualización módulo facturación",prioridad:"Media",estado:"Resuelto",c:"#16a34a"},{id:"TKT-0081",fecha:"22 Jun",asunto:"Capacitación nuevo personal (5 pers)",prioridad:"Baja",estado:"Cerrado",c:"rgba(255,255,255,0.35)"},{id:"TKT-0074",fecha:"10 Jun",asunto:"Migración servidor staging",prioridad:"Alta",estado:"Cerrado",c:"rgba(255,255,255,0.35)"},{id:"TKT-0068",fecha:"02 Jun",asunto:"Reporte de cumplimiento ISO 27001",prioridad:"Media",estado:"Cerrado",c:"rgba(255,255,255,0.35)"}],vg=[{nombre:"ERP Cloud Enterprise",estado:"Activo",renovacion:"31 Dic 2025",precio:"$3,800/mes"},{nombre:"Soporte prioritario 24/7",estado:"Activo",renovacion:"31 Dic 2025",precio:"$2,200/mes"},{nombre:"Business Intelligence",estado:"Activo",renovacion:"31 Dic 2025",precio:"$1,400/mes"},{nombre:"Backup y recuperación",estado:"Activo",renovacion:"31 Dic 2025",precio:"$1,000/mes"}];function yg(){const i=D.accent;return`
  <div style="--industry-accent:${i};--industry-accent-rgb:${D.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:var(--radius-md);background:${i};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${yt.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${yt.nombre}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${qt(["Enterprise","Cuenta Estratégica","NPS 9","Renovación Dic 2025"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando propuesta de renovación...')"><i class="bi bi-file-earmark-text"></i> Propuesta</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Ticket abierto para Constructora Arenas')"><i class="bi bi-headset"></i> Nuevo ticket</button>
      </div>
    </div>

    ${Kt({stages:["Prospecto","Propuesta","Negociación","Contrato activo","Renovación"],currentIndex:3,accent:i})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Datos de la cuenta</div>
          ${[{icon:"bi-person-fill",label:"Contacto principal",val:yt.contacto},{icon:"bi-briefcase-fill",label:"Cargo",val:yt.cargo},{icon:"bi-telephone-fill",label:"Teléfono",val:yt.tel},{icon:"bi-envelope-fill",label:"Email",val:yt.email},{icon:"bi-calendar-range",label:"Vigencia contrato",val:`${yt.contrato_inicio} → ${yt.contrato_fin}`},{icon:"bi-person-check-fill",label:"Ejecutivo de cuenta",val:yt.ejecutivo}].map(t=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${t.icon}" style="color:${i};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${t.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${t.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Salud de la cuenta</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:13px;color:rgba(255,255,255,0.60)">Score general</span>
              <span style="font-size:18px;font-weight:800;color:#16a34a">${yt.salud}/100</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${yt.salud}%;background:#16a34a;border-radius:99px"></div>
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
            <i class="bi bi-layers-fill" style="color:${i}"></i> Servicios contratados
          </h3>
          ${vg.map(t=>`
            <div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05)">
              <div style="width:8px;height:8px;border-radius:50%;background:#16a34a;flex-shrink:0"></div>
              <div style="flex:1">
                <div style="font-size:13px;font-weight:600;color:white">${t.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.35)">Renovación: ${t.renovacion}</div>
              </div>
              <span style="font-size:13px;font-weight:700;color:${i}">${t.precio}</span>
            </div>`).join("")}
          <div style="padding-top:12px;display:flex;justify-content:flex-end;gap:8px;align-items:center">
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">Total mensual:</span>
            <span style="font-size:18px;font-weight:800;color:${i}">${yt.mrr}/mes</span>
          </div>
        </div>

        <div class="glass-card p-4">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Tickets de soporte</h3>
            <span class="badge-nux badge-warning">1 en atención</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>ID</th><th>Fecha</th><th>Asunto</th><th>Prioridad</th><th>Estado</th></tr></thead>
            <tbody>${xg.map(t=>`<tr>
              <td><strong style="color:${i}">${t.id}</strong></td>
              <td style="white-space:nowrap;color:rgba(255,255,255,0.45)">${t.fecha}</td>
              <td style="font-size:12px;color:rgba(255,255,255,0.70)">${t.asunto}</td>
              <td style="font-size:12px;color:rgba(255,255,255,0.50)">${t.prioridad}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${t.c}22;color:${t.c};border:1px solid ${t.c}33">${t.estado}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const wg={Nuevo:[{id:"T-094",cliente:"Moda Global SRL",asunto:"Integración pago digital",prioridad:"alta",hrs:"1h"},{id:"T-095",cliente:"RestChain MX",asunto:"Error en reportes CSV",prioridad:"media",hrs:"2h"},{id:"T-096",cliente:"Farmacia Plus",asunto:"Acceso usuarios nuevos",prioridad:"baja",hrs:"30m"}],"En proceso":[{id:"T-087",cliente:"FinTech Nexo",asunto:"Migración base de datos",prioridad:"alta",hrs:"4h"},{id:"T-090",cliente:"EduPlatform",asunto:"Dashboard personalizado",prioridad:"media",hrs:"3h"},{id:"T-092",cliente:"LogisticsOps",asunto:"API REST webhook config",prioridad:"alta",hrs:"2h"}],"En revisión":[{id:"T-083",cliente:"HealthTrack SA",asunto:"Módulo de expedientes",prioridad:"alta",hrs:"0h"},{id:"T-085",cliente:"AutoRed Mx",asunto:"CRM sincronización",prioridad:"media",hrs:"0h"}],Cerrado:[{id:"T-078",cliente:"Moda Global SRL",asunto:"Setup inicial sistema",prioridad:"alta",hrs:"12h"},{id:"T-079",cliente:"TechStart MX",asunto:"Onboarding equipo",prioridad:"media",hrs:"6h"},{id:"T-081",cliente:"Courier Express",asunto:"Reporte de entregas",prioridad:"baja",hrs:"3h"}]},is={alta:"#f87171",media:"#fbbf24",baja:"#6b7280"};function _g(){const i=[{icon:"bi-people-fill",label:"Clientes Activos",value:84,delta:"+6",trend:"up"},{icon:"bi-cash-stack",label:"MRR",value:"$148,600",delta:"+9%",trend:"up",animate:!1},{icon:"bi-headset",label:"Tickets Abiertos",value:11,delta:"-3",trend:"up"},{icon:"bi-heart-fill",label:"NPS Score",value:72,delta:"+4",trend:"up"}];return`
  <div style="--industry-accent:${D.accent};--industry-accent-rgb:${D.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-lightning-charge-fill" style="color:${D.accent};margin-right:10px"></i>Dashboard Servicios
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">FlowService — Métricas de servicio y clientes</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(139,92,246,0.10);border:1px solid rgba(139,92,246,0.25);border-radius:var(--radius-md);font-size:13px;color:${D.accent}">
        <span class="status-dot active"></span> 7 agentes conectados · SLA 98.2%
      </div>
    </div>

    ${Xt(i,4)}

    <!-- KANBAN BOARD -->
    <div class="glass-card p-4 mb-3" style="position:relative">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${D.accent},rgba(139,92,246,0.2))"></div>
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:18px">
        <h3 style="font-size:15px;font-weight:700;color:white">
          <i class="bi bi-kanban-fill" style="color:${D.accent};margin-right:8px"></i>Kanban de Tickets
        </h3>
        <div style="display:flex;gap:8px;font-size:11px">
          ${Object.entries(is).map(([t,e])=>`<span style="display:flex;align-items:center;gap:4px;color:rgba(255,255,255,0.45)"><span style="width:8px;height:8px;border-radius:2px;background:${e};display:inline-block"></span>${t}</span>`).join("")}
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:12px">
        ${Object.entries(wg).map(([t,e])=>`
          <div>
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px">
              <span style="font-size:11px;font-weight:700;color:rgba(255,255,255,0.40);letter-spacing:0.08em;text-transform:uppercase">${t}</span>
              <span style="font-size:11px;font-weight:700;color:${D.accent};background:rgba(139,92,246,0.12);padding:2px 7px;border-radius:99px">${e.length}</span>
            </div>
            ${e.map(s=>`
              <div style="padding:10px;margin-bottom:8px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-md);border-left:3px solid ${is[s.prioridad]}">
                <div style="display:flex;justify-content:space-between;margin-bottom:5px">
                  <span style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.35)">${s.id}</span>
                  <span style="font-size:9px;font-weight:700;color:${is[s.prioridad]};text-transform:uppercase">${s.prioridad}</span>
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
  `}function $g(){Li("chart-mrr",{labels:za.labels,datasets:[{label:"MRR ($)",data:za.data}],height:180}),ji("chart-tickets-prioridad",{labels:Ca.labels,data:Ca.data,height:180})}const ss={crítica:"#f87171",alta:"#f97316",media:"#fbbf24",baja:"rgba(255,255,255,0.40)"},Aa={abierto:"#f59e0b","en proceso":"#06b6d4",escalado:"#f87171",resuelto:"#22c55e"};function kg(){return`
  <div style="--industry-accent:${D.accent};--industry-accent-rgb:${D.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-headset" style="color:${D.accent};margin-right:10px"></i>Gestión de Tickets</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${D.nombre} — Cola de soporte y SLA</p>
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
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${D.accent},transparent)"></div>
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Cola de soporte activa</h3>
      <div style="display:flex;flex-direction:column;gap:10px">
        ${bg.map(i=>`
          <div style="
            padding:16px 18px;
            background:rgba(255,255,255,0.025);
            border:1px solid rgba(255,255,255,0.07);
            border-left:3px solid ${ss[i.prioridad]||"gray"};
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
              <span style="font-size:11px;font-weight:700;color:${ss[i.prioridad]||"gray"};text-transform:uppercase;padding:3px 8px;background:${ss[i.prioridad]||"gray"}22;border-radius:99px">
                ${i.prioridad}
              </span>
            </div>
            <div>
              <span style="font-size:11px;font-weight:700;color:${Aa[i.estatus]||"white"};text-transform:uppercase;padding:3px 8px;background:${Aa[i.estatus]||"white"}22;border-radius:99px">
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
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px"><i class="bi bi-person-badge" style="color:${D.accent};margin-right:8px"></i>Técnicos disponibles</h3>
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
              <div style="font-size:10px;font-weight:700;color:${i.carga==="Alta"?"#f87171":i.carga==="Media"?"#fbbf24":i.carga==="Libre"?D.accent:"rgba(255,255,255,0.30)"};margin-top:4px">${i.carga}</div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  </div>
  `}function Mg(){window.__toastSuccess=zi,window.__toastInfo=Ns}const st={nombre:"LaunchPad",accent:"#6366f1",accentRgb:"99,102,241"},Sg=[{id:1,empresa:"Distribuidora Norteña SA",contacto:"Luis Mendoza",plan:"Enterprise",mrr:"$4,800",seats:24,nps:9,salud:94,renovacion:"31 Dic 2025",etapa:"activo"},{id:2,empresa:"Mueblería El Roble",contacto:"Ana Juárez",plan:"Business",mrr:"$1,200",seats:8,nps:8,salud:88,renovacion:"28 Feb 2026",etapa:"activo"},{id:3,empresa:"Clínica Bienestar SC",contacto:"Dr. Pérez",plan:"Business",mrr:"$1,200",seats:6,nps:7,salud:72,renovacion:"15 Mar 2026",etapa:"en riesgo"},{id:4,empresa:"Transportes VelaGo",contacto:"Marco Silva",plan:"Starter",mrr:"$490",seats:3,nps:6,salud:65,renovacion:"30 Abr 2026",etapa:"en riesgo"},{id:5,empresa:"Agencia Creativa Loop",contacto:"Sara Vidal",plan:"Business",mrr:"$1,200",seats:10,nps:10,salud:98,renovacion:"01 Jun 2026",etapa:"activo"},{id:6,empresa:"Constructora Vértice",contacto:"Ing. Reyes",plan:"Enterprise",mrr:"$4,800",seats:18,nps:9,salud:91,renovacion:"31 Jul 2026",etapa:"activo"},{id:7,empresa:"Retail Modas Tres",contacto:"Gaby Torres",plan:"Starter",mrr:"$490",seats:2,nps:5,salud:58,renovacion:"15 Sep 2026",etapa:"en riesgo"},{id:8,empresa:"Eventos Éxito SRL",contacto:"Fernanda L.",plan:"Business",mrr:"$1,200",seats:7,nps:8,salud:85,renovacion:"30 Nov 2026",etapa:"activo"}],Pa={labels:["Dic","Ene","Feb","Mar","Abr","May","Jun"],data:[68400,74200,79100,84600,91e3,98400,106800]},at={nombre:"Distribuidora Norteña SA",iniciales:"DN",seats:24,uso:87,contacto:"Luis Mendoza",cargo:"CEO",tel:"55 9988 7766",email:"l.mendoza@disnortena.mx",inicio:"01 Feb 2025",renovacion:"31 Dic 2025",csm:"Andrea Vega"},os=[{fecha:"Hoy 08:42",evento:"24 usuarios activos simultáneos — nuevo máximo",tipo:"pico",c:"#16a34a"},{fecha:"Ayer 17:30",evento:"Luis Mendoza exportó reporte Q2 2025",tipo:"uso",c:"#6366f1"},{fecha:"23 Jun",evento:"Onboarding completado — 22/24 usuarios",tipo:"hito",c:"#16a34a"},{fecha:"20 Jun",evento:"Soporte chat — pregunta sobre API webhooks",tipo:"ticket",c:"#f59e0b"},{fecha:"15 Jun",evento:"Acceso al módulo BI habilitado",tipo:"config",c:"#06b6d4"},{fecha:"10 Jun",evento:"Primer inicio de sesión — cuenta activa",tipo:"hito",c:"#16a34a"}],zg=[{texto:"Llamada de revisión trimestral — agendar para Jul",icono:"bi-telephone-fill",color:"#6366f1"},{texto:"Proponer expansión a 30 seats (+6 usuarios)",icono:"bi-people-fill",color:"#16a34a"},{texto:"Compartir caso de éxito en blog de NUXORB",icono:"bi-megaphone-fill",color:"#f59e0b"}];function Cg(){const i=st.accent;return`
  <div style="--industry-accent:${i};--industry-accent-rgb:${st.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:var(--radius-md);background:${i};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${at.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${at.nombre}
            <span style="font-size:13px;font-weight:500;margin-left:8px;padding:2px 10px;background:rgba(99,102,241,0.15);border:1px solid rgba(99,102,241,0.30);border-radius:99px;color:#818cf8">Enterprise</span>
          </h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${qt(["24 seats activos","NPS 9 — Promotor","Renovación Dic 2025","Salud 94%"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Abriendo análisis de expansión...')"><i class="bi bi-graph-up-arrow"></i> Expansión</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Reunión agendada con Luis Mendoza')"><i class="bi bi-calendar-check"></i> Agendar reunión</button>
      </div>
    </div>

    ${Kt({stages:["Lead","Demo","Trial","Cliente activo","Expansión"],currentIndex:3,accent:i})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Datos de la cuenta</div>
          ${[{icon:"bi-person-fill",label:"Contacto clave",val:at.contacto},{icon:"bi-briefcase-fill",label:"Cargo",val:at.cargo},{icon:"bi-telephone-fill",label:"Teléfono",val:at.tel},{icon:"bi-envelope-fill",label:"Email",val:at.email},{icon:"bi-calendar-range",label:"Contrato",val:`${at.inicio} → ${at.renovacion}`},{icon:"bi-person-check-fill",label:"CSM asignada",val:at.csm}].map(t=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${t.icon}" style="color:${i};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${t.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${t.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Uso de la plataforma</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:13px;color:rgba(255,255,255,0.60)">${at.seats} seats</span>
              <span style="font-size:15px;font-weight:800;color:#16a34a">${at.uso}%</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${at.uso}%;background:#16a34a;border-radius:99px"></div>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.30);margin-top:5px">${Math.round(at.seats*at.uso/100)}/${at.seats} usuarios activos hoy</div>
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
          <div class="col-6 col-xl-3">${j({icon:"bi-people-fill",label:"Usuarios activos",value:21,delta:`de ${at.seats} seats`,trend:"up",cardColor:"#1e40af",deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-bar-chart-fill",label:"Uso plataforma",value:"87%",delta:"↑ +4% este mes",trend:"up",cardColor:"#15803d",animate:!1})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-heart-fill",label:"Health score",value:94,delta:"Excelente",trend:"up",cardColor:"#7c3aed",deltaLabel:""})}</div>
        </div>

        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px;display:flex;align-items:center;gap:8px">
            <i class="bi bi-lightning-charge-fill" style="color:${i}"></i> Próximos pasos — CSM
          </h3>
          ${zg.map(t=>`
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
            ${os.map((t,e)=>`
              <div style="display:flex;gap:14px;padding:12px 0;border-bottom:${e<os.length-1?"1px solid rgba(255,255,255,0.05)":"none"}">
                <div style="display:flex;flex-direction:column;align-items:center;flex-shrink:0">
                  <div style="width:8px;height:8px;border-radius:50%;background:${t.c};margin-top:4px"></div>
                  ${e<os.length-1?'<div style="width:1px;flex:1;background:rgba(255,255,255,0.06);margin-top:6px"></div>':""}
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
  </div>`}const Ag=[{etapa:"Visitas",n:12840,pct:100,color:"rgba(99,102,241,0.25)"},{etapa:"Trials iniciados",n:1028,pct:8,color:"rgba(99,102,241,0.40)"},{etapa:"Activados",n:544,pct:53,color:"rgba(99,102,241,0.60)"},{etapa:"Pagaron",n:218,pct:40,color:"rgba(99,102,241,0.80)"},{etapa:"Expansión",n:76,pct:35,color:"#6366f1"}],Pg=[{label:"LTV Promedio",val:"$12,400",sub:"por cliente",icon:"bi-trophy-fill",col:"#6366f1"},{label:"CAC",val:"$340",sub:"costo adq.",icon:"bi-bullseye",col:"#06b6d4"},{label:"LTV:CAC",val:"36x",sub:"ratio ideal >3x",icon:"bi-graph-up-arrow",col:"#22c55e"},{label:"Payback",val:"2.8 m",sub:"meses",icon:"bi-calendar-check",col:"#f59e0b"}];function Rg(){const i=[{icon:"bi-cash-stack",label:"MRR",value:"$106,800",delta:"+8.5%",trend:"up",animate:!1},{icon:"bi-graph-up-arrow",label:"ARR",value:"$1.28M",delta:"+8.5%",trend:"up",animate:!1},{icon:"bi-people-fill",label:"Usuarios Activos",value:382,delta:"+35",trend:"up"},{icon:"bi-arrow-down-circle",label:"Churn Rate",value:"2.1%",delta:"-0.3%",trend:"up",animate:!1}],t=Sg.filter(e=>e.etapa==="en riesgo");return`
  <div style="--industry-accent:${st.accent};--industry-accent-rgb:${st.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-rocket-takeoff-fill" style="color:${st.accent};margin-right:10px"></i>Dashboard SaaS
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">LaunchPad — Métricas de producto y crecimiento</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(99,102,241,0.10);border:1px solid rgba(99,102,241,0.25);border-radius:var(--radius-md);font-size:13px;color:${st.accent}">
        <span class="status-dot active"></span> Sistemas operando · +56% en 6 meses
      </div>
    </div>

    ${Xt(i,4)}

    <!-- FUNNEL + MÉTRICAS CLAVE -->
    <div class="row g-3 mb-3">
      <div class="col-lg-5">
        <div class="glass-card p-4 h-100" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${st.accent},rgba(99,102,241,0.2))"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:18px">
            <i class="bi bi-funnel-fill" style="color:${st.accent};margin-right:8px"></i>Funnel de Conversión
          </h3>
          ${Ag.map(e=>`
            <div style="margin-bottom:12px">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <span style="font-size:13px;color:rgba(255,255,255,0.70)">${e.etapa}</span>
                <div style="display:flex;align-items:center;gap:8px">
                  <span style="font-size:11px;color:rgba(255,255,255,0.35)">${e.n.toLocaleString()}</span>
                  ${e.etapa!=="Visitas"?`<span style="font-size:11px;font-weight:700;color:${st.accent}">${e.pct}%</span>`:""}
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
          ${Pg.map(e=>`
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
  `}function Dg(){Li("chart-mrr",{labels:Pa.labels,datasets:[{label:"MRR ($)",data:Pa.data}],height:180})}const Tg=[{id:"por-contactar",label:"Por Contactar",color:"rgba(255,255,255,0.35)",cards:[{empresa:"Restaurante La Fogata",contacto:"Dueño Pedro G.",mrr:"$490",fuente:"Referido"},{empresa:"Salón de Belleza Noa",contacto:"Karen P.",mrr:"$490",fuente:"Web"},{empresa:"Taller Eléctrico GT",contacto:"Ing. Montes",mrr:"$1,200",fuente:"LinkedIn"}]},{id:"demo",label:"Demo Agendada",color:"#f59e0b",cards:[{empresa:"Distribuidora El Sol",contacto:"Lic. Salas",mrr:"$1,200",fuente:"Referido"},{empresa:"Agencia Promo MX",contacto:"Rebeca V.",mrr:"$4,800",fuente:"Conferencia"}]},{id:"propuesta",label:"Propuesta Enviada",color:"#6366f1",cards:[{empresa:"Manufactura Herrera SA",contacto:"Dir. Herrera",mrr:"$4,800",fuente:"Web"},{empresa:"Logística VelaGo Norte",contacto:"Gerente Ops.",mrr:"$1,200",fuente:"Referido"}]},{id:"negociacion",label:"Negociación",color:"#ec4899",cards:[{empresa:"Grupo Industrial NMX",contacto:"VP Finanzas",mrr:"$4,800",fuente:"Evento"}]},{id:"cerrado",label:"Cerrado ✓",color:"#22c55e",cards:[{empresa:"Hotel Palma Real",contacto:"Dir. General",mrr:"$1,200",fuente:"Referido"},{empresa:"Farmacia del Pueblo",contacto:"Dueño F. López",mrr:"$490",fuente:"Web"}]}];function Eg(){return`
  <div style="--industry-accent:${st.accent};--industry-accent-rgb:${st.accentRgb}">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-kanban-fill" style="color:${st.accent};margin-right:10px"></i>Pipeline de Ventas</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${st.nombre} — Seguimiento de deals B2B</p>
      </div>
      <div style="display:flex;gap:10px">
        <div style="padding:8px 16px;background:rgba(99,102,241,0.08);border:1px solid rgba(99,102,241,0.20);border-radius:var(--radius-md);font-size:13px">
          <span style="color:rgba(255,255,255,0.45)">MRR en pipeline: </span>
          <span style="color:${st.accent};font-weight:700">$26,370</span>
        </div>
        <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Nuevo deal creado')"><i class="bi bi-plus-lg"></i> Nuevo deal</button>
      </div>
    </div>

    <!-- Pipeline Kanban -->
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:14px;overflow-x:auto">
      ${Tg.map(i=>`
        <div>
          <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:12px;font-weight:700;color:${i.color};text-transform:uppercase;letter-spacing:0.06em">
            <div style="width:8px;height:8px;border-radius:50%;background:${i.color}"></div>
            ${i.label}
            <span style="margin-left:auto;background:${i.color}22;color:${i.color};font-size:11px;padding:1px 8px;border-radius:99px">${i.cards.length}</span>
          </div>
          <div style="background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:var(--radius-lg);padding:10px;min-height:360px">
            ${i.cards.map(t=>`
              <div style="padding:12px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:var(--radius-md);margin-bottom:8px;cursor:pointer;transition:all 0.2s"
              onmouseenter="this.style.borderColor='rgba(${st.accentRgb},0.30)';this.style.background='rgba(${st.accentRgb},0.06)'"
              onmouseleave="this.style.borderColor='rgba(255,255,255,0.07)';this.style.background='rgba(255,255,255,0.03)'"
              onclick="window.__toastInfo&&window.__toastInfo('Deal: ${t.empresa}')">
                <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.88);margin-bottom:4px">${t.empresa}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.38);margin-bottom:8px">${t.contacto}</div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="font-size:12px;font-weight:700;color:${st.accent}">${t.mrr}/mo</span>
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
  `}const lt={nombre:"EduTrack",accent:"#f59e0b",accentRgb:"245,158,11"},Og=[{id:1,nombre:"Sofía Ramírez",curso:"Inglés Avanzado",nivel:"B2",asistencia:92,promedio:9.1,mensualidad:"$1,200",estatus:"activo",pago:"al corriente"},{id:2,nombre:"Diego Morales",curso:"Programación Python",nivel:"Intermedio",asistencia:78,promedio:8.4,mensualidad:"$1,500",estatus:"activo",pago:"al corriente"},{id:3,nombre:"Valeria Ortiz",curso:"Diseño Gráfico",nivel:"Básico",asistencia:85,promedio:9.4,mensualidad:"$1,350",estatus:"activo",pago:"pendiente"},{id:4,nombre:"Carlos Herrera",curso:"Inglés Avanzado",nivel:"C1",asistencia:95,promedio:9.8,mensualidad:"$1,200",estatus:"activo",pago:"al corriente"},{id:5,nombre:"Ana González",curso:"Marketing Digital",nivel:"Avanzado",asistencia:70,promedio:7.9,mensualidad:"$1,400",estatus:"en riesgo",pago:"vencido"},{id:6,nombre:"Marco Jiménez",curso:"Programación Python",nivel:"Básico",asistencia:88,promedio:8.7,mensualidad:"$1,500",estatus:"activo",pago:"al corriente"},{id:7,nombre:"Lucía Peña",curso:"Diseño Gráfico",nivel:"Intermedio",asistencia:91,promedio:9.2,mensualidad:"$1,350",estatus:"activo",pago:"al corriente"},{id:8,nombre:"Rodrigo Salinas",curso:"Marketing Digital",nivel:"Básico",asistencia:65,promedio:7.2,mensualidad:"$1,400",estatus:"inactivo",pago:"vencido"}],Lg=[{nombre:"Inglés Avanzado",instructor:"Mtra. Elena Vidal",alumnos:24,capacidad:30,horario:"Lun/Mié/Vie 7pm",duracion:"6 meses",avance:68},{nombre:"Programación Python",instructor:"Ing. Jorge Mora",alumnos:18,capacidad:20,horario:"Mar/Jue 6pm",duracion:"4 meses",avance:45},{nombre:"Diseño Gráfico",instructor:"Dis. Laura Ríos",alumnos:15,capacidad:16,horario:"Sáb 10am",duracion:"5 meses",avance:82},{nombre:"Marketing Digital",instructor:"Lic. Pablo Salas",alumnos:22,capacidad:25,horario:"Lun/Mié 7pm",duracion:"3 meses",avance:30}],Ra={labels:["Lun","Mar","Mié","Jue","Vie","Sáb"],datasets:[{label:"Asistencia %",data:[88,82,91,79,85,93]}]},_t={nombre:"Sofía Ramírez Torres",iniciales:"SR",tel:"55 6677 8899",email:"sofia.ramirez@gmail.com",programa:"Inglés Avanzado · Certificación Cambridge",nivel:"B2 — Upper Intermediate",tutor:"Mtra. Carolina López",inicio:"Ago 2024",beca:"Beca parcial 30%",asistencia:92},Ig=[{nombre:"Reading & Comprehension",calificacion:9.4,creditos:6,estatus:"Aprobado",c:"#16a34a"},{nombre:"Grammar & Writing",calificacion:8.8,creditos:6,estatus:"Aprobado",c:"#16a34a"},{nombre:"Listening & Speaking",calificacion:9.2,creditos:6,estatus:"En curso",c:"#f59e0b"},{nombre:"Business English",calificacion:null,creditos:4,estatus:"Próximo",c:"rgba(255,255,255,0.30)"},{nombre:"Cambridge Exam Prep",calificacion:null,creditos:4,estatus:"Próximo",c:"rgba(255,255,255,0.30)"}],jg=[{mes:"Junio 2025",monto:"$1,200",fecha:"01 Jun",metodo:"Transferencia",estado:"Pagado",c:"#16a34a"},{mes:"Mayo 2025",monto:"$1,200",fecha:"01 May",metodo:"Tarjeta",estado:"Pagado",c:"#16a34a"},{mes:"Abril 2025",monto:"$1,200",fecha:"03 Abr",metodo:"Transferencia",estado:"Pagado",c:"#16a34a"},{mes:"Marzo 2025",monto:"$1,200",fecha:"05 Mar",metodo:"Efectivo",estado:"Pagado",c:"#16a34a"},{mes:"Julio 2025",monto:"$1,200",fecha:"01 Jul",metodo:"—",estado:"Pendiente",c:"#f59e0b"}];function Fg(){const i=lt.accent;return`
  <div style="--industry-accent:${i};--industry-accent-rgb:${lt.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:${i};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${_t.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${_t.nombre}</h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${qt(["B2 Upper-Intermediate","Beca 30%","Promedio 9.1","Al corriente"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando constancia de estudios...')"><i class="bi bi-file-earmark-fill"></i> Constancia</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Mensaje enviado a Sofía')"><i class="bi bi-chat-dots-fill"></i> Contactar</button>
      </div>
    </div>

    ${Kt({stages:["Interesada","Pre-inscrita","Activa","Avanzada","Graduada"],currentIndex:2,accent:i})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Datos del alumno</div>
          ${[{icon:"bi-telephone-fill",label:"Teléfono",val:_t.tel},{icon:"bi-envelope-fill",label:"Email",val:_t.email},{icon:"bi-book-fill",label:"Programa",val:_t.programa},{icon:"bi-translate",label:"Nivel actual",val:_t.nivel},{icon:"bi-calendar3",label:"Ingreso",val:_t.inicio},{icon:"bi-award-fill",label:"Beca",val:_t.beca}].map(e=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${e.icon}" style="color:${i};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${e.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${e.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:10px">Tutora asignada</div>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar" style="background:rgba(245,158,11,0.18);color:${i}">C</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:white">${_t.tutor}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.40)">Inglés Avanzado</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Asistencia</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:13px;color:rgba(255,255,255,0.60)">Este período</span>
              <span style="font-size:16px;font-weight:800;color:#16a34a">${_t.asistencia}%</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${_t.asistencia}%;background:#16a34a;border-radius:99px"></div>
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
            <i class="bi bi-journal-richtext" style="color:${i}"></i> Plan de estudios y calificaciones
          </h3>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>Materia</th><th>Créditos</th><th style="text-align:right">Calificación</th><th>Estado</th></tr></thead>
            <tbody>${Ig.map(e=>`<tr>
              <td><strong>${e.nombre}</strong></td>
              <td style="color:rgba(255,255,255,0.45)">${e.creditos}</td>
              <td style="text-align:right;font-size:15px;font-weight:700;color:${e.calificacion?i:"rgba(255,255,255,0.25)"}">${e.calificacion??"—"}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${e.c}22;color:${e.c};border:1px solid ${e.c}33">${e.estatus}</span></td>
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
            <tbody>${jg.map(e=>`<tr>
              <td><strong>${e.mes}</strong></td>
              <td style="color:rgba(255,255,255,0.45)">${e.fecha}</td>
              <td style="color:rgba(255,255,255,0.50)">${e.metodo}</td>
              <td style="text-align:right;font-weight:700;color:${i}">${e.monto}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${e.c}22;color:${e.c};border:1px solid ${e.c}33">${e.estado}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const Bg=[{hora:"07:00",lunes:"Inglés Avanz.",martes:"—",miercoles:"Inglés Avanz.",jueves:"—",viernes:"Inglés Avanz.",sabado:"—"},{hora:"08:00",lunes:"—",martes:"—",miercoles:"—",jueves:"—",viernes:"—",sabado:"—"},{hora:"09:00",lunes:"—",martes:"—",miercoles:"—",jueves:"—",viernes:"—",sabado:"Diseño Gráfico"},{hora:"10:00",lunes:"Marketing Dig.",martes:"—",miercoles:"Marketing Dig.",jueves:"—",viernes:"—",sabado:"Diseño Gráfico"},{hora:"18:00",lunes:"—",martes:"Python",miercoles:"—",jueves:"Python",viernes:"—",sabado:"—"},{hora:"19:00",lunes:"Inglés Avanz.",martes:"—",miercoles:"Inglés Avanz.",jueves:"Marketing Dig.",viernes:"Inglés Avanz.",sabado:"—"}],Da={"Inglés Avanz.":"rgba(245,158,11,0.70)",Python:"rgba(99,102,241,0.70)","Marketing Dig.":"rgba(236,72,153,0.70)","Diseño Gráfico":"rgba(16,185,129,0.70)"},Vg=["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];function Ng(){const i=[{icon:"bi-people-fill",label:"Alumnos Activos",value:79,delta:"+8",trend:"up"},{icon:"bi-cash-stack",label:"Ingresos Mes",value:"$58,100",delta:"+9%",trend:"up",animate:!1},{icon:"bi-calendar-check",label:"Asistencia Prom.",value:"84%",delta:"+3%",trend:"up",animate:!1},{icon:"bi-star-fill",label:"Promedio General",value:8.7,delta:"+0.3",trend:"up",animate:!1}];return`
  <div style="--industry-accent:${lt.accent};--industry-accent-rgb:${lt.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-mortarboard-fill" style="color:${lt.accent};margin-right:10px"></i>Dashboard Académico
        </h1>
        <p style="font-size:14px;color:rgba(0,0,0,0.40)">EduTrack — Desempeño e ingresos</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(217,119,6,0.08);border:1px solid rgba(217,119,6,0.20);border-radius:var(--radius-md);font-size:13px;color:${lt.accent}">
        <span class="status-dot active"></span> 4 cursos activos · Periodo Ago-Dic 2025
      </div>
    </div>

    ${Xt(i,4)}

    <!-- HORARIO SEMANAL -->
    <div class="glass-card p-4 mb-3" style="position:relative">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${lt.accent},rgba(217,119,6,0.2))"></div>
      <h3 style="font-size:15px;font-weight:700;margin-bottom:16px">
        <i class="bi bi-calendar3" style="color:${lt.accent};margin-right:8px"></i>Horario Semanal
      </h3>
      <div style="display:grid;grid-template-columns:60px repeat(6,1fr);gap:4px">
        <!-- Header días -->
        <div></div>
        ${Vg.map(t=>`<div style="text-align:center;font-size:11px;font-weight:700;color:rgba(0,0,0,0.40);padding:6px 4px;letter-spacing:0.04em">${t.substring(0,3).toUpperCase()}</div>`).join("")}

        <!-- Filas de hora -->
        ${Bg.map(t=>`
          <div style="font-size:10px;color:rgba(0,0,0,0.35);font-weight:600;padding-top:6px;white-space:nowrap">${t.hora}</div>
          ${["lunes","martes","miercoles","jueves","viernes","sabado"].map(e=>{const s=t[e];return`<div style="height:36px;border-radius:6px;background:${s&&s!=="—"?Da[s]||"rgba(217,119,6,0.30)":"transparent"};display:flex;align-items:center;justify-content:center;border:1px solid ${s&&s!=="—"?"transparent":"rgba(0,0,0,0.06)"}">
              ${s&&s!=="—"?`<span style="font-size:9px;font-weight:700;color:white;text-align:center;padding:0 4px;line-height:1.2">${s}</span>`:""}
            </div>`}).join("")}
        `).join("")}
      </div>

      <!-- Leyenda -->
      <div style="display:flex;gap:16px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(0,0,0,0.07);flex-wrap:wrap">
        ${Object.entries(Da).map(([t,e])=>`<span style="display:flex;align-items:center;gap:6px;font-size:11px;color:rgba(0,0,0,0.50)"><span style="width:12px;height:12px;border-radius:3px;background:${e};display:inline-block"></span>${t}</span>`).join("")}
      </div>
    </div>

    <!-- CURSOS PROGRESS + CHART -->
    <div class="row g-3">
      <div class="col-lg-6">
        <div class="glass-card p-4">
          <h3 style="font-size:15px;font-weight:700;margin-bottom:16px">Avance de cursos</h3>
          ${Lg.map(t=>`
            <div style="margin-bottom:14px">
              <div style="display:flex;justify-content:space-between;margin-bottom:6px">
                <div>
                  <div style="font-size:13px;font-weight:600">${t.nombre}</div>
                  <div style="font-size:11px;color:rgba(0,0,0,0.40)">${t.instructor} · ${t.alumnos}/${t.capacidad} alumnos</div>
                </div>
                <span style="font-size:16px;font-weight:800;color:${lt.accent}">${t.avance}%</span>
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
  `}function Hg(){Ii("chart-asistencia",{labels:Ra.labels,datasets:Ra.datasets,height:200})}function Wg(){const i=[{hora:"07:00",curso:"CrossFit 6am",instructor:"Mtra. Elena Vidal",salon:"Aula A",asistentes:18,estado:"en curso"},{hora:"09:00",curso:"Inglés Avanzado",instructor:"Mtra. Elena Vidal",salon:"Aula B",asistentes:22,estado:"en curso"},{hora:"11:00",curso:"Diseño Gráfico",instructor:"Dis. Laura Ríos",salon:"Lab PC",asistentes:14,estado:"próximo"},{hora:"13:00",curso:"Python Básico",instructor:"Ing. Jorge Mora",salon:"Lab PC",asistentes:16,estado:"próximo"},{hora:"17:00",curso:"Marketing Digital",instructor:"Lic. Pablo Salas",salon:"Aula C",asistentes:20,estado:"próximo"},{hora:"19:00",curso:"Inglés Avanzado",instructor:"Mtra. Elena Vidal",salon:"Aula A",asistentes:24,estado:"próximo"}],t={"en curso":"#22c55e",próximo:lt.accent,completado:"rgba(255,255,255,0.30)"};return`
  <div style="--industry-accent:${lt.accent};--industry-accent-rgb:${lt.accentRgb}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-calendar3" style="color:${lt.accent};margin-right:10px"></i>Operaciones del Día</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${lt.nombre} — Clases y asistencia en tiempo real</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Lista de asistencia tomada')"><i class="bi bi-check2-all"></i> Tomar asistencia</button>
    </div>

    <!-- Resumen del día -->
    <div class="row g-3 mb-3">
      ${[{label:"Clases hoy",val:6,icon:"bi-calendar3",color:lt.accent},{label:"Alumnos hoy",val:114,icon:"bi-people-fill",color:"#22c55e"},{label:"Instructores",val:4,icon:"bi-person-video3",color:"#06b6d4"},{label:"Salones activos",val:3,icon:"bi-door-open-fill",color:"#f59e0b"}].map(e=>`
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
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${lt.accent},transparent)"></div>
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
        ${Og.filter(e=>e.asistencia<80||e.pago==="vencido"||e.estatus!=="activo").map(e=>`
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
  `}const Q={nombre:"PowerGym",accent:"#ec4899",accentRgb:"236,72,153"},Nn=[{nombre:"CrossFit 6am",trainer:"Carlos V.",cupo:16,inscritos:14,sala:"Box A",horario:"L-M-V 6:00am"},{nombre:"Yoga Flow",trainer:"Sandra M.",cupo:20,inscritos:18,sala:"Studio B",horario:"L-M-V 7:30am"},{nombre:"Spinning",trainer:"Javier R.",cupo:24,inscritos:20,sala:"Cycling",horario:"Mar-Jue 6:30pm"},{nombre:"Boxeo",trainer:"Javier R.",cupo:12,inscritos:10,sala:"Ring",horario:"Mar-Jue 7:30pm"},{nombre:"Pilates",trainer:"Sandra M.",cupo:15,inscritos:13,sala:"Studio B",horario:"Sáb 9:00am"},{nombre:"Zumba",trainer:"Karen L.",cupo:30,inscritos:27,sala:"Salón D",horario:"L-M-V 8:00pm"}],Ta={labels:["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"],data:[87,92,78,95,88,110,45]},H={nombre:"Alejandro Torres Vega",iniciales:"AT",edad:31,tel:"55 5566 7788",email:"alejandro.tv@gmail.com",plan:"Elite",desde:"Sep 2023",vencimiento:"Sep 2025",peso_inicio:88,peso_actual:79,meta:75,sesiones_mes:16,racha:21,nps:10,coach:"Lic. Fernanda Ruiz",horario:"Mar/Jue/Sáb 07:00",objetivo:"Bajar peso · Definición muscular"},as=[{nombre:"CrossFit 7am",fecha:"Hoy 07:00",instructor:"F. Ruiz",asistencia:!0,cal:480},{nombre:"Spinning Lunes",fecha:"Lun 18:00",instructor:"J. Ochoa",asistencia:!0,cal:420},{nombre:"HIIT Avanzado",fecha:"Sáb 09:00",instructor:"F. Ruiz",asistencia:!0,cal:510},{nombre:"Fuerza Total",fecha:"Jue 07:00",instructor:"M. Rios",asistencia:!1,cal:0},{nombre:"CrossFit 7am",fecha:"Mar 07:00",instructor:"F. Ruiz",asistencia:!0,cal:465},{nombre:"Yoga Stretch",fecha:"Dom 10:00",instructor:"P. Lagos",asistencia:!0,cal:210}],Gg=[{periodo:"Sep 2025",monto:"$1,400",fecha:"01 Sep 2025",metodo:"Domiciliación",estado:"Programado",c:"#6366f1"},{periodo:"Jun 2025",monto:"$1,400",fecha:"01 Jun 2025",metodo:"Domiciliación",estado:"Pagado",c:"#16a34a"},{periodo:"May 2025",monto:"$1,400",fecha:"01 May 2025",metodo:"Domiciliación",estado:"Pagado",c:"#16a34a"},{periodo:"Abr 2025",monto:"$1,400",fecha:"01 Abr 2025",metodo:"Domiciliación",estado:"Pagado",c:"#16a34a"}],Ea=[{semana:"Inicio (Sep 23)",peso:88},{semana:"Ene 24",peso:85},{semana:"May 24",peso:83},{semana:"Sep 24",peso:81},{semana:"Ene 25",peso:80},{semana:"Hoy",peso:79}];function Yg(){const i=Q.accent,t=H.peso_actual-H.meta,e=Math.round((H.peso_inicio-H.peso_actual)/(H.peso_inicio-H.meta)*100);return`
  <div style="--industry-accent:${i};--industry-accent-rgb:${Q.accentRgb}">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:12px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:52px;height:52px;border-radius:50%;background:${i};display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:white;flex-shrink:0">${H.iniciales}</div>
        <div>
          <h1 style="font-size:1.5rem;font-weight:800;color:white;letter-spacing:-0.02em;margin-bottom:6px">${H.nombre}
            <span style="font-size:13px;font-weight:400;color:rgba(255,255,255,0.35);margin-left:6px">${H.edad} años</span>
          </h1>
          <div style="display:flex;flex-wrap:wrap;gap:6px">${qt(["Elite ⭐","Racha 21 días","Meta: 75 kg","NPS 10"])}</div>
        </div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button class="btn-nux btn-secondary-nux" onclick="window.__toastInfo&&window.__toastInfo('Generando plan personalizado...')"><i class="bi bi-clipboard2-data"></i> Plan</button>
        <button class="btn-nux btn-primary-nux"   onclick="window.__toastSuccess&&window.__toastSuccess('Mensaje enviado a Alejandro')"><i class="bi bi-chat-dots-fill"></i> Contactar</button>
      </div>
    </div>

    ${Kt({stages:["Visitante","Básico","Premium","Elite","Embajador"],currentIndex:3,accent:i})}

    <div class="row g-3">
      <div class="col-lg-3">
        <div class="glass-card p-4" style="position:sticky;top:72px">
          <div style="font-size:11px;font-weight:700;letter-spacing:0.10em;text-transform:uppercase;color:rgba(255,255,255,0.28);margin-bottom:16px">Perfil del miembro</div>
          ${[{icon:"bi-telephone-fill",label:"Teléfono",val:H.tel},{icon:"bi-envelope-fill",label:"Email",val:H.email},{icon:"bi-award-fill",label:"Plan",val:H.plan},{icon:"bi-calendar3",label:"Miembro desde",val:H.desde},{icon:"bi-arrow-repeat",label:"Vencimiento",val:H.vencimiento},{icon:"bi-alarm-fill",label:"Horario habitual",val:H.horario}].map(s=>`
            <div style="display:flex;gap:10px;margin-bottom:13px;align-items:flex-start">
              <i class="bi ${s.icon}" style="color:${i};font-size:13px;margin-top:2px;flex-shrink:0"></i>
              <div>
                <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28)">${s.label}</div>
                <div style="font-size:13px;color:rgba(255,255,255,0.80);margin-top:1px">${s.val}</div>
              </div>
            </div>`).join("")}
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:4px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:10px">Coach asignado</div>
            <div style="display:flex;align-items:center;gap:10px">
              <div class="avatar" style="background:rgba(236,72,153,0.18);color:${i}">F</div>
              <div>
                <div style="font-size:13px;font-weight:600;color:white">${H.coach}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.40)">CrossFit · HIIT</div>
              </div>
            </div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:6px">Objetivo</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.60);line-height:1.6">${H.objetivo}</div>
          </div>
          <div style="border-top:1px solid rgba(255,255,255,0.07);padding-top:14px;margin-top:14px">
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:rgba(255,255,255,0.28);margin-bottom:8px">Meta de peso</div>
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
              <span style="font-size:12px;color:rgba(255,255,255,0.50)">88 kg → 75 kg</span>
              <span style="font-size:15px;font-weight:800;color:#16a34a">${e}%</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.07);border-radius:99px;overflow:hidden">
              <div style="height:100%;width:${e}%;background:#16a34a;border-radius:99px"></div>
            </div>
            <div style="font-size:11px;color:rgba(255,255,255,0.30);margin-top:5px">Hoy: ${H.peso_actual} kg · Faltan ${t} kg para meta</div>
          </div>
        </div>
      </div>

      <div class="col-lg-9">
        <div class="row g-3 mb-3">
          <div class="col-6 col-xl-3">${j({icon:"bi-fire",label:"Sesiones este mes",value:H.sesiones_mes,delta:"+4 vs mes ant.",trend:"up",cardColor:"#1d4ed8"})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-lightning-fill",label:"Racha actual",value:`${H.racha} días`,delta:"Récord personal",trend:"up",cardColor:"#7c3aed",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-arrow-down-circle-fill",label:"Peso actual",value:`${H.peso_actual} kg`,delta:`-${H.peso_inicio-H.peso_actual} kg bajados`,trend:"up",cardColor:"#15803d",animate:!1,deltaLabel:""})}</div>
          <div class="col-6 col-xl-3">${j({icon:"bi-heart-fill",label:"NPS personal",value:H.nps,delta:"Promotor activo",trend:"up",cardColor:"#b45309",deltaLabel:""})}</div>
        </div>

        <div class="glass-card p-4 mb-3">
          <h3 style="font-size:14px;font-weight:700;color:white;margin-bottom:14px;display:flex;align-items:center;gap:8px">
            <i class="bi bi-graph-down-arrow" style="color:${i}"></i> Progreso de peso (últimos 18 meses)
          </h3>
          <div style="display:flex;align-items:flex-end;gap:6px;height:80px;margin-bottom:8px">
            ${Ea.map((s,o)=>{const a=Math.round((s.peso-74)/15*80),n=o===Ea.length-1;return`<div style="display:flex;flex-direction:column;align-items:center;gap:4px;flex:1">
                <div style="font-size:10px;font-weight:700;color:${n?i:"rgba(255,255,255,0.35)"}">
                  ${s.peso}
                </div>
                <div style="width:100%;height:${a}px;background:${n?i:"rgba(255,255,255,0.08)"};border-radius:4px 4px 0 0;min-height:4px;transition:all 0.3s"></div>
                <div style="font-size:9px;color:rgba(255,255,255,0.30);white-space:nowrap;text-overflow:ellipsis;overflow:hidden;max-width:44px;text-align:center">${s.semana}</div>
              </div>`}).join("")}
          </div>
          <div style="display:flex;align-items:center;gap:16px;padding-top:8px;border-top:1px solid rgba(255,255,255,0.06)">
            <div style="display:flex;align-items:center;gap:6px"><div style="width:8px;height:8px;border-radius:50%;background:#16a34a"></div><span style="font-size:11px;color:rgba(255,255,255,0.40)">Bajó ${H.peso_inicio-H.peso_actual} kg en 21 meses</span></div>
            <div style="display:flex;align-items:center;gap:6px"><div style="width:8px;height:8px;border-radius:50%;background:${i}"></div><span style="font-size:11px;color:rgba(255,255,255,0.40)">Meta: 75 kg (${t} kg restantes)</span></div>
          </div>
        </div>

        <div class="glass-card p-4 mb-3">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:16px">
            <h3 style="font-size:14px;font-weight:700;color:white">Asistencia reciente</h3>
            <span style="font-size:12px;color:rgba(255,255,255,0.35)">${as.filter(s=>s.asistencia).length}/${as.length} sesiones asistidas</span>
          </div>
          <div style="overflow-x:auto">
            <table class="nux-table"><thead><tr><th>Clase</th><th>Fecha</th><th>Instructor</th><th style="text-align:right">Cals</th><th>Asistencia</th></tr></thead>
            <tbody>${as.map(s=>`<tr>
              <td><strong>${s.nombre}</strong></td>
              <td style="color:rgba(255,255,255,0.45);white-space:nowrap">${s.fecha}</td>
              <td style="color:rgba(255,255,255,0.50)">${s.instructor}</td>
              <td style="text-align:right;font-weight:700;color:${s.asistencia?i:"rgba(255,255,255,0.20)"}">${s.asistencia?s.cal+"kcal":"—"}</td>
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
            <tbody>${Gg.map(s=>`<tr>
              <td><strong>${s.periodo}</strong></td>
              <td style="color:rgba(255,255,255,0.45)">${s.fecha}</td>
              <td style="color:rgba(255,255,255,0.50)">${s.metodo}</td>
              <td style="text-align:right;font-weight:700;color:${i}">${s.monto}</td>
              <td><span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:${s.c}22;color:${s.c};border:1px solid ${s.c}33">${s.estado}</span></td>
            </tr>`).join("")}</tbody></table>
          </div>
        </div>
      </div>
    </div>
  </div>`}const Ug=[{nombre:"Roberto N.",clase:"CrossFit 6am",hora:"05:58",avatar:"R",plan:"Elite"},{nombre:"Paola S.",clase:"CrossFit 6am",hora:"06:02",avatar:"P",plan:"Elite"},{nombre:"Gabriela R.",clase:"Yoga Flow",hora:"07:25",avatar:"G",plan:"Premium"},{nombre:"Tomás F.",clase:"Yoga Flow",hora:"07:28",avatar:"T",plan:"Elite"},{nombre:"Miguel C.",clase:"Spinning",hora:"18:29",avatar:"M",plan:"Premium"},{nombre:"Claudia V.",clase:"Zumba",hora:"19:58",avatar:"C",plan:"Premium"}],Oa={cardio:"#ec4899",fuerza:"#f97316",mente:"#6366f1",funcional:"#eab308"},Xg={"CrossFit 6am":"fuerza","Yoga Flow":"mente",Spinning:"cardio",Boxeo:"fuerza",Pilates:"mente",Zumba:"cardio"};function Kg(){const i=[{icon:"bi-people-fill",label:"Miembros Activos",value:248,delta:"+14",trend:"up"},{icon:"bi-door-open-fill",label:"Accesos Hoy",value:87,delta:"+12",trend:"up"},{icon:"bi-cash-stack",label:"Ingresos Mes",value:"$82,100",delta:"+5%",trend:"up",animate:!1},{icon:"bi-person-x-fill",label:"Bajas Este Mes",value:4,delta:"-2",trend:"up"}];return`
  <div style="--industry-accent:${Q.accent};--industry-accent-rgb:${Q.accentRgb}">

    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:24px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px">
          <i class="bi bi-lightning-charge-fill" style="color:${Q.accent};margin-right:10px"></i>Dashboard del Gym
        </h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">PowerGym — Métricas de membresías y afluencia</p>
      </div>
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:rgba(236,72,153,0.10);border:1px solid rgba(236,72,153,0.25);border-radius:var(--radius-md);font-size:13px;color:${Q.accent}">
        <span class="status-dot active"></span> Gym abierto — 87 personas adentro
      </div>
    </div>

    ${Xt(i,4)}

    <!-- CLASES DE HOY -->
    <div class="glass-card p-4 mb-3" style="position:relative">
      <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,${Q.accent},rgba(236,72,153,0.2))"></div>
      <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">
        <i class="bi bi-calendar-event-fill" style="color:${Q.accent};margin-right:8px"></i>Clases de Hoy
      </h3>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px">
        ${Nn.map(t=>{const e=Xg[t.nombre]||"cardio",s=Oa[e],o=Math.round(t.inscritos/t.cupo*100);return`
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
              <span style="font-size:13px;font-weight:700;color:${o>=90?"#f87171":o>=70?"#fbbf24":s}">${t.inscritos}/${t.cupo}</span>
            </div>
            <div style="height:6px;background:rgba(255,255,255,0.08);border-radius:99px">
              <div style="width:${o}%;height:100%;background:${o>=90?"#f87171":o>=70?"#fbbf24":s};border-radius:99px;box-shadow:0 0 6px ${s}60"></div>
            </div>
          </div>
          `}).join("")}
      </div>
      <div style="display:flex;gap:16px;margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06)">
        ${Object.entries(Oa).map(([t,e])=>`<span style="display:flex;align-items:center;gap:5px;font-size:11px;color:rgba(255,255,255,0.40)"><span style="width:8px;height:8px;border-radius:2px;background:${e}"></span>${t.charAt(0).toUpperCase()+t.slice(1)}</span>`).join("")}
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
            <i class="bi bi-person-check-fill" style="color:${Q.accent};margin-right:8px"></i>Check-ins recientes
          </h3>
          ${Ug.map(t=>`
            <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.04)">
              <div style="width:32px;height:32px;border-radius:50%;background:rgba(236,72,153,0.20);border:2px solid rgba(236,72,153,0.40);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:${Q.accent};flex-shrink:0">${t.avatar}</div>
              <div style="flex:1;min-width:0">
                <div style="font-size:12px;font-weight:600;color:rgba(255,255,255,0.85)">${t.nombre}</div>
                <div style="font-size:11px;color:rgba(255,255,255,0.35);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${t.clase}</div>
              </div>
              <div style="text-align:right;flex-shrink:0">
                <div style="font-size:11px;color:${Q.accent};font-weight:700">${t.hora}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.25)">${t.plan}</div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  </div>
  `}function qg(){Ii("chart-accesos",{labels:Ta.labels,datasets:[{label:"Accesos",data:Ta.data}],height:180})}function Jg(){const i=[{nombre:"Roberto Núñez",hora:"06:02",plan:"Elite",clase:"CrossFit"},{nombre:"Paola Serrano",hora:"06:05",plan:"Elite",clase:"CrossFit"},{nombre:"Gabriela Ríos",hora:"07:28",plan:"Premium",clase:"Yoga"},{nombre:"Miguel Castro",hora:"07:44",plan:"Premium",clase:"Boxeo"},{nombre:"Tomás Fuentes",hora:"08:15",plan:"Elite",clase:"Pilates"},{nombre:"Claudia Vega",hora:"08:22",plan:"Premium",clase:"Zumba"},{nombre:"Andrés Lara",hora:"09:10",plan:"Básico",clase:"Libre"}];return`
  <div style="--industry-accent:${Q.accent};--industry-accent-rgb:${Q.accentRgb}">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:28px;flex-wrap:wrap;gap:12px">
      <div>
        <h1 style="font-size:1.6rem;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:4px"><i class="bi bi-door-open-fill" style="color:${Q.accent};margin-right:10px"></i>Control de Acceso</h1>
        <p style="font-size:14px;color:rgba(255,255,255,0.40)">${Q.nombre} — Afluencia en tiempo real</p>
      </div>
      <button class="btn-nux btn-primary-nux" onclick="window.__toastSuccess&&window.__toastSuccess('Check-in manual registrado')"><i class="bi bi-qr-code-scan"></i> Check-in manual</button>
    </div>

    <div class="row g-3 mb-3">
      <div class="col-lg-8">
        <!-- Clases del día -->
        <div class="glass-card p-4" style="position:relative">
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${Q.accent},transparent)"></div>
          <h3 style="font-size:15px;font-weight:700;color:white;margin-bottom:16px">Clases activas ahora</h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px">
            ${Nn.map(t=>{const e=Math.round(t.inscritos/t.cupo*100),s=e>=90?"#f87171":e>=70?Q.accent:"#22c55e";return`
              <div style="padding:14px;background:rgba(255,255,255,0.025);border:1px solid rgba(${Q.accentRgb},0.12);border-radius:var(--radius-md)">
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
                  <div style="font-size:11px;font-weight:700;color:${Q.accent}">${t.hora}</div>
                  <div style="font-size:10px;color:rgba(255,255,255,0.30)">${t.plan}</div>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    </div>
  </div>
  `}window.__toastSuccess=zi;window.__toastError=nh;window.__toastInfo=Ns;window.__toastWarning=rh;function Zg(){if(!document.getElementById("toast-container")){const i=document.createElement("div");i.id="toast-container",document.body.appendChild(i)}}function Hs(i,t){return()=>{const e=bh(i());document.getElementById("app").innerHTML=e,mh(),t&&t()}}function K(i,t,e,s,o){return()=>{const a=_h(i,t,e(),o);document.getElementById("app").innerHTML=a,$h(),s&&requestAnimationFrame(()=>{s&&s()})}}B("/",Hs(On,Ln));B("/home",Hs(On,Ln));B("/inspiracion",Hs(dh,ph));function Ke(i){return()=>{document.getElementById("app").innerHTML=i()}}B("/restaurantes",Ke(Sh));B("/salud",Ke(Ih));B("/construccion",Ke(qh));B("/retail",Ke(ng));B("/servicios",Ke(mg));B("/restaurantes/crm",K("restaurantes","CRM de Clientes",Ah,null,"/restaurantes/crm"));B("/restaurantes/dashboard",K("restaurantes","Dashboard",Dh,Th,"/restaurantes/dashboard"));B("/restaurantes/operaciones",K("restaurantes","Operaciones",Oh,null,"/restaurantes/operaciones"));B("/salud/crm",K("salud","Expedientes",Bh,null,"/salud/crm"));B("/salud/dashboard",K("salud","Dashboard Clínico",Wh,Gh,"/salud/dashboard"));B("/salud/operaciones",K("salud","Operaciones del Día",Yh,null,"/salud/operaciones"));B("/construccion/crm",K("construccion","Gestión de Proyectos",Zh,null,"/construccion/crm"));B("/construccion/dashboard",K("construccion","Dashboard de Obra",eg,ig,"/construccion/dashboard"));B("/construccion/operaciones",K("construccion","Tablero Operativo",ag,null,"/construccion/operaciones"));B("/retail/crm",K("retail","CRM de Clientes",lg,null,"/retail/crm"));B("/retail/dashboard",K("retail","Dashboard de Ventas",pg,hg,"/retail/dashboard"));B("/retail/operaciones",K("retail","Punto de Venta",ug,fg,"/retail/operaciones"));B("/servicios/crm",K("servicios","CRM de Clientes",yg,null,"/servicios/crm"));B("/servicios/dashboard",K("servicios","Dashboard MRR",_g,$g,"/servicios/dashboard"));B("/servicios/operaciones",K("servicios","Gestión de Tickets",kg,Mg,"/servicios/operaciones"));B("/saas/crm",K("saas","CRM de Cuentas",Cg,null,"/saas/crm"));B("/saas/dashboard",K("saas","Dashboard SaaS",Rg,Dg,"/saas/dashboard"));B("/saas/operaciones",K("saas","Pipeline de Ventas",Eg,null,"/saas/operaciones"));B("/educacion/crm",K("educacion","CRM de Alumnos",Fg,null,"/educacion/crm"));B("/educacion/dashboard",K("educacion","Dashboard Académico",Ng,Hg,"/educacion/dashboard"));B("/educacion/operaciones",K("educacion","Operaciones del Día",Wg,null,"/educacion/operaciones"));B("/fitness/crm",K("fitness","CRM de Miembros",Yg,null,"/fitness/crm"));B("/fitness/dashboard",K("fitness","Dashboard del Gym",Kg,qg,"/fitness/dashboard"));B("/fitness/operaciones",K("fitness","Control de Acceso",Jg,null,"/fitness/operaciones"));Zg();sh()?ua():oh(()=>ua());
