<template>
  <div id="app">
    <McBubbleGraph :data="graphData">
      <template #chart="{r}">
        <circle class="babyname-circle" :r="r" fill="gray" />
      </template>
    </McBubbleGraph>
    <button @click="toggleData">Toggle Data</button>
  </div>
</template>

<script>
import McBubbleGraph from '@/components/McBubbleGraph'
import d3 from 'd3'
export default {
  name: 'MadcarBubbleGraph',
  components: {
    McBubbleGraph,
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
    graphData() {
      return this.toggle ? this.graphDataA : this.graphDataB
    },
  },
  methods: {
    toggleData() {
      this.toggle = !this.toggle
    },

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
