<script setup>
import { useStore } from "../store/index.js";

const store = useStore();

</script>

<template>
  <h4>My Cart</h4>
  <RouterLink to="/purchase" custom v-slot="{ navigate }">
    <button class="purchase-b" @click="navigate" role="link"><font-awesome-icon icon="fa-solid fa-cart-plus" /> Continue shopping </button>
  </RouterLink>
  <div class="container" v-for="movie in Array.from(store.cart.values())">
  <img class="img" :src ="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
  <h1>{{ movie.title }}</h1>
  <h2>{{ movie.date }}</h2>
  <h3>{{ movie.overview }}</h3>
  <button class="remove" @click="store.removeFromCart(movie.id)"><font-awesome-icon icon="fa-solid fa-circle-xmark" /></button>
  </div>
</template>

<style scoped>

.img {
  width: 200px;
  aspect-ratio: 2 / 3;
  float: left;
  padding-left: 10px;
  margin-top: 220px;
  margin-bottom: -100px;
}

h1 {
  padding-top: 250px;
  margin-left: 250px;
  text-align: left;
  font-family: 'Bebas Neue', cursive;
}

h2 {
  margin-left: 250px;
  text-align: left;
  font-family: 'Inconsolata', monospace;
}

h3 {
  margin-left: 250px;
  text-align: left;
  font-family: 'Inconsolata', monospace;
}

h4 {
  font-family: 'Bebas Neue', cursive;
  font-size: 100px;
  color: rgb(229, 9, 20);
  position: absolute;
  margin-top: 100px;
  margin-left: 450px;
}
.purchase-b {
  margin-top: 10px;
  /* margin-bottom: -800px; */
  margin-left: 940px;
  padding: 15px;
  font-size: 20px;
  border-color: rgb(229, 9, 20);
  border-width: 5px;
  border-radius: 5px;
}

.container{
  align-content: space-evenly;
  margin-bottom: -100px;
}

.remove {
  background-color: transparent;
  color: white;
  font-size: 30px;
  float: right;
  margin-top: -260px;
}
</style>