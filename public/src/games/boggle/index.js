import React from 'react';
import component, { results } from './boggle';
// import './boggle.css';

export default {
    name: 'Boggle',
    description: 'this is a word game',
    max_players: 24,
    min_players: 2,
    component,
    results
}
