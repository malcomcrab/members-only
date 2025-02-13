


async function renderIndex(req, res) {
    console.log('hi')
    res.render("index")
}


module.exports = {
    renderIndex,
    renderSignUpPage
}