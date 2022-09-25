"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4177],{3905:function(e,t,n){n.d(t,{Zo:function(){return l},kt:function(){return c}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},l=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),d=u(n),c=a,m=d["".concat(s,".").concat(c)]||d[c]||f[c]||o;return n?r.createElement(m,i(i({ref:t},l),{},{components:n})):r.createElement(m,i({ref:t},l))}));function c(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p.mdxType="string"==typeof e?e:a,i[1]=p;for(var u=2;u<o;u++)i[u]=n[u];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},4115:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return i},default:function(){return f},frontMatter:function(){return o},metadata:function(){return p},toc:function(){return u}});var r=n(3117),a=(n(7294),n(3905));const o={id:"use-soft-input-applied-offset-changed",title:"useSoftInputAppliedOffsetChanged",sidebar_label:"useSoftInputAppliedOffsetChanged"},i=void 0,p={unversionedId:"api/hooks/use-soft-input-applied-offset-changed",id:"version-2.0.x/api/hooks/use-soft-input-applied-offset-changed",title:"useSoftInputAppliedOffsetChanged",description:"useSoftInputAppliedOffsetChanged is a shortcut for using AvoidSoftInput.onSoftInputAppliedOffsetChange method inside useEffect.",source:"@site/versioned_docs/version-2.0.x/api/hooks/USE_SOFT_INPUT_APPLIED_OFFSET_CHANGED.mdx",sourceDirName:"api/hooks",slug:"/api/hooks/use-soft-input-applied-offset-changed",permalink:"/react-native-avoid-softinput/docs/2.0.x/api/hooks/use-soft-input-applied-offset-changed",draft:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/versioned_docs/version-2.0.x/api/hooks/USE_SOFT_INPUT_APPLIED_OFFSET_CHANGED.mdx",tags:[],version:"2.0.x",frontMatter:{id:"use-soft-input-applied-offset-changed",title:"useSoftInputAppliedOffsetChanged",sidebar_label:"useSoftInputAppliedOffsetChanged"},sidebar:"docsSidebar",previous:{title:"useSoftInputHeightChanged",permalink:"/react-native-avoid-softinput/docs/2.0.x/api/hooks/use-soft-input-height-changed"},next:{title:"useSoftInputState",permalink:"/react-native-avoid-softinput/docs/2.0.x/api/hooks/use-soft-input-state"}},s={},u=[{value:"Parameters",id:"parameters",level:3},{value:"Example",id:"example",level:3}],l={toc:u};function f(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"useSoftInputAppliedOffsetChanged")," is a shortcut for using ",(0,a.kt)("inlineCode",{parentName:"p"},"AvoidSoftInput.onSoftInputAppliedOffsetChange")," method inside ",(0,a.kt)("inlineCode",{parentName:"p"},"useEffect"),"."),(0,a.kt)("h3",{id:"parameters"},"Parameters"),(0,a.kt)("table",null,(0,a.kt)("thead",{parentName:"table"},(0,a.kt)("tr",{parentName:"thead"},(0,a.kt)("th",{parentName:"tr",align:null},"Type"),(0,a.kt)("th",{parentName:"tr",align:null},"Required"),(0,a.kt)("th",{parentName:"tr",align:null},"Description"))),(0,a.kt)("tbody",{parentName:"table"},(0,a.kt)("tr",{parentName:"tbody"},(0,a.kt)("td",{parentName:"tr",align:null},"({ appliedOffset }: { appliedOffset: number }) => void"),(0,a.kt)("td",{parentName:"tr",align:null},"yes"),(0,a.kt)("td",{parentName:"tr",align:null},"function called during applying padding or translation with current applied value")))),(0,a.kt)("h3",{id:"example"},"Example"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'import { useSoftInputAppliedOffsetChanged } from "react-native-avoid-softinput";\n\nuseSoftInputAppliedOffsetChanged(({ appliedOffset }) => {\n  // Do sth\n});\n')))}f.isMDXComponent=!0}}]);