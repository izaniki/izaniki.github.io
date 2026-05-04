const availableThemes = [
  { value: 'default', label: 'Terminal Green' },
  { value: 'windurst', label: 'Windurst Green' },
  { value: 'sandoria', label: "San d'Oria Red" },
  { value: 'bastok', label: 'Bastok Blue' },
  { value: 'jeuno', label: 'Jeuno Gold' },
  { value: 'pol', label: 'POL Cyan' },
  { value: 'amber', label: 'Amber CRT' }
];

const availableFonts = [
  { value: 'default', label: 'Fira Code' },
  { value: 'vt323', label: 'VT323' },
  { value: 'dotgothic', label: 'DotGothic16' },
  { value: 'pressstart', label: 'Press Start 2P' },
  { value: 'inter', label: 'Inter' },
  { value: 'atkinson', label: 'Atkinson' },
  { value: 'lexend', label: 'Lexend' }
];

function initializeSwitchers() {
  // Theme Setup
  const themeSelect = document.getElementById('theme-select');
  if (themeSelect) {
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
      document.documentElement.setAttribute('data-theme', this.value);
      localStorage.setItem('theme', this.value);
    });
  }

  // Font Setup
  const fontSelect = document.getElementById('font-select');
  if (fontSelect) {
    fontSelect.innerHTML = '';
    availableFonts.forEach(font => {
      const option = document.createElement('option');
      option.value = font.value;
      option.textContent = font.label;
      fontSelect.appendChild(option);
    });

    const currentFont = localStorage.getItem('font') || 'default';
    document.documentElement.setAttribute('data-font', currentFont);
    fontSelect.value = currentFont;

    fontSelect.addEventListener('change', function() {
      document.documentElement.setAttribute('data-font', this.value);
      localStorage.setItem('font', this.value);
    });
  }
}

document.addEventListener('DOMContentLoaded', initializeSwitchers);