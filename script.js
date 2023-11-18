const  score = document.getElementsByClassName("score")[0]
const  minusprompt = document.getElementsByClassName("minusprompt")[0]
const  mprompt = document.getElementsByClassName("mPrompt")[0]
const  pprompt = document.getElementsByClassName("pPrompt")[0]
const clicker = document.getElementsByClassName("clicker")
const points = document.getElementsByClassName("points")
const year = 31536000000 //no of miliseconds in a year




{
    mprompt.style.display = "none"
    pprompt.style.display = "none"
    
    
    
    onclickers()
    let today = Math.round(Date.now()/ year) + 9; // today duh
    
    
    console.log(today)
    datechange(today)
    
    score.innerHTML = getFromCache(); 
    for (let i = 0; i < points.length; i++)
    {
        let done = document.getElementsByClassName('done')[i]
        done.style.color = "sliver"
        done.innerHTML = localStorage.getItem('cachedLimit' + i)
    }
}
    

function minus_prompt(e)
{
    e.style.display = "block"
    return;
}


function CalcMinus()
{ 
    if (localStorage.getItem('cachedDice') == null)
    {
        localStorage.setItem('cachedDice', Math.floor(Math.random * 6) + 1)
    }
    const x = localStorage.getItem('cachedDice')
    if (!(x == 6))
    {
        console.log(x)
        mprompt.style.display = "none"
        return;
    }  
    
    let n = parseInt(score.innerHTML);
    let c = minusprompt.value;
    console.log(n + "jldfsajlf" + c)
    
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
    return 100;
}

function datechange(today)
{
    let x = localStorage.getItem('cachedDate')
    console.log("cached : " + x)
    if (x == null)
    {
        localStorage.setItem('cachedDate', today)
        return 100;
    }
    if (!(today == x))
    {
        localStorage.setItem('cachedDate', today);
        const dice = Math.fllor(Math.random() * 6); 
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