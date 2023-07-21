import { StyleSheet } from 'react-native';

import { Text, View, Background, Content, SidePanel, MenuButton, Title, ButtonLabel} from '../../components/Themed';

import { SideMenu } from '../../components/SideMenu';

import {PageStyles} from '../../styles/PageStyles';

export default function DashboardScreen() {
  return (
    <Background>
		<SideMenu>
			<MenuButton>
				<ButtonLabel>Fetch Test</ButtonLabel>
			</MenuButton>
		</SideMenu>
		<SidePanel>
			<MenuButton>
				<ButtonLabel>Menu</ButtonLabel>
			</MenuButton>
			<MenuButton>
				<ButtonLabel>Big Menu</ButtonLabel>
			</MenuButton>
		</SidePanel>
		<Content>
			<Text style={PageStyles.title}>Dashboard</Text>
		</Content>
    </Background>
  );
}
