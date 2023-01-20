<script setup>
</script>

<template>
    <h1>MOVIESGO</h1> 
    <br>
    <RouterLink to="/login" custom v-slot="{ navigate }">
    <button @click="navigate" role="link">Login</button>
    </RouterLink>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

h1{
    font-size: 150px;
    margin-top: 20px;
    font-family: 'Bebas Neue', cursive;
}

button{
    color: black;
    border-width: 4px;
    border-color: rgb(229, 9, 20);
    position: relative; top: -110px;
    font-family: 'Bebas Neue', cursive;
    size: 30px;
    font-size: 30px;
    padding-top: 5px;
    padding-bottom: 5px;
    padding-left: 30px;
    padding-right: 30px;
}

</style>