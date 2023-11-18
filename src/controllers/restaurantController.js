import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises';
import { getStatus } from '../../build/controllers/status-scrapping.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = path.resolve(__dirname, '../Data.json');

export async function getRestaurants(req, res) {
    try {
        let data = await fs.readFile(dataPath);
        let dataName = JSON.parse(data);
        dataName = [...dataName].map((e) => {
            return e.nombre
        })
        dataName = dataName.filter((valor, indice, arreglo) => arreglo.indexOf(valor) === indice);
        res.json(dataName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getResturant(req, res) {
    try {
        const { id } = req.params
        const data = await fs.readFile(dataPath);
        let dataName = await JSON.parse(data);
        const restaurant = dataName.find(obj => obj.id === parseInt(id));
        if (restaurant) {
            restaurant.status = (await getStatus(restaurant.link)).length > 0 ? "Open" : "Temporarily closed"
            res.json(restaurant)
        }
        else {
            res.status(404).send("Restaurante no existe")
            // res.json(dataName)

        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function getRestaurantsByName(req, res) {
    try {
        const { name } = req.params
        const data = await fs.readFile(dataPath);
        let dataName = await JSON.parse(data);
        const restaurants = dataName.filter((e) => e.nombre === name)
        if (restaurants.length > 0) {
            for (let r of restaurants) {
                r.status = (await getStatus(r.link)).length > 0 ? "Open" : "Temporarily closed"
            }
            res.json(restaurants)
        }
        else {
            res.status(404).send("Restaurante no existe")
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function createRestaurant(req, res) {
    try {
        const { nombre, direccion, link } = req.body
        const data = await fs.readFile(dataPath);
        let dataName = await JSON.parse(data);
        let status = "Close"
        let id = 0
        for (let i = 0; i < dataName.length; i++) {
            id = dataName[i].id
            if (dataName[i].id > id) {
                id = dataName[i]
            }
        }
        id += 1
        let restauranteNuevo = { id, nombre, direccion, link, status }
        dataName.push(restauranteNuevo)
        const json = JSON.stringify(dataName, null, 2)
        await fs.writeFile(dataPath, json, 'utf-8')
        res.json(restauranteNuevo)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function deleteRestaurant(req, res) {
    try {
        const { id } = req.params; // El ID del restaurante que quieres eliminar
        const data = await fs.readFile(dataPath, 'utf8');
        let dataName = await JSON.parse(data);

        // Filtrar el arreglo para eliminar el restaurante con el ID especificado
        const newDataName = dataName.filter(restaurant => restaurant.id !== parseInt(id));

        // Convertir el nuevo arreglo a una cadena de texto JSON
        const json = JSON.stringify(newDataName, null, 2);

        // Escribir la nueva cadena de texto JSON al archivo
        await fs.writeFile(dataPath, json, 'utf8');

        res.json({ message: 'Restaurante eliminado exitosamente.' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export async function updateRestaurant(req, res) {
    try {
        const { id } = req.params; // El ID del restaurante que quieres editar
        const { nombre, direccion, link } = req.body; // Los nuevos datos del restaurante
        const data = await fs.readFile(dataPath, 'utf8');
        let dataName = JSON.parse(data)

        // Encontrar el índice del restaurante con el ID especificado
        const index = dataName.findIndex(restaurant => restaurant.id === parseInt(id));

        if (index !== -1) {
            // Actualizar los datos del restaurante
            dataName[index] = { ...dataName[index], nombre, direccion, link };

            // Convertir el nuevo arreglo a una cadena de texto JSON
            const json = JSON.stringify(dataName, null, 2);

            // Escribir la nueva cadena de texto JSON al archivo
            await fs.writeFile(dataPath, json, 'utf8');

            res.json({ message: 'Restaurante actualizado exitosamente.' });
        } else {
            res.status(404).json({ message: 'Restaurante no encontrado.' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
