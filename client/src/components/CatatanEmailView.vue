<template>
  <div class="space-y-6">
    <!-- Top Ledger Stats Summary -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      <!-- 1. Total Ledger Card -->
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-4 text-white shadow-md shadow-slate-950/20 hover:shadow-lg transition-all duration-200 group">
        <div
          class="absolute -right-4 -bottom-4 w-16 h-16 bg-blue-500/20 rounded-full blur-xl group-hover:bg-blue-500/30 transition"></div>
        <div class="flex items-center justify-between relative z-10">
          <span
            class="text-[10px] font-extrabold text-blue-200 uppercase tracking-wider block"
            >Total Ledger</span
          >
          <span
            class="w-6 h-6 rounded-lg bg-white/10 backdrop-blur-md text-blue-300 flex items-center justify-center text-[10px] font-bold"
            >#</span
          >
        </div>
        <div class="mt-2 relative z-10">
          <span
            class="text-xl font-black font-mono tracking-tight text-white block"
            >{{ ledger.length }}</span
          >
          <span class="text-[9px] text-blue-200/80 font-medium mt-1 block"
            >Database Email Unik</span
          >
        </div>
      </div>

      <!-- 2. NEW Card -->
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-500/10 via-white to-slate-500/5 p-4 border border-slate-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between relative z-10">
          <span
            class="text-[10px] font-extrabold text-slate-700 uppercase tracking-wider block"
            >NEW (Kosong)</span
          >
          <span class="w-2 h-2 rounded-full bg-slate-400"></span>
        </div>
        <div class="mt-2 relative z-10">
          <span
            class="text-xl font-black text-slate-900 font-mono tracking-tight block"
            >{{ newCount }}</span
          >
          <span class="text-[9px] text-slate-500 font-semibold mt-1 block"
            >Belum Di-Set Status</span
          >
        </div>
      </div>

      <!-- 3. Siap Setor Card -->
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/10 via-white to-blue-500/5 p-4 border border-blue-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between relative z-10">
          <span
            class="text-[10px] font-extrabold text-blue-800 uppercase tracking-wider block"
            >Siap Setor</span
          >
          <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
        </div>
        <div class="mt-2 relative z-10">
          <span
            class="text-xl font-black text-slate-900 font-mono tracking-tight block"
            >{{ siapSetorCount }}</span
          >
          <span class="text-[9px] text-blue-700 font-semibold mt-1 block"
            >Siap Diproses</span
          >
        </div>
      </div>

      <!-- 4. Setor Tgl Card -->
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/10 via-white to-indigo-500/5 p-4 border border-indigo-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between relative z-10">
          <span
            class="text-[10px] font-extrabold text-indigo-800 uppercase tracking-wider block"
            >Setor Tgl...</span
          >
          <span class="w-2 h-2 rounded-full bg-indigo-500"></span>
        </div>
        <div class="mt-2 relative z-10">
          <span
            class="text-xl font-black text-slate-900 font-mono tracking-tight block"
            >{{ setorTglCount }}</span
          >
          <span class="text-[9px] text-indigo-700 font-semibold mt-1 block"
            >Jadwal Tanggal</span
          >
        </div>
      </div>

      <!-- 5. Sudah Setor Card -->
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white to-emerald-500/5 p-4 border border-emerald-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between relative z-10">
          <span
            class="text-[10px] font-extrabold text-emerald-800 uppercase tracking-wider block"
            >Sudah Setor</span
          >
          <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        </div>
        <div class="mt-2 relative z-10">
          <span
            class="text-xl font-black text-slate-900 font-mono tracking-tight block"
            >{{ sudahSetorCount }}</span
          >
          <span class="text-[9px] text-emerald-700 font-semibold mt-1 block"
            >Telah Disetorkan</span
          >
        </div>
      </div>

      <!-- 6. Akun Ortu Card -->
      <div
        class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500/10 via-white to-purple-500/5 p-4 border border-purple-200/80 shadow-xs hover:shadow-md transition-all duration-200 group">
        <div class="flex items-center justify-between relative z-10">
          <span
            class="text-[10px] font-extrabold text-purple-800 uppercase tracking-wider block"
            >Akun Ortu</span
          >
          <span class="w-2 h-2 rounded-full bg-purple-500"></span>
        </div>
        <div class="mt-2 relative z-10">
          <span
            class="text-xl font-black text-slate-900 font-mono tracking-tight block"
            >{{ akunOrtuCount }}</span
          >
          <span class="text-[9px] text-purple-700 font-semibold mt-1 block"
            >Kategori Akun Ortu</span
          >
        </div>
      </div>
    </div>

    <!-- Collapsible Bulk Status Input Card (Bisa di-hide / show agar tidak menuhin tampilan) -->
    <div class="saas-card overflow-hidden transition-all duration-200">
      <!-- Header Bar: Tombol Toggle Utama -->
      <div
        class="px-4 py-3 sm:px-5 flex items-center justify-between transition select-none"
        :class="isBulkOpen ? 'border-b border-slate-200/80 bg-slate-50/60' : 'bg-white hover:bg-slate-50/80'">
        
        <!-- Tombol Ubah Status Massal (yang bisa menghide/show tampilan) -->
        <div class="flex items-center gap-3">
          <button
            @click="isBulkOpen = !isBulkOpen"
            type="button"
            class="flex items-center gap-2.5 bg-slate-900 hover:bg-slate-800 active:scale-98 text-white px-3.5 py-1.5 rounded-r-xl rounded-l-md text-xs font-bold font-mono shadow-xs transition cursor-pointer group"
            :title="isBulkOpen ? 'Klik untuk sembunyikan form input massal' : 'Klik untuk tampilkan form input massal'">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5 text-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
            </svg>
            <span>Ubah Status Massal ({{ bulkInputCount }})</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-transform duration-200"
              :class="isBulkOpen ? 'rotate-180' : ''"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          <span
            @click="isBulkOpen = !isBulkOpen"
            class="text-xs text-slate-500 hover:text-slate-800 cursor-pointer font-medium hidden sm:inline transition">
            {{ isBulkOpen ? 'Klik untuk sembunyikan form' : 'Klik untuk membuka input email massal' }}
          </span>
        </div>

        <!-- Right Side: Actions (ketika terbuka) atau tombol Toggle -->
        <div class="flex items-center gap-2 sm:gap-3">
          <!-- Sample Load Button (hanya saat form terbuka) -->
          <button
            v-if="isBulkOpen"
            @click="loadSampleBulkEmails"
            type="button"
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
            <span class="hidden sm:inline">Muat Sampel Email</span>
          </button>

          <!-- Paste from clipboard button (hanya saat form terbuka) -->
          <button
            v-if="isBulkOpen"
            @click="pasteFromClipboard"
            type="button"
            class="text-xs font-bold text-slate-600 hover:text-blue-600 cursor-pointer hidden md:flex items-center gap-1 transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3.5 h-3.5 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2">
              <path
                d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
            </svg>
            <span>Paste Clipboard</span>
          </button>

          <!-- Clear text button (hanya saat form terbuka dan ada teks) -->
          <button
            v-if="isBulkOpen && bulkText"
            @click="bulkText = ''"
            type="button"
            class="text-xs text-rose-500 hover:text-rose-700 font-semibold cursor-pointer flex items-center gap-1 p-1">
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
            <span>Bersihkan</span>
          </button>

          <!-- Toggle Button Text: Buka / Sembunyikan -->
          <button
            @click="isBulkOpen = !isBulkOpen"
            type="button"
            class="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2.5 py-1 rounded-lg transition cursor-pointer flex items-center gap-1">
            <span>{{ isBulkOpen ? 'Sembunyikan' : 'Buka Form' }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-3 h-3 transition-transform duration-200"
              :class="isBulkOpen ? 'rotate-180' : ''"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Collapsible Body (Textarea & Controls) -->
      <div v-show="isBulkOpen" class="p-4 sm:p-5 space-y-3 animate-fadeIn">
        <!-- Compact Textarea with Drag & Drop -->
        <div
          @dragover.prevent="isDraggingBulk = true"
          @dragleave.prevent="isDraggingBulk = false"
          @drop.prevent="handleBulkDrop"
          class="relative border-2 border-dashed rounded-xl transition-all duration-200"
          :class="
            isDraggingBulk
              ? 'border-blue-600 bg-blue-50/60'
              : 'border-slate-300 hover:border-slate-400 bg-slate-50/40'
          ">
          <textarea
            v-model="bulkText"
            rows="5"
            placeholder="Tempel atau ketik daftar email di sini untuk ubah status secara massal...&#10;Format apa saja (1 per baris, email|password, dll)&#10;Contoh:&#10;alex.developer@gmail.com&#10;support.team@gmail.com|pass123"
            class="w-full bg-transparent p-3.5 text-xs font-mono text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white/80 rounded-xl transition resize-y leading-relaxed"></textarea>

          <!-- Drop Overlay Hint -->
          <div
            v-if="isDraggingBulk"
            class="absolute inset-0 bg-blue-600/10 backdrop-blur-2xs rounded-xl flex items-center justify-center text-blue-700 font-bold text-xs pointer-events-none">
            Lepaskan file .txt / .csv di sini
          </div>
        </div>

        <!-- Action Controls Bar -->
        <div
          class="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <!-- Left: Upload Button & Auto-add Checkbox -->
          <div class="flex items-center gap-3 w-full sm:w-auto flex-wrap">
            <!-- Hidden File Input -->
            <input
              type="file"
              ref="bulkFileInputRef"
              accept=".txt,.csv"
              @change="handleBulkFileUpload"
              class="hidden" />

            <!-- Upload File Button -->
            <button
              @click="triggerBulkFileSelect"
              type="button"
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

            <!-- Checkbox: Otomatis Tambah jika belum ada -->
            <label
              class="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer select-none">
              <input
                type="checkbox"
                v-model="autoAddIfNotFound"
                class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer" />
              <span>Otomatis simpan jika belum ada di database</span>
            </label>
          </div>

          <!-- Right: Status Target Selector + Tombol Ubah Sudah Setor -->
          <div
            class="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
            <!-- Target Status Dropdown (Default: Sudah Setor) -->
            <div class="flex items-center gap-1.5">
              <span class="text-xs text-slate-500 font-medium hidden sm:inline">Ubah ke:</span>
              <select
                v-model="selectedBulkTargetStatus"
                class="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer focus:outline-none shadow-2xs">
                <option value="sudah_setor">✅ Sudah Setor</option>
                <option value="siap_setor">🔵 Siap Setor</option>
                <option value="setor_tgl">📅 Setor Tgl...</option>
                <option value="akun_ortu">👨‍👩‍👧 Akun Ortu</option>
                <option value="new">⚪ NEW (Kosong)</option>
              </select>
            </div>

            <!-- Date Picker when Setor Tgl selected -->
            <input
              v-if="selectedBulkTargetStatus === 'setor_tgl'"
              type="date"
              v-model="bulkCustomDate"
              class="px-2.5 py-1.5 rounded-xl text-xs bg-white border border-slate-300 font-mono text-slate-700 shadow-2xs focus:outline-none focus:border-blue-500" />

            <!-- Main Button: Ubah Sudah Setor (Emerald) -->
            <button
              v-if="selectedBulkTargetStatus === 'sudah_setor'"
              @click="executeBulkStatusChange('sudah_setor')"
              :disabled="bulkInputCount === 0"
              type="button"
              class="w-full sm:w-auto min-w-[165px] px-5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Ubah Sudah Setor</span>
              <span
                v-if="bulkInputCount > 0"
                class="ml-0.5 bg-emerald-700/90 text-[10px] font-mono px-1.5 py-0.5 rounded-md">
                {{ bulkInputCount }}
              </span>
            </button>

            <!-- Alternative Button when other status is selected -->
            <button
              v-else
              @click="executeBulkStatusChange(selectedBulkTargetStatus)"
              :disabled="bulkInputCount === 0"
              type="button"
              class="w-full sm:w-auto min-w-[165px] px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 active:scale-98 text-white transition cursor-pointer flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
              <span>Ubah Status</span>
              <span
                v-if="bulkInputCount > 0"
                class="ml-0.5 bg-blue-700/90 text-[10px] font-mono px-1.5 py-0.5 rounded-md">
                {{ bulkInputCount }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Execution Feedback Banner -->
      <div
        v-if="bulkExecutionResult"
        class="m-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between animate-fadeIn">
        <div class="flex items-center gap-2 font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4 text-emerald-600 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>{{ bulkExecutionResult }}</span>
        </div>
        <button
          @click="bulkExecutionResult = null"
          type="button"
          class="text-emerald-500 hover:text-emerald-700 cursor-pointer p-1">
          ✕
        </button>
      </div>
    </div>

    <!-- Main Ledger Table Container -->
    <div class="saas-card overflow-hidden">
      <!-- Table Filters & Batch Controls (2-Row DataTables Layout) -->
      <div class="p-4 border-b border-slate-200 bg-slate-50/70 space-y-3">
        <!-- Row 1: Filter Tabs + DataTables Length & Live Search -->
        <div
          class="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <!-- 4 Filter Tabs -->
          <div
            class="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 overflow-x-auto shadow-2xs">
            <button
              v-for="tab in filterTabs"
              :key="tab.value"
              @click="activeFilter = tab.value"
              class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer whitespace-nowrap"
              :class="
                activeFilter === tab.value
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              ">
              {{ tab.label }} ({{ getFilterCount(tab.value) }})
            </button>
          </div>

          <!-- Right: DataTables Length Select & Live Search -->
          <div class="flex items-center gap-3 flex-wrap">
            <!-- DataTables Page Size Select -->
            <div
              class="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <span>Tampilkan:</span>
              <select
                v-model.number="pageSize"
                class="bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs">
                <option :value="10">10</option>
                <option :value="25">25</option>
                <option :value="50">50</option>
                <option :value="100">100</option>
                <option :value="999999">Semua</option>
              </select>
            </div>

            <!-- Live Search Bar -->
            <div class="relative flex-1 sm:w-52">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Cari email / pass..."
                class="w-full bg-white border border-slate-300 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 transition shadow-2xs" />
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
          </div>
        </div>

        <!-- Row 2: Batch Actions Controls & Export -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200/80">
          <div class="flex items-center gap-2 flex-wrap">
            <!-- Bulk Keterangan Selector -->
            <select
              @change="
                handleBatchKeterangan($event.target.value);
                $event.target.value = '';
              "
              :disabled="selectedEmails.length === 0"
              class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:opacity-40 focus:outline-none shadow-2xs">
              <option value="" disabled selected>
                Ubah Status ({{ selectedEmails.length }}) ▼
              </option>
              <option value="new">⚪ Set NEW</option>
              <option value="siap_setor">🔵 Set Siap Setor</option>
              <option value="setor_tgl">📅 Set Setor Tgl...</option>
              <option value="sudah_setor">✅ Set Sudah Setor</option>
              <option value="akun_ortu">👨‍👩‍👧 Set Akun Ortu</option>
            </select>

            <!-- Bulk Password Modifier Button -->
            <button
              @click="handleBatchPassword"
              :disabled="selectedEmails.length === 0"
              class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:opacity-40 flex items-center gap-1 shadow-2xs">
              <span>🔑 Ubah Password ({{ selectedEmails.length }})</span>
            </button>

            <!-- Bulk Verification Button -->
            <button
              @click="$emit('checkSelectedLedger', selectedEmails)"
              :disabled="selectedEmails.length === 0"
              class="px-3.5 py-1.5 rounded-xl text-xs font-bold btn-primary cursor-pointer disabled:opacity-40 shadow-2xs">
              <span>Cek ({{ selectedEmails.length }})</span>
            </button>

            <!-- Tombol Show List Email Terpilih -->
            <button
              @click="openShowEmailsModal"
              :disabled="selectedEmails.length === 0"
              class="px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 transition cursor-pointer disabled:opacity-40 flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
              title="Tampilkan daftar email terpilih untuk disalin">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3.5 h-3.5 text-blue-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span>Show</span>
            </button>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <!-- Switch Radio Toggle: Live -->
            <label
              class="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition shadow-2xs select-none whitespace-nowrap"
              title="Filter hanya email status Live">
              <input
                type="checkbox"
                v-model="onlyLiveFilter"
                @change="handleLiveFilterToggle"
                class="sr-only peer" />
              <div
                class="w-6 h-3.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.5px] after:left-[1.5px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:bg-emerald-500 relative"></div>
              <span
                class="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                <span>Live ({{ liveInLedgerCount }})</span>
              </span>
            </label>

            <!-- Switch Radio Toggle: Die (DISABLED / DIE) -->
            <label
              class="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-slate-300 rounded-xl cursor-pointer hover:bg-slate-50 transition shadow-2xs select-none whitespace-nowrap"
              title="Filter hanya email status DISABLED (DIE)">
              <input
                type="checkbox"
                v-model="onlyDieFilter"
                @change="handleDieFilterToggle"
                class="sr-only peer" />
              <div
                class="w-6 h-3.5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1.5px] after:left-[1.5px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-2.5 after:w-2.5 after:transition-all peer-checked:bg-rose-500 relative"></div>
              <span
                class="text-xs font-bold text-slate-700 flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                <span>Die ({{ dieInLedgerCount }})</span>
              </span>
            </label>

            <!-- Segmented 3-Way Switch: Verif | All | Clean -->
            <div
              class="inline-flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-300 text-xs shadow-2xs select-none"
              title="Filter status verifikasi: Verif (Merah), All (Semua), Clean (Aman/Hijau)">
              <button
                type="button"
                @click="verifFilterMode = 'verif'"
                class="px-2 py-1 rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1 whitespace-nowrap"
                :class="
                  verifFilterMode === 'verif'
                    ? 'bg-rose-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                "
                title="Hanya tampilkan email yang butuh/terkena Verif">
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="verifFilterMode === 'verif' ? 'bg-white' : 'bg-rose-500'"></span>
                <span>Verif ({{ verifInLedgerCount }})</span>
              </button>

              <button
                type="button"
                @click="verifFilterMode = 'all'"
                class="px-2 py-1 rounded-lg transition-all duration-150 cursor-pointer whitespace-nowrap"
                :class="
                  verifFilterMode === 'all'
                    ? 'bg-white text-slate-900 font-bold shadow-xs border border-slate-200/80'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                "
                title="Tampilkan semua (Verif & Clean)">
                <span>All</span>
              </button>

              <button
                type="button"
                @click="verifFilterMode = 'no_verif'"
                class="px-2 py-1 rounded-lg transition-all duration-150 cursor-pointer flex items-center gap-1 whitespace-nowrap"
                :class="
                  verifFilterMode === 'no_verif'
                    ? 'bg-emerald-600 text-white font-bold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 font-medium'
                "
                title="Hanya tampilkan email clean (tanpa captcha/aman)">
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="verifFilterMode === 'no_verif' ? 'bg-white' : 'bg-emerald-500'"></span>
                <span>Clean ({{ noVerifInLedgerCount }})</span>
              </button>
            </div>

            <!-- Export Excel Button -->
            <button
              @click="exportLedgerExcel"
              class="px-3.5 py-1.5 rounded-xl text-xs btn-secondary cursor-pointer flex items-center gap-1">
              <span>Ekspor .xlsx</span>
            </button>

            <!-- Clear Ledger Button -->
            <button
              @click="$emit('clearLedger')"
              :disabled="ledger.length === 0"
              class="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-white text-rose-600 border border-slate-200 hover:bg-rose-50 transition cursor-pointer disabled:opacity-40">
              Kosongkan
            </button>
          </div>
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
                    <i
                      :class="
                        showAllPasswords
                          ? 'fa-solid fa-eye-slash text-blue-600'
                          : 'fa-solid fa-eye'
                      "></i>
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
              v-for="row in paginatedLedger"
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
                <div
                  v-if="row.password"
                  class="flex items-center gap-1.5 max-w-[130px]">
                  <span
                    class="text-xs font-semibold text-slate-800 truncate font-mono select-all">
                    {{
                      isPasswordVisible(row.email) ? row.password : "••••••••"
                    }}
                  </span>
                  <button
                    @click="toggleShowPassword(row.email)"
                    type="button"
                    class="text-slate-400 hover:text-blue-600 text-xs p-0.5 cursor-pointer flex-shrink-0"
                    title="Intip Password">
                    <i
                      :class="
                        isPasswordVisible(row.email)
                          ? 'fa-solid fa-eye-slash text-blue-600'
                          : 'fa-solid fa-eye'
                      "></i>
                  </button>
                  <button
                    @click="copyPasswordText(row.password)"
                    type="button"
                    class="text-slate-400 hover:text-emerald-600 text-xs p-0.5 cursor-pointer flex-shrink-0"
                    title="Salin Password">
                    <i class="fa-solid fa-copy"></i>
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

              <!-- Action Row: Verif (V), Banding (B), Cek Live, Delete -->
              <td class="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                <!-- Checklist Verif (V) -->
                <button
                  @click="toggleRowVerif(row)"
                  type="button"
                  title="Verif (Kena Verifikasi / Captcha)"
                  :class="
                    row.isVerif
                      ? 'bg-rose-600 text-white border-rose-600 shadow-xs ring-2 ring-rose-200'
                      : 'bg-white text-slate-400 border-slate-300 hover:border-rose-400 hover:text-rose-600 hover:bg-rose-50/50'
                  "
                  class="w-8 h-8 rounded-lg text-xs font-black border transition cursor-pointer inline-flex items-center justify-center shadow-2xs">
                  <span class="text-xs font-bold font-mono">V</span>
                </button>

                <!-- Checklist Banding (B) -->
                <button
                  @click="toggleRowBanding(row)"
                  type="button"
                  title="Banding"
                  :class="
                    row.isBanding
                      ? 'bg-amber-500 text-white border-amber-500 shadow-xs ring-2 ring-amber-200'
                      : 'bg-white text-slate-400 border-slate-300 hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50/50'
                  "
                  class="w-8 h-8 rounded-lg text-xs font-black border transition cursor-pointer inline-flex items-center justify-center shadow-2xs">
                  <span class="text-xs font-bold font-mono">B</span>
                </button>

                <!-- Cek Live Single -->
                <button
                  @click="$emit('verifySingleInLedger', row.email)"
                  title="Cek Live Check Sekarang"
                  class="w-8 h-8 rounded-lg text-xs btn-primary cursor-pointer inline-flex items-center justify-center shadow-2xs">
                  <i class="fa-solid fa-rotate-right"></i>
                </button>

                <!-- Hapus Single -->
                <button
                  @click="deleteFromLedger(row.email)"
                  title="Hapus dari Catatan"
                  class="w-8 h-8 rounded-lg text-xs bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 transition cursor-pointer inline-flex items-center justify-center shadow-2xs">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- DataTables Footer: Info Entries & Pagination Controls -->
      <div
        v-if="filteredLedger.length > 0"
        class="px-4 py-3 border-t border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div>
          Menampilkan
          <span class="font-bold text-slate-800">{{ startEntryIndex }}</span>
          sampai
          <span class="font-bold text-slate-800">{{ endEntryIndex }}</span> dari
          <span class="font-bold text-slate-800">{{ totalFilteredCount }}</span>
          total data
        </div>

        <!-- DataTables Pagination Buttons -->
        <div v-if="totalPages > 1" class="flex items-center gap-1">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 font-semibold cursor-pointer">
            Sebelumnya
          </button>

          <button
            v-for="p in totalPages"
            :key="p"
            @click="currentPage = p"
            class="px-2.5 py-1 rounded-lg text-xs font-bold transition cursor-pointer"
            :class="
              currentPage === p
                ? 'bg-blue-600 text-white shadow-2xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            ">
            {{ p }}
          </button>

          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 font-semibold cursor-pointer">
            Selanjutnya
          </button>
        </div>
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
          {{
            props.ledger.length === 0
              ? "Catatan Email Ledger Masih Kosong"
              : "Tidak Ada Data yang Sesuai Filter"
          }}
        </h4>
        <p class="text-xs text-slate-400 max-w-sm mx-auto">
          {{
            props.ledger.length === 0
              ? "Tambahkan email pada formulir di atas untuk mengelola catatan email disetor / belum disetor beserta tanggal setomya."
              : "Coba ubah tab status, reset pencarian, atau nonaktifkan filter Live Only / Die Only / No Verif."
          }}
        </p>
      </div>
    </div>

    <!-- Modal Pop-up: Tampilkan & Salin Daftar Email Terpilih -->
    <div
      v-if="showEmailsModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      @click.self="showEmailsModal = false">
      <div
        class="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-3xl w-full overflow-hidden flex flex-col max-h-[92vh]">
        <!-- Header Modal -->
        <div
          class="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div class="flex items-center gap-2.5">
            <div
              class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-2xs">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path
                  d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h3 class="text-base font-bold text-slate-900">
                  Daftar Email Terpilih
                </h3>
                <span
                  class="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-blue-100 text-blue-700">
                  {{ selectedEmails.length }} Email
                </span>
              </div>
              <p class="text-xs text-slate-500">
                Daftar email siap disalin ke clipboard atau diekstrak secara massal.
              </p>
            </div>
          </div>
          <button
            @click="showEmailsModal = false"
            class="text-slate-400 hover:text-slate-600 w-9 h-9 rounded-xl flex items-center justify-center hover:bg-slate-100 transition cursor-pointer font-bold text-base">
            ✕
          </button>
        </div>

        <!-- Format Options Bar -->
        <div
          class="px-5 sm:px-6 py-3 bg-slate-50/60 border-b border-slate-100 flex items-center justify-between gap-3 flex-wrap">
          <div class="flex items-center gap-2.5 text-xs text-slate-600">
            <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Format:</span>
            <div class="inline-flex rounded-lg border border-slate-200 bg-white p-0.5 shadow-2xs">
              <button
                type="button"
                @click="copyFormat = 'email_only'"
                class="px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer"
                :class="
                  copyFormat === 'email_only'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                ">
                Hanya Email
              </button>
              <button
                type="button"
                @click="copyFormat = 'email_pass'"
                class="px-3 py-1 rounded-md text-xs font-bold transition cursor-pointer"
                :class="
                  copyFormat === 'email_pass'
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                ">
                Email:Password
              </button>
            </div>
          </div>

          <div class="text-xs font-mono font-semibold text-slate-500">
            Total: {{ selectedEmails.length }} baris email
          </div>
        </div>

        <!-- Body / Textarea -->
        <div class="p-5 sm:p-6 flex-1 overflow-y-auto space-y-2">
          <textarea
            :value="formattedEmailsText"
            readonly
            rows="15"
            class="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition resize-y select-all leading-relaxed shadow-inner min-h-[340px]"
            @focus="$event.target.select()"></textarea>
          <div class="flex items-center justify-between text-xs text-slate-400 pt-1">
            <span>💡 Klik di dalam kotak untuk langsung select all (blok semua teks), atau klik tombol di bawah.</span>
            <span class="font-mono font-bold text-slate-500">{{ selectedEmails.length }} Akun</span>
          </div>
        </div>

        <!-- Footer Actions -->
        <div
          class="p-4 sm:p-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/70">
          <button
            type="button"
            @click="showEmailsModal = false"
            class="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition cursor-pointer shadow-2xs">
            Tutup
          </button>

          <button
            type="button"
            @click="copyFormattedEmails"
            class="px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            :class="
              copiedFeedback
                ? 'bg-emerald-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            ">
            <template v-if="copiedFeedback">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Tersalin ke Clipboard!</span>
            </template>
            <template v-else>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2">
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path
                  d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              <span>Salin Semua ({{ selectedEmails.length }})</span>
            </template>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
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
  "bulkUpdateStatus",
]);

