<template>
  <div class="space-y-6">
    
    <!-- Top Summary Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      
      <!-- Total Pendapatan Card -->
      <div class="saas-card p-5 border-l-4 border-l-emerald-500">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Pendapatan</span>
          <span class="p-2 rounded-xl bg-emerald-50 text-emerald-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </span>
        </div>
        <span class="text-2xl font-black text-emerald-700 font-mono mt-2 block">{{ formatRupiah(totalIncomeAmount) }}</span>
        <span class="text-[11px] text-emerald-600 font-semibold mt-2 block">{{ incomeList.length }}x transaksi pemasukan</span>
      </div>

      <!-- Total Top Up Nokos Card -->
      <div class="saas-card p-5 border-l-4 border-l-amber-500">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Top Up Nokos</span>
          <span class="p-2 rounded-xl bg-amber-50 text-amber-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
          </span>
        </div>
        <span class="text-2xl font-black text-amber-800 font-mono mt-2 block">{{ formatRupiah(totalNokosAmount) }}</span>
        <span class="text-[11px] text-amber-700 font-semibold mt-2 block">{{ nokosList.length }}x pengeluaran top up</span>
      </div>

      <!-- Net Profit / Margin Card -->
      <div class="saas-card p-5 border-l-4" :class="netProfit >= 0 ? 'border-l-blue-600' : 'border-l-rose-500'">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Keuntungan Bersih (Net)</span>
          <span class="p-2 rounded-xl" :class="netProfit >= 0 ? 'bg-blue-50 text-blue-600' : 'bg-rose-50 text-rose-600'">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
          </span>
        </div>
        <span class="text-2xl font-black font-mono mt-2 block" :class="netProfit >= 0 ? 'text-blue-700' : 'text-rose-700'">
          {{ formatRupiah(netProfit) }}
        </span>
        <span class="text-[11px] font-semibold mt-2 block" :class="netProfit >= 0 ? 'text-blue-600' : 'text-rose-600'">
          {{ netProfit >= 0 ? 'Pendapatan Bersih Surplus' : 'Defisit Pengeluaran' }}
        </span>
      </div>

      <!-- Total Ledger Email Card -->
      <div class="saas-card p-5 border-l-4 border-l-purple-500">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Ledger Email</span>
          <span class="p-2 rounded-xl bg-purple-50 text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
          </span>
        </div>
        <span class="text-2xl font-black text-purple-700 font-mono mt-2 block">{{ totalLedger }}</span>
        <span class="text-[11px] text-purple-600 font-semibold mt-2 block">{{ newLedgerCount }} email status NEW</span>
      </div>
    </div>

    <!-- Chart.js Dual-Dataset Financial Comparison Chart -->
    <div class="saas-card p-6 space-y-4">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
            Grafik Monitoring Perbandingan (Pendapatan vs Top Up Nokos)
          </h3>
          <p class="text-xs text-slate-500">Perbandingan visual 2 warna antara Pemasukan (Hijau) & Pengeluaran Nokos (Oranye).</p>
        </div>

        <!-- Timeframe Toggle Switcher -->
        <div class="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          <button
            @click="timeframe = 'weekly'"
            class="px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
            :class="timeframe === 'weekly' ? 'bg-white text-slate-900 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-900'">
            📅 7 Hari Terakhir
          </button>
          <button
            @click="timeframe = 'monthly'"
            class="px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
            :class="timeframe === 'monthly' ? 'bg-white text-slate-900 shadow-xs font-extrabold' : 'text-slate-500 hover:text-slate-900'">
            📆 Grafik Bulanan
          </button>
        </div>
      </div>

      <!-- Chart Canvas Container -->
      <div class="h-72 w-full relative">
        <canvas ref="canvasRef"></canvas>
      </div>
    </div>

    <!-- Side-by-Side Tables: Catatan Top Up Nokos & Catatan Pendapatan -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      <!-- Table 1: Catatan Top Up Nokos -->
      <div class="saas-card p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
            Catatan Top Up Nokos
          </h3>

          <button
            @click="showNokosModal = true"
            class="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1">
            <span>+ Top Up Nokos</span>
          </button>
        </div>

        <div v-if="nokosList.length > 0" class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-amber-50/70 text-amber-900 font-mono uppercase tracking-wider border-b border-amber-200">
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
                <td class="py-2.5 px-3 font-mono text-slate-700">{{ item.tanggal }}</td>
                <td class="py-2.5 px-3">
                  <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900">
                    {{ item.provider }}
                  </span>
                </td>
                <td class="py-2.5 px-3 font-mono font-extrabold text-amber-700">
                  {{ formatRupiah(item.nominal) }}
                </td>
                <td class="py-2.5 px-3 text-slate-600">{{ item.catatan || '-' }}</td>
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

        <div v-else class="py-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
          Belum ada catatan top up nokos.
        </div>
      </div>

      <!-- Table 2: Catatan Pendapatan (Pemasukan) -->
      <div class="saas-card p-6 space-y-4">
        <div class="flex items-center justify-between border-b border-slate-200 pb-3">
          <h3 class="font-bold text-slate-900 text-sm flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            Catatan Pendapatan Saya
          </h3>

          <button
            @click="showIncomeModal = true"
            class="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center gap-1">
            <span>+ Catat Pendapatan</span>
          </button>
        </div>

        <div v-if="incomeList.length > 0" class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead class="bg-emerald-50/70 text-emerald-900 font-mono uppercase tracking-wider border-b border-emerald-200">
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
                <td class="py-2.5 px-3 font-mono text-slate-700">{{ item.tanggal }}</td>
                <td class="py-2.5 px-3">
                  <span class="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-900">
                    {{ item.sumber }}
                  </span>
                </td>
                <td class="py-2.5 px-3 font-mono font-extrabold text-emerald-700">
                  {{ formatRupiah(item.nominal) }}
                </td>
                <td class="py-2.5 px-3 text-slate-600">{{ item.catatan || '-' }}</td>
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

        <div v-else class="py-6 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
          Belum ada catatan pendapatan.
        </div>
      </div>
    </div>

    <!-- Modal Form Tambah Catatan Top Up Nokos -->
    <Teleport to="body">
      <div v-if="showNokosModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="showNokosModal = false" class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"></div>
        <div class="relative bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4 z-50">
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
            <button @click="submitNokos" :disabled="!formNokosNominal || !formNokosProvider" class="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 disabled:opacity-50">Simpan Nokos</button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Modal Form Tambah Catatan Pendapatan -->
    <Teleport to="body">
      <div v-if="showIncomeModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div @click="showIncomeModal = false" class="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"></div>
        <div class="relative bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4 z-50">
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
                placeholder="Contoh: Jasa Verifikasi / Penjualan Akun / Klien X"
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
            <button @click="submitIncome" :disabled="!formIncomeNominal || !formIncomeSumber" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50">Simpan Pendapatan</button>
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
const newLedgerCount = computed(() => props.ledger.filter(l => l.setorStatus === 'new' || !l.setorStatus).length);

