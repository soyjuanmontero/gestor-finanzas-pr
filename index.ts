// 1. Definimos una interfaz para nuestras transacciones
type TipoTransaccion = "ingreso" | "gasto";
interface Transaccion {
     id: string;
    type: TipoTransaccion
    description: string;
    price: number;
    date:string
}

// 2. Estado inicial de la aplicación
let estado = {
    transacciones: [] as Transaccion[],
    balance: 0,
    ingresos: 0,
    gastos: 0
};

const calcularTotales = () => {
    return estado.transacciones.reduce((acc, t) => {
        if (t.type === "ingreso") acc.ingresos += t.price;
        else acc.gastos += t.price;
        acc.balance = acc.ingresos - acc.gastos;
        return acc;
    }, { ingresos: 0, gastos: 0, balance: 0 });
};

    // funciones de formato
function convertirEnNum(text: string): number {
    
    const limpio = text.replace(/\$/g, "")
                       .replace(/\./g, "")
                       .replace(/\s/g, "")
                       .replace(",", "."); 
    const result = parseFloat(limpio);
    return isNaN(result) ? 0 : result;
}


    const formatearARS = (valor:number):string => {
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
    const datosGuardados = localStorage.getItem("datos_finanzas");
    if (datosGuardados) {
        estado = JSON.parse(datosGuardados);
        actualizarInterfaz(); // Dibujamos todo lo guardado al iniciar
    }
}
function actualizarInterfaz() {
    const balanceEl = document.querySelector(".capital_total")!;
    const ingresoEl = document.querySelector(".ingresos_monto")!;
    const gastoEl = document.querySelector(".gastos_monto")!;
    const listEl = document.querySelector(".list")!;
    const templateEl=document.querySelector("#history-template") as HTMLTemplateElement;

    // Limpiamos la lista antes de re-dibujar
    listEl.innerHTML = "";

       const { ingresos, gastos, balance } = calcularTotales();

    balanceEl.textContent = formatearARS(balance);
    ingresoEl.textContent = formatearARS(ingresos);
    gastoEl.textContent = formatearARS(gastos);
    
    estado.transacciones.forEach(t => {
        const clone= document.importNode(templateEl.content, true) as DocumentFragment

if(clone.firstElementChild){



        if(t.type.toLocaleLowerCase()==="ingreso"){
            clone.firstElementChild.classList.add('ingresos_monto')

        }else{
            clone.firstElementChild.classList.add('gastos_monto')

        }
    }    
    const description=clone.querySelector(".result-description")
    const price= clone.querySelector(".result-price")
    const date=clone.querySelector(".date")
    if(description)description.textContent=t.description
    if(price)price.textContent=t.price.toString()
    if(date)date.textContent=t.date
        
      


    
        listEl.appendChild(clone);
    });
}
 
function agregarTransaccion(): void {
    const miForm = document.querySelector(".transaction-form") as HTMLFormElement;
    const balanceEl=document.querySelector(".capital_total")
   


    
    miForm.addEventListener("submit", function(e) {
        e.preventDefault()
        
      
        const formData = new FormData(miForm);
        const datos = Object.fromEntries(formData.entries());
       
        
       
        const monto=Number(datos.price )
        if (isNaN(monto) || monto <= 0) {
    alert("Por favor, ingresá un monto válido mayor a cero.");
    return; // Frenamos todo
}


const nuevaTransaccion: Transaccion = {
            id:crypto.randomUUID(),
            type: datos.type as TipoTransaccion,
            description: datos.description as string,
            price: monto ,
            date:new Date().toLocaleDateString('es-AR')
        };
        estado.transacciones.push(nuevaTransaccion);
        
        

    guardarEnStorage();
        actualizarInterfaz();
        
      
    
    miForm.reset()
    });
    

}

function main() {
    cargarDesdeStorage();
    agregarTransaccion();
    
   
}

main();
