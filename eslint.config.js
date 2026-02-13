export default [
    {
        files:['**/*.js'],  //only check .js files in server directory 
        rules : {
            semi: "error",  //force semicolons at the end of statements
            "no-unused-vars": "warn"  //warn if variable are unused
        }
    }
];