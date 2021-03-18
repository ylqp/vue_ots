/**
 * 处理单选答案
 * @param {*} queItem 
 * @returns 
 */
const dealAnswer_SingleSelection = queItem => {

    const content = { id: queItem.webData.answer}

    let answerItem = {
        questionId: queItem.questionId,
        content: JSON.stringify(content)
    }

    return answerItem
}
const dealAnswer_MultiSelection = queItem => {

    const content = { idList: queItem.webData.answer}

    let answerItem = {
        questionId: queItem.questionId,
        content: JSON.stringify(content)
    }

    return answerItem
}
const dealAnswer_BlankFilling = queItem => {
    
    const content = { pairList: queItem.webData.answer}

    let answerItem = {
        questionId: queItem.questionId,
        content: JSON.stringify(content)
    }
    return answerItem
}
const dealAnswer_Judgement = queItem => {

    const content = { id: queItem.webData.answer}

    let answerItem = {
        questionId: queItem.questionId,
        content: JSON.stringify(content)
    }

    return answerItem
}
const dealAnswer_EssayQuestion = queItem => {

}
const dealAnswer_JudgementCorrectsMistakes = queItem => {

    const content = queItem.webData.answer

    let answerItem = {
        questionId: queItem.questionId,
        content: JSON.stringify(content)
    }

    return answerItem
}
const dealAnswer_Composite = queItem => {

}

const dealQueItemAnswer = queItem => {
    let answerItem = {}
    if (!queItem.webData || !queItem.webData.isAnswer) {
        return {}
    }
    switch (queItem.answerMode) {
        case 'SingleSelection':
            answerItem = dealAnswer_SingleSelection(queItem)
            break;
        case 'MultiSelection':
            answerItem = dealAnswer_MultiSelection(queItem)
            break;
        case 'BlankFilling':
            answerItem = dealAnswer_BlankFilling(queItem)
            break;
        case 'Judgement':
            answerItem = dealAnswer_Judgement(queItem)
            break;
        case 'EssayQuestion':
            answerItem = dealAnswer_EssayQuestion(queItem)
            break;
        case 'JudgementCorrectsMistakes':
            answerItem = dealAnswer_JudgementCorrectsMistakes(queItem)
            break;
        case 'Composite':
            answerItem = dealAnswer_Composite(queItem)
            break;
    }
    return answerItem
}

export default dealQueItemAnswer
