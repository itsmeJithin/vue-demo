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
      ...mapGetters("filterStore", ["filters"]),
    },
    mounted() {
      if (this.checkFilterAlreadyApplied() !== -1) {
        this.selectedChildValue = true;
      }
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
      generateName(value) {
        let newValue = value.replaceAll(" ", "_");
        return newValue.toLowerCase();
      },
      generateId(value) {
        let newValue = value.replaceAll(" ", "_");
        return newValue.toLowerCase() + "_" + this.index;
      },
      checkFilterAlreadyApplied() {
        if (this.filters[this.childFilterValue] && this.filters[this.childFilterValue].length) {
          return _.findIndex(this.filters[this.childFilterValue], item => {
            return this.filter.value === item.value;
          });
        }
        return -1;
      },
    }
  }
</script>

<style scoped>

</style>