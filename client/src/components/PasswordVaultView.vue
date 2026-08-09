<template>
  <div class="space-y-6">
    <!-- Header Title Section -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <div class="flex items-center gap-2">
          <div class="p-2 rounded-xl bg-amber-50 text-amber-600 border border-amber-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.778-7.778zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-extrabold text-slate-900 tracking-tight">Daftar Password & Vault Akun</h2>
            <p class="text-xs text-slate-500 font-medium">Kelola kredensial email & password Anda dalam bentuk kartu interaktif.</p>
          </div>
        </div>
      </div>

      <!-- Quick Action Buttons -->
      <div class="flex items-center gap-2">
        <button
          @click="toggleShowAllPasswords"
          class="px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 transition cursor-pointer shadow-2xs flex items-center gap-1.5">
          <span>{{ showAllPasswords ? '🙈 Sembunyikan Semua' : '👁️ Intip Semua Password' }}</span>
        </button>
      </div>
    </div>

    <!-- Summary Metrics Grid Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="saas-card p-4 flex items-center justify-between bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div>
          <p class="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Total Akun Vault</p>
          <h3 class="text-2xl font-black text-white mt-1 font-mono">{{ totalAccountsCount }}</h3>
        </div>
        <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
          🔑
        </div>
      </div>

      <div class="saas-card p-4 flex items-center justify-between bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div>
          <p class="text-[11px] font-bold text-blue-100 uppercase tracking-wider">Memiliki Password</p>
          <h3 class="text-2xl font-black text-white mt-1 font-mono">{{ hasPasswordCount }}</h3>
        </div>
        <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-200">
          🔒
        </div>
      </div>

      <div class="saas-card p-4 flex items-center justify-between bg-white border border-slate-200">
        <div>
          <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status NEW</p>
          <h3 class="text-2xl font-black text-slate-900 mt-1 font-mono">{{ newCount }}</h3>
        </div>
        <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
          ⚪
        </div>
      </div>

      <div class="saas-card p-4 flex items-center justify-between bg-white border border-slate-200">
        <div>
          <p class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sudah Setor</p>
          <h3 class="text-2xl font-black text-emerald-600 mt-1 font-mono">{{ sudahSetorCount }}</h3>
        </div>
        <div class="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
          ✅
        </div>
      </div>
    </div>

    <!-- Filter & Toolbar Baris -->
    <div class="saas-card p-4 space-y-3">
      <div class="flex flex-col sm:flex-row items-center justify-between gap-3">
        <!-- Search Input -->
        <div class="relative w-full sm:w-80">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari email atau password..."
            class="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-blue-500 transition" />
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-slate-400 absolute left-3 top-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
        </div>

        <!-- Filter Selectors -->
        <div class="flex items-center gap-2 w-full sm:w-auto">
          <select
            v-model="filterStatus"
            class="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer shadow-2xs">
            <option value="all">Semua Akun ({{ props.ledger.length }})</option>
            <option value="has_pass">Memiliki Password ({{ hasPasswordCount }})</option>
            <option value="no_pass">Tanpa Password ({{ props.ledger.length - hasPasswordCount }})</option>
            <option value="new">⚪ Status NEW</option>
            <option value="siap_setor">🔵 Status Siap Setor</option>
            <option value="sudah_setor">✅ Status Sudah Setor</option>
          </select>

          <!-- Group Mode Toggle -->
          <button
            @click="isGroupedByPass = !isGroupedByPass"
            class="px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
            :class="isGroupedByPass ? 'bg-indigo-50 border-indigo-200 text-indigo-700 font-bold' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'">
            <span>{{ isGroupedByPass ? '🗂️ Kelompok per Password' : '🎴 Kartu per Akun' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Cards Grid View (Per Email Card) -->
    <div v-if="!isGroupedByPass">
      <div v-if="filteredAccounts.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div
          v-for="item in filteredAccounts"
          :key="item.email"
          @click="openDetailModal(item)"
          class="saas-card p-4 hover:shadow-lg transition duration-200 cursor-pointer group border border-slate-200/80 hover:border-blue-400 bg-white relative flex flex-col justify-between space-y-3">
          
          <!-- Top Row: Email & Status Badge -->
          <div>
            <div class="flex items-start justify-between gap-2 mb-1.5">
              <div class="font-bold text-xs text-slate-900 font-mono group-hover:text-blue-600 transition line-clamp-1 break-all" :title="item.email">
                {{ item.email }}
              </div>
              <span
                class="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase shrink-0"
                :class="getKeteranganBadgeClass(item.setorStatus)">
                {{ getKeteranganLabel(item.setorStatus) }}
              </span>
            </div>

            <!-- Password Box -->
            <div class="mt-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-2">
              <div class="flex items-center gap-1.5 min-w-0">
                <span class="text-slate-400 text-xs shrink-0">🔑</span>
                <span class="font-mono text-xs font-bold text-slate-800 truncate select-all">
                  {{ isPasswordVisible(item.email) ? (item.password || 'TIDAK ADA PASSWORD') : (item.password ? '••••••••••••' : 'TIDAK ADA PASSWORD') }}
                </span>
              </div>
              <div class="flex items-center gap-1 shrink-0" @click.stop>
                <button
                  v-if="item.password"
                  @click="toggleShowPassword(item.email)"
                  type="button"
                  class="p-1 text-slate-400 hover:text-blue-600 transition cursor-pointer text-xs"
                  title="Intip Password">
                  {{ isPasswordVisible(item.email) ? '👁️' : '🙈' }}
                </button>
                <button
                  v-if="item.password"
                  @click="copyText(item.password, 'Password')"
                  type="button"
                  class="p-1 text-slate-400 hover:text-emerald-600 transition cursor-pointer text-xs"
                  title="Salin Password">
                  📋
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Row: Date & Live Status -->
          <div class="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span class="flex items-center gap-1">
              📅 {{ item.tglSetor || '-' }}
            </span>
            <span class="font-bold flex items-center gap-1" :class="getStatusTextColor(item.verifyStatus)">
              <span class="w-1.5 h-1.5 rounded-full" :class="getStatusDotColor(item.verifyStatus)"></span>
              {{ getVerifyStatusLabel(item.verifyStatus) }}
            </span>
          </div>

          <!-- Hover Overlay Hint -->
          <div class="absolute inset-0 rounded-2xl border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition pointer-events-none"></div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="saas-card p-12 text-center space-y-3">
        <div class="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto text-xl">
          🔑
        </div>
        <h4 class="font-bold text-slate-800 text-sm">Tidak Ada Akun Ditemukan</h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">Tidak ada kredensial yang sesuai dengan filter atau kata kunci pencarian Anda.</p>
      </div>
    </div>

    <!-- Cards Grouped by Password View -->
    <div v-else class="space-y-4">
      <div v-if="groupedByPassword.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="group in groupedByPassword"
          :key="group.password"
          class="saas-card p-4 space-y-3 border border-slate-200 bg-white">
          
          <div class="flex items-center justify-between pb-2 border-b border-slate-100">
            <div class="flex items-center gap-2">
              <span class="p-1.5 rounded-lg bg-amber-50 text-amber-600 font-bold text-xs">🔑</span>
              <span class="font-mono font-bold text-xs text-slate-900 select-all">
                {{ isGroupPassVisible(group.password) ? group.password : '••••••••••••' }}
              </span>
            </div>
            <div class="flex items-center gap-1">
              <button
                @click="toggleGroupPassVisible(group.password)"
                class="p-1 text-slate-400 hover:text-blue-600 text-xs">
                {{ isGroupPassVisible(group.password) ? '👁️' : '🙈' }}
              </button>
              <button
                @click="copyText(group.password, 'Password')"
                class="p-1 text-slate-400 hover:text-emerald-600 text-xs">
                📋
              </button>
              <span class="ml-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                {{ group.items.length }} Akun
              </span>
            </div>
          </div>

          <!-- List of accounts under this password -->
          <div class="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            <div
              v-for="acc in group.items"
              :key="acc.email"
              @click="openDetailModal(acc)"
              class="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 transition cursor-pointer flex items-center justify-between text-xs">
              <span class="font-mono font-semibold text-slate-800 truncate" :title="acc.email">{{ acc.email }}</span>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0" :class="getKeteranganBadgeClass(acc.setorStatus)">
                {{ getKeteranganLabel(acc.setorStatus) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Account Detail Modal Drawer -->
    <div
      v-if="selectedDetailAccount"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      @click.self="selectedDetailAccount = null">
      <div class="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-150">
        
        <!-- Modal Header -->
        <div class="p-5 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              🔑
            </div>
            <div>
              <h3 class="font-bold text-sm text-white">Detail Kredensial Akun</h3>
              <p class="text-[11px] text-slate-300 font-mono">{{ selectedDetailAccount.email }}</p>
            </div>
          </div>
          <button
            @click="selectedDetailAccount = null"
            class="text-slate-400 hover:text-white w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm cursor-pointer transition">
            ✕
          </button>
        </div>

        <!-- Modal Body Content -->
        <div class="p-5 space-y-4 text-xs font-sans text-slate-700">
          
          <!-- Email Field -->
          <div class="space-y-1">
            <label class="block font-bold text-[10px] text-slate-400 uppercase tracking-wider">Alamat Email:</label>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <span class="font-mono font-bold text-slate-900 break-all select-all">{{ selectedDetailAccount.email }}</span>
              <button
                @click="copyText(selectedDetailAccount.email, 'Email')"
                class="p-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 cursor-pointer shrink-0 font-semibold text-[11px] flex items-center gap-1">
                📋 <span>Salin</span>
              </button>
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-1">
            <label class="block font-bold text-[10px] text-slate-400 uppercase tracking-wider">Password Akun:</label>
            <div class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-200">
              <input
                :type="isPasswordVisible(selectedDetailAccount.email) ? 'text' : 'password'"
                v-model="modalPasswordInput"
                placeholder="Belum ada password..."
                class="bg-transparent font-mono font-bold text-slate-900 w-full focus:outline-none" />
              
              <div class="flex items-center gap-1 shrink-0">
                <button
                  @click="toggleShowPassword(selectedDetailAccount.email)"
                  class="p-1 text-slate-400 hover:text-blue-600 transition cursor-pointer text-sm">
                  {{ isPasswordVisible(selectedDetailAccount.email) ? '👁️' : '🙈' }}
                </button>
                <button
                  v-if="modalPasswordInput"
                  @click="copyText(modalPasswordInput, 'Password')"
                  class="p-1 text-slate-400 hover:text-emerald-600 transition cursor-pointer text-sm">
                  📋
                </button>
              </div>
            </div>
          </div>

          <!-- Status & Date Controls -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-1">Keterangan Status:</label>
              <select
                v-model="modalStatusInput"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-bold text-slate-800 focus:outline-none focus:border-blue-500">
                <option value="new">⚪ NEW</option>
                <option value="siap_setor">🔵 Siap Setor</option>
                <option value="setor_tgl">📅 Setor Tgl</option>
                <option value="sudah_setor">✅ Sudah Setor</option>
                <option value="akun_ortu">👨‍👩‍👧 Akun Ortu</option>
              </select>
            </div>

            <div>
              <label class="block font-bold text-[10px] text-slate-400 uppercase tracking-wider mb-1">Tanggal Setor:</label>
              <input
                v-model="modalDateInput"
                type="text"
                placeholder="DD/MM/YYYY"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 font-mono text-slate-800 focus:outline-none focus:border-blue-500" />
            </div>
          </div>

          <!-- Live Check Status Info -->
          <div class="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <span class="block text-[10px] font-bold text-slate-400 uppercase">Live Verification:</span>
              <span class="font-bold uppercase text-xs" :class="getStatusTextColor(selectedDetailAccount.verifyStatus)">
                {{ getVerifyStatusLabel(selectedDetailAccount.verifyStatus) }}
              </span>
            </div>
            <button
              @click="$emit('verifySingleInLedger', selectedDetailAccount.email)"
              class="px-3 py-1.5 rounded-lg text-xs btn-primary cursor-pointer">
              Cek Live Sekarang
            </button>
          </div>
        </div>

        <!-- Modal Footer Actions -->
        <div class="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            @click="deleteAccount"
            class="px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 bg-white border border-slate-200 hover:bg-rose-50 transition cursor-pointer">
            🗑️ Hapus Akun
          </button>

          <div class="flex items-center gap-2">
            <button
              @click="selectedDetailAccount = null"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-200/60 transition cursor-pointer">
              Batal
            </button>
            <button
              @click="saveModalChanges"
              class="px-4 py-1.5 rounded-xl text-xs font-bold btn-primary cursor-pointer">
              Simpan Perubahan
            </button>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  ledger: { type: Array, default: () => [] }
});

const emit = defineEmits(['updateLedgerRow', 'deleteLedgerEmail', 'verifySingleInLedger']);

const searchQuery = ref('');
const filterStatus = ref('all');
const isGroupedByPass = ref(false);
const showAllPasswords = ref(false);
const visiblePassMap = ref({});
const groupVisiblePassMap = ref({});

const selectedDetailAccount = ref(null);
const modalPasswordInput = ref('');
const modalStatusInput = ref('new');
const modalDateInput = ref('');

const totalAccountsCount = computed(() => props.ledger.length);
const hasPasswordCount = computed(() => props.ledger.filter(l => l.password).length);
const newCount = computed(() => props.ledger.filter(l => l.setorStatus === 'new' || l.setorStatus === 'belum_disetor' || !l.setorStatus).length);
const sudahSetorCount = computed(() => props.ledger.filter(l => l.setorStatus === 'sudah_setor' || l.setorStatus === 'disetor').length);

const filteredAccounts = computed(() => {
  let list = props.ledger;

  if (filterStatus.value === 'has_pass') {
    list = list.filter(l => !!l.password);
  } else if (filterStatus.value === 'no_pass') {
    list = list.filter(l => !l.password);
  } else if (filterStatus.value === 'new') {
    list = list.filter(l => l.setorStatus === 'new' || l.setorStatus === 'belum_disetor' || !l.setorStatus);
  } else if (filterStatus.value === 'siap_setor') {
    list = list.filter(l => l.setorStatus === 'siap_setor');
  } else if (filterStatus.value === 'sudah_setor') {
    list = list.filter(l => l.setorStatus === 'sudah_setor' || l.setorStatus === 'disetor');
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(l => 
      l.email.toLowerCase().includes(q) || 
      (l.password && l.password.toLowerCase().includes(q))
    );
  }

  return list;
});

const groupedByPassword = computed(() => {
  const groups = {};
  filteredAccounts.value.forEach(acc => {
    const pass = acc.password || 'Tanpa Password';
    if (!groups[pass]) groups[pass] = [];
    groups[pass].push(acc);
  });
  return Object.keys(groups).map(pass => ({
    password: pass,
    items: groups[pass]
  }));
});

function isPasswordVisible(email) {
  return showAllPasswords.value || !!visiblePassMap.value[email];
}

function toggleShowPassword(email) {
  visiblePassMap.value[email] = !visiblePassMap.value[email];
}

function toggleShowAllPasswords() {
  showAllPasswords.value = !showAllPasswords.value;
}

function isGroupPassVisible(pass) {
  return showAllPasswords.value || !!groupVisiblePassMap.value[pass];
}

function toggleGroupPassVisible(pass) {
  groupVisiblePassMap.value[pass] = !groupVisiblePassMap.value[pass];
}

function copyText(text, label) {
  if (!text) return;
  navigator.clipboard.writeText(text);
  alert(`${label} berhasil disalin!`);
}

function openDetailModal(item) {
  selectedDetailAccount.value = item;
  modalPasswordInput.value = item.password || '';
  modalStatusInput.value = item.setorStatus || 'new';
  modalDateInput.value = item.tglSetor || '';
}

function saveModalChanges() {
  if (!selectedDetailAccount.value) return;
  emit('updateLedgerRow', {
    ...selectedDetailAccount.value,
    password: modalPasswordInput.value.trim(),
    setorStatus: modalStatusInput.value,
    tglSetor: modalDateInput.value.trim() || null,
    updatedAt: new Date().toLocaleDateString('id-ID')
  });
  selectedDetailAccount.value = null;
}

function deleteAccount() {
  if (!selectedDetailAccount.value) return;
  if (confirm(`Yakin ingin menghapus akun ${selectedDetailAccount.value.email}?`)) {
    emit('deleteLedgerEmail', selectedDetailAccount.value.email);
    selectedDetailAccount.value = null;
  }
}

function getKeteranganLabel(statusKey) {
  const map = {
    new: 'NEW',
    belum_disetor: 'NEW',
    siap_setor: 'Siap Setor',
    setor_tgl: 'Setor Tgl',
    sudah_setor: 'Sudah Setor',
    disetor: 'Sudah Setor',
    akun_ortu: 'Akun Ortu'
  };
  return map[statusKey] || 'NEW';
}

function getKeteranganBadgeClass(statusKey) {
  const map = {
    new: 'bg-slate-100 text-slate-700 border border-slate-200',
    belum_disetor: 'bg-slate-100 text-slate-700 border border-slate-200',
    siap_setor: 'bg-blue-50 text-blue-700 border border-blue-200',
    setor_tgl: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    sudah_setor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    disetor: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    akun_ortu: 'bg-purple-50 text-purple-700 border border-purple-200'
  };
  return map[statusKey] || 'bg-slate-100 text-slate-700 border border-slate-200';
}

function getVerifyStatusLabel(statusKey) {
  const map = {
    live: 'LIVE',
    die: 'DIE',
    checkpoint: 'CHECKPOINT',
    error: 'ERROR',
    unchecked: 'BELUM CEK'
  };
  return map[statusKey] || 'BELUM CEK';
}

function getStatusTextColor(statusKey) {
  const map = {
    live: 'text-emerald-600',
    die: 'text-rose-600',
    checkpoint: 'text-amber-600',
    error: 'text-slate-500'
  };
  return map[statusKey] || 'text-slate-400';
}

function getStatusDotColor(statusKey) {
  const map = {
    live: 'bg-emerald-500',
    die: 'bg-rose-500',
    checkpoint: 'bg-amber-500',
    error: 'bg-slate-400'
  };
  return map[statusKey] || 'bg-slate-300';
}
</script>
