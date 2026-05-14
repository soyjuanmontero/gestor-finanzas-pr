import { ModeloFinanzas } from "./models";
import { VistaFinanzas } from "./vista";

class ControladorFinanzas{
    constructor(modelo:ModeloFinanzas, vista:VistaFinanzas){
        this.vista=vista
        this.modelo=modelo       
    }
    vista:VistaFinanzas
    modelo:ModeloFinanzas
}