import { MenuProps, MenuButton, SidePanel, ButtonLabel } from './Themed';
import MenuContext from './MenuContext';

import { useState, useCallback, useContext} from "react";
import { useFocusEffect } from "@react-navigation/native";

async function GetCombos(){
	
	try{
		let comboResponse = await fetch('https://trader-dashboard-service.onrender.com/combos/getList', {
			method: 'GET'
		});
		
		let comboData = await comboResponse.json();
		
		console.log(comboData.data);
		
		return(comboData.data);
	}
	catch(error){
		console.log('No Combo Data Found');
		return([]);
	}
	
}


//This could be done better by caching the fetch at the page level or caching it to local storage to reduce the number of api calls
export function SideMenu(props: MenuProps){
	
	const { menuState, setMenuState} = useContext(MenuContext);
	
	const [ combo, setCombos ] = useState();
	
	const testSideMenu = async () => { 
		try{
			let comboResponse = await fetch('https://trader-dashboard-service.onrender.com/combos/getList', {
				method: 'GET'
			});
			
			let comboData = await comboResponse.json();
			
			console.log(comboData.data);
			
			await setCombos(await comboData.data);
		}
		catch(error){
			console.log('No Combo Data Found\n'+error);
		}
	}
	
	useFocusEffect(
		useCallback(() => {
			testSideMenu();
		}, [])
	);
	
	//Need to look into how I can preserve the menu state by passing that state all the way up to the layout level
	return(
		<SidePanel>
			<MenuButton state={menuState} updateState={setMenuState} targetState={"Summary"}>Summary</MenuButton>
			{combo ? (combo.map( comboEntry  => (
				/*Replace all menuState with props.state*/
				/*Replace all setMenuState with props.updateState*/
				<MenuButton key={comboEntry._id} state={menuState} updateState={setMenuState} targetState={comboEntry.crypto}>{comboEntry.crypto}</MenuButton>
			))
			): null}
			{
				(
				//*
				<ButtonLabel>{"Active State is " + menuState}</ButtonLabel>
				//*/
				)
			}
		</SidePanel>
	);
}