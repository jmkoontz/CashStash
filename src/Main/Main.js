import React, {Component} from 'react';
import {firestore} from "../base";
import {Container, Row, Col, Button} from 'reactstrap';
import {ResponsiveContainer} from 'recharts';
import './Main.css';

import TopBar from './TopBar';
import BudgetForm from '../BudgetForm/BudgetForm'
import FullPie from '../Charts/FullPie'
import WeekPie from '../Charts/WeeklyPie'
import DayPie from '../Charts/DailyPie'

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
      show: false,
      edit: false,
      graphs: false,
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
  }


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
              <Col className={"backColor"} xs={4}/>
              <Col className={"backColor"} xs={4}>
                <br/>
                <h2 className="titleCash">{this.state.firstName}'s Cash Stash</h2>
              </Col>
              <Col className={"backColor"} xs={4}/>
            </Row>
              {this.state.graphs
                ?
                <Row className={"backColor moreSpace"}>
                  <Col xs={3} className={"backColor"}>
                    {this.state.edit
                      ?
                      <div>
                        <br/>
                        <Button onClick={this.switchEdit}>Edit Budget</Button>
                        <br/>
                        <BudgetForm showGraphs={this.showGraphs}/>
                      </div>
                      :
                      <div>
                        <br/>
                        <Button onClick={this.switchEdit}>Edit Budget</Button>
                        <br/>
                      </div>
                    }
                  </Col>
                  <Col xs={9} className={"backColor"}>
                    {/*Show the graphs here*/}
                  </Col>
                </Row>
                :
                  <Row className={"backColor moreSpace"}>
                    <Col xs={3} className={"backColor"}>
                      {this.state.edit
                        ?
                        <div>
                          <br/>
                          <Button onClick={this.switchEdit}>Edit Budget</Button>
                          <br/>
                          <BudgetForm showGraphs={this.showGraphs}/>
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
                    <Col xs={3} className={"backColor"}/>
                  </Row>
              }
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
              <Col xs={12}>
                <h2 className="titleCash">Cash Stash</h2>
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
              <Col xs={{size: 4, offset: 3}}>
                <FullPie vals={vals}/>
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