<template>
    <div class="filter-category">
        <div class="filter-head pb-0">
            <span> <h4 class="title">{{category.name}}</h4> </span>
            <div class="filter-action" @click.prevent="toggleAction">
                <i class="bi ms-auto" :class="isActionEnabled?'bi-chevron-right':'bi-chevron-down'"
                   aria-hidden="true"></i>
            </div>
        </div>
        <div class="filter-list mb-1" v-if="isActionEnabled">
            <FilterCategoryItem v-for="(filter,index) in category.filterItems"
                                :key="'category-'+index"
                                :filter="filter"
                                :index="index"
                                :category-name="category.name"
                                :is-multi-select-enabled="category.isMultiSelectEnabled"/>
        </div>
    </div>
</template>

<script>
  import FilterCategoryItem from './FilterCategoryItem';

  export default {
    name: "FilterCategory",
    components: {FilterCategoryItem},
    props: {
      category: {
        required: true,
        default() {
          return {
            filterItems: []
          }
        }
      }
    },
    data() {
      return {
        isActionEnabled: true
      }
    },
    methods: {
      toggleAction() {
        this.isActionEnabled = !this.isActionEnabled;
      }
    }
  }
</script>

<style scoped>

</style>