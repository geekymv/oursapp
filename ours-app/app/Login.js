﻿/**
 * 用户登录模块实现	
 */
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
	
} from 'react-native';

const {height, width} = Dimensions.get('window');

import JokeList from './JokeList';


// http://www.lcode.org/%E3%80%90react-native%E5%BC%80%E5%8F%91%E3%80%91react-native%E6%8E%A7%E4%BB%B6%E4%B9%8Btextinput%E7%BB%84%E4%BB%B6%E8%AE%B2%E8%A7%A3%E4%B8%8Eqq%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2%E5%AE%9E%E7%8E%B011/
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: '',
			password: '',
		}
	}

	// 用户名
	onChangeUsernameValue(event) {
		this.setState({username: event.nativeEvent.text});
		console.log('password-->' + this.state.username);
	}
	// 密码
	onChangePasswordValue(event) {
		this.setState({password: event.nativeEvent.text});
		console.log('password-->' + this.state.password);
	}
	
	// 用户登录
	loginSubmit(event) {
		var username = this.state.username;
		var password = this.state.password;
		if(!username) {
			Alert.alert("错误提示", "登录名不能为空！");
			return;
		}
		if(!password) {
			Alert.alert("错误提示", "密码不能为空！");
			return;
		}
		
		fetch('http://115.28.145.105:3000/users/login', 
		{	method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'username='+username+'&password='+password
		}).then((response) => response.json())
		.then((responseJson) => {
		//	Alert.alert(JSON.stringify(responseJson) );	
			//  登录成功
			const navigator = this.props.navigator;
			if(navigator) {
			//	navigator.pop();
				navigator.replace({
					name: 'JokeList',
					component: JokeList
				});
			}
		})
		.catch((err) => {
			Alert.alert(err);	
		});
		
	}

	render() {
		return(
			<View style={styles.container}>
				<View style={styles.login}>
				<TextInput
					style={styles.username}
					autoFocus={true}
					onChange={this.onChangeUsernameValue.bind(this)}
					value={this.state.username}
					placeholder={'登录名'}
					placeholderTextColor={'#45a7ff'}
					underlineColorAndroid={'transparent'}
					maxLength={20}
				/>
				
				<TextInput
					style={styles.password}
					onChange={this.onChangePasswordValue.bind(this)}
					value={this.state.password}
					placeholder={'密码'}
					placeholderTextColor={'#45a7ff'}
					secureTextEntry={true}
					number-pad='umber-pad'
					underlineColorAndroid={'transparent'}
					maxLength={20}
				/>
				
				<TouchableOpacity style={styles.commit} onPress={this.loginSubmit.bind(this)} >
					<Text style={{color:'#fff'}} >登录</Text>
				</TouchableOpacity>
				</View>
				<View style={styles.welcome}>
					 <Image style={styles.bottomImgStyle} source={require('./img/login_large_ic.png')} />
				</View>	
			</View>
		);
	
	}
}


const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FAFAFA',
		flex: 1,
	},
	login: {
	//	backgroundColor: 'gray',
	},
	username: {
		margin: 30,
		marginTop: 100,
		marginBottom: 10,
		height: 40,
		backgroundColor: '#fff',
		//textAlign: 'center',
		borderWidth: 0.6,
		borderColor: '#63B8FF',
		
	},
	password: {
		margin: 30,
		marginTop: 10,
		height: 40,
		backgroundColor: '#fff',
		//textAlign: 'center',
		borderWidth: 0.6,
		borderColor: '#63B8FF',
	},
	commit: {
		margin: 30,
		marginTop: 10,
		backgroundColor: '#63B8FF',
		height: 40,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		
	},
	welcome: {
	//	backgroundColor: '#63B8FF',
		justifyContent: 'center',
		alignItems: 'center',
	},
	bottomImgStyle: {
		width: width * 0.5,
		height: width * 0.5,
	}
	
});

// module.exports = Login;
export default Login