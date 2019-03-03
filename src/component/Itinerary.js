import React from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import '../css/placecard.css';

import PlaceCard from './PlaceCard.js';
import UberCard from './UberCard.js';
import AddPlaceBtn from './AddPlaceBtn.js';
import NewPlaceDlg from './NewPlaceDlg.js';

import buildDeepLink from '../utils/Uber.js';
import {sendRequest} from '../utils/Uber.js';
import {editPlaces, getPlaces} from '../utils/MyFirebase.js';


class Timeline extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            places: this.xgetPlaces(),
            open: false,
            currPlace: 0
        };
        getPlaces('4udGILZl2Cncv4qh1Kl8', places => {
            this.setState({
                places:places,
            });
        })
    }

    handleOpen = ()=>{
        this.setState({
            open: true
        });
    }

    handleClose = (newPlace)=>{
        let ID = '4udGILZl2Cncv4qh1Kl8';
        let oldPlaces = this.state.places;
        if(newPlace){
            oldPlaces.push(newPlace);
        }
        this.setState({
            uber: false,
            open: false,
            places: oldPlaces
        });
        let toStore = oldPlaces.filter(p => p.uber !== 'true');
        editPlaces(ID, JSON.stringify({
            places: toStore
        }))
    }

    startInstantRide(idx, place) {
        return () =>{
            let uberCard = JSON.parse(JSON.stringify(place));
            uberCard.title += '-uber';
            let oldPlaces = this.state.places;
            uberCard.uber = 'true';
            if(!this.state.uber) {
                oldPlaces.splice(idx+1, 0, uberCard);
                this.setState({
                    uber: true,
                    places: oldPlaces
                });
            }
            else {
                alert('Last Uber ride has not finished');
            } 
        }
    }

    closeInstantRide(idx) {
        return () => {
            let oldPlaces = this.state.places;
            oldPlaces.splice(idx, 1);
            this.setState({
                uber: false,
                places: oldPlaces
            });
        }
    }


    render() {
        return <div>
                    <VerticalTimeline layout="1-column">
                        {
                            this.state.places.map( (place, idx) => {

                                let card = (place.uber === 'true') ?
                                    <UberCard 
                                        data={place}
                                        sendRequest={sendRequest(this.state.places[this.state.currPlace])}
                                        closeInstantRide={ this.closeInstantRide(idx)}/>
                                    :
                                    <PlaceCard
                                        place={place}
                                        isCurr={idx === this.state.currPlace}
                                        buildDeepLink={ buildDeepLink(this.state.places[this.state.currPlace]) }
                                        startInstantRide={ this.startInstantRide(idx, place)}
                                        deletePlace={ 
                                            ()=>{
                                                this.closeInstantRide(idx)();
                                                this.handleClose();
                                            }
                                        }
                                    />;
                                let cn = (place.uber === 'true') ? 'uber' : 'n_uber'; 

                                return (<VerticalTimelineElement
                                            className={cn}
                                            key={place.title}
                                            iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                                       >
                                            {card}
                                       </VerticalTimelineElement>);
                            })
                        }
                    </VerticalTimeline>
                    <AddPlaceBtn onClick={this.handleOpen}/>
                    <NewPlaceDlg open={this.state.open} onClose={this.handleClose}/>
               </div>
    }

    xgetPlaces(id) {
        return [
            {
                title: "CalTech",
                la: "34.139416",
                long: "-118.125033",
                startt: "2019/03/04-10:00:00",
                endt: "2019/03/05-13:59:59",
              },
            {
              title: "UC, San Diego",
              la: "32.877150",
              long: "-117.237451",
              startt: "2019/03/01-10:00",
              endt: "2019/03/01-23:59:59",
            },
            {
              title: "Times Square",
              la: "40.759084",
              long: "-73.984122",
              startt: "2019/03/06-10:00:00",
              endt: "2019/03/09-21:59:59",
            },
            
            {
              title: "Las Vegas",
              la: "36.165908",
              long: "-115.1426644",
              startt: "2019/03/06-10:00:00",
              endt: "2019/03/09-21:59:59",
            },
          ];
    }
}

export default Timeline;