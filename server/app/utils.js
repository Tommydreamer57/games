
function JSONFriendly(obj, prev = []) {
    const type = typeof obj;
    if (type === 'function') {
        // convert functions into strings
        return type;
    } else if (typeof obj !== 'object') {
        // return non object types unaltered
        return obj;
    } else {
        let newObj;
        if (obj[Symbol.iterator]) {
            // convert all iterable objects into arrays
            newObj = [];
            for (let value of obj) {
                let { copy } = prev.find(item => item.value === value) || {};
                if (!copy) {
                    copy = JSONFriendly(value, prev);
                    prev.push({ value, copy });
                }
                newObj.push(copy);
            }
        } else {
            newObj = {};
            for (let key in obj) {
                let value = obj[key];
                let { copy } = prev.find(item => item.value === value) || {};
                if (copy) {
                    newObj[key] = copy;
                } else {
                    copy = JSONFriendly(value, prev);
                    prev.push({ value, copy });
                    newObj[key] = copy;
                }
            }
        }
        return newObj;
    }
}

Object.assign(module.exports, {
    JSONFriendly
});
