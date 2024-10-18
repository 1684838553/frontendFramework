<template>
  <div>
    <Counter />
    <hr />
    <Person />
    <hr />
    <Count />
  </div>
</template>

<script>
import Count from './components/Count';
import Counter from './components/Counter';
import Person from './components/Person';

export default {
  name: "App",
  components: {
    Count,
    Counter,
    Person
  },
  data() {
    return {
      
    };
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>

<style>

</style>
