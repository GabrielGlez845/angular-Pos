export class InsumoModel {

    nombre: string = "";
    categoria_id: number = 0;
    departamento_id: number = 0;
    unidad_compra:string = ""; 
    unidad_consumo: string = "";
    factor: number = 0;
    precio_compra:string = "";    
    precio_venta: string = "";
    img: string = ""; //-->colocar una imagen pra nulo
    stock_minimo: number = 0;
    stock_maximo: number = 0; 
    visible: number = 1;//el default lo maneja la bd// bit 1 o 0
    existencia: number = 0;
    producto_id:number = 0;   


}