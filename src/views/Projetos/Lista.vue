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
import IProjeto from "@/interfaces/IProjeto";
import {EXCLUIR_PROJETO, NOTIFICAR} from "@/store/tipo-mutacoes";
import {TipoNotificacao} from "@/interfaces/INotificacao";

export default defineComponent({
    name: `Lista`,
    methods:{
        excluir(idProjeto:string){
           this.store.commit(EXCLUIR_PROJETO, idProjeto);
           this.store.commit(NOTIFICAR,{
               titulo:'Sucesso',
               texto:'Projeto excluido!',
               tipo:TipoNotificacao.SUCESSO
           })
           this.$router.push("/projetos");
        }
    },
    setup() {
        const store = useStore()
        return {
            projetos: computed(() => store.state.projetos),
            store
        }
    }
})

</script>

