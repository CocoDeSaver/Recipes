<template>
    <div>
        <label :for="identity" class="fw-semibold">
            {{ label }} <span style="color: #cb3a31">*</span>
            <slot></slot>
        </label>

        <!-- Input normal -->
        <div v-if="!isImage" :class="{'input-wrapper': type == 'file'}">
            <input
                class="form-control"
                :type="type"
                :id="identity"
                :placeholder="placeholder"
                :readonly="readonly === '1'"
                :value="modelValue"
                @input="$emit('update:modelValue', $event.target.value)"
                @keyup="$emit('keyInput', $event.target.value)"
                @focus="$emit('totalTimeFocus', $event.target.value)"
            />
        </div>

        <!-- Input Image -->
        <div v-else :class="{'input-wrapper': type == 'file'}">
            <input
                :class="[{ 'file-input': type == 'file' }, 'form-control']"
                type="file"
                :id="identity"
                accept="image/*"
                @change="handleImageUpload"
            />

            <!-- Preview jika ada -->
            <img
                v-if="preview"
                :src="preview"
                alt="Preview"
                class="mt-3"
                style="max-width: 150px; border-radius: 8px;"
            />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    modelValue: { type: [String, Number, File], default: '' },
    type: { type: String, required: true },
    label: { type: String, required: true },
    identity: { type: String, required: true },
    placeholder: { type: String, required: false },
    readonly: { type: String, default: '0' },
    isImage: { type: Boolean, default: false },
});

const emit = defineEmits([
    "update:modelValue", 
    "keyInput", 
    "totalTimeFocus"
]);

const preview = ref(null);

const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        emit("update:modelValue", file);
        preview.value = URL.createObjectURL(file);
    }
};
</script>

<style scoped>
.input-wrapper {
    padding: 0.375rem 0.75rem;
    width: 200px;
    text-align: center;
    align-items: center;
    overflow: hidden;
    position: relative;
    cursor: pointer;
    border: 1px solid #ced4da;
    background-color: #ced4da;
    border-radius: 0.375rem;
    margin-bottom: 10px;
    transition: all 1s ease;
}

.input-wrapper:hover {
    background-color: #b9bec3;
}

.file-input {
    cursor: pointer;
    height: 100px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 99;
    font-size: 50px;
    opacity: 0;
}
</style>