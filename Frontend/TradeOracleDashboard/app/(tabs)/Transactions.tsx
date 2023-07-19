import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';

import {PageStyles, ColorSchemes} from '../../styles/PageStyles';

export default function TransactionsScreen() {
  return (
    <View style={PageStyles.container}>
      <Text style={PageStyles.title}>Transactions</Text>
    </View>
  );
}

