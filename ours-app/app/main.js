import React from 'react';
import {
	View,
	Navigator
} from 'react-native';

import Login from './Login';
import ArticleList from './ArticleList';
import TabBar from './TabBar';

// http://bbs.reactnative.cn/topic/20/%E6%96%B0%E6%89%8B%E7%90%86%E8%A7%A3navigator%E7%9A%84%E6%95%99%E7%A8%8B
class SampleComponent extends React.Component {
	render() {
		let defaultName = 'Login';
		let defaultComponent = Login;
		// 定义默认路由
		let defaultRoute = {
			name: defaultName, 
			component: defaultComponent,
		};
		return (
			<Navigator
			  // 指定默认的页面
			  initialRoute = {defaultRoute}
			  // 场景渲染的配置
			  configureScene = {(route) => {
				//  return Navigator.SceneConfigs.HorizontalSwipeJump;
					return Navigator.SceneConfigs.PushFromRight;
			  }}
			  // 渲染场景
			  renderScene = {(route, navigator) => {
				//  console.log('route' + route)
				//  console.log('navigator' + navigator);
			      let Component = route.component; // 待渲染的Component
				  return <Component {...route.params} route={route} navigator={navigator} />
			  }}
			/>
		);
	}	
}

export default SampleComponent;