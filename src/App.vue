<template>
    <div id="app">
        <HeaderComponent/>
        <div class="main p-3">
            <div class="container">
                <component :is="dynamicComponent"/>
            </div>
        </div>
    </div>
</template>

<script>
  import HeaderComponent from './components/common/HeaderComponent';
  import HomePage from './pages/HomePage';

  export default {
    name: 'App',
    components: {
      HomePage,
      HeaderComponent
    },
    data() {
      return {
        dynamicComponent: HomePage,
      }
    },
    computed: {
      routeMetaData() {
        return this.$router.currentRoute.meta
      }
    },
    mounted() {
      this.findComponent();
    },
    watch: {
      $route(to) {
        this.findComponent(to.meta);
      }
    },
    methods: {
      findComponent(metaData) {
        const data = metaData || this.routeMetaData;
        if (data) {
          const {code: menuCode} = data;
          switch (menuCode) {
            case "HOME": {
              this.dynamicComponent = HomePage;
              break;
            }
            case "UNIVERSITY_DETAILS":
              this.dynamicComponent = HomePage;
              break;
            default:
              this.dynamicComponent = null;
          }
        }
      }
    }
  }
</script>

<style>
</style>
