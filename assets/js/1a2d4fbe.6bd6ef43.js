"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[2274],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},d=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},l=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,u=e.parentName,d=s(e,["components","mdxType","originalType","parentName"]),l=c(n),f=o,m=l["".concat(u,".").concat(f)]||l[f]||p[f]||i;return n?r.createElement(m,a(a({ref:t},d),{},{components:n})):r.createElement(m,a({ref:t},d))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=l;var s={};for(var u in t)hasOwnProperty.call(t,u)&&(s[u]=t[u]);s.originalType=e,s.mdxType="string"==typeof e?e:o,a[1]=s;for(var c=2;c<i;c++)a[c]=n[c];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}l.displayName="MDXCreateElement"},9693:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return a},default:function(){return p},frontMatter:function(){return i},metadata:function(){return s},toc:function(){return c}});var r=n(3117),o=(n(7294),n(3905));const i={id:"set-adjust-resize",title:"setAdjustResize",sidebar_label:"setAdjustResize"},a=void 0,s={unversionedId:"api/module/set-adjust-resize",id:"api/module/set-adjust-resize",title:"setAdjustResize",description:"Use setAdjustResize, to set android:windowSoftInputMode attribute to adjustResize value.",source:"@site/docs/api/module/SET_ADJUST_RESIZE.mdx",sourceDirName:"api/module",slug:"/api/module/set-adjust-resize",permalink:"/react-native-avoid-softinput/docs/next/api/module/set-adjust-resize",draft:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/docs/api/module/SET_ADJUST_RESIZE.mdx",tags:[],version:"current",frontMatter:{id:"set-adjust-resize",title:"setAdjustResize",sidebar_label:"setAdjustResize"},sidebar:"docsSidebar",previous:{title:"setAdjustPan",permalink:"/react-native-avoid-softinput/docs/next/api/module/set-adjust-pan"},next:{title:"setAdjustUnspecified",permalink:"/react-native-avoid-softinput/docs/next/api/module/set-adjust-unspecified"}},u={},c=[{value:"Example",id:"example",level:3}],d={toc:c};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Use ",(0,o.kt)("inlineCode",{parentName:"p"},"setAdjustResize"),", to set ",(0,o.kt)("inlineCode",{parentName:"p"},"android:windowSoftInputMode")," attribute to ",(0,o.kt)("inlineCode",{parentName:"p"},"adjustResize")," value."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { AvoidSoftInput } from "react-native-avoid-softinput";\n\nAvoidSoftInput.setAdjustResize();\n')))}p.isMDXComponent=!0}}]);