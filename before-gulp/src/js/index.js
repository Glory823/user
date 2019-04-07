require.config({
	paths: {
		"mui": "./libs/mui.min"
	}
})
require(["mui"], (mui) => {
	const list = document.querySelector(".list");

	function init() {
		ajaxFind();
		delClick();
		findClick();
		addBtn();
		searchBtn();
	}

	//请求数据
	function ajaxFind() {
		mui.ajax('api/findAll', {
			dataType: 'json', //服务器返回json格式数据
			type: 'get', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			success: function(res) {
				list.innerHTML = res.data.map(item => {
					return `<li class="mui-table-view-cell">
								${item.name}
								<button type="button" class="mui-btn mui-btn-primary look" data-id="${item._id}">查看</button>
								<button type="button" class="mui-btn mui-btn-danger del"  data-id="${item._id}">删除</button>
							</li>`
				}).join("");
			}
		});

	}


	//点击删除
	function delClick() {
		mui('.list').on('tap', '.del', function(e) {
			const id = this.getAttribute("data-id");
			mui.confirm('确认删除吗?', '警告', ['取消', '确认'], (e) => {
				if (e.index) {
					mui.ajax('api/remove', {
						data: {
							id: id
						},
						dataType: 'json', //服务器返回json格式数据
						type: 'post', //HTTP请求类型
						timeout: 10000, //超时时间设置为10秒；
						success: (data) => {
							mui.alert(data.msg, '提示', '确定', (e) => {
								this.parentNode.remove();
							}, 'div')
						}
					});
				}
			})
		});
	}


	//点击查看
	function findClick() {
		mui('.list').on('tap', '.look', function(e) {
			const id = this.getAttribute("data-id");
			window.location.href = "../page/detail.html?id=" + id;
		});
	}


	//点击添加按钮
	function addBtn() {
		var btn = document.querySelector(".addBtn");
		//监听点击事件
		btn.addEventListener("tap", function() {
			window.location.href = "../page/add.html";
			// console.log(list)
			ajaxFind();
		});
	}


	//模糊搜索
	function searchBtn() {
		const search = document.querySelector(".search");
		var timer = null;
		search.addEventListener("input", function() {
			var that = this;
			clearTimeout(timer);
			timer = setTimeout(function() {
				mui.ajax('/api/findSearch', {
					data: {
						name: that.value
					},
					dataType: 'json', //服务器返回json格式数据
					type: 'post', //HTTP请求类型
					timeout: 10000, //超时时间设置为10秒；
					success: function(res) {
						list.innerHTML = res.data.map(item => {
							return `<li class="mui-table-view-cell">
											${item.name}
											<button type="button" class="mui-btn mui-btn-primary look" data-id="${item._id}">查看</button>
											<button type="button" class="mui-btn mui-btn-danger del"  data-id="${item._id}">删除</button>
										</li>`
						}).join("");

					}
				});
			}, 300)
		});
	}
	

	init();
})
