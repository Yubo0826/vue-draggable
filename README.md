Vue3 component for drag & drop html element

## Demo

https://yubo0826.github.io/vue-draggable/

## **Installation**

```jsx
npm i vue-draggable-yubo
```

## Use

```html
<draggable tag="div" v-model="playerList" v-slot="{ element }">
  <div class="draggable" :style="{'background': element.color}">
    {{ element.name }}, {{ element.number }}
  </div>
</draggable>
```

```js
import draggable from 'vue-draggable-yubo'
...
  export default {
        components: {
            draggable,
        },
        data() {
          return {
            playerList: [{name: 'J.Lee', number: 35}, {name: 'H.Chi', number: 27}]
          }
        },
  ...
```

## Props

### modelValue

type: Array

required: true

Input an array to render a list of draggable elements.

```js
<draggable v-model="myArray">
```

### tag

type: String

default: div

required: false

The type of root node in HTML. 

```js
<draggable v-model="myArray" tag="tr">
```

### handle

type: String

required: false

Input the class name. Dragging can only be achieved by dragging elements with this class.

```js
<draggable v-model="myArray" handle="handle" tag="tr" v-slot="{ element }">
	<div class="item">
		<i class="fa fa-align-justify handle"></i>
    {{ element.name }}
  </div>
</draggable>
```

### transition-name

type: String

required: false

In order to make animation during dragging element. The animation is based on Vue transition-group component, so this attribute refers to <TransitionGroup> props. It is worth nothing that you have to set a transition css `'your name'-move`for animation.

Suggested to read [Vue Docs for transition-group](https://vuejs.org/guide/built-ins/transition-group.html).

```js
<draggable 
	v-model="myArray"
	tag="div"
	transition-name="list"
	>
```

```css
.list-move {
  transition: transform 0.15s;
}
```