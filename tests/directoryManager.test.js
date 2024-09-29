const DirectoryTree = require('./../src/core/directoryManager');

describe('DirectoryTree', () => {
    let dt;

    beforeEach(() => {
        dt = new DirectoryTree();
        dt.reset();  // Гарантируем, что каждый тест начинается с чистого состояния
    });

    test('create directories', () => {
        dt.create('fruits');
        dt.create('fruits/apples');
        expect(dt.list()).toEqual('fruits\n  apples');
    });

    test('move directory', () => {
        dt.create('fruits');
        dt.create('vegetables');
        dt.create('fruits/apples');
        dt.move('fruits/apples', 'vegetables');
        expect(dt.list()).toEqual('fruits\nvegetables\n  apples');
    });

    test('delete directory', () => {
        dt.create('fruits');
        dt.create('fruits/apples');
        dt.delete('fruits/apples');
        expect(dt.list()).toEqual('fruits');
    });

    test('list directories with indentation', () => {
        dt.create('fruits');
        dt.create('fruits/apples');
        dt.create('fruits/apples/fuji');
        expect(dt.list()).toEqual('fruits\n  apples\n    fuji');
    });
});
