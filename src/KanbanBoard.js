import React, {Component} from 'react'; //импортируем объекты из библиотеки react;
import List from './List'; // импортируем компонент List из файла List.js;
//создаем компонент KanbanBoard
class KanbanBoard extends Component {
    render() {
        return (
            <div className="app">					//this.props.cards берется из cardsList???
                <List id='todo' title="To Do" cards={this.props.cards.filter((card) => card.status === "todo")}/> // метод arr.filter создает новый массив, в который войдут элементы с card.status === to do.
                <List id='in-progress' title="In Progress" cards={this.props.cards.filter((card) => card.status === "in-progress")}/>
                <List id='done' title='Done' cards={this.props.cards.filter((card) => card.status === "done")}/>
            </div>
        );
    }
}
export default KanbanBoard;