import React from 'react';
import moment from 'moment';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     first: '',
     last: '',
     contents: '',
     startDate: moment().format('YYYY-MM-DD'),
     bottlesPerDay: 3,
     bottlesOnFirstDay: 3
    }
  }

  setData = (key, val) => {
    this.setState({
      [key]: val
    });
  }

  render() {
    let nextDateGenerator = getNextDate(this.state.startDate, this.state.bottlesPerDay, this.state.bottlesOnFirstDay);
    return (
      <div className="app">
        <Controls {...this.state} 
          setFirstName={(value) => this.setData('first', value)} 
          setLastName={(value) => this.setData('last', value)} 
          setContents={(value) => this.setData('contents', value)} 
          setStartDate={(value) => this.setData('startDate', value)} 
          setBottlesPerDay={(value) => this.setData('bottlesPerDay', value)} 
          setBottlesOnFirstDay={(value) => this.setData('bottlesOnFirstDay', value)} />
        <Page {...this.state} nextDate={() => nextDateGenerator.next().value } />
      </div>
    );
  }
}

const BigCard = (props) => (
  <div className="card cf">
     <div className="title np">Infant Bottle</div>
     <div className="contents np">Contents: </div>
     <div className="contents-value">{props.contents}</div>
     <div className="cn np">Child's Name:</div>
     <div className="fn np">First</div>
     <div className="fn-value">{props.first}</div>
     <div className="ln np">Last</div>
     <div className="ln-value">{props.last}</div>
     <div className="dt"><span className="np">Date: </span>{props.nextDate()}</div>
  </div>
);

const SmallCard = (props) => (
  <div className="card cm">
     {props.first}
     <br/>
     {props.last}
  </div>
);

const Controls = (props) => (
  <div className="controls np">
    <label htmlFor="firstName">First Name</label>
    <input placeholder="First Name" value={props.first} name="firstName"
      onChange={(e) => props.setFirstName(e.target.value)} />
    <label htmlFor="lastName">Last Name</label>
    <input placeholder="Last Name" value={props.last} name="lastName"
      onChange={(e) => props.setLastName(e.target.value)} />
    <label htmlFor="lastName">Contents</label>
    <input placeholder="Contents" value={props.contents} name="contents" 
      onChange={(e) => props.setContents(e.target.value)} />
    <label htmlFor="lastName">Bottles Per Day</label>  
    <input placeholder="Bottles Per Day" type="number" value={props.bottlesPerDay} name="bottlesPerDay" min="1" max="10" 
      onChange={(e) => props.setBottlesPerDay(e.target.value)} />  
    <label htmlFor="bottlesOnFirstDay">Bottles on First Day *</label>
    <input placeholder="Bottles on First Day" type="number" value={props.bottlesOnFirstDay} name="bottlesOnFirstDay" min="1" max={props.bottlesPerDay} 
      onChange={(e) => props.setBottlesOnFirstDay(e.target.value)} />  
    <label htmlFor="startDate">Start Date</label>
    <input placeholder="Start Date" type="date" value={props.startDate} name="startDate"
      onChange={(e) => props.setStartDate(e.target.value)} />
    <button onClick={window.print}>Print</button>  
    
    <div className="instructions">
      <h5>About</h5>
      <p>
        <em>This tool is not provided, endorsed, or otherwise associated with LaPetite Academy.  No warranty or guarantee is provided.</em>
      </p>
      <h5>Printing Tips</h5>
      <p>Printer ink takes a long time to dry on these labels</p>
      <p>When printing from Google Chrome, click the "More settings" link 
      to reveal additional options, then set <strong>Margins</strong> to <strong>None</strong> and <strong>Scale</strong> to <strong>100</strong>.</p>
      <p>If using another browser or if you don't see these options, look for a "Fit to Page" setting and make sure it is NOT checked.</p>
      <h5>Other Notes</h5>
      <p>
        * Change Bottles on First Day when continuing from a previous sheet.  For example, if the previous sheet ended with two labels for 
        a day and you want three labels per day, set this to 1 so the first day only prints the label for one bottle.
      </p>
    </div>
  </div>
);

const Page = (props) => (
  <div className="page">
    <div className="col col1">
      {[0,1,2,3,4,5,6].map(i => <BigCard key={i} {...props} /> )}
    </div>
    <div className="col col2"> 
      {[0,1,2,3,4,5,6,7,8,9,10,11,12,13].map(i => <SmallCard key={i} {...props} />)}
    </div>
    <div className="col col3">
      {[0,1,2,3,4,5,6].map(i => <BigCard key={i} {...props} /> )}
    </div>
  </div>
);


function* getNextDate(start, perDay, firstDayBottles = 3) {
  let mom = moment(start);

  let i = perDay - firstDayBottles + 1;
  while (true) {
    yield mom.format('dddd, MMM Do');

    if (i % perDay === 0) {
      mom.add(1, 'd');
    }
    i++;
  }
}

export default App;
