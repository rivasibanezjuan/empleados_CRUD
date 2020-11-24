import { leerTeclado } from './entradaTeclado'

export const menu = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Crear empleado')
    console.log('2.- Calcular sueldo neto')
    console.log('3.- Modificar teléfono')
    console.log('4.- Modificar tipo de contrato')
    console.log('5.- Modificar sueldo')
    console.log('6.- Modificar campo profesional')
    console.log('7.- Modificar duracion del contrato')
    console.log('8.- Guardar empleado en la base de datos')
    console.log('9.- Modificar empleado')
    console.log('10.- Borrar empleado')
    console.log('11.- Mostrar empleado')
    console.log('0.- Salir')
    n = parseInt( await leerTeclado('opción: ') )
    return n
}