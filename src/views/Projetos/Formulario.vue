<template>
    <section >
        <form @submit.prevent="salvar">
            <div class="field">
                <label for="nomeDoProjeto" class="label">
                    Nome Do Projeto
                </label>
                <input type="text" class="input" v-model="nomeDoProjeto" id="nomeDoProjeto">
            </div>
            <div class="field">
                <button class="button" type="submit">
                    Salvar
                </button>
            </div>
        </form>
    </section>

</template>

<script lang="ts">

import {defineComponent} from "vue";
import {store, useStore} from "@/store";
import {ADICIONA_PROJETO, ALTERA_PROJETO} from "@/store/tipo-mutacoes";
import {TipoNotificacao} from "@/interfaces/INotificacao";
import {notificacaoMixin} from "@/mixins/notificar";
import useNotificador from "@/hooks/notificador";

export default defineComponent({
    name: `Formulario`,
    data() {
        return {
            nomeDoProjeto: '',
        }
    },
    props: {
        id: {
            type: String,

        }
    },
    mounted() {
        console.log(this.id);
        if (this.id) {
            const projeto = this.store.state.projetos.find(proj => proj.id == this.id);
            console.log(projeto);
            this.nomeDoProjeto = projeto?.nome || '';
        }
    },
    // mixins:[
    //     notificacaoMixin,
    // ],
    methods: {
        salvar() {
            if (this.id) {
                this.store.commit(ALTERA_PROJETO,{
                    id:this.id,
                    nome:this.nomeDoProjeto
                })
                this.notificar('Sucesso','Projeto alterado!',TipoNotificacao.SUCESSO)
            } else {
                    this.store.commit(ADICIONA_PROJETO, this.nomeDoProjeto),
                    this.nomeDoProjeto = '';
                this.notificar('Sucesso','Projeto salvo!',TipoNotificacao.SUCESSO)
            }
            this.$router.push("/projetos");

        }
    },
    setup() {
        const store = useStore()
        const {notificar} = useNotificador()
        return {
            store,
            notificar
        }
    }
})

</script>

