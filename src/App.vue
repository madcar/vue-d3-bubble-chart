<template>
  <div id="app">
    <BubbleChart :data="mappedData">
      <template #before>
        <defs key="defs">
          <filter id="motionFilter" width="300%" x="-100%"
            ><feGaussianBlur
              in="SourceGraphic"
              stdDeviation="2 1"
            ></feGaussianBlur></filter
        ></defs>
      </template>
      <template #default="{leaf}">
        <circle
          class="bubble-circle"
          :r="leaf.r"
          :fill="leaf.color"
          ref="circle"
        />
        <circle class="bubble-blur" :r="leaf.r - 3" :fill="leaf.color" />
        <text
          class="bubble-label"
          :font-size="(leaf.r * 2) / leaf.data.name.length"
          :style="{ width: leaf.r * 2, height: leaf.r * 2 }"
          fill="#222"
          >{{ leaf.data.name }}</text
        >
      </template>
    </BubbleChart>
    <button @click="toggleData">Toggle Data</button>
  </div>
</template>

<script>
import BubbleChart from '@/components/BubbleChart'
import * as d3 from 'd3'
export default {
  name: 'MadcarBubbleGraph',
  components: {
    BubbleChart,
  },
  data() {
    return {
      toggle: true,
      graphDataA: [
        { name: 'one', value: 1 },
        { name: 'two', value: 2 },
        { name: 'three', value: 3 },
        { name: 'four', value: 4 },
        { name: 'five', value: 5 },
        { name: 'eleven', value: 11 },
        { name: 'twelve', value: 12 },
        { name: 'thirteen', value: 13 },
        { name: 'fourteen', value: 14 },
        { name: 'fifteen', value: 15 },
        { name: 'twenty-one', value: 21 },
        { name: 'twenty-two', value: 22 },
        { name: 'twenty-three', value: 23 },
        { name: 'twenty-four', value: 24 },
        { name: 'twenty-five', value: 25 },
        { name: 'twenty-seven', value: 27 },
        { name: 'thirty-six', value: 36 },
        { name: 'thirty-seven', value: 37 },
        { name: 'thirty-one', value: 31 },
        { name: 'thirty-two', value: 32 },
        { name: 'thirty-three', value: 33 },
        { name: 'thirty-eight', value: 38 },
        { name: 'thirty-nine', value: 39 },
      ],
      graphDataB: [
        { name: 'three', value: 3 },
        { name: 'four', value: 4 },
        { name: 'five', value: 5 },
        { name: 'six', value: 6 },
        { name: 'seven', value: 7 },
        { name: 'sixteen', value: 16 },
        { name: 'seventeen', value: 17 },
        { name: 'twenty-one', value: 21 },
        { name: 'twenty-two', value: 22 },
        { name: 'twenty-three', value: 23 },
        { name: 'twenty-eight', value: 28 },
        { name: 'eighteen', value: 18 },
        { name: 'nineteen', value: 19 },
        { name: 'thirty-six', value: 36 },
        { name: 'thirty-seven', value: 37 },
        { name: 'thirty-one', value: 31 },
        { name: 'thirty-two', value: 32 },
        { name: 'thirty-three', value: 33 },
        { name: 'thirty-eight', value: 38 },
        { name: 'thirty-nine', value: 39 },
      ],
    }
  },
  computed: {
    mappedData() {
      return this.graphData.map(data => ({
        ...data,
        color: this.colorFunc(data.value),
      }))
    },
    graphData() {
      return this.toggle ? this.graphDataA : this.graphDataB
    },
    scaleFunc() {
      return d3
        .scaleLinear()
        .domain([
          d3.min(this.graphData, d => d.value),
          d3.max(this.graphData, d => d.value) + 1,
        ])
        .range([0, 1])
    },
  },
  methods: {
    toggleData() {
      this.toggle = !this.toggle
    },
    colorFunc(color) {
      return d3.interpolateSinebow(this.scaleFunc(color))
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.bubble-blur {
  filter: url('#motionFilter');
  opacity: 0.9;
}
.bubble-circle {
  opacity: 0.7;
  mix-blend-mode: multiply;
  isolation: isolate;
}
</style>
