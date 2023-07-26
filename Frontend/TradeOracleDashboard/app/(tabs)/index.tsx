import { StyleSheet } from 'react-native';

import { Text, View, Background, Content, SidePanel, MenuButton, Title, ButtonLabel, MenuProps} from '../../components/Themed';

import { SideMenu } from '../../components/SideMenu';

import {PageStyles} from '../../styles/PageStyles';

export default function DashboardScreen(props: MenuProps) {
  return (
    <Background>
		<SideMenu>
			<MenuButton>
				<ButtonLabel>Fetch Test</ButtonLabel>
			</MenuButton>
		</SideMenu>
		<Content>
			<Text style={PageStyles.title}>Dashboard</Text>
		</Content>
    </Background>
  );
}
