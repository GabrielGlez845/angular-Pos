export class PlatilloModel {

    nombre: string = "";
    categoria_id: number = 0;
    departamento_id: number = 0;
    unidad_venta:string = "";    
    precio_venta: string = "";
    img: string = ""; //-->colocar una imagen pra nulo
    visible: number = 0;//el default lo maneja la bd
    existencia: number = 0;
    producto_id:number = 0;   
  //  cantidad:number = 0;//--> Quitar

}

export class PlatilloDetalleModel {

    platillo_id: number = 0;
    insumo_id: number = 0;
    cantidad: number = 0;
    porcion: number = 0;    
    incluido: number = 0;//--> // bit 1 o 0
    opcional_adicional: number = 0;  // bit 1 o 0
    costo_extra: number = 0; // bit 1 o 0

}