<template>
    <Box>
        <div class="columns">
            <div class="column is-7">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column">
                <Cronometro :tempo-em-segundos="tarefa.duracaoEmSegundo"/>
            </div>
        </div>
    </Box>

</template>

<script lang="ts">

import {defineComponent, PropType} from "vue";
import Cronometro from "@/components/Cronometro.vue";
import ITarefa from "@/interfaces/ITarefa";
import Box from "@/components/Box.vue";

export default defineComponent({
    name: `Tarefa`,
    components: {
        Cronometro,
        Box,
    },
    props: {
        tarefa: {
            type: Object as PropType<ITarefa>,
            required: true
        }
    }
})

</script>

<style scoped>

</style>