import React, {Component} from 'react';
import {firestore} from "../base";
import {Container, Row, Col, Button, ListGroup, ListGroupItem} from 'reactstrap';
import {ResponsiveContainer} from 'recharts';
import './Main.css';

import TopBar from './TopBar';
import BudgetForm from '../BudgetForm/BudgetForm'
import FullPie from '../Charts/FullPie'
import WeekPie from '../Charts/WeeklyPie'
import DayPie from '../Charts/DailyPie'
import Legend from '../Legend'

import intro from '../dollabills.jpeg'

const vals = [{name: "Living Expense", value: 300, color: "#353941"}, {name: "Food", value: 250, color: "#9cdb97"},
  {name: "Luxury", value: 200, color: "#82c4cc"}, {name: "Entertainment", value: 100, color: "#afa3cc"},
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

      budgets: [],

      show: false,
      edit: false,
      graphs: true,
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
        });

        let budgetsRef = userRef.collection("budgets");
        budgetsRef.get().then((docs) => {
          docs.forEach((doc) => {
            self.setState({budgets: self.state.budgets.concat({code: doc.id, data: doc.data()})});
          });
        });
      }
    });
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

  showGraphs = () => {
    this.setState({
      graphs: true,
    });
  };

  /*
   * Sets the states need for the graph data based on the budget name
   */
  loadBudget = () => {

  };


  render() {
    console.log(this.state.budgets);
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
    };

    if (this.state.uid) {   // if user is signed in
      return (
        <div className="App">
          <div className="backImage">
          <TopBar signedIn={true} {...data}/>
          <br/>
          <br/>
          <br/>
          <Container className="graphBack">
            <Row/>
            <Row>
              <Col xs={4}/>
              <Col xs={4}>
                <br/>
                <h2 className="titleCash">{this.state.firstName}'s Cash Stash</h2>
              </Col>
              <Col xs={4}/>
            </Row>
              {this.state.graphs
                ?
                <Row className={"moreSpace"}>
                  <Col xs={6}>
                    <div>
                      <br/>
                      {/* TODO make a loop which generates the Budget form based on what the user already had*/}
                      <BudgetForm uid={this.state.uid} showGraphs={this.showGraphs}/>
                    </div>
                  </Col>
                  <Col xs={1}/>
                  <Col xs={{size: 4}}>
                    <br/>
                    <ListGroup>
                      <ListGroupItem className={"test"} active>Select a Budget</ListGroupItem>
                    </ListGroup>
                    <ListGroup>
                      {/* TODO generate all the existing */}
                      <ListGroupItem className={"test"} tag="button" onClick={this.loadBudget}>June Budget</ListGroupItem>
                      <ListGroupItem className={"test"} tag="button" onClick={this.loadBudget}>July Budget</ListGroupItem>
                      <ListGroupItem className={"test"} tag="button" onClick={this.loadBudget}>August Budget</ListGroupItem>
                      <ListGroupItem className={"test"} tag="button" onClick={this.loadBudget}>September Budget</ListGroupItem>
                    </ListGroup>
                  </Col>
                  <Col xs={1} />
                </Row>
                :
                  <Row className={"moreSpace"}>
                    <Col xs={3}/>

                    <Col xs={6}>
                      {this.state.show
                        ?
                        <div>
                          <BudgetForm showGraphs={this.showGraphs}/>
                        </div>
                        :
                        <div>
                          <br/>
                          <Button onClick={this.switch}>Get Started!</Button>
                          <br/>
                        </div>
                      }
                    </Col>
                    <Col xs={3}/>
                  </Row>
              }
          </Container>
          </div>
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
              <Col xs={12}>
                <h2 className="titleCash">Cash$tash</h2>
                <p>Your money troubles are a thing of the past! Cash Stash is a simple and effective way to manage your monthly,
                  weekly, and daily budget.  Our graphs give a break down of where each dollar of your budget ends up to help you plan ahead.</p>
              </Col>
            </Row>
            <hr/>
            <Row>
              <Col xs={{size: 4, offset: 4}}>
                <h1 className={"fullBudget"}>Monthly Budget</h1>
              </Col>
            </Row>
            <Row>
              <Col md={{size: 4}} xs={{size: 4}}>
                <ResponsiveContainer>
                <FullPie vals={vals}/>
                </ResponsiveContainer>
              </Col>

                <Col className="rightAlign" md={{size: 4, offset: 4}} lg={{size: 4, offset: 3}}>
                    <br/>
                    <br/>
                    <p>Wonce calcuwated, your monfwy budget will be shown all pwetty like right hewere!</p>
                    <br/>
                    <br/>
                  <Legend vals={vals}/>
                </Col>
            </Row>
            <hr/>
            <Row>
              <Col xs={{size: 4, offset: 1}}>
                <h1 className={"fullBudget"}>Weekly Budget</h1>
              </Col>
              <Col xs={{size: 4, offset: 2}}>
                <h1 className={"fullBudget"}>Daily Budget</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <WeekPie vals={vals}/>
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