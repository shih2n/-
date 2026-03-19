
import { initializeApp } from "https://www.gstatic.com";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com";


const firebaseConfig = {
  apiKey: "AIzaSyA_DNd6mIiZ3lcCFuJcnJv-uI8xjuMj1wc",
  authDomain: "reviewstester12.firebaseapp.com",
  databaseURL: "https://reviewstester12-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "reviewstester12",
  storageBucket: "reviewstester12.firebasestorage.app",
  messagingSenderId: "43901407943",
  appId: "1:43901407943:web:65503ea1fbacc7984de4e2",
  measurementId: "G-9F7BZZTXZ2"
};


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const reviewsRef = ref(db, 'reviews');


const successGifs = [
    "https://media1.tenor.com/m/JyQ2iWszaBQAAAAd/panda.gif", 
    "https://media1.tenor.com/m/lQ9SU3vt_f4AAAAd/cool-fun.gif"
];
const errorGifs = [
    "https://media1.tenor.com/m/IuadZ_DUSxYAAAAd/miyabi-hoshimi-miyabi.gif",
    "https://media1.tenor.com/m/vLK4Mq3jiKIAAAAd/cat-no.gif"
];


window.sendReview = function() {
    const reviewInput = document.getElementById('reviewText');
    if (!reviewInput) return;
    const text = reviewInput.value.trim();
    if (text) {
        push(reviewsRef, {
            text: text,
            date: Date.now()
        });
        reviewInput.value = '';
    }
};


onValue(reviewsRef, (snapshot) => {
    const data = snapshot.val();
    const reviewsList = document.getElementById('reviewsList');
    if (!reviewsList) return;
    
    reviewsList.innerHTML = '';
    const isAdmin = localStorage.getItem('isAdmin') === 'true';

    for (let id in data) {
        const div = document.createElement('div');
        div.style = "background:#f7fafc; padding:10px; border-radius:10px; margin-bottom:8px; border-left:4px solid #4299e1; position:relative; text-align:left; word-wrap:break-word;";
        div.innerHTML = `
            ${data[id].text}
            ${isAdmin ? `<button onclick="deleteReview('${id}')" style="background:none; color:red; border:none; width:auto; padding:0; margin-left:10px; cursor:pointer; font-size:12px; display:inline;">[Удалить]</button>` : ''}
        `;
        reviewsList.appendChild(div);
    }
});

window.deleteReview = function(id) {
    if (confirm("Удалить этот отзыв?")) {
        remove(ref(db, `reviews/${id}`));
    }
};


window.showAuthForm = typeof showAuthForm !== 'undefined' ? showAuthForm : () => {};

const resources = {
    it: [
        { name: "Сдам ГИА (Решу ОГЭ)", url: "https://inf-oge.sdamgia.ru" },
        { name: "Учебник Полякова", url: "https://kpolyakov.spb.ru" }
    ],
    russian: [
        { name: "ФИПИ (Открытый банк)", url: "https://fipi.ru" },
        { name: "Грамота.ру", url: "http://gramota.ru" }
    ],
    math: [
        { name: "Шпаргалки по геометрии", url: "https://shkolkovo.net" },
        { name: "Решу ОГЭ Математика", url: "https://math-oge.sdamgia.ru" }
    ],
    js: [
        { name: "Learn JavaScript (RU)", url: "https://learn.javascript.ru" },
        { name: "MDN Web Docs", url: "https://developer.mozilla.org" }
    ]
};
const profileBox = document.getElementById('profileBox');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openProfile');
const reviewBtn = document.getElementById('sendReview');
const reviewInput = document.getElementById('reviewText');
const reviewsList = document.getElementById('reviewsList');


