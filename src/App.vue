<template>
    <div id="app">
        <HeaderComponent/>
        <div class="main p-3">
            <div class="container">
                <HomePage/>
            </div>
        </div>
    </div>
</template>

<script>
  import HeaderComponent from './components/common/HeaderComponent';
  import HomePage from './pages/HomePage';

  export default {
    name: 'App',
    components: {
      HomePage,
      HeaderComponent
    }
  }
</script>

<style>
</style>
