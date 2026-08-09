<template>
  <div class="h-screen overflow-hidden bg-[#F8FAFC] text-[#0F172A] flex flex-row font-sans selection:bg-blue-600 selection:text-white w-full">
    
    <!-- Sidebar Navigation (Desktop) -->
    <SidebarNav
      class="hidden md:flex"
      :activeTab="activeTab"
      :apiCredits="apiCredits"
      :subCredits="subCredits"
      :isServerOnline="isServerOnline"
      :historyCount="checkHistory.length"
      :changesCount="statusChangeLogs.length"
      :ledgerCount="emailLedger.length"
      @navigate="handleNavigate" />

    <!-- Mobile Sidebar Drawer -->
    <Teleport to="body">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 md:hidden overflow-hidden flex">
        <!-- Backdrop -->
        <div 
          @click="isMobileMenuOpen = false"
          class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"></div>
        
        <!-- Drawer Body -->
        <div class="relative z-50 h-full">
          <SidebarNav
            :isMobile="true"
            :activeTab="activeTab"
            :apiCredits="apiCredits"
            :subCredits="subCredits"
            :isServerOnline="isServerOnline"
            :historyCount="checkHistory.length"
            :changesCount="statusChangeLogs.length"
            :ledgerCount="emailLedger.length"
            @navigate="handleNavigate"
            @closeMobileMenu="isMobileMenuOpen = false" />
        </div>
      </div>
    </Teleport>

    <!-- Main Right Content Wrapper -->
    <div class="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
      
      <!-- Header Bar -->
      <HeaderBar
        :title="tabTitle"
        :description="tabDescription"
        :apiKey="apiKey"
        v-model:globalSearch="globalSearch"
        @openApiConfig="showApiKeyModal = true"
        @toggleMobileMenu="isMobileMenuOpen = !isMobileMenuOpen" />

      <!-- View Container (Scrollable Area) -->
      <main class="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 max-w-7xl w-full mx-auto flex flex-col justify-between">
        
        <div class="space-y-6">
          <!-- Tab 1: Cek Email (Bulk Verification Hub) -->
          <CekEmailView
            v-if="activeTab === 'checker'"
            v-model:inputText="inputText"
            v-model:checkMode="checkMode"
            :isProcessing="isProcessing"
            :timerDisplay="timerDisplay"
            :progressPercent="progressPercent"
            :currentChunk="currentChunk"
            :totalChunks="totalChunks"
            :results="sessionResults"
            @startCheck="startProcessing"
            @stopCheck="stopProcessing"
            @loadSample="loadSampleEmails"
            @clearInput="clearInput"
            @openDetail="openDetailDrawer"
            @copyLive="copyLiveSession"
            @exportTxt="exportSessionTxt"
            @exportCsv="exportSessionCsv" />

          <!-- Tab 2: Riwayat Email -->
          <RiwayatView
            v-if="activeTab === 'riwayat'"
            :history="checkHistory"
            @openDetail="openDetailDrawer"
            @addToLedger="addToLedgerSingle"
            @copyLiveHistory="copyLiveHistory"
            @exportHistoryCsv="exportHistoryCsv"
            @clearHistory="clearHistory" />

          <!-- Tab 3: Riwayat Perubahan -->
          <PerubahanView
            v-if="activeTab === 'perubahan'"
            :changes="statusChangeLogs"
            @clearChanges="clearChanges" />

          <!-- Tab 4: Catatan Email (Ledger: Disetor vs Belum Disetor) -->
          <CatatanEmailView
            v-if="activeTab === 'ledger'"
            :ledger="emailLedger"
            @addLedgerEmails="addLedgerEmails"
            @updateLedgerRow="updateLedgerRow"
            @deleteLedgerEmail="deleteLedgerEmail"
            @checkSelectedLedger="checkSelectedLedger"
            @verifySingleInLedger="verifySingleInLedger"
            @clearLedger="clearLedger"
            @bulkSetor="bulkSetorLedger" />

          <!-- Tab 5: Developer API Guide -->
          <DeveloperApiView
            v-if="activeTab === 'api'"
            :apiKey="apiKey"
            @copyKey="copyApiKey" />
        </div>

        <!-- Footer -->
        <footer class="mt-8 pt-4 border-t border-slate-200 bg-transparent text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>CekGmail SaaS Dashboard • Powered by Netnit Realtime Verification Engine</p>
          <div class="flex items-center gap-4 text-slate-400">
            <span>RFC 5322</span>
            <span>•</span>
            <span>DNS MX Lookup</span>
            <span>•</span>
            <span>Disposable Email Detection</span>
          </div>
        </footer>

      </main>
    </div>

    <!-- Detail Slide-Over Drawer -->
    <DetailSlideOver
      :emailData="selectedDetail"
      @close="selectedDetail = null"
      @addToLedger="addToLedgerSingle" />

    <!-- API Key Configuration Modal -->
    <div v-if="showApiKeyModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
      <div class="saas-card w-full max-w-md p-6 space-y-4 shadow-2xl relative">
        <button @click="showApiKeyModal = false" class="absolute top-4 right-4 text-slate-400 hover:text-slate-700 w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center cursor-pointer">
          ✕
        </button>

        <h3 class="text-base font-bold text-slate-900">Ubah Netnit Bearer API Key</h3>
        <p class="text-xs text-slate-500">Masukkan API Key Netnit Anda untuk menghubungkan engine pemroses email.</p>

        <div class="space-y-2">
          <label class="text-[11px] font-bold text-slate-600 uppercase">API Key Token:</label>
          <input
            v-model="apiKeyInput"
            type="text"
            placeholder="netnit_..."
            class="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-500" />
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <button @click="showApiKeyModal = false" class="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">Batal</button>
          <button @click="saveApiKey" class="px-4 py-2 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs">Simpan Key</button>
        </div>
      </div>
    </div>

    <!-- Notification Toast -->
    <div v-if="toastMessage" class="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>{{ toastMessage }}</span>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import SidebarNav from './components/SidebarNav.vue';
