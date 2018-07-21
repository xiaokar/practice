window.onload = function(){
	//获取第一个
	var box = document.querySelector(".box");
	var pre = document.querySelector(".pre");
	var next = document.querySelector(".next");

	//点击上一个
	function pre_pic(){
	var newLeft;												//位置对照表:
	if(box.style.left === "0px")								//<img src="img/5.jpg"/><!-- 0-->			
	newLeft = -2400;											//<img src="img/1.jpg"/>-<!-- -600-->
	else														//<img src="img/2.jpg"/><!-- -1200-->
	newLeft = parseInt(box.style.left) + 600;					//<img src="img/3.jpg"/><!-- -1800-->
																//<img src="img/4.jpg"/><!-- -2400-->
	box.style.left = newLeft +"px";								//<img src="img/5.jpg"/><!-- -3000-->
	//改变dot的index												//<img src="img/1.jpg"/><!-- -3600-->
	index--;
	if(index < 0)
	index = 4;
	
	showCurrentDot();
}
	pre.onclick = function(){//点击调用
		pre_pic();
	}
	//点击下一个
	function next_pic(){
	var newLeft;
	if(box.style.left === "-3600px")
	newLeft = -1200;
	else
	newLeft = parseInt(box.style.left) - 600;
	
	box.style.left = newLeft +"px";
	//改变dot的index
	index++;
	if(index > 4)
	index = 0;
	
	showCurrentDot();
}
	next.onclick = function(){//点击调用
		next_pic();
	}
	//自动播放
	var timer =null;
	function autoPlay() {
	timer = setInterval(function(){
		next_pic(box);
	},1500);
}
	autoPlay(timer);
	//到了这一步已经基本成型~~
	//鼠标停留
	var container = document.querySelector(".container");
	container.onmouseenter = function() {
	 clearInterval(timer);	
	}
	container.onmouseleave = function() {
		autoPlay();
	}
	//底部位置小圆点dot的index
	var index = 0;//当前位置
	var dots = document.getElementsByTagName("span");//所有[]
	function showCurrentDot(){
		for(var i = 0; i < dots.length; i++){//遍历清空所有
			dots[i].className = "";
		}
		dots[index].className = "on";//改变颜色
	}
	showCurrentDot();//初始调用
	//dot点击跳转(index对应left值)
	for(var i = 0; i < dots.length; i++){//闭包
		(function(i){
			dots[i].onclick = function(){//点击圆点
				var dis = index - i;//小减大=负距离(-left),大减小=正距离(+left)
				//解决非正常的1-5span,因加入了首位两个span
				//和使用prev和next相同，在最开始的照片5和最终的照片1在使用时会出现问题，导致符号和位数的出错，做相应地处理即可:
				if(index == 4 && parseInt(box.style.left) != -3000)//第五张&&!=第六个span(即0)
				dis = dis - 5;//非中间的1-5span,向后移
				if(index == 0 && parseInt(box.style.left) != -600)//第一张&&!=第二个span(即-3600)
				dis = dis + 5;//非中间的1-5span,向前移
				
				box.style.left = (parseInt(box.style.left) + dis * 600) + "px";//当前left加计算后的
				index = i;//改变当前红色位置
				showCurrentDot()
			}
		})(i);
	}
}



