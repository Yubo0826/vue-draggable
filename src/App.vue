<template>
  <div class="page">
    <h1>vue-draggable-yubo Demo</h1>
    <div style="text-align: center;">
      <a href="https://github.com/Yubo0826/vue-draggable/blob/master/src/App.vue" class="effect effect-1" style="text-decoration: underline;" target="_blank">View Code</a>
    </div>
    <h2>Drag Box</h2>
    <div style="text-align: center;">
      <draggable 
        tag="transition-group" 
        v-model="list" 
        v-slot="{ element, key }" 
        transition-name="list"
        >
        <div :key="key" class="draggable" :style="{'background': element.color}">
          {{ element.name }}, {{ element.number }}
        </div>
      </draggable> 
    </div>

    <h2>Move Table Columns</h2> 
    <div style="text-align: center;">
      <table>
        <thead>
          <draggable tag="tr" v-model="headers" v-slot="{ element }">
            <th>{{ element }}</th>
          </draggable>
        </thead>
        <tbody>
          <tr v-for="item in list" :key="item.name">
            <td v-for="header in headers" :key="header">
              <span v-if="item.hasOwnProperty(header)">
                {{ item[header as keyof Item] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>


    <h2>Move Table Rows & Drag the handle icon</h2>
    <div style="text-align: center;">
      <table>
        <thead>
          <tr>
            <th v-for="header in headers" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <draggable tag="tbody" v-model="list" handle="handle" v-slot="{ element, key }">
          <tr :key="key">
            <td v-for="header, index in headers" :key="header">
              <img v-if="index === 0" src="@/assets/ios-drag.svg" class="handle">
              {{ element[header] }}
            </td>
          </tr>
        </draggable>
      </table>
    </div>

  </div>
</template>

<script setup lang="ts">
import draggable from './draggable'
import { ref } from 'vue'

interface Item {
  name: string;
  number: number;
  color: string;
}

const headers = ref<string[]>(['name', 'number', 'color']) 

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
body {
  max-width: 1200px;
  margin: auto;
}
h1, h2 {
  text-align: center;
}
h2 {
  margin-top: 35px;
}
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
  border-radius: 10px;
  background-color: rgb(97, 223, 124);
  color: white;
  cursor: grab;
}
.handle {
  cursor: grab;
}
table {
  border-collapse: separate;
  border-spacing: 0;
  margin: 10px auto;
  margin-bottom: 30px;
  width: 75%;
  max-width: 1200px;
}

@media screen and (max-width: 600px) {
  table {
    width: 100%;
  }
}

thead {
  background-color: #6f7bd9;
  color: white;
}
thead th {
  padding: 10px;
}

thead th:first-child {
  border-radius: 10px 0 0 0;
}
thead th:last-child {
  border-radius: 0 10px 0 0;
}

tbody td {
  padding: 10px;
  text-align: center;
}

tbody td img {
  float: left;
  cursor: grab;
}

tbody tr:nth-child(odd) {
  background-color: rgb(255, 255, 255);
}
tbody tr:nth-child(even) {
  background-color: rgb(233, 233, 233);
}

.list-move {
  transition: transform 0.15s;
}

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

.handle {
  height: 25px;
}

</style>
