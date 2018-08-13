<template>
  <v-container>
    <v-layout align-center justify-center wrap fill-height>
      <v-flex xs6 sm6 md6 lg6 xl6>
        <v-flex v-for="horario in horarios">
          <div class="text-xs-center">
            <h1>{{horario.inicio}}</h1>
          </div>
        </v-flex>
      </v-flex>
      <v-flex xs6 sm6 md6 lg6 xl6>
        <v-flex v-for="horario in horarios">
          <div class="text-xs-center">
            <h1>{{horario.fim}}</h1>
          </div>
        </v-flex>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HorariosComponent',
  data () {
    return{
      horarios: null,
      nomeLinha: null,
    }
  },
  methods:{
      updateData: function() {
        this.nomeLinha = "cumbuco-fortaleza"
        fetch('http://localhost:5000/api/linha/'+nomeLinha)
          .then(response => response.json())
          .then((res) => {
            this.horarios = res
            console.log(this.horarios[0].Cumbuco)
            console.log(this.horarios[0].Fortaleza)
            console.log(this.horarios[1].Cumbuco)
            console.log(this.horarios[1].Fortaleza)
          })
          .catch(err => {
            this.error = err
          })
          .finally(() => {
            console.log('finalmente')
          })
        }
      },
  mounted () {
    this.updateData();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
