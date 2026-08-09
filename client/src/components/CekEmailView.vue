<template>
  <div class="space-y-6">
    <!-- Instruction Header -->
    <div class="px-1">
      <p class="text-xs text-slate-500 font-semibold">
        Input dalam format apa saja, dan sistem akan secara otomatis memfilter
        serta mengekstrak alamat email yang valid.
      </p>
    </div>

    <!-- Compact Input Card -->
    <div class="saas-card p-4 sm:p-5 space-y-3">
      <!-- Input Gmail Ribbon & Header Actions -->
      <div class="flex items-center justify-between">
        <!-- Ribbon Badge -->
        <div
          class="flex items-center gap-2.5 bg-slate-900 text-white px-3.5 py-1.5 rounded-r-xl rounded-l-md text-xs font-bold font-mono shadow-xs">
          <span>Input Gmail ({{ lineCount }})</span>
          <button
            @click="$emit('clearInput')"
            class="text-slate-400 hover:text-rose-400 transition cursor-pointer p-0.5"
            title="Bersihkan Input">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <polyline points="3 6 5 6 21 6" />
              <path
                d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
          </button>
        </div>

        <!-- Sample Load Button -->
        <button
          @click="$emit('loadSample')"
          class="text-xs font-bold text-blue-600 hover:text-blue-700 hover:underline cursor-pointer flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-3.5 h-3.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14 2 14 8 20 8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10 9 9 9 8 9" />
          </svg>
          <span>Muat Sampel Email</span>
        </button>
      </div>

      <!-- Compact Textarea with Drag & Drop -->
      <div
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        class="relative border-2 border-dashed rounded-xl transition-all duration-200"
        :class="
          isDragging
            ? 'border-blue-600 bg-blue-50/60'
            : 'border-slate-300 hover:border-slate-400 bg-slate-50/40'
        ">
        <textarea
          :value="inputText"
          @input="$emit('update:inputText', $event.target.value)"
          rows="6"
          placeholder="Tempel atau ketik alamat email di sini...&#10;Contoh: alex.developer@gmail.com&#10;support.team@gmail.com"
          class="w-full bg-transparent p-3.5 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white/80 rounded-xl transition resize-y leading-relaxed"></textarea>

        <!-- Drop Overlay Hint -->
        <div
          v-if="isDragging"
          class="absolute inset-0 bg-blue-600/10 backdrop-blur-2xs rounded-xl flex items-center justify-center text-blue-700 font-bold text-xs pointer-events-none">
          Lepaskan file .txt / .csv di sini
        </div>
      </div>

      <!-- Compact Action Controls Bar -->
      <div
        class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <!-- Hidden File Input -->
        <input
          type="file"
          ref="fileInputRef"
          accept=".txt,.csv"
          @change="handleFileUpload"
          class="hidden" />

        <!-- Upload File Button -->
        <button
          @click="triggerFileSelect"
          class="w-full sm:w-auto px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 transition cursor-pointer flex items-center justify-center gap-1.5 shadow-2xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-slate-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>Upload .txt / .csv</span>
        </button>

        <!-- Fast Check / Deep Check Toggle Switch -->
        <div
          class="flex items-center gap-2 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            @click="$emit('update:checkMode', 'deepcheck')"
            class="px-3 py-1 rounded-lg font-bold transition cursor-pointer"
            :class="
              checkMode === 'deepcheck'
                ? 'bg-white text-blue-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            ">
            DEEP CHECK
          </button>
          <button
            @click="$emit('update:checkMode', 'fastcheck')"
            class="px-3 py-1 rounded-lg font-bold transition cursor-pointer flex items-center gap-1"
            :class="
              checkMode === 'fastcheck'
                ? 'bg-white text-emerald-600 shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            ">
            <span>FAST CHECK</span>
            <span class="text-amber-500">⚡</span>
          </button>
        </div>

        <!-- Main Check Action Button -->
        <button
          v-if="isProcessing"
          @click="$emit('stopCheck')"
          class="w-full sm:w-auto min-w-[140px] px-6 py-2 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition cursor-pointer flex items-center justify-center gap-1.5 shadow-sm">
          <span>Stop Pengecekan</span>
        </button>

        <button
          v-else
          @click="$emit('startCheck')"
          :disabled="!inputText.trim()"
          class="w-full sm:w-auto min-w-[140px] px-6 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 shadow-sm">
          <span>Check</span>
        </button>
      </div>

      <!-- Centered Digital Timer Display Pill -->
      <div class="flex justify-center pt-2">
        <div
          class="bg-white border-2 border-slate-900 rounded-xl px-6 py-1.5 shadow-xs flex items-center gap-2">
          <span
            class="font-mono text-lg sm:text-xl font-black text-slate-900 tracking-widest leading-none">
            {{ timerDisplay }}
          </span>
          <span
            v-if="isProcessing"
            class="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
            Chunk {{ currentChunk }}/{{ totalChunks }} ({{ progressPercent }}%)
          </span>
        </div>
      </div>
    </div>

    <!-- Summary & Results Section -->
    <div class="space-y-4">
      <!-- Check Results Header Ribbon & Summary Counter Badges -->
      <div
        class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <!-- Check Results Ribbon -->
        <div
          class="bg-slate-900 text-white px-4 py-1.5 rounded-r-xl rounded-l-md text-xs font-extrabold font-mono shadow-xs self-start">
          Check Results
        </div>

        <!-- Colored Summary Counter Badges Bar -->
        <div
          class="flex items-center gap-1.5 flex-wrap text-[11px] font-mono font-bold">
          <span class="px-2.5 py-1 rounded-full bg-blue-600 text-white">
            Total: {{ summary.total }}
          </span>
          <span class="px-2.5 py-1 rounded-full bg-emerald-600 text-white">
            Live: {{ summary.live }}
          </span>
          <span class="px-2.5 py-1 rounded-full bg-rose-600 text-white">
            Disable: {{ summary.disable }}
          </span>
          <span class="px-2.5 py-1 rounded-full bg-amber-500 text-white">
            Verify: {{ summary.verify }}
          </span>
          <span class="px-2.5 py-1 rounded-full bg-slate-600 text-white">
            Unregistered: {{ summary.unregistered }}
          </span>
          <span class="px-2.5 py-1 rounded-full bg-cyan-600 text-white">
            Error: {{ summary.error }}
          </span>
        </div>
      </div>

      <!-- Results Table -->
      <div v-if="results.length > 0" class="saas-card overflow-hidden">
        <!-- Table Filter & Export Toolbar -->
        <div
          class="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/60">
          <!-- Filter Tabs -->
          <div
            class="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 overflow-x-auto">
            <button
              v-for="tab in filterTabs"
              :key="tab.value"
              @click="activeFilter = tab.value"
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap"
              :class="
                activeFilter === tab.value
                  ? 'bg-blue-600 text-white font-bold'
                  : 'text-slate-600 hover:text-slate-900'
              ">
              {{ tab.label }} ({{ getFilteredCount(tab.value) }})
            </button>
          </div>

          <!-- Search & Export Actions -->
          <div class="flex items-center gap-2 flex-wrap">
            <div class="relative flex-1 sm:w-44">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari..."
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

            <button
              @click="$emit('copyLive')"
              class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer">
              Salin Live
            </button>

            <button
              @click="$emit('exportTxt')"
              class="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 transition cursor-pointer">
              TXT
            </button>

            <button
              @click="$emit('exportCsv')"
              class="px-3 py-1.5 rounded-xl text-xs btn-primary cursor-pointer">
              CSV Report
            </button>
          </div>
        </div>

        <!-- Table View -->
        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs">
            <thead
              class="bg-slate-50 text-slate-500 font-mono uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th class="py-3 px-4 w-12">#</th>
                <th class="py-3 px-4">Email Address</th>
                <th class="py-3 px-4">Verification Status</th>
                <th class="py-3 px-4">Raw Response</th>
                <th class="py-3 px-4">MX Status</th>
                <th class="py-3 px-4">Checked At</th>
                <th class="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200/70 font-sans">
              <tr
                v-for="(row, idx) in filteredResults"
                :key="idx"
                class="hover:bg-slate-50/80 transition">
                <td class="py-3 px-4 font-mono text-slate-400">
                  {{ idx + 1 }}
                </td>
                <td class="py-3 px-4">
                  <div class="font-semibold text-slate-900 font-mono">
                    {{ row.email }}
                  </div>
                  <div class="text-[11px] text-slate-400 font-mono">
                    Domain: {{ row.domain || "-" }}
                  </div>
                </td>

                <!-- Status Badge -->
                <td class="py-3 px-4">
                  <span
                    class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase"
                    :class="getStatusBadgeClass(row.checkmailStatus)">
                    <span
                      class="w-1.5 h-1.5 rounded-full"
                      :class="getStatusDotClass(row.checkmailStatus)"></span>
                    {{ row.badgeLabel }}
                  </span>
                </td>

                <!-- Raw Status -->
                <td class="py-3 px-4 font-mono font-bold text-slate-700">
                  {{ row.rawStatus }}
                </td>

                <!-- MX Check Badge -->
                <td class="py-3 px-4">
                  <span
                    class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200 font-mono">
                    MX: {{ row.domain ? "VALID" : "INVALID" }}
                  </span>
                </td>

                <!-- Timestamp -->
                <td class="py-3 px-4 font-mono text-slate-500">
                  {{ row.checkedAt }}
                </td>

                <!-- Action Buttons -->
                <td class="py-3 px-4 text-right space-x-1.5">
                  <button
                    @click="$emit('openDetail', row)"
                    class="px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer whitespace-nowrap">
                    Detail Audit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  inputText: { type: String, default: "" },
  checkMode: { type: String, default: "deepcheck" },
  isProcessing: { type: Boolean, default: false },
  timerDisplay: { type: String, default: "00 : 00 : 00" },
  progressPercent: { type: Number, default: 0 },
  currentChunk: { type: Number, default: 0 },
  totalChunks: { type: Number, default: 0 },
  results: { type: Array, default: () => [] },
});

