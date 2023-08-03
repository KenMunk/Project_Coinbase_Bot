import {DefaultViewProps, View, ClearView, Shrinkable, Text} from './Themed';

import { useState, useCallback, useContext, useEffect} from "react";
import { useFocusEffect } from "@react-navigation/native";


type ChartData = {
	data?: {};
	
}

type ChartProps = DefaultViewProps & ChartData;

export function Chart(props: ChartProps){
	return(
		<View><Text>Well Shit</Text></View>
	);
}