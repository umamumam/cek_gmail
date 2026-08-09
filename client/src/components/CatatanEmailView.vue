<template>
  <div class="space-y-6">
    
    <!-- Top Ledger Stats Summary -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <div class="saas-card p-5">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Email Ledger</span>
        <span class="text-2xl font-black text-slate-900 font-mono mt-1 block">{{ ledger.length }}</span>
        <span class="text-[11px] text-slate-400">Database email unik tersimpan</span>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-amber-500">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Belum Disetor</span>
        <span class="text-2xl font-black text-amber-700 font-mono mt-1 block">{{ pendingCount }}</span>
        <span class="text-[11px] text-amber-600 font-semibold">Menunggu setoran</span>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-emerald-500">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Sudah Disetor</span>
        <span class="text-2xl font-black text-emerald-700 font-mono mt-1 block">{{ submittedCount }}</span>
        <span class="text-[11px] text-emerald-600 font-semibold">Telah disetorkan</span>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-blue-600">
        <span class="text-xs font-bold text-slate-500 uppercase tracking-wider block">Verified Live (Synced)</span>
        <span class="text-2xl font-black text-blue-700 font-mono mt-1 block">{{ liveInLedgerCount }}</span>
        <span class="text-[11px] text-blue-600 font-semibold">Status email aktif</span>
      </div>
    </div>

    <!-- Input Add Email to Ledger Section -->
    <div class="saas-card p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Tambah Catatan Email Baru (Unique List)
          </h3>
          <p class="text-xs text-slate-500">Masukkan daftar email (pisahkan per baris). Email duplikat akan otomatis dieliminasi.</p>
        </div>

        <span class="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold rounded-lg">
          Unique Key Engine
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-3">
          <textarea
            v-model="newEmailsText"
            rows="3"
            placeholder="Tambahkan email di sini...&#10;user1@gmail.com&#10;user2@gmail.com"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition resize-y"></textarea>
        </div>

        <div class="flex flex-col justify-between space-y-2">
          <div>
            <label class="block text-[11px] font-bold text-slate-600 uppercase mb-1">Status Setor Default:</label>
            <select
              v-model="defaultSetorStatus"
              class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500">
              <option value="belum_disetor">Belum Disetor</option>
              <option value="disetor">Sudah Disetor</option>
            </select>
          </div>

          <button
            @click="handleAddEmails"
            :disabled="!newEmailsText.trim()"
            class="w-full py-2.5 px-4 rounded-xl font-bold text-xs btn-primary cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            <span>Tambahkan Ke Ledger</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Ledger Table Container -->
    <div class="saas-card overflow-hidden">
      <!-- Table Filters & Batch Controls -->
      <div class="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/60">
        
        <!-- Filter Pills -->
        <div class="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 overflow-x-auto">
          <button
            v-for="tab in filterTabs"
            :key="tab.value"
            @click="activeFilter = tab.value"
            class="px-3 py-1 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap"
            :class="activeFilter === tab.value ? 'bg-blue-600 text-white font-bold' : 'text-slate-600 hover:text-slate-900'">
            {{ tab.label }} ({{ getFilterCount(tab.value) }})
          </button>
        </div>

        <!-- Search & Actions -->
        <div class="flex items-center gap-2 flex-wrap">
          <div class="relative flex-1 sm:w-44">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari email ledger..."
              class="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition" />
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>

          <button
            @click="setorSelectedEmails"
            :disabled="selectedEmails.length === 0"
            class="px-3 py-1.5 rounded-xl text-xs font-bold btn-emerald cursor-pointer disabled:opacity-40 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            <span>Setorkan Terpilih ({{ selectedEmails.length }})</span>
          </button>

          <button
            @click="$emit('checkSelectedLedger', selectedEmails)"
            :disabled="selectedEmails.length === 0"
            class="px-3 py-1.5 rounded-xl text-xs font-bold btn-primary cursor-pointer disabled:opacity-40">
            Cek Terpilih
          </button>

          <button
            @click="exportLedgerCsv"
            class="px-3 py-1.5 rounded-xl text-xs btn-secondary cursor-pointer">
            Ekspor CSV
          </button>

          <button
            @click="$emit('clearLedger')"
            :disabled="ledger.length === 0"
            class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-rose-600 border border-slate-200 hover:bg-rose-50 transition cursor-pointer disabled:opacity-40">
            Kosongkan
          </button>
        </div>
      </div>

      <!-- Table View -->
      <div v-if="filteredLedger.length > 0" class="overflow-x-auto">
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
              <th class="py-3 px-4">Email Address</th>
              <th class="py-3 px-4">Status Setor</th>
              <th class="py-3 px-4">Tgl Setor</th>
              <th class="py-3 px-4">Hasil Live Check</th>
              <th class="py-3 px-4 text-right">Aksi Setor & Live Check</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200/70 font-sans">
            <tr
              v-for="row in filteredLedger"
              :key="row.email"
              class="hover:bg-slate-50/80 transition"
              :class="selectedEmails.includes(row.email) ? 'bg-blue-50/40' : ''">
              
              <!-- Checkbox -->
              <td class="py-3.5 px-4">
                <input
                  type="checkbox"
                  :value="row.email"
                  v-model="selectedEmails"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              </td>

              <!-- Email Address -->
              <td class="py-3.5 px-4">
                <div class="font-semibold text-slate-900 font-mono">{{ row.email }}</div>
              </td>

              <!-- Status Setor Badge -->
              <td class="py-3.5 px-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border"
                  :class="row.setorStatus === 'disetor' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'">
                  <span class="w-1.5 h-1.5 rounded-full" :class="row.setorStatus === 'disetor' ? 'bg-emerald-500' : 'bg-amber-500'"></span>
                  <span>{{ row.setorStatus === 'disetor' ? 'Sudah Disetor' : 'Belum Disetor' }}</span>
                </span>
              </td>

              <!-- Tanggal Disetor -->
              <td class="py-3.5 px-4 font-mono text-slate-600">
                <div v-if="row.setorStatus === 'disetor' && row.tglSetor" class="flex items-center gap-1 text-emerald-700 font-semibold">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                  <span>{{ row.tglSetor }}</span>
                </div>
                <span v-else class="text-slate-400 font-medium">-</span>
              </td>

              <!-- Live Verification Status (Synced) -->
              <td class="py-3.5 px-4">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase" :class="getStatusBadgeClass(row.verifyStatus)">
                  <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotClass(row.verifyStatus)"></span>
                  {{ getVerifyStatusLabel(row.verifyStatus) }}
                </span>
              </td>

              <!-- Action Row: Setorkan Button + Cek Live + Delete -->
              <td class="py-3.5 px-4 text-right space-x-1.5">
                <!-- Aksi Setor Button -->
                <button
                  v-if="row.setorStatus !== 'disetor'"
                  @click="markAsSetor(row)"
                  class="px-3 py-1 rounded-lg text-xs btn-emerald cursor-pointer inline-flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Setorkan</span>
                </button>
                <button
                  v-else
                  @click="cancelSetor(row)"
                  class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer">
                  Batal Setor
                </button>

                <button
                  @click="$emit('verifySingleInLedger', row.email)"
                  class="px-2.5 py-1 rounded-lg text-xs btn-primary cursor-pointer">
                  Cek Live
                </button>
                
                <button
                  @click="deleteFromLedger(row.email)"
                  class="px-2 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 transition cursor-pointer">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty State -->
      <div v-else class="p-12 text-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
        </div>
        <h4 class="font-bold text-slate-800 text-sm">Catatan Email Ledger Masih Kosong</h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          Tambahkan email pada formulir di atas untuk mengelola catatan email disetor / belum disetor beserta tanggal setomya.
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  ledger: { type: Array, default: () => [] }
});

