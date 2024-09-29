const DirectoryTree = require('../core/directoryManager');
const tree = new DirectoryTree();

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (input) => {
    const [command, ...args] = input.split(' ');
    switch (command.toUpperCase()) {
        case 'CREATE':
            tree.create(args.join(' '));
            break;
        case 'MOVE':
            tree.move(args[0], args[1]);
            break;
        case 'DELETE':
            tree.delete(args.join(' '));
            break;
        case 'LIST':
            console.log(tree.list());
            break;
        default:
            console.log('Invalid command');
    }
});

rl.on('close', () => {
    process.exit(0);
});
