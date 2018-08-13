<template>
  <v-container>
    <v-layout align-center justify-center wrap fill-height>
      <p>Aqui serão mostrados os horários mais próximos</p>
    </v-layout>
  </v-container>
</template>

<script>
import HorariosComponent from '@/components/HorariosComponent.vue'

export default {
  name: 'inicio',
  components:{
    HorariosComponent
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
