import { StyleSheet } from 'react-native';

import { Text, View, Background, Content, SidePanel, MenuButton, Title, ButtonLabel} from '../../components/Themed';

import FilteredContent from '../../components/FilteredContentSpace';

import {PageStyles} from '../../styles/PageStyles';

export default function TransactionsScreen() {
  return (
    <FilteredContent>
		<Text style={PageStyles.title}>API Tester</Text>
	</FilteredContent>
  );
}

