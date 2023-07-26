import { StyleSheet } from 'react-native';

import { Text, View, Background, Content, SidePanel, MenuButton, Title, ButtonLabel} from '../../components/Themed';

import { SideMenu } from '../../components/SideMenu';

import {PageStyles} from '../../styles/PageStyles';

export default function ChartsScreen() {
  return (
    <Background>
		<SideMenu>
			<MenuButton>
				<ButtonLabel>Fetch Test</ButtonLabel>
			</MenuButton>
		</SideMenu>
		<Content>
			<Text style={PageStyles.title}>Charts</Text>
		</Content>
    </Background>
  );
}

