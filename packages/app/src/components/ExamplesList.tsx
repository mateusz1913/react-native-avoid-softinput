import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, View } from 'react-native';

import { styles } from '../consts/styles';
import type { Example } from '../navigation/screens';
import type { RootStackNavigationProp } from '../navigation/types';

import Button from './Button';

interface Props {
  data: Array<Example>;
}

const ExamplesList: React.FC<Props> = ({ data }) => {
  const navigation = useNavigation<RootStackNavigationProp>();

  return <FlatList
    ItemSeparatorComponent={() => <View style={styles.separator} />}
    contentContainerStyle={styles.scrollContainer}
    data={data}
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
  />;
};

export default ExamplesList;
