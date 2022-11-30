<template>
    <div class="filter-group-items">
        <div class="filter-group-item">
            <div class="form-check">
                <input type="checkbox" class="form-check-input cursor-pointer"
                       v-if="isMultiSelectEnabled"
                       :id="generateId(categoryName)">
                <input class="form-check-input cursor-pointer" type="radio"
                       :name="generateName(categoryName)"
                       :id="generateId(categoryName)"
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
                <input type="text" class="search-input" placeholder="Search">
                <div class="clear-icon-container">
                    <i class="bi bi-x cursor-pointer" v-if="searchItem"></i>
                </div>
            </div>
            <div class="filter-child-item">
                <div class="form-check" v-for="(child,index) in childFilters" :key="'child-filter-'+index">
                    <input type="checkbox" class="form-check-input">
                    <label class="form-check-label">{{child.name}}</label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import _ from "lodash";

  export default {
    name: "FilterCategoryItem",
    props: {
      filter: {
        type: Object,
        required: true,
        default: () => {
          return {
            "childItems": []
          }
        }
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
        availableChildItems: [],
        childFilters: [],
        searchItem: "",
        isActionEnabled: false
      }
    },
    mounted() {
      if (this.filter.childItems && this.filter.childItems.length > 0)
        this.childFilters = _.cloneDeep(this.filter.childItems);
    },
    watch: {
      searchItem() {
        if (this.searchItem) {
          this.filterChildItems();
        } else {
          this.childFilters = this.filter.childItems;
        }
      }
    },
    methods: {
      async filterChildItems() {

      },
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