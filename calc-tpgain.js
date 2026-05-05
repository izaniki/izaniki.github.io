// calc-tpgain.js

function calculateTPGainZPro(qa, ta, da, zan, zan_oat, stp, hit_rate_input, weap_type) {
    // 1. Probabilities and Modifiers
    const qa_prob = Math.min(qa / 100, 1.0);
    const ta_prob = Math.min(ta / 100, 1.0);
    const da_prob = Math.min(da / 100, 1.0);
    const stp_mult = stp / 100;

    const hit_rate = hit_rate_input / 100; 
    const miss_rate = 1.0 - hit_rate;

    // Default Zanshin Probabilities
    let zan_prob = Math.min(zan, 100) / 100;
    let hasso_prob = Math.min(zan * 0.25, 35) / 100;
    let oat_ratio = zan_oat / 100;

    // WEAPON TYPE LOGIC OVERRIDES
    if (weap_type === 'dw' || weap_type === 'h2h') {
        // Zanshin and Hasso do not work at all
        zan_prob = 0;
        hasso_prob = 0;
        oat_ratio = 0;
    } else if (weap_type === '1h') {
        // Zanshin works, but Hasso does not grant extra attacks to 1-handers
        hasso_prob = 0;
    }
    // If '2h', it keeps the default probabilities established above.

    const ZAN_TP_MULT = 2.22;

    // 2. Raw potential gains (Factoring in hit rate)
    const qa_raw = qa * 3 * hit_rate;
    const ta_raw = ta * 2 * hit_rate;
    const da_raw = da * 1 * hit_rate;
    
    const zan_raw_miss = (zan_prob * miss_rate) * 100 * ZAN_TP_MULT;
    const zan_raw_hasso = (hasso_prob * hit_rate) * 100 * ZAN_TP_MULT;
    const zan_raw_oat = (zan_raw_miss + zan_raw_hasso) * oat_ratio;
    const zan_raw_total = zan_raw_miss + zan_raw_hasso + zan_raw_oat;

    // 3. Actual gains (post-cannibalization)
    const qa_act = qa_raw;
    const ta_act = (1 - qa_prob) * ta_raw;
    const da_act = (1 - qa_prob) * (1 - ta_prob) * da_raw;
    
    const p_no_ma = (1 - qa_prob) * (1 - ta_prob) * (1 - da_prob);
    const zan_act_miss = p_no_ma * zan_raw_miss;
    const zan_act_hasso = p_no_ma * zan_raw_hasso;
    const zan_act_oat = p_no_ma * zan_raw_oat;
    const zan_act_total = zan_act_miss + zan_act_hasso + zan_act_oat;

    // 4. Loss Modifiers (for calculating breakdowns)
    const loss_mod_qa = qa_prob;
    const loss_mod_ta = (1 - qa_prob) * ta_prob;
    const loss_mod_da = (1 - qa_prob) * (1 - ta_prob) * da_prob;

    // Colors
    const colorQA = '#56B4E9';
    const colorTA = '#E69F00';
    const colorDA = '#F0E442';
    const colorZan = '#CC79A7';

    // Helper to generate loss arrays for the Zanshin sub-components
    const calcZanLosses = (raw_val) => [
        { name: 'QA', val: raw_val * loss_mod_qa, color: colorQA },
        { name: 'TA', val: raw_val * loss_mod_ta, color: colorTA },
        { name: 'DA', val: raw_val * loss_mod_da, color: colorDA }
    ];

    const base_z_pro_gain = qa_act + ta_act + da_act + zan_act_total;
    const final_tpgainzpro = stp + (base_z_pro_gain * (1 + stp_mult));

    return {
        total: final_tpgainzpro,
        stp_base: stp,
        qa: { 
            raw: qa_raw, actual: qa_act, caused_loss: (ta_raw * loss_mod_qa) + (da_raw * loss_mod_qa) + (zan_raw_total * loss_mod_qa), 
            color: colorQA, losses: [], stp_bonus: qa_act * stp_mult 
        },
        ta: { 
            raw: ta_raw, actual: ta_act, caused_loss: (da_raw * loss_mod_ta) + (zan_raw_total * loss_mod_ta), 
            color: colorTA, losses: [{ name: 'QA', val: ta_raw * loss_mod_qa, color: colorQA }], stp_bonus: ta_act * stp_mult 
        },
        da: { 
            raw: da_raw, actual: da_act, caused_loss: (zan_raw_total * loss_mod_da), 
            color: colorDA, losses: [
                { name: 'QA', val: da_raw * loss_mod_qa, color: colorQA },
                { name: 'TA', val: da_raw * loss_mod_ta, color: colorTA }
            ], stp_bonus: da_act * stp_mult 
        },
        zan: { 
            raw: zan_raw_total, actual: zan_act_total, caused_loss: 0, color: colorZan,
            stp_bonus: zan_act_total * stp_mult,
            parts: {
                miss: { raw: zan_raw_miss, actual: zan_act_miss, losses: calcZanLosses(zan_raw_miss) },
                hasso: { raw: zan_raw_hasso, actual: zan_act_hasso, losses: calcZanLosses(zan_raw_hasso) },
                oat: { raw: zan_raw_oat, actual: zan_act_oat, losses: calcZanLosses(zan_raw_oat) }
            }
        }
    };
}

