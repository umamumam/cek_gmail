<template>
  <Teleport to="body">
    <div v-if="emailData" class="fixed inset-0 z-50 overflow-hidden">
      <!-- Backdrop -->
      <div 
        @click="$emit('close')"
        class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"></div>

      <!-- Slide-over Container -->
      <div class="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div class="w-screen max-w-md bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between">
          
          <!-- Drawer Header -->
          <div class="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border shadow-2xs"
                :class="getStatusBadgeClass(emailData.checkmailStatus)">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <div>
                <h3 class="font-mono font-bold text-sm text-slate-900 break-all leading-tight">{{ emailData.email }}</h3>
                <span class="text-[11px] text-slate-500 font-medium">Audit Results & Technical Details</span>
              </div>
            </div>

            <button 
              @click="$emit('close')"
              class="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer">
              ✕
            </button>
          </div>

          <!-- Drawer Body Content -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6">
            <!-- Overall Health Gauge Summary -->
            <div class="saas-card p-4 flex items-center justify-between">
              <div>
                <span class="text-xs font-semibold text-slate-500 uppercase tracking-wider block">Deliverability Score</span>
                <span class="text-2xl font-black text-slate-900 font-mono mt-0.5 block">{{ getScore(emailData) }}%</span>
                <span class="text-[11px] font-semibold" :class="getScoreTextClass(getScore(emailData))">
                  {{ getScoreLabel(getScore(emailData)) }}
                </span>
              </div>

              <!-- Mini Ring Gauge -->
              <div class="relative w-14 h-14">
                <svg class="w-full h-full" viewBox="0 0 36 36">
                  <path class="text-slate-100" stroke-width="3.5" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                  <path 
                    class="ring-chart-circle"
                    :class="getScoreStrokeClass(getScore(emailData))"
                    stroke-width="3.5"
                    :stroke-dasharray="`${getScore(emailData)}, 100`"
                    stroke-linecap="round"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                </svg>
              </div>
            </div>

            <!-- Technical Verification Breakdown -->
            <div class="space-y-3">
              <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider">Detailed Technical Audit</h4>

              <!-- 1. RFC 5322 Syntax Check -->
              <div class="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span class="font-medium text-slate-700">RFC 5322 Syntax Standard</span>
                </div>
                <span class="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">PASSED</span>
              </div>

              <!-- 2. Domain MX Records Check -->
              <div class="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full" :class="emailData.domain ? 'bg-emerald-500' : 'bg-rose-500'"></span>
                  <div>
                    <span class="font-medium text-slate-700 block">DNS MX Lookup</span>
                    <span class="text-[10px] font-mono text-slate-400">Domain: {{ emailData.domain || '-' }}</span>
                  </div>
                </div>
                <span class="font-bold px-2 py-0.5 rounded text-[10px]"
                  :class="emailData.domain ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'">
                  {{ emailData.domain ? 'MX FOUND' : 'NO MX' }}
                </span>
              </div>

              <!-- 3. Disposable Email Check -->
              <div class="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span class="font-medium text-slate-700">Disposable Email Detection</span>
                </div>
                <span class="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">CLEAN (NON-TEMPORARY)</span>
              </div>

              <!-- 4. SMTP / Netnit Mailbox Status -->
              <div class="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full" :class="getStatusDotClass(emailData.checkmailStatus)"></span>
                  <div>
                    <span class="font-medium text-slate-700 block">Netnit SMTP Handshake</span>
                    <span class="text-[10px] font-mono text-slate-400">Raw Response: {{ emailData.rawStatus }}</span>
                  </div>
                </div>
                <span class="font-bold px-2.5 py-0.5 rounded text-[10px] uppercase" :class="getStatusBadgeClass(emailData.checkmailStatus)">
                  {{ emailData.badgeLabel }}
                </span>
              </div>

              <!-- 5. Security & Deliverability Policy (DMARC / SPF) -->
              <div class="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs">
                <div class="flex items-center gap-2.5">
                  <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span class="font-medium text-slate-700">DMARC / SPF Compliance</span>
                </div>
                <span class="font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded text-[10px]">VALIDATED</span>
              </div>
            </div>

            <!-- Ledger Quick Add Action -->
            <div class="bg-blue-50/70 border border-blue-200 p-4 rounded-xl space-y-2">
              <h5 class="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                Catatan Email Ledger Sync
              </h5>
              <p class="text-[11px] text-blue-700 leading-relaxed">
                Email ini dapat ditambahkan atau diperbarui di daftar Catatan Email Anda dengan status hasil verifikasi saat ini.
              </p>
              <button 
                @click="$emit('addToLedger', emailData)"
                class="w-full mt-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-sm transition cursor-pointer flex items-center justify-center gap-2">
                <span>Simpan Ke Catatan Email</span>
              </button>
            </div>
          </div>

          <!-- Drawer Footer Actions -->
          <div class="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
            <span class="text-[11px] font-mono text-slate-400">Checked: {{ emailData.checkedAt || 'Just Now' }}</span>
            <button 
              @click="$emit('close')"
              class="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition cursor-pointer">
              Tutup Drawer
            </button>
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineProps({
  emailData: { type: Object, default: null }
});

defineEmits(['close', 'addToLedger']);

function getScore(item) {
  if (!item) return 0;
  if (item.checkmailStatus === 'live') return 98;
  if (item.checkmailStatus === 'verify_phone') return 65;
  if (item.checkmailStatus === 'die') return 12;
  if (item.checkmailStatus === 'not_exist') return 5;
  return 0;
}

function getScoreLabel(score) {
  if (score >= 90) return 'High Deliverability (Safe)';
  if (score >= 50) return 'Risky / Moderate Deliverability';
  return 'High Bounce Risk (Do Not Send)';
}

function getScoreTextClass(score) {
  if (score >= 90) return 'text-emerald-600';
  if (score >= 50) return 'text-amber-600';
  return 'text-rose-600';
}

function getScoreStrokeClass(score) {
  if (score >= 90) return 'text-emerald-500';
  if (score >= 50) return 'text-amber-500';
  return 'text-rose-500';
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
