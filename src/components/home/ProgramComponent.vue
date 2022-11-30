<template>
    <div class="card program-card">
        <div class="program-details-parent">
            <div class="program-details">
                <div class="program-name">
                    <h6>{{course.name}}</h6>
                </div>
                <div class="type">
                    <a href="" class="program-type">
                        <i class="bx bxs-school"/>
                        <span class="a-link">{{course.school_name}}</span>
                    </a>
                </div>
                <div class="program-status-actions">
                    <div class="program-status">
                        <div class="single">
                            <i class="bi bi-mortarboard-fill"/>
                            <div class="data">
                                {{course.degree[0]}}
                            </div>
                        </div>
                        <div class="single">
                            <i class="bi bi-currency-dollar"/>
                            <div class="data">
                                {{course.tuition.value}}&nbsp;{{course.tuition.currency}}
                            </div>
                        </div>
                        <div class="single">
                            <i class="bi bi-calendar-date-fill"/>
                            <div class="data">
                                {{getYears()}} Years
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="action-btns">
            <button class="btn btn-outline-secondary action-btn">
                <i class="fa fa-heart-o me-1"></i>
                Add to Favorites
            </button>
            <button class="btn btn-outline-secondary action-btn-apply">
                Apply
            </button>
        </section>
    </div>
</template>

<script>
  export default {
    name: "ProgramComponent",
    props: {
      course: {
        required: true,
        type: Object
      }
    },
    methods: {
      getYears() {
        return Math.floor(this.course.duration / 365);
      }
    }
  }
</script>

<style scoped>

</style>