//Html结构(#content>>.box>>.img)//--xiaoK

//首次加载(传入大盒、小盒)
window.onload = () => waterFull('content','box');
//主函数()
var waterFull = (parent,children) => {
	var allMains = document.getElementById(parent);//获取id为content的元素
	var allBoxs = getByClass(allMains,children);//获取class为box的元素
	var oneBoxWidth = allBoxs[0].offsetWidth;//获取对象为box的单个宽度//此处202
	var place = Math.floor(document.documentElement.clientWidth/oneBoxWidth);//每行可放置的个数//此处7
	content.style.cssText = 'width:'+ oneBoxWidth * place + 'px;margin: 0 auto';//设置main的宽度并居中
	var arrHeight = [];//装每排高度
	for(var i = 0;i < allBoxs.length; i++)
	if(i < place)
	arrHeight.push(allBoxs[i].offsetHeight);//第一行高度的数字
	else{//第二行开始
		var minHeight = Math.min.apply(null,arrHeight);//最小高度apply调用Math.min方法返回第一行数组最小高度
		var minIndex = getMinHeightIndex(arrHeight,minHeight);//每行最小高度在第几个位置(第一行所有高度,最小高度)
		//第二行开始放置
		allBoxs[i].style.position = 'absolute';
		allBoxs[i].style.top = minHeight + 'px';
		allBoxs[i].style.left = minIndex * oneBoxWidth + 'px';
		
		arrHeight[minIndex] += allBoxs[i].offsetHeight;//这个位置算上高度
	}
}
//用来获取所有class为box的元素(获取所有标签>>拿标签名数组里面的className与传入的box对比)
var getByClass = (parent,className) => {
	var boxArr = new Array();
	var allElement = parent.getElementsByTagName('*');
	for(var i = 0; i < allElement.length; i++){
		if(allElement[i].className == className)
		boxArr.push(allElement[i]);
	}
	return boxArr;
}
//获取当前最小值的下标
var getMinHeightIndex = (array,min) =>{
	for(var i in array){
		if(array[i] == min)
		return i;
	}
}
