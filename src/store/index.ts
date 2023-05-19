import IProjeto from "@/interfaces/IProjeto";
import {createStore, Store, useStore as vuexUseStore} from "vuex";
import {InjectionKey} from "vue";
import {ADICIONA_TAREFA, ALTERA_TAREFA, DEFINIR_PROJETO, DEFINIR_TAREFAS, NOTIFICAR} from "@/store/tipo-mutacoes";
import {INotificacao} from "@/interfaces/INotificacao";
import {ALTERAR_TAREFA, CADASTRAR_TAREFA, OBTER_TAREFAS} from "@/store/tipo-acoes";
import http from "@/http"
import ITarefa from "@/interfaces/ITarefa";
import {EstadoProjeto, projeto} from "@/store/modulos/projeto";
import {EstadoTarefa, tarefa} from "@/store/modulos/tarefa";

export interface Estado {
    notificacoes: INotificacao[];
    tarefa:EstadoTarefa
    projeto:EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()
export const store = createStore<Estado>({
    state: {
        tarefa:{
            tarefas:[]
        },
        notificacoes: [],
        projeto:{
            projetos:[]
        }
    },
    mutations: {

        [NOTIFICAR](state,novaNotificacao:INotificacao){
            novaNotificacao.id = new Date().getTime()
            state.notificacoes.push(novaNotificacao)

            setTimeout(()=>{
                // state.notificacoes= state.notificacoes.filter(notificacao => notificacao.id != novaNotificacao.id);
                state.notificacoes = [];
            },3000)
        },


    },
    modules:{
        projeto,
        tarefa
    }
});

export function useStore(): Store<Estado> {
    return vuexUseStore(key)
}