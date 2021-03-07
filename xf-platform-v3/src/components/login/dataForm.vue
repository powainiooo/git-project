<style lang="stylus" type="text/stylus">
@import "../../assets/css/global.styl"
.c-data-form
  height 376px
  position relative
  margin-left 40px
  .bottom-box
    width 600px
    margin-top 76px
    overflow-x hidden
    .step-box
      width 1800px;
      display flex
      list-style none
      transition all .4s cubic-bezier(.23,.56,.24,.92)
      &>li
        display flex
        width 600px
        position relative
        .counter
          size(300px, 100%)
          abTL(0, 0)
          background-color rgba(0, 0, 0, 0.8)
          border-radius 10px 0 0 0
          z-index 1000
          &>div
            size(90px, 90px)
            border-radius 10px
            bgG()
            center()
            margin 130px auto
            font-size 48px
            font-family 'HelveThin'
            color #ffffff
        &:after
          content ''
          width 1px
          height 100%
          abTL(0, 50%)
          background-color #EEEEEF
        &>div
          flex 1
        &>.flex
          &>div
            flex 1
  .steps
    width 100%
    abTL(0, 0)
    between()
    img
      height 57px
    button
      size(90px)
      margin-left 10px
</style>

<template>
<div class="c-data-form">
  <div class="steps">
    <img src="@/assets/img/nums/1.png" />
    <div class="flex">
      <Button v-if="step !== 1">上一步</Button>
      <Button @click="handleNext">下一步</Button>
    </div>
  </div>
  <div class="bottom-box" :style="{height: bh + 'px'}">
    <ul class="step-box" :style="{'margin-left': (step - 1) * -600 + 'px'}">
      <!-- step1 -->
      <li>
        <Form class="flex">
          <div>
            <div class="form">
              <div class="form-title">企业基本信息</div>
              <FormItem>
                <Input v-model="formData.usename" placeholder="场地方名称" />
              </FormItem>
              <FormItem>
                <Input v-model="formData.usename" placeholder="公司全称" />
              </FormItem>
              <FormItem>
                <Input v-model="formData.usename" placeholder="公司地址" />
              </FormItem>
              <FormItem>
                <Input v-model="formData.usename" placeholder="负责人姓名" />
              </FormItem>
              <FormItem>
                <Input v-model="formData.usename" placeholder="负责人身份证号" />
              </FormItem>
              <FormItem>
                <Input v-model="formData.usename" placeholder="负责人联系电话" />
              </FormItem>
              <FormItem>
                <Input v-model="formData.usename" placeholder="验证码">
                  <Button slot="append">获取验证码</Button>
                </Input>
              </FormItem>
            </div>
          </div>
          <div>
            <div class="form">
              <div class="form-title">上传资料</div>
              <FormItem>
                <upload-img>
                  <span slot="title">企业营业执照</span>
                </upload-img>
              </FormItem>
              <FormItem>
                <upload-img>
                  <span slot="title">LOGO</span>
                </upload-img>
              </FormItem>
              <div class="txt2">活动方 LOGO 我们将严格按照统一标准进行使用请务必满足以下条件。</div>
            </div>
            <ul class="hint-list">
              <li>
                <div class="index"><img src="@/assets/img/nums/1.png"></div>
                <div class="txt2">上传尺寸在 200px*140px 的矩形区域内</div>
              </li>
              <li>
                <div class="index"><img src="@/assets/img/nums/2.png"></div>
                <div class="txt2">图片为白底黑图案形式<br/>LOGO 统一使用 R0 G0 B0 色值</div>
              </li>
            </ul>
            <hr color="#EEEEEF"/>
            <Form class="form">
              <FormItem>
                <upload-img>
                  <span slot="title">场地照片</span>
                  <span slot="hint">尺寸1125px*600px</span>
                </upload-img>
              </FormItem>
            </Form>
          </div>
        </Form>
      </li>
      <!-- step2 -->
      <li>
        <div>
          <Form class="form">
            <div class="form-title">银行账户信息</div>
            <FormItem>
              <Input v-model="formData.usename" placeholder="个人开户名" />
            </FormItem>
            <FormItem>
              <Input v-model="formData.usename" placeholder="身份证号" />
            </FormItem>
            <FormItem>
              <Input v-model="formData.usename" placeholder="预留手机号" />
            </FormItem>
            <FormItem>
              <Input v-model="formData.usename" placeholder="个人银行卡号" />
            </FormItem>
            <FormItem>
              <Select v-model="formData.usename" placeholder="选择银行">
                <Option value="1">银行1</Option>
              </Select>
            </FormItem>
            <FormItem>
              <Input v-model="formData.usename" placeholder="开户支行" />
            </FormItem>
          </Form>
        </div>
        <div>
          <Form class="form">
            <div class="form-title">须知</div>
          </Form>
          <hr color="#EEEEEF" size="1" style="margin-top: -12px"/>
          <ul class="hint-list notice-list">
            <li>
              <div class="index"><img src="@/assets/img/nums/1.png"></div>
              <div class="txt2">小夫有票 会收取每场活动的<br/>总费用的<span>5%</span>作为手续费，提款时自动扣取。</div>
            </li>
            <li>
              <div class="index"><img src="@/assets/img/nums/2.png"></div>
              <div class="txt2">提款时间在活动结束 <span>7 个工作日</span>后可以<br/>发起申请，审核及打款在<span>7 个工作日</span>内。</div>
            </li>
            <li>
              <div class="index"><img src="@/assets/img/nums/3.png"></div>
              <div class="txt2">银行账户仅支持个人账户，不支持公司账户。<br/>请仔细核验填写的银行卡信息。</div>
            </li>
          </ul>
        </div>
        <div class="counter" v-if="countIndex !== 0">
          <div>{{countIndex}}</div>
        </div>
      </li>
      <!-- step3 -->
      <li>
        <div>
          <Form class="form">
            <div class="form-title">您要了解清楚的</div>
          </Form>
          <hr color="#EEEEEF" size="1" style="margin-top: -12px"/>
          <ul class="hint-list notice-list">
            <li>
              <div class="index"><img src="@/assets/img/nums/1.png"></div>
              <div class="txt2">所有填写的信息均具有法律效应，<br/>请遵守中华人民共和国法律。</div>
            </li>
            <li>
              <div class="index"><img src="@/assets/img/nums/2.png"></div>
              <div class="txt2">小夫有票 首要保护的是购票者，任何损害购票者权益并<br/>经过核查的，我们有权终止活动方的功能并冻结账户。</div>
            </li>
            <li>
              <div class="index"><img src="@/assets/img/nums/3.png"></div>
              <div class="txt2">小夫有票 仅作为您发布票务活动的平台，资料文件存在 造假行为均由发布票务方承担责任，在任何情况下，我 们均不为任何内容负责，但 小夫有票 有权依法停止展示 任何票务活动并采取相应行动，包括但不限于保存有关记录，并向有关机关报告等。</div>
            </li>
            <li>
              <div class="index"><img src="@/assets/img/nums/4.png"></div>
              <div class="txt2">为了更好地为您提供服务，小夫有票 可能会向关联公司共享您的个人信息；我们只会共享必要的个人信息，且受《隐私权专项条款》约束。</div>
            </li>
            <li>
              <div class="index"><img src="@/assets/img/nums/5.png"></div>
              <div class="txt2">您上传或发布的内容应保证您为您发布内容（包括但不限于文字、图片、视频等）的著作权人或已取得合法授权，并且该内容不会侵犯任何第三方的合法权益。</div>
            </li>
            <li>
              <div class="index"><img src="@/assets/img/nums/6.png"></div>
              <div class="txt2">由于服务器原因，正常销售的票务在人流量过大的情况下有可能会出现实际销售票数超出设定票数的情况，营收金额也会对应增加。</div>
            </li>
            <li>
              <div class="index"><img src="@/assets/img/nums/7.png"></div>
              <div class="txt2">我们倡导使用电子票务替代纸质票务， 在使用 小夫有票后，请减少现场纸质票的使用。</div>
            </li>
          </ul>
        </div>
        <div>
          <Form class="form">
            <div class="form-title between">
              <span>服务条款</span>
              <ul class="tab-bar tab-bar-min" style="width: 130px; position: absolute; top: 0; right: 0;">
                <li v-for="i in tabList"
                    :key="i.value"
                    href="javascript:;"
                    class="tab-bar-item"
                    :class="{'tab-bar-active': i.value === tabKey}"
                    @click="tabKey = i.value">{{i.name}}</li>
              </ul>
            </div>
          </Form>
          <hr color="#EEEEEF" size="1" style="margin-top: -12px"/>
          <div class="txt2" style="margin: 18px 24px" v-if="tabKey === 1">
            <h3 style="font-size: 16px; line-height: 28px;">小夫有票活动方服务协议</h3>
            小夫有票活动方服务协议
          </div>
          <div class="txt2" style="margin: 18px 24px" v-else-if="tabKey === 2">
            <h3 style="font-size: 16px; line-height: 28px;">小夫有票活动方隐私条款</h3>
            小夫有票活动方隐私条款
          </div>
        </div>
      </li>
    </ul>
  </div>

  <alert />
</div>
</template>

<script type='es6'>
import uploadImg from '../uploadImg'
import alert from './alert'
export default {
  name: 'app',
  components: {
    uploadImg,
    alert
  },
  data () {
    return {
      bh: 0,
      tabList: [
        { name: '服务协议', value: 1 },
        { name: '隐私条款', value: 2 }
      ],
      tabKey: 1,
      step: 1,
      countIndex: 10,
      formData: {
        usename: '',
        password: ''
      }
    }
  },
  mounted () {
    this.bh = window.innerHeight - (window.innerHeight - 376) / 2 - 76
  },
  methods: {
    handleNext () {
      this.step += 1
      if (this.step === 2) {
        this.count()
      }
    },
    count () {
      if (this.countIndex === 0) return
      const t = setInterval(() => {
        this.countIndex -= 1
        if (this.countIndex === 0) {
          clearInterval(t)
        }
      }, 1000)
    }
  }
}
</script>
