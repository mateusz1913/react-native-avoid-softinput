"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[6595],{4467:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>a,default:()=>c,frontMatter:()=>s,metadata:()=>d,toc:()=>r});var o=n(4848),i=n(8453);const s={id:"on-soft-input-applied-offset-change",title:"onSoftInputAppliedOffsetChange",sidebar_label:"onSoftInputAppliedOffsetChange",keywords:["react-native-avoid-softinput","onSoftInputAppliedOffsetChange","module"]},a=void 0,d={id:"api/module/on-soft-input-applied-offset-change",title:"onSoftInputAppliedOffsetChange",description:"Use onSoftInputAppliedOffsetChange method, to e.g. create animation based on current applied offset value.",source:"@site/versioned_docs/version-6.0.x/api/module/ON_SOFT_INPUT_APPLIED_OFFSET_CHANGE.mdx",sourceDirName:"api/module",slug:"/api/module/on-soft-input-applied-offset-change",permalink:"/react-native-avoid-softinput/docs/6.0.x/api/module/on-soft-input-applied-offset-change",draft:!1,unlisted:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/versioned_docs/version-6.0.x/api/module/ON_SOFT_INPUT_APPLIED_OFFSET_CHANGE.mdx",tags:[],version:"6.0.x",frontMatter:{id:"on-soft-input-applied-offset-change",title:"onSoftInputAppliedOffsetChange",sidebar_label:"onSoftInputAppliedOffsetChange",keywords:["react-native-avoid-softinput","onSoftInputAppliedOffsetChange","module"]},sidebar:"docsSidebar",previous:{title:"onSoftInputHeightChange",permalink:"/react-native-avoid-softinput/docs/6.0.x/api/module/on-soft-input-height-change"},next:{title:"setAdjustNothing",permalink:"/react-native-avoid-softinput/docs/6.0.x/api/module/set-adjust-nothing"}},p={},r=[{value:"Parameters",id:"parameters",level:3},{value:"Example",id:"example",level:3}];function l(e){const t={code:"code",h3:"h3",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(t.p,{children:["Use ",(0,o.jsx)(t.code,{children:"onSoftInputAppliedOffsetChange"})," method, to e.g. create animation based on current applied offset value."]}),"\n",(0,o.jsx)(t.h3,{id:"parameters",children:"Parameters"}),"\n",(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:"Type"}),(0,o.jsx)(t.th,{children:"Required"}),(0,o.jsx)(t.th,{children:"Description"})]})}),(0,o.jsx)(t.tbody,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:"({ appliedOffset }: { appliedOffset: number }) => void"}),(0,o.jsx)(t.td,{children:"yes"}),(0,o.jsx)(t.td,{children:"function called during applying padding or translation with current applied value"})]})})]}),"\n",(0,o.jsx)(t.h3,{id:"example",children:"Example"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-ts",children:'import { AvoidSoftInput } from "react-native-avoid-softinput";\n\nconst unsubscribe = AvoidSoftInput.onSoftInputAppliedOffsetChange(\n  ({ appliedOffset }) => {\n    // Do sth\n  }\n);\n\n// Later invoke unsubscribe.remove()\n'})})]})}function c(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(l,{...e})}):l(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>d});var o=n(6540);const i={},s=o.createContext(i);function a(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function d(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);