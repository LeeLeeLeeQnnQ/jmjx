<template>
  <div class="page">
    <h4>橘猫精选商户租金账单</h4>
    <div class="page_head">
      <p>尊敬的商户:</p>
      <p class="ti2">您好！</p>
      <p class="ti2">
        以下是您在橘猫精选四道口店所租档口的房租明细，请您于
        <span>2019年4月30日</span>
        0时之前，将下述租金支付至我公司财务部。</p>
    </div>
    <div class="page_main">
        <div class="page_main_item">
          <span><i>1.</i>商户名称：</span>
          <p>小当家冰品</p>
        </div>
        <div class="page_main_item">
          <span><i>2.</i>档口号位置：</span>
          <p>B3</p>
        </div>
        <div class="page_main_item">
          <span><i>3.</i>商户负责人：</span>
          <p>赵海明</p>
        </div>
        <div class="page_main_item">
          <span><i>4.</i>款项类型：</span>
          <p>场地使用费+管理费</p>
        </div>
        <div class="page_main_item">
          <span><i>5.</i>款项明细日期：</span>
          <p>2019年5月26日至2019年5月31日</p>
        </div>
        <div class="page_main_item">
          <span><i>6.</i>滞纳金起算日：</span>
          <p></p>
        </div>
        <div class="page_main_item">
          <span><i>7.</i>末付滞纳金金额：</span>
          <p></p>
        </div>
        <div class="page_main_item">
          <span><i>8.</i>应付款合计：</span>
          <p>1161.29元 </p>
        </div>
    </div>
    <div class="page_footer">
        <div class="page_footer_top">
          <p>我公司严格履行合同条款，对逾期不按规定付款的客户，将按迟交天数收取滞纳金，请您于每月收到账单日起5日内支付，如未能按时缴费的，每超出1日按全部费用的1%作为未按时缴费的滞纳金。若产生滞纳金超过五日包含第五天的，我司将停止您店铺的能源供应，若超过十天包含第十天的，我司有权终止服务合同，并没收您全部保证金，收回您使用的铺位，并保留行使其它索赔的权利。</p>
          <p>如有疑问请咨询本店运维管理部</p>
        </div>
        <div class="page_footer_main">
          <p>汇款信息：</p>
          <p class="ti2">
            <span>账户名称：王乙同</span>
          </p>
          <p  class="ti2">
            <span>开户行：中国邮政储蓄银行北京昌平区北七家支行</span>
          </p>
          <p  class="ti2">
            <span>卡号：6217991000006021260</span>
          </p>
        </div>
        <div class="page_footer_bottom">
          <p>北京金同餐饮管理有限公司</p>
          <p>2019年4月25日</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'print-rent',
  props: {
    print_info: {
      type:Object,
      default: {}
    },
  },
  data () {
    return {
    }
  },
  watch: {
    print_info (newInfo, oldInfo) {
      newInfo.currentdate = this.getCurentTime();
      this.formValue(newInfo);
      this.print_info = newInfo;
    }
  },
  methods: {
    getCurentTime () {
      var date = new Date()
      var seperator1 = '-'
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
      return currentdate
    },
    formValue(info){
      info.currentdate = this.getCurentTime();
      info.energy_value = (info.energy_end*1 - info.energy_start*1 ).toFixed(2);
      info.water_value = (info.water_end*1 - info.water_start*1 ).toFixed(2);
    },
  },
  created () {
    this.formValue(this.print_info);
  },
}
</script>

<style>
    @page {
      size: A4;
      margin: 0;
    }
    @media print {
        *{
          font-size: 10pt;
          line-height: 11pt;
          font-family: "宋体"
        }
        .page {
          margin: 0;
          border: initial;
          border-radius: initial;
          width: initial;
          min-height: initial;
          box-shadow: initial;
          background: initial;
          page-break-after: always;
        }
    }
    .ti2{
      text-indent: 2em;
    }
    .page{
      box-sizing: border-box;
      padding: 100px 110px;
    }
    
    .page h4{
      text-align: center;
      margin-bottom: 5px;
      font-size: 22px;
    }
    .page_head{
      width: 100%;
      overflow:hidden;
      line-height: 12pt;
    }
    
    .page_main{

    }
    .page_main .page_main_item{
      text-indent: 2em;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      height: 3em;
    }
    .page_main .page_main_item span{
      width: 150px;
    }
    .page_main .page_main_item i{
      font-style:normal; 
      font-weight:400; 
    }
    .page_main .page_main_item p{
      border-bottom: 1px solid #000;
      text-align: center;
      text-indent: 0em;
      /*padding: 0 3em 2px;*/
      padding-bottom: 2px;
      width: 300px;
    }

    .page_footer{
        padding: 5px;
        line-height: 0.9em;
    }
    .page_footer_top{
      text-indent: 2em;
      line-height: 12pt;
      margin: 2em 0;
    }
    .page_footer_main{
      line-height: 15pt;
      margin: 2em 0;
    }
    .page_footer_bottom{
      line-height: 15pt;
      text-align: right;
    }
</style>
