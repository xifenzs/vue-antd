<template>
  <div style="width: 256px">
    <a-menu
      :selectedKeys="selectedKeys"
      :openKeys.sync="openKeys"
      mode="inline"
      :theme="theme"
    >
      <template v-for="item in menuData">
        <a-menu-item 
          v-if="!item.children"
          :key="item.path"
          @click="() => $router.push({path:item.path, query: $route.query})"
        >
          <a-icon v-if="item.meta.icon" :type="item.meta.icon" />
          <span>{{item.meta.title}}</span>
        </a-menu-item>
        <sub-menu v-else :menu-info="item" :key="item.path" />
      </template>
    </a-menu>
  </div>
</template>

<script>
  /*
   * recommend SubMenu.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu.vue
   * SubMenu1.vue https://github.com/vueComponent/ant-design-vue/blob/master/components/menu/demo/SubMenu1.vue
   * */
import { check } from '../../utils/auth'
import SubMenu from './SubMenu';
export default {
    props: {
      theme: {
        type: String,
        default: "dark"
      }
    },
    components: {
      'sub-menu': SubMenu,
    },
    watch: {
      "$route.path": function(val){
        this.selectedKeys = this.selectedKeysMap[val]
        this.openKeys = this.collapsed ? [] : this.openKeysMap[val]
      }
    },
    data() {
      this.selectedKeysMap = {}
      this.openKeysMap = {}
      const menuData = this.getMenuData(this.$router.options.routes)
      return {
        collapsed: false,
        selectedKeys: this.selectedKeysMap[this.$route.path],
        openKeys: this.collapsed ? [] : this.openKeysMap[this.$route.path],
        menuData,
      };
    },
    methods: {
      toggleCollapsed() {
        this.collapsed = !this.collapsed;
      },
      getMenuData(routes=[], parentKeys=[], selectedKey){
        const menuRes = []
        for(let item of routes) {
          // 过滤菜单列表中没有权限的菜单
          if(item.meta && item.meta.authority && !check(item.meta.authority)){
            break;
          }
          // 菜单是否在菜单蓝显示
          if(item.name && !item.hideMenu){ //路由有name且菜单不隐藏
            this.selectedKeysMap[item.path] = [selectedKey || item.path]
            this.openKeysMap[item.path] = parentKeys
            const newItem = {...item}
            delete newItem.children
            if(item.children && !item.hideChildrenMenu){
              newItem.children = this.getMenuData(item.children,[
                ...parentKeys,
                item.path
              ])
            } else {
              this.getMenuData(
                item.children,
                selectedKey ? parentKeys : [...parentKeys,item.path],
                selectedKey || item.path
              )
            }
            menuRes.push(newItem)
          } else if(!item.hideMenu && !item.hideChildrenMenu && item.children){
            menuRes.push(...this.getMenuData(item.children,[...parentKeys, item.path]))
          }
        }
        return menuRes
      }
    }
  };
  </script>
