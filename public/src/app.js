import React from 'react';

export default function createApp(update) {

    return {
        view(model) {
            return (
                <div id="app">
                    MITOSIS!
                </div>
            );
        }
    };
}
