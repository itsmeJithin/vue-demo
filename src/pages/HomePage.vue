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
                    <input class="form-control border-end-0 border" type="text" id="example-search-input"
                           placeholder="Search for an institute or a course">
                    <span class="input-group-append">
                <button class="btn btn-outline-secondary bg-white border-start-0 border-end-0 input-group-btn-white border ms-n5"
                        type="button">
                        <i class="fa fa-times"></i>
                    </button>
                    <button class="btn btn-outline-secondary bg-white border-start-0 input-group-btn-white border ms-n5"
                            type="button">
                        <i class="fa fa-search"></i>
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
                        <span class="fs-13">Filters:</span>
                    </div>
                    <div class="col-6">
                        <div class="btn-group pull-right" role="group" aria-label="Basic example">
                            <button type="button" class="btn btn-sm btn-outline-secondary bg-white btn-normal active">
                                Best Match
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary bg-white btn-normal">
                                Best Rank
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary bg-white btn-normal">
                                Acceptance Rate
                            </button>
                            <button type="button" class="btn btn-sm btn-outline-secondary bg-white btn-normal">
                                Tuition Fee
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
  import FilterComponent from '../components/home/FilterComponent';
  import SchoolCard from '../components/home/SchoolCard';
  import axios from "axios";
  import NoDataFoundComponent from '../components/home/NoDataFoundComponent';

  export default {
    name: "HomePage",
    components: {NoDataFoundComponent, SchoolCard, FilterComponent},
    data() {
      return {
        universities: null,
        appliedFilters: [],
        currentPage: 0,
        totalRecords: 0,
        recordsPerPage: 17,
        totalCourses: 0,
        isLoading: -1
      }
    },
    mounted() {
      this.getUniversities();
    },
    methods: {
      async getUniversities() {
        this.isLoading = 1;
        axios.get("https://run.mocky.io/v3/7e145c6d-3f1d-4c6a-bbfb-cd1c2e878820")
          .then(response => {
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
            this.isLoading = 0;
            console.log(error);
          });
      }
    }
  }
</script>

<style scoped>

</style>