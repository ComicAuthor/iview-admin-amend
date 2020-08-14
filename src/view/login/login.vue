<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login">
    <ModuleTransition delay="0.05" duration="0.3" mode="out-in">
      <div class="login-con" v-if="ShowModule">
        <div class="title-container">
          <div class="logo">
            <img src="@/assets/images/logo.png" alt />
          </div>
        </div>
        <ModuleTransition delay="0.05" duration="0.3" mode="out-in">
          <Card v-if="!forgetPd" icon="log-in" title="欢迎登录" :bordered="false" key="login">
            <div class="form-con">
              <login-form :loading="loading" @on-success-valid="handleSubmit"></login-form>
            </div>
            <div class="options">
              <span class="signup-option">
                还没有账号？
                <span @click="signup">点击注册</span>
              </span>
              <span class="forgetPd" @click="forgetPdFun">忘记密码？</span>
            </div>
          </Card>
          <Card v-else icon="log-in" title="找回密码" :bordered="false" key="send">
            <div class="forgetPw-con">
              <forgetPw-form :loading="loading" @on-success-forget="handleForgetSubmit"></forgetPw-form>
            </div>
            <div class="options">
              <span class="backLogin">
                <span @click="backLogin">返回登录</span>
              </span>
            </div>
          </Card>
        </ModuleTransition>
      </div>
    </ModuleTransition>
  </div>
</template>

<script>
import ModuleTransition from "_c/ModuleTransition/translateX";
import moduleTransitonMixin from "@/mixins/moduleTransiton";
import LoginForm from "_c/login-form";
import forgetPwForm from "_c/forgetPw-form";
import { mapActions } from "vuex";
import { forgetPassword } from "@/api/user.js";
export default {
  components: {
    LoginForm,
    forgetPwForm,
    ModuleTransition,
  },
  mixins: [moduleTransitonMixin],
  data() {
    return {
      loading: false,
      forgetPd: false,
    };
  },
  methods: {
    ...mapActions(["handleLogin", "getUserInfo"]),
    async handleSubmit({ userName, password }) {
      this.loading = true;
      try {
        var res = await this.handleLogin({ userName, password });
        if (res.status == 200) {
          this.getUserInfo().then((res) => {
            this.loading = false;
            this.$router.push({
              name: this.$config.homeName,
            });
          });
        } else {
          this.loading = false;
          this.$Message.error(res.message);
        }
      } catch (error) {
        this.$Message.error("系统繁忙，请稍后再试！");
        this.loading = false;
      }
    },
    async handleForgetSubmit(form) {
      this.loading = true;
      try {
        var res = await forgetPassword(form);
        this.loading = false;
        if (res.code == 200) {
          this.$Message.success("验证通过，请在您的邮箱中查看新密码！");
          this.forgetPd = !this.forgetPd;
        } else {
          this.$Message.error(res.message);
        }
      } catch (error) {
        this.$Message.error("系统繁忙，请稍后再试！");
        this.loading = false;
      }
    },
    signup() {
      this.$router.push({
        name: "signup",
      });
    },
    forgetPdFun() {
      this.forgetPd = !this.forgetPd;
    },
    backLogin() {
      this.forgetPd = !this.forgetPd;
    },
  },
};
</script>

<style>
</style>
