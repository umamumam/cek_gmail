<template>
  <div class="space-y-6">
    <!-- Top Ledger Stats Summary -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <!-- 1. Total Ledger Card -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4 text-white shadow-md shadow-slate-950/20 hover:shadow-lg transition-all duration-200 group">
        <div class="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition"></div>
        <div class="flex items-center justify-between relative z-10">
          <span class="text-[10px] font-extrabold text-blue-200 uppercase tracking-wider block">Total Ledger</span>
          <span class="w-6 h-6 rounded-lg bg-white/10 backdrop-blur-md text-blue-300 flex items-center justify-center text-[10px] font-bold">#</span>
        </div>
        <div class="mt-2 relative z-10">
          <span class="text-xl font-black font-mono tracking-tight text-white block">{{ ledger.length }}</span>
          <span class="text-[9px] text-blue-200/80 font-medium mt-1 block">Database Email Unik</span>
        </div>
      </div>

      <!-- 2. NEW Card -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-500/10 via-white to-slate-500/5 p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between relative z-10">
          <span class="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider block">NEW (Kosong)</span>
          <span class="w-2 h-2 rounded-full bg-slate-400"></span>
        </div>
        <div class="mt-2 relative z-10">
          <span class="text-xl font-black text-slate-900 font-mono tracking-tight block">{{ newCount }}</span>
          <span class="text-[9px] text-slate-500 font-semibold mt-1 block">Belum Di-Set Status</span>
        </div>
      </div>

      <!-- 3. Siap Setor Card -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-white to-blue-500/5 p-4 border border-blue-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between relative z-10">
          <span class="text-[10px] font-extrabold text-blue-800 uppercase tracking-wider block">Siap Setor</span>
          <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        </div>
        <div class="mt-2 relative z-10">
          <span class="text-xl font-black text-slate-900 font-mono tracking-tight block">{{ siapSetorCount }}</span>
          <span class="text-[9px] text-blue-700 font-semibold mt-1 block">Siap Diproses</span>
        </div>
      </div>

      <!-- 4. Setor Tgl Card -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-white to-indigo-500/5 p-4 border border-indigo-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between relative z-10">
          <span class="text-[10px] font-extrabold text-indigo-800 uppercase tracking-wider block">Setor Tgl...</span>
          <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
        </div>
        <div class="mt-2 relative z-10">
          <span class="text-xl font-black text-slate-900 font-mono tracking-tight block">{{ setorTglCount }}</span>
          <span class="text-[9px] text-indigo-700 font-semibold mt-1 block">Jadwal Tanggal</span>
        </div>
      </div>

      <!-- 5. Sudah Setor Card -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white to-emerald-500/5 p-4 border border-emerald-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between relative z-10">
          <span class="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block">Sudah Setor</span>
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
        <div class="mt-2 relative z-10">
          <span class="text-xl font-black text-slate-900 font-mono tracking-tight block">{{ sudahSetorCount }}</span>
          <span class="text-[9px] text-emerald-700 font-semibold mt-1 block">Telah Disetorkan</span>
        </div>
      </div>

      <!-- 6. Akun Ortu Card -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-white to-purple-500/5 p-4 border border-purple-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between relative z-10">
          <span class="text-[10px] font-extrabold text-purple-800 uppercase tracking-wider block">Akun Ortu</span>
          <span class="w-2 h-2 rounded-full bg-purple-500"></span>
        </div>
        <div class="mt-2 relative z-10">
          <span class="text-xl font-black text-slate-900 font-mono tracking-tight block">{{ akunOrtuCount }}</span>
          <span class="text-[9px] text-purple-700 font-semibold mt-1 block">Kategori Akun Ortu</span>
        </div>
      </div>
    </div>

    <!-- Input Add Email to Ledger Section -->
    <div class="saas-card p-6 space-y-4">
      <div
        class="flex items-center justify-between border-b border-slate-200 pb-3">
        <div>
          <h3
            class="text-base font-bold text-slate-900 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-blue-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <path
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Tambah Catatan Email Baru & Keterangan
          </h3>
          <p class="text-xs text-slate-500">
            Masukkan daftar email (pisahkan per baris). Pilih status keterangan
            default di sebelah kanan.
          </p>
        </div>

        <span
          class="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold rounded-lg">
          Unique Key Engine
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="md:col-span-3">
          <textarea
            v-model="newEmailsText"
            rows="3"
            placeholder="Tambahkan email di sini (pisahkan per baris)...&#10;Bisa juga format email|password atau email:password"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition resize-y"></textarea>
        </div>

        <div class="flex flex-col justify-between space-y-2">
          <div class="space-y-2">
            <div>
              <label
                class="block text-[11px] font-bold text-slate-600 uppercase mb-1"
                >Keterangan Default:</label
              >
              <select
                v-model="defaultSetorStatus"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500">
                <option value="new">⚪ NEW</option>
                <option value="siap_setor">🔵 Siap Setor</option>
                <option value="setor_tgl">📅 Setor Tgl...</option>
                <option value="sudah_setor">✅ Sudah Setor</option>
                <option value="akun_ortu">👨‍👩‍👧 Akun Ortu</option>
              </select>
            </div>

            <div>
              <label
                class="block text-[11px] font-bold text-slate-600 uppercase mb-1"
                >Password Keseluruhan (Opsional):</label
              >
              <input
                v-model="defaultPassword"
                type="text"
                placeholder="Password seragam..."
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-blue-500" />
            </div>

            <!-- Date picker input if Setor Tgl selected -->
            <div v-if="defaultSetorStatus === 'setor_tgl'">
              <label
                class="block text-[10px] font-bold text-indigo-600 uppercase mb-1"
                >Pilih Tanggal:</label
              >
              <input
                v-model="customInputDate"
                type="date"
                class="w-full bg-white border border-indigo-200 rounded-xl px-2.5 py-1 text-xs text-indigo-900 font-semibold focus:outline-none focus:border-indigo-500" />
            </div>
          </div>

          <button
            @click="handleAddEmails"
            :disabled="!newEmailsText.trim()"
            class="w-full py-2.5 px-4 rounded-xl font-bold text-xs btn-primary cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Simpan Ke Ledger</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Ledger Table Container -->
    <div class="saas-card overflow-hidden">
      <!-- Table Filters & Batch Controls -->
      <div
        class="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/60">
        <!-- Streamlined Dropdown Filter -->
        <div class="flex items-center gap-2">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Filter:</span>
          <select
            v-model="activeFilter"
            class="bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs cursor-pointer">
            <option value="new">⚪ NEW ({{ newCount }})</option>
            <option value="all">📂 Semua Ledger ({{ props.ledger.length }})</option>
            <option value="siap_setor">🔵 Siap Setor ({{ siapSetorCount }})</option>
            <option value="setor_tgl">📅 Setor Tgl ({{ setorTglCount }})</option>
            <option value="sudah_setor">✅ Sudah Setor ({{ sudahSetorCount }})</option>
            <option value="akun_ortu">👨‍👩‍👧 Akun Ortu ({{ akunOrtuCount }})</option>
            <option value="live">🟢 Live Verified ({{ liveInLedgerCount }})</option>
          </select>
        </div>

        <!-- Search & Compact Actions -->
        <div class="flex items-center gap-2 flex-wrap">
          <div class="relative flex-1 sm:w-44">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari email..."
              class="w-full bg-white border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition" />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>

          <!-- Bulk Keterangan Selector -->
          <select
            @change="
              handleBatchKeterangan($event.target.value);
              $event.target.value = '';
            "
            :disabled="selectedEmails.length === 0"
            class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:opacity-40 focus:outline-none">
            <option value="" disabled selected>
              Ubah Status ({{ selectedEmails.length }}) ▼
            </option>
            <option value="new">⚪ Set NEW</option>
            <option value="siap_setor">🔵 Set Siap Setor</option>
            <option value="setor_tgl">📅 Set Setor Tgl...</option>
            <option value="sudah_setor">✅ Set Sudah Setor</option>
            <option value="akun_ortu">👨‍👩‍👧 Set Akun Ortu</option>
          </select>

          <button
            @click="$emit('checkSelectedLedger', selectedEmails)"
            :disabled="selectedEmails.length === 0"
            class="px-3 py-1.5 rounded-xl text-xs font-bold btn-primary cursor-pointer disabled:opacity-40">
            Cek ({{ selectedEmails.length }})
          </button>

          <button
            @click="exportLedgerExcel"
            class="px-3 py-1.5 rounded-xl text-xs btn-secondary cursor-pointer flex items-center gap-1">
            <span>Ekspor .xlsx</span>
          </button>

          <button
            @click="$emit('clearLedger')"
            :disabled="ledger.length === 0"
            class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white text-rose-600 border border-slate-200 hover:bg-rose-50 transition cursor-pointer disabled:opacity-40">
            Kosongkan
          </button>
        </div>
      </div>

      <!-- Table View -->
      <div v-if="filteredLedger.length > 0" class="overflow-x-auto">
        <table class="w-full text-left text-xs">
          <thead
            class="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
            <tr>
              <th class="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                  class="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
              </th>
              <th class="py-3 px-4">Email Address</th>
              <th class="py-3 px-4 w-36">
                <div class="flex items-center gap-1">
                  <span>Password</span>
                  <button
                    @click="toggleShowAllPasswords"
                    type="button"
                    title="Intip / Sembunyikan Semua Password"
                    class="text-xs text-slate-400 hover:text-blue-600 cursor-pointer ml-1">
                    {{ showAllPasswords ? '👁️' : '🙈' }}
                  </button>
                </div>
              </th>
              <th class="py-3 px-4">Keterangan / Status</th>
              <th class="py-3 px-4">Tanggal Setor</th>
              <th class="py-3 px-4">Hasil Live Check</th>
              <th class="py-3 px-4 text-right">Aksi & Live Check</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-200/70 font-sans">
            <tr
              v-for="row in filteredLedger"
              :key="row.email"
              class="hover:bg-slate-50/80 transition"
              :class="
                selectedEmails.includes(row.email) ? 'bg-blue-50/40' : ''
              ">
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
                <div class="font-semibold text-slate-900 font-mono">
                  {{ row.email }}
                </div>
              </td>

              <!-- Compact Password Column (Narrow & Clean) -->
              <td class="py-3.5 px-4 font-mono">
                <div v-if="row.password" class="flex items-center gap-1.5 max-w-[130px]">
                  <span class="text-xs font-semibold text-slate-800 truncate font-mono select-all">
                    {{ isPasswordVisible(row.email) ? row.password : '••••••••' }}
                  </span>
                  <button
                    @click="toggleShowPassword(row.email)"
                    type="button"
                    class="text-slate-400 hover:text-blue-600 text-xs p-0.5 cursor-pointer flex-shrink-0"
                    title="Intip Password">
                    {{ isPasswordVisible(row.email) ? '👁️' : '🙈' }}
                  </button>
                  <button
                    @click="copyPasswordText(row.password)"
                    type="button"
                    class="text-slate-400 hover:text-emerald-600 text-xs p-0.5 cursor-pointer flex-shrink-0"
                    title="Salin Password">
                    📋
                  </button>
                </div>
                <button
                  v-else
                  @click="promptAddPassword(row)"
                  class="text-[11px] text-slate-400 hover:text-blue-600 font-semibold cursor-pointer">
                  + Password
                </button>
              </td>

              <!-- Keterangan Status Dropdown Selector -->
              <td class="py-3.5 px-4">
                <div class="flex items-center gap-1.5">
                  <select
                    :value="getCleanStatusKey(row.setorStatus)"
                    @change="handleRowStatusChange(row, $event.target.value)"
                    class="px-2.5 py-1 rounded-full text-xs font-bold border cursor-pointer focus:outline-none transition"
                    :class="getKeteranganBadgeClass(row.setorStatus)">
                    <option value="new" class="bg-white text-slate-800">
                      ⚪ NEW
                    </option>
                    <option value="siap_setor" class="bg-white text-slate-800">
                      🔵 Siap Setor
                    </option>
                    <option value="setor_tgl" class="bg-white text-slate-800">
                      📅 Setor Tgl...
                    </option>
                    <option value="sudah_setor" class="bg-white text-slate-800">
                      ✅ Sudah Setor
                    </option>
                    <option value="akun_ortu" class="bg-white text-slate-800">
                      👨‍👩‍👧 Akun Ortu
                    </option>
                  </select>
                </div>
              </td>

              <!-- Tanggal Disetor / Custom Date Input -->
              <td class="py-3.5 px-4 font-mono text-slate-600">
                <div
                  v-if="row.setorStatus === 'setor_tgl'"
                  class="flex items-center gap-1">
                  <input
                    type="date"
                    :value="formatInputDate(row.tglSetor)"
                    @change="handleRowDateChange(row, $event.target.value)"
                    class="bg-indigo-50/60 border border-indigo-200 rounded-lg px-2 py-0.5 text-xs text-indigo-900 font-semibold focus:outline-none focus:bg-white focus:border-indigo-500" />
                </div>
                <div
                  v-else-if="
                    (row.setorStatus === 'disetor' ||
                      row.setorStatus === 'sudah_setor') &&
                    row.tglSetor
                  "
                  class="flex items-center gap-1 text-emerald-700 font-semibold">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-3.5 h-3.5 text-emerald-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  <span>{{ row.tglSetor }}</span>
                </div>
                <span v-else class="text-slate-400 font-medium">-</span>
              </td>

              <!-- Live Verification Status (Synced) -->
              <td class="py-3.5 px-4">
                <span
                  class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase"
                  :class="getStatusBadgeClass(row.verifyStatus)">
                  <span
                    class="w-1.5 h-1.5 rounded-full"
                    :class="getStatusDotClass(row.verifyStatus)"></span>
                  {{ getVerifyStatusLabel(row.verifyStatus) }}
                </span>
              </td>

              <!-- Action Row: Cek Live + Delete -->
              <td class="py-3.5 px-4 text-right space-x-1.5">
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
        <div
          class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h4 class="font-bold text-slate-800 text-sm">
          Catatan Email Ledger Masih Kosong
        </h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          Tambahkan email pada formulir di atas untuk mengelola catatan email
          disetor / belum disetor beserta tanggal setomya.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import * as XLSX from "xlsx";

