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
  <!--<div v-for="movie in store.movies" class="grid-container">
    <img @click="openModal(result.id)" v-bind:src="'http://image.tmdb.org/t/p/w500/' + result.poster_path">
  </div>-->
  <RouterLink to="/cart" custom v-slot="{ navigate }">
    <button @click="navigate" role="link">Cart</button>
  </RouterLink>
  <select v-model="genre" @change="getGenres()">
    <option value="28">Action</option>
    <option value="27">Horror</option>
    <option value="18">Drama</option>
    <option value="35">Comedy</option>
    <option value="10751">Family</option>
  </select>
  <div class="purchase-container">
    <img v-for="movie in store.movies" :id="movie.id" @click="openModal(movie.id)"
      :src="`https://image.tmdb.org/t/p/w500${movie.poster}`" />
    <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.purchase-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  align-content: space-evenly;
  margin-bottom: -700px;
}

img {
  width: 250px;
  margin-top: 50px;
  margin-bottom: 50px;
  aspect-ratio: 2 / 3;
  cursor: pointer;
}

h1 {
  font-family: 'Bebas Neue', cursive;
  font-size: 100px;
  color: rgb(229, 9, 20);
}
</style>