const allQuestions = {
    it: [{
        question: "Задание 1: В кодировке КОИ-8 каждый символ кодируется 8 битами. Ученик написал текст: «Юпитер, Сатурн, Уран, Нептун — планеты-гиганты». Ученик вычеркнул одно слово и лишнюю запятую с пробелом. Размер текста уменьшился на 6 байт. Какое слово вычеркнуто?",
        options: ["Уран", "Юпитер", "Сатурн", "Нептун"],
        correct: 0 // Уран (4 буквы + запятая + пробел = 6 символов/байт)
    },
    {
        question: "Задание 10: Среди трех чисел: 17(16), 31(8), 10110(2) найдите максимальное и запишите его в ответе в десятичной системе.",
        options: ["23", "25", "22", "31"],
        correct: 1 // 31(8) = 25(10) — самое большое (17(16)=23, 10110(2)=22)
    },
    {
        question: "Задание 7: Файл hello.jpg находится на сервере image.com и доступен по протоколу ftp. Каков полный адрес файла?",
        options:["school.edu", "index.html", "https://", "edu.school"],
        correct: 0
    },
    {
        question: "Задание 3: Напишите наименьшее целое число X, для которого истинно высказывание: НЕ(X <= 7) И (X четное).",
        options: ["7", "8", "9", "10"],
        correct: 1 // НЕ(<=7) -> >7. Минимальное четное больше 7 — это 8.
    },
    {
        question: "Задание 4: Между пунктами A, B, C, D построены дороги: A-B(1), A-C(4), B-C(2), B-D(5), C-D(1). Кратчайший путь от A до D равен:",
        options: ["6", "5", "4", "7"],
        correct: 2 // A-B-C-D = 1 + 2 + 1 = 4
    },
    {
        question: "Задание 1: В 16-битной кодировке Unicode слово уменьшило размер сообщения на 16 байт (включая запятую и пробел). Сколько букв в слове?",
        options: ["8", "7", "6", "4"],
        correct: 2 // 16 байт = 8 символов. 8 символов минус запятая и пробел = 6 букв.
    },
    {
        question: "Задание 10: Переведите число 11011 из двоичной системы в десятичную.",
        options: ["25", "27", "31", "29"],
        correct: 1 // 16+8+2+1 = 27
    },
    {
        question: "Задание 7: Доступ к файлу index.html на сервере school.edu осуществляется по протоколу https. Какой фрагмент адреса идет вторым?",
        options: ["school.edu", "index.html", "https://", "edu.school"],
        correct: 0 // Схема: протокол -> сервер -> файл
    },
    {
        question: "Задание 3: Для какого из приведенных имен истинно высказывание: НЕ(Первая буква гласная) И (Последняя буква согласная)?",
        options: ["Алина", "Максим", "Игорь", "Елена"],
        correct: 1 // Максим (М - не гласная, м - согласная)
    },
    {
        question: "Задание 13.2: Какое расширение обычно имеют текстовые файлы?",
        options: ["*.exe", "*.jpg", "*.txt", "*.mp3"],
        correct: 2
    },
        {
            question: "Информатика (Задание 1): В кодировке Unicode каждый символ — 16 бит. Определите размер: 'Я учу JavaScript!'",
            options: ["18 байт", "36 байт", "288 байт", "16 байт"],
            correct: 1
        },
        {
            question: "Информатика (Задание 10): Найдите максимальное число: 23(10), 11011(2), 2C(16)",
            options: ["23", "11011(2)", "2C(16)", "Они равны"],
            correct: 2
        }
    ],
    russian: [
        {
            question: "Русский язык: В каком слове ошибка в ударении?",
            options: ["звонИт", "тОрты", "баловАть", "квАртал"],
            correct: 3
        },
         {
            question: "Орфография (Задание 6): В каком слове написание ПРИСТАВКИ зависит от глухости/звонкости последующего согласного?",
            options: ["Сделать", "Бесшумный", "Преграда", "Отойти"],
            correct: 1
        },
        {
            question: "Пунктуация (Задание 4): Укажите цифру, на месте которой должна стоять ЗАПЯТАЯ: 'Листья (1) сорванные ветром (2) кружились в воздухе.'",
            options: ["1", "2", "1 и 2", "Нигде"],
            correct: 2
        },
        {
            question: "Грамматика (Задание 8): Найдите слово с ошибкой: 'Пара ботинков, пять яблок, много мест, опытные доктора'",
            options: ["Пара ботинков", "Пять яблок", "Много мест", "Опытные доктора"],
            correct: 0 
        },
        {
            question: "Орфография: В каком слове в суффиксе пишется НН?",
            options: ["Кожаный", "Гусиный", "Стеклянный", "Песчаный"],
            correct: 2
        },
        {
            question: "Средства выразительности: Найдите ЭПИТЕТ в предложении.",
            options: ["Золотая осень", "Лес спит", "Быстрый как стрела", "Дом-крепость"],
            correct: 0
        },
        {
            question: "Орфография: В каком слове после Ц пишется буква И?",
            options: ["Цыган", "Станция", "Огурцы", "Цыпленок"],
            correct: 1
        }
    ],
    
    math: [
        {
            question: "Математика (Задание 6): Найдите значение выражения: 1/4 + 0.05",
            options: ["0.3", "0.25", "0.9", "0.45"],
            correct: 0
        },
         {
            question: "Задание 6: Найдите значение выражения: 1/4 + 0.07",
            options: ["0.11", "0.32", "0.29", "0.45"],
            correct: 1 // 0.25 + 0.07 = 0.32
        },
        {
            question: "Задание 6: Найдите значение выражения: 6.4 / (1.9 + 1.3)",
            options: ["2.5", "2", "3.2", "4"],
            correct: 1 // 6.4 / 3.2 = 2
        },
        {
            question: "Задание 7: Между какими целыми числами заключено число √54?",
            options: ["5 и 6", "6 и 7", "7 и 8", "8 и 9"],
            correct: 2 // 7^2=49, 8^2=64
        },
        {
            question: "Задание 9: Решите уравнение: 5x + 12 = 0",
            options: ["2.4", "-2.4", "7", "-7"],
            correct: 1
        },
        {
            question: "Задание 9: Решите уравнение: x² - 9 = 0. Если корней несколько, запишите больший.",
            options: ["0", "9", "3", "-3"],
            correct: 2
        },
        {
            question: "Задание 10: В тарелке 20 пирожков: 2 с мясом, 16 с капустой и 2 с вишней. Найдите вероятность того, что выбранный пирожок будет с вишней.",
            options: ["0.1", "0.2", "0.5", "0.05"],
            correct: 0 // 2/20 = 1/10 = 0.1
        },
        {
            question: "Задание 10: На экзамене 25 билетов. Сергей не выучил 3 из них. Найдите вероятность того, что ему попадется выученный билет.",
            options: ["0.88", "0.12", "0.3", "0.75"],
            correct: 0 // 22/25 = 0.88
        },
        {
            question: "Задание 11: Какая функция является линейной?",
            options: ["y = x²", "y = 5/x", "y = 3x - 4", "y = √x"],
            correct: 2
        },
        {
            question: "Задание 12: В фирме «Эх, прокачу» стоимость поездки (в рублях) рассчитывается по формуле C = 150 + 11(t - 5). Найдите стоимость 15-минутной поездки.",
            options: ["260", "280", "240", "300"],
            correct: 0 // 150 + 11*10 = 260
        },
        {
            question: "Задание 13: Укажите решение неравенства: 2x - 4 > 0",
            options: ["x < 2", "x > 2", "x > -2", "x < -2"],
            correct: 1
        },
        {
            question: "Задание 15: В треугольнике два угла равны 34° и 72°. Найдите третий угол треугольника.",
            options: ["106°", "84°", "74°", "90°"],
            correct: 2 // 180 - (34+72) = 74
        },
        {
            question: "Задание 15: Катеты прямоугольного треугольника равны 6 и 8. Найдите гипотенузу.",
            options: ["10", "14", "48", "100"],
            correct: 0 // 36+64=100, √100=10
        },
        {
            question: "Задание 16: Радиус окружности равен 12. Найдите длину хорды, проходящей через центр этой окружности.",
            options: ["12", "6", "24", "36"],
            correct: 2 // Хорда через центр - это диаметр
        },
        {
            question: "Задание 17: Периметр квадрата равен 24. Найдите площадь этого квадрата.",
            options: ["24", "48", "36", "16"],
            correct: 2 // Сторона 6, 6*6=36
        },
        {
            question: "Задание 17: Основания трапеции равны 4 и 10, высота равна 5. Найдите площадь трапеции.",
            options: ["70", "35", "20", "40"],
            correct: 1 // (4+10)/2 * 5 = 35
        },
        {
            question: "Задание 18: На клетчатой бумаге 1x1 изображен ромб с диагоналями 6 и 4. Найдите его площадь.",
            options: ["24", "10", "12", "5"],
            correct: 2 // 1/2 * d1 * d2 = 12
        },
        {
            question: "Задание 19: Какое из следующих утверждений верно?",
            options: ["Сумма углов любого треугольника 180°", "Диагонали ромба равны", "Все прямоугольники - квадраты", "Через любую точку проходит две прямых"],
            correct: 0
        },
        {
            question: "Задание 19: Укажите НЕВЕРНОЕ утверждение:",
            options: ["Центр описанной окружности всегда внутри треугольника", "В равнобедренном треугольнике углы при основании равны", "Площадь круга равна πr²", "Гипотенуза длиннее катета"],
            correct: 0
        },
        {
            question: "Задание 6: Представьте число 1/2 в виде десятичной дроби.",
            options: ["0.2", "0.5", "1.2", "0.05"],
            correct: 1
        },
        {
            question: "Задание 9: Найдите корень уравнения: 2(x - 3) = 10",
            options: ["5", "8", "13", "2"],
            correct: 1 // 2x - 6 = 10 -> 2x = 16 -> x = 8
        }
    ],
    js: [
        {
            question: "Какое ключевое слово создает переменную в JS?",
            options: ["var", "let", "make", "create"],
            correct: 1
        },
        {
            question: "Как вызвать всплывающее окно в JS?",
            options: ["msg()", "alert()", "print()", "show()"],
            correct: 1
        },
        {
            question: "Типы данных: Что выведет typeof null?",
            options: ["'null'", "'undefined'", "'object'", "'number'"],
            correct: 2
        },
        {
            question: "Переменные: Какое объявление позволяет переопределять значение?",
            options: ["const", "let", "static", "fixed"],
            correct: 1
        },
        {
            question: "Сравнение: Результат выражения 5 == '5'?",
            options: ["true", "false", "NaN", "Error"],
            correct: 0
        },
        {
            question: "Сравнение: Результат выражения 5 === '5'?",
            options: ["true", "false", "undefined", "null"],
            correct: 1
        },
        {
            question: "Массивы: Какой метод добавляет элемент в КОНЕЦ массива?",
            options: ["pop()", "shift()", "push()", "unshift()"],
            correct: 2
        },
        {
            question: "Массивы: Какой метод удаляет ПЕРВЫЙ элемент массива?",
            options: ["pop()", "shift()", "push()", "slice()"],
            correct: 1
        },
        {
            question: "Логика: Что вернет выражение !true?",
            options: ["0", "false", "undefined", "null"],
            correct: 1
        },
        {
            question: "Объекты: Как обратиться к свойству name объекта user?",
            options: ["user.name", "user->name", "user(name)", "user[name]"],
            correct: 0
        },
        {
            question: "Функции: Как выглядит стрелочная функция?",
            options: ["function => {}", "() => {}", "func() -> {}", "=> {}"],
            correct: 1
        },
        {
            question: "Строки: Как узнать длину строки str?",
            options: ["str.size()", "str.count", "str.length", "str.width"],
            correct: 2
        },
        {
            question: "Математика: Результат Math.floor(4.9)?",
            options: ["5", "4", "4.5", "0"],
            correct: 1
        },
        {
            question: "Циклы: Какой цикл выполнится хотя бы один раз гарантированно?",
            options: ["while", "for", "do...while", "forEach"],
            correct: 2
        },
        {
            question: "Типы: Что выведет console.log(2 + '2')?",
            options: ["4", "'22'", "NaN", "'4'"],
            correct: 1
        },
        {
            question: "Типы: Что выведет console.log(2 * '2')?",
            options: ["4", "'22'", "NaN", "Error"],
            correct: 0
        },
        {
            question: "DOM: Как найти элемент по его ID?",
            options: ["getElementByClass", "querySelector('#id')", "findId()", "getTag()"],
            correct: 1
        },
        {
            question: "JSON: Какой метод превращает объект в строку?",
            options: ["JSON.parse()", "JSON.toString()", "JSON.stringify()", "JSON.object()"],
            correct: 2
        },
        {
            question: "Условия: Какой оператор называется тернарным?",
            options: ["&&", "||", "? :", "??="],
            correct: 2
        },
        {
            question: "Массивы: Что делает метод map()?",
            options: ["Фильтрует массив", "Создает новый массив на основе старого", "Сортирует", "Удаляет дубликаты"],
            correct: 1
        },
        {
            question: "Ошибки: Какой блок используется для перехвата исключений?",
            options: ["try...catch", "if...else", "throw...error", "check...fail"],
            correct: 0
        },
        {
            question: "Глобальные объекты: Какая функция преобразует строку в целое число?",
            options: ["Number.float()", "parseInt()", "toInteger()", "math.parse()"],
            correct: 1
        }
    ]
};


