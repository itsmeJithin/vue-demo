<template>

    <div class="filter-item-label" @click.prevent="removeFilter()">
        {{filter.name}}
        <i class="bi bi-x"></i>
    </div>

</template>

<script>
  import store from '../../store';

  export default {
    name: "AppliedFilterComponent",
    props: {
      filter: {
        type: Object,
        required: true
      }
    },
    methods: {
      removeFilter() {
        const query = {
          key: this.filter.key,
          value: this.filter.value
        };
        store.dispatch("filterStore/removeFilterItem", query);
      }
    }
  }
</script>

<style scoped>

</style>