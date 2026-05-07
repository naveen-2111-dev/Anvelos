export const createModal = ({ title, value = '', onSave }) => {
  const root = document.getElementById('modal-root');
  if (!root) return;

  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-50 flex items-center justify-center p-4 animate-fade-in';
  
  const content = document.createElement('div');
  content.className = 'bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scale-in';
  
  content.innerHTML = `
    <div class="p-8">
      <h2 class="text-2xl font-bold mb-2 text-slate-800">${title}</h2>
      <p class="text-slate-500 mb-8 text-sm">Enter the details for your task below.</p>
      
      <form id="modal-form" class="space-y-6">
        <div class="space-y-2">
          <label for="task-input" class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.1em] px-1">Task Description</label>
          <input 
            type="text" 
            id="task-input" 
            value="${value}"
            placeholder="e.g. Design sync with team" 
            class="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 outline-none focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all text-slate-700"
            autocomplete="off"
          />
          <p id="error-msg" class="text-rose-500 text-xs px-1 hidden flex items-center gap-1">
            <i class="ph-bold ph-warning-circle"></i>
            Please enter a task description
          </p>
        </div>
        
        <div class="flex items-center gap-3 pt-4">
          <button type="button" id="close-modal" class="flex-1 px-6 py-3.5 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
          <button type="submit" class="flex-1 btn-primary py-3.5 justify-center">Save Task</button>
        </div>
      </form>
    </div>
  `;

  overlay.appendChild(content);
  root.appendChild(overlay);

  const input = content.querySelector('#task-input');
  const form = content.querySelector('#modal-form');
  const errorMsg = content.querySelector('#error-msg');
  const cancelBtn = content.querySelector('#close-modal');

  // Focus input
  setTimeout(() => {
    input.focus();
    input.setSelectionRange(input.value.length, input.value.length);
  }, 100);

  const close = () => {
    overlay.classList.add('animate-fade-out');
    content.classList.replace('animate-scale-in', 'animate-slide-out');
    content.addEventListener('animationend', () => overlay.remove(), { once: true });
  };

  cancelBtn.addEventListener('click', close);
  
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();
    
    if (!val) {
      errorMsg.classList.remove('hidden');
      input.classList.add('border-rose-300', 'bg-rose-50/30');
      input.focus();
      return;
    }
    
    onSave(val);
    close();
  });

  input.addEventListener('input', () => {
    errorMsg.classList.add('hidden');
    input.classList.remove('border-rose-300', 'bg-rose-50/30');
  });
};
