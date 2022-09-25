"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[5357],{3905:function(e,n,t){t.d(n,{Zo:function(){return p},kt:function(){return d}});var o=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function a(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n){if(null==e)return{};var t,o,i=function(e,n){if(null==e)return{};var t,o,i={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=o.createContext({}),s=function(e){var n=o.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):a(a({},n),e)),t},p=function(e){var n=s(e.components);return o.createElement(c.Provider,{value:n},e.children)},l={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},f=o.forwardRef((function(e,n){var t=e.components,i=e.mdxType,r=e.originalType,c=e.parentName,p=u(e,["components","mdxType","originalType","parentName"]),f=s(t),d=i,m=f["".concat(c,".").concat(d)]||f[d]||l[d]||r;return t?o.createElement(m,a(a({ref:n},p),{},{components:t})):o.createElement(m,a({ref:n},p))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var r=t.length,a=new Array(r);a[0]=f;var u={};for(var c in n)hasOwnProperty.call(n,c)&&(u[c]=n[c]);u.originalType=e,u.mdxType="string"==typeof e?e:i,a[1]=u;for(var s=2;s<r;s++)a[s]=t[s];return o.createElement.apply(null,a)}return o.createElement.apply(null,t)}f.displayName="MDXCreateElement"},3702:function(e,n,t){t.r(n),t.d(n,{assets:function(){return c},contentTitle:function(){return a},default:function(){return l},frontMatter:function(){return r},metadata:function(){return u},toc:function(){return s}});var o=t(3117),i=(t(7294),t(3905));const r={id:"recipes-custom-config",title:"Custom config recipe",sidebar_label:"Custom config"},a=void 0,u={unversionedId:"recipes/recipes-custom-config",id:"version-2.0.x/recipes/recipes-custom-config",title:"Custom config recipe",description:"Applied offset animation can be configured both when using AvoidSoftInput module and AvoidSoftInputView component.",source:"@site/versioned_docs/version-2.0.x/recipes/CUSTOM_CONFIG.mdx",sourceDirName:"recipes",slug:"/recipes/recipes-custom-config",permalink:"/react-native-avoid-softinput/docs/2.0.x/recipes/recipes-custom-config",draft:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/versioned_docs/version-2.0.x/recipes/CUSTOM_CONFIG.mdx",tags:[],version:"2.0.x",frontMatter:{id:"recipes-custom-config",title:"Custom config recipe",sidebar_label:"Custom config"},sidebar:"docsSidebar",previous:{title:"Animations",permalink:"/react-native-avoid-softinput/docs/2.0.x/recipes/recipes-animations"},next:{title:"setEnabled",permalink:"/react-native-avoid-softinput/docs/2.0.x/api/module/set-enabled"}},c={},s=[{value:"Example - module",id:"example---module",level:3},{value:"Example - view",id:"example---view",level:3}],p={toc:s};function l(e){let{components:n,...t}=e;return(0,i.kt)("wrapper",(0,o.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Applied offset animation can be configured both when using ",(0,i.kt)("inlineCode",{parentName:"p"},"AvoidSoftInput")," module and ",(0,i.kt)("inlineCode",{parentName:"p"},"AvoidSoftInputView")," component."),(0,i.kt)("h3",{id:"example---module"},"Example - module"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-tsx"},'export const CustomAnimationConfigModuleExample: React.FC = () => {\n  const onFocusEffect = useCallback(() => {\n    AvoidSoftInput.setAdjustNothing();\n    AvoidSoftInput.setEnabled(true);\n\n    /** Customize animation delay, duration & easing */\n    AvoidSoftInput.setEasing("easeOut");\n    AvoidSoftInput.setHideAnimationDelay(1000);\n    AvoidSoftInput.setHideAnimationDuration(600);\n    AvoidSoftInput.setShowAnimationDelay(1000);\n    AvoidSoftInput.setShowAnimationDuration(1200);\n    return () => {\n      /** Rest to default values */\n      AvoidSoftInput.setEasing("linear");\n      AvoidSoftInput.setHideAnimationDelay();\n      AvoidSoftInput.setHideAnimationDuration();\n      AvoidSoftInput.setShowAnimationDelay();\n      AvoidSoftInput.setShowAnimationDuration();\n      AvoidSoftInput.setEnabled(false);\n      AvoidSoftInput.setDefaultAppSoftInputMode();\n    };\n  }, []);\n\n  useFocusEffect(onFocusEffect);\n\n  // ...\n};\n')),(0,i.kt)("h3",{id:"example---view"},"Example - view"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ts"},'export const CustomAnimationConfigViewExample: React.FC = () => {\n  // ...\n\n  return (\n    <SafeAreaView>\n      {/** Customize animation delay, duration & easing */}\n      <AvoidSoftInputView\n        easing="easeOut"\n        hideAnimationDelay={1000}\n        hideAnimationDuration={600}\n        showAnimationDelay={1000}\n        showAnimationDuration={1200}\n      >\n        // ...\n        <TextInput />\n        // ...\n      </AvoidSoftInputView>\n    </SafeAreaView>\n  );\n};\n')))}l.isMDXComponent=!0}}]);