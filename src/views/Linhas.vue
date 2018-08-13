<template>
  <v-container>
    <v-layout align-center justify-center wrap fill-height>
      <div class="title">Linhas Metropolitanas</div>
      <v-flex pt-2>
        <v-btn
          v-for="linhas in linhasDisponiveis"
          block
          color="blue-grey"
          @click="passValues(linhas.linkLinha)">{{linhas.linha}}</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'linhas',
  linhasDisponiveis: null,
  data() {
    return{
      linhasDisponiveis: [
        {
          linha: 'Planato BR-020',
          linkLinha: 'planalto-br020'
        },
        {
          linha: 'Cumbuco / Fortaleza',
          linkLinha: 'cumbuco-fortaleza'
        },
        {
          linha: 'Planalto Caucaia',
          linkLinha: 'planalto-caucaia'
        },
        {
          linha: 'Capuan',
          linkLinha: 'capuan'
        },
      ]
    }
  },
  methods:{
    passValues: function(item) {
        this.nomeLinha = item
        console.log(this.nomeLinha)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
