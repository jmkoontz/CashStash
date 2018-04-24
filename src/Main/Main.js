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

const vals = [{name: "Living Expense", value: 300, color: "#353941"},{name: "Food", value: 250, color: "#9cdb97"},
    {name: "Luxury", value: 200, color: "#82c4cc"},{name: "Entertainment", value: 100, color: "#afa3cc"},
    {name: "Gas", value: 50, color: "#d67b77"}];

const colors = [
    {color: "#353941"},
    {color: "#9cdb97"},
    {color: "#82c4cc"},
    {color: "#afa3cc"},
    {color: "#d67b77"}
    ];

class Main extends Component {


  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,

      firstName: null,
      lastName: null,

      budget: [],

      show: false,
      edit: false,
    }
  }

  componentWillMount() {
    this.getUserInfo();
  }

  getUserInfo = () => {
    if (!this.state.uid) return;

    let self = this;
    let userRef = firestore.collection("users").doc(this.state.uid);

    userRef.onSnapshot((doc) => {
      if (doc.exists) {
        self.setState({
          firstName: doc.data().firstName,
          lastName: doc.data().lastName,
          budget: doc.data().budget,
        });
      }
    }).catch((error) => {
      console.log("Error getting user:", error);
    })
  };

  switch = () => {
    this.setState({
      show: !this.state.show,
    });
  };

  switchEdit = () => {
    this.setState({
      edit: !this.state.edit,
    });
  };


  render() {
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

    if (this.state.uid) {   // if user is signed in
      return (
        <div className="App">
          <Container fluid className="topBar">
            <Row>
              <div className={"titlePic"}>
                <img src={intro} alt=""/>
              </div>
            </Row>
          </Container>
          <TopBar signedIn={true} {...data}/>
          <br className={"backColor"}/>
          <br className={"backColor"}/>
          <br className={"backColor"}/>
          <Container>
            <Row className="backColor"/>
            <Row className={"backColor"}>
              <Col className={"backColor"} xs={4} />
              <Col className={"backColor"} xs={4}>
                <br/>
                <h2 className="titleCash">{this.state.firstName}'s Cash Stash</h2>
              </Col>
              <Col className={"backColor"} xs={4}/>
            </Row>
            <Row className={"backColor moreSpace"}>
              <Col xs={3} className={"backColor"}>
                {this.state.edit
                  ?
                  <div>
                    <br/>
                    <Button onClick={this.switchEdit}>Edit Budget</Button>
                    <br/>
                    <BudgetForm/>
                  </div>
                  :
                  <div>
                    <br/>
                    <Button onClick={this.switchEdit}>Edit Budget</Button>
                    <br/>
                  </div>
                }
              </Col>
              <Col xs={6} className={"backColor"}>
                {this.state.show
                  ?
                  <div>
                    <BudgetForm/>
                  </div>
                  :
                  <div>
                    <br/>
                    <Button onClick={this.switch}>Get Started!</Button>
                    <br/>
                  </div>
                }
              </Col>
              <Col xs={3} className={"backColor"}/>
            </Row>
          </Container>
        </div>
      )
    } else {  // if user is not signed in
      return (
          <div className="App">
              <body className="backImage">

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
              </body>
          </div>
      )
    }
  }
}

export default Main;