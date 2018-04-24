import React, { Component } from 'react';
import { firestore } from "../base";
import { Container, Row, Col, Button } from 'reactstrap';
import {ResponsiveContainer} from 'recharts';
import './Main.css';

import TopBar from './TopBar';
import BudgetForm from '../BudgetForm/BudgetForm'
import FullPie from '../Charts/FullPie'
import WeekPie from '../Charts/WeeklyPie'
import DayPie from '../Charts/DailyPie'

import intro from '../dollabills.jpeg'

const vals = [{name: "Living Expense", value: 300, color: "#00C49F"},{name: "Food", value: 250, color: "#55B8D9"},
    {name: "Luxury", value: 200, color: "#E8F576"},{name: "Entertainment", value: 100, color: "#B855D9"},
    {name: "Gas", value: 50, color: "#FF8042"}];

class Main extends Component {


  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,

      firstName: null,
      lastName: null,
      show: false,
    }
  }

  componentWillMount() {
    this.getName();
  }

  getName = () => {
    if (!this.state.uid) return;

    let self = this;
    let userRef = firestore.collection("users").doc(this.state.uid);

    userRef.get().then((doc) => {
      if (doc.exists) {
        self.setState({
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
        });
      }
    }).catch((error) => {
      console.log("Error getting user:", error);
    })
  };

  switch = () => {
    this.setState({
      show: !this.state.show,
    })
  }

  render() {
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

    if (this.state.uid) {   // if user is signed in
      return (
        <div className="App">
          {/*<Container fluid className="topBar">
            <Row>
              <div className={"titlePic"}>
                <img src={intro} alt=""/>
              </div>
            </Row>
          </Container>*/}
          <TopBar signedIn={true} {...data}/>
          <br/>
          <br/>
          <br/>
          <Container>
            <Row className="space"/>
            <Row >
              <Col xs={4}/>
              <Col xs={4}>
                <h2 className="titleCash">{this.state.firstName}'s Cash Stash</h2>
              </Col>
                <Col xs={4}/>
            </Row>
            <Row>
              <Col xs={3}/>
              <Col xs={6}>
                {this.state.show
                  ?
                  <div>
                    <BudgetForm/>
                  </div>
                  :
                  <div>
                    <Button onClick={this.switch}>Get Started!</Button>
                  </div>
                }
              </Col>
              <Col xs={3}/>
            </Row>
          </Container>
        </div>
      )
    } else {  // if user is not signed in
      return (
          <div className="App fullBack">

              <TopBar signedIn={false} {...data}/>

              <Container className="graphBack">
                  <br/>
                  <br/>
                  <br/>
                  <Row className="space"/>
                  <Row>
                      <Col xs={4}/>
                      <Col xs={4}>
                          <h2 className="titleCash">Cash Stash</h2>
                      </Col>
                      <Col xs={4}/>
                  </Row>
                  <hr/>
                  <Row>
                      <Col>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <h1 className={"fullBudget"}>Full Budget</h1>
                      </Col>
                      <Col>
                          <FullPie vals={vals}/>
                      </Col>
                  </Row>
                  <hr/>
                  <Row>
                      <Col>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <h1 className={"fullBudget"}>Weekly Budget</h1>
                      </Col>
                      <Col>
                          <WeekPie vals={vals}/>
                      </Col>
                  </Row>
                  <hr/>
                  <Row>
                      <Col>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <br/>
                          <h1 className={"fullBudget"}>Daily Budget</h1>
                      </Col>
                      <Col>
                          <DayPie vals={vals}/>
                      </Col>
                  </Row>
              </Container>
          </div>
      )
    }
  }
}

export default Main;