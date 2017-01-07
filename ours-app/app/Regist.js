/**
 * 用户注册模块实现	
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

class Regist extends Component {
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
	//	console.log('password-->' + this.state.username);
	}
	// 密码
	onChangePasswordValue(event) {
		this.setState({password: event.nativeEvent.text});
	//	console.log('password-->' + this.state.password);
	}
	
	registSubmit(event) {
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
		
		fetch('http://115.28.145.105:3000/users/regist', 
		{	method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'username='+username+'&password='+password
		}).then((response) => response.json())
		.then((responseJson) => {
		//	Alert.alert(JSON.stringify(responseJson) );	
			//  注册成功
			const navigator = this.props.navigator;
			if(navigator) {
			//	navigator.pop();
				navigator.replace({
					name: 'Login',
					component: Login
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
				<Text style={styles.welcome_regist}>欢迎注册</Text>
				
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
					placeholder={'登录密码'}
					placeholderTextColor={'#45a7ff'}
					secureTextEntry={true}
					number-pad='umber-pad'
					underlineColorAndroid={'transparent'}
					maxLength={20}
				/>
				
				<TouchableOpacity style={styles.commit} onPress={this.registSubmit.bind(this)} >
					<Text style={{color:'#fff'}} >立即注册</Text>
				</TouchableOpacity>
				
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	welcome_regist: {
		textAlign: 'center',
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
	
	
});

export default Regist;