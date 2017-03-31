document.write('<div id="loading"><div class="loading"><div class="wrap"id="wrap1"><div class="part"id="part1"></div></div><div class="wrap"id="wrap2"><div class="part"id="part2"></div></div><div class="wrap"id="wrap3"><div class="part"id="part3"></div></div><div class="wrap"id="wrap4"><div class="part"id="part4"></div></div></div></div>');
document.write('<div class="page_header"><div class="container"><div class="row"><div class="col-md-0 col-sm-1"></div><div class="col-md-12 col-sm-10"><div class="page-header"><h1>宋凯——研究生导师</h1><h4>工学博士，副教授，天津大学化工学院过程装备与控制工程系和生物工程系硕士导师</h4></div></div><div class="col-md-0 col-sm-1"></div></div></div></div>');
window.onload=function(){$('body').addClass('loaded');setTimeout(function(){$('#loading').fadeOut(500);$("body").attr("onmousewheel","return true;")},700)};

var siteurl = window.location.href;
$.post('/site.push.php/index.php',{
	url: siteurl
},function(data){});