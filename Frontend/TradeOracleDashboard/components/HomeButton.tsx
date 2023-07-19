import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

import Colors from '../constants/Colors';

import { Text, View, Background} from './Themed';

export function HomeButton(){
	const colorScheme = useColorScheme();
	return(
		<View style={{width: 76, alignItems: 'center', justifyContent: 'center'}}>
			<Link href="/" asChild>
				<Pressable>
					{({ pressed }) => (
						<FontAwesome
							name="info-circle"
							size={25}
							color={Colors[colorScheme ?? 'light'].text}
							style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
						/>
					)}
				</Pressable>
			</Link>
		</View>
	
	);
}