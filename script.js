const questions=[
    {
        question:"which is largest animal in the world",
        answers:[
            {text:"shark",correct:true},
            {text:"Blue Whale",correct:false},
            {text:"Elephant",correct:false},
            {text:"Giraffe ",correct:false}
        ]
    },
    {
        question:"which is smallest animal in the world",
        answers:[
            {text:"shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe ",correct:false}
        ]  
    },
    {
        question:"which is slowest animal in the world",
        answers:[
            {text:"shark",correct:false},
            {text:"Blue Whale",correct:false},
            {text:"Elephant",correct:true},
            {text:"Giraffe ",correct:false}
        ]
    },
    {
        question:"which is fastest animal in the world",
        answers:[
            {text:"shark",correct:false},
            {text:"Blue Whale",correct:false},
            {text:"Elephant",correct:false},
            {text:"Giraffe ",correct:true}
        ]
    }
];
const questionelement=document.getElementById("question");
const answerbutton=document.getElementById("answer-buttons");
const nextbutton=document.getElementById("next-btn");
let currentquestionindex = 0;
let score =0;
function startquiz(){
    currentquestionindex = 0;
    score =0;
    nextbutton.innerHTML="Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentquestion=questions[currentquestionindex];
    let questionno=currentquestionindex + 1;
    questionelement.innerHTML=questionno + ". "+ currentquestion.question;

    currentquestion.answers.forEach(answers => {
        const button=document.createElement("button");
        button.innerHTML=answers.text;
        button.classList.add("btn");
        answerbutton.appendChild(button);
        if(answers.correct){
            button.dataset.correct=answers.correct;
        }
        button.addEventListener("click",selectanswer);
    });
}
function resetState(){
    nextbutton.style.display="none";
    while(answerbutton.firstChild){
        answerbutton.removeChild(answerbutton.firstChild);
    }
}
function selectanswer(e){
       const selectedbtn=e.target;
       const iscorrect=selectedbtn.dataset.correct ==="true";
       if(iscorrect){
        selectedbtn.classList.add("correct");
        score++;
       }
       else{
        selectedbtn.classList.add("incorrect");
       }
       Array.from(answerbutton.children).forEach(button=>{
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
       });
       nextbutton.style.display="block";
}
function showscore(){
    resetState();
    const msg=`you scored ${score} out of ${questions.length}!`;
    questionelement.innerHTML=msg;
    nextbutton.innerHTML="Play Again";
    nextbutton.style.display="block";
}
function handlenextbutton(){
    currentquestionindex++;
    if(currentquestionindex<questions.length){
        showQuestion();
    }
    else{
        showscore();
    }
    
}
nextbutton.addEventListener("click",()=>{
    if(currentquestionindex<questions.length){
        handlenextbutton();
    }
    else{
        startquiz();
    }
});
startquiz();
