import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import { useState, useCallback, useContext, useEffect} from "react";
import { useFocusEffect } from "@react-navigation/native";

import {RunQuery} from './Querying/RunQuery';

import Colors from '../constants/Colors';

import { Text, View, Background} from './Themed';

function GetServerStatus(updateCallback: {}) {
	
	RunQuery(		
		{
			queryPath: 'https://trader-dashboard-service.onrender.com/',
			queryHeader: {
				method: 'GET'
			},
			successMessage: "Server Alive",
			failMessage: "Server Down",
			callbackOp: updateCallback,
			debugMode: true,
			targetField: 'message'
		}
	)
	
}

export function HomeButton(){
	
	const [ beacon, setBeacon ] = useState({});
	const [ statusColor, setStatusColor] = useState("#000000");
	
	const colorScheme = useColorScheme();
	
	const AliveColor = "#009900";
	const DownColor = "#ff0000";
	
	const getServerStatus = async () => { 
		await GetServerStatus(setBeacon);
		
		if(beacon.status == 200){
			setStatusColor(AliveColor);
		}
		else{
			setStatusColor(DownColor);
		}
	}
	
	useFocusEffect(
		useCallback(() => {
			getServerStatus();
		}, [])
	);
	
	useEffect(() => {
		let interval = setInterval(() => {
			getServerStatus();
		}, 10000);
		
		return () => clearInterval(interval);
	});
	
	return(
		<View style={{width: 76, alignItems: 'center', justifyContent: 'center'}}>
			<Link href="/" asChild>
				<Pressable>
					{({ pressed }) => (
						<FontAwesome
							name="circle"
							size={25}
							color={statusColor}
							style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
						/>
					)}
				</Pressable>
			</Link>
		</View>
	
	);
}