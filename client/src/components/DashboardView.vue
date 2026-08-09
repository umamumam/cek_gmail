<template>
  <div class="space-y-6">
    
    <!-- Top Summary Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="saas-card p-5 border-l-4 border-l-blue-600">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Riwayat Cek</span>
          <span class="p-2 rounded-xl bg-blue-50 text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          </span>
        </div>
        <span class="text-3xl font-black text-slate-900 font-mono mt-2 block">{{ totalHistory }}</span>
        <div class="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600">
          <span>Live Rate: {{ liveRate }}%</span>
        </div>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-emerald-500">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Live (Aktif)</span>
          <span class="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
          </span>
        </div>
        <span class="text-3xl font-black text-emerald-700 font-mono mt-2 block">{{ liveCount }}</span>
        <span class="text-[11px] text-slate-400 mt-2 block">Terverifikasi aktif & valid</span>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-purple-500">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Ledger Email</span>
          <span class="p-2 rounded-xl bg-purple-50 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </span>
        </div>
        <span class="text-3xl font-black text-purple-700 font-mono mt-2 block">{{ totalLedger }}</span>
        <span class="text-[11px] text-purple-600 font-semibold mt-2 block">{{ newLedgerCount }} email status NEW</span>
      </div>

      <div class="saas-card p-5 border-l-4 border-l-amber-500">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Top Up Nokos</span>
          <span class="p-2 rounded-xl bg-amber-50 text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </span>
        </div>
        <span class="text-2xl font-black text-amber-800 font-mono mt-2 block">{{ formatRupiah(totalNokosAmount) }}</span>
        <span class="text-[11px] text-amber-700 font-semibold mt-2 block">{{ nokosList.length }}x transaksi top up</span>
      </div>
    </div>

    <!-- Interactive Monitoring Analytics Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Chart 1: Hasil Live Check Breakdown -->
      <div class="saas-card p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>
            Monitoring Verifikasi Health Email
          </h3>
          <span class="text-xs font-mono font-bold text-slate-500">{{ totalHistory }} Total Sample</span>
        </div>

        <div v-if="totalHistory > 0" class="space-y-4">
          <!-- Visual Stacked Bar Chart -->
          <div class="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex p-1 gap-1">
            <div
              v-if="liveCount > 0"
              :style="{ width: `${(liveCount / totalHistory) * 100}%` }"
              title="Live Active"
              class="bg-emerald-500 h-full rounded-full transition-all duration-500"></div>
            <div
              v-if="verifyPhoneCount > 0"
              :style="{ width: `${(verifyPhoneCount / totalHistory) * 100}%` }"
              title="Verify Phone (2FA)"
              class="bg-amber-500 h-full rounded-full transition-all duration-500"></div>
            <div
              v-if="dieCount > 0"
              :style="{ width: `${(dieCount / totalHistory) * 100}%` }"
              title="Disabled (Die)"
              class="bg-rose-500 h-full rounded-full transition-all duration-500"></div>
            <div
              v-if="unregisteredCount > 0"
              :style="{ width: `${(unregisteredCount / totalHistory) * 100}%` }"
              title="Unregistered"
              class="bg-slate-400 h-full rounded-full transition-all duration-500"></div>
          </div>

          <!-- Legend Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-3">
              <span class="text-[10px] font-bold text-emerald-700 uppercase">Live (Aktif)</span>
              <div class="text-xl font-black text-emerald-800 font-mono mt-0.5">{{ liveCount }}</div>
              <span class="text-[10px] text-emerald-600 font-semibold">{{ getPercent(liveCount, totalHistory) }}%</span>
            </div>

            <div class="bg-amber-50 border border-amber-200 rounded-xl p-3">
              <span class="text-[10px] font-bold text-amber-700 uppercase">Verify Phone</span>
              <div class="text-xl font-black text-amber-800 font-mono mt-0.5">{{ verifyPhoneCount }}</div>
              <span class="text-[10px] text-amber-600 font-semibold">{{ getPercent(verifyPhoneCount, totalHistory) }}%</span>
            </div>

            <div class="bg-rose-50 border border-rose-200 rounded-xl p-3">
              <span class="text-[10px] font-bold text-rose-700 uppercase">Disabled (Die)</span>
              <div class="text-xl font-black text-rose-800 font-mono mt-0.5">{{ dieCount }}</div>
              <span class="text-[10px] text-rose-600 font-semibold">{{ getPercent(dieCount, totalHistory) }}%</span>
            </div>

            <div class="bg-slate-100 border border-slate-200 rounded-xl p-3">
              <span class="text-[10px] font-bold text-slate-600 uppercase">Unregistered</span>
              <div class="text-xl font-black text-slate-800 font-mono mt-0.5">{{ unregisteredCount }}</div>
              <span class="text-[10px] text-slate-500 font-semibold">{{ getPercent(unregisteredCount, totalHistory) }}%</span>
            </div>
          </div>
        </div>

        <div v-else class="py-8 text-center text-xs text-slate-400">
          Belum ada data pengujian email. Lakukan pengujian email di tab Cek Email.
        </div>
      </div>

      <!-- Chart 2: Status Catatan Email Breakdown -->
      <div class="saas-card p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>
            Monitoring Status Ledger Catatan
          </h3>
          <span class="text-xs font-mono font-bold text-purple-700">{{ totalLedger }} Email Ledger</span>
        </div>

        <div v-if="totalLedger > 0" class="space-y-3">
          <!-- Horizontal Progress Item: NEW -->
          <div class="space-y-1">
            <div class="flex justify-between text-xs font-semibold">
              <span class="text-slate-700 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-slate-400"></span> ⚪ NEW (Kosong)
              </span>
              <span class="font-mono text-slate-900">{{ newLedgerCount }} ({{ getPercent(newLedgerCount, totalLedger) }}%)</span>
            </div>
            <div class="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
              <div :style="{ width: `${(newLedgerCount / totalLedger) * 100}%` }" class="bg-slate-400 h-full rounded-full"></div>
            </div>
          </div>

          <!-- Horizontal Progress Item: Siap Setor -->
          <div class="space-y-1">
            <div class="flex justify-between text-xs font-semibold">
              <span class="text-blue-700 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-blue-500"></span> 🔵 Siap Setor
              </span>
              <span class="font-mono text-blue-900">{{ siapSetorCount }} ({{ getPercent(siapSetorCount, totalLedger) }}%)</span>
            </div>
            <div class="h-2 w-full bg-blue-100 rounded-full overflow-hidden">
              <div :style="{ width: `${(siapSetorCount / totalLedger) * 100}%` }" class="bg-blue-500 h-full rounded-full"></div>
            </div>
          </div>

          <!-- Horizontal Progress Item: Setor Tgl -->
          <div class="space-y-1">
            <div class="flex justify-between text-xs font-semibold">
              <span class="text-indigo-700 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-indigo-500"></span> 📅 Setor Tgl...
              </span>
              <span class="font-mono text-indigo-900">{{ setorTglCount }} ({{ getPercent(setorTglCount, totalLedger) }}%)</span>
            </div>
            <div class="h-2 w-full bg-indigo-100 rounded-full overflow-hidden">
              <div :style="{ width: `${(setorTglCount / totalLedger) * 100}%` }" class="bg-indigo-500 h-full rounded-full"></div>
            </div>
          </div>

          <!-- Horizontal Progress Item: Sudah Setor -->
          <div class="space-y-1">
            <div class="flex justify-between text-xs font-semibold">
              <span class="text-emerald-700 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-emerald-500"></span> ✅ Sudah Setor
              </span>
              <span class="font-mono text-emerald-900">{{ sudahSetorCount }} ({{ getPercent(sudahSetorCount, totalLedger) }}%)</span>
            </div>
            <div class="h-2 w-full bg-emerald-100 rounded-full overflow-hidden">
              <div :style="{ width: `${(sudahSetorCount / totalLedger) * 100}%` }" class="bg-emerald-500 h-full rounded-full"></div>
            </div>
          </div>

          <!-- Horizontal Progress Item: Akun Ortu -->
          <div class="space-y-1">
            <div class="flex justify-between text-xs font-semibold">
              <span class="text-purple-700 flex items-center gap-1.5">
                <span class="w-2 h-2 rounded-full bg-purple-500"></span> 👨‍👩‍👧 Akun Ortu
              </span>
              <span class="font-mono text-purple-900">{{ akunOrtuCount }} ({{ getPercent(akunOrtuCount, totalLedger) }}%)</span>
            </div>
            <div class="h-2 w-full bg-purple-100 rounded-full overflow-hidden">
              <div :style="{ width: `${(akunOrtuCount / totalLedger) * 100}%` }" class="bg-purple-500 h-full rounded-full"></div>
            </div>
          </div>
        </div>

        <div v-else class="py-8 text-center text-xs text-slate-400">
          Belum ada catatan email di Ledger. Tambahkan catatan di tab Catatan Email.
        </div>
      </div>
    </div>

    <!-- Catatan Top Up Nokos (Nomor Kosong) Section -->
    <div class="saas-card p-6 space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h3 class="text-base font-bold text-slate-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Catatan Top Up Nokos (Nomor Kosong SMS OTP)
          </h3>
          <p class="text-xs text-slate-500">Pantau pengeluaran dan saldo top up layanan nomor kosong SMS OTP verifikasi.</p>
        </div>

        <button
          @click="showAddModal = true"
          class="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-md shadow-amber-500/20 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          <span>+ Catat Top Up Nokos</span>
        </button>
      </div>

      <!-- Nokos History Table -->
      <div v-if="nokosList.length > 0" class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead class="bg-amber-50/70 text-amber-900 font-mono uppercase tracking-wider border-b border-amber-200">
            <tr>
              <th class="py-3 px-4 w-12">No</th>
              <th class="py-3 px-4">Tanggal Top Up</th>
              <th class="py-3 px-4">Layanan / Provider</th>
              <th class="py-3 px-4">Nominal (Rp)</th>
              <th class="py-3 px-4">Catatan Keterangan</th>
              <th class="py-3 px-4 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200/70 font-sans">
            <tr v-for="(item, idx) in nokosList" :key="item.id || idx" class="hover:bg-slate-50/80 transition">
              <td class="py-3 px-4 font-mono text-slate-400">{{ idx + 1 }}</td>
              <td class="py-3 px-4 font-mono font-semibold text-slate-800">{{ item.tanggal }}</td>
              <td class="py-3 px-4">
                <span class="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 inline-block">
                  {{ item.provider }}
                </span>
              </td>
              <td class="py-3 px-4 font-mono font-extrabold text-emerald-700 text-sm">
                {{ formatRupiah(item.nominal) }}
              </td>
              <td class="py-3 px-4 text-slate-600 font-medium">
                {{ item.catatan || '-' }}
              </td>
              <td class="py-3 px-4 text-right">
                <button
                  @click="$emit('deleteNokos', item.id)"
                  class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-rose-600 hover:bg-rose-50 transition cursor-pointer">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-2">
        <div class="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
        </div>
        <h4 class="font-bold text-slate-800 text-xs">Belum Ada Transaksi Top Up Nokos</h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          Klik tombol <strong>+ Catat Top Up Nokos</strong> untuk menyimpan catatan saldo dan pengeluaran nomor kosong Anda.
        </p>
      </div>
    </div>

    <!-- Modal Form Tambah Catatan Top Up Nokos -->
    <Teleport to="body">
      <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div @click="showAddModal = false" class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"></div>

        <!-- Dialog Box -->
        <div class="relative bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4 z-50">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Tambah Catatan Top Up Nokos
            </h3>
            <button @click="showAddModal = false" class="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Top Up:</label>
              <input
                v-model="formTanggal"
                type="date"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Provider / Layanan Nokos:</label>
              <input
                v-model="formProvider"
                type="text"
                placeholder="Contoh: VIOTP / SMS-Activate / HeroSMS / IndoSMS"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Nominal Top Up (Rp):</label>
              <input
                v-model.number="formNominal"
                type="number"
                placeholder="Contoh: 50000"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Catatan Keterangan (Opsional):</label>
              <input
                v-model="formCatatan"
                type="text"
                placeholder="Catatan tambahan (misal: isi 100 saldo ID)"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button
              @click="showAddModal = false"
              class="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition cursor-pointer">
              Batal
            </button>
            <button
              @click="submitNokos"
              :disabled="!formNominal || !formProvider"
              class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white shadow-md shadow-amber-500/20 transition cursor-pointer disabled:opacity-50">
              Simpan Transaksi
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  checkHistory: { type: Array, default: () => [] },
  ledger: { type: Array, default: () => [] },
  nokosList: { type: Array, default: () => [] }
});