let questions = []; 
let score = 0; 
let currentQuestionIndex = 0;
let currentUser = null;
let audioCtx = null;
let sharedQuestions = [];
let sharedCurrentIndex = 0;
let sharedScore = 0;


function playNote(frequency, type, duration) {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') audioCtx.resume();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) { console.log("Звук заблокирован"); }
}

const playCorrectSound = () => playNote(880, 'sine', 0.2);
const playErrorSound = () => playNote(110, 'triangle', 0.3);


function startSubject(subject) {
    questions = allQuestions[subject];
    score = 0;
    currentQuestionIndex = 0;
    
    const linkBox = document.getElementById('resource-links');
    const container = document.getElementById('links-container');
        const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.style.display = 'none';
    
    if (linkBox && container) {
        container.innerHTML = ""; 
        resources[subject].forEach(link => {
            const a = document.createElement('a');
            a.href = link.url; a.target = "_blank"; a.innerText = "🔗 " + link.name;
            a.style.display = "block"; a.style.marginBottom = "5px";
            container.appendChild(a);
        });
        linkBox.style.display = "block"; 
    }
    displayQuestion();
}

function displayQuestion() {
    if (!questions || !questions[currentQuestionIndex]) return; 
    const questionData = questions[currentQuestionIndex];
    const messageBox = document.getElementById('message');
    const progress = (currentQuestionIndex / questions.length) * 100;


    messageBox.innerHTML = `
        <div style="width: 100%; background: #edf2f7; height: 8px; border-radius: 10px; margin-bottom: 20px; overflow: hidden;">
            <div style="width: ${progress}%; background: #4299e1; height: 100%; transition: width 0.4s ease;"></div>
        </div>
        <h3>${questionData.question}</h3>
        <div id="options-container"></div>
        
        <!-- КНОПКА ВЫХОДА -->
        <div style="margin-top: 20px; border-top: 1px solid #edf2f7; padding-top: 10px;">
            <button onclick="showMenu()" style="background: none; color: #a0aec0; border: none; font-size: 13px; text-decoration: underline; width: auto; margin: 0 auto; cursor: pointer; box-shadow: none;">
                🏠 Выйти в меню
            </button>
        </div>
    `;

    const container = document.getElementById('options-container');
    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        container.appendChild(button);
    });
}





