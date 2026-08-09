<template>
  <div class="space-y-6">
    
    <!-- Ultra-Premium Summary Rekap Cards Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- 1. Total Pendapatan Card -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white to-emerald-500/5 p-5 border border-emerald-200/80 shadow-sm hover:shadow-md transition-all duration-200 group">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition"></div>
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span class="text-[11px] font-extrabold text-emerald-800 uppercase tracking-wider">Total Pendapatan</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-md shadow-emerald-500/30 group-hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>
        <div class="mt-3 relative z-10">
          <span class="text-2xl font-black text-slate-900 font-mono tracking-tight block">{{ formatRupiah(totalIncomeAmount) }}</span>
          <div class="flex items-center justify-between mt-2 pt-2 border-t border-emerald-100 text-[11px]">
            <span class="text-emerald-700 font-bold">{{ incomeList.length }} Transaksi</span>
            <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">PEMASUKAN</span>
          </div>
        </div>
      </div>

      <!-- 2. Total Top Up Nokos Card -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 p-5 border border-amber-200/80 shadow-sm hover:shadow-md transition-all duration-200 group">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/20 transition"></div>
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span class="text-[11px] font-extrabold text-amber-800 uppercase tracking-wider">Top Up Nokos</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/30 group-hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </div>
        </div>
        <div class="mt-3 relative z-10">
          <span class="text-2xl font-black text-slate-900 font-mono tracking-tight block">{{ formatRupiah(totalNokosAmount) }}</span>
          <div class="flex items-center justify-between mt-2 pt-2 border-t border-amber-100 text-[11px]">
            <span class="text-amber-700 font-bold">{{ nokosList.length }} Transaksi</span>
            <span class="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">PENGELUARAN</span>
          </div>
        </div>
      </div>

      <!-- 3. Keuntungan Bersih (Net Profit) Sapphire Card -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-900 p-5 text-white shadow-md shadow-indigo-950/20 hover:shadow-lg transition-all duration-200 group">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl group-hover:bg-blue-500/30 transition"></div>
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full" :class="netProfit >= 0 ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'"></span>
            <span class="text-[11px] font-extrabold text-blue-200 uppercase tracking-wider">Net Profit (Bersih)</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md text-blue-300 flex items-center justify-center border border-white/15 group-hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </div>
        </div>
        <div class="mt-3 relative z-10">
          <span class="text-2xl font-black font-mono tracking-tight block" :class="netProfit >= 0 ? 'text-emerald-300' : 'text-rose-300'">
            {{ formatRupiah(netProfit) }}
          </span>
          <div class="flex items-center justify-between mt-2 pt-2 border-t border-white/10 text-[11px]">
            <span class="text-blue-200 font-semibold">{{ netProfit >= 0 ? 'Surplus Untung' : 'Defisit Rugi' }}</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] font-extrabold" :class="netProfit >= 0 ? 'bg-emerald-400/20 text-emerald-300 border border-emerald-400/30' : 'bg-rose-400/20 text-rose-300 border border-rose-400/30'">
              {{ profitMarginRatio }}% MARGIN
            </span>
          </div>
        </div>
      </div>

      <!-- 4. Total Ledger Email Card -->
      <div class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-white to-purple-500/5 p-5 border border-purple-200/80 shadow-sm hover:shadow-md transition-all duration-200 group">
        <div class="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl group-hover:bg-purple-500/20 transition"></div>
        <div class="flex items-center justify-between relative z-10">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-purple-500"></span>
            <span class="text-[11px] font-extrabold text-purple-800 uppercase tracking-wider">Total Ledger Email</span>
          </div>
          <div class="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center shadow-md shadow-purple-500/30 group-hover:scale-105 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </div>
        </div>
        <div class="mt-3 relative z-10">
          <span class="text-2xl font-black text-slate-900 font-mono tracking-tight block">{{ totalLedger }}</span>
          <div class="flex items-center justify-between mt-2 pt-2 border-t border-purple-100 text-[11px]">
            <span class="text-purple-700 font-bold">{{ newLedgerCount }} Email NEW</span>
            <span class="px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 font-bold text-[10px]">DATABASE</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Chart.js Dual-Dataset Financial Comparison Section -->
    <div class="saas-card p-6 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            </div>
            <div>
              <h3 class="font-black text-slate-900 text-base tracking-tight">Grafik Monitoring Financial & Perbandingan</h3>
              <p class="text-xs text-slate-500 font-medium">Visualisasi tren perbandingan 2 warna antara Pemasukan (Hijau) & Top Up Nokos (Oranye).</p>
            </div>
          </div>
        </div>

        <!-- Chart Mode & Timeframe Controls -->
        <div class="flex items-center gap-2 flex-wrap self-start sm:self-auto">
          <!-- Chart Style Mode Switcher -->
          <div class="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 shadow-inner">
            <button
              @click="chartType = 'spline'"
              class="px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1"
              :class="chartType === 'spline' ? 'bg-white text-slate-900 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-900'">
              <span>📈 Area Smooth</span>
            </button>
            <button
              @click="chartType = 'bar'"
              class="px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1"
              :class="chartType === 'bar' ? 'bg-white text-slate-900 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-900'">
              <span>📊 Bar Hybrid</span>
            </button>
          </div>

          <!-- Timeframe Toggle Switcher -->
          <div class="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 shadow-inner">
            <button
              @click="timeframe = 'weekly'"
              class="px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              :class="timeframe === 'weekly' ? 'bg-white text-slate-900 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-900'">
              <span>📅 7 Hari Terakhir</span>
            </button>
            <button
              @click="timeframe = 'monthly'"
              class="px-3 py-1 rounded-lg text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              :class="timeframe === 'monthly' ? 'bg-white text-slate-900 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-900'">
              <span>📆 Grafik Bulanan</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Quick Sub-Summary Pill Indicator -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50/70 p-3 rounded-xl border border-slate-200/60">
        <div class="flex items-center gap-2.5">
          <div class="w-3 h-3 rounded-full bg-emerald-500 shadow-xs"></div>
          <div>
            <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Total Pendapatan (Visual)</span>
            <span class="text-xs font-bold text-emerald-700 font-mono">{{ formatRupiah(chartTotalIncome) }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2.5 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
          <div class="w-3 h-3 rounded-full bg-amber-500 shadow-xs"></div>
          <div>
            <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Total Top Up Nokos (Visual)</span>
            <span class="text-xs font-bold text-amber-700 font-mono">{{ formatRupiah(chartTotalNokos) }}</span>
          </div>
        </div>

        <div class="flex items-center gap-2.5 border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
          <div class="w-3 h-3 rounded-full" :class="chartNetDiff >= 0 ? 'bg-blue-600' : 'bg-rose-500'"></div>
          <div>
            <span class="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Selisih Margin Periode Ini</span>
            <span class="text-xs font-bold font-mono" :class="chartNetDiff >= 0 ? 'text-blue-700' : 'text-rose-700'">
              {{ formatRupiah(chartNetDiff) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Chart Canvas Container with Modern Backdrop -->
      <div class="h-80 w-full relative pt-2">
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>

    <!-- Side-by-Side Tables: Catatan Top Up Nokos & Catatan Pendapatan -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Table 1: Catatan Top Up Nokos -->
      <div class="saas-card p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center border border-amber-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-sm">Catatan Top Up Nokos</h3>
              <p class="text-[11px] text-slate-400">Pengeluaran nomor kosong SMS OTP</p>
            </div>
          </div>

          <button
            @click="showNokosModal = true"
            class="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-amber-500/20 transition cursor-pointer flex items-center gap-1">
            <span>+ Top Up Nokos</span>
          </button>
        </div>

        <div v-if="nokosList.length > 0" class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th class="py-2.5 px-3">Tanggal</th>
                <th class="py-2.5 px-3">Provider</th>
                <th class="py-2.5 px-3">Nominal (Rp)</th>
                <th class="py-2.5 px-3">Catatan</th>
                <th class="py-2.5 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200/70 font-sans">
              <tr v-for="item in nokosList" :key="item.id" class="hover:bg-slate-50/80 transition">
                <td class="py-2.5 px-3 font-mono text-slate-700 font-semibold">{{ item.tanggal }}</td>
                <td class="py-2.5 px-3">
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-50 text-amber-800 border border-amber-200">
                    {{ item.provider }}
                  </span>
                </td>
                <td class="py-2.5 px-3 font-mono font-black text-amber-700">
                  {{ formatRupiah(item.nominal) }}
                </td>
                <td class="py-2.5 px-3 text-slate-600 font-medium">{{ item.catatan || '-' }}</td>
                <td class="py-2.5 px-3 text-right">
                  <button
                    @click="$emit('deleteNokos', item.id)"
                    class="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl space-y-1">
          <p class="font-bold text-slate-600">Belum ada catatan top up nokos</p>
          <p class="text-[11px]">Klik tombol <strong>+ Top Up Nokos</strong> untuk mulai mencatat pengeluaran.</p>
        </div>
      </div>

      <!-- Table 2: Catatan Pendapatan (Pemasukan) -->
      <div class="saas-card p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div>
              <h3 class="font-bold text-slate-900 text-sm">Catatan Pendapatan Saya</h3>
              <p class="text-[11px] text-slate-400">Pemasukan jasa / penjualan akun</p>
            </div>
          </div>

          <button
            @click="showIncomeModal = true"
            class="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-emerald-500/20 transition cursor-pointer flex items-center gap-1">
            <span>+ Catat Pendapatan</span>
          </button>
        </div>

        <div v-if="incomeList.length > 0" class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th class="py-2.5 px-3">Tanggal</th>
                <th class="py-2.5 px-3">Sumber / Layanan</th>
                <th class="py-2.5 px-3">Nominal (Rp)</th>
                <th class="py-2.5 px-3">Catatan</th>
                <th class="py-2.5 px-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200/70 font-sans">
              <tr v-for="item in incomeList" :key="item.id" class="hover:bg-slate-50/80 transition">
                <td class="py-2.5 px-3 font-mono text-slate-700 font-semibold">{{ item.tanggal }}</td>
                <td class="py-2.5 px-3">
                  <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {{ item.sumber }}
                  </span>
                </td>
                <td class="py-2.5 px-3 font-mono font-black text-emerald-700">
                  {{ formatRupiah(item.nominal) }}
                </td>
                <td class="py-2.5 px-3 text-slate-600 font-medium">{{ item.catatan || '-' }}</td>
                <td class="py-2.5 px-3 text-right">
                  <button
                    @click="$emit('deleteIncome', item.id)"
                    class="text-rose-600 hover:text-rose-800 font-semibold cursor-pointer">
                    Hapus
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl space-y-1">
          <p class="font-bold text-slate-600">Belum ada catatan pendapatan</p>
          <p class="text-[11px]">Klik tombol <strong>+ Catat Pendapatan</strong> untuk mulai mencatat hasil jasa Anda.</p>
        </div>
      </div>
    </div>

    <!-- Modal Form Tambah Catatan Top Up Nokos -->
    <Teleport to="body">
      <div v-if="showNokosModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="showNokosModal = false" class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4 z-50">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              Tambah Catatan Top Up Nokos
            </h3>
            <button @click="showNokosModal = false" class="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Top Up:</label>
              <input
                v-model="formNokosTanggal"
                type="date"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Provider / Layanan Nokos:</label>
              <input
                v-model="formNokosProvider"
                type="text"
                placeholder="Contoh: VIOTP / SMS-Activate / HeroSMS"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Nominal Top Up (Rp):</label>
              <input
                v-model.number="formNokosNominal"
                type="number"
                placeholder="Contoh: 50000"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:outline-none focus:border-amber-500" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Catatan Keterangan (Opsional):</label>
              <input
                v-model="formNokosCatatan"
                type="text"
                placeholder="Catatan tambahan"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-amber-500" />
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button @click="showNokosModal = false" class="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">Batal</button>
            <button @click="submitNokos" :disabled="!formNokosNominal || !formNokosProvider" class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 shadow-sm shadow-amber-500/20 disabled:opacity-50">Simpan Nokos</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal Form Tambah Catatan Pendapatan -->
    <Teleport to="body">
      <div v-if="showIncomeModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="showIncomeModal = false" class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"></div>
        <div class="relative bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md p-6 space-y-4 z-50">
          <div class="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
              Tambah Catatan Pendapatan
            </h3>
            <button @click="showIncomeModal = false" class="text-slate-400 hover:text-slate-700 text-xs font-bold cursor-pointer">✕</button>
          </div>

          <div class="space-y-3 text-xs">
            <div>
              <label class="block font-bold text-slate-700 mb-1">Tanggal Pendapatan:</label>
              <input
                v-model="formIncomeTanggal"
                type="date"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-semibold focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Sumber / Deskripsi Layanan:</label>
              <input
                v-model="formIncomeSumber"
                type="text"
                placeholder="Contoh: Jasa Verifikasi / Penjualan Akun"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Nominal Pendapatan (Rp):</label>
              <input
                v-model.number="formIncomeNominal"
                type="number"
                placeholder="Contoh: 150000"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 font-mono focus:outline-none focus:border-emerald-500" />
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Catatan Keterangan (Opsional):</label>
              <input
                v-model="formIncomeCatatan"
                type="text"
                placeholder="Catatan tambahan"
                class="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-slate-800 focus:outline-none focus:border-emerald-500" />
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
            <button @click="showIncomeModal = false" class="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-600 hover:bg-slate-50">Batal</button>
            <button @click="submitIncome" :disabled="!formIncomeNominal || !formIncomeSumber" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm shadow-emerald-500/20 disabled:opacity-50">Simpan Pendapatan</button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

const props = defineProps({
  checkHistory: { type: Array, default: () => [] },
  ledger: { type: Array, default: () => [] },
  nokosList: { type: Array, default: () => [] },
  incomeList: { type: Array, default: () => [] }
});

const emit = defineEmits(['addNokos', 'deleteNokos', 'addIncome', 'deleteIncome']);

const canvasRef = ref(null);
let chartInstance = null;
const timeframe = ref('weekly'); // 'weekly' | 'monthly'
const chartType = ref('spline'); // 'spline' | 'bar'

// Nokos Form Modal State
const showNokosModal = ref(false);
const formNokosTanggal = ref(new Date().toISOString().slice(0, 10));
const formNokosProvider = ref('');
const formNokosNominal = ref(null);
const formNokosCatatan = ref('');

// Income Form Modal State
const showIncomeModal = ref(false);
const formIncomeTanggal = ref(new Date().toISOString().slice(0, 10));
const formIncomeSumber = ref('');
const formIncomeNominal = ref(null);
const formIncomeCatatan = ref('');

const totalLedger = computed(() => props.ledger.length);
const newLedgerCount = computed(() => props.ledger.filter(l => l.setorStatus === 'new' || l.setorStatus === 'belum_disetor' || !l.setorStatus).length);

const totalNokosAmount = computed(() => props.nokosList.reduce((acc, curr) => acc + (Number(curr.nominal) || 0), 0));
const totalIncomeAmount = computed(() => props.incomeList.reduce((acc, curr) => acc + (Number(curr.nominal) || 0), 0));
const netProfit = computed(() => totalIncomeAmount.value - totalNokosAmount.value);

const profitMarginRatio = computed(() => {
  if (totalIncomeAmount.value === 0) return 0;
  const ratio = (netProfit.value / totalIncomeAmount.value) * 100;
  return Math.round(ratio);
});

function formatRupiah(amount) {
  if (amount === undefined || amount === null) return 'Rp 0';
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
}

function getWeeklyData() {
  const labels = [];
  const incomeData = [];
  const nokosData = [];

  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateIso = d.toISOString().slice(0, 10);
    const labelFormatted = d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' });
    labels.push(labelFormatted);

    const dayIncome = props.incomeList
      .filter(item => item.tanggal === dateIso)
      .reduce((sum, curr) => sum + (Number(curr.nominal) || 0), 0);
    incomeData.push(dayIncome);

    const dayNokos = props.nokosList
      .filter(item => item.tanggal === dateIso)
      .reduce((sum, curr) => sum + (Number(curr.nominal) || 0), 0);
    nokosData.push(dayNokos);
  }

  return { labels, incomeData, nokosData };
}

function getMonthlyData() {
  const currentYear = new Date().getFullYear();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'];
  const incomeData = new Array(12).fill(0);
  const nokosData = new Array(12).fill(0);

  props.incomeList.forEach(item => {
    if (item.tanggal) {
      const d = new Date(item.tanggal);
      if (d.getFullYear() === currentYear) {
        const m = d.getMonth();
        incomeData[m] += Number(item.nominal) || 0;
      }
    }
  });

  props.nokosList.forEach(item => {
    if (item.tanggal) {
      const d = new Date(item.tanggal);
      if (d.getFullYear() === currentYear) {
        const m = d.getMonth();
        nokosData[m] += Number(item.nominal) || 0;
      }
    }
  });

  return { labels: monthNames, incomeData, nokosData };
}

const activeChartData = computed(() => {
  return timeframe.value === 'weekly' ? getWeeklyData() : getMonthlyData();
});

const chartTotalIncome = computed(() => {
  return activeChartData.value.incomeData.reduce((a, b) => a + b, 0);
});

const chartTotalNokos = computed(() => {
  return activeChartData.value.nokosData.reduce((a, b) => a + b, 0);
});

const chartNetDiff = computed(() => {
  return chartTotalIncome.value - chartTotalNokos.value;
});

function renderChart() {
  if (!canvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const { labels, incomeData, nokosData } = activeChartData.value;
  const ctx = canvasRef.value.getContext('2d');

  // Multi-stop Gradient fill for Income (Emerald)
  const incomeGradient = ctx.createLinearGradient(0, 0, 0, 320);
  incomeGradient.addColorStop(0, 'rgba(16, 185, 129, 0.45)');
  incomeGradient.addColorStop(0.5, 'rgba(16, 185, 129, 0.15)');
  incomeGradient.addColorStop(1, 'rgba(16, 185, 129, 0.0)');

  // Multi-stop Gradient fill for Nokos Expense (Amber)
  const nokosGradient = ctx.createLinearGradient(0, 0, 0, 320);
  nokosGradient.addColorStop(0, 'rgba(245, 158, 11, 0.45)');
  nokosGradient.addColorStop(0.5, 'rgba(245, 158, 11, 0.15)');
  nokosGradient.addColorStop(1, 'rgba(245, 158, 11, 0.0)');

  const isBar = chartType.value === 'bar';

  const datasets = [
    {
      type: isBar ? 'bar' : 'line',
      label: 'Pendapatan Pemasukan (Rp)',
      data: incomeData,
      borderColor: '#10B981',
      borderWidth: 3,
      backgroundColor: isBar ? 'rgba(16, 185, 129, 0.85)' : incomeGradient,
      fill: !isBar,
      tension: 0.45,
      cubicInterpolationMode: 'monotone',
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#10B981',
      pointBorderWidth: 3,
      pointRadius: isBar ? 0 : 5,
      pointHoverRadius: 9,
      pointHoverBorderWidth: 4,
      borderRadius: isBar ? { topLeft: 8, topRight: 8, bottomLeft: 4, bottomRight: 4 } : 0,
      maxBarThickness: 36
    },
    {
      type: 'line',
      label: 'Top Up Nokos Pengeluaran (Rp)',
      data: nokosData,
      borderColor: '#F59E0B',
      borderWidth: 3,
      backgroundColor: nokosGradient,
      fill: true,
      tension: 0.45,
      cubicInterpolationMode: 'monotone',
      pointBackgroundColor: '#FFFFFF',
      pointBorderColor: '#F59E0B',
      pointBorderWidth: 3,
      pointRadius: 5,
      pointHoverRadius: 9,
      pointHoverBorderWidth: 4
    }
  ];

  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 900,
        easing: 'easeOutQuart'
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          align: 'end',
          labels: {
            font: { family: 'Plus Jakarta Sans, sans-serif', size: 12, weight: 'bold' },
            usePointStyle: true,
            boxWidth: 8,
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.94)',
          titleFont: { family: 'Plus Jakarta Sans, sans-serif', size: 13, weight: 'bold' },
          bodyFont: { family: 'JetBrains Mono, monospace', size: 12 },
          padding: 12,
          cornerRadius: 14,
          displayColors: true,
          callbacks: {
            label: function(context) {
              const val = context.parsed.y || 0;
              return ` ${context.dataset.label}: Rp ${val.toLocaleString('id-ID')}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { display: false },
          ticks: {
            font: { family: 'Plus Jakarta Sans, sans-serif', size: 11, weight: '600' },
            color: '#64748B'
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#F1F5F9',
            borderDash: [5, 5]
          },
          ticks: {
            font: { family: 'JetBrains Mono, monospace', size: 11 },
            color: '#64748B',
            callback: function(value) {
              if (value >= 1000000) return 'Rp ' + (value / 1000000).toFixed(1) + ' Jt';
              if (value >= 1000) return 'Rp ' + (value / 1000).toFixed(0) + ' Rb';
              return 'Rp ' + value;
            }
          }
        }
      }
    }
  });
}

onMounted(() => {
  renderChart();
});

watch([timeframe, chartType, () => props.incomeList, () => props.nokosList], () => {
  renderChart();
}, { deep: true });

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});

function submitNokos() {
  if (!formNokosNominal.value || !formNokosProvider.value) return;
  emit('addNokos', {
    id: Date.now() + Math.random(),
    tanggal: formNokosTanggal.value,
    provider: formNokosProvider.value.trim(),
    nominal: Number(formNokosNominal.value),
    catatan: formNokosCatatan.value.trim()
  });
  
  formNokosProvider.value = '';
  formNokosNominal.value = null;
  formNokosCatatan.value = '';
  showNokosModal.value = false;
}

function submitIncome() {
  if (!formIncomeNominal.value || !formIncomeSumber.value) return;
  emit('addIncome', {
    id: Date.now() + Math.random(),
    tanggal: formIncomeTanggal.value,
    sumber: formIncomeSumber.value.trim(),
    nominal: Number(formIncomeNominal.value),
    catatan: formIncomeCatatan.value.trim()
  });

  formIncomeSumber.value = '';
  formIncomeNominal.value = null;
  formIncomeCatatan.value = '';
  showIncomeModal.value = false;
}
</script>