const totalNokosAmount = computed(() => props.nokosList.reduce((acc, curr) => acc + (Number(curr.nominal) || 0), 0));
const totalIncomeAmount = computed(() => props.incomeList.reduce((acc, curr) => acc + (Number(curr.nominal) || 0), 0));
const netProfit = computed(() => totalIncomeAmount.value - totalNokosAmount.value);

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

function renderChart() {
  if (!canvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const { labels, incomeData, nokosData } = timeframe.value === 'weekly' ? getWeeklyData() : getMonthlyData();

  const ctx = canvasRef.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Pendapatan (Pemasukan)',
          data: incomeData,
          borderColor: '#10B981', // Emerald 500
          backgroundColor: 'rgba(16, 185, 129, 0.15)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: 'Top Up Nokos (Pengeluaran)',
          data: nokosData,
          borderColor: '#F59E0B', // Amber 500
          backgroundColor: 'rgba(245, 158, 11, 0.15)',
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: { family: 'Inter, sans-serif', size: 12, weight: 'bold' },
            usePointStyle: true,
            boxWidth: 8
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const val = context.parsed.y || 0;
              return `${context.dataset.label}: Rp ${val.toLocaleString('id-ID')}`;
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
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

watch([timeframe, () => props.incomeList, () => props.nokosList], () => {
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
