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
		paddingHorizontal: 0
	},
	contentSpace: {
		flex: 1,
		flexBasis: 'auto',
		flexGrow: 1,
		flexShrink: 1,
		alignItems: 'center',
		justifyContent: 'flex-start'
		
	},
	menuButton: {
		flex: 1,
		flexBasis: 'auto',
		width: '100%',
		flexGrow: 0,
		flexShrink: 0,
		paddingHorizontal: 15,
		paddingTop: 5,
		borderBottomWidth: 2,
		borderColor: Colors.light.backgroundColor.secondary,
		borderRadius: 10
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
	titleBlock: {
		flex: 1,
		flexBasis: 'auto',
		flexGrow: 0,
		flexShrink: 0,
		paddingHorizontal: 15,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
});
