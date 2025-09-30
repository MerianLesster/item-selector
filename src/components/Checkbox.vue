<template>
  <div>
    <div class="checkbox-wrapper">
      <div class="checkbox">
        <input type="checkbox" :id="`checkbox-${title}-${id}`" v-model="isChecked" />
        <label
          :for="`checkbox-${title}-${id}`"
          :style="{ cursor: 'pointer', fontWeight: isFolder ? 'bold' : 'normal' }"
          >{{ title }}</label
        >
      </div>
      <button class="collapse-button" v-if="isFolder">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="15">
          <path
            d="M297.4 169.4C309.9 156.9 330.2 156.9 342.7 169.4L534.7 361.4C547.2 373.9 547.2 394.2 534.7 406.7C522.2 419.2 501.9 419.2 489.4 406.7L320 237.3L150.6 406.6C138.1 419.1 117.8 419.1 105.3 406.6C92.8 394.1 92.8 373.8 105.3 361.3L297.3 169.3z"
          />
        </svg>
      </button>
    </div>

    <div v-if="isFolder" class="folder-contents">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  id: number
  title: string
  isFolder: boolean
}>()
const isChecked = defineModel<boolean>({ required: true })
</script>

<style scoped>
.checkbox-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--spacing);
  transition: background-color 0.3s;
  padding: 8px 15px;
}

.checkbox-wrapper:hover {
  background-color: var(--color-hover);
  border-radius: var(--border-radius);
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 8px;
}

.collapse-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.folder-contents {
  margin-left: 20px;
  border-left: 1px solid var(--color-border);
}
</style>