const bulkText = ref("");
const isBulkOpen = ref(localStorage.getItem("cekgmail_bulk_open") === "true");
const selectedBulkTargetStatus = ref("sudah_setor");
const bulkCustomDate = ref(new Date().toISOString().slice(0, 10));
const autoAddIfNotFound = ref(true);
const bulkFileInputRef = ref(null);
const isDraggingBulk = ref(false);
const bulkExecutionResult = ref(null);

watch(isBulkOpen, (val) => {
  localStorage.setItem("cekgmail_bulk_open", val ? "true" : "false");
});
const activeFilter = ref("new");
const searchQuery = ref("");
const selectedEmails = ref([]);
const showEmailsModal = ref(false);
const copyFormat = ref("email_only");
const copiedFeedback = ref(false);

const formattedEmailsText = computed(() => {
  if (selectedEmails.value.length === 0) return "";
  return selectedEmails.value
    .map((emailStr) => {
      if (copyFormat.value === "email_pass") {
        const row = props.ledger.find((l) => l.email === emailStr);
        const pass = row && row.password ? row.password : "";
        return `${emailStr}:${pass}`;
      }
      return emailStr;
    })
    .join("\n");
});

function openShowEmailsModal() {
  if (selectedEmails.value.length === 0) return;
  copiedFeedback.value = false;
  showEmailsModal.value = true;
}