function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll('#options-container button');
    const messageBox = document.getElementById('message');

    buttons.forEach((btn, index) => {
        btn.disabled = true; 
        if (index === correctIndex) {
            btn.style.backgroundColor = "#28a745"; btn.style.color = "white";
        } else if (index === selectedIndex) {
            btn.style.backgroundColor = "#dc3545"; btn.style.color = "white";
        }
    });

    const gif = document.createElement('img');
    gif.id = "result-gif"; gif.style.width = "180px"; gif.style.marginTop = "15px"; gif.style.borderRadius = "12px";

    if (selectedIndex === correctIndex) {
        score++;
        playCorrectSound();
        gif.src = successGifs[Math.floor(Math.random() * successGifs.length)];
    } else {
        playErrorSound();
        gif.src = errorGifs[Math.floor(Math.random() * errorGifs.length)];
    }
    messageBox.appendChild(gif);

    setTimeout(() => {
        const existingGif = document.getElementById('result-gif');
        if (existingGif) existingGif.remove();
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) displayQuestion();
        else finishQuiz();
    }, 1500);
}


function showAuthForm() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.style.display = 'none';

    document.getElementById('message').innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h2 style="margin-bottom: 20px;">👋 Привет!</h2>
            <input type="text" id="username-input" placeholder="Введи свое имя..." 
                   style="padding: 12px; width: 80%; border-radius: 12px; border: 2px solid #e2e8f0; margin-bottom: 15px; font-family: inherit;">
            <button onclick="login()" style="background: #48bb78; color: white; border: none; padding: 14px; border-radius: 12px; width: 85%; font-weight: 600; cursor: pointer;">Войти</button>
        </div>
    `;
}




function login() {
    const nameInput = document.getElementById('username-input');
    const name = nameInput ? nameInput.value.trim() : "";
    if (!name) return alert("Введите имя!");
    
    let users = JSON.parse(localStorage.getItem('quiz_users')) || {};
    if (!users[name]) {
        users[name] = { name: name, bestScore: 0 };
        localStorage.setItem('quiz_users', JSON.stringify(users));
    }
    currentUser = users[name];
    showMenu(); 
}

function showMenu() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.style.display = 'flex'; 

    if (!currentUser) return showAuthForm();
    
    document.getElementById('resource-links').style.display = "none";
    
    document.getElementById('message').innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; background: #f7fafc; padding: 10px; border-radius: 10px; font-size: 14px;">
            <span>👤 <b>${currentUser.name}</b> (Рекорд: ${currentUser.bestScore})</span>
            <span onclick="logout()" style="color: #e53e3e; cursor: pointer; text-decoration: underline;">Выйти</span>
        </div>
        <h2>Выбери предмет:</h2>
        <button onclick="startSubject('it')">💻 Информатика</button>
        <button onclick="startSubject('math')">📐 Математика</button>
        <button onclick="startSubject('js')">💛 JavaScript</button>
        <button onclick="startSubject('russian')">📖 Русский язык</button>
        <hr style="border: 1px solid #edf2f7; margin: 20px 0;">
        <button onclick="openConstructor()" style="background: #ed8936; border: none;">🛠 Создать свой тест</button>
    `;
}


function logout() {
    document.getElementById('resource-links').style.display = "none";
    currentUser = null;
    showAuthForm();
}

