import { StyleSheet } from 'react-native';

import { Text, View, Background, Content, SidePanel, MenuButton, Title, ButtonLabel, MenuProps} from '../../components/Themed';

import FilteredContent from '../../components/FilteredContentSpace';

import {PageStyles} from '../../styles/PageStyles';

export default function DashboardScreen(props: MenuProps) {
  return (
    <FilteredContent>
		<Text style={PageStyles.title}>Dashboard</Text>
	</FilteredContent>
	
  );
}
