<template>
  <div>
    <div v-if="loading">
      <v-layout row wrap>
        <v-flex xs6 sm6 md6 lg6 xl6>
          <div class="text-xs-center">
            <v-progress-circular :size="40" color="primary" indeterminate></v-progress-circular>
          </div>
        </v-flex>
      </v-layout>
    </div>
    <div v-else-if="error">
      <v-layout row wrap>
        <v-flex class="text-center">
          <p>Falha ao carregar informações!</p>
          </v-flex>
      </v-layout>
    </div>
    <div v-else>
      <v-snackbar
        v-model="snackbar"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :vertical="mode === 'vertical'"
        >
      {{ text }}
      <v-btn
        color="teal"
        flat
        @click="snackbar = false"
      >
        Ok
      </v-btn>
    </v-snackbar>
      <v-tabs slot="extension"
              centered
              fixed-tabs
              grow
              color="blue-grey lighten-5"
              slider-color="teal">
        <v-tab v-for="tab in tabs" @click="getTab(tab.key)">
          {{tab.name}}
        </v-tab>
      </v-tabs>
      <v-layout class="horarios" align-center justify-center wrap fill-height>
        <table class="example-table">
          <tr v-for="horario in horarios">
            <td><h1>{{ horario.inicio }}</h1></td>
            <td></td>
            <td><h1>{{ horario.fim }}</h1></td>
          </tr>
        </table>
      </v-layout>
    </div>
  </div>
</template>

<script>
export default {
  name: 'horarioscomponent',
  data () {
    return {
      horarios: null,
      nomeLinha: null,
      loading: true,
      error: null,
      res: null,
      snackbar: false,
      color: '',
      mode: '',
      timeout: 5000,
      text: null,
      tabs: [{ name: 'Dias Úteis',key: 'dias_uteis' },
             { name: 'Sábado', key: 'sabado' },
             { name: 'Domingo', key: 'domingo' }
      ],
    }
  },
  methods: {
    checkLocalStorage(){
      this.nomeLinha = this.$route.params.item
      this.getItem();
    },
    updateData() {
      this.nomeLinha = this.$route.params.item
      this.showSnackbar('Baixando horários e salvando.')
      //fetch('https://busintimeapi.herokuapp.com/api/'+this.nomeLinha.linkLinha)
      fetch('http://localhost:5000/api/'+this.nomeLinha.linkLinha)
        .then(response => response.json())
        .then((res) => {
          this.res = res
          this.horarios = this.res['dias_uteis']
          this.saveItem();
          this.showSnackbar('Horários salvos para consulta offline.')
        })
        .catch(err => {
          this.error = err
          console.log(this.error)
        })
        .finally(() => {
          this.loading = false
        })
      },
    getTab(tab_value) {
      this.horarios = this.res[tab_value]
    },
    saveItem() {
      localStorage.setItem(this.nomeLinha.linkLinha, JSON.stringify(this.res));
    },
    getItem(){
      console.log('tentando recuperar do local storage')
      this.res = JSON.parse(localStorage.getItem(this.nomeLinha.linkLinha));
      console.log(this.res)
      if (this.res != null){
        console.log('estava no local')
        this.horarios = this.res['dias_uteis']
        this.loading = false
      }
      else{
        console.log('trazendo da api')
        this.updateData()
      }
    },
    showSnackbar(msg){
      this.snackbar = true
      this.text = msg
    }
  },
  mounted () {
    this.checkLocalStorage();
  }
}
</script>

<style scoped>

.v-tabs {
  position: fixed;
  z-index: 2;
  width: 100%;
  left: 0;
}

.horarios {
  padding-top: 60px;
}

td {
  padding-top: 10px;
  padding: 12px;
}

</style>