const props = defineProps({
  ledger: { type: Array, default: () => [] },
});

const emit = defineEmits([
  "addLedgerEmails",
  "updateLedgerRow",
  "deleteLedgerEmail",
  "checkSelectedLedger",
  "verifySingleInLedger",
  "clearLedger",
  "bulkSetor",
]);

const newEmailsText = ref("");
const defaultSetorStatus = ref("new");
const defaultPassword = ref("");
const customInputDate = ref(new Date().toISOString().slice(0, 10));
const activeFilter = ref("new");
const searchQuery = ref("");
const selectedEmails = ref([]);
const showAllPasswords = ref(false);
const visiblePassMap = ref({});

const filterTabs = [
  { label: "NEW", value: "new" },
  { label: "Semua Ledger", value: "all" },
  { label: "Siap Setor", value: "siap_setor" },
  { label: "Setor Tgl", value: "setor_tgl" },
  { label: "Sudah Setor", value: "sudah_setor" },
  { label: "Akun Ortu", value: "akun_ortu" },
  { label: "Live Verified", value: "live" },
];

const newCount = computed(
  () =>
    props.ledger.filter(
      (l) =>
        l.setorStatus === "new" ||
        l.setorStatus === "belum_disetor" ||
        !l.setorStatus,
    ).length,
);
const siapSetorCount = computed(
  () => props.ledger.filter((l) => l.setorStatus === "siap_setor").length,
);
const setorTglCount = computed(
  () => props.ledger.filter((l) => l.setorStatus === "setor_tgl").length,
);
const sudahSetorCount = computed(
  () =>
    props.ledger.filter(
      (l) => l.setorStatus === "sudah_setor" || l.setorStatus === "disetor",
    ).length,
);
const akunOrtuCount = computed(
  () => props.ledger.filter((l) => l.setorStatus === "akun_ortu").length,
);
const liveInLedgerCount = computed(
  () => props.ledger.filter((l) => l.verifyStatus === "live").length,
);

