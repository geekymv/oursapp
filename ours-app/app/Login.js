/**
 * 用户登录模块实现	
 */
'use strict'

/*	<Image style={styles.bottomImgStyle} source={require('./img/login_large_ic.png')} />
	上面这种方式打包后显示不出来图片
	http://richardcao.me/2015/11/24/React-native-Android-%E5%88%9D%E6%AC%A1%E8%B8%A9%E5%9D%91%E4%B9%8B%E6%97%85/
*/
 
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

const {height, width} = Dimensions.get('window');

import API from './API';
import JokeList from './JokeList';
import Regist from './Regist';
import TabBar from './TabBar';

const LOGIN_URL = API.user_login_url;

// http://www.lcode.org/%E3%80%90react-native%E5%BC%80%E5%8F%91%E3%80%91react-native%E6%8E%A7%E4%BB%B6%E4%B9%8Btextinput%E7%BB%84%E4%BB%B6%E8%AE%B2%E8%A7%A3%E4%B8%8Eqq%E7%99%BB%E5%BD%95%E7%95%8C%E9%9D%A2%E5%AE%9E%E7%8E%B011/
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogin: global.isLogin,
			// username默认值是从注册页面跳转带入
			username: this.props.username,
			password: '',
		}
	}
	
	componentDidMount() {
		var self = this;
		AsyncStorage.getItem('USER_INFO', function(error, result) {
			if(result) {
				self.state.isLogin = true;
				const navigator = self.props.navigator;
				if(navigator) {
				//	navigator.pop();
					navigator.replace({
						name: 'TabBar',
						component: TabBar
					});
				}
				return;				
			}
		});
		
	}
	// 获取用户信息判断用户是否登录
	getUserInfo() {
		
	}

	// 用户名
	onChangeUsernameValue(event) {
		this.setState({username: event.nativeEvent.text});
	}
	// 密码
	onChangePasswordValue(event) {
		this.setState({password: event.nativeEvent.text});
	}
	
	// 保存用户信息
	saveUserInfo(user) {
		var USER_INFO = 'USER_INFO';
		try {
			global.isLogin = true; // 设置全局变量
			AsyncStorage.setItem(USER_INFO, user, function(error) {
				if(error) {
					Alert('err', '存储失败');
				}
			});
		} catch(error) {
			
		}
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
		
		fetch(LOGIN_URL, 
		{	method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'username='+username+'&password='+password
		}).then((response) => response.json())
		.then((responseJson) => {
		//	Alert.alert('result', JSON.stringify(responseJson.data[0]) );	
		//	return;
			if(responseJson.code !== 1) {
				Alert.alert('登录失败', responseJson.message);
				return;
			}
			
		//	console.log(responseJson.data[0].id);
			this.saveUserInfo(JSON.stringify(responseJson.data[0]));
			//  登录成功
			const navigator = this.props.navigator;
			if(navigator) {
			//	navigator.pop();
				navigator.replace({
					name: 'TabBar',
					component: TabBar
				});
			}
		})
		.catch((err) => {
			Alert.alert(err);	
		});
		
	}
	
	_regist() {
		const navigator = this.props.navigator;
		if(navigator) {
			navigator.push({
				name: 'Regist',
				component: Regist,
				params: {
					id: '123'
				}
			});
		}
	//	Alert.alert('注册');	
	}

	render() {
		if(this.state.isLogin) {
			const navigator = this.props.navigator;
			if(navigator) {
			//	navigator.pop();
				navigator.replace({
					name: 'TabBar',
					component: TabBar
				});
			}
			return;
		}
		return(
			<View style={styles.container}>
				<View style={styles.login}>
				<TextInput
					style={styles.username}
					autoFocus={true}
					onChange={this.onChangeUsernameValue.bind(this)}
				//	value={this.state.username}
					defaultValue={this.props.username} // 默认值是从注册页面跳转带入
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
					<Image style={styles.bottomImgStyle} source={{uri:'http://115.28.145.105:3000/images/login_large_ic.png'}} />
				</View>	
				
				<View style={{flexDirection: 'row', flex:1, alignSelf:'stretch', }}>
					<View style={{alignSelf:'flex-end', marginLeft: 10, marginBottom: 10}}>
						<Text>无法登录？</Text>
					</View>
					<View style={{alignSelf:'flex-end', marginLeft: 220, marginBottom: 10, marginRight: 20,}}>
						<TouchableOpacity onPress={this._regist.bind(this)} >
							<Text>新用户注册</Text>
						</TouchableOpacity>
						
					</View>
				</View>
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