const emit = defineEmits([
  'addLedgerEmails',
  'updateLedgerRow',
  'deleteLedgerEmail',
  'checkSelectedLedger',
  'verifySingleInLedger',
  'clearLedger',
  'bulkSetor'
]);

const newEmailsText = ref('');
const defaultSetorStatus = ref('belum_disetor');
const activeFilter = ref('all');
const searchQuery = ref('');
const selectedEmails = ref([]);

const filterTabs = [
  { label: 'Semua Ledger', value: 'all' },
  { label: 'Belum Disetor', value: 'belum_disetor' },
  { label: 'Sudah Disetor', value: 'disetor' },
  { label: 'Live Verified', value: 'live' }
];

const pendingCount = computed(() => props.ledger.filter(l => l.setorStatus === 'belum_disetor').length);
const submittedCount = computed(() => props.ledger.filter(l => l.setorStatus === 'disetor').length);
const liveInLedgerCount = computed(() => props.ledger.filter(l => l.verifyStatus === 'live').length);

const filteredLedger = computed(() => {
  let list = props.ledger;
  if (activeFilter.value === 'belum_disetor') {
    list = list.filter(l => l.setorStatus === 'belum_disetor');
  } else if (activeFilter.value === 'disetor') {
    list = list.filter(l => l.setorStatus === 'disetor');
  } else if (activeFilter.value === 'live') {
    list = list.filter(l => l.verifyStatus === 'live');
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(l => l.email.toLowerCase().includes(q));
  }
  return list;
});