function finishQuiz() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.style.display = 'flex';

    const percent = Math.round((score / questions.length) * 100);
    const bestScore = currentUser ? currentUser.bestScore : 0;

    if (currentUser && score > currentUser.bestScore) {
        currentUser.bestScore = score;
        let users = JSON.parse(localStorage.getItem('quiz_users'));
        users[currentUser.name].bestScore = score;
        localStorage.setItem('quiz_users', JSON.stringify(users));
    }

    document.getElementById('message').innerHTML = `
        <h2>🎉 Тест окончен!</h2>
        <p>Результат: <strong>${score}</strong> из ${questions.length}</p>
        <div style="background: #f7fafc; padding: 15px; border-radius: 12px; margin: 20px 0; font-weight: bold;">
            Точность: ${percent}% | Рекорд: ${currentUser ? currentUser.bestScore : score}
        </div>
        <button onclick="showMenu()">В меню</button>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.onclick = () => {
            const url = window.location.href; 
            
            if (navigator.share) {
                navigator.share({
                    title: 'Тренажер ОГЭ 2026',
                    text: 'Привет! Я готовлюсь к ОГЭ на этом сайте. Присоединяйся!',
                    url: url
                }).catch(() => {});
            } else {
              
                navigator.clipboard.writeText(url);
                alert("Ссылка на тренажер скопирована! Отправь её другу.");
            }
        };
    }
});
function openConstructor() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.style.display = 'none';

    document.getElementById('message').innerHTML = `
        <h3>🛠 Конструктор теста</h3>
        <input type="text" id="custom-title" placeholder="Название теста" style="width:100%; padding:10px; margin-bottom:15px; border-radius:8px; border:1px solid #ddd;">
        
        <div id="questions-list">
            <!-- Сюда будут добавляться вопросы -->
            <div class="q-block" style="background:#f7fafc; padding:15px; border-radius:12px; margin-bottom:15px; border:1px solid #e2e8f0; text-align:left;">
                <input type="text" placeholder="Вопрос" class="q-text" style="width:100%; margin-bottom:10px; padding:8px; border-radius:6px; border:1px solid #ccc;">
                <input type="text" placeholder="Верный ответ" class="q-ans1" style="width:100%; margin-bottom:5px; padding:8px; border-radius:6px; border:1px solid #48bb78;">
                <input type="text" placeholder="Неверный ответ" class="q-ans2" style="width:100%; padding:8px; border-radius:6px; border:1px solid #f56565;">
            </div>
        </div>

        <button onclick="addQuestionField()" style="background:#ed8936; margin-bottom:10px;">➕ Добавить еще вопрос</button>
        <button onclick="generateTestLink()" style="background:#48bb78;">🔗 Получить ссылку на тест</button>
        <button onclick="showMenu()" style="background:none; color:gray; border:none; text-decoration:underline;">Назад</button>
    `;
}


function addQuestionField() {
    const container = document.getElementById('questions-list');
    const newQuestion = document.createElement('div');
    newQuestion.className = 'q-block';
    newQuestion.style = 'background:#f7fafc; padding:15px; border-radius:12px; margin-bottom:15px; border:1px solid #e2e8f0; text-align:left;';
    newQuestion.innerHTML = `
        <input type="text" placeholder="Вопрос" class="q-text" style="width:100%; margin-bottom:10px; padding:8px; border-radius:6px; border:1px solid #ccc;">
        <input type="text" placeholder="Верный ответ" class="q-ans1" style="width:100%; margin-bottom:5px; padding:8px; border-radius:6px; border:1px solid #48bb78;">
        <input type="text" placeholder="Неверный ответ" class="q-ans2" style="width:100%; padding:8px; border-radius:6px; border:1px solid #f56565;">
    `;
    container.appendChild(newQuestion);
}


const newBlock = document.createElement('div');
newBlock.className = 'question-block'; 


function generateTestLink() {
    console.log("Кнопка нажата, начинаю сбор данных...");
    const questionsArray = [];
    
   
    const qTexts = document.querySelectorAll('.q-text');
    const a1Texts = document.querySelectorAll('.q-ans1');
    const a2Texts = document.querySelectorAll('.q-ans2');

    for (let i = 0; i < qTexts.length; i++) {
        const q = qTexts[i].value.trim();
        const a1 = a1Texts[i]?.value.trim();
        const a2 = a2Texts[i]?.value.trim();

        if (q && a1 && a2) {
            questionsArray.push({ q, o: [a1, a2], c: 0 });
        }
    }

    if (questionsArray.length === 0) {
        return alert("Заполните хотя бы один вопрос полностью!");
    }

    const title = document.getElementById('testTitle')?.value || "Тест";
    const testData = { t: title, qs: questionsArray };
    
    try {
               
   const jsonString = JSON.stringify(testData);
        
        // Используем современный способ кодирования UTF-8
        const uint8 = new TextEncoder().encode(jsonString);
        
        // Превращаем массив байтов в строку и кодируем в Base64
        let binary = '';
        const bytes = new Uint8Array(uint8);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binary);

        // Делаем строку безопасной для URL (заменяем + на - и / на _)
        const safeEncoded = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        // Формируем итоговую ссылку
        const finalUrl = `${window.location.origin}${window.location.pathname}?test=${safeEncoded}`;
        

        const msg = document.getElementById('message');
        if (msg) {
            msg.innerHTML = `
                <div style="background:#fff; color:#333; padding:20px; border-radius:10px; margin-top:20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <h3 style="color:#28a745;">✅ Ссылка готова!</h3>
                    <p style="font-size:12px; color:#666;">Если вопросов много, обязательно сократи ссылку через <a href="https://clck.ru" target="_blank">clck.ru</a></p>
                    <textarea id="resLink" style="width:100%; height:80px; margin-bottom:10px; padding:5px; font-size:11px; border:1px solid #ccc; border-radius:5px;">${finalUrl}</textarea>
                    <button onclick="copyLink()" style="width:100%; background:#007bff; color:#fff; border:none; padding:10px; border-radius:5px; cursor:pointer;">Скопировать ссылку</button>
                    <button onclick="location.reload()" style="width:100%; margin-top:5px; background:#eee; border:none; padding:8px; border-radius:5px; cursor:pointer;">Создать ещё один</button>
                </div>
            `;
        }
    } catch (e) {
        console.error("Ошибка кодирования:", e);
        alert("Ошибка при создании ссылки. Попробуйте уменьшить количество текста.");
    }
    }




function showFinalMessage(questionsArray, finalUrl) { 
    const messageBlock = document.getElementById('message');
    if (!messageBlock) return console.error("Элемент #message не найден!");

    messageBlock.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 15px; color: #333;">
            <h3>✅ Тест готов! (Вопросов: ${questionsArray.length})</h3>
            <p>Скопируйте ссылку и отправьте друзьям:</p>
            <textarea id="resLink" style="width:100%; height:100px; font-size:12px; border-radius:8px; padding:10px; border:1px solid #ddd; margin-bottom:10px;">${finalUrl}</textarea>
            <div style="display: flex; gap: 10px; flex-direction: column;">
                <button onclick="copyLink()" style="background: #28a745; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">📋 Скопировать ссылку</button>
                <button onclick="showMenu()" style="background: #6c757d; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">🏠 В меню</button>
            </div>
        </div>
    `;
}

function copyLink() {
    const copyText = document.getElementById("resLink");
    if (copyText) {
        copyText.select();
        navigator.clipboard.writeText(copyText.value)
            .then(() => alert("Ссылка скопирована!"))
            .catch(() => {
                document.execCommand("copy");
                alert("Ссылка скопирована!");
            });
    }
}





function startTest(testData) {
    
    sharedQuestions = testData.qs;
    sharedCurrentIndex = 0;
    sharedScore = 0;

 
    const mainContainer = document.getElementById('message');
    if (mainContainer) {
        displaySharedQuestion(); 
    }
}

function displaySharedQuestion() {
    const messageBox = document.getElementById('message');
    const q = sharedQuestions[sharedCurrentIndex];

    messageBox.innerHTML = `
        <div class="quiz-container" style="text-align: center; padding: 20px;">
            <p style="font-size: 0.9em; color: #888;">Вопрос ${sharedCurrentIndex + 1} из ${sharedQuestions.length}</p>
            <h2 style="margin-bottom: 20px;">${q.q}</h2>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button class="ans-btn" onclick="handleSharedAnswer(0)">${q.o[0]}</button>
                <button class="ans-btn" onclick="handleSharedAnswer(1)">${q.o[1]}</button>
            </div>
        </div>
    `;
}

