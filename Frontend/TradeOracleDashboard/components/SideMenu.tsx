import { MenuProps, MenuButton, SidePanel } from './Themed';

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

export function SideMenu(props: MenuProps){
	
	const testSideMenu = GetCombos();
	
	return(
		<SidePanel>
			
		</SidePanel>
	);
}