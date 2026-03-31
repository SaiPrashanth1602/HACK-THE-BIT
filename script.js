document.addEventListener('DOMContentLoaded', () => {
    // --- DOM ELEMENTS ---
    const container = document.getElementById("container");
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const filterBtns = document.querySelectorAll(".filter-btn");
    const mainTitle = document.getElementById("main-title");
    const mainSubtitle = document.getElementById("main-subtitle");
    const insightsBar = document.getElementById("insights-bar");
    const topSkillsEl = document.getElementById("top-skills");
    const countWishEl = document.getElementById("count-wish");
    const countDoneEl = document.getElementById("count-done");
    const clearBtn = document.getElementById("clear-storage-btn");
    const refreshBtn = document.getElementById("refresh-feed-btn");
    const navLinks = document.querySelectorAll('.nav-link');
    const viewIndicator = document.getElementById("view-indicator");
    const backBtn = document.getElementById("back-to-feed");

    // --- STATE MANAGEMENT ---
    let currentView = 'feed';
    let currentCategory = 'All';
    let searchQuery = '';

    // Load data from LocalStorage or initialize with data.js registry
    let wishlistJobs = JSON.parse(localStorage.getItem('wishlistJobs')) || [];
    let completedJobs = JSON.parse(localStorage.getItem('completedJobs')) || (typeof completedRegistry !== 'undefined' ? completedRegistry : []);
    let userBehavior = JSON.parse(localStorage.getItem('userBehavior')) || { skills: {} };

    // --- INITIALIZATION (Dummy History if empty) ---
    if (completedJobs.length === 0 && typeof opportunities !== 'undefined') {
        const dummyCompleted = [
            "React SaaS Dashboard",
            "AI Chatbot for E-commerce",
            "Penetration Testing",
            "PHP Laravel Backend",
            "SQL Database Optimization",
            "Dockerizing Legacy App",
            "Rust System Tool"
        ];

        completedJobs = dummyCompleted;
        localStorage.setItem('completedJobs', JSON.stringify(completedJobs));

        // Populate skill tracking for dummy data
        dummyCompleted.forEach(title => {
            const jobData = opportunities.find(o => o.title === title);
            if (jobData) {
                jobData.skills.forEach(skill => {
                    userBehavior.skills[skill] = (userBehavior.skills[skill] || 0) + 1;
                });
            }
        });
        localStorage.setItem('userBehavior', JSON.stringify(userBehavior));
    }

    // --- AFFINITY PROTOCOLS ---
    const affinityProtos = {
        finance: ["finance", "dashboard", "analytics", "audit", "php", "react", "laravel"],
        security: ["security", "penetration", "cyber", "ctf", "vulnerability", "kali"],
        iot: ["iot", "sensor", "esp32", "hardware", "monitoring", "c++", "arduino"]
    };

    // --- CORE FUNCTIONS ---

    function trackInteraction(job) {
        job.skills.forEach(skill => {
            userBehavior.skills[skill] = (userBehavior.skills[skill] || 0) + 1;
        });
        localStorage.setItem('userBehavior', JSON.stringify(userBehavior));
        updateInsightsUI();
    }

    function updateInsightsUI() {
        const hasData = wishlistJobs.length > 0 || completedJobs.length > 0;
        if (!hasData) {
            insightsBar.classList.add('hidden');
            return;
        }

        insightsBar.classList.remove('hidden');
        countWishEl.innerText = wishlistJobs.length;
        countDoneEl.innerText = completedJobs.length;

        const top3 = Object.entries(userBehavior.skills)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 3)
            .map(([skill]) => `<span class="bg-slate-100 px-2 py-1 rounded text-[10px] font-bold border border-slate-200 text-slate-600 uppercase tracking-tighter">${skill}</span>`)
            .join("");
        topSkillsEl.innerHTML = top3 || '<span class="text-[10px] text-slate-400">NO DATA</span>';
    }

    function checkAffinity(job) {
        const text = (job.title + " " + job.desc + " " + job.skills.join(" ")).toLowerCase();
        for (const [key, keywords] of Object.entries(affinityProtos)) {
            if (keywords.some(k => text.includes(k))) return key;
        }
        return null;
    }

    function setView(view) {
        currentView = view;
        navLinks.forEach(link => {
            link.classList.remove('nav-link-active', 'bg-slate-50', 'text-slate-900', 'font-medium');
            link.classList.add('text-slate-500');
        });

        if (view === 'feed') {
            document.getElementById('nav-find').classList.add('nav-link-active', 'bg-slate-50', 'text-slate-900', 'font-medium');
            mainTitle.innerText = "Browse Projects";
            mainSubtitle.innerText = "Explore opportunities matching your professional profile.";
            refreshBtn.classList.remove('hidden');
            clearBtn.classList.add('hidden');
            viewIndicator.classList.add('hidden');
        } else {
            const activeId = view === 'wishlist' ? 'nav-wishlist' : 'nav-completed';
            document.getElementById(activeId).classList.add('nav-link-active', 'bg-slate-50', 'text-slate-900', 'font-medium');
            mainTitle.innerText = view === 'wishlist' ? "Saved Items" : "Project History";
            mainSubtitle.innerText = view === 'wishlist' ? "Archived projects for later review." : "A log of your successfully delivered work.";
            refreshBtn.classList.add('hidden');
            clearBtn.classList.remove('hidden');
            viewIndicator.classList.remove('hidden');
            clearBtn.innerText = view === 'wishlist' ? 'Clear Saved Items' : 'Clear History';
        }
        render();
    }

    function renderJobs(data) {
        container.innerHTML = "";
        if (data.length === 0) {
            container.innerHTML = `<div class="text-center py-24 text-slate-400 bg-white rounded-xl border border-slate-100 text-sm">No records found.</div>`;
            return;
        }

        data.forEach(op => {
            const isStarred = wishlistJobs.includes(op.title);
            const isDone = completedJobs.includes(op.title);
            const affinity = checkAffinity(op);

            const div = document.createElement("div");
            div.className = `job-card bg-white p-6 rounded-xl relative transition-all duration-300 border border-transparent hover:shadow-lg ${isDone && currentView === 'feed' ? 'opacity-50' : ''}`;

            if (affinity && currentView === 'feed' && !isDone) {
                div.style.borderLeft = "4px solid #0f172a";
            }

            div.innerHTML = `
                <div class="flex justify-between items-start mb-3">
                    <div>
                        <div class="flex items-center gap-3 mb-1.5">
                            <span class="text-[9px] text-slate-500 font-bold uppercase tracking-widest border border-slate-200 px-2 py-0.5 rounded">${op.level}</span>
                            <span class="text-[9px] text-blue-600 font-bold uppercase tracking-widest">${op.participants} Applicants</span>
                            ${isDone ? '<span class="text-[9px] bg-slate-900 text-white px-2 py-0.5 rounded font-bold uppercase tracking-widest">Completed</span>' : ''}
                            ${affinity && !isDone ? `<span class="text-[9px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Aptitude: ${affinity}</span>` : ''}
                        </div>
                        <h2 class="text-lg font-bold text-slate-900 tracking-tight">${op.title}</h2>
                    </div>
                    <button class="star-btn p-2 hover:bg-slate-50 rounded transition">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ${isStarred ? 'fill-blue-600 text-blue-600' : 'text-slate-300'}" fill="${isStarred ? 'currentColor' : 'none'}" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                    </button>
                </div>
                <p class="text-slate-500 text-sm mb-5 leading-relaxed max-w-2xl line-clamp-2">${op.desc}</p>
                <div class="flex flex-wrap gap-2 mb-6">
                    ${op.skills.map(s => `<span class="text-slate-600 text-[11px] font-medium px-2 py-1 bg-slate-50 rounded border border-slate-100">${s}</span>`).join("")}
                </div>
                <div class="flex items-center justify-between pt-5 border-t border-slate-50">
                    <span class="text-slate-900 font-bold text-sm">${op.budget}</span>
                    <button class="done-btn px-5 py-2 rounded text-xs font-bold transition ${isDone ? 'text-slate-400 cursor-default' : 'bg-slate-100 text-slate-900 hover:bg-slate-900 hover:text-white'}">
                        ${isDone ? 'Archived' : 'Mark Complete'}
                    </button>
                </div>
            `;

            div.querySelector('.star-btn').onclick = () => {
                const idx = wishlistJobs.indexOf(op.title);
                idx > -1 ? wishlistJobs.splice(idx, 1) : wishlistJobs.push(op.title);
                localStorage.setItem('wishlistJobs', JSON.stringify(wishlistJobs));
                trackInteraction(op);
                render();
            };

            div.querySelector('.done-btn').onclick = () => {
                if (isDone) return;
                completedJobs.push(op.title);
                localStorage.setItem('completedJobs', JSON.stringify(completedJobs));
                trackInteraction(op);
                render();
            };

            container.appendChild(div);
        });
    }

    function render() {
        if (typeof opportunities === 'undefined') return;

        let base = (currentView === 'wishlist') ? opportunities.filter(j => wishlistJobs.includes(j.title)) :
            (currentView === 'completed') ? opportunities.filter(j => completedJobs.includes(j.title)) : opportunities;

        const filtered = base.filter(job => {
            const query = searchQuery.toLowerCase();
            const matchesSearch = job.title.toLowerCase().includes(query) || job.skills.some(s => s.toLowerCase().includes(query));
            const matchesCat = currentCategory === 'All' || job.skills.some(s => s.toLowerCase().includes(currentCategory.toLowerCase()));
            return matchesSearch && matchesCat;
        });

        // Priority sorting for the main feed
        if (currentView === 'feed') {
            filtered.sort((a, b) => {
                const aDone = completedJobs.includes(a.title) ? 1 : 0;
                const bDone = completedJobs.includes(b.title) ? 1 : 0;
                if (aDone !== bDone) return aDone - bDone; // Show non-completed first

                const aAff = checkAffinity(a) ? 1 : 0;
                const bAff = checkAffinity(b) ? 1 : 0;
                return bAff - aAff; // Then show Affinity matches
            });
        }
        renderJobs(filtered);
    }

    // --- EVENT LISTENERS ---

    refreshBtn.onclick = () => {
        if (confirm("This will reset your feed and clear your current saved items. Data.js registry will be restored. Proceed?")) {
            wishlistJobs = [];
            completedJobs = typeof completedRegistry !== 'undefined' ? [...completedRegistry] : [];
            userBehavior = { skills: {} };

            localStorage.setItem('wishlistJobs', JSON.stringify([]));
            localStorage.setItem('completedJobs', JSON.stringify(completedJobs));
            localStorage.setItem('userBehavior', JSON.stringify(userBehavior));

            updateInsightsUI();
            render();

            refreshBtn.innerText = "✓ Refreshed";
            setTimeout(() => { refreshBtn.innerText = "↻ Refresh Feed"; }, 2000);
        }
    };

    clearBtn.onclick = () => {
        const message = currentView === 'wishlist' ? "Remove all saved items?" : "Clear entire project history?";
        if (confirm(message)) {
            if (currentView === 'wishlist') {
                wishlistJobs = [];
                localStorage.setItem('wishlistJobs', JSON.stringify([]));
            } else {
                completedJobs = [];
                localStorage.setItem('completedJobs', JSON.stringify([]));
            }
            updateInsightsUI();
            render();
        }
    };

    document.getElementById('nav-find').onclick = (e) => { e.preventDefault(); setView('feed'); };
    document.getElementById('nav-wishlist').onclick = (e) => { e.preventDefault(); setView('wishlist'); };
    document.getElementById('nav-completed').onclick = (e) => { e.preventDefault(); setView('completed'); };

    if (backBtn) backBtn.onclick = () => setView('feed');

    searchBtn.onclick = () => { searchQuery = searchInput.value; render(); };
    searchInput.onkeyup = (e) => { if (e.key === 'Enter') { searchQuery = searchInput.value; render(); } };

    filterBtns.forEach(btn => {
        btn.onclick = () => {
            filterBtns.forEach(b => b.classList.remove('active', 'bg-slate-900', 'text-white'));
            filterBtns.forEach(b => b.classList.add('bg-white', 'text-slate-600'));

            btn.classList.add('active', 'bg-slate-900', 'text-white');
            btn.classList.remove('bg-white', 'text-slate-600');

            currentCategory = btn.dataset.category;
            render();
        };
    });

    // --- STARTUP ---
    updateInsightsUI();
    render();

    // --- ADD JOB MODAL LOGIC ---
    const addBtn = document.getElementById("add-job-btn");
    const modal = document.getElementById("job-modal");
    const closeModal = document.getElementById("close-modal");
    const saveJob = document.getElementById("save-job");

    if (addBtn) {
        addBtn.onclick = () => modal.classList.remove("hidden");
    }

    if (closeModal) {
        closeModal.onclick = () => modal.classList.add("hidden");
    }
// OPEN MODAL
document.getElementById("add-job-btn").onclick = () => {
    document.getElementById("job-modal").classList.remove("hidden");
};

// CLOSE MODAL
document.getElementById("close-modal").onclick = () => {
    document.getElementById("job-modal").classList.add("hidden");
};

// SAVE JOB + MATCH ENGINE
document.getElementById("save-job").onclick = () => {

    const title = document.getElementById("job-title").value;
    const skills = document.getElementById("job-skills").value.split(",");
    const budget = document.getElementById("job-budget").value;
    const level = document.getElementById("job-level").value;
    const desc = document.getElementById("job-desc").value;

    const newJob = {
        title,
        skills: skills.map(s => s.trim()),
        budget,
        level,
        desc,
        participants: Math.floor(Math.random() * 200), // simulate
        type: "User"
    };

    // 🔥 CORE LINE (THIS IS WHAT YOU ASKED)
    addNewJob(newJob);

    // OPTIONAL: also push into main opportunities list (for UI)
    if (typeof opportunities !== "undefined") {
        opportunities.unshift(newJob);
    }

    // CLOSE MODAL
    document.getElementById("job-modal").classList.add("hidden");

    // CLEAR INPUTS
    document.getElementById("job-title").value = "";
    document.getElementById("job-skills").value = "";
    document.getElementById("job-budget").value = "";
    document.getElementById("job-level").value = "";
    document.getElementById("job-desc").value = "";

    alert("⚡ Job Added + Signal Sent");

    // OPTIONAL: refresh UI if you have render()
    if (typeof render === "function") render();
};
    
});