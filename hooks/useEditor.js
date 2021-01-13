import Ajv from "ajv"

export default function useEditor(){

    const ajv = new Ajv()

    const validateSchemaAJV = function(json, schema){
        const validate = ajv.compile(schema)
        const valid = validate(json)
        var error = undefined

        if(!valid){
            error = validate.errors.map((err) => { return err.message + '. ' })
            document.getElementById('editor-messages').style.display = 'block'
        }else{
            document.getElementById('editor-messages').style.display = 'none'
        }

        return error
    }

    const createLinesEditor = function(jsonParsed){
        var count = 1
        var listElement = document.getElementById('editor-lines-list')
        listElement.innerHTML = '';
        jsonParsed.split(/\r\n|\r|\n/).map(line => {
            var listItem = document.createElement('li');
            listItem.innerHTML = count;
            listElement.appendChild(listItem)
            count++
        })
    }



    return { validateSchemaAJV, createLinesEditor }
}