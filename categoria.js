
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("cat");
    const titolo = document.getElementById("categoria-titolo");
    const container = document.getElementById("prodotti-container");

    if (!categoria) {
        titolo.textContent = "Nessuna categoria selezionata.";
        return;
    }

    titolo.textContent = "Categoria: " + categoria.charAt(0).toUpperCase() + categoria.slice(1);

    fetch("datiprodotti.json")
        .then(res => res.json())
        .then(data => {
            const prodotti = data.filter(p => p.categoria === categoria);
            if (prodotti.length === 0) {
                container.innerHTML = "<p>Nessun prodotto trovato.</p>";
                return;
            }

            prodotti.forEach(prod => {
                const card = document.createElement("div");
                card.className = "card";
                card.innerHTML = `
                    <a href="prodotto.html?id=${prod.id}">
                        <img src="${prod.immagine}" alt="${prod.nome}">
                        <h3>${prod.nome}</h3>
                    </a>`;
                container.appendChild(card);
            });
        });
});
