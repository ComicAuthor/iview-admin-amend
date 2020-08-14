<template>
  <div>
    <Card shadow title="社区">
      <row class="join-page" :gutter="32">
        <i-col span="10">
          <img class="qq-group-img" src="../assets/images/qq.png" />
          <row type="flex" justify="center">
            <i-col span="12">
              <p>QQ 群号：344875656</p>
            </i-col>
            <i-col span="12"></i-col>
          </row>
        </i-col>
        <i-col span="14">
          <div class="join-page-other">
            <Button to="https://reinness.com" target="_blank" size="large">
              <img src="../assets/images/logo-mini.png" class="join-page-other-icon" />
              平凡的你我
            </Button>
          </div>
        </i-col>
      </row>
    </Card>
  </div>
</template>

<script>
export default {
  name: "join_page",
  data() {
    return {};
  },
};
</script>
<style>
.join-page {
  text-align: center;
}
.qq-group-img {
  width: 350px;
}
.join-page-other-icon {
  width: 20px;
  vertical-align: middle;
  margin-right: 6px;
}
.join-page-other {
  text-align: left;
}
.join-page-other .ivu-btn {
  margin-right: 6px;
}
</style>
