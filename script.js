const directory = document.getElementById("directory");
const search = document.getElementById("search");
const alphabet = document.getElementById("alphabet");

let blogs = [];

fetch("blogs.json")
    .then(response => response.json())
    .then(data => {

        blogs = data.sort((a, b) =>
            a.titulo.localeCompare(b.titulo, "pt")
        );

        criarIndice();
        renderizar(blogs);

    });

function criarIndice() {

    const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    letras.forEach(letra => {

        const link = document.createElement("a");

        link.href = "#" + letra;
        link.textContent = letra;

        alphabet.appendChild(link);

    });

}

function renderizar(lista) {

    directory.innerHTML = "";

    let letraAtual = "";

    lista.forEach(blog => {

        const primeiraLetra =
            blog.titulo.charAt(0).toUpperCase();

        if (primeiraLetra !== letraAtual) {

            letraAtual = primeiraLetra;

            const letra = document.createElement("div");

            letra.className = "letter";
            letra.id = letraAtual;
            letra.textContent = letraAtual;

            directory.appendChild(letra);

        }

        const row = document.createElement("div");

        row.className = "blog";

        row.innerHTML = `
            <a href="${blog.url}" target="_blank">
                ${blog.titulo}
            </a>

<span class="url">
    ${blog.url.replace('https://', '').replace('http://', '')}
</span>
        `;

        directory.appendChild(row);

    });

}

search.addEventListener("input", () => {

    const termo = search.value.toLowerCase();

    const filtrados = blogs.filter(blog =>

        blog.titulo.toLowerCase().includes(termo) ||
        blog.url.toLowerCase().includes(termo)

    );

    renderizar(filtrados);

});
