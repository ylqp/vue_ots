/**
 * 挂载
 * @param {*} queItem 
 * @returns 
 */
 const mountAnswer_SingleSelection = queItem => {
    
    if (queItem.answerRecord && queItem.answerRecord.content) {
        queItem.webData.answer = queItem.answerRecord.content.id
        queItem.webData.isAnswer = true
    }
    return queItem
}
const mountAnswer_MultiSelection = queItem => {

    if (queItem.answerRecord && queItem.answerRecord.content) {
        queItem.webData.answer = queItem.answerRecord.content.idList
        queItem.webData.isAnswer = true
    }
    return queItem
}
const mountAnswer_BlankFilling = queItem => {
    
    if (queItem.answerRecord && queItem.answerRecord.content) {
        queItem.webData.answer = queItem.answerRecord.content.pairList
        queItem.webData.isAnswer = true
    }
    return queItem
}
const mountAnswer_Judgement = queItem => {

    const content = { id: queItem.webData.answer}

    let answerItem = {
        questionId: queItem.questionId,
        content: JSON.stringify(content)
    }

    return answerItem
}
const mountAnswer_EssayQuestion = queItem => {

    const content = { content: queItem.webData.answer}

    let answerItem = {
        questionId: queItem.questionId,
        content: JSON.stringify(content)
    }

    return answerItem
}
const mountAnswer_JudgementCorrectsMistakes = queItem => {

    const content = queItem.webData.answer

    let answerItem = {
        questionId: queItem.questionId,
        content: JSON.stringify(content)
    }

    return answerItem
}
const mountAnswer_Composite = queItem => {

    let subQuestionAnswerList = []
    if (queItem.subqustionList) {
        queItem.subqustionList.forEach(subItem => {
            const subAnswerItem = mountQueItemAnswer(subItem)
            subQuestionAnswerList.push(subAnswerItem)
        })
    }
    let answerItem = {
        questionId: queItem.questionId,
        content: "",
        subQuestionAnswerList: subQuestionAnswerList
    }
    return answerItem
}

const mountQueItemAnswer = queItem => {
    let answerItem
    switch (queItem.answerMode) {
        case 'SingleSelection':
            answerItem = mountAnswer_SingleSelection(queItem)
            break;
        case 'MultiSelection':
            answerItem = mountAnswer_MultiSelection(queItem)
            break;
        case 'BlankFilling':
            answerItem = mountAnswer_BlankFilling(queItem)
            break;
        case 'Judgement':
            answerItem = mountAnswer_Judgement(queItem)
            break;
        case 'EssayQuestion':
            answerItem = mountAnswer_EssayQuestion(queItem)
            break;
        case 'JudgementCorrectsMistakes':
            answerItem = mountAnswer_JudgementCorrectsMistakes(queItem)
            break;
        case 'Composite':
            answerItem = mountAnswer_Composite(queItem)
            break;
    }
    return answerItem
}

export default mountQueItemAnswer