import HeaderBar from './components/HeaderBar.vue';
import CekEmailView from './components/CekEmailView.vue';
import RiwayatView from './components/RiwayatView.vue';
import PerubahanView from './components/PerubahanView.vue';
import CatatanEmailView from './components/CatatanEmailView.vue';
import DeveloperApiView from './components/DeveloperApiView.vue';
import DetailSlideOver from './components/DetailSlideOver.vue';

// Navigation State
const activeTab = ref('checker'); // 'checker' | 'riwayat' | 'perubahan' | 'ledger' | 'api'
const globalSearch = ref('');
const isMobileMenuOpen = ref(false);

// Config & API State
const apiKey = ref(localStorage.getItem('cekgmail_apikey') || 'netnit_tkPMvN0vEYAVt2E2jUFAscKOfC0hB3Ye');
const apiKeyInput = ref(apiKey.value);
const showApiKeyModal = ref(false);
const isServerOnline = ref(true);

// Checker State
const checkMode = ref('deepcheck'); // 'deepcheck' | 'fastcheck'
const inputText = ref('');
const isProcessing = ref(false);
const isCancelled = ref(false);
const sessionResults = ref([]);
const selectedDetail = ref(null);

// Progress & Timer State
const currentChunk = ref(0);
const totalChunks = ref(0);
const progressPercent = ref(0);
const timerDisplay = ref('00 : 00 : 00');
let timerInterval = null;
let startTime = 0;

// Persistent Data Arrays & Credits (stored in localStorage)
const checkHistory = ref(JSON.parse(localStorage.getItem('cekgmail_history') || '[]'));
const statusChangeLogs = ref(JSON.parse(localStorage.getItem('cekgmail_changes') || '[]'));
const emailLedger = ref(JSON.parse(localStorage.getItem('cekgmail_ledger') || '[]'));

// Persistent Credits Cache
const savedCredits = JSON.parse(localStorage.getItem('cekgmail_credits') || '{}');
const apiCredits = ref(savedCredits.apiCredits ?? null);
const subCredits = ref(savedCredits.subCredits ?? null);

// Notification Toast
const toastMessage = ref('');

// Computed Titles & Descriptions per Tab
const tabTitle = computed(() => {
  switch (activeTab.value) {
    case 'checker': return 'Cek Email Health Hub';
    case 'riwayat': return 'Riwayat Email Terverifikasi';
    case 'perubahan': return 'Riwayat Perubahan Status Email';
    case 'ledger': return 'Catatan Email (Disetor vs Belum Disetor)';
    case 'api': return 'Developer API & Integration';
    default: return 'CekGmail';
  }
});

