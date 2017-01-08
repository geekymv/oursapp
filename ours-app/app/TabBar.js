import React, { Component } from 'react';  
import {  
  AppRegistry,  
  StyleSheet,  
  Text,  
  View,  
  Image,  
} from 'react-native';  
  
//引入tabbar支持包  
import TabNavigator from 'react-native-tab-navigator';  
  
import ArticleList from './ArticleList';
import JokeList from './JokeList';
import PublicArticle from './PublicArticle';
import Mine from './Mine';

  
const TabNavigatorItem =TabNavigator.Item;  
  
const TAB_NORMAL_1=require('./img/tabbar_1.png');  
const TAB_NORMAL_2=require('./img/tabbar_2.png');  
const TAB_NORMAL_3=require('./img/tabbar_3.png');  
const TAB_NORMAL_4=require('./img/tabbar_4.png');  
  
const TAB_PRESS_1=require('./img/tabbar_1_press.png');  
const TAB_PRESS_2=require('./img/tabbar_2_press.png');  
const TAB_PRESS_3=require('./img/tabbar_3_press.png');  
const TAB_PRESS_4=require('./img/tabbar_4_press.png');  
  
class TabBar extends Component {  
  
  constructor(){  
    super();  
    this.state={  
      selectedTab:'Home',  
    }  
  }  
  
  /** 
  tab点击方法 
  **/  
  onPress(tabName){  
    if(tabName){  
		// 跳转至发表文章页面
		if(tabName === 'Follow') {
			const navigator = this.props.navigator;
			if(navigator) {
				navigator.push({
					name: 'PublicArticle',
					component: PublicArticle,
					params: {
						id: '123'
					}
				});
			}
			return;
		}
	
		this.setState({  
			selectedTab:tabName,  
		});
    }  
  }  
   /** 
   渲染每项 
   **/  
   renderTabView(title,tabName,tabContent,isBadge){  
     var tabNomal;  
     var tabPress;
	 var tabItem;
     switch (tabName) {  
       case 'Home':  
         tabNomal=TAB_NORMAL_1;  
         tabPress=TAB_PRESS_1;  
		 tabItem =  <ArticleList />
         break;  
     case 'Video':  
       tabNomal=TAB_NORMAL_2;  
       tabPress=TAB_PRESS_2;  
	   tabItem = <JokeList />;
       break;  
     case 'Follow':  
       tabNomal=TAB_NORMAL_3;  
       tabPress=TAB_PRESS_3;  
	   tabItem = <PublicArticle />; 
       break;  
     case 'Mine':  
       tabNomal=TAB_NORMAL_4;  
       tabPress=TAB_PRESS_4;  
       tabItem = <Mine />;
       break;
       default:  
  
     }  
     return(  
       <TabNavigatorItem  
        title={title}  
        renderIcon={()=><Image style={styles.tabIcon} source={tabNomal}/>}  
        renderSelectedIcon={()=><Image style={styles.tabIcon} source={tabPress}/>}  
        selected={this.state.selectedTab===tabName}  
        selectedTitleStyle={{color:'#f85959'}}  
        onPress={()=>this.onPress(tabName)}  
        renderBadge={()=>isBadge?<View style={styles.badgeView}><Text style={styles.badgeText}>15</Text></View>:null}  
       >  
       {tabItem}
       </TabNavigatorItem>  
     );  
   }  
  
   /** 
   自定义tabbar 
   **/  
  tabBarView(){  
    return (  
      <TabNavigator  
       tabBarStyle={styles.tab}  
      >  
      {this.renderTabView('首页','Home','头条板块',true)}  
      {this.renderTabView('段子','Video','视频板块',false)}  
      {this.renderTabView('关注','Follow','关注板块',false)}  
      {this.renderTabView('我的','Mine','我的板块',false)}  
      </TabNavigator>  
    );  
  }  
  
  
  render() {  
    var tabBarView=this.tabBarView();  
    return (  
      <View style={styles.container}>  
        {tabBarView}  
      </View>  
    );  
  }  
}  
  
const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    backgroundColor: '#F5FCFF',  
  },  
  welcome: {  
    fontSize: 20,  
    textAlign: 'center',  
    margin: 10,  
  },  
  instructions: {  
    textAlign: 'center',  
    color: '#333333',  
    marginBottom: 5,  
  },  
  tab:{  
    height: 50,  
    alignItems:'center',  
    backgroundColor:'#f4f5f6',  
  },  
  tabIcon:{  
    width:25,  
    height:25,  
  },  
  badgeView:{  
    width:16,  
    height:16 ,  
    backgroundColor:'#f85959',  
    borderWidth:1,  
    marginLeft:0,  
    marginTop:5,  
    borderColor:'#FFF',  
    alignItems:'center',  
    justifyContent:'center',  
    borderRadius:10,  
  },  
  badgeText:{  
    color:'#fff',  
    fontSize:8,  
  }  
});  

export default TabBar;