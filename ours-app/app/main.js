import React from 'react';
import {
	View,
	Navigator
} from 'react-native';

import Login from './Login';
// http://bbs.reactnative.cn/topic/20/%E6%96%B0%E6%89%8B%E7%90%86%E8%A7%A3navigator%E7%9A%84%E6%95%99%E7%A8%8B
class SampleComponent extends React.Component {
	render() {
		let defaultName = 'Login';
		let defaultComponent = Login;
		return (
			<Navigator
			  initialRoute = {{name: defaultName, component: defaultComponent}}
			 
			  configureScene = {(route) => {
				  return Navigator.SceneConfigs.HorizontalSwipeJump;
			  }}
			  renderScene = {(route, navigator) => {
				  console.log('route' + route)
				  console.log('navigator' + navigator);
			      let Component = route.component; // 待渲染的Component
				  return <Component {...route.params} navigator={navigator} />
			  }}
			/>
		);
	}	
}

export default SampleComponent;