const tabDescription = computed(() => {
  switch (activeTab.value) {
    case 'checker': return 'Verifikasi keaktifan alamat email secara instan atau masal.';
    case 'riwayat': return 'Daftar riwayat seluruh email yang pernah diperiksa dalam sistem.';
    case 'perubahan': return 'Log otomatis saat status email berubah dari Die ke Live atau sebaliknya.';
    case 'ledger': return 'Pencatatan email unik yang sudah Anda setor maupun belum disetor.';
    case 'api': return 'Dokumentasi REST API dan generator kode integrasi untuk pengembang.';
    default: return '';
  }
});

onMounted(async () => {
  await fetchCredits();
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

function saveState() {
  localStorage.setItem('cekgmail_history', JSON.stringify(checkHistory.value));
  localStorage.setItem('cekgmail_changes', JSON.stringify(statusChangeLogs.value));
  localStorage.setItem('cekgmail_ledger', JSON.stringify(emailLedger.value));
  localStorage.setItem('cekgmail_credits', JSON.stringify({ apiCredits: apiCredits.value, subCredits: subCredits.value }));
}

function updateCredits(apiVal, subVal) {
  if (apiVal !== null && apiVal !== undefined) apiCredits.value = apiVal;
  if (subVal !== null && subVal !== undefined) subCredits.value = subVal;
  saveState();
}

function saveApiKey() {
  if (apiKeyInput.value.trim()) {
    apiKey.value = apiKeyInput.value.trim();
    localStorage.setItem('cekgmail_apikey', apiKey.value);
    showApiKeyModal.value = false;
    showToast('API Key berhasil diperbarui.');
    fetchCredits();
  }
}

async function fetchCredits() {
  try {
    const res = await fetch('/api/netnit-credits', {
      headers: { 'Authorization': `Bearer ${apiKey.value}` }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.api_credits_remaining !== null) updateCredits(data.api_credits_remaining, data.subscription_credits_remaining);
      isServerOnline.value = true;
    }
  } catch (err) {
    isServerOnline.value = false;
  }
}

function handleNavigate(tabId) {
  activeTab.value = tabId;
}

function openDetailDrawer(item) {
  selectedDetail.value = item;
}

function extractEmails(text) {
  if (!text) return [];
  return text
    .split(/[\n,;]+/)
    .map(e => e.trim())
    .filter(e => e && e.includes('@'));
}

// Sample Loader
const sampleEmails = [
  'alex.developer@gmail.com',
  'support.team@gmail.com',
  'disabled.account@gmail.com',
  'test.phone.ver@gmail.com',
  'unregistered987654321@gmail.com'
].join('\n');

function loadSampleEmails() {
  inputText.value = sampleEmails;
  showToast('Sampel email berhasil dimuat.');
}

function clearInput() {
  inputText.value = '';
  sessionResults.value = [];
  timerDisplay.value = '00 : 00 : 00';
  progressPercent.value = 0;
  currentChunk.value = 0;
  totalChunks.value = 0;
}

function startTimer() {
  startTime = Date.now();
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    const elapsedMs = Date.now() - startTime;
    const hrs = String(Math.floor(elapsedMs / 3600000)).padStart(2, '0');
    const mins = String(Math.floor((elapsedMs % 3600000) / 60000)).padStart(2, '0');
    const secs = String(Math.floor((elapsedMs % 60000) / 1000)).padStart(2, '0');
    timerDisplay.value = `${hrs} : ${mins} : ${secs}`;
  }, 500);
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

// Single Verification Handler
async function handleSingleVerify(emailStr, callback) {
  showToast(`Memverifikasi ${emailStr}...`);
  try {
    const res = await fetch('/api/netnit-check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey.value}`
      },
      body: JSON.stringify({
        mail: [emailStr],
        checkType: checkMode.value
      })
    });

    if (!res.ok) throw new Error('API Request Failed');
    const data = await res.json();
    const rawItem = (data.results && data.results[0]) || { email: emailStr, status: 'failed' };
    const normalized = normalizeResult(rawItem, checkMode.value);

    // Record into system state & auto-sync
    processNormalizedResult(normalized);
    if (callback) callback(normalized);
    showToast(`Pengecekan ${emailStr} selesai: ${normalized.badgeLabel}`);

  } catch (err) {
    const failedItem = {
      email: emailStr,
      domain: emailStr.split('@')[1] || '',
      rawStatus: 'failed',
      checkmailStatus: 'error',
      badgeLabel: 'FAILED',
      details: err.message,
      checkedAt: new Date().toLocaleTimeString()
    };
    processNormalizedResult(failedItem);
    if (callback) callback(failedItem);
  }
}