const isAllSelected = computed(() => {
  if (filteredLedger.value.length === 0) return false;
  return filteredLedger.value.every(row => selectedEmails.value.includes(row.email));
});

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedEmails.value = [];
  } else {
    selectedEmails.value = filteredLedger.value.map(row => row.email);
  }
}

function handleAddEmails() {
  if (!newEmailsText.value.trim()) return;
  emit('addLedgerEmails', newEmailsText.value, defaultSetorStatus.value);
  newEmailsText.value = '';
}

function markAsSetor(row) {
  const dateFormatted = getFormattedDate();
  emit('updateLedgerRow', {
    ...row,
    setorStatus: 'disetor',
    tglSetor: dateFormatted,
    updatedAt: dateFormatted
  });
}

function cancelSetor(row) {
  emit('updateLedgerRow', {
    ...row,
    setorStatus: 'belum_disetor',
    tglSetor: null,
    updatedAt: getFormattedDate()
  });
}

function setorSelectedEmails() {
  if (selectedEmails.value.length === 0) return;
  const dateFormatted = getFormattedDate();
  emit('bulkSetor', selectedEmails.value, dateFormatted);
}

function deleteFromLedger(email) {
  emit('deleteLedgerEmail', email);
  selectedEmails.value = selectedEmails.value.filter(e => e !== email);
}

function getFormattedDate() {
  const d = new Date();
  const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  return `${dateStr} ${timeStr}`;
}

function getFilterCount(val) {
  if (val === 'all') return props.ledger.length;
  if (val === 'belum_disetor') return pendingCount.value;
  if (val === 'disetor') return submittedCount.value;
  if (val === 'live') return liveInLedgerCount.value;
  return 0;
}

function getVerifyStatusLabel(status) {
  switch (status) {
    case 'live': return 'LIVE (ACTIVE)';
    case 'verify_phone': return 'VERIFY PHONE';
    case 'die': return 'DISABLED (DIE)';
    case 'not_exist': return 'UNREGISTERED';
    case 'unchecked': default: return 'BELUM DICEK';
  }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case 'live': return 'badge-valid';
    case 'verify_phone': return 'badge-risky';
    case 'die': return 'badge-invalid';
    case 'not_exist': return 'badge-unregistered';
    case 'unchecked': default: return 'bg-slate-100 text-slate-600 border border-slate-200';
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

function exportLedgerCsv() {
  if (props.ledger.length === 0) return;
  const headers = ['Email', 'Status Setor', 'Tgl Setor', 'Verify Status', 'Last Updated'];
  const rows = props.ledger.map(l => [
    `"${l.email}"`,
    `"${l.setorStatus === 'disetor' ? 'Sudah Disetor' : 'Belum Disetor'}"`,
    `"${l.tglSetor || '-'}"`,
    `"${l.verifyStatus || 'unchecked'}"`,
    `"${l.updatedAt || ''}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
  const link = document.createElement('a');
  link.setAttribute('href', encodeURI(csvContent));
  link.setAttribute('download', `catatan_email_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>
