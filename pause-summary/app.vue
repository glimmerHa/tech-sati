<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { inWeixin } from '@/utils/utils';
import Sensors from '@/track/activityObnSensors';
export default {
  name: 'Index',
  data() {
    return {
        
    }
  },
  mounted(){
      if(inWeixin()){
        this.getWxConfig({
            title: '邀请有礼 邀好友购课兑豪礼',
            desc: '多邀多得，上不封顶，快来邀请好友吧!',
            link: window.location.href,
            imgUrl: 'https://rc.yamiabc.com/monkeyABC/h5/www/source/share_logo.png'
        });
      };
      Sensors.SensorsLog.init();
        
  },
  methods:{
      async getWxConfig(configObj) {
        try {
            //定义参数对象
            let params = {url: encodeURIComponent(window.location.href.split('#')[0])}
            let res = await this.$api.wxConfig(params);
            if(res.code==200){
                let data = res.data;
                console.log('wxData',data);
                // 微信配置
                wx.config({
                    debug: false,
                    appId: data.appId,
                    timestamp: data.timestamp,
                    nonceStr: data.nonceStr,
                    signature: data.signature,
                    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showMenuItems'] // 功能列表，我们要使用JS-SDK的什么功能
                });
                wx.ready(function () {
                    wx.checkJsApi({
                        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'showMenuItems'],
                        success: function () {
                        }
                    });

                    wx.onMenuShareTimeline({
                        title: configObj.title,
                        link: configObj.link,
                        imgUrl: configObj.imgUrl,
                        type: 'link',
                        success: function () {
                        }
                    });
                    wx.onMenuShareAppMessage({
                        title: configObj.title,
                        desc: configObj.desc,
                        link: configObj.link,
                        imgUrl: configObj.imgUrl,
                        type: 'link',
                        dataUrl: '',
                        success: function () {
                        }
                    });
                });

                // this.status = res.data.status;
                
            }else{
                // console.log(res.phone)   
            }
        } catch (e) {
            console.log('err',e)
            this.errorData = e
        }
    },
  }
}
</script>
<style lang="scss">
    .loading_box{
        position: fixed;
        top: 300px;
        left: 350px;
        z-index: 30;
    }
</style>
