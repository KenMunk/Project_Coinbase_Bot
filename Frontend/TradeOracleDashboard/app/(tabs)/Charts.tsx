import { StyleSheet } from 'react-native';

import { Text, View, Background, Content, SidePanel } from '../../components/Themed';

import {PageStyles} from '../../styles/PageStyles';

export default function ChartsScreen() {
  return (
    <Background>
		<SidePanel>
			<Text style={PageStyles.title}>Menu</Text>
		</SidePanel>
		<Content>
			<Text style={PageStyles.title}>Charts</Text>
		</Content>
    </Background>
  );
}

