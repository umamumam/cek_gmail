<template>
  <div class="space-y-6">
    
    <!-- Top Premium Summary Banner Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- 1. Total Checked History -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-5 text-white shadow-md shadow-slate-950/20 hover:shadow-lg transition-all duration-200 group">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition"></div>
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            <span class="text-[11px] font-extrabold text-slate-300 uppercase tracking-wider">Total Checked</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-blue-300 flex items-center justify-center border border-white/15 group-hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
        </div>
        <div class="mt-3 relative z-10">
          <span class="text-2xl font-black font-mono tracking-tight text-white block">{{ history.length }}</span>
          <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[11px]">
            <span class="text-slate-300 font-medium">Tersimpan di sistem</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-blue-400/20 text-blue-300 border border-blue-400/30">DATABASE</span>
          </div>
        </div>
      </div>

      <!-- 2. Live Emails -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white to-emerald-500/5 p-5 border border-emerald-200/80 shadow-sm hover:shadow-md transition-all duration-200 group">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition"></div>
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span class="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">Live Emails</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 group-hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
        </div>
        <div class="mt-3 relative z-10">
          <span class="text-2xl font-black text-slate-900 font-mono tracking-tight block">{{ liveCount }}</span>
          <div class="flex items-center justify-between mt-2 pt-2 border-t border-emerald-100 text-[11px]">
            <span class="text-emerald-700 font-bold">Siap Digunakan</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">ACTIVE</span>
          </div>
        </div>
      </div>

      <!-- 3. Disabled (Die) -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-500/10 via-white to-rose-500/5 p-5 border border-rose-200/80 shadow-sm hover:shadow-md transition-all duration-200 group">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-rose-500/10 rounded-full blur-2xl group-hover:bg-rose-500/20 transition"></div>
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-rose-500"></span>
            <span class="text-[11px] font-extrabold text-rose-800 uppercase tracking-wider">Disabled (Die)</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md shadow-rose-500/30 group-hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
        </div>
        <div class="mt-3 relative z-10">
          <span class="text-2xl font-black text-slate-900 font-mono tracking-tight block">{{ dieCount }}</span>
          <div class="flex items-center justify-between mt-2 pt-2 border-t border-rose-100 text-[11px]">
            <span class="text-rose-700 font-bold">Risiko Bounce</span>
            <span class="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">NONAKTIF</span>
          </div>
        </div>
      </div>

      <!-- 4. Verify Phone (2FA) -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 p-5 border border-amber-200/80 shadow-sm hover:shadow-md transition-all duration-200 group">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition"></div>
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span class="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">Verify Phone</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
          </div>
        </div>
        <div class="mt-3 relative z-10">
          <span class="text-2xl font-black text-slate-900 font-mono tracking-tight block">{{ verifyCount }}</span>
          <div class="flex items-center justify-between mt-2 pt-2 border-t border-amber-100 text-[11px]">
            <span class="text-amber-700 font-bold">Butuh SMS OTP</span>
            <span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">VERIFY 2FA</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Main Table Container -->
    <div class="saas-card overflow-hidden">
      <!-- Table Filters & Batch Controls (2-Row Layout) -->
      <div class="p-4 border-b border-slate-200 bg-slate-50/70 space-y-3">
        <!-- Row 1: Filter Tabs + Live Search -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <!-- Filter Tabs -->
          <div class="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 overflow-x-auto shadow-2xs">
            <button
              v-for="tab in filterTabs"
              :key="tab.value"
              @click="activeFilter = tab.value"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap"
              :class="activeFilter === tab.value ? 'bg-blue-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'">
              {{ tab.label }} ({{ getCount(tab.value) }})
            </button>
          </div>

          <!-- Live Search Bar -->
          <div class="relative sm:w-56">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari riwayat email..."
              class="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition shadow-2xs" />
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>
        </div>

        <!-- Row 2: Batch Action Buttons -->
        <div class="flex items-center justify-between gap-2 flex-wrap pt-3 border-t border-slate-200/80">
          <div class="flex items-center gap-2">
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
          </div>

          <div class="flex items-center gap-2">
            <button
              @click="handleBatchDelete"
              :disabled="selectedEmails.length === 0"
              class="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition cursor-pointer disabled:opacity-40">
              🗑️ Hapus Terpilih ({{ selectedEmails.length }})
            </button>

            <button
              @click="$emit('clearHistory')"
              :disabled="history.length === 0"
              class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-rose-600 border border-slate-200 hover:bg-rose-50 transition cursor-pointer disabled:opacity-40">
              Kosongkan Semua
            </button>
          </div>
        </div>
      </div>

      <!-- History Table View -->
      <div v-if="filteredHistory.length > 0" class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th class="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              </th>
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
              class="hover:bg-slate-50/80 transition"
              :class="selectedEmails.includes(row.email) ? 'bg-blue-50/40' : ''">
              <!-- Checkbox Column -->
              <td class="py-3 px-4">
                <input
                  type="checkbox"
                  :value="row.email"
                  v-model="selectedEmails"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              </td>

              <td class="py-3 px-4 font-mono text-slate-400">{{ idx + 1 }}</td>
              <td class="py-3 px-4">
                <div class="font-semibold text-slate-900 font-mono">{{ row.email }}</div>
              </td>
              <td class="py-3 px-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase" :class="getStatusBadgeClass(row.checkmailStatus)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(row.checkmailStatus)"></span>
                  {{ getStatusLabel(row.checkmailStatus) }}
                </span>
              </td>
              <td class="py-3 px-4 text-slate-500 font-mono text-[11px]">
                {{ row.rawResponse || '-' }}
              </td>
              <td class="py-3 px-4 font-mono text-slate-600">
                {{ row.checkedAt || '-' }}
              </td>
              <td class="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                <button
                  @click="$emit('openDetail', row)"
                  title="Lihat Detail"
                  class="w-8 h-8 rounded-lg text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer inline-flex items-center justify-center shadow-2xs">
                  <i class="fa-solid fa-eye"></i>
                </button>
                <button
                  @click="$emit('addToLedger', row)"
                  title="Tambahkan Ke Ledger Catatan Email"
                  class="w-8 h-8 rounded-lg text-xs bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 transition cursor-pointer inline-flex items-center justify-center shadow-2xs">
                  <i class="fa-solid fa-folder-plus"></i>
                </button>
                <button
                  @click="handleDeleteSingle(row.email)"
                  title="Hapus dari Riwayat"
                  class="w-8 h-8 rounded-lg text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition cursor-pointer inline-flex items-center justify-center shadow-2xs">
                  <i class="fa-solid fa-trash-can"></i>
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
        <h4 class="font-bold text-slate-800 text-sm">Riwayat Email Masih Kosong</h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          Lakukan verifikasi email pada menu Cek Email untuk mulai mencatat riwayat keaktifan email.
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

