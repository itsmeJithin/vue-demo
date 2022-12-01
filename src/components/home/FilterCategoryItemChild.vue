<template>
    <div class="form-check">
        <input type="checkbox" class="form-check-input form-check-box cursor-pointer"
               :id="generateId(filter.name)" :name="generateName(filter.name)" v-model="selectedChildValue"
               @change="triggerChange(filter)">
        <label class="form-check-label" :for="generateId(filter.name)">{{filter.name}}</label>
    </div>
</template>

<script>
  export default {
    name: "FilterCategoryItemChild",
    props: {
      filter: {
        type: Object,
        required: true
      },
      childFilterValue: {
        type: String
      },
      index: {
        required: true,
        default: 0,
        type: Number
      }
    },
    data() {
      return {
        selectedChildValue: false
      }
    },
    methods: {
      triggerChange(filter) {
        let query = {};
        if (this.selectedChildValue) {
          query[this.childFilterValue] = filter.value;
        }
        console.log(query);
      },
      generateName(value) {
        let newValue = value.replaceAll(" ", "_");
        return newValue.toLowerCase();
      },
      generateId(value) {
        let newValue = value.replaceAll(" ", "_");
        return newValue.toLowerCase() + "_" + this.index;
      }
    }
  }
</script>

<style scoped>

</style>