const fs = require('fs');
const path = require('path');

class DirectoryTree {
    constructor() {
        this.loadState();
    }

    loadState() {
        const statePath = path.join(__dirname, 'state.json');
        if (fs.existsSync(statePath)) {
            const stateData = fs.readFileSync(statePath, 'utf8');
            if (stateData.trim()) {
                // Добавляем проверку, чтобы убедиться, что данные не пусты
                this.root = JSON.parse(stateData);
            } else {
                this.root = {};
            }
        } else {
            this.root = {};
        }
    }

    saveState() {
        const statePath = path.join(__dirname, 'state.json');
        fs.writeFileSync(statePath, JSON.stringify(this.root, null, 2), 'utf8');
    }

    create(path) {
        const parts = path.split('/');
        let current = this.root;
        for (const part of parts) {
            if (!current[part]) {
                current[part] = {};
            }
            current = current[part];
        }
        this.saveState();  // Сохранение состояния после создания директории
    }

    move(source, target) {
        const sourceParts = source.split('/');
        const targetParts = target.split('/');
        let sourceNode = this.root;
        let targetNode = this.root;

        for (const part of sourceParts.slice(0, -1)) {
            sourceNode = sourceNode[part];
        }

        for (const part of targetParts) {
            if (!targetNode[part]) {
                targetNode[part] = {};
            }
            targetNode = targetNode[part];
        }

        const nodeName = sourceParts[sourceParts.length - 1];
        targetNode[nodeName] = sourceNode[nodeName];
        delete sourceNode[nodeName];
        this.saveState();  // Сохранение состояния после перемещения
    }

    delete(path) {
        const parts = path.split('/');
        let current = this.root;
        for (const part of parts.slice(0, -1)) {
            if (!current[part]) {
                console.log(`Cannot delete ${path} - ${parts.slice(0, -1).join('/')} does not exist`);
                return;
            }
            current = current[part];
        }
        const lastPart = parts[parts.length - 1];
        if (current.hasOwnProperty(lastPart)) {
            delete current[lastPart];
            this.saveState();  // Сохранение состояния после удаления
        } else {
            console.log(`Cannot delete ${path} - ${path} does not exist`);
        }
    }

    list() {
        const result = [];
        const traverse = (node, depth = 0) => {
            for (const key in node) {
                const indentation = ' '.repeat(depth * 2); // 2 пробела на уровень вложенности
                result.push(`${indentation}${key}`);
                traverse(node[key], depth + 1);
            }
        };
        traverse(this.root);
        return result.join('\n');
    }

    reset() {
        this.root = {};  // Сброс к исходному состоянию
        this.saveState();  // Сохранение сброшенного состояния в файл
    }
}

module.exports = DirectoryTree;
