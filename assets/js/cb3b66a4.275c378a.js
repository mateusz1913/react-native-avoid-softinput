"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[7264],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>m});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),l=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):p(p({},t),e)),n},u=function(e){var t=l(e.components);return a.createElement(s.Provider,{value:t},e.children)},f="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),f=l(n),c=r,m=f["".concat(s,".").concat(c)]||f[c]||d[c]||o;return n?a.createElement(m,p(p({ref:t},u),{},{components:n})):a.createElement(m,p({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,p=new Array(o);p[0]=c;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i[f]="string"==typeof e?e:r,p[1]=i;for(var l=2;l<o;l++)p[l]=n[l];return a.createElement.apply(null,p)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},3790:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>s,contentTitle:()=>p,default:()=>f,frontMatter:()=>o,metadata:()=>i,toc:()=>l});var a=n(7462),r=(n(7294),n(3905));const o={id:"use-soft-input-applied-offset-changed",title:"useSoftInputAppliedOffsetChanged",sidebar_label:"useSoftInputAppliedOffsetChanged",keywords:["react-native-avoid-softinput","useSoftInputAppliedOffsetChanged","react hooks"]},p=void 0,i={unversionedId:"api/hooks/use-soft-input-applied-offset-changed",id:"api/hooks/use-soft-input-applied-offset-changed",title:"useSoftInputAppliedOffsetChanged",description:"useSoftInputAppliedOffsetChanged is a shortcut for using AvoidSoftInput.onSoftInputAppliedOffsetChange method inside useEffect.",source:"@site/docs/api/hooks/USE_SOFT_INPUT_APPLIED_OFFSET_CHANGED.mdx",sourceDirName:"api/hooks",slug:"/api/hooks/use-soft-input-applied-offset-changed",permalink:"/react-native-avoid-softinput/docs/next/api/hooks/use-soft-input-applied-offset-changed",draft:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/docs/api/hooks/USE_SOFT_INPUT_APPLIED_OFFSET_CHANGED.mdx",tags:[],version:"current",frontMatter:{id:"use-soft-input-applied-offset-changed",title:"useSoftInputAppliedOffsetChanged",sidebar_label:"useSoftInputAppliedOffsetChanged",keywords:["react-native-avoid-softinput","useSoftInputAppliedOffsetChanged","react hooks"]},sidebar:"docsSidebar",previous:{title:"useSoftInputHeightChanged",permalink:"/react-native-avoid-softinput/docs/next/api/hooks/use-soft-input-height-changed"},next:{title:"useSoftInputState",permalink:"/react-native-avoid-softinput/docs/next/api/hooks/use-soft-input-state"}},s={},l=[{value:"Parameters",id:"parameters",level:3},{value:"Example",id:"example",level:3}],u={toc:l};function f(e){let{components:t,...n}=e;return(0,r.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("inlineCode",{parentName:"p"},"useSoftInputAppliedOffsetChanged")," is a shortcut for using ",(0,r.kt)("inlineCode",{parentName:"p"},"AvoidSoftInput.onSoftInputAppliedOffsetChange")," method inside ",(0,r.kt)("inlineCode",{parentName:"p"},"useEffect"),"."),(0,r.kt)("h3",{id:"parameters"},"Parameters"),(0,r.kt)("table",null,(0,r.kt)("thead",{parentName:"table"},(0,r.kt)("tr",{parentName:"thead"},(0,r.kt)("th",{parentName:"tr",align:null},"Type"),(0,r.kt)("th",{parentName:"tr",align:null},"Required"),(0,r.kt)("th",{parentName:"tr",align:null},"Description"))),(0,r.kt)("tbody",{parentName:"table"},(0,r.kt)("tr",{parentName:"tbody"},(0,r.kt)("td",{parentName:"tr",align:null},"({ appliedOffset }: { appliedOffset: number }) => void"),(0,r.kt)("td",{parentName:"tr",align:null},"yes"),(0,r.kt)("td",{parentName:"tr",align:null},"function called during applying padding or translation with current applied value")))),(0,r.kt)("h3",{id:"example"},"Example"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-ts"},'import { useSoftInputAppliedOffsetChanged } from "react-native-avoid-softinput";\n\nuseSoftInputAppliedOffsetChanged(({ appliedOffset }) => {\n  // Do sth\n});\n')))}f.isMDXComponent=!0}}]);