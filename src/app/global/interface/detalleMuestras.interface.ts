export interface DetalleMuestra {
    success: Boolean,
    message: string,
    data: Data
}

interface Data {
    id: string,
    estado: string,
    fechaRecepcion: string,
    recibidoPor: string,
    solicitud: string,
    departamento: string,
    municipio: string,
    componente: string
}