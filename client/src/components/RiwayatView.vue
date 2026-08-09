<template>
  <div class="space-y-6">
    
    <!-- Top Summary Banner -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="saas-card p-5">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Checked History</span>
        <span class="text-2xl font-black text-slate-900 font-mono mt-1 block">{{ history.length }}</span>
        <span class="text-[11px] text-slate-400">Total email tersimpan</span>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-emerald-500">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Live Emails</span>
        <span class="text-2xl font-black text-emerald-700 font-mono mt-1 block">{{ liveCount }}</span>
        <span class="text-[11px] text-emerald-600 font-semibold">Ready for outreach</span>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-rose-500">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Disabled (Die)</span>
        <span class="text-2xl font-black text-rose-700 font-mono mt-1 block">{{ dieCount }}</span>
        <span class="text-[11px] text-rose-600 font-semibold">High bounce risk</span>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-amber-500">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Verify Phone</span>
        <span class="text-2xl font-black text-amber-700 font-mono mt-1 block">{{ verifyCount }}</span>
        <span class="text-[11px] text-amber-600 font-semibold">Require 2FA</span>
      </div>
    </div>

    <!-- Main Table Container -->
    <div class="saas-card overflow-hidden">
      <!-- Filter & Actions Bar -->
      <div class="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/60">
        
        <!-- Filter Tabs -->
        <div class="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 overflow-x-auto">
          <button
            v-for="tab in filterTabs"
            :key="tab.value"
            @click="activeFilter = tab.value"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap"
            :class="activeFilter === tab.value ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'">
            {{ tab.label }} ({{ getCount(tab.value) }})
          </button>
        </div>

        <!-- Search & Actions -->
        <div class="flex items-center gap-2 flex-wrap">
          <div class="relative flex-1 sm:w-48">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari riwayat email..."
              class="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition" />
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>

          <button
            @click="$emit('copyLiveHistory')"
            class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer">
            Salin Live
          </button>

          <button
            @click="$emit('exportHistoryCsv')"
            class="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xs transition cursor-pointer">
            Ekspor CSV
          </button>

          <button
            @click="$emit('clearHistory')"
            :disabled="history.length === 0"
            class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-rose-600 border border-slate-200 hover:bg-rose-50 transition cursor-pointer disabled:opacity-40">
            Hapus Riwayat
          </button>
        </div>
      </div>

      <!-- History Table View -->
      <div v-if="filteredHistory.length > 0" class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th class="py-3 px-4 w-12">#</th>
              <th class="py-3 px-4">Email Address</th>
              <th class="py-3 px-4">Status Hasil</th>
              <th class="py-3 px-4">Raw Response</th>
              <th class="py-3 px-4">Tanggal & Waktu Pengecekan</th>
              <th class="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200/70 font-sans">
            <tr
              v-for="(row, idx) in filteredHistory"
              :key="row.id || idx"
              class="hover:bg-slate-50/80 transition">
              <td class="py-3 px-4 font-mono text-slate-400">{{ idx + 1 }}</td>
              <td class="py-3 px-4">
                <div class="font-semibold text-slate-900 font-mono">{{ row.email }}</div>
                <div class="text-[11px] text-slate-400 font-mono">Domain: {{ row.domain || '-' }}</div>
              </td>

              <!-- Status Badge -->
              <td class="py-3 px-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase" :class="getStatusBadgeClass(row.checkmailStatus)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(row.checkmailStatus)"></span>
                  {{ row.badgeLabel }}
                </span>
              </td>

              <!-- Raw Response -->
              <td class="py-3 px-4 font-mono font-bold text-slate-700">
                {{ row.rawStatus }}
              </td>

              <!-- Timestamp -->
              <td class="py-3 px-4 font-mono text-slate-500">
                {{ row.checkedAt }}
              </td>

              <!-- Actions -->
              <td class="py-3 px-4 text-right space-x-1.5">
                <button
                  @click="$emit('openDetail', row)"
                  class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer">
                  Detail Audit
                </button>
                <button
                  @click="$emit('addToLedger', row)"
                  class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition cursor-pointer">
                  + Ledger
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 text-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        </div>
        <h4 class="font-bold text-slate-800 text-sm">Belum Ada Riwayat Pengecekan</h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          Setiap pengecekan email yang Anda lakukan di menu "Cek Email" akan tercatat secara otomatis di sini.
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  history: { type: Array, default: () => [] }
});

defineEmits(['openDetail', 'addToLedger', 'copyLiveHistory', 'exportHistoryCsv', 'clearHistory']);

const activeFilter = ref('all');
const searchQuery = ref('');

const filterTabs = [
  { label: 'Semua', value: 'all' },
  { label: 'Live (Valid)', value: 'live' },
  { label: 'Verify Phone', value: 'verify_phone' },
  { label: 'Disabled (Die)', value: 'die' },
  { label: 'Unregistered', value: 'not_exist' }
];

const liveCount = computed(() => props.history.filter(r => r.checkmailStatus === 'live').length);
const dieCount = computed(() => props.history.filter(r => r.checkmailStatus === 'die').length);
const verifyCount = computed(() => props.history.filter(r => r.checkmailStatus === 'verify_phone').length);

const filteredHistory = computed(() => {
  let list = props.history;
  if (activeFilter.value !== 'all') {
    list = list.filter(r => r.checkmailStatus === activeFilter.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(r => r.email.toLowerCase().includes(q) || (r.domain && r.domain.toLowerCase().includes(q)));
  }
  return list;
});

function getCount(val) {
  if (val === 'all') return props.history.length;
  return props.history.filter(r => r.checkmailStatus === val).length;
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'live': return 'badge-valid';
    case 'verify_phone': return 'badge-risky';
    case 'die': return 'badge-invalid';
    case 'not_exist': case 'error': default: return 'badge-unregistered';
  }
}

function getStatusDotClass(status) {
  switch (status) {
    case 'live': return 'bg-emerald-500';
    case 'verify_phone': return 'bg-amber-500';
    case 'die': return 'bg-rose-500';
    default: return 'bg-slate-400';
  }
}
</script>
