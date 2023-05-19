<template>
    <section >
        <router-link to="/novo" class="button">
            <span class="icon is-smail">
                <i class="fas fa-plus"></i>
            </span>
            <span>Novo projeto</span>
        </router-link>
        <table class="table is-fullwidth">
            <thead>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ações</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="projeto in projetos" :key="projeto.id">
                <td>{{ projeto.id }}</td>
                <td>{{ projeto.nome }}</td>
                <td>
                    <router-link :to="`/${projeto.id}`" class="button">
                        <span class="icon is-smal">
                            <i class="fas fa-pencil-alt"></i>
                        </span>
                    </router-link>
                    <button  class="button ml-2 is-danger" @click="excluir(projeto.id)">
                        <span class="icon is-smail">
                            <i class="fas fa-trash"></i>
                        </span>
                    </button>
                </td>

            </tr>
            </tbody>
        </table>
    </section>

</template>

<script lang="ts">

import {computed, defineComponent} from "vue";
import {useStore} from "@/store";
import {EXCLUIR_PROJETO, NOTIFICAR} from "@/store/tipo-mutacoes";
import {TipoNotificacao} from "@/interfaces/INotificacao";
import {OBTER_PROJETOS, REMOVER_PROJETOS} from "@/store/tipo-acoes";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
    name: `Lista`,
    methods:{
        excluir(idProjeto:string){
           this.store.dispatch(REMOVER_PROJETOS, idProjeto).then(()=>{
                this.lidarComSucesso('Projeto excluido!');
           })

        },
        lidarComSucesso(texto:string){
            this.notificar('Sucesso',texto, TipoNotificacao.SUCESSO)
        }
    },
    setup() {
        const store = useStore()
            store.dispatch(OBTER_PROJETOS);
        const {notificar} = useNotificador();
        return {
            projetos: computed(() => store.state.projeto.projetos),
            store,
            notificar
        }
    }
})

</script>

