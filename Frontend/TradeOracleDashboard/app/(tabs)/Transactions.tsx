import { StyleSheet } from 'react-native';

import { Text, View, Background, Content, SidePanel } from '../../components/Themed';

import {PageStyles} from '../../styles/PageStyles';

export default function TransactionsScreen() {
  return (
    <Background>
		<SidePanel>
			<Text style={PageStyles.title}>Menu</Text>
		</SidePanel>
		<Content>
			<Text style={PageStyles.title}>Transactions</Text>
		</Content>
    </Background>
  );
}