async function copyFormattedEmails() {
  if (!formattedEmailsText.value) return;
  try {
    await navigator.clipboard.writeText(formattedEmailsText.value);
    copiedFeedback.value = true;
    setTimeout(() => {
      copiedFeedback.value = false;
    }, 2500);
  } catch (err) {
    console.error("Gagal menyalin email:", err);
  }
}

const showAllPasswords = ref(false);
const visiblePassMap = ref({});
const onlyLiveFilter = ref(false);
const onlyDieFilter = ref(false);
const verifFilterMode = ref(
  localStorage.getItem("cekgmail_verif_mode") ||
    (localStorage.getItem("cekgmail_noverif_filter") === "true"
      ? "no_verif"
      : "all"),
);

watch(verifFilterMode, (val) => {
  localStorage.setItem("cekgmail_verif_mode", val);
  localStorage.setItem(
    "cekgmail_noverif_filter",
    val === "no_verif" ? "true" : "false",
  );
});

const filterTabs = [
  { label: "NEW", value: "new" },
  { label: "Semua Ledger", value: "all" },
  { label: "Siap Setor", value: "siap_setor" },
  { label: "Setor Tgl", value: "setor_tgl" },
  { label: "Sudah Setor", value: "sudah_setor" },
  { label: "Akun Ortu", value: "akun_ortu" },
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

// Data subset sesuai tab aktif yang dipilih
const activeTabLedger = computed(() => {
  let list = props.ledger;
  if (activeFilter.value === "new") {
    return list.filter(
      (l) =>
        l.setorStatus === "new" ||
        l.setorStatus === "belum_disetor" ||
        !l.setorStatus,
    );
  } else if (activeFilter.value === "siap_setor") {
    return list.filter((l) => l.setorStatus === "siap_setor");
  } else if (activeFilter.value === "setor_tgl") {
    return list.filter((l) => l.setorStatus === "setor_tgl");
  } else if (activeFilter.value === "sudah_setor") {
    return list.filter(
      (l) => l.setorStatus === "sudah_setor" || l.setorStatus === "disetor",
    );
  } else if (activeFilter.value === "akun_ortu") {
    return list.filter((l) => l.setorStatus === "akun_ortu");
  }
  return list;
});

// Hitung Live, Die, Verif, Clean dari data di tab aktif yang dipilih
const liveInLedgerCount = computed(
  () => activeTabLedger.value.filter((l) => l.verifyStatus === "live").length,
);
const dieInLedgerCount = computed(
  () =>
    activeTabLedger.value.filter(
      (l) => l.verifyStatus === "die" || l.verifyStatus === "disabled",
    ).length,
);
const verifInLedgerCount = computed(
  () => activeTabLedger.value.filter((l) => l.isVerif).length,
);
const noVerifInLedgerCount = computed(
  () => activeTabLedger.value.filter((l) => !l.isVerif).length,
);

const filteredLedger = computed(() => {
  let list = activeTabLedger.value;

  if (onlyLiveFilter.value) {
    list = list.filter((l) => l.verifyStatus === "live");
  } else if (onlyDieFilter.value) {
    list = list.filter(
      (l) => l.verifyStatus === "die" || l.verifyStatus === "disabled",
    );
  }

  if (verifFilterMode.value === "verif") {
    list = list.filter((l) => l.isVerif);
  } else if (verifFilterMode.value === "no_verif") {
    list = list.filter((l) => !l.isVerif);
  }

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase().trim();
    list = list.filter(
      (l) =>
        l.email.toLowerCase().includes(q) ||
        (l.password && l.password.toLowerCase().includes(q)),
    );
  }
  return list;
});

