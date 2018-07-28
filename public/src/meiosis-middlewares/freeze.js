
export default function (update) {

    return function freeze(obj, prev = []) {

        if (!obj || typeof obj !== 'object') return Object.freeze(obj);
        
        else {
            prev.push(obj);
            
            let newObj = {};

            if (Array.isArray(obj)) newObj = [];

            for (let key in obj) if (!prev.includes(obj[key])) newObj[key] = freeze(obj[key], prev);

            return Object.freeze(newObj);
        }
    }
}
