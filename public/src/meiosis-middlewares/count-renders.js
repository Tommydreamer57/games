
export default function countRenders(update) {
    let i = 0;
    return model => ({
        ...model,
        count: ++i
    });
}
