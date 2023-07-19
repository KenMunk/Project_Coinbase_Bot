import {StyleSheet} from 'react-native';

import Colors from '../constants/Colors';

export const PageStyles = StyleSheet.create({
	background: {
		flex: 1,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	statusBar: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	contentContainer: {
		flex: 1,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'flex-start'
	},
	contentSelectionBar: {
		flex: 1,
		flexBasis: 'auto',
		flexGrow: 0,
		flexShrink: 0,
		borderRightWidth: 1,
		borderColor: Colors.light.backgroundColor.secondary,
		paddingHorizontal: 15
	},
	contentSpace: {
		flex: 1,
		flexBasis: 'auto',
		flexGrow: 1,
		flexShrink: 1,
		alignItems: 'center',
		justifyContent: 'flex-start'
		
	},
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
