<template>
    <div class="box">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulario para criaçao de uma nova tarega">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?"
                v-model="descricao">
            </div>
            <div class="column">
             <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import {defineComponent} from "vue";
import Temporizador from "@/components/Temporizador.vue";



export default defineComponent({
    name:`Formulario`,
    emits:['aoSalvarTarefa'],
    data (){
        return {
            descricao:''
        }
    },
    components:{
        Temporizador
    },
    methods:{
        finalizarTarefa(tempoDecorrido:number):void{
            this.$emit('aoSalvarTarefa',{
                duracaoEmSegundo: tempoDecorrido,
                descricao:this.descricao,
            })
            this.descricao = '';
        }
    }

})

</script>


<style >

</style>