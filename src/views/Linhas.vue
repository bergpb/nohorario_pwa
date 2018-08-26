<template>
  <v-layout align-center justify-center fill-height>
    <v-container>
      <div class="title">Linhas Metropolitanas</div>
    </br>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-btn
          v-for="linha in linhas"
          block
          round
          large
          color="teal"
          @click="passValues(linha)">
          <strong>{{linha.linha}}</strong>
        </v-btn>
      </v-flex>
    </v-container>
  </v-layout>
</template>

<script>
  export default {
    name: 'linhas',
    linhas: null,
    data() {
      return{
        linhas: [
          {
            linha: 'Capuan',
            arquivo: 'capuan-fortaleza'
          },
          {
            linha: 'Caucaia',
            arquivo: 'caucaia-fortaleza'
          },
          {
            linha: 'Cumbuco',
            arquivo: 'cumbuco-fortaleza'
          },
          {
            linha: 'Planato BR-020',
            arquivo: 'planalto-br020'
          },
          {
            linha: 'Planalto Caucaia',
            arquivo: 'planalto-fortaleza'
          },

        ]
      }
    },
  methods:{
    passValues: function(item) {
      this.$router.push({ name : 'horarioslinha', params: { item }})
    }
  }
}
</script>

<style scoped>
</style>
