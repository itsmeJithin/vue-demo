<template>
    <div class="sidebar">
        <div class="scrollbar">
            <template v-if="availableFilters.length>0">
                <div v-for="(category,index) in availableFilters" :key="'category-filters'+index">
                    <FilterCategory :category="category"/>
                    <hr class="mb-0 m-t-5" v-if="index<availableFilters.length-1"/>
                </div>

            </template>
        </div>
    </div>
</template>

<script>
  import FilterCategory from './FilterCategory';
  import {mapGetters} from 'vuex';

  export default {
    name: "FilterComponent",
    components: {FilterCategory},
    computed: {
      ...mapGetters("filterStore", ["availableFilters"]),
    }
  }
</script>

<style scoped>

</style>