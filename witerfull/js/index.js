//html结构main>>box>>pic>>img
//加载窗口传入大盒子和小盒子
window.onload = function(){
    waterFull('main','box');
}
//主函数
function waterFull(parent,children){
	//获取id为main的盒子
    var oParent = document.getElementById(parent);
	//调用方法传入main盒子和所有box盒子,执行方法后得到所有box集合
    var oBoxs = getByClass(oParent,children);
    //计算整个页面显示的列数
    //宽度一样,只需拿第一个
    var oBoxW = oBoxs[0].offsetWidth;
    //获取接近屏幕元素内部宽除以一个box宽的整数(一行能装几个)
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main的宽度，并且居中
    oParent.style.cssText = 'width:'+oBoxW * cols +'px; margin: 0 auto';
    //找出高度最小的图片，将下一个图片放在下面
    //定义一个数组，存放每一列的高度，初始化存的是第一行的所有列的高度
    var arrH = [];//第一行的高度数字
    for(var i = 0; i< oBoxs.length ; i++){
        if(i < cols){
            arrH.push(oBoxs[i].offsetHeight);//第一行高度的数字
        }
        else{
            var minH = Math.min.apply(null,arrH);//最小高度,apply待解决
            var minIndex = getMinhIndex(arrH,minH);//每行第几个位置
            
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top= minH + 'px';
            oBoxs[i].style.left = minIndex * oBoxW + 'px'; 

            arrH[minIndex] += oBoxs[i].offsetHeight; //这个位置算上高度
        }
    }
}
//用来获取所有class为box的元素
function getByClass(parent,className){	
    var boxArr = new Array();
	//main大盒子下的所有标签名
    oElement = parent.getElementsByTagName('*');
    console.log(oElement);
    //所有标签的class的第几个和box名字一样时
    for (var i = 0; i <oElement.length; i++) {
        if(oElement[i].className == className){
            boxArr.push(oElement[i]);
        }
    };
    return boxArr;
}
//获取当前最小值得下标
function getMinhIndex(array,min){//(第一行所有数字,一行中最小数字)判断返回每行中的位置
    for(var i in array){
        if(array[i] == min)
            return i;
    }
}