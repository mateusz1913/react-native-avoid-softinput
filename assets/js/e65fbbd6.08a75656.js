"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[4932],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=r.createContext({}),u=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=u(e.components);return r.createElement(s.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=u(n),f=o,m=d["".concat(s,".").concat(f)]||d[f]||c[f]||i;return n?r.createElement(m,a(a({ref:t},p),{},{components:n})):r.createElement(m,a({ref:t},p))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,a[1]=l;for(var u=2;u<i;u++)a[u]=n[u];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},116:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return a},default:function(){return c},frontMatter:function(){return i},metadata:function(){return l},toc:function(){return u}});var r=n(3117),o=(n(7294),n(3905));const i={id:"installation",title:"Getting Started",sidebar_label:"Installation",slug:"/guides"},a=void 0,l={unversionedId:"guides/installation",id:"version-3.0.x/guides/installation",title:"Getting Started",description:"Installation & Requirements",source:"@site/versioned_docs/version-3.0.x/guides/INSTALLATION.mdx",sourceDirName:"guides",slug:"/guides",permalink:"/react-native-avoid-softinput/docs/guides",draft:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/versioned_docs/version-3.0.x/guides/INSTALLATION.mdx",tags:[],version:"3.0.x",frontMatter:{id:"installation",title:"Getting Started",sidebar_label:"Installation",slug:"/guides"},sidebar:"docsSidebar",next:{title:"Migration to 3.0.x",permalink:"/react-native-avoid-softinput/docs/guides/migration_to_3_0_x"}},s={},u=[{value:"Installation &amp; Requirements",id:"installation--requirements",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2}],p={toc:u};function c(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"installation--requirements"},"Installation & Requirements"),(0,o.kt)("p",null,"Version 3.x.x supports React Native 0.65+ (old architecture) and has support for Android API 21+ and iOS 11.0+. It also supports Fabric & TurboModules (new architecture) with React Native 0.70+."),(0,o.kt)("p",null,"Library supports Android & iOS, for out-of-tree platforms, ",(0,o.kt)("inlineCode",{parentName:"p"},"View")," component is used as fallback."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Install library with your package manager:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"yarn add react-native-avoid-softinput\n")),(0,o.kt)("p",null,"or"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"npm i --save react-native-avoid-softinput\n")),(0,o.kt)("ol",{start:2},(0,o.kt)("li",{parentName:"ol"},"(iOS-only) Install pods:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"npx pod-install\n")),(0,o.kt)("ol",{start:3},(0,o.kt)("li",{parentName:"ol"},"(iOS-only) Create and configure bridging header in your iOS project, if it doesn't exist (the easiest way is to create empty .swift file in XCode)")),(0,o.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,o.kt)("p",null,"Sometimes when using this library you may find that your build fails due to incorrect ",(0,o.kt)("inlineCode",{parentName:"p"},"kotlinVersion")," in your native project. To catch this you can do this depending on your configuration:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"React Native project and Expo bare workflow"))),(0,o.kt)("p",null,"you could modify ",(0,o.kt)("inlineCode",{parentName:"p"},"android/build.gradle")," inside your android folder to specify your ",(0,o.kt)("inlineCode",{parentName:"p"},"kotlinVersion")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java"},'buildscript {\n    ext {\n        kotlinVersion = "1.6.10"  // <-- add a version here for resolution\n    }\n}\n')),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Expo managed workflow"))),(0,o.kt)("p",null,"Install ",(0,o.kt)("inlineCode",{parentName:"p"},"expo-build-properties")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-sh"},"npx expo install expo-build-properties\n")),(0,o.kt)("p",null,"Add plugin inside of your app.json or app.config.js"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "expo": {\n    "plugins": [\n      [\n        "expo-build-properties",\n        {\n          "android": {\n            "kotlinVersion": "1.6.10"\n          }\n        }\n      ]\n    ]\n  }\n}\n')))}c.isMDXComponent=!0}}]);