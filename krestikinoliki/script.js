const klase_x = 'x'
const klase_o = 'circle'

/*  0 1 2
    3 4 5
    6 7 8 
*/

const uzvaras_nosacijumi = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

const visi_laucini = document.querySelectorAll('.cell')
const rezultatu_logs = document.querySelector('#resultBox')
const rezultatu_pazinojums = document.querySelector('.resultInfo')
const atjaunot_poga = document.querySelector('#restartButton')
const attelot_speletaju = document.querySelector('.display')
let speletajs_O

sakt_speli()

function sakt_speli(){
    speletajs_O = false
    rezultatu_logs.classList.remove('show')
    visi_laucini.forEach(laucins =>{
        laucins.classList.remove(klase_x)
        laucins.classList.remove(klase_o)
        laucins.addEventListener('click', lietotaja_darbiba, {once: true})
    })
}

function lietotaja_darbiba(klikskis){
    const laucins = klikskis.target
    const aktivais_speletajs = speletajs_O ? klase_o : klase_x
    atzimet_laucinu(laucins, aktivais_speletajs)
    if(parbaudit_uzvaru(aktivais_speletajs)){
        beigt_speli(false)
    }else if(neizskirts()){
        beigt_speli(true)
    }else{
        mainit_speletaju()
    }
}

function atzimet_laucinu(laucins, aktivais_speletajs){
    laucins.classList.add(aktivais_speletajs)
}

function mainit_speletaju(){
    speletajs_O = !speletajs_O
    attelot_speletaju.innerText = `${speletajs_O ? "O" : "X"}`
}

function parbaudit_uzvaru(aktivais_speletajs){
    return uzvaras_nosacijumi.some(nosacijums =>{
        return nosacijums.every(index =>{
            return visi_laucini[index].classList.contains(aktivais_speletajs)
        })
    })
}

function neizskirts(){
    return [...visi_laucini].every(laucins => {
        return laucins.classList.contains(klase_x) || laucins.classList.contains(klase_o)
    })
}

function beigt_speli(neizskirts){
    if(neizskirts){
        rezultatu_pazinojums.innerText = "Nichja"
    }else{
        rezultatu_pazinojums.innerText = `Igrok ${speletajs_O ? "O" : "X"} pobedil!`
    }

    rezultatu_logs.classList.add('show')
}

atjaunot_poga.addEventListener('click', sakt_speli)