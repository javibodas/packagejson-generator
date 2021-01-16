import Ajv from "ajv"

export default function useEditor(){

    const ajv = new Ajv()

    const validateSchemaAJV = function(json, schema){
        const validate = ajv.compile(schema)
        const valid = validate(json)
        var error = undefined

        return error
    }



    return { validateSchemaAJV }
}