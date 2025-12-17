<template>
    <select 
        class="form-select" 
        :id="id"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)">
        <option v-for="(item, index) in data" :key="index" :value="item">
            {{ item }}
        </option>
    </select>
</template>

<script setup>
defineProps({
    data: { type: Array, required: true },
    id: { type: String, required: false },
    modelValue: { type: [String, Number] }
});

defineEmits(['update:modelValue']);
</script>