function handleSharedAnswer(selectedIndex) {
    const messageBox = document.getElementById('message');
    const q = sharedQuestions[sharedCurrentIndex];
    const correctIndex = q.c; 

    
    const buttons = messageBox.querySelectorAll('.ans-btn');

  
    buttons.forEach((btn, idx) => {
        btn.disabled = true; 
        if (idx === correctIndex) {
            btn.style.background = "#28a745"; 
            btn.style.color = "white";
        }
        if (idx === selectedIndex && selectedIndex !== correctIndex) {
            btn.style.background = "#dc3545"; 
            btn.style.color = "white";
        }
    });

    
    const gif = document.createElement('img');
    gif.id = "result-gif";
    gif.style.width = "180px";
    gif.style.marginTop = "15px";
    gif.style.borderRadius = "12px";

    if (selectedIndex === correctIndex) {
        sharedScore++;
        if (typeof playCorrectSound === "function") playCorrectSound();
      
        if (typeof successGifs !== "undefined") {
            gif.src = successGifs[Math.floor(Math.random() * successGifs.length)];
        }
    } else {
        if (typeof playErrorSound === "function") playErrorSound();
        if (typeof errorGifs !== "undefined") {
            gif.src = errorGifs[Math.floor(Math.random() * errorGifs.length)];
        }
    }

    messageBox.appendChild(gif);

    
    setTimeout(() => {
        sharedCurrentIndex++;
        if (sharedCurrentIndex < sharedQuestions.length) {
            displaySharedQuestion();
        } else {
         
            messageBox.innerHTML = `
                <h2>Тест окончен!</h2>
                <p>Ваш результат: ${sharedScore} из ${sharedQuestions.length}</p>
                <button onclick="location.href=window.location.pathname">В меню</button>
            `;
        }
    }, 1500);
}



function init() {
    const urlParams = new URLSearchParams(window.location.search);
    let testDataRaw = urlParams.get('test');

    if (testDataRaw) {
        try {
          
            let base64 = testDataRaw.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) base64 += '=';

         
            const binString = atob(base64);
            const uint8 = new Uint8Array(binString.length);
            for (let i = 0; i < binString.length; i++) {
                uint8[i] = binString.charCodeAt(i);
            }
            const decoded = new TextDecoder().decode(uint8);
            
            const testData = JSON.parse(decoded);
            console.log("Тест загружен успешно!");

          
            startTest(testData); 
        } catch (e) {
            console.error("Ошибка декодирования теста:", e);
            alert("Ошибка: ссылка повреждена. Попробуйте сократить её через clck.ru");
            showAuthForm(); 
        }
    } else {
        
        if (typeof showAuthForm === "function") showAuthForm();
    }
}



    messageBox.innerHTML = `
        <div style="width: 100%; background: #edf2f7; height: 8px; border-radius: 10px; margin-bottom: 20px; overflow: hidden;">
            <div style="width: ${progress}%; background: #4299e1; height: 100%; transition: width 0.4s ease;"></div>
        </div>
        <h3>${questionData.question}</h3>
        <div id="options-container"></div>
        
        <!-- КНОПКА ВЫХОДА -->
        <div style="margin-top: 20px; border-top: 1px solid #edf2f7; padding-top: 10px;">
            <button onclick="showMenu()" style="background: none; color: #a0aec0; border: none; font-size: 13px; text-decoration: underline; width: auto; margin: 0 auto; cursor: pointer; box-shadow: none;">
                🏠 Выйти в меню
            </button>
        </div>
    `;

    const container = document.getElementById('options-container');
    questionData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        container.appendChild(button);
    });
}





function checkAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].correct;
    const buttons = document.querySelectorAll('#options-container button');
    const messageBox = document.getElementById('message');

    buttons.forEach((btn, index) => {
        btn.disabled = true; 
        if (index === correctIndex) {
            btn.style.backgroundColor = "#28a745"; btn.style.color = "white";
        } else if (index === selectedIndex) {
            btn.style.backgroundColor = "#dc3545"; btn.style.color = "white";
        }
    });

    const gif = document.createElement('img');
    gif.id = "result-gif"; gif.style.width = "180px"; gif.style.marginTop = "15px"; gif.style.borderRadius = "12px";

    if (selectedIndex === correctIndex) {
        score++;
        playCorrectSound();
        gif.src = successGifs[Math.floor(Math.random() * successGifs.length)];
    } else {
        playErrorSound();
        gif.src = errorGifs[Math.floor(Math.random() * errorGifs.length)];
    }
    messageBox.appendChild(gif);

    setTimeout(() => {
        const existingGif = document.getElementById('result-gif');
        if (existingGif) existingGif.remove();
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) displayQuestion();
        else finishQuiz();
    }, 1500);
}


function showAuthForm() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.style.display = 'none';

    document.getElementById('message').innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <h2 style="margin-bottom: 20px;">👋 Привет!</h2>
            <input type="text" id="username-input" placeholder="Введи свое имя..." 
                   style="padding: 12px; width: 80%; border-radius: 12px; border: 2px solid #e2e8f0; margin-bottom: 15px; font-family: inherit;">
            <button onclick="login()" style="background: #48bb78; color: white; border: none; padding: 14px; border-radius: 12px; width: 85%; font-weight: 600; cursor: pointer;">Войти</button>
        </div>
    `;
}




function login() {
    const nameInput = document.getElementById('username-input');
    const name = nameInput ? nameInput.value.trim() : "";
    if (!name) return alert("Введите имя!");
    
    let users = JSON.parse(localStorage.getItem('quiz_users')) || {};
    if (!users[name]) {
        users[name] = { name: name, bestScore: 0 };
        localStorage.setItem('quiz_users', JSON.stringify(users));
    }
    currentUser = users[name];
    showMenu(); 
}

function showMenu() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.style.display = 'flex'; 

    if (!currentUser) return showAuthForm();
    
    document.getElementById('resource-links').style.display = "none";
    
    document.getElementById('message').innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; background: #f7fafc; padding: 10px; border-radius: 10px; font-size: 14px;">
            <span>👤 <b>${currentUser.name}</b> (Рекорд: ${currentUser.bestScore})</span>
            <span onclick="logout()" style="color: #e53e3e; cursor: pointer; text-decoration: underline;">Выйти</span>
        </div>
        <h2>Выбери предмет:</h2>
        <button onclick="startSubject('it')">💻 Информатика</button>
        <button onclick="startSubject('math')">📐 Математика</button>
        <button onclick="startSubject('js')">💛 JavaScript</button>
        <button onclick="startSubject('russian')">📖 Русский язык</button>
        <hr style="border: 1px solid #edf2f7; margin: 20px 0;">
        <button onclick="openConstructor()" style="background: #ed8936; border: none;">🛠 Создать свой тест</button>
    `;
}


