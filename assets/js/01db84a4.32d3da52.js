"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[249],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var o=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,o,i=function(e,t){if(null==e)return{};var n,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var l=o.createContext({}),d=function(e){var t=o.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},u=function(e){var t=d(e.components);return o.createElement(l.Provider,{value:t},e.children)},p="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},m=o.forwardRef((function(e,t){var n=e.components,i=e.mdxType,r=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),p=d(n),m=i,f=p["".concat(l,".").concat(m)]||p[m]||c[m]||r;return n?o.createElement(f,a(a({ref:t},u),{},{components:n})):o.createElement(f,a({ref:t},u))}));function f(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var r=n.length,a=new Array(r);a[0]=m;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[p]="string"==typeof e?e:i,a[1]=s;for(var d=2;d<r;d++)a[d]=n[d];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9064:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>p,frontMatter:()=>r,metadata:()=>s,toc:()=>d});var o=n(7462),i=(n(7294),n(3905));const r={id:"migration_to_3_0_x",title:"Migration to 3.0.x",sidebar_label:"Migration to 3.0.x",keywords:["react-native-avoid-softinput","migration"]},a=void 0,s={unversionedId:"guides/migration_to_3_0_x",id:"version-3.0.x/guides/migration_to_3_0_x",title:"Migration to 3.0.x",description:"WindowInsetsCompat API (BREAKING CHANGE)",source:"@site/versioned_docs/version-3.0.x/guides/MIGRATION_TO_3_0_x.mdx",sourceDirName:"guides",slug:"/guides/migration_to_3_0_x",permalink:"/react-native-avoid-softinput/docs/3.0.x/guides/migration_to_3_0_x",draft:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/versioned_docs/version-3.0.x/guides/MIGRATION_TO_3_0_x.mdx",tags:[],version:"3.0.x",frontMatter:{id:"migration_to_3_0_x",title:"Migration to 3.0.x",sidebar_label:"Migration to 3.0.x",keywords:["react-native-avoid-softinput","migration"]},sidebar:"docsSidebar",previous:{title:"Getting Started",permalink:"/react-native-avoid-softinput/docs/3.0.x/guides"},next:{title:"Usage - module",permalink:"/react-native-avoid-softinput/docs/3.0.x/guides/usage-module"}},l={},d=[{value:"WindowInsetsCompat API (BREAKING CHANGE)",id:"windowinsetscompat-api-breaking-change",level:2},{value:"Example",id:"example",level:4},{value:"Support for Fabric &amp; TurboModules",id:"support-for-fabric--turbomodules",level:2},{value:"Bumping minimal supported React Native and iOS versions (BREAKING CHANGE)",id:"bumping-minimal-supported-react-native-and-ios-versions-breaking-change",level:2}],u={toc:d};function p(e){let{components:t,...n}=e;return(0,i.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("h2",{id:"windowinsetscompat-api-breaking-change"},"WindowInsetsCompat API (BREAKING CHANGE)"),(0,i.kt)("p",null,"With version 3.0.x Android implementation starts using ",(0,i.kt)("a",{parentName:"p",href:"https://developer.android.com/reference/androidx/core/view/WindowInsetsCompat"},"WindowInsetsCompat")," API. This made library's Android implementation more predictible and less hacky."),(0,i.kt)("p",null,"As a consequence with version 3.0.x library to handle padding/translation on Android needs to call new method ",(0,i.kt)("inlineCode",{parentName:"p"},"setShouldMimicIOSBehavior")," instead of ",(0,i.kt)("inlineCode",{parentName:"p"},"setAdjustNothing")),(0,i.kt)("p",null,"If you upgrade to version 3.0.x (and you don't use ",(0,i.kt)("inlineCode",{parentName:"p"},"setAdjustNothing")," or ",(0,i.kt)("inlineCode",{parentName:"p"},"setDefaultAppSoftInputMode")," intentionally to handle sth else then library's correct usage on Android), just replace all ",(0,i.kt)("inlineCode",{parentName:"p"},"setAdjustNothing")," (and ",(0,i.kt)("inlineCode",{parentName:"p"},"setDefaultAppSoftInputMode"),") calls with ",(0,i.kt)("inlineCode",{parentName:"p"},"setShouldMimicIOSBehavior(<boolean-value>)"),"."),(0,i.kt)("h4",{id:"example"},"Example"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-diff"},"  /**\n   * If module in your app is always enabled,\n   * just change `setAdjustNothing` with `setShouldMimicIOSBehavior(true)`\n   */\n  useEffect(() => {\n-    AvoidSoftInput.setAdjustNothing(); // <---- Set windowSoftInputMode on Android to match iOS behavior\n+    AvoidSoftInput.setShouldMimicIOSBehavior(true); // <---- Tell Android that library will handle keyboard insets manually to match iOS behavior\n    AvoidSoftInput.setEnabled(true); // <---- Enable module\n  }, []);\n\n  /**\n   * If you used module only in specific screen with react-navigation,\n   * change `setAdjustNothing` with `setShouldMimicIOSBehavior(true)`\n   * and replace `setDefaultAppSoftInputMode` with `setShouldMimicIOSBehavior(false)`\n   */\n  const onFocusEffect = useCallback(() => {\n-    AvoidSoftInput.setAdjustNothing(); // <---- Set windowSoftInputMode on Android to match iOS behavior\n+    AvoidSoftInput.setShouldMimicIOSBehavior(true); // <---- Tell Android that library will handle keyboard insets manually to match iOS behavior\n    AvoidSoftInput.setEnabled(true); // <---- Enable module\n    return () => {\n      AvoidSoftInput.setEnabled(false);\n-      AvoidSoftInput.setDefaultAppSoftInputMode();\n+      AvoidSoftInput.setShouldMimicIOSBehavior(false);\n    };\n  }, []);\n\n  useFocusEffect(onFocusEffect);\n")),(0,i.kt)("h2",{id:"support-for-fabric--turbomodules"},"Support for Fabric & TurboModules"),(0,i.kt)("p",null,"From version 3.0.x library supports RN's new architecture in projects with RN version >= 0.70. Autolinking of Fabric & TurboModule library version is handled automatically with projects using ",(0,i.kt)("inlineCode",{parentName:"p"},"@react-native-community/cli")," version >= 9.0.0 (",(0,i.kt)("a",{parentName:"p",href:"https://github.com/react-native-community/cli/commit/86df104250608977130378b9b59d8a9e12d0212a"},"support was implemented with this commit"),")"),(0,i.kt)("h2",{id:"bumping-minimal-supported-react-native-and-ios-versions-breaking-change"},"Bumping minimal supported React Native and iOS versions (BREAKING CHANGE)"),(0,i.kt)("p",null,"As a result of introducing support for Fabric & TurboModules library bumped its minimal supported RN version (on old architecture) to 0.65 and minimal supported iOS version to 11.0."),(0,i.kt)("p",null,"If you use library on older project (RN version <= 0.64), you have to upgrade RN to version >= 0.65 or you can stay at 2.x.x, however be aware that it won't be developed (only critical bugs will be handled)."))}p.isMDXComponent=!0}}]);