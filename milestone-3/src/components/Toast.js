export const showToast = (message, type = 'success') => {
  const container = document.getElementById('toast-root');
  const toast = document.createElement('div');
  
  const bgColor = type === 'success' ? 'bg-emerald-500' : 'bg-rose-500';
  const icon = type === 'success' ? 'ph-check-circle' : 'ph-warning-circle';

  toast.className = `${bgColor} text-white px-6 py-4 rounded-2xl shadow-xl flex items-center gap-3 animate-slide-in min-w-[200px]`;
  toast.innerHTML = `
    <i class="ph-bold ${icon} text-xl"></i>
    <span class="font-medium">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.replace('animate-slide-in', 'animate-slide-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3000);
};
