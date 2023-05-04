"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[591],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>m});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),d=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=d(e.components);return o.createElement(s.Provider,{value:t},e.children)},u="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=d(n),h=a,m=u["".concat(s,".").concat(h)]||u[h]||c[h]||i;return n?o.createElement(m,r(r({ref:t},p),{},{components:n})):o.createElement(m,r({ref:t},p))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,r=new Array(i);r[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[u]="string"==typeof e?e:a,r[1]=l;for(var d=2;d<i;d++)r[d]=n[d];return o.createElement.apply(null,r)}return o.createElement.apply(null,n)}h.displayName="MDXCreateElement"},7561:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>d,contentTitle:()=>l,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var o=n(7462),a=(n(7294),n(3905)),i=n(7745);const r={id:"installation",title:"Getting Started",sidebar_label:"Getting Started",slug:"/guides",keywords:["react-native-avoid-softinput","installation","setup","keyboard handling","troubleshooting"]},l=void 0,s={unversionedId:"guides/installation",id:"guides/installation",title:"Getting Started",description:"1. Installation & Requirements",source:"@site/docs/guides/INSTALLATION.mdx",sourceDirName:"guides",slug:"/guides",permalink:"/react-native-avoid-softinput/docs/next/guides",draft:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/docs/guides/INSTALLATION.mdx",tags:[],version:"current",frontMatter:{id:"installation",title:"Getting Started",sidebar_label:"Getting Started",slug:"/guides",keywords:["react-native-avoid-softinput","installation","setup","keyboard handling","troubleshooting"]},sidebar:"docsSidebar",next:{title:"Migration to 3.0.x",permalink:"/react-native-avoid-softinput/docs/next/guides/migration_to_3_0_x"}},d={},p=[{value:"1. Installation &amp; Requirements",id:"1-installation--requirements",level:2},{value:"Expo",id:"expo",level:4},{value:"2. App&#39;s setup",id:"2-apps-setup",level:2},{value:"Setting Kotlin version",id:"setting-kotlin-version",level:3},{value:"Keyboard handling on Android",id:"keyboard-handling-on-android",level:3},{value:"Modify your Android&#39;s project <code>AndroidManifest.xml</code>",id:"modify-your-androids-project-androidmanifestxml",level:4},{value:"Use <code>AvoidSoftInput.setShouldMimicIOSBehavior(true)</code> later on in your app&#39;s code",id:"use-avoidsoftinputsetshouldmimiciosbehaviortrue-later-on-in-your-apps-code",level:4},{value:"3. Define your use case",id:"3-define-your-use-case",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Incorrect <code>kotlinVersion</code>",id:"incorrect-kotlinversion",level:3},{value:"Doubled padding on Android when form has many inputs, works as expected on iOS",id:"doubled-padding-on-android-when-form-has-many-inputs-works-as-expected-on-ios",level:3}],u={toc:p};function c(e){let{components:t,...n}=e;return(0,a.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"1-installation--requirements"},"1. Installation & Requirements"),(0,a.kt)("p",null,"Version 3.x.x supports React Native 0.65+ (old architecture) and has support for Android API 21+ and iOS 11.0+. It also supports Fabric & TurboModules (new architecture) with React Native 0.70+."),(0,a.kt)("p",null,"Library supports Android & iOS, for out-of-tree platforms, ",(0,a.kt)("inlineCode",{parentName:"p"},"View")," component is used as fallback."),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"Install library with your package manager:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"yarn add react-native-avoid-softinput\n")),(0,a.kt)("p",null,"or"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"npm i --save react-native-avoid-softinput\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"(iOS-only) Install pods:")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"npx pod-install\n")),(0,a.kt)("p",null,(0,a.kt)("strong",{parentName:"p"},"(iOS-only) Create and configure bridging header")),(0,a.kt)("p",null,"Create and configure bridging header in your iOS project, if it doesn't exist (the easiest way is to create empty .swift file in XCode) - for reference, check out ",(0,a.kt)("a",{parentName:"p",href:"https://developer.apple.com/documentation/swift/importing-objective-c-into-swift"},"Apple's dedicated docs section"),"."),(0,a.kt)("h4",{id:"expo"},"Expo"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"\u2705 You can use this library with ",(0,a.kt)("a",{parentName:"li",href:"https://docs.expo.dev/development/introduction/"},"Development Builds"),". No config plugin is required."),(0,a.kt)("li",{parentName:"ul"},'\u274c This library can\'t be used in the "Expo Go" app because it ',(0,a.kt)("a",{parentName:"li",href:"https://docs.expo.dev/workflow/customizing/"},"requires custom native code"),".")),(0,a.kt)("h2",{id:"2-apps-setup"},"2. App's setup"),(0,a.kt)("h3",{id:"setting-kotlin-version"},"Setting Kotlin version"),(0,a.kt)("p",null,"The library uses Kotlin language to implement Android part.\nDepending on the version of React Native or Expo SDK and 3rd party libraries that are used in your project, you might (or might not) need to explicitly specify the version of Kotlin used in the app."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Expo project after ",(0,a.kt)("a",{parentName:"strong",href:"https://docs.expo.dev/workflow/prebuild/"},"prebuild")," / bare RN project"))),(0,a.kt)("p",null,"Go to ",(0,a.kt)("inlineCode",{parentName:"p"},"<projectDir>/android/build.gradle")," inside your android folder to specify your ",(0,a.kt)("inlineCode",{parentName:"p"},"kotlinVersion")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},'buildscript {\n    ext {\n        kotlinVersion = "1.6.10"  // <-- add a version here for resolution, version can be newer depending on the React Native version used in the project\n    }\n}\n')),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Expo project before ",(0,a.kt)("a",{parentName:"strong",href:"https://docs.expo.dev/workflow/prebuild/"},"prebuild")," / Expo managed project"))),(0,a.kt)("p",null,"Use ",(0,a.kt)("inlineCode",{parentName:"p"},"expo-build-properties")," plugin to modify ",(0,a.kt)("inlineCode",{parentName:"p"},"kotlinVersion")," value"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"npx expo install expo-build-properties\n")),(0,a.kt)("p",null,"Add plugin inside of your ",(0,a.kt)("inlineCode",{parentName:"p"},"app.json")," or ",(0,a.kt)("inlineCode",{parentName:"p"},"app.config.js")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "expo": {\n    "plugins": [\n      [\n        "expo-build-properties",\n        {\n          "android": {\n            "kotlinVersion": "1.6.10" // <-- add a version here for resolution, version can be newer depending on the Expo SDK version used in the project\n          }\n        }\n      ]\n    ]\n  }\n}\n')),(0,a.kt)("h3",{id:"keyboard-handling-on-android"},"Keyboard handling on Android"),(0,a.kt)("p",null,"To make the keyboard handled ",(0,a.kt)("strong",{parentName:"p"},"only")," by ",(0,a.kt)("inlineCode",{parentName:"p"},"react-native-avoid-softinput")," (and not by Android OS), you have to additionally make sure that default keyboard handling on Android is switched off (for iOS nothing to be done \ud83d\ude80).\nTo do that, you need to make 2 steps:"),(0,a.kt)("h4",{id:"modify-your-androids-project-androidmanifestxml"},"Modify your Android's project ",(0,a.kt)("inlineCode",{parentName:"h4"},"AndroidManifest.xml")),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Expo project after ",(0,a.kt)("a",{parentName:"strong",href:"https://docs.expo.dev/workflow/prebuild/"},"prebuild")," / bare RN project"))),(0,a.kt)("p",null,"Go to ",(0,a.kt)("inlineCode",{parentName:"p"},"<projectDir>/android/app/src/main/AndroidManifest.xml")," and search for ",(0,a.kt)("a",{parentName:"p",href:"https://developer.android.com/guide/topics/manifest/activity-element#wsoft"},(0,a.kt)("inlineCode",{parentName:"a"},"android:windowSoftInputMode"))," attribute in the ",(0,a.kt)("inlineCode",{parentName:"p"},"<activity>")," element.\nTo make ",(0,a.kt)("inlineCode",{parentName:"p"},"react-native-avoid-softinput")," responsible for managing the available space when keyboard is popped up, that attribute needs to be set to ",(0,a.kt)("inlineCode",{parentName:"p"},"adjustResize")," (in a new RN project it should be the default)."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-xml"},'<manifest xmlns:android="http://schemas.android.com/apk/res/android">\n\n    <uses-permission android:name="android.permission.INTERNET" />\n\n    <application\n      android:name=".MainApplication">\n      <activity\n        android:name=".MainActivity"\n// highlight-next-line\n        android:windowSoftInputMode="adjustResize"\n        android:launchMode="singleTask"\n        android:exported="true">\n        <intent-filter>\n            <action android:name="android.intent.action.MAIN" />\n            <category android:name="android.intent.category.LAUNCHER" />\n        </intent-filter>\n      </activity>\n    </application>\n\n</manifest>\n')),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("strong",{parentName:"li"},"Expo project before ",(0,a.kt)("a",{parentName:"strong",href:"https://docs.expo.dev/workflow/prebuild/"},"prebuild")," / Expo managed project"))),(0,a.kt)("p",null,"Go to Expo's ",(0,a.kt)("inlineCode",{parentName:"p"},"app.json"),"/",(0,a.kt)("inlineCode",{parentName:"p"},"app.config.js")," and modify ",(0,a.kt)("a",{parentName:"p",href:"https://docs.expo.dev/versions/latest/config/app/#softwarekeyboardlayoutmode"},(0,a.kt)("inlineCode",{parentName:"a"},"softwareKeyboardLayoutMode")),", so that it has ",(0,a.kt)("inlineCode",{parentName:"p"},"resize")," value (in a new Expo project it should be the default)."),(0,a.kt)("h4",{id:"use-avoidsoftinputsetshouldmimiciosbehaviortrue-later-on-in-your-apps-code"},"Use ",(0,a.kt)("inlineCode",{parentName:"h4"},"AvoidSoftInput.setShouldMimicIOSBehavior(true)")," later on in your app's code"),(0,a.kt)("p",null,"Remember to call ",(0,a.kt)("inlineCode",{parentName:"p"},"AvoidSoftInput.setShouldMimicIOSBehavior(true)")," somewhere in the project's code (either in some root component, if you use the library globally or in specific screen, if you use the library only in some places)."),(0,a.kt)("h2",{id:"3-define-your-use-case"},"3. Define your use case"),(0,a.kt)("div",{style:{display:"flex",flexDirection:"column",alignSelf:"stretch",margin:20}},(0,a.kt)("img",{src:i.Z,alt:"One does not simply handle the keyboard globally in the app with 99 different form layouts",width:"50%",style:{display:"flex",alignSelf:"center"}})),(0,a.kt)("p",null,"There're many possible ways to implement a form with some text fields. Depending on the ideas of the UX team and the imagination of the client/product owner,\nyou may need to implement some complex layouts, that not only have to be accessible, but should behave in a consistent way when the interaction with text fields/keyboard takes place."),(0,a.kt)("p",null,"Creating some generic components (like KeyboardAvoidingView) that can magically wrap ",(0,a.kt)("em",{parentName:"p"},"any")," form layout in your app ",(0,a.kt)("strong",{parentName:"p"},"is an anti-pattern"),".\nEspecially, when there are many variables that may change the expected behavior like:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"whether Android OS default keyboard handling is switched on or off"),(0,a.kt)("li",{parentName:"ul"},"whether the form layout is in the scrollable container or not"),(0,a.kt)("li",{parentName:"ul"},"are elements like modals/bottomsheets used and are these implemented in the JS layer or use some native primitives"),(0,a.kt)("li",{parentName:"ul"},"how complex those inputs are, how many text fields there are"),(0,a.kt)("li",{parentName:"ul"},"should some elements in the form be sticky"),(0,a.kt)("li",{parentName:"ul"},"etc.")),(0,a.kt)("p",null,"Instead, you should think how the keyboard interaction with the app should look, what elements should be visible when the keyboard pops up."),(0,a.kt)("p",null,"In a basic case where you have a fullscreen scrollable form without a need to have submit button always visible, you might use ",(0,a.kt)("a",{parentName:"p",href:"./guides/usage-module"},(0,a.kt)("inlineCode",{parentName:"a"},"AvoidSoftInput"))," module which pushes the whole root view above the keyboard, or detects the nearest scrollable ancestor and tries to scroll to covered text field element."),(0,a.kt)("p",null,"In a more advanced case where you have a form inside a modal layout with text field inside, you may use ",(0,a.kt)("a",{parentName:"p",href:"./guides/usage-view"},(0,a.kt)("inlineCode",{parentName:"a"},"AvoidSoftInputView"))," component which pushes itself above the keyboard, or detects the nearest scrollable ancestor and tries to scroll to covered text field element."),(0,a.kt)("p",null,"In other case you have a task to make a form footer with submit buttons always visible even when the keyboard slides in (effectively making that footer sticky).\nThen, you have to think how to make that footer separated from the rest of the text fields that are probably in some scrollable container.\nAt the end, you'll end up in a need to manually apply padding to the footer container.\nLuckily, you might try ",(0,a.kt)("a",{parentName:"p",href:"./api/hooks/use-soft-input-shown"},(0,a.kt)("inlineCode",{parentName:"a"},"useSoftInputShown")),", ",(0,a.kt)("a",{parentName:"p",href:"./api/hooks/use-soft-input-hidden"},(0,a.kt)("inlineCode",{parentName:"a"},"useSoftInputHidden"))," & ",(0,a.kt)("a",{parentName:"p",href:"./api/hooks/use-soft-input-height-changed"},(0,a.kt)("inlineCode",{parentName:"a"},"useSoftInputHeightChanged"))," hooks to detect when the keyboard is displayed and the height value it has."),(0,a.kt)("p",null,"The point is, before blindly using the library, you should define what is the expected behavior and which tools you should use to achieve it.\nIf you don't know, which APIs from the library you should use for your use case, check ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/packages/mobile"},"the example app")," and try to play with available APIs."),(0,a.kt)("h2",{id:"troubleshooting"},"Troubleshooting"),(0,a.kt)("h3",{id:"incorrect-kotlinversion"},"Incorrect ",(0,a.kt)("inlineCode",{parentName:"h3"},"kotlinVersion")),(0,a.kt)("p",null,"For more context, check ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/mateusz1913/react-native-avoid-softinput/issues/88"},"GH issue 88"),"."),(0,a.kt)("p",null,"Sometimes when using this library you may find that your build fails due to incorrect ",(0,a.kt)("inlineCode",{parentName:"p"},"kotlinVersion")," in your native project.\nTo catch this you ",(0,a.kt)("strong",{parentName:"p"},"need")," to follow ",(0,a.kt)("a",{parentName:"p",href:"#setting-kotlin-version"},"Setting Kotlin version")," section."),(0,a.kt)("h3",{id:"doubled-padding-on-android-when-form-has-many-inputs-works-as-expected-on-ios"},"Doubled padding on Android when form has many inputs, works as expected on iOS"),(0,a.kt)("p",null,"For more context, check ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/mateusz1913/react-native-avoid-softinput/issues/155"},"GH issue 155"),"."),(0,a.kt)("p",null,"The problem may appear if you didn't follow ",(0,a.kt)("a",{parentName:"p",href:"#keyboard-handling-on-android"},"Keyboard handling on Android")," section and you have e.g. ",(0,a.kt)("a",{parentName:"p",href:"https://developer.android.com/guide/topics/manifest/activity-element#wsoft"},(0,a.kt)("inlineCode",{parentName:"a"},"adjustPan")," behavior")," set for your app."),(0,a.kt)("p",null,"To fix it, follow the section to disable default keyboard handling on Android."),(0,a.kt)("p",null,"If, for some reason, you need to keep ",(0,a.kt)("inlineCode",{parentName:"p"},"adjustPan")," behavior for other parts of the app (where library does not need to handle the keyboard), you might check ",(0,a.kt)("a",{parentName:"p",href:"./api/module/set-adjust-pan"},(0,a.kt)("inlineCode",{parentName:"a"},"AvoidSoftInput.setAdjust(Pan|Resize|Nothing|Unspecified)"))," functions."))}c.isMDXComponent=!0},7745:(e,t,n)=>{n.d(t,{Z:()=>o});const o=n.p+"assets/images/OneDoesNotSimplyKeyboard-60a4eab5e374b703c95f3427dca34c91.jpg"}}]);