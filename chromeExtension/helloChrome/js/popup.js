console.log('======= dir ==')
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM is fully loaded');
    // 现在可以安全地操作 DOM 元素
    const element = document.getElementById('generate_summary');
    if (element) {
        element.textContent = 'Hello, World!';
    }
});