export interface Muestra {
    success: Boolean,
    message: string,
    data: Data
}

interface Data {
    id: string,
    idText: string,
    estado: string,
    estadoDescripcion: string,
    estadoAnterior: string,
    estadoAnteriorDescripcion: string
}