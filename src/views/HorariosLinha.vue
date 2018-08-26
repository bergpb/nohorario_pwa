<template>
  <v-layout align-center justify-center fill-height>
    <horarios-component/>
  </v-layout>
</template>

<script>
import HorariosComponent from '@/components/HorariosComponent.vue'

export default {
  name: 'horarioslinha',
  components:{
    HorariosComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
