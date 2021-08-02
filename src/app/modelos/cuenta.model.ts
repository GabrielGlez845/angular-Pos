export class CuentaModel {

    apertura: String ;
    cierre?: string;
    total?: string;
    estado_id:number; // 2 significa sin pagar //1:pagada //3:Suspendida
    descuento_gnral?: string ;
    cajero_id?: number = 1;
    cliente_id?: number = 1;//no manejamos clientes
    turno_id:number;    
    seccion: string ;

}

export class CuentaDetalleModel {

    cuenta_id: number;
    cantidad: number;
    producto_id: number;
    descuento:number; 

}