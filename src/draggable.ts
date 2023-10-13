import { ref, defineComponent, h, onMounted } from 'vue'

interface DraggableProps {
  modelValue: Array<any>;
  tag: string;
}

const mainFunc = function(props: DraggableProps, { slots, emit }: any) {
  console.log(props)
  const wrapDom = ref<HTMLElement | null>(null)
  let fromDom: HTMLElement | null
  let toDom: HTMLElement | null

  onMounted(() => {
    // 為slot裡的根元素加上所需屬性
    let itemList = wrapDom.value?.children
    for (let i = 0; i < itemList.length; i++) {
      itemList[i].setAttribute('draggable', 'true')
      itemList[i].setAttribute('id', i.toString())
      itemList[i].addEventListener('dragstart', dragstart)
      itemList[i].addEventListener('dragenter', dragEnter)
    }
  })

  function dragstart(event: DragEvent) {
    console.log('dragstart')
    fromDom = event.target as HTMLElement
  }

  function dragEnter(event: DragEvent) {
    console.log('dragEnter')
    toDom = event.currentTarget as HTMLElement
    if (toDom !== fromDom) {
      swap(fromDom, toDom)
    }
  }

  function updatePostion(from: number, to: number) {
    console.log('updatePostion' + from + to)
    // 編譯器會把宣告那行與解構賦值那行搞混成一行
    // 所以要用分號隔開
    let newList = [...props.modelValue]
    ;[newList[from], newList[to]] = [newList[to], newList[from]]
    console.log(newList)
    fromDom = toDom
    emit('update:modelValue', newList)
  }

  function swap(from: HTMLElement, to: HTMLElement) {
    console.log('swap function!')
    const fromIndex = parseInt(from.getAttribute('id')!)
    const toIndex = parseInt(to.getAttribute('id')!)
    updatePostion(fromIndex, toIndex)
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

export default draggableComp;