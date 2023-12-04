import { ref, defineComponent, h, onMounted, onUpdated, TransitionGroup } from 'vue'

interface DraggableProps {
  modelValue: Array<any>;
  tag: string;
  handle?: string;
  transitionName?: string;
}

const mainFunc = function(props: DraggableProps, { slots, emit }: any) {
  const wrapDom = ref<HTMLElement | null>(null)
  let fromIndex: number
  let toIndex: number

  onMounted(() => {
    addAttribute()
  })

  onUpdated(() => {
    updataAttribute()
  })

  // 為slot元素加上所需屬性: draggable, index
  function addAttribute() {
    const itemList = wrapDom.value?.children as HTMLCollectionOf<HTMLElement>
    
    for (let i = 0; i < itemList.length; i++) {
      itemList[i].setAttribute('index', i.toString())
      itemList[i].addEventListener('dragenter', dragEnter)
      // 為handle加上所需屬性
      if (props.handle) {
        let handleList = itemList[i].getElementsByClassName(
          props.handle
        ) as HTMLCollectionOf<HTMLElement>
        for (let j = 0; j < handleList.length; j++) {
          handleList[j].setAttribute('index', i.toString())
          handleList[j].setAttribute('draggable', 'true')
          handleList[j].addEventListener('dragstart', dragstart)
        }
      } else {
        itemList[i].setAttribute('draggable', 'true')
        itemList[i].addEventListener('dragstart', dragstart)
      }
    }
  }

  function updataAttribute() {
    const itemList = wrapDom.value?.children as HTMLCollectionOf<HTMLElement>
    for (let i = 0; i < itemList.length; i++) {
      itemList[i].setAttribute('index', i.toString())
      if (props.handle) {
        let handleList = itemList[i].getElementsByClassName(
          props.handle
        ) as HTMLCollectionOf<HTMLElement>
        for (let j = 0; j < handleList.length; j++) {
          handleList[j].setAttribute('index', i.toString())
        }
      }
    }
  }

  function dragstart(event: DragEvent) {
    const target = event.target as HTMLElement
    if (target) {
      fromIndex = parseInt(target.getAttribute('index') || '0')
    }
  }

  function dragEnter(event: DragEvent) {
    const target = event.currentTarget as HTMLElement
    if (target) {
      toIndex = parseInt(target.getAttribute('index') || '0')
    }

    // transition-group在進行move動畫時，會在被移動的元素上加上class: list-move
    // 所以要避免在移動時觸發dragenter
    if (fromIndex !== toIndex && !target.classList.contains(`${props.transitionName}-move`)) {
      updatePostion(fromIndex, toIndex)
    }
  }

  function updatePostion(from: number, to: number) {
    let newList = [...props.modelValue]
    if (to > from) {
      newList.splice(to + 1, 0, newList[from])
      newList.splice(from, 1)
    } else {
      newList.splice(to, 0, newList[from])
      newList.splice(from + 1, 1)
    }
    fromIndex = toIndex
    emit('update:modelValue', newList)
  }

  return () => {
    // 不知道為甚麼key有index就會有問題
    const slotNodes = props.modelValue.map((item, index) => {
      return slots.default({
        element: item,
        key: item,
        index
      })
    })
    if (props.transitionName) {
      return h(
        props.tag,
        { ref: wrapDom },
        h(
          TransitionGroup,
          {
            name: props.transitionName || 'fade'
          },
          () => slotNodes
        )
      )
    }
    return h(
      props.tag,
      { ref: wrapDom },
      props.modelValue.map((item, index) => {
        return slots.default({
          element: item,
          index
        })
      })
    )
  }
}

const props = {
  modelValue: {
    type: Array,
    default: () => []
  },
  tag: {
    type: String,
    default: 'div',
  },
  handle: {
    type: String,
    required: false
  },
  transitionName: {
    type: String,
    required: false
  },
  // transitionData: {
  //   type: Object,
  //   default() {
  //     return {transition: false, name: '' }
  //   }
  // },
  move: {
    type: Function,
    required: false
  }
}

const draggableComp = defineComponent(
  mainFunc,
  {
    props,
    emits: ['update:modelValue']
  }
)

export default draggableComp;