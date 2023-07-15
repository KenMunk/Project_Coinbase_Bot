import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

import {PageStyles} from '../styles/PageStyles';

export default function DashboardScreen(){
	
	return (
		
		<View style={PageStyles.container}>
			<Text style={PageStyles.title}>Dashboard</Text>
		</View>
		
	);
	
}