<template>
  <aside class="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-full z-40 select-none shrink-0 shadow-2xs">
    <div class="p-5 space-y-6">
      <!-- App Brand Logo & Mobile Close -->
      <div class="flex items-center justify-between px-1">
        <div class="flex items-center space-x-3">
          <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25 font-extrabold text-xl">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"/>
              <path d="M22 2 11 13"/>
            </svg>
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h1 class="font-extrabold text-lg tracking-tight text-slate-900 leading-none">CekGmail</h1>
              <span class="text-[10px] font-bold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200">PRO</span>
            </div>
            <p class="text-[11px] text-slate-500 font-medium mt-0.5">Validation Hub</p>
          </div>
        </div>

        <!-- Mobile Close Button -->
        <button
          v-if="isMobile"
          @click="$emit('closeMobileMenu')"
          class="md:hidden text-slate-400 hover:text-slate-700 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center cursor-pointer">
          ✕
        </button>
      </div>

      <!-- Navigation Section -->
      <div class="space-y-1.5">
        <div class="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Main Navigation</div>
        <nav class="space-y-1">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="handleSelect(item.id)"
            class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 cursor-pointer"
            :class="activeTab === item.id 
              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'">
            <div class="flex items-center gap-3">
              <component :is="item.icon" class="w-4 h-4" :class="activeTab === item.id ? 'text-white' : 'text-slate-500'" />
              <span>{{ item.label }}</span>
            </div>
            <span v-if="item.badge !== undefined" 
              class="px-2 py-0.5 rounded-full text-[10px] font-bold"
              :class="activeTab === item.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600 border border-slate-200'">
              {{ item.badge }}
            </span>
          </button>
        </nav>
      </div>
    </div>

    <!-- Sidebar Bottom System Info & Credits -->
    <div class="p-4 border-t border-slate-200 space-y-3 bg-slate-50/60">
      <!-- Netnit Credits Display Widget -->
      <div class="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
        <div class="flex items-center justify-between text-xs">
          <span class="text-slate-600 font-bold flex items-center gap-1.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Netnit Credits
          </span>
          <span class="font-bold text-slate-900 font-mono">{{ formatNumber(apiCredits) }}</span>
        </div>
        <div v-if="subCredits !== null" class="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-1">
          <span>Subscription:</span>
          <span class="font-bold text-emerald-600 font-mono">{{ formatNumber(subCredits) }}</span>
        </div>
      </div>

      <!-- Engine Online Status Pill -->
      <div class="flex items-center justify-between px-2 text-[11px]">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full" :class="isServerOnline ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'"></span>
          <span class="font-bold text-slate-700">{{ isServerOnline ? 'Engine Online' : 'Engine Offline' }}</span>
        </div>
        <span class="text-slate-400 font-mono text-[10px]">v1.0 API</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, h } from 'vue';

const props = defineProps({
  activeTab: { type: String, required: true },
  apiCredits: { type: Number, default: null },
  subCredits: { type: Number, default: null },
  isServerOnline: { type: Boolean, default: true },
  historyCount: { type: Number, default: 0 },
  changesCount: { type: Number, default: 0 },
  ledgerCount: { type: Number, default: 0 },
  isMobile: { type: Boolean, default: false }
});

const emit = defineEmits(['navigate', 'closeMobileMenu']);

function handleSelect(id) {
  emit('navigate', id);
  if (props.isMobile) emit('closeMobileMenu');
}

const navItems = computed(() => [
  {
    id: 'checker',
    label: 'Cek Email',
    icon: renderSvgIcon('M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6')
  },
  {
    id: 'riwayat',
    label: 'Riwayat Email',
    badge: props.historyCount,
    icon: renderSvgIcon('M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z')
  },
  {
    id: 'perubahan',
    label: 'Riwayat Perubahan',
    badge: props.changesCount,
    icon: renderSvgIcon('M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4')
  },
  {
    id: 'ledger',
    label: 'Catatan Email',
    badge: props.ledgerCount,
    icon: renderSvgIcon('M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2')
  },
  {
    id: 'api',
    label: 'Developer API',
    icon: renderSvgIcon('M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4')
  }
]);

function renderSvgIcon(dPath) {
  return {
    render() {
      return h('svg', {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round'
      }, [
        h('path', { d: dPath })
      ]);
    }
  };
}

function formatNumber(num) {
  if (num === null || num === undefined) return '0';
  return num.toLocaleString();
}
</script>