const emit = defineEmits(['openDetail', 'addToLedger', 'copyLiveHistory', 'exportHistoryCsv', 'clearHistory', 'deleteSelectedHistory']);

const activeFilter = ref('all');
const searchQuery = ref('');
const selectedEmails = ref([]);

const filterTabs = [
  { label: 'Semua Riwayat', value: 'all' },
  { label: 'Live Active', value: 'live' },
  { label: 'Verify Phone', value: 'verify_phone' },
  { label: 'Disabled (Die)', value: 'die' },
  { label: 'Unregistered', value: 'not_exist' }
];

const liveCount = computed(() => props.history.filter(h => h.checkmailStatus === 'live').length);
const verifyCount = computed(() => props.history.filter(h => h.checkmailStatus === 'verify_phone').length);
const dieCount = computed(() => props.history.filter(h => h.checkmailStatus === 'die').length);

const filteredHistory = computed(() => {
  let list = props.history;
  if (activeFilter.value !== 'all') {
    list = list.filter(h => h.checkmailStatus === activeFilter.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(h => h.email.toLowerCase().includes(q));
  }
  return list;
});

const isAllSelected = computed(() => {
  if (filteredHistory.value.length === 0) return false;
  return filteredHistory.value.every(row => selectedEmails.value.includes(row.email));
});

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedEmails.value = [];
  } else {
    selectedEmails.value = filteredHistory.value.map(row => row.email);
  }
}

function handleBatchDelete() {
  if (selectedEmails.value.length === 0) return;
  emit('deleteSelectedHistory', [...selectedEmails.value]);
  selectedEmails.value = [];
}

function handleDeleteSingle(email) {
  emit('deleteSelectedHistory', [email]);
  selectedEmails.value = selectedEmails.value.filter(e => e !== email);
}

function getCount(val) {
  if (val === 'all') return props.history.length;
  return props.history.filter(h => h.checkmailStatus === val).length;
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'live': return 'badge-valid';
    case 'verify_phone': return 'badge-risky';
    case 'die': return 'badge-invalid';
    case 'not_exist': return 'badge-unregistered';
    default: return 'bg-slate-100 text-slate-600 border border-slate-200';
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

function getStatusLabel(status) {
  switch (status) {
    case 'live': return 'LIVE (ACTIVE)';
    case 'verify_phone': return 'VERIFY PHONE';
    case 'die': return 'DISABLED (DIE)';
    case 'not_exist': return 'UNREGISTERED';
    default: return 'UNKNOWN';
  }
}
</script>
