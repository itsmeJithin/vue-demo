<template>
    <div class="sidebar">
        <div class="scrollbar">
            <template v-if="filters.length>0">
                <div v-for="(category,index) in filters" :key="'category-filters'+index">
                    <FilterCategory :category="category"/>
                    <hr class="mb-0 m-t-5" v-if="index<filters.length-1"/>
                </div>

            </template>
        </div>
    </div>
</template>

<script>
  import axios from "axios";
  import FilterCategory from './FilterCategory';

  export default {
    name: "FilterComponent",
    components: {FilterCategory},
    data() {
      return {
        filters: []
      }
    },
    mounted() {
      this.getFilters();
    },
    methods: {
      async getFilters() {
        axios.get("https://run.mocky.io/v3/fadaaaf3-c582-4091-8553-b3192de7a5cf")
          .then(response => {
            if (response.data) {
              this.filters = response.data;
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>

</style>