<!--
 描述: 底部footer模板
 作者: Jack Chen
 日期: 2020-06-20
-->

<template>
  <div class="footer-container">
  	<div class="footer">
      <div class="copyright">
          Copyright@2020-2025 微信公众号<懒人码农> 湘ICP备19016532号-1
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Footer',
  components: {},
  data() {
  	return {
      
  	}
  },
  computed: {
  	
  },
  created() {},
  mounted() {
    
  },
  methods: {


  }
  	
}
</script>

<style lang="scss" scoped>
.footer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
  .footer {
    .copyright {
      color: #fff;
      font-size: 14px;
      background: #14143f;
      text-align: center;
      padding: 20px 40px;
    }
  }

}	
</style>
