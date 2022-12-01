<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="pagetitle">
                    <nav>
                        <ol class="breadcrumb">
                            <li class="breadcrumb-item">
                                <a href="index.html">
                                    <i class="fa fa-home"></i>
                                </a>
                            </li>
                            <li class="breadcrumb-item active">Explore Schools</li>
                        </ol>
                    </nav>
                </div>
                <div class="input-group">
                    <input class="form-control border-end-0 border search-box" type="text" id="example-search-input"
                           placeholder="Search for an institute or a course" v-model="searchText" autocomplete="off">
                    <span class="input-group-append">
                    <button class="btn btn-outline-secondary bg-white border-start-0 border-end-0 input-group-btn-white border ms-n5"
                            type="button" @click.prevent="clearText()">
                        <i class="fa" :class="this.searchText?'fa-times':''"></i>
                    </button>
                    <button class="btn btn-outline-secondary bg-white border-start-0 input-group-btn-white border ms-n5"
                            type="button" @click.prevent="searchNow()">
                        <i class="fa fa-search" :class="!this.searchText?'color-gray':''"></i>
                    </button>
                </span>
                </div>
            </div>
            <div class="col-12 mt-2">
                <span class="fs-13">You found <b>{{totalRecords}}</b> institutes and <b>{{totalCourses}}</b> courses</span>
            </div>
            <div class="col-12">
                <hr/>
            </div>
            <div class="col-12">
                <div class="row">
                    <div class="col-6">
                        <div class="applied-filters">
                            <div class="filter-items">
                                <div class="filter-title">
                                    Filters:
                                </div>
                                <AppliedFilterComponent v-for="filter in appliedFilters"
                                                        :key="filter.value"
                                                        :filter="filter"/>
                            </div>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="btn-group pull-right" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-sm btn-outline-secondary btn-normal"
                                    :class="sorting.sortKey==='_score'?'active':''"
                                    @click.prevent="toggleSorting('_score')">
                                Best Match
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary btn-normal btn-border"
                                    :class="sorting.sortKey==='best_rank'?'active':''"
                                    @click.prevent="toggleSorting('best_rank')">
                                Best Rank
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary btn-normal"
                                    :class="sorting.sortKey==='acceptance_rate'?'active':''"
                                    @click.prevent="toggleSorting('acceptance_rate')">
                                Acceptance Rate
                                <i class="fa fa-sort ms-1" :class="getSortingIcon('acceptance_rate')"></i>
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary btn-normal"
                                    :class="sorting.sortKey==='tuition_fee'?'active':''"
                                    @click.prevent="toggleSorting('tuition_fee')">
                                Tuition Fee
                                <i class="fa fa-sort ms-1" :class="getSortingIcon('tuition_fee')"></i>
                            </button>
                        </div>
                    </div>

                </div>
            </div>
            <div class="col-12">
                <hr/>
            </div>
            <div class="col-12">
                <div class="filter-view">
                    <!--  Filter component -->
                    <FilterComponent/>
                    <div class="col ms-4">
                        <div class="pt-1-5">
                            <template v-if="isLoading===0">
                                <!--  University card -->
                                <SchoolCard v-for="(university,index) in universities" :university="university"
                                            :key="'university_'+index"/>
                                <!--  No data card -->
                                <NoDataFoundComponent v-if="!universities||universities.length===0"/>
                            </template>
                            <!--  Loader box -->
                            <div class="loader-box" v-if="isLoading===1">
                                <span class="loader"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  import axios from "axios";
  import _ from "lodash";
  import FilterComponent from '../components/home/FilterComponent';
  import SchoolCard from '../components/home/SchoolCard';
  import NoDataFoundComponent from '../components/home/NoDataFoundComponent';
  import AppliedFilterComponent from '../components/home/AppliedFilterComponent';
  import store from '../store';

  export default {
    name: "HomePage",
    components: {AppliedFilterComponent, NoDataFoundComponent, SchoolCard, FilterComponent},
    data() {
      return {
        universities: null,
        appliedFilters: [],
        currentPage: 0,
        totalRecords: 0,
        recordsPerPage: 17,
        totalCourses: 0,
        isLoading: -1,
        sorting: {
          sortKey: "_score",
          sortDirection: ""
        },
        searchText: "",
      }
    },
    computed: {
      ...mapGetters("filterStore", ["filters", "isFilterUpdated"]),
    },
    mounted() {
      if (this.$route.query.sort_key && this.$route.query.sort_key !== this.sorting.sortKey) {
        this.sorting.sortKey = this.$route.query.sort_key;
      }
      if (this.$route.query.sort_direction && this.$route.query.sort_direction !== this.sorting.sortDirection) {
        this.sorting.sortDirection = this.$route.query.sort_direction;
      }
      if (this.$route.query.search_text)
        this.searchText = this.$route.query.search_text;
      this.getUniversities();
    },
    watch: {
      isFilterUpdated() {
        if (this.isFilterUpdated) {
          this.appliedFilters = _.flatMapDeep(this.filters, item => {
            return item;
          });
          this.getUniversities();
        }
      },
      searchText() {
        if (this.$route.query.search_text !== this.searchText)
          this.updateRouter();
      },
      $route(to) {
        console.log(to);
      }
    },
    methods: {
      /**
       * fetching universities and details
       *
       * @author Jithin Vijayan
       * @returns {Promise<void>}
       */
      async getUniversities() {
        this.isLoading = 1;
        const queryParams = {};
        if (this.$route.query.sort_key) {
          queryParams.sort_key = this.$route.query.sort_key;
        }
        if (this.$route.query.sort_direction) {
          queryParams.sort_direction = this.$route.query.sort_direction;
        }
        if (this.$route.query.search_text) {
          queryParams.search_text = this.$route.query.search_text;
        }
        _.each(this.filters, (filter, key) => {
          queryParams[key] = _.map(filter, (item) => {
            return item.value
          })
        });
        axios.get("https://run.mocky.io/v3/a1f1748f-bffb-4f55-9fcc-be7ca3f369e1", {
          params: queryParams
        })
          .then(response => {
            store.dispatch("filterStore/resetFilterChangeFlag");
            this.isLoading = 0;
            if (response.data) {
              const responseData = response.data;
              this.universities = responseData.data.results;
              this.totalRecords = responseData.data.total;
              this.totalCourses = responseData.data.total_courses_count;
            } else {
              console.log(response);
            }
          })
          .catch(error => {
            store.dispatch("filterStore/resetFilterChangeFlag");
            this.isLoading = 0;
            console.log(error);
          });
      },
      toggleSorting(value) {
        if (this.sorting.sortKey === value && (value === '_score' || value === 'best_rank'))
          return;
        this.sorting.sortKey = value;
        if (value !== '_score' && value !== 'best_rank') {
          this.sorting.sortDirection = !this.sorting.sortDirection || this.sorting.sortDirection === 'DESC' ? "ASC" : "DESC";
        } else
          this.sorting.sortDirection = "";
        this.updateRouter()
      },
      getSortingIcon(value) {
        if (this.sorting.sortDirection === "DESC" && this.sorting.sortKey === value) {
          return "fa-sort-desc";
        } else if (this.sorting.sortDirection === "ASC" && this.sorting.sortKey === value) {
          return "fa-sort-asc";
        }
        return "fa-sort";
      },
      updateRouter() {
        let query = {};
        if (this.sorting.sortKey)
          query.sort_key = this.sorting.sortKey;
        if (this.sorting.sortDirection)
          query.sort_direction = this.sorting.sortDirection;
        if (this.searchText)
          query.search_text = this.searchText;
        this.$router.push({
          path: '/',
          query: query
        });
        this.getUniversities();
      },
      clearText() {
        this.searchText = "";
      },
      searchNow() {
        if (this.searchText)
          this.getUniversities();
      }
    }
  }
</script>

<style scoped>

</style>