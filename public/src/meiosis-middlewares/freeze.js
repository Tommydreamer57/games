
export default function (update) {

    return function freeze(obj) {

        if (!obj || typeof obj !== 'object') return Object.freeze(obj);

        else {
            let newObj = {};

            if (Array.isArray(obj)) newObj = [];

            for (let key in obj) newObj[key] = freeze(obj[key]);

            return Object.freeze(newObj);
        }
    }
}
