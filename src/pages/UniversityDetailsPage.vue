<template>
    <div class="main-margin-less bg-white">
        <div class="container">
            <div class="container university-header">
                <div class="row">
                    <div class="col-12" v-if="universityDetails">
                        <div class="container m-4">
                            <div class="pagetitle">
                                <nav>
                                    <ol class="breadcrumb">
                                        <li class="breadcrumb-item">
                                            <a href="/">
                                                <i class="fa fa-home"></i>
                                            </a>
                                        </li>
                                        <li class="breadcrumb-item non-active">Explore Schools</li>
                                        <li class="breadcrumb-item active">
                                            {{universityDetails?universityDetails.name:''}}
                                        </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                        <div class="container display-flex">
                            <div class="w-4/6 align-items-center m-4 mt-0 display-flex">
                                <div>
                                    <img class="university-logo handle-broken"
                                         :src="universityDetails?universityDetails.logo:''"
                                         alt="" title=""/>
                                </div>
                                <div>
                                    <div class="display-flex align-items-center">
                                        <h3 class="mb-2 fw-bold university-title">
                                            {{universityDetails?universityDetails.name:''}}
                                        </h3>
                                    </div>
                                    <div class="display-flex align-items-center">
                                        <div class="location display-flex">
                                            <div class="location-city fs-18">
                                                <i class="fa fa-map-marker map"></i> {{getAddress()}}
                                            </div>
                                            <div class="location-country ms-2 fs-14">
                                                <i class="fa fa-circle circle"></i>
                                                {{universityDetails.address.country}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="display-flex align-items-center mt-1">
                                        <div class="location display-flex">
                                            <div class="location-city">
                                                <i class="fa fa-certificate map"></i> ISC Global Rank: {{getRank()}}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="display-flex align-items-center w-100 mt-1">
                                        <div class="location display-flex w-100">
                                            <div class="location-city align-self-center">
                                                <i class="bx bxs-school map"></i> School:
                                            </div>
                                            <div class="location-country ms-2 w-70">
                                                <select class="form-select">
                                                    <option value="">All</option>
                                                    <option v-for="school in universityDetails.schools"
                                                            :value="school.value"
                                                            :key="school.value">
                                                        {{school.name}}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="w-2/6 justify-content-end display-flex">
                                <img class="campus-header-image university-img"
                                     src="https://cdn.ischoolconnect.com/common-files/uni-illustration-bg.svg">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import axios from "axios";
  import _ from 'lodash';

  export default {
    name: "UniversityDetailsPage",
    data() {
      return {
        universityDetails: null
      }
    },
    mounted() {
      this.getUniversityDetails();
    },
    methods: {
      async getUniversityDetails() {
        const params = this.$route.params;
        console.log(params);
        axios.get("https://run.mocky.io/v3/1d62b877-ae24-49bc-ab09-6bdde90457f8", {
          params: params
        })
          .then(response => {
            this.universityDetails = response.data;
          })
          .catch(error => {
            console.log(error);
          })
      },
      getAddress() {
        return this.universityDetails.address.city + ", " + this.universityDetails.address.state;
      },
      getRank() {
        return _.get(this.universityDetails.rank, 'isc_global.max');
      },
    }
  }
</script>

<style scoped>

</style>