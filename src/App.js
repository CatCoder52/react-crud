import React, { Component, Fragment } from 'react';
import './../src/App.css';
import ListItem from './ListItem';
import Notiflix from 'notiflix-react';
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';
const cookie_key = 'TODOS';

export default class componentName extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newTodo: '',

			editing: false,

			editingIndex: null,

			todos: []
		};
	}

	componentDidMount() {
		let data = read_cookie(cookie_key).filter(function(x) {
			return x !== null;
		});

			this.setState({ todos: data });
	
	}

	generateTodoId = () => {
		const lastTodo = this.state.todos[this.state.todos.length - 1];

		if (lastTodo) {
			return lastTodo.id + 1;
		}

		return 1;
	};

	addTodo = event => {
		event.preventDefault();

		const addNew = {
			name: this.state.newTodo,
			id: this.generateTodoId()
		};

		const todos = this.state.todos;
		todos.push(addNew);

    this.setState({ todos });
    
    this.setState({ newTodo: '' });

		bake_cookie(cookie_key, this.state.todos);

		Notiflix.Notify.Success('A new todo added!');
	};

	handleChange = event => {
		event.preventDefault();
		this.setState({
			newTodo: event.target.value
		});
	};

	clear = () => {
		delete_cookie(cookie_key);

		this.setState({ todos: [{}] });
		Notiflix.Notify.Failure('All todos deleted!');
	};

	deleteTodo(index) {
		let todos = this.state.todos;

		delete todos[index];

		this.setState({ todos });

		Notiflix.Notify.Failure('The todo is deleted!');

		bake_cookie(cookie_key, this.state.todos);
	}

	editTodo(index) {
		const todo = this.state.todos[index];

		this.setState({
			editing: true,
			newTodo: todo.name,
			editingIndex: index
		});
	}

	updateTodo = event => {
		event.preventDefault();

		const todo = this.state.todos[this.state.editingIndex];

		todo.name = this.state.newTodo;

		const todos = this.state.todos;

		todos[this.state.editingIndex] = todo;

		this.setState({ todos, editing: false, editingIndex: null, newTodo: '' });

		Notiflix.Notify.Info('Todo Updated!');
	};

	render() {
		return (
      <Fragment>
        <div className='row'>
          <form className='col s12'>
            <div className='center paper'>
              <div className='input-field'>
                <i className='material-icons prefix'>playlist_add</i>
                <textarea
                  id='icon_prefix2'
                  className='materialize-textarea'
                  placeholder='Add a new todo'
                  onChange={this.handleChange}
                  value={this.state.newTodo}
                />

                <button
                  className='waves-effect waves-light btn col s4 left'
                  onClick={this.state.editing ? this.updateTodo : this.addTodo}
                >
                  {this.state.editing ? 'Update Todo' : 'Add Todo'}
                </button>

                <button
                  className='waves-effect waves-light btn red col s4 right'
                  onClick={this.clear}
                >
                  Delete All
                </button>
              </div>
            </div>
          </form>
        </div>
        {!this.state.editing && (
          <div className="paperbody">
            <ul className='collection'>
              {this.state.todos.map((item, index) => {
                return (
                  <ListItem
                    key={item.id}
                    item={item}
                    editTodo={() => this.editTodo(index)}
                    deleteTodo={() => this.deleteTodo(index)}
                  />
                );
              })}
            </ul>
          </div>
        )}
      </Fragment>
    );
	}
}
