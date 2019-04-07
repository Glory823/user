require.config({
    paths: {
        "mui": "./libs/mui.min"
    }
})

require(["mui"], () => {
    const id = window.location.search.slice(4);
	var obj;
    function init() {
        getRander();
        returnBtn();
        updadeBtn();
        trueBtn();
        qxBtn();
    }

    //ajax获取数据
    function getRander() {
        mui.ajax('/api/findGet', {
            data: {
                id: id
            },
            dataType: 'json', //服务器返回json格式数据
            type: 'get', //HTTP请求类型
            timeout: 10000, //超时时间设置为10秒；
            success: function(data) {
				obj = data.data[0];//保存数据
                document.querySelector(".olList").innerHTML += data.data.map(item => {
                    return `<li><input type="text" value="${item.name}" disabled></li>
							<li><input type="text" value="${item.age}" disabled></li>
							<li><input type="text" value="${item.sex}" disabled></li>
							<li><input type="text" value="${item.tel}" disabled></li>
							<li><input type="text" value="${item.address}" disabled></li>`;
                })
            }
        });
		
    }

    //点击返回按钮
    function returnBtn() {
        mui('.footer').on('tap', '.retBtn', function(e) {
            window.location.href = "../index.html";
        });
    }


    //点击修改按钮
    function updadeBtn() {
        mui('.footer').on('tap', '.updadeBtn', function(e) {
            const lis = [...document.querySelectorAll(".olList li input")];
            lis.forEach(item => {
                item.disabled = false;
            })
            this.innerHTML = "确定";
            this.className = "trueBtn";
            this.nextElementSibling.innerHTML = "取消";
            this.nextElementSibling.className = "qxBtn";
        });
    }

    //点击确定按钮
    function trueBtn() {
        mui('.footer').on('tap', '.trueBtn', function(e) {
			const lis = [...document.querySelectorAll(".olList li input")];
			mui.confirm('确认修改吗?','警告',['取消','确认'],(e) => {
				if(e.index){
					 mui.ajax('/api/update', {
						data: {
							id: id,
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
				}else{
					lis[0].value = obj.name;
					lis[1].value = obj.age;
					lis[2].value = obj.sex;
					lis[3].value = obj.tel;
					lis[4].value = obj.address;
				}
			})
        })
    }

    //点击取消
    function qxBtn() {
        mui('.footer').on('tap', '.qxBtn', function(e) {
            const lis = [...document.querySelectorAll(".olList li input")];
            lis.forEach(item => {
                item.disabled = true;
            })
            this.innerHTML = "返回";
            this.className = "retBtn";
            this.previousElementSibling.innerHTML = "修改";
            this.previousElementSibling.className = "updadeBtn";
			
			lis[0].value = obj.name;
			lis[1].value = obj.age;
			lis[2].value = obj.sex;
			lis[3].value = obj.tel;
			lis[4].value = obj.address;
        });
    }


    init();
})