<script setup>
import { ref } from "vue";
import axios from "axios";

const props = defineProps(["id"]);
const response = ref(null);
const emits = defineEmits(["toggleModal"]);

const getData = async (url, params) => {
  try {
    return await axios.get(url, params);
  } catch (error) {
    console.log(error);
  }
};

const getMovies = async (movies) => {
  response.value = (await getData(`https://api.themoviedb.org/3/movie/${props.id}`, {
    params: {
      api_key: "5ee6242bedc5de8c07acae66ee444042",
      append_to_response: "videos",
    }
  })).data;
}

await getMovies(props.id)
console.log(response.value);

</script>

<template>
  <Teleport to="body">
    <div class="modal-outer-container" @click.self="emits('toggleModal')">
      <div class="modal-inner-container">
        <button class="close-button" @click="emits('toggleModal')">X</button>
        <div class="description">
          <p1>{{ response.original_title }}</p1>
          <br />
          <p2>Release date: {{ response.release_date }}</p2>
          <br />
          <p3>{{ response.overview }}</p3>
          <br />
          <p4><a :href="`https://www.youtube.com/embed/${response.videos.results[0].key}`" target="_blank">Click here
              for the movie trailer!</a></p4>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Inconsolata&display=swap");

.modal-outer-container {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #00000099;
  z-index: 3;
}

.modal-outer-container .modal-inner-container {
  background-color: #1F2123;
  color: white;
  width: clamp(280px, 100%, 800px);
  height: 400px;
  position: relative;
}

.modal-outer-container .modal-inner-container .close-button {
  position: absolute;
  right: 0px;
  padding: 1rem;
  border: none;
  background: #1F2123;
  font-weight: bold;
  font-size: 1.25rem;
  color: white;
}

p1 {
  font-size: 50px;
  position: relative;
  top: 30px;
  font-family: 'Inconsolata', monospace;
}

p2 {
  font-size: 20px;
  position: relative;
  top: 70px;
  font-family: 'Inconsolata', monospace;
}

p3 {
  font-size: 20px;
  position: relative;
  top: 90px;
  font-family: 'Inconsolata', monospace;
}

p4 {
  font-size: 20px;
  position: relative;
  top: 110px;
  font-family: 'Inconsolata', monospace;
}

a {
  color: white;
}

a:hover {
  color: rgb(229, 9, 20);
}
</style>