const  score = document.getElementsByClassName("score")[0]
const  minusprompt = document.getElementsByClassName("minusprompt")[0]
const  mprompt = document.getElementsByClassName("mPrompt")[0]
const  pprompt = document.getElementsByClassName("pPrompt")[0]
const clicker = document.getElementsByClassName("clicker")
const points = document.getElementsByClassName("points")
const day = 24 * 60 * 60 * 1000 //no of miliseconds in a day
const date = document.getElementsByClassName("date")[0];



{
    mprompt.style.display = "none"
    pprompt.style.display = "none"
    
    
    
    onclickers()
    let today = Math.round(Date.now()/ day)  ; // today duh
    date.innerHTML = today - 19679 ;
    
    // let today = prompt("today?")
    
    datechange(today)
    
    score.innerHTML = getFromCache(); 
    for (let i = 0; i < points.length; i++)
    {
        let done = document.getElementsByClassName('done')[i]
        done.style.color = "sliver"
        done.innerHTML = localStorage.getItem('cachedLimit' + i)
    }
    sizeOfChecker()
}


function minus_prompt(e)
{
    
    if (e == mprompt)
    {
        const x = localStorage.getItem('cachedDice')
        if (x === null)
        {

            localStorage.setItem('cachedDice', Math.floor(Math.random() * 6) + 1)
        }
        if (!(x == 6))
        {
            alert(x)
            document.getElementsByClassName("minus")[0].innerHTML = x
            return;
        } 
    }
    e.style.display = "block"
    return;
}


function CalcMinus()
{ 
    
    
    let n = parseInt(score.innerHTML);
    let c = minusprompt.value;
    
    if (n < c)
    {
        return;
    }
    else 
    {
        n -= c
    }

    score.innerHTML = n
    mprompt.style.display = "none"

    saveToCache(n);

    return;
}

function additon_calc(i)
{
    const limit = document.getElementsByClassName("limit")[i];
    const done = document.getElementsByClassName("done")[i];
    let value = localStorage.getItem('cachedLimit' + i);
    const maxvalue = parseInt(limit.innerHTML)

    if (!(value < maxvalue))
    {
        pprompt.style.display = "none"
        return;
    }
    value++
    localStorage.setItem('cachedLimit' + i , value);
    done.innerHTML = value
    
    if (value == maxvalue)
    {
        done.style.color = "red"
    }
    let c = parseInt(points[i].innerHTML);
    let n = parseInt(score.innerHTML);



    n += c;

    score.innerHTML = n
    pprompt.style.display = "none"

 

    saveToCache(n);
    sizeOfChecker()

    return;
    
}

function onclickers()
{
    for (let i = 0; i < clicker.length; i++)
    {
        clicker[i].onclick = function ()
        {
        additon_calc(i)
        }
            
    }
}

function saveToCache(i) {
    localStorage.setItem('cachedValue', i);
}

function getFromCache()
 {
    let x = localStorage.getItem('cachedValue');
    if (!(x == null))
    {
        return x;
    }
    return 370;
}

function datechange(today)
{
    let x = localStorage.getItem('cachedDate')
    if (x == null)
    {
        localStorage.setItem('cachedDate', today)
        return 100;
    }
    if ((today !== x))
    {

        const temp = localStorage.getItem('cachedValue')
        localStorage.clear();

        localStorage.setItem('cachedValue', temp)

        localStorage.setItem('cachedDate', today);

        const dice = Math.floor(Math.random() * 6) + 1; 
        alert("luck? " + dice)
        console.log("dice:" + dice)

        localStorage.setItem('cachedDice', dice);

        for (let i = 0; i < points.length; i++)
        {
            localStorage.setItem('cachedLimit' + i, 0)
        }

        alert("date change has being detected");
        return;
    }
    else
    {
        return;
    }
}
function sizeOfChecker()
{
    const done = document.getElementsByClassName("done");
    const limit = document.getElementsByClassName("limit");
    for (let i = 0, n = clicker.length; i < n; i++)
    {
        console.log("dice no "+ i + " value " + Math.floor(Math.random() * 6) + 6 )
        const m = parseInt(done[i].innerHTML);
        const n = parseInt(limit[i].innerHTML);
        if (m == n)
        {
            clicker[i].style.height = "0px"
        }
        else 
        {
            clicker[i].style.height = "auto"
        }
    }
    return;
} 
