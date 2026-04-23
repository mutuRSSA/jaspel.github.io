/**
 * =========================================================================
 * KONFIGURASI GLOBAL & NAVBAR DINAMIS (RBAC) - Versi Production
 * =========================================================================
 */

const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbzWdMHje13-jh9ZpxVRmOqvavSuc5Da27uqURGCd-h_n2bXPh_ktDD5S8nMjLTac9U2/exec"; 

function renderNavbar() {
    let currentRole = localStorage.getItem("userRole") || "operator";

    const menuGroups = [
        {
            title: "📝 Entri Jaspel",
            roles: ["operator", "admin"], 
            items: [
                { name: "Entry Massal Jaspel", link: "entry_massal.html", icon: "📥" },
                { name: "Database Pasien", link: "admin_pasien.html", icon: "🏥" }
            ]
        },
        {
            title: "⚙️ Data Master",
            roles: ["keuangan", "admin"], 
            items: [
                { name: "Karyawan & Kinerja", link: "karyawan.html", icon: "👥" },
                { name: "Master Variabel Jaspel", link: "variabel.html", icon: "🎛️" }
            ]
        },
        {
            title: "📁 Laporan & Arsip",
            roles: ["keuangan", "direksi", "admin"], 
            items: [
                { name: "Buku Besar / Arsip", link: "arsip.html", icon: "📚" },
                { name: "Jejak Audit Keamanan", link: "log_audit.html", icon: "🛡️" }
            ]
        },
        {
            title: "📈 Eksekutif",
            roles: ["direksi", "admin"], 
            items: [
                { name: "Dashboard Analitik", link: "dashboard.html", icon: "📊" }
            ]
        }
    ];

    let html = `
    <style>
        .navbar-custom { background: #343a40; color: white; padding: 0 20px; display: flex; justify-content: space-between; align-items: center; font-family: 'Segoe UI', Tahoma, sans-serif; box-shadow: 0 2px 10px rgba(0,0,0,0.2); margin-bottom: 25px; position: sticky; top: 0; z-index: 9999;}
        .navbar-brand { font-size: 18px; font-weight: bold; color: #fff; text-decoration: none; display: flex; align-items: center; gap: 10px; padding: 15px 0;}
        .navbar-menu { display: flex; gap: 20px; list-style: none; margin: 0; padding: 0; }
        .nav-item { position: relative; }
        .nav-link { color: #d1d8e0; text-decoration: none; padding: 15px 10px; display: block; font-weight: 500; font-size: 14px; transition: 0.3s; cursor: pointer; }
        .nav-link:hover, .nav-item:hover .nav-link { color: #fff; background: #4b6584; border-radius: 4px; }
        .dropdown-menu { display: none; position: absolute; top: 100%; left: 0; background: white; min-width: 220px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-radius: 4px; overflow: hidden; z-index: 1000; list-style: none; padding:0; margin:0;}
        .nav-item:hover .dropdown-menu { display: block; }
        .dropdown-item { padding: 12px 15px; display: flex; align-items: center; gap: 10px; color: #333; text-decoration: none; font-size: 13px; border-bottom: 1px solid #eee; transition: 0.2s;}
        .dropdown-item:hover { background: #f8f9fa; color: #007bff; padding-left: 20px; }
    </style>

    <nav class="navbar-custom">
        <a href="index.html" class="navbar-brand">
            🏥 <span>Sistem Jaspel RSUD</span>
        </a>
        
        <ul class="navbar-menu">`;

    menuGroups.forEach(group => {
        if (group.roles.includes(currentRole)) {
            html += `
            <li class="nav-item">
                <a class="nav-link">${group.title} ▾</a>
                <ul class="dropdown-menu">`;
            
            group.items.forEach(item => {
                html += `<li><a href="${item.link}" class="dropdown-item"><span>${item.icon}</span> ${item.name}</a></li>`;
            });

            html += `
                </ul>
            </li>`;
        }
    });

    html += `
            <li class="nav-item">
                <a class="nav-link" onclick="handleLogout()" style="color: #ff7675;">🚪 Keluar</a>
            </li>
        </ul>
    </nav>`;

    document.write(html);
}

function handleLogout() {
    if (confirm("Apakah Anda yakin ingin keluar dari sistem?")) {
        localStorage.clear();
        window.location.href = "login.html";
    }
}