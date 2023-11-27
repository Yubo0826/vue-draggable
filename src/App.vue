<template>
  <div class="page">
    <draggable 
      tag="transition-group" 
      handle="handle" 
      v-model="list" 
      v-slot="{ element, key }" 
      transition-name="list"
      >
      <div :key="key" class="draggable" :style="{'background': element.color}">
        <div class="handle">
          handle me
        </div>
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
      <draggable tag="tbody" v-model="list" v-slot="{ element, key }">
        <tr :key="key">
          <td v-for="header in headers" :key="header">{{ element[header] }}</td>
        </tr>
      </draggable>
    </table>

    <a href="https://github.com/Yubo0826/vue-draggable/blob/master/src/App.vue" class="effect effect-1" target="_blank">View Code</a>

  </div>
</template>

<script setup lang="ts">
import draggable from './draggable'
// import draggable from './components/Draggable.vue'
import { ref } from 'vue'

interface Item {
  name: string;
  number: number;
  color: string;
}

const train = ref<string[]>(['a', 'b', 'c', 'd', 'e'])

const headers = ref<string[]>(['name', 'number', 'color']) 

const items = ref([
  { id: 1, text: 'Learn JavaScript' },
  { id: 2, text: 'Learn Vue' },
  { id: 3, text: 'Build something awesome' }
])

const list = ref<Item[]>([
  {
    name: 'King James',
    number: 23,
    color: 'yellow'
  },
  {
    name: 'Wemby',
    number: 99,
    color: 'silver'
  },
  {
    name: 'Luka Magic',
    number: 77,
    color: 'dodgerblue'
  },
  {
    name: 'D-Rose',
    number: 55,
    color: 'crimson'
  },
  {
    name: 'Kobe',
    number: 24,
    color: 'purple'
  },
  {
    name: 'Curry',
    number: 30,
    color: 'goldenrod'
  },
  {
    name: 'Kawhi',
    number: 2,
    color: 'black'
  },
  {
    name: 'KD',
    number: 7,
    color: 'blue'
  },
  {
    name: 'Harden',
    number: 13,
    color: 'red'
  },
  {
    name: 'Westbrook',
    number: 0,
    color: 'orange'
  }
])

</script>

<style>
.container {
  position: relative;
}
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
}
.handle {
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

.list-move {
  transition: transform 0.15s;
}

/* .list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
} */

.effect {
	 text-align: center;
	 display: inline-block;
	 position: relative;
	 text-decoration: none;
	 color: #4e4c4c;
	 text-transform: capitalize;
	/* background-color: - add your own background-color */
	 font-family: 'Roboto', sans-serif;
	/* put your font-family */
	 font-size: 18px;
	 padding: 20px 0px;
	 width: 150px;
	 border-radius: 6px;
	 overflow: hidden;
}

.effect.effect-1 {
	 transition: all 0.2s linear 0s;
}
 .effect.effect-1:before {
	 content: "👉";
	 font-family: FontAwesome;
	 font-size: 15px;
	 position: absolute;
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 right: 0;
	 top: 0;
	 opacity: 0;
	 height: 100%;
	 width: 40px;
	 transition: all 0.2s linear 0s;
}
 .effect.effect-1:hover {
	 text-indent: -20px;
}
 .effect.effect-1:hover:before {
	 opacity: 1;
	 text-indent: 0px;
}

</style>
