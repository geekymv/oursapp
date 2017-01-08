'use strict'

import React, { Component } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
  Dimensions,
  Navigator,
  AsyncStorage,
  
} from 'react-native';

import TabBar from './TabBar';

const PUBLISH_ARTICLE_URL = 'http://192.168.0.102:3000/articles/add';

/*
我的
*/
class Mine extends Component {

	constructor(props){
		super(props);
		this.state = {			
			userId: '1',
		}
	}
	
	settings() {
		AsyncStorage.removeItem('USER_INFO', ()=> {
			
		});
	}
	
	render() {
		return(
			<View style={styles.container}>
				<TouchableOpacity style={styles.commit} onPress={this.settings.bind(this)} >
					<Text style={{color:'#fff'}} >设置</Text>
				</TouchableOpacity>
			
			</View>
		);
	}
}


const styles = StyleSheet.create({

	container: {
		backgroundColor: '#FAFAFA',
		flex: 1,
		flexDirection: 'column',
	},
	commit: {
		margin: 30,
		marginTop: 20,
		backgroundColor: '#63B8FF',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
	},
});

export default Mine;