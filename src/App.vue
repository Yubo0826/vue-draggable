<template>
  <div class="page">
    <draggable tag="div" v-model="list" v-slot="{ element }">
      <div class="draggable" :style="{'background': element.bg_color, 'color': element.color}">
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
          <td v-for="header in headers" :key="header">{{ item[header] }}</td>
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
  </div>
</template>

<script setup lang="ts">
import draggable from './draggable'
// import draggable from './components/Draggable.vue'
import { ref } from 'vue'

const headers = ref(['name', 'number', 'color'])

const list = ref([
  {
    name: 'LBJ',
    number: '23',
    bg_color: 'yellow',
    color: 'black'
  },
  {
    name: 'Wemby',
    number: '1',
    bg_color: 'silver',
    color: 'black'
  },
  {
    name: 'Luka',
    number: '77',
    bg_color: 'blue',
    color: 'white'
  },
  {
    name: 'Tre',
    number: '88',
    bg_color: 'red',
    color: 'white'
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
