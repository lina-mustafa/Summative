<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const username = ref("");
const password = ref("");
const error = ref(false);

const login = () => {
  if (username.value === "tmdb" && password.value === "movies") {
    router.push("/purchase");
  } else {
    error.value = true;
  }
};
</script>

<template>
  <div class="home-container">
    <h1>Login:</h1>
    <form @submit.prevent="login()">
      <input type="text" v-model="username" placeholder="Username" />
      <br/>
      <input type="password" v-model="password" placeholder="Password" />
      <br/>
      <input type="submit" value="Login" />
    </form>
    <div v-if="error" class="error">
      <p>Incorrect username/password!</p>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap");
h1{
    font-family: 'Bebas Neue', cursive;
    font-size: 100px;
    color: rgb(229, 9, 20);
}

form input{
    padding: 6px;
    color: rgb(229, 9, 20);
    font-size: 15px;
    font-weight: bold;

}
</style>