// Processing Loop with Auto-Sync for History, Change Tracking, & Catatan Ledger
async function startProcessing() {
  const emailList = extractEmails(inputText.value);
  if (emailList.length === 0) {
    showToast('Masukkan setidaknya satu alamat email yang valid.');
    return;
  }

  isProcessing.value = true;
  isCancelled.value = false;
  sessionResults.value = [];
  progressPercent.value = 0;

  const chunkSize = checkMode.value === 'fastcheck' ? 1000 : 500;
  const chunks = [];
  for (let i = 0; i < emailList.length; i += chunkSize) {
    chunks.push(emailList.slice(i, i + chunkSize));
  }

  totalChunks.value = chunks.length;
  currentChunk.value = 0;
  startTimer();

  for (let i = 0; i < chunks.length; i++) {
    if (isCancelled.value) {
      showToast('Pengecekan dihentikan secara manual.');
      break;
    }

    currentChunk.value = i + 1;
    const chunkEmails = chunks[i];

    try {
      const res = await fetch('/api/netnit-check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey.value}`
        },
        body: JSON.stringify({
          mail: chunkEmails,
          checkType: checkMode.value
        })
      });

      if (!res.ok) throw new Error(`HTTP Error ${res.status}`);

      const data = await res.json();
      if (data.api_credits_remaining !== null || data.subscription_credits_remaining !== null) {
        updateCredits(data.api_credits_remaining, data.subscription_credits_remaining);
      }

      const rawResults = data.results || [];
      const normalizedList = rawResults.map(item => normalizeResult(item, checkMode.value));

      normalizedList.forEach(item => {
        sessionResults.value.push(item);
        processNormalizedResult(item);
      });

    } catch (err) {
      chunkEmails.forEach(e => {
        const failedItem = {
          email: e,
          domain: e.split('@')[1] || '',
          rawStatus: 'failed',
          checkmailStatus: 'error',
          badgeLabel: 'FAILED',
          details: err.message || 'Network Timeout',
          checkedAt: new Date().toLocaleTimeString()
        };
        sessionResults.value.push(failedItem);
        processNormalizedResult(failedItem);
      });
    }

    progressPercent.value = Math.round(((i + 1) / chunks.length) * 100);
  }

  isProcessing.value = false;
  stopTimer();

  if (!isCancelled.value) {
    showToast(`Pengecekan selesai! ${sessionResults.value.length} email terverifikasi.`);
  }
}

function stopProcessing() {
  isCancelled.value = true;
  isProcessing.value = false;
  stopTimer();
}

function normalizeResult(item, mode) {
  const email = (item.email || item.mail || '').toLowerCase().trim();
  const rawStatus = (item.status || 'failed').toLowerCase();
  const domain = email.includes('@') ? email.split('@')[1] : '';

  let checkmailStatus = 'error';
  let badgeLabel = 'FAILED';

  if (mode === 'fastcheck') {
    if (rawStatus === 'good') {
      checkmailStatus = 'live';
      badgeLabel = 'GOOD (ACTIVE)';
    } else if (rawStatus === 'bad') {
      checkmailStatus = 'die';
      badgeLabel = 'BAD (INACTIVE)';
    } else {
      checkmailStatus = 'error';
      badgeLabel = 'FAILED';
    }
  } else {
    // deepcheck
    if (rawStatus === 'live') {
      checkmailStatus = 'live';
      badgeLabel = 'LIVE (ACTIVE)';
    } else if (rawStatus === 'ver') {
      checkmailStatus = 'verify_phone';
      badgeLabel = 'VERIFY PHONE (2FA)';
    } else if (rawStatus === 'unregistered') {
      checkmailStatus = 'not_exist';
      badgeLabel = 'UNREGISTERED';
    } else if (rawStatus === 'disabled') {
      checkmailStatus = 'die';
      badgeLabel = 'DISABLED (BANNED)';
    } else {
      checkmailStatus = 'error';
      badgeLabel = 'FAILED';
    }
  }

  return {
    email,
    domain,
    rawStatus,
    checkmailStatus,
    badgeLabel,
    details: item.details || mode,
    checkedAt: new Date().toLocaleTimeString()
  };
}

