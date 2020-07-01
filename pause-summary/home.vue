<template>
  <div class="home">
    <div class="home_hd">
        <img class="hd_banner" :src="homeHdUrl">
        <img class="btn_show_rules" :src="homeRulesUrl" @click="showRules">
    </div>
    <div class="home_guide">
        <div class="home_title">
            <span>邀请流程</span>
        </div>
        <ul class="guide_box">
            <li class="li_tag">
                <img class="icon_home_poster" src="@/assets/images/activity-obn/icon_home_poster.png" alt="">
                <p>分享海报</p>
            </li>
            <li class="li_tag">
                <img class="icon_home_class" src="@/assets/images/activity-obn/icon_home_class.png" alt="">
                <p>好友购课</p>
            </li>
            <li>
                <img class="icon_home_gift" src="@/assets/images/activity-obn/icon_home_gift.png" alt="">
                <p>兑豪礼</p>
            </li>
        </ul>
    </div>
    <div class="home_diamond">
        <div class="home_title">
            <span>我的奖励</span>
        </div>
        <ul class="diamond_box">
            <li>
                <p class="num">{{diamondData.cumulative}}</p>
                <p class="name">累计获得宝石</p>
            </li>
            <li>
                <p class="num">{{diamondData.upcoming}}</p>
                <p class="name">即将获得宝石</p>
            </li>
            <li>
                <p class="num">{{diamondData.available}}</p>
                <p class="name">剩余可用宝石</p>
            </li>
        </ul>
        <div class="btn_home_diamond"  @click="toList">查看奖励详情</div>
    </div>
    <div class="home_goods">
        <div class="home_title">
            <span>豪礼兑换</span>
        </div>
        <div class="goods_box_wrap" ref="goods_box_wrap">
            <ul class="goods_box">
                <li :class="{is_empty:item.stock==0?true:false}" v-for="(item,$index) in goodsArr" :key="$index" @click="toProduct(item.stock,item.id,item)"> 
                    <div class="goods_img_wrap">
                        <img :οnerrοr="errorGoodsPhoto" class="goods_img" :src="item.headImg" @click="toProduct(item.stock)">
                    </div>
                    <div class="goods_name">{{item.name}}</div>
                    <div class="goods_num">
                        <div class="num_price">
                            <span :class="{icon_diamond:true,none:item.stock==0}"></span>
                            {{item.price}}
                        </div>
                        <div class="num_cost">
                            <span>已兑换</span>{{item.cast}}
                        </div>
                    </div>
                </li>
            </ul>
            <div class="loading-wrapper"></div>
        </div>
    </div>
    <div class="btn_home_invite_wrap">
        <div :class="{btn_home_invite: true,disabled: isOpen==1?false:true}" @click="showPost">
            {{isOpen==1?'立即邀请好友购课':'活动已结束，敬请期待下期活动'}} 
        </div>
    </div>
    <van-loading class="loading_box" size="45" v-if="showLoading" type="spinner" color="#1989fa" />
    <rules-info @hideRulesBox="hideRules" :showRulesBox="showRulesInfo"></rules-info>
    <poster-swiper :posterArr="posterArr" @hidePosterBox="hidePost" :showPosterBox="showPosterInfo"></poster-swiper>
  </div>
