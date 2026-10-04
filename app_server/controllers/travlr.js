const tripsEndpoint = 'http://localhost:3000/api/trips';

const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

/* GET travel view */
const travlr = async (req, res) => {
    await fetch(tripsEndpoint, options)
        .then(res => res.json())
        .then(json => {
            if (!Array.isArray(json)) {
                return res.render('travel', {
                    title: 'Travlr Getaways',
                    trips: [],
                    message: 'API lookup error'
                });
            }

            if (json.length === 0) {
                return res.render('travel', {
                    title: 'Travlr Getaways',
                    trips: [],
                    message: 'No trips exist in our database'
                });
            }

            return res.render('travel', {
                title: 'Travlr Getaways',
                trips: json
            });
        })
        .catch(err => res.status(500).send(err.message));
};

module.exports = {
    travlr
};