import { StyleSheet } from 'react-native';

import { Text, View, Background, Content, SidePanel, MenuButton, Title, ButtonLabel} from '../../components/Themed';

import FilteredContent from '../../components/FilteredContentSpace';

import {Chart} from '../../components/SnapshotChart';

import MenuContext from '../../components/MenuContext';

import {RunQuery} from '../../components/Querying/RunQuery';

import { useState, useCallback, useContext, useEffect} from "react";
import { useFocusEffect } from "@react-navigation/native";

import {PageStyles} from '../../styles/PageStyles';

async function GetChartData(updateCallback: {}, targetCrypto: "", matchStateCallback: {}) {
	
	console.log("Requesting data for " + targetCrypto);
	
	await RunQuery(		
		{
			queryPath: 'https://trader-dashboard-service.onrender.com/snapshot/clean/'+targetCrypto+'/USD',
			queryHeader: {
				method: 'GET'
			},
			successMessage: "Data found for " + targetCrypto,
			failMessage: "Data not found for " + targetCrypto,
			callbackOp: updateCallback,
			debugMode: true,
			targetField: 'data'
		}
	)
	
	matchStateCallback(targetCrypto);
	
}

export default function ChartsScreen() {
	
	const [ chartData, setChartData ] = useState({});
	
	//const [ loadingState, setLoadingState] = useState("loading");
	
	const [ cleanChartData, setCleanChartData ] = useState([]);
	
	const { menuState, setMenuState} = useContext(MenuContext);
	
	const [ localChartFor, setLocalChartFor] = useState("");
	
	const getChartData = async () => {
		//setLoadingState("loading");
		//setCleanChartData([]);
		await GetChartData(setChartData, menuState,setLocalChartFor);
		//setLoadingState("ready");
		
		
		if(chartData.status == 200){
			setCleanChartData(chartData.data);
		}
		else{
			setCleanChartData([]);
		}
	}
	
	useFocusEffect(
		useCallback(() => {
			getChartData();
		}, [])
	);
	
	useEffect(() => {
		
		if(chartData == {} || localChartFor != menuState){
			getChartData();
		}
		else{
			
			let interval = setInterval(() => {
				getChartData();
			}, 5000);
			
			return () => clearInterval(interval);
		}
		
	});
	
	if(cleanChartData != []){
		return (
			<FilteredContent>
				<Text style={PageStyles.title}>Charts</Text>
				<Chart data={cleanChartData}/>
			</FilteredContent>
		);
	}
	else{
		
		return (
			<FilteredContent>
				<Text style={PageStyles.title}>Charts</Text>
				<Chart/>
				<Text style={PageStyles.title}>No Chart Data Found</Text>
			</FilteredContent>
		);
	}
	
}