</template>
<script>
import RulesInfo from '../components/rules-info'
import PosterSwiper from '../components/poster-swiper'
import BScroll from 'better-scroll'
import {getH5Token} from '@/network/modules/login/h5login'
import { getQuery, inWeixin } from '@/utils/utils';
import Sensors from '@/track/activityObnSensors';
export default {
  name: 'Index',
  components:{
      RulesInfo,
      PosterSwiper
  },
  data() {
    return {
        showRulesInfo: false,
        showPosterInfo: false,
        homeHdUrl: require('@/assets/images/activity-obn/home_hd_1.png'),
        homeRulesUrl: require('@/assets/images/activity-obn/home_rules.png'),
        goodsArr:[    // 商品列表
            
        ],
        goodsTotal: 8,
        diamondData:{
            "cumulative": 0, // int32 累计获取宝石数量
            "upcoming": 0,   // int32 即将入账宝石数量
            "available": 0  // int32 可用宝石数量
        },
        errorGoodsPhoto: require('@/assets/images/activity-obn/default_goods.png'),
        posterArr: [],
        posterArray: [],
        posterLength: 0,
        goodsParams:{
            start: 0,
            limit: 20
        },
        isOpen: 1,
        showLoading: false
    }
  },
  mounted(){
      document.title = '邀请有礼'
      this.getUserGoodsList(this.goodsParams);
      if(inWeixin()){
        this.$parent.getWxConfig({
            title: '邀请有礼 邀好友购课兑豪礼',
            desc: '多邀多得，上不封顶，快来邀请好友吧!',
            link: window.location.href,
            imgUrl: 'https://rc.yamiabc.com/monkeyABC/h5/www/source/share_logo.png'
        });
      }
  },
  methods:{
      async getUserDiamond() {
        try {
            //定义参数对象
            let head = {"CUSTOM-TAL-TOKEN": localStorage.getItem('obn_token')}
            let res = await this.$api.getUserDiamond({},head);
            if(res.code==200){
                this.diamondData = res.data;
                Sensors.SensorsLog.sensorsLogin();
                if(this.isOpen == 1){
                    Sensors.SensorsLog.invitepage_show({
                        diamondData: this.diamondData,
                        button_type: '活动进行中'
                    })
                }else{
                    Sensors.SensorsLog.invitepage_show({
                        diamondData: this.diamondData,
                        button_type: '活动已结束'
                    })
                }
                // localStorage.setItem('obn_available',res.data.available);
            }else{
                if(this.isOpen == 1){
                    Sensors.SensorsLog.invitepage_show({
                        diamondData: this.diamondData,
                        button_type: '活动进行中'
                    })
                }else{
                    Sensors.SensorsLog.invitepage_show({
                        diamondData: this.diamondData,
                        button_type: '活动已结束'
                    })
                }
            }
        } catch (e) {
            this.errorData = e
        }
      },
      toLogin(){
          location.href = './login.html'+location.search
      },
      async getUserGoodsList(params) {
        try {
            //定义参数对象
            let head = {
                // "CUSTOM-TAL-TOKEN": localStorage.getItem('obn_token'),
                "Content-Type": 'application/json'}
            let res = await this.$api.getGoodsList(params,head);
            if(res.code==200){
                this.isOpen = res.data.open;
                this.getUserDiamond();
                this.goodsArr = this.goodsArr.concat(res.data.goods);
                this.goodsTotal = res.data.total;
                if(res.data.total > params.start+params.limit){
                    this.goodsStart = params.start + params.limit;
                    this.goodsScroll();
                }
            }
        } catch (e) {
            console.log(e);
            this.errorData = e
        }
      },
      goodsScroll(){
        this.getUserGoodsList({
            start: this.goodsStart,
            limit: 20
        })
      },
      async getPost(type) {    
        let token = '';
        if(getQuery('token')){
            token = getQuery('token')
        }else{
            let tokenParams = {
                sourceId: parseInt(getQuery('sourceId')) || 2,
                sourceType: parseInt(getQuery('sourceType')) || 12,
            }  
            token = window.btoa(JSON.stringify(tokenParams));
        }
        try {
            //定义参数对象
            let head = {"CUSTOM-TAL-TOKEN": localStorage.getItem('obn_token'),
            "Content-Type": 'application/json'}
            let res = await this.$api.getPoster({
                type: type,
                token: token,
                event_belong: getQuery('event_belong')
            },head);
            if(res.code==200){
                this.getPostImg(res.data.url);
                this.posterArray.push({
                    imgUrl: res.data.url,
                    type: type
                });
                // this.goodsArr = res.data.goods;
                // this.status = res.data.status;
            }else if(res.code == 400){
                // location.href = '/login'
            }
        } catch (e) {
            console.log(e);
            this.errorData = e
        }
      },
      async getPostImg(url) {  
        try {
            //定义参数对象
            let head = {"CUSTOM-TAL-TOKEN": localStorage.getItem('obn_token'),
            "Content-Type": 'application/json'}
            let res = await this.$api.getPosterImg(url,{},head);
            if(res){
                this.posterLength++;
                if(this.posterLength == 2){
                    this.showLoading = false;
                    this.posterArr = this.posterArray;
                    sessionStorage.setItem('obn_poster',JSON.stringify(this.posterArray));
                    this.showPosterInfo = true;
                }
                // this.goodsArr = res.data.goods;
                // this.status = res.data.status;
            }else if(res.code == 400){
                // location.href = '/login'
            }
        } catch (e) {
            console.log(e);
            this.errorData = e
        }
      },
      toList(){
        //   if(this.isOpen == 0){
        //       return;
        //   }
          if(!localStorage.getItem('obn_token')){
            this.toLogin();
            return;
          }
          this.$router.push({path:'/list',query:{open:this.isOpen}});
          Sensors.SensorsLog.invitepage_myreward_click();
      },
      toProduct(stockNum,id,item){
        //   if(this.isOpen == 0){
        //       return;
        //   }
        //   if(!localStorage.getItem('obn_token')){
        //     this.toLogin();
        //     return;
        //   }
          if(stockNum > 0 && id >0){
            // localStorage.setItem('goodsObj',JSON.stringify(item));
            this.$router.push('/product/'+id);
          }
      },
      showRules(){
          this.showRulesInfo = true;
          Sensors.SensorsLog.invitepage_rule_click();
      },
      hideRules(){
          this.showRulesInfo = false;
      },
      showPost(){
          if(this.isOpen == 0){
              return;
          }
          if(!localStorage.getItem('obn_token')){
            this.toLogin();
            return;
          }
          Sensors.SensorsLog.invitepage_shareposter(1);
          this.posterArray = [];
          if(sessionStorage.getItem('obn_poster')){
            this.posterArr = JSON.parse(sessionStorage.getItem('obn_poster'));
            this.showPosterInfo = true;
            return;
          }
          this.showLoading = true;
          this.getPost(1);
          this.getPost(2);
        //   this.getPost(3);
        //   this.$toast('活动已过期');
      },
      hidePost(){
          this.showPosterInfo = false;
      },
  }
}
</script>
<style lang="scss" scope>
    button{
        width: 400px;
        height: 80px;
    }
    .home{
        background:#FFCC00;
        // height: 100vh;
        padding-bottom: 215px;
        position: relative;
        .loading_box{
            position: fixed;
            top: 40%;
            left: 50%;
            transform: translateX(-50%);
            z-index: 30;
        }
        .home_hd{
            width: 100%;
            position: relative;
            .hd_banner{
                display: block;
                width: 100%;
            }
            .btn_show_rules{
                width: 141px;
                height: 68px;
                position: absolute;
                right: 0;
                top: 40px;
            }
        }
        .home_guide{
            width:690px;
            height:314px;
            margin: 10px auto 40px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 20px 0px rgba(253,183,0,1);
            border-radius:40px;
            padding-top: 20px;
            position: relative;
            .guide_box{
                display: flex;
                justify-content: center;
                width:650px;
                height:274px;
                border-radius:30px;
                border:5px solid rgba(255,209,115,.4);
                margin: auto;
                li{
                    width:160px;
                    height:160px;
                    background:rgba(255,252,237,1);
                    border-radius:10px;
                    border:1px solid rgba(249,195,45,1);
                    margin: 74px 30px 0;
                    position: relative;
                    &.li_tag{
                        &::after{
                            content: '';
                            display: block;
                            width: 42px;
                            height: 20px;
                            background: url('../../../assets/images/activity-obn/icon_home_right.png');
                            background-size: cover;
                            position: absolute;
                            right: -52px;
                            top: 80px;
                        }
                    }
                    img{
                        display: block;
                        &.icon_home_poster{
                            width: 84px;
                            height: 86px;
                            margin: 14px auto;
                        }
                        &.icon_home_class{
                            width: 86px;
                            height: 79px;
                            margin: 19px auto;
                        }
                        &.icon_home_gift{
                            width: 84px;
                            height: 79px;
                            margin: 19px auto;
                        }
                    }
                    p{
                        width: 100%;
                        font-size:24px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(104,44,0,1);
                        text-align: center;
                        position: absolute;
                        bottom: 15px;
                        left: 0;
                    }
                }
            }
        }
        .home_title{
            width: 332px;
            height: 84px;
            background: url('../../../assets/images/activity-obn/home_title_bg.png') no-repeat;
            background-size: cover;
            position: absolute;
            top: -10px;
            left: 179px;
            text-align: center;
            z-index: 5;
            span{
                font-size:34px;
                font-family: FZLANTY_DAJW--GB1-0,FZLANTY_DAJW--GB1;;
                font-weight: 600;
                color:rgba(255,247,235,1);
                line-height:39px;
                text-shadow:0px 2px 4px rgba(243,35,35,0.77);
                line-height: 80px;
                position: relative;
                &::before{
                    display: block;
                    content: '';
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #FFEED2;
                    position: absolute;
                    left: -30px;
                    top: 12px;
                }
                &::after{
                    display: block;
                    content: '';
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #FFEED2;
                    position: absolute;
                    right: -30px;
                    top: 12px;
                }
            }
        }
        .home_diamond{
            width:690px;
            height:351px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 20px 0px rgba(253,183,0,1);
            border-radius:40px;
            margin: auto;
            position: relative;
            padding-top: 20px;
            text-align: center;
            .diamond_box{
                width:650px;
                height:311px;
                border-radius:30px;
                border:5px solid rgba(255,209,115,.4);
                margin: auto;
                display: flex;
                justify-content: center;
                padding-top: 72px;
                li{
                    width: 219px;
                    position: relative;
                    &:nth-child(2){
                        &::before{
                            content: '';
                            display: block;
                            width:0;
                            height:77px;
                            border-left: 1px dotted rgb(221,210,195);
                            position: absolute;
                            left: 0;
                            top: 5px;
                        }
                        &::after{
                            content: '';
                            display: block;
                            width:0;
                            height:77px;
                            border-left: 1px dotted rgb(221,210,195);
                            position: absolute;
                            right: 0;
                            top: 5px;
                        }
                    }
                    .num{
                        font-size:40px;
                        // font-family:PingFangSC-Medium,PingFang SC;
                        font-weight:500;
                        color:rgba(255,102,0,1);
                    }
                    .name{
                        font-size:24px;
                        font-family:PingFangSC-Regular,PingFang SC;
                        font-weight:400;
                        color:rgba(177,146,124,1);
                    }
                }
            }
            .btn_home_diamond{
                position: absolute;
                left: 145px;
                bottom: 60px;
                width:400px;
                height:68px;
                margin: auto;
                border-radius:60px;
                border:2px solid rgba(255,102,0,1);
                font-size:28px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:400;
                color:rgba(255,102,0,1);
                line-height:68px;
            }
        }
        .home_goods{
            width:690px;
            // max-height:974px;
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 20px 0px rgba(253,183,0,1);
            border-radius:40px;
            margin: 42px auto 0;
            position: relative;
            padding: 23px 0;
            .goods_box_wrap{
                width:650px;
                // max-height:934px;
                border-radius:30px;
                border:5px solid rgba(255,209,115,1);
                margin: 0 auto;
                position: relative;
                overflow: scroll;
                .goods_box{
                    display: flex;
                    justify-items: center;
                    flex-wrap: wrap;
                    padding-top: 97px;
                    li{
                        width: 50%;
                        text-align: center;
                        position: relative;
                        padding-bottom: 70px;
                        color:rgba(255,102,0,1);
                        &.is_empty{
                            color: #ccc;
                            &::before{
                                content: '';
                                position: absolute;
                                top: 0;
                                left: 0;
                                width: 100%;
                                height: 100%;
                                background: rgba(255,255,255,.7);
                                z-index: 3;
                            }
                            .goods_img_wrap{
                                position: relative;
                                &::after{
                                    content: '已售罄';
                                    display: block;
                                    height: 48px;
                                    background:rgba(188,188,188,1);
                                    border-radius:0px 10px 0px 20px;
                                    position: absolute;
                                    right: 21px;
                                    top: 0;
                                    font-size:24px;
                                    font-family:PingFangSC-Medium,PingFang SC;
                                    font-weight:500;
                                    color:rgba(255,255,255,1);
                                    line-height: 48px;
                                    z-index: 4;
                                }
                            }
                        }
                        .goods_img{
                            display: block;
                            width:282px;
                            height:240px;
                            margin: auto;
                            // background:rgba(250,227,231,1);
                            border-radius:16px 16px 0px 0px;
                        }
                        .goods_name{
                            font-size:28px;
                            font-family:PingFangSC-Regular,PingFang SC;
                            font-weight:400;
                            color:rgba(0,0,0,1);
                            line-height:40px;
                            text-align: left;
                            margin: 20px 0 0 21px;
                            width: 280px;
                            // height: 100px;
                        }
                        .goods_num{
                            position: absolute;
                            bottom: 30px;
                            left: 21px;
                            width: 280px;
                            .num_price{
                                font-size:24px;
                                // font-family:PingFangSC-Medium,PingFang SC;
                                font-weight:500;
                                line-height:33px;
                                text-align: left;
                                padding-top: 4px;
                                .icon_diamond{
                                    display: inline-block;
                                    vertical-align: top;
                                    width: 24px;
                                    height: 22px;
                                    background: url('../../../assets/images/activity-obn/home_diamond.png');
                                    background-size: cover;
                                    margin-top: 3px;
                                    &.none{
                                        background: url('../../../assets/images/activity-obn/home_diamond_none.png');
                                        background-size: cover;
                                    }
                                }
                            }
                            .num_cost{
                                position: absolute;
                                top: 0;
                                right: 0;
                                font-size:26px;
                                font-family:PingFangSC-Medium,PingFang SC;
                                font-weight:500;
                                line-height:37px;
                                span{
                                    font-size:24px;
                                    font-family:PingFangSC-Regular,PingFang SC;
                                    font-weight:400;
                                    color:rgba(153,153,153,1);
                                    margin-right: 3px;
                                }
                            }
                        }

                    }
                }
            }
        }
        .btn_home_invite_wrap{
            position: fixed;
            left: 0;
            bottom: 0;
            width: 100%;
            height: 130px;
            background:#FFF;
            box-shadow:0px -3px 9px 0px rgba(0,0,0,0.06);
            z-index: 5;
            .btn_home_invite{
                overflow: hidden;
                text-align: center;
                margin:auto;
                width: 670px;
                height: 90px;
                line-height: 90px;
                border-radius: 45px;
                background: #FF6600;
                margin: 20px auto;
                font-size:34px;
                font-family:PingFangSC-Regular,PingFang SC;
                font-weight:600;
                color:rgba(255,255,255,1);
                position: relative;
                -webkit-animation: breathe 1.2s infinite;
                animation: breathe 1.2s infinite;
                &.disabled{
                    animation: none;
                    background: #EAEAEA;
                    color: #999;
                }
            }
            @-webkit-keyframes breathe{
                0%{ transform: scale(.99); }
                50%{ transform: scale(1.05); }
                100%{ transform: scale(.99); }
            }
            @keyframes breathe{
                0%{ transform: scale(.99); }
                50%{ transform: scale(1.05); }
                100%{ transform: scale(.99); }
            }
        }
    }
</style>
