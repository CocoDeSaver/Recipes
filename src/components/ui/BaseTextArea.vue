<template>
    <div>
        <label :for="identity" class="fw-semibold">
            {{ label }}
            <span style="color: #cb3a31">*</span>
        </label>
        <textarea 
            class="form-control" 
            :id="identity"
            :placeholder="placeholder"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)">
        </textarea>
    </div>
</template>

<script setup>
defineProps({
    identity: { type: String, required: true },
    label: { type: String, required: true },
    placeholder: { type: String, required: false },
    modelValue: { type: String }
});

defineEmits(['update:modelValue']);
</script>