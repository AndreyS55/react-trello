import React, { Component } from 'react'; //импортируем объекты из библиотеки react;
import Card from './Card'; // импортируем компонент Card из файла Card.js;
//создаем компонент List
class List extends Component {
    render() {
        var cards = this.props.cards.map((card) => { //метод arr.map() возвращает новый массив и записывает его в cards;
            return <Card id={card.id} //зачем здесь Card? Почему card.id, а не this.props.cards.id?
                         title={card.title}
                         description={card.description}
                         tasks={card.tasks} />
        });
        return (
            <div className="list">
                <h1>{this.props.title}</h1> //здесь this.props.title относится к List?
                {cards}
            </div>
        );
    }
}
export default List;