"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7325],{3905:(e,t,r)=>{r.d(t,{Zo:()=>p,kt:()=>m});var a=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function o(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?o(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t){if(null==e)return{};var r,a,n=function(e,t){if(null==e)return{};var r,a,n={},o=Object.keys(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)r=o[a],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=a.createContext({}),d=function(e){var t=a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=d(e.components);return a.createElement(l.Provider,{value:t},e.children)},c="mdxType",u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},f=a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),c=d(r),f=n,m=c["".concat(l,".").concat(f)]||c[f]||u[f]||o;return r?a.createElement(m,i(i({ref:t},p),{},{components:r})):a.createElement(m,i({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,i=new Array(o);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:n,i[1]=s;for(var d=2;d<o;d++)i[d]=r[d];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}f.displayName="MDXCreateElement"},8456:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>o,metadata:()=>s,toc:()=>d});var a=r(7462),n=(r(7294),r(3905));const o={id:"set-avoid-offset",title:"setAvoidOffset",sidebar_label:"setAvoidOffset",keywords:["react-native-avoid-softinput","setAvoidOffset","module"]},i=void 0,s={unversionedId:"api/module/set-avoid-offset",id:"version-3.0.x/api/module/set-avoid-offset",title:"setAvoidOffset",description:"Use setAvoidOffset method, if you want to increase/decrease amount of translation/padding applied to react root view/scroll view.",source:"@site/versioned_docs/version-3.0.x/api/module/SET_AVOID_OFFSET.mdx",sourceDirName:"api/module",slug:"/api/module/set-avoid-offset",permalink:"/react-native-avoid-softinput/docs/api/module/set-avoid-offset",draft:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/versioned_docs/version-3.0.x/api/module/SET_AVOID_OFFSET.mdx",tags:[],version:"3.0.x",frontMatter:{id:"set-avoid-offset",title:"setAvoidOffset",sidebar_label:"setAvoidOffset",keywords:["react-native-avoid-softinput","setAvoidOffset","module"]},sidebar:"docsSidebar",previous:{title:"setShouldMimicIOSBehavior",permalink:"/react-native-avoid-softinput/docs/api/module/set-should-mimic-ios-behavior"},next:{title:"setEasing",permalink:"/react-native-avoid-softinput/docs/api/module/set-easing"}},l={},d=[{value:"Parameters",id:"parameters",level:3},{value:"Example",id:"example",level:3}],p={toc:d};function c(e){let{components:t,...r}=e;return(0,n.kt)("wrapper",(0,a.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"Use ",(0,n.kt)("inlineCode",{parentName:"p"},"setAvoidOffset")," method, if you want to increase/decrease amount of translation/padding applied to react root view/scroll view."),(0,n.kt)("h3",{id:"parameters"},"Parameters"),(0,n.kt)("table",null,(0,n.kt)("thead",{parentName:"table"},(0,n.kt)("tr",{parentName:"thead"},(0,n.kt)("th",{parentName:"tr",align:null},"Type"),(0,n.kt)("th",{parentName:"tr",align:null},"Required"),(0,n.kt)("th",{parentName:"tr",align:null},"Description"))),(0,n.kt)("tbody",{parentName:"table"},(0,n.kt)("tr",{parentName:"tbody"},(0,n.kt)("td",{parentName:"tr",align:null},"number"),(0,n.kt)("td",{parentName:"tr",align:null},"yes"),(0,n.kt)("td",{parentName:"tr",align:null},"additional offset added to react root view/scroll view")))),(0,n.kt)("h3",{id:"example"},"Example"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-ts"},'import { AvoidSoftInput } from "react-native-avoid-softinput";\n\nAvoidSoftInput.setAvoidOffset(40); // It will result in applied value 40dp greater than standard one\n')),(0,n.kt)("admonition",{type:"info"},(0,n.kt)("p",{parentName:"admonition"},(0,n.kt)("strong",{parentName:"p"},"Value applied to that method is persisted, so if you want to use that in a single use case, remember to clear it (just pass 0 as an argument)"))))}c.isMDXComponent=!0}}]);