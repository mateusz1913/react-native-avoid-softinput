import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { AvoidSoftInput } from 'react-native-avoid-softinput';
import { SafeAreaView } from 'react-native-safe-area-context';

import { royalblueColor, textFieldBorderColor } from '../consts/colors';
import { styles as commonStyles } from '../consts/styles';

export const LongTextExample = () => {
  const onFocusEffect = useCallback(function onFocusEffectFunc() {
    AvoidSoftInput.setShouldMimicIOSBehavior(true);
    AvoidSoftInput.setEnabled(true);
    AvoidSoftInput.setHideAnimationDelay(0);
    AvoidSoftInput.setHideAnimationDuration(0);
    AvoidSoftInput.setShowAnimationDelay(0);
    AvoidSoftInput.setShowAnimationDuration(0);
    return () => {
      AvoidSoftInput.setEnabled(false);
      AvoidSoftInput.setShouldMimicIOSBehavior(false);
    };
  }, []);

  useFocusEffect(onFocusEffect);

  return (
    <SafeAreaView edges={['bottom', 'left', 'right']} style={commonStyles.screenContainer}>
      <ScrollView
        bounces={false}
        contentContainerStyle={[commonStyles.scrollContainer, styles.scrollContainer]}
        contentInsetAdjustmentBehavior="always"
        overScrollMode="always"
        showsVerticalScrollIndicator={true}
        style={commonStyles.stretch}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla doloribus unde, ex debitis similique expedita
          explicabo molestias numquam ducimus temporibus voluptate, voluptates repudiandae ratione deleniti mollitia?
          Deleniti nulla laudantium minima asperiores adipisci ut a quam itaque cumque veritatis possimus maxime ipsa
          cum perspiciatis nisi nesciunt, repudiandae vitae dolore incidunt, non placeat illo. Reiciendis libero, autem
          impedit possimus aperiam quo molestiae, corporis consequuntur assumenda, earum doloribus tempora? Non quia,
          quasi reprehenderit perferendis odio eligendi cupiditate temporibus nisi labore doloremque nemo magnam velit,
          aut inventore, iure placeat voluptates incidunt! Fugiat ipsum dolorem laboriosam ut sunt ullam! Molestias
          soluta, sint aliquid aspernatur ipsum quasi eum distinctio optio provident praesentium exercitationem nesciunt
          minus accusantium voluptates explicabo atque deleniti veniam enim facilis ullam deserunt libero cupiditate.
          Quisquam illo magnam cumque adipisci ab et, asperiores libero unde nisi aut saepe facilis voluptate veritatis.
          A corporis impedit eum, blanditiis nobis, aliquam vero ad eligendi nisi natus, ut temporibus. Repellendus
          suscipit commodi temporibus aperiam maxime, at quisquam culpa ipsam? Iusto repudiandae hic doloremque
          excepturi animi reiciendis sit, ullam, quidem quos minima distinctio enim facere laborum maxime possimus earum
          inventore, at perspiciatis sequi aperiam odio aut blanditiis! Nobis voluptate aliquid quasi odit, amet
          cupiditate iste necessitatibus deleniti dolor reiciendis?
        </Text>
        <TextInput accessibilityLabel="Text input field" style={styles.input} />
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla doloribus unde, ex debitis similique expedita
          explicabo molestias numquam ducimus temporibus voluptate, voluptates repudiandae ratione deleniti mollitia?
          Deleniti nulla laudantium minima asperiores adipisci ut a quam itaque cumque veritatis possimus maxime ipsa
          cum perspiciatis nisi nesciunt, repudiandae vitae dolore incidunt, non placeat illo. Reiciendis libero, autem
          impedit possimus aperiam quo molestiae, corporis consequuntur assumenda, earum doloribus tempora? Non quia,
          quasi reprehenderit perferendis odio eligendi cupiditate temporibus nisi labore doloremque nemo magnam velit,
          aut inventore, iure placeat voluptates incidunt! Fugiat ipsum dolorem laboriosam ut sunt ullam! Molestias
          soluta, sint aliquid aspernatur ipsum quasi eum distinctio optio provident praesentium exercitationem nesciunt
          minus accusantium voluptates explicabo atque deleniti veniam enim facilis ullam deserunt libero cupiditate.
          Quisquam illo magnam cumque adipisci ab et, asperiores libero unde nisi aut saepe facilis voluptate veritatis.
          A corporis impedit eum, blanditiis nobis, aliquam vero ad eligendi nisi natus, ut temporibus. Repellendus
          suscipit commodi temporibus aperiam maxime, at quisquam culpa ipsam? Iusto repudiandae hic doloremque
          excepturi animi reiciendis sit, ullam, quidem quos minima distinctio enim facere laborum maxime possimus earum
          inventore, at perspiciatis sequi aperiam odio aut blanditiis! Nobis voluptate aliquid quasi odit, amet
          cupiditate iste necessitatibus deleniti dolor reiciendis?
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: textFieldBorderColor,
    borderWidth: 1,
  },
  scrollContainer: {
    padding: 10,
  },
  text: {
    color: royalblueColor,
  },
});
