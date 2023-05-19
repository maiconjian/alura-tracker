import IProjeto from "@/interfaces/IProjeto";

export default interface ITarefa{
    duracaoEmSegundo:number;
    descricao:string;
    projeto:IProjeto;
    id:number;
}