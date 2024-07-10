const monedasAPI = ['uf', 'ivp', 'dolar', 'dolar_intercambio', 'euro', 'ipc', 'utm', 'imacec', 'tpm', 'libra_cobre', 'tasa_desempleo', 'bitcoin']

const selectMoneda = document.getElementById('moneda')
const resultado = document.getElementById('resultado')
const btnBuscar = document.querySelector('#buscarConversion')
const input = document.querySelector('#pesos')

function tipoMoneda(monedas){
    let html = " ";
    monedas.forEach((moneda)=>{
        html += `
        <option value="${moneda}">${moneda}</option>
        `;
    });
    selectMoneda.innerHTML = html; 
}

tipoMoneda(monedasAPI)


 async function getMoneda(){
        const endpointCompleto = "https://mindicador.cl/api/";
        const monedaCambio = selectMoneda.value
        const endpointFinal = endpointCompleto + monedaCambio;
        try{
        const res = await fetch(endpointFinal)
        const moneda = await res.json();
        return moneda;
        }
        catch (error){
            alert(error.message)
        }
    }


    function prepararGrafica(monedas){
        const tipoDeGrafica = "line";
        var fechas = monedas.serie.map((moneda)=> moneda.fecha);
        const titulo = "Historial Ultimos 10 dias";
        const colorLinea = "red";
        let valores = monedas.serie.map((moneda)=> 
            moneda.valor);

        const config = {
            type: tipoDeGrafica,
            data: {
                labels: fechas,
                datasets: [
                    {
                        label: titulo,
                        backgorundColor: colorLinea,
                        data: valores
                    }
                ]
                
            },
        }
        
        return config;
    }
    
    btnBuscar.addEventListener("click", async function conversion(){
        const moneda = await getMoneda()
        const valor = moneda.serie[0].valor;
        const precio = valor * input.value
        resultado.innerHTML = `Resultado: $ ${precio}`;
        input.innerHTML = " "
        })
    btnBuscar.addEventListener("click", async function renderGrafica()      {
            const moneda = await getMoneda();
            const config = prepararGrafica(moneda);
            const chartDOM = document.getElementById("myChart");
            new Chart(chartDOM, config);
            myChart.destroy();
            new Chart(chartDOM, config);
        }
    )

    console.log(selectMoneda.value)



// async function tipoMoneda(){
//     const monedas = await getMonedas();
//     let html = "";
//     // monedas.forEach((moneda)=>{
// //         // html += `
// //         // <option value=${moneda.codigo}>${moneda.codigo}</option>
// //         // `;
        
//     selectMoneda.innerHTML = html;
    
// }
// tipoMoneda()








