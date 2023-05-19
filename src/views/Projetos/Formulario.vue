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
import {useStore} from "@/store";
import {TipoNotificacao} from "@/interfaces/INotificacao";
import useNotificador from "@/hooks/notificador";
import {ALTERAR_PROJETOS, CADASTRAR_PROJETOS} from "@/store/tipo-acoes";

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
            const projeto = this.store.state.projeto.projetos.find(proj => proj.id == this.id);
            this.nomeDoProjeto = projeto?.nome || '';
        }
    },
    // mixins:[
    //     notificacaoMixin,
    // ],
    methods: {
        salvar() {
            if (this.id) {
                this.store.dispatch(ALTERAR_PROJETOS,{
                    id:this.id,
                    nome:this.nomeDoProjeto
                }).then(()=>  this.lidarComSucesso("Projeto Alterado!"))
                this.notificar('Sucesso','Projeto alterado!',TipoNotificacao.SUCESSO)
            } else {
                    this.store.dispatch(CADASTRAR_PROJETOS, this.nomeDoProjeto).then(()=>{
                      this.lidarComSucesso("Projeto salvo!")
                    })
            }
        },
        lidarComSucesso(texto:string){
            this.nomeDoProjeto = '';
            this.notificar('Sucesso',texto,TipoNotificacao.SUCESSO)
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

