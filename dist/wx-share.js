
$(function(){
    var shareInfo = {
        title: '美年大健康',
        desc:'描述',
        link: '当前分享的URL',
        imgUrl: '图片的URL',
    }
    var url = '';
    if(url){
        $.ajax({
            url: '#',
            type:"GET",
            success: function(res){
                if(res && res.data){
                    initShare(res.data);
                }
            },
            error: function(e){
                console.log('接口调用失败', e);
            }
        })
    }
    
    function initShare(data){
        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature,// 必填，签名
            jsApiList: [
                'updateAppMessageShareData',
                'updateTimelineShareData'
            ]
        });

        wx.ready(function(){
            // “分享给朋友”及“分享到QQ”
            wx.updateAppMessageShareData({ 
                title: shareInfo.title,
                desc: shareInfo.desc,
                link: shareInfo.link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareInfo.imgUrl
            }); 

            // “分享到朋友圈”及“分享到QQ空间”
            wx.updateTimelineShareData({ 
                title: shareInfo.title,
                link: shareInfo.link,
                imgUrl: shareInfo.imgUrl
            });

        });
    }
});
