import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';

import { HomeButton } from '../../components/HomeButton';


/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}


export default function TabLayout() {
	const colorScheme = useColorScheme();

	return (
		<Tabs
		screenOptions={{
		tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
		}}>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Dashboard',
					headerTitle: "",
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					headerLeft: () => (<HomeButton/>),
				}}
			/>
			<Tabs.Screen
				name="Charts"
				options={{
					title: 'Charts',
					headerTitle: "",
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					headerLeft: () => (<HomeButton/>),
				}}
			/>
			<Tabs.Screen
				name="Transactions"
				options={{
					title: 'Transactions',
					headerTitle: "",
					tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
					headerLeft: () => (<HomeButton/>),
				}}
			/>
		</Tabs>
	);
}
