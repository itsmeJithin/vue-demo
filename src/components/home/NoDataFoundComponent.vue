<template>
    <div class="no-data">
        <div>
            <img alt="No data found." title="No data found."
                 src="assets/img/no-data-kuro.svg">
        </div>
        <h4 class="fs-20 text-dark fw-bold">No Matching Results</h4>
        <p>We couldn't find any results for your search. Try clearing some filters and try again.</p>
        <button class="btn btn-primary primary-btn">
            Clear All Filters
        </button>
    </div>
</template>

<script>
  export default {
    name: "NoDataFoundComponent"
  }
</script>

<style scoped>

</style>