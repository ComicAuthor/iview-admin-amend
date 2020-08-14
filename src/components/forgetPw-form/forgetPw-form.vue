<template>
  <Form
    class="SignupForm"
    ref="SignupForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <span>请在下方输入您的电子邮件，我们验证通过后，会向您的邮箱中下发新的密码。登录后，可通过个人中心修改密码。</span>
    <Row class="row">
      <Col :span="18">
        <FormItem prop="userName">
          <Input
            v-model="form.userName"
            type="text"
            class="emailInput"
            style="width:250px"
            placeholder="请输入你的电子邮箱"
          >
            <span slot="prepend">
              <Icon :size="14" type="md-mail"></Icon>
            </span>
          </Input>
        </FormItem>
      </Col>
      <Col :span="6">
        <Button
          type="primary"
          shape="circle"
          :class="show?'send':'send button--info'"
          :disabled="show?false:true"
          @click="getCode"
        >{{btnText}}</Button>
      </Col>
    </Row>

    <FormItem prop="emailVerifyCode">
      <Input v-model="form.emailVerifyCode" placeholder="请输入邮箱验证码">
        <span slot="prepend">
          <Icon :size="16" type="md-code"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" :loading="loading" long>发送</Button>
    </FormItem>
  </Form>
</template>
<script>
import { validEmail } from "@/libs/util.js";
import { verifyCode } from "@/api/user.js";
const validateCode = (rule, value, callback) => {
  if (value.toString().length == 6) {
    callback();
  } else {
    callback(new Error("请输入6位邮箱验证码"));
  }
};
export default {
  name: "SignupForm",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        userName: "",
        emailVerifyCode: "",
      },
      timer: null,
      count: "",
      show: false,
      btnText: "发验证码",
    };
  },
  computed: {
    rules() {
      return {
        userName: [
          { required: true, message: "电子邮箱不能为空", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value.length == 0) {
                callback(new Error("请输入你的邮箱地址"));
              } else {
                if (validEmail(value)) {
                  this.show = true;
                  callback();
                } else {
                  callback(new Error("邮箱格式不正确"));
                }
              }
            },
          },
        ],
        emailVerifyCode: [
          { required: true, message: "邮箱验证码不能为空", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            vaildator: validateCode,
          },
        ],
      };
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.SignupForm.validate((valid) => {
        if (valid) {
          this.$emit("on-success-forget", this.form);
        }
      });
    },
    async getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        var res = await verifyCode({ userName: this.form.userName });
        if (res.code == 200) {
          this.$Message.success("邮件已发送，请尽快查看！");
          this.count = TIME_COUNT;
          this.show = false;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
              this.btnText = `${this.count}s 重试`;
            } else {
              this.show = true;
              clearInterval(this.timer);
              this.timer = null;
              this.btnText = "发验证码";
            }
          }, 1000);
        } else {
          this.$Message.error(res.message);
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
.button--info {
  color: #fff;
  background-color: #c8c9cc;
  border-color: #c8c9cc;
}

.row {
  margin-top: 15px;
}
</style>
