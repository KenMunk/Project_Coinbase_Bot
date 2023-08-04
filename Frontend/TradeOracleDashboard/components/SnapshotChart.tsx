import {DefaultViewProps, View, ClearView, Shrinkable, Text} from './Themed';

import { useState, useCallback, useContext, useEffect} from "react";
import { useFocusEffect } from "@react-navigation/native";

//Not the desired way to do things but needed for the boiler plate code to test
import {Dimensions} from 'react-native';

import {
  LineChart
} from "react-native-chart-kit";

type ChartData = {
	data?: {};
	
}

type ChartProps = DefaultViewProps & ChartData;

export function Chart(props: ChartProps){
	
	let chartData = {
		labels: ["Test Data"],
		datasets: [
			{
				data: [
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100
				],
				strokeWidth: 2,
				color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
			},
			{
				data: [
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100,
					Math.random() * 100
				],
				strokeWidth: 2,
				color: (opacity = 1) => `#00ff00`, // optional
			},
		],
	}
	
	if(props.data){
		if(props.data.length > 0){
			
			console.log("Data detected for chart:\n" + JSON.stringify(props.data));
			//chartData = props.data;
			
			chartData.labels = [
				new Date((props.data.pop().timestamp)).toLocaleTimeString(),
				"",
				"",
				"",
				new Date((props.data[0].timestamp)).toLocaleTimeString()
			];
			
			chartData.datasets = [];
			
			let buyEntries = {
				data: [],
				strokeWidth: 2,
				color: (opacity = 1) => `#ff0000`,
			}
			
			props.data.map((logEntry) => {
				
				buyEntries.data.push(logEntry.buy);
				chartData.datasets = [buyEntries];
				
			});
		}
	}
	
	if(chartData != {}){
		return(
			<View>
				<LineChart
					data={chartData}
					width={Dimensions.get("window").width*0.7} // from react-native
					height={500}
					yAxisLabel="$"
					yAxisInterval={1} // optional, defaults to 1
					chartConfig={{
						backgroundColor: "#eeeeee",
						backgroundGradientFrom: "#eeeeee",
						backgroundGradientTo: "#eeeeee",
						decimalPlaces: 2, // optional, defaults to 2dp
						color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
						style: {
							//borderRadius: 16,
							borderWidth: 10,
							borderColor: '#cccccc'
						},
						/*
						propsForDots: {
							r: "6",
							strokeWidth: "2",
							stroke: "#ffa726"
						}//*/
					}}
					bezier
					style={{
						marginVertical: 8,
						borderRadius: 16
					}}
				/>
			</View>
		);
	}
	else{
		return(null);
	}
	
}