const filteredLedger = computed(() => {
  let list = props.ledger;
  if (activeFilter.value === "new") {
    list = list.filter(
      (l) =>
        l.setorStatus === "new" ||
        l.setorStatus === "belum_disetor" ||
        !l.setorStatus,
    );
  } else if (activeFilter.value === "siap_setor") {
    list = list.filter((l) => l.setorStatus === "siap_setor");
  } else if (activeFilter.value === "setor_tgl") {
    list = list.filter((l) => l.setorStatus === "setor_tgl");
  } else if (activeFilter.value === "sudah_setor") {
    list = list.filter(
      (l) => l.setorStatus === "sudah_setor" || l.setorStatus === "disetor",
    );
  } else if (activeFilter.value === "akun_ortu") {
    list = list.filter((l) => l.setorStatus === "akun_ortu");
  } else if (activeFilter.value === "live") {
    list = list.filter((l) => l.verifyStatus === "live");
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter((l) => l.email.toLowerCase().includes(q));
  }
  return list;
});

const isAllSelected = computed(() => {
  if (filteredLedger.value.length === 0) return false;
  return filteredLedger.value.every((row) =>
    selectedEmails.value.includes(row.email),
  );
});

function toggleSelectAll() {
  if (isAllSelected.value) {
    selectedEmails.value = [];
  } else {
    selectedEmails.value = filteredLedger.value.map((row) => row.email);
  }
}

