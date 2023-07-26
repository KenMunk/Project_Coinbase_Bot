import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import {PageStyles, ColorSchemes} from '../styles/PageStyles';

export default function ModalScreen() {
  return (
    <View style={PageStyles.container}>
      <Text style={PageStyles.title}>Modal</Text>
      <View style={PageStyles.separator} lightColor={ColorSchemes.light.view.primary[0]} darkColor={ColorSchemes.dark.view.primary[0]} />
      <EditScreenInfo path="app/modal.tsx" />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}
