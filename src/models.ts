type TipoTransaccion = "ingreso" | "gasto";
interface Transaccion {
     id: string;
    type: TipoTransaccion
    description: string;
    price: number;
    date:string
}

class ModeloFinanzas{

    
    private transacciones:Transaccion[]=[]

    constructor(){
        this.cargarDesdeStorage()
    }

     private   guardarEnStorage(){
        localStorage.setItem("datos_finanzas", JSON.stringify(this.transacciones));
    }

    public agregarTransaccion(nueva:Transaccion){
        this.transacciones.push(nueva)
        this.guardarEnStorage()
    }
    public eliminarTransaccion(id: string) {
        this.transacciones=this.transacciones.filter(e=>e.id!==id)
        this.guardarEnStorage()
       
    }
    
public obtenerEstadoCompleto() {
        const ingresos = this.transacciones
            .filter(t => t.type === "ingreso")
            .reduce((acc, t) => acc + t.price, 0);

            const gastos = this.transacciones
            .filter(t => t.type === "gasto")
            .reduce((acc, t) => acc + t.price, 0);


        // ... calcula los gastos y el balance aquí ...

        return {
            transacciones: [...this.transacciones], // Enviamos una copia por seguridad
            ingresos,
            gastos,
            balance: ingresos - gastos
        };
    }   
        private    cargarDesdeStorage() {
    const datosGuardados = localStorage.getItem("datos_finanzas");
    if (datosGuardados) {
        this.transacciones = JSON.parse(datosGuardados);
      
    }
    }


}
export{ ModeloFinanzas,Transaccion}