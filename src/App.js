import React from 'react';
import {render} from 'react-dom';
import { Router, Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import KanbanBoardContainer from './KanbanBoardContainer';
import KanbanBoard from './KanbanBoard';
import EditCard from './EditCard';
import NewCard from './NewCard';
import { Wrapper } from './Wrapper'

export const history = createHistory();


/*let cardsList = [
    {
        id: 1,
        title: "Read the Book",
        description: "I should read the whole book",
        color: '#BD8D31',
        status: "in-progress",
        tasks: []
    },
    {
        id: 2,
        title: "Write some code",
        description: "Code along with the samples in the book. The complete source can be found at [github](https://github.com/pro-react)",
        color: '#3A7E28',
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
];*/

// render((
//
// ), document.getElementById('root'));
//
// export default App;

export class App extends React.Component {
    render() {
        return(
            <Router history={history}>
                <Route path="/">
                    <KanbanBoardContainer>
                        <Route exact path="/" />
                        <Route path="/new" component={NewCard} />
                        {/*<Route path="/edit/:card_id" component={EditCard} />*/}
                    </KanbanBoardContainer>
                </Route>

            </Router>
        )
    }
}