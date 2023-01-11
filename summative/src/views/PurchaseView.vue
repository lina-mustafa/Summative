<script setup>
import { ref } from "vue";
import axios from "axios";
import SiteModal from '../components/SiteModal.vue';

const movies = ref("");
const response = ref(null);
const showModal = ref(false);
const selectedId = ref(0);

const openModal = (id) => {
  showModal.value = true;
  selectedId.value = id;
};

const closeModal = () => {
  showModal.value = false;
};

const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async () => {
  console.log(movies.value)
  response.value = (await getData(`https://api.themoviedb.org/3/trending/movie/week`, {
    params: {
      api_key: "5ee6242bedc5de8c07acae66ee444042",
    }
  })).data['results'];
}

await getMovies()

</script>

<template>
  <h1>Trending Movies:</h1>
  <div v-for="result in response" class="grid-container">
    <img @click="openModal(result.id)" v-bind:src="'http://image.tmdb.org/t/p/w500/' + result.poster_path">
  </div>
  <SiteModal v-if="showModal" @toggleModal="closeModal()" :id="selectedId"></SiteModal>
  
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");

.grid-container {
  display: flex;
  display: inline-grid;
  align-content: space-evenly;
  padding: 20px;
  gap: 10%;
  margin-bottom: -260px;
}

img {
  height: 50%;
  cursor: pointer;
}

h1 {
  font-family: 'Bebas Neue', cursive;
  font-size: 100px;
  color: rgb(229, 9, 20);
}
</style>