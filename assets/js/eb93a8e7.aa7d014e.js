"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[8517],{173:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>a,default:()=>u,frontMatter:()=>s,metadata:()=>r,toc:()=>l});var i=t(4848),o=t(8453);const s={id:"usage-view",title:"Usage - view",sidebar_label:"Usage - view",keywords:["react-native-avoid-softinput","view","usage"]},a=void 0,r={id:"guides/usage-view",title:"Usage - view",description:"Depending on the navigation setup you have, check the navigation's library documentation for correct way to run some actions when the screen gains/loses focus.",source:"@site/versioned_docs/version-7.0.x/guides/USAGE_VIEW.mdx",sourceDirName:"guides",slug:"/guides/usage-view",permalink:"/react-native-avoid-softinput/docs/guides/usage-view",draft:!1,unlisted:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/versioned_docs/version-7.0.x/guides/USAGE_VIEW.mdx",tags:[],version:"7.0.x",frontMatter:{id:"usage-view",title:"Usage - view",sidebar_label:"Usage - view",keywords:["react-native-avoid-softinput","view","usage"]},sidebar:"docsSidebar",previous:{title:"Usage - module",permalink:"/react-native-avoid-softinput/docs/guides/usage-module"},next:{title:"Jest mock usage",permalink:"/react-native-avoid-softinput/docs/guides/jest-mock-usage"}},c={},l=[];function d(e){const n={code:"code",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.p,{children:"Depending on the navigation setup you have, check the navigation's library documentation for correct way to run some actions when the screen gains/loses focus."}),"\n",(0,i.jsxs)(n.p,{children:["The following example assumes ",(0,i.jsx)(n.code,{children:"react-navigation"})," is used as a navigation:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-tsx",children:'import * as React from "react";\nimport { Button, Modal, ScrollView, TextInput, View } from "react-native";\nimport { AvoidSoftInputView } from "react-native-avoid-softinput";\nimport { useFocusEffect } from "@react-navigation/native";\n\nexport const ModalExample: React.FC = () => {\n  const [ modalVisible, setModalVisible ] = React.useState(false);\n\n  function closeModal() {\n    setModalVisible(false);\n  }\n\n  function openModal() {\n    setModalVisible(true);\n  }\n\n  return <View>\n    <Button\n      onPress={openModal}\n      title="Open modal"\n    />\n    <Modal\n      onRequestClose={closeModal}\n      visible={modalVisible}\n    >\n      <View>\n        <View>\n          <View>\n            <Button onPress={closeModal} title="X" />\n          </View>\n// highlight-start\n          <AvoidSoftInputView>\n            <ScrollView>\n              <View>\n                <TextInput placeholder="Single line" />\n                <TextInput placeholder="Multiline" />\n                <Button\n                  onPress={closeModal}\n                  title="Submit"\n                />\n              </View>\n            </ScrollView>\n          </AvoidSoftInputView>\n// highlight-end\n        </View>\n      </View>\n    </Modal>\n  </View>;\n};\n'})})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>a,x:()=>r});var i=t(6540);const o={},s=i.createContext(o);function a(e){const n=i.useContext(s);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),i.createElement(s.Provider,{value:n},e.children)}}}]);