function logout() {
    document.getElementById('resource-links').style.display = "none";
    currentUser = null;
    showAuthForm();
}

function finishQuiz() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.style.display = 'flex';

    const percent = Math.round((score / questions.length) * 100);
    const bestScore = currentUser ? currentUser.bestScore : 0;

    if (currentUser && score > currentUser.bestScore) {
        currentUser.bestScore = score;
        let users = JSON.parse(localStorage.getItem('quiz_users'));
        users[currentUser.name].bestScore = score;
        localStorage.setItem('quiz_users', JSON.stringify(users));
    }

    document.getElementById('message').innerHTML = `
        <h2>🎉 Тест окончен!</h2>
        <p>Результат: <strong>${score}</strong> из ${questions.length}</p>
        <div style="background: #f7fafc; padding: 15px; border-radius: 12px; margin: 20px 0; font-weight: bold;">
            Точность: ${percent}% | Рекорд: ${currentUser ? currentUser.bestScore : score}
        </div>
        <button onclick="showMenu()">В меню</button>
    `;
}
document.addEventListener('DOMContentLoaded', () => {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) {
        shareBtn.onclick = () => {
            const url = window.location.href; 
            
            if (navigator.share) {
                navigator.share({
                    title: 'Тренажер ОГЭ 2026',
                    text: 'Привет! Я готовлюсь к ОГЭ на этом сайте. Присоединяйся!',
                    url: url
                }).catch(() => {});
            } else {
              
                navigator.clipboard.writeText(url);
                alert("Ссылка на тренажер скопирована! Отправь её другу.");
            }
        };
    }
});
function openConstructor() {
    const shareBtn = document.getElementById('shareBtn');
    if (shareBtn) shareBtn.style.display = 'none';

    document.getElementById('message').innerHTML = `
        <h3>🛠 Конструктор теста</h3>
        <input type="text" id="custom-title" placeholder="Название теста" style="width:100%; padding:10px; margin-bottom:15px; border-radius:8px; border:1px solid #ddd;">
        
        <div id="questions-list">
            <!-- Сюда будут добавляться вопросы -->
            <div class="q-block" style="background:#f7fafc; padding:15px; border-radius:12px; margin-bottom:15px; border:1px solid #e2e8f0; text-align:left;">
                <input type="text" placeholder="Вопрос" class="q-text" style="width:100%; margin-bottom:10px; padding:8px; border-radius:6px; border:1px solid #ccc;">
                <input type="text" placeholder="Верный ответ" class="q-ans1" style="width:100%; margin-bottom:5px; padding:8px; border-radius:6px; border:1px solid #48bb78;">
                <input type="text" placeholder="Неверный ответ" class="q-ans2" style="width:100%; padding:8px; border-radius:6px; border:1px solid #f56565;">
            </div>
        </div>

        <button onclick="addQuestionField()" style="background:#ed8936; margin-bottom:10px;">➕ Добавить еще вопрос</button>
        <button onclick="generateTestLink()" style="background:#48bb78;">🔗 Получить ссылку на тест</button>
        <button onclick="showMenu()" style="background:none; color:gray; border:none; text-decoration:underline;">Назад</button>
    `;
}


function addQuestionField() {
    const container = document.getElementById('questions-list');
    const newQuestion = document.createElement('div');
    newQuestion.className = 'q-block';
    newQuestion.style = 'background:#f7fafc; padding:15px; border-radius:12px; margin-bottom:15px; border:1px solid #e2e8f0; text-align:left;';
    newQuestion.innerHTML = `
        <input type="text" placeholder="Вопрос" class="q-text" style="width:100%; margin-bottom:10px; padding:8px; border-radius:6px; border:1px solid #ccc;">
        <input type="text" placeholder="Верный ответ" class="q-ans1" style="width:100%; margin-bottom:5px; padding:8px; border-radius:6px; border:1px solid #48bb78;">
        <input type="text" placeholder="Неверный ответ" class="q-ans2" style="width:100%; padding:8px; border-radius:6px; border:1px solid #f56565;">
    `;
    container.appendChild(newQuestion);
}


const newBlock = document.createElement('div');
newBlock.className = 'question-block'; 


function generateTestLink() {
    console.log("Кнопка нажата, начинаю сбор данных...");
    const questionsArray = [];
    
   
    const qTexts = document.querySelectorAll('.q-text');
    const a1Texts = document.querySelectorAll('.q-ans1');
    const a2Texts = document.querySelectorAll('.q-ans2');

    for (let i = 0; i < qTexts.length; i++) {
        const q = qTexts[i].value.trim();
        const a1 = a1Texts[i]?.value.trim();
        const a2 = a2Texts[i]?.value.trim();

        if (q && a1 && a2) {
            questionsArray.push({ q, o: [a1, a2], c: 0 });
        }
    }

    if (questionsArray.length === 0) {
        return alert("Заполните хотя бы один вопрос полностью!");
    }

    const title = document.getElementById('testTitle')?.value || "Тест";
    const testData = { t: title, qs: questionsArray };
    
    try {
               
   const jsonString = JSON.stringify(testData);
        
        // Используем современный способ кодирования UTF-8
        const uint8 = new TextEncoder().encode(jsonString);
        
        // Превращаем массив байтов в строку и кодируем в Base64
        let binary = '';
        const bytes = new Uint8Array(uint8);
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        const base64 = btoa(binary);

        // Делаем строку безопасной для URL (заменяем + на - и / на _)
        const safeEncoded = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

        // Формируем итоговую ссылку
        const finalUrl = `${window.location.origin}${window.location.pathname}?test=${safeEncoded}`;
        

        const msg = document.getElementById('message');
        if (msg) {
            msg.innerHTML = `
                <div style="background:#fff; color:#333; padding:20px; border-radius:10px; margin-top:20px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <h3 style="color:#28a745;">✅ Ссылка готова!</h3>
                    <p style="font-size:12px; color:#666;">Если вопросов много, обязательно сократи ссылку через <a href="https://clck.ru" target="_blank">clck.ru</a></p>
                    <textarea id="resLink" style="width:100%; height:80px; margin-bottom:10px; padding:5px; font-size:11px; border:1px solid #ccc; border-radius:5px;">${finalUrl}</textarea>
                    <button onclick="copyLink()" style="width:100%; background:#007bff; color:#fff; border:none; padding:10px; border-radius:5px; cursor:pointer;">Скопировать ссылку</button>
                    <button onclick="location.reload()" style="width:100%; margin-top:5px; background:#eee; border:none; padding:8px; border-radius:5px; cursor:pointer;">Создать ещё один</button>
                </div>
            `;
        }
    } catch (e) {
        console.error("Ошибка кодирования:", e);
        alert("Ошибка при создании ссылки. Попробуйте уменьшить количество текста.");
    }
    }




