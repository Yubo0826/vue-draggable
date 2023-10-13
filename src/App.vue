<template>
  <div class="page">
    <draggable tag="div" v-model="list" v-slot="{ element }">
      <div class="draggable" :style="{'background': element.color}">
        {{ element.name }}, {{ element.number }}
      </div>
    </draggable> 

    <div>Move Table Columns</div>
    <table>
      <thead>
        <draggable tag="tr" v-model="headers" v-slot="{ element }">
          <th>{{ element }}</th>
        </draggable>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.name">
          <td v-for="header, index in headers" :key="index">{{ header }}</td>
        </tr>
      </tbody>
    </table>

    <div>Move Table Rows</div>
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <draggable tag="tbody" v-model="list" v-slot="{ element }">
        <tr>
          <td v-for="header in headers" :key="header">{{ element[header] }}</td>
        </tr>
      </draggable>
    </table>

    <a href="https://github.com/Yubo0826/vue-draggable/blob/master/src/App.vue" target="_blank">View Code</a>
  </div>
</template>

<script setup lang="ts">
import draggable from './draggable'
// import draggable from './components/Draggable.vue'
import { ref } from 'vue'

interface Item {
  name: string;
  number: string;
  color: string;
}


const headers = ref<string[]>(['name', 'number', 'color']) 

const list = ref<Item[]>([
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

<style scoped>
.page {
  padding: 25px 50px;
}
.wrap {
  height: 1500px;
  background-color: cornsilk;
}
.draggable {
  display: inline-block;
  position: relative;
  width: 150px;
  height: 150px;
  margin: 20px;
  margin-bottom: 50px;
  padding: 10px;
  background-color: rgb(97, 223, 124);
  cursor: grab;
}
table {
  border-collapse: collapse;
  margin: 10px;
  margin-bottom: 30px;
  width: 500px;
}
tr {
  border: 1px solid black;
}
thead {
  background-color: rgb(192, 192, 192);
}
thead th {
  padding: 10px;
}
tbody tr:nth-child(odd) {
  background-color: rgb(97, 223, 124);
}
tbody tr:nth-child(even) {
  background-color: rgb(223, 97, 97);
}
</style>
