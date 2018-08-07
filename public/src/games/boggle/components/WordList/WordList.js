import React from 'react';

export default function WordList({words}) {
    return (
        <div>
            {words.map(word => (
                <div>{word}</div>
            ))}
        </div>
    );
}
