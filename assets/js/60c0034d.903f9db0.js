"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1368],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),l=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=l(e.components);return r.createElement(p.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),f=l(n),d=o,h=f["".concat(p,".").concat(d)]||f[d]||s[d]||a;return n?r.createElement(h,i(i({ref:t},c),{},{components:n})):r.createElement(h,i({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=f;var u={};for(var p in t)hasOwnProperty.call(t,p)&&(u[p]=t[p]);u.originalType=e,u.mdxType="string"==typeof e?e:o,i[1]=u;for(var l=2;l<a;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},3602:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return i},default:function(){return s},frontMatter:function(){return a},metadata:function(){return u},toc:function(){return l}});var r=n(3117),o=(n(7294),n(3905));const a={id:"on-soft-input-height-change",title:"onSoftInputHeightChange",sidebar_label:"onSoftInputHeightChange"},i=void 0,u={unversionedId:"api/module/on-soft-input-height-change",id:"version-2.0.x/api/module/on-soft-input-height-change",title:"onSoftInputHeightChange",description:"Use onSoftInputHeightChange method, if you want to listen to events when soft input's height changes.",source:"@site/versioned_docs/version-2.0.x/api/module/ON_SOFT_INPUT_HEIGHT_CHANGE.mdx",sourceDirName:"api/module",slug:"/api/module/on-soft-input-height-change",permalink:"/react-native-avoid-softinput/docs/2.0.x/api/module/on-soft-input-height-change",draft:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/versioned_docs/version-2.0.x/api/module/ON_SOFT_INPUT_HEIGHT_CHANGE.mdx",tags:[],version:"2.0.x",frontMatter:{id:"on-soft-input-height-change",title:"onSoftInputHeightChange",sidebar_label:"onSoftInputHeightChange"},sidebar:"docsSidebar",previous:{title:"onSoftInputHidden",permalink:"/react-native-avoid-softinput/docs/2.0.x/api/module/on-soft-input-hidden"},next:{title:"onSoftInputAppliedOffsetChange",permalink:"/react-native-avoid-softinput/docs/2.0.x/api/module/on-soft-input-applied-offset-change"}},p={},l=[{value:"Parameters",id:"parameters",level:3},{value:"Example",id:"example",level:3}],c={toc:l};function s(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},c,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Use ",(0,o.kt)("inlineCode",{parentName:"p"},"onSoftInputHeightChange")," method, if you want to listen to events when soft input's height changes."),(0,o.kt)("h3",{id:"parameters"},"Parameters"),(0,o.kt)("table",null,(0,o.kt)("thead",{parentName:"table"},(0,o.kt)("tr",{parentName:"thead"},(0,o.kt)("th",{parentName:"tr",align:null},"Type"),(0,o.kt)("th",{parentName:"tr",align:null},"Required"),(0,o.kt)("th",{parentName:"tr",align:null},"Description"))),(0,o.kt)("tbody",{parentName:"table"},(0,o.kt)("tr",{parentName:"tbody"},(0,o.kt)("td",{parentName:"tr",align:null},"({ softInputHeight }: { softInputHeight: number }) => void"),(0,o.kt)("td",{parentName:"tr",align:null},"yes"),(0,o.kt)("td",{parentName:"tr",align:null},"function called with current soft input height when soft input is displayed")))),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { AvoidSoftInput } from "react-native-avoid-softinput";\n\nconst unsubscribe = AvoidSoftInput.onSoftInputHeightChange(\n  ({ softInputHeight }) => {\n    // Do sth\n  }\n);\n\n// later invoke unsubscribe.remove()\n')))}s.isMDXComponent=!0}}]);