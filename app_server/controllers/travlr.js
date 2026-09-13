/* GET travel view */
const travlr = (req, res) => {
    res.render('travel', { title: 'Travlr Getaways' });
};

module.exports = {
    travlr
};