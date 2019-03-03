import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";

import TripList from "./component/TripList.js";
import Timeline from "./component/Itinerary.js";
import NewPlaceDlg from "./component/NewPlaceDlg.js";

import * as myfirebase from './utils/MyFirebase.js';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listItems: this.getListItems()
        };
    }

    render(){
        myfirebase.getPlaces("4udGILZl2Cncv4qh1Kl8", titles => {
            console.table(titles);
        });

        return <div className="App">
                    <Router>
                        <div>
                            <Route path="/" exact component={(props) => {
                                return <TripList
                                        listItems={this.state.listItems}
                                        {...props}/> 
                            }} />
                            <Route path='/trip/:id/' component={Timeline} />
                            <Route path='/new/' component={NewPlaceDlg}/>
                        </div>
                    </Router>
               </div> 
    }

    
    getListItems() {
        return [
            {title:'First day', id:'0'},
            {title:'Second day', id:'1'},
            {title:'third day', id:'2'}
        ];
    }
}

export default App;
