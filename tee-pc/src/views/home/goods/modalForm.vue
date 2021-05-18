<style scoped>

</style>

<template>
<float-box :title="title" :height="75" :left="380" :right="90">
  <div class="acenter" slot="btns">
    <Button :disabled="btnDisabled" @click="handleSave">确认保存</Button>
  </div>
  <div class="goods-box">
    <Form ref="form" :model="formData" :rules="ruleValidate">
      <Row>
        <Col span="6">
          <div class="c-form mt30">
            <div class="c-c8 mb20 ml10">产品基本信息</div>
            <FormItem>
              <Select placeholder="产品分类" v-model="formData.xxx3"></Select>
            </FormItem>
            <FormItem>
              <Input placeholder="产品名称" v-model="formData.xxx1" />
            </FormItem>
            <FormItem>
              <Input type="textarea" :rows="4" placeholder="产品介绍" v-model="formData.xxx1" />
            </FormItem>
            <FormItem>
              <c-date-time type="timerange" placeholder="售卖时间段" v-model="formData.xxx2" />
            </FormItem>
            <FormItem>
              <Input placeholder="价格" v-model="formData.xxx6"><span slot="append">元</span></Input>
            </FormItem>
            <FormItem>
              <Input placeholder="库存" v-model="formData.xxx6" />
            </FormItem>
            <FormItem>
              <Input placeholder="制作时间" v-model="formData.xxx6"><span slot="append">分钟</span></Input>
            </FormItem>
            <FormItem>
              <upload-img v-model="formData.xxx5">
                <span slot="title">产品图</span>
                <span slot="hint">尺寸1050px*500px</span>
              </upload-img>
            </FormItem>
          </div>
        </Col>
      </Row>
    </Form>
  </div>
</float-box>
</template>

<script type='es6'>
import floatBox from '@/components/common/floatBox'
import cDateTime from '@/components/common/cDateTime'
import uploadImg from '@/components/common/uploadImg'
export default {
  name: 'app',
  components: {
    floatBox,
    cDateTime,
    uploadImg
  },
  computed: {
    btnDisabled () {
      return false
    }
  },
  data () {
    return {
      title: '添加产品',
      formData: {
        xxx1: '',
        xxx2: [],
        xxx3: '',
        xxx4: '',
        xxx5: '',
        xxx6: '',
        xxx7: '',
        xxx8: '',
        xxx9: '',
        xxx10: '',
        xxx11: '',
        xxx12: '',
        xxx13: ''
      },
      ruleValidate: {
        xxx8: [
          { required: true, trigger: 'blur', validator: this.idsValidator }
        ],
        xxx9: [
          { required: true, trigger: 'blur', validator: this.phoneValidator }
        ]
      }
    }
  },
  methods: {
    handleSave () {}
  }
}
</script>
