const api = require("./api");
const config = require("./config");

async function sleep(mills) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, mills);
    });
}

async function answer(id) {
    try {
        const questions = await api.getQuestionPaper(id);
        console.log(`[INFO] id: ${id} - get questions`);
        const answers = generateAnswer(questions);
        await sleep(config.sleep);
        const response = await api.sendAnswer(id, answers);
        console.log(`[INFO] ${response}`);
    }
    catch (e) {
        console.log(`[Error] ${e.response.body.message}`);
    }
}

function findAnswerId(options, target) {
    for (let o of options) {
        if (o.label == target)
            return o.oid;
    }
    return 0;
}

function generateAnswer(questions) {
    let answers = [];
    for (let q of questions) {
        let answer = q;
        answer.answed = true;
        answer.check = -1;
        if (q.type == 1) {
            answer.answer = "";
            answer.answers = [findAnswerId(q.options, "选项 A")];
        }
        else if (q.type == 4) {
            answer.answed = false;
            answer.answer = q.options.max;
            answer.answers = [];
        }
        answers.push(answer);
    }
    return answers;
}

async function answerAll() {
    const result = await api.getCourseList();
    const courses = result.map(item => item.pusc.semester_course_id);

    console.log(courses);
    let promises = [];
    for (const c of courses) {
        await answer(c);
        await sleep(config.sleep);
    }
}

module.exports = answerAll;