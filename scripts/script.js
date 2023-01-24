
const getData = fetch('data.json')
    .then( response => response.json() )
    .then( data => {
        console.log(data)
        return data;
    })
.catch( error => console.log(error))

const active = document.querySelector('.active');
active.style.color = '#bdc1ff'

const timeFramesActive = (value) => {

    for (const iterator of time) {

        if( value == iterator.innerText.toLowerCase() ) {
            iterator.style.color = '#bdc1ff'
            

        } else {
            iterator.style.color = '#6f76c8'
            active.classList.remove('active')
        }
    }
}
// timeFramesActive()


const createTemplate = (ev) => {

    // ? Valor del botón
    let valueButton = ev.target.innerText.toLowerCase();


    // ? Función para agregar un color al timeFrames activo
    timeFramesActive(valueButton)

    
    getData.then( res => {
        res.forEach( item => {
            const workClass = document.querySelectorAll('#container__work');

            let plantillaHours;
            let plantillaLasthours;
            let plantillaLast;

            for(let elem of workClass) {
                
                let dataName = elem.dataset.name;
                let jsonName = item.title;
                
                

                switch (valueButton) {
                    case 'daily':
                        
                        plantillaHours = item.timeframes.daily.current;
                        plantillaLasthours = item.timeframes.daily.previous;
                        plantillaLast = 'Last Day'

                        break;
                
                    case 'weekly':
                        plantillaHours = item.timeframes.weekly.current;
                        plantillaLasthours = item.timeframes.weekly.previous;
                        plantillaLast = 'Last Week'

                        break;
            
                    case 'monthly':
                        plantillaHours = item.timeframes.monthly.current;
                        plantillaLasthours = item.timeframes.monthly.previous;
                        plantillaLast = 'Last Month'
                        break;
                
                    default:
                        return;
                }


                

                if(dataName == jsonName) {
                    
                    elem.innerHTML = `
                    
                        <h2 class="hours">${plantillaHours}hrs</h2>
                        <h3 class="last">${plantillaLast} - ${plantillaLasthours}hrs</h3>

                    `;
                }
                
            }
        })
    })
}





const getButton = () => {
    const times = document.querySelectorAll('#time');
    
    times.forEach( time => {

        time.addEventListener('click', createTemplate);

    })
}
getButton()