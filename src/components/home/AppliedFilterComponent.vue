<template>

    <div class="filter-item-label">
        {{filter.name}}
        <i class="bi bi-x"></i>
    </div>

</template>

<script>
  export default {
    name: "AppliedFilterComponent",
    props: {
      filter: {
        type: Object,
        required: true
      }
    }
  }
</script>

<style scoped>

</style>