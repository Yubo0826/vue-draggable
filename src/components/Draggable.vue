<template>
  <div ref="wrapDom">
    <div 
      v-for="item, index in list" 
      :key="'dragDOM' + index" 
      >
      <!-- draggable="true" 
      @dragstart="dragstart($event)" 
      @dragenter="dragEnter($event)" -->
      <slot :element="item"></slot>
    </div>
  </div>
</template> 
  
<script setup lang="ts">
  import { onMounted, ref } from 'vue'

  const props = defineProps(['list'])
  console.log(props.list)
  
  const wrapDom = ref()
  console.log(wrapDom);

  onMounted(() => {
    console.log(wrapDom.value.children)
    let itemList = wrapDom.value.children
    for (let i = 0; i < itemList.length; i++) {
      itemList[i].setAttribute('draggable', 'true')
      itemList[i].addEventListener('dragstart', dragstart)
      itemList[i].addEventListener('dragenter', dragEnter)
    }
  })
  
  let fromDom: any
  let toDom: any

  function dragstart(event: Event) {
    console.log('開始拖曳')
    fromDom = <EventTarget>event.target
    console.log(fromDom)
      
  }

  function dragEnter(event: Event) {
    console.log('進入')
    toDom = <EventTarget>event.target
    console.log(toDom)
    // if (!fromDom.contains(toDom)) {}
    swap(fromDom, toDom)
  }

  function swap(from: any, to: any) {
    if (from === to) return
    if (from.nextElementSibling === to) {
      // 開始動作前 from為to上一個節點
      wrapDom.value.insertBefore(to, from)
    } else {
      // 開始動作前 from為to下一個節點
      wrapDom.value.insertBefore(from, to)
    }
  }

</script>

<style scoped>
.wrap {
  height: 1500px;
  background-color: cornsilk;
}
</style>
  