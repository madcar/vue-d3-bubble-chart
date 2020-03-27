<template>
  <div id="app">
    <BubbleChart :data="mappedData"></BubbleChart>
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
        { name: 'fifteen', value: 15 },
      ],
      graphDataB: [
        { name: 'three', value: 3 },
        { name: 'four', value: 4 },
        { name: 'five', value: 5 },
        { name: 'six', value: 6 },
        { name: 'sixteen', value: 16 },
        { name: 'seven', value: 7 },
        { name: 'seventeen', value: 17 },
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
</style>
