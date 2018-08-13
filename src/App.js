import React, {Component} from 'react';
import {render} from 'react-dom';
import KanbanBoard from './KanbanBoard';

//создаем массив cardList со списком задач; в дальнейшем список задач будет поступать с сервера;
let cardsList = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read the whole book",
        status: "in-progress",
        tasks: []
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book",
        status: "todo",
        tasks: [
            {
                id: 1,
                name: "ContactList Example",
                done: true
            },
            {
                id: 2,
                name: "Kanban Example",
                done: false
            },
            {
                id: 3,
                name: "My own experiments",
                done: false
            }
        ]
    }
];

render(<KanbanBoard cards={cardsList} />, document.getElementById('root'));