<template>
    <div class="card p-3">
        <div class="school-container">
            <div class="school-container-header">
                <div class="left">
                    <img :src="university.logo" class="school-logo"/>
                </div>
                <div class="container-header">
                    <div class="container-title">
                        <div class="school-name">
                            {{university.name}}
                            <i class="fa fa-handshake-o partner-icon" v-if="!university.is_partner"></i>
                        </div>
                    </div>
                    <div class="location">
                        <div class="location-city">
                            <i class="fa fa-map-marker map"></i> {{getAddress()}}
                        </div>
                        <div class="location-country ms-2">
                            <i class="fa fa-circle circle"></i> {{university.address.country}}
                        </div>
                    </div>
                    <div class="status">
                        <div class="item">
                            <i class="fa fa-certificate"></i>
                            <div class="data">
                                <div class="value">{{getRank()}}</div>
                                <div class="label">iSC Rank</div>
                            </div>
                        </div>
                        <div class="item">
                            <i class="bi bi-person-check-fill"></i>
                            <div class="data">
                                <div class="value">{{university.stats.acceptance_rate}}%</div>
                                <div class="label">Acceptance Rate</div>
                            </div>
                        </div>
                        <div class="item">

                        </div>
                    </div>
                </div>
            </div>
            <div class="programs">
                <ProgramComponent v-for="(course,index) in university.courses" :course="course" :key="'course_'+index"/>
                <div class="view-more-programs">View all {{university.courses_count>99?'99+':university.courses_count}}
                    Courses
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import _ from "lodash";
  import ProgramComponent from './ProgramComponent';

  export default {
    name: "SchoolCard",
    components: {ProgramComponent},
    props: {
      university: {
        type: Object,
        required: true
      }
    },
    methods: {
      getAddress() {
        return this.university.address.city + ", " + this.university.address.state;
      },
      getRank() {
        return _.get(this.university.rank, 'isc_global.max');
      }
    }
  }
</script>

<style scoped>

</style>