// Unified Processor for History, Change Log, & Catatan Email Ledger (Unique Email Constraint)
function processNormalizedResult(item) {
  const nowStr = new Date().toLocaleTimeString();

  // 1. History Log
  const existingHistoryIdx = checkHistory.value.findIndex(h => h.email === item.email);
  if (existingHistoryIdx !== -1) {
    const prevHistory = checkHistory.value[existingHistoryIdx];
    
    // Check if status changed! E.g., Die -> Live or Live -> Die
    if (prevHistory.checkmailStatus !== item.checkmailStatus) {
      statusChangeLogs.value.unshift({
        id: Date.now() + Math.random(),
        email: item.email,
        oldStatus: prevHistory.checkmailStatus,
        oldBadgeLabel: prevHistory.badgeLabel,
        newStatus: item.checkmailStatus,
        newBadgeLabel: item.badgeLabel,
        changedAt: nowStr
      });
    }
    // Update history entry
    checkHistory.value[existingHistoryIdx] = { ...item, id: prevHistory.id || Date.now() };
  } else {
    checkHistory.value.unshift({ ...item, id: Date.now() + Math.random() });
  }

  // 2. Auto-Sync with Catatan Email Ledger (Unique Email Constraint)
  // "sekalian email ini dibuat unique jadi semisal sudah cek kok dia live maka dia masih ke simpan live"
  const ledgerIdx = emailLedger.value.findIndex(l => l.email === item.email);
  if (ledgerIdx !== -1) {
    emailLedger.value[ledgerIdx].verifyStatus = item.checkmailStatus;
    emailLedger.value[ledgerIdx].updatedAt = nowStr;
  } else {
    emailLedger.value.unshift({
      email: item.email,
      setorStatus: 'belum_disetor',
      verifyStatus: item.checkmailStatus,
      updatedAt: nowStr
    });
  }

  saveState();
}

