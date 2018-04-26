import React, {Component} from 'react';
import {firestore} from "../base";
import {Container, Row, Col, Button, ListGroup, ListGroupItem} from 'reactstrap';
import {ResponsiveContainer} from 'recharts';
import './Main.css';

import TopBar from './TopBar';
import BudgetForm from '../BudgetForm/BudgetForm'

//for default values
import HomeFull from '../Charts/HomeFullPie'
import HomeWeek from '../Charts/HomeWeeklyPie'
import HomeDay from '../Charts/HomeDailyPie'

import FullPie from '../Charts/FullPie'
import WeekPie from '../Charts/WeeklyPie'
import DayPie from '../Charts/DailyPie'

import HomeLegend from '../HomeLegend'
import Legend from '../Legend'

import BudgetList from "./BudgetList";

const vals = [{name: "Living Expense", value: 300, color: "#353941"}, {name: "Food", value: 250, color: "#9cdb97"},
  {name: "Luxury", value: 200, color: "#82c4cc"}, {name: "Entertainment", value: 100, color: "#afa3cc"},
  {name: "Gas", value: 50, color: "#d67b77"}];

/*const colors = [
  {color: "#353941"},
  {color: "#9cdb97"},
  {color: "#82c4cc"},
  {color: "#afa3cc"},
  {color: "#d67b77"},

    {color: "#3449a1"},
    {color: "#9cdff7"},
    {color: "#82addc"},
    {color: "#aa445c"},
    {color: "#d67667"},

    {color: "#35a331"},
    {color: "#9cffa7"},
    {color: "#80ffcc"},
    {color: "#a3a4dc"},
    {color: "#327"},

    {color: "#aa7741"},
    {color: "#dda797"},
    {color: "#8dda7c"},
    {color: "#afdda7"},
    {color: "#ddda77"},

];*/

class Main extends Component {


  constructor(props) {
    super(props);

    this.state = {
      uid: props.uid,

      firstName: null,
      lastName: null,

      budgets: [],

      new: false,

      selectedBudget: null,
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

  showNew = () => {
    this.setState({
      new: true,
      selectedBudget: null,
    });
  };

  /*
   * Sets the states need for the graph data based on the budget name
   */
  loadBudget = (budget) => {
    this.setState({
      new: false,
      selectedBudget: budget,
    });
  };

  render() {
    let data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      budgets: this.state.budgets,
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
                  <h2 className="titleCash">{this.state.firstName}'s Cash$tash</h2>
                </Col>
                <Col xs={4}/>
              </Row>
              <div>
                <br/>
                <Row>
                  <Col xs={6}>
                      {(this.state.new || this.state.selectedBudget)
                          ?
                          <BudgetForm selectedBudget={this.state.selectedBudget} uid={this.state.uid}/>
                          :
                          <Row>
                            <Col xs={{size: 4}}/>
                            <Col xs={{size: 4, offset: 1}}>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                                <br/>
                              <p style={{color: "#616161"}}>
                                  Your budget will be shown here when selected
                              </p>
                            </Col>
                          </Row>
                      }
                  </Col>
                  <Col xs={1}/>
                  <Col xs={{size: 4}}>
                    <Row>
                      <Col xs={2}>
                        <Button onClick={this.showNew}>New Budget</Button>
                      </Col>
                    </Row>
                    <br/>
                      <h1>Select a Budget</h1>
                    <br/>
                    <BudgetList budgets={this.state.budgets} selectedBudget={this.state.selectedBudget}
                                loadBudget={this.loadBudget}/>
                    <hr/>
                    <Row>
                      <Col>
                        <Button onClick={this.showNew} block>New Budget</Button>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={1}/>
                </Row>
                  {this.state.selectedBudget
                      ?
                      <div>
                          <Row>
                              <Col xs={{size: 4, offset: 4}}>
                                  <br/>
                                  <br/>
                                  <h1 className={"fullBudget"}>Monthly Budget</h1>
                                  <hr/>
                              </Col>

                          </Row>
                      <Row>
                          <Col>
                              <FullPie vals={this.state.selectedBudget}/>
                          </Col>
                          <Col xs={{size: 4, offset: 1}} className="rightAlign">
                            <Legend vals={this.state.selectedBudget}/>
                          </Col>
                      </Row>
                          <Row>
                              <Col xs={{size: 4, offset: 1}}>
                                  <h1 className={"fullBudget"}>Weekly Budget</h1>
                                  <hr/>
                              </Col>
                              <Col xs={{size: 4, offset: 2}}>
                                  <h1 className={"fullBudget"}>Daily Budget</h1>
                                  <hr/>
                              </Col>
                          </Row>
                          <Row>
                              <Col>
                                  <WeekPie vals={this.state.selectedBudget}/>
                              </Col>
                              <Col>
                                  <DayPie vals={this.state.selectedBudget}/>
                              </Col>
                          </Row>
                      </div>
                      : null
                  }
                <div className={"moreSpace"}/>
              </div>
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
                <br/>
                <p className={"titOut"}>Your money troubles are a thing of the past!<hr/>Cash Stash is a simple and effective way to manage your monthly,
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
                <HomeFull vals={vals}/>
                </ResponsiveContainer>
              </Col>

                <Col className="rightAlign" md={{size: 4, offset: 4}} lg={{size: 4, offset: 3}}>
                    <br/>
                    <br/>
                    <p>Wonce calcuwated, your monfwy budget will be shown all pwetty like right hewere!</p>
                    <br/>
                    <br/>
                  <HomeLegend vals={vals}/>
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
                <HomeWeek vals={vals}/>
              </Col>
              <Col>
                <HomeDay vals={vals}/>
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