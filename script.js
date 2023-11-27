const  score = document.getElementsByClassName("score")[0]
const  minusprompt = document.getElementsByClassName("minusprompt")[0]
const  mprompt = document.getElementsByClassName("mPrompt")[0]
const  pprompt = document.getElementsByClassName("pPrompt")[0]
const clicker = document.getElementsByClassName("clicker")
const points = document.getElementsByClassName("points")
const hour =  60 * 60 * 1000 //no of miliseconds in a hour
const day = 24 * hour//no of miliseconds in a day
const date = document.getElementsByClassName("date")[0];
const nColor = 3;


{
    mprompt.style.display = "none"
    pprompt.style.display = "none"
    
    alert("no prompt?")
    onclickers()
    let today = Math.floor((Date.now() - ((hour)* 4)) / day);// today duh
    date.innerHTML = today - 19679 ;
    
    // let today = prompt("today?")
    
    dateCheck(today)
    colorchange(random);
    score.innerHTML = getFromCache(); 
    let random = localStorage.getItem('cachedColor');
    if (random == null)
    {
        localStorage.setItem('cachedColor', Math.floor(Math.random() * nColor))
    }

    colorchange(random)
    
    for (let i = 0; i < points.length; i++)
    {
        let done = document.getElementsByClassName('done')[i]
        done.style.color = "sliver"
        done.innerHTML = localStorage.getItem('cachedLimit' + i)
    }
    sizeOfChecker()
    const x = localStorage.getItem('cachedDate')

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

function dateCheck(today)
{
    let x = localStorage.getItem('cachedDate')
    if (x == null)
    {
        localStorage.setItem('cachedDate', today)
        return 100;
    }
    if (!(today == x))
    {

        dateChange(x)
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

function colorchange(random)
{

    const color = ["0, 100%, 0%", "240, 100%, 25%", "180, 100%, 25%","30, 69%, 58%", "5, 69%, 58%", "240, 64%, 45%", "145, 64%, 50%", "39, 89%, 58%"];
    const textureColor = ["51, 100%, 50%", "6, 78%, 57%", "5, 100%, 69%", " 207, 64%, 49%", "39, 89%, 58%", "30, 69%, 58%", "49, 89%, 50%", "207, 64%, 49%"];
    const accentColor = ["0, 0%, 100%", "145, 63%, 49%", "146, 50%, 36%", " 168, 76%, 38%", "207, 64%, 49%", "25, 100%, 41%", "43, 79%, 42%", "49, 89%, 50%"];
   
 
      

    
    document.documentElement.style.setProperty('--color', color[random]);
    document.documentElement.style.setProperty('--accentColor', accentColor[random]);
    document.documentElement.style.setProperty('--textureColor', textureColor[random]);
    
    return ;

}

function dateChange(today)
{
    const temp = localStorage.getItem('cachedValue')
    localStorage.clear();

    localStorage.setItem('cachedValue', temp)

    localStorage.setItem('cachedDate', today);

    const dice = Math.floor(Math.random() * 6) + 1; 

    random = Math.floor(Math.random() * nColor) ; 

    
    localStorage.setItem('cachedColor', random);
     localStorage.setItem('cachedDice', dice);

     alert("luck? " + dice)
     console.log("dice:" + dice)

    for (let i = 0; i < points.length; i++)
    {
        localStorage.setItem('cachedLimit' + i, 0)
    }

    alert("date change has being detected today:- " + today + "local storage");


    return;
}

