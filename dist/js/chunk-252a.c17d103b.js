(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-252a"],{"4e20":function(a,e,t){"use strict";var i=t("73f9"),n=t.n(i);n.a},"73f9":function(a,e,t){},c1ee:function(a,e,t){},cc35:function(a,e,t){"use strict";t.r(e);var i=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("v-layout",{attrs:{"align-center":"","justify-center":"","fill-height":""}},[t("horarios-component")],1)},n=[],o=function(){var a=this,e=a.$createElement,t=a._self._c||e;return t("div",[a.loading?t("div",[t("v-container",{attrs:{"fill-height":""}},[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-flex",{staticClass:"text-xs-center"},[t("v-progress-circular",{attrs:{size:70,width:7,indeterminate:"",color:"teal"}})],1)],1)],1)],1):a.error?t("div",[t("v-layout",{attrs:{row:"",wrap:""}},[t("v-dialog",{attrs:{"max-width":"290"},model:{value:a.dialog_error,callback:function(e){a.dialog_error=e},expression:"dialog_error"}},[t("v-card",[t("v-card-title",{staticClass:"headline"},[a._v("Ops!")]),t("v-card-text",[a._v(a._s(a.msg))]),t("v-card-actions",[t("v-spacer"),t("v-btn",{attrs:{color:"teal",flat:"flat"},on:{click:function(e){a.$router.go(-1)}}},[a._v("\n              Ok!\n            ")])],1)],1)],1)],1)],1):t("div",[t("v-snackbar",{attrs:{color:"success",timeout:6e3},model:{value:a.snackbar,callback:function(e){a.snackbar=e},expression:"snackbar"}},[a._v("\n      "+a._s(a.msg)+"\n      "),t("v-btn",{attrs:{dark:"",flat:""},on:{click:function(e){a.snackbar=!1}}},[a._v("\n        OK\n      ")])],1),t("v-tabs",{attrs:{slot:"extension",centered:"","fixed-tabs":"",grow:"",color:"blue-grey lighten-5","slider-color":"teal"},slot:"extension",model:{value:a.tab_ativa,callback:function(e){a.tab_ativa=e},expression:"tab_ativa"}},a._l(a.tabs,function(e){return t("v-tab",{key:e.id,on:{click:function(t){a.getTab(e.key)}}},[a._v("\n        "+a._s(e.name)+"\n      ")])})),t("v-layout",{staticClass:"horarios",attrs:{"align-center":"","justify-center":"",wrap:"","fill-height":""}},[t("table",[t("thead",[t("tr",[t("th",[t("v-chip",{attrs:{color:"teal","text-color":"white"}},[t("strong",[a._v(a._s(a.pontos.pontoPartida))]),t("v-icon",{attrs:{right:""}},[a._v("location_on")])],1)],1),t("th"),t("th",[t("v-chip",{attrs:{color:"teal","text-color":"white"}},[t("strong",[a._v("Fortaleza")]),t("v-icon",{attrs:{right:""}},[a._v("location_on")])],1)],1)])]),a._l(a.horarios,function(e){return t("tr",[t("td",[t("h2",[a._v(a._s(e.inicio))])]),t("td"),t("td",[t("h2",[a._v(a._s(e.fim))])])])})],2)]),t("v-layout",[t("v-container",[t("div",{directives:[{name:"show",rawName:"v-show",value:"planalto-fortaleza"===a.nomeLinha.arquivo,expression:"nomeLinha.arquivo === 'planalto-fortaleza'"}],staticStyle:{"text-align":"left"}},[t("div",{staticClass:"title",staticStyle:{"text-align":"left"}},[a._v("Legendas:")]),t("br"),t("p",[a._v("(*) - Viagem atendendo ao Pe. Júlio Maria."),t("br"),a._v("\n            (#) - Viagem atendendo ao terminal de Caucaia."),t("br"),a._v("\n            (VA#) - Viagem atendendo ao Conj. Vicente Arruda e terminal de Caucaia."),t("br"),a._v("\n            (Cap) - Viagem Fortaleza/Planalto/Capuan."),t("br"),a._v("\n            Exp – Viagem feitas via EXPRESSO (só na bezerra de menezes).")])]),t("div",{directives:[{name:"show",rawName:"v-show",value:"caucaia-fortaleza"===a.nomeLinha.arquivo,expression:"nomeLinha.arquivo === 'caucaia-fortaleza'"}],staticStyle:{"text-align":"left"}},[t("div",{staticClass:"title",staticStyle:{"text-align":"left"}},[a._v("Legendas:")]),t("br"),t("p",[a._v("(#) - Viagem Somente na segunda-feira."),t("br"),a._v("\n            (PS) - Viagem via Parque Soledade."),t("br"),a._v("\n            (§) - Viagem até a Cione.")])]),t("div",{directives:[{name:"show",rawName:"v-show",value:"capuan-fortaleza"===a.nomeLinha.arquivo,expression:"nomeLinha.arquivo === 'capuan-fortaleza'"}],staticStyle:{"text-align":"left"}},[t("div",{staticClass:"title",staticStyle:{"text-align":"left"}},[a._v("Legendas:")]),t("br"),t("p",[a._v("(B) - Atende ao Boqueirão(Posto Bandeira Branca)."),t("br"),a._v("\n            (J) - Passa na Jandaiguaba."),t("br"),a._v("\n            (P) - Viagem atende a Pedreiras."),t("br"),a._v("\n            (@) Viagem Fortaleza/Planalto/Capuan."),t("br"),a._v("\n            (#) - Viagem parte da movelária/Paizinha."),t("br"),a._v("pro\n            (%) - Segue até a Entrada da Pyla."),t("br"),a._v("\n            Obs.: Na viagem de 05:30 o carro parte às 05:20 de Pedreira.s")])]),t("div",{directives:[{name:"show",rawName:"v-show",value:"metropole1-fortaleza"===a.nomeLinha.arquivo,expression:"nomeLinha.arquivo === 'metropole1-fortaleza'"}],staticStyle:{"text-align":"left"}},[t("div",{staticClass:"title",staticStyle:{"text-align":"left"}},[a._v("Legendas:")]),t("br"),t("p",[a._v("(*) - Viagem atendendo a rota 2 e sai na rota 1."),t("br"),a._v("\n            (T) - Viagem atendendo a localidade de Tôco.")])]),t("div",{directives:[{name:"show",rawName:"v-show",value:"metropole2-fortaleza"===a.nomeLinha.arquivo,expression:"nomeLinha.arquivo === 'metropole2-fortaleza'"}],staticStyle:{"text-align":"left"}},[t("div",{staticClass:"title",staticStyle:{"text-align":"left"}},[a._v("Legendas:")]),t("br"),t("p",[a._v("(*) - Viagem atendendo a rota 2 e sai na rota 1."),t("br"),a._v("\n            (T) - Viagem atendendo a localidade de Tôco.")])])])],1)],1)])},r=[],s=(t("cadf"),t("551c"),t("097d"),t("fa7d")),l={name:"Horarioscomponent",data:function(){return{res:null,horarios:null,nomeLinha:null,linhaAtual:null,diaUtil:null,pontos:null,loading:!0,error:null,snackbar:!1,color:"",mode:"",timeout:5e3,msg:"",dialog_success:!1,dialog_error:!1,tab_ativa:null,tabs:[{id:0,name:"Dias Úteis",key:"dias_uteis"},{id:1,name:"Sábado",key:"sabado"},{id:2,name:"Domingo",key:"domingo"}]}},mounted:function(){this.diaUtil=Object(s["a"])(),this.nomeLinha=this.$route.params.item,this.tab_ativa=Object(s["d"])(),this.pontos=this.$route.params.item,null==this.nomeLinha?this.$router.push({name:"linhas"}):this.getFromApi()},methods:{getFromApi:function(){this.updateData()},updateData:function(){var a=this;fetch("https://busintimeapi.herokuapp.com/api/"+this.nomeLinha.arquivo).then(function(a){return a.json()}).then(function(e){a.res=e,a.horarios=a.res[a.diaUtil],a.saveItem()}).catch(function(){a.res=JSON.parse(localStorage.getItem(a.nomeLinha.arquivo)),null!=a.res?(a.res=JSON.parse(localStorage.getItem(a.nomeLinha.arquivo)),a.horarios=a.res[a.diaUtil],a.loading=!1):(a.error=!0,a.msg="Falha ao baixar os horários, conecte-se a internet e tente novamente.",a.dialog_error=!0)}).finally(function(){a.loading=!1})},getTab:function(a){this.horarios=this.res[a]},saveItem:function(){localStorage.setItem(this.nomeLinha.arquivo,JSON.stringify(this.res)),this.msg="Horários atualizados! Agora é possível visualizá-los mesmo sem internet.",this.snackbar=!0}}},c=l,v=(t("4e20"),t("2877")),d=Object(v["a"])(c,o,r,!1,null,"612c1b11",null);d.options.__file="HorariosComponent.vue";var u=d.exports,m={name:"Horarioslinha",components:{HorariosComponent:u}},h=m,g=(t("d42f"),Object(v["a"])(h,i,n,!1,null,"4e53bcac",null));g.options.__file="HorariosLinha.vue";e["default"]=g.exports},d42f:function(a,e,t){"use strict";var i=t("c1ee"),n=t.n(i);n.a}}]);
//# sourceMappingURL=chunk-252a.c17d103b.js.map