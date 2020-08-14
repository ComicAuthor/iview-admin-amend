export default {
  data () {
    return {
      ShowModule: false
    }
  },
  mounted () {
    this.ShowModule = true
  },
  destroyed () {
    this.ShowModule = false
  }
}
