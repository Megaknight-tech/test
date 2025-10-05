let question_field = document.querySelector('.question')
let answers = document.querySelectorAll('.answer')
let sumbols = ["+","-", "*", "/"]
let start_screen = document.querySelector('.button')
let main_game = document.querySelector('.container')
let end_stats = document.querySelector('.end-screen')
let timer = document.querySelector('.timer')
let amount = document.querySelector('.amount')
let seconds = document.querySelector('.submit-input')


function getsign(){
    return sumbols[randint(0,3)]
}


function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {  // Цикл проходиться по всіх елементах з кінця до початку
    let j = Math.floor(Math.random() * (i + 1));  // Вибираємо індекс рандомного елемента
    [array[i], array[j]] = [array[j], array[i]] // Міняємо місцями з поточним елементом.
  } 
}

function randint(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

class Question{
    constructor (){
        let a = randint(1,30)
        let b = randint(1,30)
        let sumbols = getsign()
        this.question = `${a} ${sumbols} ${b}`;
        if (sumbols == '+'){
            this.answer_correct = a + b
        }
        else if (sumbols == '-'){
            this.answer_correct = a - b
        }
        else if (sumbols == '*'){
            this.answer_correct = a * b
        }
        else if (sumbols == '/'){
            this.answer_correct = Math.round(a / b)
        }
        this.answer_array = [
            randint(this.answer_correct - 10, this.answer_correct + 10),
            randint(this.answer_correct - 10, this.answer_correct + 10),
            this.answer_correct,
            randint(this.answer_correct - 10, this.answer_correct + 10),
            randint(this.answer_correct - 10, this.answer_correct + 10),
        ]
        shuffle(this.answer_array)
        }
    display(){
        question_field.innerHTML = this.question;

        for (let i = 0; i < this.answer_array.length; i += 1){
            answers[i].innerHTML = this.answer_array[i]
        }
    }
}


let total_answers = 0
let correct_answer = 0
let current_question = new Question()

current_question.display()


for (let i = 0; i < answers.length; i ++){
    answers[i].addEventListener('click',function(){
        if (answers[i].innerHTML == current_question.answer_correct){
            correct_answer ++
            answers[i].style.background = '#00FF00'
            anime({
                targets: answers[i],
                background: '#FFFFFF',
                duration: 2000,
                delay: 200
                
            })
        }else{
            answers[i].style.background = '#FF0000'
            anime({
                targets: answers[i],
                background: '#FFFFFF',
                duration: 2000,
                delay: 200
                
            })
        }
        total_answers += 1
        current_question = new Question()
        current_question.display()

    })
}


start_screen.addEventListener('click',function(){
   if (seconds.value == 0){
        end_stats.innerHTML = 'Введіть число більше 0'
        end_stats.style.color = '#E4004B'
    }else{
    
    start_screen.style.display = 'none'
    amount.style.display = 'none'
   main_game.style.display = 'flex'
   end_stats.style.display = 'none'
   timer.style.display = 'flex'
   end_stats.style.color = 'black'
   timer.innerHTML = seconds.value



     for(let i = seconds.value; i > 0; i--){

    setTimeout(function() {
    timer.innerHTML -= 1
    }, 1000*i)

    }
   

    setTimeout(function() {
        main_game.style.display = 'none'
        start_screen.style.display = 'flex'
        end_stats.style.display = 'flex'
        amount.style.display = 'flex'
        end_stats.innerHTML = 'Ви дали ' + correct_answer +
            '\nправильні відповіді із: ' + total_answers +
            '.\nТочність - ' + Math.round(correct_answer * 100 / total_answers) + '%'
        correct_answer = 0
        total_answers = 0
        timer.style.display = 'none'
    }, seconds.value * 1000)
    }
})

