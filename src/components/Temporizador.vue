<template>
    <div class="is-flex is-align-items-center is-justify-content-space-between">
        <Cronometro :tempoEmSegundos="tempoEmSegundos" />
        <botao :btn-text="'Play'" :btn-icon="'fas fa-play'" @aoBtnClicked="iniciar" :is-disabled="cronometroRodando"/>
        <botao :btn-text="'Stop'" :btn-icon="'fas fa-stop'" @aoBtnClicked="finalizar" :is-disabled="!cronometroRodando" />
<!--        <button class="button" @click="iniciar" :disabled="cronometroRodando">-->
<!--                  <span class="icon">-->
<!--                      <i class="fas fa-play"></i>-->
<!--                  </span>-->
<!--            <span>Play</span>-->
<!--        </button>-->
<!--        <button class="button" @click="finalizar" :disabled="!cronometroRodando">-->
<!--                  <span class="icon">-->
<!--                      <i class="fas stop"></i>-->
<!--                  </span>-->
<!--            <span>Stop</span>-->
<!--        </button>-->
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Cronometro from "@/components/Cronometro.vue";
import Botao from "@/components/Botao.vue";

export default defineComponent({
    name:`Temporizador`,
    emits: ['aoTemporizadorFinalizado'],
    components:{
        Cronometro,
        Botao
    },
    data (){
        return {
            tempoEmSegundos:0,
            cronometro:0,
            cronometroRodando:false
        }
    },
    methods:{
        iniciar(){
            //iniciar a contagem
            this.cronometroRodando = true;
            this.cronometro = setInterval(()=>{
                this.tempoEmSegundos+=1;
            },1000)
        },
        finalizar(){
            this.cronometroRodando=false;
            clearInterval(this.cronometro);
            this.$emit('aoTemporizadorFinalizado',this.tempoEmSegundos);
            this.tempoEmSegundos = 0;
        },

    }
})

</script>

<style >

</style>