function JSONFriendly(obj, prev = []) {
    // convert all iterable objects into arrays
    if (typeof obj !== 'object') {
        return obj;
    } else {
        let newObj;
        if (obj[Symbol.iterator]) {
            newObj = [];
            for (let value of obj) {
                let { copy } = prev.find(item => item.value === value) || {};
                if (copy) {
                    newObj[key] = copy;
                } else {
                    copy = JSONFriendly(value, prev);
                    prev.push({ value, copy });
                    newObj.push(copy);
                }
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
