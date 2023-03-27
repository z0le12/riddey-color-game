import { v4 } from 'uuid';

interface DBTypes {
    find: Function,
    insert: Function,
    remove: Function,
}

interface AddItemType {
    title: string,
    code: string,
}

const DB:DBTypes = {
    find: function() {
        let data: string | null = localStorage.getItem('data')
        if(!data) {
            const defaultData:[] = []
            localStorage.setItem('data', JSON.stringify(defaultData))
            return defaultData
        }
        return JSON.parse(data)
    },
    insert: function(item:AddItemType) {
        let data = this.find()
        data = [...data, {_id: v4(), ...item}]
        localStorage.setItem('data', JSON.stringify(data))
        return data
    },
    remove: function(_id: string) {
        let data = this.find()
        data = data.filter((item: { _id: string }) => item._id !== _id)
        localStorage.setItem('data', JSON.stringify(data))
        return data
    }
}

export const getColors = (params = {}) => {
    return DB.find(params)
}

export const addColor = (color:AddItemType) => {
    return DB.insert(color)
}

export const deleteColor = (_id: string) => {
    return DB.remove(_id)
}