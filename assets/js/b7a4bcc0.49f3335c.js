"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[991],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return f}});var r=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function u(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=r.createContext({}),p=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=p(e.components);return r.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},l=r.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,c=u(e,["components","mdxType","originalType","parentName"]),l=p(n),f=i,m=l["".concat(s,".").concat(f)]||l[f]||d[f]||o;return n?r.createElement(m,a(a({ref:t},c),{},{components:n})):r.createElement(m,a({ref:t},c))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,a=new Array(o);a[0]=l;var u={};for(var s in t)hasOwnProperty.call(t,s)&&(u[s]=t[s]);u.originalType=e,u.mdxType="string"==typeof e?e:i,a[1]=u;for(var p=2;p<o;p++)a[p]=n[p];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}l.displayName="MDXCreateElement"},9990:function(e,t,n){n.r(t),n.d(t,{assets:function(){return c},contentTitle:function(){return s},default:function(){return f},frontMatter:function(){return u},metadata:function(){return p},toc:function(){return d}});var r=n(7462),i=n(3366),o=(n(7294),n(3905)),a=["components"],u={id:"set-adjust-unspecified",title:"setAdjustUnspecified",sidebar_label:"setAdjustUnspecified"},s=void 0,p={unversionedId:"api/module/set-adjust-unspecified",id:"api/module/set-adjust-unspecified",title:"setAdjustUnspecified",description:"Use setAdjustUnspecified, to set android:windowSoftInputMode attribute to adjustUnspecified value.",source:"@site/docs/api/module/SET_ADJUST_UNSPECIFIED.mdx",sourceDirName:"api/module",slug:"/api/module/set-adjust-unspecified",permalink:"/react-native-avoid-softinput/docs/api/module/set-adjust-unspecified",editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/docs/api/module/SET_ADJUST_UNSPECIFIED.mdx",tags:[],version:"current",frontMatter:{id:"set-adjust-unspecified",title:"setAdjustUnspecified",sidebar_label:"setAdjustUnspecified"},sidebar:"docsSidebar",previous:{title:"setAdjustResize",permalink:"/react-native-avoid-softinput/docs/api/module/set-adjust-resize"},next:{title:"setDefaultAppSoftInputMode",permalink:"/react-native-avoid-softinput/docs/api/module/set-default-app-soft-input-mode"}},c={},d=[{value:"Example",id:"example",level:3}],l={toc:d};function f(e){var t=e.components,n=(0,i.Z)(e,a);return(0,o.kt)("wrapper",(0,r.Z)({},l,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Use ",(0,o.kt)("inlineCode",{parentName:"p"},"setAdjustUnspecified"),", to set ",(0,o.kt)("inlineCode",{parentName:"p"},"android:windowSoftInputMode")," attribute to ",(0,o.kt)("inlineCode",{parentName:"p"},"adjustUnspecified")," value."),(0,o.kt)("h3",{id:"example"},"Example"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ts"},'import { AvoidSoftInput } from "react-native-avoid-softinput";\n\nAvoidSoftInput.setAdjustUnspecified();\n')))}f.isMDXComponent=!0}}]);