import React from 'react';

export default function WordInput({word, change, keyDown}) {
    return (
        <div>
            WORDINPUT
            <input
                value={word}
                onChange={change}
                onKeyDown={keyDown}
            />
        </div>
    );
}
