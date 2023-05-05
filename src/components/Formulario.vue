<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulario para criaçao de uma nova tarega">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?">
            </div>
            <div class="column">
             <div class="is-flex is-align-items-center is-justify-content-space-between">
                 <section>
                     <strong>{{tempoDecorrido}}</strong>
                 </section>
                 <button class="button" @click="iniciar">
                  <span class="icon">
                      <i class="fas fa-play"></i>
                  </span>
                     <span>Play</span>
                 </button>
                 <button class="button" @click="finalizar">
                  <span class="icon">
                      <i class="fas stop"></i>
                  </span>
                     <span>Stop</span>
                 </button>
             </div>
            </div>
        </div>
    </div>

</template>

<script lang="ts">
  import {defineComponent} from "vue";

  export default defineComponent({
      name:`Formulario`,
      data (){
          return {
              tempoEmSegundos:0,
              cronometro:0
          }
      },
      computed:{
          tempoDecorrido():string{
              if(this.cronometro > 0){
                  return new Date(this.tempoEmSegundos*1000).toISOString().substring(11,19);
              }
              return new Date(0).toISOString().substring(11,19);
          }

      },
      methods:{
          iniciar(){
              //iniciar a contagem
            this.cronometro = setInterval(()=>{
                  this.tempoEmSegundos+=1;
              },1000)
          },
          finalizar(){
             clearInterval(this.cronometro);
             // this.tempoEmSegundos=0;
          },

      }
  })

</script>


<style >

</style>