<template>
    <div id="app">
        <HeaderComponent/>
        <div :class="currentMenuCode==='HOME'?'main p-3':'main-margin-less'">
            <div :class="currentMenuCode==='HOME'?'container':'container-no-margin'">
                <component :is="dynamicComponent"/>
            </div>
        </div>
    </div>
</template>

<script>
  import HeaderComponent from './components/common/HeaderComponent';
  import HomePage from './pages/HomePage';
  import UniversityDetailsPage from './pages/UniversityDetailsPage';

  export default {
    name: 'App',
    components: {
      HomePage,
      HeaderComponent
    },
    data() {
      return {
        dynamicComponent: HomePage,
        currentMenuCode: "HOME"
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
              this.currentMenuCode = "HOME";
              this.dynamicComponent = HomePage;
              break;
            }
            case "UNIVERSITY_DETAILS":
              this.currentMenuCode = "UNIVERSITY_DETAILS";
              this.dynamicComponent = UniversityDetailsPage;
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
