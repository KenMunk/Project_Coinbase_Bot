import {StyleSheet} from 'react-native';

export const ColorSchemes = {
	
	light: {
		view: {
			primary: [
				"rgba(255,255,255,0.1)",
				"rgba(255,255,255,0.1)",
				"rgba(255,255,255,0.1)"
			],
			secondary: [
				"rgba(255,255,255,0.1)",
				"rgba(255,255,255,0.1)",
				"rgba(255,255,255,0.1)"
			],
			tertiary: [
				"rgba(255,255,255,0.1)",
				"rgba(255,255,255,0.1)",
				"rgba(255,255,255,0.1)"
			],
		},
		text: {
			headings: {
				primary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
				secondary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
				tertiary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
			},
			content: {
				primary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
				secondary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
				tertiary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
			},
		}
	},
	dark: {
		view: {
			primary: [
				"#eee",
				"#eee",
				"#eee"
			],
			secondary: [
				"#eee",
				"#eee",
				"#eee"
			],
			tertiary: [
				"#eee",
				"#eee",
				"#eee"
			],
		},
		text: {
			headings: {
				primary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
				secondary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
				tertiary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
			},
			content: {
				primary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
				secondary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
				tertiary: [
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)",
					"rgba(255,255,255,0.1)"
				],
			},
		}
		
	}
	
};

export const PageStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
