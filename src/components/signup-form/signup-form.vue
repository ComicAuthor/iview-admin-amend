<template>
  <Form
    class="SignupForm"
    ref="SignupForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <FormItem prop="name">
      <Input v-model="form.name" placeholder="请输入抖音号名称">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input
        v-model.sync="form.password"
        :icon="passwordType[0] === 'password' ? 'md-eye-off' : 'md-eye'"
        :type="passwordType[0]"
        password
        placeholder="请输入密码"
        @on-click="showPwd(0)"
      >
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="repassword">
      <Input
        :type="passwordType[1]"
        :icon="passwordType[1] === 'password' ? 'md-eye-off' : 'md-eye'"
        v-model="form.repassword"
        password
        @on-click="showPwd(1)"
        placeholder="请再次输入密码"
      >
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="phone">
      <Input maxlength="11" v-model="form.phone" placeholder="请输入手机号">
        <span slot="prepend">
          <Icon :size="16" type="md-call"></Icon>
        </span>
      </Input>
    </FormItem>

    <Row>
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
      <Input v-model="form.company" placeholder="请输入公司名称（选填）">
        <span slot="prepend">
          <Icon :size="16" type="ios-briefcase"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Input v-model="form.invitationCode" placeholder="请输入推荐人邀请码（选填）">
        <span slot="prepend">
          <Icon :size="16" type="md-planet"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" :loading="loading" long>注册</Button>
    </FormItem>
  </Form>
</template>
<script>
import { validEmail } from "@/libs/util.js";
import { getCode as getCodes } from "@/api/user.js";

const validateCode = (rule, value, callback) => {
  if (value.toString().length == 6) {
    callback();
  } else {
    callback(new Error("请输入6位邮箱验证码"));
  }
};
const validatePhone = (rule, value, callback) => {
  if (value.toString().length == 11) {
    callback();
  } else {
    callback(new Error("请输入11位手机号码"));
  }
};
export default {
  name: "SignupForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: "抖音号名称不能为空", trigger: "blur" },
        ];
      },
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 16,
            message: "密码需要 6 - 16 个字符",
            trigger: "blur",
          },
        ];
      },
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      form: {
        userName: "",
        password: "",
        repassword: "",
        phone: "",
        name: "",
        company: "",
        emailVerifyCode: "",
        invitationCode: "",
      },
      passwordType: ["password", "password"],
      redirect: undefined,
      timer: null,
      count: "",
      show: false,
      btnText: "发验证码",
    };
  },
  mounted() {
    var { invitationCode } = this.$route.query;
    if (invitationCode) {
      this.form.invitationCode = invitationCode;
    }
  },
  computed: {
    rules() {
      return {
        name: this.userNameRules,
        password: this.passwordRules,
        repassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (value.length == 0) {
                callback(new Error("请输入确认密码"));
              } else {
                if (value == this.form.password) {
                  callback();
                } else {
                  callback(new Error("两次密码输入不匹配"));
                }
              }
            },
          },
        ],
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
        phone: [
          { required: true, message: "个人手机号不能为空", trigger: "blur" },
          {
            required: true,
            trigger: "blur",
            vaildator: validatePhone,
          },
        ],
      };
    },
  },
  methods: {
    handleSubmit() {
      this.$refs.SignupForm.validate((valid) => {
        if (valid) {
          this.$emit("on-success-valid", this.form);
        }
      });
    },
    showPwd(index) {
      if (this.passwordType[index] === "password") {
        this.passwordType[index] = "text";
      } else {
        this.passwordType[index] = "password";
      }
      this.$forceUpdate();
    },
    async getCode() {
      const TIME_COUNT = 60;
      if (!this.timer) {
        var res = await getCodes({ userName: this.form.userName });
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
</style>
