
let prodotti = [];

document.getElementById("fileInput").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        prodotti = JSON.parse(reader.result);
        renderEditor();
    };
    reader.readAsText(e.target.files[0]);
});

function slugify(text) {
    return text.toString().toLowerCase().trim().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
}

function renderEditor() {
    const container = document.getElementById("editorContainer");
    container.innerHTML = "";
    prodotti.forEach((prod, index) => {
        const nome = prod.nome || "";
        const id = "prodotto-" + slugify(nome);
        const pagina = id + ".html";

        prod.id = id;
        prod.pagina = pagina;

        const div = document.createElement("div");
        div.innerHTML = `
            <label>Nome: <input value="${nome}" onchange="prodotti[${index}].nome = this.value; renderEditor();" /></label>
            <label>Categoria: <input value="${prod.categoria || ""}" onchange="prodotti[${index}].categoria = this.value" /></label>
            <label>Immagine: <input value="${prod.immagine || ""}" onchange="prodotti[${index}].immagine = this.value" /></label>
            <label>Prezzo (€): <input type="number" step="0.01" value="${prod.prezzo || ""}" onchange="prodotti[${index}].prezzo = parseFloat(this.value)" /></label>
            <hr />
        `;
        container.appendChild(div);
    });
}

function aggiungiProdotto() {
    prodotti.push({ nome: "", categoria: "", immagine: "", prezzo: 0 });
    renderEditor();
}

function scarica() {
    const blob = new Blob([JSON.stringify(prodotti, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "datiprodotti.json";
    a.click();
}
