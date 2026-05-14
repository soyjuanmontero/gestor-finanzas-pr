// 2. Estado inicial de la aplicación
var estado = {
    transacciones: [],
    balance: 0,
    ingresos: 0,
    gastos: 0
};
var calcularTotales = function () {
    var ingresos = estado.transacciones
        .filter(function (t) { return t.type === "ingreso"; })
        .reduce(function (acc, t) { return acc + t.price; }, 0);
    var gastos = estado.transacciones
        .filter(function (t) { return t.type === "gasto"; })
        .reduce(function (acc, t) { return acc + t.price; }, 0);
    return {
        ingresos: ingresos,
        gastos: gastos,
        balance: ingresos - gastos
    };
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
    var _a = calcularTotales(), ingresos = _a.ingresos, gastos = _a.gastos, balance = _a.balance;
    balanceEl.textContent = formatearARS(balance);
    ingresoEl.textContent = formatearARS(ingresos);
    gastoEl.textContent = formatearARS(gastos);
    estado.transacciones.forEach(function (t) {
        var clone = document.importNode(templateEl.content, true);
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
            date.textContent = t.date;
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
        var monto = Number(datos.price);
        if (isNaN(monto) || monto <= 0) {
            alert("Por favor, ingresá un monto válido mayor a cero.");
            return; // Frenamos todo
        }
        var nuevaTransaccion = {
            id: crypto.randomUUID(),
            type: datos.type,
            description: datos.description,
            price: monto,
            date: new Date().toLocaleDateString('es-AR')
        };
        estado.transacciones.push(nuevaTransaccion);
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
