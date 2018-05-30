const superagent = require("superagent");
const config = require("./config");

async function getQuestionPaper(id) {
    const response = (await superagent.get(`http://pingjiao.sjtu.edu.cn/api/question-paper/8/15/${id}`)
        .set(config.request));
    return response.body.questions;
}

async function getCourseList() {
    const response = (await superagent.get("http://pingjiao.sjtu.edu.cn/api/my-message/15")
        .set(config.request));
    return response.body.course_list;
}

async function sendAnswer(id, answers) {
    const response = (await superagent.post(`http://pingjiao.sjtu.edu.cn/api/evaluation-paper/8/15/${id}`)
        .send(JSON.stringify(answers))
        .set(config.request));
    return response.body.message;
}

module.exports = {
    getQuestionPaper,
    getCourseList,
    sendAnswer
}