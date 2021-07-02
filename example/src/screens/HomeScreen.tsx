import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Button,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as AvoidSoftInput from 'react-native-avoid-softinput';

import { EXAMPLES } from './Examples';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={styles.scrolContainer}
        data={EXAMPLES}
        keyExtractor={(example) => example.name}
        renderItem={({ item }) => 
          <View style={styles.item}>
            <Button
              onPress={() => navigation.navigate(item.name)}
              title={item.name}
            />
            <Text style={styles.label}>{item.description}</Text>
          </View>
        }
      />
      {Platform.OS === 'android' ? <View style={styles.adjustContainer}>
        <View style={styles.adjustItem}>
          <Button
            onPress={() => AvoidSoftInput.setAdjustNothing()}
            title="Adjust Nothing"
          />
        </View>
        <View style={styles.adjustItem}>
          <Button
            onPress={() => AvoidSoftInput.setAdjustPan()}
            title="Adjust Pan"
          />
        </View>
        <View style={styles.adjustItem}>
          <Button
            onPress={() => AvoidSoftInput.setAdjustResize()}
            title="Adjust Resize"
          />
        </View>
        <View style={styles.adjustItem}>
          <Button
            onPress={() => AvoidSoftInput.setAdjustUnspecified()}
            title="Adjust Unspecified"
          />
        </View>
        <View style={styles.adjustItem}>
          <Button
            onPress={() => AvoidSoftInput.setDefaultAppSoftInputMode()}
            title="Default softinput mode"
          />
        </View>
      </View> : null}
      <StatusBar
        animated={true}
        backgroundColor={'transparent'}
        barStyle={'dark-content'}
        translucent={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  adjustContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    marginHorizontal: 40,
  },
  adjustItem: {
    marginVertical: 10,
  },
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  item: {
    marginHorizontal: 40,
    marginVertical: 10,
  },
  label: {
    color: 'black',
    fontSize: 15,
    marginVertical: 10,
  },
  scrolContainer: {
    alignSelf: 'stretch',
    flexGrow: 1,
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: 'gray',
    height: StyleSheet.hairlineWidth,
  },
});

export default HomeScreen;
