<template>
  <div>
    <a-drawer
      placement="right"
      :closable="false"
      :visible="visible"
      width="300px"
    >
      <template v-slot:handle>
        <div class="handle" @click="visible = !visible">
          <a-icon :type="visible ? 'close' : 'setting'" />
        </div>
      </template>
      <h4>主体模式</h4>
      <a-radio-group
        :value="$route.query.navTheme || 'dark'"
        @change=" e=> handleSettingChange('navTheme', e.target.value)"
      >
        <a-radio value="dark">黑色</a-radio>
        <a-radio value="light">白色</a-radio>
      </a-radio-group>
      <h4>导航模式</h4>
      <a-radio-group
        :value="$route.query.navLayout || 'left'"
        @change=" e=> handleSettingChange('navLayout', e.target.value)"
      >
        <a-radio value="left">左侧</a-radio>
        <a-radio value="top">顶部</a-radio>
      </a-radio-group>
    </a-drawer>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        visible: false
      };
    },
    methods: {
      handleSettingChange(type, value){
        this.$router.push({
          query: {...this.$route.query, [type]: value}
        })
      }
    }
  };
</script>
<style lang="less" scoped>
.handle{
  position: absolute;
  top: 240px;
  right: 300px;
  width: 48px;
  height: 48px;
  background: #1890ff;
  color: #fff;
  font-size: 20px;
  text-align: center;
  line-height: 48px;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
}
</style>
