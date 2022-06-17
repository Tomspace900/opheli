import React, {Component} from 'react';
import form from "./Form";
import axios from "axios";

class Form_test extends Component{
    state = {
        text : ""
    };

    handleAdd = async e =>{
        await this.setState({
            text : e.target.value
        })
    }

    handleSubmit = e =>{
        //e.preventDefault();
        console.log(this.state.text);
        let formData = new FormData();
        formData.append('text', this.state.text);
        const url = "http://ophelibackend/PHP/login/backend_test.php";
        axios.post(url, formData)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
    return (
        <div className="form">
            <form>
                <label>Date de prescription : </label>
                <input onChange={this.handleAdd} value={this.state.text} type="text" id="text" name="text" />

                <button onClick={this.handleSubmit()}>Générer</button>
            </form>
        </div>
    );
    }
}

export default Form_test;