// DataTables Pagination Logic
const pageSize = ref(10);
const currentPage = ref(1);

watch(
  [
    searchQuery,
    activeFilter,
    pageSize,
    onlyLiveFilter,
    onlyDieFilter,
    verifFilterMode,
  ],
  () => {
    currentPage.value = 1;
  },
);

function handleLiveFilterToggle() {
  if (onlyLiveFilter.value) {
    onlyDieFilter.value = false;
  }
}

function handleDieFilterToggle() {
  if (onlyDieFilter.value) {
    onlyLiveFilter.value = false;
  }
}

const totalFilteredCount = computed(() => filteredLedger.value.length);

const totalPages = computed(() => {
  if (pageSize.value >= 999999) return 1;
  return Math.ceil(totalFilteredCount.value / pageSize.value) || 1;
});

const paginatedLedger = computed(() => {
  if (pageSize.value >= 999999) return filteredLedger.value;
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredLedger.value.slice(start, start + pageSize.value);
});

const startEntryIndex = computed(() => {
  if (totalFilteredCount.value === 0) return 0;
  return (currentPage.value - 1) * pageSize.value + 1;
});

const endEntryIndex = computed(() => {
  if (pageSize.value >= 999999) return totalFilteredCount.value;
  return Math.min(currentPage.value * pageSize.value, totalFilteredCount.value);
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

function parseBulkInput(text) {
  if (!text) return [];
  const lines = text.split(/[\r\n]+/);
  const results = [];
  const seen = new Set();

  lines.forEach((line) => {
    if (!line || !line.trim()) return;
    const trimmed = line.trim();
    const parts = trimmed.split(/[|:\t,]+/);
    const emailIndex = parts.findIndex((p) => p.includes("@"));
    if (emailIndex !== -1) {
      const cleanEmail = parts[emailIndex].trim().toLowerCase();
      if (!seen.has(cleanEmail)) {
        seen.add(cleanEmail);
        let pass = "";
        if (parts.length > emailIndex + 1) {
          pass = parts[emailIndex + 1].trim();
        } else if (emailIndex > 0) {
          pass = parts[0].trim();
        }
        results.push({ email: cleanEmail, password: pass });
      }
    } else {
      const match = trimmed.match(
        /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/,
      );
      if (match) {
        const cleanEmail = match[0].toLowerCase();
        if (!seen.has(cleanEmail)) {
          seen.add(cleanEmail);
          results.push({ email: cleanEmail, password: "" });
        }
      }
    }
  });

  return results;
}

const parsedBulkItems = computed(() => parseBulkInput(bulkText.value));
const bulkInputCount = computed(() => parsedBulkItems.value.length);

function triggerBulkFileSelect() {
  if (bulkFileInputRef.value) bulkFileInputRef.value.click();
}

function handleBulkFileUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  readBulkFile(file);
}

function handleBulkDrop(e) {
  isDraggingBulk.value = false;
  const file = e.dataTransfer.files[0];
  if (!file) return;
  readBulkFile(file);
}

function readBulkFile(file) {
  const reader = new FileReader();
  reader.onload = (evt) => {
    bulkText.value = evt.target.result;
  };
  reader.readAsText(file);
}

async function pasteFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      bulkText.value = bulkText.value ? `${bulkText.value}\n${text}` : text;
    }
  } catch (err) {
    alert("Silakan tekan Ctrl+V di dalam kotak input untuk menempelkan daftar email.");
  }
}