const emit = defineEmits([
  "update:inputText",
  "update:checkMode",
  "startCheck",
  "stopCheck",
  "loadSample",
  "clearInput",
  "openDetail",
  "copyLive",
  "exportTxt",
  "exportCsv",
]);

const fileInputRef = ref(null);
const isDragging = ref(false);
const activeFilter = ref("all");
const searchQuery = ref("");

const lineCount = computed(() => {
  if (!props.inputText) return 0;
  return props.inputText
    .split(/[\n,;]+/)
    .map((e) => e.trim())
    .filter((e) => e && e.includes("@")).length;
});

const filterTabs = [
  { label: "Semua", value: "all" },
  { label: "Live (Valid)", value: "live" },
  { label: "Verify Phone", value: "verify_phone" },
  { label: "Disabled (Die)", value: "die" },
  { label: "Unregistered", value: "not_exist" },
];

function triggerFileSelect() {
  if (fileInputRef.value) fileInputRef.value.click();
}

function handleFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  readFile(file);
}

function handleDrop(e) {
  isDragging.value = false;
  const file = e.dataTransfer.files[0];
  if (!file) return;
  readFile(file);
}

function readFile(file) {
  const reader = new FileReader();
  reader.onload = (evt) => {
    emit("update:inputText", evt.target.result);
  };
  reader.readAsText(file);
}

const summary = computed(() => {
  const total = props.results.length;
  const live = props.results.filter((r) => r.checkmailStatus === "live").length;
  const disable = props.results.filter(
    (r) => r.checkmailStatus === "die",
  ).length;
  const verify = props.results.filter(
    (r) => r.checkmailStatus === "verify_phone",
  ).length;
  const unregistered = props.results.filter(
    (r) => r.checkmailStatus === "not_exist",
  ).length;
  const error = props.results.filter(
    (r) => r.checkmailStatus === "error",
  ).length;

  return { total, live, disable, verify, unregistered, error };
});

const filteredResults = computed(() => {
  let list = props.results;
  if (activeFilter.value !== "all") {
    list = list.filter((r) => r.checkmailStatus === activeFilter.value);
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (r) =>
        r.email.toLowerCase().includes(q) || r.domain.toLowerCase().includes(q),
    );
  }
  return list;
});

function getFilteredCount(val) {
  if (val === "all") return props.results.length;
  return props.results.filter((r) => r.checkmailStatus === val).length;
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
    case "error":
    default:
      return "badge-unregistered";
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
</script>