function getFormattedDate() {
  const d = new Date();
  const dateStr = d.toLocaleDateString('id-ID', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  return `${dateStr} ${timeStr}`;
}

// Ledger Operations
function addLedgerEmails(rawText, defaultSetor = 'new', customDate = null) {
  const list = extractEmails(rawText);
  let addedCount = 0;
  const nowStr = getFormattedDate();

  list.forEach(email => {
    const cleanEmail = email.toLowerCase().trim();
    const idx = emailLedger.value.findIndex(l => l.email === cleanEmail);
    let tgl = null;
    if (defaultSetor === 'setor_tgl') {
      tgl = customDate || nowStr;
    } else if (defaultSetor === 'sudah_setor' || defaultSetor === 'disetor') {
      tgl = nowStr;
    }

    if (idx === -1) {
      emailLedger.value.unshift({
        email: cleanEmail,
        setorStatus: defaultSetor,
        tglSetor: tgl,
        verifyStatus: 'unchecked',
        updatedAt: nowStr
      });
      addedCount++;
    } else {
      emailLedger.value[idx].setorStatus = defaultSetor;
      if (tgl) emailLedger.value[idx].tglSetor = tgl;
      emailLedger.value[idx].updatedAt = nowStr;
    }
  });

  saveState();
  showToast(`${addedCount} email unik baru berhasil ditambahkan ke Ledger.`);
}

function bulkSetorLedger(emailsArray, dateFormatted) {
  let updatedCount = 0;
  emailsArray.forEach(emailStr => {
    const idx = emailLedger.value.findIndex(l => l.email === emailStr);
    if (idx !== -1) {
      emailLedger.value[idx].setorStatus = 'disetor';
      emailLedger.value[idx].tglSetor = dateFormatted;
      emailLedger.value[idx].updatedAt = dateFormatted;
      updatedCount++;
    }
  });
  saveState();
  showToast(`${updatedCount} email berhasil disetorkan pada tanggal ${dateFormatted}.`);
}

function updateLedgerRow(updatedRow) {
  const idx = emailLedger.value.findIndex(l => l.email === updatedRow.email);
  if (idx !== -1) {
    emailLedger.value[idx] = updatedRow;
    saveState();
    showToast(`Status ${updatedRow.email} diperbarui.`);
  }
}

function deleteLedgerEmail(emailStr) {
  emailLedger.value = emailLedger.value.filter(l => l.email !== emailStr);
  saveState();
  showToast(`Email ${emailStr} dihapus dari Ledger.`);
}

function addToLedgerSingle(item) {
  const cleanEmail = item.email.toLowerCase().trim();
  const idx = emailLedger.value.findIndex(l => l.email === cleanEmail);
  const nowStr = new Date().toLocaleTimeString();

  if (idx !== -1) {
    emailLedger.value[idx].verifyStatus = item.checkmailStatus || 'live';
    emailLedger.value[idx].updatedAt = nowStr;
    showToast(`Catatan ${cleanEmail} diperbarui di Ledger.`);
  } else {
    emailLedger.value.unshift({
      email: cleanEmail,
      setorStatus: 'belum_disetor',
      verifyStatus: item.checkmailStatus || 'live',
      updatedAt: nowStr
    });
    showToast(`Catatan ${cleanEmail} ditambahkan ke Ledger.`);
  }
  saveState();
}

async function verifySingleInLedger(emailStr) {
  await handleSingleVerify(emailStr);
}

function checkSelectedLedger(emailsArray) {
  if (!emailsArray || emailsArray.length === 0) return;
  inputText.value = emailsArray.join('\n');
  activeTab.value = 'checker';
  startProcessing();
}

function clearLedger() {
  if (confirm('Apakah Anda yakin ingin mengosongkan seluruh Catatan Email Ledger?')) {
    emailLedger.value = [];
    saveState();
    showToast('Catatan Email Ledger dikosongkan.');
  }
}

function clearHistory() {
  if (confirm('Apakah Anda yakin ingin menghapus seluruh riwayat pengecekan?')) {
    checkHistory.value = [];
    saveState();
    showToast('Riwayat pengecekan dihapus.');
  }
}

function clearChanges() {
  if (confirm('Apakah Anda yakin ingin menghapus seluruh log riwayat perubahan status?')) {
    statusChangeLogs.value = [];
    saveState();
    showToast('Log perubahan status dihapus.');
  }
}

// Copy & Export Utilities
async function copyLiveSession() {
  const liveList = sessionResults.value.filter(r => r.checkmailStatus === 'live').map(r => r.email);
  if (liveList.length === 0) return showToast('Tidak ada email Live di sesi ini.');
  await navigator.clipboard.writeText(liveList.join('\n'));
  showToast(`${liveList.length} email Live disalin ke clipboard!`);
}

async function copyLiveHistory() {
  const liveList = checkHistory.value.filter(r => r.checkmailStatus === 'live').map(r => r.email);
  if (liveList.length === 0) return showToast('Tidak ada email Live di riwayat.');
  await navigator.clipboard.writeText(liveList.join('\n'));
  showToast(`${liveList.length} email Live disalin ke clipboard!`);
}

function copyApiKey() {
  navigator.clipboard.writeText(apiKey.value);
  showToast('API Key disalin ke clipboard!');
}

function exportSessionTxt() {
  if (sessionResults.value.length === 0) return;
  const content = sessionResults.value.map(r => r.email).join('\n');
  downloadBlob(content, `cekgmail_session_${new Date().toISOString().slice(0, 10)}.txt`, 'text/plain');
}

function exportSessionCsv() {
  if (sessionResults.value.length === 0) return;
  const headers = ['Email', 'Domain', 'Status', 'Raw Status', 'Checked At'];
  const rows = sessionResults.value.map(r => [`"${r.email}"`, `"${r.domain}"`, `"${r.badgeLabel}"`, `"${r.rawStatus}"`, `"${r.checkedAt}"`]);
  downloadBlob([headers.join(','), ...rows.map(e => e.join(','))].join('\n'), `cekgmail_session_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv');
}

function exportHistoryCsv() {
  if (checkHistory.value.length === 0) return;
  const headers = ['Email', 'Domain', 'Status', 'Raw Status', 'Checked At'];
  const rows = checkHistory.value.map(r => [`"${r.email}"`, `"${r.domain || ''}"`, `"${r.badgeLabel}"`, `"${r.rawStatus}"`, `"${r.checkedAt}"`]);
  downloadBlob([headers.join(','), ...rows.map(e => e.join(','))].join('\n'), `cekgmail_riwayat_${new Date().toISOString().slice(0, 10)}.csv`, 'text/csv');
}

function downloadBlob(content, filename, mime) {
  const blob = new Blob([content], { type: `${mime};charset=utf-8;` });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  showToast(`File ${filename} berhasil diunduh.`);
}

function showToast(msg) {
  toastMessage.value = msg;
  setTimeout(() => {
    if (toastMessage.value === msg) toastMessage.value = '';
  }, 3500);
}
</script>
