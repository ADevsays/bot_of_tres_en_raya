<script>
    export default{
        props:{
            onClick: Function,
        }
    }
</script>

<template>
    <button 
        @click="onClick"
        class="border-2 rounded-xl text-lg text-white font-bold w-36 py-3 mt-5">
        <slot></slot>
    </button>
</template> 