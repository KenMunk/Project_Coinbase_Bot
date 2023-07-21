import { DefaultViewProps, MenuButton, SidePanel, Content, Background } from './Themed';
import {SideMenu} from './SideMenu';
import {useState} from 'react';

export function FilteredContent(props: DefaultViewProps){
	
	let [ filter, setFilter ] = useState({});
	
	return(
		<Background>
			<SideMenu state={filter} updateState={setFilter}/>
		</Background>
	);
}