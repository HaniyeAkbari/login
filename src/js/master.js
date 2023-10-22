const email = document.getElementById('email')
const password = document.getElementById('pass')
const form = document.getElementById('form')
const passVisibility = document.getElementsByClassName('passV')[0]
const country = document.getElementById('country')
const state = document.getElementById('state')
const city = document.getElementById('city')
let _li = ''
let err = 0
// ****** Changing Password Visibility ******

passVisibility.addEventListener('click', () => {
    if (passVisibility.classList.contains('bi-eye-slash-fill')) {
        passVisibility.classList.replace('bi-eye-slash-fill', 'bi-eye-fill')
        password.setAttribute('type', 'text')
    } else {
        passVisibility.classList.replace('bi-eye-fill', 'bi-eye-slash-fill')
        password.setAttribute('type', 'password')
    }
})

// ****** submitting form *******

form.addEventListener('submit', (e) => {
    err = 0
    e.preventDefault()

    check()
    send()
})

const check = () => {


    // email validation *********

    if (email.value == '' || email.value == null) {
        email.style.border = '1px solid red'
        email.style.outline = '1px solid red'
        err++

    } else if (!isEmailValid(email.value)) {
        email.style.border = '1px solid red'
        email.style.outline = '1px solid red'
        err++

    } else {
        email.style.border = 'none'
        email.style.outline = 'none'
        err--

    }

    // pass validation *********

    if (password.value == '' || password.value == null) {
        password.style.border = '1px solid red'
        password.style.outline = '1px solid red'
        err++

    } else if (!isPassValid(password.value)) {
        password.style.border = '1px solid red'
        password.style.outline = '1px solid red'
        err++

    } else {
        password.style.border = 'none'
        password.style.outline = 'none'
        err--

    }

    if (country.value == '' || state.value == '' || city.value == '') {
        country.style.border = '1px solid red'
        state.style.border = '1px solid red'
        city.style.border = '1px solid red'
        err++
        
    } else {
        country.style.border = 'none'
        state.style.border = 'none'
        city.style.border = 'none'
        err--

    }

}


const isEmailValid = (email) => {
    return /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,})$/.test(email)
}

const isPassValid = (pass) => {
    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(pass)
}


const cntList = document.getElementById('cntList')
const stateList = document.getElementById('stList')
const cityList = document.getElementById('cityList')
const loc = {}
let val = ''
let stateName = ''
let cityName = ''


// ******* fetching country ********


fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries.json', { method: 'GET' })

    .then(res => res.json())
    .then(cnt => {


        cnt.map((item) => {

            let li = document.createElement('li')
            li.innerHTML = item.name
            li.classList.add('cnt')
            cntList.appendChild(li)

            _li = document.querySelectorAll('.cnt')

        })

        country.addEventListener("focusin", () => {
            cntList.style.display = 'flex'
        })

        // ****** choosing country *******

        _li.forEach((i) => {
            i.addEventListener('click', (event) => {
                country.value = event.target.innerText
                state.removeAttribute('disabled')
                cntList.style.display = 'none'
                loc.country = country.value

                stateName = document.querySelectorAll('.state')
                stateName.forEach((val) => {
                    val.remove()
                })

                // ****** fetching states *****

                fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/states.json', { method: 'GET' })

                    .then(response => response.json())
                    .then(states => {

                        states.map((item) => {

                            if (item.country_name.toLowerCase() == loc.country) {
                                let _state = document.createElement('li')
                                _state.innerHTML = item.name
                                _state.classList.add('state')
                                stateList.appendChild(_state)

                            }



                        })

                        state.addEventListener("focusin", () => {
                            stateList.style.display = 'flex'
                        })

                        // ******* choosing states *******

                        stateName = document.querySelectorAll('.state')
                        stateName.forEach((i) => {
                            i.addEventListener('click', (event) => {
                                state.value = event.target.innerText
                                city.removeAttribute('disabled')
                                stateList.style.display = 'none'
                                loc.state = state.value
                                cityName = document.querySelectorAll('.city')
                                cityName.forEach((val) => {
                                    val.remove()
                                })

                                // ******* fetching cities *******

                                fetch('https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/cities.json', { method: 'GET' })

                                    .then(results => results.json())
                                    .then(cities => {

                                        cities.map((item) => {

                                            if (item.state_name.toLowerCase() == loc.state) {
                                                let _city = document.createElement('li')
                                                _city.innerHTML = item.name
                                                _city.classList.add('city')
                                                cityList.appendChild(_city)

                                            }



                                        })

                                        city.addEventListener("focusin", () => {
                                            cityList.style.display = 'flex'
                                        })

                                        // ****** choosing cities ******

                                        cityName = document.querySelectorAll('.city')
                                        cityName.forEach((i) => {
                                            i.addEventListener('click', (event) => {
                                                city.value = event.target.innerText
                                                // city.removeAttribute('disabled')
                                                cityList.style.display = 'none'
                                                loc.city = city.value



                                            })
                                        })


                                        city.addEventListener('input', (e) => {
                                            val = e.target.value
                                            cityName.forEach((element) => {
                                                cityList.style.display = 'flex'
                                                let txt = element.innerText
                                                if (txt.substring(0, val.length) == val) {
                                                    element.style.display = 'flex'

                                                } else {
                                                    element.style.display = 'none'
                                                }
                                            })

                                        })
                                    })

                            })
                        })


                        state.addEventListener('input', (e) => {
                            val = e.target.value
                            stateName.forEach((element) => {
                                stateList.style.display = 'flex'
                                city.setAttribute('disabled', '')
                                let txt = element.innerText
                                if (txt.substring(0, val.length) == val) {
                                    element.style.display = 'flex'

                                } else {
                                    element.style.display = 'none'
                                }
                            })

                        })
                    })
            })
        })


        country.addEventListener('input', (e) => {
            val = e.target.value
            _li.forEach((element) => {
                cntList.style.display = 'flex'
                state.setAttribute('disabled', '')
                let txt = element.innerText
                if (txt.substring(0, val.length) == val) {
                    element.style.display = 'flex'

                } else {
                    element.style.display = 'none'
                }
            })

        })


    })

// ********* adding info in database *********

let sc = document.getElementById('success')
let newUser = ''


const send = () => {
    console.log(err);
    let _email = email.value
    let _pass = password.value

    if (err > -3) {
        document.querySelector('#success h3').innerText='Please Fill The Blanks Carefully !'
        console.log(sc.children[1]);
        
        sc.children[1].style.display='none'
        sc.style.transform = 'scale(1)'
        form.style.opacity = 0.1

    } else {
        sc.children[1].style.display='flex'
        document.querySelector('#success h3').innerHTML=` User Successfully Created ! Check Out The Link Below 
        <i class="bi- bi-arrow-down"></i>
        `
        newUser = {
            email: _email,
            pass: _pass,
            location: loc
        };
        fetch('https://6532b207d80bd20280f5edd0.mockapi.io/login/users', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(newUser)
        }).then(res => {
            console.log(res);
            console.log(res.status);
            if (res.ok) {
                return res.json();
            }else{
                window.location.href = "../../404index.html";
            }

        }).then(user => {
            console.log(user);
            sc.style.transform = 'scale(1)'
            form.style.opacity = 0.1

        })
    }


}

document.getElementById('close').addEventListener('click', () => {
    sc.style.transform = 'scale(0)'
    form.style.opacity = 1
})






