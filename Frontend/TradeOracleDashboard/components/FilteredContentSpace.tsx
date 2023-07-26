import { DefaultViewProps, MenuButton, SidePanel, Content, Background } from './Themed';
import {SideMenu} from './SideMenu';
import {useState} from 'react';

export default function FilteredContent(props: DefaultViewProps){
	
	return(
		<Background>
			<SideMenu/>
			<Content>{props.children}</Content>
		</Background>
	);
}