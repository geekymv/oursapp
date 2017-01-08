
var BASE_URL = 'http://192.168.0.102:3000';

var API = {

	/*今日头条段子接口*/
	joke_url: 'http://www.toutiao.com/api/article/feed/?category=essay_joke&utm_source=toutiao&max_behot_time=0&max_behot_time_tmp=0&as=A125D77E9554D77&cp=57E5740DD7D7FE1',
	
	/*今日头条天气接口：city传城市中文名*/
	weather_url: 'http://www.toutiao.com/stream/widget/local_weather/data/?city=',
	
	/*用户登录接口*/
	user_login_url: BASE_URL + '/users/login',
	
	/*用户注册接口*/
	user_regist_url: BASE_URL + 'users/regist',
	
	/*文章列表接口*/
	article_list_url: BASE_URL + '/articles/list',
	
	/*发布文章接口*/
	publish_article_url: BASE_URL + '/articles/add'
}

export default API;