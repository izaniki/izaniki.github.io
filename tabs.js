function openTab(tabId) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    const clickedButton = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(tabId));
    if (clickedButton) clickedButton.classList.add('active');
}