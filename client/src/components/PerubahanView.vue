<template>
  <div class="space-y-6">
    
    <!-- Top Change Summary Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="saas-card p-5">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Status Changes</span>
        <span class="text-2xl font-black text-slate-900 font-mono mt-1 block">{{ changes.length }}</span>
        <span class="text-[11px] text-slate-400">Total perubahan status terdeteksi</span>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-emerald-500">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Die ➔ Live (Restored)</span>
        <span class="text-2xl font-black text-emerald-700 font-mono mt-1 block">{{ restoredCount }}</span>
        <span class="text-[11px] text-emerald-600 font-semibold">Akun kembali aktif</span>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-rose-500">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Live ➔ Die (Deactivated)</span>
        <span class="text-2xl font-black text-rose-700 font-mono mt-1 block">{{ deactivatedCount }}</span>
        <span class="text-[11px] text-rose-600 font-semibold">Akun mati / dibanned</span>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="saas-card overflow-hidden">
      <!-- Filter Bar -->
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

        <!-- Search & Clear -->
        <div class="flex items-center gap-2">
          <div class="relative flex-1 sm:w-52">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari perubahan email..."
              class="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition" />
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>

          <button
            @click="$emit('clearChanges')"
            :disabled="changes.length === 0"
            class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-rose-600 border border-slate-200 hover:bg-rose-50 transition cursor-pointer disabled:opacity-40 whitespace-nowrap">
            Bersihkan Log
          </button>
        </div>
      </div>

      <!-- Table View -->
      <div v-if="filteredChanges.length > 0" class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th class="py-3 px-4 w-12">#</th>
              <th class="py-3 px-4">Email Address</th>
              <th class="py-3 px-4">Transition (Status Lama ➔ Status Baru)</th>
              <th class="py-3 px-4">Kategori Perubahan</th>
              <th class="py-3 px-4">Waktu Terdeteksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200/70 font-sans">
            <tr
              v-for="(row, idx) in filteredChanges"
              :key="row.id || idx"
              class="hover:bg-slate-50/80 transition">
              <td class="py-3.5 px-4 font-mono text-slate-400">{{ idx + 1 }}</td>
              <td class="py-3.5 px-4 font-mono font-semibold text-slate-900">
                {{ row.email }}
              </td>

              <!-- Status Transition Pill -->
              <td class="py-3.5 px-4">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase" :class="getStatusBadgeClass(row.oldStatus)">
                    {{ row.oldBadgeLabel || row.oldStatus }}
                  </span>
                  
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>

                  <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase" :class="getStatusBadgeClass(row.newStatus)">
                    {{ row.newBadgeLabel || row.newStatus }}
                  </span>
                </div>
              </td>

              <!-- Change Category Badge -->
              <td class="py-3.5 px-4">
                <span class="px-2.5 py-1 rounded-full text-xs font-bold" :class="getChangeCategoryClass(row)">
                  {{ getChangeCategoryLabel(row) }}
                </span>
              </td>

              <!-- Timestamp -->
              <td class="py-3.5 px-4 font-mono text-slate-500">
                {{ row.changedAt }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 text-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/></svg>
        </div>
        <h4 class="font-bold text-slate-800 text-sm">Belum Ada Perubahan Status Email</h4>
        <p class="text-xs text-slate-400 max-w-md mx-auto">
          Ketika Anda melakukan pengecekan ulang terhadap email yang pernah diperiksa sebelumnya dan statusnya berubah (misalnya dari <strong class="text-slate-700">Die</strong> menjadi <strong class="text-slate-700">Live</strong>), riwayat perubahannya akan dicatat secara otomatis di sini.
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  changes: { type: Array, default: () => [] }
});

defineEmits(['clearChanges']);

const activeFilter = ref('all');
const searchQuery = ref('');

const filterTabs = [
  { label: 'Semua Perubahan', value: 'all' },
  { label: 'Die ➔ Live (Restored)', value: 'die_to_live' },
  { label: 'Live ➔ Die (Deactivated)', value: 'live_to_die' }
];

const restoredCount = computed(() => 
  props.changes.filter(c => c.oldStatus === 'die' && c.newStatus === 'live').length
);

const deactivatedCount = computed(() => 
  props.changes.filter(c => c.oldStatus === 'live' && c.newStatus === 'die').length
);

const filteredChanges = computed(() => {
  let list = props.changes;
  if (activeFilter.value === 'die_to_live') {
    list = list.filter(c => c.oldStatus === 'die' && c.newStatus === 'live');
  } else if (activeFilter.value === 'live_to_die') {
    list = list.filter(c => c.oldStatus === 'live' && c.newStatus === 'die');
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(c => c.email.toLowerCase().includes(q));
  }
  return list;
});

function getCount(val) {
  if (val === 'all') return props.changes.length;
  if (val === 'die_to_live') return restoredCount.value;
  if (val === 'live_to_die') return deactivatedCount.value;
  return 0;
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'live': return 'badge-valid';
    case 'verify_phone': return 'badge-risky';
    case 'die': return 'badge-invalid';
    case 'not_exist': case 'error': default: return 'badge-unregistered';
  }
}

function getChangeCategoryLabel(row) {
  if (row.oldStatus === 'die' && row.newStatus === 'live') return 'Status Active (Restored)';
  if (row.oldStatus === 'live' && row.newStatus === 'die') return 'Status Banned (Deactivated)';
  return 'Status Updated';
}

function getChangeCategoryClass(row) {
  if (row.oldStatus === 'die' && row.newStatus === 'live') return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  if (row.oldStatus === 'live' && row.newStatus === 'die') return 'bg-rose-50 text-rose-700 border border-rose-200';
  return 'bg-blue-50 text-blue-700 border border-blue-200';
}
</script>
