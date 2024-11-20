"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[1089],{4896:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var o=n(4848),i=n(8453);const s={id:"recipes-sticky-footer",title:"Sticky footer recipe",sidebar_label:"Sticky footer",keywords:["react-native-avoid-softinput","sticky footer","recipe"]},r=void 0,a={id:"recipes/recipes-sticky-footer",title:"Sticky footer recipe",description:"To handle complex layouts, where you want to make visible parts of UI inside and outside of scroll component (like scrollable text fields and fixed CTA button), you should manually handle parts that are not in the current focused input's container.",source:"@site/versioned_docs/version-6.0.x/recipes/STICKY_FOOTER.mdx",sourceDirName:"recipes",slug:"/recipes/recipes-sticky-footer",permalink:"/react-native-avoid-softinput/docs/6.0.x/recipes/recipes-sticky-footer",draft:!1,unlisted:!1,editUrl:"https://github.com/mateusz1913/react-native-avoid-softinput/tree/main/docs/versioned_docs/version-6.0.x/recipes/STICKY_FOOTER.mdx",tags:[],version:"6.0.x",frontMatter:{id:"recipes-sticky-footer",title:"Sticky footer recipe",sidebar_label:"Sticky footer",keywords:["react-native-avoid-softinput","sticky footer","recipe"]},sidebar:"docsSidebar",previous:{title:"Bottom sheet",permalink:"/react-native-avoid-softinput/docs/6.0.x/recipes/recipes-bottom-sheet"},next:{title:"Animations",permalink:"/react-native-avoid-softinput/docs/6.0.x/recipes/recipes-animations"}},c={},l=[];function d(e){const t={a:"a",code:"code",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.p,{children:"To handle complex layouts, where you want to make visible parts of UI inside and outside of scroll component (like scrollable text fields and fixed CTA button), you should manually handle parts that are not in the current focused input's container."}),"\n",(0,o.jsxs)(t.p,{children:['One use case is handling "sticky" CTA button fixed at the bottom of the screen with text fields displayed inside ',(0,o.jsx)(t.code,{children:"ScrollView"}),"."]}),"\n",(0,o.jsxs)(t.p,{children:["To handle button manually, you can use ",(0,o.jsx)(t.code,{children:"useSoftInputHeightChanged"})," or combination of ",(0,o.jsx)(t.code,{children:"useSoftInputShown"})," and ",(0,o.jsx)(t.code,{children:"useSoftInputHidden"})," hooks to apply additional padding for button's container."]}),"\n",(0,o.jsxs)(t.p,{children:["Check ",(0,o.jsx)(t.a,{href:"https://github.com/mateusz1913/react-native-avoid-softinput/blob/main/packages/app/src/screens/StickyFooterExample.tsx",children:"StickyFooterExample"}),' for a showcase of "sticky" footer behavior']}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-tsx",metastring:'title="packages/app/src/screens/StickyFooterExample.tsx"',children:"import { useFocusEffect } from '@react-navigation/native';\nimport * as React from 'react';\nimport { ScrollView, StyleSheet, View } from 'react-native';\nimport { AvoidSoftInput, useSoftInputHeightChanged } from 'react-native-avoid-softinput';\nimport Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';\nimport { SafeAreaView } from 'react-native-safe-area-context';\n\nimport Button from '../components/Button';\nimport SingleInput from '../components/SingleInput';\nimport { styles as commonStyles } from '../consts/styles';\n\nconst NOOP = () => {};\n\nexport const StickyFooterExample: React.FC = () => {\n  const buttonContainerPaddingValue = useSharedValue(0);\n\n  const buttonContainerAnimatedStyle = useAnimatedStyle(() => {\n    return {\n      paddingBottom: buttonContainerPaddingValue.value,\n    };\n  });\n\n  const onFocusEffect = React.useCallback(() => {\n    AvoidSoftInput.setShouldMimicIOSBehavior(true);\n\n    return () => {\n      AvoidSoftInput.setShouldMimicIOSBehavior(false);\n    };\n  }, []);\n\n  useFocusEffect(onFocusEffect);\n\n  /**\n   * You can also use `useSoftInputShown` & `useSoftInputHidden`\n   *\n   * useSoftInputShown(({ softInputHeight }) => {\n   *   buttonContainerPaddingValue.value = withTiming(softInputHeight);\n   * });\n   *\n   * useSoftInputHidden(() => {\n   *   buttonContainerPaddingValue.value = withTiming(0);\n   * });\n   */\n  useSoftInputHeightChanged(({ softInputHeight }) => {\n    buttonContainerPaddingValue.value = withTiming(softInputHeight);\n  });\n\n  return <SafeAreaView edges={[ 'left', 'right', 'bottom' ]} style={commonStyles.screenContainer}>\n    <View style={styles.scrollWrapper}>\n      <ScrollView\n        contentContainerStyle={styles.scrollContainer}\n        contentInsetAdjustmentBehavior=\"always\"\n      >\n        <SingleInput />\n      </ScrollView>\n    </View>\n    <Animated.View style={[ buttonContainerAnimatedStyle, styles.ctaButtonWrapper ]}>\n      <View style={styles.ctaButtonContainer}>\n        <Button onPress={NOOP} title=\"Submit\" />\n      </View>\n    </Animated.View>\n  </SafeAreaView>;\n};\n\nconst styles = StyleSheet.create({\n  ctaButtonContainer: {\n    alignItems: 'center',\n    alignSelf: 'stretch',\n    borderRadius: 10,\n    borderWidth: 1,\n  },\n  ctaButtonWrapper: {\n    alignSelf: 'stretch',\n  },\n  scrollContainer: {\n    alignItems: 'center',\n    alignSelf: 'stretch',\n    borderRadius: 10,\n    borderWidth: 1,\n    flexGrow: 1,\n    justifyContent: 'center',\n    margin: 5,\n    padding: 10,\n  },\n  scrollWrapper: {\n    alignSelf: 'stretch',\n    flex: 1,\n  },\n});\n"})})]})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>a});var o=n(6540);const i={},s=o.createContext(i);function r(e){const t=o.useContext(s);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),o.createElement(s.Provider,{value:t},e.children)}}}]);