const emit = defineEmits(['addNokos', 'deleteNokos']);

const showAddModal = ref(false);
const formTanggal = ref(new Date().toISOString().slice(0, 10));
const formProvider = ref('');
const formNominal = ref(null);
const formCatatan = ref('');

const totalHistory = computed(() => props.checkHistory.length);
const liveCount = computed(() => props.checkHistory.filter(h => h.checkmailStatus === 'live').length);
const verifyPhoneCount = computed(() => props.checkHistory.filter(h => h.checkmailStatus === 'verify_phone').length);
const dieCount = computed(() => props.checkHistory.filter(h => h.checkmailStatus === 'die').length);
const unregisteredCount = computed(() => props.checkHistory.filter(h => h.checkmailStatus === 'not_exist').length);

const liveRate = computed(() => {
  if (totalHistory.value === 0) return 0;
  return Math.round((liveCount.value / totalHistory.value) * 100);
});

const totalLedger = computed(() => props.ledger.length);
const newLedgerCount = computed(() => props.ledger.filter(l => l.setorStatus === 'new' || !l.setorStatus).length);
const siapSetorCount = computed(() => props.ledger.filter(l => l.setorStatus === 'siap_setor').length);
const setorTglCount = computed(() => props.ledger.filter(l => l.setorStatus === 'setor_tgl').length);
const sudahSetorCount = computed(() => props.ledger.filter(l => l.setorStatus === 'sudah_setor' || l.setorStatus === 'disetor').length);
const akunOrtuCount = computed(() => props.ledger.filter(l => l.setorStatus === 'akun_ortu').length);

const totalNokosAmount = computed(() => props.nokosList.reduce((acc, curr) => acc + (Number(curr.nominal) || 0), 0));

function getPercent(val, total) {
  if (!total || total === 0) return 0;
  return Math.round((val / total) * 100);
}

function formatRupiah(amount) {
  if (!amount) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
}

function submitNokos() {
  if (!formNominal.value || !formProvider.value) return;
  emit('addNokos', {
    id: Date.now() + Math.random(),
    tanggal: formTanggal.value,
    provider: formProvider.value.trim(),
    nominal: Number(formNominal.value),
    catatan: formCatatan.value.trim()
  });
  
  formProvider.value = '';
  formNominal.value = null;
  formCatatan.value = '';
  showAddModal.value = false;
}
</script>
