<template>
  <div>
  <user v-bind:user-id="null" ></user>

    <round-score round-id="1" v-bind:user-id="userId" ></round-score>
    <!-- <round-score round-id="2" v-bind:user-id="userId" ></round-score>
    <round-score round-id="3" v-bind:user-id="userId" ></round-score> -->
  </div>

</template>