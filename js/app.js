const categories = ["All", ...new Set(certificates.map(c => c.category))];
const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const search = document.getElementById("search");
let active = "All";

document.getElementById("totalCount").textContent = certificates.length;
document.getElementById("categoryCount").textContent = categories.length - 1;

function makeFilters() {
  filters.innerHTML = "";
  categories.forEach(category => {
    const button = document.createElement("button");
    button.className = "filter" + (category === active ? " active" : "");
    button.textContent = category;
    button.onclick = () => {
      active = category;
      makeFilters();
      render();
    };
    filters.appendChild(button);
  });
}

function render() {
  const query = search.value.trim().toLowerCase();
  const list = certificates.filter(certificate =>
    (active === "All" || certificate.category === active) &&
    [certificate.title, certificate.category, certificate.issuer, certificate.date, certificate.id]
      .join(" ").toLowerCase().includes(query)
  );

  grid.innerHTML = "";
  list.forEach(certificate => {
    const card = document.createElement("article");
    card.className = "card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Preview " + certificate.title);

    const preview = certificate.kind === "image"
      ? `<img src="${certificate.data}" alt="${certificate.title} certificate">`
      : `<div class="pdf-preview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2h8l5 5v15H6z"/><path d="M14 2v6h5M9 13h7M9 17h7"/></svg><span>PDF CERTIFICATE</span></div>`;

    card.innerHTML = `<div class="preview">${preview}</div><div class="card-body"><div class="meta"><span class="issuer">${certificate.issuer}</span><span class="category">${certificate.category}</span></div><h3>${certificate.title}</h3><div class="date">${certificate.date}</div><div class="card-foot"><span>ID: ${certificate.id}</span><span class="open">View certificate ↗</span></div></div>`;
    card.addEventListener("click", () => openCertificate(certificate));
    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openCertificate(certificate);
      }
    });
    grid.appendChild(card);
  });

  document.getElementById("empty").style.display = list.length ? "none" : "block";
}

function openCertificate(certificate) {
  document.getElementById("modalTitle").textContent =
    certificate.title + " · " + certificate.issuer;
  const content = document.getElementById("modalContent");
  content.innerHTML = "";

  if (certificate.kind === "image") {
    const image = document.createElement("img");
    image.src = certificate.data;
    image.alt = certificate.title + " certificate";
    content.appendChild(image);
  } else {
    const frame = document.createElement("iframe");
    frame.src = certificate.data;
    frame.title = certificate.title + " PDF";
    content.appendChild(frame);
  }

  document.getElementById("modal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("modal").classList.remove("show");
  document.getElementById("modalContent").innerHTML = "";
  document.body.style.overflow = "";
}

document.getElementById("close").onclick = closeModal;
document.getElementById("modal").addEventListener("click", event => {
  if (event.target.id === "modal") closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeModal();
});
search.addEventListener("input", render);

makeFilters();
render();