function handleAddEmails() {
  if (!newEmailsText.value.trim()) return;
  const formattedDate =
    defaultSetorStatus.value === "setor_tgl"
      ? formatDateDisplay(customInputDate.value)
      : null;
  emit(
    "addLedgerEmails",
    newEmailsText.value,
    defaultSetorStatus.value,
    formattedDate,
    defaultPassword.value.trim()
  );
  newEmailsText.value = "";
  defaultPassword.value = "";
}

function handleBatchKeterangan(newStatus) {
  if (selectedEmails.value.length === 0 || !newStatus) return;

  let targetDate = null;
  if (newStatus === "setor_tgl") {
    const userPicker = prompt(
      "Masukkan tanggal setor (format YYYY-MM-DD atau bebas):",
      new Date().toISOString().slice(0, 10),
    );
    if (!userPicker) return;
    targetDate = formatDateDisplay(userPicker);
  } else if (newStatus === "sudah_setor") {
    targetDate = getFormattedDate();
  }

  selectedEmails.value.forEach((emailStr) => {
    const row = props.ledger.find((l) => l.email === emailStr);
    if (row) {
      emit("updateLedgerRow", {
        ...row,
        setorStatus: newStatus,
        tglSetor: targetDate || row.tglSetor,
        updatedAt: getFormattedDate(),
      });
    }
  });
}

