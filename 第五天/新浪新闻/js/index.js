/**
 * Created by DELL on 2018/9/2.
 */
var $oul =$('.ulBox'),
$listBox = $ ('.listBox');
/*
实现 轮播图
* */
function bannerFn() {
    var mySwiper =new Swiper('.bannerBox',{
        autoplay:{
            //用户操作后 仍然自动播放
            disableOnInteraction:true,
//一个图 再当前窗口的停留时间
            deplay:1000,
             autoplay:false
        },
        loop:true,//是否无缝滚动
        pagination: {//分页器
            el: '.pageBox',//分页器盒子
            type: 'fraction',//分页器的类型  1/2
            currentClass:'currentPage',  //变动数字的盒子的类名
            totalClass:'totalpage'    //总共数字 盒子的类名；
            //type: 'fraction',
            //type : 'progressbar',
            //type : 'custom',
        },

    });
}

/*
* 获取数据
* */
/*$.ajax({
    type:'post',//请求的方式  post没缓存   get有缓存
    url:'./data/banner.json',//请求路径
    data:{t:123,q:234},//发送给后台的数据
    success:function (d) {
      //请求成功后执行的函数
        console.log(d);
        giveHtml(d);//把数据放页面上
    },
    error:function () {
     //请求失败后执行的函数
    }
});*/
//把数据转成页面可见的元素
function giveHtml(data) {
    data =data ||[];
    var str='';//用来存 拼接好的 结构 字符串
    data.forEach((item)=>{
        str +=`<li class="swiper-slide">
                    <a href="##">
                        <img src=${item.img} alt="">
                        <div>${item.title}</div>
                    </a>
                </li>`
    });
    $oul.html(str);
   // bannerFn();
}
//先请求数据  再把数据放页面上   在执行轮播图函数



//promise 写法
var p =new Promise(function (resolve,reject) {
    $.ajax({
        type:'get',
        url:'./data/banner.json',
        success:function (data) {
           resolve(data)
        },
        error:function (res) {
          reject(res)
        }
    })
});
p.then(function (data) {
 //第一个参数是promise执行的成功函数
    //console.log(data);
    giveHtml(data);
    return data;
}).then(function (data) {
    bannerFn();
    //第二个参数  是promise执行的失败函数
}).catch(function (res) {
    console.log(res)
});
/*
* 新闻列表部分
*
* */

var listPro =new Promise(function (resolve,reject) {
    $.ajax({
        type:'post',
        url:'./data/list.json',
        data:{t:1},
        success:function (data) {
            resolve(data)
        },
        error:function (res) {
            reject(res)
        }
    })
});
//把数据放到列表中
function giveListHtml(data) {
    data =data || [];
    var str='';
    data.forEach((item)=>{
        switch (item.type){
            case 0: //  第一种无图的结构
                str+=`<a href="##">
            <div class="text_box">
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>`
                break;
            case 1:
                str+=`  <a href="##">
            <div class="img_box">
                <img src="${item.img}" alt="">
            </div>
            <div>
                <p>${item.title}</p>
                <div class="comment_box">
                    <em class="">
                        <span class="">${item.num}</span>
                        <span class="icon_com"></span>
                    </em>
                </div>
            </div>
        </a>
        </a>`
                break;
            case 3:
                str+=`<a  class="three_box" href="">
                <p>${item.title}</p>
                <div class="three_pic">
                <div><img src="${item.img}[0]" alt=""></div>
                <div><img src="${item.img}[1]" alt="">></div>
                <div> <img src="${item.img}[2]" alt=""></div>

                <div class="comment_box">
                <em class="">
                <span class="">${item.num}</span>
                <span class="icon_com"></span>
                </em>
                </div>
                </div>
                </a> `
        }
    });
    $listBox.html(str);
}
listPro.then(function (data) {
    giveListHtml(data);
});