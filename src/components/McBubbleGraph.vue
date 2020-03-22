<template>
  <div>
    <transition-group
      name="bubbles"
      tag="svg"
      :width="dimensions.width"
      :height="dimensions.height"
      id="bubble-canvas"
      ref="canvas"
      @enter="enter"
      @leave="leave"
    >
      >
      <slot v-bind="chartData.children">
        <McBubble
          v-for="bubble in chartData.children"
          :bubble="bubble"
          :key="bubble.data.name"
          :color="colorFunc(bubble.data.value)"
          ref="bubble"
        />
      </slot>
    </transition-group>
  </div>
</template>

<script>
import * as d3 from 'd3'
import gsap from 'gsap'
import McBubble from '@/components/McBubble'
export default {
  components: {
    McBubble,
  },
  props: {
    data: Array,
    dimensions: {
      type: Object,
      default: () => ({ width: 500, height: 500 }),
    },
    colorScheme: {
      type: String,
      default: 'Sinebow',
    },
  },
  computed: {
    chartData() {
      const { width, height } = this.dimensions
      return d3
        .pack()
        .size([width, height])
        .padding(0)(d3.hierarchy({ children: this.data }).sum(d => d.value))
    },
  },
  methods: {
    enter(el, done) {
      gsap.from(el, {
        scale: 0,
        transformOrigin: 'center center',
        onComplete: done,
      })
    },
    leave(el, done) {
      gsap.set(el, { scale: 1 })
      gsap.to(el, {
        scale: 0,
        transformOrigin: 'center center',
        onComplete: done,
      })
    },
    async _data() {},
    colorFunc(color) {
      const scaleFunc = d3
        .scaleLinear()
        .domain([
          d3.min(this.data, d => d.value),
          d3.max(this.data, d => d.value) + 1,
        ])
        .range([0, 1])
      return d3['interpolate' + this.colorScheme](scaleFunc(color))
    },
  },
}
</script>
