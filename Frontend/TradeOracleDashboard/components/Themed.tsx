/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView } from 'react-native';

import Colors from '../constants/Colors';
import {PageStyles} from '../styles/PageStyles';
import {TextStyles} from '../styles/TextStyles';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

type MenuStateProps = {
	state?:{};
	updateState?:{};
}

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type MenuProps = DefaultView['props'] & MenuStateProps;
export type ThemedMenuProps = ViewProps & MenuProps;
export type DefaultViewProps = DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function Title(props: DefaultText['props']){
	const { style, ...otherProps} = props;
	const color = useThemeColor({light: Colors.light.font.headings.primary, dark: Colors.light.font.headings.primary}, 'text');
	
	return <DefaultText style={[{color}, style, TextStyles.title]} {...otherProps} />
}

export function Heading1(props: DefaultText['props']){
	const { style, ...otherProps} = props;
	const color = useThemeColor({light: Colors.light.font.headings.primary, dark: Colors.light.font.headings.primary}, 'text');
	
	return <DefaultText style={[{color}, style, TextStyles.header1]} {...otherProps} />
}

export function Heading2(props: DefaultText['props']){
	const { style, ...otherProps} = props;
	const color = useThemeColor({light: Colors.light.font.headings.primary, dark: Colors.light.font.headings.primary}, 'text');
	
	return <DefaultText style={[{color}, style, TextStyles.header2]} {...otherProps} />
}

export function ButtonLabel(props: DefaultText['props']){
	const { style, ...otherProps} = props;
	const color = useThemeColor({light: Colors.light.font.headings.primary, dark: Colors.light.font.headings.primary}, 'text');
	
	return <Heading2 style={[{color}, style, TextStyles.header2]} {...otherProps} />
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Background(props: DefaultView['props']) {
  const { style, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: Colors.light.backgroundColor.primary, dark: Colors.dark.backgroundColor.primary }, 'background');
	
  return <DefaultView style={[{ backgroundColor }, style, PageStyles.contentContainer]} {...otherProps} />;
}

export function SidePanel(props: DefaultViewProps){
	const { style, ...otherProps } = props;
	const backgroundColor = useThemeColor({ light: Colors.light.backgroundColor.primary, dark: Colors.dark.backgroundColor.primary }, 'background');

	return <DefaultView style={[{ backgroundColor }, style, PageStyles.contentSelectionBar]} {...otherProps} />;
}

export function Content(props: MenuProps){
	const { style, ...otherProps } = props;
	const backgroundColor = useThemeColor({ light: Colors.light.backgroundColor.primary, dark: Colors.dark.backgroundColor.primary }, 'background');

	return <DefaultView style={[{ backgroundColor }, style, PageStyles.contentSpace]} {...otherProps} />;
}

export function MenuButton(props: MenuProps){
	const { style, ...otherProps } = props;
	const backgroundColor = useThemeColor({ light: Colors.light.backgroundColor.primary, dark: Colors.dark.backgroundColor.primary }, 'background');

	return <DefaultView style={[{ backgroundColor }, style, PageStyles.menuButton]} {...otherProps} />;
}