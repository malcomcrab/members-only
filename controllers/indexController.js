


async function renderIndex(req, res) {
    console.log('hi')
    res.render("index")
}

async function renderSignUpPage(req, res) {
    console.log('sign up page visited')
    res.render("signUpPage")
}

module.exports = {
    renderIndex,
    renderSignUpPage
}