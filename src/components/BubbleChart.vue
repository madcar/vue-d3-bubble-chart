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
      <slot name="before" />
      <ChartBubble
        v-for="bubble in bubbles"
        :bubble="bubble"
        :key="bubble.data.name"
        :color="bubble.data.color"
        ref="bubble"
        v-slot="{ leaf }"
      >
        <slot :leaf="leaf">
          <circle
            class="babyname-circle"
            :r="leaf.r"
            :fill="leaf.color"
            ref="circle"
          />
          <text
            class="bubble-label"
            :font-size="(leaf.r * 2) / leaf.data.name.length"
            :style="{ width: leaf.r * 2, height: leaf.r * 2 }"
            >{{ bubble.data.name }}</text
          >
        </slot>
      </ChartBubble>
    </transition-group>
  </div>
</template>

<script>
import * as d3 from 'd3'
import gsap from 'gsap'
import ChartBubble from '@/components/ChartBubble'
export default {
  components: {
    ChartBubble,
  },
  props: {
    data: Array,
    dimensions: {
      type: Object,
      default: () => ({ width: 500, height: 500 }),
    },
  },
  computed: {
    bubbles() {
      return this.chartData.children.map(d => ({
        ...d,
        color: d.data.color || '#757575',
      }))
    },
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
        delay: 0.3,
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
