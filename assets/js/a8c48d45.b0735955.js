"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[189],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},d=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(n),m=r,f=d["".concat(s,".").concat(m)]||d[m]||c[m]||i;return n?a.createElement(f,o(o({ref:t},p),{},{components:n})):a.createElement(f,o({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,o=new Array(i);o[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,o[1]=l;for(var u=2;u<i;u++)o[u]=n[u];return a.createElement.apply(null,o)}return a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},8661:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return s},default:function(){return m},frontMatter:function(){return l},metadata:function(){return u},toc:function(){return c}});var a=n(7462),r=n(3366),i=(n(7294),n(3905)),o=["components"],l={id:"set-easing",title:"setEasing",sidebar_label:"setEasing"},s=void 0,u={unversionedId:"api/module/set-easing",id:"api/module/set-easing",title:"setEasing",description:"Use setEasing method, to customize animation's easing, available values are easeIn, easeInOut, easeOut and linear.",source:"@site/docs/api/module/SET_EASING.mdx",sourceDirName:"api/module",slug:"/api/module/set-easing",permalink:"/react-native-avoid-softinput/docs/api/module/set-easing",editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/docs/api/module/SET_EASING.mdx",tags:[],version:"current",frontMatter:{id:"set-easing",title:"setEasing",sidebar_label:"setEasing"},sidebar:"docsSidebar",previous:{title:"setAvoidOffset",permalink:"/react-native-avoid-softinput/docs/api/module/set-avoid-offset"},next:{title:"setHideAnimationDelay",permalink:"/react-native-avoid-softinput/docs/api/module/set-hide-animation-delay"}},p={},c=[{value:"Parameters",id:"parameters",level:3},{value:"Example",id:"example",level:3}],d={toc:c};function m(e){var t=e.components,n=(0,r.Z)(e,o);return(0,i.kt)("wrapper",(0,a.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Use ",(0,i.kt)("inlineCode",{parentName:"p"},"setEasing")," method, to customize animation's easing, available values are ",(0,i.kt)("inlineCode",{parentName:"p"},"easeIn"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"easeInOut"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"easeOut")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"linear"),"."),(0,i.kt)("h3",{id:"parameters"},"Parameters"),(0,i.kt)("table",null,(0,i.kt)("thead",{parentName:"table"},(0,i.kt)("tr",{parentName:"thead"},(0,i.kt)("th",{parentName:"tr",align:null},"Type"),(0,i.kt)("th",{parentName:"tr",align:null},"Required"),(0,i.kt)("th",{parentName:"tr",align:null},"Description"))),(0,i.kt)("tbody",{parentName:"table"},(0,i.kt)("tr",{parentName:"tbody"},(0,i.kt)("td",{parentName:"tr",align:null},(0,i.kt)("inlineCode",{parentName:"td"},"easeIn")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"easeInOut")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"easeOut")," or ",(0,i.kt)("inlineCode",{parentName:"td"},"linear")),(0,i.kt)("td",{parentName:"tr",align:null},"yes"),(0,i.kt)("td",{parentName:"tr",align:null},"animation's easing")))),(0,i.kt)("h3",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'import { AvoidSoftInput } from "react-native-avoid-softinput";\n\nAvoidSoftInput.setEasing("easeInOut"); // Changes animation\'s easing to `easeInOut` curve\n')))}m.isMDXComponent=!0}}]);