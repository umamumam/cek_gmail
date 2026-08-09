<template>
  <header class="w-full shrink-0 bg-white border-b border-slate-200 z-30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
    
    <!-- Left: Hamburger Toggle (Mobile) & Title -->
    <div class="flex items-center space-x-3 sm:space-x-6 flex-1 max-w-xl">
      <!-- Mobile Hamburger Button -->
      <button
        @click="$emit('toggleMobileMenu')"
        class="md:hidden p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>

      <div>
        <h2 class="text-sm sm:text-base font-bold text-slate-900 leading-none capitalize truncate">{{ title }}</h2>
        <p class="text-[11px] text-slate-500 mt-1 font-medium hidden sm:block truncate">{{ description }}</p>
      </div>

      <!-- Search Field (Desktop) -->
      <div class="relative flex-1 hidden md:block">
        <input
          v-model="search"
          @input="$emit('update:globalSearch', search)"
          type="text"
          placeholder="Cari email, domain, atau status..."
          class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition-all duration-150" />
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </div>
    </div>

    <!-- Right: Header Actions & Profile -->
    <div class="flex items-center space-x-2 sm:space-x-3">
      <!-- Quick API Key Status Pill -->
      <div class="hidden lg:flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs">
        <span class="text-slate-400 font-medium">API Token:</span>
        <span class="font-mono text-slate-700 font-bold max-w-[120px] truncate" :title="apiKey">
          {{ apiKey.slice(0, 10) }}...
        </span>
        <button 
          @click="$emit('openApiConfig')"
          class="text-blue-600 font-semibold hover:underline text-[11px] cursor-pointer">
          Ubah
        </button>
      </div>

      <!-- User Profile Badge -->
      <div class="flex items-center space-x-2.5 pl-2.5 sm:pl-3 border-l border-slate-200">
        <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs shadow-xs">
          AU
        </div>
        <div class="hidden sm:block text-left">
          <span class="block text-xs font-bold text-slate-900 leading-tight">Admin User</span>
          <span class="block text-[10px] text-slate-500">Enterprise Plan</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  title: { type: String, default: 'Cek Email' },
  description: { type: String, default: 'Verifikasi status keaktifan email secara individual atau masal.' },
  apiKey: { type: String, default: '' },
  globalSearch: { type: String, default: '' }
});

const emit = defineEmits(['update:globalSearch', 'openApiConfig', 'toggleMobileMenu']);

const search = ref(props.globalSearch);

watch(() => props.globalSearch, (newVal) => {
  search.value = newVal;
});
</script>
