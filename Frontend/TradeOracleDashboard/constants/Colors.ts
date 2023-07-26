const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
	
	light: {
		text: 				'#000',
		background: 		'#fff',
		tint: 				tintColorLight,
		tabIconDefault: 	'#ccc',
		tabIconSelected: 	tintColorLight,
		backgroundColor: {
			primary: 		"rgba(255,255,255,1)",
			secondary: 		"rgba(216,216,216,1)",
			tertiary: 		"rgba(255,255,255,1)",
		},
		view: {
			primary: 		"rgba(255,255,255,1)",
			secondary: 		"rgba(216,216,216,1)",
			tertiary: 		"rgba(255,255,255,1)",
		},
		tintedView: {
			primary: 		"rgba(0,0,0,0.2)",
			secondary: 		"rgba(0,0,0,0.2)",
			tertiary: 		"rgba(0,0,0,0.2)",
		},
		font: {
			headings: {
				primary: 	"rgba(0,0,0,1)",
				secondary: 	"rgba(0,0,0,1)",
				tertiary: 	"rgba(0,0,0,1)",
				tint: 		tintColorLight,
			},
			content: {
				primary: 	"rgba(0,0,0,1)",
				secondary: 	"rgba(0,0,0,1)",
				tertiary: 	"rgba(0,0,0,1)",
				tint: 		tintColorLight,
			},
		}
		
	},
	dark: {
		text: 				'#fff',
		background: 		'#000',
		tint: 				tintColorDark,
		tabIconDefault: 	'#ccc',
		tabIconSelected: 	tintColorDark,
		backgroundColor: {
			primary: 		"#eee",
			secondary: 		"#bbb",
			tertiary: 		"#eee",
		},
		view: {
			primary: 		"#eee",
			secondary: 		"#eee",
			tertiary: 		"#eee",
		},
		tintedView: {
			primary: 		"rgba(255,255,255,0.5)",
			secondary: 		"rgba(255,255,255,0.5)",
			tertiary: 		"rgba(255,255,255,0.5)",
		},
		font: {
			headings: {
				primary: 	"rgba(255,255,255,0.1)",
				secondary: 	"rgba(255,255,255,0.1)",
				tertiary: 	"rgba(255,255,255,0.1)",
				tint: 		tintColorLight,
			},
			content: {
				primary: 	"rgba(255,255,255,0.1)",
				secondary: 	"rgba(255,255,255,0.1)",
				tertiary: 	"rgba(255,255,255,0.1)",
				tint: 		tintColorLight,
			},
		}
	},
};
