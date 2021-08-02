export class ArticuloModel {

    nombre: string;
    categoria_id: number;
    departamento_id: number;
    unidad_compra:string; 
    unidad_venta: string;
    img: string; //--> colocar una imgen en caso de nulo
    visible: number;//el default lo maneja la bd // bit 1 o 0
    precio_compra:string;    
    precio_venta: string;
    existencia: number;
    producto_id:number;   


}