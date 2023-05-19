import {Module} from "vuex";
import {Estado} from "@/store";
import {ADICIONA_PROJETO, ALTERA_PROJETO, DEFINIR_PROJETO, EXCLUIR_PROJETO} from "@/store/tipo-mutacoes";
import IProjeto from "@/interfaces/IProjeto";
import {ALTERAR_PROJETOS, CADASTRAR_PROJETOS, OBTER_PROJETOS, REMOVER_PROJETOS} from "@/store/tipo-acoes";
import http from "@/http";

export interface EstadoProjeto{
    projetos:IProjeto[]
}

export const projeto:Module<EstadoProjeto, Estado> = {
    mutations:{
        [ADICIONA_PROJETO](state, nomeDoProjeto: string) {
            const projeto = {
                id: new Date().toISOString(),
                nome: nomeDoProjeto
            } as IProjeto
            state.projetos.push(projeto);
        },
        [ALTERA_PROJETO](state, projeto: IProjeto) {
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        [EXCLUIR_PROJETO](state, idProjeto: string) {
            state.projetos = state.projetos.filter(proj => proj.id != idProjeto);
        },
        [DEFINIR_PROJETO](state,projetos:IProjeto[]){
            state.projetos = projetos
        },
    },
    actions:{
        [OBTER_PROJETOS]({commit}){
            http.get('projetos')
                .then(resposta => commit(DEFINIR_PROJETO,resposta.data))
        },
        [CADASTRAR_PROJETOS](contexto,nomeProjeto){
            return http.post('/projetos',{
                nome:nomeProjeto
            })
        },
        [ALTERAR_PROJETOS](contexto,projeto:IProjeto){
            return http.put(`/projetos/${projeto.id}`,projeto)
        },
        [REMOVER_PROJETOS]({commit}   ,idProjeto:string){
            return http.delete(`/projetos/${idProjeto}`).then(()=>{
                commit(EXCLUIR_PROJETO,idProjeto)
            })
        },


    }
}