class Uber {
    constructor() {
        let _access = '';
        let client_id = '';
    }
    getAccess() {
        return this._access;
    }
}


export function sendRequest(pickup, update) {
    return function sendRequestDropoff(dropoff) {

        let info = getRideInfo(pickup, dropoff);
        update({
            fare: info.fare,
            duration_estimate: info.duration_estimate,
            pickup_estimate: info.pickup_estimate
        });
        
        // Request ride in sand box
        let uber = new Uber();
        let xhr = new XMLHttpRequest();
        let base = 'https://sandbox-api.uber.com/v1.2/requests';
        xhr.open('POST', base, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', uber.getAccess());


        xhr.send(JSON.stringify({
            "fare_id": info.fare_id,
            "product_id": info.product_id,
            "start_latitude": pickup.la,
            "start_longitude": pickup.long,
            "end_latitude": dropoff.la,
            "end_longitude": dropoff.long
        }));

        info = JSON.parse(xhr.responseText);
        let request_id = info.request_id;
        update({
            request_id: info.request_id,
            status: info.status,
            pickup_estimate: info.eta
        });


        // Constantly check update
        setInterval(()=>{
            let xhr = new XMLHttpRequest();
            let base = 'https://api.uber.com/v1.2/requests/current';
            xhr.open('GET', base, false);
            xhr.setRequestHeader('Authorization', uber.getAccess());
            info = JSON.parse(xhr.responseText);
            update({
                status: 'Requesting...',
                fare: info.fare,
                duration_estimate: info.destination.eta,
                pickup_estimate: info.pickup.eta,
                license_plate: info.vehicle.license_plate,
                driver_name: info.driver.name,
                driver_phone: info.driver.phone_number
            });
        }, 100);



        // Update sand box
        xhr = new XMLHttpRequest();
        base = `https://sandbox-api.uber.com/v1.2/sandbox/requests/${request_id}`;
        xhr.open('POST', base, false);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', uber.getAccess());
        setTimeout(()=>{
            xhr.send(JSON.stringify({
                status: "accepted"
            }));
        }, 15000)

    }
}

export function cancelRide(request_id) {
        // Delete
        let uber = new Uber();
        let xhr = new XMLHttpRequest();
        let base = `https://sandbox-api.uber.com/v1.2/sandbox/requests/${request_id}`;
        xhr.open('DELETE', base, false); 
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Authorization', uber.getAccess());
        xhr.send();
}

export function getRideInfo(p, d) {
    let uber = new Uber();
    let xhr = new XMLHttpRequest();
    let base = 'https://api.uber.com/v1.2/products';
    base += `?latitude=${p.la}&longitude=${p.long}`;
    xhr.open('GET', base, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', uber.getAccess());
    xhr.setRequestHeader('Accept-Language', 'en_US');
    xhr.send();
    let product_id =  JSON.parse(xhr.responseText).products[0].product_id;




    xhr = new XMLHttpRequest();
    base = 'https://api.uber.com/v1.2/requests/estimate';
    xhr.open('POST', base, false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('Authorization', uber.getAccess());
    xhr.send(JSON.stringify({
        product_id: product_id,
        start_latitude: p.la,
        start_longitude:p.long,
        end_latitude: d.la,
        end_longitude: d.long,
        seat_count: 2
    }));
    let res = JSON.parse(xhr.responseText); 
    return {
        product_id: product_id,
        fare_id: res.fare.fare_id,
        fare: res.fare.display,
        duration_estimate: res.duration_estimate,
        pickup_estimate: res.pickup_estimate
    }
}


export default function buildDeepLink(pickup) {
    return function buildDropOff(dropoff) {
        let client_id = 'tWpBlr3vThr2Uzu5_MYrhRn5-FkpXJl-';
        let base = 'https://m.uber.com/ul/?';
        base += 'client_id=' + encodeURI(client_id);
        base += '&action=setPickup';
        let mpickup = {
            long: '&pickup[longitude]=' + encodeURI(pickup.long),
            la: '&pickup[latitude]=' + encodeURI(pickup.la),
            nickname: '&pickup[nickname]=' + encodeURI(pickup.title),
            address: '&pickup[formatted_address]=' + encodeURI(pickup.title)
        };
        let mdropoff = {
            long: '&dropoff[longitude]=' + encodeURI(dropoff.long),
            la: '&dropoff[latitude]=' + encodeURI(dropoff.la),
            nickname: '&dropoff[nickname]=' + encodeURI(dropoff.title),
            address: '&dropoff[formatted_address]=' + encodeURI(dropoff.title)
        }

        let product = '&product_id=a1111c8c-c720-46c3-8534-2fcdd730040d';
        let linktext = '&link_text=View%20team%20roster';
        let partner = '&partner_deeplink=partner%3A%2F%2Fteam%2F9383';

        let url = base + mpickup.long + mpickup.la + mpickup.nickname + mpickup.address
                    + mdropoff.long + mdropoff.la + mdropoff.nickname + mdropoff.address
                    + product + linktext + partner;

        return url;
    }
}

