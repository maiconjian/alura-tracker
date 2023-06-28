<template>
    <button class="button" @click="emitClick" :disabled="isDisabled">
                  <span class="icon" v-if="btnIcon != '' && btnIcon != null">
                    <i :class="btnIcon" ></i>
                  </span>
        <span>{{btnText}}</span>
    </button>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
    name:`Botao`,
    emits:['aoBtnClicked'],
    props:{
        // enteDeclaradosUtilidadePublicaEstadual
        isDisabled:{
            type:Boolean,
            default:false
        },
        btnText:{
            type:String,
            default: ''
        },
        btnIcon:{
            type:String,
            default:''
        }
    },
    methods:{
        emitClick():void{
            this.$emit('aoBtnClicked')
        }
    }
})

</script>

<style >

</style>