require.config({
	paths: {
		"mui": "./libs/mui.min"
	}
})

require(["mui"], () => {
	var obj;

	function init() {
		tureBtn();
		qxBtn();
	}

	//点击确定
	function tureBtn() {
		mui('.footer').on('tap', '.tureBtn', function(e) {
			const lis = [...document.querySelectorAll(".olList li input")];
			mui.confirm('确认添加吗?', '警告', ['取消', '确认'], (e) => {
				if (e.index) {
					mui.ajax('/api/insert', {
						data: {
							name: lis[0].value,
							age: lis[1].value,
							sex: lis[2].value,
							tel: lis[3].value,
							address: lis[4].value
						},
						dataType: 'json', //服务器返回json格式数据
						type: 'post', //HTTP请求类型
						timeout: 10000, //超时时间设置为10秒；
						success: function(data) {
							mui.alert(data.msg, "提示", '确定', function(e) {
								window.location.href = "../index.html";
							})
						}
					});
				}
			})
		});
	}


	//点击取消
	function qxBtn() {
		mui('.footer').on('tap', '.qxBtn', function(e) {
			window.location.href = "../index.html";
		})
	}
	init();
})
