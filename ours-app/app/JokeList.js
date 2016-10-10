'use strict'
import React, { Component } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	View,
	ListView,
	PixelRatio,
	Alert,
	TouchableOpacity,
	
} from 'react-native';

var REQUEST_URL = 'http://www.toutiao.com/api/article/feed/?category=essay_joke&utm_source=toutiao&max_behot_time=0&max_behot_time_tmp=0&as=A125D77E9554D77&cp=57E5740DD7D7FE1';

class JokeList extends Component {
	constructor(props) {
		super(props);	
		this.state = {
			dataSource: new ListView.DataSource({
				rowHasChanged: (row1, row2)=> row1 != row2,
			}),
			loaded: false,
		};
		// http://bbs.reactnative.cn/topic/901/listview%E9%80%89%E6%B8%B2%E6%9F%93%E7%9A%84%E7%BB%84%E4%BB%B6%E9%87%8C%E9%9D%A2%E7%9A%84touchableopacity-onpress%E8%B0%83%E7%94%A8%E6%96%B9%E6%B3%95-%E5%87%BA%E7%8E%B0%E9%97%AE%E9%A2%98null-is-an-not-object
		// ListView选渲染的组件里面的TouchableOpacity onPress调用方法 出现问题null is an not object
		this.renderMovie = this.renderMovie.bind(this);
	}
	componentDidMount() {
		this.fetchData();
	}
	fetchData() {
		fetch(REQUEST_URL)
			.then((response)=> response.json())
			.then((responseData)=> {
				this.setState({
					dataSource: this.state.dataSource.cloneWithRows(responseData.data),
					loaded: true,
				});
			})
			.done();
	}

	renderLodingView() {
		return (
			<View style={styles.loading}>
				<Text>正在加载数据...</Text>
			</View>
		);
	}

	jokeDetail(content) {
		Alert.alert('段子详情', content);	
	}
	
	renderMovie(joke) {
		joke = joke.group;
		return (
			<TouchableOpacity onPress={this.jokeDetail.bind(this, joke.content)}>
			<View style={[styles.container, styles.item]}>
				<View style={styles.img_view}>
				<Image source={{uri: joke.user.avatar_url}} style={styles.thumbnail} />
				</View>
				<View style={styles.rightContainer}>
					<View style={[styles.row, styles.item_top]}>
						<Text style={styles.name}>{joke.user.name}</Text>
					</View>
					<Text style={styles.content}>{joke.content}</Text>
				</View>			
			</View>
			</TouchableOpacity>
		);
	}
	
	

	render() {
		if(!this.state.loaded) {
			return this.renderLodingView();
		}
		// http://www.wangchenlong.org/2016/04/26/1604/261-rn-es6-class/#more
		// renderRow={this.renderMovie.bind(this)}
		return(
			<ListView
				dataSource={this.state.dataSource}
				renderRow={this.renderMovie}
				style={styles.listView}
			/>	
		);
  }
}

const styles = StyleSheet.create({
	row:{
		flexDirection:'row'
	},
	item: {
	//	borderTopWidth:1 / PixelRatio.get(),
	//	borderBottomWidth:1 / PixelRatio.get(),
	//	borderColor: '#ccc',
	//	marginBottom: 10,
		borderBottomColor: '#e0e0e0',
		borderBottomWidth: 1,
	},
	container: {
		flex: 1,
		flexDirection: 'row',
	//	justifyContent: 'center',
	//	alignItems: 'center',
	//	backgroundColor: '#F5FCFF',
		marginLeft: 10,
		marginRight: 10,
	},
	img_view: {
	//	justifyContent: 'flex-start',
		marginTop: 5,
		marginBottom: 5,
	},
	thumbnail: {
		width: 46,
		height: 46,
//		borderRadius: 40,
		alignSelf: 'flex-start',
	},
	rightContainer: {
		flex: 1,
		marginLeft: 2,
	//	backgroundColor: '#ff8f45',
	},
	content: {
		fontSize: 15,
		color: '#000000',
		marginBottom: 5,
		marginLeft: 6,
		textAlign: 'left'
	},
	item_top: {
	//	backgroundColor: '#abc'
	},
	name: {
		color: '#2BB2A3',
		marginLeft: 6,
	},
	loading: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

export default JokeList