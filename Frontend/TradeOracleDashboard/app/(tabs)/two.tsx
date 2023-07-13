import { StyleSheet } from 'react-native';

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';

import {PageStyles, ColorSchemes} from '../../styles/PageStyles';

export default function TabTwoScreen() {
  return (
    <View style={PageStyles.container}>
      <Text style={PageStyles.title}>Tab Two</Text>
      <View style={PageStyles.separator} lightColor={ColorSchemes.light.view.primary[0]} darkColor={ColorSchemes.dark.view.primary[0]} />
      <EditScreenInfo path="app/(tabs)/two.tsx" />
    </View>
  );
}

