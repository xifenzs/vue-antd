<template>
    <div :class="[`nav-theme-${navTheme}`,`nav-layout-${navLayout}`]">
        <a-layout id="components-layout-demo-side" style="min-height: 100vh">
            <a-layout-sider
                v-if="navLayout === 'left'"
                :theme="navTheme"
                :trigger="null"
                collapsible
                v-model="collapsed"
                width="256px"
            >
                <div class="logo">LOGO</div>
                <SiderMenu :theme="navTheme" />
            </a-layout-sider>
            <a-layout>
                <a-layout-header style="background: #fff; padding: 0">
                    <a-icon 
                        class="trigger"
                        :type=" collapsed ? 'menu-unfold' : 'menu-fold'"
                        @click=" collapsed = !collapsed"
                    />
                    <Header />
                </a-layout-header>
                <a-layout-content style="margin: 0 16px">
                    <a-breadcrumb style="margin: 16px 0">
                    <a-breadcrumb-item>User</a-breadcrumb-item>
                    <a-breadcrumb-item>Bill</a-breadcrumb-item>
                    </a-breadcrumb>
                    <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
                        <router-view />
                    </div>
                </a-layout-content>
                <a-layout-footer style="text-align: center">
                    <Footer />
                </a-layout-footer>
            </a-layout>
        </a-layout>
        <Settings />
    </div>
</template>
<script>
import Header from './components/Header'
import Footer from './components/Footer'
import SiderMenu from './components/SiderMenu'
import Settings from '../components/Settings'
export default {
    data() {
      return {
        collapsed: false,
      };
    },
    computed: {
        navTheme () {
            return this.$route.query.navTheme || 'dark'
        },
        navLayout () {
            return this.$route.query.navLayout || 'left'
        }
    },
    components: {
        Header,
        Footer,
        SiderMenu,
        Settings
    }
}
</script>
<style scoped>
.trigger{
    padding: 0 20px;
    line-height: 64px;
    font-size: 24px;
}
.trigger:hover{
    background: #eeeeee;
}
.logo{
    height: 64px;
    line-height: 64px;
    text-align: center;
    overflow: hidden;
}
.nav-theme-dark >>> .logo{
    color: #fff;
}
</style>