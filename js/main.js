//根据时间改变背景
let bgarr = ['url(./img/01.jpg)', 'url(./img/02.jpg)', 'url(./img/03.jpg)']; //背景图片数组

//图标对象
let wobj = {
	100: '#icon-taiyang',
	101: '#icon-duoyun',
	102: '#icon-duoyun',
	103: '#icon-tubiaozhizuomoban-',
	104: '#icon-tubiaozhizuomoban-',
	200: '#icon-youfeng',
	201: '#icon-youfeng',
	202: '#icon-youfeng',
	203: '#icon-youfeng',
	204: '#icon-youfeng',
	205: '#icon-youfeng',
	206: '#icon-youfeng',
	207: '#icon-youfeng',
	300: '#icon-yutian',
	301: '#icon-yutian',
	302: '#icon-yutian',
	303: '#icon-yutian',
	304: '#icon-yutian',
	305: '#icon-xiaoyu',
	306: '#icon-zhongyu',
	307: '#icon-dayu',
	308: '#icon-dayu',
	309: '#icon-xiaoyu',
	310: '#icon-dayu',
	311: '#icon-dayu',
	312: '#icon-dayu',
	399: '#icon-dayu',
	400: '#icon-xiaoxue',
	401: '#icon-zhongxue',
	402: '#icon-daxue',
	403: '#icon-daxue',
	404: '#icon-daxue',
	405: '#icon-daxue',
	406: '#icon-daxue',
	407: '#icon-daxue',
	408: '#icon-daxue',
	409: '#icon-daxue',
	410: '#icon-daxue',
	499: '#icon-daxue',
	unk: '#icon-weizhi'
}

// 根据时间修改背景
let stime=setInterval(function() {
	
	dstime();
	// console.log(citys)
}, 1000)

function dstime(){
	let thours = new Date().getHours() //先获取现在的时间
	let bgs = null
	if (thours < 12) {
		bgs = bgarr[0]
	} else if (thours < 18) {
		bgs = bgarr[1]
	} else if (thours > 18) {
		bgs = bgarr[2]
	}
	$('.bg').css({
		'background-image': bgs
	})
}

// console.log($('.prompt-text')[0])
//根据移动端大小更改rem
function setRem() {
	//iphone6设计html字体大小为100px
	let baseScreen = 375;
	let baseSize = 100;

	//获取屏幕大小
	let screenWidth = screen.width;

	let fontSize = 0;

	
		fontSize = screenWidth / baseScreen * 100;
	

	//获取html元素
	let html = document.getElementsByTagName('html')[0];

	html.style.fontSize = fontSize + 'px';
	
	console.log('se=',$('section').height()) 
	console.log('box=',$('.box').height()) 
	if($('section').height()+$('footer').height()>$('.box').height()){
		console.log(111)
		$('.box').css({
			height:'auto'
		})
	}else{
		$('.box').css({
			height:'100%'
		})
	}
}

setRem();

let timers = [];
window.onresize = function() {

	let timer = setTimeout(() => {

		for (let i = 1; i < timers.length; i++) {
			clearTimeout(timers[i]);
		}

		timers = [];

		setRem();

	}, 600)

	timers.push(timer);

}

//获取地理位置
function Crumb(fn){
	$.ajax({
		type:'get',
		url:'https://apis.map.qq.com/ws/location/v1/ip',
		data:{
			key:'S6ABZ-CVACP-TD2DE-V65YN-6QK7S-VYF2D',
			output:'jsonp'
		},
		dataType: 'jsonp',
		
		success(data) {
			fn(data)
		},
		
	})
	
}


//获取api数据
// 获取天气数据
function weather(city, n, fn) {
	$.ajax({
		type: 'get',
		url: 'https://api.heweather.net/s6/weather/' + n,
		data: {
			location: city,
			key: 'be01b5edd1bf4c18b1941bb51f6ae1ed'
		},
		success(data) {
			// let d=JSON.parse(data);
			fn(data)
		}
	})
}