function handleRowStatusChange(row, newStatus) {
  let targetDate = row.tglSetor;
  const nowFormatted = getFormattedDate();

  if (newStatus === "setor_tgl") {
    targetDate =
      targetDate || formatDateDisplay(new Date().toISOString().slice(0, 10));
  } else if (newStatus === "sudah_setor") {
    targetDate = nowFormatted;
  } else if (
    newStatus === "new" ||
    newStatus === "siap_setor" ||
    newStatus === "akun_ortu"
  ) {
    targetDate = null;
  }

  emit("updateLedgerRow", {
    ...row,
    setorStatus: newStatus,
    tglSetor: targetDate,
    updatedAt: nowFormatted,
  });
}

function handleRowDateChange(row, dateVal) {
  if (!dateVal) return;
  const formatted = formatDateDisplay(dateVal);
  emit("updateLedgerRow", {
    ...row,
    tglSetor: formatted,
    updatedAt: getFormattedDate(),
  });
}

function promptAddPassword(row) {
  const input = prompt(`Masukkan password untuk ${row.email}:`, row.password || "");
  if (input !== null) {
    handleRowPasswordChange(row, input);
  }
}

function handleRowPasswordChange(row, newPassword) {
  emit("updateLedgerRow", {
    ...row,
    password: newPassword.trim(),
    updatedAt: getFormattedDate(),
  });
}

function isPasswordVisible(email) {
  return showAllPasswords.value || !!visiblePassMap.value[email];
}

function toggleShowPassword(email) {
  visiblePassMap.value[email] = !visiblePassMap.value[email];
}

function toggleShowAllPasswords() {
  showAllPasswords.value = !showAllPasswords.value;
}

function copyPasswordText(pass) {
  if (!pass) return;
  navigator.clipboard.writeText(pass);
  alert('Password berhasil disalin!');
}

