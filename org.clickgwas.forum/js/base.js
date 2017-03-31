var __API__ = "http://123.56.157.171/click/public/index.php/";
addCookie("token","ejWDcDk_g5adoT2l3VGp9g==","");
var __TOKEN__ = getCookie("token");
var __USERINFO__ = null;

$(".header-wrapper").empty();
$(".header-wrapper").append('<header><div class="container"><div class="logo-container"><!--Website Logo--><a href="/"title="ClickGWAS Forum"><img src="/images/logo/clickgwas_logo.png"alt="ClickGWAS Forum"></a><span class="tag-line" id="headertitle"></span></div><!--Start of Main Navigation--><nav class="main-nav"><div class="menu-top-menu-container"><ul id="menu-top-menu"class="clearfix"><li><a href="/">Home</a></li><li><a href="#">Articles List</a></li><li><a href="#">FAQs</a></li><li><a href="http://www.clickgwas.org/about/">Contact</a></li><li><a id="login">Login</a></li></ul></div></nav><!--End of Main Navigation--></div></header>');
//$(".header-wrapper").append('<header><div class="container"><div class="logo-container"><!--Website Logo--><a href="/"title="ClickGWAS Forum"><img src="/images/logo/clickgwas_logo.png"alt="ClickGWAS Forum"></a><span class="tag-line" id="headertitle"></span></div><!--Start of Main Navigation--><nav class="main-nav"><div class="menu-top-menu-container"><ul id="menu-top-menu"class="clearfix"><li><a href="/">Home</a></li><li><a href="/Articleslist/">Articles List</a></li><li><a href="/FAQs/">FAQs</a></li><li><a href="http://www.clickgwas.org/about/">Contact</a></li><li><a id="login">Login</a></li></ul></div></nav><!--End of Main Navigation--></div></header>');
$(".search-area-wrapper").empty();
$(".search-area-wrapper").append('<div class="search-area container"><h3 class="search-header">Search for what you need!</h3><p class="search-tag-line">If you have any questions you can ask below or enter what you are looking for!</p><form id="search-form"class="search-form clearfix"method="get"action="/search/"autocomplete="off"target="_blank"><input class="search-term required"type="text"id="s"name="key"placeholder="Find out what you need here"title="Please enter a search term!"/><input class="search-btn"type="submit"value="Search"disabled="disabled"/><div id="search-error-container"></div></form></div>');
//$(".search-area-wrapper").append('<div class="search-area container"><h3 class="search-header">Search for what you need!</h3><p class="search-tag-line">If you have any questions you can ask below or enter what you are looking for!</p><form id="search-form"class="search-form clearfix"method="get"action="/search/"autocomplete="off"target="_blank"><input class="search-term required"type="text"id="s"name="key"placeholder="Find out what you need here"title="Please enter a search term!"/><input class="search-btn"type="submit"value="Search"/><div id="search-error-container"></div></form></div>');
$("#footer").empty();
$("#footer").append('<div class="row"><div class="span3"><section class="widget"><h3 class="title">Forum of ClickGWAS</h3><div class="textwidget"><p>You can ask questions in the forum,publish articles or share ideas。</p><p>ClickGWAS\'s forum is...</p></div></section></div><div class="span3"><section class="widget"><h3 class="title">Categories</h3><ul id="categories"></ul></section></div><div class="span3"><section class="widget"><h3 class="title">Latest News</h3><ul id="latest-news"></ul></section></div><div class="span3"><section class="widget"><h3 class="title">Links</h3><ul><li><a href="http://www.tju.edu.cn/">Tianjin University</a></li><li><a href="http://www.utsouthwestern.edu/">UT Southwestern</a></li><li><a href="http://www.clickgwas.org/">HOME&nbsp;|&nbsp;ClickGWAS</a></li><li><a href="http://analysis.clickgwas.org/">Analysis&nbsp;|&nbsp;ClickGWAS</a></li></ul></section></div></div>');
$("#footer-bottom-wrapper").empty();
$("#footer-bottom-wrapper").append('<div id="footer-bottom"class="container"><div class="row"><div class="span6"><p class="copyright">Copyright&nbsp;©&nbsp;2017.&nbsp;All&nbsp;Rights&nbsp;Reserved&nbsp;by&nbsp;<a href="http://www.clickgwas.org">clickgwas.org</a></p></div><div class="span6"></div></div></div>');

function getInfo() {
	$.post(__API__ + "getInfo", {
		token: __TOKEN__,
	}, function(userdata) {
		var userinfo = eval("(" + userdata + ")");
		if(userinfo.isLogin == 1) {
			addCookie("token", userinfo.data.token, "");
			$("#login").text(userinfo.data.userName);
			$("#login").addClass("islogin");
			__USERINFO__ = userinfo.data;
		}
	});
}