// 总方法封装
function Wea(city) {
	//获取基本天气信息
	weather(city, 'now', function(data) {
		$('.cityname').text(data.HeWeather6[0].basic.location); //更改城市名字

		// console.log(data.HeWeather6[0].basic.location)
		let w = data.HeWeather6[0].now; //拿到天气信息
		$('.fj').text(w.wind_sc + '级') //风力
		$('.fname').text(w.wind_dir) //风名
		$('.njd').text(w.vis + 'km') //能见度
		$('.shidu').text(w.hum)

		// console.log(w)
		$('.btem').text(w.tmp + '°'); //大温度
		$('.mtem').text(w.cond_txt + ' ' + w.tmp + '~' + w.fl); //大温度下面的小温度
	});

	//获取tab选项卡逐日天气信息
	weather(city, 'forecast', function(data) {
		let tdata = data.HeWeather6[0].daily_forecast;
		// console.log(tdata)
		$('.tab1 li').each(function(i, v) {
			$(this).children('.time').text(tdata[i].date.slice(5))
			$(this).children('.report').text(tdata[i].cond_txt_d)
			$(this).children('.tems').text(tdata[i].tmp_max + '°')
			// console.log(tdata[i].date)

			if (wobj[tdata[i].cond_code_d]) {
				// console.log(wobj[tdata[i].cond_code_d])
				// console.log($(this).children('.img').children().children()[0])
				$(this).children('.img').children().children().attr('xlink:href', wobj[tdata[i].cond_code_d])
			} else {
				$(this).children('.img').children().children().attr('xlink:href', wobj.unk)
			}
		})
	})
	//获取tab选项卡逐时天气信息

	weather(city, 'hourly', function(data) {
		let tdata = data.HeWeather6[0].hourly;
		// console.log(tdata)
		$('.tab2 li').each(function(i, v) {
			$(this).children('.time').text(tdata[i].time.slice(11))
			$(this).children('.report').text(tdata[i].cond_txt)
			$(this).children('.tems').text(tdata[i].tmp + '°')
			// console.log(tdata[i].date)

			if (wobj[tdata[i].cond_code]) {
				// console.log(wobj[tdata[i].cond_code])
				// console.log($(this).children('.img').children().children()[0])
				$(this).children('.img').children().children().attr('xlink:href', wobj[tdata[i].cond_code])
			} else {
				$(this).children('.img').children().children().attr('xlink:href', wobj.unk)
			}
		})
	})
}

//根据地理位置定位
Crumb(function(data){
	let dcity=data.result.ad_info.city;
	Wea(pinyin.getFullChars(dcity).toLowerCase())
})



//tab选项卡
$('.ftab>li').click(function() {
	let index = $(this).index()
	$('.ftab .item').animate({
		left: $(this).position().left
	});
	$('.dayweater').eq(index).stop(true, true).slideDown(300).siblings('.dayweater').stop(true, true).slideUp(300);

})

//弹出框点击
$('#demo4').click(function() {
	jqalert({
		title: '更改城市',
		prompt: '输入城市名字',
		yestext: '确定',
		notext: '取消',
		yesfn: function() {
			jqtoast('修改完成');
			let value = $('.prompt-text').val();
			value = pinyin.getFullChars(value).toLowerCase()
			Wea(value)
		},
		nofn: function() {
			jqtoast('你点击了取消');
		}
	})

})


// citys=$('.prompt-text').val();
let bzarr=['url(./img/2.jpg)', 'url(./img/3.jpg)', 'url(./img/1.jpg)']

for(let k in bzarr){
	$('.inps').eq(k).data('img',bzarr[k])
}

//主题更换
$('#btn').click(function(){
	$('.sw').slideDown(500)
})

$('#ebtn').click(function(){
	$('.sw').slideUp(500)
})

$('#date').on('input',function(){
	
	console.log($(this).is(':checked'))
	if($(this).is(':checked')){
		stime=setInterval(function() {
			$('.inps').prop('checked',false)
			dstime();
			// console.log(citys)
		}, 1000)
	}else{
		clearInterval(stime);
		stime=null
	}
	console.log(stime)
})


$('.inps').on('input',function(){
	$('#date').prop('checked',false)
	

	
	// console.log($(this).parent().siblings('li').children('.inps').attr('checked',false))
	
	// console.log($(this).is(':checked'));
	if($(this).is(':checked')){
		clearInterval(stime);
			$(this).parent().siblings('li').children('.inps').prop('checked',false)
		$('.bg').css({
			'background-image': $(this).data('img')
		})
		
	}
})