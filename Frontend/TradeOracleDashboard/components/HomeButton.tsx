import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import { useState, useCallback, useContext, useEffect} from "react";
import { useFocusEffect } from "@react-navigation/native";

import {RunQuery} from './Querying/RunQuery';

import Colors from '../constants/Colors';

import { Text, View, ClearView, Background, Title, TitleBlock, Shrinkable} from './Themed';


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
			debugMode: false,
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
		
	}
	
	useFocusEffect(
		useCallback(() => {
			getServerStatus();
		}, [])
	);
	
	useEffect(() => {
		
		if(beacon.status == 200){
			setStatusColor(AliveColor);
		}
		else{
			setStatusColor(DownColor);
		}
		
		if(beacon == {}){
			getServerStatus();
		}
		else{
				
			let interval = setInterval(() => {
				getServerStatus();
			}, 10000);
			
			return () => clearInterval(interval);
		}
		
	});
	
	return(
		<View style={{height: 50, alignItems: 'center', justifyContent: 'center'}}>
			<Link href="/" asChild>
				<Pressable>
					{({ pressed }) => (
						<TitleBlock>
							<ClearView>
								<FontAwesome
									name="circle"
									size={25}
									color={statusColor}
									style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
								/>
							</ClearView>
							<Title>{"Project Crypto Trader"}</Title>
						</TitleBlock>
					)}
				</Pressable>
			</Link>
		</View>
	
	);
}