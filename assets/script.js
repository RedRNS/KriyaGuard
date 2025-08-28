// Contoh JavaScript, silakan tambahkan script sesuai kebutuhan

document.addEventListener('DOMContentLoaded', function() {
    console.log('Halaman sudah dimuat.');
    const tabs = document.getElementById('tabs');
    const tabContents = {
        kisah: document.getElementById('kisah-content'),
        riwayat: document.getElementById('riwayat-content'),
        dampak: document.getElementById('dampak-content'),
    };

    tabs.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            // Deactivate all tabs
            tabs.querySelectorAll('button').forEach(button => {
                button.classList.remove('tab-active');
                button.classList.add('tab-inactive');
            });

            // Activate clicked tab
            event.target.classList.remove('tab-inactive');
            event.target.classList.add('tab-active');

            // Hide all content
            Object.values(tabContents).forEach(content => content.classList.add('hidden'));

            // Show content for active tab
            const activeTab = event.target.dataset.tab;
            tabContents[activeTab].classList.remove('hidden');
        }
    });

    // Tampilkan konten default tab Kisah saat halaman dimuat
    Object.values(tabContents).forEach(content => content.classList.add('hidden'));
    tabContents.kisah.classList.remove('hidden');

    // Download sertifikat PDF saat tombol diklik
    const certBtn = document.querySelector('button.mt-4.w-full.text-center.text-xs.text-[#A0522D]');
    if (certBtn) {
        certBtn.addEventListener('click', function(e) {
            e.preventDefault();
            fetch('assets/certificate-template.html')
                .then(res => res.text())
                .then(html => {
                    const iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    document.body.appendChild(iframe);
                    const doc = iframe.contentWindow.document;
                    doc.open();
                    doc.write(html);
                    doc.close();
                    setTimeout(() => {
                        if (window.html2pdf) {
                            window.html2pdf().from(iframe.contentDocument.body).set({margin:10,filename:'sertifikat-kriya.pdf'}).save();
                        } else {
                            alert('Fitur download PDF membutuhkan html2pdf.js. Silakan tambahkan library tersebut.');
                        }
                        document.body.removeChild(iframe);
                    }, 500);
                });
        });
    }
});
