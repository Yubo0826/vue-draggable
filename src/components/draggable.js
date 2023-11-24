import { ref, defineComponent, h, onMounted } from 'vue'

const mainFunc = function(props, { slots, emit }) {
  console.log(props)
  const wrapDom = ref(null)
  let fromDom
  let toDom

  onMounted(() => {
    // 為slot裡的根元素加上所需屬性
    let itemList = wrapDom.value.children
    for (let i = 0; i < itemList.length; i++) {
      itemList[i].setAttribute('draggable', 'true')
      itemList[i].setAttribute('id', i)
      itemList[i].addEventListener('dragstart', dragstart)
      itemList[i].addEventListener('dragenter', dragEnter)
    }
  })

  function dragstart(event) {
    console.log('dragstart')
    fromDom = event.target
  }

  function dragEnter(event) {
    console.log('dragEnter')
    toDom = event.currentTarget
    if (toDom !== fromDom) {
      getElementIndex(fromDom, toDom)
    }
  }

  function getElementIndex(from, to) {
    const fromIndex = parseInt(from.getAttribute('id'))
    const toIndex = parseInt(to.getAttribute('id'))
    updatePostion(fromIndex, toIndex)
  }

  function updatePostion(from, to) {
    console.log('updatePostion' + from + to)
    // 編譯器會把宣告那行與解構賦值那行搞混成一行
    // 所以要用分號隔開
    let newList = [...props.modelValue]
    // ;[newList[from], newList[to]] = [newList[to], newList[from]]
    ;if (to > from) {
      newList.splice(to, 0, props.modelValue[from])
      newList.splice(from, 1)
    } else {
      newList.splice(to, 0, props.modelValue[from])
      newList.splice(from - 1, 1)
    }
    console.log(newList)
    fromDom = toDom
    emit('update:modelValue', newList)
  }

  return () => {
    // 渲染函数或 JSX
    return h(
      props.tag,
      { ref: wrapDom },
      props.modelValue.map((item) => {
        return slots.default({
          element: item
        })
      })
    )
  }
}

const draggableComp = defineComponent(
  mainFunc,
  {
    props: ['modelValue', 'tag'],
    emits: ['update:modelValue']
  }
)

export default draggableComp