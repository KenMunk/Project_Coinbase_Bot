/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView, TouchableWithoutFeedback } from 'react-native';

import { useState, useCallback, useContext} from "react";
import { useFocusEffect } from "@react-navigation/native";

import MenuContext from './MenuContext';

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
	targetState?:{};
}

function activateMenuState(MenuProps){
	MenuProps.updateState(targetState);
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
	const {menuState} = useContext(MenuContext);
	const { style, ...otherProps} = props;
	
	var colorMode = (props.children == menuState ? "tint" : "primary");
	
	const color = useThemeColor({light: Colors.light.font.headings[colorMode], dark: Colors.light.font.headings[colorMode]}, 'text');
	
	return <Heading2 style={[{color}, style, TextStyles.header2]} {...otherProps} />
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ClearView(props: DefaultView['props']){
	const { style, ...otherProps } = props;
	return(<DefaultView style={style} {...otherProps} />)
}

export function TitleBlock(props: DefaultViewProps){
	const { style, ...otherProps} = props;
	
	return(<DefaultView style={[style, PageStyles.titleBlock]} {...otherProps} />);
}

export function Shrinkable(props: DefaultViewProps){
	const {style, ...otherProps} = props;
	
	return(<DefaultView style={[style, PageStyles.shrinkable]} {...otherProps}/>)
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
	
	const handlePress = () => {
		props.updateState(props.targetState)
	};

	return (
		<TouchableWithoutFeedback 
			onPress={handlePress}>
			<DefaultView style={[{ backgroundColor }, style, PageStyles.menuButton]} {...otherProps}>
				<ButtonLabel>{props.children}</ButtonLabel>
			</DefaultView>
		</TouchableWithoutFeedback>
	
	);
}