// FORMATTING FUNCTIONS
function formatBreakdownLine(statName, data) {
    if (data.raw <= 0) return ''; 
    let text = `${statName}: +${data.actual.toFixed(2)}% `;
    const activeLosses = data.losses.filter(l => l.val > 0.005); 
    
    if (activeLosses.length > 0) {
        text += `[<span style="color: #aaa;">+${data.raw.toFixed(2)}%</span>`;
        const lossStrings = activeLosses.map(l => `, <span style="color: ${l.color};">-${l.val.toFixed(2)}% ${l.name}</span>`);
        text += lossStrings.join(''); 
        text += `] `;
    }
    if (data.stp_bonus > 0) {
        text += `<span style="color: #DDB8FF;">[+${data.stp_bonus.toFixed(2)}% STP]</span>`;
    }
    return text;
}

function formatZanBranch(branchName, branchPrefix, data) {
    if (data.raw <= 0) return '';
    let text = `<br><span style="color: #666; margin-left: 10px;">${branchPrefix}</span> ${branchName}: +${data.actual.toFixed(2)}% `;
    
    const activeLosses = data.losses.filter(l => l.val > 0.005); 
    if (activeLosses.length > 0) {
        text += `[<span style="color: #aaa;">+${data.raw.toFixed(2)}%</span>`;
        const lossStrings = activeLosses.map(l => `, <span style="color: ${l.color};">-${l.val.toFixed(2)}% ${l.name}</span>`);
        text += lossStrings.join(''); 
        text += `]`;
    }
    return text;
}

function formatZanshinBreakdown(data) {
    if (data.raw <= 0) return '';
    let text = `Zan: +${data.actual.toFixed(2)}% `;
    if (data.stp_bonus > 0) {
        text += `<span style="color: #DDB8FF;">[+${data.stp_bonus.toFixed(2)}% STP]</span>`;
    }

    const hasOAT = data.parts.oat.raw > 0;
    text += formatZanBranch('Miss ', '├─', data.parts.miss);
    text += formatZanBranch('Hasso', hasOAT ? '├─' : '└─', data.parts.hasso);
    if (hasOAT) {
        text += formatZanBranch('OAT  ', '└─', data.parts.oat);
    }
    return text;
}

function formatCumulativeLine(statName, data) {
    if (data.raw <= 0) return '';
    const net = data.actual - data.caused_loss;
    let text = `<span style="color: ${data.color}; font-weight: bold;">${statName}:</span> +${data.actual.toFixed(2)}% `;
    if (data.caused_loss > 0) {
        text += `<span style="color: #FF6B6B;">[-${data.caused_loss.toFixed(2)}%]</span> `;
    }
    text += `<span style="color: #aaa;">=</span> <span style="color: ${data.color};">Net: +${net.toFixed(2)}%</span>`;
    return text;
}

