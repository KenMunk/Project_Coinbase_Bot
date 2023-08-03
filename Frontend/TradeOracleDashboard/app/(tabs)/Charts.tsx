import { StyleSheet } from 'react-native';

import { Text, View, Background, Content, SidePanel, MenuButton, Title, ButtonLabel} from '../../components/Themed';

import FilteredContent from '../../components/FilteredContentSpace';

import {Chart} from '../../components/SnapshotChart';

import {PageStyles} from '../../styles/PageStyles';

export default function ChartsScreen() {
  return (
    <FilteredContent>
		<Text style={PageStyles.title}>Charts</Text>
		<Chart/>
	</FilteredContent>
  );
}

