// 2. Estado inicial de la aplicación
var estado = {
    transacciones: [],
    balance: 0,
    ingresos: 0,
    gastos: 0
};
// funciones de formato
function convertirEnNum(text) {
    var limpio = text.replace(/\$/g, "")
        .replace(/\./g, "")
        .replace(/\s/g, "")
        .replace(",", ".");
    var result = parseFloat(limpio);
    return isNaN(result) ? 0 : result;
}
var formatearARS = function (valor) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 2
    }).format(valor);
};
function guardarEnStorage() {
    localStorage.setItem("datos_finanzas", JSON.stringify(estado));
}
function cargarDesdeStorage() {
    var datosGuardados = localStorage.getItem("datos_finanzas");
    if (datosGuardados) {
        estado = JSON.parse(datosGuardados);
        actualizarInterfaz(); // Dibujamos todo lo guardado al iniciar
    }
}
function actualizarInterfaz() {
    var balanceEl = document.querySelector(".capital_total");
    var ingresoEl = document.querySelector(".ingresos_monto");
    var gastoEl = document.querySelector(".gastos_monto");
    var listEl = document.querySelector(".list");
    var templateEl = document.querySelector("#history-template");
    // Limpiamos la lista antes de re-dibujar
    listEl.innerHTML = "";
    balanceEl.textContent = formatearARS(estado.balance);
    ingresoEl.textContent = formatearARS(estado.ingresos);
    gastoEl.textContent = formatearARS(estado.gastos);
    estado.transacciones.forEach(function (t) {
        var clone = document.importNode(templateEl.content, true);
        var hoy = new Date();
        var dd = String(hoy.getDate()).padStart(2, '0');
        var mm = String(hoy.getMonth() + 1).padStart(2, '0'); // Enero es 0
        var yyyy = hoy.getFullYear();
        var fechaFormateada = "".concat(dd, "/").concat(mm, "/").concat(yyyy);
        if (clone.firstElementChild) {
            if (t.type.toLocaleLowerCase() === "ingreso") {
                clone.firstElementChild.classList.add('ingresos_monto');
            }
            else {
                clone.firstElementChild.classList.add('gastos_monto');
            }
        }
        var description = clone.querySelector(".result-description");
        var price = clone.querySelector(".result-price");
        var date = clone.querySelector(".date");
        if (description)
            description.textContent = t.description;
        if (price)
            price.textContent = t.price.toString();
        if (date)
            date.textContent = fechaFormateada;
        listEl.appendChild(clone);
    });
}
function agregarTransaccion() {
    var miForm = document.querySelector(".transaction-form");
    var balanceEl = document.querySelector(".capital_total");
    miForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var formData = new FormData(miForm);
        var datos = Object.fromEntries(formData.entries());
        if (balanceEl) {
            var balanceNum = convertirEnNum(balanceEl.textContent || "0");
        }
        var monto = Number(datos.price);
        if (isNaN(monto) || monto <= 0) {
            alert("Por favor, ingresá un monto válido mayor a cero.");
            return; // Frenamos todo
        }
        var nuevaTransaccion = {
            type: datos.type,
            description: datos.description,
            price: monto
        };
        estado.transacciones.push(nuevaTransaccion);
        if (nuevaTransaccion.type === "ingreso") {
            estado.balance += monto;
            estado.ingresos += monto;
        }
        else {
            estado.balance -= monto;
            estado.gastos += monto;
        }
        guardarEnStorage();
        actualizarInterfaz();
        miForm.reset();
    });
}
function main() {
    cargarDesdeStorage();
    agregarTransaccion();
}
main();
