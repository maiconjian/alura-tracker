<template>
    <Formulario @aoSalvarTarefa="salvarTarefa"/>
    <div class="lista">
        <Tarefa v-for="(tarefa,index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaEstaVazia">
            Você não esta muito produtivo hoje :(
        </Box>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import Formulario from "@/components/Formulario.vue";
import Box from "@/components/Box.vue";
import Tarefa from "@/components/Tarefa.vue";
import ITarefa from "../interfaces/ITarefa";
import {useStore} from "@/store";
import {NOTIFICAR} from "@/store/tipo-mutacoes";
import {TipoNotificacao} from "@/interfaces/INotificacao";

export default defineComponent({
    name: 'App',
    components: {
        Box,
        Formulario,
        Tarefa
    },
    data() {
        return {
            tarefas: [] as ITarefa[],
        }
    },
    computed: {
        listaEstaVazia(): boolean {
            return this.tarefas.length === 0
        }
    },
    methods: {
        salvarTarefa(tarefa: ITarefa) {
            this.tarefas.push(tarefa);


        },
    }
});
</script>
