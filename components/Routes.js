import React, { Component } from 'react'
import { View, Platform, ToastAndroid } from 'react-native'
import { Icon } from "react-native-elements"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Main from './Main'

const HomeStack = createStackNavigator()

class Routes extends Component {
	constructor(props) {
		super(props);		
	}
	componentDidMount() { }

	render() {

		const toggleDrawerIcon = (navigation) => (props) => (
			<Icon name="list"
				type="font-awesome"
				size={24}
				onPress={() => { }}
			/>
		)

		return (
			<View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
				<NavigationContainer>
					<HomeStack.Navigator>
						<HomeStack.Screen name="Home" component={Main} options={{ headerLeft: toggleDrawerIcon(this.props.navigation) }} />
					</HomeStack.Navigator>
				</NavigationContainer>
			</View>
		);
	}
}

export default Routes