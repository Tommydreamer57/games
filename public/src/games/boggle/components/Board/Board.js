import React from 'react';

export default function Board({ board, word }) {
    return (
        <div>
            {board.map(row => (
                <div>
                    {row.map(item => item.letter).join('')}
                </div>
            ))}
        </div>
    );
}
