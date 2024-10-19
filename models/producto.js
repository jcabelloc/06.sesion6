const fs = require('fs');
const path = require('path');

const raizDir = require('../utils/path');

const p = path.join(raizDir, 'data', 'productos.json');

const getProductosFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if(err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Producto {
    constructor(nombre, urlImagen, descripcion, precio) {
        this.nombre = nombre;
        this.urlImagen = urlImagen;
        this.descripcion = descripcion;
        this.precio = precio;
    }

    save() {
        this.id = Math.random().toString();
        getProductosFromFile( productos => {
            productos.push(this);
            fs.writeFile(p, JSON.stringify(productos), err => {
                console.log(err);
            })
        })

    }

    static fetchAll(cb) {
        return getProductosFromFile(cb);
    }

    static findById(id, cb) {
        getProductosFromFile(productos => {
            const producto = productos.find(prod => prod.id === id);
            cb(producto);
        })
    }

}