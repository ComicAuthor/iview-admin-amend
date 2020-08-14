const {
  body
} = document
const WIDTH = 1000

import config from '@/config'

export default {
  beforeMount() {
    this.$_resizeHandler()
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    $_resizeHandler() {
      const rect = body.getBoundingClientRect()
      var isMobile_ = /Mobi/.test(navigator.userAgent) ? true : false;
      if (rect.width - 1 < config.mobileWidth) {
        isMobile_ = true
      } else if (rect.width - 1 > WIDTH) {
        isMobile_ = false
      }

      this.isMobile = isMobile_;
      if (isMobile_) {
        this.collapsed = false
      } else {
        if (rect.width - 1 < WIDTH) {
          this.collapsed = true
        } else {
          this.collapsed = false
        }
      }
      this.$forceUpdate();
    }
  }
}
