import { menu } from './vistas/menu'
import { leerTeclado } from './vistas/entradaTeclado'
import {Empleado, Empleados, eEmpleado} from './model/empleado'
import { db } from './database/database'

const main = async () => {
    let n: number
    let query: any

    let Nombre: string, DNI: string, FechaN: Date, Telefono: number, ContratoF: boolean, Sueldo : number, CampoP: string, FinContrato : Date
    let empleado: Empleado = new Empleado("", "", new Date(), 0, true, 0, "", new Date())

    await setBD(false)

    do {
        n = await menu()

        switch(n){
            case 1:
                Nombre = await leerTeclado('Introduzca el nombre del empleado')
                DNI = await leerTeclado('Introduzca el DNI del empleado')
                FechaN = new Date(await leerTeclado('Introduzca la fecha de nacimiento del empleado [AAAA-MM-DD]'))
                Telefono =  parseInt( await leerTeclado('Introduzca el telefono de contacto del empleado'))
                ContratoF =  JSON.parse( await leerTeclado('Introduzca true si el empleado tiene un contrato de duración INDEFINIDA'))
                Sueldo =  parseInt( await leerTeclado('Introduzca el sueldo anual del empleado'))
                CampoP = await leerTeclado('Introduzca el campo profesional del empleado [Programacion, Administracion, Mantenimiento, etc')
                FinContrato = new Date(await leerTeclado('Introduzca la fecha de finalizacion de contrato del empleado [AAAA-MM-DD]'))
 
                empleado = new Empleado(Nombre, DNI, FechaN, Telefono, ContratoF, Sueldo, CampoP, FinContrato)
                try {
                    empleado.DNI = DNI
                }catch(error){
                    console.log(error)
                    empleado = new Empleado("", "", new Date(), 0, true, 0, "", new Date())
                }
                break
            case 2:
                try{
                    let SueldoN=empleado.SueldoN()
                     console.log(`El sueldo NETO del alumno tras aplicar el IRPF del 21% es de: ${SueldoN}`)
                }catch (e){
                    console.log("No ha entrado en la opción 1: " + e)
                }
                break
            case 3:
                Telefono = parseInt(await leerTeclado('Introduzca el nuevo teléfono del empleado'))
                empleado.Telefono=Telefono
                break
            case 4:
                ContratoF = JSON.parse(await leerTeclado('Introduzca el nuevo tipo de contrato del empleado, recuerde si es indefinido es TRUE'))
                empleado.ContratoF=ContratoF
                break 
            case 5:
                Sueldo = parseInt(await leerTeclado('Introduzca el nuevo sueldo anual del empleado'))
                empleado.Sueldo=Sueldo
                break 
            case 6:
                CampoP = await leerTeclado('Introduzca el nuevo campo profesional del empleado')
                empleado.CampoP=CampoP
                break
            case 7:
                FinContrato = new Date(await leerTeclado('Introduzca la nueva fecha de expiración del contrato del empleado [AAAA-MM-DD]'))
                empleado.FinContrato=FinContrato
                break
            case 8: 
                await db.conectarBD()
                DNI = await leerTeclado('Introduzca el DNI del empleado')
                query = await Empleados.findOne( {_DNI: DNI} )
                if (query === null){
                    console.log('No existe el empleado')
                }else{
                    empleado = 
                        new Empleado(query._Nombre, query._DNI, query._FechaN, query._Telefono, query._ContratoF, query._Sueldo, query._CampoP, query._FinContrato)
                        empleado.DNI = query._DNI
                }
                await db.desconectarBD()
                break
            case 9:
                await db.conectarBD()
                await Empleados.findOneAndUpdate( 
                     {_DNI: empleado.DNI }, 
                    {
                        _nombre: empleado.Nombre,
                        _DNI: empleado.DNI,
                        _FechaN: empleado.FechaN,
                        _Telefono: empleado.Telefono,
                        _ContratoF: empleado.ContratoF,
                        _Sueldo: empleado.Sueldo,
                        _CampoP: empleado.CampoP,
                        _FinContrato: empleado.FinContrato,
                    },
                    {
                        runValidators: true
                    }  
                )                
                .then(() => console.log('El empleado se ha modificado correctamente') )
                .catch( (err) => console.log('Error: '+err))
                await db.desconectarBD()
                break
            case 10:
                await db.conectarBD()
                DNI = await leerTeclado('Introduzca el DNI del empleado')
                await Empleados.findOneAndDelete(
                    { _DNI: empleado.DNI }, 
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`No se ha encontrado el empleado`)
                            else console.log('Se ha borrado correctamente el empleado: '+ doc)
                        }
                    })
                await db.desconectarBD()
                break
            case 11:
                console.log(`Nombre: ${empleado.Nombre}`)
                console.log(`DNI: ${empleado.DNI}`)
                console.log(`FechaN: ${empleado.FechaN}`)
                console.log(`Telefono: ${empleado.Telefono}`)
                console.log(`ContratoF: ${empleado.ContratoF}`)
                console.log(`Sueldo: ${empleado.Sueldo}`)
                console.log(`CampoP: ${empleado.CampoP}`)
                console.log(`FinContrato: ${empleado.FinContrato}`)
                break
                case 11:
                    await db.conectarBD()
                    let tmpEmpleado: Empleado
                    let dEmpleado: eEmpleado
                    query = await Empleados.find( {} )
                    for (dEmpleado of query){
                        tmpEmpleado = 
                            new Empleado(dEmpleado._Nombre, dEmpleado._DNI, dEmpleado._FechaN, dEmpleado._Telefono, dEmpleado._ContratoF, dEmpleado._Sueldo, dEmpleado._CampoP, dEmpleado._FinContrato)
                            tmpEmpleado.Sueldo = dEmpleado._Sueldo
                        console.log(`Empleado ${tmpEmpleado.DNI}`)
                    }
                    await db.desconectarBD()                          
                    break
            case 0:
                console.log('\n--ADIÓS--')
                break
            default:
                console.log("Opción incorrecta")
                break
        }
    }while (n != 0)
}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'empleados'

    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    } else {
        const bdAtlas = 'prueba'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =  
       'mongodb+srv://admin:12345@cluster0.5mbvb.mongodb.net/<empleados>?retryWrites=true&w=majority'
        db.cadenaConexion = conexionAtlas
    }
}

main()
