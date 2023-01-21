<script setup>
import { ref } from "vue";
import axios from "axios";
import { useStore } from "../store/index.js";

const store = useStore();
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
          <p class="p1">{{ response.original_title }}</p>
          <br />
          <p class="p2">Release date: {{ response.release_date }}</p>
          <br />
          <p class="p3">{{ response.overview }}</p>
          <br />
          <p class="p4"><a :href="`https://www.youtube.com/embed/${response.videos.results[0].key}`" target="_blank">Click here
              for the movie trailer!</a></p>
        </div>
        <button class="purchase" 
          @click="
            store.addToCart(props.id, {
              id: response.id,
              poster: response.poster_path,
              title: response.title,
              date: response.release_date,
              overview: response.overview,
            })
          "
        ><font-awesome-icon icon="fa-solid fa-cart-plus" /> Add to cart
        </button>
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
  height: 435px;
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

.p1 {
  font-size: 50px;
  position: relative;
  top: -20px;
  line-height: 40px;
  font-family: 'Bebas Neue', cursive;
  color: rgb(229, 9, 20);
}

.p2 {
  font-size: 20px;
  position: relative;
  top: -80px;
  font-family: 'Inconsolata', monospace;
}

.p3 {
  font-size: 20px;
  position: relative;
  top: -120px;
  font-family: 'Inconsolata', monospace;
}

.p4 {
  font-size: 20px;
  position: relative;
  top: -160px;
  left: 220px;
  font-family: 'Inconsolata', monospace;
}

a {
  color: white;
}

a:hover {
  color: rgb(229, 9, 20);
}

.purchase {
  position: relative;
  top: -165px;
  left: 330px;
}
</style>