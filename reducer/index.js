const jsonInitialState = {
  name: "example",
  version: "1.0.0",
  description: "Build the next generation of js...",
  author: "",
  main: "index.js",
  dependencies: {},
  devDependencies: {},
  scripts: {
    test: 'echo "Error: no test specified" && exit 1',
  },
  license: "ISC",
};

export default function jsonStateReducer(state, action) {
    
    switch (action.type) {
      case "updateProjectName":
        return {...state, 'name': action.value};
      case "updateProjectVersion":
        return {...state, 'version': action.value};
      case "updateProjectDescription":
        return {...state, 'description': action.value};
      case "updateProjectAuthor":
        return {...state, 'author': action.value};
      case "updateProjectMainFile":
        return {...state, 'main': action.value};
      case "addDependencie":
        var newDependencies = state.dependencies;
        newDependencies[action.key] = action.value;
        return {...state, 'dependencies': newDependencies};
      case "removeDependencie":
        var newDependencies = state.dependencies;
        delete newDependencies[action.key];
        return {...state, 'dependencies': newDependencies};
      case "addDevDependencie":
        var newDevDependencies = state.devDependencies;
        newDevDependencies[action.key] = action.value
        return {...state, 'devDependencies': newDevDependencies};
      case "removeDevDependencie":
        var newDevpendencies = state.devDependencies;
        delete newDevpendencies[action.key];
        return {...state, 'devDependencies': newDevpendencies};
      case "addScript":
        var newScripts = state.scripts
        newScripts[action.key] = action.value
        return {...state, 'scripts': newScripts};
      case "removeScript":
        var newScripts = state.scripts;
        delete newScripts[action.key]
        return {...state, 'scripts': newScripts};
      case "updateJSON":
        return action.value;
      case "clearJSON":
        return jsonInitialState;
      default:
        return state;
    }

}
