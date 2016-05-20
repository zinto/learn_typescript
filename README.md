# learn_typescript
1) Install Node Package Manage (npm) if you doesn't not install

2) install typescript
type this command in cmd: "$ npm install -g typescript"

3) Check version of typescript
type this command in cmd: "$ tsc -v"

4) create folder "src" to contain all file

5) Configuring TypeScript options

creat file "tsconfig.js" with content:

{
    "compilerOptions": {
        "target": "es5", 
        "outDir": "src/scripts/",   //==> the folder contain file transpiled JS
        "watch": true               // ==> watch all change of type scritp
    }    
}

6) Build typescript

press "Ctrl+Shift+B" in VS code