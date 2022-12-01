<template>
    <div class="filter-group-items">
        <div class="filter-group-item">
            <div class="form-check">
                <input type="checkbox" class="form-check-input form-check-box cursor-pointer"
                       v-if="isMultiSelectEnabled"
                       :id="generateId(categoryName)" v-model="selectedValue">
                <input class="form-check-input cursor-pointer" type="radio"
                       :name="generateName(categoryName)"
                       :id="generateId(categoryName)"
                       :value="filter.value"
                       v-else>
                <label class="form-check-label" :for="generateId(categoryName)">{{filter.name}}</label>
            </div>
            <div class="filter-action" v-if="filter.childItems&&filter.childItems.length>0"
                 @click.prevent="toggleAction">
                <i class="bi ms-auto" :class="isActionEnabled?'bi-chevron-right':'bi-chevron-down'"
                   aria-hidden="true"></i>
            </div>
        </div>
        <div class="child-items" v-if="isActionEnabled">
            <div class="search-bar">
                <input type="text" class="search-input" placeholder="Search" v-model="searchFilter">
                <div class="clear-icon-container">
                    <i class="bi bi-x cursor-pointer" v-if="searchFilter"></i>
                </div>
            </div>
            <div class="filter-child-item">
                <FilterCategoryItemChild v-for="(child,index) in availableChildItems" :key="'child-filter-'+index"
                                         :filter="child" :index="index" :child-filter-value="childFilterValue"/>
            </div>
        </div>
    </div>
</template>

<script>
  import _ from "lodash";
  import FilterCategoryItemChild from './FilterCategoryItemChild';
  import Fuse from "fuse.js";

  export default {
    name: "FilterCategoryItem",
    components: {FilterCategoryItemChild},
    props: {
      filter: {
        type: Object,
        required: true,
        default: () => {
          return {
            "childItems": [],
          }
        }
      },
      filterValue: {
        required: true,
        type: String
      },
      childFilterValue: {
        type: String
      },
      isMultiSelectEnabled: {
        required: true,
        default: true,
        type: Boolean
      },
      categoryName: {
        required: true,
        default: ""
      },
      index: {
        required: true,
        default: 0,
        type: Number
      }
    },
    data() {
      return {
        searchFilter: "",
        availableChildItems: [],
        searchItem: "",
        isActionEnabled: false,
        selectedValue: false,
        selectedChildValue: false,
        fuseInstance: null
      }
    },
    mounted() {
      if (this.filter.childItems && this.filter.childItems.length > 0) {
        this.availableChildItems = _.cloneDeep(this.filter.childItems);
        const options = {
          shouldSort: true,
          threshold: 0.4,
          location: 0,
          distance: 100,
          maxPatternLength: 32,
          minMatchCharLength: 1,
          keys: [
            "name"
          ]
        };
        this.fuseInstance = new Fuse(this.filter.childItems, options)
      }

    },
    watch: {
      /**
       * doing fuzzy search in child filters.
       *
       * @author Jithin Vijayan
       */
      searchFilter() {
        if (this.searchFilter) {
          const searchResult = this.fuseInstance.search(this.searchFilter);
          this.availableChildItems = _.map(searchResult, 'item');
        } else {
          this.availableChildItems = _.cloneDeep(this.filter.childItems);
        }
      },
      selectedValue() {
        let query = {};
        if (this.selectedValue) {
          query[this.filterValue] = this.filter.value;
          this.isActionEnabled = true;
        }
        console.log(query);
      },
    },
    methods: {
      toggleAction() {
        this.isActionEnabled = !this.isActionEnabled;
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