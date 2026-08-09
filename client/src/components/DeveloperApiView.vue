<template>
  <div class="space-y-6 max-w-5xl mx-auto">
    
    <!-- API Header -->
    <div class="saas-card p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-200 pb-4">
        <div>
          <h3 class="text-xl font-bold text-slate-900 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            Netnit Developer REST API Guide
          </h3>
          <p class="text-xs text-slate-500 mt-1">Gunakan API endpoint Netnit untuk memverifikasi alamat email langsung dari backend aplikasi Anda.</p>
        </div>
        <span class="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-mono font-bold rounded-full">
          v1.0 REST
        </span>
      </div>

      <!-- Active Bearer Token Bar -->
      <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
        <div class="flex items-center justify-between">
          <label class="text-xs font-bold text-slate-600 uppercase">Active Bearer API Key Token</label>
          <button @click="$emit('copyKey')" class="text-xs font-bold text-blue-600 hover:underline cursor-pointer">
            Salin Token
          </button>
        </div>
        <div class="flex items-center gap-2">
          <input
            type="text"
            readonly
            :value="apiKey"
            class="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-mono text-slate-800 focus:outline-none" />
        </div>
      </div>
    </div>

    <!-- Endpoint Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="saas-card p-5 space-y-2">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 bg-emerald-100 text-emerald-700 border border-emerald-200 rounded font-mono text-[11px] font-bold">POST</span>
          <span class="font-mono text-xs font-bold text-slate-900">https://apikey.netnit.net/fastcheck</span>
        </div>
        <p class="text-xs text-slate-500 leading-relaxed">
          Pengecekan super cepat (chunk max 1000). Hasil status: <code class="bg-slate-100 text-emerald-700 px-1 rounded">good</code>, <code class="bg-slate-100 text-rose-700 px-1 rounded">bad</code>, atau <code class="bg-slate-100 text-slate-700 px-1 rounded">failed</code>.
        </p>
      </div>

      <div class="saas-card p-5 space-y-2">
        <div class="flex items-center gap-2">
          <span class="px-2 py-0.5 bg-blue-100 text-blue-700 border border-blue-200 rounded font-mono text-[11px] font-bold">POST</span>
          <span class="font-mono text-xs font-bold text-slate-900">https://apikey.netnit.net/deepcheck</span>
        </div>
        <p class="text-xs text-slate-500 leading-relaxed">
          Pengecekan detail (chunk max 500). Hasil status: <code class="bg-slate-100 text-emerald-700 px-1 rounded">live</code>, <code class="bg-slate-100 text-amber-700 px-1 rounded">ver</code>, <code class="bg-slate-100 text-slate-700 px-1 rounded">unregistered</code>, <code class="bg-slate-100 text-rose-700 px-1 rounded">disabled</code>.
        </p>
      </div>
    </div>

    <!-- Code Examples Block -->
    <div class="saas-card p-6 space-y-4">
      <div class="flex items-center justify-between border-b border-slate-200 pb-3">
        <h4 class="text-xs font-bold text-slate-800 uppercase tracking-wider">Contoh Implementation Code</h4>
        <div class="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            v-for="lang in ['curl', 'javascript', 'python']"
            :key="lang"
            @click="activeLang = lang"
            class="px-3 py-1 rounded text-xs font-mono transition cursor-pointer capitalize"
            :class="activeLang === lang ? 'bg-white text-blue-600 font-bold shadow-xs' : 'text-slate-500 hover:text-slate-900'">
            {{ lang }}
          </button>
        </div>
      </div>

      <pre class="bg-slate-900 p-4 rounded-xl font-mono text-xs text-blue-300 overflow-x-auto leading-relaxed"><code>{{ getCodeExample(activeLang) }}</code></pre>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  apiKey: { type: String, required: true }
});

defineEmits(['copyKey']);

const activeLang = ref('javascript');

function getCodeExample(lang) {
  if (lang === 'curl') {
    return `curl -X POST "https://apikey.netnit.net/deepcheck" \\
  -H "Authorization: Bearer ${props.apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "mail": [
      "example1@gmail.com",
      "example2@gmail.com"
    ]
  }'`;
  } else if (lang === 'javascript') {
    return `const API_KEY = '${props.apiKey}';

async function verifyEmails(emails) {
  const response = await fetch('https://apikey.netnit.net/deepcheck', {
    method: 'POST',
    headers: {
      'Authorization': \`Bearer \${API_KEY}\`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ mail: emails })
  });

  const data = await response.json();
  console.log(data);
}

verifyEmails(['test1@gmail.com', 'test2@gmail.com']);`;
  } else if (lang === 'python') {
    return `import requests

API_KEY = '${props.apiKey}'
url = "https://apikey.netnit.net/deepcheck"

headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

data = {
    "mail": ["example1@gmail.com", "example2@gmail.com"]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`;
  }
  return '';
}
</script>
