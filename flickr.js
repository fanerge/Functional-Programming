requirejs.config({
  paths: {
    ramda: 'https://cdnjs.cloudflare.com/ajax/libs/ramda/0.13.0/ramda.min',
    jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min'
  }
});

require([
    'ramda',
    'jquery'
  ],
  function (_, $) {
	// 实现prop函数
	/*var prop = _.curry(function (prop, object) {
		return object[prop];
	});*/
	// 用于调试
    var trace = _.curry(function(tag, x) {
      console.log(tag, x);
      return x;
    });
    // app goes here
	
	var Impure = {
		// 2向 flickr 发送 api 请求
		getJSON: _.curry(function (callback, url) {
			$.getJSON(url, callback);
		}),
		// 4把图片放到屏幕上
		setHtml: _.curry(function (sel, html) {
			$(sel).html(html);
		})	
	};
	
	var mediaUrl = _.compose(_.prop('m'), _.prop('media'));
	var srcs = _.compose(_.map(mediaUrl), _.prop('items'));
	var img = function (url) {
		return $('<img />', {src: url});
	};
	var mediaToImg = _.compose(img, mediaUrl)
	var images = _.compose(_.map(mediaToImg), _.prop('items'));
	var renderImages = _.compose(Impure.setHtml('body'), images);
	// 1根据特定搜索关键字构造 url
	var url = function (term) {
		return 'https://api.flickr.com/services/feeds/photos_public.gne?tags=' + term + '&format=json&jsoncallback=?';
	};
	var app = _.compose(Impure.getJSON(renderImages), url);
	app("cats");
});
































