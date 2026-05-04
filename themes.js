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
      { value: 'adoulin-blk', label: 'Adoulin (Black)' },
      { value: 'chocobo-blk', label: 'Chocobo (Black)' },
      { value: 'moogle-blk', label: 'Moogle (Black)' },
      { value: 'limbus-blk', label: 'Limbus (Black)' },
      { value: 'brd-blk', label: 'Bard (Black)' },
      { value: 'bst-blk', label: 'Beastmaster (Black)' },
      { value: 'blm-blk', label: 'Black Mage (Black)' },
      { value: 'blu-blk', label: 'Blue Mage (Black)' },
      { value: 'cor-blk', label: 'Corsair (Black)' },
      { value: 'dnc-blk', label: 'Dancer (Black)' },
      { value: 'drk-blk', label: 'Dark Knight (Black)' },
      { value: 'drg-blk', label: 'Dragoon (Black)' },
      { value: 'geo-blk', label: 'Geomancer (Black)' },
      { value: 'mnk-blk', label: 'Monk (Black)' },
      { value: 'nin-blk', label: 'Ninja (Black)' },
      { value: 'pld-blk', label: 'Paladin (Black)' },
      { value: 'pup-blk', label: 'Puppetmaster (Black)' },
      { value: 'rng-blk', label: 'Ranger (Black)' },
      { value: 'rdm-blk', label: 'Red Mage (Black)' },
      { value: 'run-blk', label: 'Rune Fencer (Black)' },
      { value: 'sam-blk', label: 'Samurai (Black)' },
      { value: 'sch-blk', label: 'Scholar (Black)' },
      { value: 'smn-blk', label: 'Summoner (Black)' },
      { value: 'thf-blk', label: 'Thief (Black)' },
      { value: 'war-blk', label: 'Warrior (Black)' },
      { value: 'whm-blk', label: 'White Mage (Black)' }
    ]
  },
  {
    label: "--- Color Mode ---",
    themes: [
      { value: 'sandoria-full', label: "San d'Oria (Full)" },
      { value: 'bastok-full', label: 'Bastok (Full)' },
      { value: 'windurst-full', label: 'Windurst (Full)' },
      { value: 'jeuno-full', label: 'Jeuno (Full)' },
      { value: 'ahturhgan-full', label: 'Aht Urhgan (Full)' },
      { value: 'adoulin-full', label: 'Adoulin (Full)' },
      { value: 'chocobo-full', label: 'Chocobo (Full)' },
      { value: 'moogle-full', label: 'Moogle (Full)' },
      { value: 'limbus-full', label: 'Limbus (Full)' },
      { value: 'brd-full', label: 'Bard (Full)' },
      { value: 'bst-full', label: 'Beastmaster (Full)' },
      { value: 'blm-full', label: 'Black Mage (Full)' },
      { value: 'blu-full', label: 'Blue Mage (Full)' },
      { value: 'cor-full', label: 'Corsair (Full)' },
      { value: 'dnc-full', label: 'Dancer (Full)' },
      { value: 'drk-full', label: 'Dark Knight (Full)' },
      { value: 'drg-full', label: 'Dragoon (Full)' },
      { value: 'geo-full', label: 'Geomancer (Full)' },
      { value: 'mnk-full', label: 'Monk (Full)' },
      { value: 'nin-full', label: 'Ninja (Full)' },
      { value: 'pld-full', label: 'Paladin (Full)' },
      { value: 'pup-full', label: 'Puppetmaster (Full)' },
      { value: 'rng-full', label: 'Ranger (Full)' },
      { value: 'rdm-full', label: 'Red Mage (Full)' },
      { value: 'run-full', label: 'Rune Fencer (Full)' },
      { value: 'sam-full', label: 'Samurai (Full)' },
      { value: 'sch-full', label: 'Scholar (Full)' },
      { value: 'smn-full', label: 'Summoner (Full)' },
      { value: 'thf-full', label: 'Thief (Full)' },
      { value: 'war-full', label: 'Warrior (Full)' },
      { value: 'whm-full', label: 'White Mage (Full)' }
    ]
  }
];

const availableFonts = [
  { value: 'default',       label: 'Fira Code' },
  { value: 'jetbrains',     label: 'JetBrains Mono' },
  { value: 'ibmplexmono',   label: 'IBM Plex Mono' },
  { value: 'sourcecodepro', label: 'Source Code Pro' },
  { value: 'spacemono',     label: 'Space Mono' },
  { value: 'inconsolata',   label: 'Inconsolata' },
  { value: 'sharetech',     label: 'Share Tech Mono' },
  { value: 'orbitron',      label: 'Orbitron' },
  { value: 'oxanium',       label: 'Oxanium' },
  { value: 'vt323',         label: 'VT323' },
  { value: 'dotgothic',     label: 'DotGothic16' },
  { value: 'pressstart',    label: 'Press Start 2P' },
  { value: 'inter',         label: 'Inter' },
  { value: 'atkinson',      label: 'Atkinson' },
  { value: 'lexend',        label: 'Lexend' }
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