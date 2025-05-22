
let prodotti = [];

document.getElementById("fileInput").addEventListener("change", function(e) {
    const reader = new FileReader();
    reader.onload = function() {
        prodotti = JSON.parse(reader.result);
        renderEditor();
    };
    reader.readAsText(e.target.files[0]);
});

function renderEditor() {
    const container = document.getElementById("editorContainer");
    container.innerHTML = "";
    prodotti.forEach((prod, index) => { if (!prod.id) prod.id = prod.pagina.replace(".html", "");
        const div = document.createElement("div");
        div.innerHTML = `
            <input value="${prod.nome}" onchange="prodotti[${index}].nome = this.value" />
            <input value="${prod.categoria}" onchange="prodotti[${index}].categoria = this.value" />
            <input value="${prod.pagina}" onchange="prodotti[${index}].pagina = this.value" />
            <input value="${prod.immagine}" onchange="prodotti[${index}].immagine = this.value" />
        `;
        container.appendChild(div);
    });
}

function aggiungiProdotto() {
    prodotti.push({ nome: "", categoria: "", pagina: "", immagine: "" });
    renderEditor();
}

function scarica() {
    const blob = new Blob([JSON.stringify(prodotti, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "datiprodotti.json";
    a.click();
}
