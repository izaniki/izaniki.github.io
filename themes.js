
const availableThemes = [
  { value: 'default', label: 'Terminal Green' },
  { value: 'windurst', label: 'Windurst Green' },
  { value: 'sandoria', label: "San d'Oria Red" },
  { value: 'bastok', label: 'Bastok Blue' },
  { value: 'jeuno', label: 'Jeuno Gold' },
  { value: 'pol', label: 'PlayOnline Cyan' },
  { value: 'amber', label: 'Amber CRT' }
];

function initializeThemeSwitcher() {
  const themeSelect = document.getElementById('theme-select');
  if (!themeSelect) return; // Failsafe in case a page is missing the dropdown


  themeSelect.innerHTML = '';
  
  availableThemes.forEach(theme => {
    const option = document.createElement('option');
    option.value = theme.value;
    option.textContent = theme.label;
    themeSelect.appendChild(option);
  });

 
  const currentTheme = localStorage.getItem('theme') || 'default';
  document.documentElement.setAttribute('data-theme', currentTheme);
  themeSelect.value = currentTheme;


  themeSelect.addEventListener('change', function() {
    const selectedTheme = this.value;
    document.documentElement.setAttribute('data-theme', selectedTheme);
    localStorage.setItem('theme', selectedTheme);
  });
}


document.addEventListener('DOMContentLoaded', initializeThemeSwitcher);