function deleteFromLedger(email) {
  emit("deleteLedgerEmail", email);
  selectedEmails.value = selectedEmails.value.filter((e) => e !== email);
}

function getFormattedDate() {
  const d = new Date();
  const dateStr = d.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const timeStr = d.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dateStr} ${timeStr}`;
}

function formatDateDisplay(dateInputStr) {
  if (!dateInputStr) return getFormattedDate();
  try {
    const [y, m, d] = dateInputStr.split("-");
    if (y && m && d) {
      return `${d}/${m}/${y}`;
    }
    return dateInputStr;
  } catch (e) {
    return dateInputStr;
  }
}

function formatInputDate(dateDisplayStr) {
  if (!dateDisplayStr) return new Date().toISOString().slice(0, 10);
  try {
    const parts = dateDisplayStr.split(" ")[0].split("/");
    if (parts.length === 3) {
      const [d, m, y] = parts;
      return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    }
  } catch (e) {
    // fallback
  }
  return new Date().toISOString().slice(0, 10);
}

function getFilterCount(val) {
  if (val === "all") return props.ledger.length;
  if (val === "new") return newCount.value;
  if (val === "siap_setor") return siapSetorCount.value;
  if (val === "setor_tgl") return setorTglCount.value;
  if (val === "sudah_setor") return sudahSetorCount.value;
  if (val === "akun_ortu") return akunOrtuCount.value;
  if (val === "live") return liveInLedgerCount.value;
  return 0;
}

function getCleanStatusKey(status) {
  if (!status || status === "new") return "new";
  if (status === "belum_disetor") return "new"; // default legacy empty to new
  return status;
}

function getKeteranganBadgeClass(status) {
  switch (status) {
    case "siap_setor":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "setor_tgl":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "sudah_setor":
    case "disetor":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "akun_ortu":
      return "bg-purple-50 text-purple-700 border-purple-200";
    case "new":
    case "belum_disetor":
    default:
      return "bg-slate-100 text-slate-700 border-slate-300";
  }
}

function getKeteranganLabel(statusKey) {
  switch (statusKey) {
    case "siap_setor":
      return "Siap Setor";
    case "setor_tgl":
      return "Setor Tgl";
    case "sudah_setor":
    case "disetor":
      return "Sudah Setor";
    case "akun_ortu":
      return "Akun Ortu";
    case "new":
    case "belum_disetor":
    default:
      return "NEW";
  }
}

function getVerifyStatusLabel(status) {
  switch (status) {
    case "live":
      return "LIVE (ACTIVE)";
    case "verify_phone":
      return "VERIFY PHONE";
    case "die":
      return "DISABLED (DIE)";
    case "not_exist":
      return "UNREGISTERED";
    case "unchecked":
    default:
      return "BELUM DICEK";
  }
}

function getStatusBadgeClass(status) {
  switch (status) {
    case "live":
      return "badge-valid";
    case "verify_phone":
      return "badge-risky";
    case "die":
      return "badge-invalid";
    case "not_exist":
      return "badge-unregistered";
    case "unchecked":
    default:
      return "bg-slate-100 text-slate-600 border border-slate-200";
  }
}

function getStatusDotClass(status) {
  switch (status) {
    case "live":
      return "bg-emerald-500";
    case "verify_phone":
      return "bg-amber-500";
    case "die":
      return "bg-rose-500";
    default:
      return "bg-slate-400";
  }
}

function exportLedgerExcel() {
  if (props.ledger.length === 0) return;

  const data = props.ledger.map((l, idx) => ({
    No: idx + 1,
    Email: l.email,
    Password: l.password || "-",
    "Keterangan / Status": getKeteranganLabel(l.setorStatus),
    "Tanggal Setor": l.tglSetor || "-",
    "Hasil Live Check": getVerifyStatusLabel(l.verifyStatus),
    "Terakhir Diperbarui": l.updatedAt || "-",
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  // Set column widths for optimal view in Excel
  worksheet["!cols"] = [
    { wch: 6 },
    { wch: 32 },
    { wch: 20 },
    { wch: 18 },
    { wch: 20 },
    { wch: 22 },
    { wch: 22 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Catatan Email");

  const fileName = `catatan_email_ledger_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
</script>
