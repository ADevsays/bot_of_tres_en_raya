<script>
    export default{
        props:{
            condition: Boolean,
            content: String,
            sub:String
        }
    }
</script>
<template>
    <div v-show="condition" class="absolute rounded-lg flex flex-col justify-center items-center shadow-lg bg-white w-auto p-5">
      <h3 class="font-bold text-3xl text-center">{{content}} <span class="text-emerald-700">{{sub}}</span></h3>
      <div class="flex gap-6">
        <slot/>
      </div>
    </div>
</template>