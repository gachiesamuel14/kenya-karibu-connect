const store = {
  get(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  set(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
};

function currentUser() {
  return store.get("kc_user", null);
}

function renderHeroCards() {
  const el = document.getElementById("heroCards");
  if (!el) return;
  el.innerHTML = PROFILES.slice(0, 3).map(p => `
    <div class="mini-card">
      <div class="avatar">${initials(p.name)}</div>
      <div>
        <strong>${p.name}, ${p.age}</strong>
        <p>${p.county} · ${p.distance} km</p>
        <small>${p.mode} · ${p.interests.join(" · ")}</small>
      </div>
    </div>
  `).join("");
}

function populateSelect(id, items, includeAll = true) {
  const sel = document.getElementById(id);
  if (!sel) return;
  const opts = includeAll ? ["All", ...items] : items;
  sel.innerHTML = opts.map(v => `<option value="${v}">${v}</option>`).join("");
}

function filteredProfiles() {
  const county = document.getElementById("filterCounty")?.value || "All";
  const mode = document.getElementById("filterMode")?.value || "All";
  const maxKm = Number(document.getElementById("filterKm")?.value || 50);
  const minAge = Number(document.getElementById("filterMinAge")?.value || 18);
  const maxAge = Number(document.getElementById("filterMaxAge")?.value || 45);
  return PROFILES.filter(p =>
    (county === "All" || p.county === county) &&
    (mode === "All" || p.mode === mode) &&
    p.distance <= maxKm &&
    p.age >= minAge && p.age <= maxAge
  );
}

let swipeIndex = 0;
let deck = [];

function renderSwipe() {
  const stage = document.getElementById("swipeCard");
  if (!stage) return;
  deck = filteredProfiles();
  const p = deck[swipeIndex % Math.max(deck.length, 1)];
  if (!deck.length) {
    stage.innerHTML = `<div class="card"><p>No one in that radius yet. Widen filters.</p></div>`;
    return;
  }
  stage.innerHTML = `
    <div class="profile-card">
      <div class="photo" style="--photo: linear-gradient(160deg,#6a040f,#faa307 70%)">
        <h3>${p.name}, ${p.age}</h3>
      </div>
      <div class="meta">
        <p><strong>${p.county}</strong> · ${p.distance} km away · ${p.mode}</p>
        <p>${p.bio}</p>
        <p>${p.interests.join(" · ")} · ${p.religion}${p.tribe ? " · " + p.tribe : ""}</p>
      </div>
    </div>
  `;
}

function like() {
  const p = deck[swipeIndex % deck.length];
  const likes = store.get("kc_likes", []);
  if (p && !likes.find(x => x.id === p.id)) {
    likes.push(p);
    store.set("kc_likes", likes);
    if (p.id % 2 === 0) {
      const matches = store.get("kc_matches", []);
      if (!matches.find(x => x.id === p.id)) {
        matches.push(p);
        store.set("kc_matches", matches);
        alert(`It's a match with ${p.name}!`);
      }
    }
  }
  swipeIndex++;
  renderSwipe();
}

function pass() {
  swipeIndex++;
  renderSwipe();
}

function renderMatches() {
  const grid = document.getElementById("matchGrid");
  if (!grid) return;
  const matches = store.get("kc_matches", PROFILES.filter(p => p.id % 2 === 0).slice(0, 3));
  if (!store.get("kc_matches")) store.set("kc_matches", matches);
  grid.innerHTML = matches.map(p => `
    <a class="match-tile" href="chat.html?with=${p.id}">
      <div class="avatar">${initials(p.name)}</div>
      <h3>${p.name}</h3>
      <p>${p.county} · ${p.distance} km</p>
    </a>
  `).join("") || "<p>No matches yet. Go like a few people.</p>";
}

function renderChat() {
  const list = document.getElementById("chatList");
  const thread = document.getElementById("thread");
  if (!list || !thread) return;
  const matches = store.get("kc_matches", PROFILES.slice(0, 3));
  const params = new URLSearchParams(location.search);
  const id = Number(params.get("with") || matches[0]?.id);
  const person = PROFILES.find(p => p.id === id) || matches[0];
  list.innerHTML = matches.map(p => `
    <a class="match-tile" href="chat.html?with=${p.id}"><strong>${p.name}</strong><br/><small>${p.county}</small></a>
  `).join("");
  const key = `kc_chat_${person.id}`;
  const messages = store.get(key, [
    { me: false, text: `Sasa ${currentUser()?.name || "there"}. Karibu.` },
    { me: false, text: `I'm around ${person.county} this weekend.` }
  ]);
  thread.innerHTML = messages.map(m => `<div class="bubble ${m.me ? "me" : ""}">${m.text}</div>`).join("");
  const form = document.getElementById("composer");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("msg");
    if (!input.value.trim()) return;
    messages.push({ me: true, text: input.value.trim() });
    store.set(key, messages);
    input.value = "";
    renderChat();
  });
}

function bindAuth() {
  const reg = document.getElementById("registerForm");
  reg?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(reg).entries());
    store.set("kc_user", data);
    location.href = "profile.html";
  });
  const login = document.getElementById("loginForm");
  login?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(login).entries());
    const existing = currentUser() || { name: data.email.split("@")[0], email: data.email, county: "Nairobi" };
    store.set("kc_user", existing);
    location.href = "discover.html";
  });
}

function renderProfile() {
  const box = document.getElementById("profileBox");
  if (!box) return;
  const u = currentUser() || { name: "Guest", age: 25, county: "Nairobi", bio: "Set up your profile to start matching.", mode: "Professional" };
  box.innerHTML = `
    <h2>${u.name}${u.age ? ", " + u.age : ""}</h2>
    <p>${u.county || "Kenya"} · ${u.mode || "Open"}</p>
    <p>${u.bio || ""}</p>
    <p class="notice">Demo profile stored in this browser only. Next step: Supabase auth + photo bucket + PostGIS distance queries.</p>
  `;
}

function mockGps() {
  const el = document.getElementById("gpsStatus");
  if (!el) return;
  if (!navigator.geolocation) {
    el.textContent = "Geolocation not supported — using county filters.";
    return;
  }
  el.textContent = "Requesting location…";
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      el.textContent = `Approx location locked: ${pos.coords.latitude.toFixed(3)}, ${pos.coords.longitude.toFixed(3)}. Nearby sort enabled in demo.`;
    },
    () => { el.textContent = "Location denied. Matching by county instead — that's fine."; }
  );
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeroCards();
  populateSelect("filterCounty", COUNTIES);
  populateSelect("filterMode", ["Student", "Professional", "Church"]);
  populateSelect("regCounty", COUNTIES, false);
  renderSwipe();
  renderMatches();
  renderChat();
  bindAuth();
  renderProfile();
  mockGps();
  ["filterCounty", "filterMode", "filterKm", "filterMinAge", "filterMaxAge"].forEach(id => {
    document.getElementById(id)?.addEventListener("change", () => { swipeIndex = 0; renderSwipe(); });
  });
  document.getElementById("btnLike")?.addEventListener("click", like);
  document.getElementById("btnPass")?.addEventListener("click", pass);
  document.getElementById("btnReport")?.addEventListener("click", () => alert("Report received. In production this notifies moderators and can auto-hide the profile."));
});
