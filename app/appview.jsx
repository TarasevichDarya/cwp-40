var React = require("react");
var connect = require("react-redux").connect;
var actions = require("./actions.jsx");
 
class PathForm extends React.Component {
  constructor(props) {
    super(props);
    this.options = ['Bike', 'Walk', 'Car', 'Bus'];
    this.arr = [];
    this.state = {
      value: this.props.vehicle,
      isEditing: false,
      readyToUpdate: false
    };
  }

  getOptions() {
    return this.options.map((item, index) => (<option key={index} value={item}>{item}</option>))
  };

  onClick() {
    if (this.refs.pathInput.value !== "" && this.refs.pathVInput.value !== "") {
      var arr = [];
      var itemText = " " + this.refs.pathVInput.value + " " + this.refs.pathInput.value + " " + Number(this.refs.timeInput.value) + " Hour";
      this.refs.pathInput.value ="";
      this.refs.timeInput.value ="";
      //f = ~(itemText+"").indexOf("Bus") ? arr.push("Bus") : ~(itemText+"").indexOf("Car") ? arr.push("Car")  : ~(itemText+"").indexOf("Walk") ? arr.push("Walk")  : arr.push("Bike");
      return this.props.addPath(itemText);
    }
  }
  render() {
    return <div>
           <select
            className='Select'
            ref="pathVInput"
            value={this.state.value}
            autoFocus={1}
           >
            {this.getOptions()}
          </select>
            <input className='Imput' placeholder="Sity" ref="pathInput" />
            <input className='Imput' placeholder="Time" ref="timeInput" />
            <button className='Buttom' onClick = {this.onClick.bind(this)}>Добавить</button>
        </div>
  }
};
 
class PathItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
                <p>
                    <img src={this.props.img} style={{width: '30px', height: '30px'}} />
                    <b className='Text'>{this.props.text}</b><br />
                    <button className='Buttom' onClick={() => this.props.deletePath(this.props.text)}>Удалить</button> 
                </p>
            </div>
  }
};
 
class PathList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
        {this.props.paths.map(item =>
          <PathItem key={item}
                    text={item}
                    img={~(item+"").indexOf("Bus") ? "./images/bus.png" : ~(item+"").indexOf("Car") ? "./images/car.png" : ~(item+"").indexOf("Walk") ? "./images/walk.png" : "./images/bike.png"}
                    arr={~(item+"").indexOf("Bus") ? "./images/bus.png" : ~(item+"").indexOf("Car") ? "./images/car.png" : ~(item+"").indexOf("Walk") ? "./images/walk.png" : "./images/bike.png"}
                    deletePath={this.props.deletePath}/>
        )}
      </div>
  }
};

class CarLists extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className='CarList'>
    <h1>All transport:</h1>
        {this.props.paths.map(item =>
          <span key={item}>{~(item+"").indexOf("Bus") ? " Bus " : ~(item+"").indexOf("Car") ? " Car " : ~(item+"").indexOf("Walk") ? " Walk " : " Bike "}</span>
        )}
      </div>
  }
};

class CountPath extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let t = 0;
    return <div className='CountPath'>
    <h1>Counter path:</h1>
        {this.props.paths.map(item =>
          <span key={item} className='Count'>{(t += 1)+" "}</span>
        )}
      </div>
  }
};

class TimeLists extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let t = 0;
    return <div className='TimeList'>
    <h1>All time:</h1>
        {this.props.paths.map(item =>
          <span key={item} className='SpanTime'>{t += Number(item.split(' ')[3])}</span>
        )}
      </div>
  }
};


class TimeTravelPanel extends React.Component {
  render() {
    return (
        <div className="time-panel">
          <div className={'time-panel__button ' + (this.props.canUndo ? '' : 'time-panel__button_disabled')} onClick={this.props.undo}>Undo</div>
          <div className={'time-panel__button ' + (this.props.canRedo ? '' : 'time-panel__button_disabled')} onClick={this.props.redo}>Redo</div>
        </div>
    )
  }
}

function canUndo(model) {
  return model.past && model.past.length !== 0;
}

function canRedo(model) {
  return model.future && model.future.length !== 0;
}
 
class AppView extends React.Component {
    render() {
        return <div>
            <CarLists {...this.props} />
            <CountPath {...this.props} />
            <TimeLists {...this.props} />
            <PathForm addPath={this.props.addPath}/>
            <PathList {...this.props} />
           </div>
  }
};
 
function mapStateToProps(state) {
  return {
      paths: state.get("paths"),
      canUndo: state.past && state.past.length !== 0,
      canRedo: state.future && state.future.length !== 0
  }
}

 
module.exports = connect(mapStateToProps, actions)(AppView);