import { Transaccion } from "./models";

class VistaFinanzas{
 private balanceEl = document.querySelector(".capital_total")
 private ingresoEl = document.querySelector(".ingresos_monto")
 private gastoEl = document.querySelector(".gastos_monto")
 private listEl = document.querySelector(".list") as  HTMLUListElement;
 private templateEl=document.querySelector("#history-template") as HTMLTemplateElement;


 constructor(){

 }
 private formatearMoneda(valor:number):string{
      return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 2
  }).format(valor);
 }

 public renderizar(datos: { transacciones: Transaccion[], balance: number, ingresos: number, gastos: number }) {

    if(this.balanceEl){
    this.balanceEl.textContent=this.formatearMoneda(datos.balance)
    }
    if(this.ingresoEl){
    this.ingresoEl.textContent=this.formatearMoneda(datos.ingresos  )  }
    if(this.gastoEl){
    this.gastoEl.textContent=this.formatearMoneda(datos.gastos)
    }
        this.listEl.innerHTML=""
// 3. Recorre las transacciones y usa el <template> para llenar la lista

datos.transacciones.forEach(t => {
        const clone= document.importNode(this.templateEl.content, true) as DocumentFragment

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
    if(price)price.textContent=this.formatearMoneda(t.price)
    if(date)date.textContent=t.date
        
      


    
        this.listEl.appendChild(clone);
    });
    }
    public bindAgregarTransacciones(manejador:(datos:any)=>void){
        const formulario = document.querySelector(".transaction-form") as HTMLFormElement;
    
    formulario.addEventListener("submit", e => {
        e.preventDefault();
        
        // 1. Extraemos los datos (puedes usar FormData como hiciste antes)
        const formData = new FormData(formulario);
        const entries = Object.fromEntries(formData.entries());
        
        // 2. Le pasamos la pelota al controlador
        manejador(entries);
        
        // 3. Limpiamos para el siguiente gasto
        formulario.reset();
    });
}

    }
export{VistaFinanzas}