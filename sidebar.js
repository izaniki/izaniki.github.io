const sidebarHTML = `
  <a href="index.html" class="system-logo">
    <img src="images/homepoint.png" alt="Return Home" />
  </a>
  <nav>
    <ul>
      <li><a href="index.html">>> Home</a></li>
      <li class="has-submenu">
        <a href="data_list.html">> Game Mechanics</a>
        <ul class="sub-menu">
          <li><a href="store_tp.html">- TP Generation</a></li>
          <li><a href="multiattack.html">- Multi-attack</a></li>
          <li><a href="delay_reduction.html">- Delay Reduction</a></li>
          
        </ul>
      </li>
      <li><a href="ffxi_formulas.html">> FFXI Formulas</a></li>
      <li><a href="calculators.html">> Data Calculators</a></li>
      <li><a href="item_database.html">> Item Database</a></li>
      <li>
        <div class="theme-switcher" style="margin-top: 30px; border-top: 1px dashed var(--accent); padding-top: 15px;">
          <label for="theme-select" style="font-size: 0.7em; display: block; margin-bottom: 5px;">> SELECT THEME</label>
          <select id="theme-select" style="margin-bottom: 15px;"></select>
          <label for="font-select" style="font-size: 0.7em; display: block; margin-bottom: 5px;">> SELECT FONT</label>
          <select id="font-select"></select>
        </div>
      </li>
    </ul>
  </nav>
`;

const sidebarContainer = document.getElementById('global-sidebar');
if (sidebarContainer) {
  sidebarContainer.innerHTML = sidebarHTML;
}

