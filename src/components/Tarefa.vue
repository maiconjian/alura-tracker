<template>
    <Box>
        <div class="columns">
            <div class="column is-4">
                {{ tarefa.descricao || 'Tarefa sem descrição' }}
            </div>
            <div class="column is-3">
                {{tarefa.projeto?.nome || 'N/D'}}
            </div>
            <div class="column color-box" >
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

