import sensors from 'sa-sdk-javascript';
import {getDatetime} from '@/utils/utils'
const EVENT_BELONG = '邀请有礼第一期（端外版）'
// const isOnline = location.host === 'monkeyabc.xueersi.com';
// const httpUrl = 'http://sensorsdata-2.talbrain.com:8106/sa?project=monkeyabc&token=sa68ee16d2';
// const httpsUrl = 'https://sensorsdata-2.talbrain.com:8080/sa?project=monkeyabc&token=sa68ee16d2';
const devUrl = 'https://sensorsdata-4.talbrain.com:8080/sa?project=default&token=sa58606a00';
const proUrl = 'https://sensorsdata-4.talbrain.com:8080/sa?project=monkey&token=schemaLimited-tIHgbkXD';
const SensorsLog = {
  isBottom: 0,
  isSave: false, // 是否保存图片
  startTime: new Date().getTime(),
  init: function() {
    sensors.init({
      name: 'sensors',
      show_log: true,
      server_url: process.env.NODE_ENV !== 'production'?devUrl:proUrl,
      heatmap: {
        clickmap: 'default',
        scroll_notice_map: 'default'
      },
      is_track_single_page: true,
      scrollmap: {
        scroll_notice_map: 'default',
        collect_url: function() {
          // 如果只采集首页
        //   if (location.hash === '#/') {
        //     return true;
        //   }
        },
        scroll_delay_time: 2000,
        scroll_event_duration: 18000 // 单位秒，预置属性停留时长 event_duration 的最大值。默认5个小时，也就是300分钟，18000秒。
      }
    });
    sensors.quick('autoTrack');// 全埋点初始化
    // this.handleScroll();
  },
  // 分享方式
  invitepage_sharemethod: function(img_type) {
      let type = ''  
      if (img_type == 1) {
        type = '语文体验课'
      }else if(img_type == 2){
        type = '思维体验课'
      }else if(img_type == 3){
        type = '英语体验课'
      }
      const params = {
        stu_id: localStorage.getItem('obn_user_id'),
        event_time: getDatetime(),
        event_name: 'invitepage_sharemethod',
        event_displayname: '邀请有礼_分享方式',
        event_belong: EVENT_BELONG,
        share_content: type,
        share_method: '保存图片'
      }
      sensors.track('invitepage_sharemethod', params);
  },
  // 邀请规则点击   
  invitepage_rule_click: function(){
    const params = {
        stu_id: localStorage.getItem('obn_user_id'),
        event_time: getDatetime(),
        event_name: 'invitepage_rule_click',
        event_displayname: '邀请有礼_活动规则_点击',
        event_belong: EVENT_BELONG,
    }
    sensors.track('invitepage_rule_click', params);
  },
  // 底部邀请有礼点击   
  invitepage_shareposter: function(flag){
    const params = {
        stu_id: localStorage.getItem('obn_user_id'),
        event_time: getDatetime(),
        event_name: 'invitepage_shareposter',
        event_displayname: '邀请有礼_分享海报_点击',
        event_belong: EVENT_BELONG,
        click_result: '选择海报',
        previous_source: flag == 1?'活动页':'获得记录'
    }
    sensors.track('invitepage_shareposter', params);
  },
  // 底部邀请有礼点击   
  invitepage_myreward_click: function(){
    const params = {
        stu_id: localStorage.getItem('obn_user_id'),
        event_time: getDatetime(),
        event_name: 'invitepage_myreward_click',
        event_displayname: '邀请有礼_我的奖励_点击',
        event_belong: EVENT_BELONG,
    }
    sensors.track('invitepage_myreward_click', params);
  },
  /**
   * @落地页_曝光
  */
 invitepage_show: function(data) {
    const params = {
        stu_id: localStorage.getItem('obn_user_id'),
        event_time: getDatetime(),
        event_name: 'invitepage_show',
        event_displayname: '邀请有礼_曝光',
        event_belong: EVENT_BELONG,
        invitee_num: data.diamondData.cumulative,
        redenvelopes_amt: data.diamondData.upcoming,
        ranking: data.diamondData.available,
        button_type: data.button_type
    }
    sensors.track('invitepage_show', params);
  },
  /**
   * @赠品_点击
  */
  sensorsLogin(id) {
    // 登录获取到lid之后需要调用login方法同步id, 才能统一数据
    id = id || localStorage.getItem('obn_user_id') || '';
    if (!id) return;
    sensors.login(id);
  }, 
}
export default {SensorsLog}