<template>
  <div>
    <div v-if="loading">
      <v-layout row wrap>
        <v-flex class="text-center">
          <p>Aguarde...</p>
          <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
        </v-flex>
      </v-layout>
    </div>
    <div v-else>
      <v-tabs slot="extension"
              centered
              grow
              color="transparent"
              slider-color="teal">
        <v-tab v-for="tab in tabs" @click="getTab(tab.key)">
          {{tab.name}}
        </v-tab>
      </v-tabs>
      <p></p>
      <v-layout align-center justify-center wrap fill-height>
        <v-flex xs6 sm6 md6 lg6 xl6>
          <v-flex v-for="horario in horarios">
            <div class="text-xs-center">
              <h2>{{horario.inicio}}</h2>
            </div>
          </v-flex>
        </v-flex>
        <v-flex xs6 sm6 md6 lg6 xl6>
          <v-flex v-for="horario in horarios">
            <div class="text-xs-center">
              <h2>{{horario.fim}}</h2>
            </div>
          </v-flex>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorariosComponent',
  data () {
    return{
      desc_dia: 'dias_uteis',
      horarios: null,
      nomeLinha: null,
      loading: true,
      tabs: [
        {
          name: 'Dias Úteis',
          key: 'dias_uteis'
        },
        {
          name: 'Sábado',
          key: 'sabado'
        },
        {
          name: 'Domingo',
          key: 'domingo'
        },
      ],
    }
  },
  methods: {
    updateData() {
      this.nomeLinha = this.$route.params.linha
      fetch('http://localhost:5000/api/'+this.nomeLinha+'/'+this.desc_dia)
        .then(response => response.json())
        .then((res) => {
          this.horarios = res
        })
        .catch(err => {
          this.error = err
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })
      },
    getTab(tab_value) {
      this.desc_dia = tab_value
      this.updateData()
    }
  },
  mounted () {
    this.nomeLinha = this.$route.params.linha
    this.updateData()
  }
}
</script>

<style scoped>
</style>