function showFinalMessage(questionsArray, finalUrl) { 
    const messageBlock = document.getElementById('message');
    if (!messageBlock) return console.error("Элемент #message не найден!");

    messageBlock.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 15px; color: #333;">
            <h3>✅ Тест готов! (Вопросов: ${questionsArray.length})</h3>
            <p>Скопируйте ссылку и отправьте друзьям:</p>
            <textarea id="resLink" style="width:100%; height:100px; font-size:12px; border-radius:8px; padding:10px; border:1px solid #ddd; margin-bottom:10px;">${finalUrl}</textarea>
            <div style="display: flex; gap: 10px; flex-direction: column;">
                <button onclick="copyLink()" style="background: #28a745; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">📋 Скопировать ссылку</button>
                <button onclick="showMenu()" style="background: #6c757d; color: white; border: none; padding: 10px; border-radius: 5px; cursor: pointer;">🏠 В меню</button>
            </div>
        </div>
    `;
}

function copyLink() {
    const copyText = document.getElementById("resLink");
    if (copyText) {
        copyText.select();
        navigator.clipboard.writeText(copyText.value)
            .then(() => alert("Ссылка скопирована!"))
            .catch(() => {
                document.execCommand("copy");
                alert("Ссылка скопирована!");
            });
    }
}





function startTest(testData) {
    
    sharedQuestions = testData.qs;
    sharedCurrentIndex = 0;
    sharedScore = 0;

 
    const mainContainer = document.getElementById('message');
    if (mainContainer) {
        displaySharedQuestion(); 
    }
}

function displaySharedQuestion() {
    const messageBox = document.getElementById('message');
    const q = sharedQuestions[sharedCurrentIndex];

    messageBox.innerHTML = `
        <div class="quiz-container" style="text-align: center; padding: 20px;">
            <p style="font-size: 0.9em; color: #888;">Вопрос ${sharedCurrentIndex + 1} из ${sharedQuestions.length}</p>
            <h2 style="margin-bottom: 20px;">${q.q}</h2>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <button class="ans-btn" onclick="handleSharedAnswer(0)">${q.o[0]}</button>
                <button class="ans-btn" onclick="handleSharedAnswer(1)">${q.o[1]}</button>
            </div>
        </div>
    `;
}

function handleSharedAnswer(selectedIndex) {
    const messageBox = document.getElementById('message');
    const q = sharedQuestions[sharedCurrentIndex];
    const correctIndex = q.c; 

    
    const buttons = messageBox.querySelectorAll('.ans-btn');

  
    buttons.forEach((btn, idx) => {
        btn.disabled = true; 
        if (idx === correctIndex) {
            btn.style.background = "#28a745"; 
            btn.style.color = "white";
        }
        if (idx === selectedIndex && selectedIndex !== correctIndex) {
            btn.style.background = "#dc3545"; 
            btn.style.color = "white";
        }
    });

    
    const gif = document.createElement('img');
    gif.id = "result-gif";
    gif.style.width = "180px";
    gif.style.marginTop = "15px";
    gif.style.borderRadius = "12px";

    if (selectedIndex === correctIndex) {
        sharedScore++;
        if (typeof playCorrectSound === "function") playCorrectSound();
      
        if (typeof successGifs !== "undefined") {
            gif.src = successGifs[Math.floor(Math.random() * successGifs.length)];
        }
    } else {
        if (typeof playErrorSound === "function") playErrorSound();
        if (typeof errorGifs !== "undefined") {
            gif.src = errorGifs[Math.floor(Math.random() * errorGifs.length)];
        }
    }

    messageBox.appendChild(gif);

    
    setTimeout(() => {
        sharedCurrentIndex++;
        if (sharedCurrentIndex < sharedQuestions.length) {
            displaySharedQuestion();
        } else {
         
            messageBox.innerHTML = `
                <h2>Тест окончен!</h2>
                <p>Ваш результат: ${sharedScore} из ${sharedQuestions.length}</p>
                <button onclick="location.href=window.location.pathname">В меню</button>
            `;
        }
    }, 1500);
}



function init() {
    const urlParams = new URLSearchParams(window.location.search);
    let testDataRaw = urlParams.get('test');

    if (testDataRaw) {
        try {
          
            let base64 = testDataRaw.replace(/-/g, '+').replace(/_/g, '/');
            while (base64.length % 4) base64 += '=';

         
            const binString = atob(base64);
            const uint8 = new Uint8Array(binString.length);
            for (let i = 0; i < binString.length; i++) {
                uint8[i] = binString.charCodeAt(i);
            }
            const decoded = new TextDecoder().decode(uint8);
            
            const testData = JSON.parse(decoded);
            console.log("Тест загружен успешно!");

          
            startTest(testData); 
        } catch (e) {
            console.error("Ошибка декодирования теста:", e);
            alert("Ошибка: ссылка повреждена. Попробуйте сократить её через clck.ru");
            showAuthForm(); 
        }
    } else {
        
        if (typeof showAuthForm === "function") showAuthForm();
    }
}





window.onload = init;
