"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8231],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),l=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=l(e.components);return r.createElement(c.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,c=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=l(n),m=o,f=p["".concat(c,".").concat(m)]||p[m]||d[m]||i;return n?r.createElement(f,a(a({ref:t},u),{},{components:n})):r.createElement(f,a({ref:t},u))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,a=new Array(i);a[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s[p]="string"==typeof e?e:o,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return r.createElement.apply(null,a)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9264:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>a,default:()=>p,frontMatter:()=>i,metadata:()=>s,toc:()=>l});var r=n(7462),o=(n(7294),n(3905));const i={id:"jest-mock-usage",title:"Jest mock usage",sidebar_label:"Jest mock usage",keywords:["react-native-avoid-softinput","Jest","mock","testing"]},a=void 0,s={unversionedId:"guides/jest-mock-usage",id:"guides/jest-mock-usage",title:"Jest mock usage",description:"To make testing with Jest easier, library provides mocked implementation that can be integrated in two ways:",source:"@site/docs/guides/JEST_MOCK_USAGE.mdx",sourceDirName:"guides",slug:"/guides/jest-mock-usage",permalink:"/react-native-avoid-softinput/docs/next/guides/jest-mock-usage",draft:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/docs/guides/JEST_MOCK_USAGE.mdx",tags:[],version:"current",frontMatter:{id:"jest-mock-usage",title:"Jest mock usage",sidebar_label:"Jest mock usage",keywords:["react-native-avoid-softinput","Jest","mock","testing"]},sidebar:"docsSidebar",previous:{title:"Usage - view",permalink:"/react-native-avoid-softinput/docs/next/guides/usage-view"},next:{title:"Alternatives",permalink:"/react-native-avoid-softinput/docs/next/guides/alternatives"}},c={},l=[{value:"Using mock in <code>__mocks__</code> directory",id:"using-mock-in-__mocks__-directory",level:3},{value:"Using mock in Jest setup file",id:"using-mock-in-jest-setup-file",level:3}],u={toc:l};function p(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"To make testing with Jest easier, library provides mocked implementation that can be integrated in two ways:"),(0,o.kt)("h3",{id:"using-mock-in-__mocks__-directory"},"Using mock in ",(0,o.kt)("inlineCode",{parentName:"h3"},"__mocks__")," directory"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create ",(0,o.kt)("inlineCode",{parentName:"li"},"__mocks__/react-native-avoid-softinput")," file."),(0,o.kt)("li",{parentName:"ol"},"Inside created file paste following lines:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"const mock = require('react-native-avoid-softinput/jest/mock');\n\n/**\n * If needed, override mock like so:\n *\n * module.exports = Object.assign(mock, { useSoftInputState: jest.fn(() => ({ isSoftInputShown: true, softInputHeight: 300 })) });\n */\n\nmodule.exports = mock;\n")),(0,o.kt)("h3",{id:"using-mock-in-jest-setup-file"},"Using mock in Jest setup file"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Create Jest setup file, unless there is already one, and link it in ",(0,o.kt)("a",{parentName:"li",href:"https://jestjs.io/docs/configuration#setupfiles-array"},"jest config")),(0,o.kt)("li",{parentName:"ol"},"Inside Jest setup file add following lines:")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-js"},"jest.mock('react-native-avoid-softinput', () => {\n  const mock = require('react-native-avoid-softinput/jest/mock');\n\n  /**\n   * If needed, override mock like so:\n   *\n   * return Object.assign(mock, { useSoftInputState: jest.fn(() => ({ isSoftInputShown: true, softInputHeight: 300 })) });\n   */\n\n  return mock;\n});\n")))}p.isMDXComponent=!0}}]);