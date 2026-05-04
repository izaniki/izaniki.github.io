const themeCategories = [
  {
    label: "--- Dark Mode ---",
    themes: [
      { value: 'default', label: 'Default' },
      { value: 'pol', label: 'POL' },
      { value: 'amber', label: 'Amber CRT' },
      { value: 'sandoria-blk', label: "San d'Oria (Black)" },
      { value: 'bastok-blk', label: 'Bastok (Black)' },
      { value: 'windurst-blk', label: 'Windurst (Black)' },
      { value: 'jeuno-blk', label: 'Jeuno (Black)' },
      { value: 'ahturhgan-blk', label: 'Aht Urhgan (Black)' },
      { value: 'adoulin-blk', label: 'Adoulin (Black)' }
    ]
  },
  {
    label: "--- Light Mode ---",
    themes: [
      { value: 'sandoria-full', label: "San d'Oria (Full)" },
      { value: 'bastok-full', label: 'Bastok (Full)' },
      { value: 'windurst-full', label: 'Windurst (Full)' },
      { value: 'jeuno-full', label: 'Jeuno (Full)' },
      { value: 'ahturhgan-full', label: 'Aht Urhgan (Full)' },
      { value: 'adoulin-full', label: 'Adoulin (Full)' }
    ]
  }
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
    
    themeCategories.forEach(category => {
      const optGroup = document.createElement('optgroup');
      optGroup.label = category.label;
      
      category.themes.forEach(theme => {
        const option = document.createElement('option');
        option.value = theme.value;
        option.textContent = theme.label;
        optGroup.appendChild(option);
      });
      
      themeSelect.appendChild(optGroup);
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