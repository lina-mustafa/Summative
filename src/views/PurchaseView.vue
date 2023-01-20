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
  <RouterLink to="/cart" custom v-slot="{ navigate }">
    <button @click="navigate" role="link"><i class="fa fa-shopping-cart"> Cart</i></button>
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
     :src="`https://image.tmdb.org/t/p/w500${movie.poster}`"/>
    <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId" />
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");

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

select{
  margin-left: -600px;
  margin-top: -250px;
  padding: 10px;
  position: absolute;
  font-size: 20px;
  border-color: rgb(229, 9, 20);
  border-radius: 5px;
  border-width: 5px;
  cursor: pointer;
}

button {
  margin-top: -250px;
  margin-left: 470px;
  position: absolute;
  font-size: 20px;
  border-color: rgb(229, 9, 20);
  border-width: 5px;
  border-radius: 5px;
}

</style>