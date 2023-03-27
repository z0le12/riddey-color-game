module.exports = plop => {
    plop.setGenerator('component', {
        description: 'Create a component',
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is your component name?'
            },
        ],
        actions: [
            {
                type: 'add',
                path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.tsx',
                templateFile: 'plop-templates/Component/Component.tsx.hbs',
            },
            {
                type: 'add',
                path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.scss',
                templateFile: 'plop-templates/Component/style.scss.hbs',
            }
        ],
    });
};
