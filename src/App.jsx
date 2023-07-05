import React, { Component } from 'react'
import './App.css'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questions: [],
      choices: [],
      logo: null
    }
  }
  componentDidMount() {
    fetch('https://brijfeedback.pythonanywhere.com/api/get-feedback-questions/?format=json&unitID=1').then(res => res.json()).then(data => this.setState({
      questions: data.feedbackQuestions,
      logo: data.companyLogo,
      choices:data.choices,
      choice: new Array(data.feedbackQuestions.length).fill('')
    }))
  }
  handleChoiceChange =(index, value) =>{
    const choice = this.state.choice
    choice[index] = value
    this.setState = ({
      choice: choice
    })
    // console.log(this.state);
    // console.log(value,index);
  }
  handleSubmit() {
    const feedback = {
      questions: this.state.questions,
      choices: this.state.choice
    }
    console.log(feedback);
  }
  
  render() {
    return (
      <div className='container'>
        <div className='z-depth-5'>
          <img src={this.state.logo} alt="CompnyLogo" className='logo' />
          {this.state.questions.map((question, index) => (
            <div key={index}>
              <p className='qustions'>{index + 1}.  {question}</p>
              {this.state.choices[index].map((ele, ind) => (
                <span key={ind}>
                  <label>
                    <input
                      type="radio"
                      name={`choice-${index}`}
                      value={ele}
                      onChange={() => this.handleChoiceChange(index, ele)} className='with-gap'
                    />
                    <span className='lable_name'>{ele}</span>
                  </label>
                </span>
              ))}
            </div>
          ))}
          <button className="btn waves-effect waves-light submitBtn" type="submit" name="action" onClick={() => this.handleSubmit()}>Submit
          </button>
        </div>
      </div>
    )
  }
}

export default App
