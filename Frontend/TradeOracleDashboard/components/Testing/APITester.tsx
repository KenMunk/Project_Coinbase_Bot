import { Text, View, Background, Content, SidePanel, MenuButton, Title, ButtonLabel, MenuProps} from '../../components/Themed';

import {PageStyles} from '../../styles/PageStyles';

import {queryOptions, RunQuery} from '../Querying/RunQuery';

export function QueryText(options: queryOptions){
	
	RunQuery(options);
	
}