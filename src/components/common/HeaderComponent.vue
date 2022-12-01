<template>
    <header id="header" class="header fixed-top d-flex align-items-center">

        <div class="d-flex align-items-center justify-content-between">
            <a href="index.html" class="logo d-flex align-items-center">
                <span class="d-none d-lg-block color-theme-primary">MySchool</span>
            </a>
        </div>

        <nav class="header-nav ms-auto">
            <ul class="d-flex align-items-center">
                <li class="nav-item dropdown">
                    <a class="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                        STUDY ABROAD GUIDE
                        <i class="fa fa-chevron-down ms-1"></i>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-icon" href="#">
                        FORUM
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-icon" href="#">
                        BLOG
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-icon" href="#">
                        ABOUT US
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-icon" href="#">
                        PRICING
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-icon" href="#">
                        LOGIN
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link nav-icon" href="#">
                        <button class="btn btn-primary primary-btn">Register</button>
                    </a>
                </li>


            </ul>
        </nav><!-- End Icons Navigation -->

    </header>
</template>

<script>
  export default {
    name: "HeaderComponent"
  }
</script>

<style scoped>

</style>