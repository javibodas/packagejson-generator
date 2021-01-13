export const PACKAGE_JSON_SCHEMA = {'$schema': 'http://json-schema.org/draft-07/schema#',
                                    'type': 'object',
                                    'properties': {
                                        'name': { 'type': 'string' },
                                        'version': { 'type': 'string' },
                                        'description': { 'type': 'string' },
                                        'author': { 'type': 'string' },
                                        'main': { 'type': 'string' },
                                        'dependencies': { 'type': 'object' },
                                        'devDependencies': { 'type': 'object' }
                                        } ,
                                        'required': ['name', 'version', 'description','author','main','dependencies', 'devDependencies']
                                    }