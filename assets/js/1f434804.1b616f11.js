"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5749],{7030:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>l,contentTitle:()=>d,default:()=>p,frontMatter:()=>r,metadata:()=>a,toc:()=>c});var i=o(4848),t=o(8453),s=o(8363);const r={id:"installation",title:"Getting Started",sidebar_label:"Getting Started",slug:"/guides",keywords:["react-native-avoid-softinput","installation","setup","keyboard handling","troubleshooting"]},d=void 0,a={id:"guides/installation",title:"Getting Started",description:"1. Installation & Requirements",source:"@site/versioned_docs/version-7.0.x/guides/INSTALLATION.mdx",sourceDirName:"guides",slug:"/guides",permalink:"/react-native-avoid-softinput/docs/guides",draft:!1,unlisted:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/versioned_docs/version-7.0.x/guides/INSTALLATION.mdx",tags:[],version:"7.0.x",frontMatter:{id:"installation",title:"Getting Started",sidebar_label:"Getting Started",slug:"/guides",keywords:["react-native-avoid-softinput","installation","setup","keyboard handling","troubleshooting"]},sidebar:"docsSidebar",next:{title:"Migration from v6 to v7",permalink:"/react-native-avoid-softinput/docs/guides/migration_from_v6_to_v7"}},l={},c=[{value:"1. Installation &amp; Requirements",id:"1-installation--requirements",level:2},{value:"Expo",id:"expo",level:4},{value:"2. App&#39;s setup",id:"2-apps-setup",level:2},{value:"Setting Kotlin version",id:"setting-kotlin-version",level:3},{value:"Keyboard handling on Android",id:"keyboard-handling-on-android",level:3},{value:"Recommended setup",id:"recommended-setup",level:4},{value:"Modify your Android&#39;s project <code>AndroidManifest.xml</code>",id:"modify-your-androids-project-androidmanifestxml",level:5},{value:"Use <code>AvoidSoftInput.setShouldMimicIOSBehavior(true)</code> later on in your app&#39;s code",id:"use-avoidsoftinputsetshouldmimiciosbehaviortrue-later-on-in-your-apps-code",level:5},{value:"3. Define your use case",id:"3-define-your-use-case",level:2},{value:"Troubleshooting",id:"troubleshooting",level:2},{value:"Incorrect <code>kotlinVersion</code>",id:"incorrect-kotlinversion",level:3},{value:"Doubled padding on Android when form has many inputs, works as expected on iOS",id:"doubled-padding-on-android-when-form-has-many-inputs-works-as-expected-on-ios",level:3}];function h(e){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",h4:"h4",h5:"h5",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,t.R)(),...e.components},{Details:o}=n;return o||function(e,n){throw new Error("Expected "+(n?"component":"object")+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}("Details",!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h2,{id:"1-installation--requirements",children:"1. Installation & Requirements"}),"\n",(0,i.jsxs)(n.p,{children:["This library follows the React Native releases support policy.\nIt is supporting ",(0,i.jsx)(n.strong,{children:"the latest version"}),", and ",(0,i.jsx)(n.strong,{children:"the two previous minor series"}),'.\nYou may find it working correctly with some older React Native versions, but it\'ll be a "Use at your own risk" case.']}),"\n",(0,i.jsx)(n.p,{children:'This library supports "New Architecture".'}),"\n",(0,i.jsxs)(n.p,{children:["Library supports Android & iOS, for out-of-tree platforms, ",(0,i.jsx)(n.code,{children:"View"})," component is used as fallback."]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"Install library with your package manager:"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"yarn add react-native-avoid-softinput\n"})}),"\n",(0,i.jsx)(n.p,{children:"or"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"npm i --save react-native-avoid-softinput\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"(iOS-only) Install pods:"})}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"npx pod-install\n"})}),"\n",(0,i.jsx)(n.h4,{id:"expo",children:"Expo"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u2705 You can use this library with ",(0,i.jsx)(n.a,{href:"https://docs.expo.dev/development/introduction/",children:"Development Builds"}),". No config plugin is required."]}),"\n",(0,i.jsxs)(n.li,{children:['\u274c This library can\'t be used in the "Expo Go" app because it ',(0,i.jsx)(n.a,{href:"https://docs.expo.dev/workflow/customizing/",children:"requires custom native code"}),"."]}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"2-apps-setup",children:"2. App's setup"}),"\n",(0,i.jsx)(n.h3,{id:"setting-kotlin-version",children:"Setting Kotlin version"}),"\n",(0,i.jsx)(n.p,{children:"The library uses Kotlin language to implement Android part.\nDepending on the version of React Native or Expo SDK and 3rd party libraries that are used in your project, you might (or might not) need to explicitly specify the version of Kotlin used in the app."}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsxs)(n.strong,{children:["Expo project after ",(0,i.jsx)(n.a,{href:"https://docs.expo.dev/workflow/prebuild/",children:"prebuild"})," / bare RN project"]})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Go to ",(0,i.jsx)(n.code,{children:"<projectDir>/android/build.gradle"})," inside your android folder to specify your ",(0,i.jsx)(n.code,{children:"kotlinVersion"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-java",children:'buildscript {\n    ext {\n        kotlinVersion = "1.8.0"  // <-- add a version here for resolution, version can be newer depending on the React Native version used in the project\n    }\n}\n'})}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsxs)(n.strong,{children:["Expo project before ",(0,i.jsx)(n.a,{href:"https://docs.expo.dev/workflow/prebuild/",children:"prebuild"})," / Expo managed project"]})}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["Use ",(0,i.jsx)(n.code,{children:"expo-build-properties"})," plugin to modify ",(0,i.jsx)(n.code,{children:"kotlinVersion"})," value"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-sh",children:"npx expo install expo-build-properties\n"})}),"\n",(0,i.jsxs)(n.p,{children:["Add plugin inside of your ",(0,i.jsx)(n.code,{children:"app.json"})," or ",(0,i.jsx)(n.code,{children:"app.config.js"})]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-json",children:'{\n  "expo": {\n    "plugins": [\n      [\n        "expo-build-properties",\n        {\n          "android": {\n            "kotlinVersion": "1.8.0" // <-- add a version here for resolution, version can be newer depending on the Expo SDK version used in the project\n          }\n        }\n      ]\n    ]\n  }\n}\n'})}),"\n",(0,i.jsx)(n.h3,{id:"keyboard-handling-on-android",children:"Keyboard handling on Android"}),"\n",(0,i.jsxs)(n.p,{children:["To make the keyboard handled ",(0,i.jsx)(n.strong,{children:"only"})," by ",(0,i.jsx)(n.code,{children:"react-native-avoid-softinput"})," (and not by Android OS), you have to additionally make sure that default keyboard handling on Android is switched off (for iOS nothing to be done \ud83d\ude80)."]}),"\n",(0,i.jsx)(n.h4,{id:"recommended-setup",children:"Recommended setup"}),"\n",(0,i.jsxs)(n.p,{children:["To provide best possible support for Android 15, install ",(0,i.jsx)(n.a,{href:"https://github.com/zoontek/react-native-edge-to-edge",children:(0,i.jsx)(n.code,{children:"react-native-edge-to-edge"})})," and follow its setup after installation"]}),"\n",(0,i.jsxs)(o,{children:[(0,i.jsxs)("summary",{children:["\u26a0\ufe0f"," Legacy setup"]}),(0,i.jsxs)(n.p,{children:["To setup keyboard handling on Android without ",(0,i.jsx)(n.code,{children:"react-native-edge-to-edge"}),", do the following:"]}),(0,i.jsxs)(n.h5,{id:"modify-your-androids-project-androidmanifestxml",children:["Modify your Android's project ",(0,i.jsx)(n.code,{children:"AndroidManifest.xml"})]}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsxs)(n.strong,{children:["Expo project after ",(0,i.jsx)(n.a,{href:"https://docs.expo.dev/workflow/prebuild/",children:"prebuild"})," / bare RN project"]})}),"\n"]}),(0,i.jsxs)(n.p,{children:["Go to ",(0,i.jsx)(n.code,{children:"<projectDir>/android/app/src/main/AndroidManifest.xml"})," and search for ",(0,i.jsx)(n.a,{href:"https://developer.android.com/guide/topics/manifest/activity-element#wsoft",children:(0,i.jsx)(n.code,{children:"android:windowSoftInputMode"})})," attribute in the ",(0,i.jsx)(n.code,{children:"<activity>"})," element.\nTo make ",(0,i.jsx)(n.code,{children:"react-native-avoid-softinput"})," responsible for managing the available space when keyboard is popped up, that attribute needs to be set to ",(0,i.jsx)(n.code,{children:"adjustResize"})," (in a new RN project it should be the default)."]}),(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-xml",children:'<manifest xmlns:android="http://schemas.android.com/apk/res/android">\n\n    <uses-permission android:name="android.permission.INTERNET" />\n\n    <application\n      android:name=".MainApplication">\n      <activity\n        android:name=".MainActivity"\n// highlight-next-line\n        android:windowSoftInputMode="adjustResize"\n        android:launchMode="singleTask"\n        android:exported="true">\n        <intent-filter>\n            <action android:name="android.intent.action.MAIN" />\n            <category android:name="android.intent.category.LAUNCHER" />\n        </intent-filter>\n      </activity>\n    </application>\n\n</manifest>\n'})}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsxs)(n.strong,{children:["Expo project before ",(0,i.jsx)(n.a,{href:"https://docs.expo.dev/workflow/prebuild/",children:"prebuild"})," / Expo managed project"]})}),"\n"]}),(0,i.jsxs)(n.p,{children:["Go to Expo's ",(0,i.jsx)(n.code,{children:"app.json"}),"/",(0,i.jsx)(n.code,{children:"app.config.js"})," and modify ",(0,i.jsx)(n.a,{href:"https://docs.expo.dev/versions/latest/config/app/#softwarekeyboardlayoutmode",children:(0,i.jsx)(n.code,{children:"softwareKeyboardLayoutMode"})}),", so that it has ",(0,i.jsx)(n.code,{children:"resize"})," value (in a new Expo project it should be the default)."]}),(0,i.jsxs)(n.h5,{id:"use-avoidsoftinputsetshouldmimiciosbehaviortrue-later-on-in-your-apps-code",children:["Use ",(0,i.jsx)(n.code,{children:"AvoidSoftInput.setShouldMimicIOSBehavior(true)"})," later on in your app's code"]}),(0,i.jsxs)(n.p,{children:["Remember to call ",(0,i.jsx)(n.code,{children:"AvoidSoftInput.setShouldMimicIOSBehavior(true)"})," somewhere in the project's code (either in some root component, if you use the library globally or in specific screen, if you use the library only in some places)."]})]}),"\n",(0,i.jsx)(n.h2,{id:"3-define-your-use-case",children:"3. Define your use case"}),"\n",(0,i.jsx)("div",{style:{display:"flex",flexDirection:"column",alignSelf:"stretch",margin:20},children:(0,i.jsx)("img",{src:s.A,alt:"One does not simply handle the keyboard globally in the app with 99 different form layouts",width:"50%",style:{display:"flex",alignSelf:"center"}})}),"\n",(0,i.jsx)(n.p,{children:"There're many possible ways to implement a form with some text fields. Depending on the ideas of the UX team and the imagination of the client/product owner,\nyou may need to implement some complex layouts, that not only have to be accessible, but should behave in a consistent way when the interaction with text fields/keyboard takes place."}),"\n",(0,i.jsxs)(n.p,{children:["Creating some generic components (like KeyboardAvoidingView) that can magically wrap ",(0,i.jsx)(n.em,{children:"any"})," form layout in your app ",(0,i.jsx)(n.strong,{children:"is an anti-pattern"}),".\nEspecially, when there are many variables that may change the expected behavior like:"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"whether Android OS default keyboard handling is switched on or off"}),"\n",(0,i.jsx)(n.li,{children:"whether the form layout is in the scrollable container or not"}),"\n",(0,i.jsx)(n.li,{children:"are elements like modals/bottomsheets used and are these implemented in the JS layer or use some native primitives"}),"\n",(0,i.jsx)(n.li,{children:"how complex those inputs are, how many text fields there are"}),"\n",(0,i.jsx)(n.li,{children:"should some elements in the form be sticky"}),"\n",(0,i.jsx)(n.li,{children:"etc."}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"Instead, you should think how the keyboard interaction with the app should look, what elements should be visible when the keyboard pops up."}),"\n",(0,i.jsxs)(n.p,{children:["In a basic case where you have a fullscreen scrollable form without a need to have submit button always visible, you might use ",(0,i.jsx)(n.a,{href:"./guides/usage-module",children:(0,i.jsx)(n.code,{children:"AvoidSoftInput"})})," module which pushes the whole root view above the keyboard, or detects the nearest scrollable ancestor and tries to scroll to covered text field element."]}),"\n",(0,i.jsxs)(n.p,{children:["In a more advanced case where you have a form inside a modal layout with text field inside, you may use ",(0,i.jsx)(n.a,{href:"./guides/usage-view",children:(0,i.jsx)(n.code,{children:"AvoidSoftInputView"})})," component which pushes itself above the keyboard, or detects the nearest scrollable ancestor and tries to scroll to covered text field element."]}),"\n",(0,i.jsxs)(n.p,{children:["In other case you have a task to make a form footer with submit buttons always visible even when the keyboard slides in (effectively making that footer sticky).\nThen, you have to think how to make that footer separated from the rest of the text fields that are probably in some scrollable container.\nAt the end, you'll end up in a need to manually apply padding to the footer container.\nLuckily, you might try ",(0,i.jsx)(n.a,{href:"./api/hooks/use-soft-input-shown",children:(0,i.jsx)(n.code,{children:"useSoftInputShown"})}),", ",(0,i.jsx)(n.a,{href:"./api/hooks/use-soft-input-hidden",children:(0,i.jsx)(n.code,{children:"useSoftInputHidden"})})," & ",(0,i.jsx)(n.a,{href:"./api/hooks/use-soft-input-height-changed",children:(0,i.jsx)(n.code,{children:"useSoftInputHeightChanged"})})," hooks to detect when the keyboard is displayed and the height value it has."]}),"\n",(0,i.jsxs)(n.p,{children:["The point is, before blindly using the library, you should define what is the expected behavior and which tools you should use to achieve it.\nIf you don't know, which APIs from the library you should use for your use case, check ",(0,i.jsx)(n.a,{href:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/packages/mobile",children:"the example app"})," and try to play with available APIs."]}),"\n",(0,i.jsx)(n.h2,{id:"troubleshooting",children:"Troubleshooting"}),"\n",(0,i.jsxs)(n.h3,{id:"incorrect-kotlinversion",children:["Incorrect ",(0,i.jsx)(n.code,{children:"kotlinVersion"})]}),"\n",(0,i.jsxs)(n.p,{children:["For more context, check ",(0,i.jsx)(n.a,{href:"https://github.com/mateusz1913/react-native-avoid-softinput/issues/88",children:"GH issue 88"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["Sometimes when using this library you may find that your build fails due to incorrect ",(0,i.jsx)(n.code,{children:"kotlinVersion"})," in your native project.\nTo catch this you ",(0,i.jsx)(n.strong,{children:"need"})," to follow ",(0,i.jsx)(n.a,{href:"#setting-kotlin-version",children:"Setting Kotlin version"})," section."]}),"\n",(0,i.jsx)(n.h3,{id:"doubled-padding-on-android-when-form-has-many-inputs-works-as-expected-on-ios",children:"Doubled padding on Android when form has many inputs, works as expected on iOS"}),"\n",(0,i.jsxs)(n.p,{children:["For more context, check ",(0,i.jsx)(n.a,{href:"https://github.com/mateusz1913/react-native-avoid-softinput/issues/155",children:"GH issue 155"}),"."]}),"\n",(0,i.jsxs)(n.p,{children:["The problem may appear if you didn't follow ",(0,i.jsx)(n.a,{href:"#keyboard-handling-on-android",children:"Keyboard handling on Android"})," section and you have e.g. ",(0,i.jsxs)(n.a,{href:"https://developer.android.com/guide/topics/manifest/activity-element#wsoft",children:[(0,i.jsx)(n.code,{children:"adjustPan"})," behavior"]})," set for your app."]}),"\n",(0,i.jsx)(n.p,{children:"To fix it, follow the section to disable default keyboard handling on Android."}),"\n",(0,i.jsxs)(n.p,{children:["If, for some reason, you need to keep ",(0,i.jsx)(n.code,{children:"adjustPan"})," behavior for other parts of the app (where library does not need to handle the keyboard), you might check ",(0,i.jsx)(n.a,{href:"./api/module/set-adjust-pan",children:(0,i.jsx)(n.code,{children:"AvoidSoftInput.setAdjust(Pan|Resize|Nothing|Unspecified)"})})," functions."]})]})}function p(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(h,{...e})}):h(e)}},8363:(e,n,o)=>{o.d(n,{A:()=>i});const i=o.p+"assets/images/OneDoesNotSimplyKeyboard-60a4eab5e374b703c95f3427dca34c91.jpg"},8453:(e,n,o)=>{o.d(n,{R:()=>r,x:()=>d});var i=o(6540);const t={},s=i.createContext(t);function r(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:r(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);