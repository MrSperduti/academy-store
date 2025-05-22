
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const container = document.getElementById("prodotto-container");

    if (!id) {
        container.innerHTML = "<p>Nessun prodotto specificato.</p>";
        return;
    }

    fetch("datiprodotti.json")
        .then(res => res.json())
        .then(data => {
            const prodotto = data.find(p => p.id === id);
            if (!prodotto) {
                container.innerHTML = "<p>Prodotto non trovato.</p>";
                return;
            }

            container.innerHTML = `
                <h1>${prodotto.nome}</h1>
                <img src="${prodotto.immagine}" alt="${prodotto.nome}" style="max-width:300px;">
                <p>Categoria: <strong>${prodotto.categoria}</strong></p><p>Prezzo: <strong>€ ${prodotto.prezzo}</strong></p>
                <label for="taglia">Taglia:</label>
                <select id="taglia">
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                </select><br><br>
                <label for="quantita">Quantità:</label>
                <input type="number" id="quantita" value="1" min="1" style="width: 50px;"><br><br>
                <button onclick="aggiungiAlCarrello('${prodotto.id}', '${prodotto.nome}', '${prodotto.immagine}')">🛒 Aggiungi al carrello</button>
            `;
        });
});

function aggiungiAlCarrello(id, nome, immagine) {
    const taglia = document.getElementById("taglia").value;
    const quantita = parseInt(document.getElementById("quantita").value);
    const carrello = JSON.parse(localStorage.getItem("carrello")) || [];

    carrello.push({ id, nome, immagine, taglia, quantita, prezzo: prodotto.prezzo });

    localStorage.setItem("carrello", JSON.stringify(carrello));
    alert("Prodotto aggiunto al carrello!");
}
