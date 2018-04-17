import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  
  state = {   
      reciepes: []
    }

  // Delete a reciepe.
  deleteRecipe(index) {
    let reciepes = this
      .state
      .reciepes
      .slice(); // Get the array of recipes.
    reciepes.splice(index, 1);
    localStorage.setItem("recipes", JSON.stringify(reciepes));
    this.setState({reciepes});
  }

  // Add a reciepe.
  addRecipe(recipe) {
    let reciepes = this
      .state
      .reciepes
      .slice();
    reciepes.push(recipe);
    localStorage.setItem("recipes", JSON.stringify(reciepes));
    this.setState({reciepes});
  }

  // New recipe.
  newRecipe(value1, value2) {
    let newRecipe = {
      reciepeName: "",
      ingredients: []
    }
    newRecipe.reciepeName = value1;
    newRecipe.ingredients = value2;
    this.addRecipe(newRecipe);
  }

  // Gather values from edit to edit them.
  gatherValToEdit(index, reciepeName, ingredients) {
    this.refs.index.value = index;
    this.refs.edit1.value = reciepeName;
    this.refs.edit2.value = ingredients.join(',');
  }

  //Update Recipe.
  updateRecipe(reciepeName, ingredient, index) {
    let reciepes = this
      .state
      .reciepes
      .slice();

      reciepes[index].reciepeName = reciepeName;
      reciepes[index].ingredients = ingredient.split(',');
      localStorage.setItem("recipes", JSON.stringify(reciepes));
      this.setState({reciepes});
  }

  componentDidMount() {
    let reciepes = JSON.parse(localStorage.getItem("recipes")) || [];
    this.setState({reciepes})
  }

  render() {
    const {reciepes} = this.state;
    return (

      <div className="App container">
        <ul className="collapsible">
          {
            reciepes.map((reciepe, index) => (
            <li key={index}>
              <div className="collapsible-header">{reciepe.reciepeName}</div>
              <div className="collapsible-body">
                <span>
                  <ol>
                    {reciepe
                      .ingredients
                      .map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                  </ol>
                  <div className="buttons">
                    <button className="blue modal-trigger" href="#modal2" onClick={(event) => this.gatherValToEdit(index, reciepe.reciepeName, reciepe.ingredients)}>Edit</button>
                    <button className="red" onClick={(event) => this.deleteRecipe(index)}>Delete</button>
                  </div>
                </span>
              </div>
            </li>
          ))}
        </ul>

        {/* Start Modals */}
        <div>
          <div id="modal1" className="modal">
            <div className="modal-content">
              <input type="text" placeholder="Recipe Name..." ref="val1"/>
              <input
                type="text"
                placeholder="Ingredient and then press enter (Separates by comma ',')"
                ref="val2"/>
            </div>
            <div className="modal-footer">
              <a
                className="modal-action modal-close waves-effect waves-green btn-flat"
                onClick={() => this.newRecipe(this.refs.val1.value, this.refs.val2.value.split(','))}>Add</a>
            </div>
          </div>

          <div>
            <div id="modal2" className="modal">
              <div className="modal-content">
                <input type="text" placeholder="Recipe Name..." ref="edit1"/>
                <input
                  type="text"
                  placeholder="Ingredient and then press enter (Separates by comma ',')"
                  ref="edit2"/>
              </div>
              <div className="modal-footer">
                <a
                  className="modal-action modal-close waves-effect waves-green btn-flat"
                  onClick={() => this.updateRecipe(this.refs.edit1.value, this.refs.edit2.value, this.refs.index.value)}>Edit</a>
              </div>
              <input type="hidden" ref="index"/>
            </div>
          </div>
        </div>
       {/* End Modals */}

        <a className="waves-effect waves-light btn modal-trigger right" href="#modal1">Add Recipe</a>
      </div>
    );
  }
}

export default App;
