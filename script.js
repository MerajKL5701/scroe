const  score = document.getElementsByClassName("score")[0]
const  minusprompt = document.getElementsByClassName("minusprompt")[0]
const  mprompt = document.getElementsByClassName("mPrompt")[0]
const  pprompt = document.getElementsByClassName("pPrompt")[0]
const clicker = document.getElementsByClassName("clicker")
const points = document.getElementsByClassName("points")

mprompt.style.display = "none"
pprompt.style.display = "none"

onclickers()

score.innerHTML = getFromCache(); 


function minus_prompt(e)
{
    e.style.display = "block"
}


function CalcMinus()
{
    let n = parseInt(score.innerHTML);
    let c = minusprompt.value;
    console.log(n + "jldfsajlf" + c)
    
    if (n < c)
    {
        alert("too much value")
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
    let c = parseInt(points[i].innerHTML);
    let n = parseInt(score.innerHTML);

    console.log(c)
    
    n += c;

    score.innerHTML = n
    pprompt.style.display = "none"

    saveToCache(n);

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

function getFromCache() {
    let x = localStorage.getItem('cachedValue');
    if (!(x == null))
    {
        return x;
    }
    return 100;
}