function loadSampleBulkEmails() {
  if (props.ledger.length > 0) {
    bulkText.value = props.ledger
      .slice(0, 5)
      .map((l) => (l.password ? `${l.email}|${l.password}` : l.email))
      .join("\n");
  } else {
    bulkText.value = "alex.developer@gmail.com\nsupport.team@gmail.com|pass123\nmember.vip@gmail.com";
  }
}

function executeBulkStatusChange(targetStatus) {
  const items = parsedBulkItems.value;
  if (items.length === 0) return;

  const targetDate =
    targetStatus === "setor_tgl"
      ? formatDateDisplay(bulkCustomDate.value)
      : targetStatus === "sudah_setor"
        ? getFormattedDate()
        : null;

  emit("bulkUpdateStatus", {
    items,
    newStatus: targetStatus,
    customDate: targetDate,
    autoAdd: autoAddIfNotFound.value,
  });

  const total = items.length;
  const label = getKeteranganLabel(targetStatus);
  bulkExecutionResult.value = `${total} email berhasil diproses untuk status "${label}".`;
  bulkText.value = "";
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

function handleBatchPassword() {
  if (selectedEmails.value.length === 0) return;
  const newPass = prompt(
    `Masukkan password baru untuk ${selectedEmails.value.length} email terpilih:`,
    "",
  );
  if (newPass === null) return;

  selectedEmails.value.forEach((emailStr) => {
    const row = props.ledger.find((l) => l.email === emailStr);
    if (row) {
      emit("updateLedgerRow", {
        ...row,
        password: newPass.trim(),
        updatedAt: getFormattedDate(),
      });
    }
  });
}

function toggleRowVerif(row) {
  emit("updateLedgerRow", {
    ...row,
    isVerif: !row.isVerif,
    updatedAt: getFormattedDate(),
  });
}

function toggleRowBanding(row) {
  emit("updateLedgerRow", {
    ...row,
    isBanding: !row.isBanding,
    updatedAt: getFormattedDate(),
  });
}

function handleBatchVerif() {
  if (selectedEmails.value.length === 0) return;
  const allVerif = selectedEmails.value.every((emailStr) => {
    const r = props.ledger.find((l) => l.email === emailStr);
    return r && r.isVerif;
  });
  const targetState = !allVerif;

  selectedEmails.value.forEach((emailStr) => {
    const row = props.ledger.find((l) => l.email === emailStr);
    if (row) {
      emit("updateLedgerRow", {
        ...row,
        isVerif: targetState,
        updatedAt: getFormattedDate(),
      });
    }
  });
}

function handleBatchBanding() {
  if (selectedEmails.value.length === 0) return;
  const allBanding = selectedEmails.value.every((emailStr) => {
    const r = props.ledger.find((l) => l.email === emailStr);
    return r && r.isBanding;
  });
  const targetState = !allBanding;

  selectedEmails.value.forEach((emailStr) => {
    const row = props.ledger.find((l) => l.email === emailStr);
    if (row) {
      emit("updateLedgerRow", {
        ...row,
        isBanding: targetState,
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
  const input = prompt(
    `Masukkan password untuk ${row.email}:`,
    row.password || "",
  );
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
  alert("Password berhasil disalin!");
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
    Verif: l.isVerif ? "V" : "-",
    Banding: l.isBanding ? "B" : "-",
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
    { wch: 10 },
    { wch: 10 },
    { wch: 22 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Catatan Email");

  const fileName = `catatan_email_ledger_${new Date().toISOString().slice(0, 10)}.xlsx`;
  XLSX.writeFile(workbook, fileName);
}
</script>
