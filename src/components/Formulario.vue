<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulario para criaçao de uma nova tarega">
                <input type="text" class="input" placeholder="Qual tarefa você deseja iniciar?"
                v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="idProjeto">
                        <option value="">Selecione Projeto</option>
                        <option :value="projeto.id"
                        v-for="projeto in projetos"
                        :key="projeto.id">
                            {{projeto.nome}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="column">
             <Temporizador @aoTemporizadorFinalizado="finalizarTarefa" />
            </div>
        </div>
    </div>

</template>

<script lang="ts">
import {computed, defineComponent} from "vue";
import Temporizador from "@/components/Temporizador.vue";
import { useStore } from "vuex";
import {key} from "@/store";
import {NOTIFICAR} from "@/store/tipo-mutacoes";
import {TipoNotificacao} from "@/interfaces/INotificacao";



export default defineComponent({
    name:`Formulario`,
    emits:['aoSalvarTarefa'],
    data (){
        return {
            descricao:'',
            idProjeto:''
        }
    },
    components:{
        Temporizador
    },
    methods:{
        finalizarTarefa(tempoDecorrido:number):void{
            if( this.descricao == ''){
                this.store.commit(NOTIFICAR,{
                    titulo:'Erro',
                    texto:'Descrição vazia',
                    tipo:TipoNotificacao.FALHA
                })
                return;
            }else  if(this.idProjeto == ''){
                this.store.commit(NOTIFICAR,{
                    titulo:'Erro',
                    texto:'Projeto da tarefa não selecionado',
                    tipo:TipoNotificacao.FALHA
                })
                return;
            }


            this.$emit('aoSalvarTarefa',{
                duracaoEmSegundo: tempoDecorrido,
                descricao:this.descricao,
                projeto: this.projetos.find(proj=> proj.id = this.idProjeto)
            })
            this.descricao = '';
        }
    },
    setup: function () {
        const store = useStore(key)
        return {
            projetos : computed(()=>store.state.projetos),
            store
        }
    }

})

</script>


<style >
 .formulario{
     color: var(--texto-primario);
     background-color: var(--bg-primario);
 }
</style>