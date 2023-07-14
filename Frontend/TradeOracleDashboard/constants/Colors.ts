const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export default {
	light: {
		theme: [
			{
				text: '#000',
				background: '#fff',
				tint: tintColorLight,
				tabIconDefault: '#ccc',
				tabIconSelected: tintColorLight,
				view: {
					primary: 		"rgba(255,255,255,0.1)",
					secondary: 		"rgba(255,255,255,0.1)",
					tertiary: 		"rgba(255,255,255,0.1)",
				},
				font: {
					headings: {
						primary: 	"rgba(0,0,0,1)",
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
		]
		
	},
	dark: {
		text: '#fff',
		background: '#000',
		tint: tintColorDark,
		tabIconDefault: '#ccc',
		tabIconSelected: tintColorDark,
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
	},
};
