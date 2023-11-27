import { ref, defineComponent, h, onMounted, onUpdated, TransitionGroup } from 'vue'

interface DraggableProps {
  modelValue: Array<any>;
  tag: string;
  handle?: string;
  transitionData?: Object;
}

const mainFunc = function(props: DraggableProps, { slots, emit }: any) {
  const wrapDom = ref<HTMLElement | null>(null)
  let fromIndex: number
  let toIndex: number

  onMounted(() => {
    addAttribute()
  })

  onUpdated(() => {
    console.log('onUpdated')
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
    fromIndex = parseInt(event.target.getAttribute('index'))
    console.log('dragstart: ' + fromIndex)
  }

  function dragEnter(event: DragEvent) {
    console.log('dragEnter')
    toIndex = parseInt(event.currentTarget.getAttribute('index'))

    // transition-group在進行move動畫時，會在被移動的元素上加上class: list-move
    // 所以要避免在移動時觸發dragenter
    if (fromIndex !== toIndex && !event.currentTarget.classList.contains(`${props.transitionName}-move`)) {
      updatePostion(fromIndex, toIndex)
    }
  }

  function updatePostion(from: number, to: number, transitionDuration: float) {
    console.log('updatePostion: ' + from + '到' + to)
    let newList = [...props.modelValue]
    // 編譯器會把宣告那行與解構賦值那行搞混成一行
    // 所以要用分號隔開
    // ;[newList[from], newList[to]] = [newList[to], newList[from]]
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
    const slotNodes = props.modelValue.map((item) => {
      return slots.default({
        element: item,
        key: item
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
      props.modelValue.map((item) => {
        return slots.default({
          element: item
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