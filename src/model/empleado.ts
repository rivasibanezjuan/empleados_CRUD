import {Schema, model } from 'mongoose'

export class Empleado {
    private _Nombre: string
    private _DNI: string
    private _FechaN: Date
    private _Telefono: number
    private _ContratoF: boolean
    private _Sueldo: number
    private _CampoP: string
    private _FinContrato: Date
    
    constructor(Nombre: string, DNI: string, FechaN: Date, 
            Telefono: number, ContratoF: boolean, Sueldo : number, 
            CampoP: string, FinContrato : Date) {
        this._Nombre = Nombre
        this._DNI = DNI
        this._FechaN = FechaN
        this._Telefono = Telefono
        this._ContratoF = ContratoF
        this._Sueldo = Sueldo
        this._CampoP = CampoP
        this._FinContrato = FinContrato
    }

    // REALIZAMOS LOS GETs CORRESPONDIENTES A CADA CAMPO DEL CONSTRUCTOR

    get Nombre(){
        return this._Nombre
    }

    get DNI(){
        return this._DNI
    }

    get FechaN(){
        return this._FechaN
    }

    get Telefono(){
        return this._Telefono
    }

    get ContratoF(): boolean{
        return this._ContratoF
    }

    get Sueldo(){
        return this._Sueldo
    }
    get CampoP(){
        return this._CampoP
    }

    get FinContrato(){
        return this._FinContrato
    }

    // REALIZAMOS LOS SETs CORRESPONDIENTES A CADA CAMPO DEL CONSTRUCTOR

    set Nombre(_Nombre: string){    
        this._Nombre = _Nombre
    }

    set DNI(_DNI: string){    
        this._DNI = _DNI
    }
    set FechaN(_FechaN: Date){    
        this._FechaN = _FechaN
    }

    set Telefono(_Telefono: number){    
        this._Telefono = _Telefono
    }

    set ContratoF(_ContratoF: boolean){    
        this._ContratoF = _ContratoF
    }

    set Sueldo(_Sueldo: number){    
        if (_Sueldo <= 950){
            throw "El sueldo no puede ser inferior al SMI[950]"
        }
        this._Sueldo = _Sueldo
    }

    set CampoP(_CampoP: string){    
        this._CampoP = _CampoP
    }

    set FinContrato(_FinContrato: Date){    
        this._FinContrato = _FinContrato
    }

    /*
    CREAMOS LOS MÉTODOS

    Si el método no puede hacer su trabajo levanta una excepción con throw
    y se interrumpe su ejecución en ese punto.

    */

    SueldoN(){
        let SueldoN : number
        // let IRPF: number
        SueldoN = (this._Sueldo)
        if (SueldoN == 0){
            throw "ERROR: No se ha introducido el sueldo del empleado, inténtelo de nuevo"
        }
        return SueldoN
    }

// DEFINIMOS EL TYPE

}
export type eEmpleado = {
     _Nombre: string
     _DNI: string
     _FechaN: Date
     _Telefono: number
     _ContratoF: boolean
     _Sueldo: number
     _CampoP: string
     _FinContrato: Date
}

// DEFINIMOS NUESTRO SCHEMA

const empleadoSchema = new Schema({
    _Nombre: {
        type: String
    },
    _DNI: {
        type: String,
        unique: true
    },
    _FechaN: {
        type: Date
    },
    _Telefono: {
        type: Number
    },
    _ContratoF: {
        type: Boolean
    },
    _Sueldo: {
        type: Number
    },
    _CampoP: {
        type: String
    },
    _FinContrato: {
        type: Date
    },
})

// La colección de la BD

export const Empleados = model('empleado',empleadoSchema)