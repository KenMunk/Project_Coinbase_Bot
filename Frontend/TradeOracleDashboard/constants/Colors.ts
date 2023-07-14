const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
	
	light: {
		text: 				'#000',
		background: 		'#fff',
		tint: 				tintColorLight,
		tabIconDefault: 	'#ccc',
		tabIconSelected: 	tintColorLight,
		view: {
			primary: 		"rgba(255,255,255,0.1)",
			secondary: 		"rgba(255,255,255,0.1)",
			tertiary: 		"rgba(255,255,255,0.1)",
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
			},
			content: {
				primary: 	"rgba(0,0,0,1)",
				secondary: 	"rgba(0,0,0,1)",
				tertiary: 	"rgba(0,0,0,1)",
			},
		}
		
	},
	dark: {
		text: 				'#fff',
		background: 		'#000',
		tint: 				tintColorDark,
		tabIconDefault: 	'#ccc',
		tabIconSelected: 	tintColorDark,
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
			},
			content: {
				primary: 	"rgba(255,255,255,0.1)",
				secondary: 	"rgba(255,255,255,0.1)",
				tertiary: 	"rgba(255,255,255,0.1)",
			},
		}
	},
};
