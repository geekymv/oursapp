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

import API from './API';
import TabBar from './TabBar';

const PUBLISH_ARTICLE_URL = API.publish_article_url;
/*
发表文章
*/
class PublicArticle extends Component {

	constructor(props){
		super(props);
		this.state = {
			content: '',
			userId: '1',
		}
	}
	
	onChangeContentValue(event) {
		this.setState({content: event.nativeEvent.text});
	}
	
	articleSubmit() {
		var self = this;
		AsyncStorage.getItem('USER_INFO', function(error, result) {
			self.fetchData(self.state.content, JSON.parse(result).id);
		});
	}
	
	fetchData(content, userId) {
		if(!content) {
			Alert.alert("温馨提示", "啥都没输入呀！");
			return;
		}
		
		fetch(PUBLISH_ARTICLE_URL, 
		{	method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'content='+content+'&userId='+userId + '&from=app'
		}).then((response) => response.json())
		.then((responseJson) => {
			if(responseJson.code !== 1) {
				Alert.alert('提交失败', responseJson.message);
				return;
			}
			//  提交成功
			const navigator = this.props.navigator;
			if(navigator) {
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
	
	render() {
		return(
			<View style={styles.container}>
				<TextInput
					style={styles.content}
					autoFocus={true}
					onChange={this.onChangeContentValue.bind(this)}
					placeholder={'分享新鲜事...'}
					placeholderTextColor={'#45a7ff'}
					underlineColorAndroid={'transparent'}
					multiline={true}
					maxLength={280}
				/>
				
				<TouchableOpacity style={styles.commit} onPress={this.articleSubmit.bind(this)} >
					<Text style={{color:'#fff'}} >提交</Text>
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
	content: {
		margin: 30,
		width: 400,
		height: 200,
		borderWidth: 1,
		borderColor: 'black',
		textAlign: 'left',
		textAlignVertical: 'top'
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



export default PublicArticle;