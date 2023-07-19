import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View, Background} from '../components/Themed';

import {PageStyles} from '../styles/PageStyles';

export default function DashboardScreen(){
	
	return (
		
		<Background>
			<Text style={PageStyles.title}>Dashboard</Text>
		</Background>
		
	);
	
}