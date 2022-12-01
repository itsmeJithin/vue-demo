<template>
    <div class="form-check">
        <input type="checkbox" class="form-check-input form-check-box cursor-pointer"
               :id="generateId(filter.name)" :name="generateName(filter.name)" v-model="selectedChildValue"
               @change="triggerChange(filter)">
        <label class="form-check-label" :for="generateId(filter.name)">{{filter.name}}</label>
    </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import store from '../../store';
  import _ from 'lodash';

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
    computed: {
      ...mapGetters("filterStore", ["filters", "filtersLastModified"]),
    },
    mounted() {
      _.defer(() => {
        this.verifyAndToggleValues(true);
      })
    },
    watch: {
      filtersLastModified() {
        this.verifyAndToggleValues();
      },
    },
    methods: {
      triggerChange(filter) {
        let query = {
          "key": this.childFilterValue,
          "value": filter.value,
          "name": this.filter.name
        };
        if (this.selectedChildValue) {
          store.dispatch("filterStore/addFilterItems", query);
        } else {
          store.dispatch("filterStore/removeFilterItem", query);
        }
      },
      verifyAndToggleValues(fromMounted = false) {
        const value = this.$store.getters['filterStore/isFilterApplied'](this.childFilterValue, this.filter.value);
        if (value !== -1 && fromMounted) {
          this.selectedChildValue = true;
        } else if (value === -1) {
          this.selectedChildValue = false;
        }
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