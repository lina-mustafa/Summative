<script setup>
import { ref } from "vue";
import axios from "axios";
import SiteModal from '../components/SiteModal.vue';
import { useStore } from "../store/index.js"

const store = useStore();
const genre = ref(28);
const showModal = ref(false);
const selectedId = ref(0);

const openModal = (id) => {
  showModal.value = true;
  selectedId.value = id;
};

const closeModal = () => {
  showModal.value = false;
};

const getGenres = async () => {
  await store.getMovies(genre.value);
};

const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};

</script>

<template>
  <h1>Trending Movies:</h1>
  <p>Select a genre:</p>
  <RouterLink to="/cart" custom v-slot="{ navigate }">
    <button @click="navigate" role="link"><font-awesome-icon icon="fa-solid fa-cart-shopping" /> Cart</button>
  </RouterLink>
  <select v-model="genre" @change="getGenres()">
    <option value="28">Action</option>
    <option value="27">Horror</option>
    <option value="18">Drama</option>
    <option value="35">Comedy</option>
    <option value="10751">Family</option>
  </select>
  <RouterLink to="/" custom v-slot="{ navigate }">
    <button class="home" @click="navigate" role="link"><font-awesome-icon icon="fa-solid fa-house" /> Home</button>
  </RouterLink>
  <div class="purchase-container">
    <img v-for="movie in store.movies" :id="movie.id" @click="openModal(movie.id)"
     :src="`https://image.tmdb.org/t/p/w500${movie.poster}`"/>
    <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Sofia+Sans&display=swap");

.purchase-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  align-content: space-evenly;
  margin-bottom: -700px;
}

img {
  width: 250px;
  margin-top: 30px;
  margin-bottom: 50px;
  aspect-ratio: 2 / 3;
  cursor: pointer;
}

h1 {
  font-family: 'Bebas Neue', cursive;
  font-size: 100px;
  color: rgb(229, 9, 20);
}

p {
  margin-top: -50px ;
  padding-bottom: 70px;
  font-size: 25px;
  font-family: 'Inconsolata', monospace;
}

select {
  margin-left: -55px;
  margin-top: -80px;
  padding: 5px ; 
  position: absolute;
  font-size: 20px;
  border-color: rgb(229, 9, 20);
  border-radius: 5px;
  border-width: 5px;
  cursor: pointer;
  font-family: 'Sofia Sans', sans-serif;
}

button {
  margin-top: -310px;
  margin-left: 470px;
  position: absolute;
  font-size: 20px;
  border-color: rgb(229, 9, 20);
  border-width: 5px;
  border-radius: 5px;
}

.home {
  margin-top: -310px;
  margin-left: -590px;
}

</style>