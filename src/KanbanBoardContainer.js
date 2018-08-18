import React, {Component} from 'react';
import KanbanBoard from './KanbanBoard';
import 'whatwg-fetch';
import update from 'react-addons-update';
import 'babel-polyfill';

const API_URL = 'http://kanbanapi.pro-react.com';
const API_HEADERS = {
   'Content-Type': 'application/json',
    Authorization: 'any-string' //(the authorization is not needed for local server)
};

class KanbanBoardContainer extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            cards: [],
        };
    }

    componentDidMount() {
        fetch(API_URL + '/cards', {headers: API_HEADERS})
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({cards: responseData});
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            });
    }

    addTask(cardId, taskName){
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let newTask = {id: Date.now(), name: taskName, done: false};
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$push: [newTask]}
            }
        });
        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newTask)
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server response wasn't OK");
                }
                return response.json();
            })
            .then((responseData) => {
                newTask.id = responseData.id;
                this.setState({cards: nextState});
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                this.setState(prevState);
            });
    }

    deleteTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {$splice: [[taskIndex,1]] }
            }
        });
        this.setState({cards:nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'delete',
            headers: API_HEADERS
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server response wasn't OK");
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                this.setState(prevState);
            });
    }

    toggleTask(cardId, taskId, taskIndex) {
        let prevState = this.state;
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        let newDoneValue;
        let nextState = update(this.state.cards, {
            [cardIndex]: {
                tasks: {
                    [taskIndex]: {
                        done: {
                            $apply: (done) => {
                                newDoneValue = !done;
                                return newDoneValue;
                            }
                        }
                    }
                }
            }
        });
        this.setState({cards: nextState});
        fetch(`${API_URL}/cards/${cardId}/tasks/${taskId}`, {
            method: 'put',
            headers: API_HEADERS,
            body: JSON.stringify({done: newDoneValue})
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Server response wasn't OK");
                }
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                this.setState(prevState);
            });
    }

    updateCardStatus(cardId, listId) {
        // Find the index of the card
        let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
        // Get the current card
        let card = this.state.cards[cardIndex];
        // Only proceed if hovering over a different list
        if (card.status !== listId) {
            // set the component state to the mutated object
            this.setState(update(this.state, {
                cards: {
                    [cardIndex]: {
                        status: {$set: listId}
                    }
                }
            }));
        }
    }

    updateCardPosition(cardId, afterId) {
        // Only proceed if hovering over a different card
        if (cardId !== afterId) {
            // Find the index of the card
            let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
            // Get the current card
            let card = this.state.cards[cardIndex];
            // Find the index of the card the user is hovering over
            let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);
            // Use splice to remove the card and reinsert it a the new index
            this.setState(update(this.state, {
                cards: {
                    $splice: [
                        [cardIndex, 1],
                        [afterIndex, 0, card]
                    ]
                }
            }));
        }
    }

    render() {
        return <KanbanBoard cards={this.state.cards}
                            taskCallbacks={{
                                toggle: this.toggleTask.bind(this),
                                delete: this.deleteTask.bind(this),
                                add: this.addTask.bind(this)
                            }}
                            cardCallbacks={{
                                updateStatus: this.updateCardStatus.bind(this),
                                updatePosition: this.updateCardPosition.bind(this)
                            }}
        />
    }
}

export default KanbanBoardContainer;