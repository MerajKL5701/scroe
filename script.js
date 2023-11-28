const  score = document.getElementsByClassName("score")[0]
const  minusprompt = document.getElementsByClassName("minusprompt")[0]
const  mprompt = document.getElementsByClassName("mPrompt")[0]
const  pprompt = document.getElementsByClassName("pPrompt")[0]
const clicker = document.getElementsByClassName("clicker")
const points = document.getElementsByClassName("points")
const hour =  60 * 60 * 1000 //no of miliseconds in a hour
const day = 24 * hour//no of miliseconds in a day
const date = document.getElementsByClassName("date")[0];
const nColor = 14;
let random;


{
    mprompt.style.display = "none"
    pprompt.style.display = "none"

    scrollToBottom();
    
    alert("? k ")
    onclickers()
    let today = Math.floor((Date.now() - ((hour)* 4)) / day);// today duh
    date.innerHTML = today - 19679 ;
    
    // let today = prompt("today?")
    
    dateCheck(today)
    score.innerHTML = getFromCache(); 
     random = localStorage.getItem('cachedColor');
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
    console.log(x)
    if (!(x == null))
    {
        return x;
    }
    localStorage.setItem('cachedValue', 500)
    return 500;
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

        dateChange(today)
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

    const color = ["#172D13", "#FDF5DF", "#FECD45", "#1A2238", "#3FD2C7", "#FB8122","#D48166", "#051622", "#FDD935", "#5DAA68", "#141824", "#182978", "#191919", "#000000"];
    const textureColor = ["#D76F30", "#5EBEC4", "#2568FB", "#FF6A3D", "#99DDFF", "#1D2228", "#373A36", "#1BA098", "#FDD935", "#3F6844", "#FFB600", "#6688CC", "#FAB162", "#ffd700"];
    const accentColor = ["#6BB77B", "#F92C85", "#2568FB", "#F4DB7D", "#00458B", "#E1E2E2", "#E6E2DD", "#DEB992", "#FDD935", "#FAF1CF", "#0049FF", "#ACBFE6", "#FAB162", "#ffffff"];
    
    console.log(color.length) 
    console.log(textureColor.length) 
    console.log(accentColor.length) 

    
    document.documentElement.style.setProperty('--color', hexToHSL(color[random]));
    document.documentElement.style.setProperty('--accentColor', hexToHSL(accentColor[random]));
    document.documentElement.style.setProperty('--textureColor', hexToHSL(textureColor[random]));
    
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

function hexToHSL(hex) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (hex.length == 4) {
      r = "0x" + hex[1] + hex[1];
      g = "0x" + hex[2] + hex[2];
      b = "0x" + hex[3] + hex[3];
    } else if (hex.length == 7) {
      r = "0x" + hex[1] + hex[2];
      g = "0x" + hex[3] + hex[4];
      b = "0x" + hex[5] + hex[6];
    }
    
    // Then to HSL
    r /= 255, g /= 255, b /= 255;
    let cmin = Math.min(r,g,b), cmax = Math.max(r,g,b), delta = cmax - cmin;
    let h = 0, s = 0, l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
      
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    const hsl =  h + ", " + s + "%, " + l + "%"
    return hsl;
  }

// Scroll to the end of the document

function scrollToBottom() 
{
    window.scrollTo(0, document.body.scrollHeight);
}
// Call the function to scroll to the bottom
