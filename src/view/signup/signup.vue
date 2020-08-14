<template>
  <div class="signup">
    <ModuleTransition delay="0.05" duration="0.3" mode="out-in">
      <div class="signup-con" v-if="ShowModule">
        <div class="title-container">
          <div class="logo">
            <img src="@/assets/images/logo.png" alt />
            <span>平凡的你我</span>
          </div>
        </div>

        <Card v-if="ShowModule" icon="log-in" title="欢迎注册" :bordered="false">
          <div class="form-con">
            <signup-form :loading="loading" @on-success-valid="handleSubmit"></signup-form>
          </div>
          <span class="login">
            已有账号？
            <span @click="login">返回登录</span>
          </span>
        </Card>
      </div>
    </ModuleTransition>
  </div>
</template>

<script>
import SignupForm from "_c/signup-form";
import ModuleTransition from "_c/ModuleTransition/translateX";
import moduleTransitonMixin from "@/mixins/moduleTransiton";
// import { signup } from "@/api/user.js";
// import { hex_md5 } from "@/libs/md5";
export default {
  components: {
    SignupForm,
    ModuleTransition,
  },
  mixins: [moduleTransitonMixin],
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    async handleSubmit(form) {
      this.loading = true;
      var data = JSON.parse(JSON.stringify(form));
      delete data.repassword;
      for (let i in data) {
        data[i] = data[i].trim();
      }
      // data.password = hex_md5(data.password);
      try {
        var res = await signup(data);
        this.loading = false;
        if (res.code == 200) {
          this.$Message.success("注册成功！");
          this.$router.push({
            name: "login",
          });
        } else {
          this.$Message.error(res.message);
        }
      } catch (error) {
        this.$Message.error("系统繁忙，请稍后再试！");
        this.loading = false;
      }
    },
    login() {
      this.$router.push({
        name: "login",
      });
    },
  },
};
</script>

<style lang="less">
@import "./signup.less";
</style>
