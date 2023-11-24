<script setup>
import { ref } from 'vue'

const headers = ref(['name', 'number', 'color']) 

const list = ref([
  {
    name: 'King James',
    number: '23',
    color: 'yellow'
  },
  {
    name: 'Wemby',
    number: '1',
    color: 'silver'
  },
  {
    name: 'Luka Magic',
    number: '77',
    color: 'dodgerblue'
  },
  {
    name: 'D-Rose',
    number: '1',
    color: 'crimson'
  }
])
</script>

<template>
  <div class="greetings">
    <div>
      <transition-group name="list">
        <div v-for="header in headers" :key="header"> {{ header }} </div>
      </transition-group>
    </div>

    <button @click="headers.reverse()">test</button>

  </div>
</template>

<style scoped>
.list-move {
  transition: transform 0.5s;
}
.list-leave-active {
  position: absolute;
}
</style>