// UI UPDATE FUNCTION
function updateTPGainCalc() {
    // 1. Get Stat Values
    const qa = parseFloat(document.getElementById('qa').value) || 0;
    const ta = parseFloat(document.getElementById('ta').value) || 0;
    const da = parseFloat(document.getElementById('da').value) || 0;
    const stp = parseFloat(document.getElementById('stp').value) || 0;
    const zan = parseFloat(document.getElementById('zan').value) || 0;
    const zan_oat = parseFloat(document.getElementById('zan_oat').value) || 0;

    // 2. Get Settings Values
    const hitRateSlider = document.getElementById('hit-rate');
    const hitRate = parseFloat(hitRateSlider.value) || 95;
    
    // Update the visual text for the slider
    document.getElementById('hit-rate-display').innerText = hitRate;

    // Find which weapon type radio button is checked
    const weapTypeNode = document.querySelector('input[name="weap_type"]:checked');
    const weapType = weapTypeNode ? weapTypeNode.value : '2h';

    // 3. Calculate
    const res = calculateTPGainZPro(qa, ta, da, zan, zan_oat, stp, hitRate, weapType);
    
    // 4. Update Result
    document.getElementById('result').innerText = `+${res.total.toFixed(2)}%`;

    // 5. Update Breakdown Elements
    const uiQA = document.getElementById('bd-qa');
    const uiTA = document.getElementById('bd-ta');
    const uiDA = document.getElementById('bd-da');
    const uiZan = document.getElementById('bd-zan');

    if (res.qa.raw > 0) { uiQA.style.display = 'block'; uiQA.innerHTML = formatBreakdownLine('QA', res.qa); } else { uiQA.style.display = 'none'; }
    if (res.ta.raw > 0) { uiTA.style.display = 'block'; uiTA.innerHTML = formatBreakdownLine('TA', res.ta); } else { uiTA.style.display = 'none'; }
    if (res.da.raw > 0) { uiDA.style.display = 'block'; uiDA.innerHTML = formatBreakdownLine('DA', res.da); } else { uiDA.style.display = 'none'; }
    if (res.zan.raw > 0) { uiZan.style.display = 'block'; uiZan.innerHTML = formatZanshinBreakdown(res.zan); } else { uiZan.style.display = 'none'; }
    
    document.getElementById('val-stp-base').innerText = `+${res.stp_base}%`;

    // 6. Update Cumulative Elements
    const cumQA = document.getElementById('cum-qa');
    const cumTA = document.getElementById('cum-ta');
    const cumDA = document.getElementById('cum-da');
    const cumZan = document.getElementById('cum-zan');

    if (res.qa.raw > 0) { cumQA.style.display = 'block'; cumQA.innerHTML = formatCumulativeLine('QA', res.qa); } else { cumQA.style.display = 'none'; }
    if (res.ta.raw > 0) { cumTA.style.display = 'block'; cumTA.innerHTML = formatCumulativeLine('TA', res.ta); } else { cumTA.style.display = 'none'; }
    if (res.da.raw > 0) { cumDA.style.display = 'block'; cumDA.innerHTML = formatCumulativeLine('DA', res.da); } else { cumDA.style.display = 'none'; }
    if (res.zan.raw > 0) { cumZan.style.display = 'block'; cumZan.innerHTML = formatCumulativeLine('Zan', res.zan); } else { cumZan.style.display = 'none'; }
}

// 7. Interaction Logic & Listeners
const tpInputs = document.querySelectorAll('#calc-tpgain input');
const autoCapCheckbox = document.getElementById('auto-cap');
const hitRateSlider = document.getElementById('hit-rate');
const weapRadios = document.querySelectorAll('input[name="weap_type"]');

function applyAutoCap() {
    if (autoCapCheckbox.checked) {
        const weapTypeNode = document.querySelector('input[name="weap_type"]:checked');
        const weapType = weapTypeNode ? weapTypeNode.value : '2h';
        // 2-Hand caps at 95%, all others cap at 99%
        hitRateSlider.value = (weapType === '2h') ? 95 : 99;
    }
}

// Uncheck auto cap if user manually moves the slider
hitRateSlider.addEventListener('input', () => {
    autoCapCheckbox.checked = false;
});

// Re-evaluate auto cap when toggling the checkbox or switching weapons
autoCapCheckbox.addEventListener('change', () => {
    applyAutoCap();
    updateTPGainCalc();
});

weapRadios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (autoCapCheckbox.checked) applyAutoCap();
        updateTPGainCalc();
    });
});

// Attach global update listener to ALL inputs
tpInputs.forEach(input => {
    input.addEventListener('input', updateTPGainCalc);
    input.addEventListener('change', updateTPGainCalc); // Catch changes that don't trigger 'input'
});

// Run once on load to initialize default values
updateTPGainCalc();